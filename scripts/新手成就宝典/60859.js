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
			text += "#r查看人物装备#k\r\n";
			text += "第一步：按E打开角色装备栏\r\n";
            text += "第二步：选中武器进行双击脱下\r\n";
            text += "第三步：鼠标放到背包-装备栏-武器上查看武器属性\r\n";
            text += "#b（每次升级记得加技能加能力值！！！！）\r\n";
            qm.askAcceptDecline(text);
        } else if (status == 1) {
			var text ="";
			text += "#r查看人物装备#k\r\n";
			text += "第一步：按E打开角色装备栏\r\n";
            text += "第二步：双击武器脱下\r\n";
            text += "第三步：鼠标放到背包-装备栏-武器上查看武器属性\r\n";
            // text += "#r接任务后#b按Q打开任务栏，可以查看正在进行的任务与奖励\r\n";
            text += "快去按照提示完成任务把！！";
			text += "#b（每次升级记得加技能加能力值！！！！）\r\n";
            qm.forceStartQuest();
            qm.sendOk(text);
			qm.循环播放动画("Effect/OnUserEff.img/guideEffect/aranTutorial/ui0",3000,3);
			// qm.循环播放动画("Effect/OnUserEff.img/guideEffect/aranTutorial/ui10",5500,3);
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
            if (qm.getMapId() != 0) {
				
				qm.sendNext("真棒！点击下项完成任务领取你的奖励吧");  
            } else {
				var text ="";
				text += "按I打开背包找到特殊栏-双击宠物召唤出来    \r\n";
                text += "即可完成任务    \r\n";
                qm.sendNext(text);
                qm.dispose();
				return;
            }
        } else if (status == 1) {
			qm.循环播放动画("Effect/OnUserEff.img/guideEffect/aranTutorial/ui0",3000,3);
			qm.gainExp(3000);
			qm.gainMeso(100000)
			qm.forceCompleteQuest();
            qm.dispose();
			qm.openQuest(9900001,60860);
        
        }
    }
}