/**
 * 门户菜单 Banner图管理
 */
<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">门户管理</el-breadcrumb-item>
      <el-breadcrumb-item>Banner图管理</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 搜索筛选 -->
    <el-form :inline="true" :model="formInline" class="user-search">
      <el-form-item label="搜索：">
        <el-input size="small" v-model="formInline.name" placeholder="输入Banner名称"></el-input>
      </el-form-item>
      <!-- <el-form-item label>
        <el-input size="small" v-model="formInline.deptNo" placeholder="输入部门代码"></el-input>
      </el-form-item>-->
      <el-form-item>
        <el-button size="small" type="primary" icon="el-icon-search" @click="search" class="find">查询</el-button>
        <el-button
          type="info"
          plain
          @click="resetRuleTag(search)"
          size="medium"
          class="small"
          icon="el-icon-close"
        >重置</el-button>
      </el-form-item>
      <el-row>
        <el-button
          size="small"
          type="primary"
          icon="el-icon-plus"
          @click="handleEdit()"
          class="insert"
        >添加</el-button>
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
      <!-- <el-table-column align="center" type="selection" width="60"></el-table-column> -->
      <el-table-column sortable prop="name" label="Banner名称" min-width="12"></el-table-column>
      <el-table-column sortable prop="title" label="大标题" min-width="12"></el-table-column>
      <el-table-column sortable prop="subTitle" label="小标题" min-width="12">
        <!-- <template slot-scope="scope">
          <div>{{scope.row.editTime|timestampToTime}}</div>
        </template>-->
      </el-table-column>
      <el-table-column sortable prop="buttonTitle" label="按钮名称" min-width="12"></el-table-column>
      <el-table-column sortable prop="url" label="图片" min-width="12">
        <template slot-scope="scope">
          <el-image :src="scope.row.url" style="width:100px;height:100px;"></el-image>
        </template>
      </el-table-column>
      <el-table-column sortable prop="status" label="状态" min-width="8">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.status"
            active-value="0"
            inactive-value="1"
            @change="changeStatus(scope)"
            active-color="#13ce66"
            inactive-color="#ff4949"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column sortable prop="createDate" label="创建时间" min-width="13"></el-table-column>
      <el-table-column sortable prop="updateDate" label="修改时间" min-width="13"></el-table-column>
      <el-table-column align="center" label="操作" min-width="20">
        <template slot-scope="scope">
          <el-button
            size="small"
            type="primary"
            @click="handleEdit(scope.$index, scope.row)"
            class="up"
            icon="el-icon-edit"
          >编辑</el-button>
          <el-button
            size="small"
            type="primary"
            @click="deleteUser(scope.$index, scope.row)"
            class="del"
            icon="el-icon-delete"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页组件 -->
    <Pagination v-bind:child-msg="pageparm" @callFather="callFather"></Pagination>
    <!-- 编辑界面 -->
    <el-dialog :title="title" :visible.sync="editFormVisible" width="30%" @click="closeDialog">
      <el-form label-width="120px" :model="editForm" :rules="rules" ref="editForm">
        <el-form-item label="Banner名称" prop="name">
          <el-input
            size="small"
            v-model="editForm.name"
            auto-complete="off"
            placeholder="请输入Banner名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="大标题" prop="title">
          <el-input size="small" v-model="editForm.title" auto-complete="off" placeholder="请输入大标题"></el-input>
        </el-form-item>
        <el-form-item label="小标题" prop="subTitle">
          <el-input
            size="small"
            v-model="editForm.subTitle"
            auto-complete="off"
            placeholder="请输入小标题"
          ></el-input>
        </el-form-item>
        <el-form-item label="按钮名称" prop="buttonTitle">
          <el-input
            size="small"
            v-model="editForm.buttonTitle"
            auto-complete="off"
            placeholder="请输入按钮名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="图片" prop="imgUrl">
          <el-upload
            class="upload-demo"
            :action="upload"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :file-list="fileList"
            list-type="picture"
            :on-success="uploadSuccess"
            :limit="limit"
            :on-exceed="uploadExceed"
          >
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button
          class="icon"
          size="small"
          type="success"
          :loading="loading"
          @click="submitForm('editForm')"
          icon="el-icon-check"
        >保存</el-button>
        <el-button size="small" class="closeIcon" @click="closeDialog" icon="el-icon-close">关闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Pagination from "@/components/Pagination";

//后台路径引用
import ApiPath from "@/api/ApiPath.js";
//数据请求交互引用
import api from "@/axios/api.js";

