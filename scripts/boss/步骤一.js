var status = -1;
var �Ѷ�; // 

var boss_CONFIG = {
    "����": {
        bossId: 8920000,
        ��͵ȼ�: 100,
        ���ƴ���: 4,
        �¼�����: "Clockboss",
        Զ��������: "ClockSquad",
        ��ս��ͼ: 220080001,
        �Ѷ�Ҫ��: 1  // ��Ҫ���Ŷ�boss�Ѷ�ֵ
    },
    "����": {
        bossId: 8920000,
        ��͵ȼ�: 100,
        ���ƴ���: 100,
        �¼�����: "ChaosZakum",
        Զ��������: "ChaosZak",
        ��ս��ͼ: 280030001,
        �Ѷ�Ҫ��: 2
    },
    "����": {
        bossId: 8920000,
        ��͵ȼ�: 120,
        ���ƴ���: 3,
        �¼�����: "HorntailBattle",
        Զ��������: "Horntail",
        ��ս��ͼ: 240060200,
        �Ѷ�Ҫ��: 3
    },
    "boss-4": {
        bossId: 8920000,
        ��͵ȼ�: 100,
        ���ƴ���: 4,
        �¼�����: "boss4",
        Զ��������: "boss4Squad",
        ��ս��ͼ: 100000000,
        �Ѷ�Ҫ��: 4
    },
    "boss-5": {
        bossId: 8920000,
        ��͵ȼ�: 100,
        ���ƴ���: 4,
        �¼�����: "boss5",
        Զ��������: "boss5Squad",
        ��ս��ͼ: 100000000,
        �Ѷ�Ҫ��: 5
    },
    "boss-6": {
        bossId: 8920000,
        ��͵ȼ�: 100,
        ���ƴ���: 4,
        �¼�����: "boss6",
        Զ��������: "boss6Squad",
        ��ս��ͼ: 100000000,
        �Ѷ�Ҫ��: 6
    },
    "boss-7": {
        bossId: 8920000,
        ��͵ȼ�: 100,
        ���ƴ���: 4,
        �¼�����: "boss7",
        Զ��������: "boss7Squad",
        ��ս��ͼ: 910000001,
        �Ѷ�Ҫ��: 7
    },
    "boss-8": {
        bossId: 8910000,
        ��͵ȼ�: 100,
        ���ƴ���: 4,
        �¼�����: "boss8",
        Զ��������: "boss8Squad",
        ��ս��ͼ: 910000002,
        �Ѷ�Ҫ��: 8
    },
    "boss-9": {
        bossId: 8900000,
        ��͵ȼ�: 100,
        ���ƴ���: 4,
        �¼�����: "boss9",
        Զ��������: "boss9Squad",
        ��ս��ͼ: 910000003,
        �Ѷ�Ҫ��: 9
    },
    "boss-10": {
        bossId: 8860000,
        ��͵ȼ�: 100,
        ���ƴ���: 4,
        �¼�����: "boss10",
        Զ��������: "boss10Squad",
        ��ս��ͼ: 910000004,
        �Ѷ�Ҫ��: 10
    },
    "boss-11": {
        bossId: 8880000,
        ��͵ȼ�: 100,
        ���ƴ���: 4,
        �¼�����: "boss11",
        Զ��������: "boss11Squad",
        ��ս��ͼ: 910000005,
        �Ѷ�Ҫ��: 11  // ȷ�������ֶ������ַ���
    },
    "boss-12": {
        bossId: 8645009,
        ��͵ȼ�: 100,
        ���ƴ���: 4,
        �¼�����: "boss12",
        Զ��������: "boss12Squad",
        ��ս��ͼ: 910000006,
        �Ѷ�Ҫ��: 12
    },
    "boss-13": {
        bossId: 8880140,
        ��͵ȼ�: 100,
        ���ƴ���: 4,
        �¼�����: "boss13",
        Զ��������: "boss13Squad",
        ��ս��ͼ: 910000007,
        �Ѷ�Ҫ��: 13
    },
    "boss-14": {
        bossId: 8240098,
        ��͵ȼ�: 100,
        ���ƴ���: 4,
        �¼�����: "boss14",
        Զ��������: "boss14Squad",
        ��ս��ͼ: 910000008,
        �Ѷ�Ҫ��: 14
    }
};

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    var �ȼ� = cm.getPlayer().getLevel();
    var Ԫ������ = cm.itemQuantity(4031250);

    if (mode == 1) {
        status++;
    }

    if (status == 0) {
        // ֻ��ʾ����ģʽѡ��
        var text = "\t\t#e#r[BOSS��սϵͳ]#k#n\r\n\r\n";
        text += "#bѡ�����ģʽ��#k\r\n";
        if (cm.getBossLog("�Ŷ�BOSS��������") == 1) {
            if (Ԫ������ >= 1000) {
                text += "\t#L0#��ͨ����#l ";
                text += "\t#L1##r˫�������#k#l\r\n\r\n";
            } else {
                cm.setBossLog("�Ŷ�BOSS��������", 0, true);
                text += "\t#L0##b��ͨ�����#k#l ";
                text += "\t#L1##d˫������(��Ҫ1000Ԫ��)#k#l\r\n\r\n";
            }
        } else {
            text += "\t#L0##b��ͨ�����#k#l ";
            if (Ԫ������ >= 1000) {
                text += "\t#L1#˫������#l\r\n\r\n";
            } else {
                text += "\t#L1##d˫������(��Ҫ1000Ԫ��)#k#l\r\n\r\n";
            }
        }
        cm.sendSimple(text);
    } else if (status == 1) {
        // �������ģʽѡ��
        if (selection == 1 && Ԫ������ < 1000) {
            cm.sendOk("Ԫ������1000���޷�ѡ��Ԫ������ģʽ��");
            cm.setBossLog("�Ŷ�BOSS��������", 0, true);
            status = -1;
            cm.dispose();
            return;
        }
        cm.setBossLog("�Ŷ�BOSS��������", selection, true);

        // �����Ѷ�ѡ��˵�
        var text = "#bѡ���Ѷȣ�#k\r\n";
        var levelIndex = getLevelIndex(�ȼ�);
        for (var i = 0; i <= levelIndex; i++) {
            text += "\t#L" + i + "#�Ѷ�" + (i + 1) + "#l\r\n";
        }
        cm.sendSimple(text);
    } else if (status == 2) {
        // �����Ѷ�ѡ��
        if (selection >= 0 && selection <= getLevelIndex(�ȼ�)) {
            �Ѷ� = selection;
            var text = "";
            text += "\t\t#e#r[�Ѷ�" + (�Ѷ� + 1) + "]#k#n\r\n\r\n";
            text += "\t#L0#����#l\r\n";
            text += "\t#L2#�ط�#l\r\n";
            cm.sendSimple(text);
        }
    } else if (status == 3) {
        // ����BOSS��ͼ
        var sele = selection;
        cm.setBossLog("�Ŷ�BOSS�Ѷ�", �Ѷ� + 1, true);
        var text = "";
        if (sele == 0) {
            text = "���ڽ����Ѷ�" + (�Ѷ� + 1) + "��BOSS��ͼ����ͨģʽ��\r\n";
        } else if (sele == 2) {
            text = "���ڽ����Ѷ�" + (�Ѷ� + 1) + "��BOSS��ͼ���ط�ģʽ��\r\n";
            var bossLevel = parseInt(cm.getBossLog("�Ŷ�BOSS�Ѷ�"));
            var availableBosses = [];
            for (var bossName in boss_CONFIG) {
                if (parseInt(boss_CONFIG[bossName].�Ѷ�Ҫ��) === bossLevel) {
                    availableBosses.push(bossName);
                }
            }
            if (selection < 0 || selection >= availableBosses.length) {
                cm.sendOk("ѡ����Ч��������ѡ��");
                cm.dispose();
                return;
            }
            selectedboss = boss_CONFIG[availableBosses[selection]];
            fbmc = availableBosses[selection];

            var em = cm.getEventManager(selectedboss.�¼�����);
            if (em == null) {
                cm.sendOk("���¼�");
                cm.dispose();
                return;
            }
            var prop = em.getProperty("state");
            var props = em.getProperty("leader");
            if (props != null && props.equals("true")) {
                var eima = em.getInstance(selectedboss.�¼�����);
                if (eima == null) {
                    cm.sendOk("���¼�");
                    cm.dispose();
                    return;
                }
                var propsa = eima.getProperty("isSquadPlayerID_" + cm.getPlayer().getId());
                var saya = "\r\n" + (eima == null ? "eima is null" : propsa) + "\r\n";
                if ((eima != null) && (propsa != null) && propsa.equals("1")) {
                    // status = 13;
                    var evname = eima.getName();
                    if (cm.getPlayer().getBossLog(evname + "�ط�") != 0) {//�ط�����
                        saya += "#b�ط��������㣿";
                        cm.sendOk(saya);
                        cm.dispose();
                        return;
                    } else {
                        saya += "#b�����Ƿ�Ҫ���·���Զ�������ڳ��أ�";
                        saya += "\r\n#r#L5#���·���Զ�������ڳ���#l";
                        cm.sendSimple(saya);
                    }
                } else {
                    eim = cm.getDisconnected(selectedboss.�¼�����);
                    if (eim == null) {
                        cm.sendOk("�����h��ꠣ����ڌ�����1��");
                        cm.safeDispose();
                    } else {
                        cm.sendOk("�����h��ꠣ����ڌ�����2��");
                        cm.safeDispose();
                    }
                }
            } else {
                var eima = em.getInstance(selectedboss.�¼�����);
                if (eima == null) {
                    cm.sendOk("���¼�");
                    cm.dispose();
                    return;
                }
                var propsa = eima.getProperty("isSquadPlayerID_" + cm.getPlayer().getId());
                var saya = "\r\n" + (eima == null ? "eima is null" : propsa) + "\r\n";
                if ((eima != null) && (propsa != null) && propsa.equals("1")) {
                    // status = 13;
                    var evname = eima.getName();
                    if (cm.getPlayer().getBossLog(evname + "�ط�") != 0) {//�ط�����
                        saya += "#b�ط��������㣿";
                        cm.sendOk(saya);
                        cm.dispose(); return;
                    } else {
                        saya += "#b�����Ƿ�Ҫ���·���Զ�������ڳ��أ�";
                        saya += "\r\n#r#L5#���·���Զ�������ڳ���#l";
                        cm.sendSimple(saya);
                    }
                } else {
                    cm.sendOk("�ܱ�Ǹ����h�����L�x�_�ˬF���������㲻���ٷ��ؑ�����");
                    cm.safeDispose();
                }
            }

        }
        cm.sendOk(text + "\r\n�Ѷȣ�" + cm.getBossLog("�Ŷ�BOSS�Ѷ�") + "\r\n����������" + cm.getBossLog("�Ŷ�BOSS��������"));
        cm.dispose();
        cm.warp(802000109, 0);
    }
}

function getLevelIndex(�ȼ�) {
    var levels = [119, 129, 139, 149, 159, 169, 179, 189, 199, 209, 219, 229, 239, 255];
    for (var i = 0; i < levels.length; i++) {
        if (�ȼ� <= levels[i]) {
            return i;
        }
    }
    return levels.length - 1;
}


function handleSelection(selection) {
    var currentHour = new Date().getHours();
    var currentMinute = new Date().getMinutes();

    if ((currentHour === 23 && currentMinute >= 45) || (currentHour === 0 && currentMinute <= 15)) {
        cm.sendOk("ÿ������ 23:45 �� 00:15 BOSS��Ϊ�ڰ�ħ������Ϯ���޷���ս��");
        cm.dispose();
        return;
    }
    else if (selection == 2) {

    }



}