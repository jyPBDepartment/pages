/**
 * 系统管理  权限管理
 */
<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 搜索筛选 -->
    <el-form :inline="true" class="user-search">
      <el-form-item label="搜索：">
        <el-input size="small" v-model="name" placeholder="输入权限名称"></el-input>
      </el-form-item>
      <el-form-item label="权限类型">
        <el-select v-model="type" size="small">
          <el-option
            v-for="item in typeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <!-- <el-form-item label="角色：">
        <el-select size="small" v-model="roleId" placeholder="请选择">
          <el-option selected label="请选择" value="0"></el-option>
          <el-option v-for="parm in userparm" :key="parm.roleId" :label="parm.roleName" :value="parm.roleId"></el-option>
        </el-select>
      </el-form-item>-->
      <el-form-item>
        <el-button size="small" type="primary" icon="el-icon-search" @click="search">搜索</el-button>
        <el-button
          size="small"
          type="primary"
          icon="el-icon-remove-outline"
          @click="resetForm('search')"
        >重置</el-button>
        <el-button size="small" type="primary" icon="el-icon-plus" @click="addJurisdiction()">添加</el-button>
        <!-- <el-button size="small" type="primary" icon="el-icon-plus" @click="RolePermission()">配置权限</el-button> -->
      </el-form-item>
    </el-form>
    <!--列表-->
    <el-table
      size="small"
      :data="listData"
      highlight-current-row
      v-loading="loading"
      border
      element-loading-text="拼命加载中"
      style="width: 100%;"
    >
      <el-table-column align="center" type="selection" width="60"></el-table-column>
      <el-table-column type="index" label="序号" width="60" align="center"></el-table-column>
      <el-table-column prop="id" label="ID" align="center" width="300"></el-table-column>
      <el-table-column sortable prop="name" label="权限名称" align="center" width="150"></el-table-column>
      <el-table-column sortable prop="type" label="权限类型" align="center" width="200">
        <template slot-scope="scope">
          <span v-if="scope.row.type== 0">超级</span>
          <span v-if="scope.row.type== 1">高级</span>
          <span v-if="scope.row.type== 2">普通</span>
        </template>
      </el-table-column>
      <el-table-column sortable prop="path" label="权限路径" align="center" width="200"></el-table-column>
      <el-table-column sortable prop="editTime" label="修改时间" align="center" width="200">
        <template slot-scope="scope">
          <div>{{scope.row.editTime|timestampToTime}}</div>
        </template>
      </el-table-column>
      <el-table-column sortable prop="editUser" label="修改人" align="center" width="150"></el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="openupdateJurisdiction(scope)">编辑</el-button>
          <el-button size="mini" type="danger" @click="deleteUser(scope)">删除</el-button>
          <el-button
            @click="jurisdictionEnable(scope)"
            type="primary"
            size="small"
          >{{scope.row.state == 0 ? "禁用" : scope.row.state == 1 ? "启用" : "解锁"}}</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页组件 -->
    <Pagination v-bind:child-msg="pageparm" @callFather="callFather"></Pagination>
    <!-- <page-helper @jumpPage="jumpPage" :page-number="pageNumber" page-size-array="PageSizeArray"></page-helper> -->
    <add-jurisdiction
      :show="addJusisdic"
      title="添加"
      @close="closeJurisdictionDialog"
      @save="saveJurisdiction"
    ></add-jurisdiction>
    <update-jurisdiction
      :show="updatejurFlag"
      :transJurisdictionId="transJurisdictionId"
      title="修改"
      @close="closeUpdateJurisdictionDialog"
      @save="upjurisdiction"
    ></update-jurisdiction>
  </div>
</template>

<script>
import {
  permissionList,
  ermissionSave,
  ermissionDelete,
  roleDropDown,
  RolePermission
} from "../../api/userMG";
import Pagination from "../../components/Pagination";
//后台路径引用
import ApiPath from "@/api/ApiPath.js";
//数据请求交互引用
import api from "@/axios/api.js";
import AddJurisdiction from "./addJurisdiction";
import UpdateJurisdiction from "./UpdateJurisdiction";

