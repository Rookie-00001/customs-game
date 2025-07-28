// 评分管理器
const ScoreManager = {
    calculateCaseScore: function(caseData) {
        let totalScore = 0;
        let breakdown = {
            judgmentScore: 0,
            accuracyScore: 0,
            timeBonus: 0,
            questionBonus: 0
        };
        
        console.log('=== 评分计算开始 ===');
        console.log('输入数据:', caseData);
        
        // 1. 判断正确性（最重要的指标）
        if (!caseData.isCorrect) {
            console.log('判断错误，返回0分');
            return {
                totalScore: 0,
                breakdown: breakdown,
                reason: '判断错误 - 基本执法能力不合格',
                timeUsed: caseData.timeUsed,
                detailedAnalysis: this.generateDetailedAnalysis(caseData)
            };
        }
        
        // 判断正确，基础分10分
        breakdown.judgmentScore = GAME_CONFIG.SCORING.BASE_SCORE;
        totalScore += GAME_CONFIG.SCORING.BASE_SCORE;
        console.log('基础得分:', breakdown.judgmentScore, '累计:', totalScore);
        
        // 2. 准确性得分（5分）
        breakdown.accuracyScore = this.calculateAccuracyScore(caseData);
        totalScore += breakdown.accuracyScore;
        console.log('准确性得分:', breakdown.accuracyScore, '累计:', totalScore);
        
        // 3. 时间奖励（4分）
        breakdown.timeBonus = this.calculateTimeBonus(caseData.timeUsed);
        totalScore += breakdown.timeBonus;
        console.log('时间得分:', breakdown.timeBonus, '累计:', totalScore);
        
        // 4. 询问奖励（1分）
        breakdown.questionBonus = this.calculateQuestionBonus(caseData);
        totalScore += breakdown.questionBonus;
        console.log('询问得分:', breakdown.questionBonus, '累计:', totalScore);

        // 4. 特殊事件加成
        let eventBonus = 0;
        const currentEvent = SpecialEventManager.getCurrentEventInfo();
        if (currentEvent && caseData.isCorrect) {
            switch(currentEvent.id) {
                case 'RUSH_HOUR':
                case 'HOLIDAY_TRAVEL':
                case 'timeReduced':
                    eventBonus = 1; // 时间紧张情况下完成任务，额外+1分
                    console.log('特殊事件加成: 时间紧张+1分');
                    break;
                case 'ENHANCED_INSPECTION':
                case 'RANDOM_CHECK':
                case 'enhancedInspection':
                    // 加强检查模式下，准确性要求更高，完美表现额外加分
                    if (caseData.foundViolations === caseData.totalViolations && caseData.wrongSelections === 0) {
                        eventBonus = 1; // 完美执行加强检查，额外+1分
                        console.log('特殊事件加成: 完美加强检查+1分');
                    } else {
                        eventBonus = 0.5; // 一般表现，小额加分
                        console.log('特殊事件加成: 加强检查+0.5分');
                    }
                    break;
                case 'VIP_CUSTOMER':
                case 'VIP_PASSENGER':
                case 'vipCustomer':
                    eventBonus = 0.5; // VIP客户服务加成+0.5分
                    console.log('特殊事件加成: VIP客户服务+0.5分');
                    break;
                case 'BOMB_THREAT':
                    eventBonus = 2; // 爆炸威胁下完成任务，大额加成+2分
                    console.log('特殊事件加成: 爆炸威胁应对+3分');
                    break;
                case 'SYSTEM_UPGRADE':
                case 'NIGHT_SHIFT':
                case 'STAFF_TRAINING':
                    eventBonus = 0.5; // 相对宽松环境，小额加成+0.5分
                    console.log('特殊事件加成: 标准环境+0.5分');
                    break;
                case 'EMERGENCY_DRILL':
                    eventBonus = 1; // 应急演练，完成任务+1分
                    console.log('特殊事件加成: 应急演练+1分');
                    break;
            }
        }
        
        breakdown.eventBonus = eventBonus;
        totalScore += eventBonus;
        
        console.log('特殊事件得分:', eventBonus, '累计:', totalScore);
        
        const finalScore = Math.min(GAME_CONFIG.SCORING.MAX_CASE_SCORE, Math.max(0, Math.round(totalScore * 10) / 10));
        console.log('最终得分:', finalScore);
        console.log('得分明细:', breakdown);
        console.log('=== 评分计算结束 ===');
        
        return {
            totalScore: finalScore,
            breakdown: breakdown,
            reason: this.getScoreReason(breakdown, caseData),
            timeUsed: caseData.timeUsed,
            detailedAnalysis: this.generateDetailedAnalysis(caseData)
        };
    },
    
    calculateAccuracyScore: function(caseData) {
        const totalViolations = caseData.totalViolations || 0;
        const foundViolations = caseData.foundViolations || 0;
        
        // 修复：正确处理 wrongSelections
        let wrongSelections = 0;
        if (typeof caseData.wrongSelections === 'number') {
            wrongSelections = caseData.wrongSelections;
        } else if (Array.isArray(caseData.wrongSelections)) {
            wrongSelections = caseData.wrongSelections.length;
        } else if (Array.isArray(caseData.wrongSelectionsArray)) {
            wrongSelections = caseData.wrongSelectionsArray.length;
        }
        
        const missedViolations = Math.max(0, totalViolations - foundViolations);
        
        console.log('准确性计算:', {
            totalViolations,
            foundViolations,
            wrongSelections,
            missedViolations
        });
        
        if (totalViolations === 0) {
            // 无违禁品案例：重点是不误判
            if (wrongSelections === 0) {
                console.log('无违禁品，无误判，得5分');
                return 5;
            }
            if (wrongSelections === 1) {
                console.log('无违禁品，1个误判，得3分');
                return 3;
            }
            if (wrongSelections === 2) {
                console.log('无违禁品，2个误判，得1分');
                return 1;
            }
            console.log('无违禁品，误判过多，得0分');
            return 0;
        } else {
            // 有违禁品案例：重点是找全且不误判
            if (missedViolations === 0 && wrongSelections === 0) {
                console.log('有违禁品，全找到且无误判，得5分');
                return 5;
            }
            if (missedViolations === 0 && wrongSelections === 1) {
                console.log('有违禁品，全找到但1个误判，得4分');
                return 4;
            }
            if (missedViolations === 1 && wrongSelections === 0) {
                console.log('有违禁品，漏1个但无误判，得3.5分');
                return 3.5;
            }
            if (missedViolations === 0 && wrongSelections === 2) {
                console.log('有违禁品，全找到但2个误判，得3分');
                return 3;
            }
            if (missedViolations === 1 && wrongSelections === 1) {
                console.log('有违禁品，漏1个且1个误判，得2.5分');
                return 2.5;
            }
            if (missedViolations === 2 && wrongSelections === 0) {
                console.log('有违禁品，漏2个但无误判，得2分');
                return 2;
            }
            if (missedViolations === 0 && wrongSelections >= 3) {
                console.log('有违禁品，全找到但误判过多，得1.5分');
                return 1.5;
            }
            if (missedViolations === 1 && wrongSelections === 2) {
                console.log('有违禁品，漏1个且2个误判，得1分');
                return 1;
            }
            console.log('有违禁品，表现较差，得0.5分');
            return 0.5;
        }
    },
    
    calculateTimeBonus: function(timeUsed) {
        console.log('时间计算: 用时', timeUsed, '秒');
        if (timeUsed <= 10) {
            console.log('10秒内完成，得4分');
            return 4;
        }
        if (timeUsed <= 20) {
            console.log('20秒内完成，得3分');
            return 3;
        }
        if (timeUsed <= 30) {
            console.log('30秒内完成，得2分');
            return 2;
        }
        if (timeUsed <= 40) {
            console.log('40秒内完成，得1分');
            return 1;
        }
        console.log('超过40秒，得0分');
        return 0;
    },
    
    calculateQuestionBonus: function(caseData) {
        console.log('询问得分: 1分');
        return 1;
    },
    
    generateDetailedAnalysis: function(caseData) {
        let analysis = {
            correctItems: [],
            missedItems: [],
            wrongItems: [],
            timePerformance: '',
            professionalAssessment: ''
        };
        
        // 获取违禁品列表
        const violationItems = caseData.violationItems || [];
        const selectedItems = caseData.selectedItems || [];
        
        // 分析选择的物品
        selectedItems.forEach(selectedLabel => {
            const matchedItem = violationItems.find(item => item.label === selectedLabel);
            if (matchedItem) {
                // 选中的是违禁品
                analysis.correctItems.push({
                    name: selectedLabel,
                    reason: matchedItem.reason || '发现违禁品',
                    type: matchedItem.type || '违禁品'
                });
            } else {
                // 选中的是正常物品
                analysis.wrongItems.push({
                    name: selectedLabel,
                    actualStatus: '正常物品'
                });
            }
        });
        
        // 分析遗漏的违禁品
        violationItems.forEach(item => {
            const wasFound = selectedItems.includes(item.label);
            if (!wasFound) {
                analysis.missedItems.push({
                    name: item.label,
                    reason: item.reason || '未发现的违禁品',
                    type: item.type || '违禁品'
                });
            }
        });
        
        // 时间表现分析
        const timeUsed = caseData.timeUsed || 0;
        if (timeUsed <= 10) {
            analysis.timePerformance = '闪电般的专业判断';
        } else if (timeUsed <= 20) {
            analysis.timePerformance = '高效的执法速度';
        } else if (timeUsed <= 30) {
            analysis.timePerformance = '标准的检查时间';
        } else {
            analysis.timePerformance = '检查较为仔细';
        }
        
        // 专业评估
        if (caseData.isCorrect) {
            const totalViolations = caseData.totalViolations || 0;
            if (analysis.correctItems.length === totalViolations && analysis.wrongItems.length === 0) {
                analysis.professionalAssessment = '完美的执法表现，准确识别所有违禁品且无误判';
            } else if (analysis.wrongItems.length === 0) {
                analysis.professionalAssessment = '执法判断正确，但部分违禁品未发现';
            } else {
                analysis.professionalAssessment = '执法判断正确，但存在误判情况';
            }
        } else {
            analysis.professionalAssessment = '执法判断错误，需要加强学习和训练';
        }
        
        return analysis;
    },
    
    getScoreReason: function(breakdown, caseData) {
        let reasons = [];
        
        reasons.push(`基础判断: ${breakdown.judgmentScore}/${GAME_CONFIG.SCORING.BASE_SCORE}分`);
        
        if (breakdown.accuracyScore === 5) {
            reasons.push(`准确性: 完美识别 (${breakdown.accuracyScore}/${GAME_CONFIG.SCORING.MAX_ACCURACY_SCORE}分)`);
        } else if (breakdown.accuracyScore >= 3) {
            reasons.push(`准确性: 良好识别 (${breakdown.accuracyScore}/${GAME_CONFIG.SCORING.MAX_ACCURACY_SCORE}分)`);
        } else if (breakdown.accuracyScore >= 1) {
            reasons.push(`准确性: 有误判/遗漏 (${breakdown.accuracyScore}/${GAME_CONFIG.SCORING.MAX_ACCURACY_SCORE}分)`);
        } else {
            reasons.push(`准确性: 识别问题较多 (${breakdown.accuracyScore}/${GAME_CONFIG.SCORING.MAX_ACCURACY_SCORE}分)`);
        }
        
        const timeUsed = caseData.timeUsed;
        if (breakdown.timeBonus === 4) {
            reasons.push(`时间效率: 资深专家级 ${timeUsed}秒 (${breakdown.timeBonus}/${GAME_CONFIG.SCORING.MAX_TIME_BONUS}分)`);
        } else if (breakdown.timeBonus === 3) {
            reasons.push(`时间效率: 熟练执法 ${timeUsed}秒 (${breakdown.timeBonus}/${GAME_CONFIG.SCORING.MAX_TIME_BONUS}分)`);
        } else if (breakdown.timeBonus === 2) {
            reasons.push(`时间效率: 合格水平 ${timeUsed}秒 (${breakdown.timeBonus}/${GAME_CONFIG.SCORING.MAX_TIME_BONUS}分)`);
        } else if (breakdown.timeBonus === 1) {
            reasons.push(`时间效率: 基础合格 ${timeUsed}秒 (${breakdown.timeBonus}/${GAME_CONFIG.SCORING.MAX_TIME_BONUS}分)`);
        } else {
            reasons.push(`时间效率: 需要提升 ${timeUsed}秒 (${breakdown.timeBonus}/${GAME_CONFIG.SCORING.MAX_TIME_BONUS}分)`);
        }
        
        reasons.push(`专业性: 执法规范 (${breakdown.questionBonus}/${GAME_CONFIG.SCORING.MAX_QUESTION_BONUS}分)`);
        
        // 添加特殊事件加成显示
        if (breakdown.eventBonus && breakdown.eventBonus > 0) {
            const currentEvent = SpecialEventManager.getCurrentEventInfo();
            const eventName = currentEvent ? currentEvent.name : '特殊事件';
            reasons.push(`${eventName}: 额外奖励 (+${breakdown.eventBonus}分)`);
        }
        
        return reasons.join('<br>');
    },
    
    getScoreGrade: function(score) {
        if (score >= SCORE_GRADES.PERFECT.min) return SCORE_GRADES.PERFECT;
        if (score >= SCORE_GRADES.EXCELLENT.min) return SCORE_GRADES.EXCELLENT;
        if (score >= SCORE_GRADES.GOOD.min) return SCORE_GRADES.GOOD;
        return SCORE_GRADES.FAIL;
    }
};