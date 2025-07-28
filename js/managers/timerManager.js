// 计时器管理器
const TimerManager = {
    startCaseTimer: function() {
        // 检查是否有特殊事件影响时间
        const currentEvent = SpecialEventManager.getCurrentEventInfo();
        let timeLimit = GAME_CONFIG.TIME_LIMIT;
        
        console.log('计时器启动 - 检查特殊事件:', currentEvent);
        
        if (currentEvent) {
            switch(currentEvent.id) {
                case 'RUSH_HOUR':
                    timeLimit = 20; // 高峰时段：时间减少10秒，从30秒变为20秒
                    console.log('特殊事件生效：高峰时段 - 时间减少到20秒');
                    break;
                case 'VIP_CUSTOMER':
                case 'VIP_PASSENGER':
                    timeLimit = 25; // VIP客户/旅客：时间略微紧张，减少5秒
                    console.log('特殊事件生效：VIP旅客 - 时间减少到25秒');
                    break;
                case 'ENHANCED_INSPECTION':
                    timeLimit = 45; // 加强检查：增加15秒时间
                    console.log('特殊事件生效：加强检查 - 时间增加到45秒');
                    break;
                case 'BOMB_THREAT':
                    timeLimit = 15; // 爆炸威胁：极度紧急，时间大幅减少
                    console.log('特殊事件生效：爆炸威胁 - 时间减少到15秒');
                    break;
                case 'SYSTEM_UPGRADE':
                    timeLimit = 35; // 系统升级：时间稍微增加
                    console.log('特殊事件生效：系统升级 - 时间增加到35秒');
                    break;
                case 'RANDOM_CHECK':
                    timeLimit = 50; // 随机检查：上级要求加强检查，时间增加
                    console.log('特殊事件生效：随机检查 - 时间增加到50秒');
                    break;
                case 'NIGHT_SHIFT':
                    timeLimit = 35; // 夜班：相对宽松，时间稍微增加
                    console.log('特殊事件生效：夜班 - 时间增加到35秒');
                    break;
                case 'EMERGENCY_DRILL':
                    timeLimit = 25; // 应急演练：时间稍微紧张
                    console.log('特殊事件生效：应急演练 - 时间减少到25秒');
                    break;
                case 'HOLIDAY_TRAVEL':
                    timeLimit = 20; // 节假日出行：人流量大，时间紧张
                    console.log('特殊事件生效：节假日出行 - 时间减少到20秒');
                    break;
                case 'STAFF_TRAINING':
                    timeLimit = 40; // 员工培训：新手上岗，时间充裕
                    console.log('特殊事件生效：员工培训 - 时间保持40秒');
                    break;
                // 保留旧的事件ID兼容性
                case 'timeReduced':
                    timeLimit = 20; // 时间减少10秒：从30秒变为20秒
                    console.log('特殊事件生效：紧急安检 - 时间减少到20秒');
                    break;
                case 'enhancedInspection':
                    timeLimit = 45; // 加强检查：增加15秒时间
                    console.log('特殊事件生效：加强检查 - 时间增加到45秒');
                    break;
                case 'vipCustomer':
                    timeLimit = 25; // VIP客户：时间略微紧张，减少5秒
                    console.log('特殊事件生效：VIP客户 - 时间减少到25秒');
                    break;
                default:
                    console.log('未知特殊事件:', currentEvent.id, '使用默认时间');
                    timeLimit = GAME_CONFIG.TIME_LIMIT;
                    break;
            }
        } else {
            console.log('无特殊事件，使用默认时间:', timeLimit);
        }
        
        // 在界面上显示时间变化提示
        if (currentEvent && timeLimit !== GAME_CONFIG.TIME_LIMIT) {
            this.showTimeChangeNotification(timeLimit, currentEvent);
        }
        
        this.startCaseTimerWithTime(timeLimit);
    },
    
    // 新增：显示时间变化通知
    showTimeChangeNotification: function(newTimeLimit, event) {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 80px;
            right: 20px;
            background: rgba(52, 152, 219, 0.9);
            color: white;
            padding: 10px 15px;
            border-radius: 15px;
            font-size: 14px;
            font-weight: bold;
            z-index: 9998;
            animation: slideInRight 0.5s ease-out;
        `;
        
        notification.innerHTML = `
            🕐 ${event.name}<br>
            检查时间：${newTimeLimit}秒
        `;
        
        // 添加动画样式
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideInRight {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
        `;
        document.head.appendChild(style);
        
        document.body.appendChild(notification);
        
        // 2秒后移除通知
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.animation = 'slideInRight 0.5s ease-in reverse';
                setTimeout(() => {
                    if (notification.parentNode) {
                        notification.parentNode.removeChild(notification);
                    }
                }, 500);
            }
        }, 2000);
    },
    
    startCaseTimerWithTime: function(seconds) {
        console.log('实际启动计时器，时间:', seconds, '秒');
        GameState.currentTimeLeft = seconds;
        this.updateCaseTimer(GameState.currentTimeLeft);
        
        // 清理之前的计时器
        if (GameState.timer) {
            clearInterval(GameState.timer);
        }
        
        GameState.timer = setInterval(() => {
            if (GameState.isPaused) {
                return;
            }
            
            GameState.currentTimeLeft--;
            this.updateCaseTimer(GameState.currentTimeLeft);
            
            if (GameState.currentTimeLeft <= 0) {
                clearInterval(GameState.timer);
                this.handleTimeout();
            }
        }, 1000);
    },
    
    handleTimeout: function() {
        if (GameState.isPaused) return;
        
        // 检查当前案例是否有效
        if (!GameState.isValidCase()) {
            console.warn('时间到时当前案例无效，跳过处理');
            return;
        }
        
        console.log('时间到！自动判断为放行');
        GameState.isTimedOut = true;
        
        document.querySelectorAll('.tool-btn, .question-btn, .decision-btn').forEach(btn => {
            btn.disabled = true;
            btn.style.opacity = '0.5';
            btn.style.cursor = 'not-allowed';
        });
        
        Utils.cleanupTimers();
        const xrayView = Utils.getElement('x-ray-view');
        if (xrayView) xrayView.classList.remove('active');
        
        // 延迟执行，给UI时间更新
        setTimeout(() => {
            if (GameState.isValidCase()) {
                DecisionManager.processDecision('pass'); // 超时默认放行
            }
        }, 500);
    },
    
    updateCaseTimer: function(seconds) {
        const timerElement = Utils.getElement('case-timer');
        if (timerElement) {
            timerElement.textContent = Utils.formatTime(seconds);
            
            if (seconds <= 10) {
                timerElement.style.color = '#e74c3c';
                timerElement.style.animation = 'urgentBlink 1s infinite';
            } else if (seconds <= 20) {
                timerElement.style.color = '#f39c12';
                timerElement.style.animation = 'none';
            } else {
                timerElement.style.color = 'white';
                timerElement.style.animation = 'none';
            }
        }
    },
    
    // 暂停计时器
    pauseTimer: function() {
        GameState.isPaused = true;
    },
    
    // 恢复计时器
    resumeTimer: function() {
        GameState.isPaused = false;
    },
    
    // 停止计时器
    stopTimer: function() {
        if (GameState.timer) {
            clearInterval(GameState.timer);
            GameState.timer = null;
        }
        if (GameState.xrayTimer) {
            clearInterval(GameState.xrayTimer);
            GameState.xrayTimer = null;
        }
    }
};