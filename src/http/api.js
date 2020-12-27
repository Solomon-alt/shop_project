//统一封装请求
import { GoodsAction } from 'vant'
import http from './index.js'

export default {
    //请求的方法
    //首页请求
    home() {
        return http.get('/recommend')
    },
    //注册请求
    register({ nickname, password, verify }) {
        return http.post('/register', {
            nickname,
            password,
            verify
        })
    },
    //验证码请求
    verify() {
        return http.get('/verify')
    },
    //登录请求
    login({ nickname, password, verify }) {
        return http.post('/login', {
            nickname,
            password,
            verify
        })
    },
    //分类请求
    classification(id) {
        return http.get(`/classification?mallSubId=${id}`)
    },
    //单个商品详情
    GoodsAction(id) {
        return http.get(`/goods/one?id=${id}`)
    },
    //收藏商品请求
    collection({ goods }) {
        return http.post("/collection", goods)
    },
    //取消收藏请求
    cancelCollection({ id }) {
        return http.post('/cancelCollection', { id })
    },
    //查看商品是否收藏
    isCollection({ id }) {
        return http.post('/isCollection', { id })
    },
    //增加收货地址请求
    address({ name, tel, address, isDefault, province, city, county, addressDetail, areaCode }) {
        return http.post('/address', {
            name,
            tel,
            address,
            isDefault,
            province,
            city,
            county,
            addressDetail,
            areaCode
        })
    },
    //查询收获地址
    getAddress() {
        return http.get('/getAddress')
    },
    //搜索请求
    search({ value }) {
        return http.post('/search', { value })
    },
    //加入购物车
    addShop({ id }) {
        return http.post('/addShop', { id })
    },
    //查询获取购物车数据
    getCard() {
        return http.post('/getCard')
    },
    //购物车商品删除
    deleteShop(id) {
        return http.post('/deleteShop', id)
    },
    //获取用户信息
    queryUser() {
        return http.post('/queryUser')
    },
    //购物车支付页面
    order({ address, tel, orderId, totalPrice, idDirect, count }) {
        return http.post('/order', {
            address,
            tel,
            orderId,
            totalPrice,
            idDirect,
            count
        })
    },
    //修改保存用户信息
    saveUser({ gender, year, month, day, id, nickname }) {
        return http.post('/saveUser', {
            gender,
            year,
            month,
            day,
            id,
            nickname
        })
    },
    //查询我的收藏
    collections() {
        return http.get('/collection/list')
    },
    //订单查询
    getMyOrder() {
        return http.get('/getMyOrder')
    },
    //购物车加减商品
    editCart({ count, id, mallPrice }) {
        return http.post('/editCart', {
            count,
            id,
            mallPrice
        })
    },
    //退出登录
    loginOut() {
        return http.post('/loginOut')
    },
    //删除地址
    deleteAddress({ id }) {
        return http.post('/deleteAddress', {
            id
        })
    },
    //修改地址
    correct({
        name,
        tel,
        address,
        isDefault,
        province,
        city,
        county,
        addressDetail,
        areaCode,
        id,
    }) {
        return http.post('/address', {
            name,
            tel,
            address,
            isDefault,
            province,
            city,
            county,
            addressDetail,
            areaCode,
            id,
        })
    },
    //获取默认地址
    getDefaultAddress() {
        return http.get('/getDefaultAddress')
    },
    // 购物车支付页面
    orders({
        address,
        tel,
        orderId,
        totalPrice,
        idDirect,
        count,
    }) {
        return http.post('/order', {
            address,
            tel,
            orderId,
            totalPrice,
            idDirect,
            count,
        })
    },
    //查询未评价
    tobeEvaluated() {
        return http.get('/tobeEvaluated')
    },
    //商品评价
    evaluation({
        id,
        rate,
        content,
        anonymous,
        _id,
        order_id,
        image,
    }) {
        return http.post('/goodsOne/comment', {
            id,
            rate,
            content,
            anonymous,
            _id,
            order_id,
            image,
        })
    },
    //查询已评价
    alreadyEvaluated() {
        return http.get('/alreadyEvaluated')
    },
    //查询用户订单数量
    orderNumber() {
        return http.get('/myOrder/orderNum')
    },
    //订单查询
    myOrder() {
        return http.get('/myOrder')
    }
}