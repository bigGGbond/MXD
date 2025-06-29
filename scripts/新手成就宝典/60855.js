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
			text += "#r任务六：第一次吃药#k\r\n";
			text += "第一步：接受任务后按I打开背包\r\n";
			text += "第二步：找到消耗栏，双击使用#v2000000#，#v2000003#\r\n";
            text += "第三步：点击人物头顶灯泡提交任务\r\n";
            text += "#b（按Q可查看正在进行的任务与奖励）\r\n";
            qm.askAcceptDecline(text);
        } else if (status == 1) {
			var text ="";
			text += "#r任务六：第一次吃药#k\r\n";
			text += "第一步：接受任务后按I打开背包\r\n";
			text += "第二步：找到消耗栏，双击使用#v2000000#，#v2000003#\r\n";
            text += "第三步：点击人物头顶灯泡提交任务\r\n";
            text += "请按照提示完成任务";
            qm.forceStartQuest();
            qm.sendOk(text);
			qm.循环播放动画("Effect/OnUserEff.img/guideEffect/aranTutorial/ui0",3000,5);
			// qm.循环播放动画("Effect/OnUserEff.img/guideEffect/aranTutorial/ui7",4500,5);
			qm.getPlayer().setHp(30);
			qm.getPlayer().setMp(30);
			if(qm.haveItem(2000000)){
				// qm.gainItem(2000002,1)
			}
			if(qm.haveItem(2000003)){
				// qm.gainItem(2000006,1)
			}
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
            if (qm.getPlayerStat("HP") < 50) {//qm.getPlayerStat("HP")
                qm.sendOk("请按I打开消耗栏，双击使用红蓝药水，恢复HPMP");
			    // qm.循环播放动画("Effect/OnUserEff.img/guideEffect/aranTutorial/ui7",4500,3);
                qm.dispose();
				return;
            }else if (qm.getPlayerStat("MP") < 50) {//qm.getPlayerStat("HP")
                qm.sendOk("请按I打开消耗栏，双击使用红蓝药水，恢复HPMP");
			    // qm.循环播放动画("Effect/OnUserEff.img/guideEffect/aranTutorial/ui7",4500,3);
                qm.dispose();
				return;
            } else {
                qm.sendNext("真棒！点击下项完成任务领取你的奖励吧");
				qm.循环播放动画("Effect/OnUserEff.img/guideEffect/aranTutorial/ui0",3000,3);
            }
        } else if (status == 1) {
			qm.gainExp(372);
			qm.gainItem(2000002,500);
			qm.gainItem(2000006,500);
            qm.forceCompleteQuest();
            qm.dispose();
			qm.openQuest(9900001,60856);
        
        }
    }
}