<template>
    <div class="salesFunction">
          <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>业务员管理</el-breadcrumb-item>
    </el-breadcrumb>
    <br>
    
    <!-- 查询条件 -->
    <el-form :inline="true" class="demo-form-inline">
       <el-form-item label="搜索："></el-form-item>
      <el-form-item label="姓名">
        <el-input v-model="name" type="text" placeholder="请输入姓名" ></el-input>
      </el-form-item>
      <el-form-item label="手机号码">
        <el-input v-model="phone" type="text" placeholder="请输入手机号码"></el-input>
      </el-form-item>
  
      <el-button type="info" plain @click="search" size="medium" style="background-color:#409EFF;border-color:#409EFF;color:#FFF;font-size:12px" icon="el-icon-search" >查询</el-button>
       <el-button type="info" plain @click="openRuleTag"  size="medium" style="background-color:#409EFF;border-color:#409EFF;color:#FFF;font-size:12px" icon="el-icon-plus">新增</el-button>
       <el-button type="info" plain @click="resetRuleTag(search)"  size="medium" style="background-color:#409EFF;border-color:#409EFF;color:#FFF;font-size:12px" icon="el-icon-delete">重置</el-button>
    </el-form>
   
    
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column type="index" label="序号" width="60" align="center"></el-table-column>
      <el-table-column prop="id" label="编号" align="center"></el-table-column>
      <el-table-column prop="name" label="姓名" align="center"></el-table-column>
      <el-table-column prop="phone" label="手机号码" align="center"></el-table-column>
      <el-table-column prop="organId" label="所属机构ID" align="center"></el-table-column>
      <el-table-column prop="createTime" label="创建时间" align="center"></el-table-column>
      <el-table-column prop="updateTime" label="修改时间" align="center"></el-table-column>
      <el-table-column prop="context" label="备注" align="center"></el-table-column>
      <el-table-column prop="state" label="状态" align="center"></el-table-column>      
      <el-table-column fixed="right" label="操作" width="150" align="center">
        <template slot-scope="scope">
          <el-button @click="openUpdateDialog(scope)" type="text" size="medium" style="width:50px;background-color:white;border-color:#DCDFE6;color:black;font-size:12px">修改</el-button>
          <el-button @click="deleteSales(scope)" type="text" size="medium" style="width:50px;background-color:#F56C6C;border-color:#F56C6C;color:white;font-size:12px">删除</el-button>
         
        </template>
      </el-table-column>
    </el-table>
     <!-- 分页组件 -->
    <Pagination v-bind:child-msg="pageparm" @callFather="callFather"></Pagination>
    <br />
    <br />
   

    
<add-sales :show="addSalesFlag" title="添加业务员信息" @close="closeRuleTagDialog" @save="saveRuleTag"></add-sales>
 <update-sales
      :show="updateSalesFlag"
      :transSalesId="transSalesId"
      title="修改"
      @close="closeUpdateSalesDialog"
      @save="updateSales"
    ></update-sales>
    </div>
    
</template>

<script>
import qs from "qs";
import Vue from "vue";
import ApiPath from "@/api/ApiPath";
import api from "@/axios/api";
import AddSales from "./addSales.vue";
import UpdateSales from './updateSales.vue'
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
      name: "",
      phone: "",
      updateSalesFlag: false,

      transSalesId: "",

      transTagCode: "",
      tagCode: "",
      tagName: "",

      localShow: this.show,
      addSalesFlag: false,
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
    // this.setTagList();
    // let params = {};
    // api.testAxiosGet(ApiPath.url.findAllSales, params).then(res => {
    //   let code = res.status;
    //   if (code == "0") {
    //     this.tableData = res.data;
    //     console.log(res.data);
    //   } else {
    //   }
    // });
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
        phone: this.phone,
         page: this.formInline.page,
        size:  this.formInline.limit
      };
      api.testAxiosGet(ApiPath.url.searchSales, params).then(res => {
        let code = res.status;
        if (code == "0") {
        
          this.tableData = res.data.content;
           this.pageparm.currentPage = res.data.number + 1;
            this.pageparm.pageSize = res.data.size;
            this.pageparm.total = res.data.totalElements;
        
          
        } else {
        }
      });
    },
    closeUpdateSalesDialog: function() {
      this.updateSalesFlag = false;
    },
    updateSales: function() {
      
    },
  
    deleteSales: function(scope) {
      let params = {
        id: scope.row.id
      };

      api.testAxiosGet(ApiPath.url.deleteSales, params).then(res => {
        let code = res.status;
          this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
           location.reload();
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
         
        if (code == "0") {
          this.reload();
          
        } else {
          this.$message.success(res.message);
        }
      });
       
    },
    onSubmit: function() {
      let params = {
        tagCode: this.tagCode,
        chName: this.tagName,
        // mainPartCode: this.mainPartCode,
        generateType: "gz"
      };
      
    },
    openUpdateDialog(scope) {
      console.log(scope);
      this.transSalesId = scope.row.id;
      this.updateSalesFlag = true;
    },
    saveRuleTag() {
      this.addSalesFlag = false;
    },
    modifyRuleTag() {
      this.updateRuleTag = false;
    },
    openRuleTag() {
      this.addSalesFlag = true;
    },
    closeRuleTagDialog() {
      this.addSalesFlag = false;
    },
    closeModifyRuleTagDialog() {
      this.updateRuleTag = false;
    },
     resetRuleTag(search) {
      this.name = "";
      this.phone="";
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
    // handleCurrentChange(val) {
    //   this.transData = val.tableName;
    //   this.currentRow = val;
    // },
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
    AddSales,
    UpdateSales,
      Pagination
  }
};
</script>

<style scoped>

.el-form-item{
  font-size: 14px;
}
.template{
  size: medium;
  color: rgb(17, 17, 17);
  background-color: rgb(199, 215, 231);
  border-color: rgb(121, 212, 59);
  border-radius:3px;
}
</style>


