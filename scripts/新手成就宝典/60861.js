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
			text += "  加一转技能点  \r\n";
            text += "  按K加完升级送给你的技能点   \r\n";
			text += "#b（每次升级记得加技能加能力值！！！！）\r\n";
            qm.askAcceptDecline(text);
        } else if (status == 1) {
			var text ="";
			text += "  加一转技能点  \r\n";
            text += "  按K加完每次升级送给你的技能点   \r\n";
            text += "快去按照提示完成任务把！！";
            qm.forceStartQuest();
            qm.sendOk(text);
			qm.循环播放动画("Effect/OnUserEff.img/guideEffect/aranTutorial/ui0",3000,3);
			// qm.循环播放动画("Effect/OnUserEff.img/guideEffect/aranTutorial/ui14",5000,3);
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
            if (qm.getInventory(2).isFull(1)) {
				qm.sendNext("#r 消耗 栏 空间不足 2格");
				qm.dispose();
				return;
			}
            if (qm.getInventory(4).isFull(1)) {
				qm.sendNext("#r 其他栏 空间不足 2格");
				qm.dispose();
				return;
			}
            if (qm.getInventory(5).isFull(1)) {
				qm.sendNext("#r 特殊栏 空间不足 2格");
				qm.dispose();
				return;
			}
            if (qm.getPlayerStat("RSP") <= 0) {
				
				qm.sendNext("真棒！点击下项完成任务领取你的奖励吧");  
            } else {
				var text ="";
				text += "  加一转技能点  \r\n";
				text += "  按K加完升级送给你的技能点   \r\n";
				text += "  即可完成任务    \r\n";
                qm.sendOk(text);
				// qm.循环播放动画("Effect/OnUserEff.img/guideEffect/aranTutorial/ui14",5000,3);
                qm.dispose();
				return;
            }
        } else if (status == 1) {
			qm.循环播放动画("Effect/OnUserEff.img/guideEffect/aranTutorial/ui0",3000,3);
			qm.gainExp(10000);
			qm.gainNX(100);
			// qm.gainPet(5000066,"啊呜啊呜", 1, 0, 100, 1, 1);
			 // qm.gainMeso(330000);
			// qm.gainItem(2022552,1)
			qm.forceCompleteQuest();
            qm.dispose();
			qm.openQuest(9900001,60862);
        
        }
    }
}