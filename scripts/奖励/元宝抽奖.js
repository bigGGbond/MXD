var status = -1;
var drawMode = 0; // 只保留单抽
var 单抽元宝 = 1000;
var exchangeIndex = -1; // 添加这行，定义兑换物品索引变量
var itemList = [
    [4500033, 1, 0.2171],
    [4500034, 1, 0.0434],
    [4500002, 1, 0.0260],
    [0, 100000, 0.4141],
    [
        [4500116, 1, 0.0521],
        [4500117, 1, 0.0521],
        [4500118, 1, 0.0521],
        [4500119, 1, 0.0521],
        [4500120, 1, 0.0521],
        [4500121, 1, 0.0521],
        [4500122, 1, 0.0521],
        [4500123, 1, 0.0521],
        [4500124, 1, 0.0521],
        [4500125, 1, 0.0521],
        [4500126, 1, 0.0521],
        [4500127, 1, 0.0521],
        [4500128, 1, 0.0521]
    ],
    [
        [4500616, 1, 0.0174],
        [4500617, 1, 0.0174],
        [4500618, 1, 0.0174],
        [4500619, 1, 0.0174],
        [4500620, 1, 0.0174],
        [4500621, 1, 0.0174],
        [4500622, 1, 0.0174],
        [4500623, 1, 0.0174],
        [4500624, 1, 0.0174],
        [4500625, 1, 0.0174],
        [4500626, 1, 0.0174],
        [4500627, 1, 0.0174],
        [4500628, 1, 0.0174]
    ],
    [
        [4500916, 1, 0.0174],
        [4500917, 1, 0.0174],
        [4500918, 1, 0.0174],
        [4500919, 1, 0.0174],
        [4500920, 1, 0.0174],
        [4500921, 1, 0.0174],
        [4500922, 1, 0.0174],
        [4500923, 1, 0.0174],
        [4500924, 1, 0.0174],
        [4500925, 1, 0.0174],
        [4500926, 1, 0.0174],
        [4500927, 1, 0.0174],
        [4500928, 1, 0.0174]
    ],
    [
        [4501116, 1, 0.0174],
        [4501117, 1, 0.0174],
        [4501118, 1, 0.0174],
        [4501119, 1, 0.0174],
        [4501120, 1, 0.0174],
        [4501121, 1, 0.0174],
        [4501122, 1, 0.0174],
        [4501123, 1, 0.0174],
        [4501124, 1, 0.0174],
        [4501125, 1, 0.0174],
        [4501126, 1, 0.0174],
        [4501127, 1, 0.0174],
        [4501128, 1, 0.0174]
    ]
];