export default {
  inject: ["reload"],
  data() {
    return {
      trueFlag: true,
      falseFlag: false,
      limit: 1,
      imgUrl: "",
      fileList: [],
      upload: ApiPath.url.uploadImg,
      nshow: true, //switch开启
      fshow: false, //switch关闭
      loading: false, //是显示加载
      editFormVisible: false, //控制编辑页面显示与隐藏
      title: "添加",
      editForm: {
        name: "",
        title: "",
        subTitle: "",
        buttonTitle: "",
        url: ""
      },
      // rules表单验证
      rules: {
        name: [
          { required: true, message: "请输入Banner图名称", trigger: "blur" }
        ],
        title: [{ required: true, message: "请输入大标题", trigger: "blur" }]
      },
      formInline: {
        page: 1,
        limit: 10,
        varLable: "",
        name: "",
        token: localStorage.getItem("logintoken")
      },
      // 删除部门
      seletedata: {
        ids: "",
        token: localStorage.getItem("logintoken")
      },
      userparm: [], //搜索权限
      listData: [], //用户数据
      // 分页参数
      pageparm: {
        currentPage: 1,
        pageSize: 10,
        total: 10
      }
    };
  },
  // 注册组件
  components: {
    Pagination
  },
  /**
   * 数据发生改变
   */

  /**
   * 创建完毕
   */
  created() {
    this.getdata(this.formInline);
  },

  /**
   * 里面的方法只有被调用才会执行
   */
  methods: {
    resetRuleTag(search) {
      this.formInline.name = "";
    },
    changeStatus(scope) {
      let params = { id: scope.row.id, status: scope.row.status };
      api
        .testAxiosGet(ApiPath.url.changeBannerStatus, params)
        .then(res => {
          let code = res.status;
          if (code == "0") {
            // this.reload();
            this.$message.success(res.message);
            this.loading = false;
          } else {
            this.$message.error(res.message);
          }
        })
        .catch(err => {
          // this.loading = false;
          this.$message.error(err.data);
        });
    },
    uploadExceed(files, fileList) {
      this.$message.error("只能上传一个图片，如需修改请先删除图片！");
      return;
    },
    uploadSuccess(response, file, fileList) {
      this.imgUrl = response.url;
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    // 获取公司列表
    getdata(parameter) {
      this.loading = true;
      let params = {
        name: parameter.name,
        page: parameter.page,
        size: parameter.limit
      };
      api
        .testAxiosGet(ApiPath.url.findBannerPageInfo, params)
        .then(res => {
          let code = res.status;
          if (code == "0") {
            this.$message.success(res.message);
            this.loading = false;
            for (let i = 0; i < res.data.content.length; i++) {
              res.data.content[i]["createDate"] = this.formatDate(
                res.data.content[i]["createDate"]
              );
              res.data.content[i]["updateDate"] = this.formatDate(
                res.data.content[i]["updateDate"]
              );
            }
            this.listData = res.data.content;
            this.pageparm.currentPage = res.data.number + 1;
            this.pageparm.pageSize = res.data.size;
            this.pageparm.total = res.data.totalElements;
          } else {
            this.$message.error(res.message);
          }
        })
        .catch(err => {
          this.$message.error(err.data);
        });
    },

    formatDate(timestamp) {
      if (timestamp != "" && timestamp != null) {
        return timestamp.replace(/T/g, " ").replace(".000+0000", "");
      } else {
        return "";
      }
    },
    // 分页插件事件
    callFather(parm) {
      this.formInline.page = parm.currentPage;
      this.formInline.limit = parm.pageSize;
      this.getdata(this.formInline);
    },
    // 搜索事件
    search() {
      this.getdata(this.formInline);
    },
    //显示编辑界面
    handleEdit: function(index, row) {
      this.editFormVisible = true;
      if (row != undefined && row != "undefined") {
        this.title = "修改";
        this.editForm.id = row.id;
        this.editForm.name = row.name;
        this.editForm.title = row.title;
        this.editForm.subTitle = row.subTitle;
        this.editForm.buttonTitle = row.buttonTitle;
        this.editForm.url = row.url;
        let array = row.url.split("/");
        this.fileList.push({ name: array[array.length - 1], url: row.url });
        this.imgUrl = row.url;
      } else {
        this.title = "添加";
        // this.editForm.name = row.name;
        // this.editForm.title = row.title;
        // this.editForm.subTitle = row.subTitle;
        // this.editForm.buttonTitle = row.buttonTitle;
        // this.editForm.url = row.url;
      }
    },
    // 编辑、增加页面保存方法
    submitForm(editData) {
      this.$refs[editData].validate(valid => {
        if (valid) {
          if (this.imgUrl != "") {
            this.editForm.url = this.imgUrl;
            let params = { bannerEntity: this.editForm };
            api
              .testAxiosGet(ApiPath.url.addBanner, params)
              .then(res => {
                let code = res.status;
                if (code == "1") {
                  this.reload();
                  this.$message.success(res.message);
                  this.loading = false;
                } else {
                  this.$message.error(res.message);
                }
              })
              .catch(err => {
                // this.loading = false;
                this.$message.error(err.data);
              });
          } else {
            this.$message.error("请上传图片");
            return;
          }
        } else {
          return false;
        }
      });
    },
    // 删除公司
    deleteUser(index, row) {
      this.$confirm("确定要删除吗?", "信息", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let params = { id: row.id };
          api
            .testAxiosGet(ApiPath.url.deleteBanner, params)
            .then(res => {
              let code = res.status;
              if (code == "1") {
                this.reload();
                this.$message.success(res.message);
                this.loading = false;
              } else {
                this.$message.error(res.message);
              }
            })
            .catch(err => {
              // this.loading = false;
              this.$message.error(err.data);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    // 关闭编辑、增加弹出框
    closeDialog() {
      this.editFormVisible = false;
    }
  }
};
</script>

<style scoped>
.user-search {
  margin-top: 20px;
}
.userRole {
  width: 100%;
}
.template {
  size: medium;
  color: rgb(17, 17, 17);
  background-color: rgb(199, 215, 231);
  border-color: rgb(121, 212, 59);
  border-radius: 3px;
}
/* .el-button {
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
} */
.find {
  width: 82px;
  background-color: #e6a23c;
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
/* .insert {
  width: 82px;
  background-color: #67c23a;
  border-color: #67c23a;
  color: #fff;
  font-size: 12px;
  margin-top: 4px;
  margin-bottom: 15px;
} */
/* .el-button.up {
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
} */
.icon {
  size: medium;
  border-radius: 0px;
  background-color: #409eff;
  border-color: #409eff;
  color: white;
  font-size: 12px;
  width: 105px;
  height: 42px;
  box-shadow: 0 0px #fff;
}
.closeIcon {
  border-radius: 0px;
  background-color: white;
  border-color: #fff;
  width: 105px;
  height: 42px;
  color: black;
  font-size: 12px;
  box-shadow: 0 0 #fff;
}
</style>

 
 