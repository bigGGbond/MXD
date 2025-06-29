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
			var text ="";
			text += "#r任务七：战斗准备#k\r\n";
            text += "第一步：按I打开背包\r\n";
            text += "第二步：点击装备栏\r\n";
            text += "第三步：双击穿戴背包里下列装备\r\n";
			text += "#v1050287##v1082149##v1122007##v1072786##v1102563#\r\n";
			text += "#b（按Q可查看正在进行的任务与奖励）\r\n";
            qm.askAcceptDecline(text);
        } else if (status == 1) {
			var text ="";
			text += "#r任务七：战斗准备#k\r\n";
            text += "第一步：按I打开背包\r\n";
            text += "第二步：点击装备栏\r\n";
            text += "第三步：双击穿戴所有新手装备\r\n";
            text += "快去按照提示完成任务把！！";
            qm.forceStartQuest();
            qm.sendOk(text);
			qm.循环播放动画("Effect/OnUserEff.img/guideEffect/aranTutorial/ui0",3000,3);
			// qm.循环播放动画("Effect/OnUserEff.img/guideEffect/aranTutorial/ui9",5500,5);
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
            if (qm.getPlayer().getPower() >= 1000) {//qm.getPlayerStat("HP")
				qm.sendNext("真棒！点击下项完成任务领取你的奖励吧");  
            } else {
                qm.sendOk("按I打开背包，穿戴所有装备");
				// qm.循环播放动画("Effect/OnUserEff.img/guideEffect/aranTutorial/ui9",5500,3);
                qm.dispose();
				return;
            }
        } else if (status == 1) {
			qm.循环播放动画("Effect/OnUserEff.img/guideEffect/aranTutorial/ui0",3000,3);
			qm.gainExp(560);
			// qm.gainItem(1142131,1)
			qm.gainPet(5000066,"啊呜啊呜", 1, 0, 100, 1, 1);
			qm.forceCompleteQuest();
            qm.dispose();
			qm.openQuest(9900001,60857);
			
        
        }
    }
}