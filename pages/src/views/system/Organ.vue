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
      <el-form-item label="机构名称">
        <el-input v-model="name" type="text" placeholder="请输入机构名称" ></el-input>
      </el-form-item>
      <el-form-item label="上级机构编号">
        <el-input v-model="superId" type="text" placeholder="请输入上级机构编号"></el-input>
      </el-form-item>
  
      <el-button type="info" plain @click="search" size="medium" style="background-color:#409EFF;border-color:#409EFF;color:#FFF;font-size:12px" icon="el-icon-search" >查询</el-button>
       <el-button type="info" plain @click="openRuleTag"  size="medium" style="background-color:#409EFF;border-color:#409EFF;color:#FFF;font-size:12px" icon="el-icon-plus">新增</el-button>
    </el-form>
   
    
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column type="index" label="序号" width="60" align="center"></el-table-column>
      <el-table-column prop="id" label="编号" align="center"></el-table-column>
      <el-table-column prop="name" label="机构名称" align="center"></el-table-column>
      <el-table-column prop="superId" label="上级机构编号" align="center"></el-table-column>
      
      <el-table-column prop="createTime" label="创建时间" align="center"></el-table-column>
      <el-table-column prop="updateTime" label="修改时间" align="center"></el-table-column>
      <el-table-column prop="context" label="备注" align="center"></el-table-column>
      <el-table-column prop="state" label="状态" align="center"></el-table-column>      
      <el-table-column fixed="right" label="操作" width="200px" align="center">
        <template slot-scope="scope">
          <el-button @click="openUpdateDialog(scope)" type="text" size="medium" style="width:50px;background-color:white;border-color:#DCDFE6;color:black;font-size:12px">修改</el-button>
          <el-button @click="deleteOrgan(scope)" type="text" size="medium" style="width:50px;background-color:#F56C6C;border-color:#F56C6C;color:white;font-size:12px">删除</el-button>
            <el-button @click="organEnable(scope)" type="text"  size="medium" style="width:50px;background-color:#85ce61;border-color:#85ce61;color:white;font-size:12px">
              {{scope.row.state == 0 ? "禁用" : scope.row.state == 1 ? "启用" : "解锁"}}
            </el-button>
         
        </template>

      </el-table-column>
    </el-table>
   
    <br />
    <br />
       
<add-organ :show="addOrganFlag" title="添加" @close="closeRuleTagDialog" @save="saveRuleTag"></add-organ>
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
import UpdateOrgan from './updateOrgan.vue'


export default {
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
      tableData: [],
      pageparm:{
        currentPage:1,
        pageSize:10,
        total:10
      }
    };
  },
  
  watch: {
    show(val) {
      this.localShow = val;
    }
  },
  created() {
    // this.setTagList();
    let params = {};
    api.testAxiosGet(ApiPath.url.findAllOrgan, params).then(res => {
      let code = res.status;
      if (code == "0") {
        this.tableData = res.data;
        console.log(res.data);
      } else {
      }
    });
  },
  methods: {
    //分页赋值
    callFather(parm){
      this.formInline.currentPage = parm.currentPage;
      this.formInline.pageSize = parm.pageSize;
    },
     
    //查询方法
    search: function() {
      let params = {
        name: this.name,
        superId: this.superId
      };
      api.testAxiosGet(ApiPath.url.searchOrgan, params).then(res => {
        let code = res.status;
        if (code == "0") {
          this.tableData = res.data;
          console.log(res.data);
        } else {
        }
      });
    },
    closeUpdateOrganDialog: function() {
      this.updateOrganFlag = false;
    },
    updateOrgan: function() {
      
    },
      organEnable:function(scope) {
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
        
      });
        location.reload();
      },
    deleteOrgan: function(scope) {
      let params = {
        id: scope.row.id
      };

      api.testAxiosGet(ApiPath.url.deleteOrgan, params).then(res => {
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
          this.$message.success(res.message);
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
    AddOrgan,
    UpdateOrgan
   
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


