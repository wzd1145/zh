<template>
  <div>
    <el-card>
      <el-input placeholder="用户名" class="input" v-model="page.query">
      </el-input>
      <el-button type="success" class="chauxun" @click="HandList"
        >查询</el-button
      >

      <el-button type="success" class="chauxun" @click="HandT">新增</el-button>

      <el-table :data="UserList" style="width: 100%">
        <el-table-column type="index" label="序号"> </el-table-column>
        <el-table-column prop="username" label="用户名"> </el-table-column>
        <el-table-column label="头像">
          <template slot-scope="scope">
            <el-avatar :size="50" :src="scope.row.avatar"></el-avatar
          ></template>
        </el-table-column>
        <el-table-column label="角色">
          <template slot-scope="scope">
            <el-tag v-for="(item, index) in scope.row.roles" :key="index">{{
              item.name
            }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="email" label="邮箱"> </el-table-column>
        <el-table-column prop="createTime" label="注册时间"> </el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <el-switch
              :active-value="1"
              :inactive-value="2"
              v-model="scope.row.status"
              active-color="#13ce66"
              inactive-color="#ff4949"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="250">
          <template slot-scope="scope">
            <el-button
              type="success"
              size="small"
              @click="HandUpdate(scope.row)"
              >编辑</el-button
            >
            <el-button
              size="small"
              type="warning"
              :disabled='scope'
              @click="Handrouels(scope.row)"
              >分配角色</el-button
            >
            <el-button size="small" type="danger" @click="HandDel(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page.current"
        :page-sizes="[20, 40, 50, 100]"
        :page-size="page.size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>

      <el-dialog title="新增用户" :visible.sync="dialogVisible" width="30%">
        <el-form :model="From">
          <el-form-item label="头像" :label-width="formLabelWidth">
            <el-avatar
              :size="50"
              src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-5a307996-a7f5-483d-a6f1-6ea9944b0d18/94d8e009-b183-4d54-a389-724181af5362.jpg"
            ></el-avatar>
          </el-form-item>
          <el-form-item label="用户名" :label-width="formLabelWidth">
            <el-input v-model="From.username" autocomplete="off"></el-input>
          </el-form-item>

          <el-form-item label="密码" :label-width="formLabelWidth">
            <el-input v-model="From.password" autocomplete="off"></el-input>
          </el-form-item>

          <el-form-item label="邮箱" :label-width="formLabelWidth">
            <el-input v-model="From.email" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <template>
          <el-radio v-model="From.status" :label="1">启用</el-radio>
          <el-radio v-model="From.status" :label="2">未启用</el-radio>
        </template>

        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="HandAddUser">确 定</el-button>
        </span>
      </el-dialog>
      <el-dialog title="分配角色" :visible.sync="dialogFormVisibleDate">
        <el-form>
          <el-form-item label="角色" :label-width="formLabelWidth">
            <el-select v-model="idTab" multiple placeholder="请选择">
              <el-option
                v-for="item in Rolse"
                :key="item.value"
                :label="item.name"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisibleDate = false">取 消</el-button>
          <el-button type="primary" @click="AddQx">确 定</el-button>
        </div>
      </el-dialog>
    </el-card>
  </div>
</template>
<script>
import {
  List,
  UserAdd,
  UserUpdate,
  UserDel,
  UserRoleList,
  UserAddRoles
} from '../../../../api/user'
export default {
  name: 'user',
  data() {
    return {
      dialogFormVisibleDate: false,
      dialogVisible: false,
      UserList: [],
      TabId: 1,
      page: {
        current: 1,
        size: 20,
        query: ''
      },
      idTab: [],
      formLabelWidth: '70px',
      From: {
        avatar:
          'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-5a307996-a7f5-483d-a6f1-6ea9944b0d18/94d8e009-b183-4d54-a389-724181af5362.jpg',

        username: '',
        password: '',
        email: '',
        status: 1
      },
      total: 0,
      Rolse: [],
      id: ''
    }
  },
  created() {
    this.HandList()
  },
  methods: {
    async AddQx() {
      console.log(this.idTab)
      const ReponRoles = await UserAddRoles(this.id, this.idTab)
      if (ReponRoles.code === 200) {
        this.$message({
          message: '添加成功',
          type: 'success'
        })
        this.dialogFormVisibleDate = false
        this.HandList()
      } else {
        this.$message.error(ReponRoles.msg)
      }
    },
    async Handrouels(row) {
      this.id = row.id
      const ReponRolues = await UserRoleList()
      console.log('角色列表', ReponRolues.data.records)
      this.Rolse = ReponRolues.data.records
      this.dialogFormVisibleDate = true
    },
    async HandDel(row) {
      const ReponUserDel = await UserDel(row.id)
      console.log(ReponUserDel)
    },
    HandT() {
      this.TabId = 1
      this.dialogVisible = true
      this.From = {
        avatar:
          'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-5a307996-a7f5-483d-a6f1-6ea9944b0d18/94d8e009-b183-4d54-a389-724181af5362.jpg',
        username: '',
        password: '',
        email: '',
        status: 1
      }
    },
    async HandList() {
      const ReponList = await List(this.page)
      console.log('UserList', ReponList)
      this.UserList = ReponList.data.records
      this.total = ReponList.data.total
    },
    HandUpdate(row) {
      // const status = row.status ? 1 : 0

      this.From = {
        avatar: row.avatar,
        username: row.username,
        password: row.password,
        email: row.email,
        status: row.status,
        id: row.id
      }
      console.log(row)
      this.dialogVisible = true
      this.TabId = 2
    },
    handleSizeChange(val) {
      this.page.size = val
      this.HandList()
    },
    handleCurrentChange(val) {
      this.page.current = val
      this.HandList()
    },
    async HandAddUser() {
      if (this.TabId === 1) {
        const reponAdd = await UserAdd(this.From)
        console.log(reponAdd)
        if (reponAdd.code === 200) {
          this.$message({
            message: '添加成功',
            type: 'success'
          })
          this.dialogVisible = false
          this.HandList()
        } else {
          this.$message.error(reponAdd.msg)
        }
      } else {
        console.log(this.From)
        const ReponUserUpdate = await UserUpdate(this.From)
        console.log('修改', ReponUserUpdate)
        if (ReponUserUpdate.code === 200) {
          this.$message({
            message: '修改成功',
            type: 'success'
          })
          this.dialogVisible = false
          this.HandList()
        } else {
          this.$message.error(ReponUserUpdate.msg)
        }
      }
    }
  }
}
</script>
<style scoped>
.chauxun {
  margin-left: 10px;
}
.input {
  width: 20%;
}
</style>
