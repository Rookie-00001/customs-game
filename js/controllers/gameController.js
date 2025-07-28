// 游戏控制器
const GameController = {
    init: function() {
        console.log('游戏控制器初始化...');
        this.setupEventListeners();
        this.showMainMenu();
    },

    setupEventListeners: function() {
        // 初始化事件监听器
    },

    showMainMenu: function() {
        UIManager.showScreen('main-menu');
        // 隐藏header
        const headerBar = Utils.getElement('header-bar');
        if (headerBar) {
            headerBar.style.display = 'none';
        }
        
        // 延迟更新等级显示，确保界面已切换
        setTimeout(() => {
            LevelManager.updateHomeLevelDisplay();
        }, 100);
        
        SpecialEventManager.resetEvent();
        // 停止计时器
        TimerManager.stopTimer();
    },

    startInspection: function() {
        console.log('启动检查任务');
        GameState.reset();
        UIManager.showScreen('inspection-screen');
        // 显示header
        const headerBar = Utils.getElement('header-bar');
        if (headerBar) {
            headerBar.style.display = 'flex';
        }
        
        // 延迟更新等级显示，确保界面已切换
        setTimeout(() => {
            LevelManager.updateGameLevelDisplay();
        }, 100);
        
        CaseManager.loadNextCase();
    },

    // 修改 showKnowledge 方法 - 解决问题1
    showKnowledge: function() {
        // 隐藏所有可能的模态框
        const resultModal = Utils.getElement('result-modal');
        if (resultModal) {
            resultModal.style.display = 'none';
        }
        
        // 重置状态 - 确保从结算界面进入知识界面时不显示返回游戏按钮
        GameState.fromPause = false;
        
        const returnGameBtn = Utils.getElement('return-game-btn');
        const isInGame = Utils.getElement('inspection-screen')?.classList.contains('active') || 
                        Utils.getElement('inspection-detail-screen')?.classList.contains('active');
        
        // 只有在游戏进行中且从暂停菜单进入时才显示返回游戏按钮
        if (isInGame && GameState.fromPause && returnGameBtn) {
            returnGameBtn.style.display = 'block';
        } else if (returnGameBtn) {
            returnGameBtn.style.display = 'none';
        }
        
        UIManager.showScreen('knowledge-screen');
    },

    showAbout: function() {
        alert('海关执法官：行李检查实战\n\n这是一个海关执法教育模拟系统，帮助了解海关检查流程和反走私知识。\n\n在游戏中，您将扮演海关执法人员，通过X光检查、询问旅客等方式识别违禁品和可疑行为。\n\n游戏纯属虚构，仅用于教育目的。\n\n全民反走私，你我齐参与！\n举报电话：12360');
    },

    returnToMainMenu: function() {
        // 隐藏所有可能的模态框
        const resultModal = Utils.getElement('result-modal');
        if (resultModal) {
            resultModal.style.display = 'none';
        }
        
        const pauseModal = Utils.getElement('pause-modal');
        if (pauseModal) {
            pauseModal.style.display = 'none';
        }
        
        this.showMainMenu();
        Utils.cleanupTimers();
        GameState.reset();
    },

    nextCase: function() {
        console.log('=== nextCase 被调用 ===');
        console.log('当前案例索引:', GameState.currentCase);
        console.log('总案例数:', GameState.selectedCases.length);
        
        // 隐藏结果模态框
        const resultModal = Utils.getElement('result-modal');
        if (resultModal) {
            resultModal.style.display = 'none';
        }
        
        // 恢复计时器
        TimerManager.resumeTimer();
        
        // 增加案例索引
        GameState.currentCase++;
        console.log('递增后的案例索引:', GameState.currentCase);
        
        // 检查是否还有更多案例
        if (GameState.currentCase >= GameState.selectedCases.length) {
            console.log('所有案例完成，准备显示最终结果');
            console.log(`完成案例: ${GameState.currentCase}/${GameState.selectedCases.length}`);
            GameResultManager.showFinalResults();
            return;
        }
        
        // 加载下一个案例
        console.log('加载下一个案例...');
        CaseManager.loadNextCase();
        
        console.log('=== nextCase 执行完成 ===');
    }
};
