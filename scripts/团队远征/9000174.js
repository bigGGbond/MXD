var status;
var fbmc = "班雷昂BOSS"; // 副本名称
var minLevel = 100; // 最低等级
var maxLevel = 200; // 最高等级
var minPartySize = 1; // 最低人数
var maxPartySize = 1; // 最高人数
var cishuxianzhi = 2; // 限制次数
var eventname = "4sha_JJLXD"; // 副本配置文件
var isold = false;
var BOSS总层数 = 9;
var BOSSID  = [8840000,7220003,8860000,8880200,2500403,8645009,8645009];//boss代码,2500403,8645009
var maxUnlockedDifficulty = 0;
var ys = 0;
var nd = 0;
var sy = 0;
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
        var text = "";
        maxUnlockedDifficulty = cm.getOneTimeLog("班雷昂通关总层数");

        // 遍历所有难度，找出玩家解锁的最高难度
		if(maxUnlockedDifficulty == 0){
        for (var i = 1; i <= 9; i++) {
            if (cm.getOneTimeLog("班雷昂通关难度" + i) > 0) {
                maxUnlockedDifficulty = i;
				isold = true;
            }
        }
		}
		ys = Math.floor(maxUnlockedDifficulty / 9) + sy;//难度阶数，每阶9个难度
		nd = maxUnlockedDifficulty % 9;
        text += "#k\t\t\t\t欢迎来到#r" + fbmc + "#k\r\n①人数限制:#r " + minPartySize + " #b- #r" + maxPartySize + "#k队员\t②等级限制：#r " + minLevel + " #b- #r" + maxLevel + "级 #k\r\n";
        text += "#k每天只能挑战:#b" + cishuxianzhi + "#k次 你今天已进入:#b" + cm.getBossLogByAcc("单人远征BOSS") + "#k次#k\r\n";
        text += "当前难度；#r" + ys + "阶#k" +"   你已通关的最高难度为: #r" + Math.floor(maxUnlockedDifficulty / 9) + "阶难度"+ nd + "\r\n#k" + "#L999998##b上一阶#k#l  #L999999##b下一阶#k#l\r\n";
        for (var i = 1; i <= 9; i++) {
            if (i <= nd + 1 || sy < 0) {
                text += "#L" + (ys * 9 + i) + "##r"  +"开始挑战["+ ys + "阶" +"难度" + i + "]#l\r\n\r\n";
            } else {
                text += "#L" + (ys * 9 + i) + "##g"+ ys + "阶" + "难度" + i + "未解锁#l\r\n\r\n";
            }
        }
        
        cm.sendSimple(text);
    } else {
		if (selection == 999998) {
			if(ys == 0){
			status = -1;
            action(1, 0, 0);
			cm.getPlayer().dropMessage(1, "已是最低难度");
			}else{
			sy--;
			status = -1;
            action(1, 0, 0);
			}
		}else if (selection == 999999) {
			if(ys == BOSS总层数){
			status = -1;
            action(1, 0, 0);
			cm.getPlayer().dropMessage(1, "已是最大难度");
			}else if(ys == Math.floor(maxUnlockedDifficulty / 9)){
			status = -1;
            action(1, 0, 0);
			cm.getPlayer().dropMessage(1, "挑战通关后开启下一阶");
			}else{
			sy++;
			status = -1;
            action(1, 0, 0);
			}
		}else if (selection <= BOSS总层数 * 9 + 9) {
        if (selection > maxUnlockedDifficulty + 1) {
            cm.sendOk("你需要先通关前一难度才能解锁这一难度！");
            cm.dispose();
            return;
        }
		if (BOSSID.length < ys + 1) {
            cm.sendOk("BOSS不存在请联系管理员添加");
            cm.dispose();
            return;
        }
        if (cm.getParty() == null) {
            cm.sendOk("你没有队伍无法进入！");
            cm.dispose();
            return;
        } else if (cm.getBossLogByAcc("单人远征BOSS") >= cishuxianzhi) {
            cm.sendOk("队伍中队友挑战次数已经用完！");
            cm.dispose();
        } else if (!cm.isLeader()) {
            cm.sendOk("请让你的队长和我说话~");
            cm.dispose();
            return;
        } else {
            var party = cm.getParty().getMembers();
            var inMap = cm.partyMembersInMap();
            var levelValid = 0;
            for (var i = 0; i < party.size(); i++) {
                if (party.get(i).getLevel() >= minLevel && party.get(i).getLevel() <= maxLevel)
                    levelValid++;
            }
            if (inMap < minPartySize || inMap > maxPartySize) {
                cm.sendOk("你的队伍人数不足" + minPartySize + "人.请把你的队伍人员召集到班雷昂BOSS门口再进入副本.");
                cm.dispose();
                return;
            } else if (levelValid != inMap) {
                cm.sendOk("请确保你的队伍里所有人员都在本地图，且最小等级在 " + minLevel + " 和 " + maxLevel + "之间.");
                cm.dispose();
                return;
            } else {
                var em = cm.getEventManager("4sha_JJLXD");
                if (em == null) {	
                    cm.sendOk("此副本当前不可用.");
                } else {
                    if (cm.getPlayerCount(211070100) <= 0) {
						if(isold){
							em.setProperty("通关层数", selection);
						}else{
							if (selection > maxUnlockedDifficulty) {
							em.setProperty("通关层数", 1);
							}else{
							em.setProperty("通关层数", 0);
							}
						}
						cm.setBossLogByAcc("单人远征BOSS");
                        em.setProperty("任务难度", selection);
						if(ys == 5){
							em.setProperty("血量", (300000000 * selection *(ys + 1.5)) + (10000000000 * (selection-(9*ys))));
						}else if(ys == 6){
							em.setProperty("血量", (300000000 * selection *(ys + 1.5)) + (20000000000 * (selection-(9*ys))) + (10000000000*9));
						}else if(ys == 7){
							em.setProperty("血量", (300000000 * selection *(ys + 1.5)) + (30000000000 * (selection-(9*ys)))  +(15000000000*9) + (20000000000*9));
						}else{
							em.setProperty("血量", 300000000 * selection *(ys + 1.5));
						}
                        em.setProperty("坐标X", -1769);
                        em.setProperty("坐标Y", -181);
						em.setProperty("代码", BOSSID[ys]);
						em.startInstance(cm.getParty(), cm.getPlayer().getMap());
                    } else {
                        cm.sendOk("请稍等...任务正在进行中.");
                    }
                }
                cm.dispose();
            }
        }
    }
	}
}
