
var ����1 = "#fUI/ChatBalloon.img/pet/260/nw#"; //ѡ�����
var ����3 = "#fUI/ChatBalloon.img/pet/260/ne#"; //ѡ�����
var ����2 = "#fUI/ChatBalloon.img/pet/260/n#"; //ѡ�����
var ����4 = "#fUI/ChatBalloon.img/pet/260/sw#"; //ѡ�����
var ����5 = "#fUI/ChatBalloon.img/pet/260/se#"; //ѡ�����
var ����6 = "#fUI/ChatBalloon.img/pet/260/s#"; //ѡ�����

var Ԫ���۸� = 39800; // ���ü۸�
var status = 0;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (status >= 0 && mode == 0) {
            cm.dispose();
            return;
        }
        if (mode == 1) {
            status++;
        } else {
            cm.dispose();
            return;
        }
        if (status == 0) {
            var text = "#k#d" + ����1 + "" + ����2 + "" + ����2 + "" + ����2 + "" + ����2 + "" + ����2 + "" + ����2 + "" + ����2 + "" + ����2 + "" + ����2 + "" + ����2 + "#r#e�������Ա��#d#n(һ������ȡ)" + ����2 + "" + ����2 + "" + ����2 + "" + ����2 + "" + ����2 + "" + ����2 + "" + ����2 + "" + ����2 + "" + ����2 + "" + ����2 + "" + ����3 + "#w#k#e\r\n\r\n"
            text += " (#r1#b)[��ȯ �� #r#e388888#k]\r\n";
            text += " (#r2#b)[��� �� #r#e5E#k]\r\n";
            text += " (#r3#b)[#v2070005:# #b4ת���תְ����ǰְҵ���м���0���� #k ]\r\n";
            text += " (#r4#b)[ #v1142443:# #b ����ѫ��  ]\r\n";
            text += " (#r5#b)[ #v+4440300:# #b C��������ʯ #kX30��ʱװ���������ά #k]\r\n\r\n";
            text += " (#r6#b)[ #v+2022582:# #b ϴѪ��ʯ #kX500����HPMP���� #k]\r\n\r\n";
            text += " (#r7#b)[ #v+2022467:# #b ����齱�� #kX10��ȡ����ϡ��װ������ #k]\r\n\r\n";
            text += " (#r8#b)[ #v+2022465:# #b ���߳齱�� #kX20��ȡ����ϡ��װ������ #k]\r\n\r\n";
            text += " (#r19#b)[#v2022519:# #b���ֳɾͱ�����⽱�� #k�� 1]\r\n";
            // text += " [ #v+1052613:##v+1102563:##v+1012377:##v+1022150:##v+1032095:##v+1072786:##v+2022580:# #k]\r\n\r\n";
            text += " (#r10#b)[#v5211060:# #b������������Ȩ�� #k�� 1]\r\n";
            text += " (#r11#b)[#v5360017# #b������������Ȩ�� #k�� 1]\r\n";
            text += " (#r12#b)[#v4170006:# #b�������껪�����������ܻ����⽱��#k]\r\n\r\n"
            text += " (#r13#b)[�ڹ�:�Զ��������Զ�BUFF�ȶ��⹦��Ȩ��]\r\n\r\n"
            text += "���Ƿ�Ը�⻨��#r39800Ԫ��#k�����������Ա��\r\n";
            cm.sendYesNo(text);
        } else if (status == 1) {
            if (cm.getPlayer().getOneTimeLog("�����Ա") > 0) {
                cm.sendOk("���Ѿ�������������Ա����ȷ�ϣ�");
                cm.dispose();
			if (cm.getInventory(1).isFull(8)) {
					cm.sendNext("#bװ���� �ռ䲻�� 9 ��");
					cm.dispose();
					return;
				}
				if (cm.getInventory(2).isFull(5)) {
					cm.sendNext("#b������ �ռ䲻�� 6 ��");
					cm.dispose();
					return;
				}
				if (cm.getInventory(3).isFull(5)) {
					cm.sendNext("#b������ �ռ䲻�� 6 ��");
					cm.dispose();
					return;
				}
				if (cm.getInventory(4).isFull(5)) {
					cm.sendNext("#b������ �ռ䲻�� 6 ��");
					cm.dispose();
					return;
				}
				if (cm.getInventory(5).isFull(5)) {
					cm.sendNext("#b������ �ռ䲻�� 6 ��");
					cm.dispose();
					return;
				}	
            } else if (cm.getPlayer().getzb() < Ԫ���۸�) {
                cm.sendOk("����Ԫ�����㣬�޷����������Ա��");
                cm.dispose();
            // } else if (!cm.canHold(3)) { 
                // cm.sendOk("#b��ȷ�ϱ�����λ���㹻�Ŀռ䣬�Ա���ȡ������");
                // cm.dispose();
				
            } else {
                cm.gainzb(-Ԫ���۸�); // �۳�Ԫ��

                cm.setOneTimeLog("�����Ա"); // ����Ϊ�ѹ���
                cm.setOneTimeLog("�����Ա1"); // ����Ϊ�ѹ���
				���ڹ�();
                // ���Ž���
                cm.����ȯ(388888);
                cm.gainMeso(500000000);
                // cm.gainItem(4001126, 30000);
                cm.gainItem(4440300, 30);
                cm.gainItem(4310115, 30000);
                cm.gainItem(2022467, 10);
                cm.gainItem(2022465, 20);
                cm.gainItem(2022582, 500);
                // cm.gainItem(1072786, 1);
                // cm.gainItem(1102563, 1);
                cm.������װ��(1142443, 0, 0, 5, 5, 5, 5, 1000, 1000, 5, 5, 0, 0, 0, 0, 10, 10);
                // cm.������װ��(1802100, 0, 0, 5, 5, 5, 5, 500, 500, 5, 5, 0, 0, 0, 0, 0, 0);
                // cm.������װ��(1902000, 0, 0, 3, 3, 3, 3, 0, 0, 3, 3, 0, 0, 0, 0, 0, 0);

                cm.sendOk("�ɹ������������Ա��");
                cm.ȫ����ɫ����(cm.getPlayer().getName() + " [���������Ա����]" + " : " + "�ɹ���ȡ�������Ա������");
                cm.dispose();
            }
        }
    }
}

