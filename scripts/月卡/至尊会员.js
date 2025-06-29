var 美化1 = "#fUI/ChatBalloon.img/pet/260/nw#"; //选择道具
var 美化3 = "#fUI/ChatBalloon.img/pet/260/ne#"; //选择道具
var 美化2 = "#fUI/ChatBalloon.img/pet/260/n#"; //选择道具
var 美化4 = "#fUI/ChatBalloon.img/pet/260/sw#"; //选择道具
var 美化5 = "#fUI/ChatBalloon.img/pet/260/se#"; //选择道具
var 美化6 = "#fUI/ChatBalloon.img/pet/260/s#"; //选择道具

var 元宝价格 = 5000; // 设置价格
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
			status--;
		}
		if (status == 0) {
			var text = "#k#d" + 美化1 + "" + 美化2 + "" + 美化2 + "" + 美化2 + "" + 美化2 + "" + 美化2 + "" + 美化2 + "" + 美化2 + "" + 美化2 + "" + 美化2 + "" + 美化2 + "#r#e『至尊会员』#d#n" + 美化2 + "" + 美化2 + "" + 美化2 + "" + 美化2 + "" + 美化2 + "" + 美化2 + "" + 美化2 + "" + 美化2 + "" + 美化2 + "" + 美化2 + "" + 美化3 + "#w#k#e\r\n\r\n"
			// cm.sendOk(cm.getPlayer().getOneTimeLog("至尊会员"));
			// cm.dispose();

			// 检查是否已是会员
			if (cm.getPlayer().getOneTimeLog("至尊会员") <= 0) {
				// 显示一次性奖励
				text += "#d一次性奖励：#n\r\n";
				text += " (#r1#b)[#v1022089:# #b眼睛 #k ]\r\n";
				text += " (#r2#b)[ #v1012011:# #b 脸  ]\r\n";
				text += " (#r3#b)[ #v1032040:# #b 耳环 #k]\r\n\r\n";
				text += "#r您还不是至尊会员，是否花费" + 元宝价格 + "元宝开通？#k";
				cm.sendYesNo(text);
			}
			else {
				// 检查今日是否已领取

				// 显示每日奖励
				text += "#d每日可领取：#n\r\n";
				text += "#v4500516# 五倍经验卡 x 1\r\n";
				text += "#v4500516# 饰品材料 x 6\r\n\r\n";
				if (cm.getBossLog("至尊会员每日福利") >= 100) {
					text += "#r今日已领取每日奖励，请明天再来！#k";
					cm.sendOk(text);
					cm.dispose();
				} else {
					text += "#r是否领取今日奖励？#k";
					cm.sendYesNo(text);
				}
				cm.sendYesNo(text);
			}
		} else if (status == 1) {
				if (cm.getPlayer().getOneTimeLog("至尊会员") <= 0) {
					// 购买会员
					if (cm.getInventory(1).isFull(8)) {
						cm.sendNext("#b装备栏 空间不足 9 格");
						cm.dispose();
						return;
					}
					if (cm.getPlayer().getzb() < 元宝价格) {
						cm.sendOk("您的元宝不足，无法购买至尊会员。");
						cm.dispose();
						return;
					}

					cm.getPlayer().gainzb(-元宝价格); // 扣除元宝
					cm.setOneTimeLog("至尊会员"); // 设置为已购买
					cm.setOneTimeLog("至尊会员1"); // 设置为已购买

					cm.给属性装备(1022089, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 14, 0, 0);
					cm.给属性装备(1012011, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 14, 0, 0);
					cm.给属性装备(1032040, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 14, 0, 0);

					cm.sendOk("成功购买了至尊会员！");
					cm.全服黄色喇叭(cm.getPlayer().getName() + " [★★★至尊会员★★★]" + " : " + "成功领取了至尊会员奖励！");
					cm.dispose();
				} else {
					// 领取每日奖励
					if (cm.getSpace(2) < 2) {
						cm.sendOk("消耗栏至少需要2个空位！");
						cm.dispose();
						return;
					}

					// 发放每日奖励
					cm.gainItem(4500516, 1); // 五倍经验卡
					cm.gainItem(4500516, 6); // 饰品材料

					cm.setBossLog("至尊会员每日福利", 1, true); // 记录今日已领取
					cm.sendOk("成功领取每日福利：\r\n#v4500516# 五倍经验卡 x 1\r\n#v4500516# 饰品材料 x 6");
					cm.dispose();
				}
		}
	}
}

