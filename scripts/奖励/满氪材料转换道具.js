/* ==================
 脚本类型: NPC	    
 脚本作者: 游戏盒团队-维多利亚 
 联系扣扣: 297870163
 =====================
 */

var status = -1;
var 选择材料类型;
var 选择材料阶数;
var 选择材料绑定;
var 目标材料类型;
var 转换数量;
var 最大阶数 = 13;

// 材料基础信息配置
var 材料列表 = {
    神环材料: { 名称: "神环材料", 普通: 4033255, 绑定: 4501116 },
    坐骑材料: { 名称: "坐骑材料", 普通: 4033062, 绑定: 4500916 },
    腰带材料: { 名称: "腰带材料", 普通: 4442300, 绑定: 4500616 },
    披风材料: { 名称: "披风材料", 普通: 4443300, 绑定: 4500816 },
    武器材料: { 名称: "武器材料", 普通: 4033104, 绑定: 4500216 },
    手套材料: { 名称: "手套材料", 普通: 4033105, 绑定: 4500316 },
    鞋子材料: { 名称: "鞋子材料", 普通: 4033106, 绑定: 4500416 },
    饰品材料: { 名称: "饰品材料", 普通: 4033232, 绑定: 4500116 }
};

// 2阶以上材料ID计算规则
var 高阶材料ID = {
    神环材料: { 普通基础: 4501102, 绑定基础: 4501117 },
    坐骑材料: { 普通基础: 4500902, 绑定基础: 4500917 },
    腰带材料: { 普通基础: 4500602, 绑定基础: 4500617 },
    披风材料: { 普通基础: 4500802, 绑定基础: 4500817 },
    武器材料: { 普通基础: 4500202, 绑定基础: 4500217 },
    手套材料: { 普通基础: 4500302, 绑定基础: 4500317 },
    鞋子材料: { 普通基础: 4500402, 绑定基础: 4500417 },
    饰品材料: { 普通基础: 4500102, 绑定基础: 4500117 }
};

// 转换比例配置
var 转换比例 = {
    神环材料: {
        坐骑材料: 1, 腰带材料: 2, 披风材料: 2,
        武器材料: 15, 手套材料: 15, 鞋子材料: 15, 饰品材料: 17
    },
    坐骑材料: {
        神环材料: 1, 腰带材料: 2, 披风材料: 2,
        武器材料: 15, 手套材料: 15, 鞋子材料: 15, 饰品材料: 17
    }
};

function start() {
    status = -1;
    action(1, 0, 0);
}

