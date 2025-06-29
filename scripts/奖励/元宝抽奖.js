var status = -1;
var drawMode = 0; // ֻ��������
var ����Ԫ�� = 1000;
var exchangeIndex = -1; // ������У�����һ���Ʒ��������
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


var requiredPoints = 500; // �������

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
            exchangeIndex = -1; // ���öһ�����
            var text = "#e#r��ӭ����Ԫ���齱#n#k\r\n";
            text += "#b����" + ����Ԫ�� + "Ԫ������һ�γ齱#k\r\n";
            var currentPoints = cm.getBossLog("�齱����");
            text += "#d��ǰ�ۼƳ齱���֣�" + currentPoints + " ��#k\r\n\r\n";
            text += "#L0##e#b����齱#n #r(����" + ����Ԫ�� + "Ԫ��)#l#k\r\n";

            // ��������㹻����ʾ�һ�ѡ��
            if (currentPoints >= requiredPoints) {
                text += "\r\n#e#r���������� ���ֶһ� ����������#n\r\n";
                text += "#v 4290410 #";
                // text += "#v4290411#\r\n";
                // text += "#v4290423#\r\n";
                // text += "#v4290437#\r\n";
                // text += "#v4290526#\r\n";
            }
            cm.sendSimple(text);
        } else if (status == 1) {
            if (selection == 0) {
                // �齱�߼�
                if (cm.getPlayer().getzb() < ����Ԫ��) {
                    cm.sendOk("#e#r��ܰ��ʾ��#n#k\r\n\r\n���Ԫ�����㣡\r\n��Ҫ��" + ����Ԫ�� + "Ԫ��\r\n��ǰӵ�У�" + cm.getPlayer().getzb() + "Ԫ��");
                    cm.dispose();
                    return;
                }
                cm.sendYesNo("#e#bȷ��Ҫ����#r" + ����Ԫ�� + "Ԫ��#b���г齱��#n#k");
            } else {
                // �һ���Ʒ��ȷ��
                var itemIndex = selection - 1;
                if (itemIndex >= 0 && itemIndex < exchangeItems.length) {
                    var currentPoints = cm.getBossLog("�齱����");
                    if (currentPoints >= requiredPoints) {
                        exchangeIndex = itemIndex;
                        cm.sendYesNo("#e#bȷ��Ҫʹ��#r" + requiredPoints + "����#b�һ�#r#z" + exchangeItems[itemIndex] + "##b��#n#k");
                    } else {
                        cm.sendOk("#e#r���ֲ��㣡#n#k\r\n��Ҫ��" + requiredPoints + "����\r\n��ǰ���֣�" + currentPoints);
                        cm.dispose();
                    }
                }
            }
        } else if (status == 2) {
            if (exchangeIndex !== undefined && exchangeIndex >= 0) {
                // �һ��߼�
                var currentPoints = cm.getBossLog("�齱����");
                if (currentPoints >= requiredPoints) {
                    var itemId = exchangeItems[exchangeIndex];
                    if (cm.gainItem(itemId, 1)) {
                        // �۳�����
                        for (var i = 0; i < requiredPoints; i++) {
                            cm.setBossLog("�齱����", -1);
                        }
                        cm.sendOk("#e#g�һ��ɹ���#n#k\r\n��ã�#z" + itemId + "#");
                    } else {
                        cm.sendOk("#e#r�һ�ʧ�ܣ�#n#k\r\n��ȷ���������㹻�ռ䡣");
                    }
                } else {
                    cm.sendOk("#e#r���ֲ��㣡#n#k");
                }
                cm.dispose();
                return;
            }

            // �齱��Ʒ�߼�
            if (cm.getPlayer().getzb() < ����Ԫ��) {
                cm.sendOk("#e#r��ܰ��ʾ��#n#k\r\n\r\n���Ԫ�����㣡\r\n��Ҫ��" + ����Ԫ�� + "Ԫ��\r\n��ǰӵ�У�" + cm.getPlayer().getzb() + "Ԫ��");
                cm.dispose();
                return;
            }

            cm.getPlayer().gainzb(-����Ԫ��); // �۳�Ԫ��
            var resultText = "#e#d���������������� �齱��� ����������������������#n\r\n";
            var success = true;
            var selectedItem = getRandomItem(cm.getPlayer().getLevel());
            if (!selectedItem) {
                // û�г鵽��Ʒ��ʧ��
                success = false;
            } else {
                var itemId = selectedItem[0];
                var count = selectedItem[1];
                if (itemId == 0) {
                    if (!cm.gainMeso(count)) {
                        success = false;
                    } else {
                        resultText += "#r��ý�� x " + count + "#k\r\n";
                    }
                } else {
                    if (isEquip(itemId)) {
                        if (!cm.gainItem(itemId, 1)) {
                            success = false;
                        } else {
                            resultText += cm.��ʾ����(itemId) + " #rx " + count + "#k\r\n";
                        }
                    } else {
                        if (!cm.gainItem(itemId, count)) {
                            success = false;
                        } else {
                            resultText += cm.��ʾ����(itemId) + " #rx " + count + "#k\r\n";
                        }
                    }
                }
            }

            // ��ӻ���
            cm.setBossLog("�齱����", 1);
            var currentPoints = cm.getBossLog("�齱����");
            resultText += "\r\n#b��ó齱���� +1 ��#k";
            resultText += "\r\n#d��ǰ�ۼƳ齱���֣�" + currentPoints + " ��#k";
            resultText += "\r\n#e#d������������������������������������������������#n";

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

// �ж���Ʒ�Ƿ�Ϊװ��
function isEquip(itemId) {
    // MapleStoryװ��IDһ����1000000~1999999֮��
    return itemId >= 1000000 && itemId < 2000000;
}

