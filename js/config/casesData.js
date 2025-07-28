// 案例数据库
const casesDatabase = [
    {
        passenger: {
            name: "李某某",
            avatar: "👨",
            from: "泰国曼谷",
            baseNervousness: 30,
            behaviors: [
                { text: "主动配合检查", type: "normal" },
                { text: "行李整理得当", type: "normal" },
                { text: "回答问题自然", type: "normal" }
            ],
            responses: {
                purpose: {
                    answers: [
                        { answer: "旅游观光，买了一些当地特产", nervousChange: 5, isLie: false },
                        { answer: "就是去玩玩，泰国很不错的", nervousChange: 3, isLie: false }
                    ]
                },
                duration: {
                    answers: [
                        { answer: "停留了5天，主要在曼谷市区", nervousChange: 0, isLie: false },
                        { answer: "一个星期左右，时间过得很快", nervousChange: 2, isLie: false }
                    ]
                },
                items: {
                    answers: [
                        { answer: "就是一些纪念品和个人用品", nervousChange: 0, isLie: false },
                        { answer: "买了些泰国特色的东西，都是正常的", nervousChange: 0, isLie: false }
                    ]
                },
                declaration: {
                    answers: [
                        { answer: "没什么需要申报的", nervousChange: 0, isLie: false },
                        { answer: "应该都不用申报", nervousChange: 0, isLie: false }
                    ]
                }
            }
        },
        items: [
            { icon: "👕", label: "衣物", suspicious: false, xrayShape: "[矩形织物]" },
            { icon: "📱", label: "手机", suspicious: false, xrayShape: "[电子设备]" },
            { icon: "🎁", label: "纪念品", suspicious: false, xrayShape: "[包装盒]" },
            { icon: "🍫", label: "巧克力", suspicious: false, xrayShape: "[包装食品]" },
            { icon: "💊", label: "药品", suspicious: false, xrayShape: "[小瓶装]" },
            { icon: "📚", label: "书籍", suspicious: false, xrayShape: "[矩形物体]" }
        ],
        hasViolation: false,
        correctDecision: "pass"
    },
    {
        passenger: {
            name: "张先生",
            avatar: "👨",
            from: "美国纽约",
            baseNervousness: 20,
            behaviors: [
                { text: "表现镇定自然", type: "normal" },
                { text: "主动出示证件", type: "normal" },
                { text: "配合检查程序", type: "normal" }
            ],
            responses: {
                purpose: {
                    answers: [
                        { answer: "商务出差，参加技术会议", nervousChange: 0, isLie: false },
                        { answer: "公司派我来开会的，技术交流", nervousChange: 0, isLie: false }
                    ]
                },
                duration: {
                    answers: [
                        { answer: "停留一周，大部分时间在会议", nervousChange: 0, isLie: false },
                        { answer: "七天，主要是工作安排", nervousChange: 0, isLie: false }
                    ]
                },
                items: {
                    answers: [
                        { answer: "主要是工作资料和个人物品", nervousChange: 0, isLie: false },
                        { answer: "都是办公用品和生活必需品", nervousChange: 0, isLie: false }
                    ]
                },
                declaration: {
                    answers: [
                        { answer: "没有需要申报的物品", nervousChange: 0, isLie: false },
                        { answer: "这些都是正常的商务物品", nervousChange: 0, isLie: false }
                    ]
                }
            }
        },
        items: [
            { icon: "💻", label: "笔记本", suspicious: false, xrayShape: "[电子设备]" },
            { icon: "📄", label: "文件", suspicious: false, xrayShape: "[纸质材料]" },
            { icon: "☕", label: "咖啡", suspicious: false, xrayShape: "[包装食品]" },
            { icon: "🎧", label: "耳机", suspicious: false, xrayShape: "[电子配件]" },
            { icon: "📷", label: "相机", suspicious: false, xrayShape: "[电子设备]" },
            { icon: "👔", label: "西装", suspicious: false, xrayShape: "[织物]" }
        ],
        hasViolation: false,
        correctDecision: "pass"
    },
    {
        passenger: {
            name: "田小姐",
            avatar: "👩",
            from: "日本东京",
            baseNervousness: 40,
            behaviors: [
                { text: "礼貌恭敬", type: "normal" },
                { text: "行李收拾整齐", type: "normal" },
                { text: "回答详细周到", type: "normal" },
                { text: "对检查程序理解", type: "normal" }
            ],
            responses: {
                purpose: {
                    answers: [
                        { answer: "工作培训，学习管理经验", nervousChange: 0, isLie: false },
                        { answer: "公司安排的交流项目", nervousChange: 3, isLie: false }
                    ]
                },
                duration: {
                    answers: [
                        { answer: "一个月，主要是实习和学习", nervousChange: 0, isLie: false },
                        { answer: "四周时间，很充实的安排", nervousChange: 0, isLie: false }
                    ]
                },
                items: {
                    answers: [
                        { answer: "工作资料和一些日本特产", nervousChange: 0, isLie: false },
                        { answer: "主要是文件和少量礼品", nervousChange: 0, isLie: false }
                    ]
                },
                declaration: {
                    answers: [
                        { answer: "都是正常的个人物品", nervousChange: 0, isLie: false },
                        { answer: "没有需要特别申报的", nervousChange: 0, isLie: false }
                    ]
                }
            }
        },
        items: [
            { icon: "📋", label: "工作文件", suspicious: false, xrayShape: "[文件夹]" },
            { icon: "🍱", label: "日式食品", suspicious: false, xrayShape: "[包装食品]" },
            { icon: "👘", label: "和服", suspicious: false, xrayShape: "[丝织品]" },
            { icon: "🍵", label: "茶叶", suspicious: false, xrayShape: "[包装盒]" },
            { icon: "🎋", label: "竹制品", suspicious: false, xrayShape: "[竹材]" },
            { icon: "💻", label: "电脑", suspicious: false, xrayShape: "[电子设备]" }
        ],
        hasViolation: false,
        correctDecision: "pass"
    },
    {
        passenger: {
            name: "老陈",
            avatar: "👨",
            from: "新加坡",
            baseNervousness: 25,
            behaviors: [
                { text: "举止自然得体", type: "normal" },
                { text: "熟悉入境流程", type: "normal" },
                { text: "主动出示证件", type: "normal" },
                { text: "经常往来两地", type: "normal" }
            ],
            responses: {
                purpose: {
                    answers: [
                        { answer: "商务洽谈，老客户了", nervousChange: 0, isLie: false },
                        { answer: "定期的业务拜访", nervousChange: 0, isLie: false }
                    ]
                },
                duration: {
                    answers: [
                        { answer: "三天，签个合同就回去", nervousChange: 0, isLie: false },
                        { answer: "短期出差，很快处理完", nervousChange: 0, isLie: false }
                    ]
                },
                items: {
                    answers: [
                        { answer: "商务文件和样品", nervousChange: 0, isLie: false },
                        { answer: "合同资料，还有些小礼品", nervousChange: 0, isLie: false }
                    ]
                },
                declaration: {
                    answers: [
                        { answer: "都是常规的商务物品", nervousChange: 0, isLie: false },
                        { answer: "和以前一样，没什么特别的", nervousChange: 0, isLie: false }
                    ]
                }
            }
        },
        items: [
            { icon: "📄", label: "合同文件", suspicious: false, xrayShape: "[文件]" },
            { icon: "💼", label: "公文包", suspicious: false, xrayShape: "[皮箱]" },
            { icon: "🍫", label: "巧克力", suspicious: false, xrayShape: "[包装食品]" },
            { icon: "⌚", label: "手表", suspicious: false, xrayShape: "[金属件]" },
            { icon: "💳", label: "名片夹", suspicious: false, xrayShape: "[卡片]" },
            { icon: "📱", label: "手机", suspicious: false, xrayShape: "[电子设备]" }
        ],
        hasViolation: false,
        correctDecision: "pass"
    },
    {
        passenger: {
            name: "小马",
            avatar: "👨",
            from: "韩国首尔",
            baseNervousness: 50,
            behaviors: [
                { text: "年轻学生模样", type: "normal" },
                { text: "略显拘谨紧张", type: "suspicious" },
                { text: "携带大量行李", type: "normal" },
                { text: "第一次独自出国", type: "normal" }
            ],
            responses: {
                purpose: {
                    answers: [
                        { answer: "交换学习，在大学进修", nervousChange: 8, isLie: false },
                        { answer: "学校的项目，来这边学习一年", nervousChange: 10, isLie: false }
                    ]
                },
                duration: {
                    answers: [
                        { answer: "一年，交换学习项目", nervousChange: 5, isLie: false },
                        { answer: "12个月，然后回韩国", nervousChange: 8, isLie: false }
                    ]
                },
                items: {
                    answers: [
                        { answer: "学习用品和生活必需品", nervousChange: 5, isLie: false },
                        { answer: "书本比较多，还有一些韩国食品", nervousChange: 8, isLie: false }
                    ]
                },
                declaration: {
                    answers: [
                        { answer: "都是学生用品，应该没问题", nervousChange: 10, isLie: false },
                        { answer: "学校说这些不用申报", nervousChange: 12, isLie: false }
                    ]
                }
            }
        },
        items: [
            { icon: "📚", label: "教科书", suspicious: false, xrayShape: "[厚书本]" },
            { icon: "🍜", label: "方便面", suspicious: false, xrayShape: "[包装食品]" },
            { icon: "👕", label: "衣物", suspicious: false, xrayShape: "[织物]" },
            { icon: "💻", label: "笔记本", suspicious: false, xrayShape: "[电子设备]" },
            { icon: "🎮", label: "游戏机", suspicious: false, xrayShape: "[电子产品]" },
            { icon: "🍫", label: "零食", suspicious: false, xrayShape: "[小包装]" }
        ],
        hasViolation: false,
        correctDecision: "pass"
    },
    {
        passenger: {
            name: "刘阿姨",
            avatar: "👩",
            from: "加拿大温哥华",
            baseNervousness: 30,
            behaviors: [
                { text: "中年女性，气质温和", type: "normal" },
                { text: "携带保健品", type: "normal" },
                { text: "详细说明物品", type: "normal" },
                { text: "关心家人健康", type: "normal" }
            ],
            responses: {
                purpose: {
                    answers: [
                        { answer: "回国探亲，看看年迈的父母", nervousChange: 0, isLie: false },
                        { answer: "家庭团聚，父亲身体不太好", nervousChange: 5, isLie: false }
                    ]
                },
                duration: {
                    answers: [
                        { answer: "两个月，多陪陪家人", nervousChange: 0, isLie: false },
                        { answer: "计划待8周，看情况可能延长", nervousChange: 0, isLie: false }
                    ]
                },
                items: {
                    answers: [
                        { answer: "加拿大的保健品，对老人身体好", nervousChange: 0, isLie: false },
                        { answer: "一些营养品和家人的礼物", nervousChange: 0, isLie: false }
                    ]
                },
                declaration: {
                    answers: [
                        { answer: "保健品都是正规的，有标签", nervousChange: 0, isLie: false },
                        { answer: "这些是给家人的，应该可以吧", nervousChange: 5, isLie: false }
                    ]
                }
            }
        },
        items: [
            { icon: "💊", label: "维生素", suspicious: false, xrayShape: "[瓶装药物]" },
            { icon: "🍯", label: "蜂胶", suspicious: false, xrayShape: "[瓶装]" },
            { icon: "💅", label: "护肤品", suspicious: false, xrayShape: "[化妆品]" },
            { icon: "🍫", label: "枫糖", suspicious: false, xrayShape: "[包装食品]" },
            { icon: "≋", label: "羊毛围巾", suspicious: false, xrayShape: "[织物]" },
            { icon: "📱", label: "手机", suspicious: false, xrayShape: "[电子设备]" }
        ],
        hasViolation: false,
        correctDecision: "pass"
    },
    {
        passenger: {
            name: "老王",
            avatar: "👨",
            from: "俄罗斯莫斯科",
            baseNervousness: 55,
            behaviors: [
                { text: "言语不太流利", type: "normal" },
                { text: "显得有些紧张", type: "suspicious" },
                { text: "携带很多纪念品", type: "normal" },
                { text: "第一次来中国", type: "normal" }
            ],
            responses: {
                purpose: {
                    answers: [
                        { answer: "旅游...中国文化很有意思", nervousChange: 8, isLie: false },
                        { answer: "朋友推荐来看看，体验一下", nervousChange: 10, isLie: false }
                    ]
                },
                duration: {
                    answers: [
                        { answer: "两个星期，去几个城市", nervousChange: 5, isLie: false },
                        { answer: "半个月吧，主要是观光", nervousChange: 8, isLie: false }
                    ]
                },
                items: {
                    answers: [
                        { answer: "买了很多纪念品，给家人朋友", nervousChange: 10, isLie: false },
                        { answer: "俄罗斯特产...还有一些小礼品", nervousChange: 12, isLie: false }
                    ]
                },
                declaration: {
                    answers: [
                        { answer: "不太懂中国的规定", nervousChange: 15, isLie: false },
                        { answer: "这些需要申报吗？我不确定", nervousChange: 18, isLie: false }
                    ]
                }
            }
        },
        items: [
            { icon: "🗿", label: "套娃", suspicious: false, xrayShape: "[木制品]" },
            { icon: "🍯", label: "蜂蜜", suspicious: false, xrayShape: "[瓶装]" },
            { icon: "≋", label: "毛织品", suspicious: false, xrayShape: "[织物]" },
            { icon: "🍫", label: "巧克力", suspicious: false, xrayShape: "[包装食品]" },
            { icon: "📷", label: "相机", suspicious: false, xrayShape: "[电子设备]" },
            { icon: "🎁", label: "礼品盒", suspicious: false, xrayShape: "[包装盒]" }
        ],
        hasViolation: false,
        correctDecision: "pass"
    },
    {
        passenger: {
            name: "李教授",
            avatar: "👨",
            from: "英国牛津",
            baseNervousness: 15,
            behaviors: [
                { text: "举止优雅从容", type: "normal" },
                { text: "携带学术证件", type: "normal" },
                { text: "主动配合检查", type: "normal" },
                { text: "详细解释物品用途", type: "normal" }
            ],
            responses: {
                purpose: {
                    answers: [
                        { answer: "受邀参加学术论坛，做主题演讲", nervousChange: 0, isLie: false },
                        { answer: "大学间的合作交流项目", nervousChange: 0, isLie: false }
                    ]
                },
                duration: {
                    answers: [
                        { answer: "三周，包括讲座和实地调研", nervousChange: 0, isLie: false },
                        { answer: "21天，有密集的学术活动", nervousChange: 0, isLie: false }
                    ]
                },
                items: {
                    answers: [
                        { answer: "主要是学术资料和教学用品", nervousChange: 0, isLie: false },
                        { answer: "研究资料和一些教学设备", nervousChange: 0, isLie: false }
                    ]
                },
                declaration: {
                    answers: [
                        { answer: "都是教学科研用品，无需申报", nervousChange: 0, isLie: false },
                        { answer: "这些都在合理携带范围内", nervousChange: 0, isLie: false }
                    ]
                }
            }
        },
        items: [
            { icon: "📚", label: "学术书籍", suspicious: false, xrayShape: "[书本]" },
            { icon: "💻", label: "笔记本电脑", suspicious: false, xrayShape: "[电子设备]" },
            { icon: "📊", label: "研究数据", suspicious: false, xrayShape: "[文件]" },
            { icon: "📐", label: "教学模型", suspicious: false, xrayShape: "[立体模型]" },
            { icon: "✏️", label: "文具用品", suspicious: false, xrayShape: "[小物件]" },
            { icon: "🎓", label: "学术证书", suspicious: false, xrayShape: "[证书]" }
        ],
        hasViolation: false,
        correctDecision: "pass"
    },
    {
        passenger: {
            name: "欧阳女士",
            avatar: "👩",
            from: "澳大利亚悉尼",
            baseNervousness: 35,
            behaviors: [
                { text: "略显疲惫", type: "normal" },
                { text: "携带婴儿用品", type: "normal" },
                { text: "耐心配合检查", type: "normal" },
                { text: "详细说明情况", type: "normal" }
            ],
            responses: {
                purpose: {
                    answers: [
                        { answer: "探亲访友，带孩子回来看爷爷奶奶", nervousChange: 0, isLie: false },
                        { answer: "家庭团聚，孩子第一次回国", nervousChange: 5, isLie: false }
                    ]
                },
                duration: {
                    answers: [
                        { answer: "一个月，让孩子熟悉这里", nervousChange: 0, isLie: false },
                        { answer: "计划待4周，主要是家庭时间", nervousChange: 0, isLie: false }
                    ]
                },
                items: {
                    answers: [
                        { answer: "主要是孩子的用品和一些礼物", nervousChange: 0, isLie: false },
                        { answer: "婴儿用品比较多，还有些澳洲特产", nervousChange: 0, isLie: false }
                    ]
                },
                declaration: {
                    answers: [
                        { answer: "都是自用的，没超过限额", nervousChange: 0, isLie: false },
                        { answer: "婴儿用品应该不用申报吧？", nervousChange: 5, isLie: false }
                    ]
                }
            }
        },
        items: [
            { icon: "👶", label: "婴儿用品", suspicious: false, xrayShape: "[塑料制品]" },
            { icon: "🎀", label: "玩具", suspicious: false, xrayShape: "[软体玩具]" },
            { icon: "🍯", label: "蜂蜜", suspicious: false, xrayShape: "[瓶装]" },
            { icon: "💅", label: "护肤品", suspicious: false, xrayShape: "[小瓶罐]" },
            { icon: "👶", label: "婴儿服装", suspicious: false, xrayShape: "[小织物]" },
            { icon: "📱", label: "手机", suspicious: false, xrayShape: "[电子设备]" }
        ],
        hasViolation: false,
        correctDecision: "pass"
    },
    {
        passenger: {
            name: "何医生",
            avatar: "👨",
            from: "德国柏林",
            baseNervousness: 25,
            behaviors: [
                { text: "穿着正式得体", type: "normal" },
                { text: "携带医疗证件", type: "normal" },
                { text: "言谈举止专业", type: "normal" },
                { text: "主动说明情况", type: "normal" }
            ],
            responses: {
                purpose: {
                    answers: [
                        { answer: "医学会议，介绍新型治疗技术", nervousChange: 0, isLie: false },
                        { answer: "参加国际医学研讨会", nervousChange: 2, isLie: false }
                    ]
                },
                duration: {
                    answers: [
                        { answer: "两周，包括会议和医院访问", nervousChange: 0, isLie: false },
                        { answer: "半个月，主要是学术活动", nervousChange: 0, isLie: false }
                    ]
                },
                items: {
                    answers: [
                        { answer: "医疗设备样品和学术资料", nervousChange: 0, isLie: false },
                        { answer: "一些医疗器械和研究文件", nervousChange: 3, isLie: false }
                    ]
                },
                declaration: {
                    answers: [
                        { answer: "已按规定申报医疗设备", nervousChange: 0, isLie: false },
                        { answer: "医疗样品都有相关证明", nervousChange: 0, isLie: false }
                    ]
                }
            }
        },
        items: [
            { icon: "📋", label: "医疗文件", suspicious: false, xrayShape: "[文件夹]" },
            { icon: "▤", label: "检测设备", suspicious: false, xrayShape: "[精密仪器]" },
            { icon: "💉", label: "医疗器械", suspicious: false, xrayShape: "[医疗工具]" },
            { icon: "📊", label: "研究资料", suspicious: false, xrayShape: "[资料袋]" },
            { icon: "💼", label: "公文包", suspicious: false, xrayShape: "[皮箱]" },
            { icon: "⭐", label: "医学奖章", suspicious: false, xrayShape: "[金属徽章]" }
        ],
        hasViolation: false,
        correctDecision: "pass"
    },

    // === 违禁品案例 (10个) ===
    {
        passenger: {
            name: "王女士",
            avatar: "👩",
            from: "缅甸仰光", 
            baseNervousness: 85,
            behaviors: [
                { text: "避免眼神接触", type: "suspicious" },
                { text: "双手微微颤抖", type: "suspicious" },
                { text: "回答问题犹豫", type: "suspicious" },
                { text: "频繁看向行李", type: "suspicious" }
            ],
            responses: {
                purpose: {
                    answers: [
                        { answer: "呃...就是...探亲访友", nervousChange: 15, isLie: true },
                        { answer: "我...我是来看朋友的", nervousChange: 18, isLie: true }
                    ]
                },
                duration: {
                    answers: [
                        { answer: "三天...不对，四天", nervousChange: 10, isLie: true },
                        { answer: "时间很短的，就几天", nervousChange: 12, isLie: true }
                    ]
                },
                items: {
                    answers: [
                        { answer: "都是正常的东西，没有违禁品", nervousChange: 25, isLie: true },
                        { answer: "就是些缅甸的工艺品", nervousChange: 30, isLie: true }
                    ]
                },
                declaration: {
                    answers: [
                        { answer: "我不知道什么需要申报", nervousChange: 30, isLie: true },
                        { answer: "这些...这些需要申报吗？", nervousChange: 35, isLie: true }
                    ]
                }
            }
        },
        items: [
            { icon: "👗", label: "服装", suspicious: false, xrayShape: "[织物堆]" },
            { icon: "💄", label: "化妆品", suspicious: false, xrayShape: "[小瓶罐]" },
            { icon: "🐘", label: "白色雕塑", suspicious: true, reason: "象牙制品，濒危物种制品严禁进境", type: "ivory", xrayShape: "[密度异常的雕刻物]" },
            { icon: "💍", label: "首饰", suspicious: false, xrayShape: "[金属小件]" },
            { icon: "⚙️", label: "行李配件", suspicious: false, xrayShape: "[金属件]" },
            { icon: "🍫", label: "巧克力", suspicious: false, xrayShape: "[包装食品]" }
        ],
        hasViolation: true,
        correctDecision: "detain"
    },
    {
        passenger: {
            name: "陈某",
            avatar: "👨",
            from: "哥伦比亚波哥大",
            baseNervousness: 45,
            behaviors: [
                { text: "表面镇定", type: "normal" },
                { text: "说话流利", type: "normal" },
                { text: "携带学术资料", type: "normal" },
                { text: "来源地高风险", type: "suspicious" }
            ],
            responses: {
                purpose: {
                    answers: [
                        { answer: "学术交流，研究植物学", nervousChange: 5, isLie: true },
                        { answer: "大学邀请，做学术报告", nervousChange: 8, isLie: true }
                    ]
                },
                duration: {
                    answers: [
                        { answer: "三个月，完成研究项目", nervousChange: 3, isLie: true },
                        { answer: "一个学期，主要是合作研究", nervousChange: 5, isLie: true }
                    ]
                },
                items: {
                    answers: [
                        { answer: "研究资料和实验样品", nervousChange: 10, isLie: true },
                        { answer: "学术文献和一些植物标本", nervousChange: 12, isLie: true }
                    ]
                },
                declaration: {
                    answers: [
                        { answer: "都是学术用品，有大学证明", nervousChange: 15, isLie: true },
                        { answer: "研究材料，应该不用特别申报", nervousChange: 18, isLie: true }
                    ]
                }
            }
        },
        items: [
            { icon: "📖", label: "学术期刊", suspicious: false, xrayShape: "[书本]" },
            { icon: "☕", label: "咖啡粉", suspicious: false, xrayShape: "[粉末状]" },
            { icon: "≋≋", label: "白色粉末", suspicious: true, reason: "疑似毒品，需进一步检验", type: "drugs", xrayShape: "[密封包装粉末]" },
            { icon: "💻", label: "笔记本", suspicious: false, xrayShape: "[电子设备]" },
            { icon: "📷", label: "相机", suspicious: false, xrayShape: "[电子设备]" },
            { icon: "🎒", label: "背包", suspicious: false, xrayShape: "[织物袋]" }
        ],
        hasViolation: true,
        correctDecision: "detain"
    },
    {
        passenger: {
            name: "刘女士",
            avatar: "👩",
            from: "南非开普敦",
            baseNervousness: 75,
            behaviors: [
                { text: "神色紧张", type: "suspicious" },
                { text: "回答问题闪烁", type: "suspicious" },
                { text: "试图转移注意力", type: "suspicious" },
                { text: "强调经济困难", type: "suspicious" }
            ],
            responses: {
                purpose: {
                    answers: [
                        { answer: "旅游...看看中国文化", nervousChange: 20, isLie: true },
                        { answer: "朋友邀请...来玩几天", nervousChange: 25, isLie: true }
                    ]
                },
                duration: {
                    answers: [
                        { answer: "一周...钱不够，很快回去", nervousChange: 15, isLie: true },
                        { answer: "时间不长，经济有限", nervousChange: 18, isLie: true }
                    ]
                },
                items: {
                    answers: [
                        { answer: "就是些毛绒大衣和纪念品", nervousChange: 30, isLie: true },
                        { answer: "南非特产...都是正常的东西", nervousChange: 35, isLie: true }
                    ]
                },
                declaration: {
                    answers: [
                        { answer: "这些旧衣服需要申报吗？", nervousChange: 25, isLie: true },
                        { answer: "我以为不用申报...", nervousChange: 30, isLie: true }
                    ]
                }
            }
        },
        items: [
            { icon: "👜", label: "手提包", suspicious: false, xrayShape: "[皮包]" },
            { icon: "👕", label: "毛绒大衣", suspicious: true, reason: "虎皮制品，濒危动物制品严禁进境", type: "animal", xrayShape: "[厚重纹理织物]" },
            { icon: "💍", label: "饰品", suspicious: false, xrayShape: "[金属小件]" },
            { icon: "🍫", label: "巧克力", suspicious: false, xrayShape: "[包装食品]" },
            { icon: "📱", label: "手机", suspicious: false, xrayShape: "[电子设备]" },
            { icon: "🎁", label: "礼品", suspicious: false, xrayShape: "[包装盒]" }
        ],
        hasViolation: true,
        correctDecision: "detain"
    },
    {
        passenger: {
            name: "孙小姐",
            avatar: "👩",
            from: "法国巴黎",
            baseNervousness: 35,
            behaviors: [
                { text: "打扮时尚前卫", type: "normal" },
                { text: "携带大量包装盒", type: "suspicious" },
                { text: "表现自信", type: "normal" },
                { text: "强调个人使用", type: "suspicious" }
            ],
            responses: {
                purpose: {
                    answers: [
                        { answer: "时尚之旅，买了很多东西", nervousChange: 8, isLie: false },
                        { answer: "购物旅行，巴黎的东西太棒了", nervousChange: 10, isLie: true }
                    ]
                },
                duration: {
                    answers: [
                        { answer: "三周，逛遍了各大商场", nervousChange: 5, isLie: false },
                        { answer: "二十多天，主要在购物", nervousChange: 8, isLie: true }
                    ]
                },
                items: {
                    answers: [
                        { answer: "时尚单品，都是自己要用的", nervousChange: 15, isLie: true },
                        { answer: "服装配饰，个人收藏", nervousChange: 18, isLie: true }
                    ]
                },
                declaration: {
                    answers: [
                        { answer: "个人用品应该不用申报吧", nervousChange: 20, isLie: true },
                        { answer: "我不做生意，就是自己用", nervousChange: 25, isLie: true }
                    ]
                }
            }
        },
        items: [
            { icon: "👜", label: "名牌手袋", suspicious: true, reason: "超量携带奢侈品，疑似商业代购", type: "luxury", xrayShape: "[多个皮包]" },
            { icon: "👠", label: "高跟鞋", suspicious: false, xrayShape: "[鞋类]" },
            { icon: "💄", label: "化妆品", suspicious: false, xrayShape: "[小瓶罐]" },
            { icon: "👗", label: "时装", suspicious: true, reason: "数量异常，疑似商业代购", type: "clothes", xrayShape: "[大量织物]" },
            { icon: "💍", label: "珠宝首饰", suspicious: false, xrayShape: "[小金属件]" },
            { icon: "👓", label: "太阳镜", suspicious: false, xrayShape: "[眼镜]" }
        ],
        hasViolation: true,
        correctDecision: "detain"
    },
    {
        passenger: {
            name: "老马",
            avatar: "👨",
            from: "越南河内",
            baseNervousness: 55,
            behaviors: [
                { text: "衣着朴素", type: "normal" },
                { text: "表情略紧张", type: "suspicious" },
                { text: "携带较多食品", type: "suspicious" },
                { text: "说话简短", type: "suspicious" }
            ],
            responses: {
                purpose: {
                    answers: [
                        { answer: "看朋友，带点家乡特产", nervousChange: 10, isLie: true },
                        { answer: "探亲访友，顺便买点东西", nervousChange: 15, isLie: true }
                    ]
                },
                duration: {
                    answers: [
                        { answer: "一个星期，不会待太久", nervousChange: 8, isLie: true },
                        { answer: "几天就回去，时间不多", nervousChange: 12, isLie: true }
                    ]
                },
                items: {
                    answers: [
                        { answer: "越南特产，朋友爱吃", nervousChange: 18, isLie: true },
                        { answer: "一些土特产，没什么贵重的", nervousChange: 22, isLie: true }
                    ]
                },
                declaration: {
                    answers: [
                        { answer: "土特产需要申报吗？", nervousChange: 20, isLie: true },
                        { answer: "我不太懂这些规定", nervousChange: 25, isLie: true }
                    ]
                }
            }
        },
        items: [
            { icon: "🍍", label: "热带水果", suspicious: true, reason: "未经检疫的新鲜水果，禁止入境", type: "fruit", xrayShape: "[有机物质]" },
            { icon: "🌿", label: "干草药", suspicious: false, xrayShape: "[植物材料]" },
            { icon: "🌰", label: "坚果", suspicious: false, xrayShape: "[颗粒状]" },
            { icon: "※", label: "调料", suspicious: false, xrayShape: "[小包装]" },
            { icon: "🎋", label: "竹制品", suspicious: false, xrayShape: "[木质材料]" },
            { icon: "🍯", label: "蜂蜜", suspicious: false, xrayShape: "[瓶装液体]" }
        ],
        hasViolation: true,
        correctDecision: "detain"
    },
    {
        passenger: {
            name: "钱某",
            avatar: "👨",
            from: "阿富汗喀布尔",
            baseNervousness: 25,
            behaviors: [
                { text: "非常镇定", type: "normal" },
                { text: "回答流利", type: "normal" },
                { text: "携带商务资料", type: "normal" },
                { text: "来源地高风险", type: "suspicious" }
            ],
            responses: {
                purpose: {
                    answers: [
                        { answer: "地毯贸易，传统手工艺", nervousChange: 0, isLie: false },
                        { answer: "商务洽谈，阿富汗地毯很有名", nervousChange: 3, isLie: false }
                    ]
                },
                duration: {
                    answers: [
                        { answer: "两周，谈合作协议", nervousChange: 0, isLie: false },
                        { answer: "半个月，建立贸易关系", nervousChange: 0, isLie: false }
                    ]
                },
                items: {
                    answers: [
                        { answer: "地毯样品和商务资料", nervousChange: 5, isLie: true },
                        { answer: "传统工艺品，都是正品", nervousChange: 8, isLie: true }
                    ]
                },
                declaration: {
                    answers: [
                        { answer: "商品样品，有相关证明", nervousChange: 10, isLie: true },
                        { answer: "贸易用途，应该没问题", nervousChange: 15, isLie: true }
                    ]
                }
            }
        },
        items: [
            { icon: "🔗", label: "地毯", suspicious: false, xrayShape: "[编织物]" },
            { icon: "📄", label: "商务文件", suspicious: false, xrayShape: "[纸质材料]" },
            { icon: "🗿", label: "工艺品", suspicious: false, xrayShape: "[装饰品]" },
            { icon: "⚗️", label: "香料粉末", suspicious: true, reason: "疑似鸦片类毒品，需进一步检验", type: "drugs", xrayShape: "[可疑粉末]" },
            { icon: "💍", label: "宝石", suspicious: false, xrayShape: "[小矿物]" },
            { icon: "📱", label: "手机", suspicious: false, xrayShape: "[电子设备]" }
        ],
        hasViolation: true,
        correctDecision: "detain"
    },
    {
        passenger: {
            name: "胡先生",
            avatar: "👨",
            from: "墨西哥墨西哥城",
            baseNervousness: 40,
            behaviors: [
                { text: "穿着休闲", type: "normal" },
                { text: "表现友好", type: "normal" },
                { text: "略显疲惫", type: "normal" },
                { text: "来源地风险较高", type: "suspicious" }
            ],
            responses: {
                purpose: {
                    answers: [
                        { answer: "文化交流，学习中文", nervousChange: 5, isLie: false },
                        { answer: "语言学习，参加培训班", nervousChange: 8, isLie: true }
                    ]
                },
                duration: {
                    answers: [
                        { answer: "六个月，语言课程", nervousChange: 3, isLie: false },
                        { answer: "半年时间，主要是学习", nervousChange: 5, isLie: true }
                    ]
                },
                items: {
                    answers: [
                        { answer: "学习资料和墨西哥特产", nervousChange: 10, isLie: true },
                        { answer: "课本和一些礼品", nervousChange: 15, isLie: true }
                    ]
                },
                declaration: {
                    answers: [
                        { answer: "学生用品，应该不用申报", nervousChange: 12, isLie: true },
                        { answer: "这些是学习材料", nervousChange: 18, isLie: true }
                    ]
                }
            }
        },
        items: [
            { icon: "📚", label: "西语教材", suspicious: false, xrayShape: "[书本]" },
            { icon: "🍪", label: "墨西哥食品", suspicious: false, xrayShape: "[包装食品]" },
            { icon: "🎸", label: "吉他", suspicious: false, xrayShape: "[乐器]" },
            { icon: "🚬", label: "香烟5条", suspicious: true, reason: "烟草制品超出免税额度", type: "tobacco", xrayShape: "[密集条状物]" },
            { icon: "👒", label: "帽子", suspicious: false, xrayShape: "[纺织品]" },
            { icon: "📱", label: "手机", suspicious: false, xrayShape: "[电子设备]" }
        ],
        hasViolation: true,
        correctDecision: "detain"
    },
    {
        passenger: {
            name: "高女士",
            avatar: "👩",
            from: "印度新德里",
            baseNervousness: 65,
            behaviors: [
                { text: "穿着传统服饰", type: "normal" },
                { text: "显得有些紧张", type: "suspicious" },
                { text: "携带很多小包", type: "suspicious" },
                { text: "回避某些问题", type: "suspicious" }
            ],
            responses: {
                purpose: {
                    answers: [
                        { answer: "宗教朝拜...参观寺庙", nervousChange: 15, isLie: true },
                        { answer: "文化之旅，了解佛教", nervousChange: 20, isLie: true }
                    ]
                },
                duration: {
                    answers: [
                        { answer: "两周，参观几个地方", nervousChange: 10, isLie: true },
                        { answer: "半个月，主要是朝拜", nervousChange: 15, isLie: true }
                    ]
                },
                items: {
                    answers: [
                        { answer: "宗教用品和印度特产", nervousChange: 25, isLie: true },
                        { answer: "朝拜用的东西，都是正常的", nervousChange: 30, isLie: true }
                    ]
                },
                declaration: {
                    answers: [
                        { answer: "宗教用品需要申报吗？", nervousChange: 20, isLie: true },
                        { answer: "这些是信仰用的...", nervousChange: 25, isLie: true }
                    ]
                }
            }
        },
        items: [
            { icon: "☪️", label: "宗教饰品", suspicious: false, xrayShape: "[装饰品]" },
            { icon: "🍛", label: "印度香料", suspicious: false, xrayShape: "[粉末包装]" },
            { icon: "●", label: "念珠", suspicious: false, xrayShape: "[珠串]" },
            { icon: "▲▲", label: "角质雕塑", suspicious: true, reason: "犀牛角制品，濒危动物制品严禁进境", type: "animal", xrayShape: "[高密度雕刻物]" },
            { icon: "═", label: "瑜伽用品", suspicious: false, xrayShape: "[软垫]" },
            { icon: "🎋", label: "香", suspicious: false, xrayShape: "[细条状]" }
        ],
        hasViolation: true,
        correctDecision: "detain"
    },
    {
        passenger: {
            name: "马先生",
            avatar: "👨",
            from: "巴基斯坦卡拉奇",
            baseNervousness: 50,
            behaviors: [
                { text: "表情严肃", type: "normal" },
                { text: "回答简洁", type: "suspicious" },
                { text: "携带电子设备", type: "suspicious" },
                { text: "来源地需关注", type: "suspicious" }
            ],
            responses: {
                purpose: {
                    answers: [
                        { answer: "商务考察，电子产品", nervousChange: 10, isLie: true },
                        { answer: "贸易洽谈，看看市场", nervousChange: 15, isLie: true }
                    ]
                },
                duration: {
                    answers: [
                        { answer: "一周，简单的商务行程", nervousChange: 8, isLie: true },
                        { answer: "几天时间，很快就回去", nervousChange: 12, isLie: true }
                    ]
                },
                items: {
                    answers: [
                        { answer: "电子产品样品", nervousChange: 20, isLie: true },
                        { answer: "商务用品...都是正常的", nervousChange: 25, isLie: true }
                    ]
                },
                declaration: {
                    answers: [
                        { answer: "样品不用申报吧？", nervousChange: 18, isLie: true },
                        { answer: "这些是展示用的", nervousChange: 22, isLie: true }
                    ]
                }
            }
        },
        items: [
            { icon: "📱", label: "多部手机", suspicious: true, reason: "数量异常，疑似走私", type: "electronics", xrayShape: "[多个电子设备]" },
            { icon: "💻", label: "笔记本", suspicious: false, xrayShape: "[电子设备]" },
            { icon: "🔌", label: "充电设备", suspicious: false, xrayShape: "[电子配件]" },
            { icon: "📡", label: "通信设备", suspicious: false, xrayShape: "[电子产品]" },
            { icon: "💾", label: "存储设备", suspicious: false, xrayShape: "[小电子件]" },
            { icon: "📄", label: "商务文件", suspicious: false, xrayShape: "[文件]" }
        ],
        hasViolation: true,
        correctDecision: "detain"
    },
    {
        passenger: {
            name: "杨小姐",
            avatar: "👩",
            from: "菲律宾马尼拉",
            baseNervousness: 85,
            behaviors: [
                { text: "极度紧张", type: "suspicious" },
                { text: "双手颤抖", type: "suspicious" },
                { text: "说话结巴", type: "suspicious" },
                { text: "试图掩饰", type: "suspicious" }
            ],
            responses: {
                purpose: {
                    answers: [
                        { answer: "家政...家政工作", nervousChange: 25, isLie: true },
                        { answer: "呃...工作机会...照顾老人", nervousChange: 30, isLie: true }
                    ]
                },
                duration: {
                    answers: [
                        { answer: "合同是...是两年", nervousChange: 20, isLie: true },
                        { answer: "工作时间...不太确定", nervousChange: 25, isLie: true }
                    ]
                },
                items: {
                    answers: [
                        { answer: "个人物品...没有别的", nervousChange: 35, isLie: true },
                        { answer: "衣服和...和生活用品", nervousChange: 40, isLie: true }
                    ]
                },
                declaration: {
                    answers: [
                        { answer: "什么都没有！都是正常的！", nervousChange: 35, isLie: true },
                        { answer: "我...我不知道要申报什么", nervousChange: 40, isLie: true }
                    ]
                }
            }
        },
        items: [
            { icon: "👗", label: "服装", suspicious: false, xrayShape: "[织物]" },
            { icon: "💄", label: "化妆品", suspicious: false, xrayShape: "[小瓶罐]" },
            { icon: "🔫", label: "玩具枪", suspicious: true, reason: "仿真枪支，违禁品", type: "weapons", xrayShape: "[金属枪型物]" },
            { icon: "📱", label: "手机", suspicious: false, xrayShape: "[电子设备]" },
            { icon: "💊", label: "药品", suspicious: false, xrayShape: "[药瓶]" },
            { icon: "🎁", label: "礼品", suspicious: false, xrayShape: "[包装盒]" }
        ],
        hasViolation: true,
        correctDecision: "detain"
    },
    {
        passenger: {
            name: "王先生",
            avatar: "👨",
            from: "意大利米兰",
            baseNervousness: 35,
            behaviors: [
                { text: "穿着考究的商务装", type: "normal" },
                { text: "携带品牌行李箱", type: "normal" },
                { text: "谈吐优雅", type: "normal" },
                { text: "主动出示护照", type: "normal" }
            ],
            responses: {
                purpose: {
                    answers: [
                        { answer: "时装周采购，为公司选购新品", nervousChange: 0, isLie: false },
                        { answer: "时尚买手工作，每季都要来", nervousChange: 2, isLie: false }
                    ]
                },
                duration: {
                    answers: [
                        { answer: "10天，看了很多品牌秀场", nervousChange: 0, isLie: false },
                        { answer: "一周多，主要是工作安排", nervousChange: 0, isLie: false }
                    ]
                },
                items: {
                    answers: [
                        { answer: "样衣和面料样品，都有发票", nervousChange: 0, isLie: false },
                        { answer: "公司采购的样品，有正规手续", nervousChange: 0, isLie: false }
                    ]
                },
                declaration: {
                    answers: [
                        { answer: "样品按规定申报了", nervousChange: 0, isLie: false },
                        { answer: "公司法务确认过申报事项", nervousChange: 0, isLie: false }
                    ]
                }
            }
        },
        items: [
            { icon: "👗", label: "样衣", suspicious: false, xrayShape: "[织物样品]" },
            { icon: "≋", label: "面料", suspicious: false, xrayShape: "[纺织材料]" },
            { icon: "📋", label: "订单资料", suspicious: false, xrayShape: "[文件夹]" },
            { icon: "💼", label: "商务包", suspicious: false, xrayShape: "[皮具]" },
            { icon: "👞", label: "皮鞋", suspicious: false, xrayShape: "[鞋类]" },
            { icon: "📱", label: "手机", suspicious: false, xrayShape: "[电子设备]" }
        ],
        hasViolation: false,
        correctDecision: "pass"
    },
    
    {
        passenger: {
            name: "陈女士",
            avatar: "👩",
            from: "荷兰阿姆斯特丹",
            baseNervousness: 45,
            behaviors: [
                { text: "年轻妈妈形象", type: "normal" },
                { text: "携带大量婴儿用品", type: "normal" },
                { text: "显得有些疲惫", type: "normal" },
                { text: "对孩子很关爱", type: "normal" }
            ],
            responses: {
                purpose: {
                    answers: [
                        { answer: "带孩子看外公外婆，孩子第一次坐长途飞机", nervousChange: 5, isLie: false },
                        { answer: "回国探亲，让孩子认识中国的家人", nervousChange: 8, isLie: false }
                    ]
                },
                duration: {
                    answers: [
                        { answer: "两个月，让孩子多待一段时间", nervousChange: 3, isLie: false },
                        { answer: "暑假期间，大概8周", nervousChange: 5, isLie: false }
                    ]
                },
                items: {
                    answers: [
                        { answer: "主要是孩子的用品，荷兰的奶粉比较好", nervousChange: 0, isLie: false },
                        { answer: "婴儿食品和玩具，都是日常用品", nervousChange: 0, isLie: false }
                    ]
                },
                declaration: {
                    answers: [
                        { answer: "婴儿用品应该不用申报吧？", nervousChange: 5, isLie: false },
                        { answer: "这些都是自用的，没超过限额", nervousChange: 8, isLie: false }
                    ]
                }
            }
        },
        items: [
            { icon: "🍼", label: "婴儿奶粉", suspicious: false, xrayShape: "[罐装食品]" },
            { icon: "🧸", label: "毛绒玩具", suspicious: false, xrayShape: "[软体玩具]" },
            { icon: "👶", label: "婴儿服装", suspicious: false, xrayShape: "[小衣物]" },
            { icon: "🧴", label: "洗护用品", suspicious: false, xrayShape: "[液体容器]" },
            { icon: "📱", label: "手机", suspicious: false, xrayShape: "[电子设备]" },
            { icon: "🎀", label: "小饰品", suspicious: false, xrayShape: "[装饰品]" }
        ],
        hasViolation: false,
        correctDecision: "pass"
    },
    
    {
        passenger: {
            name: "林教授",
            avatar: "👨",
            from: "瑞士苏黎世",
            baseNervousness: 20,
            behaviors: [
                { text: "学者风范，戴眼镜", type: "normal" },
                { text: "携带学术证件", type: "normal" },
                { text: "言谈举止斯文", type: "normal" },
                { text: "对检查程序很理解", type: "normal" }
            ],
            responses: {
                purpose: {
                    answers: [
                        { answer: "国际学术会议，发表环保研究成果", nervousChange: 0, isLie: false },
                        { answer: "受邀参加可持续发展论坛", nervousChange: 0, isLie: false }
                    ]
                },
                duration: {
                    answers: [
                        { answer: "一周，会议后还要访问几所大学", nervousChange: 0, isLie: false },
                        { answer: "7天，安排得比较紧", nervousChange: 0, isLie: false }
                    ]
                },
                items: {
                    answers: [
                        { answer: "学术资料和一些瑞士特产", nervousChange: 0, isLie: false },
                        { answer: "研究报告和给同事的小礼品", nervousChange: 0, isLie: false }
                    ]
                },
                declaration: {
                    answers: [
                        { answer: "学术用品和少量礼品，符合规定", nervousChange: 0, isLie: false },
                        { answer: "都在免税额度内", nervousChange: 0, isLie: false }
                    ]
                }
            }
        },
        items: [
            { icon: "📚", label: "学术期刊", suspicious: false, xrayShape: "[书籍]" },
            { icon: "💻", label: "笔记本电脑", suspicious: false, xrayShape: "[电子设备]" },
            { icon: "🍫", label: "瑞士巧克力", suspicious: false, xrayShape: "[包装食品]" },
            { icon: "⌚", label: "瑞士手表", suspicious: false, xrayShape: "[精密仪器]" },
            { icon: "📊", label: "研究数据", suspicious: false, xrayShape: "[文件]" },
            { icon: "🎓", label: "证书奖状", suspicious: false, xrayShape: "[证件]" }
        ],
        hasViolation: false,
        correctDecision: "pass"
    },
    
    {
        passenger: {
            name: "周女士",
            avatar: "👩",
            from: "澳大利亚墨尔本",
            baseNervousness: 55,
            behaviors: [
                { text: "中年华人，略显紧张", type: "suspicious" },
                { text: "频繁整理行李", type: "suspicious" },
                { text: "回答问题时有些急躁", type: "suspicious" },
                { text: "强调时间紧迫", type: "normal" }
            ],
            responses: {
                purpose: {
                    answers: [
                        { answer: "妈妈生病了，赶回来照顾", nervousChange: 10, isLie: false },
                        { answer: "家里有急事，买了最近的航班", nervousChange: 12, isLie: false }
                    ]
                },
                duration: {
                    answers: [
                        { answer: "不确定，要看妈妈的病情", nervousChange: 8, isLie: false },
                        { answer: "可能要待几个月，情况比较严重", nervousChange: 10, isLie: false }
                    ]
                },
                items: {
                    answers: [
                        { answer: "匆忙收拾的，主要是生活必需品", nervousChange: 5, isLie: false },
                        { answer: "澳洲的保健品，对老人身体有好处", nervousChange: 8, isLie: false }
                    ]
                },
                declaration: {
                    answers: [
                        { answer: "都是自用的，没想太多申报的事", nervousChange: 10, isLie: false },
                        { answer: "保健品应该可以带吧？", nervousChange: 12, isLie: false }
                    ]
                }
            }
        },
        items: [
            { icon: "💊", label: "澳洲保健品", suspicious: false, xrayShape: "[瓶装保健品]" },
            { icon: "🍯", label: "蜂胶制品", suspicious: false, xrayShape: "[瓶装]" },
            { icon: "👕", label: "换洗衣物", suspicious: false, xrayShape: "[织物]" },
            { icon: "💄", label: "护肤品", suspicious: false, xrayShape: "[小瓶罐]" },
            { icon: "📱", label: "手机充电器", suspicious: false, xrayShape: "[电子配件]" },
            { icon: "📋", label: "医院资料", suspicious: false, xrayShape: "[文件]" }
        ],
        hasViolation: false,
        correctDecision: "pass"
    },
    
    {
        passenger: {
            name: "赵先生",
            avatar: "👨",
            from: "西班牙马德里",
            baseNervousness: 40,
            behaviors: [
                { text: "艺术家气质", type: "normal" },
                { text: "穿着随意但有品味", type: "normal" },
                { text: "携带画具和作品", type: "normal" },
                { text: "谈论艺术时很兴奋", type: "normal" }
            ],
            responses: {
                purpose: {
                    answers: [
                        { answer: "艺术交流，参加画展开幕式", nervousChange: 3, isLie: false },
                        { answer: "受邀参加当代艺术展览", nervousChange: 5, isLie: false }
                    ]
                },
                duration: {
                    answers: [
                        { answer: "三周，还要去几个城市看展", nervousChange: 0, isLie: false },
                        { answer: "一个月左右，艺术之旅", nervousChange: 3, isLie: false }
                    ]
                },
                items: {
                    answers: [
                        { answer: "绘画作品和艺术用品", nervousChange: 0, isLie: false },
                        { answer: "一些画作和专业画材", nervousChange: 0, isLie: false }
                    ]
                },
                declaration: {
                    answers: [
                        { answer: "艺术品有相关证明文件", nervousChange: 0, isLie: false },
                        { answer: "画廊提供了作品证书", nervousChange: 0, isLie: false }
                    ]
                }
            }
        },
        items: [
            { icon: "🎨", label: "绘画作品", suspicious: false, xrayShape: "[画框]" },
            { icon: "🖌️", label: "画笔画材", suspicious: false, xrayShape: "[艺术工具]" },
            { icon: "📜", label: "艺术证书", suspicious: false, xrayShape: "[卷状文件]" },
            { icon: "📸", label: "相机", suspicious: false, xrayShape: "[电子设备]" },
            { icon: "👕", label: "艺术T恤", suspicious: false, xrayShape: "[织物]" },
            { icon: "📚", label: "艺术画册", suspicious: false, xrayShape: "[厚书本]" }
        ],
        hasViolation: false,
        correctDecision: "pass"
    },
    
    {
        passenger: {
            name: "孙医生",
            avatar: "👩",
            from: "瑞典斯德哥尔摩",
            baseNervousness: 25,
            behaviors: [
                { text: "职业女性装扮", type: "normal" },
                { text: "携带医疗行业证件", type: "normal" },
                { text: "谈吐专业严谨", type: "normal" },
                { text: "对医疗话题很专业", type: "normal" }
            ],
            responses: {
                purpose: {
                    answers: [
                        { answer: "医学研讨会，分享北欧医疗经验", nervousChange: 0, isLie: false },
                        { answer: "受邀参加妇产科国际会议", nervousChange: 0, isLie: false }
                    ]
                },
                duration: {
                    answers: [
                        { answer: "两周，会议加医院参观", nervousChange: 0, isLie: false },
                        { answer: "半个月，还要做学术交流", nervousChange: 0, isLie: false }
                    ]
                },
                items: {
                    answers: [
                        { answer: "医疗资料和一些北欧保健品", nervousChange: 0, isLie: false },
                        { answer: "学术论文和瑞典特产", nervousChange: 0, isLie: false }
                    ]
                },
                declaration: {
                    answers: [
                        { answer: "医疗样品都有正规手续", nervousChange: 0, isLie: false },
                        { answer: "学术用品已经申报", nervousChange: 0, isLie: false }
                    ]
                }
            }
        },
        items: [
            { icon: "📋", label: "医疗论文", suspicious: false, xrayShape: "[医疗文件]" },
            { icon: "💊", label: "北欧保健品", suspicious: false, xrayShape: "[药品包装]" },
            { icon: "🔬", label: "医疗器械", suspicious: false, xrayShape: "[精密仪器]" },
            { icon: "💻", label: "医疗数据", suspicious: false, xrayShape: "[电子设备]" },
            { icon: "🍯", label: "蜂蜜制品", suspicious: false, xrayShape: "[瓶装]" },
            { icon: "📱", label: "手机", suspicious: false, xrayShape: "[电子设备]" }
        ],
        hasViolation: false,
        correctDecision: "pass"
    },
    
    {
        passenger: {
            name: "吴先生",
            avatar: "👨",
            from: "比利时布鲁塞尔",
            baseNervousness: 30,
            behaviors: [
                { text: "欧盟外交官风范", type: "normal" },
                { text: "携带外交文件包", type: "normal" },
                { text: "多语言能力强", type: "normal" },
                { text: "对国际事务很了解", type: "normal" }
            ],
            responses: {
                purpose: {
                    answers: [
                        { answer: "参加中欧贸易论坛，政府间会议", nervousChange: 0, isLie: false },
                        { answer: "欧盟代表团访问，经贸合作", nervousChange: 0, isLie: false }
                    ]
                },
                duration: {
                    answers: [
                        { answer: "一周，密集的会议安排", nervousChange: 0, isLie: false },
                        { answer: "7天，官方访问行程", nervousChange: 0, isLie: false }
                    ]
                },
                items: {
                    answers: [
                        { answer: "会议文件和比利时特产", nervousChange: 0, isLie: false },
                        { answer: "外交资料和一些欧洲礼品", nervousChange: 0, isLie: false }
                    ]
                },
                declaration: {
                    answers: [
                        { answer: "外交物品按程序申报", nervousChange: 0, isLie: false },
                        { answer: "都是官方用品和礼品", nervousChange: 0, isLie: false }
                    ]
                }
            }
        },
        items: [
            { icon: "📋", label: "外交文件", suspicious: false, xrayShape: "[机密文件]" },
            { icon: "🍫", label: "比利时巧克力", suspicious: false, xrayShape: "[精装礼盒]" },
            { icon: "💼", label: "公文包", suspicious: false, xrayShape: "[皮质公文包]" },
            { icon: "🏛️", label: "纪念品", suspicious: false, xrayShape: "[金属工艺品]" },
            { icon: "💻", label: "外交电脑", suspicious: false, xrayShape: "[加密设备]" },
            { icon: "📱", label: "加密手机", suspicious: false, xrayShape: "[特殊设备]" }
        ],
        hasViolation: false,
        correctDecision: "pass"
    },
    
    {
        passenger: {
            name: "徐女士",
            avatar: "👩",
            from: "挪威奥斯陆",
            baseNervousness: 35,
            behaviors: [
                { text: "环保主义者装扮", type: "normal" },
                { text: "携带有机食品", type: "normal" },
                { text: "谈论环保话题", type: "normal" },
                { text: "对自然产品很了解", type: "normal" }
            ],
            responses: {
                purpose: {
                    answers: [
                        { answer: "环保会议，推广可持续生活", nervousChange: 2, isLie: false },
                        { answer: "绿色技术交流，学习经验", nervousChange: 5, isLie: false }
                    ]
                },
                duration: {
                    answers: [
                        { answer: "两周，还要考察环保项目", nervousChange: 0, isLie: false },
                        { answer: "半个月，深度环保之旅", nervousChange: 3, isLie: false }
                    ]
                },
                items: {
                    answers: [
                        { answer: "挪威的天然有机产品", nervousChange: 0, isLie: false },
                        { answer: "环保用品和有机食品", nervousChange: 0, isLie: false }
                    ]
                },
                declaration: {
                    answers: [
                        { answer: "都是天然有机的，应该没问题", nervousChange: 5, isLie: false },
                        { answer: "有机认证的产品", nervousChange: 8, isLie: false }
                    ]
                }
            }
        },
        items: [
            { icon: "🌿", label: "有机茶叶", suspicious: false, xrayShape: "[包装茶叶]" },
            { icon: "🍯", label: "野生蜂蜜", suspicious: false, xrayShape: "[天然蜂蜜]" },
            { icon: "🧴", label: "天然护肤品", suspicious: false, xrayShape: "[有机化妆品]" },
            { icon: "🥜", label: "坚果制品", suspicious: false, xrayShape: "[包装坚果]" },
            { icon: "📚", label: "环保书籍", suspicious: false, xrayShape: "[环保资料]" },
            { icon: "🎒", label: "环保背包", suspicious: false, xrayShape: "[环保材质]" }
        ],
        hasViolation: false,
        correctDecision: "pass"
    },
    
    {
        passenger: {
            name: "谢先生",
            avatar: "👨",
            from: "奥地利维也纳",
            baseNervousness: 20,
            behaviors: [
                { text: "音乐家气质", type: "normal" },
                { text: "携带乐器盒", type: "normal" },
                { text: "谈论音乐时很投入", type: "normal" },
                { text: "举止优雅有艺术范", type: "normal" }
            ],
            responses: {
                purpose: {
                    answers: [
                        { answer: "音乐节演出，受邀参加交响乐团", nervousChange: 0, isLie: false },
                        { answer: "古典音乐交流，大师班教学", nervousChange: 0, isLie: false }
                    ]
                },
                duration: {
                    answers: [
                        { answer: "一个月，音乐节期间", nervousChange: 0, isLie: false },
                        { answer: "四周，演出和教学", nervousChange: 0, isLie: false }
                    ]
                },
                items: {
                    answers: [
                        { answer: "乐器和乐谱，还有音乐CD", nervousChange: 0, isLie: false },
                        { answer: "演出用品和一些奥地利纪念品", nervousChange: 0, isLie: false }
                    ]
                },
                declaration: {
                    answers: [
                        { answer: "乐器有保险和证书", nervousChange: 0, isLie: false },
                        { answer: "音乐用品都有正规手续", nervousChange: 0, isLie: false }
                    ]
                }
            }
        },
        items: [
            { icon: "🎻", label: "小提琴", suspicious: false, xrayShape: "[弦乐器]" },
            { icon: "🎼", label: "乐谱", suspicious: false, xrayShape: "[音乐文件]" },
            { icon: "💿", label: "古典音乐CD", suspicious: false, xrayShape: "[光盘]" },
            { icon: "🎩", label: "演出服装", suspicious: false, xrayShape: "[正装]" },
            { icon: "⌚", label: "音乐家手表", suspicious: false, xrayShape: "[精密仪器]" },
            { icon: "📱", label: "录音设备", suspicious: false, xrayShape: "[音频设备]" }
        ],
        hasViolation: false,
        correctDecision: "pass"
    },
    
    {
        passenger: {
            name: "黄女士",
            avatar: "👩",
            from: "丹麦哥本哈根",
            baseNervousness: 50,
            behaviors: [
                { text: "设计师打扮", type: "normal" },
                { text: "对美学很有见解", type: "normal" },
                { text: "携带设计作品", type: "normal" },
                { text: "略显疲惫但兴奋", type: "normal" }
            ],
            responses: {
                purpose: {
                    answers: [
                        { answer: "设计展览，展示北欧设计理念", nervousChange: 5, isLie: false },
                        { answer: "工业设计交流，学习制造工艺", nervousChange: 8, isLie: false }
                    ]
                },
                duration: {
                    answers: [
                        { answer: "三周，设计周期间", nervousChange: 3, isLie: false },
                        { answer: "一个月，深度设计考察", nervousChange: 5, isLie: false }
                    ]
                },
                items: {
                    answers: [
                        { answer: "设计样品和丹麦设计产品", nervousChange: 0, isLie: false },
                        { answer: "创意作品和一些设计工具", nervousChange: 0, isLie: false }
                    ]
                },
                declaration: {
                    answers: [
                        { answer: "设计样品都有价值证明", nervousChange: 0, isLie: false },
                        { answer: "展览用品，有官方邀请函", nervousChange: 0, isLie: false }
                    ]
                }
            }
        },
        items: [
            { icon: "📐", label: "设计工具", suspicious: false, xrayShape: "[设计仪器]" },
            { icon: "🎨", label: "设计作品", suspicious: false, xrayShape: "[创意物品]" },
            { icon: "💻", label: "设计软件", suspicious: false, xrayShape: "[专业电脑]" },
            { icon: "📚", label: "设计书籍", suspicious: false, xrayShape: "[设计资料]" },
            { icon: "🕯️", label: "丹麦蜡烛", suspicious: false, xrayShape: "[工艺蜡烛]" },
            { icon: "🧸", label: "设计玩具", suspicious: false, xrayShape: "[创意玩具]" }
        ],
        hasViolation: false,
        correctDecision: "pass"
    },
    
    // === 新增违禁品案例 (10个) ===
    {
        passenger: {
            name: "刘某某",
            avatar: "👨",
            from: "老挝万象",
            baseNervousness: 70,
            behaviors: [
                { text: "眼神闪躲不定", type: "suspicious" },
                { text: "手心出汗明显", type: "suspicious" },
                { text: "回答问题前停顿很久", type: "suspicious" },
                { text: "频繁摸自己的行李", type: "suspicious" }
            ],
            responses: {
                purpose: {
                    answers: [
                        { answer: "呃...商务考察...木材生意", nervousChange: 20, isLie: true },
                        { answer: "朋友介绍的...投资机会", nervousChange: 25, isLie: true }
                    ]
                },
                duration: {
                    answers: [
                        { answer: "一周...不对，十天", nervousChange: 15, isLie: true },
                        { answer: "短期的，很快就回去", nervousChange: 18, isLie: true }
                    ]
                },
                items: {
                    answers: [
                        { answer: "木制工艺品...都是正常的", nervousChange: 30, isLie: true },
                        { answer: "老挝特产，朋友要的", nervousChange: 35, isLie: true }
                    ]
                },
                declaration: {
                    answers: [
                        { answer: "工艺品需要申报吗？", nervousChange: 25, isLie: true },
                        { answer: "我不太懂这些规定", nervousChange: 30, isLie: true }
                    ]
                }
            }
        },
        items: [
            { icon: "🎋", label: "竹制品", suspicious: false, xrayShape: "[竹制工艺]" },
            { icon: "🪵", label: "木雕", suspicious: false, xrayShape: "[木制品]" },
            { icon: "🌿", label: "植物标本", suspicious: true, reason: "红木制品，珍贵木材走私", type: "wood", xrayShape: "[高密度木材]" },
            { icon: "🎁", label: "礼品盒", suspicious: false, xrayShape: "[包装盒]" },
            { icon: "📱", label: "手机", suspicious: false, xrayShape: "[电子设备]" },
            { icon: "💼", label: "提包", suspicious: false, xrayShape: "[皮具]" }
        ],
        hasViolation: true,
        correctDecision: "detain"
    },
    
    {
        passenger: {
            name: "李某",
            avatar: "👩",
            from: "土耳其伊斯坦布尔",
            baseNervousness: 60,
            behaviors: [
                { text: "穿着传统服饰", type: "normal" },
                { text: "表现略显紧张", type: "suspicious" },
                { text: "携带很多小包裹", type: "suspicious" },
                { text: "说话声音较小", type: "suspicious" }
            ],
            responses: {
                purpose: {
                    answers: [
                        { answer: "文化交流...带些土耳其特产", nervousChange: 15, isLie: true },
                        { answer: "旅游购物，买了很多东西", nervousChange: 20, isLie: true }
                    ]
                },
                duration: {
                    answers: [
                        { answer: "两周，主要是购物", nervousChange: 10, isLie: true },
                        { answer: "半个月，逛了很多市场", nervousChange: 12, isLie: true }
                    ]
                },
                items: {
                    answers: [
                        { answer: "地毯、香料、还有一些手工艺品", nervousChange: 20, isLie: true },
                        { answer: "都是土耳其的传统商品", nervousChange: 25, isLie: true }
                    ]
                },
                declaration: {
                    answers: [
                        { answer: "个人使用的，应该不用申报", nervousChange: 18, isLie: true },
                        { answer: "手工艺品...不是商业用途", nervousChange: 22, isLie: true }
                    ]
                }
            }
        },
        items: [
            { icon: "🧿", label: "土耳其饰品", suspicious: false, xrayShape: "[装饰品]" },
            { icon: "🗿", label: "地毯", suspicious: false, xrayShape: "[编织品]" },
            { icon: "⚗️", label: "香料", suspicious: true, reason: "疑似海洛因，隐藏在香料中", type: "drugs", xrayShape: "[可疑粉末包装]" },
            { icon: "☕", label: "土耳其咖啡", suspicious: false, xrayShape: "[包装食品]" },
            { icon: "💍", label: "手工首饰", suspicious: false, xrayShape: "[金属饰品]" },
            { icon: "📿", label: "念珠", suspicious: false, xrayShape: "[珠串]" }
        ],
        hasViolation: true,
        correctDecision: "detain"
    },
    
    {
        passenger: {
            name: "张某",
            avatar: "👨",
            from: "委内瑞拉加拉加斯",
            baseNervousness: 45,
            behaviors: [
                { text: "表面镇定", type: "normal" },
                { text: "眼神有些回避", type: "suspicious" },
                { text: "对检查程序很熟悉", type: "suspicious" },
                { text: "频繁检查时间", type: "suspicious" }
            ],
            responses: {
                purpose: {
                    answers: [
                        { answer: "石油工程师，技术交流", nervousChange: 8, isLie: true },
                        { answer: "能源合作项目，政府邀请", nervousChange: 10, isLie: true }
                    ]
                },
                duration: {
                    answers: [
                        { answer: "一个月，项目周期比较长", nervousChange: 5, isLie: true },
                        { answer: "四周左右，具体看进展", nervousChange: 8, isLie: true }
                    ]
                },
                items: {
                    answers: [
                        { answer: "技术资料和一些样品", nervousChange: 15, isLie: true },
                        { answer: "工程设备和委内瑞拉特产", nervousChange: 18, isLie: true }
                    ]
                },
                declaration: {
                    answers: [
                        { answer: "技术设备有相关证明", nervousChange: 12, isLie: true },
                        { answer: "都是合法的工程用品", nervousChange: 15, isLie: true }
                    ]
                }
            }
        },
        items: [
            { icon: "📋", label: "技术文件", suspicious: false, xrayShape: "[工程资料]" },
            { icon: "⚙️", label: "机械零件", suspicious: false, xrayShape: "[金属配件]" },
            { icon: "🔋", label: "电池组", suspicious: false, xrayShape: "[电子元件]" },
            { icon: "☕", label: "咖啡豆", suspicious: true, reason: "可卡因，隐藏在咖啡豆中", type: "drugs", xrayShape: "[异常密度咖啡豆]" },
            { icon: "💻", label: "工程电脑", suspicious: false, xrayShape: "[电子设备]" },
            { icon: "🎒", label: "工具包", suspicious: false, xrayShape: "[工具袋]" }
        ],
        hasViolation: true,
        correctDecision: "detain"
    },
    
    {
        passenger: {
            name: "王某某",
            avatar: "👩",
            from: "肯尼亚内罗毕",
            baseNervousness: 80,
            behaviors: [
                { text: "极度紧张", type: "suspicious" },
                { text: "双手颤抖明显", type: "suspicious" },
                { text: "回答问题语无伦次", type: "suspicious" },
                { text: "试图快速通过", type: "suspicious" }
            ],
            responses: {
                purpose: {
                    answers: [
                        { answer: "旅游...野生动物摄影", nervousChange: 25, isLie: true },
                        { answer: "自然保护...志愿工作", nervousChange: 30, isLie: true }
                    ]
                },
                duration: {
                    answers: [
                        { answer: "三个月...不对，一个月", nervousChange: 20, isLie: true },
                        { answer: "时间不确定...看情况", nervousChange: 25, isLie: true }
                    ]
                },
                items: {
                    answers: [
                        { answer: "纪念品...都是合法的！", nervousChange: 40, isLie: true },
                        { answer: "肯尼亚特产...没有违禁品！", nervousChange: 45, isLie: true }
                    ]
                },
                declaration: {
                    answers: [
                        { answer: "什么都没有！都是正常的！", nervousChange: 35, isLie: true },
                        { answer: "我不知道要申报什么", nervousChange: 40, isLie: true }
                    ]
                }
            }
        },
        items: [
            { icon: "📷", label: "相机", suspicious: false, xrayShape: "[摄影设备]" },
            { icon: "🎭", label: "面具", suspicious: false, xrayShape: "[工艺品]" },
            { icon: "🦏", label: "动物雕塑", suspicious: true, reason: "犀牛角制品，濒危动物制品", type: "animal", xrayShape: "[高密度角质]" },
            { icon: "📿", label: "项链", suspicious: false, xrayShape: "[装饰品]" },
            { icon: "🍯", label: "蜂蜜", suspicious: false, xrayShape: "[瓶装液体]" },
            { icon: "👕", label: "纪念T恤", suspicious: false, xrayShape: "[织物]" }
        ],
        hasViolation: true,
        correctDecision: "detain"
    },
    
    {
        passenger: {
            name: "陈某",
            avatar: "👨",
            from: "洪都拉斯特古西加尔巴",
            baseNervousness: 55,
            behaviors: [
                { text: "表现友好", type: "normal" },
                { text: "略显紧张", type: "suspicious" },
                { text: "对价格话题敏感", type: "suspicious" },
                { text: "强调经济困难", type: "suspicious" }
            ],
            responses: {
                purpose: {
                    answers: [
                        { answer: "打工赚钱，寄钱给家里", nervousChange: 10, isLie: true },
                        { answer: "朋友介绍的工作机会", nervousChange: 15, isLie: true }
                    ]
                },
                duration: {
                    answers: [
                        { answer: "两年合同，好好工作", nervousChange: 8, isLie: true },
                        { answer: "长期工作，改善生活", nervousChange: 12, isLie: true }
                    ]
                },
                items: {
                    answers: [
                        { answer: "生活用品和家乡特产", nervousChange: 18, isLie: true },
                        { answer: "不值钱的东西，都是自用", nervousChange: 22, isLie: true }
                    ]
                },
                declaration: {
                    answers: [
                        { answer: "穷人的东西，没什么好申报的", nervousChange: 15, isLie: true },
                        { answer: "都是便宜货，不用申报吧", nervousChange: 20, isLie: true }
                    ]
                }
            }
        },
        items: [
            { icon: "👕", label: "旧衣服", suspicious: false, xrayShape: "[二手织物]" },
            { icon: "📱", label: "手机", suspicious: false, xrayShape: "[电子设备]" },
            { icon: "🚬", label: "香烟", suspicious: true, reason: "超量烟草制品，涉嫌走私", type: "tobacco", xrayShape: "[大量烟盒]" },
            { icon: "🍫", label: "巧克力", suspicious: false, xrayShape: "[包装食品]" },
            { icon: "💰", label: "钱包", suspicious: false, xrayShape: "[皮质钱包]" },
            { icon: "🎒", label: "背包", suspicious: false, xrayShape: "[旧背包]" }
        ],
        hasViolation: true,
        correctDecision: "detain"
    },
    
    {
        passenger: {
            name: "赵某某",
            avatar: "👩",
            from: "秘鲁利马",
            baseNervousness: 75,
            behaviors: [
                { text: "神色慌张", type: "suspicious" },
                { text: "说话结结巴巴", type: "suspicious" },
                { text: "避免眼神接触", type: "suspicious" },
                { text: "频繁整理衣服", type: "suspicious" }
            ],
            responses: {
                purpose: {
                    answers: [
                        { answer: "文化...文化交流活动", nervousChange: 30, isLie: true },
                        { answer: "学习...学习中文", nervousChange: 35, isLie: true }
                    ]
                },
                duration: {
                    answers: [
                        { answer: "半年...语言课程", nervousChange: 20, isLie: true },
                        { answer: "六个月...文化学习", nervousChange: 25, isLie: true }
                    ]
                },
                items: {
                    answers: [
                        { answer: "学习用品...和秘鲁特产", nervousChange: 40, isLie: true },
                        { answer: "都是...都是正常的东西", nervousChange: 45, isLie: true }
                    ]
                },
                declaration: {
                    answers: [
                        { answer: "学生用品...不用申报的", nervousChange: 35, isLie: true },
                        { answer: "我...我什么都没有", nervousChange: 40, isLie: true }
                    ]
                }
            }
        },
        items: [
            { icon: "📚", label: "西语教材", suspicious: false, xrayShape: "[语言书籍]" },
            { icon: "🧸", label: "羊驼玩具", suspicious: false, xrayShape: "[毛绒玩具]" },
            { icon: "☕", label: "秘鲁咖啡", suspicious: false, xrayShape: "[包装咖啡]" },
            { icon: "≋≋", label: "白色粉末", suspicious: true, reason: "可卡因，南美洲毒品", type: "drugs", xrayShape: "[粉末状物质]" },
            { icon: "👕", label: "传统服装", suspicious: false, xrayShape: "[民族服饰]" },
            { icon: "🎒", label: "学生背包", suspicious: false, xrayShape: "[背包]" }
        ],
        hasViolation: true,
        correctDecision: "detain"
    },
    
    {
        passenger: {
            name: "孙某",
            avatar: "👨",
            from: "塞拉利昂弗里敦",
            baseNervousness: 65,
            behaviors: [
                { text: "表面平静", type: "normal" },
                { text: "回答过于详细", type: "suspicious" },
                { text: "频繁提到贫穷", type: "suspicious" },
                { text: "对检查表示理解", type: "normal" }
            ],
            responses: {
                purpose: {
                    answers: [
                        { answer: "钻石生意，帮朋友带些样品", nervousChange: 15, isLie: true },
                        { answer: "珠宝贸易，小本生意", nervousChange: 20, isLie: true }
                    ]
                },
                duration: {
                    answers: [
                        { answer: "一个月，看市场情况", nervousChange: 10, isLie: true },
                        { answer: "四周，做些小买卖", nervousChange: 12, isLie: true }
                    ]
                },
                items: {
                    answers: [
                        { answer: "一些宝石样品，都有证书", nervousChange: 25, isLie: true },
                        { answer: "塞拉利昂的矿物标本", nervousChange: 30, isLie: true }
                    ]
                },
                declaration: {
                    answers: [
                        { answer: "样品都有正规手续", nervousChange: 20, isLie: true },
                        { answer: "这些都是合法的", nervousChange: 25, isLie: true }
                    ]
                }
            }
        },
        items: [
            { icon: "💎", label: "宝石样品", suspicious: true, reason: "血钻石，来源不明的冲突钻石", type: "diamond", xrayShape: "[高密度矿物]" },
            { icon: "📋", label: "证书文件", suspicious: false, xrayShape: "[证明文件]" },
            { icon: "⚖️", label: "小天平", suspicious: false, xrayShape: "[精密仪器]" },
            { icon: "💼", label: "样品盒", suspicious: false, xrayShape: "[金属盒子]" },
            { icon: "🔍", label: "放大镜", suspicious: false, xrayShape: "[光学仪器]" },
            { icon: "📱", label: "手机", suspicious: false, xrayShape: "[电子设备]" }
        ],
        hasViolation: true,
        correctDecision: "detain"
    },
    
    {
        passenger: {
            name: "周某某",
            avatar: "👩",
            from: "玻利维亚拉巴斯",
            baseNervousness: 50,
            behaviors: [
                { text: "土著服饰打扮", type: "normal" },
                { text: "携带传统工艺品", type: "normal" },
                { text: "对现代化设备好奇", type: "normal" },
                { text: "说话时眼神飘忽", type: "suspicious" }
            ],
            responses: {
                purpose: {
                    answers: [
                        { answer: "文化展示，传统手工艺", nervousChange: 12, isLie: true },
                        { answer: "民族文化交流活动", nervousChange: 15, isLie: true }
                    ]
                },
                duration: {
                    answers: [
                        { answer: "两个月，文化节期间", nervousChange: 8, isLie: true },
                        { answer: "一段时间，看活动安排", nervousChange: 10, isLie: true }
                    ]
                },
                items: {
                    answers: [
                        { answer: "传统手工艺品和药草", nervousChange: 20, isLie: true },
                        { answer: "玻利维亚的民族特产", nervousChange: 25, isLie: true }
                    ]
                },
                declaration: {
                    answers: [
                        { answer: "传统文化用品，应该可以", nervousChange: 18, isLie: true },
                        { answer: "祖传的草药，治病用的", nervousChange: 22, isLie: true }
                    ]
                }
            }
        },
        items: [
            { icon: "🎭", label: "传统面具", suspicious: false, xrayShape: "[木制面具]" },
            { icon: "🧵", label: "手工纺织品", suspicious: false, xrayShape: "[织物]" },
            { icon: "🌿", label: "古柯叶", suspicious: true, reason: "古柯叶，制作可卡因的原料", type: "drugs", xrayShape: "[植物叶片]" },
            { icon: "💍", label: "银饰", suspicious: false, xrayShape: "[金属饰品]" },
            { icon: "🏺", label: "陶器", suspicious: false, xrayShape: "[陶制品]" },
            { icon: "🎒", label: "传统背篓", suspicious: false, xrayShape: "[编织背包]" }
        ],
        hasViolation: true,
        correctDecision: "detain"
    },
    
    {
        passenger: {
            name: "郑某",
            avatar: "👨",
            from: "几内亚比绍比绍",
            baseNervousness: 40,
            behaviors: [
                { text: "表现自然", type: "normal" },
                { text: "对海关程序熟悉", type: "suspicious" },
                { text: "携带商务文件", type: "normal" },
                { text: "多次往返经验", type: "suspicious" }
            ],
            responses: {
                purpose: {
                    answers: [
                        { answer: "渔业合作，海产品贸易", nervousChange: 5, isLie: true },
                        { answer: "水产进出口生意", nervousChange: 8, isLie: true }
                    ]
                },
                duration: {
                    answers: [
                        { answer: "两周，商务洽谈", nervousChange: 3, isLie: true },
                        { answer: "半个月，谈合作项目", nervousChange: 5, isLie: true }
                    ]
                },
                items: {
                    answers: [
                        { answer: "海产品样品和商务资料", nervousChange: 15, isLie: true },
                        { answer: "贸易文件和一些特产", nervousChange: 18, isLie: true }
                    ]
                },
                declaration: {
                    answers: [
                        { answer: "商务样品，有贸易许可", nervousChange: 12, isLie: true },
                        { answer: "都是合法的贸易用品", nervousChange: 15, isLie: true }
                    ]
                }
            }
        },
        items: [
            { icon: "🐠", label: "海产品样品", suspicious: false, xrayShape: "[干制海产]" },
            { icon: "📋", label: "贸易合同", suspicious: false, xrayShape: "[商务文件]" },
            { icon: "🍯", label: "蜂蜜", suspicious: false, xrayShape: "[瓶装蜂蜜]" },
            { icon: "🐢", label: "海龟制品", suspicious: true, reason: "玳瑁制品，濒危动物制品", type: "animal", xrayShape: "[龟甲制品]" },
            { icon: "💼", label: "公文包", suspicious: false, xrayShape: "[商务皮包]" },
            { icon: "📱", label: "卫星电话", suspicious: false, xrayShape: "[通讯设备]" }
        ],
        hasViolation: true,
        correctDecision: "detain"
    },
    
    {
        passenger: {
            name: "高某某",
            avatar: "👩",
            from: "乌克兰基辅",
            baseNervousness: 85,
            behaviors: [
                { text: "情绪不稳定", type: "suspicious" },
                { text: "频繁擦汗", type: "suspicious" },
                { text: "声音颤抖", type: "suspicious" },
                { text: "试图转移话题", type: "suspicious" }
            ],
            responses: {
                purpose: {
                    answers: [
                        { answer: "逃难...不是，是投靠亲戚", nervousChange: 30, isLie: true },
                        { answer: "家里困难...来这里发展", nervousChange: 35, isLie: true }
                    ]
                },
                duration: {
                    answers: [
                        { answer: "不知道...可能很久", nervousChange: 25, isLie: true },
                        { answer: "看情况...家里不安全", nervousChange: 30, isLie: true }
                    ]
                },
                items: {
                    answers: [
                        { answer: "家当...所有的东西都在这里", nervousChange: 40, isLie: true },
                        { answer: "急忙收拾的...什么都带了", nervousChange: 45, isLie: true }
                    ]
                },
                declaration: {
                    answers: [
                        { answer: "都是生活用品！没有违禁品！", nervousChange: 35, isLie: true },
                        { answer: "我什么都不知道！", nervousChange: 40, isLie: true }
                    ]
                }
            }
        },
        items: [
            { icon: "👗", label: "衣物", suspicious: false, xrayShape: "[生活用品]" },
            { icon: "📱", label: "手机", suspicious: false, xrayShape: "[电子设备]" },
            { icon: "💊", label: "药品", suspicious: false, xrayShape: "[医疗用品]" },
            { icon: "🔫", label: "金属物品", suspicious: true, reason: "手枪零件，武器走私", type: "weapons", xrayShape: "[金属枪械部件]" },
            { icon: "💰", label: "现金", suspicious: false, xrayShape: "[纸币]" },
            { icon: "📿", label: "宗教用品", suspicious: false, xrayShape: "[十字架]" }
        ],
        hasViolation: true,
        correctDecision: "detain"
    }
];
