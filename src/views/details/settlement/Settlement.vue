<template>
<div>
    <van-nav-bar title="订单结算" @click-left="goto" left-arrow></van-nav-bar>
    <div class="harvest">
        <div @click="getAddress" class="address" v-if="flag">点击添加收货地址</div>
        <div class="information" v-else>
            <ul>
                <li class="people">收货人:{{this.name}}</li>
                <li class="number">{{information.add_time}}</li>
            </ul>
            <div class="icon">
                <van-icon name="location-o" size="40" />
            </div>
            <p class="harvest">收货地址:{{information.address}}</p>
            <div class="tubiao">
                <van-icon name="arrow" />
            </div>
            <div class="prompt">
                (收货不便时,可选择免费待收货服务)
            </div>
        </div>
    </div>
    <div class="bgc"></div>
    <div>
        <div class="goods" v-for="item in arr" :key="item.cid">
            <img :src="item.image_path">
            <div class="right">
                <p>{{item.name}}</p>
                <div>
                    <span>￥{{item.present_price}}</span>
                    <em>×{{item.count}}</em>
                </div>
            </div>
        </div>
        <div style="height:60px;width:20px"></div>
    </div>
    <div class="invoicing">
        <div class="fr jiesuan">
            <span>合计:￥<i>{{detail}}</i></span>
            <van-button type="danger" @click="order" class="btn">提交订单</van-button>
            <van-button type="danger" v-if="xuanze" @click="orders" class="btn">立即购买</van-button>
        </div>
    </div>
</div>
</template>

<script>
import Vue from 'vue';
import {
    Toast
} from 'vant';

Vue.use(Toast);
export default {
    name: '',
    props: {},
    data() {
        return {
            arr: [],
            flag: true,
            name: '',
            information: '',
            xuanze: '',
            num: ''
        }
    },
    components: {},
    methods: {
        goto() {
            this.$router.go(-1)
        },
        //获取默认地址
        getAddress() {
            this.$api.getDefaultAddress().then(res => {
                if (res.code === 200) {
                    this.flag = false
                    this.information = res.defaultAdd
                }
            }).catch(err => {
                console.log(err);
            })
        },
        order() {
            let arr = []
            this.arr.map(item => {
                arr.push(item.cid)
            })
            this.$api.orders({
                address: this.arr.address,
                tel: this.arr.tel,
                orderId: arr,
                totalPrice: Number(this.detail),
                idDirect: false,
                count: this.number,
            }).then(res => {
                if (res.code === 200) {
                    Toast.success(res.msg);
                    this.$router.push('/evaluation')
                }
            }).catch(err => {
                console.log(err);
            })
        },
        orders() {
            let arr = [];
            this.arr.map(item => {
                arr.push(item.id)
            })
            this.$api.orders({
                address: this.arr.address,
                tel: this.arr.tel,
                orderId: arr,
                totalPrice: Number(this.detail),
                idDirect: true,
                count: this.num,
            }).then(res => {
                if(res.code===200){
                    Toast.success(res.msg);
                    this.$router.go(-1)
                }
            }).catch(err => {
                console.log(err);
            })
        }
    },
    mounted() {
        //接收路由传参
        this.arr = JSON.parse(this.$route.query.arr1)
        this.xuanze = this.arr[0].flag;
        this.num = this.arr[0].count
        this.name  = JSON.parse(localStorage.getItem('username')).username
        this.getAddress()
    },
    computed: {
        detail() {
            let sum = 0;
            this.arr.map(item => {
                sum += item.count * item.present_price
            })
            return sum.toFixed(1)
        },
        number() {
            let count = 0
            this.arr.map(item => {
                count += item.count
            })
            return count
        }
    },
    watch: {}
}
</script>

<style lang="scss" scoped>
.harvest {
    height: 80px;
    display: flex;
    justify-content: center;
    align-items: center;

    .address {
        text-decoration: underline;
    }

    .information {
        position: relative;
        width: 100%;
        height: 100%;

        ul {
            display: flex;
            justify-content: space-between;

            .people {
                margin-left: 15px;
            }

            .number {
                margin-right: 15px;
            }
        }

        .icon {
            position: absolute;
            top: 20px;
            left: 10px;
        }

        p {
            position: absolute;
            top: 40px;
            left: 50px;
            width: 120px;
            height: 20px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            padding-left: 120px;
        }

        .tubiao {
            position: absolute;
            top: 40px;
            left: 320px;
        }

        .prompt {
            position: absolute;
            top: 60px;
            left: 60px;
            color: #FAD5AE;
        }
    }
}

.bgc {
    height: 12px;
    width: 100%;
    background: url(../../../assets/caitiao.jpg)
}

.goods {
    width: 375px;
    height: 80px;
    display: flex;

    img {
        display: block;
        width: 70px;
        margin: 5px 0 0 10px;

    }

    .right {
        width: 250px;
        height: 70px;
        margin: 5px 0 0 15px;

        p {
            width: 200px;
            margin: 10px 15px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        div {
            margin-left: 15px;

            span {
                color: #FF2015;
                margin-right: 150px;
            }

            em {
                font-style: normal;
            }
        }
    }
}

.invoicing {
    position: fixed;
    bottom: 0;
    width: 375px;
    height: 60px;
    background: #fff;

    .jiesuan {
        width: 200px;
        height: 100%;
        line-height: 60px;

        i {
            color: #FF5A5A;
        }

        .btn {
            position: absolute;
            top: 5px;
            right: 5px;
        }
    }
}
</style>
