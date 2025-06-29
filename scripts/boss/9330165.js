/* ==================
 脚本类型: NPC	    
 脚本作者：金银岛   
 联系方式：338150
 =====================
 */
importPackage(java.lang);//------------------------看这里  前面两个斜杠删掉保存  就开启
importPackage(Packages.tools);
importPackage(Packages.client);
importPackage(Packages.server);
importPackage(Packages.tools.packet);
var fbmc = "枫之高校";
var minLevel = 1;//最低等级
var maxLevel = 200;//最高等级
var minPartySize = 1;//最低人数
var maxPartySize = 6;//最高人数
var cishuxianzhi = 114;//限制次数
var maxjinbi = 50000;//判断征集令金币
var status;
// var 星期几开始 = 7;
var 开始小时 = 20;
var 开始分钟 = 1;
var 结束小时 = 20;
var 结束分钟 = 31;
var 传送地图 = 910000077;
var dt = new Date();
var nowh = dt.getHours(); //获取时
var nowm = dt.getMinutes(); //获取分
var cal = java.util.Calendar.getInstance();
var todayweek = cal.get(java.util.Calendar.DAY_OF_WEEK) - 1;
function start() {
	  status = -1;
	  action(1, 0, 0);		
}

function action(mode, type, selection) {
	var date = new Date();
    if (mode == -1) {
        cm.dispose();
    }
    else {
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
            var tex2 = "";
            var text = "";
            for (i = 0; i < 10; i++) {
                text += "";
            }
            text += "#k\t\t\t#v3014009# #e欢迎来到#r" + fbmc + "#k#n\r\n";
            text += "#v3994618# 副本进入要求如下：\r\n";
			text += "#v3994611# ① 等级限制：#r" + minLevel + "#k - #r" + maxLevel + "#k级   人数限制：#r" + minPartySize + " - 6#k #r人\t\t\r\n";
			text += "#v3994612# #k② 每天能挑战:#r"+cishuxianzhi+"#k次  今天已挑战:#r"+ cm.getPlayer().getBossLogD("枫之高校") +"#k次 过图:#r"+ cm.getPlayer().getBossLog(date .getDate()+"枫之高校") +"#k次#k\r\n";
			// text += "#v3994613# ③ #k\r\n";
			if(todayweek!=7&&todayweek!=0){
			text += "\r\n#b只有周六周日可以挑战" + fbmc + "#l\r\n\r\n";
			
			}else{
			text += "#L1##r#v5680208# 开始" + fbmc + "#l        #L3##v2041320# #r奖励领取#l\r\n\r\n";
			}
			text += "#L1##r#v5680208# 开始" + fbmc + "#l        #L3##v2041320# #r奖励领取#l\r\n\r\n";
			text += "        #L2##v3994588# #r副本征集令#k" + maxjinbi + "金币/次#l\r\n\r\n";
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
        } else {
            var party = cm.getParty().getMembers();
            var inMap = cm.partyMembersInMap();
            var levelValid = 0;
            for (var i = 0; i < party.size(); i++) {
                if (party.get(i).getLevel() >= minLevel && party.get(i).getLevel() <= maxLevel)
                    levelValid++;
            }
            if (inMap < minPartySize || inMap > maxPartySize) {
                cm.sendOk("你的队伍人数不足"+minPartySize+"人.请把你的队伍人员召集高校在进入副本.");
                cm.dispose();
				return;
            } else if (levelValid != inMap) {
                cm.sendOk("请确保你的队伍里所有人员都在本地图，且最小等级在 "+minLevel+" 和 "+maxLevel+"之间.");
                cm.dispose();
				return;
	        }else if (cm.getPlayer().getBossLogD("枫之高校") == cishuxianzhi) {//判断组队是否2次
	            cm.sendOk("队伍中队友挑战次数已经用完"+ cishuxianzhi +"次！");
                cm.dispose();
				return;
			}else if( cm.getPlayer().getBossLog("枫之高校") > cishuxianzhi) {
	            cm.sendOk("您好,限定每天只能挑战"+ cishuxianzhi +"次！");
                cm.dispose();
				return;
		        //}else if(day%3!=0) {
					//cm.sendOk("只能在3的整数倍日期（如1月3号,2月12号）挑战");
				} else {
	cm.getPlayer().setBossLog("枫之高校");//给团队次数
	// cm.warpParty(744000001, 0);
	cm.start_DojoAgent1(false, true);
//}
       cm.dispose();
}
}
} else if (selection == 2) {
            if (cm.getMeso() >= maxjinbi){//判断多少金币
                cm.gainMeso(- maxjinbi );//扣除多少金币
				cm.全服黄色喇叭(cm.getPlayer().getName() + " [副本征集令]" + " : " + "[" + fbmc + "]我已经在副本门口，需要勇士一起组队完成！");
                cm.dispose();
                }else{
                    cm.sendOk("你的冒险币不足" + maxjinbi + "。无法发送征集令");
                    cm.dispose();
    }
			} else if (selection == 3) {
			    cm.dispose();
            	cm.openNpc(9330165, 2);
}}}