// 特殊事件管理器
const SpecialEventManager = {
    currentEvent: null,

    // 在游戏开始时检查是否触发特殊事件（只调用一次）
    checkForSpecialEventAtGameStart: function() {
        this.currentEvent = null;
        
        // 遍历所有特殊事件，根据概率触发
        const events = Object.keys(GAME_CONFIG.SPECIAL_EVENTS);
        
        for (const eventKey of events) {
            const event = GAME_CONFIG.SPECIAL_EVENTS[eventKey];
            if (Math.random() < event.probability) {
                this.triggerEvent(eventKey, event);
                break; // 一次只触发一个事件
            }
        }
        
        console.log('游戏开始时特殊事件检查完成，当前事件:', this.currentEvent);
    },

    // 保留原方法作为备用
    checkForSpecialEvent: function() {
        // 这个方法现在只是返回当前事件，不再重新检查
        console.log('检查当前特殊事件:', this.currentEvent);
        return this.currentEvent;
    },

    // 触发特殊事件
    triggerEvent: function(eventKey, event) {
        this.currentEvent = eventKey;
        console.log(`触发特殊事件: ${event.name}`);
        
        // 显示事件通知
        this.showEventNotification(event);
        
        // 应用事件效果
        this.applyEventEffect(eventKey, event);
    },

    // 显示事件通知
    showEventNotification: function(event) {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: linear-gradient(135deg, #e74c3c, #c0392b);
            color: white;
            padding: 15px 25px;
            border-radius: 25px;
            font-size: 16px;
            font-weight: bold;
            z-index: 9999;
            box-shadow: 0 4px 20px rgba(231, 76, 60, 0.4);
            animation: eventNotificationSlide 0.5s ease-out;
            text-align: center;
            max-width: 90%;
        `;

        notification.innerHTML = `
            <div style="font-size: 18px; margin-bottom: 5px;">⚡ ${event.name}</div>
            <div style="font-size: 14px; opacity: 0.9;">${event.description}</div>
        `;

        // 添加动画样式
        const style = document.createElement('style');
        style.textContent = `
            @keyframes eventNotificationSlide {
                from {
                    transform: translateX(-50%) translateY(-100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(-50%) translateY(0);
                    opacity: 1;
                }
            }
        `;
        document.head.appendChild(style);

        document.body.appendChild(notification);

        // 3秒后移除通知
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.animation = 'eventNotificationSlide 0.5s ease-in reverse';
                setTimeout(() => {
                    if (notification.parentNode) {
                        notification.parentNode.removeChild(notification);
                    }
                }, 500);
            }
        }, 3000);
    },

    // 应用事件效果
    applyEventEffect: function(eventKey, event) {
        switch (eventKey) {
            case 'RUSH_HOUR':
                this.applyTimeReduction();
                break;
            case 'VIP_CUSTOMER':
                this.applyVIPStatus();
                break;
            case 'ENHANCED_INSPECTION':
                this.applyEnhancedCheck();
                break;
            case 'BOMB_THREAT':
                this.applyBombThreat();
                break;
            case 'SYSTEM_UPGRADE':
                this.applySystemUpgrade();
                break;
            // 保留旧的事件ID兼容性
            case 'timeReduced':
                this.applyTimeReduction();
                break;
            case 'vipCustomer':
                this.applyVIPStatus();
                break;
            case 'enhancedInspection':
                this.applyEnhancedCheck();
                break;
        }
    },

    // 应用时间减少效果（高峰时段）
    applyTimeReduction: function() {
        console.log('高峰时段事件：时间将被减少到20秒');
    },

    // 应用VIP状态效果
    applyVIPStatus: function() {
        console.log('VIP客户事件：时间将被减少到25秒，正确执法获得0.5分奖励');
    },

    // 应用加强检查效果
    applyEnhancedCheck: function() {
        console.log('加强检查事件：时间将被延长到45秒，完美执法获得额外1分奖励');
    },

    // 应用爆炸威胁效果
    applyBombThreat: function() {
        console.log('爆炸威胁事件：时间将被大幅减少到15秒，完成任务获得2分奖励');
    },

    // 应用系统升级效果
    applySystemUpgrade: function() {
        console.log('系统升级事件：时间将被增加到35秒，获得0.5分奖励');
    },

    // 获取当前事件信息
    getCurrentEventInfo: function() {
        if (!this.currentEvent) return null;
        
        const event = GAME_CONFIG.SPECIAL_EVENTS[this.currentEvent];
        if (!event) {
            console.warn('找不到特殊事件配置:', this.currentEvent);
            return null;
        }
        
        return {
            id: this.currentEvent,
            key: this.currentEvent,
            name: event.name,
            description: event.description,
            ...event
        };
    },

    // 重置事件状态
    resetEvent: function() {
        this.currentEvent = null;
        console.log('特殊事件已重置');
    }
};