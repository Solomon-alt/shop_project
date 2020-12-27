<template>
<div>
    <van-goods-action>
        <van-goods-action-icon icon="wap-home-o" text="首页" @click="handle('/')" />
        <van-goods-action-icon icon="shopping-cart-o" @click="handle('/cart')" text="购物车" />
        <van-goods-action-button color="#FF976A" type="warning" text="加入购物车" @click="add" />
        <van-goods-action-button @click="showPopup" color="#7232dd" type="danger" text="立即购买" />
    </van-goods-action>
    <van-popup v-model="show" position="bottom" closeable :style="{ height: '40%' }">
        <div class="show">
            <img :src="data.image_path" alt="">
            <div>
                <p>{{data.name}}</p>
                <span>￥{{data.present_price}}</span>
            </div>

        </div>
        <ul>
            <li>购买数量</li>
            <li>
                <van-stepper v-model="value" />
            </li>
            <li class="count">
                <span>剩余{{data.amount}}件</span>
                <i>每人限购50件</i>
            </li>
        </ul>
        <van-button class="btn" @click="buy" type="danger">立即购买</van-button>
    </van-popup>
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
    props: {
        id: {
            type: String
        },
        data: {
            type: Object
        }
    },
    data() {
        return {
            show: false,
            value: 1,
            address: '',
        }
    },
    components: {},
    methods: {
        buy() {
            this.$set(this.data, "count", this.value)
            this.$set(this.data, "flag", true)
            let arr1 = [];
            arr1.push(this.data)
            this.$router.push({
                name:'settlement',
                query:{arr1:JSON.stringify(arr1)},
            })
        },
        showPopup() {
            this.show = true;
        },
        handle(path) {
            this.$router.push(path)
        },
        add() {
            this.$api.addShop({
                id: this.id
            }).then(res => {
                if (res.code === 200) {
                    Toast.success('加入购物车成功');
                }
            }).catch(err => {
                console.log(err);
            })
        },
        getAddress() {
            this.$api.getDefaultAddress().then(res => {
                this.address = res.defaultAdd
            }).catch(err => {
                console.log(err);
            })
        }
    },
    mounted() {
        this.getAddress()
    },
    computed: {
        datail() {
            let data = this.data.present_price * this.value
            return parseInt(data * 100) / 100
        }
    },
    watch: {}
}
</script>

<style lang="scss" scoped>
.show {
    position: relative;
    height: 80px;
    width: 100%;
    overflow: hidden;

    img {
        position: absolute;
        top: 0;
        left: 20px;
        height: 80px;
        background: white;
    }

    div {
        position: absolute;
        top: 0;
        left: 120px;
        height: 100%;
        width: 200px;

        p {
            margin: 10px 0;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        span {
            color: red;
        }
    }
}

ul {
    position: absolute;
    top: 100px;
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    width: 100%;

    li {
        width: 150px;
    }

    .count {
        transform: translateX(-45px);
        margin-top: 20px;
        width: 250px;

        span {
            color: #ccc;
        }

        i {
            font-style: normal;
            padding-left: 20px;
            color: red;
        }
    }
}

.btn {
    margin-top: 120px;
    width: 100%;
}
</style>
