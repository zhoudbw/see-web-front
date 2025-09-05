<!--
 -- 布局
-->
<template>
    <!-- 是否折叠待办标题 -->
    <section class="container" :class="{'menu-open': menuOpen}">
        <!-- 侧边菜单 -->
        <section class="menu">
            <AppMenus></AppMenus>
        </section>

        <!--
          -- 遮罩层 ( 移动端 )
          -- 点击遮罩层时调用 Vuex action
          -- 用于在移动端点击内容区域时关闭菜单
        -->
        <div class="content-overlay" @click="$store.dispatch('updateMenu')"></div>

        <!-- 主要内容区域 -->
        <div class="content-container">
            <router-view></router-view>
        </div>
    </section>
</template>

<script>
import AppMenus from './AppMenus.vue';

export default {
    components: {
        AppMenus,
    },
    computed: {
        menuOpen() {
            return this.$store.state.menuOpen;
        }
    },
    created() {
        console.log( "Oh, init the page named 'AppLayouts'. " )
    }
};
</script>

<style lang="less">
@import '../common/style/layouts.less';
</style>
