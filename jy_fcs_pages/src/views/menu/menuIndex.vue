/**
 * 基础管理 菜单管理
 */
<template>
    <div class="navigationFunction">
    <br>
    <!-- 查询条件 -->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="菜单名称" >
        <el-input v-model="name" type="text" placeholder="请输入菜单名称" class="el-input el-input--small" clearable ></el-input>
      </el-form-item>
      <el-button type="warning"  @click="search" size="small"  icon="el-icon-search" >查询</el-button>
       <el-button type="info"  @click="resetForm(search)"  size="small"  icon="el-icon-close">重置</el-button>
        <el-row>
           <el-button type="success"  @click="openRuleTag"  size="small"  icon="el-icon-plus">添加</el-button>
        </el-row>
        <br>
    </el-form>

    <!-- 展示的表单 -->
     <el-table
      size="mini"
      :data="tableData"
      highlight-current-row
      v-loading="loading"
      border
      element-loading-text="拼命加载中"
      style="width: 100%;"
      row-key="id"
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
    >
      <el-table-column  prop="name" label="菜单名称" align="center" width="300px"></el-table-column>
      <el-table-column  prop="icon" label="菜单图标" align="center" width="100px">
        <template slot-scope="scope">
          <i :class="scope.row.icon"></i>
        </template>
      </el-table-column>
      <el-table-column  label="类型" align="center">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.menuType == 1">目录</el-tag>
          <el-tag v-if="scope.row.menuType == 2" type="success">菜单</el-tag>
          <el-tag v-if="scope.row.menuType == 3" type="info">按钮</el-tag>
        </template>
      </el-table-column>
      
      <el-table-column  align="center" label="状态" prop="state">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.status"
            active-value="0"
            inactive-value="1"
            active-color="#13ce66"
            inactive-color="#ff4949"
            @change="enableMenu(scope)"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column  align="center" label="排序" prop="sort">
        <template slot-scope="scope">
          <el-input-number v-model="scope.row.sort" @change="sortChange(scope)" :step=5 step-strictly></el-input-number>
        </template>
      </el-table-column>
      <el-table-column  prop="url" label="菜单路由" align="center"></el-table-column>
      <el-table-column  prop="perssions" label="权限标识" align="center"></el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
           <el-button
           @click="openUpdateRole(scope)"
            type="primary"
            size="small"
          
            icon="el-icon-edit"

            
          >编辑</el-button>
           <el-button
           @click="deleteMenu(scope)"
            type="danger"
            size="small"
           
            icon="el-icon-delete"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页组件 -->
   
    <br />
    <br />
<add-navigation :show="addNavigationFlag" title="添加菜单信息"  @close="closeRuleTagDialog" @save="saveRuleTag"></add-navigation> 
<update-menu
      :show="updateMenuFlag"
      :transRoleId="transRoleId"
      title="修改"
      @close="closeUpdateRoleDialog"
      @save="upRole"
    ></update-menu>

    
    </div>
    
</template>

<script>
import qs from "qs";
import Vue from "vue";
import ApiPath from "@/api/ApiPath";
import api from "@/axios/api";
import AddNavigation from "./addNavigation.vue";
import UpdateMenu from "./updateNavigation.vue";
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
      loading:false,
      transNavigationId: "",
      transRoleId:"",
      transTagCode: "",
      tagCode: "",
      tagName: "",
      localShow: this.show,
      addNavigationFlag: false,
      updateMenuFlag:false,
      mainBodyCode: "",
      tableData: [],
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
    this.search();
  },
  methods: {
//查询方法
    search: function(parameter) {
      let params = {
        name: this.name
      };
      api
        .testAxiosGet(ApiPath.url.findMenuByName, params)
        .then(res => {
          let code = res.status
          if (code == "0") {
            let parent = [];
            let children = [];
            for (let i = 0; i < res.data.length; i++) {
              if (res.data[i]["level"] == 0) {
                parent.push(res.data[i]);      
              } else {
                children.push(res.data[i]);
              }
            }
           let child = [];
           //遍历顶层目录，挂载子菜单
           for (let j = 0; j < parent.length; j++) {
          
              for (let k = 0; k < children.length; k++) {
              
                if (parent[j]["id"] == children[k]["parentId"]) {
                   child.push(children[k]);
                   
                }
                parent[j]["children"] = child;
                  
              }
              child = [];
            }
          //遍历children，挂载更次级菜单
              for (let j = 0; j < children.length; j++) {
          
              for (let k = 0; k < children.length; k++) {
              
                if (children[j]["id"] == children[k]["parentId"]) {
                   child.push(children[k]);
                   
                }
                children[j]["children"] = child;
                  
              }
              child = [];
            }
            this.tableData = parent;
            
          } 
        })
        .catch(function(error) {
        });
    },
    //重置
    resetForm(search) {
      //this.$refs['searchForm'].resetFields()
      this.name = "";
      this.search();
    },
    //修改菜单排序
    sortChange: function(scope) {
      let params = {
        id: scope.row.id,
        sort: scope.row.sort
      };
      api
        .testAxiosGet(ApiPath.url.changeMenuSort, params)
        .then(res => {
           this.$message.success(res.message);
          // this.reload();
        })
        .catch(function(error) {});
    },
    //switch开关
    enableMenu: function(scope) {
      let params = {
        id: scope.row.id,
        status: scope.row.status
      };
      api
        .testAxiosGet(ApiPath.url.enableMenu, params)
        .then(res => {
            this.$message.success(res.message);
          // this.reload();
        })
        .catch(function(error) {});
    },
    //删除菜单
    deleteMenu: function(scope) {
      this.$confirm("此操作将永久删除该菜单, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let params = {
            id: scope.row.id
          };
          api.testAxiosGet(ApiPath.url.deleteMenu, params).then(res => {
            let code = res.status;

            if (code == "0") {
              this.$message({
                type: "success",
                message: "删除成功!"
              });
              this.reload();
            } else {
              this.$message.error(res.message);
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
    openUpdateRole(scope) {
      this.transRoleId = scope.row.id;
      this.updateMenuFlag = true;
    },
    saveRuleTag() {
      this.addNavigationFlag = false;
    },
    upRole(){
      this.updateMenuFlag = false;
    },
    modifyRuleTag() {
      this.updateMenuFlag = false;
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
    closeUpdateRoleDialog(){
      this.updateMenuFlag = false;
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
    UpdateMenu
  }
};
</script>

<style scoped >
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