function ���ڹ�(){
    var con = null;
    var ps = null;
    var rs = null;

    try {
        con = Packages.database.DBConPool.getInstance().getDataSource().getConnection();

        // ����Ƿ��Ѿ����ڼ�¼
        ps = con.prepareStatement("SELECT function FROM ����_�ڹ���Ȩ WHERE charactersId = ?");
        ps.setInt(1, cm.getPlayer().getId());
        rs = ps.executeQuery();

        if (rs.next()) {
            // ��¼���ڣ���ȡ function ��ֵ
            var functionValue = rs.getString("function");

            // ���µڶ����͵��ĸ��ַ�Ϊ1
            var functionArray = functionValue.split("|");
            functionArray[0] = "1";
            functionArray[1] = "1";
            functionArray[2] = "1";
            functionArray[3] = "1";
            var newFunctionValue = functionArray.join("|");

            // ���¼�¼
            ps.close();
            ps = con.prepareStatement("UPDATE ����_�ڹ���Ȩ SET function = ? WHERE charactersId = ?");
            ps.setString(1, newFunctionValue);
            ps.setInt(2, cm.getPlayer().getId());
            ps.executeUpdate();

        } else {
            // ��¼�����ڣ������¼�¼
            ps.close();
            ps = con.prepareStatement("INSERT INTO ����_�ڹ���Ȩ (charactersId, startTime, endTime, function) VALUES (?, ?, ?, ?)");
            ps.setInt(1, cm.getPlayer().getId());

            var currentTimeMillis = java.lang.System.currentTimeMillis();
            ps.setTimestamp(2, new java.sql.Timestamp(currentTimeMillis));
            var endTimeMillis = currentTimeMillis + 99 * 365 * 24 * 60 * 60 * 1000;
            ps.setTimestamp(3, new java.sql.Timestamp(endTimeMillis));

            ps.setString(4, "1|1|1|1|0|0|0|0|0|0|0|0|0|0|0|0|0|0|0|0|0|0|0|0");
            ps.executeUpdate();
        }

    } catch (e) {
        // �����쳣
        e.printStackTrace();
    } finally {
        if (rs != null) {
            try {
                rs.close();
            } catch (e) {
                e.printStackTrace();
            }
        }
        if (ps != null) {
            try {
                ps.close();
            } catch (e) {
                e.printStackTrace();
            }
        }
        if (con != null) {
            try {
                con.close();
            } catch (e) {
                e.printStackTrace();
            }
        }
    }

}