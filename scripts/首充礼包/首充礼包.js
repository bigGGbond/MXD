var 分割线 = "#r#e----------------------------------------#k#n\r\n";
var 礼包图标1 = "#fUI/GuildMark.img/Mark/Etc/00009001/1#";
var 礼包图标2 = "#fUI/GuildMark.img/Mark/Etc/00009001/10#";
var 钻石 = "#fUI/UIWindow.img/QuestIcon/3/0#";
var 星星 = "#fMap/MapHelper/weather/witch/3#";
var 礼包一元宝 = 600;
var 礼包二元宝 = 1800;

var status;
var lastSelection = 0;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1 || mode == 0) {
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
        var text = "\t\t\t\t" + 星星 + " #e#b首充礼包购买系统#n#k " + 星星 + "\r\n";
        text += 分割线;
        text += "#d欢迎来到#b冒险岛#d，您可以在此处购买#r首充礼包#d！#k\r\n";
        text += 分割线;
        text += "#L1#" + 礼包图标1 + " #b购买首充礼包1#k " + 钻石 + " #r(花费" + 礼包一元宝 + "元宝)#k#l\r\n";
        text += "#L2#" + 礼包图标2 + " #b购买首充礼包2#k " + 钻石 + " #r(花费" + 礼包二元宝 + "元宝)#k#l\r\n";
        text += 分割线;
        cm.sendSimple(text);
    } else if (status == 1) {
        if (selection == 1) {
            lastSelection = 1;
            var text = "#e#b首充礼包1#n#k " + 礼包图标1 + "\r\n";
            text += 分割线;
            text += "#d礼包内容：#k\r\n";
            text += "#b#v1902137##z1902137# ×1#k\r\n";
            text += "#b#v4500216##z4500216# ×1#k\r\n";
            text += "#b#v4500009##z4500009# ×10#k\r\n";
            text += 分割线;
            text += "#r是否花费" + 礼包一元宝 + "元宝购买首充礼包1？#k";
            cm.sendYesNo(text);
        }
        if (selection == 2) {
            lastSelection = 2;
            var text = "#e#b首充礼包2#n#k " + 礼包图标2 + "\r\n";
            text += 分割线;
            text += "#d礼包内容：#k\r\n";
            text += "#b#v2022582##z2022582# ×20#k\r\n";
            text += "#b#v1102659##z1102659# ×1#k\r\n";
            text += "#b#v4500116##z4500116# ×1#k\r\n";
            text += "#b#v4500010##z4500010# ×5#k\r\n";
            text += 分割线;
            text += "#r是否花费" + 礼包二元宝 + "元宝购买首充礼包2？#k";
            cm.sendYesNo(text);
        }
    } else if (status == 2) {
        if (lastSelection == 1) {
            // 检查元宝是否足够
            if (cm.getPlayer().getzb() < 礼包一元宝) {
                cm.sendOk("#r元宝不足，无法购买首充礼包1！#k");
                cm.dispose();
                return;
            }
            // 扣除元宝
            cm.getPlayer().gainzb(-礼包一元宝);
            // 发放礼包1
            cm.gainItem(1902137, 1);
            var equip = cm.getEquip(1902137);
            equip.setHp(6);
            equip.setStr(2);
            equip.setDex(2);
            equip.setInt(2);
            equip.setLuk(2);
            equip.setWatk(2);
            equip.setMatk(2);
            equip.setSpeed(0.01);
            cm.gainItem(4500216, 1);
            cm.gainItem(4500009, 10);
            cm.sendOk("#e#b恭喜你成功购买首充礼包1！#k\r\n" + 分割线 + "#b礼包已发送至你的背包，请查收！#k");
            cm.dispose();
        } else if (lastSelection == 2) {
            // 检查元宝是否足够
            if (cm.getPlayer().getzb() < 礼包二元宝) {
                cm.sendOk("#r元宝不足，无法购买首充礼包2！#k");
                cm.dispose();
                return;
            }
            // 扣除元宝
            cm.getPlayer().gainzb(-礼包二元宝);
            // 发放礼包2
            cm.gainItem(2022582, 20);
            cm.gainItem(1102659, 1);
            var equip = cm.getEquip(1102659);
            equip.setStr(2);
            equip.setDex(2);
            equip.setInt(2);
            equip.setLuk(2);
            equip.setWatk(2);
            equip.setMatk(2);
            equip.setSpeed(0.01);
            cm.gainItem(4500116, 1);
            cm.gainItem(4500010, 5);
            cm.sendOk("#e#b恭喜你成功购买首充礼包2！#k\r\n" + 分割线 + "#b礼包已发送至你的背包，请查收！#k");
            cm.dispose();
        }
    }
}