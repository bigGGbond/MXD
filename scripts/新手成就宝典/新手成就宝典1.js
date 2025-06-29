var 金币图 = "#fUI/UIWindow/QuestIcon/7/0#";
var 感叹号 = "#fUI/UIWindow/Quest/icon0#";
var 分割线 = "#fUI/CashShop.img/CSDiscount/Line#";
var 圆形 = "#fUI/UIWindow/Quest/icon3/6#";
var 需要材料 = [
//不用管 ，0金币1点券2抵用 道具id   数量
[0,1012530,1],
[0,1072660,1],
[0,1082430,1],
[0,1052457,1],
[0,1022135,1],
[0,1032111,1],
[0,2022520,1],
[0,1122058,1],
[0,1132005,1],
[0,0,888888]
// [0,1,55555],
// [0,2,66]

];
function start() {
    status = -1;

    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (status >= 0 && mode == 0) {

            cm.sendOk("感谢你的光临！");
            cm.dispose();
            return;
        }
        if (mode == 1) {
            status++;
        } else {
            status--;
        }
        if (status == 0) {
			if(cm.getOneTimeLog("新手礼包")>=1){
				cm.sendOk("您已经完成过该任务了");
				cm.dispose();
				return;
			}
            var text = "";
			text += "#d" + 美化1 + "" + 美化2 + "" + 美化2 + "" + 美化2 + "" + 美化2 + "" + 美化2 + "" + 美化2 + "" + 美化2 + "「新手必做」#n" + 美化2 + "" + 美化2 + "" + 美化2 + "" + 美化2 + "" + 美化2 + "" + 美化2 + "" + 美化2 + "" + 美化3 + "#k#k#w\r\n\r\n";
			text += "     #r"+爱心2 +" 新手任务一：【领取新手礼包】，礼包内容如下\r\n\r\n";//
			
			for(var i=0;i<需要材料.length;i++){
				if(需要材料[i][1]==0){
					text += " " + 圆形 + "#k#n奖励"+金币图+": [  #k需要"+需要材料[i][2]+" #k]#k#n\r\n"
				}
				if(需要材料[i][1]==1){
					text += " " + 圆形 + "#k#n奖励 点券: [ #r"+需要材料[i][2]+" #k]#k#n\r\n"
				}
				if(需要材料[i][1]==2){
					text += " " + 圆形 + "#k#n奖励 抵用: [ #r"+需要材料[i][2]+" #k]#k#n\r\n"
				}
				if(需要材料[i][1]>=1000000&&需要材料[i][1]<=5999999){
					text += " " + 圆形 + "#k#n奖励#v"+需要材料[i][1]+":##z"+需要材料[i][1]+"#: [ #k "+需要材料[i][2]+" #k ]#k#n\r\n"
				
				}
			}
			text += "     #L1##r"+爱心2 +"  点我领取新手礼包  "+爱心2+"  "+(cm.getOneTimeLog("新手礼包")>=1 ? "#g已完成#k#n" : "#r未完成#n#k")+"#l\r\n\r\n";//
			
			
			text += "#r" + 美化4 + "" + 美化6 + "" + 美化6 + "" + 美化6 + "" + 美化6 + "" + 美化6 + "" + 美化6 + "" + 美化6 + "" + 美化6 + "" + 美化6 + "" + 美化6 + "" + 美化6 + "" + 美化6 + "" + 美化6 + "" + 美化6 + "" + 美化6 + "" + 美化6 + "" + 美化6 + "" + 美化6 + "" + 美化6 + "" + 美化6 + "" + 美化5 + "#k#k\r\n";
			 cm.sendOk(text); 
		
        } else if (status == 1) {
			
			if(cm.getInventory(1).isFull(5)){
				cm.sendOk("装备栏 空间不足 6格");
				cm.dispose();
				return;
			}
			if(cm.getInventory(2).isFull(5)){
				cm.sendOk("消耗栏 空间不足 6格");
				cm.dispose();
				return;
			}
			if(cm.getInventory(4).isFull(5)){
				cm.sendOk("其他栏 空间不足 6格");
				cm.dispose();
				return;
			}
			if(cm.getInventory(5).isFull(5)){
				cm.sendOk("特殊栏 空间不足 6格");
				cm.dispose();
				return;
			}
			
			for(var i=0;i<需要材料.length;i++){
				if(需要材料[i][1]==0){
					cm.gainMeso(需要材料[i][2]);
				}
				if(需要材料[i][1]==1){
					cm.gainNX(需要材料[i][2]);
				}
				if(需要材料[i][1]==2){
					cm.gainDY(需要材料[i][2]);
				}
				if(需要材料[i][1]>=1000000&&需要材料[i][1]<=5999999){
					cm.gainItem(需要材料[i][1],需要材料[i][2]);
				}
				
			}
			cm.喇叭(6, "[新手必做] : 恭喜玩家" + cm.getPlayer().getName() + "完成【新手礼包】获得奖励");
			cm.gainOneTimeLog("新手礼包",1);
			cm.sendOk("领取成功");
			qm.循环播放动画("Effect/OnUserEff.img/guideEffect/aranTutorial/ui0",3000,3);
			    
			cm.dispose();
			return;
			
			
        }
    }
}

