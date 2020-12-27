<template>
<div>
    <van-nav-bar title="我的订单" :fixed="true" left-arrow @click-left="onClickLeft" />
    <div class="top"></div>
    <div class="box">
        <ul class="head" v-for="item in list" :key="item._id">
            <!--<li>订单编号:{{list.}}</li>
            <li style="color:#DA7542">交易完成</li>-->
            <li class="order">
                <div>订单编号:{{item.order_id}}</div>
                <div style="color:#D9713C">交易完成</div>
            </li>
            <li class="container" v-for="goods in item.order_list" :key="goods._id">
                <div class="pic"><img :src="goods.image_path"></div>
                <div class="name">{{goods.name}}</div>
                <div class="price">￥{{goods.present_price}}</div>
                <div class="count">×{{goods.count}}</div>
            </li>
            <li class="down">
                <div>创建时间:{{item.add_time}}</div>
                <div>共{{item.order_list.length}}件商品 合计{{item.mallPrice.toFixed(2)}}元</div>
            </li>
        </ul>
    </div>
</div>
</template>

<script>
export default {
    name: '',
    props: {},
    data() {
        return {
            list: '',
        }
    },
    components: {},
    methods: {
        onClickLeft() {
            this.$router.go(-1)
        },
        getData() {
            this.$api.orderNumber().then(res => {
                console.log(res);
            }).catch(err => {
                console.log(err);
            })
        },
        getDatas() {
            this.$api.myOrder().then(res => {
                this.list = res.list
                console.log(this.list);
            }).catch(err => {
                console.log(err);
            })
        }
    },
    mounted() {
        this.getData()
        this.getDatas()
    },
    computed: {},
    watch: {}
}
</script>

<style lang="scss" scoped>
.top {
    height: 45px;
}

.content {
    width: 100%;
    background: #F2F2F2;
}

.box {
    width: 100%;
    background: #F2F2F2;
    min-height: calc(100vh - 55px);
    .head {
        margin-top: 10px;

        li {
            width: 350px;
            background: #fff;
            margin: auto;
        }

        .order {
            display: flex;
            justify-content: space-between;
        }

        .container {
            position: relative;

            .pic {
                img {
                    width: 100px;
                }
            }

            .name {
                position: absolute;
                width: 160px;
                top: 15px;
                left: 120px;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }

            .price {
                position: absolute;
                top: 35px;
                left: 280px;
                color: #414141;
            }

            .count {
                position: absolute;
                top: 65px;
                left: 290px;
                color: #ccc;
            }
           
        }

    }
}
.down{
    display: flex;
    flex-direction: column;
    align-items: flex-end;
}
</style>
