/**
 * 圈子管理  评论管理
 */
<template>
  <div>
    <!-- 面包屑导航 -->
    <!-- 搜索筛选 -->
    <el-form :inline="true" ref="searchForm" class="user-search">
      <el-form-item prop="type" label="评论内容">
        <el-input
          size="small"
          v-model="content"
          placeholder="输入评论内容"
        ></el-input>
      </el-form-item>
      <el-form-item prop="type" label="评论人">
        <el-input
          size="small"
          v-model="user"
          placeholder="输入评论人"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          size="small"
          type="warning"
          icon="el-icon-search"
          @click="search('manual')"
          class="find"
          >查询</el-button
        >

        <el-button
          size="small"
          type="info"
          icon="el-icon-remove-outline"
          @click="resetForm('search')"
          class="small"
          >重置</el-button
        >
      </el-form-item>
      <br />

      <br />
    </el-form>
    <!--列表-->
    <el-table
      size="mini"
      :data="listData"
      highlight-current-row
      v-loading="loading"
      border
      element-loading-text="拼命加载中"
      style="width: 100%"
    >
      <el-table-column
        type="index"
        label="序号"
        align="center"
        min-width="5"
      ></el-table-column>
      <el-table-column
        prop="title"
        label="标题"
        align="center"
        min-width="15"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="commentContent"
        label="评论内容"
        align="center"
        min-width="15"
      ></el-table-column>
      <el-table-column
        prop="commentUserName"
        label="评论人"
        align="center"
        min-width="10"
      ></el-table-column>
      <el-table-column
        sortable
        prop="date"
        label="评论时间"
        width="200px"
        align="center"
        min-width="10"
      ></el-table-column>
      <el-table-column align="center" label="状态" prop="status" min-width="5">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.status"
            active-value = "1"
            inactive-value = "0"
            active-color="#13ce66"
            inactive-color="#ff4949"
            @change="commentEnable(scope)"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" min-width="25">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="success"
            @click="showDetail(scope)"
            align="left"
            >详情</el-button
          >
          <el-button
            size="mini"
            type="primary"
            @click="openReply(scope)"
            align="left"
            icon="el-icon-circle-plus-outline"
            >查看回复</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="deleteUser(scope)"
            align="left"
            icon="el-icon-delete"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页组件 -->
    <Pagination
      v-bind:child-msg="formInline"
      @callFather="callFather"
    ></Pagination>
    <!-- 粮食回复列表-->
    <case-reply
      :show="caseReplyFlag"
      :transCommentId="transCommentId"
      title="回复列表"
      @close="closeReplyDialog"
    ></case-reply>
    <case-comment-detail
      :show="caseCommentDetailFlag"
      :transCommentInfo="transCommentInfo"
      title="评论详情"
      @close="closeCaseCommentDetail"
    ></case-comment-detail>
  </div>
</template>

<script>
import Pagination from "../../components/Pagination";
//后台路径引用
import ApiPath from "@/api/ApiPath.js";
//数据请求交互引用
import api from "@/axios/api.js";
//import AddArticle from "./addArticle";
//import UpdateArticle from "./updateArticle";
//import ContentShow from "./content"
import CaseReply from "./caseReply";
import CaseCommentDetail from "./caseCommentDetail";
export default {
  inject: ["reload"],
  data() {
    return {
      content: "",
      user: "",
      loading: true, //是显示加载
      status: "",
      formInline: {
        page: 1,
        limit: 10,
        varLable: "",
        varName: "",
        currentPage: 1,
        pageSize: 10,
        total: 10,
        token: localStorage.getItem("logintoken"),
      },
      userparm: [], //搜索权限
      listData: [], //用户数据
      caseReplyFlag: false,
      transCommentId:'',
      caseCommentDetailFlag:false,
      transCommentInfo:[]
    };
  },
  // 注册组件
  components: {
    // AddArticle,
    // UpdateArticle,
    CaseReply,
    CaseCommentDetail,
    Pagination,
  },

  watch: {},
  created() {
    this.search(this.formInline);
  },

  methods: {
    closeCaseCommentDetail(){
      this.caseCommentDetailFlag = false;
    },
    showDetail(scope){
      this.transCommentInfo.push(scope);
      this.caseCommentDetailFlag = true;
    },
    closeReplyDialog() {
      this.caseReplyFlag = false;
    },
    openReply(scope) {
      this.transCommentId = scope.row.id;
      this.caseReplyFlag = true;
    },
    // 分页插件事件
    callFather(parm) {
      this.formInline.page = parm.currentPage;
      this.formInline.limit = parm.pageSize;
      this.search(this.formInline);
    },
    // 获取评论列表
    search: function (parameter) {
      //点击搜索按钮时重置分页信息
      if (parameter == "manual") {
        this.formInline.page = 1;
        this.formInline.limit = 10;
      }
      //alert(JSON.stringify(parameter));
      let params = {
        commentContent: this.content,
        commentUserName: this.user,
        page: this.formInline.page,
        size: this.formInline.limit,
      };
      api
        .testAxiosGet(ApiPath.url.caseInfoCommentFindCaseList, params)
        .then((res) => {
          if (res.code == "200") {
            this.loading = false;
            this.listData = res.data.content;
            this.formInline.currentPage = res.data.number + 1;
            this.formInline.pageSize = res.data.size;
            this.formInline.total = res.data.totalElements;
          }
        })
        .catch(function (error) {});
    },

    //启用/禁用
    commentEnable: function (scope) {
      let params = {
        id: scope.row.id,
        status: scope.row.status,
      };
      api
        .testAxiosGet(ApiPath.url.caseInfoCommentEnable, params)
        .then((res) => {
          let code = res.state;
          this.$message.success(res.message);
        })
        .catch(function (error) {});
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
        type: "warning",
      }).then(() => {
        let params = {
          id: scope.row.id,
        };
        api.testAxiosGet(ApiPath.url.caseInfoCommentDelete, params).then((res) => {
          if (res.code == "200") {
            this.$message.success(res.message);
            //this.reload();
            this.listData.splice(scope.$index, 1);
          } else {
            this.$message.console.error();
          }
        });
      });
    },
  },
};
</script>

<style scoped>
.user-search {
  margin-top: 20px;
}
.el-tooltip__popper {
  font-size: 14px;
  max-width: 100px;
}
.template {
  size: medium;
  color: rgb(17, 17, 17);
  background-color: rgb(199, 215, 231);
  border-color: rgb(121, 212, 59);
  border-radius: 3px;
}
</style>