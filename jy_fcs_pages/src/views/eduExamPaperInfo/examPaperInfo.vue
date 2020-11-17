<template>
  <div>
    <!-- 搜索筛选 -->
    <el-form :inline="true" class="user-search">
      <el-form-item label="创建人">
        <el-input size="small" v-model="createBy" placeholder="输入创建人" style="width: 150px"></el-input>
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-select v-model="status" style="width:45%;height:30px;" size="small">
          <el-option v-for="item in statusOptions" :key="item.value" :label="item.label" :value="item.value" size="small"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="职业类别" prop="vocationId" style="margin-left:-115px">
       <el-select v-model="vocationId" style="width:55%;height:30px;" size="small">
          <el-option v-for="item in vocationIdOptions" :key="item.value" :label="item.label" :value="item.value" size="small"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button size="small" type="warning" icon="el-icon-search" @click="search('manual')" class="height">查询</el-button>
        <el-button size="small" type="info" icon="el-icon-close" @click="resetForm('search')">重置</el-button>
      </el-form-item>
      <el-row>
        <el-button size="small" type="success" icon="el-icon-plus" @click="addExamPaperInfos()" class="insert">添加</el-button>
      </el-row>
      <br/>
    </el-form>
    <!--列表-->
    <el-table size="mini" :data="listData" highlight-current-row v-loading="loading" border element-loading-text="拼命加载中" style="width: 100%">
      <el-table-column type="index" label="序号" min-width="7%" align="center"></el-table-column>
      <el-table-column prop="name" min-width="8%" label="试卷名称" align="center" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="vocation.name" min-width="8%" label="职业类别" align="center" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="answerTime" min-width="7%" label="答题时间" align="center" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="totalScore" min-width="7%" label="总分数" align="center" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="passScore" min-width="7%" label="及格分数" align="center" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="createBy" min-width="8%" label="创建人" align="center" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="createDate" min-width="12%" label="创建时间" align="center" sortable></el-table-column>
      <el-table-column prop="updateBy" min-width="8%" label="修改人" align="center" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="updateDate" min-width="12%" label="修改时间" align="center" sortable></el-table-column>
      <el-table-column align="center" min-width="6%" label="状态" prop="status">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.status"
            :active-value="0"
            :inactive-value="1"
            active-color="#13ce66"
            inactive-color="#ff4949"
            @change="examPaperInfoEnable(scope)"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" min-width="10%">
        <template slot-scope="scope">
          <el-button
            @click="openUpdateExamPaperInfo(scope)"
            type="primary"
            size="small"
            icon="el-icon-edit"
            >编辑</el-button>
          <el-button
            @click="deleteExamPaperInfo(scope)"
            type="danger"
            size="small"
            icon="el-icon-delete"
            style="margin-top:3px;margin-left:-2px"
            >删除</el-button>
            <el-button
            @click="openDetailExamPaper(scope)"
            type="primary"
            size="small"
            style="margin-top:3px;margin-left:-2px;width:73px"
            >详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页组件 -->
    <Pagination
      v-bind:child-msg="formInline"
      @callFather="callFather"
    ></Pagination>
    <!-- 添加 -->
    <add-examPaperInfo
      :show="addExamPaperInfo"
      title="添加"
      @close="closeExamPaperInfoDialog"
      @save="saveExamPaperInfo"
    ></add-examPaperInfo>
    <!-- 修改 -->
    <update-examPaperInfo
      :show="updateExamPaperInfoFlag"
      :transExamPaperInfoId="transExamPaperInfoId"
      title="修改"
      @close="closeUpdateExamPaperInfoDialog"
      @save="upExamPaperInfo"
    ></update-examPaperInfo>
    <!-- 详情 -->
    <detail-examPaperInfo
      :show="detailExamPaperFlag"
      :transDetailExamPaperId="transDetailExamPaperId"
      title="详情"
      @close="closeDetailExamPaperDialog"
    ></detail-examPaperInfo>
  </div>
</template>

<script>
import Pagination from "../../components/Pagination";
import ApiPath from "@/api/ApiPath.js";
import api from "@/axios/api.js";
import AddExamPaperInfo from "./addExamPaperInfo";
import UpdateExamPaperInfo from "./updateExamPaperInfo";
import DetailExamPaperInfo from "./detailExamPaperInfo";
export default {
  inject: ["reload"],
  data() {
    return {
      createBy: "",
      status:"",
      vocationId:"",
      updateUser: "",
      loading: false, //是显示加载
      addExamPaperInfo: false,
      updateExamPaperInfoFlag: false,
      detailExamPaperFlag:false,
      transExamPaperInfoId: "",
      transDetailExamPaperId:"",
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
        { value: "0", label: "启用" },
        { value: "1", label: "禁用" },
      ],
      vocationIdOptions:[],
    };
  },
  // 注册组件
  components: {
    AddExamPaperInfo,
    UpdateExamPaperInfo,
    DetailExamPaperInfo,
    Pagination,
  },
  watch: {},
  mounted() {
    this.findVocationId();
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
        createBy: this.createBy,
        status: this.status,
        vocationId: this.vocationId,
        page: this.formInline.page,
        size: this.formInline.limit,
      };
      api.testAxiosGet(ApiPath.url.examPaperInfoSearch, params).then((res) => {
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
    beforeClose() {
      this.close();
    },
    close() {
      this.$emit("close");
    },
    saveExamPaperInfo() {
      this.addExamPaperInfo = false;
    },
    closeExamPaperInfoDialog() {
      this.search(this.formInline);
      this.addExamPaperInfo = false;
    },
    addExamPaperInfos() {
      this.addExamPaperInfo = true;
    },
    closeUpdateExamPaperInfoDialog() {
      this.search(this.formInline);
      this.transExamPaperInfoId = "";
      this.updateExamPaperInfoFlag = false;
    },
    closeDetailExamPaperDialog(){
      this.search(this.formInline)
      this.detailExamPaperFlag = false;
    },
    upExamPaperInfo() {
      this.updateExamPaperInfoFlag = false;
    },
    //启用/禁用
    examPaperInfoEnable: function (scope) {
      let params = {
        id: scope.row.id,
        status: scope.row.status,
        updateUser: localStorage.getItem("userInfo"),
      };
      api.testAxiosGet(ApiPath.url.examPaperInfoEnable, params)
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
    openUpdateExamPaperInfo(scope) {
      this.transExamPaperInfoId = scope.row.id;
      this.updateExamPaperInfoFlag = true;
    },
    //显示详情页面
    openDetailExamPaper(scope) {
      this.transDetailExamPaperId = scope.row.id;
      this.detailExamPaperFlag = true;
    },
    //重置
    resetForm(search) {
      this.createBy = "",
      this.status= "",
      this.vocationId = "",
      this.formInline.page = 1;
      this.formInline.limit = 10;
      this.search(this.formInline);
    },
    // 删除
    deleteExamPaperInfo(scope) {
      //状态为0不能被删除
      if (scope.row.status == 0) {
        this.$alert("数据状态生效不能被删除！", "提示", {
          confirmButtonText: "确定",
        });
        return false;
      }
      this.$confirm("确定要删除吗?删除后将不可恢复！", "信息", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
          let params = {
            id: scope.row.id,
          };
          api.testAxiosGet(ApiPath.url.deleteExamPaperInfo, params).then((res) => {
            let code = res.state;
            if (code == "0") {
              this.$message.success(res.message);
              this.search(this.formInline);
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
.userExamPaperInfo {
  width: 100%;
}
.height {
  margin-top: 5px;
  margin-left: -100px;
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