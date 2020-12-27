<template>
<div>
    <van-nav-bar title="我的收藏" border :fixed='true' @click-left="back" left-arrow></van-nav-bar>
    <ul>
        <li v-for="item in data" :key="item._id">
            <img :src="item.image_path">
            <div>
                <p>{{item.name}}</p>
                <span>￥{{item.present_price}}</span>
                <div class="icon" @click="del(item)">
                    <van-icon name="cross" />
                </div>
            </div>
        </li>
    </ul>
</div>
</template>

<script>
export default {
    name: '',
    props: {},
    data() {
        return {
            data: '',
        }
    },
    components: {},
    methods: {
        back() {
            this.$router.push('/my')
        },
        getData() {
            this.$api.collections().then(res => {
                this.data = res.data.list
            }).catch(err => {
                console.log(err);
            })
        },
        del(item) {
            console.log(item);
            this.$api.cancelCollection({
                id: item.cid
            }).then(res => {
                console.log(res);
                this.getData()
            }).catch(err => console.log(err))
        }
    },
    mounted() {
        this.getData()
    },
    computed: {},
    watch: {}
}
</script>

<style lang="scss" scoped>
ul {
    margin-top: 50px;

    li {
        position: relative;
        display: flex;
        margin-bottom: 10px;
        border: 1px solid #f0f0f0;

        img {
            display: block;
            width: 70px;
            margin-left: 20px;
            border: 1px solid #ddd;
        }

        p {
            width: 200px;
            margin: 5px 0 0 20px;
            padding: 0 10px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        span {
            display: block;
            margin: 20px 0 0 20px;
            color: red;
        }

        .icon {
            position: absolute;
            top: 45px;
            right: 40px;
            width: 15px;
            height: 15px;
            line-height: 15px;
            text-align: center;
            border-radius: 50%;
            color: #ccc;
            border: 1px solid #ccc;

        }
    }
}
</style>
