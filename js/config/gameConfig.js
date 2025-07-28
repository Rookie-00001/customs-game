// 游戏配置文件
const GAME_CONFIG = {
    // 游戏基础配置
    CASES_TO_PLAY: 5,
    TIME_LIMIT: 40,
    
    // 评分配置
    SCORING: {
        BASE_SCORE: 10,
        MAX_ACCURACY_SCORE: 5,
        MAX_TIME_BONUS: 4,
        MAX_QUESTION_BONUS: 1,
        MAX_CASE_SCORE: 20
    },
    
    // 时间配置
    TIMING: {
        XRAY_DURATION: 2000,
        XRAY_DISPLAY: 5000,
        SPEECH_DURATION: 3000,
        BEHAVIOR_ANIMATION_DELAY: 200
    },
    
    // 难度配置
    DIFFICULTY: {
        EASY: {
            name: '简单执法',
            violationCases: 1,  // 5个案例中只有1个违禁品
            normalCases: 4
        },
        NORMAL: {
            name: '正常执法', 
            violationCases: null, // 保持随机
            normalCases: null
        },
        HARD: {
            name: '困难执法',
            violationCases: 4,  // 5个案例中只有1个非违禁品
            normalCases: 1
        }
    },
    
    // 特殊事件配置
    SPECIAL_EVENTS: {
        RUSH_HOUR: {
            name: '高峰时段',
            description: '人流量激增，检查时间减少到20秒',
            probability: 0.08,
            effect: 'timeReduction'
        },
        VIP_PASSENGER: {
            name: 'VIP旅客',
            description: '重要旅客，需格外谨慎处理，时间减少到25秒',
            probability: 0.06,
            effect: 'vipStatus'
        },
        RANDOM_CHECK: {
            name: '随机检查',
            description: '上级要求加强检查力度，时间增加到50秒',
            probability: 0.05,
            effect: 'enhancedCheck'
        },
        ENHANCED_INSPECTION: {
            name: '加强检查',
            description: '特殊情况下的详细检查，时间增加到45秒',
            probability: 0.04,
            effect: 'enhancedInspection'
        },
        BOMB_THREAT: {
            name: '爆炸威胁',
            description: '紧急安检状态，检查时间极度紧张（15秒）',
            probability: 0.02,
            effect: 'emergencyCheck'
        },
        SYSTEM_UPGRADE: {
            name: '系统升级',
            description: '设备升级期间，时间稍微增加到35秒',
            probability: 0.05,
            effect: 'systemMaintenance'
        },
        NIGHT_SHIFT: {
            name: '夜班值守',
            description: '夜间相对宽松，时间增加到35秒',
            probability: 0.04,
            effect: 'nightDuty'
        },
        EMERGENCY_DRILL: {
            name: '应急演练',
            description: '演练状态下，时间稍微紧张（25秒）',
            probability: 0.03,
            effect: 'drillMode'
        },
        HOLIDAY_TRAVEL: {
            name: '节假日出行',
            description: '假期人流高峰，时间减少到20秒',
            probability: 0.06,
            effect: 'holidayRush'
        },
        STAFF_TRAINING: {
            name: '员工培训',
            description: '新手指导模式，保持标准时间40秒',
            probability: 0.03,
            effect: 'trainingMode'
        }
    },
    
    // 等级系统配置
    LEVEL_SYSTEM: {
        levels: [
            { name: '实习安检员', minExp: 0, maxExp: 10 },
            { name: '初级执法者', minExp: 11, maxExp: 25 },
            { name: '正式海关安检员', minExp: 26, maxExp: 50 },
            { name: '高级海关检查员', minExp: 51, maxExp: 100 },
            { name: '传奇海关走私执法者👑', minExp: 101, maxExp: 999999 }
        ],
    }
};

// 评分等级配置
const SCORE_GRADES = {
    PERFECT: { min: 90, name: "完美执法", icon: "🏆", color: "#f39c12" },
    EXCELLENT: { min: 80, name: "优秀执法", icon: "⭐", color: "#27ae60" },
    GOOD: { min: 60, name: "合格执法", icon: "👍", color: "#3498db" },
    FAIL: { min: 0, name: "需要提升", icon: "❌", color: "#e74c3c" }
};