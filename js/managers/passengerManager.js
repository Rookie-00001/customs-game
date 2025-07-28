// 旅客管理器
const PassengerManager = {
    loadPassengerInfo: function(passenger) {
        Utils.getElement('passenger-avatar').innerHTML = `
            ${passenger.avatar}
            <div class="speech-bubble" id="speech-bubble">
            </div>
        `;
        Utils.getElement('passenger-name').textContent = passenger.name;
        Utils.getElement('passenger-from').textContent = `来自：${passenger.from}`;
        
        Utils.getElement('passenger-avatar-detail').innerHTML = `
            ${passenger.avatar}
            <div class="speech-bubble" id="speech-bubble-detail">
            </div>
        `;
        Utils.getElement('passenger-name-detail').textContent = passenger.name;
        Utils.getElement('passenger-from-detail').textContent = `来自：${passenger.from}`;
        
        this.updateNervousness(passenger.baseNervousness);
        this.loadBehaviors(passenger.behaviors);
        this.resetQuestionButtons();
        this.hideSpeechBubbles();
    },
    
    loadBehaviors: function(behaviors) {
        const behaviorList = Utils.getElement('behavior-list');
        const behaviorListDetail = Utils.getElement('behavior-list-detail');
        if (behaviorList) behaviorList.innerHTML = '';
        if (behaviorListDetail) behaviorListDetail.innerHTML = '';
        
        behaviors.forEach((behavior, index) => {
            setTimeout(() => {
                this.addBehaviorItem(behavior, behaviorList, behaviorListDetail);
            }, index * GAME_CONFIG.TIMING.BEHAVIOR_ANIMATION_DELAY);
        });
    },
    
    addBehaviorItem: function(behavior, list1, list2) {
        const behaviorItem = document.createElement('div');
        behaviorItem.className = `behavior-item ${behavior.type}`;
        behaviorItem.textContent = behavior.text;
        
        if (list1) list1.appendChild(behaviorItem);
        if (list2) {
            const behaviorItemDetail = behaviorItem.cloneNode(true);
            list2.appendChild(behaviorItemDetail);
        }
    },
    
    resetQuestionButtons: function() {
        document.querySelectorAll('.question-btn').forEach(btn => {
            btn.disabled = true;
            btn.style.background = '#7f8c8d';
        });
    },
    
    hideSpeechBubbles: function() {
        Utils.getElement('speech-bubble')?.classList.remove('show');
        Utils.getElement('speech-bubble-detail')?.classList.remove('show');
    },
    
    updateNervousness: function(level) {
        GameState.currentNervousness = Math.max(0, Math.min(100, level));
        
        const elements = ['nervousness-fill', 'nervousness-fill-detail'];
        const levelElements = ['nervousness-level', 'nervousness-level-detail'];
        const avatarElements = ['passenger-avatar', 'passenger-avatar-detail'];
        
        elements.forEach(id => {
            const element = Utils.getElement(id);
            if (element) {
                element.style.width = GameState.currentNervousness + '%';
            }
        });
        
        const levelText = this.getNervousnessText(GameState.currentNervousness);
        levelElements.forEach(id => {
            const element = Utils.getElement(id);
            if (element) {
                element.textContent = levelText;
            }
        });
        
        const colors = this.getNervousnessColors(GameState.currentNervousness);
        avatarElements.forEach(id => {
            const element = Utils.getElement(id);
            if (element) {
                element.style.background = colors.bg;
                element.style.borderColor = colors.border;
            }
        });
    },
    
    getNervousnessText: function(level) {
        if (level <= 30) return '正常';
        if (level <= 60) return '有些紧张';
        if (level <= 80) return '明显紧张';
        return '极度紧张';
    },
    
    getNervousnessColors: function(level) {
        if (level > 70) {
            return { bg: '#ffcdd2', border: '#e74c3c' };
        }
        if (level > 40) {
            return { bg: '#fff3e0', border: '#f39c12' };
        }
        return { bg: '#e8f5e8', border: '#27ae60' };
    },
    
    showPassengerResponse: function(response, isDetail = false) {
        const bubbleId = isDetail ? 'speech-bubble-detail' : 'speech-bubble';
        const speechBubble = Utils.getElement(bubbleId);
        
        if (speechBubble) {
            speechBubble.textContent = response.answer;
            speechBubble.classList.add('show');
            
            setTimeout(() => {
                speechBubble.classList.remove('show');
            }, GAME_CONFIG.TIMING.SPEECH_DURATION);
        }
        
        this.updateNervousness(GameState.currentNervousness + response.nervousChange);
        
        if (response.nervousChange > 10) {
            this.addNervousBehavior(response.nervousChange);
        }
    },
    
    addNervousBehavior: function(nervousChange) {
        setTimeout(() => {
            const behaviorList = Utils.getElement('behavior-list');
            const behaviorListDetail = Utils.getElement('behavior-list-detail');
            
            const existingBehaviors = behaviorList?.querySelectorAll('.behavior-item') || [];
            let hasNervousBehavior = false;
            
            existingBehaviors.forEach(item => {
                const text = item.textContent;
                if (text.includes('紧张') || text.includes('犹豫') || text.includes('不安') || text.includes('回答异常')) {
                    hasNervousBehavior = true;
                }
            });
            
            if (!hasNervousBehavior) {
                let behaviorText;
                if (nervousChange > 25) {
                    behaviorText = '回答时极度紧张';
                } else if (nervousChange > 15) {
                    behaviorText = '回答时明显紧张';
                } else {
                    behaviorText = '回答时有些犹豫';
                }
                
                const behavior = { text: behaviorText, type: 'suspicious' };
                this.addBehaviorItem(behavior, behaviorList, behaviorListDetail);
            }
        }, 1000);
    }
};