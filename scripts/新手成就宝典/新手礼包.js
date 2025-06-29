/*
  冒险岛(079)游戏服务端
  新手礼盒枫之谷QQ：338150
 */
function action() {
	if (cm.getInventory(1).isFull(3)){
		cm.说明文字("请保证背包#b装备栏#k至少有 #r3 #k格位置");
		cm.结束对话();
		return;
	}
	if (cm.getInventory(2).isFull(3)){
		cm.说明文字("请保证背包#b消耗栏#k至少有 #r3 #k格位置");
		cm.结束对话();
		return;
	}
	if (cm.getPlayer().getLevel()<10){
		cm.sendOkS("抱歉，您的等级未达到10级，请升级到10级再打开",2);
		cm.结束对话();
		return;
	}	
	if (cm.getAcLog("新手奖励a") > 0) { 
	//(cm.getOneTimeLog("新手礼包")>1) {
        cm.sendOkS("每个账号只能领取一个新手礼盒！",2);
		cm.dispose();
	} else {
		//cm.给物品(1003439,1);
		cm.给属性装备(1002957,0,0,10,10,10,10,28,28,10,10,50,50,5,5,3,3,120);
		cm.给属性装备(1052198,0,0,10,10,10,10,28,28,10,10,50,50,5,5,3,5,120);
cm.给抵用券(12888);//抵用券
cm.gainItem(5000018,1,240);//给宠物11天.名字	
cm.gainItem(5030000,1);
//cm.gainItem(5211060,1,72);
cm.gainItem(5211047,1,72);//双倍
cm.gainItem(5360000,1,72);//双倍
cm.gainItem(5190001,1);
cm.gainItem(5190002,1);
cm.gainItem(5190003,1);
cm.gainItem(5190004,1);
cm.gainItem(5190006,1);
cm.gainItem(5220007,1);
//cm.gainItem(5040000,30);//缩地石
//cm.gainItem(5041000,5);//高级瞬移之石
cm.gainItem(5150040,3);//皇家美发卡
cm.gainItem(2370012,10);//100
cm.gainItem(2370011,10);//200
cm.gainItem(2370010,10);//300
cm.gainItem(2370008,10);//500
cm.gainItem(2370007,10);//600
cm.gainItem(2370006,10);//700
cm.gainItem(2370005,7);//800
cm.gainMeso(200000);//金币
cm.gainItem(2000018,1000);//活力
cm.gainItem(2000016,1000);
cm.gainItem(1142609,1);
		//cm.给物品(1003142,1);//GM帽子
		//cm.gainNX(+2000000);
		//cm.gainMeso(+200000000);
		//cm.给抵用券(5000);		
		//cm.setOneTimeLog ("新手礼包");
        cm.setAcLog("新手奖励a");
		cm.dispose();
	}
}