function getMaterialId(类型, 阶数, 是否绑定) {
    // 1阶材料使用特殊ID
    if (阶数 === 1) {
        return 是否绑定 ? 材料列表[类型].绑定 : 材料列表[类型].普通;
    }
    // 2阶及以上材料使用连续ID
    var 基础ID = 是否绑定 ? 高阶材料ID[类型].绑定基础 : 高阶材料ID[类型].普通基础;
    return 基础ID + (阶数 - 2);
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
            if (!cm.haveItem(2022541, 1)) {
                cm.sendOk("你没有#v2022541#满氪材料转换道具。");
                cm.dispose();
                return;
            }

            var text = "#e#d请选择要转换的材料类型：#n#k\r\n\r\n";
            text += "#r只能转换神环材料或坐骑材料#k\r\n\r\n";
            
            // 显示神环和坐骑材料的所有阶数
            for (var 类型 in 转换比例) {
                text += "#e" + 类型 + "：#n\r\n";
                for (var i = 1; i <= 最大阶数; i++) {
                    var 普通材料ID = getMaterialId(类型, i, false);
                    var 绑定材料ID = getMaterialId(类型, i, true);
                    var 普通数量 = cm.itemQuantity(普通材料ID);
                    var 绑定数量 = cm.itemQuantity(绑定材料ID);
                    
                    if (普通数量 > 0 || 绑定数量 > 0) {
                        text += i + "阶: ";
                        if (普通数量 > 0) text += "#v" + 普通材料ID + "# x " + 普通数量 + " ";
                        if (绑定数量 > 0) text += "#v" + 绑定材料ID + "# x " + 绑定数量 + " ";
                        text += "\r\n";
                    }
                }
                text += "\r\n";
            }
            
            text += "#L0#选择神环材料#l\r\n";
            text += "#L1#选择坐骑材料#l\r\n";
            
            cm.sendSimple(text);
        }
        else if (status == 1) {
            选择材料类型 = selection == 0 ? "神环材料" : "坐骑材料";
            var text = "#e#d请选择要转换的材料：#n#k\r\n\r\n";
            
            // 显示该类型所有可转换的材料
            for (var i = 1; i <= 最大阶数; i++) {
                var 普通材料ID = getMaterialId(选择材料类型, i, false);
                var 绑定材料ID = getMaterialId(选择材料类型, i, true);
                var 普通数量 = cm.itemQuantity(普通材料ID);
                var 绑定数量 = cm.itemQuantity(绑定材料ID);
                
                if (普通数量 > 0) {
                    text += "#L" + (i * 2 - 2) + "#" + i + "阶 #v" + 普通材料ID + "# x " + 普通数量 + " (非绑定)#l\r\n";
                }
                if (绑定数量 > 0) {
                    text += "#L" + (i * 2 - 1) + "#" + i + "阶 #v" + 绑定材料ID + "# x " + 绑定数量 + " (绑定)#l\r\n";
                }
            }
            
            if (text === "#e#d请选择要转换的材料：#n#k\r\n\r\n") {
                cm.sendOk("你没有任何可以转换的" + 选择材料类型 + "。");
                cm.dispose();
                return;
            }
            
            cm.sendSimple(text);
        }
        else if (status == 2) {
            选择材料阶数 = Math.floor(selection / 2) + 1;
            选择材料绑定 = selection % 2 == 1;
            var 当前材料ID = getMaterialId(选择材料类型, 选择材料阶数, 选择材料绑定);
            
            var text = "#e#d请选择要转换成的目标材料：#n#k\r\n";
            text += "#r(注意：绑定材料只能转换为绑定材料)#k\r\n\r\n";
            text += "当前选择：" + 选择材料阶数 + "阶 #v" + 当前材料ID + "# " + (选择材料绑定 ? "(绑定)" : "(非绑定)") + "\r\n\r\n";
            
            var index = 0;
            for (var 目标类型 in 转换比例[选择材料类型]) {
                if (目标类型 !== 选择材料类型) {
                    var 目标材料ID = getMaterialId(目标类型, 选择材料阶数, 选择材料绑定);
                    var 比例 = 转换比例[选择材料类型][目标类型];
                    text += "#L" + index + "##v" + 目标材料ID + "# " + 目标类型 + " (1:" + 比例 + ")#l\r\n";
                    index++;
                }
            }
            
            cm.sendSimple(text);
        }
        // else if (status == 3) {
        //     var 目标类型数组 = Object.keys(转换比例[选择材料类型]).filter(key => key !== 选择材料类型);
        //     目标材料类型 = 目标类型数组[selection];
        //     var 比例 = 转换比例[选择材料类型][目标材料类型];
            
        //     var 当前材料ID = getMaterialId(选择材料类型, 选择材料阶数, 选择材料绑定);
        //     var 目标材料ID = getMaterialId(目标材料类型, 选择材料阶数, 选择材料绑定);
        //     var 当前数量 = cm.itemQuantity(当前材料ID);
            
        //     var text = "#e#r【请输入转换数量】#n#k\r\n";
        //     text += "当前材料：" + 选择材料阶数 + "阶 #v" + 当前材料ID + "# x " + 当前数量 + "\r\n";
        //     text += "目标材料：" + 选择材料阶数 + "阶 #v" + 目标材料ID + "#\r\n";
        //     text += "转换比例：1:" + 比例 + "\r\n";
        //     text += "最多可转换：" + Math.floor(当前数量 / 比例) + " 个\r\n\r\n";
        //     text += "请输入要转换的数量：";
            
        //     cm.sendGetNumber(text, 1, 1, Math.floor(当前数量 / 比例));
        // }
        // else if (status == 4) {
        //     转换数量 = selection;
        //     var 比例 = 转换比例[选择材料类型][目标材料类型];
        //     var 需要数量 = 转换数量 * 比例;
            
        //     var 当前材料ID = getMaterialId(选择材料类型, 选择材料阶数, 选择材料绑定);
        //     var 目标材料ID = getMaterialId(目标材料类型, 选择材料阶数, 选择材料绑定);
            
        //     var text = "#e#r【确认转换】#n#k\r\n";
        //     text += "将要消耗：\r\n";
        //     text += "#v" + 当前材料ID + "# x " + 需要数量 + "\r\n";
        //     text += "#v2022541# x 1\r\n\r\n";
        //     text += "获得：\r\n";
        //     text += "#v" + 目标材料ID + "# x " + 转换数量 + "\r\n\r\n";
        //     text += "#r是否确认转换？#k";
            
        //     cm.sendYesNo(text);
        // }
        // else if (status == 5) {
        //     var 比例 = 转换比例[选择材料类型][目标材料类型];
        //     var 需要数量 = 转换数量 * 比例;
            
        //     var 当前材料ID = getMaterialId(选择材料类型, 选择材料阶数, 选择材料绑定);
        //     var 目标材料ID = getMaterialId(目标材料类型, 选择材料阶数, 选择材料绑定);
            
        //     // 再次检查材料是否充足
        //     if (!cm.haveItem(2022541, 1)) {
        //         cm.sendOk("你没有#v2022541#满氪材料转换道具。");
        //         cm.dispose();
        //         return;
        //     }
            
        //     if (!cm.haveItem(当前材料ID, 需要数量)) {
        //         cm.sendOk("材料不足，无法完成转换。");
        //         cm.dispose();
        //         return;
        //     }
            
        //     // 扣除材料
        //     cm.gainItem(2022541, -1);
        //     cm.gainItem(当前材料ID, -需要数量);
            
        //     // 获得新材料
        //     cm.gainItem(目标材料ID, 转换数量);
            
        //     cm.sendOk("#e#r转换成功！#n#k\r\n获得：#v" + 目标材料ID + "# x " + 转换数量);
        //     cm.dispose();
        // }
    }
}

