//导入vant中的Dialog
import { Dialog } from 'vant'
import router from '../router'
export const checkLogin = (next, item) => {
    // 判断localStorage是否存有用户名
    let username = JSON.parse(localStorage.getItem('username'))
        // 如果不存在用户名则
    if (!username) {
        Dialog.confirm({
                title: '提示',
                message: '您还未登录请登录',
                //.then代表点了确定.catch代表什么也不做
            }).then(() => {
                //点了确定就应该调路由跳到登录页面
                router.push('/login')
                    //点了取消代表什么也不做
            }).catch()
            //如果存在username就什么也不做
    } else {
        next(item)
    }
}
export const save = (key, item) => {
    // key代表操作 浏览历史: browerHistory 搜索历史:searchHistory 收藏:collection
    let user = JSON.parse(localStorage.getItem('username'))
    if (!user) {
        // Dialog.confirm({
        //     title: '提示',
        //     message: '您还未登录',
        // }).then(() => {
        //     // 跳路由
        //     router.push('/login')
        // })
    } else {
        let username = user.username
            // 存在本地 用户名加上操作名
        let name = username + key
        if (localStorage.getItem(name)) {
            let arr = JSON.parse(localStorage.getItem(name))
            let i = arr.find((s) => {
                return s.goodsId === item.goodsId
            })
            if (!i) {
                arr.push(item)
                localStorage.setItem(name, JSON.stringify(arr))
            }
        } else {

            let arr = []
            arr.push(item)
            localStorage.setItem(name, JSON.stringify(arr))
        }
    }
}