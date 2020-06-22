/**
 * 基础管理  文章管理
 */
<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">基础管理</el-breadcrumb-item>
      <el-breadcrumb-item>文章管理</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 搜索筛选 -->
    <el-form :inline="true" class="user-search">
      <el-form-item label="文章名称">
        <el-input size="small" v-model="name" placeholder="输入文章名称"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button size="small" type="primary" icon="el-icon-search" @click="search">搜索</el-button>
        <el-button size="small" type="primary" icon="el-icon-remove-outline" @click="resetForm('search')">重置</el-button>
      </el-form-item>
      <br />
      <el-row>
        <el-button size="small" type="primary" icon="el-icon-plus" @click="addArticle()">添加</el-button>
      </el-row>
      <br />
    </el-form>
    <!--列表-->
    <el-table  size="small" :data="listData" highlight-current-row v-loading="loading" border element-loading-text="拼命加载中" style="width: 100%;">
      <el-table-column type="index" label="序号" width="50" align="center"></el-table-column>
      <el-table-column sortable prop="name" label="名称" align="center" width="80"></el-table-column>
      <el-table-column sortable prop="content" :show-overflow-tooltip="true" label="内容" align="center" width="200">
         <template slot-scope="scope">
           <p  v-html="scope.row.content">{{scope.row.content}}</p>
         </template>
      </el-table-column>
      <el-table-column sortable prop="title" label="标题" align="center" width="85"></el-table-column>
      <el-table-column sortable prop="classificationName" label="分类名称" align="center" width="110"></el-table-column>
      <el-table-column sortable prop="author" label="作者" align="center" width="90"></el-table-column>
      <el-table-column sortable prop="releaseDate" label="发布时间" align="center" width="140"></el-table-column>
      <el-table-column sortable prop="createDate" label="创建时间" align="center" width="140"></el-table-column>
      <el-table-column sortable prop="updateDate" label="修改时间" align="center" width="140"></el-table-column>
      <el-table-column sortable prop="hits" label="点击量" align="center" width="85"></el-table-column>
      <el-table-column sortable prop="comments" label="评论量" align="center" width="85"></el-table-column>
      <el-table-column align="center" label="状态" prop="status" width="70">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.status"
            active-value="1"
            inactive-value="0"
            active-color="#0080FF"
            inactive-color="#84C1FF"
            @change="articleEnable(scope)"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button
            @click="release(scope)"
            type="text"
            size="small"
            style="background-color:white;border-color:#DCDFE6;color:black;  width:50px"
          >{{scope.row.isRelease == 1 ? "发布" : scope.row.isRelease == 0 ? "撤销发布" : "解锁"}}</el-button>
          <el-button 
          @click="toTop(scope)" 
          style="background-color:white;border-color:#DCDFE6;color:black; width:50px" 
          type="text" size="small" >
          {{scope.row.isTopping == 0 ? "取消置顶" : scope.row.isTopping == 1 ? "置顶" : "解锁"}}</el-button>
          <el-button
            @click="recommend(scope)"
            style="background-color:white;border-color:#DCDFE6;color:black;  width:50px"
            type="text"
            size="small"
          >{{scope.row.isRecommend == 1 ? "推荐" : scope.row.isRecommend == 0 ? "取消推荐" : "解锁"}}</el-button>
          <el-button
            style="background-color:white;border-color:#DCDFE6;color:black; width:50px"
            size="mini"
            @click="openUpdateArticle(scope)"
          >编辑</el-button>
          <el-button
            size="mini"
            style="background-color:#84C1FF;border-color:#84C1FF; width:50px"
            @click="deleteUser(scope)"
            align="left"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页组件 -->
    <Pagination v-bind:child-msg="formInline" @callFather="callFather"></Pagination>
    <add-article :show="addArt" title="添加" @close="closeArticleDialog" @save="saveArticle"></add-article>
    <update-article
      :show="updateArticleFlag"
      :transArticleId="transArticleId"
      title="修改"
      @close="closeUpdateArticleDialog"
      @save="upArticle"
    ></update-article>
  </div>
