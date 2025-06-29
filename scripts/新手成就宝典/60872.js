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
			qm.gainOneTimeLog("任务60872",1);
			
			var text ="";
			text += "  击杀一次蘑菇王，提交蘑菇王孢子  \r\n";
            text += "  快捷菜单-便捷传送-BOSS传送-蘑菇王，击杀以后提交BOSS材料#v4000040#*1   \r\n";
            qm.askAcceptDecline(text);
        } else if (status == 1) {
			var text ="";
			text += "  击杀一次蘑菇王，提交蘑菇王孢子  \r\n";
            text += "  快捷菜单-便捷传送-BOSS传送-蘑菇王，击杀以后提交BOSS材料#v4000040#*1   \r\n";
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
			// if (qm.getInventory(1).isFull(1)) {
				// qm.sendNext("#r装备栏 空间不足 2格");
				// qm.dispose();
				// return;
			// }
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
            if (qm.haveItem(4000040,1)) {
				
				qm.sendNext("不错！学得很好，做得很好。给你拿好，这是答应给你的奖励！！");  
            } else {
				var text ="";
				text += "  击杀一次蘑菇王，提交蘑菇王孢子  \r\n";
            text += "  快捷菜单-便捷传送-BOSS传送-蘑菇王，击杀以后提交BOSS材料#v4000040#*1   \r\n";
            text += "即可完成任务    \r\n";
                qm.sendNext(text);
                qm.dispose();
				return;
            }
        } else if (status == 1) {
			qm.循环播放动画("Effect/OnUserEff.img/guideEffect/aranTutorial/ui0",3000,3);
			qm.gainItem(4000040,-1);
			qm.gainExp(1080000);
			qm.gainMeso(1000000);
			// qm.gainItem(5211060,1,3)
			// qm.gainItem(2022000,100)
			// qm.gainItem(2022336,1)
			qm.forceCompleteQuest();
            qm.dispose();
			qm.openQuest(9900001,60873);
        
        }
    }
}