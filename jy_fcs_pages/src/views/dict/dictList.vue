/**
 * 门户菜单 分类管理
 */
<template>
  <div class="ClassiFunction">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right"></el-breadcrumb>
    <br />
    <!-- 查询条件 -->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="字典名称">
        <el-input
          v-model="name"
          type="text"
          :maxlength="10"
          placeholder="请输入字典类型名称"
          class="el-input el-input--small"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="状态" prop="status">
          <el-select v-model="status" style="width:80%" size="small">
            <el-option
              v-for="item in auditStatusOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
      <el-button
        type="warning"
        size="small"
        @click="search('manual')"
        icon="el-icon-search"
        class="height"
      >查询</el-button>
      <el-button
        type="info"
        @click="resetRuleTag(search)"
        size="small"
        icon="el-icon-close"
      >重置</el-button>
      <el-row>
        <el-button type="success" @click="openDictTag" size="small" icon="el-icon-plus">添加</el-button>
      </el-row>
    </el-form>

    <!-- 展示的表单 -->
    <el-table
      :data="tableData"
      border
      style="width: 100%;"
      highlight-current-row
      row-key="id"
      default-expand-all
      size="mini"
    >
      <el-table-column prop="dictType" label="字典编码" align="center" min-width="80px" max-width="110px"></el-table-column>
      <el-table-column prop="dictName" label="字典名称" align="center" min-width="90px" max-width="110px"></el-table-column>
      <!--switch开关（表单）-->
      <el-table-column align="center" prop="status" label="状态" min-width="50px" max-width="80px">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.status"
            active-value="0"
            inactive-value="1"
            active-color="rgb(19, 206, 102)"
            inactive-color="rgb(255, 73, 73)"
            @change="typeEnable(scope)"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column sortable prop="createDate" label="创建时间" align="center" width="140"></el-table-column>
      <el-table-column sortable prop="updateDate" label="修改时间" align="center" width="140"></el-table-column>
      <el-table-column
        prop="createBy"
        label="创建人"
        align="center"
        min-width="80px"
        max-width="115px"
      ></el-table-column>
      <el-table-column fixed="right" label="操作" width="320px" align="center">
        <template slot-scope="scope">
          <el-button
            @click="openUpdateDialog(scope)"
            type="primary"
            size="small"
            icon="el-icon-edit"
          >编辑</el-button>
          <el-button
            @click="deleteType(scope)"
            type="danger"
            size="small"
            icon="el-icon-delete"
          >删除</el-button>
          <el-button
            type="primary"
            size="small"
            @click="table = true,check(scope)"
            icon="el-icon-view"
          >管理键值</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页组件 -->
    <Pagination v-bind:child-msg="pageparm" @callFather="callFather"></Pagination>
    <br />
    <br />
    <add-classification
      :show="addClassificationFlag"
      title="添加字典"
      @close="closeRuleTagDialog"
      @save="saveRuleTag"
    ></add-classification>

    <update-classification
      :show="updateClassificationFlag"
      :transClassificationId="transClassificationId"
      title="修改"
      @close="closeUpdateClassificationDialog"
      @save="updateClassification"
    ></update-classification>

    <add-data
      :show="addDataFlag"
      :currentDictType= "currentDictType"
      title="新增键值"
      @close="closeAddDataDialog"
      @save="saveDataEntity"
    >
    </add-data>
      
    <update-data
      :show="updateDataFlag"
      :currentDictType= "currentDictType"
      :transDataId = "transDataId"
      title="修改键值"
      @close="closeUpdateDataDialog"
      @save="updateDataEntity"
    >
    </update-data>

    <el-drawer title="查看子菜单" :visible.sync="table" direction="rtl"  size="50%">
      <el-row >
        <el-button style="margin-left:10px" type="success" @click="openAddDataDialog" size="small" icon="el-icon-plus">添加</el-button>
      </el-row>
      <el-table
        :data="gridData"
        border
        highlight-current-row
        row-key="id"
        default-expand-all
        size="mini"
        style="margin-left:10px;height:100%"
      >
      
        <el-table-column prop="dictLabel" label="字典标签" align="center" min-width="80px" max-width="110px"></el-table-column>
        <el-table-column prop="dictValue" label="键值" align="center" min-width="80px" max-width="110px"></el-table-column>
        <!--switch开关（表单）-->
        <el-table-column align="center" prop="status" label="状态" min-width="50px" max-width="80px">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.status"
            active-value="0"
            inactive-value="1"
            active-color="rgb(19, 206, 102)"
            inactive-color="rgb(255, 73, 73)"
            @change="dataEnable(scope)"
          ></el-switch>
        </template>
      </el-table-column>
        <el-table-column prop="dictSort" label="排序" align="center" min-width="80px" max-width="110px"></el-table-column>
        <el-table-column fixed="right" label="操作" width="220px" align="center">
          <template slot-scope="scope">
            <el-button
              @click="openUpateDataDialog(scope)"
              type="primary"
              size="small"
              icon="el-icon-edit"
            >编辑</el-button>
            <el-button
              @click="deleteData(scope)"
              type="danger"
              size="small"
              icon="el-icon-delete"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-drawer>
  </div>
