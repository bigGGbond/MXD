var �ָ��� = "#r#e----------------------------------------#k#n\r\n";
var ���ͼ��1 = "#fUI/GuildMark.img/Mark/Etc/00009001/1#";
var ���ͼ��2 = "#fUI/GuildMark.img/Mark/Etc/00009001/10#";
var ��ʯ = "#fUI/UIWindow.img/QuestIcon/3/0#";
var ���� = "#fMap/MapHelper/weather/witch/3#";
var ���һԪ�� = 600;
var �����Ԫ�� = 1800;

var status;
var lastSelection = 0;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1 || mode == 0) {
        cm.dispose();
        return;
    }
    if (mode == 1) {
        status++;
    } else {
        status--;
        if (status < 0) {
            cm.dispose();
            return;
        }
    }
    if (status == 0) {
        var text = "\t\t\t\t" + ���� + " #e#b�׳��������ϵͳ#n#k " + ���� + "\r\n";
        text += �ָ���;
        text += "#d��ӭ����#bð�յ�#d���������ڴ˴�����#r�׳����#d��#k\r\n";
        text += �ָ���;
        text += "#L1#" + ���ͼ��1 + " #b�����׳����1#k " + ��ʯ + " #r(����" + ���һԪ�� + "Ԫ��)#k#l\r\n";
        text += "#L2#" + ���ͼ��2 + " #b�����׳����2#k " + ��ʯ + " #r(����" + �����Ԫ�� + "Ԫ��)#k#l\r\n";
        text += �ָ���;
        cm.sendSimple(text);
    } else if (status == 1) {
        if (selection == 1) {
            lastSelection = 1;
            var text = "#e#b�׳����1#n#k " + ���ͼ��1 + "\r\n";
            text += �ָ���;
            text += "#d������ݣ�#k\r\n";
            text += "#b#v1902137##z1902137# ��1#k\r\n";
            text += "#b#v4500216##z4500216# ��1#k\r\n";
            text += "#b#v4500009##z4500009# ��10#k\r\n";
            text += �ָ���;
            text += "#r�Ƿ񻨷�" + ���һԪ�� + "Ԫ�������׳����1��#k";
            cm.sendYesNo(text);
        }
        if (selection == 2) {
            lastSelection = 2;
            var text = "#e#b�׳����2#n#k " + ���ͼ��2 + "\r\n";
            text += �ָ���;
            text += "#d������ݣ�#k\r\n";
            text += "#b#v2022582##z2022582# ��20#k\r\n";
            text += "#b#v1102659##z1102659# ��1#k\r\n";
            text += "#b#v4500116##z4500116# ��1#k\r\n";
            text += "#b#v4500010##z4500010# ��5#k\r\n";
            text += �ָ���;
            text += "#r�Ƿ񻨷�" + �����Ԫ�� + "Ԫ�������׳����2��#k";
            cm.sendYesNo(text);
        }
    } else if (status == 2) {
        if (lastSelection == 1) {
            // ���Ԫ���Ƿ��㹻
            if (cm.getPlayer().getzb() < ���һԪ��) {
                cm.sendOk("#rԪ�����㣬�޷������׳����1��#k");
                cm.dispose();
                return;
            }
            // �۳�Ԫ��
            cm.getPlayer().gainzb(-���һԪ��);
            // �������1
            cm.gainItem(1902137, 1);
            var equip = cm.getEquip(1902137);
            equip.setHp(6);
            equip.setStr(2);
            equip.setDex(2);
            equip.setInt(2);
            equip.setLuk(2);
            equip.setWatk(2);
            equip.setMatk(2);
            equip.setSpeed(0.01);
            cm.gainItem(4500216, 1);
            cm.gainItem(4500009, 10);
            cm.sendOk("#e#b��ϲ��ɹ������׳����1��#k\r\n" + �ָ��� + "#b����ѷ�������ı���������գ�#k");
            cm.dispose();
        } else if (lastSelection == 2) {
            // ���Ԫ���Ƿ��㹻
            if (cm.getPlayer().getzb() < �����Ԫ��) {
                cm.sendOk("#rԪ�����㣬�޷������׳����2��#k");
                cm.dispose();
                return;
            }
            // �۳�Ԫ��
            cm.getPlayer().gainzb(-�����Ԫ��);
            // �������2
            cm.gainItem(2022582, 20);
            cm.gainItem(1102659, 1);
            var equip = cm.getEquip(1102659);
            equip.setStr(2);
            equip.setDex(2);
            equip.setInt(2);
            equip.setLuk(2);
            equip.setWatk(2);
            equip.setMatk(2);
            equip.setSpeed(0.01);
            cm.gainItem(4500116, 1);
            cm.gainItem(4500010, 5);
            cm.sendOk("#e#b��ϲ��ɹ������׳����2��#k\r\n" + �ָ��� + "#b����ѷ�������ı���������գ�#k");
            cm.dispose();
        }
    }
}