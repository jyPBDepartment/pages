/**
 * 门户菜单 看图识病管理
 */
<template>
  <div class="adminFunction">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right"></el-breadcrumb>
    <br />
    <!-- 查询条件 -->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="名称">
        <el-input
          v-model="name"
          type="text"
          :maxlength="10"
          placeholder="请输入名称"
          class="el-input el-input--small"
          style="width:200px;"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="状态">
        <el-select v-model="auditStatus" style="width:40%" size="small" clearable>
          <el-option
            v-for="item in statusOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
             class="option"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
      <el-button type="warning" @click="search('manual')" size="small" icon="el-icon-search" class="height">查询</el-button>
      <el-button
        type="info"
        @click="resetRuleTag(search)"
        size="small"
        icon="el-icon-close"
      >重置</el-button>
      </el-form-item>
      <el-row>
        <el-button type="success" @click="openRuleTag" size="small" icon="el-icon-plus">添加</el-button>
      </el-row>
    </el-form>

    <!-- 展示的表单 -->
    <el-table :data="tableData" border style="width: 100%;" highlight-current-row size="mini">
      <el-table-column type="index" label="序号" align="center" min-width="3%" ></el-table-column>
      <el-table-column prop="name" label="名称" align="center" min-width="7%"  :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="url" label="图片" align="center" min-width="7%" >
        <template slot-scope="scope">
          <el-image :src="scope.row.url" style="width:60px;height:60px;"></el-image>
        </template>
      </el-table-column>
      <el-table-column
        prop="cropsTypeCode"
        label="农作物种类"
        align="center"
        min-width="6%"
       
      ></el-table-column>
      <el-table-column
        prop="dipTypeCode"
        label="病虫害种类"
        align="center"
        min-width="6%"
       
      ></el-table-column>
      <!--switch开关（表单）-->
      <el-table-column align="center" prop="auditStatus" label="状态" min-width="5%" >
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.auditStatus"
            active-value="1"
            inactive-value="0"
            active-color="rgb(19, 206, 102)"
            inactive-color="rgb(255, 73, 73)"
            @change="caseInfoEnable(scope)"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column sortable prop="createDate" label="创建时间" align="center" min-width="10%" ></el-table-column>
      <el-table-column sortable prop="updateDate" label="修改时间" align="center" min-width="10%" ></el-table-column>
      <el-table-column
        prop="createUser"
        label="创建人"
        align="center"
        min-width="5%"
       
      ></el-table-column>

      <el-table-column fixed="right" label="操作" align="center" min-width="20%">
        <template slot-scope="scope">
          <el-button
            @click="openUpdateDialog(scope)"
            type="primary"
            size="small"
            icon="el-icon-edit"
           
          >编辑</el-button>
          <el-button
            @click="deleteCase(scope)"
            type="danger"
            size="small"
            icon="el-icon-delete"
            
          >删除</el-button>
          <el-button
            @click="caseContent(scope)"
            type="success"
            size="small"
            icon="el-icon-view"
          >查看</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页组件 -->
    <Pagination v-bind:child-msg="pageparm" @callFather="callFather"></Pagination>
    <add-case-info
      :show="addCaseInfoFlag"
      title="添加看图识病信息"
      @close="closeRuleTagDialog"
      @save="saveRuleTag"
    ></add-case-info>

    <update-case-info
      :show="updateCaseInfoFlag"
      :transCaseInfoId="transCaseInfoId"
      title="修改"
      @close="closeUpdateCaseInfoDialog"
      @save="updateCaseInfo"
    ></update-case-info>
    <caseContent
      :show="caseContentFlag"
      :caseContentId="caseContentId"
      title="查看详情"
      @close="closeUpdateCaseContentDialog"
    ></caseContent>
    <br />
    <br />
  </div>
</template>

<script  >
import qs from "qs";
import Vue from "vue";
import ApiPath from "@/api/ApiPath";
import api from "@/axios/api";
import addCaseInfo from "@/views/CaseInfo/addCaseInfo";
import updateCaseInfo from "@/views/CaseInfo/updateCaseInfo";
import caseContent from "@/views/CaseInfo/caseContent";
import Pagination from "../../components/Pagination";

