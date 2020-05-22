/**
 * 系统管理  角色管理
 */
<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>角色管理</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 搜索筛选 -->
    <el-form :inline="true" class="user-search">
      <el-form-item label="角色名称：">
        <el-input size="small"  v-model="roleName" placeholder="输入角色名称"></el-input>
      </el-form-item>
      <el-form-item label="类型" size="small">
        <el-select v-model="roleType">
          <el-option
            v-for="item in rolesTypeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button size="small" type="primary" icon="el-icon-search" @click="search">搜索</el-button>
        <el-button
          size="small"
          type="primary"
          icon="el-icon-remove-outline"
          @click="resetForm('search')"
        >重置</el-button>
        <el-button size="small" type="primary" icon="el-icon-plus" @click="addRoles()">添加</el-button>
      </el-form-item>
    </el-form>
    <!--列表-->
    <el-table
      size="small"
      :data="listData"
      highlight-current-row
      v-loading="loading"
      border
      element-loading-text="拼命加载中"
      style="width: 100%;"
    >
      <el-table-column align="center" type="selection" width="60"></el-table-column>
      <el-table-column type="index" label="序号" width="60" align="center"></el-table-column>
      <el-table-column prop="id" label="ID" align="center" width="300"></el-table-column>
      <el-table-column sortable prop="roleName" label="角色名称" align="center" width="200"></el-table-column>
      <el-table-column sortable prop="roleType" label="角色分类" align="center" width="200">
        <template slot-scope="scope">
          <span v-if="scope.row.roleType== 0">超级管理员</span>
          <span v-if="scope.row.roleType== 1">高级管理员</span>
          <span v-if="scope.row.roleType== 2">普通管理员</span>
        </template>
      </el-table-column>
      <el-table-column sortable prop="editTime" label="修改时间" align="center" width="200">
        <template slot-scope="scope">
          <div>{{scope.row.editTime|timestampToTime}}</div>
        </template>
      </el-table-column>
      <el-table-column sortable prop="editUser" label="修改人" align="center" width="120"></el-table-column>
      <el-table-column align="center" label="操作" >
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="openupdateRole(scope)">编辑</el-button>
          <el-button size="mini" type="danger" @click="deleteUser(scope)">删除</el-button>
          <el-button
            size="mini"
            @click="rolesEnable(scope)"
            type="primary"
          >{{scope.row.state == 0 ? "禁用" : scope.row.state == 1 ? "启用" : "解锁"}}</el-button>
          <!-- <el-button size="mini" type="success" @click="menuAccess(scope.$index, scope.row)">菜单权限</el-button> -->
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页组件 -->
    <Pagination v-bind:child-msg="pageparm" @callFather="callFather"></Pagination>
    <add-roles :show="addRole" title="添加" @close="closeRolesDialog" @save="saveRoles"></add-roles>
    <update-roles
      :show="updateRolesFlag"
      :transRolesId="transRolesId"
      title="修改"
      @close="closeUpdateRolesDialog"
      @save="upRoles"
    ></update-roles>
  </div>
</template>

