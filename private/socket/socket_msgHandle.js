/**
 * Created by wgw on 2016/2/28.
 */
var baPlayer = require('../model/baPlayer');
var roomManager = require('../controller/roomManager');
var userManager = require('../controller/userManager');
var CMT = require('./socket_msgDefine').CLIENT_MSG_TYPE;
var SMT = require('./socket_msgDefine').SERVER_MSG_TYPE;
var fs = require('fs');

var rM = new roomManager();
var uM = new userManager();

exports.clientHandle = function(){
    return [
        //断开连接
        {msgName:CMT.DISCONNECT,msgFunc:function(){
            console.log(this.id + ":disconnected");
            _disconnect(this);

            function _disconnect(_socket){
                var chara = uM.getUserBySocketId(_socket.id);
                var room = chara.room;
                if(!room){
                    return 0;
                }else{
                    if(chara.isRoomLeader()){
                        rM.deleteRoom(chara.room);
                    }else{
                        //if()
                        //uM.kickUserOutRoom(chara);
                        chara.room.roomRefresh();
                        //rM.roomRefresh(chara.room);
                    }
                }
            };
        }},
        //请求连接服务器
        {msgName:CMT.BASIC_CONNECT,msgFunc:function(cd){
            console.log(cd.userName + " get In");

            _basicConnect(this);
            function _basicConnect(_socket){
                var userName = cd.userName;
                var userID = uM.getIdForNewUser();
                var chara = new baPlayer(userName,userID,_socket);
                var clientList = uM.getUserList();
                clientList.push(chara);
                _socket.emit('basicConnectReturn','ok');
                rM.clientRoomInfoInitialize(chara);
            }
        }},
        //上传地图
        {msgName:CMT.UPLOAD_MAP,msgFunc:function(map){
            //fs.exists('../data/fuck.txt',function(exists){
            //})
            console.log(map);
            var mapID = map.mapName;
            var url = "../data/" + mapID + ".json";
            console.log(url);
            fs.open(url,'w',function(){
                fs.writeFileSync(url,JSON.stringify(map));
            })
        }}
    ];
}

