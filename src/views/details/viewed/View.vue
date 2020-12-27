<template>
<div>
    <van-nav-bar title="评价详情" left-arrow @click-left="onClickLeft" />
    <div class="top">
        <div class="pic"> <img src="../../../assets/3.png" alt=""></div>
        <div class="box">
            <div class="name">{{name}}</div>
            <div class="time">
                {{data.comment_time}}
            </div>
            <div class="rate">
                <van-rate v-model="data.rate" allow-half void-icon="star" void-color="#eee" />
            </div>
        </div>
    </div>
    <div class="content">评价内容:{{data.content}}</div>
    <div class="goods">
        <img :src="goods.image_path">
        <p>{{goods.name}}</p>
        <div @click="goto"><van-icon name="shopping-cart-o" color="#FF3938" size="25" /></div>
    </div>
</div>
</template>

<script>
import {
    Toast
} from 'vant';
export default {
    name: '',
    props: {},
    data() {
        return {
            data: '',
            name: '',
            goods: '',
        }
    },
    components: {},
    methods: {
        onClickLeft() {
            this.$router.go(-1)
        },
        goto(){
            console.log(this.goods);
            this.$api.addShop({
                id: this.goods.id
            }).then(res => {
                console.log(res);
                if (res.code === 200) {
                    Toast.success('加入购物车成功');
                }
            }).catch(err => {
                console.log(err);
            })
        }
    },
    mounted() {
        this.data = JSON.parse(this.$route.query.view)
        this.goods = this.data.goods[0]
        let username = JSON.parse(localStorage.getItem("username")).username     
        this.name = username
    },
    computed: {},
    watch: {}
}
</script>

<style lang="scss" scoped>
.top {
    height: 120px;
    overflow: hidden;
    display: flex;

    .pic {
        height: 100px;
        width: 100px;
        margin: 10px;
        overflow: hidden;
        border-radius: 50%;

        img {
            height: 100px;
        }
    }

    .box {
        position: relative;
        margin-top: 10px;
        width: 250px;
        height: 100px;
        color: #999;

        .name {
            position: absolute;
            top: 10px;
            left: 20px;

        }

        .time {
            position: absolute;
            top: 30px;
            left: 90px;

        }

        .rate {
            position: absolute;
            top: 70px;
            left: 20px;

        }
    }
}

.content {
    border-top: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
    height: 30px;
    overflow: auto;
    color: #999;
    text-indent: 2em;
}

.goods {
    height: 60px;
    display: flex;
    border-bottom: 1px solid #F9F9F9;
    img{
        width: 60px;
        margin-left: 20px;
    }
    p{  
        margin-top: 10px;
        width: 200px;
    }
    div{
        width: 30px;
        height: 30px;
        background: #FFE6E2;
        margin:15px 0 0 20px;
        text-align: center;
        line-height: 35px;
        border-radius: 50%;
    }
}
</style>
