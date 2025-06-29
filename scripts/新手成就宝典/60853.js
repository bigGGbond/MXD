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
			text += "#r任务四：第一次过图#k\r\n";
            text += "按照地图提示移动到下个地图   \r\n";
			text += "#b（按Q可查看正在进行的任务与奖励）\r\n";
			// text += "#r接任务后#b按Q打开任务栏，可以查看正在进行的任务与奖励\r\n";
            qm.askAcceptDecline(text);
        } else if (status == 1) {
			var text ="";
			text += "#r任务四：第一次过图#k\r\n";
            text += "按照地图提示移动到下个地图   \r\n";
            text += "快按照提示完成任务把！！";
            qm.forceStartQuest();
            qm.sendOk(text);
			// qm.循环播放动画("Effect/OnUserEff.img/guideEffect/aranTutorial/ui8",4000,5);
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
            if (qm.getMapId() != 10000) {//qm.getPlayerStat("HP")
				qm.sendNext("真棒！点击下项完成任务领取你的奖励吧");  
            } else {
                qm.sendOk("按照地图提示移动到下个地图");
				// qm.循环播放动画("Effect/OnUserEff.img/guideEffect/aranTutorial/ui8",4000,3);
                qm.dispose();
				return;
            }
        } else if (status == 1) {
			qm.gainExp(72);
			qm.forceCompleteQuest();
            qm.dispose();
			qm.openQuest(9900001,60854);
        
        }
    }
}