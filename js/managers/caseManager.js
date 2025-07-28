// 案例管理器
const CaseManager = {
    selectRandomCases: function() {
        console.log('开始选择案例...');
        
        try {
            // 检查案例数据库是否存在且有数据
            if (!casesDatabase || casesDatabase.length === 0) {
                console.error('案例数据库为空或不存在');
                GameState.selectedCases = [];
                return;
            }
            
            // 分离正常案例和违禁品案例
            const normalCases = casesDatabase.filter(c => !c.hasViolation);
            const violationCases = casesDatabase.filter(c => c.hasViolation);
            
            console.log(`总案例数: ${casesDatabase.length}, 正常案例: ${normalCases.length}, 违禁案例: ${violationCases.length}`);
            
            // 检查是否有足够的案例
            if (normalCases.length === 0 || violationCases.length === 0) {
                console.warn('正常案例或违禁案例数量不足，使用完全随机选择');
                // 降级到完全随机选择
                const shuffled = Utils.shuffle(casesDatabase);
                GameState.selectedCases = shuffled.slice(0, Math.min(GAME_CONFIG.CASES_TO_PLAY, casesDatabase.length));
                console.log(`已选择 ${GameState.selectedCases.length} 个案例（完全随机模式）`);
                return;
            }
            
            // 计算平衡的案例数量
            const totalCases = GAME_CONFIG.CASES_TO_PLAY; // 固定为5
            
            // 策略：2-3个正常案例，2-3个违禁案例
            let normalCount, violationCount;
            
            // 对于5个案例：随机分配2-3个正常案例
            normalCount = Math.floor(Math.random() * 2) + 2; // 2或3
            violationCount = totalCases - normalCount; // 3或2
            
            // 确保不超过可用案例数
            normalCount = Math.min(normalCount, normalCases.length);
            violationCount = Math.min(violationCount, violationCases.length);
            
            // 如果调整后总数不足，从另一类补充
            const actualTotal = normalCount + violationCount;
            if (actualTotal < totalCases) {
                const shortage = totalCases - actualTotal;
                if (normalCases.length > normalCount) {
                    normalCount = Math.min(normalCount + shortage, normalCases.length);
                } else if (violationCases.length > violationCount) {
                    violationCount = Math.min(violationCount + shortage, violationCases.length);
                }
            }
            
            // 随机选择指定数量的案例
            const selectedNormal = Utils.shuffle(normalCases).slice(0, normalCount);
            const selectedViolation = Utils.shuffle(violationCases).slice(0, violationCount);
            
            // 合并并再次随机打乱顺序
            GameState.selectedCases = Utils.shuffle([...selectedNormal, ...selectedViolation]);
            
            // 确保选择了正确数量的案例
            if (GameState.selectedCases.length !== GAME_CONFIG.CASES_TO_PLAY) {
                console.warn(`案例数量不正确 (${GameState.selectedCases.length}/${GAME_CONFIG.CASES_TO_PLAY})，使用简单随机选择`);
                const shuffled = Utils.shuffle(casesDatabase);
                GameState.selectedCases = shuffled.slice(0, GAME_CONFIG.CASES_TO_PLAY);
            }
            
            console.log(`已选择 ${GameState.selectedCases.length} 个案例 (正常:${normalCount}, 违禁:${violationCount})`);
            console.log('选中的案例:', GameState.selectedCases.map((c, index) => `${index + 1}. ${c.passenger.name}(${c.hasViolation ? '违禁' : '正常'})`));
            
        } catch (error) {
            console.error('选择案例时发生错误:', error);
            // 错误降级处理：使用简单随机选择
            try {
                const shuffled = [...casesDatabase].sort(() => 0.5 - Math.random());
                GameState.selectedCases = shuffled.slice(0, Math.min(GAME_CONFIG.CASES_TO_PLAY, casesDatabase.length));
                console.log('使用降级方案选择了', GameState.selectedCases.length, '个案例');
            } catch (fallbackError) {
                console.error('降级方案也失败:', fallbackError);
                GameState.selectedCases = [];
            }
        }
    },
    
    loadNextCase: function() {
        console.log(`=== 开始加载案例 ${GameState.currentCase + 1}/${GameState.selectedCases.length} ===`);
        console.log('当前GameState.currentCase:', GameState.currentCase);
        console.log('选中的案例总数:', GameState.selectedCases.length);
        console.log('配置的案例数量:', GAME_CONFIG.CASES_TO_PLAY);
        
        // 检查是否所有案例都已完成
        if (GameState.currentCase >= GameState.selectedCases.length) {
            console.log('所有案例完成，显示最终结果');
            GameResultManager.showFinalResults();
            return;
        }
        
        // 检查案例数组是否有效
        if (GameState.selectedCases.length === 0) {
            console.error('选中的案例数组为空');
            GameResultManager.showFinalResults();
            return;
        }
        
        if (!GameState.isValidCase()) {
            console.error('无效案例索引', {
                currentCase: GameState.currentCase,
                selectedCasesLength: GameState.selectedCases.length,
                isValidCase: GameState.isValidCase()
            });
            GameResultManager.showFinalResults();
            return;
        }
        
        const currentCase = GameState.getCurrentCase();
        if (!currentCase) {
            console.error('无法获取当前案例');
            GameResultManager.showFinalResults();
            return;
        }
        
        console.log(`当前案例: ${currentCase.passenger.name} (第${GameState.currentCase + 1}个)`);
        
        // 只在第一个案例时检查特殊事件
        if (GameState.currentCase === 0) {
            console.log('第一个案例，检查特殊事件...');
            SpecialEventManager.checkForSpecialEventAtGameStart();
        } else {
            console.log('非第一个案例，使用现有特殊事件状态');
        }
        
        // 重置当前案例状态
        GameState.isXRayCompleted = false;
        GameState.isInspecting = false;
        GameState.selectedItems = [];
        GameState.questionsAsked = [];
        GameState.caseStartTime = Date.now();
        GameState.currentNervousness = currentCase.passenger.baseNervousness;
        GameState.workflowStep = 'xray';
        GameState.isTimedOut = false;
        GameState.isPaused = false;
        GameState.currentTimeLeft = GAME_CONFIG.TIME_LIMIT;
        
        // 清理之前的计时器
        Utils.cleanupTimers();
        
        // 更新UI显示
        const progressElement = Utils.getElement('case-progress');
        if (progressElement) {
            progressElement.textContent = `${GameState.currentCase + 1}/${GameState.selectedCases.length}`;
            console.log(`更新进度显示: ${GameState.currentCase + 1}/${GameState.selectedCases.length}`);
        }
        
        // 加载案例数据
        PassengerManager.loadPassengerInfo(currentCase.passenger);
        LuggageManager.loadLuggageItems(currentCase.items);
        
        // 启动计时器（这时特殊事件已经生效）
        console.log('启动计时器...');
        TimerManager.startCaseTimer();
        
        // 重置UI状态
        UIManager.resetTools();
        WorkflowManager.updateStatus();
        
        // 确保显示正确的界面
        UIManager.showScreen('inspection-screen');
        
        console.log(`=== 案例 ${GameState.currentCase + 1} 加载完成 ===`);
    }
};
