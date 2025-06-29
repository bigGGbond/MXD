var status = -1;
var itemList1 = [
    //ID 数量 权重(分量) 武器必须指定属性6维属性,
    [[4500033, 10], [0, 500000]],
    [[4500033, 10], [0, 500000]],
    [[4500033, 20], [0, 2000000]]
];
var itemList2 = [
    [[4500616, 1], [4500816, 1]],
    [[4500617, 1], [4500817, 1]],
    [[4500618, 1], [4500818, 1]],
    [[4500619, 1], [4500819, 1]],
    [[4500620, 1], [4500820, 1]],
    [[4500621, 1], [4500821, 1]],
    [[4500622, 1], [4500822, 1]],
    [[4500623, 1], [4500823, 1]],
    [[4500624, 1], [4500824, 1]],
    [[4500625, 1], [4500825, 1]],
    [[4500626, 1], [4500826, 1]],
    [[4500627, 1], [4500827, 1]],
    [[4500628, 1], [4500828, 1]]
]
function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    var 每日累充 = cm.getBossLog("每日充值金额");
    var 档位 = getRechargeLevel(每日累充);
    if (mode == -1 || mode == 0) {
        cm.dispose();
        return;
    }

    if (mode == 1) {
        status++;
    } else {
        status--;
    }
    if (status == 0) {
        if (档位 == -1) {
            cm.sendOk("未达到任何档位");
            cm.dispose();
            return;
        }
        cm.sendYesNo("#e#r[充值奖励]#k#n\r\n#b您当前的充值金额：#r" + 每日累充 + "#k\r\n#b已达到充值档位：#r" + 档位 + "#k\r\n\r\n是否领取奖励？");
    } else if (status == 1) {
        var 奖励;
        if (档位 === 3) {
            // 档位3，使用itemList2，按等级划分
            var 等级 = cm.getPlayer().getLevel();
            var idx = getLevelIndex(等级);
            if (idx == -1 || idx >= itemList2.length) {
                cm.sendOk("您的等级不在奖励范围内，无法领取奖励。");
                cm.dispose();
                return;
            }
            奖励 = itemList2[idx];
        } else {
            // 档位0、1、2，使用itemList1
            奖励 = itemList1[档位];
        }
        // if (!checkInventorySpace(奖励)) {
        //     cm.sendOk("背包空间不足，请清理后再试！");
        //     cm.dispose();
        //     return;
        // }
        // cm.sendOk(奖励);
        for (var i = 0; i < 奖励.length; i++) {
            var id = 奖励[i][0];
            var 数量 = 奖励[i][1];
            if (id == 0) {
                cm.gainMeso(数量);
            } else {
                cm.gainItem(id, 数量);
            }
        }
        cm.sendOk("#e#r[充值奖励]#k#n\r\n#b奖励已发放完成！#k");
        cm.dispose();
    }
}

function checkInventorySpace(奖励) {
    var requiredSlots = 0;
    if (Array.isArray(奖励[0]) && !Array.isArray(奖励[0][0])) {
        // 一维数组
        requiredSlots = 奖励.filter(item => item[0] != 0).length;
    } else if (Array.isArray(奖励[0]) && Array.isArray(奖励[0][0])) {
        // 二维数组
        var 等级 = cm.getPlayer().getLevel();
        var idx = getLevelIndex(等级);
        if (idx != -1 && idx < 奖励.length) {
            requiredSlots = 奖励[idx].filter(item => item[0] != 0).length;
        }
    }
    return cm.getPlayer().getInventory(1).getNumFreeSlot() >= requiredSlots;
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

function getRechargeLevel(每日累充) {
    var rechargeLevels = [50, 100, 200, 400];
    for (var i = rechargeLevels.length - 1; i >= 0; i--) {
        if (每日累充 >= rechargeLevels[i]) {
            return i;
        }
    }
    return -1;
}