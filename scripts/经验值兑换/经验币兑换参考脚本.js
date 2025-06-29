/*
 079 085脚本
QQ:870074996
 */

importPackage(Packages.server);
var status = 0;
var fee;
var 经验值 = 10000000;
var 数量 = 1;
var item = 4310079;

var chance = Math.floor(Math.random() * 1);
function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (mode == 0) {
            cm.sendOk("欢迎下次光临");
            cm.dispose();
            return;
        }
        if (mode == 1)
            status++;
        else
            status--;
        if (status == 0) {
			
			var 次数 = cm.getBossLog("兑换经验币")>=100 ? 0 : (100-cm.getBossLog("兑换经验币"));
			if(次数 <= 0){
			cm.sendOk("每日只能兑换100次经验币");
			cm.dispose();
			return;	
			}
			var text = "";
			text += "#w";
			text += "#k当前经验值:#b"+(cm.getPlayer().getExp()/10000)+"万#k\r\n\r\n"
			text += "#k每日限制兑换:#b100#k个#r(#b"+cm.getBossLog("兑换经验币")+"#k/100#r)  今日还可兑换次数：【#b"+次数+"#r】\r\n\r\n"
			text += "#k请输入兑换的数量：#e#r1000万经验 = 1 个 #v+4310079##k#n\r\n\r\n"
			cm.sendGetNumber(text, 1, 1, 次数);
        } else if (status == 1) {
			var s = selection;
			if(cm.getBossLog("兑换经验币")>=100){
				cm.sendOk("每日只能兑换100次经验币");
				cm.dispose();
				return;
			}
            if (cm.getPlayer().getExp() < (经验值*s)) {
                cm.playerMessage(1, "你没有这么多经验值。");
                cm.dispose();
                return;
            }
			cm.gainExp(-(经验值 * s));
			cm.gainItem(item, s);
			cm.gainBossLog("兑换经验币",s);
			cm.sendOk("兑换成功"); 
			cm.全服黄色喇叭("[经验兑换] "+cm.getPlayer().getName()  + " : " + "兑换了"+s+"个【经验币】");
			cm.dispose();
        }
    }
}