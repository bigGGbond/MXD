/*
 NPC Name: 		Mark of the Squad
 Map(s): 		Entrance to Horned Tail's Cave
 Description: 		Horntail Battle starter
 */
 
 importPackage(Packages.database);
 var 玩家ID = 0;
 var status = -1;
 var 闯关次数 = 1;
 var 物品消耗 = 4032766;
 var 混沌黑龙数量 = 50;
 var 普通黑龙数量 = 55;
 function start() {
 
	 if (cm.getPlayer().getClient().getChannel() == 1 || cm.getPlayer().getClient().getChannel() == 2 || cm.getPlayer().getClient().getChannel() == 3 || cm.getPlayer().getClient().getChannel() == 4  || cm.getPlayer().getClient().getChannel() == 5) {
		 var currentHour = new Date().getHours();
		 var currentMinute = new Date().getMinutes();
 
		 if ((currentHour === 23 && currentMinute >= 45) || (currentHour === 0 && currentMinute <= 15)) {
			 cm.sendOk("每天晚上 23:45 到 00:15 BOSS因为黑暗魔法的侵袭，无法挑战。");
			 cm.dispose();
			 return;
		 }
		 if (cm.getPlayer().getLevel() < 120) {
			 cm.sendOk("必须120级以上才可以挑战#b闇黑龍王#k");
			 cm.dispose();
			 return;
		 }
		/*  if (cm.getPlayer().getOneTimeLog("至尊会员") == 0) {
			 cm.sendOk("您还没有购买过至尊会员，请确认！");
			 cm.dispose();
			 return;
		 } */
		 var em = cm.getEventManager("HorntailBattle");
 
		 if (em == null) {
			 cm.sendOk("找不到脚本，请联系GM！");
			 cm.dispose();
			 return;
		 }
		 var prop = em.getProperty("state");
 
		 if (prop == null || prop.equals("0")) {
			 var squadAvailability = cm.getSquadAvailability("Horntail");
			 var check1 = cm.getMapFactory().getMap(240060100);
			 var check2 = cm.getMapFactory().getMap(240060200);
			 if (check1.playerCount() != 0 || check2.playerCount() != 0) {
				 cm.sendOk("其它远征队，正在对战中。");
				 cm.safeDispose();
			 }
			 if (cm.getPlayerCount(240060000) > 0 || cm.getPlayerCount(240060100) > 0 || cm.getPlayerCount(240060200) > 0) {
				 cm.sendOk("远征队与扎昆的战斗已经开始。");
				 cm.dispose();
				 return;
			 }
			 if (cm.getParty() == null) {
				 cm.sendOk("你没有队伍无法进入！");
				 cm.dispose();
				 return;
			 }
			 if (squadAvailability == -1) {
				 status = 0;
				 cm.sendYesNo("你有兴趣成为远征队队长，每天只可挑战#r1次？");
 
			 } else if (squadAvailability == 1) {
				 var type = cm.isSquadLeader("Horntail");
				 if (type == -1) {
					 cm.sendOk("由于远征队时间流逝，所以必须重新再申请一次远征队。");
					 cm.dispose();
				 } else if (type == 0) {
					 var memberType = cm.isSquadMember("Horntail");
					 if (memberType == 2) {
						 cm.sendOk("你已经被黑名单了。");
						 cm.dispose();
					 } else if (memberType == 1) {
						 status = 5;
						 cm.sendSimple("你要做什么? \r\n#b#L0#查看远征队成员#l \r\n#b#L1#加入远征队#l \r\n#b#L2#退出远征队#l");
					 } else if (memberType == -1) {
						 cm.sendOk("由于远征队时间流逝，所以必须重新再申请一次远征队。");
						 cm.dispose();
					 } else {
						 status = 5;
						 cm.sendSimple("你要做什么? \r\n#b#L0#查看远征队成员#l \r\n#b#L1#加入远征队#l \r\n#b#L2#退出远征队#l");
					 }
				 } else { 
					 status = 10;
					 cm.sendSimple("你要做什么? \r\n#b#L0#查看远征队成员#l \r\n#b#L1#移除远征队员#l \r\n#b#L2#编辑限制列表#l \r\n#r#L3#进入游戏#l");
				 }
			 } else {
				 var propssa = em.getProperty("leader");
				 if (propssa != null && propssa.equals("true")) {
					 var eim = cm.getDisconnected("HorntailBattle");
					 if (eim == null) {
						 cm.sendOk("其它远征队，正在对战中。");
						 cm.safeDispose();
					 } else {
						 cm.sendOk("其它远征队，正在对战中。");
						 cm.safeDispose();
					 }
				 } else {
					 cm.sendOk("很抱歉你的远征队队长离开了现场，所以你不能再返回战场。");
					 cm.safeDispose();
				 }
			 }
		 } else {
			 var propssb = em.getProperty("leader");
			 if (propssb != null && propssb.equals("true")) {
				 var eima = em.getInstance("HorntailBattle");
				 var propsa = eima.getProperty("isSquadPlayerID_" + cm.getPlayer().getId());
				 var saya = "\r\n" + (eima == null ? "eima is null" : propsa) + "\r\n";
				 if ((eima != null) && (propsa != null) && propsa.equals("1")) {
					 status = 13;
					 var evname = eima.getName();
					 if(cm.getPlayer().getBossLog(evname + "重返") != 0){
					 saya += "#b重返次数不足？";
					 cm.sendOk(saya);
					 cm.dispose();return;
					 }else{
					 saya += "#b现在是否要重新返回远征队所在场地？";
					 saya += "\r\n#r#L1#重新返回远征队所在场地#l";
					 cm.sendSimple(saya);
					 }
					// cm.sendSimple(saya);
				 } else {
					 eim = cm.getDisconnected("HorntailBattle");
					 if (eim == null) {
						 cm.sendOk("其它远征队，正在对战中。" + saya);
						 cm.safeDispose();
					 } else {
						 cm.sendOk("其它远征队，正在对战中。" + saya);
						 cm.safeDispose();
					 }
				 }
			 } else {
				 var eima = em.getInstance("HorntailBattle");
				 var saya = "\r\n" + (eima == null ? "eima is null" : propsb) + "\r\n";
				 var propsb = eima.getProperty("isSquadPlayerID_" + cm.getPlayer().getId());
				 if ((eima != null) && (propsb != null) && propsb.equals("1")) {
					 status = 13;
					 var evname = eima.getName();
					 if(cm.getPlayer().getBossLog(evname + "重返") != 0){
					 saya += "#b重返次数不足？";
					 cm.sendOk(saya);
					 cm.dispose();return;
					 }else{
					 saya += "#b现在是否要重新返回远征队所在场地？";
					 saya += "\r\n#r#L1#重新返回远征队所在场地#l";
					 cm.sendSimple(saya);
					 }
				 } else {
					 cm.sendOk("很抱歉你的远征队队长离开了现场，所以你不能再返回战场。");
					 cm.safeDispose();
				 }
			 }
		 }
	 } else if (cm.getPlayer().getClient().getChannel() == 6|| cm.getPlayer().getClient().getChannel() == 7 || cm.getPlayer().getClient().getChannel() == 8 || cm.getPlayer().getClient().getChannel() == 9 || cm.getPlayer().getClient().getChannel() == 10) {
		 if (cm.getPlayer().getLevel() < 149) {
			 cm.sendOk("必須149级以上才可以挑戰#b闇黑龍王#k");
			 cm.dispose();
			 return;
		 }
 
 
		 var em = cm.getEventManager("ChaosHorntail");
 
		 if (em == null) {
			 cm.sendOk("无事件");
			 cm.dispose();
			 return;
		 }
		 var prop = em.getProperty("state");
 
		 var marr = cm.getQuestRecord(160100);
		 var data = marr.getCustomData();
		 if (data == null) {
			 marr.setCustomData("0");
			 data = "0";
		 }
		 var time = parseInt(data);
		 if (prop == null || prop.equals("0")) {
			 var squadAvailability = cm.getSquadAvailability("ChaosHt");
			 var check12 = cm.getMapFactory().getMap(240060101);
			 var check22 = cm.getMapFactory().getMap(240060201);
			 if (check12.playerCount() != 0 || check22.playerCount() != 0) {
				 cm.sendOk("其它遠征隊，正在對戰中3。");
				 cm.safeDispose();
			 }
			 if (squadAvailability == -1) {
				 status = 0;
				 cm.sendYesNo("你有興趣成為混沌遠征隊隊長？ #r[6.7.8.9.10频道是进阶黑龙]#k");
 
			 } else if (squadAvailability == 1) {
				 // -1 = Cancelled, 0 = not, 1 = true
				 var type = cm.isSquadLeader("ChaosHt");
				 if (type == -1) {
					 cm.sendOk("由於遠征隊時間流逝，所以必須重新再申請一次遠征隊。");
					 cm.dispose();
				 } else if (type == 0) {
					 var memberType = cm.isSquadMember("ChaosHt");
					 if (memberType == 2) {
						 cm.sendOk("你已經被黑名單了。");
						 cm.dispose();
					 } else if (memberType == 1) {
						 status = 5;
						 cm.sendSimple("你要做什麼? \r\n#b#L0#查看遠征隊成員#l \r\n#b#L1#加入遠征隊#l \r\n#b#L2#退出遠征隊#l");
					 } else if (memberType == -1) {
						 cm.sendOk("由於遠征隊時間流逝，所以必須重新再申請一次遠征隊。");
						 cm.dispose();
					 } else {
						 status = 5;
						 cm.sendSimple("你要做什麼? \r\n#b#L0#查看遠征隊成員#l \r\n#b#L1#加入遠征隊#l \r\n#b#L2#退出遠征隊#l");
					 }
				 } else { // Is leader
					 status = 10;
					 cm.sendSimple("你要做什麼? \r\n#b#L0#查看遠征隊成員#l \r\n#b#L1#移除遠征隊員#l \r\n#b#L2#編輯限制列表#l \r\n#r#L3#進入遊戲#l");
					 // TODO viewing!
				 }
			 } else {
				 var props = em.getProperty("leader");
				 if (props != null && props.equals("true")) {
					 var eim = cm.getDisconnected("ChaosHorntail");
					 if (eim == null) {
						 cm.sendOk("其它遠征隊，正在對戰中1。");
						 cm.safeDispose();
					 } else {
						 cm.sendOk("其它遠征隊，正在對戰中2。");
						 cm.safeDispose();
					 }
				 } else {
					 cm.sendOk("很抱歉你的遠征隊隊長離開了現場，所以你不能再返回戰場。");
					 cm.safeDispose();
				 }
			 }
		 } else {
			 var props = em.getProperty("leader");
			 if (props != null && props.equals("true")) {
				 var eima = em.getInstance("ChaosHorntail");
				 var propsa = eima.getProperty("isSquadPlayerID_" + cm.getPlayer().getId());
				 var saya = "\r\n" + (eima == null ? "eima is null" : propsa) + "\r\n";
				 if ((eima != null) && (propsa != null) && propsa.equals("1")) {
					 status = 13;
					 var evname = eima.getName();
					 if (cm.getPlayer().getBossLog(evname + "重返") != 0) {
						 saya += "#b重返次数不足？";
						 cm.sendOk(saya);
						 cm.dispose();
						 return;
					 } else {
						 saya += "#b现在是否要重新返回远征队所在场地？";
						 saya += "\r\n#r#L1#重新返回远征队所在场地#l";
						 cm.sendSimple(saya);
					 }
				 } else {
					 eim = cm.getDisconnected("ChaosHorntail");
					 if (eim == null) {
						 cm.sendOk("其它遠征隊，正在對戰中1。");
						 cm.safeDispose();
					 } else {
						 cm.sendOk("其它遠征隊，正在對戰中2。");
						 cm.safeDispose();
					 }
				 }
			 } else {
				 var eima = em.getInstance("ChaosHorntail");
				 var propsa = eima.getProperty("isSquadPlayerID_" + cm.getPlayer().getId());
				 var saya = "\r\n" + (eima == null ? "eima is null" : propsa) + "\r\n";
				 if ((eima != null) && (propsa != null) && propsa.equals("1")) {
					 status = 13;
					 var evname = eima.getName();
					 if(cm.getPlayer().getBossLog(evname + "重返") != 0){
					 saya += "#b重返次数不足？";
					 cm.sendOk(saya);
					 cm.dispose();return;
					 }else{
					 saya += "#b现在是否要重新返回远征队所在场地？";
					 saya += "\r\n#r#L1#重新返回远征队所在场地#l";
					 cm.sendSimple(saya);
					 }
				 } else {
					 cm.sendOk("很抱歉你的遠征隊隊長離開了現場，所以你不能再返回戰場。");
					 cm.safeDispose();
				 }
			 }
		 }
 
	 } else {
		 cm.sendOk("闇黑龍王只有在頻道 1 、 2 、 3、 4、 5 才可以挑戰，頻道6,7,8,9,10為混沌黑龍。");
		 cm.dispose();
		 return;
	 }
 
 
 }
 
 function action(mode, type, selection) {
	 if (mode == 0) {
		 cm.dispose();
		 return;
	 }
	 if (cm.getPlayer().getClient().getChannel() == 1 || cm.getPlayer().getClient().getChannel() == 2 || cm.getPlayer().getClient().getChannel() == 3 || cm.getPlayer().getClient().getChannel() == 4 || cm.getPlayer().getClient().getChannel() == 5) {
		 switch (status) {
			 case 0:
				 if (mode == 1) {
					 if (cm.getPlayer().getBossLogD("龍王次數") >= 闯关次数 && !cm.haveItem(物品消耗,普通黑龙数量)) {
						 cm.sendNext("很抱歉每天只能打" + 闯关次数 + "次..而且没有("+普通黑龙数量+")个挑战黑币");
						 cm.dispose();
						 return;
					 }
					 if(cm.getPlayer().getBossLogD("龍王次數") >= 闯关次数 && cm.haveItem(物品消耗,普通黑龙数量)){
						 cm.gainItem(物品消耗,-普通黑龙数量);
					 }
					 if (cm.registerSquad("Horntail", 5, " 已成为闇黑龙王远征队长，想要参加远征队的玩家请开始进行申请。")) {
						 // cm.setBossLog("龍王次數");
						 cm.sendOk("你成功申请了远征队队长，你必须在接下来的五分钟召集玩家申请远征队，然后开始战斗。");
					 } else {
						 cm.sendOk("创建远征队出错。");
					 }
				 }
				 cm.dispose();
				 break;
			 case 1:
				 if (!cm.reAdd("HorntailBattle", "Horntail")) {
					 cm.sendOk("发生未知错误，请稍后再试。");
				 }
				 cm.safeDispose();
				 break;
			 case 3:
				 if (mode == 1) {
					 var squd = cm.getSquad("Horntail");
					 if (squd != null && !squd.getAllNextPlayer().contains(cm.getPlayer().getName())) {
						 if (cm.getPlayer().getBossLogD("龍王次數") >= 闯关次数) {
							 cm.sendNext("很抱歉每天只能打" + 闯关次数 + "次..");
							 cm.dispose();
							 return;
						 }
						 squd.setNextPlayer(cm.getPlayer().getName());
						 cm.setBossLog("龍王次數");
						 cm.sendOk("你已加入了远征队。");
					 }
				 }
				 cm.dispose();
				 break;
			 case 5:
				 if (selection == 0) {
					 if (!cm.getSquadList("Horntail", 0)) {
						 cm.sendOk("发生未知错误，请稍后再试。");
					 }
				 } else if (selection == 1) {
					 if (cm.getPlayer().getBossLogD("龍王次數") >= 闯关次数&& !cm.haveItem(物品消耗,普通黑龙数量)) {
						 cm.sendNext("很抱歉每天只能打" + 闯关次数 + "次且没有挑战硬币..");
						 cm.dispose();
						 return;
					 }
					 var ba = cm.addMember("Horntail", true);
					 if (ba == 2) {
						 cm.sendOk("远征队人数已满，请稍后再尝试。");
					 } else if (ba == 1) {
						 if (cm.getPlayer().getBossLogD("龍王次數") >= 闯关次数 && !cm.haveItem(物品消耗,普通黑龙数量)) {
						 cm.sendNext("很抱歉每天只能打" + 闯关次数 + "次..且没有挑战硬币");
						 cm.dispose();
						 return;
					 }
					 if(cm.getPlayer().getBossLogD("龍王次數") >= 闯关次数 && cm.haveItem(物品消耗,普通黑龙数量)){
						 cm.gainItem(物品消耗,-普通黑龙数量);
					 }
						 cm.setBossLog("龍王次數");
						 cm.sendOk("申请远征队成功。");
					 } else {
						 cm.sendOk("你已经在远征队里面了。");
					 }
				 } else {
					 var baa = cm.addMember("Horntail", false);
					 if (baa == 1) {
						 cm.sendOk("离开远征队成功。");
					 } else {
						 cm.sendOk("你不再远征队里面。");
					 }
				 }
				 cm.dispose();
				 break;
			 case 10:
				 if (mode == 1) {
					 if (selection == 0) {
						 if (!cm.getSquadList("Horntail", 0)) {
							 cm.sendOk("由于未知的错误，远征队的请求被拒绝了。");
						 }
						 cm.dispose();
					 } else if (selection == 1) {
						 status = 11;
						 if (!cm.getSquadList("Horntail", 1)) {
							 cm.sendOk("由于未知的错误，远征队的请求被拒绝了。");
							 cm.dispose();
						 }
					 } else if (selection == 2) {
						 status = 12;
						 if (!cm.getSquadList("Horntail", 2)) {
							 cm.sendOk("由于未知的错误，远征队的请求被拒绝了。");
							 cm.dispose();
						 }
					 } else if (selection == 3) {
						 if (cm.getSquad("Horntail") != null) {
							 var dd = cm.getEventManager("HorntailBattle");
							 dd.startInstance(cm.getSquad("Horntail"), cm.getMap(), 160100);
							 cm.setBossLog("龍王次數");
							 if (!cm.getPlayer().isGM()) {
								 cm.getMap().startSpeedRun();
							 }
						 } else {
							 cm.sendOk("由于未知的错误，远征队的请求被拒绝了。");
						 }
						 cm.dispose();
					 }
				 } else {
					 cm.dispose();
				 }
				 break;
			 case 11:
				 cm.banMember("Horntail", selection);
				 cm.dispose();
				 break;
			 case 12:
				 if (selection != -1) {
					 cm.acceptMember("Horntail", selection);
				 }
				 cm.dispose();
				 break;
			 case 13:
				 var em = cm.getEventManager("HorntailBattle");
				 // if (cm.getPlayer().getBossLog("龍王重返") >= 1) {
					 // cm.sendOk("抱歉,当前队伍人员有已超过每日1次黑龙次数！");
					 // cm.dispose();
					 // return;
				 // }
				 if ((selection == 1) && (em != null)) {
					 var eim = em.getInstance("HorntailBattle");
					 var evname = eim.getName();
					 if ((eim != null) && (eim.getProperty("isSquadPlayerID_" + cm.getPlayer().getId()) != null)) {
						 eim.registerPlayer(cm.getPlayer());
						 cm.getPlayer().setBossLog(evname + "重返");
						 //cm.getPlayer().setBossLog("龍王次數");
					 }
				 }
				 cm.dispose();
				 break;
			 default:
				 cm.dispose();
				 break;
		 }
	} else if (cm.getPlayer().getClient().getChannel() == 6 || cm.getPlayer().getClient().getChannel() == 7 || cm.getPlayer().getClient().getChannel() == 8 || cm.getPlayer().getClient().getChannel() == 9 || cm.getPlayer().getClient().getChannel() == 10) {
		 switch (status) {
			 case 0:
				 if (mode == 1) {
					 if (cm.getPlayer().getBossLogD("混沌龍王次數") >= 闯关次数 && !cm.haveItem(物品消耗,混沌黑龙数量)) {
						 cm.sendNext("很抱歉每天只能打"+闯关次数+"次进阶黑龙..也没有("+混沌黑龙数量+")挑战黑币");
						 cm.dispose();
						 return;
					 }
					 if(cm.getPlayer().getBossLogD("混沌龍王次數") >= 闯关次数 && cm.haveItem(物品消耗,混沌黑龙数量)){
						 cm.gainItem(物品消耗,-混沌黑龙数量);
					 }
					 if (cm.registerSquad("ChaosHt", 5, " 已成為闇黑龍王遠征隊長，想要參加遠征隊的玩家請開始進行申請。")) {
						 cm.sendOk("你成功申請了遠征隊隊長，你必須在接下來的五分鐘召集玩家申請遠征隊，然後開始戰鬥。");
						 // cm.getPlayer().setBossLog("混沌龍王次數");
					 } else {
						 cm.sendOk("創建遠征隊出錯。");
					 }
				 }
				 cm.dispose();
				 break;
			 case 1:
				 if (!cm.reAdd("ChaosHorntail", "ChaosHt")) {
					 cm.sendOk("發生未知錯誤，請稍後再試。");
				 }
				 cm.safeDispose();
				 break;
			 case 3:
				 if (mode == 1) {
					 var squd = cm.getSquad("ChaosHt");
					 if (squd != null && !squd.getAllNextPlayer().contains(cm.getPlayer().getName())) {
						 if (cm.getPlayer().getBossLogD("混沌龍王次數") >= 闯关次数) {
							 cm.sendNext("很抱歉每天只能打"+闯关次数+"次..");
							 cm.dispose();
							 return;
						 }
						 squd.setNextPlayer(cm.getPlayer().getName());
						 cm.sendOk("你已加入了遠征隊。");
						 // cm.getPlayer().setBossLog("混沌龍王次數");
					 }
				 }
				 cm.dispose();
				 break;
			 case 5:
				 if (selection == 0) {
					 if (!cm.getSquadList("ChaosHt", 0)) {
						 cm.sendOk("發生未知錯誤，請稍後再試。");
					 }
				 } else if (selection == 1) { // join
					 if (cm.getPlayer().getBossLogD("混沌龍王次數") >= 闯关次数 && !cm.haveItem(物品消耗,混沌黑龙数量)) {
							 cm.sendNext("很抱歉每天只能打"+闯关次数+"次进阶黑龙..并且没有"+混沌黑龙数量+"个挑战黑币");
							 cm.dispose();
							 return;
					 }
					 if(cm.getPlayer().getBossLogD("混沌龍王次數") >= 闯关次数 && cm.haveItem(物品消耗,混沌黑龙数量)){
						 cm.gainItem(物品消耗,-混沌黑龙数量);
					 }
					 var ba = cm.addMember("ChaosHt", true);
					 if (ba == 2) {
						 cm.sendOk("遠征隊人數已滿，請稍後再嘗試。");
					 } else if (ba == 1) { 
						 cm.sendOk("申請进阶黑龙遠征隊成功。");
						  cm.getPlayer().setBossLog("混沌龍王次數");
					 } else {
						 cm.sendOk("你已經在遠征隊裡面了。");
					 }
				 } else {// withdraw
					 var baa = cm.addMember("ChaosHt", false);
					 if (baa == 1) {
						 cm.sendOk("離開遠征隊成功。");
					 } else {
						 cm.sendOk("你不再遠征隊裡面。");
					 }
				 }
				 cm.dispose();
				 break;
			 case 10:
				 if (mode == 1) {
					 if (selection == 0) {
						 if (!cm.getSquadList("ChaosHt", 0)) {
							 cm.sendOk("由於未知的錯誤，遠征隊的請求被拒絕了。");
						 }
						 cm.dispose();
					 } else if (selection == 1) {
						 status = 11;
						 if (!cm.getSquadList("ChaosHt", 1)) {
							 cm.sendOk("由於未知的錯誤，遠征隊的請求被拒絕了。");
							 cm.dispose();
						 }
					 } else if (selection == 2) {
						 status = 12;
						 if (!cm.getSquadList("ChaosHt", 2)) {
							 cm.sendOk("由於未知的錯誤，遠征隊的請求被拒絕了。");
							 cm.dispose();
						 }
					 } else if (selection == 3) { // get insode
						 if (cm.getSquad("ChaosHt") != null) {
							 var dd = cm.getEventManager("ChaosHorntail");
							 dd.startInstance(cm.getSquad("ChaosHt"), cm.getMap(), 160100);
							 cm.给团队每日("混沌龍王次數");
							 if (!cm.getPlayer().isGM()) {
								 cm.getMap().startSpeedRun();
							 }
						 } else {
							 cm.sendOk("由於未知的錯誤，遠征隊的請求被拒絕了。");
						 }
						 cm.dispose();
					 }
				 } else {
					 cm.dispose();
				 }
				 break;
			 case 11:
				 cm.banMember("ChaosHt", selection);
				 cm.dispose();
				 break;
			 case 12:
				 if (selection != -1) {
					 cm.acceptMember("ChaosHt", selection);
				 }
				 cm.dispose();
				 break;
			 case 13:
				 var em = cm.getEventManager("ChaosHorntail");
				 if ((selection == 1) && (em != null)) {
					 var eim = em.getInstance("ChaosHorntail");
					 var evname = eim.getName();
					 if ((eim != null) && (eim.getProperty("isSquadPlayerID_" + cm.getPlayer().getId()) != null)) {
						 eim.registerPlayer(cm.getPlayer());
						 cm.getPlayer().setBossLog(evname + "重返");
						 //cm.getPlayer().setBossLog("龍王次數");
					 }
				 }
				 cm.dispose();
				 break;
			 default:
				 cm.dispose();
				 break;
		 }
	 } else {
		 cm.sendOk("闇黑龍王只有在頻道 1 、 2 、 3 、 4 、 5 才可以挑戰，頻道6,7,8,9,10為混沌黑龍。");
		 cm.dispose();
		 return;
	 }
 }
 
 function 判断团队每日(团队任务, 任务次数) {
	 var rt = true;
	 var 队伍 = cm.getParty().getMembers();
	 var it = 队伍.iterator();
	 while (it.hasNext()) {
		 var cPlayer = it.next();
		 var id = cPlayer.id;
		 if (cm.getBossLog每日(团队任务, id) >= 任务次数) {
			 rt = false;
			 玩家ID = id;
			 break;
		 }
	 }
	 return rt;
 }
 
 function 读取玩家名字(id) {
	 var 队伍 = cm.getParty().getMembers();
	 var it = 队伍.iterator();
	 var counts = "";
	 while (it.hasNext()) {
		 var cPlayer = it.next();
		 if (id == cPlayer.id) {
			 counts = cPlayer.name;
		 }
	 }
	 return counts;
 }
 