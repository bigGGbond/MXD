/* ==================
 �ű�����:  ����    
 �ű����ߣ� ��֮��   
 ��ϵ��ʽ�� qq338150
 =====================
 */
 
var status = 0;
var fbmc = "����ɭ��-(���︱��)";//��������
var minLevel = 50;//��͵ȼ�
var maxLevel = 250;//��ߵȼ�
var minPartySize = 1;//�������
var maxPartySize = 6;//�������
var cishuxianzhi = 3;//���ƴ���
var maxjinbi = 50000;//�ж���������
var eventname = "Ellin";//���������ļ�

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == 1) 
		status++;
    else {
		cm.dispose();
        return;
    }
    if (status == 0) {
		var text = "";
		text += "#k\t\t\t\t��ӭ����#r" + fbmc + "#k\r\n��������Ҫ�����£�\r\n����������:#r " + minPartySize + " #b- #r" + maxPartySize + "#k��Ա\t�ڵȼ����ƣ�#r " + minLevel + " #b- #r" + maxLevel + "�� #k\r\n"
		text += "#kÿ��ֻ����ս:#b"+ cishuxianzhi +"#k�� #k ������ѽ���:#b"+ cm.getBossLog("���︱��") +"#k��#k\r\n"
		text += "#L1##r��ʼ��Ӹ���#l      " + maxjinbi + "���/��#l\r\n\r\n"
		cm.sendSimple(text);
    } else if (status == 1) {
        if (selection == 1) {
			if (cm.getPlayer().getParty() == null || !cm.isLeader()) {
				cm.sendOk("�����Ķӳ�������̸����");
				cm.dispose();
			} else {
				var party = cm.getPlayer().getParty().getMembers();
				var mapId = cm.getPlayer().getMapId();
				var next = true;
				var size = 0;
				var it = party.iterator();
				var party = cm.getParty().getMembers();
				while (it.hasNext()) {
					var cPlayer = it.next();
					var ccPlayer = cm.getPlayer().getMap().getCharacterById(cPlayer.getId());
					if(ccPlayer != null) {
						/*if (ccPlayer.getOneTimeLog("�����Ա") > 0){
							if (ccPlayer.getÿ�ռ�¼("���︱��") >= (cishuxianzhi + 2)){
								cm.sendOk("������ "+cPlayer.getName()+" ��ս�����Ѿ�����"+(cishuxianzhi + 2)+"�Σ�");
								cm.dispose();
								return;
							}
						} else {
							
						}*/
						if (ccPlayer.getBossLog("���︱��") >= cishuxianzhi){
							cm.sendOk("������ "+cPlayer.getName()+" ��ս�����Ѿ�����"+cishuxianzhi+"�Σ�");
							cm.dispose();
							return;
						}
					}
					if (ccPlayer == null || ccPlayer.getLevel() < minLevel || ccPlayer.getLevel() > maxLevel) {
						next = false;
						break;
					}
				}	    		
				if (party.size() >= minPartySize && next) {
					var em = cm.getEventManager("Ellin");
					if (em == null) {
						cm.sendOk("��ǰ����������,���������Ա.");
						cm.dispose();
					} else {
						var prop = em.getProperty("state");
						if (prop.equals("0") || prop == null) {
							em.startInstance(cm.getParty(), cm.getMap());
							//cm.getPlayer().setBossLog("���︱��");//���ŶӴ���
							//cm.���Ŷ�ÿ��("���︱��");
							//cm.setPartyBosslog("���︱��");//���ŶӴ���
							// cm.givePartyÿ�ռ�¼("���︱��");
							cm.dispose();
							return;
						} else {
							cm.sendOk("�����Ѿ�������,�����Ժ��ڽ��뿴��,���߸���Ƶ��");
							cm.dispose();
						}
					}
				} else {
					cm.sendOk("��Ķ���#b��Ա#k��Ҫ#b" +minPartySize+ "��#k���ϵȼ�" + minLevel + "~" + maxLevel + "�Ķ�Ա���ܽ���!");
					cm.dispose();
				}
			}
		} else if (selection == 2){
            if (cm.getMeso() >= maxjinbi){//�ж϶��ٽ��
                cm.gainMeso(- maxjinbi );//�۳����ٽ��
				cm.ȫ����ɫ����(cm.getPlayer().getName() + " [����������]" + " : " + "[" + fbmc + "]��Ҫ��ʿһ�����,�����ڸ����ſ�");
                cm.dispose();
			}else{
				cm.sendOk("���ð�ձҲ���" + maxjinbi + "���޷�����������");
				cm.dispose();
			}
		}
    }
}