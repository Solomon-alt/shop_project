<template>
<div>
    <div class="recommend">商品推荐</div>
    <div class="goods" ref="goods">
        <div class="box">
            <div v-for="item in recommend" :key="item.goodsId" class="container">
                <img :src="item.image" @click="detail(item)" />
                <p>{{ item.goodsName }}</p>
                <div>
                    <span>￥{{ item.mallPrice }}</span>
                    <del>￥{{ item.price }}</del>
                </div>
                <ul>
                    <li>
                        <van-icon name="shopping-cart" color="#fff" size="1.2em" @click="handle(item)" />
                    </li>
                    <li class="detail" @click="detail(item)">查看详情</li>
                </ul>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import BScroll from "better-scroll";
import {
    mapMutations
} from 'vuex'
import Vue from 'vue';
import {
    Toast
} from 'vant';

Vue.use(Toast);
export default {
    name: "",
    props: {
        recommend: {
            type: Array,
            required: true,
        },
    },
    data() {
        return {};
    },
    components: {},
    methods: {
        //倘若已经登录了则进行goto里面的操作
        goto(item) {
            this.$api.addShop({
                id: item.goodsId
            }).then(res => {
                if (res.code === 200) {
                    Toast.success('加入购物车成功');
                    this.$api.getCard().then(res => {
                        let num = res.shopList.length
                        this.$store.commit('modify', num)
                    }).catch(err => {
                        console.log(err);
                    })
                }
            }).catch(err => {
                console.log(err);
            })
        },
        //点击时只能调用，具体的事件写在另一个方案里
        handle(item) {
            this.$checkLogin(this.goto, item);
        },
        detail(item) {
            this.$router.push({
                name: "particular",
                query: {
                    id: JSON.stringify(item.goodsId),
                },
            });
            this.$save('browerHistory', item)
        },
        getShop() {
            this.$api.getCard().then(res => {

            })
        }

    },
    mounted() {
        new BScroll(this.$refs.goods, {
            scrollX: true,
            click: true,
        });
        this.getShop()
        this.$api.getCard().then(res => {
            let num = res.shopList.length
            this.$store.commit('modify', num)
        }).catch(err => {
            console.log(err);
        })
    },
    computed: {},
    watch: {},
};
</script>

<style lang="scss" scoped>
.recommend {
    display: flex;
    border-bottom: 1px solid #f8f8f8;
    font-size: 20px;
    padding: 10px 0 10px 15px;
}

.goods {
    display: flex;
    width: 375px;
    overflow: hidden;
    width: 100%;

    .container {
        width: 124px;
        border-right: 1px solid #f8f8f8;
        border-bottom: 1px solid #f8f8f8;

        img {
            height: 120px;
        }

        p {
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            margin: 0 5px;
        }

        div {
            margin-left: 5px;

            span {
                color: #454545;
                margin-right: 5px;
            }

            del {
                color: #9e9e9e;
            }
        }

        ul {
            display: flex;
            width: 100px;
            height: 25px;
            margin: 10px auto;
            border-radius: 10px;
            overflow: hidden;

            li {
                width: 25px;
                background: #feca3a;
                line-height: 25px;
                text-align: center;
            }

            .detail {
                flex: 1;
                background: #ff4c38;
                font-size: 14px;
                color: #fff;
            }
        }
    }
}

.box {
    display: flex;
    flex: 1;
}
</style>
