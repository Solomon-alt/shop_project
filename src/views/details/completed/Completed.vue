<template>
<div>
    <van-nav-bar @click-left="goto" title="我的订单" left-arrow></van-nav-bar>
    <van-tabs v-model="active" animated>
        <van-tab title="全部">内容 1</van-tab>
        <van-tab title="待支付">内容 2</van-tab>
        <van-tab title="待发货">内容 3</van-tab>
        <van-tab title="待收货">内容 4</van-tab>
        <van-tab title="完成">内容 5</van-tab>
    </van-tabs>
</div>
</template>

<script>
import Vue from 'vue';
import {
    Tab,
    Tabs
} from 'vant';

Vue.use(Tab);
Vue.use(Tabs);
export default {
    name: '',
    props: {},
    data() {
        return {
            active: '0'
        }
    },
    components: {},
    methods: {
        goto() {
            this.$router.go(-1)
        }
    },
    mounted() {},
    computed: {},
    watch: {}
}
</script>

<style lang="scss" scoped>

</style>
