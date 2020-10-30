<template>
  <div class="power-container">
    <!-- 查询条件 -->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="权限名称">
        <el-input
          v-model="jurName"
          type="text"
          :maxlength="10"
          placeholder="请输入权限名称"
          size="small"
          style="width: 200px"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="权限编码">
        <el-input
          v-model="jurCode"
          type="text"
          :maxlength="10"
          placeholder="请输入权限编码"
          size="small"
          style="width: 200px"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="small" icon="el-icon-search">
          查询
        </el-button>
        <el-button type="info" size="small" icon="el-icon-close">
          重置
        </el-button>
      </el-form-item>

      <el-row>
        <el-button
          type="primary"
          size="small"
          @click="openRuleTag"
          icon="el-icon-plus"
          >添加</el-button
        >
      </el-row>
    </el-form>

    <!-- 展示的表单 -->
    <el-table
      :data="tableData"
      border
      style="width: 100%"
      highlight-current-row
      row-key="id"
      default-expand-all
      size="mini"
    >
      <el-table-column
        prop="jurCode"
        label="权限编码"
        align="center"
        min-width="10%"
      ></el-table-column>
      <el-table-column
        prop="jurName"
        label="权限名称"
        align="center"
        min-width="10%"
      ></el-table-column>
      <!--switch开关（表单）-->
      <el-table-column
        align="center"
        prop="auditStatus"
        label="状态"
        min-width="6%"
      >
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
      <el-table-column
        sortable
        prop="createDate"
        label="创建时间"
        align="center"
        min-width="12%"
      ></el-table-column>
      <el-table-column
        sortable
        prop="updateDate"
        label="修改时间"
        align="center"
        min-width="12%"
      ></el-table-column>
      <el-table-column
        prop="createUser"
        label="创建人"
        align="center"
        min-width="8%"
      ></el-table-column>
      <el-table-column
        prop="updateUser"
        label="修改人"
        align="center"
        min-width="8%"
      ></el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        min-width="30%"
        align="center"
      >
        <template slot-scope="scope">
          <el-button
            @click="openUpdateDialog(scope)"
            type="primary"
            size="small"
            icon="el-icon-edit"
            >编辑</el-button
          >
          <el-button
            @click="deletePowerInfo(scope)"
            type="danger"
            size="small"
            icon="el-icon-delete"
            >删除</el-button
          >
          <el-button
            type="success"
            size="small"
            @click="(table = true), check(scope)"
            icon="el-icon-view"
            style="width: 71px; padding-left: 7px"
            >子菜单</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <el-drawer
      title="查看子菜单"
      :visible.sync="table"
      direction="rtl"
      size="69%"
    >
      <el-table
        :data="gridData"
        border
        highlight-current-row
        row-key="id"
        default-expand-all
        size="mini"
        style="height: 100%"
      >
        <el-table-column
          prop="jurCode"
          label="权限编码"
          align="center"
          min-width="6%"
        ></el-table-column>
        <el-table-column
          prop="jurName"
          label="权限名称"
          align="center"
          min-width="6%"
        ></el-table-column>
        <!--switch开关（表单）-->
        <el-table-column
          align="center"
          prop="auditStatus"
          label="状态"
          min-width="5%"
        >
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
        <el-table-column
          sortable
          prop="createDate"
          label="创建时间"
          align="center"
          min-width="10%"
        ></el-table-column>
        <el-table-column
          sortable
          prop="updateDate"
          label="修改时间"
          align="center"
          min-width="10%"
        ></el-table-column>
        <el-table-column
          prop="createUser"
          label="创建人"
          align="center"
          min-width="6%"
        ></el-table-column>
        <el-table-column
          prop="updateUser"
          label="修改人"
          align="center"
          min-width="6%"
        ></el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          min-width="18%"
          align="center"
        >
          <template slot-scope="scope">
            <el-button
              @click="openUpdateDialog(scope)"
              class="up"
              type="primary"
              size="small"
              icon="el-icon-edit"
              >编辑</el-button
            >
            <el-button
              @click="deletePowerInfo(scope)"
              class="del"
              type="danger"
              size="small"
              icon="el-icon-delete"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-drawer>
  </div>
</template>

<script  >
import qs from "qs";
import Vue from "vue";

export default {
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
      jurName: "",
      jurCode: "",
      subJurCode: "",
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
      gridData: [],
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
    powerInfoEnable: function (scope) {},
    //分页赋值
    callFather(parm) {
      this.formInline.page = parm.currentPage;
      this.formInline.limit = parm.pageSize;
      this.search(this.formInline);
    },
    //子菜单查询方法
    check: function (scope) {
      let params = {
        id: scope.row.id,
      };
    },
    //查询方法
    search: function (parameter) {
      if (parameter == "manual") {
        this.formInline.page = 1;
        this.formInline.limit = 10;
      }
      let params = {
        jurName: this.jurName,
        jurCode: this.jurCode,
        page: this.formInline.page,
        size: this.formInline.limit,
      };
    },

    closeUpdatePowerInfoDialog: function () {
      this.updatePowerInfoFlag = false;
      this.search(this.formInline);
    },
    updatePowerInfo: function () {},
    //删除
    deletePowerInfo(scope) {},
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
      this.formInline.page = 1;
      this.formInline.limit = 10;
      this.search(this.formInline);
    },
    closeRuleTagDialog() {
      this.addPowerInfoFlag = false;
      this.search(this.formInline);
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
    },
  },
  components: {},
};
</script>

<style scoped lang="scss">
.power-container {
  font-size: 14px;
}
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
  margin-left: 10px;
}
</style>