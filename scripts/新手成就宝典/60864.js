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
			text += "  第一次收集  \r\n";
            text += "  击杀小怪收集\r\n";
			text += "  收集小怪掉落的材料  \r\n";
			text += "  提交2个蜗牛壳#v4000019# ，2个绿液球#v4000004#    \r\n";
			text += "#b（每次升级记得加技能加能力值！！！！）\r\n";
            qm.askAcceptDecline(text);
        } else if (status == 1) {
			var text ="";
			text += "  第一次收集  \r\n";
            text += "  击杀小怪收集\r\n";
			text += "  收集小怪掉落的材料  \r\n";
			text += "  提交2个蜗牛壳#v4000019# ，2个绿液球#v4000004#    \r\n";
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
            if (qm.getInventory(2).isFull(2)) {
				qm.sendNext("#r 消耗 栏 空间不足 3格");
				qm.dispose();
				return;
			}
            if (qm.getInventory(4).isFull(1)) {
				qm.sendNext("#r 其他栏 空间不足 2格");
				qm.dispose();
				return;
			}
            if (qm.getInventory(5).isFull(1)) {
				qm.sendNext("#r 特殊栏 空间不足 2格");
				qm.dispose();
				return;
			}
            if (qm.haveItem(4000019,2) && qm.haveItem(4000004,2)) {
				
				qm.sendNext("真棒！点击下项完成任务领取你的奖励吧");  
            } else {
				var text ="";
				text += "  第一次收集  \r\n";
                text += "  击杀小怪收集\r\n";
			    text += "  收集小怪掉落的材料  \r\n";
			    text += "  提交2个蜗牛壳#v4000019# ，2个绿液球#v4000004#    \r\n";
                qm.sendNext(text);
                qm.dispose();
				return;
            }
        } else if (status == 1) {
			qm.循环播放动画("Effect/OnUserEff.img/guideEffect/aranTutorial/ui0",3000,3);
			qm.gainItem(4000019,-2);
			qm.gainItem(4000004,-2);
			qm.gainExp(93000);
			qm.gainDY(2000);
			// qm.gainPet(5000066,"啊呜啊呜", 1, 0, 100, 1, 1);
			// qm.gainMeso(330000);
			qm.gainItem(5211060,1,3)
			// qm.gainItem(2022000,100)
			// qm.gainItem(2022336,1)
			qm.forceCompleteQuest();
            qm.dispose();
			qm.openQuest(9900001,60865);
        
        }
    }
}