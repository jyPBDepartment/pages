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
          placeholder="请输入权限名称"
          class="el-input el-input--small"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="权限编码">
        <el-input
          v-model="jurCode"
          type="text"
          placeholder="请输入权限编码"
          class="el-input el-input--small"
          clearable
        ></el-input>
      </el-form-item>
      <el-button type="text" @click="search" size="medium" class="find" icon="el-icon-search">查询</el-button>
      <el-button
        type="text"
        @click="resetRuleTag(search)"
        size="medium"
        class="small"
        icon="el-icon-close"
      >重置</el-button>
      <el-row>
        <el-button
          type="text"
          @click="openRuleTag"
          size="medium"
          class="insert"
          icon="el-icon-plus"
        >新建</el-button>
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
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
    >
      <el-table-column sortable prop="jurName" label="权限名称" align="center" style="width:40px;"></el-table-column>
      <!-- <el-table-column sortable prop="subId" label="上级分类" align="center"></el-table-column> -->

      <el-table-column
        sortable
        prop="jurCode"
        label="权限编码"
        align="center"
      ></el-table-column>
      <!-- switch开关（表单）
      <el-table-column align="center" sortable prop="auditStatus" label="状态" min-width="50">
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
      </el-table-column> -->
       <!--switch开关（表单）-->
      <el-table-column align="center" sortable prop="auditStatus" label="状态" min-width="50">
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

      <el-table-column prop="createDate" label="创建时间" align="center"></el-table-column>
      <el-table-column prop="updateDate" label="修改时间" align="center"></el-table-column>
       <el-table-column sortable prop="createUser" label="创建人" align="center" style="width:40px;"></el-table-column>
      <el-table-column sortable prop="updateUser" label="修改人" align="center" style="width:40px;"></el-table-column>
      <el-table-column fixed="right" label="操作" width="220px" align="center">
        <template slot-scope="scope">
          <el-button
            @click="openUpdateDialog(scope)"
            class="up"
            type="text"
            size="medium"
            icon="el-icon-edit"
          >修改</el-button>
          <el-button
            @click="deletePowerInfo(scope)"
            class="del"
            type="text"
            size="medium"
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
    powerInfoEnable: function(scope) {
      let params = {
        id: scope.row.id,
        auditStatus: scope.row.auditStatus
      };
      api
        .testAxiosGet(ApiPath.url.powerInfoEnable, params)
        .then(res => {
          let code = res.state;
          if (code == "1") {
            this.$message.success(res.message);
          } else {
            this.$message.success(res.message);
          }
           this.reload();
        })
        .catch(function(error) {});
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

    deletePowerInfo: function (scope) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          let params = {
            id: scope.row.id,
          };
          api
            .testAxiosGet(ApiPath.url.deletePowerInfo, params)
            .then((res) => {
              let code = res.status;

              if (code == "0") {
                this.$message({
                  type: "success",
                  message: "删除成功!",
                });
                this.reload();
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

    resetRuleTag(search) {
      this.jurName = "";
      this.jurCode = "";
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

    deleteRuleTag(scope) {
      let tagCode = scope.row.tagCode;
      let params = {
        tagcode: tagCode,
      };
      api.testAxiosPost(ApiPath.url.deleteRuleTag, params).then((res) => {
        let code = res.code;
        if (code == "success") {
          alert("删除成功");
          this.$router.push("ruleTag");
        } else {
          alert(res.message);
        }
      });
    },
    updateRuleTagStatus(scope) {
      let tagcode = scope.row.tagCode;
      api
        .testAxiosPost(ApiPath.url.updateRuleTagStatus, tagCode)
        .then((res) => {});
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
.el-tooltip__popper {
  font-size: 14px;
  max-width: 150px;
}
.template {
  size: medium;
  color: rgb(17, 17, 17);
  background-color: rgb(199, 215, 231);
  border-color: rgb(121, 212, 59);
  border-radius: 3px;
}
.el-button {
  display: inline-block;
  cursor: pointer;
  text-align: center;
  outline: none;
  color: #fff;
  border-radius: 15px;
  box-shadow: 0 6px #999;
}
.el-button:active {
  box-shadow: 0 5px #666;
  transform: translateY(4px);
}
.el-button.el-button--small {
  background-color: #409eff;
  border-color: #409eff;
  color: #fff;
  font-size: 12px;
  margin-top: 4px;
}
.find {
  width: 82px;
  background-color: #e6a23c;
  color: #fff;
  border-color: #e6a23c;
  font-size: 12px;
}
.small {
  width: 82px;
  background-color: #909399;
  border-color: #909399;
  color: #fff;
  font-size: 12px;
  margin-top: 4px;
}
.insert {
  width: 82px;
  background-color: #67c23a;
  border-color: #67c23a;
  color: #fff;
  font-size: 12px;
  margin-top: 4px;
}
.el-button.up {
  margin-right: 20px;
  width: 50px;
  background-color: #409eff;
  border-color: #409eff;
  color: #fff;
  font-size: 12px;
}
.el-button.del {
  width: 50px;
  background-color: #f56c6c;
  border-color: #f56c6c;
  color: white;
  font-size: 12px;
}
</style>




