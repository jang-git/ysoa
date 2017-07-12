// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
var baseUrl = 'http://localhost:4200/';
export const environment = {
  production: false,
  alibaichuanAccount: {
    appkey:"23727234"
  },
  api: {
    baseURL: baseUrl,
    loginUrl:"",
    contactsUrl:"src/app/mock-data/contacts-mock.json",
    contactlistUrl: baseUrl + "/oa-server/member/findmemberbycorporateid.action",
    personInfoUrl: baseUrl + "oa-server/org/personal.action", //通过id查询某个人的详细信息
    contactsSearchUrl:"src/app/mock-data/contacts-mock.json",
    contactsGrouphUrl:"http://ys.qiban.com/oa-server/org/loadmembers.action",
    createTribeUrl: "src/app/mock-data/create-tribe-mock.json",
    getTribeInfoUrl: "src/app/mock-data/tribe-info-mock.json",
    getTribeLogsUrl: "http://ys.qiban.com/oa-server/baichuan/gettTribelogs.action",
    inviteJoinTribeUrl: "src/app/mock-data/create-tribe-mock.json",//邀请加入讨论组
    quitTribeUrl: "src/app/mock-data/tribe-quit-mock.json",
    projectListURL: "src/app/mock-data/myproject-mock.json",
    projectDetailURL: "http://ys.qiban.com/oa-server/pc/project/projectdetails.action", //项目详情
    projectAddURL: "src/app/mock-data/myproject-mock.json",
    projectDeleteURL: "src/app/mock-data/myproject-mock.json", 
    projectUpdateURL: "src/app/mock-data/myproject-mock.json", //修改项目
    projectInfoURL:  baseUrl + "/oa-server/pc/project/getProject.action", //项目信息
    loadfileURL:  baseUrl + "/oa-server/pc/project/loadfile.action", //项目文件
    deletefileURL:  baseUrl + "/oa-server/pc/task/deleteenclosure.action", //删除文件
    exportDataURL:  baseUrl + "/oa-server/pc/project/exportExcel.action", //导出数据
    projectStateURL:  baseUrl + "/oa-server/pc/project/update.action", //归档项目
    taskMyURL: "http://ys.qiban.com/oa-server/pc/task/mytask.action", //我的任务
    taskInfoURL: "http://ys.qiban.com/oa-server/pc/task/taskinfo.action", //任务详情
    subTaskURL:  baseUrl + "oa-server/pc/task/subtask.action", //子任务列表
    taskStateURL:  baseUrl + "/oa-server/pc/task/changestate.action", //修改任务状态
    taskDeleteURL: "http://ys.qiban.com/oa-server/pc/task/deletetask.action", //删除任务
    taskAddURL: "http://ys.qiban.com/oa-server/pc/task/save.action", //添加任务
    projectStaticURL: "http://ys.qiban.com/oa-server/pc/project/loadstatistics.action", //项目统计
    modifyPasswordURL: baseUrl + "/oa-server/member/updatepassword.action", //修改密码
    getCodeURL: baseUrl + "/oa-server/member/sendverify.action", //获取验证码
    changeAdminURL: baseUrl + "/oa-server/member/updatecellphone.action", //更换主管理员
    getUserURL: baseUrl + "/oa-server/member/getuserbyname.action", //获取管理员列表
    labelInserURL: baseUrl + "/oa-server/member/label/insert.action", //插入标签
    labelRemoveURL: baseUrl + "/oa-server/member/label/remove.action", //移除标签
    labelListURL: baseUrl + "/oa-server/member/label/list.action", //标签列表
    showLabelURL: baseUrl + "/oa-server/org/setting/showlabel.action", //修改显示列表
    loginLogsURL: baseUrl + "/oa-server/logs/loginlogs.action", //用户登录日志
    operationRecordURL: baseUrl + "/oa-server/org/setting/showlabel.action", //管理员操作记录
    adminListURL: baseUrl + "/oa-server/logs/alladmin.action", //管理员列表
    applicationListURL: baseUrl + "oa-server/application/list.action", //应用列表
    applicationOpenURL: baseUrl + "oa-server/application/open.action", //开启应用,不用传参
    applicationCloseURL: baseUrl + "oa-server/application/close.action" //停止应用,传参open=0

  }

};
