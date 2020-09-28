<template>
  <div>
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="操作类型">
        <el-select v-model="priceDefinedType" placeholder="请选择" style="width:142px;">
          <el-option
            v-for="item in statusOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="增加日期">
        <el-date-picker
          v-model="value1"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          format="yyyy年MM月dd日"
          value-format="yyyy-MM-dd"
          style="width:300px;"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button
          type="warning"
          icon="el-icon-search"
          @click="search('manual')"
          >查询</el-button
        >
        <el-button type="info" icon="el-icon-close" @click="resetForm('search')"
          >重置</el-button
        >
      </el-form-item>
      <br />
      <el-row>
        <el-button type="success" icon="el-icon-plus" @click="addGrainPrices()"
          >添加</el-button
        >
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
      style="width: 100%"
    >
      <el-table-column
        type="index"
        label="序号"
        min-width="6"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="operateContent"
        label="操作内容"
        align="center"
        min-width="24"
      ></el-table-column>
      <el-table-column
        prop="operateType"
        label="操作类型"
        align="center"
        sortable
        min-width="10"
      >
        <template slot-scope="scope">
          <el-tag type="success" v-if="scope.row.operateType == '0'"
            >新增</el-tag
          >
          <el-tag type="primary" v-else-if="scope.row.operateType == '1'"
            >修改</el-tag
          >
          <el-tag type="error" v-else-if="scope.row.operateType == '2'"
            >删除</el-tag
          >
          <el-tag type="info" v-else>系统新增</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="createDate"
        label="创建时间"
        align="center"
        sortable
        min-width="10"
      ></el-table-column>
      <!-- <el-table-column prop="createUser" label="创建人" align="center" min-width="10" ></el-table-column> -->
      <!-- <el-table-column prop="updateDate" label="修改时间" align="center" sortable min-width="10" ></el-table-column>
      <el-table-column prop="updateUser" label="修改人" align="center" min-width="10" ></el-table-column> -->
      <!-- <el-table-column align="center" label="状态" prop="status" min-width="70px" max-width="220px">
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
      </el-table-column> -->
      <!-- <el-table-column align="center" label="操作" min-width="14" >
        <template slot-scope="scope">
          <el-button @click="openUpdateModuleInfo(scope)" type="primary" size="small" icon="el-icon-edit">编辑</el-button>
          <el-button @click="deleteModuleInfo(scope)" type="danger" size="small" icon="el-icon-delete">删除</el-button>
        </template>
      </el-table-column> -->
    </el-table>
    <!-- 分页组件 -->
    <Pagination
      v-bind:child-msg="formInline"
      @callFather="callFather"
    ></Pagination>
    <add-grain-prices
      :show="addGrainPricesShow"
      title="添加"
      @close="closeGrainPricesDialog"
      @save="saveGrainPricesInfo"
    ></add-grain-prices>
    <update-grain-prices
      :show="updateGrainPricesShow"
      :transModuleInfoId="transModuleInfoId"
      title="修改"
      @close="closeUpdateModuleInfoDialog"
      @save="upModuleInfo"
    ></update-grain-prices>
  </div>
</template>

<script>
import Pagination from "../../components/Pagination";
//后台路径引用
import ApiPath from "@/api/ApiPath.js";
//数据请求交互引用
import api from "@/axios/api.js";
import AddGrainPrices from "./addGrainPrices";
import UpdateGrainPrices from "./updateGrainPrices";
export default {
  inject: ["reload"],
  data() {
    return {
      priceDefinedType: "",
      value1: "",
      url: "",
      updateUser: "",
      loading: false, //是显示加载
      editFormVisible: false, //控制编辑页面显示与隐藏
      menuAccessshow: false, //控制数据权限显示与隐藏
      addGrainPricesShow: false,
      updateGrainPricesShow: false,
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
      listData: [], //用户数据
      statusOptions: [
        { value: "", label: "全部" },
        { value: "0", label: "新增" },
        { value: "1", label: "修改" },
        { value: "2", label: "删除" },
        { value: "3", label: "系统新增" },
      ],
    };
  },
  // 注册组件
  components: {
    AddGrainPrices,
    UpdateGrainPrices,
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
      if (parameter == "manual") {
        this.formInline.page = 1;
        this.formInline.limit = 10;
      }

      // console.log(this.value1);
      let startDate = "";
      let endDate = "";
      if (!(this.valu1 == null && this.value1 == "")) {
        startDate = this.value1[0];
        endDate = this.value1[1];
      }

      let params = {
        operateType: this.priceDefinedType,
        startDate: startDate,
        endDate: endDate,
        page: this.formInline.page,
        size: this.formInline.limit,
      };
      api
        .testAxiosGet(ApiPath.url.findGrainPricesHistoryList, params)
        .then((res) => {
          //   console.log(res)
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
    saveGrainPricesInfo() {
      this.addGrainPricesShow = false;
    },
    closeGrainPricesDialog() {
      this.search(this.formInline);
      this.addGrainPricesShow = false;
    },
    addGrainPrices() {
      this.addGrainPricesShow = true;
    },
    closeUpdateModuleInfoDialog() {
      this.search(this.formInline);
      this.updateGrainPricesShow = false;
    },
    upModuleInfo() {
      this.updateGrainPricesShow = false;
    },
    //启用/禁用
    moduleInfoEnable: function (scope) {
      let params = {
        id: scope.row.id,
        status: scope.row.status,
        updateUser: localStorage.getItem("userInfo"),
      };
      api
        .testAxiosGet(ApiPath.url.moduleInfoEnable, params)
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
    //修改菜单排序
    sortChange: function (scope) {
      let params = {
        id: scope.row.id,
        sort: scope.row.sort,
      };
      api
        .testAxiosGet(ApiPath.url.changeModuleSort, params)
        .then((res) => {
          this.$message.success(res.message);
          // this.reload();
        })
        .catch(function (error) {});
    },
    //显示编辑界面
    openUpdateModuleInfo(scope) {
      this.transModuleInfoId = scope.row.id;
      this.updateGrainPricesShow = true;
    },
    //重置
    resetForm(search) {
      this.value1 = "";
      this.priceDefinedType = "";
      this.formInline.page = 1;
      this.formInline.limit = 10;
      this.search(this.formInline);
    },
    // 删除
    deleteModuleInfo(scope) {
      this.$confirm("确定要删除吗?", "信息", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          let params = {
            id: scope.row.id,
            currentUser: localStorage.getItem("userInfo"),
          };
          api
            .testAxiosGet(ApiPath.url.deleteGrainPricesInfoById, params)
            .then((res) => {
              let code = res.status;
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
  margin-left: -125px;
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