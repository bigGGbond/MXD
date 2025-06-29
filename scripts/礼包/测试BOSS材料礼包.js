// BOSS材料数据 - 每个数组第一个元素是材料ID，后面5个是5个等级的材料数量
var 闹钟材料数量 = [4001084, 4, 7, 13, 27, 45];
var 扎昆材料数量 = [4001084, 4, 7, 12, 24, 41];
var 黑龙材料数量 = [4001085, 4, 7, 12, 24, 41];
var BOSS4材料数量 = [4500006, 3, 6, 10, 20, 34];
var BOSS5材料数量 = [4500007, 3, 5, 9, 18, 31];
var BOSS6材料数量 = [4500008, 3, 5, 8, 17, 28];
var BOSS7材料数量 = [4500009, 2, 4, 7, 15, 25];
var BOSS8材料数量 = [4500010, 2, 4, 7, 14, 23];
var BOSS9材料数量 = [4500011, 2, 3, 6, 13, 21];
var BOSS10材料数量 = [4500012, 2, 3, 6, 11, 19];
var BOSS11材料数量 = [4500013, 2, 3, 5, 10, 17];
var BOSS12材料数量 = [4500014, 1, 3, 5, 9, 16];
var BOSS13材料数量 = [4500015, 1, 2, 4, 9, 14];
var BOSS14材料数量 = [4500016, 1, 2, 4, 8, 13];

// 将所有BOSS材料数据组织成一个数组
var BOSS材料列表 = [
    {name: "闹钟材料", data: 闹钟材料数量},
    {name: "扎昆材料", data: 扎昆材料数量},
    {name: "黑龙材料", data: 黑龙材料数量},
    {name: "BOSS4材料", data: BOSS4材料数量},
    {name: "BOSS5材料", data: BOSS5材料数量},
    {name: "BOSS6材料", data: BOSS6材料数量},
    {name: "BOSS7材料", data: BOSS7材料数量},
    {name: "BOSS8材料", data: BOSS8材料数量},
    {name: "BOSS9材料", data: BOSS9材料数量},
    {name: "BOSS10材料", data: BOSS10材料数量},
    {name: "BOSS11材料", data: BOSS11材料数量},
    {name: "BOSS12材料", data: BOSS12材料数量},
    {name: "BOSS13材料", data: BOSS13材料数量},
    {name: "BOSS14材料", data: BOSS14材料数量}
];

// 礼包等级和对应奖励
var 礼包等级 = ["1000", "2000", "4000", "10000", "20000"];
var 黄金枫叶数量 = [2, 4, 8, 20, 40];
var 暗影币数量 = [20, 40, 80, 200, 400];
var 金币数量 = [2000000, 4000000, 8000000, 20000000, 40000000];

