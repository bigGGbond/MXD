/* ==================
 脚本类型:  NPC	    
 脚本作者： 枫之谷 
 联系方式： QQ338150
 =====================
 */

var status = 0;
var fbmc = "玩具之城 - (组队任务)";
var minLevel = 35;//最低等级
var maxLevel = 250;//最高等级
var minPartySize = 1;//最低人数
var maxPartySize = 6;//最高人数
var cishuxianzhi = 3;//限制次数
var maxjinbi = 50000;//判断征集令金币
var eventname = "LudiPQ";//副本配置文件

//判断副本任务是否开启
var qblog = "LPQOpen";
var open = true; //false true
//其他设置
var ca = java.util.Calendar.getInstance();
var hour = ca.get(java.util.Calendar.HOUR_OF_DAY); //获得小时
var minute = ca.get(java.util.Calendar.MINUTE); //获得分钟
var second = ca.get(java.util.Calendar.SECOND); //获得秒


function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode == -1) {
		cm.dispose();
	} else if (mode == 0) {
		cm.dispose();
	} else {
		if (mode == 1)
			status++;
		else
			status--;
		var em = cm.getEventManager(eventname);
		if (status == 0) {
			var yhms = "";
			yhms += "                #k" + fbmc + "\r\n";
			yhms += "副本进入要求如下：\r\n";
			yhms += "①人数限制:#r " + minPartySize + " #b- #r" + maxPartySize + "#k队员\t②等级限制：#r " + minLevel + " #b- #r" + maxLevel + "级 #k\r\n"
			yhms += "#k每天只能挑战:#b"+ cishuxianzhi +"#k次  你今天已进入:#b"+ cm.getBossLog("玩具副本") +"#k次#k\r\n"
			yhms += "#L0##b开始 " + fbmc + "#l" + maxjinbi + "金币/次#l\r\n";
			yhms += "#L3##b#r重置副本(用于卡副本使用)#l\r\n\r\n";
			cm.sendSimple(yhms);
		} else if (status == 1) {
			if (selection == 0) {
				var party = null;
				try {
					party =  cm.getParty().getMembers();
				} catch(err) {
					cm.sendOk("没有组队");
					cm.dispose();
					return;
				}
				var inMap = cm.partyMembersInMap();
				var levelValid = 0;
				for (var i = 0; i < party.size(); i++) {
					if (party.get(i).getLevel() >= minLevel && party.get(i).getLevel() <= maxLevel){
						levelValid++;
					}
				}
				var party = cm.getPlayer().getParty().getMembers();
				var it = party.iterator();
				while (it.hasNext()) {
					var cPlayer = it.next();
					var ccPlayer = cm.getPlayer().getMap().getCharacterById(cPlayer.getId());
					if(ccPlayer != null) {
						/*if (ccPlayer.getOneTimeLog("至尊会员") > 0){
							if (ccPlayer.get每日记录("玩具副本") >= (cishuxianzhi + 2)){
								cm.sendOk("队伍中 "+cPlayer.getName()+" 挑战次数已经用完"+(cishuxianzhi + 2)+"次！");
								cm.dispose();
								return;
							}
						} else {
							
						}*/
						if (ccPlayer.getBossLog("玩具副本") >= cishuxianzhi){
							cm.sendOk("队伍中 "+cPlayer.getName()+" 挑战次数已经用完"+cishuxianzhi+"次！");
							cm.dispose();
							return;
						}
					}
				}
				if (hasParty() == false) { //判断是否有组队
					cm.sendOk("你还没有创建一只队伍,请按快捷“P”键进行创建。");
					cm.dispose();
				} else if (isLeader() == false) { //判断是否是队长
					cm.sendOk("“队长”必须在这里,请让他和我说话。");
					cm.dispose();
                } else if (!cm.getParty每日记录("玩具副本", 20)) { //判断组队是否2次
                    cm.sendOk("队伍中队友挑战次数已经用完20次！");
                    cm.dispose();
				} else if (inMap < minPartySize || inMap > maxPartySize) {
					cm.sendOk("你的队伍人数不足" + minPartySize + "人.请把你的队伍人员召集到在进入副本.");
					cm.dispose();
				} else if (levelValid != inMap) {
					cm.sendOk("请确保你的队伍人员最小等级在 " + minLevel + " 和 " + maxLevel + "之间. I see #b" + levelValid + "");
					cm.dispose();
				} else if (checkPartySize() == false) { //判断队伍成员人数
					cm.sendOk("管理员 - 提示 \r\n\r\n队伍成员人数必须在#b" + minPartySize + "~" + maxPartySize + "#k之间并且必须在一张地图才能进入，请核对后在来找我。");
					cm.dispose();
				} else if (em == null) { //判断配置文件是否激活
					cm.sendOk("配置文件没有开启,请联系管理员。");
					cm.dispose();
				} else if (open == false) { //判断NPC脚本是否开启
					cm.sendOk("NPC脚本没有开启,请联系管理员。。");
					cm.dispose();
				} else if (Property() == false) { //判断副本是否已经有开启
					cm.sendOk("当前频道已有玩家在进行任务中，请稍后在试。\r\n\r\n如没有玩家您可以点击#r重置副本#k然后再进入。");
					cm.dispose();
				} else {
					em.startInstance(cm.getParty(), cm.getPlayer().getMap());
					//cm.getPlayer().setBossLog("玩具副本");//给团队次数
					//cm.给团队每日("玩具副本");
					//cm.setPartyBosslog("玩具副本");//给团队次数
					// cm.giveParty每日记录("玩具副本");
			        cm.dispose();
					//cm.serverMessage(6,"[组队任务]: 玩家 [" + cm.getPlayer().getName() + "] 带领他的队伍进入了" + fbmc + "。");
					var eim = cm.getPlayer().getEventInstance();
					var party = eim.getPlayers();
					cm.dispose();
					em.setProperty(qblog, "false");
				}
            } else if (selection == 2) {
		        if (cm.getMeso() >= maxjinbi){//判断多少金币
                   cm.gainMeso(- maxjinbi );//扣除多少金币
	               cm.全服黄色喇叭(cm.getPlayer().getName() + " [副本征集令]" + " : " + "[" + fbmc + "]需要勇士一起完成");
                   cm.dispose();
				} else {
                   cm.sendOk("你的冒险币不足" + maxjinbi + "。无法发送征集令");
                   cm.dispose();
				}				
			} else if (selection == 3) {
				if (cm.getPlayerCount(922010100) <= 0 && cm.getPlayerCount(922010200) <= 0 && cm.getPlayerCount(922010201) <= 0 && cm.getPlayerCount(922010300) <= 0 && cm.getPlayerCount(922010400) <= 0 && cm.getPlayerCount(922010401) <= 0 && cm.getPlayerCount(922010402) <= 0 && cm.getPlayerCount(922010403) <= 0 && cm.getPlayerCount(922010404) <= 0 && cm.getPlayerCount(922010405) <= 0 && cm.getPlayerCount(922010500) <= 0 && cm.getPlayerCount(922010501) <= 0 && cm.getPlayerCount(922010502) <= 0 && cm.getPlayerCount(922010503) <= 0 && cm.getPlayerCount(922010504) <= 0 && cm.getPlayerCount(922010505) <= 0 && cm.getPlayerCount(922010506) <= 0 && cm.getPlayerCount(922010600) <= 0 && cm.getPlayerCount(922010700) <= 0 && cm.getPlayerCount(922010800) <= 0 && cm.getPlayerCount(922010900) <= 0 && cm.getPlayerCount(922011000) <= 0 && cm.getPlayerCount(922011100) <= 0) {
					cm.getEventManager("LudiPQ").setProperty("LPQOpen", "true");
					cm.sendOk("重置成功！");
					cm.dispose();
				} else {
					cm.sendOk("该副本有队伍正在进行中无法重置！");
					cm.dispose();
				}
			}				
		}
	}		
}

