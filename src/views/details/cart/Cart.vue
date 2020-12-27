<template>
<div>
    <!--顶部标题栏-->
    <top>
        <slot>购物车</slot>
    </top>
    <!--中间图片栏-->
    <pic :arr="arr"></pic>
</div>
</template>

<script>
import top from "../../../components/cart/Top";
import pic from "../../../components/cart/Pic";

export default {
    name: "",
    props: {},
    data() {
        return {
            name: "",
            arr: ''
        };
    },
    components: {
        top,
        pic
    },
    methods: {

    },
    mounted() {},
    computed: {},
    watch: {},
};
</script>

<style lang='scss' scoped>
</style>
