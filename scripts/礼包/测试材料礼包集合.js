var status = -1;

function start() {
    status = -1; // 初始化状态
    action(1, 0, 0); // 开始交互
}

function action(mode, type, selection) {
    if (mode == -1) {
        // 玩家选择取消
        cm.dispose();
        return;
    }
    cm.deleteOneTimeLog("暗影币礼包购买进度");
    cm.deleteOneTimeLog("黄金枫叶礼包购买进度");
    cm.deleteOneTimeLog("饰品材料礼包购买进度");
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
        // 显示选项
        var text = "\t\t\t\t#e请选择您感兴趣的材料礼包:#n\r\n\r\n"; // 弹窗标题
        text += "#L0#黄金枫叶#l\t";
        text += "#L1#暗影币#l\t";
        text += "#L2#BOSS材料#l\r\n\r\n";
        text += "#L3#饰品材料#l\t";
        text += "#L4#衣服材料#l\t";
        text += "#L5#武器材料#l\r\n\r\n";
        text += "#L6#手套材料#l\t";
        text += "#L7#鞋子材料#l\t";
        text += "#L8#腰带材料#l\r\n\r\n";
        text += "#L9#披风材料#l\t";
        text += "#L10#神环材料#l\t";
        text += "#L11#坐骑材料#l\r\n\r\n";
        
        cm.sendSimple(text); // 发送简单选项给玩家
    } else if (status == 1) {
        switch(selection)
        {
            case 0:
                //cm.openNpc(9310035, "赏金眼镜");
                cm.dispose();
                cm.openNpc(9900001,"测试黄金枫叶礼包");
                return;
            case 1:
                cm.dispose();
                cm.openNpc(9900001,"测试暗影币礼包");
                return;
            case 2:
                cm.dispose();
                cm.openNpc(9900001,"测试BOSS材料礼包");
                return;
            case 3:
                cm.dispose();
                cm.openNpc(9900001,"测试饰品材料礼包");
                return;
            case 4:
                cm.dispose();
                cm.openNpc(9900001,"测试衣服材料礼包");
                return;
            case 5:
                cm.dispose();
                cm.openNpc(9900001,"测试武器材料礼包");
                return;
            case 6:
                cm.dispose();
                cm.openNpc(9900001,"测试手套材料礼包");
                return;
            case 7:
                cm.dispose();
                cm.openNpc(9900001,"测试鞋子材料礼包");
                return;
            case 8:
                cm.dispose();
                cm.openNpc(9900001,"测试腰带材料礼包");
                return;
            case 9:
                cm.dispose();
                cm.openNpc(9900001,"测试披风材料礼包");
                return;
            case 10:
                cm.dispose();
                cm.openNpc(9900001,"测试神环材料礼包");
                return;
            case 11:
                cm.dispose();
                cm.openNpc(9900001,"测试坐骑材料礼包");
                return;
            default:
                cm.sendOk("选择选项非法，请重新进入");
                cm.dispose();
                return;

        }
        cm.dispose(); // 关闭当前对话
        return;
    }
}