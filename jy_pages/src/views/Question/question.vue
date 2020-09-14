/**
 * 门户菜单 问卷调查管理
 */
<template>
    <div class="adminFunction">
          <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">门户管理</el-breadcrumb-item>
      <el-breadcrumb-item>问卷调查管理</el-breadcrumb-item>
    </el-breadcrumb>
    <br>
    <!-- 查询条件 -->
    <el-form :inline="true" class="demo-form-inline">
       <el-form-item label="搜索："></el-form-item>
      <el-form-item label="姓名" >
        <el-input v-model="name" type="text" placeholder="请输入姓名" class="el-input el-input--small" clearable ></el-input>
      </el-form-item>
      <el-form-item label="手机号码" >
        <el-input v-model="phoneNum" type="text" placeholder="请输入手机号码" class="el-input el-input--small" clearable ></el-input>
      </el-form-item>
      <el-button  type="text" @click="search" size="medium" class="find"  icon="el-icon-search" >查询</el-button>
       <el-button type="text" @click="resetRuleTag(search)"  size="medium" class="small"  icon="el-icon-close">重置</el-button>
        
    </el-form>

    <!-- 展示的表单 -->
    <el-table :data="tableData" border style="width: 100%;"  highlight-current-row size="mini" > 
      <el-table-column type="index" label="序号"  align="center" style="width:40px;"></el-table-column>
      <el-table-column prop="name" label="姓名" align="center" style="width:40px;"></el-table-column>
      <el-table-column prop="post" label="职务" align="center"></el-table-column>
      <el-table-column prop="phoneNum" label="手机号码" align="center"></el-table-column>
      <el-table-column prop="companyName" label="公司名称" align="center"></el-table-column>
      <el-table-column prop="email" label="邮箱" align="center"></el-table-column>
      <el-table-column prop="expectaion" label="合作期望" align="center" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="recommended" label="推荐人" align="center" ></el-table-column>
      <el-table-column sortable prop="questionScore" label="问卷得分" align="center"  width="100"></el-table-column>
     
      <el-table-column sortable  prop="createDate" label="创建时间" align="center"  width="200">
      </el-table-column>

  </el-table>
    <!-- 分页组件 -->
    <Pagination v-bind:child-msg="pageparm" @callFather="callFather"></Pagination>
    <br />
    <br />


    </div>
    
</template>

<script  >
import qs from "qs";
import Vue from "vue";
import ApiPath from "@/api/ApiPath";
import api from "@/axios/api";
import UpdateQuestion from "./updateQuestion.vue";
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
     name: "",
     phoneNum:"",
      updateQuestionFlag: false,
      transQuestionId: "",
      transTagCode: "",
      tagCode: "",
      tagName: "",
      localShow: this.show,
      addQuestionFlag: false,
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
        if (parameter == "manual") {
        this.formInline.page = 1;
        this.formInline.limit = 10;
      }
      let params = {
        name: this.name,
        phoneNum:this.phoneNum,
        page: this.formInline.page,
        size: this.formInline.limit
      };
      api
        .testAxiosGet(ApiPath.url.searchQuestion, params)
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
    

    closeUpdateQuestionDialog: function() {
      this.updateQuestionFlag = false;
    },
    updateQuestion: function() {},
    
    deleteQuestion: function(scope) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let params = {
            id: scope.row.id
          };
          api.testAxiosGet(ApiPath.url.deleteQuestion, params).then(res => {
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
      this.transQuestionId = scope.row.id;
      this.updateQuestionFlag = true;
    },
    saveRuleTag() {
      this.addQuestionFlag = false;
    },
    
    modifyRuleTag() {
      this.updateRuleTag = false;
    },
    openRuleTag() {
      this.addQuestionFlag = true;
    },
    
    resetRuleTag(search) {
      this.name = "";
      this.phoneNum="";
      this.formInline.page = 1;
      this.formInline.limit = 10;
      this.search(this.formInline);
    },
    closeRuleTagDialog() {
      this.addQuestionFlag = false;
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
   
    UpdateQuestion,
    
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


.el-button.up{
  margin-right: 20px;
  width:50px;
  background-color:white;
  border-color:#DCDFE6;
  color:black;
  font-size:12px;
}
.el-button.del{
  width:50px;
  background-color:#84C1FF;
  border-color:#84C1FF;
  color:white;
  font-size:12px;
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

</style>
<style>
.el-tooltip__popper {
  max-width: 300px;
  font-size: 14px;
   background: #84c1ff !important;
}
.el-tooltip__popper[x-placement^="top"] .popper__arrow {
  border-top-color: #84c1ff;
}
.el-tooltip__popper[x-placement^="top"] .popper__arrow:after {
  border-top-color: pink;
}


</style>



