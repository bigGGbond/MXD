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
			if (���� <= 0) {
				cm.sendOk("�Ѵﵽ�ȼ���Ӧ��ÿ�նһ�����");
				cm.dispose();
				return;
			}
			var text = "";
			text += "#w";
			text += "#k��ǰ����ֵ:#b" + (cm.getPlayer().getExp() / 10000) + "��#k\r\n\r\n"
			text += "#kÿ�����ƶһ�:#b" + levelLimit + "#k��#r(#b" + cm.getBossLog("�һ������") + "#k/" + levelLimit + "#r)  ���ջ��ɶһ���������#b" + ���� + "#r��\r\n\r\n"
			text += "#k������һ���������#e#r1000���� = 1 �� #v+4310079##k#n\r\n\r\n"
			cm.sendGetNumber(text, 1, 1, ����);
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
	if (level <= 130) return 48;
	if (level <= 140) return 48;
	if (level <= 150) return 48;
	if (level <= 160) return 60;
	if (level <= 170) return 57;
	if (level <= 180) return 71;
	if (level <= 190) return 88;
	if (level <= 200) return 88;
	if (level <= 210) return 111;
	if (level <= 220) return 138;
	if (level <= 230) return 144;
	if (level <= 240) return 180;
	return 180; // ����240����Ĭ������
}