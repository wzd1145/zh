<template>
  <div class="BigHead">
    <div class="Left-BigHead">
      <el-button
        @click="LeftTop"
        type="text"
        :icon="RePonster ? 'el-icon-s-unfold' : 'el-icon-s-fold'"
        class="Tel-button"
      ></el-button>
      <el-tabs
        v-model="$route.path"
        closable
        type="card"
        @tab-click="HandTabAdd"
        @tab-remove="HandTabDel"
      >
        <el-tab-pane
          :key="index"
          v-for="(item, index) in Throuter"
          :label="item.meta.title"
          :name="item.path"
        >
        </el-tab-pane>
      </el-tabs>
    </div>

    <div class="user">
      <el-tooltip class="item" effect="dark" content="全屏" placement="bottom">
        <span class="qp" @click="TabSir">全屏</span>
      </el-tooltip>
      <el-tooltip
        class="item"
        effect="dark"
        content="关闭所有标签"
        placement="bottom"
      >
        <span class="clear" @click="cloneTH">关闭所有标签</span>
      </el-tooltip>

      <el-avatar :size="50" :src="user.imgUrl"></el-avatar>
      <div class="block">
        <el-dropdown @command="handleCommand">
          <span class="el-dropdown-link">
            <span class="TypeClocr">
              <span class="size">{{ user.username }}</span>
              <i class="el-icon-arrow-down el-icon--right"></i
            ></span>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>设置</el-dropdown-item>
            <el-dropdown-item command="a">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>
<script>
import screenfull from 'screenfull'
export default {
  props: ['user'],
  data() {
    return {
      tabPosition: '',
      Throuter: [],
      RePonster: false
    }
  },
  methods: {
    LeftTop() {
      this.RePonster = !this.RePonster
      this.$store.state.RePonLeftTop = this.RePonster
    },
    HandTabAdd(name) {
      this.$router.push(name.name)
    },
    TabSir() {
      // console.log(, screenfull.isFullscreen)
      if (screenfull.isFullscreen) {
        screenfull.exit()
      } else {
        screenfull.request()
      }
    },
    cloneTH() {
      this.Throuter = []
      const tt = {
        path: '/index',
        name: 'index',
        meta: {
          title: '控制台'
        }
      }
      this.Throuter.push(tt)
      this.$router.push('/index')
    },
    HandTabDel(name) {
      console.log(name)
      if (name === '/index') {
        return
      }
      if (this.Throuter.length === 1) {
        return false
      }
      if (name === this.$route.path) {
        this.$router.push('/index')
      }
      const index = this.Throuter.findIndex((res) => {
        return res.path === name
      })
      console.log(index)
      this.Throuter.splice(index, 1)
    },
    HandHeadTabGroup(name) {
      console.log(name)
      this.$router.push(name)
    },
    handleCommand(command) {
      console.log(command)
      if (command === 'a') {
        localStorage.clear()
        this.$router.push('/login')
      }
    }
  },
  watch: {
    $route: {
      handler(val, oldVal) {
        for (let index = 0; index < this.Throuter.length; index++) {
          if (this.Throuter[index].path === val.path) {
            return false
          }
        }
        this.Throuter.push(val)

        console.log('当前路由', this.$route.path)
        console.log(this.Throuter)
      },
      immediate: true,
      deep: true
    }
  }
}
</script>
<style scoped>
.Tel-button {
  margin-right: 20px;
  color: white;
  font-size: 25px;
}
.Left-BigHead {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.cloreTh {
  cursor: pointer;
  margin-right: 20px;
  margin-top: 10px;
  width: 30px;
  height: 30px;
}
.TypeClocr {
  color: white;
}
.size {
  font-size: 20px;
}
.block {
  color: white;
  margin-top: 15px;
}
.user {
  width: 250px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.el-radio-group {
  margin-top: 5px;
}
.el-radio-button {
  margin-left: 20px;
}
.BigHead {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.el-tabs {
  margin-top: 10px;
}
.qp {
  width: 50px;
  height: 10px;
  margin: 15px;
}
.clear {
  width: 58px;
  height: 10px;
  margin: -3px;
}
</style>