export default {
  inject: ["reload"],
  data() {
    return {
      name: "",
      type: "",
      typeOptions: [
        { value: "-1", label: "请选择" },
        { value: "0", label: "超级" },
        { value: "1", label: "高级" },
        { value: "2", label: "普通" }
      ],
      //roleId:"",
      nshow: true, //switch开启
      fshow: false, //switch关闭
      loading: false, //是显示加载
      editFormVisible: false, //控制编辑页面显示与隐藏
      addJusisdic: false,
      updatejurFlag: false,
      transJurisdictionId: "",
      formInline: {
        page: 1,
        limit: 10,
        varLable: "",
        varName: "",
        token: localStorage.getItem("logintoken")
      },
      // 删除
      seletedata: {
        ids: "",
        token: localStorage.getItem("logintoken")
      },
      // 选择数据
      selectdata: [],
      userparm: [], //搜索权限
      listData: [], //用户数据
      // 分页参数
      pageparm: {
        currentPage: 1,
        pageSize: 10,
        total: 10
      }
    };
  },
  // 注册组件
  components: {
    AddJurisdiction,
    UpdateJurisdiction,
    Pagination
  },
  /**
   * 数据发生改变
   */

  watch: {},

  /**
   * 创建完毕
   */

  created() {
    this.search(this.formInline);
  },

  /**
   * 里面的方法只有被调用才会执行
   */

  methods: {
    // 分页插件事件
    callFather(parm) {
      this.formInline.page = parm.currentPage;
      this.formInline.limit = parm.pageSize;
      this.search(this.formInline);
    },
    // 获取数据方法
    search: function(parameter) {
      let params = {
        name: this.name,
        path: this.path,
        type: this.type,
        page: this.formInline.page,
        size: this.formInline.limit
      };
      api
        .testAxiosGet(ApiPath.url.jurisdictionSearch, params)
        .then(res => {
          let code = res.status;
          if (code == "0") {
            this.$message.success(res.message);
            this.loading = false;
            this.listData = res.data.content;
            this.pageparm.currentPage = res.data.number + 1;
            this.pageparm.pageSize = res.data.size;
            this.pageparm.total = res.data.totalElements;
            // this.search(this.formInline);
          } else {
            this.$message.error(res.message);
          }
        })
        .catch(err => {
          this.$message.error(err.data);
        });
    },
    //获取权限
    getAccsee() {
      roleDropDown()
        .then(res => {
          if (res.success == false) {
            this.$message({
              type: "info",
              message: res.msg
            });
          } else {
            this.userparm = res.data;
          }
        })
        .catch(err => {
          this.$message.error("权限获取失败，请稍后再试！");
        });
    },

    resetForm(search) {
      this.name = "";
      this.type = "-1";
    },
    addJurisdiction() {
      this.addJusisdic = true;
    },
    closeJurisdictionDialog() {
      this.addJusisdic = false;
    },
    saveJurisdiction() {
      this.addJusisdic = false;
    },
    closeUpdateJurisdictionDialog() {
      this.updatejurFlag = false;
    },
    upjurisdiction(scope) {
      this.updatejurFlag = false;
    },
    jurisdictionEnable(scope) {
      let params = {
        id: scope.row.id,
        state: scope.row.state
      };
      api.testAxiosGet(ApiPath.url.jurisdictionEnable, params).then(res => {
        let code = res.status;
        //  let ty=res.state;
        if (code == "0") {
          this.$message.success(res.message);
        } else {
          this.$message.success(res.message);
        }
        this.reload();
      });
    },
    //显示编辑界面
    openupdateJurisdiction(scope) {
      console.log(scope);
      this.transJurisdictionId = scope.row.id;
      this.updatejurFlag = true;
    },
    // 编辑、增加页面保存方法
    submitForm(editData) {
      this.$refs[editData].validate(valid => {
        if (valid) {
          ermissionSave(this.editForm)
            .then(res => {
              this.editFormVisible = false;
              this.loading = false;
              if (res.success) {
                this.search(this.formInline);
                this.$message({
                  type: "success",
                  message: "权限管理保存成功！"
                });
              } else {
                this.$message({
                  type: "info",
                  message: res.msg
                });
              }
            })
            .catch(err => {
              this.editFormVisible = false;
              this.loading = false;
              this.$message.error("权限管理保存失败，请稍后再试！");
            });
        } else {
          return false;
        }
      });
    },
    // 删除权限
    deleteUser(scope) {
      this.$confirm("确定要删除吗?", "信息", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        let params = {
          id: scope.row.id
        };
        api.testAxiosGet(ApiPath.url.deleteJurisdiction, params).then(res => {
          let code = res.status;
          if (code == "0") {
            this.$message.success(res.message);
            this.reload();
          } else {
            this.$message.console.error();
          }
        });
      });
    },
    // 选择复选框事件
    selectChange(val) {
      this.selectdata = val;
    },
    // 配置权限
    RolePermission() {
      let parms = {
        roleId: "",
        id: ""
      };
      if (this.formInline.roleId == "0") {
        this.$message({
          type: "info",
          message: "请选择角色"
        });
        return false;
      }
      parms.roleId = this.formInline.roleId;
      let len = this.selectdata;
      let ids = [];
      if (len != 0) {
        for (let i = 0; i < len.length; i++) {
          ids.push(len[i].id);
        }
      }
      parms.id = ids.join(",");
      RolePermission(parms)
        .then(res => {
          if (res.success) {
            this.$message({
              type: "success",
              message: "配置权限成功！"
            });
            this.search(this.formInline);
          } else {
            this.$message({
              type: "info",
              message: res.msg
            });
          }
        })
        .catch(err => {
          this.loading = false;
          this.$message.error("配置权限失败,请稍后再试！");
        });
    },
    // 关闭编辑、增加弹出框
    closeDialog() {
      this.editFormVisible = false;
    }
  }
};
</script>

<style scoped>
.user-search {
  margin-top: 20px;
}
.userRole {
  width: 100%;
}
</style>

 