<template>
<div>
    <div class="box">
        <div v-for="(item,index) in arr" :key="index" @click="goto(item.path)">
            <div class="son" v-if="index===3"><van-icon :name=item.icon class="icon" :badge=change /></div>
            <van-icon :name=item.icon class="icon" v-else />
            {{item.name}}
        </div>
    </div>
</div>
</template>

<script>
export default {
    name: '',
    props: {},
    data() {
        return {
            arr: [{
                name: '待付款',
                icon: "pending-payment",
                // path:"/"
            }, {
                name: '待发货',
                icon: "send-gift-o"
            }, {
                name: '待收货',
                icon: "logistics"
            }, {
                name: '评价',
                icon: "orders-o",
                path: '/evaluation'
            }, {
                name: '已完成',
                icon: "points",
                path: '/completed'
            }]
        }
    },
    components: {},
    methods: {
        goto(path) {
            this.$router.push(path)
        }
    },
    mounted() {
        this.$api.tobeEvaluated().then(res => {
            this.$store.commit('change', res.data.list.length)
        }).catch(err => {
            console.log(err);
        })
    },
    computed: {
        change(){
            return this.$store.state.evaluateNumber
        }
    },
    watch: {}
}
</script>

<style lang="scss" scoped>
.box {
    display: flex;
    width: 100%;
    height: 70px;
    border-bottom: 1px solid #F6F7F8;

    div {
        flex: 20%;
        text-align: center;
        .son{
            width: 27px;
            margin: auto;
        }
        .icon {
            font-size: 30px;
            margin: 5px 0;
            display: block;
        }
    }
}
</style>
