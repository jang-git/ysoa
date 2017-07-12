var baseUrl = 'http://ysoa.qiban.com/';
export const environment = {
  production: true,
  alibaichuanAccount: {
    appkey:"23727234"
  },
  api: {
    baseURL: baseUrl,
    loginUrl: baseUrl + "oa-server/do/login.action",
    contactsUrl: baseUrl + "oa-server/org/loadmembers.action", //通讯录列表
    personInfoUrl: baseUrl + "oa-server/org/personal.action", //通过id查询某个人的详细信息
    contactlistUrl: baseUrl + "oa-server/member/findmemberbycorporateid.action", //通讯录列表不带字母排序
    contactsSearchUrl: baseUrl + "oa-server/org/loadmembers.action", //
    contactsGrouphUrl: baseUrl + "oa-server/org/loaddepartments.action",//组织架构分组
    createTribeUrl:  baseUrl + "oa-server/baichuan/createTribe.action", //创建讨论组
    getTribeInfoUrl:  baseUrl + "oa-server/baichuan/getTribeInfo.action",//获取群信息
    getTribeLogsUrl:  baseUrl + "oa-server/baichuan/gettTribelogs.action",//获取群聊天记录
    inviteJoinTribeUrl:  baseUrl + "oa-server/baichuan/inviteJoinTribe.action",//邀请加入讨论组
    quitTribeUrl:  baseUrl + "oa-server/baichuan/quitTribe.action", //退出群聊
    projectListURL:  baseUrl + "oa-server/pc/project/loadmyproject.action", //我的项目
    projectDetailURL:  baseUrl + "oa-server/pc/project/projectdetails.action", //项目详情
    projectAddURL:  baseUrl + "oa-server/pc/project/save.action", //添加项目
    projectDeleteURL:  baseUrl + "oa-server/pc/project/deleteproject.action", //删除项目
    projectUpdateURL:  baseUrl + "oa-server/pc/project/update.action", //修改项目
    projectInfoURL:  baseUrl + "oa-server/pc/project/getProject.action", //项目信息
    exportDataURL:  baseUrl + "oa-server/pc/project/exportExcel.action", //导出数据
    projectStateURL:  baseUrl + "oa-server/pc/project/archiving.action", //归档项目
    loadfileURL:  baseUrl + "oa-server/pc/project/loadfile.action", //项目文件
    deletefileURL:  baseUrl + "/oa-server/pc/task/deleteenclosure.action", //删除文件
    taskMyURL:  baseUrl + "oa-server/pc/task/mytask.action", //我的任务
    taskInfoURL:  baseUrl + "oa-server/pc/task/taskinfo.action", //任务详情
    subTaskURL:  baseUrl + "oa-server/pc/task/subtask.action", //子任务列表
    taskDeleteURL:  baseUrl + "oa-server/pc/task/deletetask.action", //删除任务
    taskAddURL:  baseUrl + "oa-server/pc/task/save.action", //添加任务
    taskStateURL:  baseUrl + "oa-server/pc/task/changestate.action", //修改任务状态
    projectStaticURL:  baseUrl + "oa-server/pc/project/loadstatistics.action", //项目统计

    modifyPasswordURL: baseUrl + "oa-server/member/updatepassword.action", //修改密码
    getCodeURL: baseUrl + "oa-server/member/sendverify.action", //获取验证码
    changeAdminURL: baseUrl + "oa-server/member/updatecellphone.action", //更换主管理员
    getUserURL: baseUrl + "oa-server/member/getuserbyname.action", //获取管理员列表

    labelInserURL: baseUrl + "oa-server/member/label/insert.action", //插入标签
    labelRemoveURL: baseUrl + "oa-server/member/label/remove.action", //移除标签
    labelListURL: baseUrl + "oa-server/member/label/list.action", //标签列表
    showLabelURL: baseUrl + "oa-server/org/setting/showlabel.action", //修改显示列表
    loginLogsURL: baseUrl + "oa-server/logs/loginlogs.action", //用户登录日志
    operationRecordURL: baseUrl + "oa-server/logs/adminlogs.action", //管理员操作记录
    adminListURL: baseUrl + "oa-server/logs/alladmin.action", //管理员列表

    applicationListURL: baseUrl + "oa-server/application/list.action", //应用列表
    applicationOpenURL: baseUrl + "oa-server/application/open.action", //开启应用,不用传参
    applicationCloseURL: baseUrl + "oa-server/application/close.action" //停止应用,传参open=0
  }
};
