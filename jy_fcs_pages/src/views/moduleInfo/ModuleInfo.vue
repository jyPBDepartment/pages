<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">门户管理</el-breadcrumb-item>
      <el-breadcrumb-item>模块管理</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 搜索筛选 -->
    <el-form :inline="true" class="user-search">
      <el-form-item label="搜索："></el-form-item>
      <el-form-item label="模块名称">
        <el-input size="small" v-model="name" placeholder="输入模块名称"></el-input>
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-select v-model="status" style="width:80%" size="small">
          <el-option
            v-for="item in statusOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button size="small" type="warning" icon="el-icon-search" @click="search">查询</el-button>
        <el-button
          size="small"
          type="info"
          icon="el-icon-close"
          @click="resetForm('search')"
        >重置</el-button>
      </el-form-item>
      <br />
      <el-row>
        <el-button
          size="small"
          type="success"
          icon="el-icon-plus"
          @click="addModuleInfos()"
          class="insert"
        >添加</el-button>
      </el-row>
      <br />
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
      <el-table-column sortable prop="name" label="模块名称" align="center"></el-table-column>
      <el-table-column sortable prop="url" label="模块图片">
        <template slot-scope="scope">
          <el-image :src="scope.row.url" style="width:100px;height:100px;"></el-image>
        </template>
      </el-table-column>
      <el-table-column sortable prop="createDate" label="创建时间" align="center"></el-table-column>
      <el-table-column sortable prop="updateDate" label="修改时间" align="center"></el-table-column>
      <el-table-column sortable prop="createUser" label="创建人" align="center"></el-table-column>
      <el-table-column sortable prop="updateUser" label="修改人" align="center"></el-table-column>
      <el-table-column sortable prop="sort" label="排序" align="center"></el-table-column>
      <el-table-column align="center" label="状态" prop="status">
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
      <el-table-column align="center" label="操作" width="200px">
        <template slot-scope="scope">
          <el-button
            @click="openUpdateModuleInfo(scope)"
            type="primary"
            size="small"
            icon="el-icon-edit"
          >编辑</el-button>
          <el-button
            @click="deleteModuleInfo(scope)"
            type="danger"
            size="small"
            icon="el-icon-delete"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页组件 -->
    <Pagination v-bind:child-msg="formInline" @callFather="callFather"></Pagination>
    <add-module-info
      :show="addModuleInfo"
      title="添加"
      @close="closeModuleInfoDialog"
      @save="saveModuleInfo"
    ></add-module-info>
    <update-moduleInfo
      :show="updateModuleInfoFlag"
      :transModuleInfoId="transModuleInfoId"
      title="修改"
      @close="closeUpdateModuleInfoDialog"
      @save="upModuleInfo"
    ></update-moduleInfo>
  </div>
</template>

<script>
import Pagination from "../../components/Pagination";
//后台路径引用
import ApiPath from "@/api/ApiPath.js";
//数据请求交互引用
import api from "@/axios/api.js";
import AddModuleInfo from "./addModuleInfo";
import UpdateModuleInfo from "./updateModuleInfo";
export default {
  inject: ["reload"],
  data() {
    return {
      name: "",
      phone: "",
      status: "",
      nshow: true, //switch开启
      fshow: false, //switch关闭
      loading: false, //是显示加载
      editFormVisible: false, //控制编辑页面显示与隐藏
      menuAccessshow: false, //控制数据权限显示与隐藏
      addModuleInfo: false,
      updateModuleInfoFlag: false,
      transModuleInfoId: "",
      transPasswordId: "",
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
      // 数据权限
      ModuleInfoRight: [],
      ModuleInfoRightProps: {
        children: "children",
        label: "name",
      },
      //参数moduleInfo
      saveModuleInfoId: "",
      statusOptions: [
        { value: "", label: "全部" },
        { value: "0", label: "启用" },
        { value: "1", label: "禁用" },
      ],
    };
  },
  // 注册组件
  components: {
    AddModuleInfo,
    UpdateModuleInfo,
    Pagination,
  },
  watch: {},
  mounted() {},
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
      let params = {
        name: this.name,
        status: this.status,
        page: this.formInline.page,
        size: this.formInline.limit,
      };
      api.testAxiosGet(ApiPath.url.moduleInfoSearch, params).then((res) => {
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
      this.addModuleInfo = false;
    },
    addModuleInfos() {
      this.addModuleInfo = true;
    },
    closeUpdateModuleInfoDialog() {
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
      };
      api.testAxiosGet(ApiPath.url.moduleInfoEnable, params).then((res) => {
          let code = res.state;
          if (code == "0") {
            this.$message.success(res.message);
          } else {
            this.$message.success(res.message);
          }
          this.reload();
        }).catch(function (error) {});
    },
    //显示编辑界面
    openUpdateModuleInfo(scope) {
      this.transModuleInfoId = scope.row.id;
      this.updateModuleInfoFlag = true;
    },
    //重置
    resetForm(search) {
      this.name = "";
      (this.status = ""), location.reload();
    },
    // 删除角色
    deleteModuleInfo(scope) {
      this.$confirm("确定要删除吗?", "信息", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        let params = {
          id: scope.row.id,
        };
        api.testAxiosGet(ApiPath.url.deleteModuleInfo, params).then((res) => {
          let code = res.status;
          if (code == "0") {
            this.$message.success(res.message);
            this.reload();
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
.userModuleInfo {
  width: 100%;
}
</style>