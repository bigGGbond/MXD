var status = -1;
var reqItem = 5600001; // 周卡/月卡标识物品
var ItemList = [
    [0, 1500, 1], // 点券奖励
    [2, 500, 2], // 交易积分
    [2000019, 20, 3], // 奶酪
    [4001266, 50, 4], // 劳动奖章
    [4021009, 2, 5], // 星石
    [4011007, 2, 6], // 月石
    [2022504, 2, 7], // 洗血水
    // [5510000, 1, 8], // 洗血水
    [4310100, 1, 10]// 奖励币
];
var itemListTime = [
    [1115025, 1, 12], // 时限装备
    [5211060, 1, 3], // 三倍经验
    [2022529, 1, 3], // 幸运符
    [1122017, 1, 24]// 时限项链
];
var 数据 = [
    {
        id: 1143028,名字:"人级勋章",
        道具: [{ id: 4032766, 数量: 2 }],
        // 限时道具: [{ id: 1112901, 数量: 1, 小时: 30 }]
    },
    {
        id: 1143021,名字:"王级勋章",
        道具: [{ id: 4032766, 数量: 5 }],
      // 1 限时道具: [{ id: 1115025, 数量: 1, 小时: 30 }, { id: 5211060, 数量: 1, 小时: 30 }, { id: 2022529, 数量: 1, 小时: 30 }, { id: 4000004, 数量: 1, 小时: 30 }, { id: 1122017, 数量: 1, 小时: 30 }]
    },
	{
        id: 1142612,名字:"神级勋章",
        道具: [{ id: 4032766, 数量: 10}],
      // 2 限时道具: [{ id: 1115025, 数量: 1, 小时: 30 }, { id: 5211060, 数量: 1, 小时: 30 }, { id: 2022529, 数量: 1, 小时: 30 }, { id: 4000004, 数量: 1, 小时: 30 }, { id: 1122017, 数量: 1, 小时: 30 }]
    },
	{
        id: 1142524,名字:"圣级勋章",
        道具: [{ id: 4032766, 数量: 20 } ],
      // 3 限时道具: [{ id: 1115025, 数量: 1, 小时: 30 }, { id: 5211060, 数量: 1, 小时: 30 }, { id: 2022529, 数量: 1, 小时: 30 }, { id: 4000004, 数量: 1, 小时: 30 }, { id: 1122017, 数量: 1, 小时: 30 }]
    },
	{
        id: 1143043,名字:"天级勋章",
        道具: [{ id: 4032766, 数量: 35 } ],
      // 4 限时道具: [{ id: 1115025, 数量: 1, 小时: 30 }, { id: 5211060, 数量: 1, 小时: 30 }, { id: 2022529, 数量: 1, 小时: 30 }, { id: 4000004, 数量: 1, 小时: 30 }, { id: 1122017, 数量: 1, 小时: 30 }]
    },
	{
        id: 1142745,名字:"祖级勋章",
        道具: [{ id: 4032766, 数量: 50 } ],
      // 5 限时道具: [{ id: 1115025, 数量: 1, 小时: 30 }, { id: 5211060, 数量: 1, 小时: 30 }, { id: 2022529, 数量: 1, 小时: 30 }, { id: 4000004, 数量: 1, 小时: 30 }, { id: 1122017, 数量: 1, 小时: 30 }]
    },
	{
        id: 1143024,名字:"霸级勋章",
        道具: [{ id: 4032766, 数量: 75 } ],
      // 6 限时道具: [{ id: 1115025, 数量: 1, 小时: 30 }, { id: 5211060, 数量: 1, 小时: 30 }, { id: 2022529, 数量: 1, 小时: 30 }, { id: 4000004, 数量: 1, 小时: 30 }, { id: 1122017, 数量: 1, 小时: 30 }]
    },
	{
        id: 1142746,名字:"仙级勋章",
        道具: [{ id: 4032766, 数量: 100 } ],
      // 7 限时道具: [{ id: 1115025, 数量: 1, 小时: 30 }, { id: 5211060, 数量: 1, 小时: 30 }, { id: 2022529, 数量: 1, 小时: 30 }, { id: 4000004, 数量: 1, 小时: 30 }, { id: 1122017, 数量: 1, 小时: 30 }]
    },
	{
        id: 1143037,名字:"尊者级勋章",
        道具: [{ id: 4032766, 数量: 125 } ],
      // 8 限时道具: [{ id: 1115025, 数量: 1, 小时: 30 }, { id: 5211060, 数量: 1, 小时: 30 }, { id: 2022529, 数量: 1, 小时: 30 }, { id: 4000004, 数量: 1, 小时: 30 }, { id: 1122017, 数量: 1, 小时: 30 }]
    },
	{
        id: 1143012,名字:"星辰级勋章",
        道具: [{ id: 4032766, 数量: 150 } ],
      // 9 限时道具: [{ id: 1115025, 数量: 1, 小时: 30 }, { id: 5211060, 数量: 1, 小时: 30 }, { id: 2022529, 数量: 1, 小时: 30 }, { id: 4000004, 数量: 1, 小时: 30 }, { id: 1122017, 数量: 1, 小时: 30 }]
    },
	{
        id: 1142716,名字:"银河级勋章",
        道具: [{ id: 4032766, 数量: 175 } ],
      // 10 限时道具: [{ id: 1115025, 数量: 1, 小时: 30 }, { id: 5211060, 数量: 1, 小时: 30 }, { id: 2022529, 数量: 1, 小时: 30 }, { id: 4000004, 数量: 1, 小时: 30 }, { id: 1122017, 数量: 1, 小时: 30 }]
    },
	{
        id: 1143000,名字:"无量级勋章",
        道具: [{ id: 4032766, 数量: 200 } ],
      // 11 限时道具: [{ id: 1115025, 数量: 1, 小时: 30 }, { id: 5211060, 数量: 1, 小时: 30 }, { id: 2022529, 数量: 1, 小时: 30 }, { id: 4000004, 数量: 1, 小时: 30 }, { id: 1122017, 数量: 1, 小时: 30 }]
    },
	{
        id: 1143160,名字:"混沌级勋章",
        道具: [{ id: 4032766, 数量: 225 } ],
      // 12 限时道具: [{ id: 1115025, 数量: 1, 小时: 30 }, { id: 5211060, 数量: 1, 小时: 30 }, { id: 2022529, 数量: 1, 小时: 30 }, { id: 4000004, 数量: 1, 小时: 30 }, { id: 1122017, 数量: 1, 小时: 30 }]
    },
	{
        id: 1143159,名字:"破晓级勋章",
        道具: [{ id: 4032766, 数量: 250 } ],
      // 13 限时道具: [{ id: 1115025, 数量: 1, 小时: 30 }, { id: 5211060, 数量: 1, 小时: 30 }, { id: 2022529, 数量: 1, 小时: 30 }, { id: 4000004, 数量: 1, 小时: 30 }, { id: 1122017, 数量: 1, 小时: 30 }]
    },
	{
	    id: 1143115,名字:"黄昏级勋章",
        道具: [{ id: 4032766, 数量: 275 } ],
      // 14 限时道具: [{ id: 1115025, 数量: 1, 小时: 30 }, { id: 5211060, 数量: 1, 小时: 30 }, { id: 2022529, 数量: 1, 小时: 30 }, { id: 4000004, 数量: 1, 小时: 30 }, { id: 1122017, 数量: 1, 小时: 30 }]
    },
	{
        id: 1143194,名字:"黑洞级勋章",
        道具: [{ id: 4032766, 数量: 300 } ],
      // 13 限时道具: [{ id: 1115025, 数量: 1, 小时: 30 }, { id: 5211060, 数量: 1, 小时: 30 }, { id: 2022529, 数量: 1, 小时: 30 }, { id: 4000004, 数量: 1, 小时: 30 }, { id: 1122017, 数量: 1, 小时: 30 }]
    }
];
var 月卡地图ID = 390000000; // 月卡专属地图ID，请根据实际情况修改

