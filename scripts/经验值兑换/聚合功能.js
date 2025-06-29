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
			// text += "            #v4001126# ---- #d#e交易中心#k#n ---- #v4001126#\r\n"
			text += "                  #r#e#L6#[ 交易行 ] #l\r\n\r\n\r\n"
			// text += "      #v4001126# -------- #d#e基础功能#k#n --------- #v4001126#\r\n"
			// text += " #L25#等级奖励#l     \t#r#L10070#新版传送#l\r\n\r\n"//#L1#在线奖励#l    #L14#副本奖励#l    #L25#等级奖励
			text += "                \t#r#L4#世界传送#l   \r\n\r\n"//#L1#在线奖励#l    #L14#副本奖励#l    #L25#等级奖励  #L"+10073+"#每日跑环   #L9#师徒奖励#l #L79#称号戒指#l
			text += "      \t#r#L7#双倍购买#l     #L9#师徒奖励#l           #L8#便携商店#l\r\n\r\n"//#L5#装备制作#l  
			// text += "          #v4001126# ---- #d#e交易中心#k#n ---- #v4001126#\r\n"
			text += "       #r#e#L71#[ 元宝购买 ]#l    #r#e#L30#[ 矿石仓库 ]#l\r\n\r\n\r\n"
			// text += "      #v5600002# ---------  #d#e赞助系统#k#n --------- #v5600002#\r\n"
			text += "     \t#L15#购买会员#l   #L23#购买月卡#l  #L14#元宝抽奖#l\r\n\r\n"
			// text += "#r#L71元宝商城\r\n";
			text += "        #k#L3#元宝充值#l   #k#L24#累充奖励#l    \r\n\r\n"
			// text += "\t   \r\n\r\n"
			// text += "       #v4001126# ---------  #d#e其他功能#k#n --------- #v4001126#\r\n"
			text += "      \t#r#L20#群宠锻造#l  #L29#等级突破#l   #L" + 10086 + "#测试功能#l \r\n\r\n" //#L29#等级突破#l #L"+10086+"#更新日志#l
			text += "      \t#L28#快捷转职#l  #L" + 10072 + "#经验币兑换#l #L21#清理回收#l    \r\n\r\n"
			text += "      \t#L9999#ces #l  #L" + 10072 + "#经验币兑换#l #L21#清理回收#l    \r\n\r\n"
			text += "#L997#每日戒指#l   #L996#N和1  #L995#排行奖励#l\r\n\r\n"
			text += "\r\n\r\n"
			// text += "	#r#L28#快捷转职#l  \r\n\r\n"
			// text +="               #L786##e寻宝活动入口#n#l\r\n\r\n";
			// text +="        #L789##e跳跳活动点这个-繁花森林跳跳赛跑入口#n#l\r\n\r\n";
			// text +="            #L787##e弹簧跳跳传送入口#n#l\r\n\r\n";	
			// text +="            #L790##e开保险箱#n#l\r\n\r\n";	
			if (cm.getPlayer().isGM()) {
				// text += "\r\n#n#k------------------以下功能只有GM可见------------------\r\n"
				text += "#L999#新副本收拾#l     #L988##d活动测试（1线进入） #L998#技能突破#l\r\n\r\n"
				// text += "#L12#勋章进阶#l       #L11#装备打造#l   #L27#至尊会员每日礼包#l\r\n\r\n"
				// text += "          #v2049900# ---- #d#e装备系统#k#n ---- #v2049901#\r\n"
				// text += "#L22#等级突破#l   #L26#每日礼包#l     #L10#排行榜#l\r\n\r\n"
				// text += "#r#L16#套装制造#l    #r#L17#装备强化#l    \r\n\r\n"//#r#L17#饰品打造#l #L13#强化洗练#l
			}
			text += "#r  " + 美化4 + "" + 美化6 + "" + 美化6 + "" + 美化6 + "" + 美化6 + "" + 美化6 + "" + 美化6 + "" + 美化6 + "" + 美化6 + "" + 美化6 + "" + 美化6 + "" + 美化6 + "" + 美化6 + "" + 美化6 + "" + 美化6 + "" + 美化6 + "" + 美化6 + "" + 美化6 + "" + 美化6 + "" + 美化6 + "" + 美化6 + "" + 美化6 + "" + 美化5 + "#l#k\r\n";
			cm.sendSimpleS(text, 2);
		} else if (selection == 999) {
			cm.dispose();
			cm.openNpc(9900001, "新副本首饰");
		} else if (selection == 71) {
			cm.dispose();
			cm.openNpc(9900001, "元宝购买");
		} else if (selection == 997) {
			cm.dispose();
			cm.openNpc(9900001, "每日戒指");
		} else if (selection == 996) {
			cm.dispose();
			cm.openNpc(9900001, "N和1");
		} else if (selection == 995) {
			cm.dispose();
			cm.openNpc(9900001, "排行奖励");
		} else if (selection == 79) {
			cm.dispose();
			cm.openNpc(9900001, "称号戒指洗练");
		} else if (selection == 790) {
			cm.dispose();
			cm.openNpc(9900001, "开保险箱");
		} else if (selection == 10070) {
			cm.dispose();
			cm.openNpc(9900001, "新版传送");
		} else if (selection == 787) {
			cm.dispose();
			cm.openNpc(9270047, 6);
		} else if (selection == 10071) {
			cm.dispose();
			cm.openNpc(9900001, "经验取出");
		} else if (selection == 10072) {
			cm.dispose();
			cm.openNpc(9900001, "经验取出");
		} else if (selection == 10073) {
			cm.dispose();
			cm.openNpc(9900001, "每日跑环");	//每日跑环	
		} else if (selection == 789) {
			cm.dispose();
			cm.openNpc(9050006, "绽放森林入口");
			// cm.showmeso();
		} else if (selection == 998) {
			cm.dispose();
			cm.openNpc(9900001, "技能突破材料兑换书");
		} else if (selection == 988) {
			cm.dispose();
			cm.openNpc(9900001, 0);
		} else if (selection == 23) {
			cm.dispose();
			cm.openNpc(9900001, "月卡每日");
		} else if (selection == 1) {
			cm.dispose();
			// cm.openNpc(9310028, 2);
			cm.warp(910000000, 0);
		} else if (selection == 2) {
			cm.dispose();
			cm.openNpc(9310035, "每日跑环");
		} else if (selection == 786) {
			cm.dispose();
			cm.openNpc(9270047, 5);
		} else if (selection == 10086) {
			cm.dispose();
			cm.openNpc(9900004, 9999);
			//cm.openNpc(9310035, "更新日志");	
		} else if (selection == 3) {
			cm.dispose();
			cm.openNpc(9310035, "赞助系统");
		} else if (selection == 4) {
			cm.dispose();
			cm.openNpc(9310035, "世界传送");
		} else if (selection == 5) {
			cm.dispose();
			cm.openNpc(9062334, 0);
		} else if (selection == 6) {
			cm.dispose();
			// cm.sendOk("暂未开放1111111");
			cm.openNpc(9310035, "交易中心");
		} else if (selection == 7) {
			cm.dispose();
			cm.openNpc(9310035, "双倍卡片");
		} else if (selection == 8) {
			cm.dispose();
			cm.openShop(43);
		} else if (selection == 9) {
			cm.dispose();
			cm.openNpc(9900004, 400);
		} else if (selection == 10) {
			cm.dispose();
			// cm.openNpc(9900004, 894);
			cm.openNpc(9310035, "面板排行");
		} else if (selection == 11) {
			cm.dispose();
			cm.openNpc(9310071, 0);
		} else if (selection == 12) {
			cm.dispose();
			cm.sendOk("暂未开放");
			// cm.openNpc(9310035, "新端-勋章强化");
		} else if (selection == 13) {
			cm.dispose();
			cm.openNpc(9310035, "强化洗练");
		} else if (selection == 14) {
			cm.dispose();
			cm.openNpc(9310035, "元宝抽奖");
		} else if (selection == 15) {
			cm.dispose();
			cm.openNpc(9310035, "钻石卡领取");
		} else if (selection == 16) {
			cm.dispose();
			cm.openNpc(9310035, "新装备合成模板");
		} else if (selection == 17) {
			cm.dispose();
			cm.openNpc(9310035, "新端-装备强化");
		} else if (selection == 18) {
			cm.dispose();
			cm.openNpc(9310035, "领取自选武器");
		} else if (selection == 19) {
			cm.dispose();
			cm.openNpc(9900004, 888);
		} else if (selection == 20) {
			cm.dispose();
			cm.openNpc(9900004, "群宠锻造");
		} else if (selection == 21) {
			cm.dispose();
			cm.openNpc(9900004, "清理回收");
		} else if (selection == 22) {
			cm.dispose();
			cm.sendOk("暂未开放");
			// cm.openNpc(9310070, 1);
		} else if (selection == 23) {
			cm.dispose();
			cm.openNpc(2040024, 0);
		} else if (selection == 24) {
			cm.dispose();
			cm.openNpc(9900005, "累充奖励");
		} else if (selection == 25) {
			cm.dispose();
			cm.openNpc(2040024, "金币兑换");
		} else if (selection == 26) {
			cm.dispose();
			cm.openNpc(9900004, "每日礼包");
		} else if (selection == 27) {
			cm.dispose();
			cm.openNpc(9900004, "至尊会员每日礼包");// 
		} else if (selection == 28) {
			cm.dispose();
			cm.openNpc(9900004, "快捷转职");//一键转职
		} else if (selection == 9999) {
			cm.dispose();
			cm.openNpc(9310070, "称号戒指1");//一键转职
		} else if (selection == 30) {
			cm.dispose();
			cm.openNpc(9900001, "矿石仓库");
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