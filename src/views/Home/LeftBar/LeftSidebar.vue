<template>
  <div>
    <el-menu
      :default-active="$route.path"
      class="el-menu-vertical-demo"
      background-color="rgb(34, 45, 50)"
      text-color="#fff"
      active-text-color="#ffd04b"
      router
      :collapse-transition="false"
      :collapse="$store.state.RePonLeftTop"
    >
      <!-- {{ mulint }} -->
      <LeftSidebarItem
        v-for="(item, index) in mulint"
        :key="index"
        :item="item"
      ></LeftSidebarItem>
    </el-menu>
  </div>
</template>
<script>
import LeftSidebarItem from './LeftSidebar-Item.vue'
export default {
  components: { LeftSidebarItem },
  name: 'LeftBarT',
  props: {
    mulint: {
      type: Array,
      default: () => []
    }
  }
}
</script>
<style>
.el-submenu__title:hover,
.el-menu-item:hover {
  background-color: rgb(60, 60, 60) !important;
}
.el-menu-item:focus {
  background-color: rgb(34, 45, 50) !important;
}
.el-menu {
  border-right: none;
}
</style>
