const router={
    path:'/',
    getComponent(nextState,callback){
        require.ensure([],require=>{
            callback(null,require('../init/init'));
        },'init');
    },
    indexRoute : {
        getComponent(nextState,callback){
            require.ensure([],require=>{
                callback(null,require('../pages/HomeContent/index'));
            },'index');
            // if(SC.firstRoute){
            //     let f = SC.firstRoute.funcUrl.indexOf('/') == 0 ? (SC.firstRoute.funcUrl.length > 1 ? SC.firstRoute.funcUrl.substring(1) : '') : SC.firstRoute.funcUrl;
            //     for (let route of router.childRoutes) {
            //         let path = route.path;
            //         if (path == f) {
            //             route.getComponent(nextState,callback);
            //         }
            //     }
            // } else {
            //     if(SC.loginFlag){
            //         require.ensure([],require=>{
            //             callback(null,require('../pages/index/account-info/account-info'));
            //         },'account-info');
            //     } else {
            //         require.ensure([],require=>{
            //             callback(null,require('../pages/login/login/login'));
            //         },'login');
            //     }
            // }
        }
    },
    childRoutes:[
        /*登录页*/
        // {
        //     path:'login',
        //     getComponent(nextState,callback){
        //         require.ensure([],require=>{
        //             callback(null,require('../pages/login/login/login'));
        //         },'login');
        //     }
        // },
        // /*管理平台首页*/
        // {
        //     path:'platform-index',        //平台首页 商户
        //     getComponent(nextState,callback){
        //         require.ensure([],require=>{
        //             callback(null,require('../pages/index/platform-index/platform-index'));
        //         },'platform-index');
        //     }
        // },
        /*首页*/
        {
            path:'index',        //列表页面
            getComponent(nextState,callback){
                require.ensure([],require=>{
                    callback(null,require('../pages/HomeContent/index'));
                },'index');
            }
        },
        {
            path:'DetailContent',        //内容详情页面
            getComponent(nextState,callback){
                require.ensure([],require=>{
                    callback(null,require('../pages/DeatilContent/DeatilContent'));
                },'DetailContent');
            }
        },
        // {
        //     path:'account-info',        //首页 账号信息 个人account-info
        //     getComponent(nextState,callback){
        //         require.ensure([],require=>{
        //             callback(null,require('../pages/index/account-info/account-info'));
        //         },'account-info');
        //     }
        // },
        // {
        //     path:'account-info-provider',        //首页 账号信息 服务商
        //     getComponent(nextState,callback){
        //         require.ensure([],require=>{
        //             callback(null,require('../pages/index/account-info-provider/account-info-provider'));
        //         },'account-info-provider');
        //     }
        // },
        // {
        //     path:'account-info-merchant',        //首页 账号信息 商户
        //     getComponent(nextState,callback){
        //         require.ensure([],require=>{
        //             callback(null,require('../pages/index/account-info-merchant/account-info-merchant'));
        //         },'account-info-merchant');
        //     }
        // },

        // /*服务商管理*/
        // {
        //     path:'service-provider-flunk',//查询服务商
        //     getComponent(nextState,callback){
        //         require.ensure([],require=>{
        //             callback(null,require('../pages/service-provider-manage/provider-flunk/provider-flunk'));
        //         },'service-provider-flunk');
        //     }
        // }
    ]
}

export default router;
