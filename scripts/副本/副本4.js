/* ==================
 脚本类型:  NPC	    
 脚本作者： 枫之谷 
 联系方式： QQ338150
 =====================
 */
 
var status = 0;
var fbmc = "通天塔-(女神副本)";
var minLevel = 40;//最低等级
var maxLevel = 250;//最高等级
var minPartySize = 1;//最低人数
var maxPartySize = 6;//最高人数
var cishuxianzhi = 3;//队长限制次数
var maxjinbi = 50000;//判断征集令金币
var eventname = "OrbisPQ";//副本配置文件

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
		if (cm.getMapId() == 920010000) {
			cm.warpParty(920010100);//打云给经验
			var em = cm.getEventManager("OrbisPQ");
			if (em != null) {
				// rm.givePartyExp(6000);
				em.setProperty("pre", "1");
			}
			// cm.sendOk("我们必须拯救他 需要20个云的碎片然后丢到中间的光环之中,切忌千万不要一个一个丢!");
			cm.dispose();
			return;
		}
		var text = "";
		
		text += "#k\t\t\t\t欢迎来到#r" + fbmc + "#k\r\n副本进入要求如下：\r\n①人数限制:#r " + minPartySize + " #b- #r" + maxPartySize + "#k队员\t②等级限制：#r " + minLevel + " #b- #r" + maxLevel + "级 #k\r\n"
		text += "#k每天只能挑战:#b"+ cishuxianzhi + "#k次   你今天已进入:#b"+ cm.getBossLog("天空副本") +"#k次#k\r\n"
		text += "#L1##r开始组队副本#l      " + maxjinbi + "金币/次#l\r\n\r\n"
		cm.sendSimple(text);
	} else if (selection == 1) {
		for (var i = 4001044; i < 4001064; i++) {
			cm.removeAll(i); 
		}
		if (cm.getParty() == null || !cm.isLeader()) { //判断队长
			cm.sendOk("请让你的队长和我说话~");
			cm.dispose();
			return;
		} else {
			// Check if all 队员 are within PQ levels
			var mapId = cm.getPlayer().getMapId();
			var next = true;
			var levelValid = 0;
			var inMap = 0;
			var notHere = '';
			var party = cm.getPlayer().getParty().getMembers();
			var it = party.iterator();
			while (it.hasNext()) {
				var cPlayer = it.next();
				var ccPlayer = cm.getPlayer().getMap().getCharacterById(cPlayer.getId());
				if(ccPlayer != null) {
					/*if (ccPlayer.getOneTimeLog("至尊会员") > 0){
						if (ccPlayer.get每日记录("天空副本") >= (cishuxianzhi + 2)){
							cm.sendOk("队伍中 "+cPlayer.getName()+" 挑战次数已经用完"+(cishuxianzhi + 2)+"次！");
							cm.dispose();
							return;
						}
					} else {
						
					}*/
					if (ccPlayer.getBossLog("天空副本") >= cishuxianzhi){
						cm.sendOk("队伍中 "+cPlayer.getName()+" 挑战次数已经用完"+cishuxianzhi+"次！");
						cm.dispose();
						return;
					}
				} else {
					notHere += cPlayer.getName() + " ";
				}
				if('' !== notHere) {
					cm.sendOk(notHere + '不在本地图.');
					cm.dispose();
					return;
				}
				if ((cPlayer.getLevel() >= minLevel) && (cPlayer.getLevel() <= maxLevel)) {
					levelValid += 1;
				} else {
					next = false;
				}
				if (cPlayer.getMapid() == mapId) {
					inMap += (cPlayer.getJobId() == 900 ? 6 : 1);
				}
			}
			if (party.size() > maxPartySize || inMap < minPartySize) {
				next = false;
			}
			if (next) {
				cm.dispose();
				var em = cm.getEventManager("OrbisPQ");
				if (em == null) {
					cm.sendSimple("找不到脚本请联络GM#b\r\n");
				} else {
					var prop = em.getProperty("state");
					if (prop.equals("0") || prop == null) {
						// cm.giveParty每日记录("天空副本");
						em.startInstance(cm.getPlayer().getParty(), cm.getPlayer().getMap());
						// em.startInstance(cm.getParty(), cm.getMap());
						//cm.getPlayer().setBossLog("天空副本");//给团队次数
						//cm.给团队每日("天空副本");
						//cm.setPartyBosslog("天空副本");//给团队次数
						// return;
					} else {
						cm.sendSimple("其他队伍已经在里面做 #r组队任务了#k 请尝试换频道或者等其他队伍完成。");
					}
				}
			} else {
				cm.sendSimple("你的队伍貌似没有达到要求...:\r\n\r\n#r要求: " + minPartySize + " 玩家成员, 每个人的等级必须在 " + minLevel + " 到 等级 " + maxLevel + ".");
			}
		}
	} else if (selection == 2) {
		if (cm.getMeso() >= maxjinbi){//判断多少金币
			cm.gainMeso(- maxjinbi );//扣除多少金币
			cm.全服黄色喇叭(cm.getPlayer().getName() + " [副本征集令]" + " : " + "[" + fbmc + "]需要勇士一起完成");
			cm.dispose();
		}else{
			cm.sendOk("你的冒险币不足" + maxjinbi + "。无法发送征集令");
			cm.dispose();
		}
	}
    
}

