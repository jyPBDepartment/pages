/**
 * 门户管理  文章管理
 */
<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">门户管理</el-breadcrumb-item>
      <el-breadcrumb-item>文章管理</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 搜索筛选 -->
    <el-form :inline="true" class="user-search">
      <el-form-item label="搜索："></el-form-item>
      <el-form-item label="文章名称">
        <el-input size="small" v-model="name" placeholder="输入文章名称"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button size="medium" type="text" icon="el-icon-search" @click="search" class="find">查询</el-button>
        
        <el-button size="medium" type="text" icon="el-icon-remove-outline" @click="resetForm('search')" class="small">重置</el-button>
      </el-form-item>
      <br />
      <el-row>
        <el-button size="medium" type="text" icon="el-icon-plus" @click="addArticle()" class="insert">添加</el-button>
      </el-row>
      <br />
    </el-form>
    <!--列表-->
    <el-table  size="small" :data="listData" highlight-current-row v-loading="loading" border element-loading-text="拼命加载中" style="width: 100%;">
      <el-table-column type="index" label="序号" width="50" align="center"></el-table-column>
      <el-table-column sortable prop="name" label="名称" align="center" width="100"></el-table-column>
      <el-table-column  label="内容" align="center" width="100">
         <template slot-scope="scope">
            <el-button
            type="primary"
            size="mini"
            @click="contentShow(scope.row.content)"
          >内容详情</el-button>
           <!-- <el-button type="primary" @click="contentShow(scope.row.content)">内容详情</el-button> -->
         </template>
      </el-table-column>
      <el-table-column sortable prop="title" label="标题" align="center" width="100"></el-table-column>
      <el-table-column sortable prop="classificationName" label="分类名称" align="center" width="120"></el-table-column>
      <el-table-column sortable prop="author" label="作者" align="center" width="100"></el-table-column>
      <el-table-column sortable prop="releaseDate" label="发布时间" align="center" width="150"></el-table-column>
      <el-table-column sortable prop="createDate" label="创建时间" align="center" width="150"></el-table-column>
      <el-table-column sortable prop="updateDate" label="修改时间" align="center" width="150"></el-table-column>
      <el-table-column sortable prop="hits" label="点击量" align="center" width="90"></el-table-column>
      <el-table-column sortable prop="comments" label="评论量" align="center" width="90"></el-table-column>
      <el-table-column align="center" label="状态" prop="status" width="100">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.status"
            active-value="1"
            inactive-value="0"
            active-color="#13ce66"
            inactive-color="#ff4949"
            @change="articleEnable(scope)"
          ></el-switch>
        </template>
      </el-table-column>

      <el-table-column align="center" label="是否发布" prop="status" width="100">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.isRelease"
            active-value="0"
            inactive-value="1"
            active-color="#13ce66"
            inactive-color="#ff4949"
            @change="release(scope)"
          ></el-switch>
        </template>
      </el-table-column>

      <el-table-column align="center" label="是否置顶" prop="status" width="100">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.isTopping"
            active-value="0"
            inactive-value="1"
            active-color="#13ce66"
            inactive-color="#ff4949"
            @change="toTop(scope)"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column align="center" label="是否推荐" prop="status" width="100">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.isRecommend"
            active-value="0"
            inactive-value="1"
            active-color="#13ce66"
            inactive-color="#ff4949"
            @change="recommend(scope)"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="200">
        <template slot-scope="scope">
          <el-button
           class="up"
            size="redium"
            type="text"
            @click="openUpdateArticle(scope)"
            icon="el-icon-edit"
          >编辑</el-button>
          <el-button
            size="redium"
            type="text"
           class="del"
            @click="deleteUser(scope)"
            align="left"
             icon="el-icon-delete"
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
    <content-show  
      :show="contentShowFlag"
      :contentShowId="contentShowId"
      title="内容详情"
      @close="closeUpdatecontentShowDialog"
      ></content-show>
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
import ContentShow from "./content"
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
      contentShowFlag:false,
      transArticleId: "",
      contentShowId:"",
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
    Pagination,
    ContentShow
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
    closeUpdatecontentShowDialog(){
      this.contentShowFlag = false;
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

    // 删除
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
    },
    contentShow(scope){
      this.contentShowFlag=true;
      this.contentShowId=scope;
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
.el-button {
  display: inline-block;
  cursor: pointer;
  text-align: center;
  outline: none;
  color: #fff;
  border-radius: 15px;
  box-shadow: 0 6px #999;
}
.el-button:active {
  box-shadow: 0 5px #666;
  transform: translateY(4px);
}
.el-button.el-button--small {
  background-color: #409eff;
  border-color: #409eff;
  color: #fff;
  font-size: 12px;
  margin-top: 4px;
}


.find {
  width: 82px;
  background-color:#e6a23c;
  color: #fff;
  border-color: #e6a23c;
  font-size: 12px;
}
.small {
  width: 82px;
  background-color: #909399;
  border-color: #909399;
  color: #fff;
  font-size: 12px;
  margin-top: 4px;
}
.insert{
  width: 82px;
  background-color: #67c23a;
  border-color: #67c23a;
  color: #fff;
  font-size: 12px;
  margin-top: 4px;
}
.el-button.up {
  margin-right: 20px;
  width: 50px;
  background-color: #409eff;
  border-color: #409eff;
  color: #fff;
  font-size: 12px;
}
.el-button.del {
  width: 50px;
  background-color: #f56c6c;
  border-color: #f56c6c;
  color: white;
  font-size: 12px;
}

</style>