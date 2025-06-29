/*
 * @name: ��������ѡ��ű�
 * @author: QQС��
 * @description: ��ѡ�����سɾ�����ϵͳ
 */

//[1312039,1322065,1332081,1372046,1382062,1402053,1412035,1422039,1432050,1442071,1452062,1462056,1472077,1482029,1492030]
var weapon;

// ��������
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

// �������ݽṹ
const WEAPONS = {
    // սʿ����
    WARRIOR: [
        [1302030, 3, 85, 0, "����Ӣ�۵�����"],//սʿ+��������Ӣ�۵�����
        [1412011, 3, 85, 0, "ʥ��ʿ������"],//սʿ+����ʥ��ʿ������
        [1422014, 3, 85, 0, "ʥ��ʿ������"],//սʿ+����ʥ��ʿ������
        [1432012, 3, 85, 0, "����ʿ������"],//սʿ+��������ʿ������
        [1442024, 3, 85, 0, "����ʿ������"],//սʿ+��������ʿ������
    ],
    // ��ʦ����
    MAGICIAN: [
        [1382012, 3, 0, 95, "ħ��ʦ������"],//ħ��ʦ
    ],
    // ����������
    BOWMAN: [
        [1452022, 3, 75, 0, "������ѡ���������"],//��+����������ѡ���������
        [1462019, 3, 75, 0, "����ѡ���������"],//��+���� ����ѡ���������
    ],
    // ��������
    THIEF: [
        [1472032, 3, 40, 0, "��Ӱ�˶�����ѡ���������"],//���+���� ��Ӱ�˶�����ѡ���������
        [1332025, 3, 85, 0, "��������������"],//��+������������������
    ],
    // ��������
    PIRATE: [
        [1482020, 3, 75, 0, "���������˵�����"],//�ӳ�+�������������˵�����
        [1492020, 3, 55, 0, "������ְҵ����"], //����+����������ְҵ����
    ]
};

class WeaponSelector {
    constructor() {
        this.status = -1;
        this.selection = null;
        this.availableWeapons = [];
    }

    // �ж�ְҵ����
    static getJobType(job) {
        // ����ְҵ
        if ([0, 1, 1000, 2000, 2001, 3000, 3001, 2002].includes(job)) {
            return CONSTANTS.JOB_TYPES.BEGINNER;
        }
        // սʿ�ͻ���ʿ
        if ((job >= 100 && job <= 132) || (job >= 1100 && job <= 1112) || (job >= 2100 && job <= 2112)) {
            return CONSTANTS.JOB_TYPES.WARRIOR;
        }
        // ��ʦ
        if ((job >= 200 && job <= 232) || (job >= 1200 && job <= 1212)) {
            return CONSTANTS.JOB_TYPES.MAGICIAN;
        }
        // ������
        if ((job >= 300 && job <= 332) || (job >= 1300 && job <= 1312)) {
            return CONSTANTS.JOB_TYPES.BOWMAN;
        }
        // ����
        if ((job >= 400 && job <= 434) || (job >= 1400 && job <= 1412)) {
            return CONSTANTS.JOB_TYPES.THIEF;
        }
        // ����
        if ((job >= 500 && job <= 522) || (job >= 1500 && job <= 1512)) {
            return CONSTANTS.JOB_TYPES.PIRATE;
        }
        return CONSTANTS.JOB_TYPES.ALL;
    }

    // ��ȡְҵ��Ӧ�������б�
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

    // ����Ƿ����㹻����Ʒ
    checkRequiredItems() {
        return CONSTANTS.REQUIRED_ITEMS.every(item => 
            cm.haveItem(item.id, item.count)
        );
    }

    // ����������Ʒ
    consumeRequiredItems() {
        CONSTANTS.REQUIRED_ITEMS.forEach(item => 
            cm.gainItem(item.id, -item.count)
        );
    }

    // ��������
    giveWeapon(weapon) {
        cm.������װ��(
            weapon.id,
            0, 0,
            weapon.stats, weapon.stats, weapon.stats, weapon.stats,
            0, 0,
            weapon.str, weapon.int,
            1, 1, 1, 1,
            0, 0, 0
        );
    }

    // ����ѡ���߼�
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
            cm.sendNext("#r��������: " + error.message);
            cm.dispose();
        }
    }

    // ��ʾ�����б�
    showWeaponList() {
        const jobType = WeaponSelector.getJobType(cm.getJob());
        
        if (jobType === CONSTANTS.JOB_TYPES.BEGINNER) {
            cm.sendOk("��1ת���ٴ�");
            cm.dispose();
            return;
        }

        this.availableWeapons = this.getWeaponsByJobType(jobType);
        
        let msg = "ѡ��һ���ʺ���������ɡ�\r\n";
        this.availableWeapons.forEach((weapon, i) => {
            msg += `     #b#L${i}##i${weapon.id}# ${weapon.description}#l\r\n`;
        });
        
        cm.sendSimpleS(msg, 2);
    }

    // ȷ��ѡ��
    confirmSelection(selection) {
        this.selection = selection;
        const weapon = this.availableWeapons[selection];

        if (!cm.canHold(weapon.id)) {
            cm.sendNext("#r�����ռ䲻��");
            cm.dispose();
            return;
        }

        if (!this.checkRequiredItems()) {
            const item = CONSTANTS.REQUIRED_ITEMS[0];
            cm.sendNext(`#b����û��#r#i${item.id}##t${item.id}# x ${item.count}`);
            cm.dispose();
            return;
        }

        cm.sendYesNo(`�Ƿ�Ҫѡ�� #b#v${weapon.id}##z${weapon.id}#? \r\n#k���ѣ�#r���ٴ�ȷ��ѡ���������һ��ѡ��Ų��˻���`);
    }

    // ������������
    processWeaponGiving() {
        const weapon = this.availableWeapons[this.selection];
        
        this.consumeRequiredItems();
        this.giveWeapon(weapon);
        
        cm.setOneTimeLog('��ȡ��Ҷ����');
        cm.ѭ�����Ŷ���(CONSTANTS.ANIMATION.SUCCESS, CONSTANTS.ANIMATION.DURATION, CONSTANTS.ANIMATION.REPEAT);
        cm.sendNext(`#b�ɹ��������ӣ���� #b#v${weapon.id}##z${weapon.id}#`);
        
        qm.openQuest(CONSTANTS.QUEST.ID, CONSTANTS.QUEST.NPC);
        cm.dispose();
    }
}

// �ű����
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
