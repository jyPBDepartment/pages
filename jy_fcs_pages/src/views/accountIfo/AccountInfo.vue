<template>
  <div>
    <!-- 面包屑导航 -->
    <!-- <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">账户管理</el-breadcrumb-item>
      <el-breadcrumb-item>账户管理</el-breadcrumb-item>
    </el-breadcrumb> -->
    <!-- 搜索筛选 -->
    <el-form :inline="true" class="user-search">
      <el-form-item label="账户名称">
        <el-input size="small" v-model="name" placeholder="输入账户名称"></el-input>
      </el-form-item>
      <el-form-item label="手机号码">
        <el-input size="small" v-model="phone" placeholder="输入手机号码"></el-input>
      </el-form-item>
      <el-form-item label="账户状态" prop="auditStatus">
          <el-select v-model="auditStatus" style="width:80%" size="small">
            <el-option
              v-for="item in auditStatusOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
      <el-form-item>
        <el-button size="small" type="warning" icon="el-icon-search" @click="search" >查询</el-button>
        <el-button
          size="small"
          type="info"
          icon="el-icon-close"
          @click="resetForm('search')"
        >重置</el-button>
      </el-form-item>
      <br/>
      <el-row>
        <el-button size="small" type="success" icon="el-icon-plus" @click="addAccountInfos()">添加</el-button>
      </el-row>
      <br>
    </el-form>
    <!--列表-->
    <el-table
      size="mini"
      :data="listData"
      highlight-current-row
      v-loading="loading"
      border
      element-loading-text="拼命加载中"
      style="width: 100%;"
    >
      <el-table-column type="index" label="序号" width="50" align="center"></el-table-column>
      <el-table-column prop="name" width="110" label="账户名称" align="center"></el-table-column>
      <el-table-column prop="phone" width="100" label="手机号码" align="center"></el-table-column>
      <el-table-column prop="createDate" width="150" label="创建时间" align="center"></el-table-column>
      <el-table-column prop="updateDate" width="150" label="修改时间" align="center"></el-table-column>
      <el-table-column prop="createUser" width="100" label="创建人" align="center"></el-table-column>
      <el-table-column prop="updateUser" width="100" label="修改人" align="center"></el-table-column>
      <el-table-column align="center" width="80" label="状态" prop="auditStatus">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.auditStatus"
            active-value="0"
            inactive-value="1"
            active-color="#13ce66"
            inactive-color="#ff4949"
            @change="accountInfoEnable(scope)"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column align="center" label="权限设置" >
        <template slot-scope="scope">
           <el-button
           @click="openUpdatePower(scope)"
            type="success"
            size="small"
            icon="el-icon-s-tools"
          >权限设置</el-button>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="300px">
        <template slot-scope="scope">
           <el-button
           @click="openUpdateAccountInfo(scope)"
            type="primary"
            size="small"
            icon="el-icon-edit"
          >编辑</el-button>
           <el-button
           @click="deleteUser(scope)"
            type="danger"
            size="small"
            icon="el-icon-delete"
          >删除</el-button>
          <el-button
           @click="updatePass(scope)"
            type="success"
            size="small"
            icon="el-icon-grape"
          >修改密码</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页组件 -->
    <Pagination v-bind:child-msg="formInline" @callFather="callFather"></Pagination>
    <add-account-info :show="addAccountInfo" title="添加" @close="closeAccountInfoDialog" @save="saveAccountInfo"></add-account-info>
    <update-accountInfo
      :show="updateAccountInfoFlag"
      :transAccountInfoId="transAccountInfoId"
      title="修改"
      @close="closeUpdateAccountInfoDialog"
      @save="upAccountInfo"
    ></update-accountInfo>
    <update-password
      :show="updatePasswordFlag"
      :transPasswordId="transPasswordId"
      title="修改密码"
      @close="closeUpdatePasswordDialog"
      @save="upPassword"
    ></update-password>
    <update-power
      :show="updatePowerFlag"
      :transPowerId="transPowerId"
      title="权限设置"
      @close="closeUpdatePowerDialog"
      @save="upPower"
    ></update-power>
  </div>
</template>

