/*
@QQС��
��ѡ�����سɾ�
 */

//[1312039,1322065,1332081,1372046,1382062,1402053,1412035,1422039,1432050,1442071,1452062,1462056,1472077,1482029,1492030]
var weapon;

var weapon1 = [
    [1302030, 3, 85, 0, "����Ӣ�۵�����"],//սʿ+��������Ӣ�۵�����
    [1412011, 3, 85, 0, "ʥ��ʿ������"],//սʿ+����ʥ��ʿ������
    [1422014, 3, 85, 0, "ʥ��ʿ������"],//սʿ+����ʥ��ʿ������
    [1432012, 3, 85, 0, "����ʿ������"],//սʿ+��������ʿ������
    [1442024, 3, 85, 0, "����ʿ������"],//սʿ+��������ʿ������
];

var weapon2 = [
    [1382012, 3, 0, 95, "ħ��ʦ������"],//ħ��ʦ
];

var weapon3 = [
    [1452022, 3, 75, 0, "������ѡ���������"],//��+����������ѡ���������
    [1462019, 3, 75, 0, "����ѡ���������"],//��+���� ����ѡ���������
];

var weapon4 = [
    [1472032, 3, 40, 0, "��Ӱ�˶�����ѡ���������"],//���+���� ��Ӱ�˶�����ѡ���������
    [1332025, 3, 85, 0, "��������������"],//��+������������������
];

var weapon5 = [
    [1482020, 3, 75, 0, "���������˵�����"],//�ӳ�+�������������˵�����
    [1492020, 3, 55, 0, "������ְҵ����"], //����+����������ְҵ����
];

//��ѡ��
var req = [
    [2022552, 1]
];
var sels;
var status = -1;

function start() {
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else if (mode == 0) {
        status--;
    } else {
        cm.dispose();
        return;
    }
    if (status == 0) {
        var jobType = judgementJob(cm.getJob());
        switch (jobType){
            case -1:
                weapon = [];
                weapon = weapon.concat(weapon1, weapon2, weapon3, weapon4, weapon5);
                break;
            case 0:
                cm.sendOk("��1ת���ٴ�");
                cm.dispose();
                return;
            case 1:
                weapon = weapon1;
                break;
            case 2:
                weapon = weapon2;
                break;
            case 3:
                weapon = weapon3;
                break;
            case 4:
                weapon = weapon4;
                break;
            case 5:
                weapon = weapon5;
                break;
        }

        var msg = "ѡ��һ���ʺ���������ɡ�\r\n";
        for (var i = 0; i < weapon.length; i++) {
            msg += "     #b#L" + i + "#";
            msg += "#i" + weapon[i][0] + "# " + weapon[i][4] + "#l\r\n";
        }
        // cm.sendSimple("" + msg + "");
        cm.sendSimpleS(msg, 2);
    } else if (status == 1) {
        sels = selection;
        if (!cm.canHold(weapon[sels][0])) {
            cm.sendNext("#r�����ռ䲻��");
            cm.dispose();
            return;
        }
        // if(cm.getPlayer().getOneTimeLog("�����Ա") == 0){
        // cm.sendOk("����û�й���������Ա����ȷ�ϣ�");
        // cm.dispose();
        // return;
        // }
        // if(cm.getOneTimeLog('��ȡ��Ҷ����1') >= 1){
        // cm.sendOk("ÿ�����ֻ����ȡһ�Ρ�");
        // cm.dispose();
        // }
        for (var i = 0; i < req.length; i++) {
            if (!cm.haveItem(req[i][0], req[i][1])) {
                cm.sendNext("#b����û��#r#i" + req[i][0] + "#  #t" + req[i][0] + "# x " + req[i][1] + "");
                cm.dispose();
                return;
            }
        }
        cm.sendYesNo("�Ƿ�Ҫѡ�� #b#v" + weapon[sels][0] + "#  #z" + weapon[sels][0] + "# ? \r\n#k���ѣ�#r���ٴ�ȷ��ѡ���������һ��ѡ��Ų��˻���");
    } else if (status == 2) {
        for (var i = 0; i < req.length; i++) {
            cm.gainItem(req[i][0], -req[i][1]);
        }
        // cm.����Ʒ(weapon[sels], 1);
        cm.������װ��(weapon[sels][0], 0, 0, weapon[sels][1], weapon[sels][1], weapon[sels][1], weapon[sels][1], 0, 0, weapon[sels][2], weapon[sels][3], 1, 1, 1, 1, 0, 0, 0);
        cm.setOneTimeLog('��ȡ��Ҷ����');
		cm.ѭ�����Ŷ���("Effect/OnUserEff.img/guideEffect/aranTutorial/ui0",3000,3);
        cm.sendNext("#b�ɹ��������ӣ����  #b#v" + weapon[sels][0] + "#  #z" + weapon[sels][0] + "#");
        cm.dispose();
        qm.openQuest(9900001,60868);
    } else {
        cm.sendNext("#r��������: mode : " + mode + " status : " + status);
        cm.dispose();
    }
}
function judgementJob(job){
    if(job == 0 || job == 1 || job == 1000 || job == 2000 || job == 2001 || job == 3000 || job == 3001 || job == 2002){
        return 0;
    }
    //սʿ &&  ����ʿ
    else if((job >= 100 && job <= 132) || (job >= 1100 && job <= 1112) || (job >= 2100 && job <= 2112) ){
        return 1;
    }
    //��ʦ
    else if((job >= 200 && job <= 232) || (job >= 1200 && job <= 1212)){
        return 2;
    }
    //��
    else if((job >= 300 && job <= 332) ||  (job >= 1300 && job <= 1312) ){
        return 3;
    }
    //����
    else if((job >= 400 && job <= 434) || (job >= 1400 && job <= 1412) ){
        return 4;
    }
    //����
    else if((job >= 500 && job <= 522) || (job >= 1500 && job <= 1512) ){
        return 5;
    }
    else {
        return -1;
    }

}
