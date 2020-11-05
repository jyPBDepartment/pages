<template>
  <el-dialog
    :visible.sync="localShow"
    :title="title"
    :before-close="beforeClose"
    append-to-body
    modal-append-to-body
    width="850px"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
  >
    <!-- 插槽区 -->
    <slot>
      <el-form :inline="true" class="user-search">
        <el-form-item label="试题类型" prop="quType">
          <el-select
            v-model="quType"
            style="width: 50%; height: 30px"
            size="small"
          >
            <el-option
              v-for="item in quTypeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              size="small"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button
            size="small"
            type="warning"
            icon="el-icon-search"
            @click="search('manual')"
            >查询</el-button
          >
          <el-button
            size="small"
            type="info"
            icon="el-icon-close"
            @click="resetForm('search')"
            >重置</el-button
          >
        </el-form-item>
        <br />
      </el-form>
      <el-table
        size="mini"
        :data="listData"
        highlight-current-row
        v-loading="loading"
        border
        element-loading-text="拼命加载中"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" min-width="10%"></el-table-column>
        <el-table-column
          type="index"
          label="序号"
          min-width="10%"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="quContent"
          min-width="30%"
          label="问题名称"
          align="center"
          :show-overflow-tooltip="true"
        ></el-table-column>
        <el-table-column
          prop="quType"
          min-width="25%"
          label="试题类型"
          align="center"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="scope">
            <span v-if="scope.row.quType == '0'">选择题</span>
            <span v-if="scope.row.quType == '1'">判断题</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="score"
          min-width="25%"
          label="分值"
          align="center"
          :show-overflow-tooltip="true"
        ></el-table-column>
      </el-table>
    </slot>
    <!-- 按钮区 -->
    <span slot="footer">
      <el-button type="primary" icon="el-icon-check" @click="confirm()"
        >确认</el-button
      >
      <el-button type="info" icon="el-icon-close" @click="close()"
        >关闭</el-button
      >
    </span>
    <!-- 分页组件 -->
    <Pagination
      v-bind:child-msg="formInline"
      @callFather="callFather"
    ></Pagination>
  </el-dialog>
</template>
<script>
import qs from "qs";
import Vue from "vue";
import ApiPath from "@/api/ApiPath.js";
import api from "@/axios/api.js";
import Pagination from "../../components/Pagination";
export default {
  inject: ["reload"],
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: "对话框",
    },
    transShowQuestionId: {
      type: Object,
    },
  },
  data() {
    return {
      loading: false, //是显示加载
      labelPosition: "right",
      quType: "",
      voationId: "",
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
      localShow: this.show,
      quTypeOptions: [
        { value: "", label: "全部" },
        { value: "0", label: "选择题" },
        { value: "1", label: "判断题" },
      ],
      multipleSelection: [],
      selectData: [],
    };
  },
  // 注册组件
  components: {
    Pagination,
  },
  watch: {
    show(val) {
      this.localShow = val;
    },
    transShowQuestionId(val) {
      this.quType = "";
      this.voationId = val.vocationId;
      this.selectData = val.listData;
      this.search(this.formInline);
      // console.log(val.listData);
    },
  },
  mounted() {},
  created() {
    this.search(this.formInline);
  },
  methods: {
    //选中结果
    handleSelectionChange(val) {
      this.multipleSelection = val;
      // console.log(this.multipleSelection);
    },
    callFather(parm) {
      this.formInline.page = parm.currentPage;
      this.formInline.limit = parm.pageSize;
      this.search(this.formInline);
    },
    // 获取角色列表
    search: function (parameter) {
      this.listData = [];
      if (parameter == "manual") {
        this.formInline.page = 1;
        this.formInline.limit = 10;
      }
      let params = {
        quType: this.quType,
        voationId: this.voationId,

        page: this.formInline.page,
        size: this.formInline.limit,
      };
      api.testAxiosGet(ApiPath.url.showQuestion, params).then((res) => {
        let code = res.state;

        if (code == "0") {
          console.log(this.selectData)
          this.loading = false;
          let data = [];
          if (this.selectData.length >= 1) {
           let result =res.data.content
            for (let j = 0; j < this.selectData.length; j++) {
              for (let i = 0;i< result.length; i++) {
                if (this.selectData[j].id == result[i].id) {
                  console.log("循环单个结果："+result[i]);

                  result.splice(i,1);
                  break;
                }
              }
            }
           
            this.listData = result;
            this.formInline.currentPage = res.data.number + 1;
            this.formInline.pageSize = res.data.size;
            this.formInline.total = res.data.totalElements;
          } else {
            this.listData = res.data.content;
            this.formInline.currentPage = res.data.number + 1;
            this.formInline.pageSize = res.data.size;
            this.formInline.total = res.data.totalElements;
          }
        }
      });
    },
    //重置
    resetForm(search) {
      (this.quType = ""), (this.formInline.page = 1);
      this.formInline.limit = 10;
      this.search(this.formInline);
    },
    beforeClose() {
      this.close();
    },
    close() {
      // this.multipleSelection = [];
      this.$emit("close");
    },
    confirm() {
      this.transShowQuestionId.vocationId = "";
      this.$emit("show", this.multipleSelection);
      // this.multipleSelection=[];

      this.close();
    },
  },
};
</script>

<style scoped>
.el-button {
  border: none;
}
</style>