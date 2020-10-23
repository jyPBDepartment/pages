<template>
  <div>
    <!-- 搜索筛选 -->
    <el-form :inline="true" class="user-search">
      <el-form-item label="创建人">
        <el-input size="small" v-model="createBy" placeholder="输入创建人" style="width:150px"></el-input>
      </el-form-item>
      <el-form-item label="状态" prop="status">
          <el-select v-model="status" style="width:40%" size="small">
            <el-option v-for="item in statusOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
      <el-form-item>
        <el-button size="small" type="warning" icon="el-icon-search" @click="search('manual')" class="height">查询</el-button>
        <el-button size="small" type="info" icon="el-icon-close" @click="resetForm('search')">重置</el-button>
      </el-form-item>
      <el-row>
        <el-button size="small" type="success" icon="el-icon-plus" @click="addVocationInfos()">添加</el-button>
      </el-row>
      <br>
    </el-form>
    <!--列表-->
    <el-table size="mini" :data="listData" highlight-current-row v-loading="loading" border element-loading-text="拼命加载中" style="width: 100%;">
      <el-table-column type="index" label="序号" min-width="7%" align="center"></el-table-column>
      <el-table-column prop="name" min-width="6%" label="职业名称" align="center" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="vocationCode" min-width="8%" label="职业编码" align="center" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="createDate" min-width="12%" label="创建时间" align="center" sortable></el-table-column>
      <el-table-column prop="updateDate" min-width="12%" label="修改时间" align="center" sortable></el-table-column>
      <el-table-column prop="createBy" min-width="6%" label="创建人" align="center" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="updateBy" min-width="6%" label="修改人" align="center" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column align="center" min-width="5.5%" label="状态" prop="status">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.status"
            :active-value="0"
            :inactive-value="1"
            active-color="#13ce66"
            inactive-color="#ff4949"
            @change="vocationInfoEnable(scope)"
          ></el-switch>
        </template>
      </el-table-column>
       <el-table-column  align="center" label="排序" min-width="13.5%" prop="sort" >
        <template slot-scope="scope">
          <el-input-number v-model="scope.row.sort" @change="sortChange(scope)" :step=1 step-strictly size="small"></el-input-number>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" min-width="24%">
        <template slot-scope="scope">
           <el-button @click="openUpdateVocationInfo(scope)" type="primary" size="small" icon="el-icon-edit" style="width:73px;">编辑</el-button>
           <el-button @click="deleteUser(scope)" type="danger" size="small" icon="el-icon-delete" style="width:73px;">删除</el-button>
           <el-button @click="openDetails(scope)" type="primary" size="small" style="width:70px;">详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页组件 -->
    <Pagination v-bind:child-msg="formInline" @callFather="callFather"></Pagination>
    <!-- 新增 -->
    <add-vocationInfo :show="addVocationInfo" title="添加" @close="closeVocationInfoDialog" @save="saveVocationInfo"></add-vocationInfo>
    <!-- 修改 -->
    <update-vocationInfo
      :show="updateVocationInfoFlag"
      :transVocationInfoId="transVocationInfoId"
      title="修改"
      @close="closeUpdateVocationInfoDialog"
      @save="upVocationInfo"
    ></update-vocationInfo>
    <!-- 详情 -->
    <details-vocationInfo
      :show="detailsVocationInfoFlag"
      :detailsTransVocationInfoId="detailsTransVocationInfoId"
      title="详情"
      @close="closedetailsVocationInfoDialog"
    ></details-vocationInfo>
  </div>
</template>

<script>
import Pagination from "../../components/Pagination";
//后台路径引用
import ApiPath from "@/api/ApiPath.js";
//数据请求交互引用
import api from "@/axios/api.js";
import AddVocationInfo from "./addVocationInfo";
import UpdateVocationInfo from "./updateVocationInfo";
import DetailsVocationInfo from "./detailsVocationInfo";
export default {
  inject: ["reload"],
  data() {
    return {
      createBy: "",
      status:"",
      updateUser:"",
      loading: false, //显示加载
      addVocationInfo: false,
      updateVocationInfoFlag: false,
      detailsVocationInfoFlag: false,
      transVocationInfoId: "",
      detailsTransVocationInfoId:"",
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
      listData: [], //用户数据
      //状态搜索下拉选项
      statusOptions: [
        { value: "", label: "全部" },
        { value: "0", label: "启用" },
        { value: "1", label: "禁用" }
      ],
    };
  },
  // 注册组件
  components: {
    AddVocationInfo,
    UpdateVocationInfo,
    DetailsVocationInfo,
    Pagination,
  },
  watch: {},
  mounted() {},
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
      if(parameter == 'manual'){
        this.formInline.page = 1;
        this.formInline.limit = 10;
      }
      let params = {
        createBy: this.createBy,
        status:this.status,
        page: this.formInline.page,
        size: this.formInline.limit
      };
      api.testAxiosGet(ApiPath.url.vocationInfoSearch, params).then(res => {
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
    saveVocationInfo() {
      this.addVocationInfo = false;
    },
    closeVocationInfoDialog() {
      this.search(this.formInline);
      this.addVocationInfo = false;
    },
    addVocationInfos() {
      this.addVocationInfo = true;
    },
    closeUpdateVocationInfoDialog() {
      this.search(this.formInline);
      this.updateVocationInfoFlag = false;
    },
    upVocationInfo() {
      this.updateVocationInfoFlag = false;
    },
    closedetailsVocationInfoDialog(){
        this.detailsVocationInfoFlag = false;
    },
    
    //启用/禁用
    vocationInfoEnable: function(scope) {
      let params = {
        id: scope.row.id,
        status: scope.row.status,
        updateUser:localStorage.getItem("userInfo")
      };
      api.testAxiosGet(ApiPath.url.vocationInfoEnable, params).then(res => {
        let code = res.state;
        if (code == "0") {
          this.$message.success(res.message);
        } else {
          this.$message.success(res.message);
        }
        this.reload();
      }).catch(function(error) {});
    },

     //修改排序
    sortChange: function(scope) {
      let params = {
        id: scope.row.id,
        sort: scope.row.sort
      };
      api
        .testAxiosGet(ApiPath.url.changeVocationSort, params)
        .then(res => {
          let code = res.state;
          if(code == "1"){
              this.$message.error(res.message);
          }else{
            this.$message.success(res.message);
          }
        })
        .catch(function(error) {});
    },

    //显示编辑界面
    openUpdateVocationInfo(scope) {
      this.transVocationInfoId = scope.row.id;
      this.updateVocationInfoFlag = true;
    },

    //显示详情页面
    openDetails(scope){
        this.detailsTransVocationInfoId = scope.row.id;
        this.detailsVocationInfoFlag = true;
    },

    //重置
    resetForm(search) {
      this.createBy = "";
      this.status="",
      this.formInline.page = 1;
      this.formInline.limit = 10;
      this.search(this.formInline);
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
        api.testAxiosGet(ApiPath.url.deleteVocationInfo, params).then(res => {
          let code = res.state;
          if(code == "0") {
            this.$message.success(res.message);
            this.reload();
          }
          if(code == "1"){
            this.$message.error(res.message);
          }
        });
      }).catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    }
  }
};
</script>

<style scoped>
.height {
  margin-top: 5px;
  margin-left: -120px;
}
</style>