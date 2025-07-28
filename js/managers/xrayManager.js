// X光检查管理器
const XRayManager = {
    performXRay: function() {
        if (GameState.workflowStep !== 'xray' || GameState.isTimedOut || GameState.isPaused) return;
        
        const xrayBtn = Utils.getElement('xray-btn');
        const scannerOverlay = Utils.getElement('scanner-overlay');
        const xrayView = Utils.getElement('x-ray-view');
        
        if (xrayBtn) {
            xrayBtn.disabled = true;
            xrayBtn.textContent = '📡 扫描中...';
        }
        
        if (scannerOverlay) scannerOverlay.style.display = 'block';
        
        setTimeout(() => {
            if (GameState.isTimedOut || GameState.isPaused) return;
            
            this.completeXRayInspection(xrayBtn, scannerOverlay, xrayView);
        }, GAME_CONFIG.TIMING.XRAY_DURATION);
    },
    
    completeXRayInspection: function(xrayBtn, scannerOverlay, xrayView) {
        if (scannerOverlay) scannerOverlay.style.display = 'none';
        if (xrayView) xrayView.classList.add('active');
        
        if (xrayBtn) {
            xrayBtn.classList.add('active');
            xrayBtn.textContent = '📡 X光检查中...';
        }
        
        GameState.isXRayCompleted = true;
        GameState.workflowStep = 'decision';
        WorkflowManager.updateStatus();
        
        this.enableInteractions();
        
        GameState.xrayTimer = setTimeout(() => {
            if (!GameState.isTimedOut && !GameState.isPaused && xrayView) {
                xrayView.classList.remove('active');
                if (xrayBtn) {
                    xrayBtn.classList.remove('active');
                    xrayBtn.textContent = '📡 X光已完成';
                }
            }
        }, GAME_CONFIG.TIMING.XRAY_DISPLAY);
    },
    
    enableInteractions: function() {
        document.querySelectorAll('.question-btn').forEach(btn => {
            btn.disabled = false;
            btn.style.background = 'linear-gradient(45deg, #3498db, #2980b9)';
        });
        
        const passBtn = Utils.getElement('pass-btn');
        const inspectBtn = Utils.getElement('inspect-btn');
        if (passBtn) passBtn.disabled = false;
        if (inspectBtn) inspectBtn.disabled = false;
    }
};