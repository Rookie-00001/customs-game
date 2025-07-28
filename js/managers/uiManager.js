// UI管理器
const UIManager = {
    showScreen: function(screenId) {
        // 清理等级显示元素
        Utils.cleanupLevelDisplays();
        
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });
        const screen = Utils.getElement(screenId);
        if (screen) {
            screen.classList.add('active');
        }
    },
    
    resetTools: function() {
        const xrayBtn = Utils.getElement('xray-btn');
        if (xrayBtn) {
            xrayBtn.classList.remove('active');
            xrayBtn.textContent = '📡 X光检查';
            xrayBtn.disabled = false;
            xrayBtn.style.opacity = '1';
            xrayBtn.style.cursor = 'pointer';
        }
        
        const passBtn = Utils.getElement('pass-btn');
        const inspectBtn = Utils.getElement('inspect-btn');
        if (passBtn) {
            passBtn.disabled = true;
            passBtn.style.opacity = '1';
            passBtn.style.cursor = 'pointer';
        }
        if (inspectBtn) {
            inspectBtn.disabled = true;
            inspectBtn.style.opacity = '1';
            inspectBtn.style.cursor = 'pointer';
        }
        
        document.querySelectorAll('.question-btn').forEach(btn => {
            btn.style.opacity = '1';
            btn.style.cursor = 'pointer';
        });
        
        const xrayView = Utils.getElement('x-ray-view');
        const luggageBox = Utils.getElement('luggage-box');
        if (xrayView) xrayView.classList.remove('active');
        if (luggageBox) luggageBox.classList.remove('opened');
        
        const luggageLid = Utils.getElement('luggage-lid');
        if (luggageLid) luggageLid.style.display = 'flex';
    },
    
    updateStats: function() {
        const correctChecks = Utils.getElement('correct-checks');
        const missedItems = Utils.getElement('missed-items');
        const accuracy = Utils.getElement('accuracy');
        
        if (correctChecks) correctChecks.textContent = GameState.correctChecks;
        if (missedItems) missedItems.textContent = GameState.missedItems;
        
        if (accuracy) {
            const accuracyValue = GameState.totalCases > 0 ? 
                Math.round((GameState.correctChecks / GameState.totalCases) * 100) : 100;
            accuracy.textContent = accuracyValue + '%';
        }
    }
};