// 鞋子材料数据 - 每个数组第一个元素是材料ID，后面材料数量
var 一阶鞋子材料 = [4033106, 21, 38, 69, 148, 262];
var 二阶鞋子材料 = [4500402, 19, 34, 62, 135, 238];
var 三阶鞋子材料 = [4500403, 17, 31, 57, 123, 216];
var 四阶鞋子材料 = [4500404, 16, 28, 52, 112, 197];
var 五阶鞋子材料 = [4500405, 14, 26, 47, 101, 179];
var 六阶鞋子材料 = [4500406, 13, 24, 43, 92, 162];
var 七阶鞋子材料 = [4500407, 12, 21, 39, 84, 148];
var 八阶鞋子材料 = [4500408, 11, 19, 35, 76, 134];
var 九阶鞋子材料 = [4500409, 10, 18, 32, 69, 122];
var 十阶鞋子材料 = [4500410, 9, 16, 29, 63, 111];
var 十一阶鞋子材料 = [4500411, 8, 15, 27, 57, 101];
var 十二阶鞋子材料 = [4500412, 7, 13, 24, 52, 92];
var 十三阶鞋子材料 = [4500413, 7, 12, 22, 47, 83];


// 将所有鞋子材料数据组织成一个数组
var 鞋子材料列表 = [
    {name: "一阶鞋子材料", data: 一阶鞋子材料},
    {name: "二阶鞋子材料", data: 二阶鞋子材料},
    {name: "三阶鞋子材料", data: 三阶鞋子材料},
    {name: "四阶鞋子材料", data: 四阶鞋子材料},
    {name: "五阶鞋子材料", data: 五阶鞋子材料},
    {name: "六阶鞋子材料", data: 六阶鞋子材料},
    {name: "七阶鞋子材料", data: 七阶鞋子材料},
    {name: "八阶鞋子材料", data: 八阶鞋子材料},
    {name: "九阶鞋子材料", data: 九阶鞋子材料},
    {name: "十阶鞋子材料", data: 十阶鞋子材料},
    {name: "十一阶鞋子材料", data: 十一阶鞋子材料},
    {name: "十二阶鞋子材料", data: 十二阶鞋子材料},
    {name: "十三阶鞋子材料", data: 十三阶鞋子材料}
];

// 礼包等级和对应奖励
var 礼包等级 = ["200", "400", "800", "2000", "4000"];
var 黄金枫叶数量 = [4, 8,16, 40,80];
var 暗影币数量 = [0, 1, 2, 4, 8];
var 金币数量 = [400000, 800000, 1600000, 4000000, 8000000];