</template>

<script>
import Pagination from "../../components/Pagination";
//后台路径引用
import ApiPath from "@/api/ApiPath.js";
//数据请求交互引用
import api from "@/axios/api.js";
import AddArticle from "./addArticle";
import UpdateArticle from "./updateArticle";
export default {
  inject: ["reload"],
  data() {
    return {
      name: "",
      nshow: true, //switch开启
      fshow: false, //switch关闭
      loading: false, //是显示加载
      editFormVisible: false, //控制编辑页面显示与隐藏
      menuAccessshow: false, //控制数据权限显示与隐藏
      addArt: false,
      updateArticleFlag: false,
      transArticleId: "",
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
      ArticleRight: [],
      ArticleRightProps: {
        children: "children",
        label: "name"
      },
    };
  },
  // 注册组件
  components: {
    AddArticle,
    UpdateArticle,
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
    // 获取角色列表
    search: function(parameter) {
      let params = {
        name: this.name,
        page: this.formInline.page,
        size: this.formInline.limit
      };
      api.testAxiosGet(ApiPath.url.articleSearch, params).then(res => {
        let code = res.state;
        if (code == "0") {
          this.loading = false;
          this.listData = res.data.content;
          this.formInline.currentPage = res.data.number + 1;
          this.formInline.pageSize = res.data.size;
          this.formInline.total = res.data.totalElements;
        }
      });
    },
    saveArticle() {
      this.addArt = false;
    },
    closeArticleDialog() {
      this.addArt = false;
    },
    addArticle() {
      this.addArt = true;
    },
    closeUpdateArticleDialog() {
      this.updateArticleFlag = false;
    },
    upArticle() {
      this.updateArticleFlag = false;
    },
    //启用/禁用
    articleEnable: function(scope) {
      let params = {
        id: scope.row.id,
        status: scope.row.status
      };
      api
        .testAxiosGet(ApiPath.url.articleEnable, params)
        .then(res => {
          let code = res.state;
          if (code == "0") {
            this.$message.success(res.message);
          } else {
            this.$message.success(res.message);
          }
        })
        .catch(function(error) {});
    },
    //发布
    release(scope) {
      let params = {
        id: scope.row.id,
        isRelease: scope.row.isRelease
      };
      api.testAxiosGet(ApiPath.url.isRelease, params).then(res => {
        let code = res.state;
         if (code == "1") {
          this.$message.success(res.message);
        } else if(code == "0"){
          this.$message.success(res.message);
        }else{
          this.$message.error(res.message);
        }
        this.reload();
      });
    },

    //置顶
    toTop(scope) {
       let params = {
        id: scope.row.id,
        isTopping: scope.row.isTopping
      };
      api.testAxiosGet(ApiPath.url.isTopping, params).then(res => {
        let code = res.state;
        if (code == "1") {
          this.$message.success(res.message);
        } else if(code == "0"){
          this.$message.success(res.message);
        }else{
          this.$message.error(res.message);
        }
        this.reload();
      });
    },

    //推荐
    recommend: function(scope) {
      let params = {
        id: scope.row.id,
        isRecommend: scope.row.isRecommend
      };
      api.testAxiosGet(ApiPath.url.isRecommend, params).then(res => {
        let code = res.state;
       if (code == "1") {
          this.$message.success(res.message);
        } else if(code == "0"){
          this.$message.success(res.message);
        }else{
          this.$message.error(res.message);
        }
        this.reload();
      });
    },

    //显示编辑界面
    openUpdateArticle(scope) {
      this.transArticleId = scope.row.id;
      this.updateArticleFlag = true;
    },

    //重置
    resetForm(search) {
      this.name = "";
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
          id: scope.row.id
        };
        api.testAxiosGet(ApiPath.url.deleteArticle, params).then(res => {
          let code = res.state;
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
.el-tooltip__popper{
  font-size: 14px; 
  max-width:100px;
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