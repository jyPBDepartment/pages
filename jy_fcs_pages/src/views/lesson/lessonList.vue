<!--线下课程列表页面-->
<template>
  <div class="adminFunction">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right"></el-breadcrumb>
    <br />
    <!-- 查询条件 -->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="创建人">
        <el-input
          v-model="createBy"
          type="text"
          :maxlength="10"
          placeholder="请输入创建人"
          class="el-input el-input--small"
          style="width:200px;"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="课程名称">
        <el-input
          v-model="name"
          type="text"
          :maxlength="10"
          placeholder="请输入课程名称"
          class="el-input el-input--small"
          style="width:200px;"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="状态">
        <el-select v-model="status" style="width:40%" size="small" clearable>
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
      <el-table-column type="index" label="序号" align="center" min-width="7%" ></el-table-column>
      <el-table-column prop="vocation.name" label="职业类别" align="center" min-width="10%"  :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="title" label="名称" align="center" min-width="15%"  :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="stuLimit" label="人数限制" align="center" min-width="10%"  :show-overflow-tooltip="true"></el-table-column>
      <el-table-column sortable prop="lessonDate" label="课程时间" align="center" min-width="20%" ></el-table-column>
      <el-table-column align="center" prop="status" label="启用/禁用" min-width="10%" max-width="80px">
        <template slot-scope="scope">
          <!-- {{new Date(scope.row.now).getTime()}} -->
          <el-switch
            v-model="scope.row.status"
            :active-value="0"
            :inactive-value="1"
            active-color="rgb(19, 206, 102)"
            inactive-color="rgb(255, 73, 73)"
            @change="statusEnable(scope)"
          ></el-switch>
           <!-- {{new Date(scope.row.closingDate).getTime()}} -->
        </template>
      </el-table-column>
      <el-table-column align="center" prop="enrollStatus" label="报名状态" min-width="10%" max-width="80px">
        <template slot-scope="scope">
          <!-- {{new Date(scope.row.now).getTime()-new Date(scope.row.closingDate).getTime()}} -->
          <el-switch v-if="new Date(scope.row.now).getTime()<=new Date(scope.row.closingDate).getTime()"
            v-model="scope.row.enrollStatus"
            :active-value="0"
            :inactive-value="1"
            active-color="rgb(19, 206, 102)"
            inactive-color="rgb(255, 73, 73)"
            @change="enrollEnable(scope)"
          ></el-switch>
          <el-tag v-if="new Date(scope.row.now).getTime()>new Date(scope.row.closingDate).getTime()" type="warn">报名已结束</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="createBy" label="创建人" align="center" min-width="6%"></el-table-column>
      <el-table-column prop="closingDate" min-width="12%" label="报名截止日期" align="center" sortable></el-table-column>
      <el-table-column fixed="right" label="操作" align="center" min-width="30%">
        <template slot-scope="scope">
          <el-button
            @click="openUpdateDialog(scope)"
            type="primary"
            size="small"
            icon="el-icon-edit"
            style="width:70px;"
          >编辑</el-button>
          <el-button
            @click="deleteCase(scope)"
            type="danger"
            size="small"
            icon="el-icon-delete"
            style="width:70px;"
          >删除</el-button>
          <el-button @click="openDetails(scope)" type="primary" size="small" icon="el-icon-view" >报名情况</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页组件 -->
    <Pagination v-bind:child-msg="pageparm" @callFather="callFather"></Pagination>
    <add-lesson
      :show="addLessonFlag"
      title="添加线下课程信息"
      @close="closeAddLessonDialog"
      @save="saveLesson"
    ></add-lesson>

    <edit-lesson
      :show="updateLessonFlag"
      :transLessonInfoId="transLessonInfoId"
      title="修改"
      @close="closeUpdateLessonDialog"
      @save="updateLesson"
    ></edit-lesson>

    <view-lesson
      :show="viewLessonFlag"
      :viewTransLessonInfoId="viewTransLessonInfoId"
      :title="viewLessonTitle"
      @close="closeViewLessonInfoDialog"
    ></view-lesson>
    <br />
    <br />
  </div>
</template>

<script  >
import qs from "qs";
import Vue from "vue";
import ApiPath from "@/api/ApiPath";
import api from "@/axios/api";
import addLesson from "@/views/lesson/addLesson";
import editLesson from "@/views/lesson/editLesson";
//import caseContent from "@/views/CaseInfo/caseContent";
import Pagination from "../../components/Pagination";
import viewLesson from "@/views/lesson/studentList";
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
      status: "",
      createBy:"",
      addLessonFlag: false,
      updateLessonFlag: false,
      transLessonInfoId: "",
      viewTransLessonInfoId:"",
      viewLessonTitle:"",
      caseContentFlag: false,
      viewLessonFlag:false,
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
        { value: "0", label: "启用" },
        { value: "1", label: "禁用" },
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
    statusEnable: function (scope) {
      let params = {
        id: scope.row.id,
        status: scope.row.status,
      };
      api
        .testAxiosGet(ApiPath.url.changeLessonStatus, params)
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
    enrollEnable: function (scope) {
      if(scope.row.status == 1){
        this.$message.error("该课程已禁用");
        scope.row.enrollStatus = 1;
        return;
      }
      let params = {
        id: scope.row.id,
        status: scope.row.enrollStatus,
      };
      api
        .testAxiosGet(ApiPath.url.changeLessonEnroll, params)
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
        status: this.status,
        createBy:this.createBy,
        page: this.formInline.page,
        size: this.formInline.limit,
      };
      api
        .testAxiosGet(ApiPath.url.findLessonPage, params)
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
      this.$confirm("此操作将永久删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          let params = {
            id: scope.row.id,
          };
          api.testAxiosGet(ApiPath.url.deleteLessonById, params).then((res) => {
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
      this.transLessonInfoId = scope.row.id;
      this.updateLessonFlag = true;
    },
    //显示详情页面
    openDetails(scope){
      this.viewTransLessonInfoId = scope.row.id;
      this.viewLessonTitle = scope.row.title + '报名情况';
      this.viewLessonFlag = true;
    },
    //关闭详情页面
    closeViewLessonInfoDialog(){
      this.viewLessonFlag = false;
    },
    saveLesson() {
      this.addLessonFlag = false;
    },
    closeAddLessonDialog() {
      this.addLessonFlag = false;
      this.search(this.formInline);
    },
    modifyRuleTag() {
      this.updateRuleTag = false;
    },
    openRuleTag() {
      this.addLessonFlag = true;
    },
    // 重置
    resetRuleTag(search) {
      this.name = "";
      this.createBy = "";
      this.status = "";
      this.formInline.page = 1;
      this.formInline.limit = 10;
      this.search(this.formInline);
    },
    closeUpdateLessonDialog: function () {
      this.transLessonInfoId = "";
      this.updateLessonFlag = false;
      this.search(this.formInline);
    },
    updateLesson: function () {},
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
    addLesson,
    editLesson,
    viewLesson,
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


