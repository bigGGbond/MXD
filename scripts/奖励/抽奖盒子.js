var 框横 = "#fUI/ChatBalloon.img/pet/25/s#";
var 框左 = "#fUI/ChatBalloon.img/pet/25/sw#";
var 框右 = "#fUI/ChatBalloon.img/pet/25/se#";
var �? = "#fUI/UIWindow.img/PersonalShop/BtBan/normal/0#";
var �? = "#fUI/UIWindow.img/PartySearch/check1#";
var 金币 = "#fUI/UIWindow.img/Item/BtCoin/normal/0#";
var 点券 = "#fUI/UIWindow.img/Item/BtCoin/normal/0#";
var 抵用 = "#fUI/UIWindow.img/Item/BtCoin/normal/0#";
var 蓝箭�? = "#fUI/UIWindow.img/itemSearch/BtRight/normal/0#";
var 蓝条 = "#fUI/Basic/Notice5/c#";
var 红心 = "#fEffect/ItemEff.img/5110000/1#";

var status = -1;
var 抽奖数组 = [
    // 物品ID, 数量, 最小概率区�?, 最大概率区�?, 参考价�?
    [4500033, 10,    1,  450, 1000],   // 黄金枫叶
    [4500034,  2,  451,  700, 1000],   // 暗影�?
    [0,  3000000,  701,  850, 1000],   // 金币
    [-1,        1,  851,  900, 2000],   // 低级武器皮肤
    [-2,     5000,  901,  927, 5000],   // 元宝
    [2022539,   1,  928,  954, 3000],   // 装备材料任选礼�?
    [-3,        1,  955,  971, 3000],   // 中级武器皮肤
    [2022540,   5,  972,  984, 2000],   // 材料换阶道具
    [2022541,   5,  985,  997, 2000],   // 满氪材料转换道具
    [-4,        1,  998, 1000, 5000]    // 高级武器皮肤
];

// 皮肤奖池配置
var 皮肤奖池 = {
    低级: [
        // [ID, 等级, �?/�?, 命中率]
        [1703530, 10,  3,   1], // 低级武器皮肤
        [1703599, 10,  7,   2], // 低级武器皮肤
        [1703529, 10, 11,   3], // 低级武器皮肤
        [1703566, 10, 17,   5], // 低级武器皮肤
        [1703554, 10, 22,   7], // 低级武器皮肤
        [1703504, 10, 29,   9], // 低级武器皮肤
        [1703499, 10, 36,  11], // 低级武器皮肤
        [1703524, 10, 42,  13], // 低级武器皮肤
        [1703475, 10, 49,  15], // 低级武器皮肤
        [1703496, 10, 57,  18], // 低级武器皮肤
        [1703441, 10, 64,  20], // 低级武器皮肤
        [1703465, 10, 72,  22], // 低级武器皮肤
        [1702980, 10, 80,  25]  // 低级武器皮肤
    ],
    中级: [
        // [ID, 等级, �?/�?, 命中率]
        [1703468, 10,   7,   2], // 中级武器皮肤
        [1703454, 10,  14,   4], // 中级武器皮肤
        [1703403, 10,  22,   7], // 中级武器皮肤
        [1703404, 10,  34,  11], // 中级武器皮肤
        [1703291, 10,  45,  14], // 中级武器皮肤
        [1703292, 10,  59,  18], // 中级武器皮肤
        [1703240, 10,  72,  22], // 中级武器皮肤
        [1703261, 10,  84,  26], // 中级武器皮肤
        [1703247, 10,  99,  31], // 中级武器皮肤
        [1703224, 10, 113,  35], // 中级武器皮肤
        [1703241, 10, 127,  40], // 中级武器皮肤
        [1703259, 10, 144,  45], // 中级武器皮肤
        [1703204, 10, 160,  50]  // 中级武器皮肤
    ],
    高级: [
        // [ID, 等级, �?/�?, 命中率]
        [1703302, 10,  33,  10], // 高级武器皮肤
        [1703303, 10,  68,  21], // 高级武器皮肤
        [1703304, 10, 110,  34], // 高级武器皮肤
        [1702627, 10, 169,  53], // 高级武器皮肤
        [1702969, 10, 224,  70], // 高级武器皮肤
        [1702875, 10, 293,  91], // 高级武器皮肤
        [1703592, 10, 358, 112], // 高级武器皮肤
        [1703238, 10, 420, 131], // 高级武器皮肤
        [1703091, 10, 495, 155], // 高级武器皮肤
        [1702374, 10, 567, 177], // 高级武器皮肤
        [1702912, 10, 637, 199], // 高级武器皮肤
        [1703005, 10, 719, 225], // 高级武器皮肤
        [1703498, 10, 800, 250]  // 高级武器皮肤
    ]
};

