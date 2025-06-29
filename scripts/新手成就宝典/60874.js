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
			text += "  兑换一次经验币  \r\n";
            text += "  快捷菜单-打造大厅-材料兑换-经验币兑换#v4310079#*1   \r\n";
            qm.askAcceptDecline(text);
        } else if (status == 1) {
			var text ="";
			text += "  兑换一次经验币  \r\n";
            text += "  快捷菜单-打造大厅-材料兑换-经验币兑换#v4310079#*1   \r\n";
            text += "快去按照提示完成任务把！！";
            qm.forceStartQuest();
            qm.sendOk(text);
			qm.循环播放动画("Effect/OnUserEff.img/guideEffect/aranTutorial/ui0",3000,3);
			
        } else if (status == 2) {
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
            // if (qm.getInventory(5).isFull(1)) {
				// qm.sendNext("#r 特殊栏 空间不足 2格");
				// qm.dispose();
				// return;
			// }
            if (qm.haveItem(4310079,1)) {
				
				qm.sendNext("不错！学得很好，做得很好。给你拿好，这是答应给你的奖励！！");  
            } else {
				var text ="";
				text += "  兑换一次经验币  \r\n";
				text += "  快捷菜单-打造大厅-材料兑换-经验币兑换#v4310079#*1   \r\n";
				text += "#v4310079#*1放入背包 即可完成任务    \r\n";
                qm.sendNext(text);
                qm.dispose();
				return;
            }
        } else if (status == 1) {
			qm.循环播放动画("Effect/OnUserEff.img/guideEffect/aranTutorial/ui0",3000,3);
			qm.gainExp(1550000);
			qm.gainMeso(1000000);
			// qm.gainItem(5211060,1,3)
			// qm.gainItem(2022000,100)
			 qm.gainItem(1112424,1)
			qm.forceCompleteQuest();
            qm.dispose();
			qm.openQuest(9900001,60875);
        
        }
    }
}