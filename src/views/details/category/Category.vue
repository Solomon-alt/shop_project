<template>
<div style="overflow:hidden">
    <div class="top">商品分类</div>
    <div class="connet">
        <div>
            <!--侧边导航栏-->
            <van-sidebar v-model="activeKey" @change="onChange" class="sideBar">
                <van-sidebar-item v-for="(item, index) in data.category" :key="index" :title="item.mallCategoryName" />
            </van-sidebar>
        </div>
        <div>
            <!--导航栏-->
            <van-tabs v-model="active" @change="onClick" :ellipsis="false" style=" overflow: auto; width:260px; margin-left:80px;">
                <van-tab v-for="(item, index) in arr" :key="index" :title="item.mallSubName">
                    <div v-for="item in list" :key="item.id" @click="goto(item)">
                        <img :src="item.image" />
                        <span>{{ item.name }}</span>
                    </div>
                </van-tab>
            </van-tabs>
        </div>
    </div>
</div>
</template>

<script>
export default {
    name: "",
    props: {},
    data() {
        return {
            data: {},
            arr: [],
            activeKey: 0,
            active: 0,
            list: "",
            value: "",
            mallCategoryId: "",
        };
    },
    components: {},
    methods: {
        onChange() {
            if (this.data.category !== undefined) {
                this.arr = this.data.category[this.activeKey].bxMallSubDto;
                this.active = 0;
                this.onClick();
            }
        },
        onClick() {
            this.$api.classification(this.arr[this.active].mallSubId).then((res) => {
                this.list = res.dataList;
            });
        },
        goto(item) {
            this.$router.push({
                name: "particular",
                query: {
                    id: JSON.stringify(item.id),
                },
            });
            this.$save('browerHistory', item)
        },
        get() {
            let ip = JSON.parse(this.$route.query.mallCategoryId);
            this.value = ip;
        },
    },
    mounted() {
        this.$api.home().then((res) => {
            this.data = res.data;
            this.onChange();
        });

        if (this.$route.query.mallCategoryId !== undefined) {
            this.activeKey = this.$route.query.mallCategoryId;
        }
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
.top {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 40px;
    text-align: center;
    line-height: 40px;
    z-index: 10;
    background: #999;
}

.connet {
    display: flex;
    margin-top: 40px;
}

img {
    width: 50px;
    height: 50px;
    vertical-align: middle;
}

span {
    font-size: 12px;
}

.sideBar {
    position: fixed;
}
</style>