var 制作 = "#fUI/UIWindow/Maker/BtStart/mouseOver/0#";
var 推荐 = "#fUI/UIWindow/Shop/TabBuy/enabled/1#";
var 右边 = "#fUI/UIWindow/UserList/Guild/GuildRank/BtRight/normal/0#";
var 金锤子 = "#fUI/UIWindow/ViciousHammer/EffectP/1#";
var 向下 = "#fUI/UIWindow/MinigameTable/BtDown/mouseOver/0#";
var 红枫 = "#fUI/UIWindow/MonsterCarnival/icon0#";
var 蓝枫 = "#fUI/UIWindow/MonsterCarnival/icon1#";
var 上升 = "#fUI/StatusBar/QuickSlot/ani/1#";
var 金币 = "#fUI/UIWindow/TradingRoom/BtCoin/normal/0#";
var 邪恶小兔 = "#fEffect/CharacterEff/1112960/3/0#";  //邪恶小兔 【小】var 美化1 = "#fUI/ChatBalloon.img/169/nw#"; //选择道具
var 美化1 = "#fUI/ChatBalloon.img/169/nw#"; //选择道具
var 美化3 = "#fUI/ChatBalloon.img/169/ne#"; //选择道具
var 美化2 = "#fUI/ChatBalloon.img/169/n#"; //选择道具
var 美化4 = "#fUI/ChatBalloon.img/169/sw#"; //选择道具
var 美化5 = "#fUI/ChatBalloon.img/169/se#"; //选择道具
var 美化6 = "#fUI/ChatBalloon.img/169/s#"; //选择道具
var 礼包物品 = "#v1302000#";
var 美化1 = "#fUI/ChatBalloon.img/pet/185/nw#";//选择道具
var 美化3 = "#fUI/ChatBalloon.img/pet/185/ne#";//选择道具
var 美化2 = "#fUI/ChatBalloon.img/pet/185/n#";//选择道具
var 美化4 = "#fUI/ChatBalloon.img/pet/185/sw#";//选择道具
var 美化5 = "#fUI/ChatBalloon.img/pet/185/se#";//选择道具
var 美化6 = "#fUI/ChatBalloon.img/pet/185/s#";//选择道具
var 美化7 = "#fUI/ChatBalloon.img/156/arrow#";//选择道具
var x1 = "1302000,+1";// 物品ID,数量
var x2;
var x3;
var x4;
var 爱心 = "#fEffect/CharacterEff/1022223/4/0#";
var 礼包物品 = "#v1302000#";
var add = "#fEffect/CharacterEff/1112903/0/0#";//红桃心
var aaa = "#fUI/UIWindow.img/Quest/icon9/0#";//红色右箭头
var zzz = "#fUI/UIWindow.img/Quest/icon8/0#";//蓝色右箭头
var sss = "#fUI/UIWindow.img/QuestIcon/3/0#";//选择道具
var 正方箭头 = "#fUI/Basic/BtHide3/mouseOver/0#";
var 感叹号 = "#fUI/UIWindow/Quest/icon0#";
var 美化new = "#fUI/UIWindow/Quest/icon5/1#";
var 红色箭头 = "#fEffect/CharacterEff/1112908/0/1#";  //彩光3
var ttt1 = "#fEffect/CharacterEff/1062114/1/0#";  //爱心
var 蓝色角点 = "#fUI/UIWindow.img/PvP/Scroll/enabled/next2#";
var 正方箭头 = "#fUI/Basic/BtHide3/mouseOver/0#";
var 爱心 = "#fEffect/CharacterEff/1022223/4/0#";
var 粉爱心 = "#fItem/Etc/0427/04270005/Icon8/1#";  //
var 菊花 = "#fUI/PredictHarmony/card/19#";//卡片效果菊花
var 笑 = "#fUI/GuildBBS/GuildBBS/Emoticon/Basic/0#";//笑脸
var 金枫叶 ="#fMap/MapHelper/weather/maple/2#";
var 红枫叶 ="#fMap/MapHelper/weather/maple/1#";
var 巫女 ="#fMap/MapHelper/weather/witch/0#";//巫女
var 气球 ="#fMap/MapHelper/weather/balloon/4#";//气球
var 射箭 ="#fMap/MapHelper/weather/LoveEffect2/4/0#";//射箭
var 玫瑰 ="#fMap/MapHelper/weather/rose/0#";//玫瑰花
var 烟花 ="#fMap/MapHelper/weather/squib/squib1/3#";//烟花
var 爱心1 ="#fEffect/CharacterEff.img/1112946/0/0#";
var 爱心2 ="#fEffect/CharacterEff.img/1112905/0/1#";
var 爱心3 ="#fEffect/CharacterEff.img/1112946/1/0#";
var 爱心4 ="#fEffect/CharacterEff.img/1112946/1/1#";
var 爱心5 ="#fEffect/CharacterEff.img/1112946/2/0#";
var 爱心6 ="#fEffect/CharacterEff.img/1112946/2/1#";
var 爱心7 ="#fEffect/CharacterEff.img/1112946/3/0#";
var 爱心8 ="#fEffect/CharacterEff.img/1112946/3/1#";
var 爱心9 ="#fEffect/CharacterEff.img/1112906/0/1#";
var 爱心10 ="#fEffect/CharacterEff.img/1112903/1/0#";
var a1 ="#fEffect/CharacterEff.img/1112900/0/0#";
var a2 ="#fEffect/CharacterEff.img/1112900/2/0#";
var a3 ="#fEffect/CharacterEff.img/1112900/3/0#";
var a4 ="#fEffect/CharacterEff.img/1082229/0/0#";
var a5 ="#fEffect/CharacterEff.img/1102355/2/0#";
var a6 ="#fEffect/CharacterEff.img/1112902/0/1#";
var z1 ="#fEffect/CharacterEff.img/1112955/5/0#";
var z2 ="#fEffect/CharacterEff.img/1112955/2/0#";
var z3 ="#fEffect/CharacterEff.img/1112955/1/0#";
var x1 ="#fEffect/CharacterEff.img/1112949/1/0#";
var b0 ="#fEffect/CharacterEff.img/1112949/0/0#";
var b1 ="#fEffect/CharacterEff.img/1112949/1/0#";
var b2 ="#fEffect/CharacterEff.img/1112949/2/0#";
var b3 ="#fEffect/CharacterEff.img/1112949/3/0#";
var b4 ="#fEffect/CharacterEff.img/1112949/4/0#";
var m1 = "#fUI/ChatBalloon.img/118/nw#";//选择道具
var m3 = "#fUI/ChatBalloon.img/118/ne#";//选择道具
var m2 = "#fUI/ChatBalloon.img/118/n#";//选择道具
var m4 = "#fUI/ChatBalloon.img/118/sw#";//选择道具
var m5 = "#fUI/ChatBalloon.img/118/se#";//选择道具
var m6 = "#fUI/ChatBalloon.img/118/s#";//选择道具
var 大粉红爱心 = "#fItem/Etc/0427/04270001/Icon8/4#";  //
var 小粉红爱心 = "#fItem/Etc/0427/04270001/Icon8/5#";  //
var 小黄星 = "#fItem/Etc/0427/04270001/Icon9/0#";  //
var 大黄星 = "#fItem/Etc/0427/04270001/Icon9/1#";  //
var 小水滴 = "#fItem/Etc/0427/04270001/Icon10/5#";  //
var 大水滴 = "#fItem/Etc/0427/04270001/Icon10/4#";  //
var tz = "#fEffect/CharacterEff/1082565/4/0#";  //粉兔子
var tz1 = "#fEffect/CharacterEff/1082565/0/0#";  //橙兔子
var tz2 = "#fEffect/CharacterEff/1082565/2/0#";  //蓝兔子
var 邪恶小兔 = "#fEffect/CharacterEff/1112960/3/0#";  //邪恶小兔 【小】
var 邪恶小兔2 = "#fEffect/CharacterEff/1112960/3/1#";  //邪恶小兔 【大】
var 花草 ="#fEffect/SetEff/208/effect/walk2/4#";
var 花草1 ="#fEffect/SetEff/208/effect/walk2/3#";
var 小花 ="#fMap/MapHelper/weather/birthday/2#";
var 桃花 ="#fMap/MapHelper/weather/rose/4#";
var 银杏叶 ="#fMap/MapHelper/weather/maple/3#";
var 小烟花 ="#fMap/MapHelper/weather/squib/squib4/1#";
var 星星 ="#fMap/MapHelper/weather/witch/3#";
var 王者 ="#fEffect/Charactereff1/1112535/0/0#";
var 钻石 ="#fEffect/Charactereff1/1112537/0/0#";
var 星耀 ="#fEffect/Charactereff1/1112536/0/0#";