// ����Զ���¼��ű�
// ��Ҫ��������BOSSս�����̣�������ʼ������ҽ��롢�����ͼ�л������ߡ��˺�ͳ�Ƶ�

function init() {
    // ��ʼ���¼�״̬�Ͷӳ�����
    em.setProperty("state", "0");
    em.setProperty("leader", "true");
}

function setup(eim, leaderid) {
    // �����¼�Ϊ�����У��ӳ�����Ϊtrue
    em.setProperty("state", "1");
    em.setProperty("leader", "true");
    // �����µ��¼�ʵ��
    var eim = em.newInstance("ZakumBattle");
    // ��������ս����ͼ
    var map = eim.setInstanceMap(280030000);//ˢ�µ�ͼ
    eim.setProperty("zakSummoned", "0");

    var mob = em.getMonster(8880832);
    map.spawnMonsterOnGroundBelow(mob, new java.awt.Point(759, 17));
    map.resetFully();
    // map.setdamagerank(true) �����˺�ͳ��
    map.setdamagerank(true);//�����˺�ͳ��
    map.clearAllChrDamage();//��ʼ��ͳ���б�
    map.setRankName("��ͨ����");//����boss����
    eim.startEventTimer(1800); // �¼���ʱ1800�루30���ӣ�
    return eim;
}

function playerEntry(eim, player) {
    // ��ҽ����¼���ͼ
    var NowMapID = eim.getProperty("NowMapID");
    var toMapid = 280030000;
    if (NowMapID != null) {
        toMapid = java.lang.Integer.parseInt(NowMapID);
    }
    var map = eim.getMapFactory().getMap(toMapid);
    player.changeMap(map, map.getPortal(0));
    player.dropMessage(-11, "��������?-?1");
    // �������Ѽ���Զ����
    eim.setProperty("isSquadPlayerID_" + player.getId(), "1");
}

function playerRevive(eim, player) {
    // ���������������
    return false;
}

function changedMap(eim, player, mapid) {
    // ��������л���ͼ
    switch (mapid) {
        case 280030000:
            // ���浱ǰִ�е�ͼID
            eim.setProperty("NowMapID", "" + mapid);
            return;
    }
    // �뿪��ս�����Ƴ����
    if (mapid != 280030000) {
        eim.unregisterPlayer(player);
        // �������û������������¼�
        if (eim.disposeIfPlayerBelow(0, 0)) {
            em.setProperty("leader", "true");
            em.setProperty("state", "0");
        }
    }
}

function playerDisconnected(eim, player) {
    // ��ҵ��ߴ���ֱ���Ƴ�
    playerExit(eim, player);
    return 0;
}

function gainchrdamage(eim, string) {
    // ͳ��������ҵ��˺�����¼
    var map = eim.getMapFactory().getMap(280030000);
    var players = eim.getPlayers();
    eim.broadcastPlayerMsg(5, "22222");
    for (var i = 0; i < players.size(); i++) {
        var player = players.get(i);
        if (map.getChrDamage(player.getId())) {
            player.setBossRankCount1(string, map.getChrDamage(player.getId()));
            eim.broadcastPlayerMsg(5, "3333");
        }
    }
    map.setdamagerank(false);//�ر��˺�ͳ��
}

function scheduledTimeout(eim) {
    // �¼���ʱ�������¼�
    end(eim);
}

function monsterValue(eim, mobId) {
    // ���������¼���������������ʱ�ڵ�ͼ������NPC
    if (mobId == 8800002) {
        eim.getMapInstance(0).spawnNpc(9310034, new java.awt.Point(-344, -422));
    }
    return 1;
}

function playerExit(eim, player) {
    // ��������˳��¼�
    eim.unregisterPlayer(player);
    // �������û������������¼�
    if (eim.disposeIfPlayerBelow(0, 0)) {
        em.setProperty("leader", "true");
        em.setProperty("state", "0");
    }
}

function end(eim) {
    // �¼�������������Ҵ��ͳ������������¼�����
    eim.disposeIfPlayerBelow(100, 211042300);//���˳�ȥ�ĵ�ͼ
    em.setProperty("state", "0");
    em.setProperty("leader", "true");
    em.setProperty("zakSummoned", "0");
}

function clearPQ(eim) {
    // ������������end
    end(eim);
}

function allMonstersDead(eim) {
    // ���й�������ʱ���ƽ��¼�״̬��ͳ���˺�
    if (em.getProperty("state").equals("1")) {
        em.setProperty("state", "2");
    } else if (em.getProperty("state").equals("2")) {
        em.setProperty("state", "3");
    }
    gainchrdamage(eim, '��ͨ����');
}

//BOSS����ͳ����������˺���
function gainchrdamage(eim, string) {
    var map = eim.getMapFactory().getMap(280030000);
    var players = eim.getPlayers();
    eim.broadcastPlayerMsg(5, "22222");
    for (var i = 0; i < players.size(); i++) {
        var player = players.get(i);
        if (map.getChrDamage(player.getId())) {
            player.setBossRankCount1(string, map.getChrDamage(player.getId()));
            eim.broadcastPlayerMsg(5, "3333");
        }
    }
    map.setdamagerank(false);//�ر��˺�ͳ��
}

function leftParty(eim, player) { }
function disbandParty(eim) { }
function playerDead(eim, player) {
    // �������ʱ�������Ϊδ��Զ����
    eim.setProperty("isSquadPlayerID_" + player.getId(), "0");
}
function cancelSchedule() { }