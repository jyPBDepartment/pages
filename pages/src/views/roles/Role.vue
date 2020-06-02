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
      <el-form-item label="角色名称">
        <el-input size="small" v-model="roleName" placeholder="输入角色名称"></el-input>
      </el-form-item>
      <el-form-item label="角色类型">
        <el-select v-model="roleType" size="small">
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
      </el-form-item>
      <br />
      <el-button size="small" type="primary" icon="el-icon-plus" @click="addRoles()">添加</el-button>
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
      <el-table-column type="index" label="序号" width="60" align="center"></el-table-column>
      <el-table-column sortable prop="roleName" label="角色名称" align="center"></el-table-column>
      <el-table-column sortable prop="roleType" label="角色分类" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.roleType== 0">超级管理员</span>
          <span v-if="scope.row.roleType== 1">高级管理员</span>
          <span v-if="scope.row.roleType== 2">普通管理员</span>
        </template>
      </el-table-column>
      <el-table-column sortable prop="createTime" label="创建时间" align="center">
        <template slot-scope="scope">
          <div>{{scope.row.createTime|timestampToTime}}</div>
        </template>
      </el-table-column>
      <el-table-column sortable prop="editTime" label="修改时间" align="center">
        <template slot-scope="scope">
          <div>{{scope.row.editTime|timestampToTime}}</div>
        </template>
      </el-table-column>
      <el-table-column sortable prop="editUser" label="修改人" align="center"></el-table-column>
      <el-table-column sortable prop="limitName" label="权限名称" align="center"></el-table-column>
      <el-table-column align="center" prop="state" label="状态">
        <template slot-scope="scope">
          {{scope.row.state}}
          <el-switch
            v-model="scope.row.state"
            active-value="0"
            inactive-value="1"
            active-color="#13ce66"
            inactive-color="#ff4949"
            @change="rolesEnable(scope)"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="openUpdateRole(scope)">编辑</el-button>
          <el-button
            size="mini"
            style="background-color:#84C1FF;border-color:#84C1FF; "
            @click="deleteUser(scope)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页组件 -->
    <Pagination v-bind:child-msg="formInline" @callFather="callFather"></Pagination>
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
import AddRoles from "./addRoles";
import UpdateRoles from "./updateRoles";
export default {
  inject: ["reload"],
  data() {
    return {
      roleName: "",
      roleType: "",
      rolesTypeOptions: [
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
        currentPage: 1,
        pageSize: 10,
        total: 10,
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
      //参数role
      saveroleId: ""
    };
  },
  // 注册组件
  components: {
    AddRoles,
    UpdateRoles,
    Pagination
  },

  watch: {},
 mounted(){
    // let params = {
    //     limitName: this.limitName,
    //     id:this.id
    //   };
    //   api.testAxiosGet(ApiPath.url.findJurisdiction, params).then(res => {
    //     let code = res.status;
    //     if (code=="0") {
    //      for(let i=0;i<res.data.length;i++){
    //        this.limitIdOptions.push({value:res.data[i]["name"],label:res.data[i]["name"]});
    //      }  
    //     }
    //   });
  },
  created() {
    this.search(this.formInline);
  },

  methods: {
    // 分页插件事件
    callFather(parm) {
      this.formInline.page = parm.currentPage;
      this.formInline.limit = parm.pageSize;
      this.search(this.formInline);
    },
    // 获取角色列表
    search: function(parameter) {
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

          console.log(res.data.content)
          this.formInline.currentPage = res.data.number + 1;
          this.formInline.pageSize = res.data.size;
          this.formInline.total = res.data.totalElements;
        }
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
    //启用/禁用
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
        // this.reload();
      });
    },

    //显示编辑界面
    openUpdateRole(scope) {
      this.transRolesId = scope.row.id;
      this.updateRolesFlag = true;
    },
    //重置
    resetForm(search) {
      this.roleName = "";
      this.roleType = "";
      location.reload();
    },

    // 删除角色
    deleteUser(scope) {
      this.$confirm("确定要删除吗?", "信息", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        let params = {
          id: scope.row.id,
          limitId: scope.row.limitId
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