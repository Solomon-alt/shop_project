<template>
<div>
    <van-tabs @click="onClick">
        <van-tab title="商品详情">
            <div v-html="detail"></div>
        </van-tab>
        <van-tab title="商品评论">
            <div>
                <div class="content" v-for="(item,index) in comment" :key="index">
                    <img src="../../assets/3.png">
                    <div class="name" v-if="item.anonymous">{{item.comment_nickname}}</div>
                    <div class="name" v-else>{{item.user[0].nickname}}</div>
                    <div class="time">{{item.comment_time}}</div>
                    <div class="rate">
                        <van-rate v-model="item.rate" readonly allow-half void-icon="star" void-color="#eee" />
                    </div>
                    <div class="content">{{item.content}}</div>
                </div>
            </div>
        </van-tab>
    </van-tabs>
    <div class="foot"></div>
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
        },
        comment:{
            type:Array,
        }
    },
    data() {
        return {
            detail: '',
        };
    },
    components: {},
    methods: {
        onClick(name, title) {
            Toast(title);
        },
    },
    mounted() {
        this.detail = this.data.detail
    },
    computed: {},
    watch: {},
};
</script>

<style lang="scss" scoped>
.foot {
    width: 100%;
    height: 50px;
}

div {
    .content {
        position: relative;
        height: 180px;
        color: #ccc;

        img {
            width: 60px;
            border-radius: 50%;
            margin: 10px;
        }

        .name {
            position: absolute;
            top: 10px;
            left: 80px;
        }

        .time {
            position: absolute;
            top: 20px;
            left: 170px;
        }

        .content {
            height: 40px;
            text-indent: 2em;
        }
    }
}
</style>