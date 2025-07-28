// 游戏结果管理器
const GameResultManager = {
    showCaseResult: function(isCorrect, analysisResult, scoreResult) {
        let resultHtml = this.generateResultHTML(isCorrect, analysisResult, scoreResult);
        
        const icon = isCorrect ? (this.isPerfectCase(analysisResult) ? '🏆' : '✅') : '❌';
        const title = isCorrect ? (this.isPerfectCase(analysisResult) ? '完美执法！' : '执法正确') : 
                    (analysisResult.suspiciousItems.length > 0 ? '执法失误' : '执法过度');
        
        this.showFormattedResult(icon, title, resultHtml);
        
        const resultButtons = Utils.getElement('result-buttons');
        if (resultButtons) {
            resultButtons.innerHTML = `
                <button class="continue-btn" onclick="nextCase()">继续下一个案例</button>
            `;
        }
    },
    
    isPerfectCase: function(analysisResult) {
        return analysisResult.isCorrect && 
               analysisResult.foundViolations === analysisResult.totalViolations && 
               analysisResult.wrongSelections === 0;
    },
    
    generateResultHTML: function(isCorrect, analysisResult, scoreResult) {
        if (isCorrect) {
            return this.generateSuccessHTML(analysisResult, scoreResult);
        } else {
            return this.generateFailureHTML(analysisResult, scoreResult);
        }
    },
    
    generateSuccessHTML: function(analysisResult, scoreResult) {
        const isPerfect = this.isPerfectCase(analysisResult);
        
        let html = `
            <div class="result-section success">
                <div class="result-item-title">${isPerfect ? '🏆' : '✅'} <span class="result-highlight success">${isPerfect ? '完美执法！' : '执法正确，'}得分：${scoreResult.totalScore}/20</span></div>
                <div class="result-item-content">${isPerfect ? '出色的专业判断！您准确识别了所有违禁物品。' : '决定正确，执法专业！'}</div>
            </div>
            <div class="result-section info">
                <div class="result-item-title">⏰ 用时统计</div>
                <div class="result-item-content">本次检查用时：<span class="result-highlight info">${scoreResult.timeUsed}秒</span> - ${scoreResult.detailedAnalysis.timePerformance}</div>
            </div>
        `;
        
        // 显示发现的违禁品
        if (analysisResult.foundSuspiciousItems.length > 0) {
            html += `
                <div class="result-section error">
                    <div class="result-item-title">🚫 发现违禁品</div>
                    <div class="result-item-content">
                        ${analysisResult.foundSuspiciousItems.map(item => 
                            `• <span class="result-highlight error">${item.label}</span> - ${item.reason}`
                        ).join('<br>')}
                    </div>
                </div>
            `;
        }
        
        // 显示遗漏的违禁品
        if (scoreResult.detailedAnalysis.missedItems.length > 0) {
            html += `
                <div class="result-section warning">
                    <div class="result-item-title">⚠️ 遗漏物品</div>
                    <div class="result-item-content">
                        ${scoreResult.detailedAnalysis.missedItems.map(item => 
                            `• <span class="result-highlight warning">${item.name}</span> - ${item.reason}`
                        ).join('<br>')}
                    </div>
                </div>
            `;
        }
        
        // 显示误判物品
        if (scoreResult.detailedAnalysis.wrongItems.length > 0) {
            html += `
                <div class="result-section warning">
                    <div class="result-item-title">⚠️ 误判物品</div>
                    <div class="result-item-content">
                        ${scoreResult.detailedAnalysis.wrongItems.map(item => 
                            `• <span class="result-highlight warning">${item.name}</span> - ${item.actualStatus}`
                        ).join('<br>')}
                    </div>
                </div>
            `;
        }
        
        // 显示特殊事件加成
        if (scoreResult.breakdown && scoreResult.breakdown.eventBonus && scoreResult.breakdown.eventBonus > 0) {
            const currentEvent = SpecialEventManager.getCurrentEventInfo();
            html += `
                <div class="result-section success">
                    <div class="result-item-title">⚡ 特殊事件加成</div>
                    <div class="result-item-content">
                        ${currentEvent ? currentEvent.name : '特殊事件'}：额外获得 <span class="result-highlight success">+${scoreResult.breakdown.eventBonus}分</span>
                    </div>
                </div>
            `;
        }
        
        // 特殊事件信息
        const currentEvent = SpecialEventManager.getCurrentEventInfo();
        if (currentEvent) {
            html += `
                <div class="result-section info">
                    <div class="result-item-title">⚡ 特殊事件</div>
                    <div class="result-item-content" style="color: #e74c3c;">
                        ${currentEvent.name}：${currentEvent.description}
                    </div>
                </div>
            `;
        }
        
        html += `
            <div class="result-section info">
                <div class="result-item-title">📞 普法提醒</div>
                <div class="result-item-content">发现走私线索请拨打：<span class="result-highlight error">12360</span></div>
            </div>
        `;
        
        return html;
    },
    
    generateFailureHTML: function(analysisResult, scoreResult) {
        let html = '';
        
        if (analysisResult.suspiciousItems.length > 0) {
            html += `
                <div class="result-section error">
                    <div class="result-item-title">❌ <span class="result-highlight error">严重失误！得分：0/20</span></div>
                    <div class="result-item-content">该旅客携带违禁品却被错误放行！</div>
                </div>
                <div class="result-section info">
                    <div class="result-item-title">⏰ 用时统计</div>
                    <div class="result-item-content">本次检查用时：<span class="result-highlight info">${scoreResult.timeUsed}秒</span></div>
                </div>
                <div class="result-section error">
                    <div class="result-item-title">🚫 遗漏的违禁品</div>
                    <div class="result-item-content">${analysisResult.suspiciousItems.map(item => `• <span class="result-highlight error">${item.label}</span> - ${item.reason}`).join('<br>')}</div>
                </div>
            `;
        } else {
            html += `
                <div class="result-section warning">
                    <div class="result-item-title">⚠️ <span class="result-highlight warning">执法过度，得分：0/20</span></div>
                    <div class="result-item-content">该旅客携带物品均为正常物品，错误扣留影响了合法权益。</div>
                </div>
                <div class="result-section info">
                    <div class="result-item-title">⏰ 用时统计</div>
                    <div class="result-item-content">本次检查用时：<span class="result-highlight info">${scoreResult.timeUsed}秒</span></div>
                </div>
                <div class="result-section info">
                    <div class="result-item-title">⚖️ 执法原则</div>
                    <div class="result-item-content">海关执法要做到有理有据，确保执法的公正性。</div>
                </div>
            `;
            
            // 显示误判的物品
            if (analysisResult.selectedItems.length > 0) {
                html += `
                    <div class="result-section warning">
                        <div class="result-item-title">⚠️ 误判的正常物品</div>
                        <div class="result-item-content">
                            ${analysisResult.selectedItems.map(item => 
                                `• <span class="result-highlight warning">${item.label}</span> - 正常物品`
                            ).join('<br>')}
                        </div>
                    </div>
                `;
            }
        }
        
        // 特殊事件信息（失败情况下也显示）
        const currentEvent = SpecialEventManager.getCurrentEventInfo();
        if (currentEvent) {
            html += `
                <div class="result-section info">
                    <div class="result-item-title">⚡ 特殊事件</div>
                    <div class="result-item-content" style="color: #e74c3c;">
                        ${currentEvent.name}：${currentEvent.description}
                    </div>
                </div>
            `;
        }
        
        html += `
            <div class="result-section info">
                <div class="result-item-title">📞 举报电话</div>
                <div class="result-item-content">发现走私线索请拨打：<span class="result-highlight error">12360</span></div>
            </div>
        `;
        
        return html;
    },
    
    showFormattedResult: function(icon, title, htmlContent) {
        // 暂停计时器（如果TimerManager存在且有pauseTimer方法）
        if (typeof TimerManager !== 'undefined' && TimerManager.pauseTimer) {
            TimerManager.pauseTimer();
        }
        
        const resultIcon = Utils.getElement('result-icon');
        const resultTitle = Utils.getElement('result-title');
        const resultDescription = Utils.getElement('result-description');
        const resultModal = Utils.getElement('result-modal');
        
        if (resultIcon) resultIcon.textContent = icon;
        if (resultTitle) resultTitle.textContent = title;
        if (resultDescription) resultDescription.innerHTML = htmlContent;
        if (resultModal) resultModal.style.display = 'flex';
    },
    
    // 在showFinalResults方法中修复显示
    showFinalResults: function() {
        console.log('=== 显示最终结果 ===');
        console.log('案例分数数组:', GameState.caseScores);
        console.log('完成的案例数:', GameState.caseScores.length);
        console.log('总案例数:', GameState.selectedCases.length);
        
        // 停止计时器
        if (typeof TimerManager !== 'undefined' && TimerManager.stopTimer) {
            TimerManager.stopTimer();
        }
        
        const totalScore = GameState.caseScores.reduce((sum, score) => sum + score.totalScore, 0);
        GameState.totalScore = GameState.roundScore(totalScore);
        
        // 添加经验
        const expResult = LevelManager.addExpByScore(GameState.totalScore);
        
        const grade = ScoreManager.getScoreGrade(GameState.totalScore);
        
        // 确保使用正确的案例数量
        const completedCases = GameState.caseScores.length;
        const totalCases = GameState.selectedCases.length;
        
        let finalResultHtml = `
            <div class="score-display" style="background: linear-gradient(135deg, ${grade.color}, ${grade.color}cc);">
                <div class="score-number">${GameState.totalScore}</div>
                <div class="score-grade">${grade.icon} ${grade.name}</div>
                <div class="score-subtitle">总分：${GameState.totalScore}/100 | 正确案例：${GameState.correctChecks}/${totalCases}</div>
            </div>
        `;
        
        finalResultHtml += `
            <div class="result-section info">
                <div class="result-item-title">📊 各案例得分详情</div>
                <div class="result-item-content">
                    ${GameState.caseScores.map((score, index) => 
                        `第${index + 1}个旅客：<span class="result-highlight ${score.totalScore > 0 ? 'success' : 'error'}">${score.totalScore}/20分</span> (用时：${score.timeUsed}秒)`
                    ).join('<br>')}
                </div>
            </div>
        `;
        
        // 添加等级变化信息（仅在最终结算界面）
        finalResultHtml += LevelManager.showLevelChangeInFinalResult(expResult);
        
        // 特殊事件回顾
        const currentEvent = SpecialEventManager.getCurrentEventInfo();
        if (currentEvent) {
            finalResultHtml += `
                <div class="result-section info">
                    <div class="result-item-title">⚡ 特殊事件回顾</div>
                    <div class="result-item-content" style="color: #e74c3c;">
                        本次挑战遇到了特殊事件：${currentEvent.name}<br>
                        ${currentEvent.description}
                    </div>
                </div>
            `;
        }
        
        finalResultHtml += this.generateFinalResultContent(GameState.totalScore);
        
        this.showFormattedResult(
            grade.icon, 
            `执法评估完成 - ${grade.name}`,
            finalResultHtml
        );
        
        // 动画显示进度条
        LevelManager.animateProgressBar();
        
        const resultButtons = Utils.getElement('result-buttons');
        if (resultButtons) {
            resultButtons.innerHTML = `
                <div class="game-end-buttons">
                    <button class="restart-btn" onclick="GameResultManager.hideResultAndRestart()">⟳ 重新开始</button>
                    <button class="continue-btn" onclick="GameResultManager.hideResultAndShowKnowledge()">📚 学习知识</button>
                    <button class="continue-btn" onclick="GameResultManager.hideResultAndReturnMenu()">🏠 返回主菜单</button>
                </div>
            `;
        }
        
        console.log('=== 最终结果显示完成 ===');
    },
    
    generateFinalResultContent: function(totalScore) {
        if (totalScore >= 90) {
            return `
                <div class="result-section success">
                    <div class="result-item-title">🏆 <span class="result-highlight success">完美执法专家！</span></div>
                    <div class="result-item-content">您展现了卓越的执法能力！准确率高达 <span class="result-highlight success">${Math.round((GameState.correctChecks / GameState.totalCases) * 100)}%</span>，正确处理 <span class="result-highlight info">${GameState.correctChecks}/${GameState.totalCases}</span> 个案例。</div>
                </div>
                <div class="result-section info">
                    <div class="result-item-title">🔰 执法贡献</div>
                    <div class="result-item-content">您的专业判断为维护国家安全和经济秩序做出了重要贡献！每一次正确的执法决定都在保护我们的国家利益。</div>
                </div>
                <div class="result-section warning">
                    <div class="result-item-title">📞 全民行动</div>
                    <div class="result-item-content"><strong>全民反走私，你我齐参与！</strong><br>发现可疑情况请拨打海关举报电话：<span class="result-highlight error">12360</span><br>让我们共同构建安全的国门防线！</div>
                </div>
            `;
        } else if (totalScore >= 80) {
            return `
                <div class="result-section success">
                    <div class="result-item-title">⭐ <span class="result-highlight success">优秀执法官！</span></div>
                    <div class="result-item-content">表现优秀！准确率 <span class="result-highlight success">${Math.round((GameState.correctChecks / GameState.totalCases) * 100)}%</span>，正确处理 <span class="result-highlight info">${GameState.correctChecks}/${GameState.totalCases}</span> 个案例。您具备良好的执法素质！</div>
                </div>
                <div class="result-section info">
                    <div class="result-item-title">💪 提升建议</div>
                    <div class="result-item-content">继续加强学习，提高执法效率和准确性。注意细节观察和证据收集，向完美执法迈进。</div>
                </div>
                <div class="result-section warning">
                    <div class="result-item-title">📞 全民行动</div>
                    <div class="result-item-content"><strong>全民反走私，你我齐参与！</strong><br>发现可疑情况请拨打海关举报电话：<span class="result-highlight error">12360</span></div>
                </div>
            `;
        } else if (totalScore >= 60) {
            return `
                <div class="result-section warning">
                    <div class="result-item-title">👍 <span class="result-highlight warning">合格执法官</span></div>
                    <div class="result-item-content">达到合格标准！准确率 <span class="result-highlight warning">${Math.round((GameState.correctChecks / GameState.totalCases) * 100)}%</span>，正确处理 <span class="result-highlight info">${GameState.correctChecks}/${GameState.totalCases}</span> 个案例。还有提升空间！</div>
                </div>
                <div class="result-section info">
                    <div class="result-item-title">📚 学习建议</div>
                    <div class="result-item-content">建议深入学习反走私知识，加强案例分析能力。多观察旅客行为，提高识别可疑情况的敏感度。</div>
                </div>
                <div class="result-section warning">
                    <div class="result-item-title">📞 全民行动</div>
                    <div class="result-item-content"><strong>全民反走私，你我齐参与！</strong><br>发现可疑情况请拨打海关举报电话：<span class="result-highlight error">12360</span></div>
                </div>
            `;
        } else {
            return `
                <div class="result-section error">
                    <div class="result-item-title">❌ <span class="result-highlight error">需要加强学习</span></div>
                    <div class="result-item-content">执法水平有待提高。准确率 <span class="result-highlight error">${Math.round((GameState.correctChecks / GameState.totalCases) * 100)}%</span>，正确处理 <span class="result-highlight info">${GameState.correctChecks}/${GameState.totalCases}</span> 个案例。</div>
                </div>
                <div class="result-section warning">
                    <div class="result-item-title">📖 重点学习</div>
                    <div class="result-item-content">请认真学习反走私法律法规和识别技巧。通过系统学习和反复练习，提高执法能力。每一次学习都是进步的机会！</div>
                </div>
                <div class="result-section info">
                    <div class="result-item-title">🔥 使命责任</div>
                    <div class="result-item-content">海关执法事关国家安全，责任重大。继续努力学习，为维护国家安全贡献力量！</div>
                </div>
                <div class="result-section warning">
                    <div class="result-item-title">📞 全民行动</div>
                    <div class="result-item-content"><strong>全民反走私，你我齐参与！</strong><br>发现可疑情况请拨打海关举报电话：<span class="result-highlight error">12360</span></div>
                </div>
            `;
        }
    },
    
    // 添加新的方法来处理模态框关闭
    hideResultModal: function() {
        const resultModal = Utils.getElement('result-modal');
        if (resultModal) {
            resultModal.style.display = 'none';
        }
    },

    hideResultAndRestart: function() {
        this.hideResultModal();
        if (typeof restartGame === 'function') {
            restartGame();
        } else if (typeof GameController !== 'undefined' && GameController.restartGame) {
            GameController.restartGame();
        } else {
            // fallback: 直接调用开始游戏
            setTimeout(() => {
                if (typeof startInspection === 'function') {
                    startInspection();
                }
            }, 100);
        }
    },

    hideResultAndShowKnowledge: function() {
        this.hideResultModal();
        setTimeout(() => {
            if (typeof GameController !== 'undefined' && GameController.showKnowledge) {
                GameController.showKnowledge();
            } else if (typeof showKnowledge === 'function') {
                showKnowledge();
            }
        }, 100);
    },

    hideResultAndReturnMenu: function() {
        this.hideResultModal();
        setTimeout(() => {
            if (typeof GameController !== 'undefined' && GameController.returnToMainMenu) {
                GameController.returnToMainMenu();
            } else if (typeof returnToMainMenu === 'function') {
                returnToMainMenu();
            }
        }, 100);
    }
};