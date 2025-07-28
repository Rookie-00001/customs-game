// 游戏性管理器
const GameplayManager = {
    currentDifficulty: 'normal',
    achievements: JSON.parse(localStorage.getItem('customsAchievements')) || {},
    totalScore: parseInt(localStorage.getItem('customsTotalScore')) || 0,
    streakCount: 0,
    totalCasesCompleted: parseInt(localStorage.getItem('customsCasesCompleted')) || 0,
    specialEvent: null,
    
    init: function() {
        this.loadPlayerData();
        this.checkForSpecialEvents();
        this.updateRankDisplay();
    },
    
    // 🎮 难度选择
    setDifficulty: function(difficulty) {
        this.currentDifficulty = difficulty;
        const config = GAME_CONFIG.DIFFICULTY[difficulty];
        GameState.currentTimeLeft = config.TIME_LIMIT;
        
        // 更新UI显示难度效果
        this.applyDifficultyEffects(config);
        
        // 显示难度提示
        this.showDifficultyNotification(difficulty);
    },
    
    applyDifficultyEffects: function(config) {
        // 神经质显示控制
        const nervousMeter = Utils.getElement('nervousness-meter');
        if (nervousMeter) {
            nervousMeter.style.display = config.NERVOUSNESS_VISIBLE ? 'block' : 'none';
        }
        
        // X光清晰度
        document.documentElement.style.setProperty('--xray-opacity', 
            config.XRAY_CLARITY === 'high' ? '0.9' : 
            config.XRAY_CLARITY === 'medium' ? '0.7' : '0.5'
        );
    },
    
    // 🎮 特殊事件系统
    checkForSpecialEvents: function() {
        if (Math.random() < 0.2) { // 20%概率触发特殊事件
            const events = Object.keys(GAME_CONFIG.SPECIAL_EVENTS);
            const randomEvent = events[Math.floor(Math.random() * events.length)];
            this.triggerSpecialEvent(randomEvent);
        }
    },
    
    triggerSpecialEvent: function(eventType) {
        this.specialEvent = eventType;
        const event = GAME_CONFIG.SPECIAL_EVENTS[eventType];
        
        this.showNotification(`🎯 特殊事件：${event.desc}`, 'special');
        
        switch(eventType) {
            case 'RUSH_HOUR':
                GameState.currentTimeLeft = Math.floor(GameState.currentTimeLeft / 2);
                break;
            case 'VIP_PASSENGER':
                // 在旅客信息中添加VIP标识
                this.addVIPIndicator();
                break;
            case 'RANDOM_CHECK':
                // 增加额外的可疑物品
                this.addRandomSuspiciousItem();
                break;
        }
    },
    
    addVIPIndicator: function() {
        const passengerName = Utils.getElement('passenger-name');
        if (passengerName) {
            passengerName.innerHTML += ' <span style="color: gold;">👑VIP</span>';
        }
    },
    
    // 🎮 成就系统
    checkAchievements: function(caseResult) {
        const newAchievements = [];
        
        // 检查各种成就
        if (caseResult.score >= 20 && !this.achievements.PERFECTIONIST) {
            this.unlockAchievement('PERFECTIONIST');
            newAchievements.push('PERFECTIONIST');
        }
        
        if (caseResult.timeUsed <= 30 && caseResult.isCorrect && !this.achievements.SPEED_DEMON) {
            this.unlockAchievement('SPEED_DEMON');
            newAchievements.push('SPEED_DEMON');
        }
        
        if (caseResult.isCorrect) {
            this.streakCount++;
            if (this.streakCount >= 5 && !this.achievements.PERFECT_STREAK) {
                this.unlockAchievement('PERFECT_STREAK');
                newAchievements.push('PERFECT_STREAK');
            }
            if (this.streakCount >= 10 && !this.achievements.STREAK_MASTER) {
                this.unlockAchievement('STREAK_MASTER');
                newAchievements.push('STREAK_MASTER');
            }
        } else {
            this.streakCount = 0;
        }
        
        this.totalCasesCompleted++;
        if (this.totalCasesCompleted >= 50 && !this.achievements.VETERAN) {
            this.unlockAchievement('VETERAN');
            newAchievements.push('VETERAN');
        }
        
        // 显示新成就
        newAchievements.forEach(achievement => {
            this.showAchievementUnlock(achievement);
        });
        
        this.savePlayerData();
    },
    
    unlockAchievement: function(achievementKey) {
        this.achievements[achievementKey] = true;
        const achievement = GAME_CONFIG.ACHIEVEMENTS[achievementKey];
        this.totalScore += achievement.points;
        
        // 触发成就解锁音效（如果有的话）
        this.playSound('achievement');
    },
    
    showAchievementUnlock: function(achievementKey) {
        const achievement = GAME_CONFIG.ACHIEVEMENTS[achievementKey];
        this.showNotification(
            `🏆 成就解锁：${achievement.name}\n${achievement.desc}\n+${achievement.points}分`, 
            'achievement'
        );
    },
    
    // 🎮 动态评分系统
    calculateDetailedScore: function(caseData) {
        let score = 0;
        let breakdown = {};
        
        // 基础判断分
        if (caseData.isCorrect) {
            score += GAME_CONFIG.SCORING.PERFECT_DECISION;
            breakdown.decision = GAME_CONFIG.SCORING.PERFECT_DECISION;
        } else {
            score += GAME_CONFIG.SCORING.WRONG_DECISION;
            breakdown.decision = GAME_CONFIG.SCORING.WRONG_DECISION;
        }
        
        // 时间奖励/惩罚
        const timeUsed = caseData.timeUsed;
        if (timeUsed <= 60) {
            score += GAME_CONFIG.SCORING.TIME_BONUS;
            breakdown.timeBonus = GAME_CONFIG.SCORING.TIME_BONUS;
        } else if (timeUsed >= 150) {
            score += GAME_CONFIG.SCORING.TIME_PENALTY;
            breakdown.timePenalty = GAME_CONFIG.SCORING.TIME_PENALTY;
        }
        
        // 程序规范奖励
        if (caseData.usedXRay && caseData.askedQuestions) {
            score += GAME_CONFIG.SCORING.PROCEDURE_BONUS;
            breakdown.procedure = GAME_CONFIG.SCORING.PROCEDURE_BONUS;
        }
        
        // 特殊事件奖励
        if (this.specialEvent === 'RUSH_HOUR') {
            score = Math.floor(score * GAME_CONFIG.SPECIAL_EVENTS.RUSH_HOUR.multiplier);
            breakdown.specialEvent = '高峰时段奖励';
        } else if (this.specialEvent === 'VIP_PASSENGER') {
            score += GAME_CONFIG.SPECIAL_EVENTS.VIP_PASSENGER.bonus;
            breakdown.vipBonus = GAME_CONFIG.SPECIAL_EVENTS.VIP_PASSENGER.bonus;
        }
        
        // 难度奖励
        const difficultyMultiplier = {
            'easy': 0.8,
            'normal': 1.0,
            'hard': 1.5
        };
        score = Math.floor(score * difficultyMultiplier[this.currentDifficulty]);
        
        return {
            total: Math.max(0, score),
            breakdown: breakdown,
            difficulty: this.currentDifficulty
        };
    },
    
    // 🎮 通知系统
    showNotification: function(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `game-notification ${type}`;
        notification.innerHTML = message.replace(/\n/g, '<br>');
        
        // 样式
        Object.assign(notification.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            padding: '15px 20px',
            borderRadius: '10px',
            color: 'white',
            fontWeight: 'bold',
            zIndex: '10000',
            maxWidth: '300px',
            animation: 'slideInRight 0.5s ease-out',
            boxShadow: '0 4px 15px rgba(0,0,0,0.3)'
        });
        
        // 不同类型的颜色
        const colors = {
            'info': '#3498db',
            'achievement': '#f39c12',
            'special': '#e74c3c',
            'warning': '#e67e22',
            'success': '#2ecc71'
        };
        notification.style.background = colors[type] || colors.info;
        
        document.body.appendChild(notification);
        
        // 自动移除
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.5s ease-in';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 500);
        }, 4000);
    },
    
    // 🎮 等级系统
    getCurrentRank: function() {
        const ranks = GAME_CONFIG.RANKS;
        for (let i = ranks.length - 1; i >= 0; i--) {
            if (this.totalScore >= ranks[i].minScore) {
                return ranks[i];
            }
        }
        return ranks[0];
    },
    
    getNextRank: function() {
        const currentRank = this.getCurrentRank();
        const ranks = GAME_CONFIG.RANKS;
        const currentIndex = ranks.findIndex(rank => rank.name === currentRank.name);
        return currentIndex < ranks.length - 1 ? ranks[currentIndex + 1] : null;
    },
    
    updateRankDisplay: function() {
        const currentRank = this.getCurrentRank();
        const nextRank = this.getNextRank();
        
        // 更新头部显示
        let rankDisplay = Utils.getElement('rank-display');
        if (!rankDisplay) {
            rankDisplay = document.createElement('div');
            rankDisplay.id = 'rank-display';
            rankDisplay.style.cssText = `
                position: fixed;
                top: 10px;
                left: 10px;
                background: rgba(0,0,0,0.8);
                color: white;
                padding: 10px 15px;
                border-radius: 20px;
                font-size: 14px;
                z-index: 1000;
                border: 2px solid ${currentRank.color};
            `;
            document.body.appendChild(rankDisplay);
        }
        
        rankDisplay.innerHTML = `
            <div style="color: ${currentRank.color}; font-weight: bold;">
                ${currentRank.name}
            </div>
            <div style="font-size: 12px;">
                总分: ${this.totalScore}
                ${nextRank ? ` | 距离${nextRank.name}: ${nextRank.minScore - this.totalScore}分` : ' | 已达最高等级'}
            </div>
        `;
    },
    
    // 🎮 音效系统
    playSound: function(soundType) {
        // 这里可以添加音效播放逻辑
        // 目前用简单的提示音代替
        if ('AudioContext' in window || 'webkitAudioContext' in window) {
            this.playBeep(soundType);
        }
    },
    
    playBeep: function(type) {
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            const frequencies = {
                'achievement': 800,
                'correct': 600,
                'wrong': 200,
                'xray': 400
            };
            
            oscillator.frequency.setValueAtTime(frequencies[type] || 400, audioContext.currentTime);
            oscillator.type = 'sine';
            
            gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.5);
        } catch (e) {
            // 音效播放失败，静默处理
        }
    },
    
    // 数据持久化
    savePlayerData: function() {
        localStorage.setItem('customsAchievements', JSON.stringify(this.achievements));
        localStorage.setItem('customsTotalScore', this.totalScore.toString());
        localStorage.setItem('customsCasesCompleted', this.totalCasesCompleted.toString());
    },
    
    loadPlayerData: function() {
        this.achievements = JSON.parse(localStorage.getItem('customsAchievements')) || {};
        this.totalScore = parseInt(localStorage.getItem('customsTotalScore')) || 0;
        this.totalCasesCompleted = parseInt(localStorage.getItem('customsCasesCompleted')) || 0;
    },
    
    // 重置游戏数据
    resetPlayerData: function() {
        if (confirm('确定要重置所有游戏数据吗？这将清除您的等级、成就和总分记录。')) {
            localStorage.removeItem('customsAchievements');
            localStorage.removeItem('customsTotalScore');
            localStorage.removeItem('customsCasesCompleted');
            this.achievements = {};
            this.totalScore = 0;
            this.totalCasesCompleted = 0;
            this.streakCount = 0;
            this.updateRankDisplay();
            this.showNotification('游戏数据已重置', 'info');
        }
    }
};