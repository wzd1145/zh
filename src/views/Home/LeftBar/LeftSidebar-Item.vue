<template>
  <fragment>
    <template v-if="item.children.length > 0 && item.component === null">
      <el-submenu :index="item.path">
        <template slot="title">
          <i :class="'el-icon-' + item.icon"></i>
          <span>{{ item.label }}</span>
        </template>
        <Item
          v-for="(ite, index) in item.children"
          :key="index"
          :item="ite"
        ></Item>
      </el-submenu>
    </template>
    <template v-else>
      <el-menu-item :index="item.path">
        <i :class="'el-icon-' + item.icon"></i>
        <span slot="title">{{ item.label }}</span>
      </el-menu-item>
    </template>
  </fragment>
</template>
<script>
export default {
  name: 'Item',
  data() {
    return {}
  },
  props: {
    item: {
      type: Object,
      default: () => {}
    }
  }
}
</script>
