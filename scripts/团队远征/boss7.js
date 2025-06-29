var 奖励数据;
function init() {
    em.setProperty("state", "0");
    em.setProperty("leader", "true");
}

function setup(eim, leaderid) {
    em.setProperty("state", "1");
    em.setProperty("leader", "true");
    var eim = em.newInstance("boss7");
    var map = eim.setInstanceMap(910033304);//刷新地图
    eim.setProperty("boss7Summoned", "0");

    map.resetFully();
    var mob = em.getMonster(8920000);
    
    eim.registerMonster(mob);
    map.spawnMonsterOnGroundBelow(mob, new java.awt.Point(103, 288));

    // map.setdamagerank(true) 开启伤害统计
    map.setdamagerank(true);//开启伤害统计
    map.clearAllChrDamage();//初始化统计列表
    map.setRankName("boss7");//设置boss名称
    eim.startEventTimer(60); // 事件计时1800秒（30分钟）
    奖励数据 = JSON.parse(em.getProperty("奖励数据") || "[]");
    // mob.setOverrideStats(modified);
    // eim.registerMonster(mob);
    
    // em.startInstance(eim);
    return eim;
}

function playerEntry(eim, player) {
    var NowMapID = eim.getProperty("NowMapID");
    var toMapid = 910033304;
    if (NowMapID != null) {
        toMapid = java.lang.Integer.parseInt(NowMapID);
    }
    var map = eim.getMapFactory().getMap(toMapid);
    player.changeMap(map, map.getPortal(0));
    player.dropMessage(-11, "进入boss7战场");
    player.dropMessage(-11, 奖励数据);
    //加入远征队玩家信息
    eim.setProperty("isSquadPlayerID_" + player.getId(), "1");
    //var map = eim.getMapInstance(0);
    //player.changeMap(map, map.getPortal(0));
}

function playerRevive(eim, player) {
    return false;
}

function changedMap(eim, player, mapid) {
    switch (mapid) {
        case 910033304:
            //保存当前执行地图ID
            eim.setProperty("NowMapID", "" + mapid);
            return;
    }

    if (mapid != 910033304) {
        eim.unregisterPlayer(player);
        if (eim.disposeIfPlayerBelow(0, 0)) {
            em.setProperty("leader", "true");
            em.setProperty("state", "0");
        }
    }
}

function playerDisconnected(eim, player) {
    playerExit(eim, player);
    return 0;
    //return 0;
}
function gainchrdamage(eim, string) {
    var map = eim.getMapFactory().getMap(910033304);
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
    end(eim);
}

function monsterValue(eim, mobId) {
    if (mobId == 8910000) {  // 更新为新的BOSS ID
        eim.getMapInstance(0).spawnNpc(9310034, new java.awt.Point(-344, -422));
    }
    return 1;
}

function playerExit(eim, player) {
    eim.unregisterPlayer(player);

    if (eim.disposeIfPlayerBelow(0, 0)) {
        em.setProperty("leader", "true");
        em.setProperty("state", "0");
    }
}

function end(eim) {
    eim.disposeIfPlayerBelow(100, 910033304);//死了出去的地图
    em.setProperty("state", "0");
    em.setProperty("leader", "true");
    em.setProperty("boss7Summoned", "0");
}

function clearPQ(eim) {
    end(eim);
}

function allMonstersDead(eim) {
    if (em.getProperty("state").equals("1")) {
        em.setProperty("state", "2");
    } else if (em.getProperty("state").equals("2")) {
        em.setProperty("state", "3");
    }

    player.dropMessage(-11, "Boss已经击杀");
    // 统计伤害排名
    var map = eim.getMapFactory().getMap(910033304);
    var players = eim.getPlayers();

    // 记录伤害统计
    gainchrdamage(eim, 'boss7');

    // 获取奖励数据
    var rewardData = null;
    try {
        rewardData = JSON.parse(em.getProperty("奖励数据") || "[]");
    } catch (e) {
        eim.broadcastPlayerMsg(5, "奖励数据解析错误");
        return;
    }

    // 获取伤害排行
    var damageRanking = em.获取BOSS伤害排行("boss7");
    if (!damageRanking || damageRanking.length === 0) {
        eim.broadcastPlayerMsg(5, "获取伤害排行失败");
        return;
    }

    // 发放奖励给所有玩家
    for (var i = 0; i < players.size(); i++) {
        var player = players.get(i);
        var playerName = player.getName();
        var rank = -1;

        // 查找玩家排名
        for (var j = 0; j < damageRanking.length; j++) {
            if (damageRanking[j].getLeft() === playerName) {
                rank = j + 1;
                break;
            }
        }

        if (rank === -1) {
            player.dropMessage(5, "未找到你的伤害排名记录");
            continue;
        }

        // 查找对应排名的奖励档位
        var rewardTier = null;
        for (var j = 0; j < rewardData.length; j++) {
            if (rank <= rewardData[j][0]) { // 第一个元素是排名上限
                rewardTier = rewardData[j];
                break;
            }
        }

        // 如果找到对应档位的奖励，发放奖励
        if (rewardTier) {
            player.dropMessage(5, "你的排名是第" + rank + "名");
            // 从索引1开始遍历奖励数组（跳过排名上限）
            for (var k = 1; k < rewardTier.length; k++) {
                var itemId = rewardTier[k][0];    // 奖励物品ID
                var quantity = rewardTier[k][1];  // 奖励数量

                // 处理小数概率
                var finalQuantity = Math.floor(quantity);
                var fraction = quantity - finalQuantity;

                // 处理小数部分（随机判定是否给予额外1个）
                if (fraction > 0 && Math.random() < fraction) {
                    finalQuantity += 1;
                }

                // 如果玩家有双倍奖励状态
                if (player.getBossLog("团队BOSS奖励") == 1) {
                    finalQuantity *= 2;
                }

                // 发放奖励
                if (finalQuantity > 0) {
                    player.gainItem(itemId, finalQuantity);
                    player.dropMessage(5, "获得物品 #v" + itemId + "# x " + finalQuantity);
                }
            }
        } else {
            player.dropMessage(5, "未找到对应排名的奖励档位");
        }
    }

    eim.broadcastPlayerMsg(5, "BOSS击杀成功，奖励已发放完毕！");

    // 延迟3秒后结束副本
    eim.schedule("end", 3000);
}

function leftParty(eim, player) { }
function disbandParty(eim) { }
function playerDead(eim, player) {
    eim.setProperty("isSquadPlayerID_" + player.getId(), "0");
}
function cancelSchedule() { }