<script>
import {
  roleList,
  roleSave,
  roleDelete,
  rolePwd,
  RoleRightTree,
  RoleRightSave
} from "../../api/userMG";
import Pagination from "../../components/Pagination";
//后台路径引用
import ApiPath from "@/api/ApiPath.js";
//数据请求交互引用
import api from "@/axios/api.js";
import AddRoles from "./addRoles.vue";
import UpdateRoles from "./updateRoles.vue";
export default {
  inject:['reload'],
  data() {
    return {
      roleName: "",
      roleType: "",
      rolesTypeOptions: [
        { value: "-1", label: "请选择" },
        { value: "0", label: "超级管理员" },
        { value: "1", label: "高级管理员" },
        { value: "2", label: "普通管理员" }
      ],
      nshow: true, //switch开启
      fshow: false, //switch关闭
      loading: false, //是显示加载
      editFormVisible: false, //控制编辑页面显示与隐藏
      menuAccessshow: false, //控制数据权限显示与隐藏
      addRole: false,
      updateRolesFlag: false,
      transRolesId: "",
      formInline: {
        page: 1,
        limit: 10,
        varLable: "",
        varName: "",
        token: localStorage.getItem("logintoken")
      },
      // 删除
      seletedata: {
        ids: "",
        token: localStorage.getItem("logintoken")
      },
      userparm: [], //搜索权限
      listData: [], //用户数据
      // 数据权限
      RoleRight: [],
      RoleRightProps: {
        children: "children",
        label: "name"
      },
      // 选中
      checkmenu: [],
      //参数role
      saveroleId: "",
      // 分页参数
      pageparm: {
        currentPage: 1,
        pageSize: 10,
        total: 10
      }
    };
  },
  // 注册组件
  components: {
    AddRoles,
    UpdateRoles,
    Pagination
  },
  /**
   * 数据发生改变
   */

  watch: {},

  /**
   * 创建完毕
   */

  created() {
    this.search(this.formInline);
  },
  /**
   * 里面的方法只有被调用才会执行
   */

  methods: {
    // 分页插件事件
    callFather(parm) {
      this.formInline.page = parm.currentPage;
      this.formInline.limit = parm.pageSize;
      this.search(this.formInline);
    },
   // 获取角色列表
    search:function(parameter) {
      let params = {
        roleName: this.roleName,
        roleType: this.roleType,
        page: this.formInline.page,
        size: this.formInline.limit
      };
      api.testAxiosGet(ApiPath.url.roleSearch, params).then(res => {
          let code = res.status;
          if (code == "0") {
            this.loading = false;
            this.listData = res.data.content;
            this.pageparm.currentPage = res.data.number + 1;
            this.pageparm.pageSize = res.data.size;
            this.pageparm.total = res.data.totalElements;
          } else {
          }
        })
        .catch(err => {
         // this.$message.error(err.data);
        });
    },
     
    saveRoles() {
      this.addRole = false;
    },
    closeRolesDialog() {
      this.addRole = false;
    },
    addRoles() {
      this.addRole = true;
    },
    closeUpdateRolesDialog() {
      this.updateRolesFlag = false;
    },
    upRoles() {
      this.updateRolesFlag = false;
    },
    rolesEnable(scope) {
      let params = {
        id: scope.row.id,
        state: scope.row.state
      };
      api.testAxiosGet(ApiPath.url.rolesEnable, params).then(res => {
        let code = res.status;
        if (code == "0") {
          this.$message.success(res.message);
        } else {
          this.$message.success(res.message);
        }
        this.reload();
      });
    },
    //显示编辑界面
    openupdateRole(scope) {
      console.log(scope);
      this.transRolesId = scope.row.id;
      this.updateRolesFlag = true;
    },
    resetForm(search) {
        this.roleName= "";
        this.roleType= "-1";
    },

    submitForm(editData) {
      this.$refs[editData].validate(valid => {
        if (valid) {
          roleSave(this.editForm)
            .then(res => {
              this.editFormVisible = false;
              this.loading = false;
              if (res.success) {
                this.search(this.formInline);
                this.$message({
                  type: "success",
                  message: "角色保存成功！"
                });
              } else {
                this.$message({
                  type: "info",
                  message: res.msg
                });
              }
            })
            .catch(err => {
              this.editFormVisible = false;
              this.loading = false;
              this.$message.error("角色保存失败，请稍后再试！");
            });
        } else {
          return false;
        }
      });
    },
    // 删除角色
    deleteUser(scope) {
      this.$confirm("确定要删除吗?", "信息", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        let params = {
          id: scope.row.id
        };
        api.testAxiosGet(ApiPath.url.deleteRoles, params).then(res => {
          let code = res.status;
          if (code == "0") {
            this.$message.success(res.message);
            this.reload();
          } else {
            this.$message.console.error();
          }
        });
      });
    },
    // 数据权限
    menuAccess: function(index, row) {
      this.menuAccessshow = true;
      this.saveroleId = row.roleId;
      RoleRightTree(row.roleId)
        .then(res => {
          if (res.data.success) {
            this.$message({
              type: "success",
              message: "获取权限成功"
            });
            this.changemenu(res.data.data);
            this.RoleRight = this.changeArr(res.data.data);
          } else {
            this.$message({
              type: "info",
              message: res.data.msg
            });
          }
        })
        .catch(err => {
          this.loading = false;
          this.$message.error("获取权限失败，请稍后再试！");
        });
    },
    // 选中菜单
    changemenu(arr) {
      let change = [];
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].checked) {
          change.push(arr[i].id);
        }
      }
      this.checkmenu = change;
    },
    // tree 递归
    changeArr(list) {
      var temptree = [],
        tree = [],
        items = [];
      for (var i in list) {
        if (!temptree[list[i].id]) {
          var trow = {
            id: list[i].id,
            pId: list[i].pId,
            name: list[i].name,
            open: list[i].open,
            checked: list[i].checked,
            children: []
          };
          temptree[list[i].id] = trow;
          items.push(trow);
        }
        if (list[i].uid > 0) {
          temptree[list[i].id]["children"].push({
            id: list[i].id,
            pId: list[i].pId,
            name: list[i].name,
            open: list[i].open,
            checked: list[i].checked,
            children: []
          });
        }
      }

      for (var j in items) {
        if (temptree[items[j].pId]) {
          temptree[items[j].pId]["children"].push(temptree[items[j].id]);
        } else {
          tree.push(temptree[items[j].id]);
        }
      }
      temptree = null;
      items = null;
      return tree;
    },
    // 菜单权限-保存
    menuPermSave() {
      let parm = {
        roleId: this.saveroleId,
        moduleIds: ""
      };
      let node = this.$refs.tree.getCheckedNodes();
      let moduleIds = [];
      if (node.length != 0) {
        for (let i = 0; i < node.length; i++) {
          moduleIds.push(node[i].id);
        }
        parm.moduleIds = JSON.stringify(moduleIds);
      }
      RoleRightSave(parm)
        .then(res => {
          if (res.success) {
            this.$message({
              type: "success",
              message: "权限保存成功"
            });
            this.menuAccessshow = false;
            this.search(this.formInline);
          } else {
            this.$message({
              type: "info",
              message: res.msg
            });
          }
        })
        .catch(err => {
          this.loading = false;
          this.$message.error("权限保存失败，请稍后再试！");
        });
    },
    // 关闭编辑、增加弹出框
    closeDialog(dialog) {
      if (dialog == "edit") {
        this.editFormVisible = false;
      } else if (dialog == "perm") {
        this.menuAccessshow = false;
      }
    }
  }
};
</script>

<style scoped>
.user-search {
  margin-top: 20px;
}
.userRole {
  width: 100%;
}
</style>

 