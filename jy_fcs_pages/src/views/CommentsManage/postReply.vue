<template>
  <el-dialog
    :visible.sync="localShow"
    :title="title"
    :before-close="beforeClose"
    append-to-body
    modal-append-to-body
    width="65%"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
  >
    <!-- 插槽区 -->
    <slot>
      <div>
        <!-- 面包屑导航 -->
        <!-- 搜索筛选 -->
        <el-form :inline="true" ref="searchForm" class="user-search">
          <el-form-item prop="type" label="回复内容">
            <el-input
              size="small"
              v-model="replyContent"
              placeholder="输入回复内容"
            ></el-input>
          </el-form-item>
          <el-form-item prop="type" label="回复人">
            <el-input
              size="small"
              v-model="replyUserName"
              placeholder="输入回复人"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              size="small"
              type="warning"
              icon="el-icon-search"
              @click="search('manual')"
              class="find"
              >查询</el-button
            >
            <el-button
              size="small"
              type="info"
              icon="el-icon-remove-outline"
              @click="resetForm('search')"
              class="small"
              >重置</el-button
            >
          </el-form-item>
          <br />
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
            align="center"
            min-width="5"
          ></el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="replyContent"
            label="回复内容"
            align="center"
            min-width="15"
          ></el-table-column>
          <el-table-column
            prop="replyUserName"
            label="回复人"
            align="center"
            min-width="10"
          ></el-table-column>
          <el-table-column
            sortable
            prop="replyDate"
            label="回复时间"
            width="200px"
            align="center"
            min-width="10"
          ></el-table-column>
          <!-- <el-table-column
            align="center"
            label="状态"
            prop="status"
            min-width="6"
          >
            <template slot-scope="scope">
              <el-switch
                v-model="scope.row.status"
                active-value="0"
                inactive-value="1"
                active-color="#13ce66"
                inactive-color="#ff4949"
                @change="commentEnable(scope)"
              ></el-switch>
            </template>
          </el-table-column> -->
          <el-table-column align="center" label="操作" min-width="15">
            <template slot-scope="scope">
              <el-button
                size="small"
                type="danger"
                @click="deleteUser(scope)"
                align="left"
                icon="el-icon-delete"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>

        <!-- 分页组件 -->
        <Pagination
          v-bind:child-msg="formInline"
          @callFather="callFather"
        ></Pagination>
      </div>
    </slot>
    <!-- 按钮区 -->
    <span slot="footer">
      <!-- <el-button type="primary" icon="el-icon-check" @click="saveArticle('editForm')">保存</el-button> -->
      <el-button type="info" icon="el-icon-close" @click="close"
        >关闭</el-button
      >
    </span>
  </el-dialog>
</template>
<script>
import Pagination from "@/components/Pagination";
//后台路径引用
import ApiPath from "@/api/ApiPath.js";
//数据请求交互引用
import api from "@/axios/api.js";
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
    transCommentId: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      localShow: this.show,
      replyContent: "",
      replyUserName: "",
      loading: true, //是显示加载
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
      userparm: [], //搜索权限
      listData: [], //用户数据
      commentId: "",
    };
  },
  components: {
    Pagination,
  },
  watch: {
    show(val) {
      this.localShow = val;
    },
    transCommentId(val) {
      this.commentId = val;
      this.search(this.formInline);
    },
  },
  mounted() {},
  methods: {
    close() {
      this.$emit("close");
    },
    beforeClose() {
      this.close();
    },
    // 分页插件事件
    callFather(parm) {
      this.formInline.page = parm.currentPage;
      this.formInline.limit = parm.pageSize;
      this.search(this.formInline);
    },
    // 获取评论列表
    search: function (parameter) {
      //点击搜索按钮时重置分页信息
      if (parameter == "manual") {
        this.formInline.page = 1;
        this.formInline.limit = 10;
      }
      //alert(JSON.stringify(parameter));
      let params = {
        commentId:this.commentId,
        content: this.replyContent,
        user: this.replyUserName,
        page: this.formInline.page,
        size: this.formInline.limit,
      };
      api
        .testAxiosGet(ApiPath.url.replySearch, params)
        .then((res) => {
          if (res.state == "0") {
            this.loading = false;
            this.listData = res.data.content;
            this.formInline.currentPage = res.data.number + 1;
            this.formInline.pageSize = res.data.size;
            this.formInline.total = res.data.totalElements;
          }
        })
        .catch(function (error) {});
    },

    //启用/禁用
    commentEnable: function (scope) {
      let params = {
        id: scope.row.id,
        status: scope.row.status,
      };
      api
        .testAxiosGet(ApiPath.url.commentEnable, params)
        .then((res) => {
          let code = res.state;
          this.$message.success(res.message);
        })
        .catch(function (error) {});
    },
    //重置
    resetForm(search) {
      //this.$refs['searchForm'].resetFields()
      this.replyContent = "";
      this.replyUserName = "";
      this.formInline.page = 1;
      this.formInline.limit = 10;
      this.search(this.formInline);
    },

    // 删除回复
    deleteUser(scope) {
      this.$confirm("确定要删除吗?", "信息", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        let params = {
          id: scope.row.id,
        };
        api.testAxiosGet(ApiPath.url.replyDelete, params).then((res) => {
          if (res.code == "200") {
            this.$message.success(res.message);
            //this.reload();
            this.listData.splice(scope.$index, 1);
          } else {
            this.$message.console.error();
          }
        });
      });
    },
  },
};
</script>

<style scoped>
.el-form {
  padding-left: 100px;
}
.el-button {
  border: none;
}
.required {
  color: red;
  margin-left: -50px;
}
</style>