/* ==================
 �ű�����:  NPC	    
 �ű����ߣ� ��֮�� 
 ��ϵ��ʽ�� QQ338150
 =====================
 */

var status = 0;
var fbmc = "���֮�� - (�������)";
var minLevel = 35;//��͵ȼ�
var maxLevel = 250;//��ߵȼ�
var minPartySize = 1;//�������
var maxPartySize = 6;//�������
var cishuxianzhi = 3;//���ƴ���
var maxjinbi = 50000;//�ж���������
var eventname = "LudiPQ";//���������ļ�

//�жϸ��������Ƿ���
var qblog = "LPQOpen";
var open = true; //false true
//��������
var ca = java.util.Calendar.getInstance();
var hour = ca.get(java.util.Calendar.HOUR_OF_DAY); //���Сʱ
var minute = ca.get(java.util.Calendar.MINUTE); //��÷���
var second = ca.get(java.util.Calendar.SECOND); //�����


function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode == -1) {
		cm.dispose();
	} else if (mode == 0) {
		cm.dispose();
	} else {
		if (mode == 1)
			status++;
		else
			status--;
		var em = cm.getEventManager(eventname);
		if (status == 0) {
			var yhms = "";
			yhms += "                #k" + fbmc + "\r\n";
			yhms += "��������Ҫ�����£�\r\n";
			yhms += "����������:#r " + minPartySize + " #b- #r" + maxPartySize + "#k��Ա\t�ڵȼ����ƣ�#r " + minLevel + " #b- #r" + maxLevel + "�� #k\r\n"
			yhms += "#kÿ��ֻ����ս:#b"+ cishuxianzhi +"#k��  ������ѽ���:#b"+ cm.getBossLog("��߸���") +"#k��#k\r\n"
			yhms += "#L0##b��ʼ " + fbmc + "#l" + maxjinbi + "���/��#l\r\n";
			yhms += "#L3##b#r���ø���(���ڿ�����ʹ��)#l\r\n\r\n";
			cm.sendSimple(yhms);
		} else if (status == 1) {
			if (selection == 0) {
				var party = null;
				try {
					party =  cm.getParty().getMembers();
				} catch(err) {
					cm.sendOk("û�����");
					cm.dispose();
					return;
				}
				var inMap = cm.partyMembersInMap();
				var levelValid = 0;
				for (var i = 0; i < party.size(); i++) {
					if (party.get(i).getLevel() >= minLevel && party.get(i).getLevel() <= maxLevel){
						levelValid++;
					}
				}
				var party = cm.getPlayer().getParty().getMembers();
				var it = party.iterator();
				while (it.hasNext()) {
					var cPlayer = it.next();
					var ccPlayer = cm.getPlayer().getMap().getCharacterById(cPlayer.getId());
					if(ccPlayer != null) {
						/*if (ccPlayer.getOneTimeLog("�����Ա") > 0){
							if (ccPlayer.getÿ�ռ�¼("��߸���") >= (cishuxianzhi + 2)){
								cm.sendOk("������ "+cPlayer.getName()+" ��ս�����Ѿ�����"+(cishuxianzhi + 2)+"�Σ�");
								cm.dispose();
								return;
							}
						} else {
							
						}*/
						if (ccPlayer.getBossLog("��߸���") >= cishuxianzhi){
							cm.sendOk("������ "+cPlayer.getName()+" ��ս�����Ѿ�����"+cishuxianzhi+"�Σ�");
							cm.dispose();
							return;
						}
					}
				}
				if (hasParty() == false) { //�ж��Ƿ������
					cm.sendOk("�㻹û�д���һֻ����,�밴��ݡ�P�������д�����");
					cm.dispose();
				} else if (isLeader() == false) { //�ж��Ƿ��Ƕӳ�
					cm.sendOk("���ӳ�������������,����������˵����");
					cm.dispose();
                } else if (!cm.getPartyÿ�ռ�¼("��߸���", 20)) { //�ж�����Ƿ�2��
                    cm.sendOk("�����ж�����ս�����Ѿ�����20�Σ�");
                    cm.dispose();
				} else if (inMap < minPartySize || inMap > maxPartySize) {
					cm.sendOk("��Ķ�����������" + minPartySize + "��.�����Ķ�����Ա�ټ����ڽ��븱��.");
					cm.dispose();
				} else if (levelValid != inMap) {
					cm.sendOk("��ȷ����Ķ�����Ա��С�ȼ��� " + minLevel + " �� " + maxLevel + "֮��. I see #b" + levelValid + "");
					cm.dispose();
				} else if (checkPartySize() == false) { //�ж϶����Ա����
					cm.sendOk("����Ա - ��ʾ \r\n\r\n�����Ա����������#b" + minPartySize + "~" + maxPartySize + "#k֮�䲢�ұ�����һ�ŵ�ͼ���ܽ��룬��˶Ժ��������ҡ�");
					cm.dispose();
				} else if (em == null) { //�ж������ļ��Ƿ񼤻�
					cm.sendOk("�����ļ�û�п���,����ϵ����Ա��");
					cm.dispose();
				} else if (open == false) { //�ж�NPC�ű��Ƿ���
					cm.sendOk("NPC�ű�û�п���,����ϵ����Ա����");
					cm.dispose();
				} else if (Property() == false) { //�жϸ����Ƿ��Ѿ��п���
					cm.sendOk("��ǰƵ����������ڽ��������У����Ժ����ԡ�\r\n\r\n��û����������Ե��#r���ø���#kȻ���ٽ��롣");
					cm.dispose();
				} else {
					em.startInstance(cm.getParty(), cm.getPlayer().getMap());
					//cm.getPlayer().setBossLog("��߸���");//���ŶӴ���
					//cm.���Ŷ�ÿ��("��߸���");
					//cm.setPartyBosslog("��߸���");//���ŶӴ���
					// cm.givePartyÿ�ռ�¼("��߸���");
			        cm.dispose();
					//cm.serverMessage(6,"[�������]: ��� [" + cm.getPlayer().getName() + "] �������Ķ��������" + fbmc + "��");
					var eim = cm.getPlayer().getEventInstance();
					var party = eim.getPlayers();
					cm.dispose();
					em.setProperty(qblog, "false");
				}
            } else if (selection == 2) {
		        if (cm.getMeso() >= maxjinbi){//�ж϶��ٽ��
                   cm.gainMeso(- maxjinbi );//�۳����ٽ��
	               cm.ȫ����ɫ����(cm.getPlayer().getName() + " [����������]" + " : " + "[" + fbmc + "]��Ҫ��ʿһ�����");
                   cm.dispose();
				} else {
                   cm.sendOk("���ð�ձҲ���" + maxjinbi + "���޷�����������");
                   cm.dispose();
				}				
			} else if (selection == 3) {
				if (cm.getPlayerCount(922010100) <= 0 && cm.getPlayerCount(922010200) <= 0 && cm.getPlayerCount(922010201) <= 0 && cm.getPlayerCount(922010300) <= 0 && cm.getPlayerCount(922010400) <= 0 && cm.getPlayerCount(922010401) <= 0 && cm.getPlayerCount(922010402) <= 0 && cm.getPlayerCount(922010403) <= 0 && cm.getPlayerCount(922010404) <= 0 && cm.getPlayerCount(922010405) <= 0 && cm.getPlayerCount(922010500) <= 0 && cm.getPlayerCount(922010501) <= 0 && cm.getPlayerCount(922010502) <= 0 && cm.getPlayerCount(922010503) <= 0 && cm.getPlayerCount(922010504) <= 0 && cm.getPlayerCount(922010505) <= 0 && cm.getPlayerCount(922010506) <= 0 && cm.getPlayerCount(922010600) <= 0 && cm.getPlayerCount(922010700) <= 0 && cm.getPlayerCount(922010800) <= 0 && cm.getPlayerCount(922010900) <= 0 && cm.getPlayerCount(922011000) <= 0 && cm.getPlayerCount(922011100) <= 0) {
					cm.getEventManager("LudiPQ").setProperty("LPQOpen", "true");
					cm.sendOk("���óɹ���");
					cm.dispose();
				} else {
					cm.sendOk("�ø����ж������ڽ������޷����ã�");
					cm.dispose();
				}
			}				
		}
	}		
}

