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
      <el-button type="warning" @click="search" size="small" icon="el-icon-search" class="hright">查询</el-button>
      <el-button
        type="info"
        @click="resetRuleTag(search)"
        size="small"
        icon="el-icon-close"
        class="height"
      >重置</el-button>
    </el-form>

    <!-- 展示的表单 -->
    <el-table :data="tableData" border style="width: 100%;" highlight-current-row>
      <el-table-column type="index" label="序号" align="center" style="width:40px;"></el-table-column>
      <el-table-column sortable prop="name" label="标题名称" align="center" style="width:40px;"></el-table-column>
      <el-table-column
        sortable
        prop="descrip"
        label="描述"
        align="center"
        :show-overflow-tooltip="true"
      ></el-table-column>
      <el-table-column
        sortable
        prop="transactionTypeCode"
        label="农服交易类型"
        align="center"
        style="width:40px;"
      >
        <template slot-scope="scope">
          <span v-if="scope.row.transactionTypeCode==0">收购</span>
          <span v-if="scope.row.transactionTypeCode==1">出售</span>
          <span v-if="scope.row.transactionTypeCode==2">出租</span>
          <span v-if="scope.row.transactionTypeCode==3">播种</span>
          <span v-if="scope.row.transactionTypeCode==4">植保</span>
          <span v-if="scope.row.transactionTypeCode==5">收割</span>
        </template>
      </el-table-column>
      <el-table-column
        sortable
        prop="transactionCategoryCode"
        label="农服交易类别"
        align="center"
        style="width:40px;"
      >
        <template slot-scope="scope">
          <span v-if="scope.row.transactionCategoryCode==0">玉米</span>
          <span v-if="scope.row.transactionCategoryCode==1">农机</span>
          <span v-if="scope.row.transactionCategoryCode==2">水稻</span>
        </template>
      </el-table-column>
      <el-table-column sortable prop="purchasingPrice" label="收购价格（元）" align="center"></el-table-column>
      <el-table-column sortable prop="purchasingArea" label="收购区域" align="center"></el-table-column>
      <el-table-column sortable prop="sellingPrice" label="出售价格" align="center"></el-table-column>
      <el-table-column sortable prop="sellingArea" label="出售区域" align="center"></el-table-column>
      <el-table-column sortable prop="contactsUser" label="联系人" align="center"></el-table-column>
      <el-table-column sortable prop="contactsPhone" label="联系方式" align="center"></el-table-column>
      <el-table-column sortable prop="url" label="图片" align="center" style="width:120px">
        <template slot-scope="scope">
          <el-image :src="scope.row.url" style="width:100px;height:100px;"></el-image>
        </template>
      </el-table-column>
      <el-table-column sortable prop="machineType" label="机器类型" align="center"></el-table-column>

      <el-table-column sortable prop="model" label="型号" align="center"></el-table-column>
      <el-table-column sortable prop="articleNumber" label="货号" align="center"></el-table-column>
      <el-table-column sortable prop="labelCode" label="标签编码" align="center"></el-table-column>
      <el-table-column sortable prop="purchaseDate" label="购买时间" align="center"></el-table-column>

      <el-table-column align="center" prop="status" label="审核状态" style="width:50px;">
        <template slot-scope="scope">
          <span v-if="scope.row.status==0">待审核</span>
          <span v-if="scope.row.status==1">审核通过</span>
          <span v-if="scope.row.status==2">审核拒绝</span>
          <span v-if="scope.row.status==3">预约中</span>
          <span v-if="scope.row.status==4">已完成</span>
        </template>
      </el-table-column>
      <el-table-column sortable prop="createDate" label="发布时间" align="center"></el-table-column>
      <el-table-column sortable prop="updateDate" label="修改时间" align="center"></el-table-column>
      <el-table-column prop="createUser" label="发布人" align="center" style="width:40px;"></el-table-column>
      <el-table-column prop="updateUser" label="审核人" align="center" style="width:40px;"></el-table-column>
      <el-table-column
        prop="examineReason"
        label="审核拒绝理由"
        align="center"
        style="width:40px;"
        :show-overflow-tooltip="true"
      ></el-table-column>
      <el-table-column fixed="right" label="操作" align="center" style="width:100%">
        <template slot-scope="scope">
          <el-button @click="agrContent(scope)" type="primary" size="small">查看详情</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页组件 -->
    <Pagination v-bind:child-msg="pageparm" @callFather="callFather"></Pagination>
    <agrContent
      :show="agrContentFlag"
      :agrContentId="agrContentId"
      title="查看详情"
      @close="closeUpdateAgrContentDialog"
    ></agrContent>

    <br />
    <br />
  </div>
</template>

<script  >
import qs from "qs";
import Vue from "vue";
import ApiPath from "@/api/ApiPath";
import api from "@/axios/api";
import agrContent from "./agrContent";
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
      agrContentFlag: false,
      agrContentId: "",
      updateAgriculturalFlag: false,
      transAgriculturalId: "",
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
    updateAgricultural: function () {},
    // 查看详情
    agrContent(scope) {
      this.agrContentFlag = true;
      this.agrContentId = scope.row.id;
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
      location.reload();
    },
    closeUpdateAgrContentDialog() {
      this.agrContentFlag = false;
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
    agrContent,
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


