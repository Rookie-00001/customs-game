// 游戏状态管理
const GameState = {
    // 基础状态
    currentCase: 0,
    correctChecks: 0,
    missedItems: 0,
    totalCases: GAME_CONFIG.CASES_TO_PLAY, // 确保设置为5
    selectedCases: [],
    casesToPlay: GAME_CONFIG.CASES_TO_PLAY,
    
    // 游戏流程状态
    isXRayCompleted: false,
    isInspecting: false,
    selectedItems: [],
    workflowStep: 'xray',
    
    // 计时逻辑
    caseStartTime: null,
    timeLimit: GAME_CONFIG.TIME_LIMIT,
    timer: null,
    xrayTimer: null,
    isTimedOut: false,
    currentTimeLeft: GAME_CONFIG.TIME_LIMIT,
    isPaused: false,
    
    // 交互状态
    questionsAsked: [],
    currentNervousness: 30,
    fromPause: false,
    
    // 评分系统
    caseScores: [],
    totalScore: 0,
    
    // 重置方法
    reset: function() {
        console.log('重置游戏状态...');
        this.currentCase = 0;
        this.correctChecks = 0;
        this.missedItems = 0;
        this.totalCases = GAME_CONFIG.CASES_TO_PLAY; // 确保重置为5
        this.selectedCases = [];
        this.casesToPlay = GAME_CONFIG.CASES_TO_PLAY; // 确保重置为5
        
        this.isXRayCompleted = false;
        this.isInspecting = false;
        this.selectedItems = [];
        this.workflowStep = 'xray';
        
        this.caseStartTime = null;
        this.timer = null;
        this.xrayTimer = null;
        this.isTimedOut = false;
        this.currentTimeLeft = GAME_CONFIG.TIME_LIMIT;
        this.isPaused = false;
        
        this.questionsAsked = [];
        this.currentNervousness = 30;
        this.fromPause = false;
        
        this.caseScores = [];
        this.totalScore = 0;
        
        // 清理计时器
        Utils.cleanupTimers();
    },
    
    // 验证当前案例是否有效
    isValidCase: function() {
        return this.currentCase >= 0 && 
               this.currentCase < this.selectedCases.length && 
               this.selectedCases[this.currentCase] &&
               this.selectedCases.length > 0;
    },
    
    // 获取当前案例
    getCurrentCase: function() {
        if (this.isValidCase()) {
            return this.selectedCases[this.currentCase];
        }
        console.warn('getCurrentCase: 当前案例无效', {
            currentCase: this.currentCase,
            selectedCasesLength: this.selectedCases.length,
            hasCurrentCase: !!this.selectedCases[this.currentCase]
        });
        return null;
    },
    
    // 精确数值处理
    roundScore: function(score) {
        return Math.round(score * 10) / 10;
    }
};
