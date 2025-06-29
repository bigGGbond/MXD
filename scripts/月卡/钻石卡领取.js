
var 美化1 = "#fUI/ChatBalloon.img/pet/260/nw#"; //选择道具
var 美化3 = "#fUI/ChatBalloon.img/pet/260/ne#"; //选择道具
var 美化2 = "#fUI/ChatBalloon.img/pet/260/n#"; //选择道具
var 美化4 = "#fUI/ChatBalloon.img/pet/260/sw#"; //选择道具
var 美化5 = "#fUI/ChatBalloon.img/pet/260/se#"; //选择道具
var 美化6 = "#fUI/ChatBalloon.img/pet/260/s#"; //选择道具

var 元宝价格 = 39800; // 设置价格
var status = 0;

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
        if (mode == 1) {
            status++;
        } else {
            cm.dispose();
            return;
        }
        if (status == 0) {
            var text = "#k#d" + 美化1 + "" + 美化2 + "" + 美化2 + "" + 美化2 + "" + 美化2 + "" + 美化2 + "" + 美化2 + "" + 美化2 + "" + 美化2 + "" + 美化2 + "" + 美化2 + "#r#e『至尊会员』#d#n(一次性领取)" + 美化2 + "" + 美化2 + "" + 美化2 + "" + 美化2 + "" + 美化2 + "" + 美化2 + "" + 美化2 + "" + 美化2 + "" + 美化2 + "" + 美化2 + "" + 美化3 + "#w#k#e\r\n\r\n"
            text += " (#r1#b)[点券 ： #r#e388888#k]\r\n";
            text += " (#r2#b)[金币 ： #r#e5E#k]\r\n";
            text += " (#r3#b)[#v2070005:# #b4转便捷转职（当前职业所有技能0级） #k ]\r\n";
            text += " (#r4#b)[ #v1142443:# #b 至尊勋章  ]\r\n";
            text += " (#r5#b)[ #v+4440300:# #b C级力量宝石 #kX30给时装随机增加四维 #k]\r\n\r\n";
            text += " (#r6#b)[ #v+2022582:# #b 洗血宝石 #kX500增加HPMP上限 #k]\r\n\r\n";
            text += " (#r7#b)[ #v+2022467:# #b 至尊抽奖箱 #kX10抽取各种稀有装备材料 #k]\r\n\r\n";
            text += " (#r8#b)[ #v+2022465:# #b 王者抽奖箱 #kX20抽取各种稀有装备材料 #k]\r\n\r\n";
            text += " (#r19#b)[#v2022519:# #b新手成就宝典额外奖励 #k× 1]\r\n";
            // text += " [ #v+1052613:##v+1102563:##v+1012377:##v+1022150:##v+1032095:##v+1072786:##v+2022580:# #k]\r\n\r\n";
            text += " (#r10#b)[#v5211060:# #b购买三倍经验权限 #k× 1]\r\n";
            text += " (#r11#b)[#v5360017# #b购买三倍爆率权限 #k× 1]\r\n";
            text += " (#r12#b)[#v4170006:# #b副本嘉年华奖励翻倍，跑环额外奖励#k]\r\n\r\n"
            text += " (#r13#b)[内挂:自动攻击、自动BUFF等额外功能权限]\r\n\r\n"
            text += "您是否愿意花费#r39800元宝#k来购买至尊会员？\r\n";
            cm.sendYesNo(text);
        } else if (status == 1) {
            if (cm.getPlayer().getOneTimeLog("至尊会员") > 0) {
                cm.sendOk("您已经购买过了至尊会员，请确认！");
                cm.dispose();
			if (cm.getInventory(1).isFull(8)) {
					cm.sendNext("#b装备栏 空间不足 9 格");
					cm.dispose();
					return;
				}
				if (cm.getInventory(2).isFull(5)) {
					cm.sendNext("#b消耗栏 空间不足 6 格");
					cm.dispose();
					return;
				}
				if (cm.getInventory(3).isFull(5)) {
					cm.sendNext("#b设置栏 空间不足 6 格");
					cm.dispose();
					return;
				}
				if (cm.getInventory(4).isFull(5)) {
					cm.sendNext("#b其他栏 空间不足 6 格");
					cm.dispose();
					return;
				}
				if (cm.getInventory(5).isFull(5)) {
					cm.sendNext("#b特殊栏 空间不足 6 格");
					cm.dispose();
					return;
				}	
            } else if (cm.getPlayer().getzb() < 元宝价格) {
                cm.sendOk("您的元宝不足，无法购买至尊会员。");
                cm.dispose();
            // } else if (!cm.canHold(3)) { 
                // cm.sendOk("#b请确认背包栏位有足够的空间，以便领取奖励。");
                // cm.dispose();
				
            } else {
                cm.gainzb(-元宝价格); // 扣除元宝

                cm.setOneTimeLog("至尊会员"); // 设置为已购买
                cm.setOneTimeLog("至尊会员1"); // 设置为已购买
				给内挂();
                // 发放奖励
                cm.给点券(388888);
                cm.gainMeso(500000000);
                // cm.gainItem(4001126, 30000);
                cm.gainItem(4440300, 30);
                cm.gainItem(4310115, 30000);
                cm.gainItem(2022467, 10);
                cm.gainItem(2022465, 20);
                cm.gainItem(2022582, 500);
                // cm.gainItem(1072786, 1);
                // cm.gainItem(1102563, 1);
                cm.给属性装备(1142443, 0, 0, 5, 5, 5, 5, 1000, 1000, 5, 5, 0, 0, 0, 0, 10, 10);
                // cm.给属性装备(1802100, 0, 0, 5, 5, 5, 5, 500, 500, 5, 5, 0, 0, 0, 0, 0, 0);
                // cm.给属性装备(1902000, 0, 0, 3, 3, 3, 3, 0, 0, 3, 3, 0, 0, 0, 0, 0, 0);

                cm.sendOk("成功购买了至尊会员！");
                cm.全服黄色喇叭(cm.getPlayer().getName() + " [★★★至尊会员★★★]" + " : " + "成功领取了至尊会员奖励！");
                cm.dispose();
            }
        }
    }
}

