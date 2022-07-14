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
        <el-table-column prop="name" label="角色"> </el-table-column>
        <el-table-column prop="code" label="编码"> </el-table-column>
        <el-table-column prop="remark" label="描述"> </el-table-column>

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
        <el-table-column prop="createTime" label="创建时间"> </el-table-column>
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
              @click="HandAssign(scope.row)"
              >分配权限</el-button
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

      <el-dialog title="新增角色" :visible.sync="dialogVisible" width="30%">
        <el-form :model="From">
          <el-form-item label="角色" :label-width="formLabelWidth">
            <el-input v-model="From.name" autocomplete="off"></el-input>
          </el-form-item>

          <el-form-item label="编码" :label-width="formLabelWidth">
            <el-input v-model="From.code" autocomplete="off"></el-input>
          </el-form-item>

          <el-form-item label="描述" :label-width="formLabelWidth">
            <el-input
              type="textarea"
              v-model="From.remark"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="状态" :label-width="formLabelWidth">
            <el-radio v-model="From.status" :label="1">启用</el-radio>
            <el-radio v-model="From.status" :label="2">未启用</el-radio>
          </el-form-item>
        </el-form>

        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="HandAddUser">确 定</el-button>
        </span>
      </el-dialog>

      <el-dialog
        :title="'给' + DateTree.code + '分配权限'"
        :visible.sync="dialogFormVisibleDate"
      >
        <el-form>
          <el-form-item label="权限" :label-width="formLabelWidth">
            <el-tree
              :data="router"
              show-checkbox
              ref="tree"
              node-key="id"
              default-expand-all
              :default-checked-keys="DateTree.menuIds"
              :props="defaultProps"
            >
            </el-tree>
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
  RoleAdd,
  RoleDel,
  RoleList,
  RoleUpdate,
  Assign,
  menu,
  Menuroel
} from '../../../../api/user'
export default {
  name: 'user',
  data() {
    return {
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      dialogFormVisibleDate: false,
      DateTree: [],
      dialogVisible: false,
      UserList: [],
      TabId: 1,
      page: {
        current: 1,
        size: 20,
        query: ''
      },
      formLabelWidth: '70px',
      From: {
        name: '',
        code: '',
        remark: '',
        status: 1
      },
      total: 0,
      router: [],
      id: ''
    }
  },
  created() {
    this.HandList()
  },
  methods: {
    async AddQx() {
      const RePoneMenuroel = await Menuroel(
        this.id,
        this.$refs.tree.getCheckedKeys()
      )
      console.log('权限', RePoneMenuroel)
      if (RePoneMenuroel.code === 200) {
        this.$message({
          message: '分配成功',
          type: 'success'
        })
        this.HandList()
      } else {
        this.$message.error(RePoneMenuroel.msg)
      }
      this.dialogFormVisibleDate = false
      this.HandList()
    },
    async HandAssign(row) {
      this.id = row.id
      const Assite = await Assign(row.id)
      console.log('Assite', Assite)
      this.DateTree = Assite.data
      const tt = await menu()
      this.router = tt.data
      this.dialogFormVisibleDate = true
    },
    async HandDel(row) {
      const ReponUserDel = await RoleDel(row.id)
      console.log(ReponUserDel)
    },
    HandT() {
      this.TabId = 1
      this.dialogVisible = true
      this.From = {
        name: '',
        code: '',
        remark: '',
        status: 1
      }
    },
    async HandList() {
      const ReponList = await RoleList(this.page)
      console.log('RolesList', ReponList)
      this.UserList = ReponList.data.records
      this.total = ReponList.data.total
    },
    HandUpdate(row) {
      // const status = row.status ? 1 : 0
      console.log(row.status)
      this.From = {
        name: row.name,
        code: row.code,
        remark: row.remark,
        status: row.status,
        id: row.id
      }
      console.log(this.From.status)
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
        const reponAdd = await RoleAdd(this.From)
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
        const ReponUserUpdate = await RoleUpdate(this.From)
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
