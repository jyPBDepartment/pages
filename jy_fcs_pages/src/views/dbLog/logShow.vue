/**
 * 系统管理  日志管理
 */
<template>
  <div>
    <!-- 面包屑导航 -->
    <!-- 搜索筛选 -->
    <el-form :inline="true" class="user-search">
      <el-form-item label="模块名称">
        <el-input size="small" v-model="module" placeholder="输入模块名称"></el-input>
      </el-form-item>
      <el-form-item label="操作名称">
        <el-input size="small" v-model="action" placeholder="输入操作名称"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button size="small" type="warning" icon="el-icon-search" @click="search" >查询</el-button>
        <el-button
          size="small"
          type="info"
          icon="el-icon-close"
          @click="resetForm('search')"
        >重置</el-button>
      </el-form-item>
      <br/>
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
      <el-table-column type="index" label="序号" width="60" align="center"></el-table-column>
      <el-table-column  prop="module" label="模块" align="center"></el-table-column>
      <el-table-column show-overflow-tooltip  prop="action" label="动作" align="center"></el-table-column>
      <el-table-column sortable prop="logDate" width="200px" label="操作时间" align="center"></el-table-column>
      <el-table-column show-overflow-tooltip  prop="actObj" label="操作描述" align="center"></el-table-column>
      <el-table-column align="center" label="操作" width="400px">
        <template slot-scope="scope">
           <el-button
           @click="deleteUser(scope)"
            type="danger"
            size="small"
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
import Pagination from "../../components/Pagination";
//后台路径引用
import ApiPath from "@/api/ApiPath.js";
//数据请求交互引用
import api from "@/axios/api.js";
export default {
  inject: ["reload"],
  data() {
    return {
      module: "",
      action: "",
      loading: false, //是显示加载
      module: "",
      listData:[],
      formInline: {
        page: 1,
        limit: 10,
        varLable: "",
        varName: "",
        currentPage: 1,
        pageSize: 10,
        total: 10,
        token: localStorage.getItem("logintoken")
      }
    };
  },
  // 注册组件
  components: {
    Pagination
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
        module: this.module,
        action: this.action,
        page: this.formInline.page,
        size: this.formInline.limit
      };
      api.testAxiosGet(ApiPath.url.findLogList, params).then(res => {
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
    //重置
    resetForm(search) {
      this.module = "";
      this.action = "";
      this.formInline.page = 1;
      this.formInline.limit = 10;
      this.search(this.formInline);
    },
    // 删除日志
    deleteUser(scope) {
      this.$confirm("确定要删除吗?", "信息", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        let params = {
          id: scope.row.id,
          };
        api.testAxiosGet(ApiPath.url.deleteLogInfo, params).then(res => {
          let code = res.status;
        if(code == "0") {
            this.$message.success(res.message);
            this.reload();
          }
          else{
            // this.$message.error(res.message);
            this.$alert('删除失败，请先解除关联关系！', '提示', {confirmButtonText: '确定',});
            this.reload();}
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