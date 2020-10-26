<template>
  <div>
    <!-- 搜索筛选 -->
    <el-form :inline="true" class="user-search">
      <el-form-item label="创建人">
        <el-input size="small" v-model="createBy" placeholder="输入创建人" style="width:150px"></el-input>
      </el-form-item>
      <el-form-item label="图片类型" prop="picType">
       <el-select v-model="picType" style="width:50%;height:30px" size="small">
          <el-option v-for="item in pictureOptions" :key="item.value" :label="item.label" :value="item.value" size="small"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="状态" prop="status" style="margin-left:-100px">
        <el-select v-model="status" style="width:45%;height:30px;" size="small">
          <el-option v-for="item in statusOptions" :key="item.value" :label="item.label" :value="item.value" size="small"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button size="small" type="warning" icon="el-icon-search" @click="search('manual')" class="height">查询</el-button>
        <el-button size="small" type="info" icon="el-icon-close" @click="resetForm('search')">重置</el-button>
      </el-form-item>
      <el-row>
        <el-button size="small" type="success" icon="el-icon-plus" @click="addPictureInfos()" class="insert">添加</el-button>
      </el-row>
      <br/>
    </el-form>
    <!--列表-->
    <el-table size="mini" :data="listData" highlight-current-row v-loading="loading" border element-loading-text="拼命加载中" style="width: 100%;">
      <el-table-column type="index" label="序号" min-width="7%" align="center"></el-table-column>
      <el-table-column prop="name" min-width="6%" label="图片名称" align="center" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="url" label="图片" align="center" min-width="5%">
        <template slot-scope="scope" style="height:120px">
          <el-image :src="scope.row.url" style="width:33px;height:33px;"  @click="show(scope,dialogVisible =true)"></el-image>
        </template>
      </el-table-column>
      <el-table-column prop="picType" min-width="7%" label="图片类型" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.picType == '0'">轮播图</span>
          <span v-if="scope.row.picType == '1'">学习手册</span>
          <span v-if="scope.row.picType == '2'">考试</span>
        </template>
      </el-table-column>
      <el-table-column prop="createDate" min-width="12%" label="创建时间" align="center" sortable></el-table-column>
      <el-table-column prop="updateDate" min-width="12%" label="修改时间" align="center" sortable></el-table-column>
      <el-table-column prop="createBy" min-width="7%" label="创建人" align="center" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="updateBy" min-width="7%" label="修改人" align="center" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column align="center" min-width="6%" label="状态" prop="status">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.status"
            :active-value="0"
            :inactive-value="1"
            active-color="#13ce66"
            inactive-color="#ff4949"
            @change="pictureInfoEnable(scope)"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column  align="center" label="排序" min-width="14%" prop="sort" >
        <template slot-scope="scope">
          <el-input-number v-model="scope.row.sort" @change="sortChange(scope)" :step=1 step-strictly size="small"></el-input-number>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" min-width="17%">
        <template slot-scope="scope">
          <el-button @click="openUpdatePictureInfo(scope)" type="primary" size="small" icon="el-icon-edit">编辑</el-button>
          <el-button @click="deletePictureInfo(scope)" type="danger" size="small" icon="el-icon-delete">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 图片预览弹出框 -->
    <el-dialog title="图片预览" :visible.sync="dialogVisible" width="410px">
      <span>
          <el-image :src="url" style="width:370px;height:260px;"></el-image>
      </span>
    </el-dialog>
    <!-- 分页组件 -->
    <Pagination v-bind:child-msg="formInline" @callFather="callFather"></Pagination>
    <!-- 添加 -->
    <add-eduPictureInfo
      :show="addPictureInfo"
      title="添加"
      @close="closePictureInfoDialog"
      @save="savePictureInfo"
    ></add-eduPictureInfo>
    <!-- 修改 -->
    <update-pictureInfo
      :show="updatePictureInfoFlag"
      :transPictureInfoId="transPictureInfoId"
      title="修改"
      @close="closeUpdatePictureInfoDialog"
      @save="upPictureInfo"
    ></update-pictureInfo>
  </div>
</template>