var status;
var selectedEquip; // 存储用户选择的装备索引
var selectedLevel; // 存储用户选择的等级索引

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

    if (status == 0) {
        var text = "\t\t\t\t#e鞋子材料礼包购买系统#n\r\n\r\n";
        text += "您可以在此处购买各种鞋子材料礼包！\r\n\r\n";
       //text += "提示：每个鞋子材料的每个等级礼包只能购买一次，购买完当前等级才能解锁下一等级！\r\n\r\n";
        
        // 用于生成礼包描述的函数
        var getPackageDesc = function(equipIndex, levelIndex) {
            var equipData = 鞋子材料列表[equipIndex].data;
            var materialId = equipData[0];
            var materialCount = equipData[levelIndex + 1];
            var mapleCount = 黄金枫叶数量[levelIndex];
            var coinCount = 暗影币数量[levelIndex];
            var mesoCount = 金币数量[levelIndex];
            
            var desc = "#v" + materialId + "# x #b" + materialCount + "#k, ";
            desc += "#v4500033# x #b" + mapleCount + "#k, "; // 黄金枫叶
            desc += "#v4500034# x #b" + coinCount + "#k, "; // 暗影币
            desc += "金币 x #b" + mesoCount/10000 + "万#k";
            
            //if (isCurrent) {
            desc = "#L" + (equipIndex * 2) + "##r" + desc + "#k#l\r\n";
            // } else {
            //     //desc = "#d" + desc + "#k #d(下一等级)#k";
            // }
            
            return desc;
        };
        
        // 构建鞋子材料列表，每行显示两个equip
        for (var i = 0; i < 鞋子材料列表.length; i += 2) {
            var equip1 = 鞋子材料列表[i];
            var equip2 = (i + 1 < 鞋子材料列表.length) ? 鞋子材料列表[i + 1] : null;
            
            // 获取equip1的购买进度
            var progressKey1 = "鞋子材料礼包购买进度_" + i;
            var 购买进度1 = cm.getOneTimeLog(progressKey1) || 0;
            
            // equip1行
            text += "#b" + equip1.name + "#k  购买进度: #e" + 购买进度1 + "/5#n\r\n";
            
            if (购买进度1 < 5) {
                // 当前可购买等级
                text += "   " + getPackageDesc(i, 购买进度1, true) + "\r\n";
                
                // // 下一等级（如果有）
                // if (购买进度1 < 4) {
                //     text += "   " + getPackageDesc(i, 购买进度1 + 1, false) + "\r\n";
                // } else {
                //     text += "   #d已是最顶级#k\r\n";
                // }
            } else {
                text += "   #r已完成所有等级购买#k\r\n";
            }
            
            text += "\r\n";
            
            //equip2行（如果存在）
            if (equip2) {
                var progressKey2 = "鞋子材料礼包购买进度_" + (i + 1);
                var 购买进度2 = cm.getOneTimeLog(progressKey2) || 0;
                
                text += "#b" + equip2.name + "#k  购买进度: #e" + 购买进度2 + "/5#n\r\n";
                
                if (购买进度2 < 5) {
                    // 当前可购买等级
                    text += "   " + getPackageDesc(i + 1, 购买进度2, true) + "\r\n";
                    
                    // 下一等级（如果有）
                    // if (购买进度2 < 4) {
                    //     text += "   " + getPackageDesc(i + 1, 购买进度2 + 1, false) + "\r\n";
                    // } else {
                    //     text += "   #d已是最顶级#k\r\n";
                    // }
                } else {
                    text += "   #r已完成所有等级购买#k\r\n";
                }
                
                text += "\r\n";
            }
        }
        
        cm.sendSimple(text);
    } else if (status == 1) {
        // 解析用户选择
        selectedequip = Math.floor(selection / 2);
        var equipData = 鞋子材料列表[selectedequip];
        
        if (!equipData) {
            cm.sendOk("选择无效，请重新选择。");
            cm.dispose();
            return;
        }
        
        // 获取该equip的购买进度
        var progressKey = "鞋子材料礼包购买进度_" + selectedequip;
        var 购买进度 = cm.getOneTimeLog(progressKey) || 0;
        
        // 验证是否可购买
        if (购买进度 >= 5) {
            cm.sendOk("您已经购买完该equip的所有等级礼包！");
            cm.dispose();
            return;
        }
        
        selectedLevel = 购买进度;
        var price = 礼包等级[selectedLevel];
        var materialId = equipData.data[0];
        var materialCount = equipData.data[selectedLevel + 1];
        var mapleCount = 黄金枫叶数量[selectedLevel];
        var coinCount = 暗影币数量[selectedLevel];
        var mesoCount = 金币数量[selectedLevel];
        
        // 确认购买
        var confirmText = "您确定要购买 #r" + equipData.name + "#k 的 #r" + price + "元宝#k 礼包吗？\r\n";
        confirmText += "礼包内容:\r\n";
        confirmText += "- #v" + materialId + "# x #b" + materialCount + "#k\r\n";
        confirmText += "- #v4500033# x #b" + mapleCount + "#k (黄金枫叶)\r\n";
        confirmText += "- #v4500034# x #b" + coinCount + "#k (暗影币)\r\n";
        confirmText += "- 金币 x #b" + mesoCount/10000 + "万#k\r\n";
        
        cm.sendYesNo(confirmText);
    } else if (status == 2) {
        if (selection === 1) { // 用户选择"否"
            cm.sendOk("已取消购买。");
            cm.dispose();
            return;
        }
        
        var equipData = 鞋子材料列表[selectedequip];
        var progressKey = "鞋子材料礼包购买进度_" + selectedequip;
        var 购买进度 = cm.getOneTimeLog(progressKey) || 0;
        
        // 再次验证购买进度
        if (购买进度 !== selectedLevel) {
            cm.sendOk("购买状态已变更，请重新选择。");
            cm.dispose();
            return;
        }
        
        var price = parseInt(礼包等级[selectedLevel]);
        
        // 检查玩家是否有足够的元宝
        if (cm.getPlayer().getzb() < price) {
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
        cm.getPlayer().gainzb(-price);
        
        // 给予物品
        var materialId = equipData.data[0];
        var materialCount = equipData.data[selectedLevel + 1];
        var mapleCount = 黄金枫叶数量[selectedLevel];
        var coinCount = 暗影币数量[selectedLevel];
        var mesoCount = parseInt(金币数量[selectedLevel]);
        
        cm.gainItem(materialId, materialCount);
        cm.gainItem(4500033, mapleCount); // 黄金枫叶
        cm.gainItem(4500034, coinCount); // 暗影币
        cm.gainMeso(mesoCount); // 金币
        
        // 更新购买进度
        cm.deleteOneTimeLog(progressKey);
        cm.setOneTimeLog(progressKey, 购买进度 + 1);
        
        cm.sendOk("购买成功！您已获得 #r" + equipData.name + "#k 的 #r" + 
                 礼包等级[selectedLevel] + "元宝#k 礼包。");
        status=-2;
        action(1,0,0);
        //cm.dispose();
    }
}