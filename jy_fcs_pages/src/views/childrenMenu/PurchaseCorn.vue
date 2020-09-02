/**
 * 门户菜单 农服管理
 */
<template>
  <div class="adminFunction">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right"></el-breadcrumb>
    <br />
    <!-- 查询条件 -->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="标题名称">
        <el-input
          v-model="name"
          type="text"
          :maxlength="10"
          placeholder="请输入标题名称"
          class="el-input el-input--small"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="审核状态">
        <el-select v-model="status" style="width:80%" size="small" clearable>
          <el-option
            v-for="item in statusOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-button
        type="warning"
        @click="search('manual')"
        size="small"
        icon="el-icon-search"
        class="height"
      >查询</el-button>
      <el-button
        type="info"
        @click="resetRuleTag(search)"
        size="small"
        icon="el-icon-close"
        class="height"
      >重置</el-button>
    </el-form>

    <!-- 展示的表单 -->
    <el-table :data="tableData" border highlight-current-row size="mini">
      <el-table-column type="index" label="序号" align="center" min-width="5%" max-width="5%"></el-table-column>
      <el-table-column prop="name" label="标题名称" align="center" min-width="45%" max-width="50%"></el-table-column>
        <el-table-column
        prop="transactionCategoryCode"
        label="交易类别"
        align="center"
        min-width="45%"
        max-width="50%"
      >
        <template slot-scope="scope">
          <span v-if="scope.row.transactionCategoryCode==0">玉米</span>
          <span v-if="scope.row.transactionCategoryCode==1">农机</span>
          <span v-if="scope.row.transactionCategoryCode==2">水稻</span>
          <span v-if="scope.row.transactionCategoryCode==3">高粱</span>
          <span v-if="scope.row.transactionCategoryCode==4">黄豆</span>
        </template>
      </el-table-column>
      <el-table-column prop="descrip" label="描述" align="center" min-width="45%" max-width="50%" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column
        prop="price"
        label="收购价格"
        align="center"
        min-width="45%"
        max-width="50%"
      ></el-table-column>
      <el-table-column prop="isFace" label="是否面议" align="center" min-width="45%" max-width="50%">
           <template slot-scope="scope">
          <span v-if="scope.row.isFace==0">是</span>
          <span v-if="scope.row.isFace==1">否</span>          
        </template>
      </el-table-column>
       <el-table-column
        prop="contactsUser"
        label="联系人"
        align="center"
        min-width="45%"
        max-width="50%"
      ></el-table-column>
      <el-table-column
        prop="contactsPhone"
        label="联系方式"
        align="center"
        min-width="60%"
        max-width="65%"
        :show-overflow-tooltip="true"
      ></el-table-column>
      <el-table-column
        prop="address"
        label="收购区域"
        align="center"
        min-width="45%"
        max-width="50%"
        :show-overflow-tooltip="true"
      ></el-table-column>  
        <el-table-column sortable prop="purchaseDate" label="购买时间" align="center" width="135"></el-table-column>
      <el-table-column sortable prop="createDate" label="发布时间" align="center" width="135"></el-table-column>
      <el-table-column sortable prop="updateDate" label="修改时间" align="center" width="135"></el-table-column>
       <el-table-column align="center" prop="status" label="审核状态" min-width="45%" max-width="50%">
        <template slot-scope="scope">
          <span v-if="scope.row.status==0">待审核</span>
          <span v-if="scope.row.status==1">审核通过</span>
          <span v-if="scope.row.status==2">审核拒绝</span>
          <span v-if="scope.row.status==3">预约中</span>
          <span v-if="scope.row.status==4">已完成</span>
        </template>
      </el-table-column>
     
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
// import agrContent from "./agrContent";
// import checkContent from "@/views/Agricultural/checkContent";
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
      status: "",
    //   agrContentFlag: false,
    //   agrContentId: "",
    //   updateAgriculturalFlag: false,
    //   transAgriculturalId: "",
      checkContentFlag: false,
      checkContentId: "",
      updateCheckContentFlag: false,
      transTagCode: "",
      tagCode: "",
      tagName: "",
      localShow: this.show,
      addAgriculturalFlag: false,
      updateRuleTag: false,
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
        { value: "0", label: "待审核" },
        { value: "1", label: "审核通过" },
        { value: "2", label: "审核拒绝" },
        { value: "3", label: "预约中" },
        { value: "4", label: "已完成" },
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
        page: this.formInline.page,
        size: this.formInline.limit,
      };
      api
        .testAxiosGet(ApiPath.url.searchAgricultural, params)
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

    closeUpdateAgriculturalDialog: function () {
      this.updateAgriculturalFlag = false;
    },
    closeUpdateCheckContentDialog: function () {
      this.updateCheckContentFlag = false;
    },
    updateAgricultural: function () {},
    // 查看详情
    agrContent(scope) {
      this.agrContentFlag = true;
      this.agrContentId = scope.row.id;
    },
    checkContent(scope) {
      this.checkContentFlag = true;
      this.checkContentId = scope.row.id;
    },
    onSubmit: function () {
      let params = {
        tagCode: this.tagCode,
        chName: this.tagName,
        generateType: "gz",
      };
    },
    openUpdateDialog(scope) {
      this.transAgriculturalId = scope.row.id;
      this.updateAgriculturalFlag = true;
    },
    saveRuleTag() {
      this.addAgriculturalFlag = false;
    },

    modifyRuleTag() {
      this.updateRuleTag = false;
    },
    openRuleTag() {
      this.addAgriculturalFlag = true;
    },
    // 重置
    resetRuleTag(search) {
      this.name = "";
      this.status = "";
      this.formInline.page = 1;
      this.formInline.limit = 10;
      this.search(this.formInline);
    },
    closeUpdateAgrContentDialog() {
      this.agrContentFlag = false;
    },
    closeUpdateCheckContentDialog() {
      this.checkContentFlag = false;
    },

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
    // agrContent,
    // checkContent,
    Pagination,
  },
};
</script>

<style scoped >
.el-table {
  background-color: #fff;
}
.el-row {
  margin-top: 2px;
  margin-bottom: 15px;
}
.el-form-item {
  font-size: 14px;
}
.height {
  margin-top: 6px;
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


