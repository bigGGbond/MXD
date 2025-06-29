/*
 * @name: 新手武器选择脚本
 * @author: QQ小冰
 * @description: 自选攻击必成卷武器系统
 */

//[1312039,1322065,1332081,1372046,1382062,1402053,1412035,1422039,1432050,1442071,1452062,1462056,1472077,1482029,1492030]
var weapon;

// 常量定义
const CONSTANTS = {
    REQUIRED_ITEMS: [
        { id: 2022552, count: 1 }
    ],
    JOB_TYPES: {
        BEGINNER: 0,
        WARRIOR: 1,
        MAGICIAN: 2,
        BOWMAN: 3,
        THIEF: 4,
        PIRATE: 5,
        ALL: -1
    },
    ANIMATION: {
        SUCCESS: "Effect/OnUserEff.img/guideEffect/aranTutorial/ui0",
        DURATION: 3000,
        REPEAT: 3
    },
    QUEST: {
        ID: 9900001,
        NPC: 60868
    }
};

// 武器数据结构
const WEAPONS = {
    // 战士武器
    WARRIOR: [
        [1302030, 3, 85, 0, "剑客英雄的武器"],//战士+描述剑客英雄的武器
        [1412011, 3, 85, 0, "圣骑士的武器"],//战士+描述圣骑士的武器
        [1422014, 3, 85, 0, "圣骑士的武器"],//战士+描述圣骑士的武器
        [1432012, 3, 85, 0, "龙骑士的武器"],//战士+描述龙骑士的武器
        [1442024, 3, 85, 0, "龙骑士的武器"],//战士+描述龙骑士的武器
    ],
    // 法师武器
    MAGICIAN: [
        [1382012, 3, 0, 95, "魔法师的武器"],//魔法师
    ],
    // 弓箭手武器
    BOWMAN: [
        [1452022, 3, 75, 0, "弓箭手选择这个武器"],//弓+描述弓箭手选择这个武器
        [1462019, 3, 75, 0, "弩手选择这个武器"],//弩+描述 弩手选择这个武器
    ],
    // 飞侠武器
    THIEF: [
        [1472032, 3, 40, 0, "无影人丢飞镖选择这个武器"],//标飞+描述 无影人丢飞镖选择这个武器
        [1332025, 3, 85, 0, "刀飞侠盗的武器"],//飞+描述刀飞侠盗的武器
    ],
    // 海盗武器
    PIRATE: [
        [1482020, 3, 75, 0, "超级赛亚人的武器"],//队长+描述超级赛亚人的武器
        [1492020, 3, 55, 0, "开船的职业武器"], //海盗+描述开船的职业武器
    ]
};

class WeaponSelector {
    constructor() {
        this.status = -1;
        this.selection = null;
        this.availableWeapons = [];
    }

    // 判断职业类型
    static getJobType(job) {
        // 新手职业
        if ([0, 1, 1000, 2000, 2001, 3000, 3001, 2002].includes(job)) {
            return CONSTANTS.JOB_TYPES.BEGINNER;
        }
        // 战士和魂骑士
        if ((job >= 100 && job <= 132) || (job >= 1100 && job <= 1112) || (job >= 2100 && job <= 2112)) {
            return CONSTANTS.JOB_TYPES.WARRIOR;
        }
        // 法师
        if ((job >= 200 && job <= 232) || (job >= 1200 && job <= 1212)) {
            return CONSTANTS.JOB_TYPES.MAGICIAN;
        }
        // 弓箭手
        if ((job >= 300 && job <= 332) || (job >= 1300 && job <= 1312)) {
            return CONSTANTS.JOB_TYPES.BOWMAN;
        }
        // 飞侠
        if ((job >= 400 && job <= 434) || (job >= 1400 && job <= 1412)) {
            return CONSTANTS.JOB_TYPES.THIEF;
        }
        // 海盗
        if ((job >= 500 && job <= 522) || (job >= 1500 && job <= 1512)) {
            return CONSTANTS.JOB_TYPES.PIRATE;
        }
        return CONSTANTS.JOB_TYPES.ALL;
    }

