/* ==================
 脚本类型: NPC	    
 脚本作者: 游戏盒团队-维多利亚 
 联系扣扣: 297870163
 =====================
 */

var status = -1;
var 选择材料类型;
var 选择材料阶数;
var 目标阶数;
var 最大阶数 = 10; // 材料最高可以到10阶

// 所有装备材料配置
var 材料列表 = [
    { 名称: "武器材料", 代码: 4500216 },
    { 名称: "饰品材料", 代码: 4500516 },
    { 名称: "神环材料", 代码: 4501116 },
    { 名称: "手套材料", 代码: 4500316 },
    { 名称: "腰带材料", 代码: 4500616 },
    { 名称: "坐骑材料", 代码: 4500916 },
    { 名称: "鞋子材料", 代码: 4500416 },
    { 名称: "披风材料", 代码: 4500816 }
];

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (status >= 0 && mode == 0) {
            cm.dispose();
            return;
        }
        if (mode == 1)
            status++;
        else
            status--;

        if (status == 0) {
            // 检查是否有礼包
            if (!cm.haveItem(2022539, 1)) {
                cm.sendOk("你没有#v2022539#装备材料任选礼包。");
                cm.dispose();
                return;
            }

            var text = "#e#d请选择你背包内要升阶的材料类别：#n#k\r\n\r\n";
            // 按照单列布局显示基础材料
            for (var i = 0; i < 材料列表.length; i++) {
                var 材料 = 材料列表[i];
                text += "#L" + i + "##b" + 材料.名称 + "#k\r\n";
                // 显示该类型所有阶数的材料数量
                for (var j = 1; j <= 最大阶数; j++) {
                    var itemId = 材料.代码 + j - 1;
                    var quantity = cm.itemQuantity(itemId);
                    if (quantity > 0) {
                        text += "#d" + j + "阶: #v" + itemId + "# x " + quantity + "#k  ";
                    }
                }
                text += "\r\n\r\n";
            }
            cm.sendSimple(text);
        }
        else if (status == 1) {
            选择材料类型 = selection;
            var 材料 = 材料列表[选择材料类型];
            var text = "#e#d请选择要升阶的材料：#n#k\r\n\r\n";
            
            // 显示玩家拥有的各阶材料
            for (var i = 1; i <= 最大阶数; i++) {
                var itemId = 材料.代码 + i - 1;
                var quantity = cm.itemQuantity(itemId);
                if (quantity > 0) {
                    text += "#L" + i + "##d" + i + "阶#v" + itemId + "# x " + quantity + "#k\r\n";
                }
            }
            
            if (text === "#e#d请选择要升阶的材料：#n#k\r\n\r\n") {
                cm.sendOk("你没有任何可以升阶的" + 材料.名称 + "。");
                cm.dispose();
                return;
            }
            
            cm.sendSimple(text);
        }
        else if (status == 2) {
            选择材料阶数 = selection;
            var 材料 = 材料列表[选择材料类型];
            var 当前材料ID = 材料.代码 + 选择材料阶数 - 1;
            
            if (选择材料阶数 >= 最大阶数) {
                cm.sendOk("该材料已达到最高阶数，无法继续升阶。");
                cm.dispose();
                return;
            }
            
            var text = "#e#d请选择要将#v" + 当前材料ID + "#升级到的目标阶数：#n#k\r\n";
            text += "#r(注意：升阶后将消耗掉原有材料，且过程不可逆)#k\r\n\r\n";
            
            // 显示可升级的目标阶数
            for (var i = 选择材料阶数 + 1; i <= 最大阶数; i++) {
                var targetId = 材料.代码 + i - 1;
                text += "#L" + i + "##d" + i + "阶#v" + targetId + "##k\r\n";
            }
            
            cm.sendSimple(text);
        }
        else if (status == 3) {
            目标阶数 = selection;
            var 材料 = 材料列表[选择材料类型];
            var 当前材料ID = 材料.代码 + 选择材料阶数 - 1;
            var 目标材料ID = 材料.代码 + 目标阶数 - 1;
            
            var text = "#e#r【警告】#n#k\r\n";
            text += "你确定要将#v" + 当前材料ID + "#升级为#v" + 目标材料ID + "#吗？\r\n";
            text += "此操作将消耗：\r\n";
            text += "1个#v2022539#装备材料任选礼包\r\n";
            text += "1个#v" + 当前材料ID + "#" + 选择材料阶数 + "阶" + 材料.名称 + "\r\n\r\n";
            text += "#r注意：该操作不可逆转，请确认后再继续。#k";
            
            cm.sendYesNo(text);
        }
        else if (status == 4) {
            var 材料 = 材料列表[选择材料类型];
            var 当前材料ID = 材料.代码 + 选择材料阶数 - 1;
            var 目标材料ID = 材料.代码 + 目标阶数 - 1;
            
            // 再次检查材料是否充足
            if (!cm.haveItem(2022539, 1)) {
                cm.sendOk("你没有#v2022539#装备材料任选礼包。");
                cm.dispose();
                return;
            }
            
            if (!cm.haveItem(当前材料ID, 1)) {
                cm.sendOk("你没有#v" + 当前材料ID + "#" + 选择材料阶数 + "阶" + 材料.名称 + "。");
                cm.dispose();
                return;
            }
            
            // 扣除材料
            cm.gainItem(2022539, -1);
            cm.gainItem(当前材料ID, -1);
            
            // 获得新材料
            cm.gainItem(目标材料ID, 1);
            
            cm.sendOk("#e#r升阶成功！#n#k\r\n获得：#v" + 目标材料ID + "#" + 目标阶数 + "阶" + 材料.名称);
            cm.dispose();
        }
    }
}

