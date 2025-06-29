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
			text += "第一次加技能点\r\n";
            text += "按K打开技能栏，升级蜗牛投掷术\r\n";
            text += "#b（按Q可查看正在进行的任务与奖励\r\n";
            // text += "#b（接受任务后）\r\n";
            qm.askAcceptDecline(text);
        } else if (status == 1) {
			var text ="";
			text += "任务二：第一次加技能点\r\n";
            text += "第一步：点确定关闭对话框\r\n\r\n";
            text += "第二步：按K打开技能栏，升级蜗牛投掷术\r\n\r\n";
            text += "请按照提示完成任务";
            qm.forceStartQuest();
            qm.sendOk(text);
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
            if (qm.getPlayer().getSkillLevel(1000) <= 0) {//qm.getPlayerStat("HP")
                qm.sendOk("请按K打开技能栏，提升蜗牛投掷术的等级");
			    // qm.循环播放动画("Effect/OnUserEff.img/guideEffect/aranTutorial/ui4",4500,3);
                qm.dispose();
				return;
            } else {
                qm.sendNext("真棒！点击下项完成任务领取奖励吧");
				qm.循环播放动画("Effect/OnUserEff.img/guideEffect/aranTutorial/ui0",3000,3);
            }
        } else if (status == 1) {
			qm.gainExp(34);
            qm.forceCompleteQuest();
            qm.dispose();
			qm.openQuest(9900001,60852);
        
        }
    }
}