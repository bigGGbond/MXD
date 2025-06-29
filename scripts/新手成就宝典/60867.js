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
			qm.gainOneTimeLog("任务60867",1);
			
			var text ="";
			text += "  传送到符合你等级的地图进行打怪  \r\n";
            text += "  打开I背包-新手宝典-便捷传送-升级传送-选地图去升级   \r\n";
			text += "#b（每次升级记得加技能加能力值！！！！）\r\n";
            qm.askAcceptDecline(text);
        } else if (status == 1) {
			var text ="";
			text += "  传送到符合你等级的地图进行打怪  \r\n";
            text += "  打开I背包-新手宝典-便捷传送-升级传送-选地图去升级   \r\n";
            text += "#b（每次升级记得加技能加能力值！！！！）\r\n";
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
            if (qm.getLevel()>=30 ) {
				
				qm.sendNext("真棒！点击下项完成任务领取你的奖励吧");  
            } else {
				var text ="";
			text += "  传送到符合你等级的地图进行打怪  \r\n";
            text += "  打开I背包-找到消耗栏-双击快捷菜单石-便捷传送-升级传送-选地图去升级   \r\n";
            text += "#b（每次升级记得加技能加能力值！！！！）\r\n";
                qm.sendNext(text);
                qm.dispose();
				return;
            }
        } else if (status == 1) {
			qm.循环播放动画("Effect/OnUserEff.img/guideEffect/aranTutorial/ui0",3000,3);
			qm.gainExp(440000);
			qm.gainMeso(1000000);
			qm.gainItem(1112423,1);
			qm.gainItem(4031579,200);
			qm.forceCompleteQuest();
			qm.openQuest(9900001,60868);
            qm.dispose();
        
        }
    }
}