var status;
var selectedBoss; // 存储用户选择的BOSS索引
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
        var text = "\t\t\t\t#eBOSS材料礼包购买系统#n\r\n\r\n";
        text += "您可以在此处购买各种BOSS材料礼包！\r\n\r\n";
        //text += "提示：每个BOSS材料的每个等级礼包只能购买一次，购买完当前等级才能解锁下一等级！\r\n\r\n";
        
        // 用于生成礼包描述的函数
        var getPackageDesc = function(bossIndex, levelIndex) {
            var bossData = BOSS材料列表[bossIndex].data;
            var materialId = bossData[0];
            var materialCount = bossData[levelIndex + 1];
            var mapleCount = 黄金枫叶数量[levelIndex];
            var coinCount = 暗影币数量[levelIndex];
            var mesoCount = 金币数量[levelIndex];
            
            var desc = "#v" + materialId + "# x #b" + materialCount + "#k, ";
            desc += "#v4500033# x #b" + mapleCount + "#k, "; // 黄金枫叶
            desc += "#v4500034# x #b" + coinCount + "#k, "; // 暗影币
            desc += "金币 x #b" + mesoCount/10000 + "万#k";
            
            //if (isCurrent) {
            desc = "#L" + (bossIndex * 2) + "#" + desc + "#k#l\r\n";
            // } else {
            //     //desc = "#d" + desc + "#k #d(下一等级)#k";
            // }
            
            return desc;
        };
        
        // 构建BOSS材料列表，每行显示两个BOSS
        for (var i = 0; i < BOSS材料列表.length; i += 2) {
            var boss1 = BOSS材料列表[i];
            var boss2 = (i + 1 < BOSS材料列表.length) ? BOSS材料列表[i + 1] : null;
            
            // 获取BOSS1的购买进度
            var progressKey1 = "BOSS材料礼包购买进度_" + i;
            var 购买进度1 = cm.getOneTimeLog(progressKey1) || 0;
            
            // BOSS1行
            text += "#b" + boss1.name + "#k  购买进度: #e" + 购买进度1 + "/5#n\r\n";
            
            if (购买进度1 < 5) {
                // 当前可购买等级
                text += "   #k" + getPackageDesc(i, 购买进度1) + "\r\n";
                
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
            
            // BOSS2行（如果存在）
            // if (boss2) {
            //     var progressKey2 = "BOSS材料礼包购买进度_" + (i + 1);
            //     var 购买进度2 = cm.getOneTimeLog(progressKey2) || 0;
                
            //     text += "#b" + boss2.name + "#k  购买进度: #e" + 购买进度2 + "/5#n\r\n";
                
            //     if (购买进度2 < 5) {
            //         // 当前可购买等级
            //         text += "   " + getPackageDesc(i + 1, 购买进度2, true) + "\r\n";
                    
            //         // 下一等级（如果有）
            //         if (购买进度2 < 4) {
            //             text += "   " + getPackageDesc(i + 1, 购买进度2 + 1, false) + "\r\n";
            //         } else {
            //             text += "   #d已是最顶级#k\r\n";
            //         }
            //     } else {
            //         text += "   #r已完成所有等级购买#k\r\n";
            //     }
                
            //     text += "\r\n";
            // }
        }
        
        cm.sendSimple(text);
    } else if (status == 1) {
        // 解析用户选择
        selectedBoss = Math.floor(selection / 2);
        var bossData = BOSS材料列表[selectedBoss];
        
        if (!bossData) {
            cm.sendOk("选择无效，请重新选择。");
            cm.dispose();
            return;
        }
        
        // 获取该BOSS的购买进度
        var progressKey = "BOSS材料礼包购买进度_" + selectedBoss;
        var 购买进度 = cm.getOneTimeLog(progressKey) || 0;
        
        // 验证是否可购买
        if (购买进度 >= 5) {
            cm.sendOk("您已经购买完该BOSS的所有等级礼包！");
            cm.dispose();
            return;
        }
        
        selectedLevel = 购买进度;
        var price = 礼包等级[selectedLevel];
        var materialId = bossData.data[0];
        var materialCount = bossData.data[selectedLevel + 1];
        var mapleCount = 黄金枫叶数量[selectedLevel];
        var coinCount = 暗影币数量[selectedLevel];
        var mesoCount = 金币数量[selectedLevel];
        
        // 确认购买
        var confirmText = "您确定要购买 #r" + bossData.name + "#k 的 #r" + price + "元宝#k 礼包吗？\r\n";
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
        
        var bossData = BOSS材料列表[selectedBoss];
        var progressKey = "BOSS材料礼包购买进度_" + selectedBoss;
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
        var materialId = bossData.data[0];
        var materialCount = bossData.data[selectedLevel + 1];
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
        
        cm.sendOk("购买成功！您已获得 #r" + bossData.name + "#k 的 #r" + 
                 礼包等级[selectedLevel] + "元宝#k 礼包。");
        //cm.dispose();
        status=-2;
        action(1,0,0);
        //cm.dispose();
    }
}