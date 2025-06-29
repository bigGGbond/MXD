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
			text += "#r任务五：第一次打怪#k\r\n";
            text += "第一步：接受任务\r\n";
            text += "第二步：使用蜗牛投掷术击杀小石球\r\n";
            text += "第三步：按Z拾取道具后提交完成任务#v4031802#   \r\n";
			text += "#b（按Q可查看正在进行的任务与奖励）\r\n";
            qm.askAcceptDecline(text);
        } else if (status == 1) {
			var text ="";
			text += "#r任务五：第一次打怪#k\r\n";
            text += "第一步：接受任务\r\n";
            text += "第二步：使用蜗牛投掷术击杀小石球\r\n";
            text += "第三步：按Z拾取道具#v4031802#   \r\n";
            text += "第四步：点击头顶灯泡提交任务   \r\n";
            qm.forceStartQuest();
            qm.sendOk(text);
			// qm.spawnMonster(100100,5)
			qm.循环播放动画("Effect/OnUserEff.img/guideEffect/aranTutorial/ui0",3000,5);
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
            if (!qm.haveItem(4031802,1) ) {//qm.getPlayerStat("HP")
                qm.sendOk("击杀石球，按Z拾取道具后提交石球壳#v4031802#");
			    // qm.循环播放动画("Effect/OnUserEff.img/guideEffect/aranTutorial/ui6",4500,5);
                qm.dispose();
				return;
            } else {
                qm.sendNext("真棒！点击下项完成任务领取你的奖励吧");
				qm.循环播放动画("Effect/OnUserEff.img/guideEffect/aranTutorial/ui0",3000,3);
            }
        } else if (status == 1) {
			qm.gainItem(4031802,-1);
            qm.gainExp(135);
            qm.gainItem(2000000,1);
            qm.gainItem(2000003,1);
            qm.forceCompleteQuest();
            qm.dispose();
			qm.openQuest(9900001,60855);
        
        }
    }
}