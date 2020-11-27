<template>
  <div>
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="生成类型">
        <el-select
          v-model="priceDefinedType"
          placeholder="请选择"
          style="width: 142px"
        >
          <el-option
            v-for="item in statusOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <city-select
          ref="citySelect"
          @changeSelect="changeSelect"
        ></city-select>
      </el-form-item>

      <el-form-item>
        <el-button
          type="warning"
          icon="el-icon-search"
          @click="search('manual')"
          >查询</el-button
        >
        <el-button type="info" icon="el-icon-close" @click="resetForm('search')"
          >重置</el-button
        >
      </el-form-item>
      <br />
      <el-row>
        <el-upload
          :multiple="false"
          :show-file-list="false"
          :action="importUrl"
          :before-upload="beforeUpload"
          :on-success="UploadSuccess"
          :on-error="UploadError"
          :data="uploadData"
        >
          <el-button type="primary" icon="el-icon-upload2">导入</el-button>
        </el-upload>
      </el-row>
      <br />
    </el-form>

    <!--列表-->
    <el-table
      size="mini"
      :data="listData"
      highlight-current-row
      v-loading="loading"
      border
      element-loading-text="拼命加载中"
      style="width: 100%"
    >
      <el-table-column
        type="index"
        label="序号"
        min-width="6"
        align="center"
      ></el-table-column>
      <el-table-column prop="area" label="区域" align="center" min-width="8">
      </el-table-column>
      <el-table-column
        prop="priceDate"
        label="导入时间"
        align="center"
        sortable
        min-width="10"
      ></el-table-column>
      <el-table-column
        prop="priceDefinedType"
        label="生成类型"
        align="center"
        min-width="10"
      >
        <template slot-scope="scope">
          <div v-if="scope.row.priceDefinedType == 0">手动导入</div>
          <div v-else>自动生成</div>
        </template>
      </el-table-column>
      <el-table-column
        prop="createUser"
        label="导入人"
        align="center"
        min-width="10"
      ></el-table-column>
      <el-table-column
        prop="maxPrice"
        label="最高价格(元/斤)"
        align="center"
        min-width="8"
      ></el-table-column>
      <el-table-column
        prop="minPrice"
        label="最低价格(元/斤)"
        align="center"
        min-width="8"
      ></el-table-column>
    </el-table>
    <!-- 分页组件 -->
    <Pagination
      v-bind:child-msg="formInline"
      @callFather="callFather"
    ></Pagination>
  </div>
</template>

<script>
import Pagination from "../../components/Pagination";
//后台路径引用
import ApiPath from "@/api/ApiPath.js";
//数据请求交互引用
import api from "@/axios/api.js";
import CitySelect from "../../components/citySelect.vue";
export default {
  inject: ["reload"],
  data() {
    return {
      importUrl: ApiPath.url.grainPricesImport,
      uploadData: {
        createBy: "",
        suffix: "",
      },
      priceDefinedType: "",
      url: "",
      updateUser: "",
      loading: false, //是显示加载
      editFormVisible: false, //控制编辑页面显示与隐藏
      menuAccessshow: false, //控制数据权限显示与隐藏
      addGrainPricesShow: false,
      updateGrainPricesShow: false,
      updateModuleInfoFlag: false,
      transModuleInfoId: "",
      transPasswordId: "",
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
        { value: "0", label: "手动导入" },
        { value: "1", label: "自动生成" },
      ],
      upLoading: null,
      selectObj: {
        province: "",
        city: "",
        district: "",
      },
    };
  },
  // 注册组件
  components: {
    Pagination,
    CitySelect,
  },
  watch: {},
  mounted() {},
  created() {
    this.search(this.formInline);
  },
  methods: {
    UploadError() {
      this.$message.error("上传失败");
      this.upLoading.close();
    },
    UploadSuccess() {
      this.$message.success("上传成功");
      this.upLoading.close();
      this.search("manual");
    },
    beforeUpload(file) {
      const extension = file.name.split(".")[1] === "xls";
      const extension2 = file.name.split(".")[1] === "xlsx";
      if (!extension && !extension2) {
        this.$message.error("上传模板只能是 xls、xlsx格式!");
        return;
      }
      this.uploadData.createBy = localStorage.getItem("userInfo");
      this.uploadData.suffix = file.name.split(".")[1];
      this.upLoading = this.$loading({
        lock: true,
        text: "正在上传",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      return extension || extension2; // 返回false不会自动上传
    },
    // 分页插件事件
    callFather(parm) {
      this.formInline.page = parm.currentPage;
      this.formInline.limit = parm.pageSize;
      this.search(this.formInline);
    },

    changeSelect(obj) {
      this.selectObj = obj;
    },
    search(parameter) {
      if (parameter == "manual") {
        this.formInline.page = 1;
        this.formInline.limit = 10;
      }
      let params = {
        priceDefinedType: this.priceDefinedType,
        status: this.status,
        page: this.formInline.page,
        size: this.formInline.limit,
        province: this.selectObj.province,
        city: this.selectObj.city,
        district: this.selectObj.district,
      };
      api.testAxiosGet(ApiPath.url.findGrainPricesList, params).then((res) => {
        let code = res.state;
        // console.log(res)
        if (code == "0") {
          this.loading = false;
          this.listData = res.data.content;
          this.formInline.currentPage = res.data.number + 1;
          this.formInline.pageSize = res.data.size;
          this.formInline.total = res.data.totalElements;
        }
      });
    },
    saveGrainPricesInfo() {
      this.addGrainPricesShow = false;
    },
    closeGrainPricesDialog() {
      this.search(this.formInline);
      this.addGrainPricesShow = false;
    },
    closeUpdateModuleInfoDialog() {
      this.search(this.formInline);
      this.updateGrainPricesShow = false;
    },
    upModuleInfo() {
      this.updateGrainPricesShow = false;
    },
    //启用/禁用
    moduleInfoEnable: function (scope) {
      let params = {
        id: scope.row.id,
        status: scope.row.status,
        updateUser: localStorage.getItem("userInfo"),
      };
      api
        .testAxiosGet(ApiPath.url.moduleInfoEnable, params)
        .then((res) => {
          let code = res.state;
          if (code == "0") {
            this.$message.success(res.message);
          } else {
            this.$message.success(res.message);
          }
          this.reload();
        })
        .catch(function (error) {});
    },
    //修改菜单排序
    sortChange: function (scope) {
      let params = {
        id: scope.row.id,
        sort: scope.row.sort,
      };
      api
        .testAxiosGet(ApiPath.url.changeModuleSort, params)
        .then((res) => {
          this.$message.success(res.message);
          // this.reload();
        })
        .catch(function (error) {});
    },
    //显示编辑界面
    openUpdateModuleInfo(scope) {
      this.transModuleInfoId = scope.row.id;
      this.updateGrainPricesShow = true;
    },
    //重置
    resetForm(search) {
      this.priceDefinedType = "";
      this.formInline.page = 1;
      this.formInline.limit = 10;
      this.$refs.citySelect.resetData();
      this.selectObj.province = "";
      this.selectObj.city = "";
      this.selectObj.district = "";
      this.search(this.formInline);
    },
    // 删除
    deleteModuleInfo(scope) {
      this.$confirm("确定要删除吗?", "信息", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          let params = {
            id: scope.row.id,
            currentUser: localStorage.getItem("userInfo"),
          };
          api
            .testAxiosGet(ApiPath.url.deleteGrainPricesInfoById, params)
            .then((res) => {
              let code = res.status;
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
.userModuleInfo {
  width: 100%;
}
.height {
  margin-top: 5px;
  margin-left: -125px;
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
