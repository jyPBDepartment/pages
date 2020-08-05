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
      <el-form-item label="权限名称">
        <el-input
          v-model="jurName"
          type="text"
          :maxlength="10"
          placeholder="请输入权限名称"
          class="el-input el-input--small"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="权限编码">
        <el-input
          v-model="jurCode"
          type="text"
          :maxlength="10"
          placeholder="请输入权限编码"
          class="el-input el-input--small"
          clearable
        ></el-input>
      </el-form-item>
      <el-button type="warning" size="small" @click="search" icon="el-icon-search" class="height">查询</el-button>
      <el-button
        type="info"
        size="small"
        @click="resetRuleTag(search)"
        class="height"
        icon="el-icon-close"
      >重置</el-button>
      <el-row>
        <el-button type="success" size="small" @click="openRuleTag" icon="el-icon-plus">添加</el-button>
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
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
    >
      <el-table-column  prop="jurCode" label="权限编码" align="center"  min-width="80px" max-width="115px"></el-table-column>
      <el-table-column  prop="jurName" label="权限名称" align="center"  min-width="80px" max-width="115px"></el-table-column>
      <!--switch开关（表单）-->
      <el-table-column align="center"  prop="auditStatus" label="状态" min-width="50" max-width="80px">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.auditStatus"
            active-value="1"
            inactive-value="0"
            active-color="rgb(19, 206, 102)"
            inactive-color="rgb(255, 73, 73)"
            @change="powerInfoEnable(scope)"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column sortable prop="createDate" label="创建时间" align="center" width="180"></el-table-column>
      <el-table-column sortable prop="updateDate" label="修改时间" align="center" width="180"></el-table-column>
      <el-table-column  prop="createUser" label="创建人" align="center"  min-width="80px" max-width="115px"></el-table-column>
      <el-table-column  prop="updateUser" label="修改人" align="center"  min-width="80px" max-width="115px"></el-table-column>
      <el-table-column fixed="right" label="操作" width="220px" align="center">
        <template slot-scope="scope">
          <el-button
            @click="openUpdateDialog(scope)"
            class="up"
            type="primary"
            size="small"
            icon="el-icon-edit"
          >编辑</el-button>
          <el-button
            @click="deletePowerInfo(scope)"
            class="del"
            type="danger"
            size="small"
            icon="el-icon-delete"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页组件 -->
    <Pagination v-bind:child-msg="pageparm" @callFather="callFather"></Pagination>
    <br />
    <br />
    <add-power-info
      :show="addPowerInfoFlag"
      title="添加权限信息"
      @close="closeRuleTagDialog"
      @save="saveRuleTag"
    ></add-power-info>

    <update-power-info
      :show="updatePowerInfoFlag"
      :transPowerInfoId="transPowerInfoId"
      title="修改"
      @close="closeUpdatePowerInfoDialog"
      @save="updatePowerInfo"
    ></update-power-info>
  </div>
</template>

<script  >
import qs from "qs";
import Vue from "vue";
import ApiPath from "@/api/ApiPath";
import api from "@/axios/api";
import AddPowerInfo from "./addPowerInfo.vue";
import UpdatePowerInfo from "./updatePowerInfo.vue";
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
      jurName: "",
      jurCode: "",
      updatePowerInfoFlag: false,
      transPowerInfoId: "",
      transTagCode: "",
      tagCode: "",
      tagName: "",
      localShow: this.show,
      addPowerInfoFlag: false,
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
    powerInfoEnable: function (scope) {
      let params = {
        id: scope.row.id,
        auditStatus: scope.row.auditStatus,
      };
      api
        .testAxiosGet(ApiPath.url.powerInfoEnable, params)
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
      let params = {
        jurName: this.jurName,
        jurCode: this.jurCode,
        page: this.formInline.page,
        size: this.formInline.limit,
      };
      api
        .testAxiosGet(ApiPath.url.searchPowerInfo, params)
        .then((res) => {
          let code = res.status;
          if (code == "0") {
            let parent = [];
            let children = [];
            for (let i = 0; i < res.data.content.length; i++) {
              if (res.data.content[i]["subJurCode"] == "") {
                parent.push(res.data.content[i]);
              } else {
                children.push(res.data.content[i]);
              }
            }
            let child = [];
            for (let j = 0; j < parent.length; j++) {
              for (let k = 0; k < children.length; k++) {
                if (parent[j]["id"] == children[k]["subJurCode"]) {
                  child.push(children[k]);
                }
                parent[j]["children"] = child;
              }
              child = [];
            }
            this.tableData = parent;
            this.pageparm.currentPage = res.data.number + 1;
            this.pageparm.pageSize = res.data.size;
            this.pageparm.total = res.data.totalElements;
          } else {
          }
        })
        .catch(function (error) {});
    },

    closeUpdatePowerInfoDialog: function () {
      this.updatePowerInfoFlag = false;
    },
    updatePowerInfo: function () {},
    //删除
    deletePowerInfo(scope) {
      this.$confirm("确定要删除吗?", "信息", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        let params = {
          id: scope.row.id,
        };
        api.testAxiosGet(ApiPath.url.deletePowerInfo, params).then((res) => {
          let code = res.status;
          if (code == "0") {
            this.$message.success(res.message);
            this.reload();
          } else {
            this.$alert("删除失败，请先解除关联关系！", "提示", {
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
    openUpdateDialog(scope) {
      this.transPowerInfoId = scope.row.id;
      this.updatePowerInfoFlag = true;
    },
    saveRuleTag() {
      this.addPowerInfoFlag = false;
    },

    modifyRuleTag() {
      this.updateRuleTag = false;
    },
    openRuleTag() {
      this.addPowerInfoFlag = true;
    },
    // 重置
    resetRuleTag(search) {
      this.jurName = "";
      this.jurCode = "";
      this.search();
    },
    closeRuleTagDialog() {
      this.addPowerInfoFlag = false;
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
    AddPowerInfo,
    UpdatePowerInfo,
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