function getPartySize() {
	if (cm.getPlayer().getParty() == null)
		return 0;
	return (cm.getPlayer().getParty().getMembers().size());

}

function isLeader() {
	if (cm.getParty() == null)
		return false;
	return cm.isLeader();
}

function checkPartySize() {
	var size = 0;
	if (cm.getPlayer().getParty() == null)
		size = 0;
	else
		size = (cm.getPlayer().getParty().getMembers().size());
	if (size < minPartySize || size > maxPartySize)
		return false;
	return true;
}

function checkPartyLevels() {
	var pass = true;
	var party = cm.getPlayer().getParty().getMembers();
	if (cm.getPlayer().getParty() == null)
		pass = false;
	else {
		for (var i = 0; i < party.size() && pass; i++) {
			if ((party.get(i).getLevel() < minLevel) || (party.get(i).getLevel() > maxLevel) || (party.get(i).getMapId() != cm.getMapId()))
				pass = false;

		}
	}
	return pass;
}

function hasParty() {
	if (cm.getPlayer().getParty() == null)
		return false;
	return true;
}

function Property() {
	var em = cm.getEventManager(eventname);
	if (em.getProperty(qblog) == "false") {
		return false;
		return true;
	}
}
function zdLog() {
	var party = cm.getPlayer().getParty().getMembers();
	var it = party.iterator();
	var cPlayer = it.next();
	var zd = cm.getPlayer().getMap().getCharacterById(cPlayer.getId());
	if (zd.getBossLog(Log) >= maxenter)
		return false;
	return true;
}
