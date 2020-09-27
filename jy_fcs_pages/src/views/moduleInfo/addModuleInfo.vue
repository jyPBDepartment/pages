<template>
  <el-dialog
    :visible.sync="localShow"
    :title="title"
    :before-close="beforeClose"
    append-to-body
    modal-append-to-body
    width="30%"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
  >
    <!-- 插槽区 -->
    <slot>
      <el-form :model="editForm" :rules="rules" ref="editForm" :label-position="labelPosition" label-width="100px" style="margin-left:-85px">
        <el-form-item label="模块名称" prop="name">
          <el-input type="text" v-model="editForm.name" size="small" placeholder="不超过16个字" style="width:92%" maxlength="16"></el-input>
        </el-form-item>
        <el-form-item label="跳转路由" prop="routeUrl">
          <el-input type="text" v-model="editForm.routeUrl" size="small" placeholder="请输入跳转路由" style="width:92%"></el-input>
        </el-form-item>
        <el-form-item label="跳转类型" prop="tabMode">
         <template>
            <el-radio-group v-model="editForm.tabMode">
              <el-radio label="0">标签</el-radio>
              <el-radio label="1">导航</el-radio>
            </el-radio-group>
          </template>
        </el-form-item>
        <el-form-item label="模块图片" prop="imgUrl">
          <el-link type="danger" class="required" :underline="false">*</el-link>
          <el-upload
            style="width:92%;margin-top:-38px;"
            class="upload-demo"
            :action="upload"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :file-list="fileList"
            list-type="picture"
            :on-success="uploadSuccess"
            :limit="limit"
            :on-exceed="uploadExceed"
            :beforeUpload="beforeAvatarUpload"
          >
            <el-button size="small" type="primary" style="width:150%" icon="el-icon-plus">点击上传</el-button>
            <div slot="tip">只能上传jpg/png文件，且不超过1M</div>
          </el-upload>
        </el-form-item>
      </el-form>
    </slot>
    <!-- 按钮区 -->
    <span slot="footer">
      <el-button type="primary" icon="el-icon-check" @click="saveModuleInfo('editForm')" v-loading.fullscreen.lock="fullscreenLoading">保存</el-button>
      <el-button type="info" icon="el-icon-close" @click="close">关闭</el-button>
    </span>
  </el-dialog>
</template>
<script>
import qs from "qs";
import Vue from "vue";
import ApiPath from "@/api/ApiPath.js";
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
  },
  data() {
    return {
      fullscreenLoading: false,
      labelPosition: "right",
      editForm: {
        name: "",
        id: "",
        url: "",
        routeUrl:"",
        tabMode:"0",
        createUser: localStorage.getItem("userInfo"),
      },
      stateOptions: [
        { value: "0", label: "启用" },
        { value: "1", label: "禁用" },
      ],
      limit: 1,
      imgUrl: "",
      fileList: [],
      upload: ApiPath.url.uploadImg,
      localShow: this.show,
      rules: {
        name: [{ required: true, message: "请输入模块名称", trigger: "blur" }],
        routeUrl: [{ required: true, message: "请输入跳转路由", trigger: "blur" }],
        tabMode: [{ required: true, message: "请选择跳转类型", trigger: "blur" }],
      },
    };
  },
  watch: {
    show(val) {
      this.localShow = val;
    },
  },
  mounted() {},
  methods: {
    beforeAvatarUpload(file) {
      var testmsg = file.name.substring(file.name.lastIndexOf(".") + 1);
      const extension = testmsg === "jpg";
      const extension2 = testmsg === "png";
      const isLt2M = file.size / 1024 / 1024 < 1;
      if (!extension && !extension2) {
        this.$message({
          message: "上传文件只能是 jpg、png格式!",
          type: "warning",
        });
      }
      if (!isLt2M) {
        this.$message({
          message: "上传文件大小不能超过 1M!",
          type: "warning",
        });
      }
      return (extension || extension2) && isLt2M;
    },
    uploadExceed(files, fileList) {
      this.$message.error("只能上传一个图片，如需修改请先删除图片！");
      return;
    },
    uploadSuccess(response, file, fileList) {
      this.imgUrl = response.url;
    },
    handleRemove(file, fileList) {
      this.imgUrl="",
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    beforeClose() {
      this.close();
    },
    close() {
      this.$emit("close");
    },
    //新增保存
    saveModuleInfo(editData) {
      this.$refs[editData].validate((valid) => {
        if (this.editForm.name == "") {
          this.$alert("模块名称不能为空", "提示", {
            confirmButtonText: "确定",
          });
          return false;
        }
        if (this.editForm.routeUrl == "") {
          this.$alert("跳转路由不能为空", "提示", {
            confirmButtonText: "确定",
          });
          return false;
        }
        if (valid) {
          if (this.imgUrl != "") {
            this.editForm.url = this.imgUrl;
            let params = {
              moduleInfoEntity: this.editForm,
            };
            api.testAxiosGet(ApiPath.url.addModule, params)
              .then((res) => {
                let code = res.status;
                if (code == "0") {
                  this.close();
                  this.$message.success(res.message);
                } else {
                  this.$message.error(res.message);
                }
              }).catch(function (err) {});
                this.fullscreenLoading = true;
                setTimeout(() => {
                  this.fullscreenLoading = false;
                  this.editForm.name="";
                  this.editForm.url="";
                  this.editForm.routeUrl="";
                  this.editForm.tabMode="0";
                  this.fileList=[];
                }, 500);
          } else {
            this.$message.error("请上传图片");
            return;
          }
        } else {
          return false;
        }
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
  margin-left: -79px;
}
</style>