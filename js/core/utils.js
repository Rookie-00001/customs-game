// 实用工具函数
const Utils = {
    getRandomResponse: function(responses) {
        const answers = responses.answers;
        return answers[Math.floor(Math.random() * answers.length)];
    },
    
    getElement: function(id) {
        const element = document.getElementById(id);
        if (!element) {
            console.warn(`元素 ${id} 不存在`);
        }
        return element;
    },

    shuffle: function(array) {
        const result = [...array];
        for (let i = result.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [result[i], result[j]] = [result[j], result[i]];
        }
        return result;
    },
    
    formatTime: function(seconds) {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    },
    
    cleanupTimers: function() {
        if (GameState.timer) {
            clearInterval(GameState.timer);
            GameState.timer = null;
        }
        if (GameState.xrayTimer) {
            clearTimeout(GameState.xrayTimer);
            GameState.xrayTimer = null;
        }
    },
    
    // 在Utils对象中添加清理函数
    cleanupLevelDisplays: function() {
        // 清理可能存在的等级显示元素
        const existingHomeLevel = document.getElementById('home-level-display');
        if (existingHomeLevel) {
            existingHomeLevel.remove();
        }
        
        const existingGameLevel = document.getElementById('game-level-display');
        if (existingGameLevel) {
            existingGameLevel.remove();
        }
    }
};