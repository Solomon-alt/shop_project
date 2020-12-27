<template>
<div>
    <div>
        <van-nav-bar title="编辑地址" left-arrow @click-left="onClickLeft" />
    </div>
    <van-address-edit :area-list="areaList" show-set-default show-search-result :search-result="searchResult" :area-columns-placeholder="['请选择', '请选择', '请选择']" @save="onSave" @delete="onDelete" />
</div>
</template>

<script>
import areaList from "../../../js/area";
import Vue from "vue";
import {
    AddressEdit
} from "vant";
import {
    Toast
} from "vant";

Vue.use(AddressEdit);
export default {
    name: "",
    props: {},
    data() {
        return {
            areaList,
            searchResult: [],
        };
    },
    components: {},
    methods: {
        onSave(e) {
            Toast("save");
            console.log(e);
            this.$api.address({
                name: e.name,
                tel: e.tel,
                address: e.province + e.city + e.county + e.addressDetail,
                isDefault: e.isDefault,
                province: e.province,
                city: e.city,
                county: e.county,
                addressDetail: e.addressDetail,
                areaCode: e.areaCode
            }).then(res => {
                this.$router.push("/address")
            }).catch(err => {
                console.log(err);
            })
        },
        onDelete() {
            Toast("delete");
        },
        onClickLeft() {
            Toast("返回");
            this.$router.push('/address')
        },
    },
    mounted() {},
    computed: {},
    watch: {},
};
</script>

<style lang="scss" scoped></style>
