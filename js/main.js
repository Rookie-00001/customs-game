// 主入口文件
(function() {
    'use strict';
    
    // 全局函数绑定
    window.startInspection = () => DifficultyManager.showDifficultySelection();
    window.showKnowledge = () => GameController.showKnowledge();
    window.showAbout = () => GameController.showAbout();
    window.returnToMainMenu = () => GameController.returnToMainMenu();
    window.nextCase = () => GameController.nextCase();
    
    window.performXRay = () => XRayManager.performXRay();
    window.askQuestion = (type) => QuestionManager.askQuestion(type, false);
    window.askQuestionDetail = (type) => QuestionManager.askQuestion(type, true);
    window.makeDecision = (decision) => DecisionManager.makeDecision(decision);
    window.makeFinalDecision = (decision) => DecisionManager.makeFinalDecision(decision);
    
    window.showPauseMenu = () => PauseManager.showPauseMenu();
    window.resumeGame = () => PauseManager.resumeGame();
    window.showKnowledgeFromPause = () => PauseManager.showKnowledgeFromPause();
    window.returnToMainMenuFromPause = () => PauseManager.returnToMainMenuFromPause();

    // 事件监听器

    // 移动端优化处理
    (function() {
        'use strict';
        
        // 检测移动设备
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        
        if (isMobile) {
            // 防止移动端缩放
            const viewport = document.querySelector('meta[name=viewport]');
            if (viewport) {
                viewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');
            }
            
            // 优化触摸滚动
            document.addEventListener('DOMContentLoaded', function() {
                // 为行为观察区域添加触摸滚动优化
                const behaviorSections = document.querySelectorAll('.behavior-section');
                behaviorSections.forEach(section => {
                    section.style.webkitOverflowScrolling = 'touch';
                    section.style.overflowScrolling = 'touch';
                });
                
                // 防止页面弹跳
                document.body.addEventListener('touchmove', function(e) {
                    if (e.target.closest('.behavior-section') || 
                        e.target.closest('.result-content') || 
                        e.target.closest('.knowledge-content')) {
                        // 允许这些区域滚动
                        return;
                    }
                    e.preventDefault();
                }, { passive: false });
                
                // 优化按钮点击响应
                const buttons = document.querySelectorAll('.question-btn, .tool-btn, .decision-btn, .luggage-item');
                buttons.forEach(button => {
                    button.addEventListener('touchstart', function() {
                        this.style.transform = 'scale(0.95)';
                    }, { passive: true });
                    
                    button.addEventListener('touchend', function() {
                        setTimeout(() => {
                            this.style.transform = '';
                        }, 100);
                    }, { passive: true });
                });
            });
            
            // 移动端键盘弹出处理
            window.addEventListener('resize', function() {
                // 强制重新计算视口高度
                const vh = window.innerHeight * 0.01;
                document.documentElement.style.setProperty('--vh', `${vh}px`);
            });
            
            // 初始化视口高度
            const vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
        }
    })();

    // 在main.js中添加重新开始函数
    window.restartGame = function() {
        // 隐藏结算界面
        const resultModal = Utils.getElement('result-modal');
        if (resultModal) {
            resultModal.style.display = 'none';
        }
        
        // 显示难度选择
        DifficultyManager.showDifficultySelection();
    };


    document.addEventListener('DOMContentLoaded', function() {
        GameController.init();
        LevelManager.init();
    });

    document.addEventListener('keydown', function(e) {
        const isInGame = Utils.getElement('inspection-screen')?.classList.contains('active') || 
                        Utils.getElement('inspection-detail-screen')?.classList.contains('active');
        
        if (isInGame) {
            switch(e.key) {
                case 'Escape':
                    if (!GameState.isPaused) {
                        PauseManager.showPauseMenu();
                    }
                    break;
                case ' ':
                    e.preventDefault();
                    if (GameState.isPaused) {
                        PauseManager.resumeGame();
                    } else {
                        PauseManager.showPauseMenu();
                    }
                    break;
                case '1':
                    if (!GameState.isPaused && GameState.workflowStep === 'xray') {
                        XRayManager.performXRay();
                    }
                    break;
                case '2':
                    if (!GameState.isPaused && GameState.workflowStep === 'decision') {
                        DecisionManager.makeDecision('pass');
                    }
                    break;
                case '3':
                    if (!GameState.isPaused && GameState.workflowStep === 'decision') {
                        DecisionManager.makeDecision('inspect');
                    }
                    break;
            }
        }
    });

    window.addEventListener('beforeunload', function(e) {
        const isInGame = GameState.currentCase > 0 && 
                        (Utils.getElement('inspection-screen')?.classList.contains('active') || 
                         Utils.getElement('inspection-detail-screen')?.classList.contains('active'));
        
        if (isInGame) {
            e.preventDefault();
            e.returnValue = '';
        }
    });

    window.addEventListener('beforeunload', function() {
        Utils.cleanupTimers();
    });

    // 移动端触摸优化
    if ('ontouchstart' in window) {
        document.addEventListener('touchstart', function() {}, { passive: true });
        
        document.addEventListener('touchmove', function(e) {
            if (e.target.closest('.luggage-item')) {
                e.preventDefault();
            }
        }, { passive: false });
    }

    // 错误处理
    window.addEventListener('error', function(e) {
        console.error('游戏运行错误:', e.error);
    });

    window.addEventListener('load', function() {
        console.log('游戏加载完成');
    });
})();
