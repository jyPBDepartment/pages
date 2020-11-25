<template>
  <div>
    <el-form :inline="true">
      <el-form-item label="版块名称" prop="name">
        <el-select v-model="name" placeholder="全部" style="width: 60%; height: 30px" size="small">
          <el-option v-for="item in sectionOptions" :key="item.value" :label="item.label" :value="item.value" size="small"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button size="small" type="warning" icon="el-icon-search" @click="search('manual')" class="height">查询</el-button>
        <el-button size="small" type="info" icon="el-icon-close" @click="resetForm('search')">重置</el-button>
      </el-form-item>
      <el-row>
        <el-button size="small" type="success" icon="el-icon-plus" @click="addSectionInfo()">添加</el-button>
      </el-row>
      <br />
    </el-form>
    <el-table size="mini" :data="listData" highlight-current-row v-loading="loading" border element-loading-text="拼命加载中" style="width: 100%">
      <el-table-column type="index" label="序号" min-width="8%" align="center"></el-table-column>
      <el-table-column prop="name" min-width="12%" label="版块名称" align="center" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="createBy" min-width="12%" label="创建人" align="center" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="createDate" min-width="14%" label="创建时间" align="center" sortable></el-table-column>
      <el-table-column prop="updateBy" min-width="12%" label="修改人" align="center" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="updateDate" min-width="14%" label="修改时间" align="center" sortable></el-table-column>
      <el-table-column align="center" min-width="10%" label="状态" prop="status">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.status"
            :active-value="0"
            :inactive-value="1"
            active-color="#13ce66"
            inactive-color="#ff4949"
            @change="sectionInfoEnable(scope)"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" min-width="18%">
        <template slot-scope="scope">
          <el-button @click="openUpdatestction(scope)" type="primary" size="small" icon="el-icon-edit">编辑</el-button>
          <el-button @click="deleteSection(scope)" type="danger" size="small" icon="el-icon-delete">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页组件 -->
    <Pagination
      v-bind:child-msg="formInline"
      @callFather="callFather"
    ></Pagination>
    <!-- 添加 -->
    <add-section
      :show="addSection"
      title="添加"
      @close="closeSectionDialog"
      @save="saveSection"
    ></add-section>
    <!-- 修改 -->
    <update-section
      :show="updateSectionFlag"
      :transSectionId="transSectionId"
      title="修改"
      @close="closeUpdateSectionDialog"
      @save="updateSectionManage"
    ></update-section>
  </div>
</template>
<script>
import Pagination from "../../components/Pagination";
import ApiPath from "@/api/ApiPath.js";
import api from "@/axios/api.js";
import AddSection from "./addSection";
import UpdateSection from "./updateSection";
export default {
  data() {
    return {
      name: "",
      sectionOptions: [],
      loading: false, //是显示加载
      transSectionId: "",
      addSection: false,
      updateSectionFlag: false,
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
    };
  },
  // 注册组件
  components: {
    Pagination,
    AddSection,
    UpdateSection,
  },
  mounted() {
    this.findSectionName();
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
    search: function (parameter) {
      if (parameter == "manual") {
        this.formInline.page = 1;
        this.formInline.limit = 10;
      }
      let params = {
        name: this.name,
        page: this.formInline.page,
        size: this.formInline.limit,
      };
      api.testAxiosGet(ApiPath.url.sectionSearch, params).then((res) => {
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
    //重置
    resetForm(search) {
      (this.name = ""), (this.formInline.page = 1);
      this.formInline.limit = 10;
      this.search(this.formInline);
    },
    // 版块名称下拉列表
    findSectionName: function () {
      let params = {};
      api
        .testAxiosGet(ApiPath.url.findSection, params)
        .then((res) => {
          if (res.state == "0") {
            for (let i = 0; i < res.data.length; i++) {
              this.sectionOptions.push({
                value: res.data[i]["name"],
                label: res.data[i]["name"],
              });
            }
          }
        })
        .catch(function (error) {});
    },
    //删除
    deleteSection: function (scope) {
      //状态为0不能被删除
      if (scope.row.status == 0) {
        this.$alert("数据状态生效不能被删除！", "提示", {
          confirmButtonText: "确定",
        });
        return false;
      }
      this.$confirm("确定要删除吗?删除后关联的文章也将被删除！", "信息", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          let params = {
            id: scope.row.id,
          };
          api.testAxiosGet(ApiPath.url.deleteSection, params).then((res) => {
            let code = res.state;
            if (code == "0") {
              this.$message.success(res.message);
              this.search(this.formInline);
              this.sectionOptions = [];
              this.findSectionName();
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
    beforeClose() {
      this.close();
    },
    close() {
      this.$emit("close");
    },
    //修改状态
    sectionInfoEnable: function (scope) {
      let params = {
        id: scope.row.id,
        status: scope.row.status,
        updateBy: localStorage.getItem("userInfo"),
      };
      api
        .testAxiosGet(ApiPath.url.sectionEnable, params)
        .then((res) => {
          let code = res.state;
          if (code == "0") {
            this.$message.success(res.message);
          }
          if (code == "1") {
            this.$message.success(res.message);
          }
          if (code == "2") {
            this.$message.error(res.message);
          }
          this.search(this.formInline);
        })
        .catch(function (error) {});
    },
    //新增
    closeSectionDialog() {
      this.search(this.formInline);
      this.addSection = false;
      this.sectionOptions = [];
      this.findSectionName();
    },
    addSectionInfo() {
      this.addSection = true;
    },
    saveSection() {
      this.addSection = false;
    },
    //编辑
    //显示编辑页面
    openUpdatestction(scope) {
      this.transSectionId = scope.row.id;
      this.updateSectionFlag = true;
    },
    closeUpdateSectionDialog() {
      this.search(this.formInline);
      this.transSectionId = "";
      this.updateSectionFlag = false;
      this.sectionOptions = [];
      this.findSectionName();
    },
    updateSectionManage() {
      this.updateSectionFlag = false;
    },
  },
};
</script>
<style scoped>
.height {
  margin-top: 5px;
  margin-left: -85px;
}
</style>