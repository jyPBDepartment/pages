<template>
  <div>
    <!-- 搜索筛选 -->
    <el-form :inline="true" class="user-search">
      <el-form-item label="手册标题">
        <el-input size="small" v-model="title" placeholder="输入手册标题" style="width: 150px"></el-input>
      </el-form-item>
      <el-form-item label="创建人">
        <el-input size="small" v-model="createBy" placeholder="输入创建人" style="width: 150px"></el-input>
      </el-form-item>
      <el-form-item label="职业类别" prop="vocationId">
       <el-select v-model="vocationId" style="width:50%;height:30px" size="small">
          <el-option v-for="item in vocationIdOptions" :key="item.value" :label="item.label" :value="item.value" size="small"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="标签" prop="labelId" style="margin-left:-100px">
        <el-select v-model="labelId" style="width:45%;height:30px;" size="small">
          <el-option v-for="item in labelIdOptions" :key="item.value" :label="item.label" :value="item.value" size="small"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button size="small" type="warning" icon="el-icon-search" @click="search('manual')" class="height">查询</el-button>
        <el-button size="small" type="info" icon="el-icon-close" @click="resetForm('search')">重置</el-button>
      </el-form-item>
      <el-row>
        <el-button size="small" type="success" icon="el-icon-plus" @click="addManualInfos()" class="insert">添加</el-button>
      </el-row>
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
      style="width: 100%"
    >
      <el-table-column type="index" label="序号" min-width="8%" align="center"
      ></el-table-column>
      <el-table-column prop="title" min-width="8%" label="标题" align="center" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="url" label="图片" align="center" min-width="7%">
        <template slot-scope="scope" style="height: 120px">
          <el-image
            :src="scope.row.url"
            style="width: 33px; height: 40px"
            @click="show(scope, (dialogVisible = true))"
          ></el-image>
        </template>
      </el-table-column>
      <el-table-column prop="vocation.name" min-width="8%" label="职业类别" align="center" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="label.name" min-width="8%" label="标签" align="center" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="createBy" min-width="8%" label="创建人" align="center" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="createDate" min-width="12%" label="创建时间" align="center" sortable></el-table-column>
      <el-table-column prop="updateBy" min-width="8%" label="修改人" align="center" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="updateDate" min-width="12%" label="修改时间" align="center" sortable></el-table-column>
      <el-table-column align="center" min-width="7%" label="状态" prop="status">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.status"
            :active-value="0"
            :inactive-value="1"
            active-color="#13ce66"
            inactive-color="#ff4949"
            @change="manualInfoEnable(scope)"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" min-width="14%">
        <template slot-scope="scope">
          <el-button
            @click="openUpdateManualInfo(scope)"
            type="primary"
            size="small"
            icon="el-icon-edit"
            >编辑</el-button>
          <el-button
            @click="deleteManualInfo(scope)"
            type="danger"
            size="small"
            icon="el-icon-delete"
            style="margin-top:3px;margin-left:-2px"
            >删除</el-button>
            <el-button
            @click="openDetailManual(scope)"
            type="primary"
            size="small"
            style="margin-top:3px;margin-left:-2px;width:73px"
            >详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 图片预览弹出框 -->
    <el-dialog title="图片预览" :visible.sync="dialogVisible" width="410px">
      <span>
        <el-image :src="url" style="width: 370px; height: 260px"></el-image>
      </span>
    </el-dialog>
    <!-- 分页组件 -->
    <Pagination
      v-bind:child-msg="formInline"
      @callFather="callFather"
    ></Pagination>
    <!-- 添加 -->
    <add-manualInfo
      :show="addManualInfo"
      title="添加"
      @close="closeManualInfoDialog"
      @save="saveManualInfo"
    ></add-manualInfo>
    <!-- 修改 -->
    <update-manualInfo
      :show="updateManualInfoFlag"
      :transManualInfoId="transManualInfoId"
      title="修改"
      @close="closeUpdateManualInfoDialog"
      @save="upManualInfo"
    ></update-manualInfo>
    <!-- 详情 -->
    <detail-manual
      :show="detailManualFlag"
      :transDetailManualId="transDetailManualId"
      title="详情"
      @close="closeDetailManualDialog"
    ></detail-manual>
  </div>
</template>

