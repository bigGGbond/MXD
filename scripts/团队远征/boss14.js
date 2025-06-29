function init() {
    em.setProperty("state", "0");
    em.setProperty("leader", "true");
}

function setup(eim, leaderid) {
    em.setProperty("state", "1");
    em.setProperty("leader", "true");
    var eim = em.newInstance("boss14");	
    var map = eim.setInstanceMap(910033311);//ˢ�µ�ͼ
    eim.setProperty("boss14Summoned", "0");
    var mob = em.getMonster(8240098);
    map.spawnMonsterOnGroundBelow(mob, new java.awt.Point(103, 288));
    map.resetFully();
    // map.setdamagerank(true) �����˺�ͳ��
    map.setdamagerank(true);//�����˺�ͳ��
    map.clearAllChrDamage();//��ʼ��ͳ���б�
    map.setRankName("boss14");//����boss����
    eim.startEventTimer(300); // �¼���ʱ1800�루30���ӣ�
    return eim;
}

function playerEntry(eim, player) {
    var NowMapID = eim.getProperty("NowMapID");
    var toMapid = 910033311;
    if (NowMapID != null) {
        toMapid = java.lang.Integer.parseInt(NowMapID);
    }
    var map = eim.getMapFactory().getMap(toMapid);
    player.changeMap(map, map.getPortal(0));
	player.dropMessage(-11,"����boss14ս��");
    //����Զ���������Ϣ
    eim.setProperty("isSquadPlayerID_" + player.getId(), "1");
    //var map = eim.getMapInstance(0);
    //player.changeMap(map, map.getPortal(0));
}

function playerRevive(eim, player) {
    return false;
}

function changedMap(eim, player, mapid) {
    switch (mapid) {
        case 910033311:
            //���浱ǰִ�е�ͼID
            eim.setProperty("NowMapID", "" + mapid);
            return;
    }

    if (mapid != 910033311) {
        eim.unregisterPlayer(player);
        if (eim.disposeIfPlayerBelow(0, 0)) {
            em.setProperty("leader", "true");
            em.setProperty("state", "0");
        }
    }
}

function playerDisconnected(eim, player) {
    playerExit(eim, player);
    return 0;
    //return 0;
}
function gainchrdamage(eim, string) {
     var map = eim.getMapFactory().getMap(910033311);
     var players = eim.getPlayers();
	  eim.broadcastPlayerMsg(5, "22222");
     for (var i = 0; i < players.size(); i++) {
        var player = players.get(i);
		if(map.getChrDamage(player.getId())){
        player.setBossRankCount1(string, map.getChrDamage(player.getId()));
		 eim.broadcastPlayerMsg(5, "3333");
		}
	}
	map.setdamagerank(false);//�ر��˺�ͳ��
}
function scheduledTimeout(eim) {
    end(eim);
}

function monsterValue(eim, mobId) {
	if (mobId == 8240098) {  // ����Ϊ�µ�BOSS ID
		eim.getMapInstance(0).spawnNpc(9310034, new java.awt.Point(-344, -422));
	}
    return 1;
}

function playerExit(eim, player) {
    eim.unregisterPlayer(player);

    if (eim.disposeIfPlayerBelow(0, 0)) {
        em.setProperty("leader", "true");
        em.setProperty("state", "0");
    }
}

function end(eim) {
    eim.disposeIfPlayerBelow(100, 211042300);//���˳�ȥ�ĵ�ͼ
    em.setProperty("state", "0");
    em.setProperty("leader", "true");
    em.setProperty("boss14Summoned", "0");
}

function clearPQ(eim) {
    end(eim);
}

function allMonstersDead(eim) {
    if (em.getProperty("state").equals("1")) {
        em.setProperty("state", "2");
    } else if (em.getProperty("state").equals("2")) {
        em.setProperty("state", "3");
    }
	gainchrdamage(eim,'boss14');  // ����BOSS��ʶ
    // var players = eim.getPlayers();
    // for (var i = 0; i < players.size(); i++) {
    //     var player = players.get(i);
    //     player.openNpc(9900001, "�Ŷ�Զ������");
    // }
}
//BOSS����ͳ����������˺���
function gainchrdamage(eim, string) {
     var map = eim.getMapFactory().getMap(910033311);
     var players = eim.getPlayers();
	  eim.broadcastPlayerMsg(5, "22222");
     for (var i = 0; i < players.size(); i++) {
        var player = players.get(i);
		if(map.getChrDamage(player.getId())){
        player.setBossRankCount1(string, map.getChrDamage(player.getId()));
		 eim.broadcastPlayerMsg(5, "3333");
		}
	}
	map.setdamagerank(false);//�ر��˺�ͳ��
}
function leftParty(eim, player) {}
function disbandParty(eim) {}
function playerDead(eim, player) {
    eim.setProperty("isSquadPlayerID_" + player.getId(), "0");
}
function cancelSchedule() {}