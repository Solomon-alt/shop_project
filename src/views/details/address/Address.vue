<template>
<div>
    <van-nav-bar title="地址列表" left-arrow @click-left="handle"> </van-nav-bar>
    <div v-if="list.length === 0">
        <van-empty description="暂无收货地址" />
        <van-button type="danger" @click="goto" class="btn">新增地址</van-button>
    </div>
    <div v-else>
        <van-address-list v-model="chosenAddressId" :list="list" @select="select" default-tag-text="默认" @add="onAdd" @edit="onEdit" />
    </div>
</div>
</template>

<script>
import Vue from "vue";
import {
    Empty
} from "vant";
import {
    AddressList
} from "vant";
import {
    Toast
} from "vant";
import {
    Popup
} from 'vant';

Vue.use(Empty);
Vue.use(AddressList);

Vue.use(Popup);
export default {
    name: "",
    props: {},
    data() {
        return {
            chosenAddressId: 1,
            list: [],
        };
    },
    components: {},
    methods: {
        handle() {
            this.$router.push("/my");
        },
        onAdd() {
            Toast("新增地址");
            this.$router.push("/editAddress");
        },
        onEdit(item, index) {
            Toast("编辑地址:" + index);
            this.$router.push({
                name: 'onedit',
                query: {
                    address: JSON.stringify(item)
                }
            })
        },
        select(item, index) {
            console.log(item);
            console.log(index);
            this.list.map(item => {});
        },
        goto() {
            this.$router.push('/editAddress')
        },
    },
    mounted() {
        this.$api
            .getAddress()
            .then(res => {
                this.list = res.address;
                if(this.list.length!==0){
                let arr = this.list.filter((item, index) => {
                    if (item.isDefault === true) {
                        this.list.splice(index, 1);
                    }
                    return item.isDefault === true;
                });
                if(arr.length===0){
                    this.list[0].isDefault=true
                }
                this.list = arr.concat(this.list);
                 this.list.map((item, index) => {
                    this.$set(item, "id", index+1)
                })}
            })
            .catch(err => {
                console.log(err);
            });
    },
    computed: {},
    watch: {},
};
</script>

<style lang="scss" scoped>
.btn {
    display: block;
    width: 90%;
    margin: auto;
    border-radius: 25px;
}
</style>
