function start() {
    status = -1;
    // cm.sendOk(cm.getOneTimeLog("����"+"1121008") > 0 ? cm.getOneTimeLog("����"+"1121008") : 0);
    action(1, 0, 0);
}
function action(mode, type, selection) {

    if (mode == -1) {
        cm.dispose();
    } else {
        if (status >= 0 && mode == 0) {

            cm.sendOk("��л��Ĺ��٣�");
            cm.dispose();
            return;
        }
        if (mode == 1) {
            status++;
        } else {
            status--;
        }
        if (status == 0) {
            // cm.ShowWZEffect("Effect/OnUserEff.img/guideEffect/aranTutorial/ui0");
            // cm.dispose();
            // return;
            var tex2 = "";
            //cm.ȫ������("��ȡ����");
            //cm.forceCompleteQuest(60850)
            var text = "";
            text += "" + ����1 + "" + ����2 + "" + ����2 + "" + ����2 + "" + ����2 + "" + ����2 + "" + ����2 + "" + ����2 + "" + ����2 + "" + ����2 + "" + ����2 + "" + ����2 + "" + ����7 + "" + ����2 + "" + ����2 + "" + ����2 + "" + ����2 + "" + ����2 + "" + ����2 + "" + ����2 + "" + ����2 + "" + ����2 + "" + ����2 + "" + ����3 + "#k#w\r\n";
            text += "                  #r#e#L0#װ������ #l\r\n\r\n\r\n";
            text += "                \t#r#L1#��ָ1#l   \r\n\r\n";
            text += "                \t#r#L2#��ָ2#l   \r\n\r\n";
            text += "                \t#r#L3#��ָ3#l   \r\n\r\n";
            text += "                \t#r#L4#��ָ4#l   \r\n\r\n";
            text += "                \t#r#L5#��ָ5#l   \r\n\r\n";
            text += "                \t#r#L6#��#l   \r\n\r\n";
            text += "                \t#r#L7#�۾�#l   \r\n\r\n";
            text += "                \t#r#L8#����#l   \r\n\r\n";
            text += "                \t#r#L9#����#l   \r\n\r\n";
            text += "                \t#r#L10#����#l   \r\n\r\n";
            text += "                \t#r#L11#ͷ��#l   \r\n\r\n";
            text += "                \t#r#L12#����#l   \r\n\r\n";
            text += "                \t#r#L13#����#l   \r\n\r\n";
            text += "                \t#r#L14#����#l   \r\n\r\n";
            text += "                \t#r#L15#����#l   \r\n\r\n";
            text += "                \t#r#L16#�·�#l   \r\n\r\n";
            text += "                \t#r#L17#Ь��#l   \r\n\r\n";
            text += "\r\n\r\n"
            text += "#r  " + ����4 + "" + ����6 + "" + ����6 + "" + ����6 + "" + ����6 + "" + ����6 + "" + ����6 + "" + ����6 + "" + ����6 + "" + ����6 + "" + ����6 + "" + ����6 + "" + ����6 + "" + ����6 + "" + ����6 + "" + ����6 + "" + ����6 + "" + ����6 + "" + ����6 + "" + ����6 + "" + ����6 + "" + ����6 + "" + ����5 + "#l#k\r\n";
            cm.sendSimpleS(text, 2);
        } else if (selection == 1) {
            cm.dispose();
            cm.openNpc(9900001, "��ָ1");
        } else if (selection == 2) {
            cm.dispose();
            cm.openNpc(9900001, "��ָ2");
        } else if (selection == 3) {
            cm.dispose();
            cm.openNpc(9900001, "��ָ3");
        } else if (selection == 4) {
            cm.dispose();
            cm.openNpc(9900001, "��ָ4");
        } else if (selection == 5) {
            cm.dispose();
            cm.openNpc(9900001, "��ָ5");
        } else if (selection == 6) {
            cm.dispose();
            cm.openNpc(9900001, "��");
        } else if (selection == 7) {
            cm.dispose();
            cm.openNpc(9900001, "�۾�");
        } else if (selection == 8) {
            cm.dispose();
            cm.openNpc(9900001, "����");
        } else if (selection == 9) {
            cm.dispose();
            cm.openNpc(9900001, "����");
        } else if (selection == 10) {
            cm.dispose();
            cm.openNpc(9900001, "����");
        } else if (selection == 11) {
            cm.dispose();
            cm.openNpc(9900001, "ͷ��");
        } else if (selection == 12) {
            cm.dispose();
            cm.openNpc(9900001, "����");
        } else if (selection == 13) {
            cm.dispose();
            cm.openNpc(9900001, "����");
        } else if (selection == 14) {
            cm.dispose();
            cm.openNpc(9900001, "����");
        } else if (selection == 15) {
            cm.dispose();
            cm.openNpc(9900001, "����");
        } else if (selection == 16) {
            cm.dispose();
            cm.openNpc(9900001, "�·�");
        } else if (selection == 17) {
            cm.dispose();
            cm.openNpc(9900001, "Ь��");
        }
    }
}
var ����1 = "#fUI/ChatBalloon.img/pet/279/nw#";//ѡ�����
var ����3 = "#fUI/ChatBalloon.img/pet/279/ne#";//ѡ�����
var ����2 = "#fUI/ChatBalloon.img/pet/279/n#";//ѡ�����
var ����4 = "#fUI/ChatBalloon.img/pet/279/sw#";//ѡ�����
var ����5 = "#fUI/ChatBalloon.img/pet/279/se#";//ѡ�����
var ����6 = "#fUI/ChatBalloon.img/pet/279/s#";//ѡ�����
var ����7 = "#fUI/ChatBalloon.img/pet/279/head#";//ѡ�����
var ����8 = "#fUI/ChatBalloon.img/pet/279/arrow#";//ѡ�����
var ����1 = "#fEffect/CharacterEff.img/1112946/0/0#";
var ����2 = "#fEffect/CharacterEff.img/1112905/0/1#";
var ����3 = "#fEffect/CharacterEff.img/1112946/1/0#";
var ����4 = "#fEffect/CharacterEff.img/1112946/1/1#";
var ����5 = "#fEffect/CharacterEff.img/1112946/2/0#";
var ����6 = "#fEffect/CharacterEff.img/1112946/2/1#";
var ����7 = "#fEffect/CharacterEff.img/1112946/3/0#";
var ����8 = "#fEffect/CharacterEff.img/1112946/3/1#";
var ����9 = "#fEffect/CharacterEff.img/1112906/0/1#";
var ����10 = "#fEffect/CharacterEff.img/1112903/1/0#";
var ���� = "#fUI/UIWindow/Maker/BtStart/mouseOver/0#";
var Сlv����0 = "#fUI/Basic/ShowLevel/0/0#";
var Сlv����1 = "#fUI/Basic/ShowLevel/0/1#";
var Сlv����2 = "#fUI/Basic/ShowLevel/0/2#";
var Сlv����3 = "#fUI/Basic/ShowLevel/0/3#";
var Сlv����4 = "#fUI/Basic/ShowLevel/0/4#";
var Сlv����5 = "#fUI/Basic/ShowLevel/0/5#";
var Сlv����6 = "#fUI/Basic/ShowLevel/0/6#";
var Сlv����7 = "#fUI/Basic/ShowLevel/0/7#";
var Сlv����8 = "#fUI/Basic/ShowLevel/0/8#";
var Сlv����9 = "#fUI/Basic/ShowLevel/0/9#";
var Сlv = "#fUI/Basic/ShowLevel/0/left#";
var �ұ߿� = "#fUI/Basic/ShowLevel/Bracket/right#";