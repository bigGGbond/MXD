// 扎昆远征事件脚本
// 主要控制扎昆BOSS战的流程，包括初始化、玩家进入、复活、地图切换、掉线、伤害统计等

function init() {
    // 初始化事件状态和队长属性
    em.setProperty("state", "0");
    em.setProperty("leader", "true");
}

function setup(eim, leaderid) {
    // 设置事件为进行中，队长属性为true
    em.setProperty("state", "1");
    em.setProperty("leader", "true");
    // 创建新的事件实例
    var eim = em.newInstance("ZakumBattle");
    // 设置扎昆战斗地图
    var map = eim.setInstanceMap(280030000);//刷新地图
    eim.setProperty("zakSummoned", "0");

    var mob = em.getMonster(8880832);
    map.spawnMonsterOnGroundBelow(mob, new java.awt.Point(759, 17));
    map.resetFully();
    // map.setdamagerank(true) 开启伤害统计
    map.setdamagerank(true);//开启伤害统计
    map.clearAllChrDamage();//初始化统计列表
    map.setRankName("普通扎昆");//设置boss名称
    eim.startEventTimer(1800); // 事件计时1800秒（30分钟）
    return eim;
}

function playerEntry(eim, player) {
    // 玩家进入事件地图
    var NowMapID = eim.getProperty("NowMapID");
    var toMapid = 280030000;
    if (NowMapID != null) {
        toMapid = java.lang.Integer.parseInt(NowMapID);
    }
    var map = eim.getMapFactory().getMap(toMapid);
    player.changeMap(map, map.getPortal(0));
    player.dropMessage(-11, "进入扎克?-?1");
    // 标记玩家已加入远征队
    eim.setProperty("isSquadPlayerID_" + player.getId(), "1");
}

function playerRevive(eim, player) {
    // 玩家死亡不允许复活
    return false;
}

function changedMap(eim, player, mapid) {
    // 处理玩家切换地图
    switch (mapid) {
        case 280030000:
            // 保存当前执行地图ID
            eim.setProperty("NowMapID", "" + mapid);
            return;
    }
    // 离开主战场则移除玩家
    if (mapid != 280030000) {
        eim.unregisterPlayer(player);
        // 如果场上没有玩家则重置事件
        if (eim.disposeIfPlayerBelow(0, 0)) {
            em.setProperty("leader", "true");
            em.setProperty("state", "0");
        }
    }
}

function playerDisconnected(eim, player) {
    // 玩家掉线处理，直接移除
    playerExit(eim, player);
    return 0;
}

function gainchrdamage(eim, string) {
    // 统计所有玩家的伤害并记录
    var map = eim.getMapFactory().getMap(280030000);
    var players = eim.getPlayers();
    eim.broadcastPlayerMsg(5, "22222");
    for (var i = 0; i < players.size(); i++) {
        var player = players.get(i);
        if (map.getChrDamage(player.getId())) {
            player.setBossRankCount1(string, map.getChrDamage(player.getId()));
            eim.broadcastPlayerMsg(5, "3333");
        }
    }
    map.setdamagerank(false);//关闭伤害统计
}

function scheduledTimeout(eim) {
    // 事件超时，结束事件
    end(eim);
}

function monsterValue(eim, mobId) {
    // 怪物死亡事件，扎昆本体死亡时在地图上生成NPC
    if (mobId == 8800002) {
        eim.getMapInstance(0).spawnNpc(9310034, new java.awt.Point(-344, -422));
    }
    return 1;
}

function playerExit(eim, player) {
    // 玩家主动退出事件
    eim.unregisterPlayer(player);
    // 如果场上没有玩家则重置事件
    if (eim.disposeIfPlayerBelow(0, 0)) {
        em.setProperty("leader", "true");
        em.setProperty("state", "0");
    }
}

function end(eim) {
    // 事件结束，所有玩家传送出副本，重置事件属性
    eim.disposeIfPlayerBelow(100, 211042300);//死了出去的地图
    em.setProperty("state", "0");
    em.setProperty("leader", "true");
    em.setProperty("zakSummoned", "0");
}

function clearPQ(eim) {
    // 清理副本，调用end
    end(eim);
}

function allMonstersDead(eim) {
    // 所有怪物死亡时，推进事件状态并统计伤害
    if (em.getProperty("state").equals("1")) {
        em.setProperty("state", "2");
    } else if (em.getProperty("state").equals("2")) {
        em.setProperty("state", "3");
    }
    gainchrdamage(eim, '普通扎昆');
}

//BOSS死后统计所有玩家伤害：
function gainchrdamage(eim, string) {
    var map = eim.getMapFactory().getMap(280030000);
    var players = eim.getPlayers();
    eim.broadcastPlayerMsg(5, "22222");
    for (var i = 0; i < players.size(); i++) {
        var player = players.get(i);
        if (map.getChrDamage(player.getId())) {
            player.setBossRankCount1(string, map.getChrDamage(player.getId()));
            eim.broadcastPlayerMsg(5, "3333");
        }
    }
    map.setdamagerank(false);//关闭伤害统计
}

function leftParty(eim, player) { }
function disbandParty(eim) { }
function playerDead(eim, player) {
    // 玩家死亡时，标记其为未在远征队
    eim.setProperty("isSquadPlayerID_" + player.getId(), "0");
}
function cancelSchedule() { }