/* Author: Xterminator (Modified by RMZero213)
	NPC Name: 		Roger
	Map(s): 		Maple Road : Lower level of the Training Camp (2)
	Description: 		Quest - Roger's Apple
	任务 - 罗杰和苹果
*/
var status = -1;

function start(mode, type, selection) {
    if (mode == -1) {
        qm.dispose();
    } else {
        if (mode == 1) {
            status++;
        } else {
            status--;
        }
		if (status == 0) {
			qm.gainOneTimeLog("任务60869",1);
			
			var text ="";
			text += "  升级一次野怪戒指  \r\n";
            text += "  打开新手宝典-新手打造-打造地图\r\n";
			text += "  点击饰品打造NPC ,升级一次 #v1112423# \r\n";
			text += "#b（每次升级记得加技能加能力值！！！！）\r\n";
            qm.askAcceptDecline(text);
        } else if (status == 1) {
			var text ="";
			text += "  升级一次野怪戒指  \r\n";
            text += "  打开新手宝典-新手打造-打造地图\r\n";
			text += "  点击饰品打造NPC ,升级一次 #v1112423# \r\n";
			text += "#b（每次升级记得加技能加能力值！！！！）\r\n";
            qm.forceStartQuest();
            qm.sendOk(text);
			// qm.循环播放动画("Effect/OnUserEff.img/guideEffect/aranTutorial/ui21",6500,3);
			qm.循环播放动画("Effect/OnUserEff.img/guideEffect/aranTutorial/ui0",3000,3);
            qm.dispose();
        }
    }
}

function end(mode, type, selection) {
    if (mode == -1) {
        qm.dispose();
    } else {
        if (mode == 1) {
            status++;
        } else {
            status--;
        }
        if (status == 0) {
			if (qm.getInventory(1).isFull(1)) {
				qm.sendNext("#r装备栏 空间不足 2格");
				qm.dispose();
				return;
			}
            // if (qm.getInventory(2).isFull(2)) {
				// qm.sendNext("#r 消耗 栏 空间不足 3格");
				// qm.dispose();
				// return;
			// }
            // if (qm.getInventory(4).isFull(1)) {
				// qm.sendNext("#r 其他栏 空间不足 2格");
				// qm.dispose();
				// return;
			// }
            if (qm.getInventory(5).isFull(1)) {
				qm.sendNext("#r 特殊栏 空间不足 2格");
				qm.dispose();
				return;
			}
			if(qm.getInventory(1).getItem(1)== null ){
				qm.sendOk("装备栏第一格不是  #v1112423#");
				qm.dispose();
				return;
			}
			if(qm.getInventory(1).getItem(1).getItemId()!= 1112423 ){
				qm.sendOk("装备栏第一格不是  #v1112423#");
				qm.dispose();
				return;
			}
			if(qm.getInventory(1).getItem(1).getOwner() == "" || qm.getInventory(1).getItem(1).getOwner()==null){
				qm.sendOk("请去强化 #v1112423#");
				qm.dispose();
				return;
			}
			
            if (qm.getLevel()>=30 ) {
				
				qm.sendNext("真棒！点击下项完成任务领取你的奖励吧");  
            } else {
				var text ="";
				text += "  升级一次野怪戒指  \r\n";
                text += "  打开新手宝典-新手打造-打造地图\r\n";
			    text += "  点击饰品打造NPC ,升级一次 #v1112423# \r\n";
			    text += "#b（每次升级记得加技能加能力值！！！！）\r\n";
                qm.sendOk(text);
				// qm.循环播放动画("Effect/OnUserEff.img/guideEffect/aranTutorial/ui21",6500,3);
                qm.dispose();
				return;
            }
        } else if (status == 1) {
			qm.循环播放动画("Effect/OnUserEff.img/guideEffect/aranTutorial/ui0",3000,3);
			qm.gainExp(620000);
			// qm.gainMeso(1000000);
			qm.gainItem(5360000,1,3);
			qm.forceCompleteQuest();
            qm.dispose();
			qm.openQuest(9900001,60870);
        
        }
    }
}