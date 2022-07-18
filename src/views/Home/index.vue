<template>
  <el-container class="HomeContainer">
    <el-aside
      :width="$store.state.RePonLeftTop ? '70px' : '200px'"
      :collapse-transition="false"
      ><LeftBarT :mulint="LeftSidebar"></LeftBarT
    ></el-aside>
    <el-container>
      <el-header><HeadView :user="User"></HeadView></el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
import HeadView from './HeadView/HeadViwe.vue'
import LeftBarT from './LeftBar/LeftSidebar.vue'
import { HomeLeftSidebar, User } from '../../api/user'
export default {
  // name: 'Breadcrumb',
  components: { LeftBarT, HeadView },
  data() {
    return {
      LeftSidebar: [],

      User: {
        imgUrl: '',
        username: ''
      },
      useruser: {
        name: ''
      }
    }
  },
  created() {
    this.HandUser()
    this.HandGetLeftSidebar()
  },
  methods: {
    async HandGetLeftSidebar() {
      const ReponSetLeftSidebar = await HomeLeftSidebar(this.User.username)
      console.log('侧边栏', ReponSetLeftSidebar)
      this.LeftSidebar = ReponSetLeftSidebar.data.menus
    },
    async HandUser() {
      const ReponSetUser = await User()

      this.User.imgUrl = ReponSetUser.data.avatar
      this.User.username = ReponSetUser.data.username
    }
  }
}
</script>
<style>
.HomeContainer {
  width: 100%;
  height: 100%;
}
.el-header,
.el-footer {
  background-color: #56b39d;
  color: #333;
}

.el-aside {
  background-color: rgb(34, 45, 50);
  color: #333;
}

.el-main {
  background-color: #e8edf0;
  color: #333;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>