var requiredPoints = 500; // 所需积分

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (status >= 0 && mode == 0) {
            cm.dispose();
            return;
        }
        if (mode == 1) {
            status++;
        } else {
            status--;
        }

        if (status == 0) {
            exchangeIndex = -1; // 重置兑换索引
            var text = "#e#r欢迎来到元宝抽奖#n#k\r\n";
            text += "#b消耗" + 单抽元宝 + "元宝进行一次抽奖#k\r\n";
            var currentPoints = cm.getBossLog("抽奖积分");
            text += "#d当前累计抽奖积分：" + currentPoints + " 点#k\r\n\r\n";
            text += "#L0##e#b点击抽奖#n #r(消耗" + 单抽元宝 + "元宝)#l#k\r\n";

            // 如果积分足够，显示兑换选项
            if (currentPoints >= requiredPoints) {
                text += "\r\n#e#r━━━━━ 积分兑换 ━━━━━#n\r\n";
                text += "#v 4290410 #";
                // text += "#v4290411#\r\n";
                // text += "#v4290423#\r\n";
                // text += "#v4290437#\r\n";
                // text += "#v4290526#\r\n";
            }
            cm.sendSimple(text);
        } else if (status == 1) {
            if (selection == 0) {
                // 抽奖逻辑
                if (cm.getPlayer().getzb() < 单抽元宝) {
                    cm.sendOk("#e#r温馨提示：#n#k\r\n\r\n你的元宝不足！\r\n需要：" + 单抽元宝 + "元宝\r\n当前拥有：" + cm.getPlayer().getzb() + "元宝");
                    cm.dispose();
                    return;
                }
                cm.sendYesNo("#e#b确定要消耗#r" + 单抽元宝 + "元宝#b进行抽奖吗？#n#k");
            } else {
                // 兑换物品的确认
                var itemIndex = selection - 1;
                if (itemIndex >= 0 && itemIndex < exchangeItems.length) {
                    var currentPoints = cm.getBossLog("抽奖积分");
                    if (currentPoints >= requiredPoints) {
                        exchangeIndex = itemIndex;
                        cm.sendYesNo("#e#b确定要使用#r" + requiredPoints + "积分#b兑换#r#z" + exchangeItems[itemIndex] + "##b吗？#n#k");
                    } else {
                        cm.sendOk("#e#r积分不足！#n#k\r\n需要：" + requiredPoints + "积分\r\n当前积分：" + currentPoints);
                        cm.dispose();
                    }
                }
            }
        } else if (status == 2) {
            if (exchangeIndex !== undefined && exchangeIndex >= 0) {
                // 兑换逻辑
                var currentPoints = cm.getBossLog("抽奖积分");
                if (currentPoints >= requiredPoints) {
                    var itemId = exchangeItems[exchangeIndex];
                    if (cm.gainItem(itemId, 1)) {
                        // 扣除积分
                        for (var i = 0; i < requiredPoints; i++) {
                            cm.setBossLog("抽奖积分", -1);
                        }
                        cm.sendOk("#e#g兑换成功！#n#k\r\n获得：#z" + itemId + "#");
                    } else {
                        cm.sendOk("#e#r兑换失败！#n#k\r\n请确保背包有足够空间。");
                    }
                } else {
                    cm.sendOk("#e#r积分不足！#n#k");
                }
                cm.dispose();
                return;
            }

            // 抽奖物品逻辑
            if (cm.getPlayer().getzb() < 单抽元宝) {
                cm.sendOk("#e#r温馨提示：#n#k\r\n\r\n你的元宝不足！\r\n需要：" + 单抽元宝 + "元宝\r\n当前拥有：" + cm.getPlayer().getzb() + "元宝");
                cm.dispose();
                return;
            }

            cm.getPlayer().gainzb(-单抽元宝); // 扣除元宝
            var resultText = "#e#d━━━━━━━━ 抽奖结果 ━━━━━━━━━━━#n\r\n";
            var success = true;
            var selectedItem = getRandomItem(cm.getPlayer().getLevel());
            if (!selectedItem) {
                // 没有抽到物品算失败
                success = false;
            } else {
                var itemId = selectedItem[0];
                var count = selectedItem[1];
                if (itemId == 0) {
                    if (!cm.gainMeso(count)) {
                        success = false;
                    } else {
                        resultText += "#r获得金币 x " + count + "#k\r\n";
                    }
                } else {
                    if (isEquip(itemId)) {
                        if (!cm.gainItem(itemId, 1)) {
                            success = false;
                        } else {
                            resultText += cm.显示道具(itemId) + " #rx " + count + "#k\r\n";
                        }
                    } else {
                        if (!cm.gainItem(itemId, count)) {
                            success = false;
                        } else {
                            resultText += cm.显示道具(itemId) + " #rx " + count + "#k\r\n";
                        }
                    }
                }
            }

            // 添加积分
            cm.setBossLog("抽奖积分", 1);
            var currentPoints = cm.getBossLog("抽奖积分");
            resultText += "\r\n#b获得抽奖积分 +1 点#k";
            resultText += "\r\n#d当前累计抽奖积分：" + currentPoints + " 点#k";
            resultText += "\r\n#e#d━━━━━━━━━━━━━━━━━━━━━━━━#n";

            cm.sendOk(resultText);
            cm.dispose();
        }
    }
}

function getLevelIndex(level) {
    var levels = [120, 130, 140, 150, 160, 170, 180, 190, 200, 210, 220, 230, 240];
    for (var i = 0; i < levels.length; i++) {
        if (level <= levels[i]) {
            return i;
        }
    }
    return levels.length - 1;
}

function getRandomItem(level) {
    try {
        var flatList = [];
        for (var i = 0; i < itemList.length; i++) {
            if (Array.isArray(itemList[i][0])) {
                var idx = getLevelIndex(level);
                if (idx >= 0 && idx < itemList[i].length) {
                    var reward = itemList[i][idx];
                    if (validateReward(reward)) {
                        flatList.push(reward);
                    }
                }
            } else {
                var reward = itemList[i];
                if (validateReward(reward)) {
                    flatList.push(reward);
                }
            }
        }
        if (flatList.length === 0) {
            return null;
        }
        var totalProb = 0;
        for (var i = 0; i < flatList.length; i++) {
            totalProb += flatList[i][2];
        }
        if (totalProb <= 0) return null;
        var rand = Math.random() * totalProb;
        var sum = 0;
        for (var i = 0; i < flatList.length; i++) {
            sum += flatList[i][2];
            if (rand < sum) {
                return flatList[i];
            }
        }
        return flatList[flatList.length - 1];
    } catch (e) {
        return null;
    }
}

function validateReward(reward) {
    return reward &&
        Array.isArray(reward) &&
        reward.length >= 3 &&
        typeof reward[0] === 'number' &&
        typeof reward[1] === 'number' &&
        typeof reward[2] === 'number' &&
        reward[2] > 0;
}

// 判断物品是否为装备
function isEquip(itemId) {
    // MapleStory装备ID一般在1000000~1999999之间
    return itemId >= 1000000 && itemId < 2000000;
}

