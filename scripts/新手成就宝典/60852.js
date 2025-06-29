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
			text += "#r任务三：技能快捷释放#k\r\n";
            text += "第一步：按K打开技能栏\r\n";
            text += "第二步：按1打开键盘设置\r\n";
            text += "第三步：鼠标左键单击蜗牛投掷术，拖动到你想要设置的键位\r\n";
            text += "第四步：点击确定完成快捷键设置\r\n";
			text += "#b（按Q可查看正在进行的任务与奖励）\r\n";
			// text += "#r接任务后#b按Q打开任务栏，可以查看正在进行的任务与奖励\r\n";
            qm.askAcceptDecline(text);
        } else if (status == 1) {
			var text ="";
			text += "#r任务三：技能快捷释放#k\r\n";
            text += "第一步：按K打开技能栏\r\n";
            text += "第二步：按1打开键盘设置\r\n";
            text += "第三步：鼠标左键单击蜗牛投掷术，拖动到你想要设置的键位\r\n";
            text += "第四步：点击确定完成快捷键设置\r\n";
            qm.forceStartQuest();
            qm.sendOk(text);
			// qm.循环播放动画("Effect/OnUserEff.img/guideEffect/aranTutorial/ui5",8000,5);
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
            if (qm.getPlayer().getSkillLevel(1000) <= 0) {//qm.getPlayerStat("HP")
                qm.sendOk("请按K打开技能栏，移动到快捷键位上");
			    // qm.循环播放动画("Effect/OnUserEff.img/guideEffect/aranTutorial/ui5",8000,3);
                qm.dispose();
				return;
            } else {
                qm.sendNext("真棒！点击下项完成任务领取你的奖励吧");
				qm.循环播放动画("Effect/OnUserEff.img/guideEffect/aranTutorial/ui0",3000,3);
            }
        } else if (status == 1) {
			qm.gainExp(57);
			qm.gainOneTimeLog("任务33333333",1);
            qm.forceCompleteQuest();
            qm.dispose();
			qm.openQuest(9900001,60853);
        
        }
    }
}