export default {
  inject: ["reload"],
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: "对话框",
    },
  },

  data() {
    return {
      name: "",
      auditStatus: "",
      addCaseInfoFlag: false,
      updateCaseInfoFlag: false,
      transCaseInfoId: "",
      caseContentFlag: false,
      caseContentId: "",
      transTagCode: "",
      tagCode: "",
      tagName: "",
      localShow: this.show,
      mainBodyCode: "",
      tableData: [],
      formInline: {
        page: 1,
        limit: 10,
        varLable: "",
        varName: "",
        token: localStorage.getItem("logintoken"),
      },
      pageparm: {
        currentPage: 1,
        pageSize: 10,
        total: 10,
      },
      statusOptions: [
        { value: "", label: "全部" },
        { value: "0", label: "禁用" },
        { value: "1", label: "启用" },
      ],
    };
  },

  watch: {
    show(val) {
      this.localShow = val;
    },
  },
  created() {
    this.search(this.formInline);
  },
  methods: {
    //switch开关
    caseInfoEnable: function (scope) {
      let params = {
        id: scope.row.id,
        auditStatus: scope.row.auditStatus,
      };
      api
        .testAxiosGet(ApiPath.url.caseInfoEnable, params)
        .then((res) => {
          let code = res.state;
          if (code == "1") {
            this.$message.success(res.message);
          } else {
            this.$message.success(res.message);
          }
          this.reload();
        })
        .catch(function (error) {});
    },
    //分页赋值
    callFather(parm) {
      this.formInline.page = parm.currentPage;
      this.formInline.limit = parm.pageSize;
      this.search(this.formInline);
    },
    //查询方法
    search: function (parameter) {
      if (parameter == "manual") {
        this.formInline.page = 1;
        this.formInline.limit = 10;
      }
      let params = {
        name: this.name,
        auditStatus: this.auditStatus,
        page: this.formInline.page,
        size: this.formInline.limit,
      };
      api
        .testAxiosGet(ApiPath.url.searchCaseInfo, params)
        .then((res) => {
          let code = res.state;
          if (code == "0") {
            this.tableData = res.data.content;
            this.pageparm.currentPage = res.data.number + 1;
            this.pageparm.pageSize = res.data.size;
            this.pageparm.total = res.data.totalElements;
          } else {
          }
        })
        .catch(function (error) {});
    },
    // 删除
    deleteCase: function (scope) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          let params = {
            id: scope.row.id,
          };
          api.testAxiosGet(ApiPath.url.deleteCaseInfo, params).then((res) => {
            let code = res.state;

            if (code == "0") {
              this.$message({
                type: "success",
                message: "删除成功!",
              });
             
               this.tableData.splice(scope.$index, 1);
            } else {
              this.$message.success(res.message);
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
    closeUpdateCaseContentDialog: function () {
      this.caseContentFlag = false;
    },
    caseContent(scope) {
      this.caseContentFlag = true;
      this.caseContentId = scope.row.id;
    },

    onSubmit: function () {
      let params = {
        tagCode: this.tagCode,
        chName: this.tagName,
        generateType: "gz",
      };
    },
    openUpdateDialog(scope) {
      this.transCaseInfoId = scope.row.id;
      this.updateCaseInfoFlag = true;
    },
    saveRuleTag() {
      this.addCaseInfoFlag = false;
    },
    closeRuleTagDialog() {
      this.addCaseInfoFlag = false;
      this.search(this.formInline);
    },
    modifyRuleTag() {
      this.updateRuleTag = false;
    },
    openRuleTag() {
      this.addCaseInfoFlag = true;
    },
    // 重置
    resetRuleTag(search) {
      this.name = "";
      this.auditStatus = "";
      this.formInline.page = 1;
      this.formInline.limit = 10;
      this.search(this.formInline);
    },
    closeUpdateCaseInfoDialog: function () {
      this.updateCaseInfoFlag = false;
    },
    updateCaseInfo: function () {},
    closeModifyRuleTagDialog() {
      this.updateRuleTag = false;
    },
    beforeClose() {
      this.close();
    },
    close() {
      this.$emit("close");
    },
    save() {
      this.$emit("save", this.transData);
    },
  },
  components: {
    addCaseInfo,
    updateCaseInfo,
    caseContent,
    Pagination,
  },
};
</script>

<style scoped >
.el-table {
  background-color: #fff;
}
.el-button{
  /* margin:2px 4px 2px 4px; */
}
.el-row {
  margin-top: 2px;
  margin-bottom: 15px;
}
.el-form-item {
  font-size: 14px;
}
.height {
  margin-top: 5px;
  margin-left: -120px;
}
.option{
 width:80px;
 text-align:center;
 height:30px;
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


