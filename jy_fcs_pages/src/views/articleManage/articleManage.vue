<template>
  <div>
    <el-form :inline="true">
      <el-form-item label="标题" prop="title">
        <el-input size="small" v-model="title" placeholder="输入标题" style="width: 150px"></el-input>
      </el-form-item>
      <el-form-item label="版块名称" prop="sectionId">
        <el-select v-model="sectionId" placeholder="全部" style="width: 60%; height: 30px" size="small">
          <el-option v-for="item in sectionOptions" :key="item.value" :label="item.label" :value="item.value" size="small"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button size="small" type="warning" icon="el-icon-search" @click="search('manual')" class="height">查询</el-button>
        <el-button size="small" type="info" icon="el-icon-close" @click="resetForm('search')">重置</el-button>
      </el-form-item>
      <el-row>
        <el-button size="small" type="success" icon="el-icon-plus" @click="addArticleInfo()">添加</el-button>
      </el-row>
      <br />
    </el-form>
    <el-table size="mini" :data="listData" highlight-current-row v-loading="loading" border element-loading-text="拼命加载中" style="width: 100%">
      <el-table-column type="index" label="序号" min-width="8%" align="center"></el-table-column>
      <el-table-column prop="title" label="标题" min-width="8%" align="center"></el-table-column>
      <el-table-column prop="section.name" label="版块名称" min-width="8%" align="center"></el-table-column>
      <el-table-column prop="createBy" min-width="10%" label="创建人" align="center" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="createDate" min-width="12%" label="创建时间" align="center" sortable></el-table-column>
      <el-table-column prop="updateBy" min-width="10%" label="修改人" align="center" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="updateDate" min-width="12%" label="修改时间" align="center" sortable></el-table-column>
      <el-table-column align="center" min-width="7%" label="状态" prop="status">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.status"
            :active-value="0"
            :inactive-value="1"
            active-color="#13ce66"
            inactive-color="#ff4949"
            @change="articleEnable(scope)"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" min-width="25%">
        <template slot-scope="scope">
          <el-button @click="openDetailArticle(scope)" type="primary" size="small" style="width:73px">查看</el-button>
          <el-button @click="openUpdateArticle(scope)" type="primary" size="small" icon="el-icon-edit">编辑</el-button>
          <el-button @click="deleteArticle(scope)" type="danger" size="small" icon="el-icon-delete">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页组件 -->
    <Pagination
      v-bind:child-msg="formInline"
      @callFather="callFather"
    ></Pagination>
     <!-- 添加 -->
    <add-article
      :show="addArticle"
      title="添加"
      @close="closeArticleDialog"
      @save="saveArticle"
    ></add-article>
    <!-- 修改 -->
    <update-article
      :show="updateArticleFlag"
      :transArticleId="transArticleId"
      title="修改"
      @close="closeUpdateArticleDialog"
      @save="updateArticle"
    ></update-article>
    <!-- 详情 -->
    <details-article
      :show="detailsArticleFlag"
      :transDetailsArticleId="transDetailsArticleId"
      title="详情"
      @close="closedetailsArticleDialog"
    ></details-article>
  </div>
</template>
<script>
import Pagination from "../../components/Pagination";
import ApiPath from "@/api/ApiPath.js";
import api from "@/axios/api.js";
import AddArticle from './addArticle';
import UpdateArticle from './updataArticle';
import DetailsArticle from './detailsArticle';
export default {
  data() {
    return {
      loading: false,
      addArticle:false,
      updateArticleFlag:false,
      transArticleId:"",
      detailsArticleFlag: false,
      transDetailsArticleId:"",
      title:"",
      sectionId:"",
      sectionOptions:[],
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
    AddArticle,
    UpdateArticle,
    DetailsArticle
  },
  mounted() {
    this.findSectionName();
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
        title: this.title,
        sectionId: this.sectionId,
        page: this.formInline.page,
        size: this.formInline.limit,
      };
      api.testAxiosGet(ApiPath.url.articleSearch, params).then((res) => {
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
    //重置
    resetForm(search) {
      this.title = "";
      this.sectionId = "";
      this.formInline.page = 1;
      this.formInline.limit = 10; 
      this.search(this.formInline);
    },
    // 版块名称下拉列表
    findSectionName: function () {
      let params = {};
      api
        .testAxiosGet(ApiPath.url.findListSectionId, params)
        .then((res) => {
          if (res.code == "200") {
            for (let i = 0; i < res.data.length; i++) {
              this.sectionOptions.push({
                value: res.data[i]["id"],
                label: res.data[i]["name"],
              });
            }
          }
        }).catch(function (error) {});
    },
    //删除
    deleteArticle: function (scope) {
      //状态为0不能被删除
      if (scope.row.status == 0) {
        this.$alert("数据状态生效不能被删除！", "提示", {
          confirmButtonText: "确定",
        });
        return false;
      }
      this.$confirm("确定要删除吗?删除后不可恢复！", "信息", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          let params = {
            id: scope.row.id,
          };
          api.testAxiosGet(ApiPath.url.deleteArticle, params).then((res) => {
            let code = res.state;
            if (code == "0") {
              this.$message.success(res.message);
              this.search(this.formInline);
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    beforeClose() {
      this.close();
    },
    close() {
      this.$emit("close");
    },
    //修改状态
    articleEnable: function (scope) {
      let params = {
        id: scope.row.id,
        status: scope.row.status,
        updateBy: localStorage.getItem("userInfo"),
      };
      api
        .testAxiosGet(ApiPath.url.articleEnable, params)
        .then((res) => {
          let code = res.state;
          if (code == "0") {
            this.$message.success(res.message);
          }
          if (code == "1") {
            this.$message.success(res.message);
          }
          this.search(this.formInline);
        })
        .catch(function (error) {});
    },
    //新增
    closeArticleDialog() {
      this.search(this.formInline);
      this.addArticle = false;
    },
    addArticleInfo() {
      this.addArticle = true;
    },
    saveArticle() {
      this.addArticle = false;
    },
    //编辑
    //显示编辑页面
    openUpdateArticle(scope) {
      this.transArticleId = scope.row.id;
      this.updateArticleFlag = true;
    },
    closeUpdateArticleDialog() {
      this.search(this.formInline);
      this.updateArticleFlag = false;
    },
    updateArticle() {
      this.updateArticleFlag = false;
    },
    //详情
    openDetailArticle(scope){
      this.transDetailsArticleId = scope.row.id;
      this.detailsArticleFlag = true;
    },
    closedetailsArticleDialog(){
      this.detailsArticleFlag = false;
    }
  },
};
</script>
<style scoped>
.height {
  margin-top: 5px;
  margin-left: -85px;
}
</style>