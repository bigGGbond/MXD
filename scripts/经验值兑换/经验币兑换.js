/*
 079 085脚本
QQ:870074996
 */

importPackage(Packages.server);
var status = 0;
var fee;
var 经验值 = 1000000;
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
			// 直接赠送道具并提示
			cm.gainItem(2022509, 1);
			cm.sendOk("已经将#v2022509##b经验兑换卷轴#k放入您的消耗栏中，您可以使用它进行经验币兑换。");
		} else if (status == 1) {
			// 获取玩家等级对应的兑换上限
			var levelLimit = getLevelLimit(cm.getPlayer().getLevel());
			var 次数 = cm.getBossLog("兑换经验币") >= levelLimit ? 0 : (levelLimit - cm.getBossLog("兑换经验币"));
			var 最大可兑换次数 = 	Math.floor(cm.getPlayer().getExp() / 经验值);
			if (次数 <= 0) {
				cm.sendOk("已达到等级对应的每日兑换上限");
				cm.dispose();
				return;
			}
			var text = "";
			text += "#w";
			text += "#k当前经验值:#b" + (cm.getPlayer().getExp() / 10000) + "万#k\r\n\r\n"
			text +="今日还可兑换数量：#r【" + 次数 + "#r】\r\n\r\n"
			text += "#k请输入兑换的数量：#e#r100万经验 = 1 个 #v+4310079##k#n\r\n\r\n"
			cm.sendGetNumber(text, 最大可兑换次数, 1, 最大可兑换次数);
		} else if (status == 2) {
			var s = selection;
			var levelLimit = getLevelLimit(cm.getPlayer().getLevel());
			if (cm.getBossLog("兑换经验币") >= levelLimit) {
				cm.sendOk("已达到等级对应的每日兑换上限");
				cm.dispose();
				return;
			}
			if (cm.getPlayer().getExp() < (经验值 * s)) {
				cm.playerMessage(1, "你没有这么多经验值。");
				cm.dispose();
				return;
			}
			cm.gainExp(-(经验值 * s));
			cm.gainItem(item, s);
			cm.gainBossLog("兑换经验币", s);
			cm.sendOk("兑换成功");
			cm.全服黄色喇叭("[经验兑换] " + cm.getPlayer().getName() + " : " + "兑换了" + s + "个【经验币】");
			cm.dispose();
		}
	}
}

// 添加获取等级限制的函数
function getLevelLimit(level) {
    if (level <= 70) return 42;
    if (level <= 90) return 42;
    if (level <= 110) return 42;
    if (level <= 120) return 42;
    if (level <= 130) return 53;
    if (level <= 140) return 66;
    if (level <= 150) return 82;
    if (level <= 160) return 103;
    if (level <= 170) return 128;
    if (level <= 180) return 160;
    if (level <= 190) return 201;
    if (level <= 200) return 241;
    if (level <= 210) return 301;
    if (level <= 220) return 376;
    if (level <= 230) return 470;
    if (level <= 240) return 588;
    return 588; // 超过240级的默认上限
}