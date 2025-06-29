var 框横 = "#fUI/ChatBalloon.img/pet/25/s#";
var 框左 = "#fUI/ChatBalloon.img/pet/25/sw#";
var 框右 = "#fUI/ChatBalloon.img/pet/25/se#";
var 灰 = "#fUI/UIWindow.img/PersonalShop/BtBan/normal/0#";
var 亮 = "#fUI/UIWindow.img/PartySearch/check1#";
var 金币 = "#fUI/UIWindow.img/Item/BtCoin/normal/0#";
var 点券 = "#fUI/UIWindow.img/Item/BtCoin/normal/0#";
var 抵用 = "#fUI/UIWindow.img/Item/BtCoin/normal/0#";
var ca = java.util.Calendar.getInstance();
var 年 = ca.get(java.util.Calendar.YEAR);
var 月 = ca.get(java.util.Calendar.MONTH) + 1;
var 日 = ca.get(java.util.Calendar.DATE);
var 时 = ca.get(java.util.Calendar.HOUR_OF_DAY);
var 分 = ca.get(java.util.Calendar.MINUTE);
var 秒 = ca.get(java.util.Calendar.SECOND);
var 周 = ca.get(java.util.Calendar.DAY_OF_WEEK) - 1;
var 任务简述 = "#fUI/UIWindow/Quest/summary#";
var 彩虹 = "#fEffect/ItemEff/1071085/effect/walk1/2#";
var 金币 = "#fUI/UIWindow.img/Item/BtCoin/normal/0#";
var 点券 = "#fUI/UIWindow.img/Item/BtCoin/normal/0#";
var 抵用 = "#fUI/UIWindow.img/Item/BtCoin/normal/0#";
var 蓝箭头 = "#fUI/UIWindow.img/itemSearch/BtRight/normal/0#";
var 蓝条 = "#fUI/Basic/Notice5/c#";
var 红心 = "#fEffect/ItemEff.img/5110000/1#";
var 抽奖数组 = [
    [2340000, 1,   1 , 158, 3000],
    [4000313, 1,  159, 248, 300],
    [4000313, 3,  249, 318, 500],
    [4000313, 5,  319, 358, 50],
    [2022522, 2,  359, 424, 50],
    [2022522, 4,  425, 464, 500],
    [2022522, 6,  465, 479, 100],
    [4021009, 1,  480, 549, 30000],
    [4021009, 2,  550, 569, 30000],
    [4021009, 3,  570, 579, 30000],
    [4011007, 1,  580, 649, 30000],
    [4011007, 2,  650, 669, 30000],
    [4011007, 3,  670, 679, 30000],
    [4000487, 1,  680, 759, 30000],
    [4000487, 2,  760, 809, 10],
    [4000487, 3,  810, 819, 30000],
    [2022582, 1,  820, 841, 30000],
    [2022582, 2,  842, 851, 30000],
    [2022582, 4,  852, 856, 30000],
    [1902045, 1,  857, 861, 300],
    [1112901, 1,  862, 873, 300],
    [1002186, 1,  874, 876, 300],
    [1012057, 1,  877, 879, 300],
    [1102039, 1,  880, 882, 300],
    [1072153, 1,  883, 885, 300],
    [1032024, 1,  886, 888, 300],
    [1132258, 1,  889, 891, 300],
    [1022048, 1,  892, 894, 300],
    [1082102, 1,  895, 897, 300],
    [4000313, 1,  898, 900, 300],
    [4001266, 10, 901, 950, 1],
    [4001266, 20, 951, 985, 1],
    [4001266, 30, 986, 1000, 1]
];                     
var 盒子代码 = 2022467;
var 次数;
function start() {
    status = -1;
    action(1, 0, 0);
}
function 唯一数组(arr) {
    var 唯一 = [];
    for (var i = 0; i < arr.length; i++) {
        if (唯一.indexOf(arr[i]) === -1) {
            唯一.push(arr[i]);
        }
    }
    return 唯一;
}



