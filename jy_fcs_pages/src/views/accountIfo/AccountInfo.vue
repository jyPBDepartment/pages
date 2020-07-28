
<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>账户管理</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 搜索筛选 -->
    <el-form :inline="true" class="user-search">
      <el-form-item label="搜索："></el-form-item>
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
        <el-button size="medium" type="text" icon="el-icon-search" @click="search" class="find">查询</el-button>
        <el-button
          size="medium"
          type="text"
          icon="el-icon-close"
          @click="resetForm('search')"
          class="small"
        >重置</el-button>
      </el-form-item>
      <br/>
      <el-row>
      <el-button size="medium" type="text" icon="el-icon-plus" @click="addAccountInfos()" class="insert">添加</el-button>
      </el-row>
      <br>
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
      <el-table-column type="index" label="序号" width="60" align="center"></el-table-column>
      <el-table-column sortable prop="name" label="账户名称" align="center"></el-table-column>
      <el-table-column sortable prop="phone" label="手机号码" align="center"></el-table-column>
      <el-table-column sortable prop="createDate" label="创建时间" align="center"></el-table-column>
      <el-table-column sortable prop="updateDate" label="修改时间" align="center"></el-table-column>
      <el-table-column sortable prop="createUser" label="创建人" align="center"></el-table-column>
      <el-table-column sortable prop="updateUser" label="修改人" align="center"></el-table-column>
      <el-table-column align="center" label="状态" prop="auditStatus">
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
      <el-table-column align="center" label="权限设置">
        <template slot-scope="scope">
           <el-button
           @click="openUpdatePower(scope)"
            type="text"
            size="medium"
            icon="el-icon-edit"
            class="insert"
          >权限设置</el-button>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="260px">
        <template slot-scope="scope">
           <el-button
           @click="openUpdateAccountInfo(scope)"
            type="text"
            size="medium"
            icon="el-icon-edit"
            class="up"
          >编辑</el-button>
           <el-button
           @click="deleteUser(scope)"
            type="text"
            size="medium"
            icon="el-icon-delete"
            class="del"
          >删除</el-button>
          <el-button
           @click="updatePass(scope)"
            type="text"
            size="medium"
            icon="el-icon-grape"
            class="insert"
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
      console.log(localStorage.getItem("userInfo"));
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
  background-color:#e6a23c;
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
.insert{
  width: 82px;
  background-color: #67c23a;
  border-color: #67c23a;
  color: #fff;
  font-size: 12px;
  margin-top: 4px;
}
.el-button.up {
  /* margin-right: 20px; */
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