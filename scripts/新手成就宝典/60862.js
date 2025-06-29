
var status = -1;
var 地图 = [
50000,889100100,104040001,104040002,

];
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
			qm.gainOneTimeLog("任务60862",1);
			var text ="";
			text += "  去战斗  \r\n";
            text += "  通过右边光圈按上到战斗地图 \r\n";
            qm.askAcceptDecline(text);
        } else if (status == 1) {
			var text ="";
			text += "  去战斗  \r\n";
            text += "  通过右边光圈按上到战斗地图\r\n";
            text += "#b（每次升级记得加技能加能力值！！！！）\r\n";
            qm.forceStartQuest();
            qm.sendOk(text);
			// qm.循环播放动画("Effect/OnUserEff.img/guideEffect/aranTutorial/ui17",3500,3);
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
            if (地图.indexOf(qm.getMapId()) >-1) {
				
				qm.sendNext("真棒！点击下项完成任务领取你的奖励吧");  
            } else {
				var text ="";
				text += "  去战斗  \r\n";
				text += "  通过右边光圈按上传送到战斗地图\r\n";
				text += "即可完成任务    \r\n";
                qm.sendOk(text);
				// qm.循环播放动画("Effect/OnUserEff.img/guideEffect/aranTutorial/ui17",3500,3);
                qm.dispose();
				return;
            }
        } else if (status == 1) {
			qm.循环播放动画("Effect/OnUserEff.img/guideEffect/aranTutorial/ui0",3000,3);
			qm.gainExp(20000);
			// qm.gainPet(5000066,"啊呜啊呜", 1, 0, 100, 1, 1);
			// qm.gainMeso(330000);
			qm.gainItem(2022003,100)
			qm.gainItem(2022000,100)
			qm.gainItem(2022336,1)
			qm.spawnMonster(100100,5)
			qm.spawnMonster(210100,5)
			qm.forceCompleteQuest();
            qm.dispose();
			qm.openQuest(9900001,60863);
        
        }
    }
}