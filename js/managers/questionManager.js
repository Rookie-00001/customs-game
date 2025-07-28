// 询问管理器
const QuestionManager = {
    askQuestion: function(questionType, isDetail = false) {
        if (!GameState.isXRayCompleted || GameState.isTimedOut || GameState.isPaused) return;
        if (GameState.questionsAsked.includes(questionType)) return;
        
        const currentCase = GameState.getCurrentCase();
        if (!currentCase) return;
        
        const responses = currentCase.passenger.responses[questionType];
        const response = Utils.getRandomResponse(responses);
        
        GameState.questionsAsked.push(questionType);
        
        this.disableQuestionButton(questionType);
        
        PassengerManager.showPassengerResponse(response, isDetail);
    },
    
    disableQuestionButton: function(questionType) {
        const questionBtn = Utils.getElement(`q-${questionType}`);
        const questionBtnDetail = Utils.getElement(`q-${questionType}-detail`);
        
        if (questionBtn) {
            questionBtn.disabled = true;
            questionBtn.style.background = '#7f8c8d';
        }
        if (questionBtnDetail) {
            questionBtnDetail.disabled = true;
            questionBtnDetail.style.background = '#7f8c8d';
        }
    }
};