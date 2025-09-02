<template>
  <section class="container"> <!--最外层容器-->
    <section class="menu"> <!--左边的容器-->
      <AppMenus></AppMenus> <!-- * -->
    </section>
    <section class="content-container"><!--右边的容器-->
      <AppTodo></AppTodo>
    </section>
  </section>
</template>

<script>

// * 导入创建的AppMenus组件
import AppMenus from "@/components/AppMenus.vue";
import AppTodo from "@/components/AppTodo.vue";

export default {
  components: { // * 注册组件，让其可以在template调用
    AppMenus,
    AppTodo
  }
};
</script>

<style lang="less">
@import '../common/style/layouts.less';
</style>