function getPartySize() {
	if (cm.getPlayer().getParty() == null)
		return 0;
	return (cm.getPlayer().getParty().getMembers().size());

}

function isLeader() {
	if (cm.getParty() == null)
		return false;
	return cm.isLeader();
}

function checkPartySize() {
	var size = 0;
	if (cm.getPlayer().getParty() == null)
		size = 0;
	else
		size = (cm.getPlayer().getParty().getMembers().size());
	if (size < minPartySize || size > maxPartySize)
		return false;
	return true;
}

function checkPartyLevels() {
	var pass = true;
	var party = cm.getPlayer().getParty().getMembers();
	if (cm.getPlayer().getParty() == null)
		pass = false;
	else {
		for (var i = 0; i < party.size() && pass; i++) {
			if ((party.get(i).getLevel() < minLevel) || (party.get(i).getLevel() > maxLevel) || (party.get(i).getMapId() != cm.getMapId()))
				pass = false;

		}
	}
	return pass;
}

function hasParty() {
	if (cm.getPlayer().getParty() == null)
		return false;
	return true;
}

function Property() {
	var em = cm.getEventManager(eventname);
	if (em.getProperty(qblog) == "false") {
		return false;
		return true;
	}
}
function zdLog() {
	var party = cm.getPlayer().getParty().getMembers();
	var it = party.iterator();
	var cPlayer = it.next();
	var zd = cm.getPlayer().getMap().getCharacterById(cPlayer.getId());
	if (zd.getBossLog(Log) >= maxenter)
		return false;
	return true;
}
