var 任务难度,代码,血量,坐标X,坐标Y,通关层数;  
function init() {
    em.setProperty("state", "0");
	em.setProperty("leader", "true");
}

function setup() {
    em.setProperty("state", "1");
	em.setProperty("leader", "true");
    var eim = em.newInstance("4sha_JJLXD");
    var map = eim.setInstanceMap(211070100); // 进去的地图
    map.resetFully();
	
	beginQuest(eim);
    return eim;
}

function beginQuest(eim) {
    if (eim != null) {
        eim.startEventTimer(1000*60*10); // 10分钟计时器
    }
}

function playerEntry(eim, player) {
    var map = eim.getMapInstance(0); // 进入地图
    player.changeMap(map, map.getPortal(0));
	if(player.isGM()){
	eim.broadcastPlayerMsg(5, "血量 " + em.getProperty("血量"));
	}
	monsterSpawn(eim);
}

function monsterSpawn(eim) {
	代码 = em.getProperty("代码");
	血量 = em.getProperty("血量");
	坐标X = em.getProperty("坐标X");
	坐标Y = em.getProperty("坐标Y");
	通关层数 = em.getProperty("通关层数");
	var map = eim.setInstanceMap(211070100);
	var mob = em.getMonster(代码);
	var modified = em.newMonsterStats();
	modified.setOHp(血量);
	modified.setOMp(9999999);
	modified.setOExp(0);
	mob.setOverrideStats(modified);
	eim.registerMonster(mob);
	map.spawnMonsterOnGroundBelow(mob, new java.awt.Point(坐标X, 坐标Y));
}

function allMonstersDead(eim) {
    var players = eim.getPlayers();
    var difficulty = parseInt(em.getProperty("任务难度"));  // 当前难度
	var ys = Math.floor(difficulty / 9);//难度阶数，每阶9个难度
	var nd = difficulty % 9;
    for (var i = 0; i < players.size(); i++) {
        var player = players.get(i);

        // 根据当前难度设置不同的记录值
        var logName = "班雷昂通关难度" + difficulty;
		if(通关层数 > 0){
		player.gainOneTimeLog(logName, 1);  // 设置通关记录为1，表示已通关
		player.gainOneTimeLog("班雷昂通关总层数", 通关层数);
		}
        // 发放积分，假设每个难度的积分为难度的数值
        player.gainOneTimeLog("狮子王积分", difficulty);  // 每个难度发放相应数量的积分
        player.dropMessage(5, "你通过了班雷昂" + ys + "阶难度" + nd + ",获得了 " + difficulty + " 个狮子王积分。");
    }
    eim.restartEventTimer(60 * 1000);
}








function monsterValue(eim, mobId) {
    // 你可以根据mobId进行一些处理，比如给予特殊奖励
    if (mobId == 8840000) { // 例如：Boss的ID
        eim.broadcastPlayerMsg(5, "你击败了Boss!");
    }
    return 1; // 返回一个默认值，表示击败怪物后的得分或其他处理
}

function scheduledTimeout(eim) {
    eim.disposeIfPlayerBelow(100, 211070000);
    em.setProperty("state", "0");
}

function changedMap(eim, player, mapid) {
    switch (mapid) {
        case 211070100:
            return;
    }
    eim.unregisterPlayer(player);
	eim.disposeIfPlayerBelow(0, 0);
	em.setProperty("state", "0");
	eim.dispose();
}

function playerRevive(eim, player) {}

function playerDisconnected(eim, player) {
    playerExit(eim, player);
}

function leftParty(eim, player) {
	eim.unregisterPlayer(player);
	var map = em.getMapFactory().getMap(211070000);
	player.changeMap(map, map.getPortal(0));
	eim.disposeIfPlayerBelow(0, 0);
}

function disbandParty(eim) {
    eim.disposeIfPlayerBelow(100, 211070000);
    em.setProperty("state", "0");
}

function playerExit(eim, player) {
    var map = em.getMapFactory().getMap(eim.getProperty("cleared") == null ? 211070000 : 211070000);
    eim.unregisterPlayer(player);
    player.changeMap(map, map.getPortal(0));
}

function removePlayer(eim, player) {
    eim.unregisterPlayer(player);
}

function clearPQ(eim) {
    eim.disposeIfPlayerBelow(100, 211070000);
    em.setProperty("state", "0");
}

function finish(eim) {
    eim.disposeIfPlayerBelow(100, 211070000);
    em.setProperty("state", "0");
}

function timeOut(eim) {
    eim.disposeIfPlayerBelow(100, 211070000);
    em.setProperty("state", "0");
}

function cancelSchedule() {}

function playerDead(eim, player) {
	eim.disposeIfPlayerBelow(100, 211070000);
    em.setProperty("state", "0");
}

function end(eim) {
    eim.disposeIfPlayerBelow(100, 211070000);
    em.setProperty("state", "0");
    em.setProperty("leader", "true");
	var map = eim.getMapInstance(0);
    map.resetFully();
}

function gainBossRank1(eim, string) {
	var players = eim.getPlayers();
    for (var i = 0; i < players.size(); i++) {
        var player = players.get(i);
        player.setBossRankCount1(string, 1);
	}
}

function piaofu(eim, msg) {
    var players = eim.getPlayers();
    for (var i = 0; i < players.size(); i++) {
        var mch = players.get(i);
        mch.startMapEffect(msg, 5120026);
    }
}
