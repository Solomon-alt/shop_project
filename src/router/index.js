import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Layout from '../views/layout/Layout.vue'

Vue.use(VueRouter)

const routes = [{
        path: '/view',
        name: 'view',
        component: () =>
            import ('../views/details/viewed/View.vue'),
        meta: {
            title: '查看评价',
            path: '/view',
        }
    }, {
        path: '/evaluating',
        name: 'evaluating',
        component: () =>
            import ('../views/details/evaluating/Evaluating.vue'),
        meta: {
            title: '正在评价',
            path: '/evaluating',
        }
    }, {
        path: '/collection',
        name: 'collection',
        component: () =>
            import ('../views/details/collection/Collection.vue'),
        meta: {
            title: '收藏',
            path: '/collection',
        }
    }, {
        path: '/completed',
        name: 'completed',
        component: () =>
            import ('../views/details/completed/Completed.vue'),
        meta: {
            title: '已完成',
            path: '/completed',
        }
    }, {
        path: '/evaluation',
        name: 'evaluation',
        component: () =>
            import ('../views/details/evaluation/Evaluation.vue'),
        meta: {
            title: '评论',
            path: '/evaluation',
        }
    }, {
        path: '/onedit',
        name: 'onedit',
        component: () =>
            import ('../views/details/onEdit/OnEdit.vue'),
        meta: {
            title: '删除',
            path: '/onedit',
        }
    }, {
        path: '/settlement',
        name: 'settlement',
        component: () =>
            import ('../views/details/settlement/Settlement.vue'),
        meta: {
            title: '结算',
            path: '/settlement',
        }
    },
    {
        path: '/orders',
        name: 'orders',
        component: () =>
            import ('../views/details/orders/Orders.vue'),
        meta: {
            title: '全部订单',
            path: '/orders',
        }
    }, {
        path: '/browse',
        name: 'browse',
        component: () =>
            import ('../views/details/browse/Browse.vue'),
        meta: {
            title: '最近浏览',
            path: '/browse',
        }
    }, {
        path: '/login',
        name: 'login',
        component: () =>
            import ('../views/login/Login.vue'),
        meta: {
            title: '登录页',
            path: '/login',
        }
    },
    {
        path: '/logout',
        name: 'logout',
        component: () =>
            import ('../views/details/logout/Logout.vue'),
        meta: {
            title: '退出页',
            path: '/logout',
        }
    },
    {
        path: '/particular',
        name: 'particular',
        component: () =>
            import ('../views/details/particular/Particular.vue'),
        meta: {
            title: '详情页',
            path: '/particular',
        }
    },
    {
        path: '/address',
        name: 'address',
        component: () =>
            import ('../views/details/address/Address.vue'),
        meta: {
            title: '地址管理',
            path: '/address',
        }
    },
    {
        path: '/editAddress',
        name: 'editAddress',
        component: () =>
            import ('../views/details/editAddress/Edit.vue'),
        meta: {
            title: '编辑地址',
            path: '/editAddress',
        }
    }, {
        path: '/personal',
        name: 'personal',
        component: () =>
            import ('../views/details/personal/Personal.vue'),
        meta: {
            path: '/personal',
            title: '个人资料'

        }
    },
    {
        path: '',
        component: Layout,
        children: [{
            path: '/',
            name: 'Home',
            component: Home,
            meta: {
                title: '首页',
                path: '',
            }
        }, {
            path: '/my',
            name: 'my',
            component: () =>
                import ('../views/details/my/My.vue'),
            meta: {
                title: '我的',
                path: '/my'
            }
        }, {
            path: '/cart',
            name: 'cart',
            component: () =>
                import ('../views/details/cart/Cart.vue'),
            meta: {
                title: '购物车',
                path: '/cart'
            }
        }, {
            path: '/category',
            name: 'category',
            component: () =>
                import ('../views/details/category/Category.vue'),
            meta: {
                title: '分类',
                path: '/category'
            }
        }]
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router