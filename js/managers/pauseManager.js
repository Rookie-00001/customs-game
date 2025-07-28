// 暂停管理器
const PauseManager = {
    showPauseMenu: function() {
        if (GameState.isPaused) return;
        
        GameState.isPaused = true;
        
        if (GameState.timer) {
            clearInterval(GameState.timer);
        }
        
        if (GameState.xrayTimer) {
            clearTimeout(GameState.xrayTimer);
        }
        
        const pauseModal = Utils.getElement('pause-modal');
        if (pauseModal) pauseModal.style.display = 'flex';
    },
    
    resumeGame: function() {
        if (!GameState.isPaused) return;
        
        GameState.isPaused = false;
        GameState.fromPause = false;
        
        const pauseModal = Utils.getElement('pause-modal');
        const returnGameBtn = Utils.getElement('return-game-btn');
        if (pauseModal) pauseModal.style.display = 'none';
        if (returnGameBtn) returnGameBtn.style.display = 'none';
        
        if (GameState.isInspecting) {
            UIManager.showScreen('inspection-detail-screen');
        } else {
            UIManager.showScreen('inspection-screen');
        }
        
        if (GameState.currentTimeLeft > 0 && !GameState.isTimedOut) {
            TimerManager.startCaseTimerWithTime(GameState.currentTimeLeft);
        }
    },
    
    showKnowledgeFromPause: function() {
        GameState.fromPause = true;
        const pauseModal = Utils.getElement('pause-modal');
        const returnGameBtn = Utils.getElement('return-game-btn');
        if (pauseModal) pauseModal.style.display = 'none';
        if (returnGameBtn) returnGameBtn.style.display = 'inline-block';
        UIManager.showScreen('knowledge-screen');
    },
    
    // 修改返回主菜单方法 - 解决问题2
    returnToMainMenuFromPause: function() {
        const pauseModal = Utils.getElement('pause-modal');
        const headerBar = Utils.getElement('header-bar');
        if (pauseModal) pauseModal.style.display = 'none';
        if (headerBar) headerBar.style.display = 'none';
        
        // 重置暂停状态
        GameState.isPaused = false;
        GameState.fromPause = false;
        
        UIManager.showScreen('main-menu');
        GameState.reset();
        UIManager.updateStats();
    },
    
    // 添加新方法处理从暂停界面重新开始游戏 - 解决问题2
    restartGameFromPause: function() {
        const pauseModal = Utils.getElement('pause-modal');
        if (pauseModal) pauseModal.style.display = 'none';
        
        // 重置所有状态
        GameState.isPaused = false;
        GameState.fromPause = false;
        GameState.reset();
        
        // 调用重新开始游戏
        if (typeof restartGame === 'function') {
            restartGame();
        } else if (typeof DifficultyManager !== 'undefined' && DifficultyManager.showDifficultySelection) {
            DifficultyManager.showDifficultySelection();
        } else if (typeof startInspection === 'function') {
            startInspection();
        }
    }
};