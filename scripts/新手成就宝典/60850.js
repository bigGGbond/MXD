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
			text += "送你一本新手宝典#v2022564#，双击打开领取新手礼包\r\n";
            // text += "#r按i打开背包-消耗栏-双击新手宝典#v2022564#，领取新手礼包";
			qm.客户端按键("I");
            qm.askAcceptDecline(text);
        } else if (status == 1) {
			var text ="";
			text += "领取新手礼包#v2022575#\r\n";
            text += "按I打开背包双击新手宝典#v2022564#，领取新手礼包\r\n\r\n";
            text += "快去按照提示完成任务把！！";
            qm.forceStartQuest();
            qm.gainItem(2022564, 1); // 给予玩家新手宝典
            qm.sendOk("按I打开背包-消耗栏-双击新手宝典#v2022564#，领取新手礼包");
			// qm.循环播放动画("Effect/OnUserEff.img/guideEffect/aranTutorial/ui3",4500,3);
			qm.循环播放动画("Effect/OnUserEff.img/guideEffect/aranTutorial/ui0",3000,3);
			// qm.客户端按键("I");
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
            if (qm.getOneTimeLog("新手礼包") <= 0) {//qm.getPlayerStat("HP")
                qm.sendOk("你还没领取新手礼包呢哦\r\n\r\n按I打开背包双击新手宝典，领取新手礼包。领取了以后再来找我吧");
			    // qm.循环播放动画("Effect/OnUserEff.img/guideEffect/aranTutorial/ui3",4500,3);
                qm.dispose();
				return;
            } else {
                qm.sendNext("领取礼包。#v2022564#");
            }
        } else if (status == 1) {
            qm.sendNextPrev("你真棒！点击#r下项#k完成任务领取你的奖励！！");
        } else if (status == 2) {
			qm.gainExp(15);
            qm.forceCompleteQuest();
			qm.循环播放动画("Effect/OnUserEff.img/guideEffect/aranTutorial/ui0",3000,3);
            qm.dispose();
			qm.openQuest(9900001,60851);
        
        }
    }
}