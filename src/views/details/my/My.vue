<template>
<div>
    <!-- 顶部消息 -->
    <top>
        <slot>会员中心</slot>
    </top>
    <!-- 中间详情 -->
    <introduce></introduce>
    <!--操作-->
    <operation></operation>
    <!--商品后续操作-->
    <subsequent></subsequent>
</div>
</template>

<script>
import top from "../../../components/my/Top";
import introduce from "../../../components/my/Introduce";
import operation from "../../../components/my/Operation";
import subsequent from "../../../components/my/Subsequent";
export default {
    name: "",
    props: {},
    data() {
        return {};
    },
    components: {
        top,
        introduce,
        operation,
        subsequent
    },
    methods: {},
    mounted() {
        this.$api.getCard().then(res => {
            let num = res.shopList.length
            this.$store.commit('modify', num)
        }).catch(err => {
            console.log(err);
        })
        
    },
    computed: {

    },
    watch: {},
};
</script>

<style lang="scss" scoped></style>
