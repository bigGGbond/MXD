var status = -1;
var itemList1 = [
    //ID ���� Ȩ��(����) ��������ָ������6ά����,
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
    var ÿ���۳� = cm.getBossLog("ÿ�ճ�ֵ���");
    var ��λ = getRechargeLevel(ÿ���۳�);
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
        if (��λ == -1) {
            cm.sendOk("δ�ﵽ�κε�λ");
            cm.dispose();
            return;
        }
        cm.sendYesNo("#e#r[��ֵ����]#k#n\r\n#b����ǰ�ĳ�ֵ��#r" + ÿ���۳� + "#k\r\n#b�Ѵﵽ��ֵ��λ��#r" + ��λ + "#k\r\n\r\n�Ƿ���ȡ������");
    } else if (status == 1) {
        var ����;
        if (��λ === 3) {
            // ��λ3��ʹ��itemList2�����ȼ�����
            var �ȼ� = cm.getPlayer().getLevel();
            var idx = getLevelIndex(�ȼ�);
            if (idx == -1 || idx >= itemList2.length) {
                cm.sendOk("���ĵȼ����ڽ�����Χ�ڣ��޷���ȡ������");
                cm.dispose();
                return;
            }
            ���� = itemList2[idx];
        } else {
            // ��λ0��1��2��ʹ��itemList1
            ���� = itemList1[��λ];
        }
        // if (!checkInventorySpace(����)) {
        //     cm.sendOk("�����ռ䲻�㣬����������ԣ�");
        //     cm.dispose();
        //     return;
        // }
        // cm.sendOk(����);
        for (var i = 0; i < ����.length; i++) {
            var id = ����[i][0];
            var ���� = ����[i][1];
            if (id == 0) {
                cm.gainMeso(����);
            } else {
                cm.gainItem(id, ����);
            }
        }
        cm.sendOk("#e#r[��ֵ����]#k#n\r\n#b�����ѷ�����ɣ�#k");
        cm.dispose();
    }
}

function checkInventorySpace(����) {
    var requiredSlots = 0;
    if (Array.isArray(����[0]) && !Array.isArray(����[0][0])) {
        // һά����
        requiredSlots = ����.filter(item => item[0] != 0).length;
    } else if (Array.isArray(����[0]) && Array.isArray(����[0][0])) {
        // ��ά����
        var �ȼ� = cm.getPlayer().getLevel();
        var idx = getLevelIndex(�ȼ�);
        if (idx != -1 && idx < ����.length) {
            requiredSlots = ����[idx].filter(item => item[0] != 0).length;
        }
    }
    return cm.getPlayer().getInventory(1).getNumFreeSlot() >= requiredSlots;
}

function getLevelIndex(�ȼ�) {
    var levels = [120, 130, 140, 150, 160, 170, 180, 190, 200, 210, 220, 230, 240];
    for (var i = 0; i < levels.length; i++) {
        if (�ȼ� <= levels[i]) {
            return i;
        }
    }
    return -1;
}

function getRechargeLevel(ÿ���۳�) {
    var rechargeLevels = [50, 100, 200, 400];
    for (var i = rechargeLevels.length - 1; i >= 0; i--) {
        if (ÿ���۳� >= rechargeLevels[i]) {
            return i;
        }
    }
    return -1;
}