var status;
var fbmc = "扎昆BOSS"; // 副本名称
var minLevel = 100; // 最低等级
var maxLevel = 200; // 最高等级
var minPartySize = 1; // 最低人数
var maxPartySize = 6; // 最高人数
var normalChallengeLimit = 3; // 普通扎昆每日限制次数
var advancedChallengeLimit = 2; // 进阶扎昆每日限制次数
var maxjinbi = 50000; // 判断征集令金币
var 消耗物品 = 4032766;
function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        cm.dispose();
        return;
    }

    if (status == 0) {
        showMainMenu();
    } else if (status == 1) {
        handleSelection(selection);
    } else if (status == 2) {
		// cm.playerMessage("123");//886
		if (selection == 5) {
			var em = cm.getEventManager("ZakumBattle");
			// if (cm.getPlayer().getBossLog("龍王重返") >= 1) {
				// cm.sendOk("抱歉,当前队伍人员有已超过每日1次黑龙次数！");
				// cm.dispose();
				// return;
			// }
			// if ((selection == 1) && (em != null)) {
				var eim = em.getInstance("ZakumBattle");
				if (eim == null) {
            cm.sendOk("无事件");
            cm.dispose();
            return;
			}
				var evname = eim.getName();
				if ((eim != null) && (eim.getProperty("isSquadPlayerID_" + cm.getPlayer().getId()) != null)) {
					eim.registerPlayer(cm.getPlayer());
					cm.getPlayer().setBossLog(evname + "重返");
					//cm.getPlayer().setBossLog("龍王次數");
				}
			// }
			cm.dispose();
			// break;
		} else if (selection == 6) {
			var em = cm.getEventManager("ChaosZakum");
			// if (cm.getPlayer().getBossLog("龍王重返") >= 1) {
				// cm.sendOk("抱歉,当前队伍人员有已超过每日1次黑龙次数！");
				// cm.dispose();
				// return;
			// }
			// if ((selection == 1) && (em != null)) {
				var eim = em.getInstance("ChaosZakum");
				if (eim == null) {
            cm.sendOk("无事件");
            cm.dispose();
            return;
			}
				var evname = eim.getName();
				if ((eim != null) && (eim.getProperty("isSquadPlayerID_" + cm.getPlayer().getId()) != null)) {
					eim.registerPlayer(cm.getPlayer());
					cm.getPlayer().setBossLog(evname + "重返");
					//cm.getPlayer().setBossLog("龍王次數");
				}
			// }
			cm.dispose();
			// break;
		}
	}
}

function showMainMenu() {
    var text = "#w#k\t\t\t\t欢迎来到#r" + fbmc + "#k\r\n";
    text += "进入要求如下：\r\n";
    text += "扎昆消耗5个币，进阶扎昆15个：\r\n";
    text += "①人数限制: #r" + minPartySize + " #b- #r" + maxPartySize + "#k 队员\t②等级限制：#r" + minLevel + " #b- #r" + maxLevel + " 级 #k\r\n";

    text += "#L1# #v2388023# #r开始挑战 [#b#e普通扎昆#n#r]   你今天已进入: #b" + cm.getBossLogByAcc("普通扎昆") + "#k 次\r\n";
    text += "#L1##r进门就扣次数（普通扎昆每个账号一天3次）\r\n";
    text += "#L1##r超过次数消耗#v"+消耗物品+"#*16 可无视次数进入#l#k #L3#重返#l\r\n\r\n";
	
    text += "#L2# #v2388023# #b#n开始挑战 [#r#e进阶扎昆#b#n]   你今天已进入: #b" + cm.getBossLogByAcc("进阶扎昆") + "#k 次\r\n";
	text += "#L2# #r进门就扣次数（进阶扎昆每个账号一天2次）#k\r\n";
	text += "#L2# #r超过次数消耗#v"+消耗物品+"#*36 可无视次数进入#l#k #L4#重返#l\r\n\r\n";
	
    cm.sendSimple(text);
}

