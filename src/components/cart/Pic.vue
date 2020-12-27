<template>
<div>
    <div v-if="name === null">
        <div class="box">
            <p>登录后才能查看订单</p>
            <van-button type="primary" class="btn a" @click="handle('/login')">请先登录</van-button>
        </div>
    </div>
    <div v-else-if="arr.length === 0">
        <img src="../../assets/shop.png" alt="" class="gouwuche" />
        <p class="content">你的购物车还是空的</p>
        <van-button plain hairline type="primary" class="btn" @click="handle1">去购物</van-button>
    </div>
    <div v-else>
        <div style="height:40px;">
            <van-checkbox v-model="checked" shape="square" checked-color="#ee0a24" @click="chang" class="all fl">{{ msg }}</van-checkbox>
            <div class="combined fr">合计:{{detail}}</div>
        </div>
        <div style="padding-left:215px;  border-bottom:  1px solid #ddd">
            请确认订单
        </div>
        <div v-if="flag">
            <van-button style="margin:0 20px 0 200px" @click="del()" color="linear-gradient(to right, #ff6034, #ee0a24)">
                删除
            </van-button>
            <van-button @click="goto" color="linear-gradient(to right, #ff6034, #ee0a24)">
                去结算
            </van-button>
        </div>
        <div class="detail">
            <div v-for="item in arr" :key="item._id" style="display:flex ">
                <div class="choose">
                    <van-checkbox v-model="item.check" @click="chang1(item)"></van-checkbox>
                </div>
                <img :src="item.image_path" />
                <div class="right">
                    <p>{{ item.name }}</p>
                    <span>￥{{ item.present_price }}</span>
                    <van-stepper v-model="item.count" @change="editCart(item)" theme="round" button-size="22" disable-input class="round" />
                </div>
            </div>
        </div>
        <div class="placeholder"></div>
    </div>
</div>
</template>

<script>
import {
    Dialog
} from 'vant';

export default {
    name: "",
    props: {},
    data() {
        return {
            name: "",
            arr: "",
            checked: false,
            msg: "全选",
            flag: false,
        };
    },
    components: {},
    methods: {
        //跳路由
        handle(path) {
            this.$router.push(path);
        },
        handle1() {
            this.$router.push("/");
        },
        //全选
        chang() {
            let msg = this.checked === false ? "全选" : "取消全选";
            this.msg = msg;
            this.arr.map((item) => {
                item.check = this.checked;
            });
            this.flag = this.checked
        },
        chang1(item) {
            this.checked = this.arr.every(item => {
                return item.check === true;
            });
            let xuanze = this.arr.some(item1 => {
                return item1.check === true
            })
            this.flag = xuanze
        },
        //得到循环的数据
        getData() {
            this.$api.getCard()
                .then((res) => {
                    this.arr = res.shopList;
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        //删除购物车数据
        del() {
            let ar = [];
            this.arr.map(item => {
                if (item.check === true) {
                    ar.push(item.cid)
                }
            })
            Dialog.confirm({
                    title: '提示',
                    message: '确认删除商品吗',
                }).then(() => {
                    this.$api.deleteShop(ar).then(res => {
                        this.$api.getCard().then(res => {
                            let num = res.shopList.length
                            this.$store.commit('modify', num)
                        }).catch(err => {
                            console.log(err);
                        })
                        this.getData()
                    }).catch(err => {
                        console.log(err);
                    })
                })
                .catch(() => {
                    // on cancel
                });
        },
        //购物车商品数量增减
        editCart(item) {
            this.$api.editCart({
                count: item.count,
                id: item.cid,
                mallPrice: item.mallPrice
            }).then(res => {}).catch(err => console.log(err))
        },
        //筛选出需要支付的数据并且通过路由传参传走
        goto() {
            let arr1 = this.arr.filter(item => {
                return item.check === true
            })
            this.$router.push({
                name: 'settlement',
                query: {
                    arr1: JSON.stringify(arr1)
                }
            })
        },
    },
    mounted() {
        let username = JSON.parse(localStorage.getItem("username"));
        this.name = username;
        this.getData()

    },
    computed: {
        //计算出商品总价
        detail() {
            let sum = 0;
            this.arr.map(item => {
                if (item.check === true) {
                    sum += item.present_price * item.count
                }
            })
            return sum.toFixed(2)
        }
    },
    watch: {},
};
</script>

<style lang="scss" scoped>
.box {
    background: url(../../assets/order.gif) no-repeat center top;
    width: 100%;
    height: calc(100vh - 80px);
    overflow: hidden;

    p {
        text-align: center;
        margin-top: 330px;
        font-size: 20px;
    }

    .btn {
        display: block;
        margin: 20px auto;
    }
}

.btn,
.content,
.gouwuche {
    display: block;
    position: absolute;
    top: 150px;
    left: 50%;
    transform: translateX(-50%);
}

.content {
    top: 300px;
}

.btn {
    top: 350px;
}

.all {
    margin: 20px 0 0 20px;
}

.combined {
    margin: 10px 120px 0 0;
}

.detail {
    margin-top: 10px;
    padding-bottom: 10px;

    .choose {
        margin: 25px 0 0 20px;
    }

    img {
        display: block;
        width: 70px;
        height: 70px;
        margin-left: 10px;
        border: 1px solid #ccc;
    }

    .right {
        position: relative;
        margin-top: 10px;
        height: 60px;
        width: 220px;
        margin-left: 30px;

        p {
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        span {
            display: block;
            color: red;
            margin-top: 5px;
        }

        .round {
            position: absolute;
            top: 30px;
            left: 100px;
        }
    }
}

.placeholder {
    width: 100%;
    height: 40px;
}

.show {
    display: block !important;
}

.a {
    position: absolute;
    top: 390px;
}
</style>
