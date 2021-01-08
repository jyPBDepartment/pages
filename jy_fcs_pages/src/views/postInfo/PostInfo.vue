
<template>
  <div class="postinfo">
    <!-- 搜索筛选 -->
    <el-form :inline="true" class="user-search">
      <el-form-item label="名称">
        <el-input type="text" size="small" v-model="name" placeholder="输入名称" style="width:150px"></el-input>
      </el-form-item>
      <el-form-item label="发布人">
        <el-input type="text" size="small" v-model="createUser" placeholder="输入发布人" style="width:150px"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button size="small" type="warning" icon="el-icon-search" @click="search('manual')" class="height">查询</el-button>
        <el-button size="small" type="info" icon="el-icon-close" @click="resetForm('search')">重置</el-button>
      </el-form-item>
    </el-form>
    <!--列表-->
    <el-table
      size="mini"
      :data="listData"
      highlight-current-row
      v-loading="loading"
      border
      element-loading-text="拼命加载中"
      style="width: 100%;"
    >
      <el-table-column type="index" label="序号" min-width="6" align="center"></el-table-column>
      <el-table-column
        prop="name"
        label="标题名称"
        align="center"
        :show-overflow-tooltip="true"
        min-width="10"
      ></el-table-column>
      <el-table-column
        prop="code"
        label="帖子内容"
        align="center"
        :show-overflow-tooltip="true"
        min-width="16"
      ></el-table-column>
      <!-- <el-table-column prop="author" :show-overflow-tooltip="true" label="发帖作者" align="center" min-width="8%"></el-table-column> -->
      <el-table-column prop="auditStatus" label="审核状态" align="center" min-width="6">
        <template slot-scope="scope">
          <span v-if="scope.row.auditStatus==0">未审核</span>
          <span v-if="scope.row.auditStatus==1">审核通过</span>
          <span v-if="scope.row.auditStatus==2">审核拒绝</span>
        </template>
      </el-table-column>
      <el-table-column prop="createDate" label="发布时间" align="center" sortable min-width="12"></el-table-column>
      <el-table-column prop="auditUser" label="审核人" align="center" min-width="8"></el-table-column>
      <el-table-column prop="updateDate" label="审核时间" align="center" sortable min-width="12"></el-table-column>
      <el-table-column align="center" label="状态" prop="status" min-width="5">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.status"
            active-value="0"
            inactive-value="1"
            active-color="#13ce66"
            inactive-color="#ff4949"
            @change="postInfoEnable(scope)"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" min-width="20">
        <template slot-scope="scope">
          <el-button @click="openUpdatePostInfo(scope)" type="primary" size="mini" >信息审核</el-button>
          <el-button @click="deletePost(scope)" type="danger" size="mini">删除</el-button>
          <el-button v-if="scope.row.isSelected == '0'" @click="setSelected(scope)" type="warning" size="mini">设为精选</el-button>
          <el-button v-else @click="cancelSelected(scope)" type="info" size="mini">取消精选</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页组件 -->
    <Pagination v-bind:child-msg="formInline" @callFather="callFather"></Pagination>
    <update-postInfo
      :show="updatePostInfoFlag"
      :transPostInfoId="transPostInfoId"
      title="信息审核"
      @close="closeUpdatePostInfoDialog"
      @save="upPostInfo"
    ></update-postInfo>
  </div>
</template>
<script>
import Pagination from "../../components/Pagination";
import UpdatePostInfo from "./UpdatePostInfo";
//后台路径引用
import qs from "qs";
import Vue from "vue";
import ApiPath from "@/api/ApiPath.js";
//数据请求交互引用
import api from "@/axios/api.js";
export default {
  inject: ["reload"],
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: "对话框",
    },
  },
  data() {
    return {
      localShow: this.show,
      name: "",
      createUser: "",
      loading: false, //是显示加载
      editFormVisible: false, //控制编辑页面显示与隐藏
      addPostInfo: false,
      updatePostInfoFlag: false,
      transPostInfoId: "",
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
      listData: [], //用户数据
    };
  },
  // 注册组件
  components: {
    Pagination,
    UpdatePostInfo,
  },

  watch: {
    show(val) {
      this.localShow = val;
    },
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
    search: function (parameter) {
      if (parameter == "manual") {
        this.formInline.page = 1;
        this.formInline.limit = 10;
      }
      let params = {
        name: this.name,
        createUser: this.createUser,
        page: this.formInline.page,
        size: this.formInline.limit,
      };
      api.testAxiosGet(ApiPath.url.postInfoSearch, params).then((res) => {
        let code = res.status;
        if (code == "0") {
          this.loading = false;
          this.listData = res.data.content;
          this.formInline.currentPage = res.data.number + 1;
          this.formInline.pageSize = res.data.size;
          this.formInline.total = res.data.totalElements;
        }
      });
    },
    savePostInfo() {
      this.addPostInfo = false;
    },
    closePostInfoDialog() {
      this.addPostInfo = false;
    },
    addPostInfos() {
      this.addPostInfo = true;
    },
    closeUpdatePostInfoDialog() {
      this.updatePostInfoFlag = false;
      this.search(this.formInline);
      this.transPostInfoId= "";
    },
    upPostInfo() {
      this.updatePostInfoFlag = false;
    },
    //启用/禁用
    postInfoEnable: function (scope) {
      let params = {
        id: scope.row.id,
        status: scope.row.status,
      };
      api
        .testAxiosGet(ApiPath.url.postInfoEnable, params)
        .then((res) => {
          let code = res.status;
          if (code == "0") {
            this.$message.success(res.message);
          } else {
            this.$message.success(res.message);
          }
          this.reload();
        });
        // .catch(function (error) {});
    },
    //显示编辑界面
    openUpdatePostInfo(scope) {
      this.transPostInfoId = scope.row.id;
      this.updatePostInfoFlag = true;
    },
    //重置
    resetForm(search) {
      this.name = "";
      this.createUser = "";
      this.formInline.page = 1;
      this.formInline.limit = 10;
      this.search(this.formInline);
    },
    deletePost(scope){
       this.$confirm("确定要删除吗?", "信息", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          let params = {
            id: scope.row.id,
          };
          api.testAxiosGet(ApiPath.url.deletePostinfo, params).then((res) => {
            let code = res.state;
            if (code == "0") {
              this.$message.success(res.message);
              this.reload();
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    }
  },
};
</script>

<style scoped>
.user-search {
  margin-top: 20px;
}
.userPostInfo {
  width: 100%;
}
.height {
  margin-top: 5px;
  margin-left: 12px;
}
</style>

<style>
.el-tooltip__popper {
  max-width: 300px;
  font-size: 14px;
  background: #84c1ff !important;
}
.el-tooltip__popper[x-placement^="top"] .popper__arrow {
  border-top-color: #84c1ff;
}
.el-tooltip__popper[x-placement^="top"] .popper__arrow:after {
  border-top-color: pink;
}
</style>