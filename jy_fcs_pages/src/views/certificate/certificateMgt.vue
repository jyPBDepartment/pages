<!--线下课程列表页面-->
<template>
  <div class="adminFunction">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right"></el-breadcrumb>
    <br />
    <!-- 查询条件 -->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="客户名称">
        <el-input
          v-model="userName"
          type="text"
          :maxlength="10"
          placeholder="请输入客户名称"
          class="el-input el-input--small"
          style="width:200px;"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="身份证号">
        <el-input
          v-model="card"
          type="text"
          :maxlength="10"
          placeholder="请输入身份证号"
          class="el-input el-input--small"
          style="width:200px;"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="职业类别">
        <el-select v-model="vocationId" style="width:46%"  size="small" >
          <el-option
            v-for="item in statusOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
      <el-button style="margin-left: -100px;margin-top: 5px;" type="warning" @click="search('manual')" size="small" icon="el-icon-search" >查询</el-button>
      <el-button
        type="info"
        @click="resetRuleTag(search)"
        size="small"
        icon="el-icon-close"
      >重置</el-button>
      </el-form-item>
    </el-form>

    <!-- 展示的表单 -->
    <el-table :data="tableData" border style="width: 100%;" highlight-current-row size="mini">
      <el-table-column type="index" label="序号" align="center" min-width="7%" ></el-table-column>
      <el-table-column prop="certificate.name" label="证书名称" align="center" min-width="20%"  :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="certificate.vocation.name" min-width="10%" label="职业类别" align="center" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="user.userName" label="用户名称" align="center" min-width="10%"  :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="user.userCard" min-width="12%" label="身份证号" align="center" ></el-table-column>
      <el-table-column prop="createDate" min-width="12%" label="申请时间" align="center" sortable></el-table-column>
      <el-table-column prop="issueBy" min-width="10%" label="处理人" align="center" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="issueDate" min-width="12%" label="处理时间" align="center" sortable></el-table-column>
    </el-table>

    <!-- 分页组件 -->
    <Pagination v-bind:child-msg="pageparm" @callFather="callFather"></Pagination>
    <br />
    <br />
  </div>
</template>

<script  >
import qs from "qs";
import Vue from "vue";
import ApiPath from "@/api/ApiPath";
import api from "@/axios/api";
import addLesson from "@/views/certificate/addCertificate";
import editLesson from "@/views/certificate/editCertificate";
//import caseContent from "@/views/CaseInfo/caseContent";
import Pagination from "../../components/Pagination";
//import viewLesson from "@/views/lesson/studentList";
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
      userName:"",//用户名称
      card:"",//身份证号
      vocationId:"",//职业类别
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
        { value: "", label: "全部" }
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
    this.findContext();
  },
  methods: {
    //分页赋值
    callFather(parm) {
      this.formInline.page = parm.currentPage;
      this.formInline.limit = parm.pageSize;
      this.search(this.formInline);
    },
    //下拉列表显示
    findContext: function () {
      let params = {};
      api
        .testAxiosGet(ApiPath.url.findVocationOptions, params)
        .then((res) => {
          if (res.state == "0") {
            // this.powerOptions.push({ value: "", label: "请选择" });
            for (let i = 0; i < res.data.length; i++) {
              this.statusOptions.push({
                value: res.data[i]["id"],
                label: res.data[i]["name"],
              });
            }
          }
        })
        .catch(function (error) {});
    },

    //查询方法
    search: function (parameter) {
      if (parameter == "manual") {
        this.formInline.page = 1;
        this.formInline.limit = 10;
      }
    //   alert(this.vocationId);
      let params = {
        userName: this.userName,
        card: this.card,
        vocationId:this.vocationId,
        page: this.formInline.page,
        size: this.formInline.limit,
      };
      api
        .testAxiosGet(ApiPath.url.findCertificateMgt, params)
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
          api.testAxiosGet(ApiPath.url.deleteCertificateById, params).then((res) => {
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
        // alert(scope.row.id);
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
      this.userName = "";
      this.card = "";
      this.vocationId = "";
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
 width:100px;
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


