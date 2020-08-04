
<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">门户管理</el-breadcrumb-item>
      <el-breadcrumb-item>圈子管理</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 搜索筛选 -->
    <el-form :inline="true" class="user-search">
      <el-form-item label="搜索："></el-form-item>
      <el-form-item label="名称">
        <el-input size="small" v-model="name" placeholder="输入名称"></el-input>
      </el-form-item>
      <el-form-item label="发布人">
        <el-input size="small" v-model="createUser" placeholder="输入发布人"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button size="small" type="warning" icon="el-icon-search" @click="search">查询</el-button>
        <el-button size="small" type="info" icon="el-icon-close" @click="resetForm('search')" >重置</el-button>
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
      <el-table-column sortable prop="name" label="标题名称" align="center"></el-table-column>
      <el-table-column sortable prop="code" label="内容" align="center" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column sortable prop="parentCode" label="分类id" align="center"></el-table-column>
      <el-table-column sortable prop="author" label="作者" align="center"></el-table-column>
      <el-table-column sortable prop="auditStatus" label="审核状态" align="center">
        <template slot-scope="scope">
           <span v-if="scope.row.auditStatus==0">未审核</span>
           <span v-if="scope.row.auditStatus==1">审核中</span>
           <span v-if="scope.row.auditStatus==2">审核通过</span>
           <span v-if="scope.row.auditStatus==3">审核驳回</span>
          </template>
      </el-table-column>
      <el-table-column sortable prop="auditOptinion" label="审核意见" align="center"></el-table-column>
      <el-table-column sortable prop="createDate" label="发布时间" align="center"></el-table-column>
      <el-table-column sortable prop="updateDate" label="修改时间" align="center"></el-table-column>
      <el-table-column sortable prop="createUser" label="发布人" align="center"></el-table-column>
      <el-table-column sortable prop="auditUser" label="审核人" align="center"></el-table-column>
      <el-table-column sortable prop="visibility" label="可见程度" align="center">
        <template slot-scope="scope">
           <span v-if="scope.row.visibility==0">自己可见</span>
           <span v-if="scope.row.visibility==1">全部可见</span>
          </template>
      </el-table-column>
      <el-table-column align="center" label="状态" prop="status">
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
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
           <el-button
           @click="openUpdatePostInfo(scope)"
            type="success"
            size="small"
            icon="el-icon-document"
          >查看详情</el-button>
     
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页组件 -->
    <Pagination v-bind:child-msg="formInline" @callFather="callFather"></Pagination>
    <update-postInfo
      :show="updatePostInfoFlag"
      :transPostInfoId="transPostInfoId"
      title="查看详情"
      @close="closeUpdatePostInfoDialog"
      @save="upPostInfo"
    ></update-postInfo> 
  </div>
</template>
<script>
import Pagination from "../../components/Pagination";
import UpdatePostInfo from "./UpdatePostInfo"
//后台路径引用
import ApiPath from "@/api/ApiPath.js";
//数据请求交互引用
import api from "@/axios/api.js";
export default {
  inject: ["reload"],
  data() {
    return {
      name: "",
      createUser:"",
      nshow: true, //switch开启
      fshow: false, //switch关闭
      loading: false, //是显示加载
      editFormVisible: false, //控制编辑页面显示与隐藏
      menuAccessshow: false, //控制数据权限显示与隐藏
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
        token: localStorage.getItem("logintoken")
      },
      userparm: [], //搜索权限
      listData: [], //用户数据
      // 数据权限
      PostInfoRight: [],
      PostInfoRightProps: {
        children: "children",
        label: "name"
      },
      //参数postInfo
      savePostInfoId: "",
    };
  },
  // 注册组件
  components: {
    Pagination,
    UpdatePostInfo
  },

  watch: {},
  mounted() {
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
        name: this.name,
        createUser:this.createUser,
        page: this.formInline.page,
        size: this.formInline.limit
      };
      api.testAxiosGet(ApiPath.url.postInfoSearch, params).then(res => {
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
    },
    upPostInfo() {
      this.updatePostInfoFlag = false;
    },
    
    //启用/禁用
    postInfoEnable: function(scope) {
      let params = {
        id: scope.row.id,
        status: scope.row.status
      };
      api.testAxiosGet(ApiPath.url.postInfoEnable, params).then(res => {
        let code = res.status;
        if (code == "0") {
          this.$message.success(res.message);
        } else {
          this.$message.success(res.message);
        }
        this.reload();
      }).catch(function(error) {});
      
    },
    //显示编辑界面
    openUpdatePostInfo(scope) {
      this.transPostInfoId = scope.row.id;
      this.updatePostInfoFlag = true;
    },
    //重置
    resetForm(search) {
      this.name = "";
      this.createUser="";
      location.reload();
    },
  }
};
</script>

<style scoped>
.user-search {
  margin-top: 20px;
}
.userPostInfo {
  width: 100%;
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