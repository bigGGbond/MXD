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
			text += "  枫叶武器  \r\n";
            text += "  按I打开背包，找到装备栏，双击领取职业武器穿戴到身上   \r\n";
			text += "#b（每次升级记得按K加技能！！！！）\r\n";
            qm.askAcceptDecline(text);
        } else if (status == 1) {
			var text ="";
			text += "  枫叶武器  \r\n";
            text += "  按I打开背包，找到装备栏，双击领取职业武器穿戴到身上   \r\n";
            text += " #b快去按照提示完成任务把！！";
            qm.forceStartQuest();
            qm.sendOk(text);
			qm.循环播放动画("Effect/OnUserEff.img/guideEffect/aranTutorial/ui0",3000,3);
			// qm.循环播放动画("Effect/OnUserEff.img/guideEffect/aranTutorial/ui12",6500,3);
			// qm.openNpc(2022552,0);
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
            if (qm.getInventory(5).isFull(1)) {
				qm.sendNext("#r 特殊栏 空间不足 2格");
				qm.dispose();
				return;
			}
            if (qm.haveItem(2022552) || qm.haveItem(1302030) || qm.haveItem(1412011) || qm.haveItem(1422014) || qm.haveItem(1432012) || qm.haveItem(1442024) || qm.haveItem(1382012) || qm.haveItem(1452022) || qm.haveItem(1462019) || qm.haveItem(1472032) || qm.haveItem(1332025) || qm.haveItem(1482020) || qm.haveItem(1492020)  ) {
				var text ="";
				text += "  枫叶武器  \r\n";
				text += "  第一步：按I打开背包\r\n";
				text += "  第二步：选择装备栏，双击职业武器穿戴到身上   \r\n";
				text += "  #b赶紧按照提示去完成吧\r\n";
				text += "#b（每次升级记得加技能加能力值！！！！）\r\n";
                // qm.循环播放动画("Effect/OnUserEff.img/guideEffect/aranTutorial/ui12",6500,3);
				qm.sendOk(text);
				qm.dispose();
				return;
            } else {
				var text ="";
				text += "  枫叶武器  \r\n";
				text += "  按I打开背包，找到消耗栏，双击领取职业武器穿戴到身上   \r\n";
				text += "即可完成任务    \r\n";
                qm.sendOk(text);
				
            }
        } else if (status == 1) {
			qm.循环播放动画("Effect/OnUserEff.img/guideEffect/aranTutorial/ui0",3000,3);
			qm.gainExp(2500);
			qm.gainPet(5000066,"啊呜啊呜", 1, 0, 100, 1, 1);
			// qm.gainMeso(7000);
			// qm.gainItem(2022552,1)
			qm.forceCompleteQuest();
            qm.dispose();
			qm.openQuest(9900001,60859);
        
        }
    }
}