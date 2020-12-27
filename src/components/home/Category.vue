<template>
<div class="box">
    <div class="container">
        <div v-for="(item) in category" :key="item.mallCategoryId" @click="goto(item)">
            <img :src="item.image">
            <p>{{item.mallCategoryName}}</p>
        </div>
    </div>
</div>
</template>

<script>
export default {
    name: '',
    props: {
        //接收父组件传来的内容
        category: {
            type: Array,
            required: true
        }
    },
    data() {
        return {}
    },
    components: {},
    methods: {
        goto(item) {
            this.$router.push({
                name: 'category',
                query: {
                    mallCategoryId: item.mallCategoryId-1
                }
            })
         
        }
    },
    mounted() {
    },
    computed: {},
    watch: {}
}
</script>

<style lang="scss" scoped>
.box {
    height: 155px;
    width: 100%;
    background: #eee;
    overflow: hidden;

    .container {
        display: flex;
        width: 92%;
        height: 120px;
        background: #fff;
        margin: 17px auto;
        border-radius: 15px;

        div {
            flex: 20%;

            img {
                display: block;
                margin: auto;
                margin-top: 15px;
                width: 80%;
            }

            p {
                font-size: 14px;
                text-align: center;
                margin-top: 10px;
            }
        }
    }
}
</style>
