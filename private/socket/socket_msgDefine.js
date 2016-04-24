/**
 * Created by wgw on 2016/3/1.
 */

/**
 * 客户端发送信息名称
 * @constructor
 */
var CMT = {
    DISCONNECT:'disconnect',
    BASIC_CONNECT:'basicConnect',
    UPLOAD_MAP:'uploadMap',
    ASK_MAP_LIST:'askMapList',
    ASK_MAP:'askMap'
}
exports.CLIENT_MSG_TYPE = CMT;

/**
 * 服务端发送消息名称
 * @constructor
 */
var SMT = {
    //系统通知
    SYSTEM_INFORM : "system_inform",
    //基本连接返回值
    BASIC_CONNECT_RETURN : "basicConnectReturn",
    //上传map成功
    UPLOAD_MAP_SUC:'uploadMapSuc',
    //地图列表
    MAP_LIST:'mapList',
    //指定地图
    MAP:'map'
}
exports.SERVER_MSG_TYPE = SMT;