var selectedOption = -1; // 用于记录用户选择的选项

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
	if(cm.getInventory(1).getItem(1)== null ){
		cm.sendOk("请把 勋章 放在装备栏第一格");
		cm.dispose();
		return;
	}
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
			
                var txt = "#w#r#L1##v" + reqItem + ":#一：购买周卡 - 花费 8888 元宝（7天）#l\r\n\r\n";
     txt += "#r#L2##v" + reqItem + ":#二：购买月卡 - 花费 29800 元宝（30天）#l\r\n\r\n";
	txt += "#L3##r#v" + reqItem + ":#点我领取每日福利#l\r\n\r\n";
	
    txt += "\r\n\r\n以下是周卡/月卡每日福利内容（领取的时候把勋章放背包）\r\n\r\n";
	txt += "#r注释:以装备栏第一格勋章 为领取奖励判断。\r\n\r\n";
 
    var itemIndex = 1;
    
    for (var i = 0; i < ItemList.length; i++) {
        txt += "(#r" + itemIndex++ + "#b):" + (getItemDescription(ItemList[i]) || "未知道具") + "\r\n";
    }
 
    
    for (var i = 0; i < itemListTime.length; i++) {
        var item = itemListTime[i];
        txt += "(#r" + itemIndex++ + "#b):#v" + item[0] + "##z" + item[0] + "#x" + item[1] + " [使用权:" + item[2] + "小时]\r\n";
    }
    
 
    txt += "#l\r\n";
    txt += "月卡地图进入权限(产出:祝福、金砖、枫叶等核心资源)\r\n";
	var itemida = cm.getInventory(1).getItem(1).getItemId();
	var 特特啊 = 0;
    for (var i = 0; i < 数据.length; i++) {
		var itemData = 数据[i];
		if( itemida == itemData.id){
         txt += "#r#e当前装备栏第1格勋章#n#b:#v" + itemData.id + "#" + itemData.名字 + "额外奖励：\r\n";
 
        for (var j = 0; j < itemData.道具.length; j++) {
            var subItem = itemData.道具[j];
            if (subItem.id === 0) {
                txt += "(#r" + (itemIndex++) + "#b)点卷，x: " + subItem.数量 + "\r\n";
            } else if (subItem.id === 1) {
                txt += "(#r" + (itemIndex++) + "#b)交易积分，x: " + subItem.数量 + "\r\n";
            } else {
                txt += "(#r" + (itemIndex++) + "#b)#v" + subItem.id + "##z" + subItem.id + "#x: " + subItem.数量 + "\r\n";
            }
        }
 
      /*   for (var k = 0; k < itemData.限时道具.length; k++) {
            var limitedItem = itemData.限时道具[k];
            txt += "(#r" + (itemIndex++) + "#v" + limitedItem.id + "##z" + limitedItem.id + "#x" + limitedItem.数量 + "  小时: " + limitedItem.小时 + ")\r\n";
        } */
 
        txt += "\r\n";
		特特啊 =1;
		break;
		}
    }
	if(特特啊==0){
		txt += "#r#e当前装备栏第一格没有勋章，所以无额外奖励领取#k#n\r\n";
	}
	txt+= "\r\n\r\n";
	txt +="#r#e第一格放置勋章的额外奖励展示如下：#b#n\r\n";
	for (var i = 0; i < 数据.length; i++) {
		var itemData = 数据[i];
		
         txt += "当前装备栏第1格勋章:#v" + itemData.id + "#" + itemData.名字 + "额外奖励：";
 
        for (var j = 0; j < itemData.道具.length; j++) {
            var subItem = itemData.道具[j];
            if (subItem.id === 0) {
                txt += "(#r" + (itemIndex++) + "#b)点卷，x: " + subItem.数量 + "\r\n";
            } else if (subItem.id === 1) {
                txt += "(#r" + (itemIndex++) + "#b)交易积分，x: " + subItem.数量 + "\r\n";
            } else {
                txt += "(#r" + (itemIndex++) + "#b)#v" + subItem.id + "##z" + subItem.id + "#x: " + subItem.数量 + "\r\n";
            }
        }
 
      /*   for (var k = 0; k < itemData.限时道具.length; k++) {
            var limitedItem = itemData.限时道具[k];
            txt += "(#r" + (itemIndex++) + "#v" + limitedItem.id + "##z" + limitedItem.id + "#x" + limitedItem.数量 + "  小时: " + limitedItem.小时 + ")\r\n";
        } */
 
        txt += "\r\n";
    }
    
    cm.sendSimple(txt);
        } else if (status == 1) {
            selectedOption = selection;
            if (selection == 1) {
                cm.sendYesNo("您确定要花费 8888 元宝购买周卡吗？（有效期7天）");
            } else if (selection == 2) {
                cm.sendYesNo("您确定要花费 29800 元宝购买月卡吗？（有效期30天）");
            } else if (selection == 3) {
                claimDailyReward();
            }
        } else if (status == 2) {
            if (selectedOption == 1) {
                purchaseCard("周卡", 8888, 24 * 7);
            } else if (selectedOption == 2) {
                purchaseCard("月卡", 29800, 24 * 30);
            }
        }
    }
}

