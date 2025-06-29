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
			qm.gainOneTimeLog("任务60858",1);
			var text ="";
			text += "#r任务八：职业选择#k\r\n";
			text += "第一步：按I打开背包\r\n";
            text += "第二步：选中消耗栏\r\n";
            text += "第三步：双击#v2022564#\r\n";
            text += "第四步：快捷转职\r\n";
            text += "#b（每次升级记得加技能！！！！）\r\n";
            qm.askAcceptDecline(text);
        } else if (status == 1) {
			var text ="";
			text += "#r任务八：职业选择#k\r\n";
			text += "第一步：按I打开背包\r\n";
            text += "第二步：选中消耗栏\r\n";
            text += "第三步：双击#v2022564#\r\n";
            text += "第四步：快捷转职\r\n";
            text += "#b（每次升级记得加！！！！）\r\n";
            qm.forceStartQuest();
            qm.sendOk(text);
			qm.循环播放动画("Effect/OnUserEff.img/guideEffect/aranTutorial/ui0",3000,3);
			// qm.循环播放动画("Effect/OnUserEff.img/guideEffect/aranTutorial/ui11",6500,3);
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
            if (qm.getJob() != 0) {
				
				qm.sendNext("真棒！点击下项完成任务领取你的奖励吧");   
            } else {
				var text ="";
				text += "第一步：按I打开背包\r\n";
				text += "第二步：选中消耗栏\r\n";
				text += "第三步：双击#v2022564#\r\n";
				text += "第四步：快捷转职\r\n";
				// text += "快去按照提示完成任务把！\r\n";
				// text += "\r\n";
                text += "转职后双击头顶灯泡完成任务\r\n";

                qm.sendOk(text);
				// qm.循环播放动画("Effect/OnUserEff.img/guideEffect/aranTutorial/ui11",6500,3);
                qm.dispose();
				return;
            }
        } else if (status == 1) {
			qm.循环播放动画("Effect/OnUserEff.img/guideEffect/aranTutorial/ui0",3000,3);
			 qm.gainExp(1500);
			qm.gainItem(2022552,1)
			qm.forceCompleteQuest();
            qm.dispose();
			qm.openQuest(9900001,60858);
			
        }
    }
}