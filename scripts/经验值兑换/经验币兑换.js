/*
 079 085�ű�
QQ:870074996
 */

importPackage(Packages.server);
var status = 0;
var fee;
var ����ֵ = 1000000;
var ���� = 1;
var item = 4310079;

var chance = Math.floor(Math.random() * 1);
function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode == -1) {
		cm.dispose();
	} else {
		if (mode == 0) {
			cm.sendOk("��ӭ�´ι���");
			cm.dispose();
			return;
		}
		if (mode == 1)
			status++;
		else
			status--;
		if (status == 0) {
			// ֱ�����͵��߲���ʾ
			cm.gainItem(2022509, 1);
			cm.sendOk("�Ѿ���#v2022509##b����һ�����#k���������������У�������ʹ�������о���Ҷһ���");
		} else if (status == 1) {
			// ��ȡ��ҵȼ���Ӧ�Ķһ�����
			var levelLimit = getLevelLimit(cm.getPlayer().getLevel());
			var ���� = cm.getBossLog("�һ������") >= levelLimit ? 0 : (levelLimit - cm.getBossLog("�һ������"));
			var ���ɶһ����� = 	Math.floor(cm.getPlayer().getExp() / ����ֵ);
			if (���� <= 0) {
				cm.sendOk("�Ѵﵽ�ȼ���Ӧ��ÿ�նһ�����");
				cm.dispose();
				return;
			}
			var text = "";
			text += "#w";
			text += "#k��ǰ����ֵ:#b" + (cm.getPlayer().getExp() / 10000) + "��#k\r\n\r\n"
			text +="���ջ��ɶһ�������#r��" + ���� + "#r��\r\n\r\n"
			text += "#k������һ���������#e#r100���� = 1 �� #v+4310079##k#n\r\n\r\n"
			cm.sendGetNumber(text, ���ɶһ�����, 1, ���ɶһ�����);
		} else if (status == 2) {
			var s = selection;
			var levelLimit = getLevelLimit(cm.getPlayer().getLevel());
			if (cm.getBossLog("�һ������") >= levelLimit) {
				cm.sendOk("�Ѵﵽ�ȼ���Ӧ��ÿ�նһ�����");
				cm.dispose();
				return;
			}
			if (cm.getPlayer().getExp() < (����ֵ * s)) {
				cm.playerMessage(1, "��û����ô�ྭ��ֵ��");
				cm.dispose();
				return;
			}
			cm.gainExp(-(����ֵ * s));
			cm.gainItem(item, s);
			cm.gainBossLog("�һ������", s);
			cm.sendOk("�һ��ɹ�");
			cm.ȫ����ɫ����("[����һ�] " + cm.getPlayer().getName() + " : " + "�һ���" + s + "��������ҡ�");
			cm.dispose();
		}
	}
}

// ��ӻ�ȡ�ȼ����Ƶĺ���
function getLevelLimit(level) {
    if (level <= 70) return 42;
    if (level <= 90) return 42;
    if (level <= 110) return 42;
    if (level <= 120) return 42;
    if (level <= 130) return 53;
    if (level <= 140) return 66;
    if (level <= 150) return 82;
    if (level <= 160) return 103;
    if (level <= 170) return 128;
    if (level <= 180) return 160;
    if (level <= 190) return 201;
    if (level <= 200) return 241;
    if (level <= 210) return 301;
    if (level <= 220) return 376;
    if (level <= 230) return 470;
    if (level <= 240) return 588;
    return 588; // ����240����Ĭ������
}