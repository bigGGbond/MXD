/* ==================
 �ű�����: NPC	    
 �ű����ߣ�TTL������   
 ��ϵ��ʽqq��111111111111
 =====================
 */
var С�̻� = "#fMap/MapHelper/weather/squib/squib4/1#";
var ���� = "#fMap/MapHelper/weather/tree/4#"; //����
var �۰��� = "#fItem/Etc/0427/04270005/Icon8/1#";
var С��ʹ = "#fItem/Cash/0501/05010006/effect/default/2#";
var aaa = "#fUI/UIWindow.img/Quest/icon9/0#";//��ɫ�Ҽ�ͷ
var �� = "#fUI/Basic/CheckBox/0#";   //�п�� �ޡ�
var �� = "#fUI/Basic/CheckBox/1#";   //�п�� �С�
var ���� = "#fItem/Cash/0502/05021008/info/iconRaw#";
var ��ɫСͼƬ = "#fUI/UIWindow.img/Item/BtSort/mouseOver/0#";//��ɫСͼƬ
var Բ�� = "#fUI/UIWindow/Quest/icon3/6#";
var ���ͼ = "#fUI/UIWindow/QuestIcon/7/0#";

// boss����
var boss_CONFIG = {
    "����": {
        bossId: 8920000,
        ��͵ȼ�: 100,
        ���ƴ���: 4,
        �¼�����: "Clockboss",
        Զ��������: "ClockSquad",
        ��ս��ͼ: 220080001,
        �Ѷ�Ҫ��: 1  // ��Ҫ���Ŷ�boss�Ѷ�ֵ
    },
    "����": {
        bossId: 8920000,
        ��͵ȼ�: 100,
        ���ƴ���: 100,
        �¼�����: "ChaosZakum",
        Զ��������: "ChaosZak",
        ��ս��ͼ: 280030001,
        �Ѷ�Ҫ��: 2
    },
    "����": {
        bossId: 8920000,
        ��͵ȼ�: 120,
        ���ƴ���: 3,
        �¼�����: "HorntailBattle",
        Զ��������: "Horntail",
        ��ս��ͼ: 240060200,
        �Ѷ�Ҫ��: 3
    },
    "boss-4": {
        bossId: 8920000,
        ��͵ȼ�: 100,
        ���ƴ���: 4,
        �¼�����: "boss4",
        Զ��������: "boss4Squad",
        ��ս��ͼ: 100000000,
        �Ѷ�Ҫ��: 4
    },
    "boss-5": {
        bossId: 8920000,
        ��͵ȼ�: 100,
        ���ƴ���: 4,
        �¼�����: "boss5",
        Զ��������: "boss5Squad",
        ��ս��ͼ: 100000000,
        �Ѷ�Ҫ��: 5
    },
    "boss-6": {
        bossId: 8920000,
        ��͵ȼ�: 100,
        ���ƴ���: 4,
        �¼�����: "boss6",
        Զ��������: "boss6Squad",
        ��ս��ͼ: 100000000,
        �Ѷ�Ҫ��: 6
    },
    "boss-7": {
        bossId: 8920000,
        ��͵ȼ�: 100,
        ���ƴ���: 4,
        �¼�����: "boss7",
        Զ��������: "boss7Squad",
        ��ս��ͼ: 910000001,
        �Ѷ�Ҫ��: 7
    },
    "boss-8": {
        bossId: 8910000,
        ��͵ȼ�: 100,
        ���ƴ���: 4,
        �¼�����: "boss8",
        Զ��������: "boss8Squad",
        ��ս��ͼ: 910000002,
        �Ѷ�Ҫ��: 8
    },
    "boss-9": {
        bossId: 8900000,
        ��͵ȼ�: 100,
        ���ƴ���: 4,
        �¼�����: "boss9",
        Զ��������: "boss9Squad",
        ��ս��ͼ: 910000003,
        �Ѷ�Ҫ��: 9
    },
    "boss-10": {
        bossId: 8860000,
        ��͵ȼ�: 100,
        ���ƴ���: 4,
        �¼�����: "boss10",
        Զ��������: "boss10Squad",
        ��ս��ͼ: 910000004,
        �Ѷ�Ҫ��: 10
    },
    "boss-11": {
        bossId: 8880000,
        ��͵ȼ�: 100,
        ���ƴ���: 4,
        �¼�����: "boss11",
        Զ��������: "boss11Squad",
        ��ս��ͼ: 910000005,
        �Ѷ�Ҫ��: 11  // ȷ�������ֶ������ַ���
    },
    "boss-12": {
        bossId: 8645009,
        ��͵ȼ�: 100,
        ���ƴ���: 4,
        �¼�����: "boss12",
        Զ��������: "boss12Squad",
        ��ս��ͼ: 910000006,
        �Ѷ�Ҫ��: 12
    },
    "boss-13": {
        bossId: 8880140,
        ��͵ȼ�: 100,
        ���ƴ���: 4,
        �¼�����: "boss13",
        Զ��������: "boss13Squad",
        ��ս��ͼ: 910000007,
        �Ѷ�Ҫ��: 13
    },
    "boss-14": {
        bossId: 8240098,
        ��͵ȼ�: 100,
        ���ƴ���: 4,
        �¼�����: "boss14",
        Զ��������: "boss14Squad",
        ��ս��ͼ: 910000008,
        �Ѷ�Ҫ��: 14
    }
};
var status;
var selectedboss = null;
var fbmc = null;
var bossLevel = 0;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (status >= 0 && mode == 0) {
            cm.sendOk("��л��Ĺ��٣�");
            cm.dispose();
            return;
        }
        if (mode == 1) {
            status++;
        } else {
            status--;
        }

        if (status == 0) {

            var bossLevel = parseInt(cm.getBossLog("�Ŷ�BOSS�Ѷ�"));
            var availableBosses = [];

            for (var bossName in boss_CONFIG) {
                if (parseInt(boss_CONFIG[bossName].�Ѷ�Ҫ��) === bossLevel) {
                    availableBosses.push(bossName);
                }
            }
            if (selection < 0 || selection >= availableBosses.length) {
                cm.sendOk("ѡ����Ч��������ѡ��");
                cm.dispose();
                return;
            }

            selectedboss = boss_CONFIG[availableBosses[selection]];
            fbmc = availableBosses[selection];

            if (cm.getPlayer().getLevel() < selectedboss.��͵ȼ�) {
                cm.sendOk("��ĵȼ���δ�ﵽ" + selectedboss.��͵ȼ� + "��");
                cm.dispose();
                return;
            }
            if (cm.getBossLog(fbmc) >= selectedboss.���ƴ���) {
                cm.sendOk("�ܱ�Ǹÿ��ֻ�ܴ�" + selectedboss.���ƴ��� + "��..");
                cm.dispose();
                return;
            }
            if (cm.getPlayerCount(selectedboss.��ս��ͼ) >= 1) {
                cm.sendOk("�Ѿ��ж�����������ս�ˡ�");
                cm.dispose();
                return;
            }

            var emm = cm.getEventManager(selectedboss.�¼�����);
            if (emm == null) {
                cm.sendOk("�¼������ڣ�����ϵ����Ա��");
                cm.dispose();
                return;
            }

            var prop = emm.getProperty("state");
            var marr = cm.getQuestRecord(160102);
            var data = marr.getCustomData();
            if (data == null) {
                marr.setCustomData("0");
                data = "0";
            }
            if (prop == null || prop.equals("0")) {
                var squadAvailability = cm.getSquadAvailability(selectedboss.Զ��������);
                if (squadAvailability == -1) {
                    var text = "";
                    text += "#L8#������Ȥ��ΪԶ���ӳ���?(������ս���� [#r" + cm.getBossLog(fbmc) + "#k/" + selectedboss.���ƴ��� + "])\r\n\r\n";
                    text += "\r\n\r\n#r#e���� #k#n���� #r#e���� #bԶ���Ӽ�����ս����+1\r\n";
                    text += "#r#e���� #k#n���� #r#e���� #bԶ���Ӽ�����ս����+1\r\n";
                    text += "#r#e���� #k#n���� #r#e���� #bԶ���Ӽ�����ս����+1\r\n";
                    cm.sendYesNo(text);
                } else if (squadAvailability == 1) {
                    var type = cm.isSquadLeader(selectedboss.Զ��������);
                    if (type == -1) {
                        cm.sendOk("Զ�����ѽ����������µǼǡ�");
                        cm.dispose();
                    } else if (type == 0) {
                        var memberType = cm.isSquadMember(selectedboss.Զ��������);
                        if (memberType == 2) {
                            cm.sendOk("���Ѿ���Զ���ӳ��߳�.");
                            cm.dispose();
                        } else if (memberType == 1) {
                            var text = "";
                            text += "������ʲô? \r\n";
                            text += "������ս���� [#r" + cm.getBossLog(fbmc) + "#k/" + selectedboss.���ƴ��� + "]\r\n\r\n";
                            text += "#b#L0#�鿴��Ա#l\r\n";
                            text += "#b#L1#����Զ����#l\r\n";
                            text += "#b#L2#�˳�Զ����#l\r\n";
                            text += "\r\n\r\n#r#e���� #k#n���� #r#e���� #bԶ���Ӽ�����ս����+1\r\n";
                            text += "#r#e���� #k#n���� #r#e���� #bԶ���Ӽ�����ս����+1\r\n";
                            text += "#r#e���� #k#n���� #r#e���� #bԶ���Ӽ�����ս����+1\r\n";
                            cm.sendSimple(text);
                        } else if (memberType == -1) {
                            cm.sendOk("Զ�����ѽ����������µǼǡ�");
                            cm.dispose();
                        } else {
                            var text = "";
                            text += "������ʲô? \r\n";
                            text += "������ս���� [#r" + cm.getBossLog(fbmc) + "#k/" + selectedboss.���ƴ��� + "]\r\n\r\n";
                            text += "#b#L0#�鿴��Ա#l\r\n";
                            text += "#b#L1#����Զ����#l\r\n";
                            text += "#b#L2#�˳�Զ����#l\r\n";
                            // text += "#r#L7#�����ʼ��ս#l\r\n";
                            text += "\r\n\r\n#r#e���� #k#n���� #r#e���� #bԶ���Ӽ�����ս����+1\r\n";
                            text += "#r#e���� #k#n���� #r#e���� #bԶ���Ӽ�����ս����+1\r\n";
                            text += "#r#e���� #k#n���� #r#e���� #bԶ���Ӽ�����ս����+1\r\n";
                            cm.sendSimple(text);
                        }
                    } else {
                        var text = "";
                        text += "������ʲô? \r\n";
                        text += "������ս���� [#r" + cm.getBossLog(fbmc) + "#k/" + selectedboss.���ƴ��� + "]\r\n\r\n";
                        text += "#b#L4#�鿴��Ա#l\r\n";
                        text += "#r#L7#�����ʼ��ս#l\r\n";
                        text += "\r\n\r\n#r#e���� #k#n���� #r#e���� #bԶ���Ӽ�����ս����+1\r\n";
                        text += "#r#e���� #k#n���� #r#e���� #bԶ���Ӽ�����ս����+1\r\n";
                        text += "#r#e���� #k#n���� #r#e���� #bԶ���Ӽ�����ս����+1\r\n";
                        cm.sendSimple(text);
                    }
                } else {
                    var props = emm.getProperty("leader");
                    if (props != null && props.equals("true")) {
                        var eim = cm.getDisconnected(selectedboss.�¼�����);
                        if (eim == null) {
                            cm.sendOk("Զ������BOSS��ս���Ѿ���ʼ��");
                            cm.dispose();
                        } else {
                            cm.sendOk("Զ������BOSS��ս���Ѿ���ʼ��");
                            cm.dispose();
                        }
                    } else {
                        cm.sendOk("�ܱ�Ǹ���Զ���Ӷӳ��뿪���ֳ��������㲻���ٷ���ս����");
                        cm.dispose();
                    }
                }
            } else {
                var props = emm.getProperty("leader");
                if (props != null && props.equals("true")) {
                    var eimc = emm.getInstance(selectedboss.�¼�����);
                    var propsc = eimc.getProperty("isSquadPlayerID_" + cm.getPlayer().getId());
                    var sayc = "\r\n" + (eimc == null ? "eimc is null" : propsc) + "\r\n";
                    if ((eimc != null) && (propsc != null) && propsc.equals("1")) {
                        status = 13;
                        sayc += "#b�����Ƿ�Ҫ���·���Զ�������ڳ��أ�";
                        sayc += "\r\n#r#L1#���·���Զ�������ڳ���#l";
                        cm.sendSimple(sayc);
                    } else {
                        cm.sendOk("Զ������BOSS��ս���Ѿ���ʼ��" + sayc);
                        cm.dispose();
                    }
                } else {
                    var eimd = emm.getInstance(selectedboss.�¼�����);
                    var propsd = eimd.getProperty("isSquadPlayerID_" + cm.getPlayer().getId());
                    var sayd = "\r\n" + (eimd == null ? "eimd is null" : propsd) + "\r\n";
                    if ((eimd != null) && (propsd != null) && propsd.equals("1")) {
                        status = 13;
                        sayd += "#b�����Ƿ�Ҫ���·���Զ�������ڳ��أ�";
                        sayd += "\r\n#r#L1#���·���Զ�������ڳ���#l";
                        cm.sendSimple(sayd);
                    } else {
                        cm.sendOk("�ܱ�Ǹ���Զ���Ӷӳ��뿪���ֳ��������㲻���ٷ���ս����");
                        cm.dispose();
                    }
                }
            }
        } else if (status == 1) {
            if (selection == 0) {
                if (!cm.getSquadList(Զ��������, 0)) {
                    cm.sendOk("����δ֪���������Զ���ӵ����󱻾ܾ���");
                    cm.dispose();
                } else {
                    cm.dispose();
                }
            } else if (selection == 1) {
                var ba = cm.addMember(selectedboss.Զ��������, true);
                if (ba == 2) {
                    cm.sendOk("Զ��������Ա�����Ժ����ԡ�");
                } else if (ba == 1) {
                    cm.setBossLog(fbmc);
                    cm.sendOk("���ѳɹ�����Զ���ӡ�");
                } else {
                    cm.setBossLog(fbmc);
                    cm.sendOk("���ѳɹ�����Զ���ӡ�");
                }
                cm.dispose();
            } else if (selection == 2) {
                var baa = cm.addMember(selectedboss.Զ��������, false);
                if (baa == 1) {
                    cm.sendOk("���ѳɹ���Զ�������˳���");
                } else {
                    cm.sendOk("�㲻��Զ���ӵ�һԱ��");
                }
                cm.dispose();
            } else if (selection == 4) {
                if (!cm.getSquadList(selectedboss.Զ��������, 0)) {
                    cm.sendOk("����δ֪�����޷��鿴Զ���ӳ�Ա�б�");
                }
                status = -1;
                return;
            } else if (selection == 5) {
                status = 11;
                if (!cm.getSquadList(selectedboss.Զ��������, 1)) {
                    cm.sendOk("����δ֪���������Զ���ӵ����󱻾ܾ���");
                    cm.safeDispose();
                }
            }

            else if (selection == 6) {
                status = 12;
                if (!cm.getSquadList(selectedboss.Զ��������, 2)) {
                    cm.sendOk("����δ֪���������Զ���ӵ����󱻾ܾ���");
                    cm.safeDispose();
                }

            }
            else if (selection == 7) {
                if (cm.getSquad(selectedboss.Զ��������) != null) {
                    var dd = cm.getEventManager(selectedboss.�¼�����);
                    dd.startInstance(cm.getSquad(selectedboss.Զ��������), cm.getMap(), 160102);
                    cm.dispose();
                }
            } else if (selection == 8) {
                if (cm.registerSquad(selectedboss.Զ��������, 5, " ������ΪԶ���ӳ����������μӣ����ڹ涨ʱ���ڼ���Զ���ӡ�")) {
                    cm.setBossLog(fbmc);
                    cm.sendOk("�㱻����ΪԶ���ӳ�����������5��������Եȴ���ĳ�Ա���롣");
                    cm.dispose();
                } else {
                    cm.sendOk("���Զ����ʱ��������");
                    cm.dispose();
                }
            }
        } else if (status == 13) {
            var emh = cm.getEventManager(selectedboss.�¼�����);
            if ((selection == 1) && (emh != null)) {
                var eim = emh.getInstance(selectedboss.�¼�����);
                if ((eim != null) && (eim.getProperty("isSquadPlayerID_" + cm.getPlayer().getId()) != null)) {
                    eim.registerPlayer(cm.getPlayer());
                }
            }
            cm.dispose();
        }
    }
}

