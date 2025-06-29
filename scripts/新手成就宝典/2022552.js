/*
@QQ小冰
自选攻击必成卷
 */

//[1312039,1322065,1332081,1372046,1382062,1402053,1412035,1422039,1432050,1442071,1452062,1462056,1472077,1482029,1492030]
var weapon;

var weapon1 = [
    [1302030, 3, 85, 0, "剑客英雄的武器"],//战士+描述剑客英雄的武器
    [1412011, 3, 85, 0, "圣骑士的武器"],//战士+描述圣骑士的武器
    [1422014, 3, 85, 0, "圣骑士的武器"],//战士+描述圣骑士的武器
    [1432012, 3, 85, 0, "龙骑士的武器"],//战士+描述龙骑士的武器
    [1442024, 3, 85, 0, "龙骑士的武器"],//战士+描述龙骑士的武器
];

var weapon2 = [
    [1382012, 3, 0, 95, "魔法师的武器"],//魔法师
];

var weapon3 = [
    [1452022, 3, 75, 0, "弓箭手选择这个武器"],//弓+描述弓箭手选择这个武器
    [1462019, 3, 75, 0, "弩手选择这个武器"],//弩+描述 弩手选择这个武器
];

var weapon4 = [
    [1472032, 3, 40, 0, "无影人丢飞镖选择这个武器"],//标飞+描述 无影人丢飞镖选择这个武器
    [1332025, 3, 85, 0, "刀飞侠盗的武器"],//飞+描述刀飞侠盗的武器
];

var weapon5 = [
    [1482020, 3, 75, 0, "超级赛亚人的武器"],//队长+描述超级赛亚人的武器
    [1492020, 3, 55, 0, "开船的职业武器"], //海盗+描述开船的职业武器
];

//自选箱
var req = [
    [2022552, 1]
];
var sels;
var status = -1;

function start() {
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else if (mode == 0) {
        status--;
    } else {
        cm.dispose();
        return;
    }
    if (status == 0) {
        var jobType = judgementJob(cm.getJob());
        switch (jobType){
            case -1:
                weapon = [];
                weapon = weapon.concat(weapon1, weapon2, weapon3, weapon4, weapon5);
                break;
            case 0:
                cm.sendOk("请1转后再打开");
                cm.dispose();
                return;
            case 1:
                weapon = weapon1;
                break;
            case 2:
                weapon = weapon2;
                break;
            case 3:
                weapon = weapon3;
                break;
            case 4:
                weapon = weapon4;
                break;
            case 5:
                weapon = weapon5;
                break;
        }

        var msg = "选择一把适合你的武器吧。\r\n";
        for (var i = 0; i < weapon.length; i++) {
            msg += "     #b#L" + i + "#";
            msg += "#i" + weapon[i][0] + "# " + weapon[i][4] + "#l\r\n";
        }
        // cm.sendSimple("" + msg + "");
        cm.sendSimpleS(msg, 2);
    } else if (status == 1) {
        sels = selection;
        if (!cm.canHold(weapon[sels][0])) {
            cm.sendNext("#r背包空间不足");
            cm.dispose();
            return;
        }
        // if(cm.getPlayer().getOneTimeLog("至尊会员") == 0){
        // cm.sendOk("您还没有购买过至尊会员，请确认！");
        // cm.dispose();
        // return;
        // }
        // if(cm.getOneTimeLog('领取枫叶武器1') >= 1){
        // cm.sendOk("每个玩家只能领取一次。");
        // cm.dispose();
        // }
        for (var i = 0; i < req.length; i++) {
            if (!cm.haveItem(req[i][0], req[i][1])) {
                cm.sendNext("#b身上没有#r#i" + req[i][0] + "#  #t" + req[i][0] + "# x " + req[i][1] + "");
                cm.dispose();
                return;
            }
        }
        cm.sendYesNo("是否要选择 #b#v" + weapon[sels][0] + "#  #z" + weapon[sels][0] + "# ? \r\n#k提醒：#r请再次确认选择的武器，一旦选择概不退换！");
    } else if (status == 2) {
        for (var i = 0; i < req.length; i++) {
            cm.gainItem(req[i][0], -req[i][1]);
        }
        // cm.给物品(weapon[sels], 1);
        cm.给属性装备(weapon[sels][0], 0, 0, weapon[sels][1], weapon[sels][1], weapon[sels][1], weapon[sels][1], 0, 0, weapon[sels][2], weapon[sels][3], 1, 1, 1, 1, 0, 0, 0);
        cm.setOneTimeLog('领取枫叶武器');
		cm.循环播放动画("Effect/OnUserEff.img/guideEffect/aranTutorial/ui0",3000,3);
        cm.sendNext("#b成功开启箱子，获得  #b#v" + weapon[sels][0] + "#  #z" + weapon[sels][0] + "#");
        cm.dispose();
        qm.openQuest(9900001,60868);
    } else {
        cm.sendNext("#r发生错误: mode : " + mode + " status : " + status);
        cm.dispose();
    }
}
function judgementJob(job){
    if(job == 0 || job == 1 || job == 1000 || job == 2000 || job == 2001 || job == 3000 || job == 3001 || job == 2002){
        return 0;
    }
    //战士 &&  魂骑士
    else if((job >= 100 && job <= 132) || (job >= 1100 && job <= 1112) || (job >= 2100 && job <= 2112) ){
        return 1;
    }
    //法师
    else if((job >= 200 && job <= 232) || (job >= 1200 && job <= 1212)){
        return 2;
    }
    //弓
    else if((job >= 300 && job <= 332) ||  (job >= 1300 && job <= 1312) ){
        return 3;
    }
    //飞侠
    else if((job >= 400 && job <= 434) || (job >= 1400 && job <= 1412) ){
        return 4;
    }
    //海盗
    else if((job >= 500 && job <= 522) || (job >= 1500 && job <= 1512) ){
        return 5;
    }
    else {
        return -1;
    }

}