var 盒子代码 = 2022467;
var 次数;

// 添加每日和每周累冲配�?
var 每日累冲配置 = [
    {金额: 400, 抽奖次数: 1},
    {金额: 800, 抽奖次数: 1},
    {金额: 1500, 抽奖次数: 1}
];

var 每周累冲配置 = [
    {金额: 1000, 抽奖次数: 0},
    {金额: 1500, 抽奖次数: 1},
    {金额: 2000, 抽奖次数: 1},
    {金额: 2500, 抽奖次数: 1},
    {金额: 3500, 抽奖次数: 1},
    {金额: 4500, 抽奖次数: 1},
    {金额: 5500, 抽奖次数: 2},
    {金额: 7000, 抽奖次数: 2},
    {金额: 8500, 抽奖次数: 2},
    {金额: 10000, 抽奖次数: 2}
];

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    var 等级 = cm.getPlayer().getLevel();
    if (mode == -1) {
        cm.dispose();
    } else {
        if (status >= 0 && mode == 0) {
            cm.sendOk("感谢你的光临�?");
            cm.dispose();
            return;
        }
        if (mode == 1) {
            status++;
        } else {
            status--;
        }
        if (status == 0) {
            // 获取充值信息和可用次数
            var 每日充值金�? = cm.getBossLog("每日充值金�?");
            var 每周充值金�? = cm.getBossLog("每周充值金�?");
            var 每日抽奖次数 = 计算每日抽奖次数(每日充值金�?);
            var 每周抽奖次数 = 计算每周抽奖次数(每周充值金�?);
            var 已用次数 = 获取已用次数();
            var 剩余次数 = 每日抽奖次数 + 每周抽奖次数 - 已用次数;

            if (剩余次数 <= 0) {
                cm.sendOk("您今日的抽奖次数已用完。\r\n每日累冲达到以下金额可获得抽奖次数：\r\n400元宝�?1次\r\n800元宝�?1次\r\n1500元宝�?1次\r\n\r\n每周累冲达到以下金额可获得抽奖次数：\r\n1500元宝�?1次\r\n2000元宝�?1次\r\n2500元宝�?1次\r\n3500元宝�?1次\r\n4500元宝�?1次\r\n5500元宝�?2次\r\n7000元宝�?2次\r\n8500元宝�?2次\r\n10000元宝�?2�?");
                cm.dispose();
                return;
            }

            // 初始化抽奖次�?
            次数 = cm.itemQuantity(盒子代码) >= 10 ? Math.min(10, 剩余次数) : Math.min(1, 剩余次数);

            var text = "";
            text += "#w";
            text += "" + 框横 + 框横 + 框横 + 框横 + 框横 + 框横 + 框横 + 框横 + 框横 + "#r#e『抽奖盒子�?#k" + 框横 + 框横 + 框横 + 框横 + 框横 + 框横 + 框横 + 框横 + "#n";
            text += "\r\n"
            text += "#k冒险�? #b#h # #k你好，我是抽奖盒子！\r\n"
            text += "" + 蓝条 + "\r\n";
            text += "\r\n";
            text += "#e当前充值情况：#n\r\n";
            text += "每日累冲�?" + 每日充值金�? + " 元宝 (可抽�? " + 每日抽奖次数 + " �?)\r\n";
            text += "每周累冲�?" + 每周充值金�? + " 元宝 (可抽�? " + 每周抽奖次数 + " �?)\r\n";
            text += "剩余抽奖次数�?" + 剩余次数 + "\r\n\r\n";
            text += "抽奖箱可获得以下物品，完全随机，看脸#l\r\n"
            text += "\r\n";
            text += "#b奖池详情�?#k\r\n";
            text += "\r\n";
            
            // 显示所有奖�?
            for (var i = 0; i < 抽奖数组.length; i++) {
                var item = 抽奖数组[i];
                var 物品名称 = "";
                
                if (item[0] > 0) {
                    物品名称 = "#v" + item[0] + "##z" + item[0] + "#";
                } else if (item[0] === 0) {
                    物品名称 = "#v2140002#金币";
                } else if (item[0] === -1) {
                    物品名称 = "低级武器皮肤";
                } else if (item[0] === -2) {
                    物品名称 = "#v4032733#元宝";
                } else if (item[0] === -3) {
                    物品名称 = "中级武器皮肤";
                } else if (item[0] === -4) {
                    物品名称 = "高级武器皮肤";
                }
                
                text += 物品名称 + " x " + item[1] + "\r\n";
            }
            
            text += "\r\n";
            text += "" + 框左 + 框横 + 框横 + 框横 + 框横 + 框横 + 框横 + 框横 + 框横 + 框横 + 框横 + 框横 + 框横 + 框横 + 框横 + 框横 + 框横 + 框横 + 框横 + 框横 + 框横 + 框横 + 框右 + "#n\r\n\r\n";
            
            if (cm.itemQuantity(盒子代码) >= 10) {
                cm.sendYesNo("检测到10�?#v" + 盒子代码 + "#，将进行十连抽！\r\n" + text);
            } else {
                cm.sendYesNo("检测到不足10�?#v" + 盒子代码 + "#，将进行单抽！\r\n" + text);
            }
        } else if (status == 1) {
            // 再次检查次�?
            var 每日充值金�? = cm.getBossLog("每日充值金�?");
            var 每周充值金�? = cm.getBossLog("每周充值金�?");
            var 每日抽奖次数 = 计算每日抽奖次数(每日充值金�?);
            var 每周抽奖次数 = 计算每周抽奖次数(每周充值金�?);
            var 已用次数 = 获取已用次数();
            var 剩余次数 = 每日抽奖次数 + 每周抽奖次数 - 已用次数;

            if (剩余次数 <= 0) {
                cm.sendOk("您的抽奖次数已用完�?");
                cm.dispose();
                return;
            }

            // 重新检查并初始化抽奖次�?
            次数 = cm.itemQuantity(盒子代码) >= 10 ? Math.min(10, 剩余次数) : Math.min(1, 剩余次数);

            if (cm.itemQuantity(盒子代码) < 次数) {
                cm.sendOk("你似乎没有[" + 次数 + "]�?#v" + 盒子代码 + "#");
                    cm.dispose();
                    return;
                }

            // 检查背包空�?
            if (cm.getInventory(1).isFull(次数 - 1)) {
                cm.sendOk("#b请保证装备栏位至少有" + 次数 + "个空�?,否则无法进行操作.");
                cm.dispose();
                return;
            }
            if (cm.getInventory(2).isFull(次数 - 1)) {
                cm.sendOk("#b请保证消耗栏位至少有" + 次数 + "个空�?,否则无法进行操作.");
                cm.dispose();
                return;
            }
            if (cm.getInventory(4).isFull(次数 - 1)) {
                cm.sendOk("#b请保证其它栏位至少有" + 次数 + "个空�?,否则无法进行操作.");
                    cm.dispose();
                    return;
                }
                
            // 扣除盒子
            cm.gainItem(盒子代码, -次数);
            
            var text = "";
            text += "#w";
            
            // 进行抽奖
            for (var ai = 0; ai < 次数; ai++) {
                var 成功�? = Math.floor(Math.random() * 1000) + 1;
                
                // 找到对应的奖�?
                for (var i = 0; i < 抽奖数组.length; i++) {
                    if (成功�? >= 抽奖数组[i][2] && 成功�? <= 抽奖数组[i][3]) {
                        var itemId = 抽奖数组[i][0];
                        var quantity = 抽奖数组[i][1];
                        
                        // 处理特殊奖励
                        if (itemId === 0) {
                            // 金币奖励
                            cm.gainMeso(quantity);
                            text += "#v2140002#金币 x " + quantity + "\r\n";
                        } else if (itemId === -2) {
                            // 元宝奖励
                            cm.getPlayer().gainzb(quantity);
                            text += "#v4032733#元宝 x " + quantity + "\r\n";
                        } else if (itemId === -1 || itemId === -3 || itemId === -4) {
                            // 皮肤奖励
                            var 皮肤类型 = itemId === -1 ? "低级" : (itemId === -3 ? "中级" : "高级");
                            if (皮肤奖池[皮肤类型].length > 0) {
                                var 随机索引 = Math.floor(Math.random() * 皮肤奖池[皮肤类型].length);
                                var 皮肤数组 = 皮肤奖池[皮肤类型][随机索引];
                                var 皮肤ID = 皮肤数组[0];
                                
                                // 根据等级计算属性加�?
                                var level_index = getLevelIndex(等级);
                                if (level_index !== -1) {
                                    var 基础攻魔 = 皮肤数组[2];
                                    var 基础命中 = 皮肤数组[3];
                                    
                                    // 根据等级提升属�?
                                    var 攻魔加成 = Math.floor(基础攻魔 * (1 + level_index * 0.1)); // 每级提升10%
                                    var 命中加成 = Math.floor(基础命中 * (1 + level_index * 0.1)); // 每级提升10%
                                    
                                    // 根据皮肤类型额外提升
                                    if (皮肤类型 === "中级") {
                                        攻魔加成 = Math.floor(攻魔加成 * 1.5); // 中级皮肤额外提升50%
                                        命中加成 = Math.floor(命中加成 * 1.5);
                                    } else if (皮肤类型 === "高级") {
                                        攻魔加成 = Math.floor(攻魔加成 * 2.0); // 高级皮肤额外提升100%
                                        命中加成 = Math.floor(命中加成 * 2.0);
                                    }
                                    
                                    // 创建带属性的皮肤道具
                                    var equip = cm.getEquip(皮肤ID);
                                    equip.setWatk(攻魔加成);
                                    equip.setMatk(攻魔加成);
                                    equip.setAcc(命中加成);
                                    
                                    // 添加装备到背�?
                                    cm.addFromDrop(equip);
                                    
                                    var 属性说�? = "�?/�?: " + 攻魔加成 + ", 命中�?: " + 命中加成;
                                    text += "#v" + 皮肤ID + "##z" + 皮肤ID + "# x " + quantity + " (" + 属性说�? + ")\r\n";
                                } else {
                                    // 如果等级不在范围内，使用基础属�?
                                    var equip = cm.getEquip(皮肤ID);
                                    equip.setWatk(皮肤数组[2]);
                                    equip.setMatk(皮肤数组[2]);
                                    equip.setAcc(皮肤数组[3]);
                                    
                                    // 添加装备到背�?
                                    cm.addFromDrop(equip);
                                    
                                    var 属性说�? = "�?/�?: " + 皮肤数组[2] + ", 命中�?: " + 皮肤数组[3];
                                    text += "#v" + 皮肤ID + "##z" + 皮肤ID + "# x " + quantity + " (" + 属性说�? + ")\r\n";
                                }
                            }
                        } else {
                            // 普通物品奖�?
                            cm.gainItem(itemId, quantity);
                            text += "#v" + itemId + "##z" + itemId + "# x " + quantity + "\r\n";
                        }
                        
                        // 发送公�?
                        cm.itemlabaB("" + cm.getPlayer().getName() + "", "恭喜玩家使用" + 次数 + "连抽获得珍宝", itemId > 0 ? itemId : 2022467, 15);
                        break;
                    }
                }
            }
            
            cm.sendOk("#k#r获得道具如下#k:\r\n\r\n" + text + "\r\n\r\n");
            // 在抽奖完成后记录次数
            记录抽奖();
            cm.dispose();
        }
    }
}