<script>
import Pagination from "../../components/Pagination";
import ApiPath from "@/api/ApiPath.js";
import api from "@/axios/api.js";
import AddManualInfo from "./addManualInfo";
import UpdateManualInfo from "./updateManualInfo";
import DetailManual from "./detailManual";
export default {
  inject: ["reload"],
  data() {
    return {
      title: "",
      createBy: "",
      vocationId:"",
      labelId:"",
      url: "",
      content:"",
      updateUser: "",
      loading: false, //是显示加载
      dialogVisible: false,
      addManualInfo: false,
      updateManualInfoFlag: false,
      detailManualFlag:false,
      transManualInfoId: "",
      transDetailManualId:"",
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
      labelIdOptions: [],
      vocationIdOptions:[],
    };
  },
  // 注册组件
  components: {
    AddManualInfo,
    UpdateManualInfo,
    DetailManual,
    Pagination,
  },
  watch: {},
  mounted() {
    this.findVocationId();
    this.findLabelId();
  },
  created() {
    this.search(this.formInline);
  },
  methods: {
    //图片预览
    show: function (scope) {
      let params = {
        id: scope.row.id,
      };
      api.testAxiosGet(ApiPath.url.manualFindById, params)
        .then((res) => {
          let code = res.state;
          if (code == "0") {
            this.url = res.data.url;
          }
        }).catch(function (error) {});
    },
    // 职业类别下拉列表
    findVocationId: function () {
      let params = {};
      api
        .testAxiosGet(ApiPath.url.findVocationId, params)
        .then((res) => {
          if (res.state == "0") {
            for (let i = 0; i < res.data.length; i++) {
              this.vocationIdOptions.push({
                value: res.data[i]["id"],
                label: res.data[i]["name"],
              });
            }
          }
        }).catch(function (error) {});
    },
    // 标签下拉列表
    findLabelId: function () {
      let params = {};
      api
        .testAxiosGet(ApiPath.url.findLabelId, params)
        .then((res) => {
          if (res.state == "0") {
            for (let i = 0; i < res.data.length; i++) {
              this.labelIdOptions.push({
                value: res.data[i]["id"],
                label: res.data[i]["name"],
              });
            }
          }
        }).catch(function (error) {});
    },
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
        createBy: this.createBy,
        vocationId: this.vocationId,
        labelId: this.labelId,
        page: this.formInline.page,
        size: this.formInline.limit,
      };
      api.testAxiosGet(ApiPath.url.manualInfoSearch, params).then((res) => {
        let code = res.state;
        if (code == "0") {
          this.loading = false;
          this.listData = res.data.content;
          this.formInline.currentPage = res.data.number + 1;
          this.formInline.pageSize = res.data.size;
          this.formInline.total = res.data.totalElements;
        }else{
          this.$message.error(res.message);
        }
      });
    },
    beforeClose() {
      this.close();
    },
    close() {
      this.search(this.formInline);
      this.$emit("close");
    },
    saveManualInfo() {
      this.addManualInfo = false;
    },
    closeManualInfoDialog() {
      this.search(this.formInline);
      this.addManualInfo = false;
    },
    addManualInfos() {
      this.addManualInfo = true;
    },
    closeUpdateManualInfoDialog() {
      this.search(this.formInline);
      this.transManualInfoId = "";
      this.updateManualInfoFlag = false;
    },
    closeDetailManualDialog(){
      this.search(this.formInline)
      this.detailManualFlag = false;
    },
    upManualInfo() {
      this.updateManualInfoFlag = false;
    },
    //启用/禁用
    manualInfoEnable: function (scope) {
      let params = {
        id: scope.row.id,
        status: scope.row.status,
        updateUser: localStorage.getItem("userInfo"),
      };
      api.testAxiosGet(ApiPath.url.manualInfoEnable, params)
        .then((res) => {
          let code = res.state;
          if (code == "0") {
            this.$message.success(res.message);
          }
          if (code == "1") {
            this.$message.success(res.message);
          }
          this.search(this.formInline);
        }).catch(function (error) {});
    },
    //显示编辑界面
    openUpdateManualInfo(scope) {
      this.transManualInfoId = scope.row.id;
      this.updateManualInfoFlag = true;
    },
    //显示详情页面
    openDetailManual(scope) {
      this.transDetailManualId = scope.row.id;
      this.detailManualFlag = true;
    },
    //重置
    resetForm(search) {
      this.title = "",
      this.createBy = "",
      this.vocationId = "",
      this.labelId = "",
      this.formInline.page = 1;
      this.formInline.limit = 10;
      this.search(this.formInline);
    },
    // 删除
    deleteManualInfo(scope) {
      //状态为0不能被删除
      if (scope.row.status == 0) {
        this.$alert("数据状态生效不能被删除！", "提示", {
          confirmButtonText: "确定",
        });
        return false;
      }
      this.$confirm("确定要删除吗?", "信息", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
          let params = {
            id: scope.row.id,
          };
          api.testAxiosGet(ApiPath.url.deleteManualInfo, params).then((res) => {
            let code = res.state;
            if (code == "0") {
              this.$message.success(res.message);
              this.search(this.formInline);
            }else{
              this.$message.error(res.message);
            }
          });
        }).catch(() => {
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
.userManualInfo {
  width: 100%;
}
.height {
  margin-top: 5px;
  margin-left: -120px;
}
.dialog-footer{
  margin-top: 20px;
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