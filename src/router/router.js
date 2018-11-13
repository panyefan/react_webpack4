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
                callback(null, require('../pages/Login/Login'));
            }, 'login');
        }
    },
    childRoutes: [
        {
            path: 'login',        //登陆页面
            getComponent(nextState, callback) {
                require.ensure([], require => {
                    callback(null, require('../pages/Login/Login'));
                }, 'login');
            }
        },
        {
            path: 'Dices',        //筛子页面
            getComponent(nextState, callback) {
                require.ensure([], require => {
                    callback(null, require('../pages/Dices/Dices'));
                }, 'Dices');
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
