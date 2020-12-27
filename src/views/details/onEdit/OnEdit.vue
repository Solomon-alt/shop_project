<template>
<div>
    <van-nav-bar title="编辑地址" left-arrow @click-left="onClickLeft" />
    <van-address-edit :area-list="areaList" show-delete show-set-default show-search-result :address-info="shuju" :area-columns-placeholder="['请选择', '请选择', '请选择']" @save="onSave" @delete="onDelete" />
</div>
</template>

<script>
import areaList from "../../../js/area";
import Vue from 'vue';
import {
    Toast
} from 'vant';

Vue.use(Toast);
export default {
    name: '',
    props: {},
    data() {
        return {
            areaList,
            shuju: {}
        }
    },
    components: {},
    methods: {
        onClickLeft() {
            Toast('返回');
            this.$router.go(-1)
        },
        onSave(e) {
            this.$api.correct({
                name: e.name,
                tel: e.tel,
                address: e.address,
                isDefault: e.isDefault,
                province: e.province,
                city: e.city,
                county: e.county,
                addressDetail: e.addressDetail,
                areaCode: e.areaCode,
                id: e._id,
            }).then(res => {
                if (res.code === 200) {
                    Toast('修改成功');
                    this.$router.go(-1)
                }
            }).catch(err => {
                console.log(err);
            })
        },
        onDelete() {
            this.$api.deleteAddress({
                id: this.shuju._id
            }).then(res => {
                if (res.code === 200) {
                    Toast('删除成功');
                    this.$router.go(-1)
                }
            }).catch(err => {
                console.log(err);
            })
        },
        getData() {
            let adderss = JSON.parse(this.$route.query.address)
            this.shuju = adderss
        }
    },
    mounted() {
        this.getData()
    },
    computed: {},
    watch: {}
}
</script>

<style lang='scss' scoped>

</style>
