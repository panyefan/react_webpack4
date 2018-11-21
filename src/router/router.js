const router = {
    path: '/',
    getComponent(nextState, callback) {
        require.ensure([], require => {
            callback(null, require('../init/init'));
        }, 'init');
    },
    indexRoute: {
        getComponent(nextState, callback) {
            if (SC.loginFlag) {
                require.ensure([], require => {
                    callback(null, require('../pages/index/index'));
                }, 'index');
            } else {
                require.ensure([], require => {
                    callback(null, require('../pages/loginPage/loginPage'));
                }, 'login');
            }
        }
    },
    childRoutes: [
        {
            path: 'login',        // 登录
            getComponent(nextState, callback) {
                require.ensure([], require => {
                    callback(null, require('../pages/loginPage/loginPage'));
                }, 'login');
            }
        },
        {
            path: 'index',        // 首页
            getComponent(nextState, callback) {
                require.ensure([], require => {
                    callback(null, require('../pages/index/index'));
                }, 'index');
            }
        },
        {
            path: 'company',        // 公司信息
            getComponent(nextState, callback) {
                require.ensure([], require => {
                    callback(null, require('../pages/company/company'));
                }, 'company');
            }
        },
        {
            path: 'userManage',    // 员工管理
            getComponent(nextState, callback) {
                require.ensure([], require => {
                    callback(null, require('../pages/userManage/userManage'));
                }, 'userManage');
            }
        },
        {
            path: 'issueWelfare',    // 发放福利
            getComponent(nextState, callback) {
                require.ensure([], require => {
                    callback(null, require('../pages/issueWelfare/issueWelfare'));
                }, 'issueWelfare');
            }
        },
        {
            path: 'issueWelfare-list',    // 发放福利--列表
            getComponent(nextState, callback) {
                require.ensure([], require => {
                    callback(null, require('../pages/issueWelfare/issueWelfare-list'));
                }, 'issueWelfare-list');
            }
        },
        {
            path: 'issueWelfare-detail',    // 发放福利--详情
            getComponent(nextState, callback) {
                require.ensure([], require => {
                    callback(null, require('../pages/issueWelfare/issueWelfare-detail'));
                }, 'issueWelfare-detail');
            }
        },
        {
            path: 'cardConfig',    // 发放福利--卡面配置
            getComponent(nextState, callback) {
                require.ensure([], require => {
                    callback(null, require('../pages/issueWelfare/cardConfig'));
                }, 'cardConfig');
            }
        },
        {
            path: 'welfareCar-list',    // 发放福利--卡管理
            getComponent(nextState, callback) {
                require.ensure([], require => {
                    callback(null, require('../pages/issueWelfare/welfareCar-list'));
                }, 'welfareCar-list');
            }
        },
        {
            path: 'welfareCar-detail',    // 发放福利--卡管理--详情
            getComponent(nextState, callback) {
                require.ensure([], require => {
                    callback(null, require('../pages/issueWelfare/welfareCar-detail'));
                }, 'welfareCar-detail');
            }
        },
        {
            path: 'pay',    // 充值
            getComponent(nextState, callback) {
                require.ensure([], require => {
                    callback(null, require('../pages/pay/pay'));
                }, 'pay');
            }
        },
    ]
}

export default router;