var 物品列表 = [2340000,4000313,4000313,4000313,2022522,2022522,2022522,4021009,4021009,4021009,4011007,4011007,4011007,4000487,4000487,4000487,2022582,2022582,2022582,1032024,1002186,1012057,1102039,1072153,1022048,1082102,4001266,4001266,4001266,1902045,1112901,1132258];
var 去重结果 = 唯一数组(物品列表);
function action(mode, type, selection) {
    var c = cm.getPlayer();
    if (mode == -1) {
        cm.dispose();
    } else {
        if (status >= 0 && mode == 0) {
            cm.sendOk("感谢你的光临！");
            cm.dispose();
            return;
        }
        if (mode == 1) {
            status++;
        } else {
            status--;
        }
        if (status == 0) {
            次数 = cm.itemQuantity(盒子代码) >= 10 ? 10 : 1;
            var a = 0;
            var text = "";
            text += "#w";
            text += "" + 框横 + 框横 + 框横 + 框横 + 框横 + 框横 + 框横 + 框横 + 框横 + "#r#e『抽奖盒子』#k" + 框横 + 框横 + 框横 + 框横 + 框横 + 框横 + 框横 + 框横 + "#n";
            text += "\r\n"
            text += "#k冒险家 #b#h # #k你好，我是抽奖盒子！\r\n"
            text += "" + 蓝条 + "\r\n";
            text += "\r\n";
            text += "\r\n";
            text += "抽奖箱可获得以下物品，完全随机，看脸#l\r\n"
            text += "\r\n";
            text += "#b奖池详情：\r\n";
            text += "\r\n";
            for (var i in 去重结果) {
                for (var j in 抽奖数组) {
                    if (去重结果[0] == 抽奖数组[j][0]) {
                        text += "#i" + 去重结果[i] + ":# 参考价： " + length(抽奖数组[i][4], 6) + "元宝#l"
                        a++;
                        if (a % 2 == 0) {
                            text += "\r\n";
                        }
                    }
                }
            }
			
            text += "\r\n";
            text += "" + 框左 + 框横 + 框横 + 框横 + 框横 + 框横 + 框横 + 框横 + 框横 + 框横 + 框横 + 框横 + 框横 + 框横 + 框横 + 框横 + 框横 + 框横 + 框横 + 框横 + 框横 + 框横 + 框右 + "#n\r\n\r\n";
			if (cm.itemQuantity(盒子代码)>=10) {
                cm.sendYesNo("检测到10个#v"+盒子代码+"#，将进行十连抽！\r\n"+text);
            } else {
                cm.sendYesNo("检测到不足10个#v"+盒子代码+"#，将进行单抽！\r\n"+text);
            }
            // cm.sendSimple(text);
        } else if (status == 1) {
			if(cm.itemQuantity(盒子代码)<次数){
				cm.sendOk("你似乎没有["+次数+"]个#v"+盒子代码+"#");
				cm.dispose();
				return;
			}
            if (cm.getInventory(1).isFull(次数 - 1)) {
                cm.sendOk("#b请保证装备栏位至少有10个空格,否则无法进行操作.");
                cm.dispose();
                return;
            }
            if (cm.getInventory(2).isFull(次数 - 1)) {
                cm.sendOk("#b请保证消耗栏位至少有10个空格,否则无法进行操作.");
                cm.dispose();
                return;
            }
            if (cm.getInventory(4).isFull(次数 - 1)) {
                cm.sendOk("#b请保证其它栏位至少有10个空格,否则无法进行操作.");
                cm.dispose();
                return;
            }
			cm.gainItem(盒子代码,-次数);
            var text = "";
            text += "#w";
            for (var ai = 0; ai < 次数; ai++) {
                var 成功率 = Math.floor(Math.random() * 1000) + 1;
                var 新数组 = Array();
                for (var i = 0; i < 抽奖数组.length; i++) {
                    if (成功率 >= 抽奖数组[i][2] && 成功率 <= 抽奖数组[i][3]) {
                        新数组.push(抽奖数组[i]);
                    }
                }
                if (新数组.length != 0) {
                    var random = new java.util.Random();
                    var finalchance = random.nextInt(新数组.length);
                    var itemId = 新数组[finalchance][0];
                    var quantity = 新数组[finalchance][1];
                    var type = "" + itemId;
                    var type = type.substr(0, 1);
                    cm.itemlabaB(""+cm.getPlayer().getName()+"", "恭喜玩家使用"+次数+"连抽获得珍宝", itemId, 15);
                    // cm.getPlayer().dropMessage(5, "恭喜玩家使用" + 次数 + "连抽获得珍宝");
                    cm.gainItem(itemId, quantity);
                    // cm.gainItem(4310002, 1); // 国庆币
                    text += "#v" + itemId + "##t" + itemId + "# x " + quantity + " \r\n";
                }
            }
            cm.sendOk("#k#r获得道具如下#k:\r\n\r\n" + text + "\r\n\r\n");
            cm.dispose();
        }
    }
}
function length(text, num) {//空格
    var curLength = text.toString().length;
    if (curLength < num) {
        for (var i = 0; i < num - curLength; i++) {
            text += " ";
        }
    }
    return text;
}