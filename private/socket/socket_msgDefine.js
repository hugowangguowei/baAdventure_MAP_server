/**
 * Created by wgw on 2016/3/1.
 */

/**
 * �ͻ��˷�����Ϣ����
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
 * ����˷�����Ϣ����
 * @constructor
 */
var SMT = {
    //ϵͳ֪ͨ
    SYSTEM_INFORM : "system_inform",
    //�������ӷ���ֵ
    BASIC_CONNECT_RETURN : "basicConnectReturn",
    //�ϴ�map�ɹ�
    UPLOAD_MAP_SUC:'uploadMapSuc',
    //��ͼ�б�
    MAP_LIST:'mapList',
    //ָ����ͼ
    MAP:'map'
}
exports.SERVER_MSG_TYPE = SMT;