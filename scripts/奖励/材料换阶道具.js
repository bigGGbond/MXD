/* ==================
 �ű�����: NPC	    
 �ű�����: ��Ϸ���Ŷ�-ά������ 
 ��ϵ�ۿ�: 297870163
 =====================
 */

var status = -1;
var ѡ���������;
var ѡ����Ͻ���;
var Ŀ�����;
var ������ = 10; // ������߿��Ե�10��

// ����װ����������
var �����б� = [
    { ����: "��������", ����: 4500216 },
    { ����: "��Ʒ����", ����: 4500516 },
    { ����: "�񻷲���", ����: 4501116 },
    { ����: "���ײ���", ����: 4500316 },
    { ����: "��������", ����: 4500616 },
    { ����: "�������", ����: 4500916 },
    { ����: "Ь�Ӳ���", ����: 4500416 },
    { ����: "�������", ����: 4500816 }
];

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
        if (mode == 1)
            status++;
        else
            status--;

        if (status == 0) {
            // ����Ƿ������
            if (!cm.haveItem(2022539, 1)) {
                cm.sendOk("��û��#v2022539#װ��������ѡ�����");
                cm.dispose();
                return;
            }

            var text = "#e#d��ѡ���㱳����Ҫ���׵Ĳ������#n#k\r\n\r\n";
            // ���յ��в�����ʾ��������
            for (var i = 0; i < �����б�.length; i++) {
                var ���� = �����б�[i];
                text += "#L" + i + "##b" + ����.���� + "#k\r\n";
                // ��ʾ���������н����Ĳ�������
                for (var j = 1; j <= ������; j++) {
                    var itemId = ����.���� + j - 1;
                    var quantity = cm.itemQuantity(itemId);
                    if (quantity > 0) {
                        text += "#d" + j + "��: #v" + itemId + "# x " + quantity + "#k  ";
                    }
                }
                text += "\r\n\r\n";
            }
            cm.sendSimple(text);
        }
        else if (status == 1) {
            ѡ��������� = selection;
            var ���� = �����б�[ѡ���������];
            var text = "#e#d��ѡ��Ҫ���׵Ĳ��ϣ�#n#k\r\n\r\n";
            
            // ��ʾ���ӵ�еĸ��ײ���
            for (var i = 1; i <= ������; i++) {
                var itemId = ����.���� + i - 1;
                var quantity = cm.itemQuantity(itemId);
                if (quantity > 0) {
                    text += "#L" + i + "##d" + i + "��#v" + itemId + "# x " + quantity + "#k\r\n";
                }
            }
            
            if (text === "#e#d��ѡ��Ҫ���׵Ĳ��ϣ�#n#k\r\n\r\n") {
                cm.sendOk("��û���κο������׵�" + ����.���� + "��");
                cm.dispose();
                return;
            }
            
            cm.sendSimple(text);
        }
        else if (status == 2) {
            ѡ����Ͻ��� = selection;
            var ���� = �����б�[ѡ���������];
            var ��ǰ����ID = ����.���� + ѡ����Ͻ��� - 1;
            
            if (ѡ����Ͻ��� >= ������) {
                cm.sendOk("�ò����Ѵﵽ��߽������޷��������ס�");
                cm.dispose();
                return;
            }
            
            var text = "#e#d��ѡ��Ҫ��#v" + ��ǰ����ID + "#��������Ŀ�������#n#k\r\n";
            text += "#r(ע�⣺���׺����ĵ�ԭ�в��ϣ��ҹ��̲�����)#k\r\n\r\n";
            
            // ��ʾ��������Ŀ�����
            for (var i = ѡ����Ͻ��� + 1; i <= ������; i++) {
                var targetId = ����.���� + i - 1;
                text += "#L" + i + "##d" + i + "��#v" + targetId + "##k\r\n";
            }
            
            cm.sendSimple(text);
        }
        else if (status == 3) {
            Ŀ����� = selection;
            var ���� = �����б�[ѡ���������];
            var ��ǰ����ID = ����.���� + ѡ����Ͻ��� - 1;
            var Ŀ�����ID = ����.���� + Ŀ����� - 1;
            
            var text = "#e#r�����桿#n#k\r\n";
            text += "��ȷ��Ҫ��#v" + ��ǰ����ID + "#����Ϊ#v" + Ŀ�����ID + "#��\r\n";
            text += "�˲��������ģ�\r\n";
            text += "1��#v2022539#װ��������ѡ���\r\n";
            text += "1��#v" + ��ǰ����ID + "#" + ѡ����Ͻ��� + "��" + ����.���� + "\r\n\r\n";
            text += "#rע�⣺�ò���������ת����ȷ�Ϻ��ټ�����#k";
            
            cm.sendYesNo(text);
        }
        else if (status == 4) {
            var ���� = �����б�[ѡ���������];
            var ��ǰ����ID = ����.���� + ѡ����Ͻ��� - 1;
            var Ŀ�����ID = ����.���� + Ŀ����� - 1;
            
            // �ٴμ������Ƿ����
            if (!cm.haveItem(2022539, 1)) {
                cm.sendOk("��û��#v2022539#װ��������ѡ�����");
                cm.dispose();
                return;
            }
            
            if (!cm.haveItem(��ǰ����ID, 1)) {
                cm.sendOk("��û��#v" + ��ǰ����ID + "#" + ѡ����Ͻ��� + "��" + ����.���� + "��");
                cm.dispose();
                return;
            }
            
            // �۳�����
            cm.gainItem(2022539, -1);
            cm.gainItem(��ǰ����ID, -1);
            
            // ����²���
            cm.gainItem(Ŀ�����ID, 1);
            
            cm.sendOk("#e#r���׳ɹ���#n#k\r\n��ã�#v" + Ŀ�����ID + "#" + Ŀ����� + "��" + ����.����);
            cm.dispose();
        }
    }
}

