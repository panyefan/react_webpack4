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
            path: 'login',        //登录
            getComponent(nextState, callback) {
                require.ensure([], require => {
                    callback(null, require('../pages/loginPage/loginPage'));
                }, 'login');
            }
        },
        {
            path: 'index',        //首页
            getComponent(nextState, callback) {
                require.ensure([], require => {
                    callback(null, require('../pages/index/index'));
                }, 'index');
            }
        },
        {
            path: 'userManage',    //员工管理
            getComponent(nextState, callback) {
                require.ensure([], require => {
                    callback(null, require('../pages/userManage/userManage'));
                }, 'userManage');
            }
        },
        {
            path: 'issueWelfare',    //发放福利
            getComponent(nextState, callback) {
                require.ensure([], require => {
                    callback(null, require('../pages/issueWelfare/issueWelfare'));
                }, 'issueWelfare');
            }
        },
    ]
}

export default router;
