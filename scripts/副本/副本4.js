/* ==================
 �ű�����:  NPC	    
 �ű����ߣ� ��֮�� 
 ��ϵ��ʽ�� QQ338150
 =====================
 */
 
var status = 0;
var fbmc = "ͨ����-(Ů�񸱱�)";
var minLevel = 40;//��͵ȼ�
var maxLevel = 250;//��ߵȼ�
var minPartySize = 1;//�������
var maxPartySize = 6;//�������
var cishuxianzhi = 3;//�ӳ����ƴ���
var maxjinbi = 50000;//�ж���������
var eventname = "OrbisPQ";//���������ļ�

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
		if (cm.getMapId() == 920010000) {
			cm.warpParty(920010100);//���Ƹ�����
			var em = cm.getEventManager("OrbisPQ");
			if (em != null) {
				// rm.givePartyExp(6000);
				em.setProperty("pre", "1");
			}
			// cm.sendOk("���Ǳ��������� ��Ҫ20���Ƶ���ƬȻ�󶪵��м�Ĺ⻷֮��,�м�ǧ��Ҫһ��һ����!");
			cm.dispose();
			return;
		}
		var text = "";
		
		text += "#k\t\t\t\t��ӭ����#r" + fbmc + "#k\r\n��������Ҫ�����£�\r\n����������:#r " + minPartySize + " #b- #r" + maxPartySize + "#k��Ա\t�ڵȼ����ƣ�#r " + minLevel + " #b- #r" + maxLevel + "�� #k\r\n"
		text += "#kÿ��ֻ����ս:#b"+ cishuxianzhi + "#k��   ������ѽ���:#b"+ cm.getBossLog("��ո���") +"#k��#k\r\n"
		text += "#L1##r��ʼ��Ӹ���#l      " + maxjinbi + "���/��#l\r\n\r\n"
		cm.sendSimple(text);
	} else if (selection == 1) {
		for (var i = 4001044; i < 4001064; i++) {
			cm.removeAll(i); 
		}
		if (cm.getParty() == null || !cm.isLeader()) { //�ж϶ӳ�
			cm.sendOk("������Ķӳ�����˵��~");
			cm.dispose();
			return;
		} else {
			// Check if all ��Ա are within PQ levels
			var mapId = cm.getPlayer().getMapId();
			var next = true;
			var levelValid = 0;
			var inMap = 0;
			var notHere = '';
			var party = cm.getPlayer().getParty().getMembers();
			var it = party.iterator();
			while (it.hasNext()) {
				var cPlayer = it.next();
				var ccPlayer = cm.getPlayer().getMap().getCharacterById(cPlayer.getId());
				if(ccPlayer != null) {
					/*if (ccPlayer.getOneTimeLog("�����Ա") > 0){
						if (ccPlayer.getÿ�ռ�¼("��ո���") >= (cishuxianzhi + 2)){
							cm.sendOk("������ "+cPlayer.getName()+" ��ս�����Ѿ�����"+(cishuxianzhi + 2)+"�Σ�");
							cm.dispose();
							return;
						}
					} else {
						
					}*/
					if (ccPlayer.getBossLog("��ո���") >= cishuxianzhi){
						cm.sendOk("������ "+cPlayer.getName()+" ��ս�����Ѿ�����"+cishuxianzhi+"�Σ�");
						cm.dispose();
						return;
					}
				} else {
					notHere += cPlayer.getName() + " ";
				}
				if('' !== notHere) {
					cm.sendOk(notHere + '���ڱ���ͼ.');
					cm.dispose();
					return;
				}
				if ((cPlayer.getLevel() >= minLevel) && (cPlayer.getLevel() <= maxLevel)) {
					levelValid += 1;
				} else {
					next = false;
				}
				if (cPlayer.getMapid() == mapId) {
					inMap += (cPlayer.getJobId() == 900 ? 6 : 1);
				}
			}
			if (party.size() > maxPartySize || inMap < minPartySize) {
				next = false;
			}
			if (next) {
				cm.dispose();
				var em = cm.getEventManager("OrbisPQ");
				if (em == null) {
					cm.sendSimple("�Ҳ����ű�������GM#b\r\n");
				} else {
					var prop = em.getProperty("state");
					if (prop.equals("0") || prop == null) {
						// cm.givePartyÿ�ռ�¼("��ո���");
						em.startInstance(cm.getPlayer().getParty(), cm.getPlayer().getMap());
						// em.startInstance(cm.getParty(), cm.getMap());
						//cm.getPlayer().setBossLog("��ո���");//���ŶӴ���
						//cm.���Ŷ�ÿ��("��ո���");
						//cm.setPartyBosslog("��ո���");//���ŶӴ���
						// return;
					} else {
						cm.sendSimple("���������Ѿ��������� #r���������#k �볢�Ի�Ƶ�����ߵ�����������ɡ�");
					}
				}
			} else {
				cm.sendSimple("��Ķ���ò��û�дﵽҪ��...:\r\n\r\n#rҪ��: " + minPartySize + " ��ҳ�Ա, ÿ���˵ĵȼ������� " + minLevel + " �� �ȼ� " + maxLevel + ".");
			}
		}
	} else if (selection == 2) {
		if (cm.getMeso() >= maxjinbi){//�ж϶��ٽ��
			cm.gainMeso(- maxjinbi );//�۳����ٽ��
			cm.ȫ����ɫ����(cm.getPlayer().getName() + " [����������]" + " : " + "[" + fbmc + "]��Ҫ��ʿһ�����");
			cm.dispose();
		}else{
			cm.sendOk("���ð�ձҲ���" + maxjinbi + "���޷�����������");
			cm.dispose();
		}
	}
    
}