    // 获取职业对应的武器列表
    getWeaponsByJobType(jobType) {
        switch (jobType) {
            case CONSTANTS.JOB_TYPES.WARRIOR:
                return WEAPONS.WARRIOR;
            case CONSTANTS.JOB_TYPES.MAGICIAN:
                return WEAPONS.MAGICIAN;
            case CONSTANTS.JOB_TYPES.BOWMAN:
                return WEAPONS.BOWMAN;
            case CONSTANTS.JOB_TYPES.THIEF:
                return WEAPONS.THIEF;
            case CONSTANTS.JOB_TYPES.PIRATE:
                return WEAPONS.PIRATE;
            case CONSTANTS.JOB_TYPES.ALL:
                return [
                    ...WEAPONS.WARRIOR,
                    ...WEAPONS.MAGICIAN,
                    ...WEAPONS.BOWMAN,
                    ...WEAPONS.THIEF,
                    ...WEAPONS.PIRATE
                ];
            default:
                return [];
        }
    }

    // 检查是否有足够的物品
    checkRequiredItems() {
        return CONSTANTS.REQUIRED_ITEMS.every(item => 
            cm.haveItem(item.id, item.count)
        );
    }

    // 消耗所需物品
    consumeRequiredItems() {
        CONSTANTS.REQUIRED_ITEMS.forEach(item => 
            cm.gainItem(item.id, -item.count)
        );
    }

    // 给予武器
    giveWeapon(weapon) {
        cm.给属性装备(
            weapon.id,
            0, 0,
            weapon.stats, weapon.stats, weapon.stats, weapon.stats,
            0, 0,
            weapon.str, weapon.int,
            1, 1, 1, 1,
            0, 0, 0
        );
    }

    // 处理选择逻辑
    handleSelection(mode, type, selection) {
        try {
            if (mode === 1) {
                this.status++;
            } else if (mode === 0) {
                this.status--;
            } else {
                cm.dispose();
                return;
            }

            switch (this.status) {
                case 0:
                    return this.showWeaponList();
                case 1:
                    return this.confirmSelection(selection);
                case 2:
                    return this.processWeaponGiving();
                default:
                    cm.dispose();
            }
        } catch (error) {
            cm.sendNext("#r发生错误: " + error.message);
            cm.dispose();
        }
    }

    // 显示武器列表
    showWeaponList() {
        const jobType = WeaponSelector.getJobType(cm.getJob());
        
        if (jobType === CONSTANTS.JOB_TYPES.BEGINNER) {
            cm.sendOk("请1转后再打开");
            cm.dispose();
            return;
        }

        this.availableWeapons = this.getWeaponsByJobType(jobType);
        
        let msg = "选择一把适合你的武器吧。\r\n";
        this.availableWeapons.forEach((weapon, i) => {
            msg += `     #b#L${i}##i${weapon.id}# ${weapon.description}#l\r\n`;
        });
        
        cm.sendSimpleS(msg, 2);
    }

    // 确认选择
    confirmSelection(selection) {
        this.selection = selection;
        const weapon = this.availableWeapons[selection];

        if (!cm.canHold(weapon.id)) {
            cm.sendNext("#r背包空间不足");
            cm.dispose();
            return;
        }

        if (!this.checkRequiredItems()) {
            const item = CONSTANTS.REQUIRED_ITEMS[0];
            cm.sendNext(`#b身上没有#r#i${item.id}##t${item.id}# x ${item.count}`);
            cm.dispose();
            return;
        }

        cm.sendYesNo(`是否要选择 #b#v${weapon.id}##z${weapon.id}#? \r\n#k提醒：#r请再次确认选择的武器，一旦选择概不退换！`);
    }

    // 处理武器发放
    processWeaponGiving() {
        const weapon = this.availableWeapons[this.selection];
        
        this.consumeRequiredItems();
        this.giveWeapon(weapon);
        
        cm.setOneTimeLog('领取枫叶武器');
        cm.循环播放动画(CONSTANTS.ANIMATION.SUCCESS, CONSTANTS.ANIMATION.DURATION, CONSTANTS.ANIMATION.REPEAT);
        cm.sendNext(`#b成功开启箱子，获得 #b#v${weapon.id}##z${weapon.id}#`);
        
        qm.openQuest(CONSTANTS.QUEST.ID, CONSTANTS.QUEST.NPC);
        cm.dispose();
    }
}

// 脚本入口
let weaponSelector;

function start() {
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (!weaponSelector) {
        weaponSelector = new WeaponSelector();
    }
    weaponSelector.handleSelection(mode, type, selection);
}
