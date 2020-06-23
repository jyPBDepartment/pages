<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">基础信息</el-breadcrumb-item>
      <el-breadcrumb-item>预约讲解</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 搜索筛选 -->
    <el-form :inline="true" class="user-search">
      <el-form-item label="搜索："></el-form-item>
      <el-form-item label="姓名">
        <el-input size="small" v-model="name" placeholder="输入姓名"></el-input>
      </el-form-item>
      <el-form-item label="姓名电话">
        <el-input size="small" v-model="phoneNum" placeholder="输入电话"></el-input>
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
      <el-table-column sortable prop="name" label="姓名" align="center"></el-table-column>
      <el-table-column sortable prop="phoneNum" label="电话" align="center"></el-table-column>
      <el-table-column sortable prop="companyName" label="公司地址" align="center"></el-table-column>
      <el-table-column sortable prop="email" label="邮箱" align="center"></el-table-column>
      <el-table-column sortable prop="solution" label="意向解决方案" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.solution == 1">农资经销商解决方案用</span>
          <span v-else>农资供应商解决方案用</span>
        </template>
      </el-table-column>
      <el-table-column sortable prop="address" label="所在地区" align="center"></el-table-column>
      <el-table-column sortable prop="createDate" label="创建时间" align="center">
        <template slot-scope="scope">
          <div>{{scope.row.createDate|timestampToTime}}</div>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页组件 -->
    <Pagination v-bind:child-msg="formInline" @callFather="callFather"></Pagination>
  </div>
</template>

<script>
import Pagination from "../../components/Pagination";
//后台路径引用
import ApiPath from "@/api/ApiPath.js";
//数据请求交互引用
import api from "@/axios/api.js";
export default {
  inject: ["reload"],
  data() {
    return {
      name: "",
      phoneNum: "",
      loading: false, //是显示加载
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
      // 选择数据
      selectdata: [],
      userparm: [], //搜索权限
      listData: [] //用户数据
    };
  },
  // 注册组件
  components: {
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
    // 分页查询
    search: function(parameter) {
      let params = {
        name: this.name,
        phoneNum: this.phoneNum,
        page: this.formInline.page,
        size: this.formInline.limit
      };
      api
        .testAxiosGet(ApiPath.url.appSearch, params)
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
      this.phoneNum = "";
      location.reload();
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