// 工作流管理器
const WorkflowManager = {
    updateStatus: function() {
        document.querySelectorAll('.progress-step').forEach(step => {
            step.classList.remove('active', 'completed');
            const icon = step.querySelector('.progress-icon');
            if (icon && !icon.textContent.includes('✓')) {
                this.resetStepIcon(step.id, icon);
            }
        });
        
        this.setCompletedSteps();
        this.setActiveStep();
    },
    
    resetStepIcon: function(stepId, icon) {
        const stepNum = stepId.split('-')[1];
        switch(stepNum) {
            case 'xray': icon.textContent = '1'; break;
            case 'decision': icon.textContent = '2'; break;
            case 'inspect': icon.textContent = '3'; break;
            case 'final': icon.textContent = '4'; break;
        }
    },
    
    setCompletedSteps: function() {
        if (GameState.isXRayCompleted) {
            this.markStepCompleted('step-xray');
        }
        if (GameState.workflowStep === 'inspect' || GameState.workflowStep === 'final') {
            this.markStepCompleted('step-decision');
        }
        if (GameState.isInspecting) {
            this.markStepCompleted('step-inspect');
        }
    },
    
    markStepCompleted: function(stepId) {
        const step = Utils.getElement(stepId);
        if (step) {
            step.classList.add('completed');
            const icon = step.querySelector('.progress-icon');
            if (icon) icon.textContent = '✓';
        }
    },
    
    setActiveStep: function() {
        const stepMap = {
            'xray': 'step-xray',
            'decision': 'step-decision',
            'inspect': 'step-inspect',
            'final': 'step-final'
        };
        
        const activeStepId = stepMap[GameState.workflowStep];
        if (activeStepId) {
            const step = Utils.getElement(activeStepId);
            if (step) {
                step.classList.add('active');
                if (GameState.workflowStep === 'final') {
                    const icon = step.querySelector('.progress-icon');
                    if (icon) icon.textContent = '✓';
                }
            }
        }
    }
};