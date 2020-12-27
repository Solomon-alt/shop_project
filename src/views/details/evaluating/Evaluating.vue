<template>
<div>
    <van-nav-bar title="评价中心" @click-left="goto" left-arrow></van-nav-bar>
    <div class="goods">
        <img :src="data.image_path" alt="">
        <ul>
            <li>商品评分</li>
            <li>
                <van-rate v-model="value" @change="onChange" allow-half void-icon="star" void-color="#eee" />
            </li>
        </ul>

    </div>
    <textarea placeholder="说说你购买的感受吧" v-model="content"></textarea>
    <div class="box">
        <van-uploader v-model="fileList" multiple />

    </div>
    <van-checkbox v-model="checked" icon-size="24px" style="margin:5px 0 5px 10px;">匿名提交</van-checkbox>
    <van-button @click="submit" type="primary" block>提交</van-button>
</div>
</template>

<script>
import {
    Toast
} from 'vant'
import Vue from 'vue';
import {
    Uploader
} from 'vant';

Vue.use(Uploader);
export default {
    name: '',
    props: {},
    data() {
        return {
            data: '',
            value: 4.5,
            content: '',
            checked: false,
            fileList: [],
        }
    },
    components: {},
    methods: {
        submit() {
            this.getData()
        },
        onChange(value) {
            Toast('当前值：' + value);
        },
        goto() {
            this.$router.go(-1)
        },
        getData() {
            this.$api.evaluation({
                id: this.data.cid,
                rate: this.value,
                content: this.content,
                anonymous: this.checked,
                _id: this.data._id,
                order_id: this.data.order_id,
                image: this.fileList,
            }).then(res => {
                if(res.code===200){
                    this.$router.go(-1)
                }
            }).catch(err => {
                console.log(err);
            })
        }
    },
    mounted() {
        let item = JSON.parse(this.$route.query.item)
        this.data = item
        console.log(this.data);
    },
    computed: {},
    watch: {}
}
</script>

<style lang="scss" scoped>
.goods {
    height: 120px;
    border-bottom: 1px solid #ccc;

    img {
        float: left;
        height: 100px;
        margin: 10px 20px 0 15px;
    }

    ul {
        float: left;
        height: 80px;
        width: 190px;
        margin-top: 10px;
        padding: 10px 15px;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
    }
}

textarea {
    width: 375px;
    height: 120px;
    border: none;
    background: #F7F7F7;
}

.box {
    height: 80px;
}
</style>
