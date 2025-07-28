// 决策管理器
const DecisionManager = {
    makeDecision: function(decision) {
        if (GameState.isTimedOut || GameState.isPaused) return;
        if (!GameState.isXRayCompleted) return;
        
        if (decision === 'pass') {
            this.processDecision('pass');
        } else if (decision === 'inspect') {
            GameState.isInspecting = true;
            GameState.workflowStep = 'inspect';
            WorkflowManager.updateStatus();
            UIManager.showScreen('inspection-detail-screen');
            
            setTimeout(() => {
                const finalPassBtn = Utils.getElement('final-pass-btn');
                const finalDetainBtn = Utils.getElement('final-detain-btn');
                if (finalPassBtn) {
                    finalPassBtn.disabled = false;
                    finalPassBtn.style.opacity = '1';
                    finalPassBtn.style.cursor = 'pointer';
                }
                if (finalDetainBtn) {
                    finalDetainBtn.disabled = false;
                    finalDetainBtn.style.opacity = '1';
                    finalDetainBtn.style.cursor = 'pointer';
                }
            }, 100);
        }
    },
    
    makeFinalDecision: function(decision) {
        if (GameState.isTimedOut || GameState.isPaused) return;
        
        // 暂停计时器
        TimerManager.pauseTimer();
        
        // 清理X光视图
        const xrayView = Utils.getElement('x-ray-view');
        if (xrayView) {
            xrayView.classList.remove('active');
        }
        
        // 禁用按钮
        document.querySelectorAll('.tool-btn, .question-btn, .decision-btn').forEach(btn => {
            btn.disabled = true;
            btn.style.opacity = '0.5';
            btn.style.cursor = 'not-allowed';
        });
        
        GameState.workflowStep = 'final';
        WorkflowManager.updateStatus();
        
        // 延迟处理决定，给用户一些反馈时间
        setTimeout(() => {
            this.processDecision(decision);
        }, 500);
    },
    
    // 添加辅助函数来检查物品是否为违禁品
    isViolationItem: function(item) {
        // 同时支持 isViolation 和 suspicious 属性
        return item.isViolation === true || item.suspicious === true;
    },
    
    // 修改 processDecision 方法
    processDecision: function(decision) {
        if (!GameState.isValidCase()) {
            console.error('无法处理决定：当前案例无效');
            return;
        }
        
        console.log(`=== 处理决定: ${decision} ===`);
        console.log('用户选择的物品:', GameState.selectedItems);
        
        const currentCase = GameState.getCurrentCase();
        const timeUsed = Math.max(1, GAME_CONFIG.TIME_LIMIT - GameState.currentTimeLeft);
        
        // 计算结果
        const result = this.evaluateDecision(decision, currentCase, timeUsed);
        
        // 构建分析结果 - 转换为 GameResultManager 期望的格式
        const analysisResult = {
            isCorrect: result.isCorrect,
            timeUsed: timeUsed,
            hasSecondaryInspection: GameState.selectedItems.length > 0 || GameState.questionsAsked.length > 0,
            foundViolations: result.foundViolations,
            totalViolations: result.totalViolations,
            wrongSelections: result.wrongSelections,
            questionsAsked: GameState.questionsAsked.length,
            suspiciousItems: currentCase.items.filter(item => this.isViolationItem(item)),
            foundSuspiciousItems: GameState.selectedItems.filter(itemLabel => 
                currentCase.items.some(caseItem => 
                    caseItem.label === itemLabel && this.isViolationItem(caseItem)
                )
            ).map(itemLabel => {
                const caseItem = currentCase.items.find(caseItem => caseItem.label === itemLabel);
                return {
                    label: itemLabel,
                    reason: caseItem ? (caseItem.reason || caseItem.description || '违禁品') : '违禁品'
                };
            }),
            selectedItems: GameState.selectedItems.map(itemLabel => ({
                label: itemLabel
            }))
        };
        
        // 使用 ScoreManager 计算分数
        const scoreData = {
            isCorrect: result.isCorrect,
            timeUsed: timeUsed,
            hasSecondaryInspection: GameState.selectedItems.length > 0 || GameState.questionsAsked.length > 0,
            foundViolations: result.foundViolations,
            totalViolations: result.totalViolations,
            wrongSelections: result.wrongSelections,
            questionsAsked: GameState.questionsAsked.length,
            wrongSelectionsArray: GameState.selectedItems.filter(itemLabel => 
                !currentCase.items.some(caseItem => 
                    caseItem.label === itemLabel && this.isViolationItem(caseItem)
                )
            ),
            selectedItems: GameState.selectedItems,
            violationItems: currentCase.items.filter(item => this.isViolationItem(item))
        };
        
        const scoreResult = ScoreManager.calculateCaseScore(scoreData);
        
        // 调用 GameResultManager 的 showCaseResult 方法
        GameResultManager.showCaseResult(result.isCorrect, analysisResult, scoreResult);
        
        // 记录分数
        GameState.caseScores.push({
            passenger: currentCase.passenger.name,
            decision: decision,
            isCorrect: result.isCorrect,
            totalScore: scoreResult.totalScore,
            timeUsed: timeUsed,
            details: result
        });
        
        if (result.isCorrect) {
            GameState.correctChecks++;
        }
        
        console.log(`案例 ${GameState.currentCase + 1} 处理完成，得分: ${scoreResult.totalScore}`);
        console.log('当前总得分记录:', GameState.caseScores.length);
    },
    
    // 修改 evaluateDecision 方法
    evaluateDecision: function(decision, currentCase, timeUsed) {
        const hasViolation = currentCase.hasViolation;
        
        // 修复判断逻辑：
        // - 如果有违禁品，正确决定是 'detain'（扣留）
        // - 如果没有违禁品，正确决定是 'pass'（放行）
        let correctDecision;
        if (hasViolation) {
            correctDecision = 'detain';
        } else {
            correctDecision = 'pass';
        }
        
        const isCorrect = decision === correctDecision;
        
        console.log('判断分析:', {
            hasViolation: hasViolation,
            decision: decision,
            correctDecision: correctDecision,
            isCorrect: isCorrect,
            selectedItems: GameState.selectedItems,
            violationItems: currentCase.items.filter(item => this.isViolationItem(item))
        });
        
        // 计算发现的违禁品数量 - 现在 GameState.selectedItems 是字符串数组
        const foundViolations = GameState.selectedItems.filter(itemLabel => 
            currentCase.items.some(caseItem => 
                caseItem.label === itemLabel && this.isViolationItem(caseItem)
            )
        ).length;
        
        // 计算总违禁品数量 - 使用新的判断函数
        const totalViolations = currentCase.items.filter(item => this.isViolationItem(item)).length;
        
        // 计算错误选择数量 - 现在 GameState.selectedItems 是字符串数组
        const wrongSelectionsArray = GameState.selectedItems.filter(itemLabel => 
            !currentCase.items.some(caseItem => 
                caseItem.label === itemLabel && this.isViolationItem(caseItem)
            )
        );
        const wrongSelections = wrongSelectionsArray.length;
        
        console.log('详细统计:', {
            foundViolations: foundViolations,
            totalViolations: totalViolations,
            wrongSelections: wrongSelections,
            wrongSelectionsArray: wrongSelectionsArray
        });
        
        // 使用ScoreManager计算分数
        const scoreData = {
            isCorrect: isCorrect,
            timeUsed: timeUsed,
            hasSecondaryInspection: GameState.selectedItems.length > 0 || GameState.questionsAsked.length > 0,
            foundViolations: foundViolations,
            totalViolations: totalViolations,
            wrongSelections: wrongSelections,
            questionsAsked: GameState.questionsAsked.length,
            wrongSelectionsArray: wrongSelectionsArray,
            selectedItems: GameState.selectedItems,
            violationItems: currentCase.items.filter(item => this.isViolationItem(item))
        };
        
        const scoreResult = ScoreManager.calculateCaseScore(scoreData);
        
        return {
            isCorrect: isCorrect,
            decision: decision,
            correctDecision: correctDecision,
            totalScore: scoreResult.totalScore,
            timeUsed: timeUsed,
            foundViolations: foundViolations,
            totalViolations: totalViolations,
            wrongSelections: wrongSelections,
            scoreBreakdown: scoreResult.breakdown
        };
    },
    
    analyzeInspectionResult: function(currentCase, isCorrect, timeUsed) {
        const suspiciousItems = currentCase.items.filter(item => this.isViolationItem(item));
        const foundSuspiciousItems = GameState.selectedItems.filter(itemLabel => 
            currentCase.items.some(caseItem => 
                caseItem.label === itemLabel && this.isViolationItem(caseItem)
            )
        );
        const wrongSelections = GameState.selectedItems.filter(itemLabel => 
            !currentCase.items.some(caseItem => 
                caseItem.label === itemLabel && this.isViolationItem(caseItem)
            )
        );
        
        return {
            isCorrect: isCorrect,
            timeUsed: timeUsed,
            hasSecondaryInspection: GameState.isInspecting,
            foundViolations: foundSuspiciousItems.length,
            totalViolations: suspiciousItems.length,
            wrongSelections: wrongSelections.length,
            questionsAsked: GameState.questionsAsked.length,
            suspiciousItems: suspiciousItems,
            foundSuspiciousItems: foundSuspiciousItems,
            wrongSelections: wrongSelections,
            selectedItems: GameState.selectedItems,
            allItems: currentCase.items
        };
    },
    
    updateGameStats: function(isCorrect, analysisResult) {
        if (isCorrect) {
            GameState.correctChecks++;
        } else {
            GameState.missedItems += analysisResult.totalViolations;
        }
        
        GameState.currentCase++;
        GameState.totalCases++;
        UIManager.updateStats();
    }
};