function 给内挂(){
    var con = null;
    var ps = null;
    var rs = null;

    try {
        con = Packages.database.DBConPool.getInstance().getDataSource().getConnection();

        // 检查是否已经存在记录
        ps = con.prepareStatement("SELECT function FROM 网关_内挂授权 WHERE charactersId = ?");
        ps.setInt(1, cm.getPlayer().getId());
        rs = ps.executeQuery();

        if (rs.next()) {
            // 记录存在，读取 function 的值
            var functionValue = rs.getString("function");

            // 更新第二个和第四个字符为1
            var functionArray = functionValue.split("|");
            functionArray[0] = "1";
            functionArray[1] = "1";
            functionArray[2] = "1";
            functionArray[3] = "1";
            var newFunctionValue = functionArray.join("|");

            // 更新记录
            ps.close();
            ps = con.prepareStatement("UPDATE 网关_内挂授权 SET function = ? WHERE charactersId = ?");
            ps.setString(1, newFunctionValue);
            ps.setInt(2, cm.getPlayer().getId());
            ps.executeUpdate();

        } else {
            // 记录不存在，插入新记录
            ps.close();
            ps = con.prepareStatement("INSERT INTO 网关_内挂授权 (charactersId, startTime, endTime, function) VALUES (?, ?, ?, ?)");
            ps.setInt(1, cm.getPlayer().getId());

            var currentTimeMillis = java.lang.System.currentTimeMillis();
            ps.setTimestamp(2, new java.sql.Timestamp(currentTimeMillis));
            var endTimeMillis = currentTimeMillis + 99 * 365 * 24 * 60 * 60 * 1000;
            ps.setTimestamp(3, new java.sql.Timestamp(endTimeMillis));

            ps.setString(4, "1|1|1|1|0|0|0|0|0|0|0|0|0|0|0|0|0|0|0|0|0|0|0|0");
            ps.executeUpdate();
        }

    } catch (e) {
        // 处理异常
        e.printStackTrace();
    } finally {
        if (rs != null) {
            try {
                rs.close();
            } catch (e) {
                e.printStackTrace();
            }
        }
        if (ps != null) {
            try {
                ps.close();
            } catch (e) {
                e.printStackTrace();
            }
        }
        if (con != null) {
            try {
                con.close();
            } catch (e) {
                e.printStackTrace();
            }
        }
    }

}