</template>

<script  >
import qs from "qs";
import Vue from "vue";
import ApiPath from "@/api/ApiPath";
import api from "@/axios/api";
import AddClassification from "./addDict.vue";
import AddData from "./addData.vue";
import UpdateData from "./updateData.vue";
import UpdateClassification from "./updateDict.vue";
import Pagination from "../../components/Pagination";
import { getDictValue,dictTypeConst } from "../../utils/dataUtil";
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
      table: false,
      name: "",
      status:"",
      updateClassificationFlag: false,
      addDataFlag:false,
      updateDataFlag:false,
      transClassificationId: "",
      transDataId:"",
      transTagCode: "",
      currentDictType:"",
      tagCode: "",
      tagName: "",
      localShow: this.show,
      addClassificationFlag: false,
      updateRuleTag: false,
      mainBodyCode: "",
      tableData: [],
      gridData:[],
      auditStatusOptions: [
        { value: "", label: "全部" },
        { value: "0", label: "启用" },
        { value: "1", label: "禁用" }
      ],
      formInline: {
        page: 1,
        limit: 10,
      },
      pageparm: {
        currentPage: 1,
        pageSize: 10,
        total: 10,
      },
    };
  },

  watch: {
    show(val) {
      this.localShow = val;
    },
  },
  created() {
    this.search(this.formInline);
    getDictValue(dictTypeConst.enableStatus).then((res) => {
      //调用后台字典接口，返回码值集合
      //alert(JSON.stringify(res.data.data));
    });
  },
  methods: {
    //switch开关
    typeEnable: function (scope) {
      let params = {
        id: scope.row.id,
        status: scope.row.status,
      };
      api
        .testAxiosGet(ApiPath.url.dictTypeEnable, params)
        .then((res) => {
          let code = res.state;
          if (code == "1") {
            this.$message.success(res.message);
          } else {
            this.$message.success(res.message);
          }
        })
        .catch(function (error) {});
    },
    //switch开关
    dataEnable: function (scope) {
      let params = {
        id: scope.row.id,
        status: scope.row.status,
      };
      api
        .testAxiosGet(ApiPath.url.dictDataEnable, params)
        .then((res) => {
          let code = res.state;
          if (code == "1") {
            this.$message.success(res.message);
          } else {
            this.$message.success(res.message);
          }
        })
        .catch(function (error) {});
    },
    //分页赋值
    callFather(parm) {
      this.formInline.page = parm.currentPage;
      this.formInline.limit = parm.pageSize;
      this.search(this.formInline);
    },
    //子菜单查询方法
    check: function (scope) {
      this.currentDictType = scope.row.dictType;
      let params = {
        type: scope.row.dictType,
      };
      //console.log(scope.row.dictType);
      api
        .testAxiosGet(ApiPath.url.findDataByType, params)
        .then((res) => {
          let code = res.state;
          if (code == "0") {
            this.gridData = res.data;
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
      let params = {
        name: this.name,
        status:this.status,
        page: this.formInline.page,
        size: this.formInline.limit,
      };
      api
        .testAxiosGet(ApiPath.url.findDictType, params)
        .then((res) => {
          let code = res.state;
          if (code == "0") {
            this.tableData = res.data.content;
            this.pageparm.currentPage = res.data.number + 1;
            this.pageparm.pageSize = res.data.size;
            this.pageparm.total = res.data.totalElements;
          } 
        })
        .catch(function (error) {});
    },
    closeUpdateClassificationDialog: function () {
      this.search(this.formInline);
      this.updateClassificationFlag = false;
    },
    updateClassification: function () {},
    //删除字典类别
    deleteType(scope) {
      this.$confirm("确定要删除吗?", "信息", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        let params = {
          id: scope.row.id,
        };
        api
          .testAxiosGet(ApiPath.url.deleteDictType, params)
          .then((res) => {
            let code = res.state;
            if (code == "1") {
              this.$message.warning(res.message);
              this.reload();
            } else if (code == "0") {
              this.$message.success(res.message);
              this.reload();
            } else {
              this.$alert("删除失败，请联系系统管理员！", "提示", {
                confirmButtonText: "确定",
              });
              this.reload();
            }
          });
      });
    },
    //删除字典键值
    deleteData(scope) {
      this.$confirm("确定要删除吗?", "信息", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        let params = {
          id: scope.row.id,
        };
        api
          .testAxiosGet(ApiPath.url.deleteDictData, params)
          .then((res) => {
            let code = res.state;
            if (code == "1") {
              this.$message.warning(res.message);
              this.reload();
            } else if (code == "0") {
              this.$message.success(res.message);
              this.reload();
            } else {
              this.$alert("删除失败，请联系系统管理员！", "提示", {
                confirmButtonText: "确定",
              });
              this.reload();
            }
          });
      });
    },
    onSubmit: function () {
      let params = {
        tagCode: this.tagCode,
        chName: this.tagName,
        generateType: "gz",
      };
    },
    closeAddDataDialog(){
      this.addDataFlag = false;
    },
    closeUpdateDataDialog(){
      this.updateDataFlag = false;
    },
    saveDataEntity(){
      this.addDataFlag = false;
    },
    updateDataEntity(){
      this.updateDataFlag = false;
    },
    openAddDataDialog(){
      this.addDataFlag = true;
    },
    openUpateDataDialog(scope){
      this.transDataId = scope.row.id;
      this.updateDataFlag = true;
    },
    openUpdateDialog(scope) {
      this.transClassificationId = scope.row.id;
      this.updateClassificationFlag = true;
    },
    saveRuleTag() {
      this.addClassificationFlag = false;
    },

    modifyRuleTag() {
      this.updateRuleTag = false;
    },
    openDictTag() {
      this.addClassificationFlag = true;
    },
    // 重置
    resetRuleTag(search) {
      this.name = "";
      this.status = "";
      this.formInline.page = 1;
      this.formInline.limit = 10;
      this.search(this.formInline);
    },
    closeRuleTagDialog() {
      this.search(this.formInline);
      this.addClassificationFlag = false;
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

    maunalRun(scope) {
      let tagcode = scope.row.tagCode;
      api.testAxiosPost(ApiPath.url.maunalRun, tagCode).then((res) => {});
    },
  },
  components: {
    AddClassification,
    UpdateClassification,
    Pagination,
    AddData,
    UpdateData,
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
.el-tooltip__popper {
  font-size: 14px;
  max-width: 150px;
}
.height {
  margin-top: 5px;
  margin-left: -30px;
}
 .el-table >.el-table__fixed-right {
    height: 100% !important;
  }
</style>




