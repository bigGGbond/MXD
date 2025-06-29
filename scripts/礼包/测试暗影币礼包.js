var 暗影币礼包数据 = {
    "暗影币": {
        "500": {
            "items": [
                {
                    "name": "暗影币",
                    "code": "4500034",
                    "count": 18
                },
                {
                    "name": "黄金枫叶",
                    "code": "4500033",
                    "count": 10
                },
                {
                    "name": "金币",
                    "code": "",
                    "count": 1500000
                }
            ]
        },
        "1000": {
            "items": [
                {
                    "name": "暗影币",
                    "code": "4500034",
                    "count": 33
                },
                {
                    "name": "黄金枫叶",
                    "code": "4500033",
                    "count": 20
                },
                {
                    "name": "金币",
                    "code": "",
                    "count": 3000000
                }
            ]
        },
        "2000": {
            "items": [
                {
                    "name": "暗影币",
                    "code": "4500034",
                    "count": 59
                },
                {
                    "name": "黄金枫叶",
                    "code": "4500033",
                    "count": 40
                },
                {
                    "name": "金币",
                    "code": "",
                    "count": 6000000
                }
            ]
        }
    }
};

var status;
var selectedPrice; // 存储用户选择的价格
var 礼包等级 = ["500", "1000", "2000"]; // 礼包等级顺序

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
        return;
    }
    if (mode == 1) {
        status++;
    } else {
        status--;
        if (status < 0) {
            cm.dispose();
            return;
        }
    }
    //cm.deleteOneTimeLog("暗影币礼包购买进度");
    // 获取玩家购买进度
    var 购买进度 = cm.getOneTimeLog("暗影币礼包购买进度") || 0;
    //cm.getPlayer().dropMessage(5,status);
    if (status == 0) {
        // 如果已经购买所有礼包
        if (购买进度 >= 礼包等级.length) {
            cm.sendOk("您已经购买了所有等级的暗影币礼包，没有更多可购买的礼包了！\r\n\r\n");
            cm.dispose();
            return;
        }
        
        var text = "\t\t\t\t#e暗影币礼包购买系统#n\r\n\r\n";
        text += "您可以在此处购买#r暗影币礼包#k！\r\n\r\n";
       // text += "提示：每个等级的礼包只能购买一次，购买完当前等级才能解锁下一等级！\r\n\r\n";
        
        // 显示当前购买进度
        text += "您的购买进度: ";
        if (购买进度 == 0) {
            text += "#r尚未购买任何等级的暗影币礼包#k\r\n";
        } else {
            text += "已购买 #e" + 购买进度 + "#n 个等级的礼包\r\n";
        }
        
        text += "\r\n#b可购买的礼包:#k\r\n";
        
        // 只显示当前可购买礼包
        var currentPrice = 礼包等级[购买进度];
        var currentPackage = 暗影币礼包数据.暗影币[currentPrice];
        
        text += "#L0##e" + currentPrice + "元宝礼包 礼包内含以下道具#n \r\n";
        text += "\t#v"+currentPackage.items[0].code+"# x #b" + currentPackage.items[0].count + "#k";
        text += " #v"+currentPackage.items[1].code+"# x #b" + currentPackage.items[1].count + "#k";
        text += " 金币 x #b" + currentPackage.items[2].count/10000 + "万#k\r\n";
        //text += " #r(当前可购买)#k";
        text += "#l\r\n";
        
        // 检查是否有下一级礼包
        // if (购买进度 + 1 < 礼包等级.length) {
        //     var nextPrice = 礼包等级[购买进度 + 1];
        //     var nextPackage = 暗影币礼包数据.暗影币[nextPrice];
            
        //     text += "#e" + nextPrice + "元宝礼包#n - ";
        //     text += "#v"+nextPackage.items[0].code+"# x #b" + nextPackage.items[0].count + "#k, ";
        //     text += "#v"+nextPackage.items[1].code+"# x #b" + nextPackage.items[1].count + "#k, ";
        //     text += "金币 x #b" + nextPackage.items[2].count + "#k";
        //     text += " #d(下一等级)#k";
        //     text += "\r\n";
        // } else {
        //     text += "\r\n\r\n#r您已经达到最高等级礼包！#k\r\n";
        // }
        
        cm.sendSimple(text);
    } else if (status == 1) {
        // 验证选择是否有效
        if (selection !== 0) {
            cm.sendOk("选择无效，请重新选择。");
            cm.dispose();
            return;
        }
        
        var 购买进度 = cm.getOneTimeLog("暗影币礼包购买进度") || 0;
        
        // 获取当前可购买礼包的价格
        selectedPrice = 礼包等级[购买进度];
        var packageData = 暗影币礼包数据.暗影币[selectedPrice];
        
        // 确认购买
        cm.sendYesNo("您确定要购买 #r" + selectedPrice + "元宝#k 的暗影币礼包吗？\r\n" +
                     "礼包内容:\r\n" +
                     "- #v"+packageData.items[0].code+"# x #b" + packageData.items[0].count + "#k\r\n" +
                     "- #v"+packageData.items[1].code+"# x #b" + packageData.items[1].count + "#k\r\n" +
                     "- 金币 x #b" + packageData.items[2].count/10000 + "万#k");
    } else if (status == 2) {
        // 用户选择"否"则退出
        if (selection === 1) {
            cm.sendOk("已取消购买。");
            cm.dispose();
            return;
        }
        
        var 购买进度 = cm.getOneTimeLog("暗影币礼包购买进度") || 0;
        var packageData = 暗影币礼包数据.暗影币[selectedPrice];
        
        // 检查玩家是否有足够的元宝
        if (cm.getPlayer().getzb() < parseInt(selectedPrice)) {
            cm.sendOk("您的元宝不足，无法购买此礼包。");
            cm.dispose();
            return;
        }
        // 检查背包空间
        if (cm.getSpace(1) < 1 || cm.getSpace(2) < 1 || cm.getSpace(3) < 1 || cm.getSpace(4) < 1) {
            cm.sendOk("#e背包空间不足,确保每栏都有1个空位置！#k#n\r\n请清理背包后再尝试购买。");
            cm.dispose();
            return;
        }
        
        // 扣除元宝
        cm.getPlayer().gainzb(-parseInt(selectedPrice));
        
        // 给予物品
        for (var i = 0; i < packageData.items.length; i++) {
            var item = packageData.items[i];
            if (item.code) {
                // 有代码的物品
                cm.gainItem(item.code, item.count);
            } else {
                // 金币
                cm.gainMeso(item.count);
            }
        }
        
        // 更新购买进度
        cm.deleteOneTimeLog("暗影币礼包购买进度");
        cm.setOneTimeLog("暗影币礼包购买进度", 购买进度 + 1);
        
        cm.sendOk("购买成功！您已获得 #r" + selectedPrice + "元宝#k 的暗影币礼包。");
        status=-2;
        action(1,0,0);
        //cm.dispose();
    }
}