/* ==================
 �ű�����: NPC	    
 �ű����ߣ�������   
 ��ϵ��ʽ��338150
 =====================
 */
importPackage(java.lang);//------------------------������  ǰ������б��ɾ������  �Ϳ���
importPackage(Packages.tools);
importPackage(Packages.client);
importPackage(Packages.server);
importPackage(Packages.tools.packet);
var fbmc = "��֮��У";
var minLevel = 1;//��͵ȼ�
var maxLevel = 200;//��ߵȼ�
var minPartySize = 1;//�������
var maxPartySize = 6;//�������
var cishuxianzhi = 114;//���ƴ���
var maxjinbi = 50000;//�ж���������
var status;
// var ���ڼ���ʼ = 7;
var ��ʼСʱ = 20;
var ��ʼ���� = 1;
var ����Сʱ = 20;
var �������� = 31;
var ���͵�ͼ = 910000077;
var dt = new Date();
var nowh = dt.getHours(); //��ȡʱ
var nowm = dt.getMinutes(); //��ȡ��
var cal = java.util.Calendar.getInstance();
var todayweek = cal.get(java.util.Calendar.DAY_OF_WEEK) - 1;
function start() {
	  status = -1;
	  action(1, 0, 0);		
}

function action(mode, type, selection) {
	var date = new Date();
    if (mode == -1) {
        cm.dispose();
    }
    else {
        if (status >= 0 && mode == 0) {

            cm.sendOk("��л��Ĺ��٣�");
            cm.dispose();
            return;
        }
        if (mode == 1) {
            status++;
        }
        else {
            status--;
        }
        if (status == 0) {	
            var tex2 = "";
            var text = "";
            for (i = 0; i < 10; i++) {
                text += "";
            }
            text += "#k\t\t\t#v3014009# #e��ӭ����#r" + fbmc + "#k#n\r\n";
            text += "#v3994618# ��������Ҫ�����£�\r\n";
			text += "#v3994611# �� �ȼ����ƣ�#r" + minLevel + "#k - #r" + maxLevel + "#k��   �������ƣ�#r" + minPartySize + " - 6#k #r��\t\t\r\n";
			text += "#v3994612# #k�� ÿ������ս:#r"+cishuxianzhi+"#k��  ��������ս:#r"+ cm.getPlayer().getBossLogD("��֮��У") +"#k�� ��ͼ:#r"+ cm.getPlayer().getBossLog(date .getDate()+"��֮��У") +"#k��#k\r\n";
			// text += "#v3994613# �� #k\r\n";
			if(todayweek!=7&&todayweek!=0){
			text += "\r\n#bֻ���������տ�����ս" + fbmc + "#l\r\n\r\n";
			
			}else{
			text += "#L1##r#v5680208# ��ʼ" + fbmc + "#l        #L3##v2041320# #r������ȡ#l\r\n\r\n";
			}
			text += "#L1##r#v5680208# ��ʼ" + fbmc + "#l        #L3##v2041320# #r������ȡ#l\r\n\r\n";
			text += "        #L2##v3994588# #r����������#k" + maxjinbi + "���/��#l\r\n\r\n";
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
        } else {
            var party = cm.getParty().getMembers();
            var inMap = cm.partyMembersInMap();
            var levelValid = 0;
            for (var i = 0; i < party.size(); i++) {
                if (party.get(i).getLevel() >= minLevel && party.get(i).getLevel() <= maxLevel)
                    levelValid++;
            }
            if (inMap < minPartySize || inMap > maxPartySize) {
                cm.sendOk("��Ķ�����������"+minPartySize+"��.�����Ķ�����Ա�ټ���У�ڽ��븱��.");
                cm.dispose();
				return;
            } else if (levelValid != inMap) {
                cm.sendOk("��ȷ����Ķ�����������Ա���ڱ���ͼ������С�ȼ��� "+minLevel+" �� "+maxLevel+"֮��.");
                cm.dispose();
				return;
	        }else if (cm.getPlayer().getBossLogD("��֮��У") == cishuxianzhi) {//�ж�����Ƿ�2��
	            cm.sendOk("�����ж�����ս�����Ѿ�����"+ cishuxianzhi +"�Σ�");
                cm.dispose();
				return;
			}else if( cm.getPlayer().getBossLog("��֮��У") > cishuxianzhi) {
	            cm.sendOk("����,�޶�ÿ��ֻ����ս"+ cishuxianzhi +"�Σ�");
                cm.dispose();
				return;
		        //}else if(day%3!=0) {
					//cm.sendOk("ֻ����3�����������ڣ���1��3��,2��12�ţ���ս");
				} else {
	cm.getPlayer().setBossLog("��֮��У");//���ŶӴ���
	// cm.warpParty(744000001, 0);
	cm.start_DojoAgent1(false, true);
//}
       cm.dispose();
}
}
} else if (selection == 2) {
            if (cm.getMeso() >= maxjinbi){//�ж϶��ٽ��
                cm.gainMeso(- maxjinbi );//�۳����ٽ��
				cm.ȫ����ɫ����(cm.getPlayer().getName() + " [����������]" + " : " + "[" + fbmc + "]���Ѿ��ڸ����ſڣ���Ҫ��ʿһ�������ɣ�");
                cm.dispose();
                }else{
                    cm.sendOk("���ð�ձҲ���" + maxjinbi + "���޷�����������");
                    cm.dispose();
    }
			} else if (selection == 3) {
			    cm.dispose();
            	cm.openNpc(9330165, 2);
}}}