status = -1;
var itemList = [
    [4500033, 1, 0.2171],
    [4500034, 1, 0.0434],
    [0, 100000, 0.4141],
    [4500002, 1, 0.0260],
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

var status = -1;

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
            cm.dispose();
            return;
        }
        if (mode == 1) {
            status++;
        } else {
            status--;
        }
        if (status == 0) {
            if (cm.getSpace(2) < 4 || cm.getSpace(4) < 4) {
                cm.sendOk("您的装备 消耗 其它栏已满!请把它们都空出3个格子出来!");
                cm.dispose();
                return;
            }
            if (!cm.haveItem(4031250, 1000)) {
                cm.sendOk("检测到不足1000个#v4031250#，将获取材料！\r\n");
                cm.dispose();
                return;
            }
            if (cm.haveItem(4031250, 1000)) {
                cm.sendYesNo("检测到1000个#v4031250#，将进行抽奖！\r\n");
            } else {
                cm.sendOk("您的#v4031250#数量不足1000，无法抽奖！");
                cm.dispose();
                return;
            }
        } else if (status == 1) {
            if (cm.haveItem(4031250, 1000)) {
                var selectedItem = getRandomItem(等级);
                if (selectedItem) {
                    var count = selectedItem[1];
                    if (typeof count !== 'number' || isNaN(count) || count <= 0) {
                        cm.sendOk("数量异常: " + JSON.stringify(selectedItem) + ", count=" + count);
                        return;
                    }
                    if (typeof selectedItem[0] !== 'number' || selectedItem[0] < 0) {
                        cm.sendOk("物品ID异常: " + JSON.stringify(selectedItem));
                        return;
                    }
                    if (selectedItem[0] == 0) {
                        cm.gainMeso(count);
                    } else {
                        cm.gainItem(selectedItem[0], count);
                    }
                    cm.gainItem(4031250, -1000);
                    cm.sendOk("您获得了：" + cm.显示物品(selectedItem[0]) + " 数量x" + count);
                } else {
                    cm.sendOk("今天的运气可真差，什么都没有拿到。");
                }
                cm.dispose();
            }
        }
    }
}

function getLevelIndex(等级) {
    var levels = [120, 130, 140, 150, 160, 170, 180, 190, 200, 210, 220, 230, 240];
    for (var i = 0; i < levels.length; i++) {
        if (等级 <= levels[i]) {
            return i;
        }
    }
    return levels.length - 1;
}

function getRandomItem(等级) {
    var flatList = [];
    for (var i = 0; i < itemList.length; i++) {
        if (Array.isArray(itemList[i][0])) {
            // 二维数组，按等级取对应奖励
            var idx = getLevelIndex(等级);
            if (idx >= 0 && idx < itemList[i].length) {
                var reward = itemList[i][idx];
                if (reward && typeof reward[0] === 'number' && typeof reward[1] === 'number' && typeof reward[2] === 'number' && reward[2] > 0) {
                    flatList.push(reward);
                }
            }
        } else {
            // 一维奖励
            var reward = itemList[i];
            if (reward && typeof reward[0] === 'number' && typeof reward[1] === 'number' && typeof reward[2] === 'number' && reward[2] > 0) {
                flatList.push(reward);
            }
        }
    }
    // 计算总概率
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
    return null;
}

