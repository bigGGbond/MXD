/* ==================
 �ű�����:  ����	    
 �ű����ߣ� ��֮��   
 ��ϵ��ʽ�� 338150
 =====================
 */

var status = 0;
var fbmc = "�ٲ���-(��������)";//��������
var minLevel = 50;//��͵ȼ�
var maxLevel = 250;//��ߵȼ�
var minPartySize = 1;//�������
var maxPartySize = 6;//�������
var cishuxianzhi = 3;//���ƴ���
var maxjinbi = 50000;//�ж���������
var eventname = "Pirate";//���������ļ�

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
		//��ʾ��ƷIDͼƬ�õĴ�����  #v����д��ID#
		text += "#k\t\t\t\t��ӭ����#r" + fbmc + "#k\r\n��������Ҫ�����£�\r\n����������:#r " + minPartySize + " #b- #r" + maxPartySize + "#k��Ա\t�ڵȼ����ƣ�#r " + minLevel + " #b- #r" + maxLevel + "�� #k\r\n"
		text += "#kÿ��ֻ����ս:#b"+ cishuxianzhi +"#k��  ������ѽ���:#b"+ cm.getBossLog("��������") +"#k��#k\r\n"
		text += "#L1##r��ʼ��Ӹ���#l     " + maxjinbi + "���/��#l\r\n\r\n"
		cm.sendSimple(text);
	} else if (selection == 1) {
		cm.removeAll(4001117);
		cm.removeAll(4031437);
		cm.removeAll(4001120);
		cm.removeAll(4001121);
		cm.removeAll(4001260);
		cm.removeAll(4001122);
		if (cm.getPlayer().getParty() == null || !cm.isLeader()) {
			cm.sendOk("���Ҷӳ������ҡ�");
			cm.dispose();
		// } else if (!cm.getPartyÿ�ռ�¼("��������", 20)) { //�ж�����Ƿ�2��
			// cm.sendOk("�����ж�����ս�����Ѿ�����20�Σ�");
			// cm.dispose();
			// return;
		//}else if( cm.getPlayer().getBossLog("��������") > cishuxianzhi) {
			//cm.sendOk("����,�޶�ÿ��ֻ����ս"+ cishuxianzhi +"�Σ�");
			//cm.dispose();
			//return;
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
						if (ccPlayer.getÿ�ռ�¼("��������") >= (cishuxianzhi + 2)){
							cm.sendOk("������ "+cPlayer.getName()+" ��ս�����Ѿ�����"+(cishuxianzhi + 2)+"�Σ�");
							cm.dispose();
							return;
						}
					} else {
						
					}*/
					if (ccPlayer.getBossLog("��������") >= cishuxianzhi){
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
				if(checkMap()) {
					var em = cm.getEventManager("Pirate");
					if (em == null) {
						cm.sendOk("�Ҳ����ű�������ϵGM����");
						cm.dispose();
					} else {
						em.startInstance(cm.getPlayer().getParty(), cm.getPlayer().getMap());
						//cm.getPlayer().setBossLog("��������");//���ŶӴ���
						//cm.���Ŷ�ÿ��("��������");
						//cm.setPartyBosslog("��������");//���ŶӴ���
						// cm.givePartyÿ�ռ�¼("��������");
						cm.dispose();
					}
				} else {
					cm.sendOk("Ŀǰ�����ڴ򆪡�");
					cm.dispose();
				}
			} else {
				cm.sendOk("��Ҫ" + minPartySize + "��" + maxPartySize + "���� �ȼ�������" + minLevel+ "��" + maxLevel + "��");
				cm.dispose();
			}
		}
	} else if (selection == 2) {
		if (cm.getMeso() >= maxjinbi){//�ж϶��ٽ��
			cm.gainMeso(- maxjinbi );//�۳����ٽ��
			cm.ȫ����ɫ����(cm.getPlayer().getName() + " [����������]" + " : " + "[" + fbmc + "]��Ҫ��ʿһ�����,�����ڸ����ſ�!");
			cm.dispose();
		}else{
			cm.sendOk("���ð�ձҲ���" + maxjinbi + "���޷�����������");
			cm.dispose();
		}		
	}
}
	
function checkMap() {
    var map = [925100000, 925100100, 925100200, 925100201, 925100202, 925100300, 925100301, 925100302, 925100400, 925100400, 925100500];
    for(var i = 0 ; i < map.length; i++) {
        if(cm.getPlayerCount(map[i]))
            return false;
    }
    return true;
}