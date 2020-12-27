<template>
<div>
    <van-tabbar active-color="#ee0a24" inactive-color="#000" class="box">
        <div v-for="(item,index) in arr" :key="index" @click="goto(item.path,index)" :class="{'active' :$route.path===item.path}">
            <van-icon :name="item.icon" :badge=shuju class="icon" v-if="index===2" />
            <van-icon :name="item.icon" class="icon" v-else />
            {{item.name}}
        </div>
    </van-tabbar>
</div>
</template>

<script>
import Vue from 'vue';
import {
    Tabbar,
    TabbarItem
} from 'vant';

Vue.use(Tabbar);
Vue.use(TabbarItem);
export default {
    name: '',
    props: {},
    data() {
        return {
            num: 0,
            active: 0,
            arr: [{
                name: '商城',
                icon: "wap-home-o",
                path: '/',

            }, {
                name: '分类',
                icon: "wap-nav",
                path: '/category',

            }, {
                name: '购物车',
                icon: "shopping-cart",
                path: '/cart',
                badge: ''
            }, {
                name: '我的',
                icon: "contact",
                path: '/my',
            }],
            value: ''
        }
    },
    components: {},
    methods: {
        goto(path) {
            this.$router.push(path)
        }
    },
    mounted() {
        this.$api.getCard().then(res => {
             let num = res.shopList.length
                        this.$store.commit('modify', num)
        }).catch(err => {
            console.log(err);
        })
    },
    computed: {
        shuju() {
           return this.$store.state.shopNumber
        }
    },
    watch: {

    }
}
</script>

<style lang="scss" scoped>
.box {
    display: flex;
    justify-content: space-around;

    div {
        text-align: center;

        .icon {
            display: block;
            font-size: 30px;
        }
    }
}

.active {
    color: #E15E60 !important;
}
</style>
