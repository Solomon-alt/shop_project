<template>
<div>
    <p>{{name}}</p>
    <div class="price">￥{{price}}</div>
    <ul>
        <li>运费: {{freight}}</li>
        <li>剩余:{{amount}}</li>
        <li v-if="flag===false">取消收藏:
            <van-icon name="like" color="#f00" @click="handle1" />
        </li>
        <li v-if="flag===true">点击收藏:
            <van-icon name="like-o" color="#f00" @click="handle" />
        </li>
    </ul>
    <van-cell icon="shop-o" value="进入店铺" is-link class="store" @click="goto('/')">
        <!-- 使用 title 插槽来自定义标题 -->
        <template #title>
            <span class="custom-title">有赞的店</span>
            <van-tag type="danger">官方</van-tag>
        </template>
    </van-cell>
</div>
</template>

<script>
import {
    Toast
} from "vant";

export default {
    name: "",
    props: {
        data: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            flag: true,
            name: "",
            price: "",
            freight: "",
            amount: "",
            id: "",
        };
    },
    components: {},
    methods: {
        goto(path) {
            this.$router.push(path);
        },

        collection({
            goods
        }) {
            this.$api.collection({
                    goods: this.data,
                })
                .then(res => {
                    if (res.code === 200) {
                        Toast.success("收藏成功");
                        this.flag = false;
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },
        //检查是否登录，和要进行的操作
        handle(item) {
            this.$checkLogin(this.collection, item);
        },
        handle1({
            id
        }) {

            this.$api
                .cancelCollection({
                    id: this.id,
                })
                .then(res => {
                    if (res.code === 200) {
                        Toast.success("取消收藏成功");
                        this.flag = true;
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },
        getData() {
            this.$api.isCollection({
                id: this.id
            }).then(res => {
                if (res.isCollection === 1) {
                    this.flag = false
                }
            }).catch(err => {
                console.log(err);
            })
        }
    },
    mounted() {
        this.name = this.data.name;
        this.price = this.data.present_price;
        this.freight = this.data.__v;
        this.amount = this.data.amount;
        this.id = this.data.id;
        this.getData()
    },
    computed: {},
    watch: {},
};
</script>

<style lang="scss" scoped>
p {
    border-top: 1px solid #f8f8f8;
    line-height: 50px;
    padding-left: 10px;
}

.price {
    padding-left: 10px;
    color: #ff4d57;
}

ul {
    display: flex;
    justify-content: space-around;
    margin-top: 20px;
    height: 40px;
    border-top: 1px solid #f1f1f1;
    border-bottom: 1px solid #f1f1f1;

    li {
        line-height: 40px;
        color: #999;
    }
}

.store {
    margin-top: 20px;
    border-top: 1px solid #f1f1f1;
    border-bottom: 1px solid #f1f1f1;
}
</style>