function getItemDescription(item) {
    if (item[0] == 0) {
        return "点卷x" + item[1];
    } else if (item[0] == 2) {
        return "交易积分x" + item[1];
    } else {
        return "#v" + item[0] + "##z" + item[0] + "#x" + item[1];
    }
}






function purchaseCard(cardType, price, durationInHours) {
    if (cm.getPlayer().getzb() < price) {
        cm.sendOk("您的元宝不足，无法购买" + cardType + "。");
        cm.dispose();
    } else {
        cm.gainzb(-price); // 扣除元宝
        cm.gainItem(reqItem, 1, durationInHours); // 给予有时间限制的5600001物品
        cm.sendOk("成功购买" + cardType + "！已获得" + (durationInHours / 24) + "天有效的道具。");
        cm.喇叭(6, "[" + cardType + "] : 恭喜玩家" + cm.getPlayer().getName() + "购买了" + (durationInHours / 24) + "天的" + cardType + "！");
		if(price==29800){
			cm.gainAcLog("月卡开头",1);
		}
        cm.dispose();
    }
}

function claimDailyReward() {
    var currentHour = new Date().getHours();
    var currentMinute = new Date().getMinutes();
	if(cm.getInventory(1).getItem(1)== null ){
		cm.sendOk("请把 勋章 放在装备栏第一格,或者任意装备放第一格才能看到里面内容哦");
		cm.dispose();
		return;
	}
    if ((currentHour === 23 && currentMinute >= 45) || (currentHour === 0 && currentMinute <= 15)) {
        cm.sendOk("每天晚上 23:45 到 00:15 期间无法领取月卡福利，请在其他时间再来领取。");
        cm.dispose();
        return;
    }

     if (cm.getPlayer().getBossLog("每日月卡") >= 1) {
        cm.sendOk("今天已经领过了，请明天再来！");
        cm.dispose();
    } else if (!cm.haveItem(reqItem)) {
        cm.sendOk("你没有#v" + reqItem + "# #z" + reqItem + "#，无法领取每日福利。");
        cm.dispose();
    } else {
        if (!cm.canHoldByType(1, 5) || !cm.canHoldByType(2, 5) || !cm.canHoldByType(4, 5) || !cm.canHoldByType(5, 3)) {
            cm.sendOk("请确认所有背包栏位都有足够的空间。");
            cm.dispose();
            return;
        }
        for (var i = 0; i < ItemList.length; i++) {
            if (ItemList[i][0] == 0) {
                cm.gainNX(ItemList[i][1]);
            } else if (ItemList[i][0] == 2) {
                cm.setBossRankCount7("交易积分", ItemList[i][1]);
            } else {
                cm.gainItem(ItemList[i][0], ItemList[i][1]);
            }
        }
        for (var i = 0; i < itemListTime.length; i++) {
            if (itemListTime[i][0] == 1115025) {
                cm.给属性装备(1115025, 0, 0, 100, 100, 100, 100, 0, 0, 100, 100, 0, 0, 0, 0, 0, 0, 12);
            } else {
                cm.gainItem(itemListTime[i][0], itemListTime[i][1], itemListTime[i][2]);
            }
        }
		var itemida = cm.getInventory(1).getItem(1).getItemId();
        if (itemida == 数据[0].id) {
            for (var i = 0; i < 数据[0].道具.length; i++) {
                var item = 数据[0].道具[i];
                if (item.id === 0) {
                    cm.gainNX(item.数量);
                } else if (item.id === 1) {
                    cm.setBossRankCount7("交易积分", item.数量);
                } else {
                    cm.gainItem(item.id, item.数量);
                }
            }
           /*  for (var j = 0; j < 数据[0].限时道具.length; j++) {
                var timedItem = 数据[0].限时道具[j];
                cm.gainItem(timedItem.id, timedItem.数量, timedItem.小时);
            } */
        }
        if (itemida == 数据[1].id) {
            for (var i = 0; i < 数据[1].道具.length; i++) {
                var item = 数据[1].道具[i];
                if (item.id === 0) {
                    cm.gainNX(item.数量);
                } else if (item.id === 1) {
                    cm.setBossRankCount7("交易积分", item.数量);
                } else {
                    cm.gainItem(item.id, item.数量);
                }
            }

        }
		if (itemida == 数据[2].id) {
            for (var i = 0; i < 数据[2].道具.length; i++) {
                var item = 数据[2].道具[i];
                if (item.id === 0) {
                    cm.gainNX(item.数量);
                } else if (item.id === 1) {
                    cm.setBossRankCount7("交易积分", item.数量);
                } else {
                    cm.gainItem(item.id, item.数量);
                }
            }

        }
		if (itemida == 数据[3].id) {
            for (var i = 0; i < 数据[3].道具.length; i++) {
                var item = 数据[3].道具[i];
                if (item.id === 0) {
                    cm.gainNX(item.数量);
                } else if (item.id === 1) {
                    cm.setBossRankCount7("交易积分", item.数量);
                } else {
                    cm.gainItem(item.id, item.数量);
                }
            }
        }       
		if (itemida == 数据[4].id) {
            for (var i = 0; i < 数据[4].道具.length; i++) {
                var item = 数据[4].道具[i];
                if (item.id === 0) {
                    cm.gainNX(item.数量);
                } else if (item.id === 1) {
                    cm.setBossRankCount7("交易积分", item.数量);
                } else {
                    cm.gainItem(item.id, item.数量);
                }
            }
        }        
		if (itemida == 数据[5].id) {
            for (var i = 0; i < 数据[5].道具.length; i++) {
                var item = 数据[5].道具[i];
                if (item.id === 0) {
                    cm.gainNX(item.数量);
                } else if (item.id === 1) {
                    cm.setBossRankCount7("交易积分", item.数量);
                } else {
                    cm.gainItem(item.id, item.数量);
                }
            }
        }        
		if (itemida == 数据[6].id) {
            for (var i = 0; i < 数据[6].道具.length; i++) {
                var item = 数据[6].道具[i];
                if (item.id === 0) {
                    cm.gainNX(item.数量);
                } else if (item.id === 1) {
                    cm.setBossRankCount7("交易积分", item.数量);
                } else {
                    cm.gainItem(item.id, item.数量);
                }
            }
        }        
		if (itemida == 数据[7].id) {
            for (var i = 0; i < 数据[7].道具.length; i++) {
                var item = 数据[7].道具[i];
                if (item.id === 0) {
                    cm.gainNX(item.数量);
                } else if (item.id === 1) {
                    cm.setBossRankCount7("交易积分", item.数量);
                } else {
                    cm.gainItem(item.id, item.数量);
                }
            }
        }        
		if (itemida == 数据[8].id) {
            for (var i = 0; i < 数据[8].道具.length; i++) {
                var item = 数据[8].道具[i];
                if (item.id === 0) {
                    cm.gainNX(item.数量);
                } else if (item.id === 1) {
                    cm.setBossRankCount7("交易积分", item.数量);
                } else {
                    cm.gainItem(item.id, item.数量);
                }
            }
        }        
		if (itemida == 数据[9].id) {
            for (var i = 0; i < 数据[9].道具.length; i++) {
                var item = 数据[9].道具[i];
                if (item.id === 0) {
                    cm.gainNX(item.数量);
                } else if (item.id === 1) {
                    cm.setBossRankCount7("交易积分", item.数量);
                } else {
                    cm.gainItem(item.id, item.数量);
                }
            }
        }        
		if (itemida == 数据[10].id) {
            for (var i = 0; i < 数据[10].道具.length; i++) {
                var item = 数据[10].道具[i];
                if (item.id === 0) {
                    cm.gainNX(item.数量);
                } else if (item.id === 1) {
                    cm.setBossRankCount7("交易积分", item.数量);
                } else {
                    cm.gainItem(item.id, item.数量);
                }
            }
        }        
		if (itemida == 数据[11].id) {
            for (var i = 0; i < 数据[11].道具.length; i++) {
                var item = 数据[11].道具[i];
                if (item.id === 0) {
                    cm.gainNX(item.数量);
                } else if (item.id === 1) {
                    cm.setBossRankCount7("交易积分", item.数量);
                } else {
                    cm.gainItem(item.id, item.数量);
                }
            }
        }        
		if (itemida == 数据[12].id) {
            for (var i = 0; i < 数据[12].道具.length; i++) {
                var item = 数据[12].道具[i];
                if (item.id === 0) {
                    cm.gainNX(item.数量);
                } else if (item.id === 1) {
                    cm.setBossRankCount7("交易积分", item.数量);
                } else {
                    cm.gainItem(item.id, item.数量);
                }
            }
        }        
		if (itemida == 数据[13].id) {
            for (var i = 0; i < 数据[13].道具.length; i++) {
                var item = 数据[13].道具[i];
                if (item.id === 0) {
                    cm.gainNX(item.数量);
                } else if (item.id === 1) {
                    cm.setBossRankCount7("交易积分", item.数量);
                } else {
                    cm.gainItem(item.id, item.数量);
                }
            }
        }  
		if (itemida == 数据[14].id) {
            for (var i = 0; i < 数据[14].道具.length; i++) {
                var item = 数据[14].道具[i];
                if (item.id === 0) {
                    cm.gainNX(item.数量);
                } else if (item.id === 1) {
                    cm.setBossRankCount7("交易积分", item.数量);
                } else {
                    cm.gainItem(item.id, item.数量);
                }
            }
        }		
		if (itemida == 数据[15].id) {
            for (var i = 0; i < 数据[15].道具.length; i++) {
                var item = 数据[15].道具[i];
                if (item.id === 0) {
                    cm.gainNX(item.数量);
                } else if (item.id === 1) {
                    cm.setBossRankCount7("交易积分", item.数量);
                } else {
                    cm.gainItem(item.id, item.数量);
                }
            }
        }
		/* if (cm.haveItem(数据[14].id)) {
            for (var i = 0; i < 数据[14].道具.length; i++) {
                var item = 数据[14].道具[i];
                if (item.id === 0) {
                    cm.gainNX(item.数量);
                } else if (item.id === 1) {
                    cm.setBossRankCount7("交易积分", item.数量);
                } else {
                    cm.gainItem(item.id, item.数量);
                }
            }
        }      */       
        cm.getPlayer().setBossLog("每日月卡");
        cm.喇叭(6, "[月卡福利] : 恭喜玩家" + cm.getPlayer().getName() + "领取了每日月卡奖励，并获得进入月卡专属地图的权限！");
        cm.sendOk("领取成功，已发放今日月卡福利，并获得进入月卡专属地图的权限！");
        cm.dispose();
    }
}