function handleSelection(selection) {
	var currentHour = new Date().getHours();
    var currentMinute = new Date().getMinutes();

    if ((currentHour === 23 && currentMinute >= 45) || (currentHour === 0 && currentMinute <= 15)) {
        cm.sendOk("每天晚上 23:45 到 00:15 BOSS因为黑暗魔法的侵袭，无法挑战。");
        cm.dispose();
        return;
    }
    if (selection == 1) {
        // 普通扎昆
            if (cm.getPlayerCount(280030000) <= 0) {
                if(cm.getBossLogByAcc("普通扎昆")>=normalChallengeLimit && cm.haveItem(消耗物品,16)){
					cm.warp(211042400);
					cm.gainItem(消耗物品,-16);
				}else{
					if(cm.getBossLogByAcc("普通扎昆")>=normalChallengeLimit){
						 cm.sendOk("没次数没挑战币");
						 cm.dispose();
						 return;
					}
               cm.gainBossLogByAcc("普通扎昆",1);
                cm.warp(211042400);
				}
            } else {
                cm.sendOk("当前地图中已有其他玩家挑战，请稍后再试。");
            }
            cm.dispose();
        
    } else if (selection == 2) {
        // 进阶扎昆
            if (cm.getPlayerCount(280030001) <= 0) {
				if(cm.getBossLogByAcc("进阶扎昆")>=advancedChallengeLimit && cm.haveItem(消耗物品,36)){
					cm.warp(211042401);
					cm.gainItem(消耗物品,-36);
				}else{
					if(cm.getBossLogByAcc("进阶扎昆")>=advancedChallengeLimit){
						 cm.sendOk("没次数没挑战币");
						 cm.dispose();
						 return;
					}
                cm.gainBossLogByAcc("进阶扎昆",1);
                cm.warp(211042401);
				}
            } else {
                cm.sendOk("当前地图中已有其他玩家挑战，请稍后再试。");
            }
            cm.dispose();
    } else if (selection == 3) {
		var em = cm.getEventManager("ZakumBattle"); 
        if (em == null) {
            cm.sendOk("无事件");
            cm.dispose();
            return;
        }
        var prop = em.getProperty("state");
		var props = em.getProperty("leader");
		if (props != null && props.equals("true")) {
			var eima = em.getInstance("ZakumBattle");
			if (eima == null) {
            cm.sendOk("无事件");
            cm.dispose();
            return;
			}
			var propsa = eima.getProperty("isSquadPlayerID_" + cm.getPlayer().getId());
			var saya = "\r\n" + (eima == null ? "eima is null" : propsa) + "\r\n";
			if ((eima != null) && (propsa != null) && propsa.equals("1")) {
				// status = 13;
				var evname = eima.getName();
				if (cm.getPlayer().getBossLog(evname + "重返") != 0) {//重返次数
					saya += "#b重返次数不足？";
					cm.sendOk(saya);
					cm.dispose();
					return;
				} else {
					saya += "#b现在是否要重新返回远征队所在场地？";
					saya += "\r\n#r#L5#重新返回远征队所在场地#l";
					cm.sendSimple(saya);
				}
			} else {
				eim = cm.getDisconnected("ZakumBattle");
				if (eim == null) {
					cm.sendOk("其它遠征隊，正在對戰中1。");
					cm.safeDispose();
				} else {
					cm.sendOk("其它遠征隊，正在對戰中2。");
					cm.safeDispose();
				}
			}
		} else {
                var eima = em.getInstance("ZakumBattle");
				if (eima == null) {
            cm.sendOk("无事件");
            cm.dispose();
            return;
			}
                var propsa = eima.getProperty("isSquadPlayerID_" + cm.getPlayer().getId());
                var saya = "\r\n" + (eima == null ? "eima is null" : propsa) + "\r\n";
                if ((eima != null) && (propsa != null) && propsa.equals("1")) {
                    // status = 13;
					var evname = eima.getName();
					if(cm.getPlayer().getBossLog(evname + "重返")!= 0){//重返次数
					saya += "#b重返次数不足？";
					cm.sendOk(saya);
					cm.dispose();return;
					}else{
					saya += "#b现在是否要重新返回远征队所在场地？";
					saya += "\r\n#r#L5#重新返回远征队所在场地#l";
					cm.sendSimple(saya);
					}
                } else {
                    cm.sendOk("很抱歉你的遠征隊隊長離開了現場，所以你不能再返回戰場。");
                    cm.safeDispose();
                }
            }
	} else if (selection == 4) {
		var em = cm.getEventManager("ChaosZakum"); 
        if (em == null) {
            cm.sendOk("无事件");
            cm.dispose();
            return;
        }
        var prop = em.getProperty("state");
		var props = em.getProperty("leader");
		if (props != null && props.equals("true")) {
			var eima = em.getInstance("ChaosZakum");
			if (eima == null) {
				cm.sendOk("你无法重返");
				cm.dispose();
				return;
			}
			var propsa = eima.getProperty("isSquadPlayerID_" + cm.getPlayer().getId());
			var saya = "\r\n" + (eima == null ? "eima is null" : propsa) + "\r\n";
			if ((eima != null) && (propsa != null) && propsa.equals("1")) {
				// status = 13;
				var evname = eima.getName();
				if (cm.getPlayer().getBossLog(evname + "重返")!= 0) {//重返次数
					saya += "#b重返次数不足？";
					cm.sendOk(saya);
					cm.dispose();
					return;
				} else {
					saya += "#b现在是否要重新返回远征队所在场地？";
					saya += "\r\n#r#L6#重新返回远征队所在场地#l";
					cm.sendSimple(saya);
				}
			} else {
				eim = cm.getDisconnected("ChaosZakum");
				if (eim == null) {
					cm.sendOk("其它遠征隊，正在對戰中1。");
					cm.safeDispose();
				} else {
					cm.sendOk("其它遠征隊，正在對戰中2。");
					cm.safeDispose();
				}
			}
		} else {
                var eima = em.getInstance("ChaosZakum");
				if (eima == null) {
					cm.sendOk("你无法重返");
					cm.dispose();
					return;
				}
                var propsa = eima.getProperty("isSquadPlayerID_" + cm.getPlayer().getId());
                var saya = "\r\n" + (eima == null ? "eima is null" : propsa) + "\r\n";
                if ((eima != null) && (propsa != null) && propsa.equals("1")) {
                    // status = 13;
					var evname = eima.getName();
					if(cm.getPlayer().getBossLog(evname + "重返") != 0){//重返次数 886
					saya += "#b重返次数不足？";
					cm.sendOk(saya);
					cm.dispose();return;
					}else{
					saya += "#b现在是否要重新返回远征队所在场地？";
					saya += "\r\n#r#L6#重新返回远征队所在场地#l";
					cm.sendSimple(saya);
					}
                } else {
                    cm.sendOk("很抱歉你的遠征隊隊長離開了現場，所以你不能再返回戰場。");
                    cm.safeDispose();
                }
            }
	}
}

