/**
 * 门户菜单 导航管理
 */
<template>
    <div class="navigationFunction">
          <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>导航管理</el-breadcrumb-item>
    </el-breadcrumb>
    <br>
    <!-- 查询条件 -->
    <el-form :inline="true" class="demo-form-inline">
       <el-form-item label="搜索："></el-form-item>
      <el-form-item label="导航名称" >
        <el-input v-model="name" type="text" placeholder="请输入导航名称" class="el-input el-input--small" clearable ></el-input>
      </el-form-item>
      <el-button type="text"  @click="search" size="medium" class="find"  icon="el-icon-search" >查询</el-button>
       <el-button type="text"  @click="resetRuleTag(search)"  size="medium" class="small" icon="el-icon-close">重置</el-button>
        <el-row>
           <el-button type="text"  @click="openRuleTag"  size="medium" class="insert"  icon="el-icon-plus">添加</el-button>
        </el-row>
    </el-form>

    <!-- 展示的表单 -->
    <el-table :data="tableData" border style="width: 100%;"  highlight-current-row>
      <el-table-column type="index" label="序号"  align="center" style="width:40px;"></el-table-column>
      <el-table-column label="一级菜单" align="center">
      <el-table-column sortable prop="name" label="导航名称" align="center" style="width:40px;"></el-table-column>
        <!--switch开关（表单）-->
       <el-table-column align="center" sortable prop="status"  label="状态" min-width="50" >
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.status"
            active-value="1"
            inactive-value="0"
            active-color="#0080FF"
            inactive-color="#84C1FF"
            @change="navigationEnable(scope)"
          ></el-switch>
        </template>
      </el-table-column>
      </el-table-column>
      <el-table-column label="二级菜单" align="center">
      <el-table-column sortable prop="subId" label="上级导航" align="center" style="width:40px;"></el-table-column>
      
      <el-table-column sortable prop="dropDownEnName" label="下拉内容" align="center"></el-table-column>
    
       <!-- <el-table-column sortable prop="url" label="图片地址" min-width="50">
        <template slot-scope="scope">
          <el-image :src="scope.row.url" style="width:100px;height:100px;"></el-image>
        </template>
      </el-table-column> -->
      <el-table-column sortable prop="path" label="导航路径" align="center"></el-table-column>
      </el-table-column>
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
           <el-button @click="openUpdateDialog(scope)" type="text" size="medium" class="up" icon="el-icon-edit">编辑</el-button>
          <el-button @click="deleteNavigation(scope)" type="text" size="medium" class="del" icon="el-icon-delete">删除</el-button>
         
       </template>
   </el-table-column>
    </el-table>
    <!-- 分页组件 -->
    <Pagination v-bind:child-msg="pageparm" @callFather="callFather"></Pagination>
    <br />
    <br />
<add-navigation :show="addNavigationFlag" title="添加导航信息"  @close="closeRuleTagDialog" @save="saveRuleTag"></add-navigation> 

 <update-navigation
      :show="updateNavigationFlag"
      :transNavigationId="transNavigationId"
      title="修改"
      @close="closeUpdateNavigationDialog"
      @save="updateNavigation"
    ></update-navigation>
    
    </div>
    
</template>

<script>
import qs from "qs";
import Vue from "vue";
import ApiPath from "@/api/ApiPath";
import api from "@/axios/api";
import AddNavigation from "./addNavigation.vue";
import UpdateNavigation from "./updateNavigation.vue";
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
      updateNavigationFlag: false,
      transNavigationId: "",
      transTagCode: "",
      tagCode: "",
      tagName: "",
      localShow: this.show,
      addNavigationFlag: false,
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
        name: this.name,
        page: this.formInline.page,
        size: this.formInline.limit
      };
      api
        .testAxiosGet(ApiPath.url.findMenuByName, params)
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
    closeUpdateNavigationDialog: function() {
      this.updateNavigationFlag = false;
    },
    updateNavigation: function() {},
    //switch开关
    navigationEnable: function(scope) {
      let params = {
        id: scope.row.id,
        status: scope.row.status
      };
      api
        .testAxiosGet(ApiPath.url.navigationEnable, params)
        .then(res => {
          let code = res.state;
          if (code == "0") {
            this.$message.success(res.message);
          } else {
            this.$message.success(res.message);
          }
          // this.reload();
        })
        .catch(function(error) {});
    },
    deleteNavigation: function(scope) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let params = {
            id: scope.row.id
          };
          api.testAxiosGet(ApiPath.url.deleteNavigation, params).then(res => {
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
      this.transNavigationId = scope.row.id;
      this.updateNavigationFlag = true;
    },
    saveRuleTag() {
      this.addNavigationFlag = false;
    },
    
    modifyRuleTag() {
      this.updateRuleTag = false;
    },
    openRuleTag() {
      this.addNavigationFlag = true;
    },
    resetRuleTag(search) {
      this.name = "";
    },
    closeRuleTagDialog() {
      this.addNavigationFlag = false;
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
    AddNavigation,
    UpdateNavigation,
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




