/* ==================
 �ű�����:  NPC	    
 �ű����ߣ� ��֮�� 
 ��ϵ��ʽ�� QQ338150
 =====================
 */
 
var status = 0;
var fbmc = "��������-(��������)";//��������
var minLevel = 20;//��͵ȼ�
var maxLevel = 250;//��ߵȼ�
var minPartySize = 1;//�������
var maxPartySize = 6;//�������
var cishuxianzhi = 3;//���ƴ���
var maxjinbi = 50000;//�ж���������
var eventname = "KerningPQ";//���������ļ�

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
		text += "#k\t\t\t��ӭ����#r" + fbmc + "#k\r\n��������Ҫ�����£�\r\n����������:#b " + minPartySize + " #b- #r" + maxPartySize + "#k��Ա\t�ڵȼ����ƣ�#r " + minLevel + " #b- #r" + maxLevel + "�� #k\r\n"
		text += "#kÿ��ֻ����ս:#b"+ cishuxianzhi + "#k��  ����������:#b"+ cm.getBossLog("��������") +"#k��#k\r\n"
		text += "#L1##r��ʼ��Ӹ���#l      " + maxjinbi + "���/��#l\r\n\r\n"
		cm.sendSimple(text);
	} else if (selection == 1) {
        if (cm.getParty() == null) {
            cm.sendOk("��û�ж����޷����룡");
            cm.dispose();
			return;
        } else if (!cm.isLeader()) { 
            cm.sendOk("������Ķӳ�����˵��~");
            cm.dispose();
			return;
		}else {
            var party = cm.getParty().getMembers();
            var inMap = cm.partyMembersInMap();
            var levelValid = 0;
			var it = party.iterator();
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
			}
            for (var i = 0; i < party.size(); i++) {
                if (party.get(i).getLevel() >= minLevel && party.get(i).getLevel() <= maxLevel) {
                    levelValid++;
				}
            }
            if (inMap < minPartySize || inMap > maxPartySize) {
                cm.sendOk("��Ķ�����������"+minPartySize+"��.�����Ķ�����Ա�ټ������������ڽ��븱��.");
                cm.dispose();
				return;
            } else if (levelValid != inMap) {
                cm.sendOk("��ȷ����Ķ�����������Ա���ڱ���ͼ������С�ȼ��� "+minLevel+" �� "+maxLevel+"֮��.");
                cm.dispose();
				return;
	        }else {
                var em = cm.getEventManager("KerningPQ");
                if (em == null) {
                    cm.sendOk("��̨�����ǵ�ǰ������.");
				//} else if (em.getProperty("KPQOpen").equals("true")) {
                } else {
					if (cm.getPlayerCount(103000800) <= 0 && cm.getPlayerCount(103000801) <= 0 && cm.getPlayerCount(103000802) <= 0 && cm.getPlayerCount(103000803) <= 0 && cm.getPlayerCount(103000804) <= 0) {
						/*var papuMap = cm.getMap(103000804);
						 cm.getMap(103000804).resetFully();
						cm.spawnMobOnMap(9300002,1,297,-2188,103000804);
						cm.spawnMobOnMap(9300002,1,433,-2192,103000804);
						cm.spawnMobOnMap(9300002,1,132,-2193,103000804);
						cm.spawnMobOnMap(9300000,1,-18,-1480,103000804);
						cm.spawnMobOnMap(9300000,1,80,-1486,103000804);
						cm.spawnMobOnMap(9300000,1,391,-1488,103000804);
						cm.spawnMobOnMap(9300000,1,247,-1485,103000804);
						cm.spawnMobOnMap(9300000,1,-111,-1475,103000804);
						cm.spawnMobOnMap(9300000,1,299,-1485,103000804);
						cm.spawnMobOnMap(9300003,1,162,-451,103000804);
						//var papuMap = pi.getMap(103000804);
						//pi.getPlayer().setbosslog(1);
						//pi.playPortalSE();*/
						//}
						//em.startInstance(cm.getPlayer().getParty(), cm.getPlayer().getMap());
						em.startInstance(cm.getParty(), cm.getPlayer().getMap());
						//cm.getPlayer().setBossLog("��������");//���ŶӴ���
						// cm.givePartyÿ�ռ�¼("��������");
						//cm.setPartyBosslog("��������");//���ŶӴ���
					} else {
						cm.sendOk("���Ե�...�������ڽ�����.");
					}
                }
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