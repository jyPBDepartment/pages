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
      <el-form-item label="权限名称">
        <el-input size="small" v-model="name" placeholder="输入权限名称"></el-input>
      </el-form-item>
      <!-- <el-form-item label="权限类型">
        <el-select v-model="type" size="small">
          <el-option
            v-for="item in typeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item> -->
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
      <el-button size="small" type="primary" icon="el-icon-plus" @click="addLimit()">添加</el-button>
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
      <!-- <el-table-column sortable prop="type" label="权限类型" align="center" >
        <template slot-scope="scope">
          <span v-if="scope.row.type== 0">超级</span>
          <span v-if="scope.row.type== 1">高级</span>
          <span v-if="scope.row.type== 2">普通</span>
        </template>
      </el-table-column> -->
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
      <el-table-column align="center" label="状态">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.state"
            active-value="0"
            inactive-value="1"
            active-color="#0080FF"
            inactive-color="#84C1FF"
            @change="limitEnable(scope)"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="openupdateLimit(scope)" style="background-color:white;border-color:#DCDFE6;color:black;" icon="el-icon-edit">编辑</el-button>
          <el-button size="mini" style="background-color:#84C1FF;border-color:#84C1FF; " icon="el-icon-delete" @click="deleteUser(scope)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页组件 -->
    <Pagination v-bind:child-msg="formInline" @callFather="callFather"></Pagination>
    <add-limit
      :show="addJusisdic"
      title="添加"
      @close="closeLimitDialog"
      @save="saveLimit"
    ></add-limit>
    <update-limit
      :show="updatejurFlag"
      :transLimitId="transLimitId"
      title="修改"
      @close="closeUpdateLimitDialog"
      @save="upLimit"
    ></update-limit>
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
import AddLimit from  "./addLimit";
import  UpdateLimit from "./UpdateLimit";
export default {
  inject: ["reload"],
  data() {
    return {
      name: "",
      // type: "",
      // typeOptions: [
      //   { value: "0", label: "超级" },
      //   { value: "1", label: "高级" },
      //   { value: "2", label: "普通" }
      // ],
      nshow: true, //switch开启
      fshow: false, //switch关闭
      loading: false, //是显示加载
      editFormVisible: false, //控制编辑页面显示与隐藏
      addJusisdic: false,
      updatejurFlag: false,
      transLimitId: "",
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
    AddLimit,
    UpdateLimit,
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
        // type: this.type,
        page: this.formInline.page,
        size: this.formInline.limit
      };
      api
        .testAxiosGet(ApiPath.url.limitSearch, params)
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
      // this.type = "";
      location.reload();
    },
    addLimit() {
      this.addJusisdic = true;
    },
    closeLimitDialog() {
      this.addJusisdic = false;
    },
    saveLimit() {
      this.addJusisdic = false;
    },
    closeUpdateLimitDialog() {
      this.updatejurFlag = false;
    },
    upLimit(scope) {
      this.updatejurFlag = false;
    },
    //启用/禁用
    limitEnable(scope) {
      let params = {
        id: scope.row.id,
        state: scope.row.state
      };
      api.testAxiosGet(ApiPath.url.limitEnable, params).then(res => {
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
    openupdateLimit(scope) {
      this.transLimitId = scope.row.id;
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
        api.testAxiosGet(ApiPath.url.deleteLimit, params).then(res => {
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
.el-button {
  display: inline-block;
  cursor: pointer;
  text-align: center;
  outline: none;
  color: #fff;
  border-radius: 15px;
  box-shadow: 0 6px #999;
}
.el-button:hover {
  background-color: #8cb2eb;
}
.el-button:active {
  background-color: #8cb2eb;
  box-shadow: 0 5px #666;
  transform: translateY(4px);
}
</style>