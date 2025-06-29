var status = -1;
var 难度; // 

var boss_CONFIG = {
    "闹钟": {
        bossId: 8920000,
        最低等级: 100,
        限制次数: 4,
        事件名称: "Clockboss",
        远征队名称: "ClockSquad",
        挑战地图: 220080001,
        难度要求: 1  // 需要的团队boss难度值
    },
    "扎昆": {
        bossId: 8920000,
        最低等级: 100,
        限制次数: 100,
        事件名称: "ChaosZakum",
        远征队名称: "ChaosZak",
        挑战地图: 280030001,
        难度要求: 2
    },
    "黑龙": {
        bossId: 8920000,
        最低等级: 120,
        限制次数: 3,
        事件名称: "HorntailBattle",
        远征队名称: "Horntail",
        挑战地图: 240060200,
        难度要求: 3
    },
    "boss-4": {
        bossId: 8920000,
        最低等级: 100,
        限制次数: 4,
        事件名称: "boss4",
        远征队名称: "boss4Squad",
        挑战地图: 100000000,
        难度要求: 4
    },
    "boss-5": {
        bossId: 8920000,
        最低等级: 100,
        限制次数: 4,
        事件名称: "boss5",
        远征队名称: "boss5Squad",
        挑战地图: 100000000,
        难度要求: 5
    },
    "boss-6": {
        bossId: 8920000,
        最低等级: 100,
        限制次数: 4,
        事件名称: "boss6",
        远征队名称: "boss6Squad",
        挑战地图: 100000000,
        难度要求: 6
    },
    "boss-7": {
        bossId: 8920000,
        最低等级: 100,
        限制次数: 4,
        事件名称: "boss7",
        远征队名称: "boss7Squad",
        挑战地图: 910000001,
        难度要求: 7
    },
    "boss-8": {
        bossId: 8910000,
        最低等级: 100,
        限制次数: 4,
        事件名称: "boss8",
        远征队名称: "boss8Squad",
        挑战地图: 910000002,
        难度要求: 8
    },
    "boss-9": {
        bossId: 8900000,
        最低等级: 100,
        限制次数: 4,
        事件名称: "boss9",
        远征队名称: "boss9Squad",
        挑战地图: 910000003,
        难度要求: 9
    },
    "boss-10": {
        bossId: 8860000,
        最低等级: 100,
        限制次数: 4,
        事件名称: "boss10",
        远征队名称: "boss10Squad",
        挑战地图: 910000004,
        难度要求: 10
    },
    "boss-11": {
        bossId: 8880000,
        最低等级: 100,
        限制次数: 4,
        事件名称: "boss11",
        远征队名称: "boss11Squad",
        挑战地图: 910000005,
        难度要求: 11  // 确保是数字而不是字符串
    },
    "boss-12": {
        bossId: 8645009,
        最低等级: 100,
        限制次数: 4,
        事件名称: "boss12",
        远征队名称: "boss12Squad",
        挑战地图: 910000006,
        难度要求: 12
    },
    "boss-13": {
        bossId: 8880140,
        最低等级: 100,
        限制次数: 4,
        事件名称: "boss13",
        远征队名称: "boss13Squad",
        挑战地图: 910000007,
        难度要求: 13
    },
    "boss-14": {
        bossId: 8240098,
        最低等级: 100,
        限制次数: 4,
        事件名称: "boss14",
        远征队名称: "boss14Squad",
        挑战地图: 910000008,
        难度要求: 14
    }
};

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    var 等级 = cm.getPlayer().getLevel();
    var 元宝数量 = cm.itemQuantity(4031250);

    if (mode == 1) {
        status++;
    }

    if (status == 0) {
        // 只显示进入模式选择
        var text = "\t\t#e#r[BOSS挑战系统]#k#n\r\n\r\n";
        text += "#b选择进入模式：#k\r\n";
        if (cm.getBossLog("团队BOSS奖励倍数") == 1) {
            if (元宝数量 >= 1000) {
                text += "\t#L0#普通进入#l ";
                text += "\t#L1##r双倍进入√#k#l\r\n\r\n";
            } else {
                cm.setBossLog("团队BOSS奖励倍数", 0, true);
                text += "\t#L0##b普通进入√#k#l ";
                text += "\t#L1##d双倍进入(需要1000元宝)#k#l\r\n\r\n";
            }
        } else {
            text += "\t#L0##b普通进入√#k#l ";
            if (元宝数量 >= 1000) {
                text += "\t#L1#双倍进入#l\r\n\r\n";
            } else {
                text += "\t#L1##d双倍进入(需要1000元宝)#k#l\r\n\r\n";
            }
        }
        cm.sendSimple(text);
    } else if (status == 1) {
        // 处理进入模式选择
        if (selection == 1 && 元宝数量 < 1000) {
            cm.sendOk("元宝不足1000，无法选择元宝进入模式！");
            cm.setBossLog("团队BOSS奖励倍数", 0, true);
            status = -1;
            cm.dispose();
            return;
        }
        cm.setBossLog("团队BOSS奖励倍数", selection, true);

        // 进入难度选择菜单
        var text = "#b选择难度：#k\r\n";
        var levelIndex = getLevelIndex(等级);
        for (var i = 0; i <= levelIndex; i++) {
            text += "\t#L" + i + "#难度" + (i + 1) + "#l\r\n";
        }
        cm.sendSimple(text);
    } else if (status == 2) {
        // 处理难度选择
        if (selection >= 0 && selection <= getLevelIndex(等级)) {
            难度 = selection;
            var text = "";
            text += "\t\t#e#r[难度" + (难度 + 1) + "]#k#n\r\n\r\n";
            text += "\t#L0#进入#l\r\n";
            text += "\t#L2#重返#l\r\n";
            cm.sendSimple(text);
        }
    } else if (status == 3) {
        // 进入BOSS地图
        var sele = selection;
        cm.setBossLog("团队BOSS难度", 难度 + 1, true);
        var text = "";
        if (sele == 0) {
            text = "正在进入难度" + (难度 + 1) + "的BOSS地图（普通模式）\r\n";
        } else if (sele == 2) {
            text = "正在进入难度" + (难度 + 1) + "的BOSS地图（重返模式）\r\n";
            var bossLevel = parseInt(cm.getBossLog("团队BOSS难度"));
            var availableBosses = [];
            for (var bossName in boss_CONFIG) {
                if (parseInt(boss_CONFIG[bossName].难度要求) === bossLevel) {
                    availableBosses.push(bossName);
                }
            }
            if (selection < 0 || selection >= availableBosses.length) {
                cm.sendOk("选择无效，请重新选择。");
                cm.dispose();
                return;
            }
            selectedboss = boss_CONFIG[availableBosses[selection]];
            fbmc = availableBosses[selection];

            var em = cm.getEventManager(selectedboss.事件名称);
            if (em == null) {
                cm.sendOk("无事件");
                cm.dispose();
                return;
            }
            var prop = em.getProperty("state");
            var props = em.getProperty("leader");
            if (props != null && props.equals("true")) {
                var eima = em.getInstance(selectedboss.事件名称);
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
                    eim = cm.getDisconnected(selectedboss.事件名称);
                    if (eim == null) {
                        cm.sendOk("其它遠征隊，正在對戰中1。");
                        cm.safeDispose();
                    } else {
                        cm.sendOk("其它遠征隊，正在對戰中2。");
                        cm.safeDispose();
                    }
                }
            } else {
                var eima = em.getInstance(selectedboss.事件名称);
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
                        cm.dispose(); return;
                    } else {
                        saya += "#b现在是否要重新返回远征队所在场地？";
                        saya += "\r\n#r#L5#重新返回远征队所在场地#l";
                        cm.sendSimple(saya);
                    }
                } else {
                    cm.sendOk("很抱歉你的遠征隊隊長離開了現場，所以你不能再返回戰場。");
                    cm.safeDispose();
                }
            }

        }
        cm.sendOk(text + "\r\n难度：" + cm.getBossLog("团队BOSS难度") + "\r\n奖励倍数：" + cm.getBossLog("团队BOSS奖励倍数"));
        cm.dispose();
        cm.warp(802000109, 0);
    }
}

function getLevelIndex(等级) {
    var levels = [119, 129, 139, 149, 159, 169, 179, 189, 199, 209, 219, 229, 239, 255];
    for (var i = 0; i < levels.length; i++) {
        if (等级 <= levels[i]) {
            return i;
        }
    }
    return levels.length - 1;
}


function handleSelection(selection) {
    var currentHour = new Date().getHours();
    var currentMinute = new Date().getMinutes();

    if ((currentHour === 23 && currentMinute >= 45) || (currentHour === 0 && currentMinute <= 15)) {
        cm.sendOk("每天晚上 23:45 到 00:15 BOSS因为黑暗魔法的侵袭，无法挑战。");
        cm.dispose();
        return;
    }
    else if (selection == 2) {

    }



}