<script>
import Pagination from "../../components/Pagination";
//后台路径引用
import ApiPath from "@/api/ApiPath.js";
//数据请求交互引用
import api from "@/axios/api.js";
import AddAccountInfo from "./addAccountInfo";
import UpdateAccountInfo from "./updateAccountInfo";
import UpdatePassword from "./updatePassword"
import UpdatePower from "./updatePower"
export default {
  inject: ["reload"],
  data() {
    return {
      name: "",
      phone:"",
      auditStatus:"",
      updateUser:"",
      nshow: true, //switch开启
      fshow: false, //switch关闭
      loading: false, //是显示加载
      editFormVisible: false, //控制编辑页面显示与隐藏
      menuAccessshow: false, //控制数据权限显示与隐藏
      addAccountInfo: false,
      updateAccountInfoFlag: false,
      updatePasswordFlag:false,
      transAccountInfoId: "",
      transPasswordId:"",
      transPowerId:"",
      updatePowerFlag:false,
      formInline: {
        page: 1,
        limit: 10,
        varLable: "",
        varName: "",
        currentPage: 1,
        pageSize: 10,
        total: 10,
        token: localStorage.getItem("logintoken")
      },
      userparm: [], //搜索权限
      listData: [], //用户数据
      // 数据权限
      AccountInfoRight: [],
      AccountInfoRightProps: {
        children: "children",
        label: "name"
      },
      //参数accountInfo
      saveAccountInfoId: "",
      auditStatusOptions: [
        { value: "", label: "全部" },
        { value: "0", label: "启用" },
        { value: "1", label: "禁用" }
      ],
    };
  },
  // 注册组件
  components: {
    AddAccountInfo,
    UpdateAccountInfo,
    Pagination,
    UpdatePassword,
    UpdatePower
  },
  watch: {},
  mounted() {
  },
  created() {
    this.search(this.formInline);
  },
  methods: {
    // 分页插件事件
    callFather(parm) {
      this.formInline.page = parm.currentPage;
      this.formInline.limit = parm.pageSize;
      this.search(this.formInline);
    },
    // 获取角色列表
    search: function(parameter) {
      let params = {
        name: this.name,
        phone:this.phone,
        auditStatus:this.auditStatus,
        page: this.formInline.page,
        size: this.formInline.limit
      };
      api.testAxiosGet(ApiPath.url.accountInfoSearch, params).then(res => {
        let code = res.status;
        if (code == "0") {
          this.loading = false;
          this.listData = res.data.content;
          this.formInline.currentPage = res.data.number + 1;
          this.formInline.pageSize = res.data.size;
          this.formInline.total = res.data.totalElements;
        }
      });
    },
    saveAccountInfo() {
      this.addAccountInfo = false;
    },
    closeAccountInfoDialog() {
      this.addAccountInfo = false;
    },
    addAccountInfos() {
      this.addAccountInfo = true;
    },
    closeUpdateAccountInfoDialog() {
      this.updateAccountInfoFlag = false;
    },
    upAccountInfo() {
      this.updateAccountInfoFlag = false;
    },
    closeUpdatePasswordDialog() {
      this.updatePasswordFlag = false;
    },
    upPassword() {
      this.updatePasswordFlag = false;
    },
    closeUpdatePowerDialog() {
      this.updatePowerFlag = false;
    },
    upPower() {
      this.updatePowerFlag = false;
    },
    
    //启用/禁用
    accountInfoEnable: function(scope) {
      let params = {
        id: scope.row.id,
        auditStatus: scope.row.auditStatus,
        updateUser:scope.row.updateUser
      };
      api.testAxiosGet(ApiPath.url.accountInfoEnable, params).then(res => {
        let code = res.status;
        if (code == "0") {
          this.$message.success(res.message);
        } else {
          this.$message.success(res.message);
        }
        this.reload();
      }).catch(function(error) {});
      this.updateUser =localStorage.getItem("userInfo");
    },
    //显示编辑界面
    openUpdateAccountInfo(scope) {
      this.transAccountInfoId = scope.row.id;
      this.updateAccountInfoFlag = true;
    },
    updatePass(scope) {
      this.transPasswordId = scope.row.id;
      this.updatePasswordFlag = true;
    },
    openUpdatePower(scope) {
      this.transPowerId = scope.row.id;
      this.updatePowerFlag = true;
    },
    //重置
    resetForm(search) {
      this.name = "";
      this.phone="",
      this.auditStatus="",
      location.reload();
    },
    // 删除
    deleteUser(scope) {
      this.$confirm("确定要删除吗?", "信息", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        let params = {
          id: scope.row.id,
          };
        api.testAxiosGet(ApiPath.url.deleteAccountInfo, params).then(res => {
          let code = res.status;
          if(code == "0") {
            this.$message.success(res.message);
            this.reload();
          }
        });
      });
    }
  }
};
</script>

<style scoped>
.user-search {
  margin-top: 20px;
}
.userAccountInfo {
  width: 100%;
}
</style>