import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../pages/Login'
import { API_token } from '@/api/apis'


Vue.use(VueRouter)

const router = new VueRouter({
    routes: [
        {
        path: '/',
        name: 'login',
        component: Login,        
    },
    {
        path: '/index',
        name: 'index',
        component: () => import('../pages/Index.vue'),
        meta:{role:['super','normal']},
        children: [{
            path: '/index/home',
            name: 'home',
            component: () => import('../pages/index/Home.vue'),
            meta:{role:['super','normal']},
        },
        {
            path: '/index/order',
            name: 'order',
            component: () => import('../pages/index/order/Order.vue'),
            meta:{role:['super','normal']},
        },
        {
            path: '/index/goodslist',
            name: 'goodslist',
            component: () => import('../pages/index/goods/GoodsList.vue'),
            meta:{role:['super','normal']},
        },
        {
            path: '/index/goodsadd',
            name: 'goodsadd',
            component: () => import('../pages/index/goods/GoodsAdd.vue'),
            meta:{role:['super','normal']},
        },
        {
            path: '/index/goodscate',
            name: 'goodscate',
            component: () => import('../pages/index/goods/GoodsCate.vue'),
            meta:{role:['super','normal']},
        },
        {
            path: '/index/shops',
            name: 'shops',
            component: () => import('../pages/index/shop/Shops.vue'),
            meta:{role:['super']}
        },
        {
            path: '/index/accadd',
            name: 'accadd',
            component: () => import('../pages/index/account/AccAdd.vue'),
            meta:{role:['super']}
        },
        {
            path: '/index/acclist',
            name: 'acclist',
            component: () => import('../pages/index/account/AccList.vue'),
            meta:{role:['super']}
        },
        {
            path: '/index/updatepass',
            name: 'updatepass',
            component: () => import('../pages/index/account/UpdatePass.vue'),
            meta:{role:['super']}
        },
        {
            path: '/index/goodsgather',
            name: 'goodsgather',
            component: () => import('../pages/index/goods/GoodsGather.vue'),
            meta:{role:['super']}
        },
        {
            path: '/index/ordergather',
            name: 'ordergather',
            component: () => import('../pages/index/order/OrderGather.vue'),
            meta:{role:['super']}
        },
        {
            path: '/index/personal',
            name: 'personal',
            component: () => import('../pages/index/account/Personal .vue'),
            meta:{role:['super','normal']}
        }
        ]
    },
    ]
})

router.beforeEach((to,from,next)=>{
    // console.log(to.path)
    // console.log(from)
    // console.log(next)
    // 判断是否在登录页面
    if(to.path != '/'){
        //不在登录页面，通过token判断是否登录
        API_token(localStorage.token).then(res=>{
            if(res.data.code == 0){
                // 在登录状态，放行
                next()

                // 判断管理员权限                
                // console.log(to.meta.role)
                // if(to.meta.role.includes(localStorage.role)){
                //     next()
                // }else{
                //     next(from)
                // }
                console.log(to.meta.role.includes(localStorage.role))
            }else{
                // 不在登录状态，跳转到登录页面
                next('/')
            }
        })
    }else{
        next()
    }
})

export default router