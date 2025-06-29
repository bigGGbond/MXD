var status = -1;
var currentRecharge = 0;
var receivedRewards = 0;
var selectedOption = 0;

// 奖励档次数据结构
var rewardTiers = [
    { id: 1143028, amount: 2000, desc: "人级勋章", extra: 30, attr: 100 },
    { id: 1143021, amount: 5000, desc: "王级勋章", extra: 40, attr: 150 },
    { id: 1142612, amount: 10000, desc: "神级勋章", extra: 50, attr: 200 },
    { id: 1142524, amount: 20000, desc: "圣级勋章", extra: 80, attr: 200 },
    { id: 1143043, amount: 35000, desc: "天级勋章", extra: 95, attr: 200 },
    { id: 1142745, amount: 50000, desc: "祖级勋章", extra: 110, attr: 200 },
    { id: 1143024, amount: 75000, desc: "霸级勋章", extra: 140, attr: 200 },
    { id: 1142746, amount: 100000, desc: "仙级勋章", extra: 160, attr: 200 },
    { id: 1143037, amount: 125000, desc: "尊者级勋章", extra: 180, attr: 200 },
    { id: 1143012, amount: 150000, desc: "星辰级勋章", extra: 200, attr: 200 },
    { id: 1143085, amount: 175000, desc: "银河级勋章", extra: 230, attr: 200 },
    { id: 1143000, amount: 200000, desc: "无量级勋章", extra: 250, attr: 200 },
    { id: 1143160, amount: 225000, desc: "混沌级勋章", extra: 275, attr: 200 },
    { id: 1143159, amount: 250000, desc: "破晓级勋章", extra: 310, attr: 200 },
    { id: 1143115, amount: 275000, desc: "黄昏级勋章", extra: 340, attr: 250 },
    { id: 1143194, amount: 300000, desc: "黑洞级勋章", extra: 370, attr: 250 }
];

function start() {
    status = -1;
    currentRecharge = cm.getBossRank9("充值金额", 2);
    receivedRewards = cm.getAcLog("累计充值领取档位");
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
        return;
    }
    if (mode == 1) {
        status++;
    } else if (mode == 0 && status != 0) {
        status--;
    } else {
        cm.dispose();
        return;
    }

    if (status == 0) {
        var text = "欢迎进入充值奖励领取界面！\r\n当前充值金额：#r" + currentRecharge + "#k\r\n\r\n";
        for (var i = 0; i < rewardTiers.length; i++) {
            text += showRewardOption(i);
        }
        if (receivedRewards >= rewardTiers.length) {
            text += "#r您已领取所有可领取的奖励。";
        }
        cm.sendSimple(text);
    } else if (status == 1) {
        selectedOption = selection;
        if (canReceive(selectedOption)) {
            showRewardDetails(selectedOption);
        } else {
            cm.sendOk("你的充值金额不足以领取该档次的奖励，或你已领取过该奖励。");
            cm.dispose();
        }
    } else if (status == 2) {
        giveReward(selectedOption);
        cm.gainAcLog("累计充值领取档位", 1);
        cm.sendOk("恭喜你成功领取了奖励！");
        cm.dispose();
    }
}

function showRewardOption(index) {
    if (index < 0 || index >= rewardTiers.length) return "";
    var tier = rewardTiers[index];
    if (currentRecharge >= tier.amount && receivedRewards < (index + 1)) {
        return "#L" + index + "# #v" + tier.id + ":# " + tier.desc + " " + tier.amount + " 累充礼包 (额外伤害加成" + tier.extra + "%)\r\n";
    } else {
        return "#v" + tier.id + ":# " + tier.desc + " " + tier.amount + " 累充礼包 (额外伤害加成" + tier.extra + "%) - 累充积分 " + tier.amount + " 即可领取\r\n";
    }
}

function canReceive(index) {
    if (typeof index !== 'number' || index < 0 || index >= rewardTiers.length) return false;
    var tier = rewardTiers[index];
    return currentRecharge >= tier.amount && receivedRewards < (index + 1);
}

function showRewardDetails(index) {
    if (typeof index !== 'number' || index < 0 || index >= rewardTiers.length) {
        cm.sendOk("奖励档次选择错误，请重试。");
        cm.dispose();
        return;
    }
    var tier = rewardTiers[index];
    var rewardInfo = "#v" + tier.id + "# #t" + tier.id + "#\r\n" +
        "力量: " + tier.attr + "\r\n" +
        "敏捷: " + tier.attr + "\r\n" +
        "智力: " + tier.attr + "\r\n" +
        "运气: " + tier.attr + "\r\n" +
        "物理攻击: " + tier.attr + "\r\n" +
        "魔法攻击: " + tier.attr + "\r\n" +
        "#b描述: 这是" + tier.amount + "累充礼包奖励，附带" + tier.extra + "%伤害加成。";
    cm.sendYesNo("你选择了领取以下物品：\r\n" + rewardInfo);
}

function giveReward(index) {
    if (typeof index !== 'number' || index < 0 || index >= rewardTiers.length) return;
    var tier = rewardTiers[index];
    cm.给属性装备(tier.id, tier.attr, tier.attr, tier.attr, tier.attr, tier.attr, tier.attr, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
}