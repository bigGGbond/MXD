/* ==================
 脚本类型:  NPC	    
 脚本作者： 枫之谷 
 联系方式： QQ338150
 =====================
 */
 
var status = 0;
var fbmc = "废弃都市-(废弃副本)";//副本名称
var minLevel = 20;//最低等级
var maxLevel = 250;//最高等级
var minPartySize = 1;//最低人数
var maxPartySize = 6;//最高人数
var cishuxianzhi = 3;//限制次数
var maxjinbi = 50000;//判断征集令金币
var eventname = "KerningPQ";//副本配置文件

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == 1)
        status++;
    else {
        cm.dispose();
        return;
    }
    if (status == 0) {
		var text = "";
		text += "#k\t\t\t欢迎来到#r" + fbmc + "#k\r\n副本进入要求如下：\r\n①人数限制:#b " + minPartySize + " #b- #r" + maxPartySize + "#k队员\t②等级限制：#r " + minLevel + " #b- #r" + maxLevel + "级 #k\r\n"
		text += "#k每天只能挑战:#b"+ cishuxianzhi + "#k次  你今天已完成:#b"+ cm.getBossLog("废弃副本") +"#k次#k\r\n"
		text += "#L1##r开始组队副本#l      " + maxjinbi + "金币/次#l\r\n\r\n"
		cm.sendSimple(text);
	} else if (selection == 1) {
        if (cm.getParty() == null) {
            cm.sendOk("你没有队伍无法进入！");
            cm.dispose();
			return;
        } else if (!cm.isLeader()) { 
            cm.sendOk("请让你的队长和我说话~");
            cm.dispose();
			return;
		}else {
            var party = cm.getParty().getMembers();
            var inMap = cm.partyMembersInMap();
            var levelValid = 0;
			var it = party.iterator();
			while (it.hasNext()) {
				var cPlayer = it.next();
				var ccPlayer = cm.getPlayer().getMap().getCharacterById(cPlayer.getId());
				if(ccPlayer != null) {
					/*if (ccPlayer.getOneTimeLog("至尊会员") > 0){
						if (ccPlayer.get每日记录("废弃副本") >= (cishuxianzhi + 2)){
							cm.sendOk("队伍中 "+cPlayer.getName()+" 挑战次数已经用完"+(cishuxianzhi + 2)+"次！");
							cm.dispose();
							return;
						}
					} else {
						
					}*/
					
					if (ccPlayer.getBossLog("废弃副本") >= cishuxianzhi){
						cm.sendOk("队伍中 "+cPlayer.getName()+" 挑战次数已经用完"+cishuxianzhi+"次！");
						cm.dispose();
						return;
					}
				}
			}
            for (var i = 0; i < party.size(); i++) {
                if (party.get(i).getLevel() >= minLevel && party.get(i).getLevel() <= maxLevel) {
                    levelValid++;
				}
            }
            if (inMap < minPartySize || inMap > maxPartySize) {
                cm.sendOk("你的队伍人数不足"+minPartySize+"人.请把你的队伍人员召集到废弃都市在进入副本.");
                cm.dispose();
				return;
            } else if (levelValid != inMap) {
                cm.sendOk("请确保你的队伍里所有人员都在本地图，且最小等级在 "+minLevel+" 和 "+maxLevel+"之间.");
                cm.dispose();
				return;
	        }else {
                var em = cm.getEventManager("KerningPQ");
                if (em == null) {
                    cm.sendOk("这台电脑是当前不可用.");
				//} else if (em.getProperty("KPQOpen").equals("true")) {
                } else {
					if (cm.getPlayerCount(103000800) <= 0 && cm.getPlayerCount(103000801) <= 0 && cm.getPlayerCount(103000802) <= 0 && cm.getPlayerCount(103000803) <= 0 && cm.getPlayerCount(103000804) <= 0) {
						/*var papuMap = cm.getMap(103000804);
						 cm.getMap(103000804).resetFully();
						cm.spawnMobOnMap(9300002,1,297,-2188,103000804);
						cm.spawnMobOnMap(9300002,1,433,-2192,103000804);
						cm.spawnMobOnMap(9300002,1,132,-2193,103000804);
						cm.spawnMobOnMap(9300000,1,-18,-1480,103000804);
						cm.spawnMobOnMap(9300000,1,80,-1486,103000804);
						cm.spawnMobOnMap(9300000,1,391,-1488,103000804);
						cm.spawnMobOnMap(9300000,1,247,-1485,103000804);
						cm.spawnMobOnMap(9300000,1,-111,-1475,103000804);
						cm.spawnMobOnMap(9300000,1,299,-1485,103000804);
						cm.spawnMobOnMap(9300003,1,162,-451,103000804);
						//var papuMap = pi.getMap(103000804);
						//pi.getPlayer().setbosslog(1);
						//pi.playPortalSE();*/
						//}
						//em.startInstance(cm.getPlayer().getParty(), cm.getPlayer().getMap());
						em.startInstance(cm.getParty(), cm.getPlayer().getMap());
						//cm.getPlayer().setBossLog("废弃副本");//给团队次数
						// cm.giveParty每日记录("废弃副本");
						//cm.setPartyBosslog("废弃副本");//给团队次数
					} else {
						cm.sendOk("请稍等...任务正在进行中.");
					}
                }
                cm.dispose();
            }
        }
	} else if (selection == 2) {
		if (cm.getMeso() >= maxjinbi){//判断多少金币
			cm.gainMeso(- maxjinbi );//扣除多少金币
			cm.全服黄色喇叭(cm.getPlayer().getName() + " [副本征集令]" + " : " + "[" + fbmc + "]需要勇士一起完成,我已在副本门口!");
			cm.dispose();
		}else{
			cm.sendOk("你的冒险币不足" + maxjinbi + "。无法发送征集令");
			cm.dispose();
		}
	}
}