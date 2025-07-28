// 等级管理器
const LevelManager = {
    currentExp: 0,
    currentLevel: 0,

    // 初始化等级系统
    init: function() {
        this.loadLevelData();
        // 延迟更新首页等级显示，确保DOM已加载
        setTimeout(() => {
            this.updateHomeLevelDisplay();
        }, 200);
    },

    // 加载等级数据
    loadLevelData: function() {
        this.currentExp = parseInt(localStorage.getItem('customsPlayerExp')) || 0;
        this.currentLevel = this.calculateLevelFromExp(this.currentExp);
    },

    // 保存等级数据
    saveLevelData: function() {
        localStorage.setItem('customsPlayerExp', this.currentExp.toString());
    },

    // 根据经验计算等级
    calculateLevelFromExp: function(exp) {
        const levels = GAME_CONFIG.LEVEL_SYSTEM.levels;
        for (let i = levels.length - 1; i >= 0; i--) {
            if (exp >= levels[i].minExp) {
                return i;
            }
        }
        return 0;
    },

    // 获取当前等级信息
    getCurrentLevelInfo: function() {
        return GAME_CONFIG.LEVEL_SYSTEM.levels[this.currentLevel];
    },

    // 获取下一等级信息
    getNextLevelInfo: function() {
        if (this.currentLevel < GAME_CONFIG.LEVEL_SYSTEM.levels.length - 1) {
            return GAME_CONFIG.LEVEL_SYSTEM.levels[this.currentLevel + 1];
        }
        return null;
    },

    // 计算进度百分比
    getProgressPercentage: function() {
        const currentLevelInfo = this.getCurrentLevelInfo();
        const nextLevelInfo = this.getNextLevelInfo();
        
        if (!nextLevelInfo) {
            return 100; // 已达最高等级
        }
        
        const currentLevelExp = this.currentExp - currentLevelInfo.minExp;
        const requiredExp = nextLevelInfo.minExp - currentLevelInfo.minExp;
        
        return Math.floor((currentLevelExp / requiredExp) * 100);
    },

    // 根据分数添加经验
    addExpByScore: function(totalScore) {
        let expGained = 0;
        
        // 特殊情况：100分直接+4经验
        if (totalScore === 100) {
            expGained = 4;
        } else {
            // 原有的经验计算逻辑
            if (totalScore >= 90) {
                expGained = 2;
            } else if (totalScore >= 80) {
                expGained = 1;
            } else if (totalScore >= 60) {
                expGained = 0;
            } else {
                expGained = -1;
            }
        }
        
        const oldLevel = this.currentLevel;
        const oldExp = this.currentExp;
        
        // 添加经验
        this.currentExp += expGained;
        this.currentLevel = this.calculateLevelFromExp(this.currentExp);
        
        // 保存数据
        this.saveLevelData();
        
        console.log(`经验变化: +${expGained} (${oldExp} -> ${this.currentExp})`);
        
        return {
            expGained: expGained,
            expChange: expGained,
            oldLevel: oldLevel,
            newLevel: this.currentLevel,
            oldExp: oldExp,
            newExp: this.currentExp,
            levelUp: this.currentLevel > oldLevel
        };
    },

    // 首页等级显示
    updateHomeLevelDisplay: function() {
        // 首先检查是否在主菜单界面
        const mainMenu = document.getElementById('main-menu');
        if (!mainMenu || !mainMenu.classList.contains('active')) {
            console.log('不在主菜单界面，跳过等级显示更新');
            return;
        }

        let levelDisplay = document.getElementById('home-level-display');
        if (!levelDisplay) {
            levelDisplay = document.createElement('div');
            levelDisplay.id = 'home-level-display';
            levelDisplay.style.cssText = `
                position: fixed !important;
                top: 20px !important;
                left: 20px !important;
                color: #3498db !important;
                font-size: 16px !important;
                z-index: 1000 !important;
                font-weight: bold !important;
                white-space: nowrap !important;
                font-family: Arial, sans-serif !important;
                line-height: 1.2 !important;
            `;
            
            document.body.appendChild(levelDisplay);
        }

        const currentLevelInfo = this.getCurrentLevelInfo();
        levelDisplay.textContent = `当前等级：Lv.${this.currentLevel + 1} ${currentLevelInfo.name}`;
    },

    // 更新游戏界面等级显示（在暂停按钮旁边）
    updateGameLevelDisplay: function() {
        // 首先检查是否在游戏界面
        const inspectionScreen = document.getElementById('inspection-screen');
        if (!inspectionScreen || !inspectionScreen.classList.contains('active')) {
            console.log('不在游戏界面，跳过等级显示更新');
            return;
        }

        let gameLevelDisplay = document.getElementById('game-level-display');
        if (!gameLevelDisplay) {
            gameLevelDisplay = document.createElement('div');
            gameLevelDisplay.id = 'game-level-display';
            gameLevelDisplay.style.cssText = `
                position: absolute;
                top: 20px;
                left: 120px;
                background: rgba(0, 0, 0, 0.8);
                color: white;
                padding: 8px 12px;
                border-radius: 15px;
                font-size: 12px;
                z-index: 1000;
                border: 1px solid #3498db;
                font-weight: bold;
            `;
            
            if (inspectionScreen) {
                inspectionScreen.appendChild(gameLevelDisplay);
            } else {
                console.warn('inspection-screen元素不存在，无法添加等级显示');
                return;
            }
        }

        const currentLevelInfo = this.getCurrentLevelInfo();
        gameLevelDisplay.innerHTML = `
            <div style="color: #3498db;">
                ${currentLevelInfo.name}
            </div>
        `;
    },

    // 显示等级变化动画（仅用于最终结算界面）
    showLevelChangeInFinalResult: function(expResult) {
        const currentLevelInfo = this.getCurrentLevelInfo();
        const progressPercentage = this.getProgressPercentage();
        const nextLevelInfo = this.getNextLevelInfo();

        let levelChangeHTML = `
            <div class="result-section info">
                <div class="result-item-title">📈 等级信息</div>
                <div class="result-item-content">
                    <div style="margin-bottom: 15px;">
                        <div style="font-size: 16px; margin-bottom: 5px;">
                            当前等级: <span style="color: #2ecc71; font-weight: bold;">${currentLevelInfo.name}</span>
                        </div>
                        <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
                            <span>经验值: ${expResult.oldExp} → ${expResult.newExp}</span>
                            <span style="color: ${expResult.expChange >= 0 ? '#2ecc71' : '#e74c3c'};">
                                ${expResult.expChange >= 0 ? '+' : ''}${expResult.expChange}
                            </span>
                        </div>
                        <div style="width: 100%; height: 12px; background: rgba(255,255,255,0.2); border-radius: 6px; overflow: hidden;">
                            <div id="exp-progress-bar" style="width: 0%; height: 100%; background: linear-gradient(90deg, #3498db, #2ecc71); transition: width 2s ease;"></div>
                        </div>
                        ${nextLevelInfo ? `<div style="font-size: 12px; margin-top: 5px; opacity: 0.8;">距离下一级: ${nextLevelInfo.minExp - this.currentExp} 经验</div>` : '<div style="font-size: 12px; margin-top: 5px; color: #f39c12;">已达最高等级！</div>'}
                    </div>
        `;

        if (expResult.levelUp) {
            levelChangeHTML += `
                    <div style="background: linear-gradient(135deg, #f39c12, #e67e22); color: white; padding: 12px; border-radius: 8px; text-align: center; font-weight: bold; animation: levelUpGlow 2s infinite;">
                        🎉 等级提升！${GAME_CONFIG.LEVEL_SYSTEM.levels[expResult.oldLevel].name} → ${currentLevelInfo.name}
                    </div>
            `;

            // 添加升级动画样式
            const style = document.createElement('style');
            style.textContent = `
                @keyframes levelUpGlow {
                    0%, 100% { box-shadow: 0 0 10px rgba(243, 156, 18, 0.5); }
                    50% { box-shadow: 0 0 25px rgba(243, 156, 18, 0.8); }
                }
            `;
            document.head.appendChild(style);
        }

        levelChangeHTML += `
                </div>
            </div>
        `;

        return levelChangeHTML;
    },

    // 动画显示进度条
    animateProgressBar: function() {
        setTimeout(() => {
            const progressBar = document.getElementById('exp-progress-bar');
            if (progressBar) {
                progressBar.style.width = this.getProgressPercentage() + '%';
            }
        }, 500);
    },
    // 重置所有数据
    resetAllData: function() {
        // 清除本地存储的所有游戏数据
        localStorage.removeItem('customsPlayerExp');
        // 如果还有其他游戏数据，也一并清除
        // localStorage.removeItem('其他数据key');
        
        // 重置内存中的数据
        this.currentExp = 0;
        this.currentLevel = 0;
        
        // 更新显示
        this.updateHomeLevelDisplay();
        
        console.log('游戏数据已重置');
        
        // 可选：显示重置成功提示
        this.showResetNotification();
    },

    // 显示重置成功通知
    showResetNotification: function() {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(46, 204, 113, 0.9);
            color: white;
            padding: 15px 25px;
            border-radius: 8px;
            font-size: 16px;
            font-weight: bold;
            z-index: 10000;
            animation: fadeInOut 2s ease-in-out;
        `;
        notification.textContent = '✅ 数据重置成功！玩家可以重新开始游戏';
        
        // 添加淡入淡出动画
        const style = document.createElement('style');
        style.textContent = `
            @keyframes fadeInOut {
                0% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
                20%, 80% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
                100% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
            }
        `;
        document.head.appendChild(style);
        
        document.body.appendChild(notification);
        
        // 2秒后移除通知
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
            if (style.parentNode) {
                style.parentNode.removeChild(style);
            }
        }, 2000);
    },

    // 确认重置对话框
    confirmReset: function() {
        const confirmed = confirm(
            '！！ 确定要重置所有游戏数据吗？\n\n' +
            '这将清除：\n' +
            '• 当前等级和经验值\n' +
            '• 游戏进度记录\n\n' +
            '此操作无法撤销！'
        );
        
        if (confirmed) {
            this.resetAllData();
        }
    }
};