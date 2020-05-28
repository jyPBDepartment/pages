/**
 * 系统管理  权限管理
 */
<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 搜索筛选 -->
    <el-form :inline="true" class="user-search">
      <el-form-item label="搜索：">
        <el-input size="small" v-model="name" placeholder="输入权限名称"></el-input>
      </el-form-item>
      <el-form-item label="权限类型">
        <el-select v-model="type" size="small">
          <el-option
            v-for="item in typeOptions"
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
      <br>
      <el-button size="small" type="primary" icon="el-icon-plus" @click="addJurisdiction()">添加</el-button>
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
      <el-table-column sortable prop="name" label="权限名称" align="center" ></el-table-column>
      <el-table-column sortable prop="type" label="权限类型" align="center" >
        <template slot-scope="scope">
          <span v-if="scope.row.type== 0">超级</span>
          <span v-if="scope.row.type== 1">高级</span>
          <span v-if="scope.row.type== 2">普通</span>
        </template>
      </el-table-column>
      <el-table-column sortable prop="path" label="权限路径" align="center" ></el-table-column>
       <el-table-column sortable prop="createTime" label="创建时间" align="center">
        <template slot-scope="scope">
          <div>{{scope.row.createTime|timestampToTime}}</div>
        </template>
      </el-table-column>
      <el-table-column sortable prop="editTime" label="修改时间" align="center" >
        <template slot-scope="scope">
          <div>{{scope.row.editTime|timestampToTime}}</div>
        </template>
      </el-table-column>
      <el-table-column sortable prop="editUser" label="修改人" align="center" ></el-table-column>
      <!-- <el-table-column sortable prop="roleId" label="角色ID" align="center"></el-table-column> -->
      <el-table-column align="center" label="状态">
        <template slot-scope="scope">
          <el-switch
            v-if="scope.row.state==0"
            v-model="nshow"
            active-color="#0080FF"
            inactive-color="#84C1FF"
            @change="jurisdictionEnable(scope)"
          ></el-switch>
          <el-switch
            v-else
            v-model="fshow"
            active-color="#0080FF"
            inactive-color="#84C1FF"
            @change="jurisdictionEnable(scope)"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="openupdateJurisdiction(scope)">编辑</el-button>
          <el-button size="mini" style="background-color:#84C1FF;border-color:#84C1FF; " @click="deleteUser(scope)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页组件 -->
    <Pagination v-bind:child-msg="formInline" @callFather="callFather"></Pagination>
    <add-jurisdiction
      :show="addJusisdic"
      title="添加"
      @close="closeJurisdictionDialog"
      @save="saveJurisdiction"
    ></add-jurisdiction>
    <update-jurisdiction
      :show="updatejurFlag"
      :transJurisdictionId="transJurisdictionId"
      title="修改"
      @close="closeUpdateJurisdictionDialog"
      @save="upjurisdiction"
    ></update-jurisdiction>
  </div>
</template>

<script>
import {
  permissionList,
  ermissionSave,
  ermissionDelete,
  roleDropDown,
  RolePermission
} from "../../api/userMG";
import Pagination from "../../components/Pagination";
//后台路径引用
import ApiPath from "@/api/ApiPath.js";
//数据请求交互引用
import api from "@/axios/api.js";
import AddJurisdiction from  "./addJurisdiction";
import  UpdateJurisdiction from "./UpdateJurisdiction";
export default {
  inject: ["reload"],
  data() {
    return {
      name: "",
      type: "",
      typeOptions: [
        { value: "0", label: "超级" },
        { value: "1", label: "高级" },
        { value: "2", label: "普通" }
      ],
      nshow: true, //switch开启
      fshow: false, //switch关闭
      loading: false, //是显示加载
      editFormVisible: false, //控制编辑页面显示与隐藏
      addJusisdic: false,
      updatejurFlag: false,
      transJurisdictionId: "",
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
      // 删除
      seletedata: {
        ids: "",
        token: localStorage.getItem("logintoken")
      },
      // 选择数据
      selectdata: [],
      userparm: [], //搜索权限
      listData: [], //用户数据
    };
  },
  // 注册组件
  components: {
    AddJurisdiction,
    UpdateJurisdiction,
    Pagination
  },

  watch: {},

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
    // 获取数据方法
    search: function(parameter) {
      let params = {
        name: this.name,
        path: this.path,
        type: this.type,
        // roleId:this.roleId,
        page: this.formInline.page,
        size: this.formInline.limit
      };
      api
        .testAxiosGet(ApiPath.url.jurisdictionSearch, params)
        .then(res => {
          let code = res.status;
          if (code == "0") {
            this.loading = false;
            this.listData = res.data.content;
            this.formInline.currentPage = res.data.number + 1;
            this.formInline.pageSize = res.data.size;
            this.formInline.total = res.data.totalElements;
          } else {
            this.$message.error(res.message);
          }
        })
        .catch(err => {
          this.$message.error(err.data);
        });
    },
    resetForm(search) {
      this.name = "";
      this.type = "";
      location.reload();
    },
    addJurisdiction() {
      this.addJusisdic = true;
    },
    closeJurisdictionDialog() {
      this.addJusisdic = false;
    },
    saveJurisdiction() {
      this.addJusisdic = false;
    },
    closeUpdateJurisdictionDialog() {
      this.updatejurFlag = false;
    },
    upjurisdiction(scope) {
      this.updatejurFlag = false;
    },
    //启用/禁用
    jurisdictionEnable(scope) {
      let params = {
        id: scope.row.id,
        state: scope.row.state
      };
      api.testAxiosGet(ApiPath.url.jurisdictionEnable, params).then(res => {
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
    openupdateJurisdiction(scope) {
      console.log(scope);
      this.transJurisdictionId = scope.row.id;
      this.updatejurFlag = true;
    },
    // 删除权限
    deleteUser(scope) {
      this.$confirm("确定要删除吗?", "信息", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        let params = {
          id: scope.row.id
        };
        api.testAxiosGet(ApiPath.url.deleteJurisdiction, params).then(res => {
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

 