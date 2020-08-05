/**
 * 圈子管理  回复管理
 */
<template>
  <div>
    <!-- 面包屑导航 --> 
    <!-- 搜索筛选 -->
    <el-form :inline="true" ref="searchForm" class="user-search">
      <el-form-item prop="type" label="回复内容">
        <el-input size="small" v-model="content" placeholder="输入回复内容"></el-input>
      </el-form-item>
      <el-form-item prop="type" label="回复人">
        <el-input size="small" v-model="user" placeholder="输入回复人"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button size="small" type="warning" icon="el-icon-search" @click="search" >查询</el-button>
        
        <el-button size="small" type="info" icon="el-icon-remove-outline" @click="resetForm('search')" >重置</el-button>
      </el-form-item>
      <br />
      
      <br />
    </el-form>
    <!--列表-->
    <el-table  size="mini" :data="listData" highlight-current-row v-loading="loading" border element-loading-text="拼命加载中" style="width: 100%;">
      <el-table-column type="index" label="序号" width="50" align="center"></el-table-column>
      <el-table-column show-overflow-tooltip  prop="postCommentInfoEntity.postInfoEntity.name" label="贴子标题" align="center" ></el-table-column>
      <el-table-column show-overflow-tooltip  prop="postCommentInfoEntity.commentContent" label="评论内容" align="center" ></el-table-column>
      <el-table-column sortable prop="replyUserName" label="回复人" align="center" ></el-table-column>
      <el-table-column show-overflow-tooltip  prop="replyContent" label="评论回复内容" align="center" ></el-table-column>

      <el-table-column sortable prop="replyDate" label="回复时间" width="200px" align="center" ></el-table-column>
      <el-table-column align="center" label="状态（是否启用）" prop="status" >
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.status"
            active-value="0"
            inactive-value="1"
            active-color="#13ce66"
            inactive-color="#ff4949"
            @change="commentEnable(scope)"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" >
        <template slot-scope="scope">
          <el-button
            size="small"
            type="danger"
            @click="deleteUser(scope)"
            align="left"
             icon="el-icon-delete"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页组件 -->
    <Pagination v-bind:child-msg="formInline" @callFather="callFather"></Pagination>
  </div>
</template>

<script>
import qs from "qs";
import Vue from "vue";
import Pagination from "../../components/Pagination";
//后台路径引用
import ApiPath from "@/api/ApiPath.js";
//数据请求交互引用
import api from "@/axios/api.js";
//import AddArticle from "./addArticle";
//import UpdateArticle from "./updateArticle";
//import ContentShow from "./content"
export default {
  inject: ["reload"],
  data() {
    return {
      content: "",
      user:"",
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
      userparm: [], //搜索权限
      listData: [], //用户数据
    };
  },
  // 注册组件
  components: {
   // AddArticle,
   // UpdateArticle,
    Pagination,
   // ContentShow
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
    // 获取评论列表
    search: function(parameter) {
      let params = {
        content: this.content,
        user: this.user,
        page: this.formInline.page,
        size: this.formInline.limit
      };
      api.testAxiosGet(ApiPath.url.replySearch, params).then(res => {
        let code = res.state;
        if (code == "0") {
          this.loading = false;
          this.listData = res.data.content;
          this.formInline.currentPage = res.data.number + 1;
          this.formInline.pageSize = res.data.size;
          this.formInline.total = res.data.totalElements;
        }
      }).catch(function (error) {});
    },

    //启用/禁用
    commentEnable: function(scope) {
      let params = {
        id: scope.row.id,
        status: scope.row.status
      };
      api
        .testAxiosGet(ApiPath.url.replyEnable, params)
        .then(res => {
          let code = res.state;
          this.$message.success(res.message);
        })
        .catch(function(error) {});
    },
    //重置
    resetForm(search) {
      //this.$refs['searchForm'].resetFields()
      this.content = "";
      this.user = "";
      this.formInline.page = 1;
      this.formInline.limit = 10;
      this.search(this.formInline);
    },

    // 删除评论
    deleteUser(scope) {
      this.$confirm("确定要删除吗?", "信息", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        let params = {
          id: scope.row.id
        };
        api.testAxiosGet(ApiPath.url.replyDelete, params).then(res => {
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
  }
};
</script>

<style scoped>
.user-search {
  margin-top: 20px;
}
.el-tooltip__popper{
  font-size: 14px; 
  max-width:100px;
}
.template {
  size: medium;
  color: rgb(17, 17, 17);
  background-color: rgb(199, 215, 231);
  border-color: rgb(121, 212, 59);
  border-radius: 3px;
}
.insert{
  width: 82px;
  background-color: #67c23a;
  border-color: #67c23a;
  color: #fff;
  font-size: 12px;
  margin-top: 4px;
}

</style>