/* ==================
脚本类型: NPC	    
脚本作者：TTL哈撒给   
联系方式qq：111111111111
=====================
*/
var 小烟花 = "#fMap/MapHelper/weather/squib/squib4/1#";
var 红树 = "#fMap/MapHelper/weather/tree/4#"; //气球
var 粉爱心 = "#fItem/Etc/0427/04270005/Icon8/1#";
var 小天使 = "#fItem/Cash/0501/05010006/effect/default/2#";
var aaa = "#fUI/UIWindow.img/Quest/icon9/0#";//红色右箭头
var 开 = "#fUI/Basic/CheckBox/0#";   //有框框 无√
var 关 = "#fUI/Basic/CheckBox/1#";   //有框框 有√
var 躺熊 = "#fItem/Cash/0502/05021008/info/iconRaw#";
var 红色小图片 = "#fUI/UIWindow.img/Item/BtSort/mouseOver/0#";//红色小图片
var 圆形 = "#fUI/UIWindow/Quest/icon3/6#";
var 金币图 = "#fUI/UIWindow/QuestIcon/7/0#";

var status;
var fbmc = "进阶扎昆"; // 副本名称
var 最低等级 = 100; // 最低等级
var 限制次数 = 4; // 普通扎昆每日限制次数
var 事件名称 = "ChaosZakum";
var 远征队名称 = "ChaosZak";
var 挑战地图 = 280030001;//只是地图检测里边是不是有人，并不同步到事件里边
function start() {
    status = -1;

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
        }
        else {
            status--;
        }
        if (status == 0) {
            if (cm.getPlayer().getLevel() < 最低等级) {
                cm.sendOk("你的等级尚未达到" + 最低等级 + "级");
                cm.dispose();
                return;
            }
            if (cm.getPlayer().getBossLogacs(fbmc) >= 限制次数) {//进阶扎昆
                cm.sendOk("很抱歉每天只能打" + 限制次数 + "次..");
                cm.dispose();
                return;
            }

            if (cm.getPlayerCount(挑战地图) >= 1) {
                cm.sendOk("已经有队伍在里面挑战了。");
                cm.dispose();
                return;
            }

            var emm = cm.getEventManager(事件名称);

            if (emm == null) {
                cm.sendOk("脚本错误，请联系管理员");
                cm.dispose();
                return;
            }
            var prop = emm.getProperty("state");
            var marr = cm.getQuestRecord(160102);
            var data = marr.getCustomData();
            if (data == null) {
                marr.setCustomData("0");
                data = "0";
            }
            var time = parseInt(data);
            
            if (prop == null || prop.equals("0")) {
                var squadAvailability = cm.getSquadAvailability(远征队名称);
                if (squadAvailability == -1) {
                    var text = ""
                    text += "#L8#你有兴趣成为远征队长吗?(今日挑战次数 [#r" + cm.getBossLog(fbmc) + "#k/" + 限制次数 + "])\r\n\r\n";
                    text += "\r\n\r\n#r#e创建 #k#n或者 #r#e加入 #b远征队即算挑战次数+1\r\n";
                    text += "#r#e创建 #k#n或者 #r#e加入 #b远征队即算挑战次数+1\r\n";
                    text += "#r#e创建 #k#n或者 #r#e加入 #b远征队即算挑战次数+1\r\n";
                    cm.sendYesNo(text);
                } else if (squadAvailability == 1) {
                    var type = cm.isSquadLeader(远征队名称);
                    if (type == -1) {
                        cm.sendOk("远征队已结束，请重新登记。");
                        cm.dispose();
                    } else if (type == 0) {
                        var memberType = cm.isSquadMember(远征队名称);
                        if (memberType == 2) {
                            cm.sendOk("你已经被远征队长踢出.");
                            cm.dispose();
                        } else if (memberType == 1) {
                            var text = ""
                            text += "你想做什么? \r\n";
                            text += "今日挑战次数 [#r" + cm.getBossLog(fbmc) + "#k/" + 限制次数 + "]\r\n\r\n";
                            text += "#b#L0#查看成员#l\r\n";
                            text += "#b#L1#加入远征队#l\r\n";
                            text += "#b#L2#退出远征队#l\r\n";
                            text += "\r\n\r\n#r#e创建 #k#n或者 #r#e加入 #b远征队即算挑战次数+1\r\n";
                            text += "#r#e创建 #k#n或者 #r#e加入 #b远征队即算挑战次数+1\r\n";
                            text += "#r#e创建 #k#n或者 #r#e加入 #b远征队即算挑战次数+1\r\n";
                            cm.sendSimple(text);
                        } else if (memberType == -1) {
                            cm.sendOk("远征队已结束，请重新登记。");
                            cm.dispose();
                        } else {
                            var text = ""
                            text += "你想做什么? \r\n";
                            text += "今日挑战次数 [#r" + cm.getBossLog(fbmc) + "#k/" + 限制次数 + "]\r\n\r\n";
                            text += "#b#L0#查看成员#l\r\n";
                            text += "#b#L1#加入远征队#l\r\n";
                            text += "#b#L2#退出远征队#l\r\n";
                            text += "\r\n\r\n#r#e创建 #k#n或者 #r#e加入 #b远征队即算挑战次数+1\r\n";
                            text += "#r#e创建 #k#n或者 #r#e加入 #b远征队即算挑战次数+1\r\n";
                            text += "#r#e创建 #k#n或者 #r#e加入 #b远征队即算挑战次数+1\r\n";
                            cm.sendSimple(text);
                        }
                    } else { // Is leader
                        var text = ""
                        text += "你想做什么? \r\n";
                        text += "今日挑战次数 [#r" + cm.getBossLog(fbmc) + "#k/" + 限制次数 + "]\r\n\r\n";
                        text += "#b#L4#查看成员#l\r\n\r\n";
                        //text +="#b#L5#加入远征队#l\r\n";
                        //text +="#b#L6#退出远征队#l\r\n";
                        text += "#r#L7#点击开始挑战#l\r\n";
                        text += "\r\n\r\n#r#e创建 #k#n或者 #r#e加入 #b远征队即算挑战次数+1\r\n";
                        text += "#r#e创建 #k#n或者 #r#e加入 #b远征队即算挑战次数+1\r\n";
                        text += "#r#e创建 #k#n或者 #r#e加入 #b远征队即算挑战次数+1\r\n";
                        cm.sendSimple(text);
                    }
                } else {
                    var props = emm.getProperty("leader");
                    if (props != null && props.equals("true")) {
                        var eim = cm.getDisconnected(事件名称);
                        if (eim == null) {
                            cm.sendOk("远征队与扎昆的战斗已经开始。");
                            cm.dispose();
                        } else {
                            cm.sendOk("远征队与扎昆的战斗已经开始。");
                            cm.dispose();
                        }
                    } else {
                        cm.sendOk("很抱歉你的远征队队长离开了现场，所以你不能再返回战场。");
                        cm.dispose();
                    }
                }
            } else {
                var props = emm.getProperty("leader");
                if (props != null && props.equals("true")) {
                    var eimc = emm.getInstance(事件名称);
                    var propsc = eimc.getProperty("isSquadPlayerID_" + cm.getPlayer().getId());
                    var sayc = "\r\n" + (eimc == null ? "eimc is null" : propsc) + "\r\n";
                    if ((eimc != null) && (propsc != null) && propsc.equals("1")) {
                        status = 13;
                        sayc += "#b现在是否要重新返回远征队所在场地？";
                        sayc += "\r\n#r#L1重新返回远征队所在场地#l";
                        cm.sendSimple(sayc);
                    } else {
                        eim = cm.getDisconnected(事件名称);
                        if (eim == null) {
                            cm.sendOk("远征队与扎昆的战斗已经开始。" + sayc);
                            cm.dispose();
                        } else {
                            cm.sendOk("远征队与扎昆的战斗已经开始。" + sayc);
                            cm.dispose();
                        }
                    }
                } else {
                    var eimd = emm.getInstance(事件名称);
                    var propsd = eimd.getProperty("isSquadPlayerID_" + cm.getPlayer().getId());
                    var sayd = "\r\n" + (eimd == null ? "eimd is null" : propsd) + "\r\n";
                    if ((eimd != null) && (propsd != null) && propsd.equals("1")) {
                        status = 13;
                        sayd += "#b现在是否要重新返回远征队所在场地？";
                        sayd += "\r\n#r#L1#重新返回远征队所在场地#l";
                        cm.sendSimple(sayd);
                    } else {
                        cm.sendOk("很抱歉你的远征队队长离开了现场，所以你不能再返回战场。");
                        cm.dispose();
                    }
                }
            }
        } else if (status == 1) {
            if (selection == 0) {
                if (!cm.getSquadList(远征队名称, 0)) {
                    cm.sendOk("由于未知错误，你加入远征队的请求被拒绝。");
                    cm.dispose();
                } else {
                    cm.dispose();
                }
            } else if (selection == 1) {

                var ba = cm.addMember(远征队名称, true);
                if (ba == 2) {
                    cm.sendOk("远征队已满员，请稍后再试。");
                    cm.dispose();
                } else if (ba == 1) {
                    cm.sendOk("你已成功加入远征队。");
                    cm.dispose();
                } else {
                    cm.setBossLog(fbmc);
                    cm.sendOk("你已成功加入远征队。");
                    cm.dispose();
                }
            } else if (selection == 2) {
                var baa = cm.addMember(远征队名称, false);
                if (baa == 1) {
                    cm.sendOk("你已成功从远征队中退出。");
                    cm.dispose();
                } else {
                    cm.sendOk("你不是远征队的一员。");
                    cm.dispose();
                }
            } else if (selection == 4) {
                if (!cm.getSquadList(远征队名称, 0)) {
                    cm.sendOk("由于未知错误，你加入远征队的请求被拒绝。");
                }
                cm.safeDispose();
            } else if (selection == 5) {
                status = 11;
                if (!cm.getSquadList(远征队名称, 1)) {
                    cm.sendOk("由于未知错误，你加入远征队的请求被拒绝。");
                    cm.safeDispose();
                }

            } else if (selection == 6) {
                status = 12;
                if (!cm.getSquadList(远征队名称, 2)) {
                    cm.sendOk("由于未知错误，你加入远征队的请求被拒绝。");
                    cm.safeDispose();
                }

            } else if (selection == 7) {
                if (cm.getSquad(远征队名称) != null) {
                    var dd = cm.getEventManager(事件名称);
                    // var squ = cm.getSquad(远征队名称);
                    //if(squ.getMembers().size() == 1 )
                    //cm.增加远征队每日次数(远征队名称,fbmc);
                    dd.startInstance(cm.getSquad(远征队名称), cm.getMap(), 160102);
                    cm.dispose();
                } else {
                    cm.sendOk("由于未知错误，你加入远征队的请求被拒绝。");
                    cm.safeDispose();
                }
            } else if (selection == 8) {
                if (cm.registerSquad(远征队名称, 5, " 被任命为远征队长，如果你想参加，请在规定时间内加入远征队。")) {
                    cm.setBossLog(fbmc);
                    cm.sendOk("你被任命为远征队长，接下来的5分钟你可以等待你的成员加入。");
                    cm.dispose();
                } else {
                    cm.sendOk("添加远征队时发生错误。");
                    cm.dispose();
                }
            } else {// withdraw
                var baa = cm.addMember(远征队名称, false);
                if (baa == 1) {
                    cm.sendOk("你已成功从远征队中退出。");
                    cm.safeDispose();
                } else {
                    cm.sendOk("你不是远征队的一员。");
                    cm.safeDispose();
                }
            }
        } else if (status == 3) {
            var emh = cm.getEventManager(事件名称);
            if ((selection == 1) && (emh != null)) {
                var eim = emh.getInstance(事件名称);
                if ((eim != null) && (eim.getProperty("isSquadPlayerID_" + cm.getPlayer().getId()) != null)) {
                    eim.registerPlayer(cm.getPlayer());
                }
            }
            cm.dispose();


        }
    }
}