function checkPartyConditions(challengeLimit, bossLogName) {
    if (cm.getParty() == null) {
        cm.sendOk("请先组成一个队伍再来尝试进入。");
        cm.dispose();
        return false;
    }
    
    if (!cm.isLeader()) {
        cm.sendOk("请让你的队长和我对话。");
        cm.dispose();
        return false;
    }

    if (cm.getBossLog(bossLogName) >= challengeLimit && !cm.haveItem(消耗物品,1)) {
        cm.sendOk("你或队伍中的其他成员今日的" + bossLogName + "挑战次数已用完。");
        cm.dispose();
        return false;
    }

    var inMap = cm.partyMembersInMap();
    var levelValid = 0;
    var party = cm.getParty().getMembers();
    var it = party.iterator();

    while (it.hasNext()) {
        var cPlayer = it.next();
        if (cPlayer.getLevel() >= minLevel && cPlayer.getLevel() <= maxLevel) {
            levelValid++;
        }
    }

    if (inMap < minPartySize || inMap > maxPartySize) {
        cm.sendOk("你的队伍人数不足或超过要求。");
        cm.dispose();
        return false;
    } else if (levelValid != inMap) {
        cm.sendOk("请确保所有队员的等级符合要求。");
        cm.dispose();
        return false;
    }

    return true;
}
