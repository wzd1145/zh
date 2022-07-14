<template>
  <div>
    <el-card>
      <el-input placeholder="用户名" class="input" v-model="page.query">
      </el-input>
      <el-button type="success" class="chauxun" @click="HandList"
        >查询</el-button
      >

      <el-button type="success" class="chauxun" @click="HandT">新增</el-button>

      <el-table
        :data="UserList"
        default-expand-all
        border
        style="width: 100%; margin-bottom: 20px"
        row-key="id"
        :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
      >
        <el-table-column type="index" label="序号"> </el-table-column>
        <el-table-column prop="label" label="展示名称"> </el-table-column>
        <el-table-column prop="name" label="文件名称"> </el-table-column>
        <el-table-column prop="path" label="路径"> </el-table-column>
        <el-table-column prop="component" label="前端component">
        </el-table-column>
        <el-table-column prop="perms" label="唯一标识"> </el-table-column>
        <el-table-column prop="icon" label="图标"> </el-table-column>
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
        <el-table-column label="状态">
          <template slot-scope="scope">
            <el-tag type="success" v-if="scope.row.type == 0">目录</el-tag>
            <el-tag v-if="scope.row.type == 1">菜单</el-tag>
            <el-tag type="danger" v-if="scope.row.type == 2"
              >按钮</el-tag
            > </template
          >p
        </el-table-column>
        <el-table-column prop="createTime" label="注册时间"> </el-table-column>

        <el-table-column label="操作" width="250">
          <template slot-scope="scope">
            <el-button
              type="success"
              size="small"
              @click="HandUpdate(scope.row)"
              >编辑</el-button
            >
            <el-button size="small" type="danger" @click="HandDel(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        :current-page="page.current"
        :page-sizes="[20, 40, 50, 100]"
        :page-size="page.size"
        layout=" sizes, prev, pager, next, jumper"
      >
      </el-pagination>

      <el-dialog title="新增菜单" :visible.sync="dialogVisible" width="30%">
        <el-form :model="From">
          <el-form-item label="类型" :label-width="formLabelWidth">
            <el-select v-model="From.type">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="父级菜单" :label-width="formLabelWidth">
            <el-select v-model="From.parentId" placeholder="请选择">
              <el-option
                v-for="item in ParentMenu"
                :key="item.id"
                :label="item.label"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="展示名称" :label-width="formLabelWidth">
            <el-input v-model="From.label" autocomplete="off"></el-input>
          </el-form-item>

          <el-form-item label="文件名称" :label-width="formLabelWidth">
            <el-input v-model="From.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="图标" :label-width="formLabelWidth">
            <el-input v-model="From.icon" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="component" :label-width="formLabelWidth">
            <el-input v-model="From.component" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="路径" :label-width="formLabelWidth">
            <el-input v-model="From.path" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="唯一标识" :label-width="formLabelWidth">
            <el-input v-model="From.perms" autocomplete="off"></el-input>
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
    </el-card>
  </div>
</template>
<script>
import { MenuAdd, RoleDel, MenuList, MenuUpdate } from '../../../../api/user'
export default {
  name: 'user',
  data() {
    return {
      options: [
        {
          value: 0,
          label: '目录'
        },
        {
          value: 1,
          label: '菜单'
        },
        {
          value: 2,
          label: '按钮'
        }
      ],
      dialogVisible: false,
      UserList: [],
      TabId: 1,
      page: {
        current: 1,
        size: 20,
        query: ''
      },
      formLabelWidth: '90px',
      From: {
        component: '',
        icon: '',
        label: '',
        name: '',
        parentId: 0,
        path: '',
        perms: '',
        type: 1,
        status: 1
      },
      total: 0,
      ParentMenu: [{ id: 0, label: '一级菜单' }]
    }
  },
  created() {
    this.HandList()
  },
  methods: {
    async HandDel(row) {
      const ReponUserDel = await RoleDel(row.id)
      console.log(ReponUserDel)
    },
    HandT() {
      this.TabId = 1
      this.dialogVisible = true
      this.From = {
        component: '',
        icon: '',
        label: '',
        name: '',
        parentId: 0,
        path: '',
        perms: '',
        type: 1,
        status: 1
      }
    },
    async HandList() {
      const ReponList = await MenuList(this.page)
      console.log('MenuList', ReponList)
      this.UserList = ReponList.data
      const menu = ReponList.data
      menu.forEach((res) => {
        this.ParentMenu.push(res)
        res.children.forEach((ref) => {
          this.ParentMenu.push(ref)
        })
      })
      console.log(this.ParentMenu)
    },
    HandUpdate(row) {
      // const status = row.status ? 1 : 0
      console.log('GetRowList', row)
      this.From = {
        component: row.component,
        icon: row.icon,
        label: row.label,
        name: row.name,
        parentId: row.parentId,
        path: row.path,
        perms: row.perms,
        type: row.type,
        status: row.status,
        id: row.id
      }

      this.dialogVisible = true
      this.TabId = 2
    },
    async HandAddUser() {
      if (this.TabId === 1) {
        const reponAdd = await MenuAdd(this.From)
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
        const ReponUserUpdate = await MenuUpdate(this.From)
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
