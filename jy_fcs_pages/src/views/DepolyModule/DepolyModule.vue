<template>
  <div>
    <!-- 搜索筛选 -->
    <el-form :inline="true" class="user-search">
      <el-form-item label="发布模块名称">
        <el-input size="small" v-model="deployModuleName" placeholder="输入发布模块名称" style="width:200px"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button size="small" type="warning" icon="el-icon-search" @click="search('manual')" class="height">查询</el-button>
        <el-button size="small" type="info" icon="el-icon-close" @click="resetForm('search')">重置</el-button>
      </el-form-item>
      <br />
      <el-row>
        <el-button size="small" type="success" icon="el-icon-plus" @click="addModuleInfos()" class="insert" >添加</el-button>
      </el-row>
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
      style="width: 100%;"
    >
      <el-table-column type="index" label="序号" min-width="60" align="center"></el-table-column>
      <el-table-column
        prop="deployModuleName"
        label="发布模块名称"
        align="center"
        :show-overflow-tooltip="true"
        min-width="100px"
        max-width="220px"
      ></el-table-column>
       <el-table-column prop="linkUrl" :show-overflow-tooltip="true" label="连接路径" align="center" min-width="100px" max-width="220px"></el-table-column>
        <el-table-column prop="picUrl" label="图片" align="center" min-width="110px" max-width="220px">
        <template slot-scope="scope">
          <el-image :src="scope.row.picUrl" style="width:80px;height:80px;"></el-image>
        </template>
      </el-table-column>
      <el-table-column prop="createDate" label="创建时间" align="center" sortable min-width="140px" max-width="220px"></el-table-column>
      <el-table-column prop="updateDate" label="修改时间" align="center" sortable min-width="140px" max-width="220px"></el-table-column>
      <el-table-column prop="createUser" label="创建人" align="center" min-width="80px" max-width="220px"></el-table-column>
      <el-table-column prop="updateUser" label="修改人" align="center" min-width="80px" max-width="220px"></el-table-column>
      <el-table-column align="center" label="状态" prop="status" min-width="80px" max-width="220px">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.status"
            active-value="0"
            inactive-value="1"
            active-color="#13ce66"
            inactive-color="#ff4949"
            @change="moduleInfoEnable(scope)"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" min-width="190px" max-width="220px">
        <template slot-scope="scope">
          <el-button @click="openUpdateModuleInfo(scope)"
            type="primary"
            size="small"
            icon="el-icon-edit"
          >编辑</el-button>
          <el-button @click="deleteModuleInfo(scope)"
            type="danger"
            size="small"
            icon="el-icon-delete"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页组件 -->
    <Pagination v-bind:child-msg="formInline" @callFather="callFather"></Pagination>
    <add-deploy-module
      :show="addModuleInfo"
      title="添加"
      @close="closeModuleInfoDialog"
      @save="saveModuleInfo"
    ></add-deploy-module>
    <update-depoly-module
      :show="updateModuleInfoFlag"
      :transDeployModuleId="transDeployModuleId"
      title="修改"
      @close="closeUpdateModuleInfoDialog"
      @save="upModuleInfo"
    ></update-depoly-module>
  </div>
</template>

<script>
import Pagination from "../../components/Pagination";
//后台路径引用
import ApiPath from "@/api/ApiPath.js";
//数据请求交互引用
import api from "@/axios/api.js";
import AddDeployModule from "./addDeployModule";
import UpdateDepolyModule from "./updateDepolyModule";
export default {
  inject: ["reload"],
  data() {
    return {
      deployModuleName: "",
      picUrl:"",
      status: "",
      updateUser:"",
      loading: false, //是显示加载
      editFormVisible: false, //控制编辑页面显示与隐藏
      menuAccessshow: false, //控制数据权限显示与隐藏
      addModuleInfo: false,
      updateModuleInfoFlag: false,
      transDeployModuleId: "",
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
    AddDeployModule,
    UpdateDepolyModule,
    Pagination,
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
        deployModuleName: this.deployModuleName,
        page: this.formInline.page,
        size: this.formInline.limit,
      };
      api.testAxiosGet(ApiPath.url.depolyMoudleSearch, params).then((res) => {
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
    saveModuleInfo() {
      this.addModuleInfo = false;
    },
    closeModuleInfoDialog() {
      this.search(this.formInline);
      this.addModuleInfo = false;
    },
    addModuleInfos() {
      this.addModuleInfo = true;
    },
    closeUpdateModuleInfoDialog() {
      this.search(this.formInline);
      this.updateModuleInfoFlag = false;
    },
    upModuleInfo() {
      this.updateModuleInfoFlag = false;
    },
    //启用/禁用
    moduleInfoEnable: function (scope) {
      let params = {
        id: scope.row.id,
        status: scope.row.status,
        updateUser: localStorage.getItem("userInfo")
      };
      api
        .testAxiosGet(ApiPath.url.deployModuleEnable, params)
        .then((res) => {
          let code = res.state;
          if (code == "0") {
            this.$message.success(res.message);
          } else {
            this.$message.success(res.message);
          }
          this.reload();
        })
        .catch(function (error) {});
    },
    //显示编辑界面
    openUpdateModuleInfo(scope) {
      this.transDeployModuleId = scope.row.id;
      this.updateModuleInfoFlag = true;
    },
    //重置
    resetForm(search) {
      this.deployModuleName = "";
      this.formInline.page = 1;
      this.formInline.limit = 10;
      this.search(this.formInline);
    },
    // 删除角色
    deleteModuleInfo(scope) {
      this.$confirm("确定要删除吗?", "信息", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          let params = {
            id: scope.row.id,
          };
          api.testAxiosGet(ApiPath.url.deleteDepolyModule, params).then((res) => {
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
    },
  },
};
</script>

<style scoped>
.user-search {
  margin-top: 20px;
}
.userModuleInfo {
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