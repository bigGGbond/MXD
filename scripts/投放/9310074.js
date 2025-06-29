function start() {
    status = -1;
    // cm.sendOk(cm.getOneTimeLog("制作"+"1121008") > 0 ? cm.getOneTimeLog("制作"+"1121008") : 0);
    action(1, 0, 0);
}
function action(mode, type, selection) {

    if (mode == -1) {
        cm.dispose();
    } else {
        if (status >= 0 && mode == 0) {

            cm.sendOk("感谢你的光临！");
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
            //cm.全服公告("领取奖励");
            //cm.forceCompleteQuest(60850)
            var text = "";
            text += "" + 美化1 + "" + 美化2 + "" + 美化2 + "" + 美化2 + "" + 美化2 + "" + 美化2 + "" + 美化2 + "" + 美化2 + "" + 美化2 + "" + 美化2 + "" + 美化2 + "" + 美化2 + "" + 美化7 + "" + 美化2 + "" + 美化2 + "" + 美化2 + "" + 美化2 + "" + 美化2 + "" + 美化2 + "" + 美化2 + "" + 美化2 + "" + 美化2 + "" + 美化2 + "" + 美化3 + "#k#w\r\n";
            text += "                  #r#e#L6#[ 副本 ] #l\r\n\r\n\r\n";
            text += "                \t#r#L1#嘉年华积分兑换#l   \r\n\r\n";
            text += "                \t#r#L2#经验币兑换#l   \r\n\r\n";
            text += "                \t#r#L3#武陵积分兑换#l   \r\n\r\n";
            text += "\r\n\r\n"
            text += "#r  " + 美化4 + "" + 美化6 + "" + 美化6 + "" + 美化6 + "" + 美化6 + "" + 美化6 + "" + 美化6 + "" + 美化6 + "" + 美化6 + "" + 美化6 + "" + 美化6 + "" + 美化6 + "" + 美化6 + "" + 美化6 + "" + 美化6 + "" + 美化6 + "" + 美化6 + "" + 美化6 + "" + 美化6 + "" + 美化6 + "" + 美化6 + "" + 美化6 + "" + 美化5 + "#l#k\r\n";
            cm.sendSimpleS(text, 2);
        } else if (selection == 1) {
            cm.dispose();
            cm.openNpc(9900001, "嘉年华积分兑换");
        } else if (selection == 2) {
            cm.dispose();
            cm.openNpc(9900001, "经验币兑换");
        } else if (selection == 3) {
            cm.dispose();
            cm.openNpc(9900001, "武陵积分兑换");
        }
    }
}
var 美化1 = "#fUI/ChatBalloon.img/pet/279/nw#";//选择道具
var 美化3 = "#fUI/ChatBalloon.img/pet/279/ne#";//选择道具
var 美化2 = "#fUI/ChatBalloon.img/pet/279/n#";//选择道具
var 美化4 = "#fUI/ChatBalloon.img/pet/279/sw#";//选择道具
var 美化5 = "#fUI/ChatBalloon.img/pet/279/se#";//选择道具
var 美化6 = "#fUI/ChatBalloon.img/pet/279/s#";//选择道具
var 美化7 = "#fUI/ChatBalloon.img/pet/279/head#";//选择道具
var 美化8 = "#fUI/ChatBalloon.img/pet/279/arrow#";//选择道具
var 爱心1 = "#fEffect/CharacterEff.img/1112946/0/0#";
var 爱心2 = "#fEffect/CharacterEff.img/1112905/0/1#";
var 爱心3 = "#fEffect/CharacterEff.img/1112946/1/0#";
var 爱心4 = "#fEffect/CharacterEff.img/1112946/1/1#";
var 爱心5 = "#fEffect/CharacterEff.img/1112946/2/0#";
var 爱心6 = "#fEffect/CharacterEff.img/1112946/2/1#";
var 爱心7 = "#fEffect/CharacterEff.img/1112946/3/0#";
var 爱心8 = "#fEffect/CharacterEff.img/1112946/3/1#";
var 爱心9 = "#fEffect/CharacterEff.img/1112906/0/1#";
var 爱心10 = "#fEffect/CharacterEff.img/1112903/1/0#";
var 制作 = "#fUI/UIWindow/Maker/BtStart/mouseOver/0#";
var 小lv数字0 = "#fUI/Basic/ShowLevel/0/0#";
var 小lv数字1 = "#fUI/Basic/ShowLevel/0/1#";
var 小lv数字2 = "#fUI/Basic/ShowLevel/0/2#";
var 小lv数字3 = "#fUI/Basic/ShowLevel/0/3#";
var 小lv数字4 = "#fUI/Basic/ShowLevel/0/4#";
var 小lv数字5 = "#fUI/Basic/ShowLevel/0/5#";
var 小lv数字6 = "#fUI/Basic/ShowLevel/0/6#";
var 小lv数字7 = "#fUI/Basic/ShowLevel/0/7#";
var 小lv数字8 = "#fUI/Basic/ShowLevel/0/8#";
var 小lv数字9 = "#fUI/Basic/ShowLevel/0/9#";
var 小lv = "#fUI/Basic/ShowLevel/0/left#";
var 右边框 = "#fUI/Basic/ShowLevel/Bracket/right#";