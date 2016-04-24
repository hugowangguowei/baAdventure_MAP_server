/**
 * Created by wangguowei on 2001/1/11.
 */

module.exports = baPlayer;
var SMT = require('./../socket/socket_msgDefine').SERVER_MSG_TYPE;

var playerState = {
    MAIN_TABLE:"mainTable",
    WAITING_QUEUE:"waitingQueue",
    GAME:"game"
}

function baPlayer(userName,id,socket){

    this.userName = userName;
    this.userID = id;
    this.level = 0;
    this.state = playerState.MAIN_TABLE;
    this.socket = socket;
    this.room = null;
}

baPlayer.prototype = {
    /**
     * ��ȡplayer��Ϣ
     * @returns {{name: *, serverId: *, level: *}}
     */
    getPlayerInfo:function(){
        return {
            name:this.userName,
            serverId:this.userID,
            level:this.level
        }
    },
    /**
     * �ж��Ƿ��Ƿ�������
     * @returns {boolean}
     */
    isRoomLeader:function(){
        if(!this.room){
            return false;
        }
        if(this.room.roomLeader.userID == this.userID){
            return true;
        }else{
            return false;
        }
    },
    /**
     * ���뷿��ȴ�����
     * @param detail
     */
    getIntoQueue:function(room){
        this.room = room;
        this.state = playerState.WAITING_QUEUE;
    },
    /**
     * �뿪��ǰ�Ķ���
     * @param detail
     */
    getOutQueue:function(detail){
        this.state = playerState.MAIN_TABLE;
        this.sendInfo(SMT.GET_OUT_THE_QUEUE,detail);
    },
    /**
     * �뿪��ǰ���ڵ���Ϸ
     */
    getOutGame:function(detail){
        this.state = playerState.MAIN_TABLE;
        this.sendInfo(SMT.GET_OUT_THE_GAME,detail);
    },
    /**
     * ���͵�ǰ�������Ϣ
     * @param roomInitInfo
     */
    sendCurRoomInfo:function(roomInitInfo){
    },
    /**
     * ������Ϣ
     * @param msgName
     * @param msg
     */
    sendInfo:function(msgName,msg){
        this.socket.emit(msgName,msg);
    },

}