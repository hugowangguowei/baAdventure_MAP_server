/**
 * Created by wgw on 2016/2/6.
 */

var baRoom = require('../model/baRoom');
var userManager = require('./userManager');
var serverMethod = require('../method/server_method');
var SMT = require("../socket/socket_msgDefine").SERVER_MSG_TYPE;


var roomIdCount = 0;
var roomList = [];
var uM = new userManager();

module.exports = roomManager;

function roomManager(){
    this.bindedUM  = null;
}

roomManager.prototype = {
    getIdForNewRoom:function(){
        roomIdCount++;
        return "room_" + roomIdCount;
    },
    getRoomById:function(roomId){
        for(var i =0;i<roomList.length;i++){
            var room_i = roomList[i];
            if(room_i.id == roomId){
                return room_i;
            }
        }
        return 0;
    },
    getRoomList:function(){
        return roomList;
    },
    /**
     * ����·���
     * @param roomInfo
     * @param user
     * @returns {baRoom|exports|module.exports}
     */
    addRoom:function(roomInfo,user){
        var roomID = this.getIdForNewRoom();
        var room = new baRoom(roomID,roomInfo.name,roomInfo.memNum,roomInfo.scriptName);
        roomList.push(room);
        room.addLeader(user);
        //TODO �ڴ����������Ҫ�Զ����£�����
        //room.roomIntroRefresh();
        return room;
    },
    /**
     * ɾ������
     * @param room
     */
    deleteRoom:function(room){
        //TODO
        var leader = room.roomLeader;
        //leader.getOutRoom();

        var roomMem = room.roomMem;
        for(var i = 0;i<roomMem.length;i++){
            var mem_i = roomMem[i];
            //mem_i.getOutRoom();
        }

        var roomInfo = room.getBriefInfo();
        var objCharaList = uM.getUsersByStateType(["mainTable","waitingQueue"]);
        serverMethod.broadcastToList(objCharaList,SMT.ROOM_DELETE,roomInfo);
    },
    /**
     * �û�����ǰ���з������Ϣ
     * @param {baPlayer}
     */
    clientRoomInfoInitialize: function (user) {
        var roomInfoList = [];
        for(var i = 0;i<roomList.length;i++){
            var room_i = roomList[i];
            var info_i = room_i.getBriefInfo();
            roomInfoList.push(info_i);
        }
        user.sendInfo('clientRoomInfoInitialize',roomInfoList);
    }
}