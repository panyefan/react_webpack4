// ******************************************* 全局参数 *******************************************
global.SC = {
    // 确认框
    confirm: function () {

    },
    // 错误框
    error: function () {

    },
};

if (process.env.NODE_ENV != 'production') {
    global.SC.baseUrl = '/api_dev_adm';      // 开发环境 汇商平台
    // global.SC.baseUrl = '/api_dev_service';  // 开发环境 运营平台
    // global.SC.baseUrl = '/api_dev_mch';      // 开发环境 商户平台
}
