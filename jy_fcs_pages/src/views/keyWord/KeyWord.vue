
<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>关键字管理</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 搜索筛选 -->
    <el-form :inline="true" class="user-search">
      <el-form-item label="搜索："></el-form-item>
      <el-form-item label="关键字名称">
        <el-input size="small" v-model="name" placeholder="输入关键字名称"></el-input>
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
      <el-button size="medium" type="text" icon="el-icon-plus" @click="addKeyWords()" class="insert">添加</el-button>
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
      <el-table-column sortable prop="name" label="名称" align="center"></el-table-column>
      <el-table-column sortable prop="code" label="编码" align="center"></el-table-column>
      <el-table-column sortable prop="parentCode" label="分类编码" align="center"></el-table-column>
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
            @change="keyWordEnable(scope)"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
           <el-button
           @click="openUpdateKeyWord(scope)"
            type="text"
            size="medium"
            icon="el-icon-edit"
            class="up"
          >编辑</el-button>
           <el-button
           @click="deleteKeyWord(scope)"
            type="text"
            size="medium"
            icon="el-icon-delete"
            class="del"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页组件 -->
    <Pagination v-bind:child-msg="formInline" @callFather="callFather"></Pagination>
    <add-key-word :show="addKeyWord" title="添加" @close="closeKeyWordDialog" @save="saveKeyWord"></add-key-word>
    <update-key-word
      :show="updateKeyWordFlag"
      :transKeyWordId="transKeyWordId"
      title="修改"
      @close="closeUpdateKeyWordDialog"
      @save="upKeyWord"
    ></update-key-word>
   
  </div>
</template>
<script>
import Pagination from "../../components/Pagination";
//后台路径引用
import ApiPath from "@/api/ApiPath.js";
//数据请求交互引用
import api from "@/axios/api.js";
import addKeyWord from "./addKeyWord";
import UpdateKeyWord from "./updateKeyWord";
export default {
  inject: ["reload"],
  data() {
    return {
      name: "",
      nshow: true, //switch开启
      fshow: false, //switch关闭
      loading: false, //是显示加载
      editFormVisible: false, //控制编辑页面显示与隐藏
      menuAccessshow: false, //控制数据权限显示与隐藏
      addKeyWord: false,
      updateKeyWordFlag: false,
      transKeyWordId: "",
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
      KeyWordRight: [],
      KeyWordRightProps: {
        children: "children",
        label: "name"
      },
      //参数keyWord
      saveKeyWordId: "",
    };
  },
  // 注册组件
  components: {
    addKeyWord,
    UpdateKeyWord,
    Pagination
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
        page: this.formInline.page,
        size: this.formInline.limit
      };
      api.testAxiosGet(ApiPath.url.keyWordSearch, params).then(res => {
        let code = res.state;
        if (code == "0") {
          this.loading = false;
          this.listData = res.data.content;
          this.formInline.currentPage = res.data.number + 1;
          this.formInline.pageSize = res.data.size;
          this.formInline.total = res.data.totalElements;
        }
      });
    },
    saveKeyWord() {
      this.addKeyWord = false;
    },
    closeKeyWordDialog() {
      this.addKeyWord = false;
    },
    addKeyWords() {
      this.addKeyWord = true;
    },
    closeUpdateKeyWordDialog() {
      this.updateKeyWordFlag = false;
    },
    upKeyWord() {
      this.updateKeyWordFlag = false;
    },
    //启用/禁用
    keyWordEnable: function(scope) {
      let params = {
        id: scope.row.id,
        auditStatus: scope.row.auditStatus
      };
      api.testAxiosGet(ApiPath.url.keyWordEnable, params).then(res => {
        let code = res.status;
        if (code == "0") {
          this.$message.success(res.message);
        } else {
          this.$message.success(res.message);
        }
        this.reload();
      }).catch(function(error) {});
      
    },

    //显示编辑界面
    openUpdateKeyWord(scope) {
      this.transKeyWordId = scope.row.id;
      this.updateKeyWordFlag = true;
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
      location.reload();
    },

    // 删除角色
    deleteKeyWord(scope) {
      this.$confirm("确定要删除吗?", "信息", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        let params = {
          id: scope.row.id,
          };
        api.testAxiosGet(ApiPath.url.deleteKeyWord, params).then(res => {
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
.userKeyWord {
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