// 获取皮肤属性说�?
function 获取皮肤属�?(皮肤数组) {
    return "�?/�?: " + 皮肤数组[2] + ", 命中�?: " + 皮肤数组[3];
}

function getLevelIndex(等级) {
    var levels = [120, 130, 140, 150, 160, 170, 180, 190, 200, 210, 220, 230, 240];
    for (var i = 0; i < levels.length; i++) {
        if (等级 <= levels[i]) {
            return i;
        }
    }
    return -1;
}

// 计算每日可获得抽奖次�?
function 计算每日抽奖次数(充值金�?) {
    var 次数 = 0;
    for (var i = 0; i < 每日累冲配置.length; i++) {
        if (充值金�? >= 每日累冲配置[i].金额) {
            次数 += 每日累冲配置[i].抽奖次数;
        }
    }
    return Math.min(次数, 3); // 每日最�?3�?
}

// 计算每周可获得抽奖次�?
function 计算每周抽奖次数(充值金�?) {
    var 次数 = 0;
    for (var i = 0; i < 每周累冲配置.length; i++) {
        if (充值金�? >= 每周累冲配置[i].金额) {
            次数 += 每周累冲配置[i].抽奖次数;
        }
    }
    return Math.min(次数, 13); // 每周最�?13�?
}

// 获取已使用抽奖次�?
function 获取已用次数() {
    return cm.getBossLog("抽奖次数");
}

// 记录抽奖次数
function 记录抽奖() {
    cm.setBossLog("抽奖次数");
}