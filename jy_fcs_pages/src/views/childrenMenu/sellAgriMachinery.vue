/**
 * 门户菜单 农机发布
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
          style="width:200px;"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="审核状态">
        <el-select v-model="status" style="width:48%;height:100px;" size="small" clearable>
          <el-option
            v-for="item in statusOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"

          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
      <el-button
        type="warning" @click="search('manual')"  size="small" icon="el-icon-search" class="height">查询</el-button>
      <el-button
        type="info" @click="resetRuleTag(search)" size="small" icon="el-icon-close">重置</el-button>
      </el-form-item>
    </el-form>

    <!-- 展示的表单 -->
    <el-table :data="tableData" border highlight-current-row size="mini">
      <el-table-column type="index" label="序号" align="center" min-width="48px" max-width="48px"></el-table-column>
      <el-table-column prop="name" label="标题名称" align="center" min-width="80px" max-width="120px" :show-overflow-tooltip="true"></el-table-column>
     
       <el-table-column
        prop="transactionTypeCode"
        label="交易类型"
        align="center"
        min-width="60px"
        max-width="100px"
      >
        <template slot-scope="scope">
          <span v-if="scope.row.transactionTypeCode==0">收购</span>
          <span v-if="scope.row.transactionTypeCode==1">出售</span>
          <span v-if="scope.row.transactionTypeCode==2">出租</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="machineType"
        label="机器类型"
        align="center"
        min-width="60px"
        max-width="100px"
      >
       <template slot-scope="scope">
        <span v-if="scope.row.machineType=='0'">玉米收割机</span>
        <span v-if="scope.row.machineType=='1'">水稻收割机</span>
        <span v-if="scope.row.machineType=='2'">玉米播种机</span>
        <span v-if="scope.row.machineType=='3'">水稻插秧机</span>
        <span v-if="scope.row.machineType=='4'">无人机喷药</span>
       </template>
      </el-table-column>
      
      <el-table-column
        prop="address"
        label="区域"
        align="center"
        min-width="100px"
        max-width="120px"
        :show-overflow-tooltip="true"
      ></el-table-column>
  <el-table-column align="center" prop="status" label="审核状态" min-width="60px" max-width="80px">
        <template slot-scope="scope">
          <span v-if="scope.row.status==0">待审核</span>
          <span v-if="scope.row.status==1">审核通过</span>
          <span v-if="scope.row.status==2">审核拒绝</span>
          <span v-if="scope.row.status==3">已取消</span>
        </template>
      </el-table-column>
       <el-table-column sortable prop="purchaseDate" label="购买时间" align="center" min-width="80px" max-width="100px"></el-table-column>
      <el-table-column sortable prop="createDate" label="发布时间" align="center" min-width="100px" max-width="120px"></el-table-column>
      <el-table-column sortable prop="updateDate" label="修改时间" align="center" min-width="100px" max-width="120px"></el-table-column>
    
    <el-table-column fixed="right" label="操作" align="center" min-width="80px" max-width="100px">
        <template slot-scope="scope">
          <el-button @click="machineContent(scope)" type="primary"  size="small"
            style="padding:9px 6px;margin-bottom:5px;"
          >信息审核</el-button>
            <el-button
            @click="deleteCase(scope)"
            type="danger"
            size="small"
            style="padding:9px 10px; margin-left:0px;"
            icon="el-icon-delete"
          >删除</el-button>
        </template>
      </el-table-column>
       </el-table>
    <!-- 分页组件 -->
    <Pagination v-bind:child-msg="pageparm" @callFather="callFather"></Pagination>
    <machineContent :show="machineContentFlag" :machineContentId="machineContentId" title="信息审核"  @close="closeUpdateMachineContentDialog"></machineContent>
   
    <br />
    <br />
  </div>
</template>

<script  >
import qs from "qs";
import Vue from "vue";
import ApiPath from "@/api/ApiPath";
import api from "@/axios/api";
import MachineContent from "./MachineContent";
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
      type:2,
      machineContentFlag: false,
      machineContentId: "",
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
        { value: "3", label: "已取消" }
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
        type:this.type,
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
          api.testAxiosGet(ApiPath.url.deleteAgricultural, params).then((res) => {
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
   // 查看详情
    machineContent(scope) {
      this.machineContentFlag = true;
      this.machineContentId = scope.row.id;
    },
    closeUpdateMachineContentDialog(){
      this.machineContentFlag = false;
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
    
    Pagination,
    MachineContent
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
  margin-top: 5px;
  margin-left: -90px;
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


