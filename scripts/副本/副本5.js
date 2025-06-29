/* ==================
 脚本类型:  副本    
 脚本作者： 枫之谷   
 联系方式： qq338150
 =====================
 */
 
var status = 0;
var fbmc = "毒雾森林-(毒物副本)";//副本名称
var minLevel = 50;//最低等级
var maxLevel = 250;//最高等级
var minPartySize = 1;//最低人数
var maxPartySize = 6;//最高人数
var cishuxianzhi = 3;//限制次数
var maxjinbi = 50000;//判断征集令金币
var eventname = "Ellin";//副本配置文件

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
		text += "#k\t\t\t\t欢迎来到#r" + fbmc + "#k\r\n副本进入要求如下：\r\n①人数限制:#r " + minPartySize + " #b- #r" + maxPartySize + "#k队员\t②等级限制：#r " + minLevel + " #b- #r" + maxLevel + "级 #k\r\n"
		text += "#k每天只能挑战:#b"+ cishuxianzhi +"#k次 #k 你今天已进入:#b"+ cm.getBossLog("毒物副本") +"#k次#k\r\n"
		text += "#L1##r开始组队副本#l      " + maxjinbi + "金币/次#l\r\n\r\n"
		cm.sendSimple(text);
    } else if (status == 1) {
        if (selection == 1) {
			if (cm.getPlayer().getParty() == null || !cm.isLeader()) {
				cm.sendOk("找您的队长来和我谈话。");
				cm.dispose();
			} else {
				var party = cm.getPlayer().getParty().getMembers();
				var mapId = cm.getPlayer().getMapId();
				var next = true;
				var size = 0;
				var it = party.iterator();
				var party = cm.getParty().getMembers();
				while (it.hasNext()) {
					var cPlayer = it.next();
					var ccPlayer = cm.getPlayer().getMap().getCharacterById(cPlayer.getId());
					if(ccPlayer != null) {
						/*if (ccPlayer.getOneTimeLog("至尊会员") > 0){
							if (ccPlayer.get每日记录("毒物副本") >= (cishuxianzhi + 2)){
								cm.sendOk("队伍中 "+cPlayer.getName()+" 挑战次数已经用完"+(cishuxianzhi + 2)+"次！");
								cm.dispose();
								return;
							}
						} else {
							
						}*/
						if (ccPlayer.getBossLog("毒物副本") >= cishuxianzhi){
							cm.sendOk("队伍中 "+cPlayer.getName()+" 挑战次数已经用完"+cishuxianzhi+"次！");
							cm.dispose();
							return;
						}
					}
					if (ccPlayer == null || ccPlayer.getLevel() < minLevel || ccPlayer.getLevel() > maxLevel) {
						next = false;
						break;
					}
				}	    		
				if (party.size() >= minPartySize && next) {
					var em = cm.getEventManager("Ellin");
					if (em == null) {
						cm.sendOk("当前副本有问题,请联络管理员.");
						cm.dispose();
					} else {
						var prop = em.getProperty("state");
						if (prop.equals("0") || prop == null) {
							em.startInstance(cm.getParty(), cm.getMap());
							//cm.getPlayer().setBossLog("毒物副本");//给团队次数
							//cm.给团队每日("毒物副本");
							//cm.setPartyBosslog("毒物副本");//给团队次数
							// cm.giveParty每日记录("毒物副本");
							cm.dispose();
							return;
						} else {
							cm.sendOk("里面已经有人了,请你稍后在进入看看,或者更换频道");
							cm.dispose();
						}
					}
				} else {
					cm.sendOk("你的队伍#b成员#k需要#b" +minPartySize+ "人#k以上等级" + minLevel + "~" + maxLevel + "的队员才能进入!");
					cm.dispose();
				}
			}
		} else if (selection == 2){
            if (cm.getMeso() >= maxjinbi){//判断多少金币
                cm.gainMeso(- maxjinbi );//扣除多少金币
				cm.全服黄色喇叭(cm.getPlayer().getName() + " [副本征集令]" + " : " + "[" + fbmc + "]需要勇士一起完成,我已在副本门口");
                cm.dispose();
			}else{
				cm.sendOk("你的冒险币不足" + maxjinbi + "。无法发送征集令");
				cm.dispose();
			}
		}
    }
}