<script>
import Pagination from "../../components/Pagination";
import ApiPath from "@/api/ApiPath.js";
import api from "@/axios/api.js";
import AddEduPictureInfo from "./addEduPictureInfo";
import UpdatePictureInfo from "./updateEduPictureInfo";
export default {
  inject: ["reload"],
  data() {
    return {
      picType:"",
      createBy:"",
      status:"",
      url:"",
      updateUser:"",
      loading: false, //是显示加载
      dialogVisible: false,
      addPictureInfo: false,
      updatePictureInfoFlag: false,
      transPictureInfoId: "",
      formInline: {
        page: 1,
        limit: 10,
        varLable: "",
        varName: "",
        currentPage: 1,
        pageSize: 10,
        total: 10,
        token: localStorage.getItem("logintoken"),
      },
      listData: [], //用户数据
      statusOptions: [
        { value: "", label: "全部" },
        { value: "0", label: "启用" },
        { value: "1", label: "禁用" },
      ],
      pictureOptions:[
        { value: "", label: "全部" },
        { value: "0", label: "轮播图" },
        { value: "1", label: "学习手册" },
        { value: "2", label: "考试" },
      ]
    };
  },
  // 注册组件
  components: {
    AddEduPictureInfo,
    UpdatePictureInfo,
    Pagination,
  },
  watch: {},
  mounted() {},
  created() {
    this.search(this.formInline);
  },
  methods: {
    //图片预览
    show: function (scope){
       let params = {
        id: scope.row.id,
      };
      api.testAxiosGet(ApiPath.url.pictureFindById, params)
        .then((res) => {
          let code = res.state;
          if (code == "0") {
            this.url= res.data.url;
          }
        }).catch(function (error) {});
    },
    // 分页插件事件
    callFather(parm) {
      this.formInline.page = parm.currentPage;
      this.formInline.limit = parm.pageSize;
      this.search(this.formInline);
    },
    // 获取角色列表
    search: function (parameter) {
      if (parameter == "manual") {
        this.formInline.page = 1;
        this.formInline.limit = 10;
      }
      let params = {
        createBy: this.createBy,
        picType: this.picType,
        status: this.status,
        page: this.formInline.page,
        size: this.formInline.limit,
      };
      api.testAxiosGet(ApiPath.url.pictureInfoSearch, params).then((res) => {
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
    savePictureInfo() {
      this.addPictureInfo = false;
    },
    closePictureInfoDialog() {
      this.search(this.formInline);
      this.addPictureInfo = false;
    },
    addPictureInfos() {
      this.addPictureInfo = true;
    },
    closeUpdatePictureInfoDialog() {
      this.search(this.formInline);
      this.updatePictureInfoFlag = false;
    },
    upPictureInfo() {
      this.updatePictureInfoFlag = false;
    },
    //启用/禁用
    pictureInfoEnable: function (scope) {
      let params = {
        id: scope.row.id,
        status: scope.row.status,
        updateUser: localStorage.getItem("userInfo")
      };
      api
        .testAxiosGet(ApiPath.url.pictureInfoEnable, params)
        .then((res) => {
          let code = res.state;
           if(code == "1") {
            this.$message.success(res.message);
          }
          if (code == "0") {
            this.$message.success(res.message);
          }
          if(code == "2") {
            this.$message.error(res.message);
          }
          this.reload();
        })
        .catch(function (error) {});
    },
    //修改菜单排序
    sortChange: function(scope) {
      let params = {
        id: scope.row.id,
        sort: scope.row.sort
      };
      api
        .testAxiosGet(ApiPath.url.changePictureSort, params)
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
    openUpdatePictureInfo(scope) {
      this.transPictureInfoId = scope.row.id;
      this.updatePictureInfoFlag = true;
    },
    //重置
    resetForm(search) {
      this.createBy = "",
      this.picType = "";
      this.status = "";
      this.formInline.page = 1;
      this.formInline.limit = 10;
      this.search(this.formInline);
    },
    // 删除
    deletePictureInfo(scope) {
      //状态为0不能被删除
      if(scope.row.status == 0){
        this.$alert("数据状态生效不能被删除！", "提示", {
            confirmButtonText: "确定",
          });
          return false;
      }
      
      this.$confirm("确定要删除吗?", "信息", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          let params = {
            id: scope.row.id,
          };
          api.testAxiosGet(ApiPath.url.deletePictureInfo, params).then((res) => {
            let code = res.state;
            if (code == "0") {
              this.$message.success(res.message);
              this.reload();
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
};
</script>

<style scoped>
.user-search {
  margin-top: 20px;
}
.userPictureInfo {
  width: 100%;
}
.height {
  margin-top: 5px;
  margin-left: -120px;
}
</style>