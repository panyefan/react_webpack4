const router = {
    path: '/',
    getComponent(nextState, callback) {
        require.ensure([], require => {
            callback(null, require('../init/init'));
        }, 'init');
    },
    indexRoute: {
        getComponent(nextState, callback) {
            require.ensure([], require => {
                callback(null, require('../pages/index/index'));
            }, 'index');
        }
    },
    childRoutes: [
        {
            path: 'login',        //登录页面
            getComponent(nextState, callback) {
                require.ensure([], require => {
                    callback(null, require('../pages/login/login'));
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
            path: 'Test',        //Test页面
            getComponent(nextState, callback) {
                require.ensure([], require => {
                    callback(null, require('../pages/Test/Test'));
                }, 'Test');
            }
        },
    ]
}

export default router;
