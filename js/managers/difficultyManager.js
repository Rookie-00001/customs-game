// 难度管理器
const DifficultyManager = {
    currentDifficulty: 'NORMAL',
    
    // 显示难度选择界面
    showDifficultySelection: function() {
        const overlay = document.createElement('div');
        overlay.id = 'difficulty-overlay';
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            backdrop-filter: blur(10px);
            z-index: 10000;
            display: flex;
            align-items: center;
            justify-content: center;
        `;

        const container = document.createElement('div');
        container.style.cssText = `
            text-align: center;
            color: white;
        `;

        const title = document.createElement('h2');
        title.textContent = '选择执法难度';
        title.style.cssText = `
            font-size: 32px;
            margin-bottom: 40px;
            color: #3498db;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
        `;

        const buttonContainer = document.createElement('div');
        buttonContainer.style.cssText = `
            display: flex;
            gap: 30px;
            justify-content: center;
            flex-wrap: wrap;
        `;

        // 创建难度按钮
        const difficulties = ['EASY', 'NORMAL', 'HARD'];
        const descriptions = [
            'EASY',
            'NORMAL',
            'HARD'
        ];

        difficulties.forEach((difficulty, index) => {
            const button = document.createElement('button');
            const config = GAME_CONFIG.DIFFICULTY[difficulty];
            
            button.innerHTML = `
                <div style="font-size: 18px; font-weight: bold; margin-bottom: 8px;">
                    ${config.name}
                </div>
                <div style="font-size: 14px; opacity: 0.8;">
                    ${descriptions[index]}
                </div>
            `;
            
            button.style.cssText = `
                background: transparent;
                border: 2px solid #3498db;
                color: white;
                padding: 20px 30px;
                border-radius: 12px;
                cursor: pointer;
                transition: all 0.3s ease;
                min-width: 200px;
                text-align: center;
            `;

            button.addEventListener('mouseenter', () => {
                button.style.background = 'rgba(52, 152, 219, 0.2)';
                button.style.transform = 'translateY(-5px)';
                button.style.boxShadow = '0 8px 25px rgba(52, 152, 219, 0.3)';
            });

            button.addEventListener('mouseleave', () => {
                button.style.background = 'transparent';
                button.style.transform = 'translateY(0)';
                button.style.boxShadow = 'none';
            });

            button.addEventListener('click', () => {
                this.selectDifficulty(difficulty);
                document.body.removeChild(overlay);
                this.startGame();
            });

            buttonContainer.appendChild(button);
        });

        container.appendChild(title);
        container.appendChild(buttonContainer);
        overlay.appendChild(container);
        document.body.appendChild(overlay);

        // 响应式处理
        this.handleResponsive(buttonContainer);
    },

    // 处理响应式布局
    handleResponsive: function(buttonContainer) {
        const updateLayout = () => {
            if (window.innerWidth <= 768) {
                buttonContainer.style.flexDirection = 'column';
                buttonContainer.style.alignItems = 'center';
                buttonContainer.style.gap = '20px';
                
                const buttons = buttonContainer.querySelectorAll('button');
                buttons.forEach(button => {
                    button.style.minWidth = '280px';
                    button.style.padding = '15px 20px';
                });
            } else {
                buttonContainer.style.flexDirection = 'row';
                buttonContainer.style.gap = '30px';
                
                const buttons = buttonContainer.querySelectorAll('button');
                buttons.forEach(button => {
                    button.style.minWidth = '200px';
                    button.style.padding = '20px 30px';
                });
            }
        };

        updateLayout();
        window.addEventListener('resize', updateLayout);
    },

    // 选择难度
    selectDifficulty: function(difficulty) {
        this.currentDifficulty = difficulty;
        console.log(`选择难度: ${GAME_CONFIG.DIFFICULTY[difficulty].name}`);
    },

    // 开始游戏
    startGame: function() {
        // 触发特殊事件检查
        SpecialEventManager.checkForSpecialEvent();
        
        // 重置游戏状态
        GameState.reset();
        
        // 根据难度选择案例
        this.selectCasesByDifficulty();
        
        // 显示游戏界面
        UIManager.showScreen('inspection-screen');
        
        // 显示header
        const headerBar = Utils.getElement('header-bar');
        if (headerBar) {
            headerBar.style.display = 'flex';
        }
        
        // 更新等级显示
        LevelManager.updateGameLevelDisplay();
        
        // 开始游戏
        CaseManager.loadNextCase();
        TimerManager.startCaseTimer();
    },

    // 根据难度选择案例
    selectCasesByDifficulty: function() {
        const difficulty = GAME_CONFIG.DIFFICULTY[this.currentDifficulty];
        
        if (difficulty.violationCases === null) {
            // 正常难度，使用原有随机选择
            CaseManager.selectRandomCases();
        } else {
            // 简单或困难难度，按指定比例选择
            this.selectCasesWithRatio(difficulty.violationCases, difficulty.normalCases);
        }
    },

    // 按比例选择案例
    selectCasesWithRatio: function(violationCount, normalCount) {
        console.log('开始选择案例...');
        
        try {
            if (!casesDatabase || casesDatabase.length === 0) {
                console.error('案例数据库为空或不存在');
                GameState.selectedCases = [];
                return;
            }

            // 分离正常案例和违禁品案例
            const normalCases = casesDatabase.filter(c => !c.hasViolation);
            const violationCases = casesDatabase.filter(c => c.hasViolation);

            console.log(`总案例数: ${casesDatabase.length}, 正常案例: ${normalCases.length}, 违禁案例: ${violationCases.length}`);

            // 检查是否有足够的案例
            if (normalCases.length < normalCount || violationCases.length < violationCount) {
                console.warn('案例数量不足，降级到随机选择');
                CaseManager.selectRandomCases();
                return;
            }

            // 随机选择指定数量的案例
            const selectedNormal = this.shuffleArray(normalCases).slice(0, normalCount);
            const selectedViolation = this.shuffleArray(violationCases).slice(0, violationCount);

            // 合并并随机打乱顺序
            const allSelected = [...selectedNormal, ...selectedViolation];
            GameState.selectedCases = this.shuffleArray(allSelected);

            // 确保总数为5
            if (GameState.selectedCases.length !== GAME_CONFIG.CASES_TO_PLAY) {
                console.warn(`案例数量不正确 (${GameState.selectedCases.length}/${GAME_CONFIG.CASES_TO_PLAY})，降级到随机选择`);
                CaseManager.selectRandomCases();
                return;
            }

            console.log(`已选择 ${GameState.selectedCases.length} 个案例 (正常:${normalCount}, 违禁:${violationCount})`);
            console.log('选中的案例:', GameState.selectedCases.map(c => `${c.passenger.name}(${c.hasViolation ? '违禁' : '正常'})`));

        } catch (error) {
            console.error('选择案例时发生错误:', error);
            CaseManager.selectRandomCases();
        }
    },

    // 洗牌算法
    shuffleArray: function(array) {
        const result = [...array];
        for (let i = result.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [result[i], result[j]] = [result[j], result[i]];
        }
        return result;
    }
};