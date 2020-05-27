<template>
    <div class="organFunction">
          <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>机构管理</el-breadcrumb-item>
    </el-breadcrumb>
    <br>
    
    <!-- 查询条件 -->
    <el-form :inline="true" class="demo-form-inline">
       <el-form-item label="搜索："></el-form-item>
      <el-form-item label="机构名称" >
        <el-input v-model="name" type="text" placeholder="请输入机构名称" class="el-input el-input--small" clearable ></el-input>
      </el-form-item>
      <el-form-item label="上级机构">
        <el-input v-model="superId" type="text" placeholder="请输入上级机构" class="el-input el-input--small" clearable ></el-input>
      </el-form-item>
  
      <el-button type="info" plain @click="search" size="medium" class="el-button el-button--primary el-button--small" style="background-color:#409EFF;border-color:#409EFF;color:#FFF;font-size:12px;margin-top:4px;" icon="el-icon-search" >查询</el-button>
       <el-button type="info" plain @click="resetRuleTag(search)"  size="medium" class="el-button el-button--primary el-button--small" style="background-color:#409EFF;border-color:#409EFF;color:#FFF;font-size:12px;margin-top:4px;" icon="el-icon-close">重置</el-button>
      
        <el-row>
           <el-button type="info" plain @click="openRuleTag"  size="medium" class="el-button el-button--primary el-button--small" style="background-color:#409EFF;border-color:#409EFF;color:#FFF;font-size:12px;margin-top:-7px;margin-bottom: 14px;" icon="el-icon-plus">新增</el-button>
        </el-row>
    </el-form>
   
    
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column type="index" label="序号" width="60" align="center"></el-table-column>
      
      <el-table-column sortable prop="name" label="机构名称" align="center"></el-table-column>
      <el-table-column sortable prop="superId" label="上级机构" align="center"></el-table-column>
      
      <el-table-column sortable prop="createTime" label="创建时间" align="center"></el-table-column>
      <el-table-column sortable prop="updateTime" label="修改时间" align="center"></el-table-column>
      <el-table-column :show-overflow-tooltip="true" sortable prop="context" label="备注" align="center" ></el-table-column>
      <!--switch开关（表单）-->
       <el-table-column align="center"  label="状态" min-width="50">
        <template slot-scope="scope">
          <el-switch
            v-if="scope.row.state==0"
            v-model="nshow"
            active-color="#0080FF"
            inactive-color="#84C1FF"
            @change="organEnable(scope)"
          ></el-switch>
          <el-switch
            v-else
            v-model="fshow"
            active-color="#00BFFF"
            inactive-color="#84C1FF"
            @change="organEnable(scope)"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="220px" align="center">
        <template slot-scope="scope">
          <el-button @click="openUpdateDialog(scope)" type="text" size="medium" style="width:50px;background-color:white;border-color:#DCDFE6;color:black;font-size:12px">编辑</el-button>
          <el-button @click="deleteOrgan(scope)" type="text" size="medium" style="width:50px;background-color:#84C1FF;border-color:#84C1FF;color:white;font-size:12px">删除</el-button>
       </template>
   </el-table-column>
    </el-table>
    <!-- 分页组件 -->
    <Pagination v-bind:child-msg="pageparm" @callFather="callFather"></Pagination>
    <br />
    <br />
<add-organ :show="addOrganFlag" title="添加机构信息"  @close="closeRuleTagDialog" @save="saveRuleTag"></add-organ>
 <update-organ
      :show="updateOrganFlag"
      :transOrganId="transOrganId"
      title="修改"
      @close="closeUpdateOrganDialog"
      @save="updateOrgan"
    ></update-organ>
    </div>
</template>

<script>
import qs from "qs";
import Vue from "vue";
import ApiPath from "@/api/ApiPath";
import api from "@/axios/api";
import AddOrgan from "./addOrgan.vue";
import UpdateOrgan from "./updateOrgan.vue";
import Pagination from "../../components/Pagination";

export default {
 inject:['reload'],
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
      nshow: true, //switch开启
      fshow: false, //switch关闭
      name: "",
      superId: "",
      updateOrganFlag: false,

      transOrganId: "",

      transTagCode: "",
      tagCode: "",
      tagName: "",

      localShow: this.show,
      addOrganFlag: false,
      updateRuleTag: false,
      mainBodyCode: "",
      tableData: [
        
      ],
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
      },
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
        name: this.name,
        superId: this.superId,
        page: this.formInline.page,
        size: this.formInline.limit
      };
      api
        .testAxiosGet(ApiPath.url.searchOrgan, params)
        .then(res => {
          let code = res.status;
          if (code == "0") {
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
    closeUpdateOrganDialog: function() {
      this.updateOrganFlag = false;
    },
    updateOrgan: function() {},
    //switch开关
    organEnable: function(scope) {
      let params = {
        id: scope.row.id,
        state: scope.row.state
      };
      api.testAxiosGet(ApiPath.url.organEnable, params).then(res => {
        let code = res.status;

        if (code == "0") {
          this.$message.success(res.message);
         
        } else {
          this.$message.success(res.message);
        }
        this.reload();
      });
     
    },
    deleteOrgan: function(scope) {

       this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
             let params = {
        id: scope.row.id
      };
       api.testAxiosGet(ApiPath.url.deleteOrgan, params).then(res => {
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
      console.log(scope);
      this.transOrganId = scope.row.id;
      this.updateOrganFlag = true;
    },
    saveRuleTag() {
      this.addOrganFlag = false;
    },
    modifyRuleTag() {
      this.updateRuleTag = false;
    },
    openRuleTag() {
      this.addOrganFlag = true;
    },
    
    resetRuleTag(search) {
      this.name = "";
      this.superId="";
    },
    closeRuleTagDialog() {
      this.addOrganFlag = false;
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
    AddOrgan,
    UpdateOrgan,
    Pagination
  }
};
</script>

<style >
.el-form-item {
  font-size: 14px;
}
.el-tooltip__popper{
  font-size: 14px; 
  max-width:150px;
}
.template {
  size: medium;
  color: rgb(17, 17, 17);
  background-color: rgb(199, 215, 231);
  border-color: rgb(121, 212, 59);
  border-radius: 3px;
}
</style>


