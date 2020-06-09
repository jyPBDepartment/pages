/**
 * 门户菜单 管理员管理
 */
<template>
    <div class="adminFunction">
          <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>管理员管理</el-breadcrumb-item>
    </el-breadcrumb>
    <br>
    <!-- 查询条件 -->
    <el-form :inline="true" class="demo-form-inline">
       <el-form-item label="搜索："></el-form-item>
      <el-form-item label="登录名称" >
        <el-input v-model="loginName" type="text" placeholder="请输入登录名称" class="el-input el-input--small" clearable ></el-input>
      </el-form-item>
      <el-button type="info" plain @click="search" size="medium" class="el-button el-button--primary el-button--small" style="background-color:#409EFF;border-color:#409EFF;color:#FFF;font-size:12px;margin-top:4px;" icon="el-icon-search" >查询</el-button>
       <el-button type="info" plain @click="resetRuleTag(search)"  size="medium" class="el-button el-button--primary el-button--small" style="background-color:#409EFF;border-color:#409EFF;color:#FFF;font-size:12px;margin-top:4px;" icon="el-icon-close">重置</el-button>
        <el-row>
           <el-button type="info" plain @click="openRuleTag"  size="medium" class="el-button el-button--primary el-button--small" style="background-color:#409EFF;border-color:#409EFF;color:#FFF;font-size:12px;" icon="el-icon-plus">新增</el-button>
        </el-row>
    </el-form>

    <!-- 展示的表单 -->
    <el-table :data="tableData" border style="width: 100%;"  highlight-current-row>
      <el-table-column type="index" label="序号"  align="center" style="width:40px;"></el-table-column>
      <el-table-column sortable prop="loginName" label="登录名称" align="center" style="width:40px;"></el-table-column>
      <el-table-column sortable prop="password" label="密码" align="center"></el-table-column>
      <el-table-column sortable prop="roleName" label="角色" align="center"></el-table-column>
      <el-table-column sortable prop="createDateTime" label="创建时间" align="center">
        <template slot-scope="scope">
          <div>{{scope.row.createDateTime|timestampToTime}}</div>
        </template>
      </el-table-column>
       <el-table-column sortable prop="updateTime" label="修改时间" align="center">
        <template slot-scope="scope">
          <div>{{scope.row.updateTime|timestampToTime}}</div>
        </template>
      </el-table-column>
     <el-table-column fixed="right" label="操作" width="220px" align="center">
        <template slot-scope="scope">
           <el-button @click="openUpdateDialog(scope)" type="text" size="medium" style="width:50px;background-color:white;border-color:#DCDFE6;color:black;font-size:12px" icon="el-icon-edit">编辑</el-button>
          <el-button @click="deleteAdmin(scope)" type="text" size="medium" style="width:50px;background-color:#84C1FF;border-color:#84C1FF;color:white;font-size:12px" icon="el-icon-delete">删除</el-button>
         
       </template>
   </el-table-column>
  </el-table>
    <!-- 分页组件 -->
    <Pagination v-bind:child-msg="pageparm" @callFather="callFather"></Pagination>
    <br />
    <br />
<add-admin :show="addAdminFlag" title="添加管理员信息"  @close="closeRuleTagDialog" @save="saveRuleTag"></add-admin> 

 <update-admin
      :show="updateAdminFlag"
      :transAdminId="transAdminId"
      title="修改"
      @close="closeUpdateAdminDialog"
      @save="updateAdmin"
    ></update-admin>
    
    </div>
    
</template>

<script>
import qs from "qs";
import Vue from "vue";
import ApiPath from "@/api/ApiPath";
import api from "@/axios/api";
import AddAdmin from "./addAdmin.vue";
import UpdateAdmin from "./updateAdmin.vue";
import Pagination from "../../components/Pagination";

export default {
  inject: ["reload"],
  props: {
    show: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: "对话框"
    }
  },

  data() {
    return {
      loginName: "",
      
      updateAdminFlag: false,
      
      transAdminId: "",
      
      transTagCode: "",
      tagCode: "",
      tagName: "",
      localShow: this.show,
      addAdminFlag: false,
     
      updateRuleTag: false,
      mainBodyCode: "",
      tableData: [],
      formInline: {
        page: 1,
        limit: 10,
        varLable: "",
        varName: "",
        token: localStorage.getItem("logintoken")
      },
      pageparm: {
        currentPage: 1,
        pageSize: 10,
        total: 10
      }
    };
  },

  watch: {
    show(val) {
      this.localShow = val;
    }
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
    search: function(parameter) {
      let params = {
        loginName: this.loginName,
       
        page: this.formInline.page,
        size: this.formInline.limit
      };
      api
        .testAxiosGet(ApiPath.url.searchAdmin, params)
        .then(res => {
          let code = res.status;
          if (code == "0") {

              console.log(res.data.content)
           this.tableData = res.data.content;
            this.pageparm.currentPage = res.data.number + 1;
            this.pageparm.pageSize = res.data.size;
            this.pageparm.total = res.data.totalElements;

          } else {
          }
        })
        .catch(function(error) {
        });
    },
    

    closeUpdateAdminDialog: function() {
      this.updateAdminFlag = false;
    },
    updateAdmin: function() {},
    
    deleteAdmin: function(scope) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let params = {
            id: scope.row.id
          };
          api.testAxiosGet(ApiPath.url.deleteAdmin, params).then(res => {
            let code = res.status;

            if (code == "0") {
              this.$message({
                type: "success",
                message: "删除成功!"
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
            message: "已取消删除"
          });
        });
    },
    onSubmit: function() {
      let params = {
        tagCode: this.tagCode,
        chName: this.tagName,

        generateType: "gz"
      };
    },
    openUpdateDialog(scope) {
      this.transAdminId = scope.row.id;
      this.updateAdminFlag = true;
    },
    saveRuleTag() {
      this.addAdminFlag = false;
    },
    
    modifyRuleTag() {
      this.updateRuleTag = false;
    },
    openRuleTag() {
      this.addAdminFlag = true;
    },
    
    resetRuleTag(search) {
      this.loginName = "";
     
    },
    closeRuleTagDialog() {
      this.addAdminFlag = false;
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
        tagcode: tagCode
      };
      api.testAxiosPost(ApiPath.url.deleteRuleTag, params).then(res => {
        console.log(res);
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
      api.testAxiosPost(ApiPath.url.updateRuleTagStatus, tagCode).then(res => {
        console.log(res);
      });
    },
    maunalRun(scope) {
      let tagcode = scope.row.tagCode;
      api.testAxiosPost(ApiPath.url.maunalRun, tagCode).then(res => {
        console.log(res);
      });
    }
  },
  components: {
    AddAdmin,
    UpdateAdmin,
    
    Pagination
  }
};
</script>

<style scoped >
.el-table{
  background-color:#FFF
}
.el-row {
  margin-top: 2px;
  margin-bottom: 6px;
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
</style>




