<template>
  <el-dialog
    :visible.sync="localShow"
    :title="title"
    :before-close="beforeClose"
    append-to-body
    modal-append-to-body
    width="40%"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
  >
    <!-- 插槽区 -->
    <slot>
      <el-form
        :rules="rules"
        ref="deployModuleForm"
        :model="deployModuleForm"
        label-width="100px"
        :label-position="labelPosition"
        style="margin-left:-85px"
      >
        <el-form-item label="发布模块" prop="deployModuleName">
          <el-input
            type="text"
            v-model="deployModuleForm.deployModuleName"
            size="small"
            placeholder="请输入发布模块名称(不超过16个字)"
            style="width:90%"
            maxlength="16"
          ></el-input>
        </el-form-item>
        <el-form-item label="连接路径" prop="linkUrl">
          <el-input type="text" v-model="deployModuleForm.linkUrl" size="small" placeholder="请输入连接路径" style="width:90%"></el-input>
        </el-form-item>
        <el-form-item label="模块图片" prop="imgUrl">
          <el-link type="danger" class="required" :underline="false">*</el-link>
          <el-upload
            style="width:90%;margin-top:-38px;"
            class="upload-demo"
            :action="upload"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :file-list="fileList"
            list-type="picture"
            :on-success="uploadSuccess"
            :limit="1"
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
      <el-button type="primary" icon="el-icon-check" @click="updateModule('deployModuleForm')"  v-loading.fullscreen.lock="fullscreenLoading">保存</el-button>
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
    transDeployModuleId: {
      type: String,
    },
  },
  data() {
    return {
      fullscreenLoading: false,
      localShow: this.show,
      isShow: false,
      limit: 1,
      imgUrl: "",
      upload: ApiPath.url.uploadImg,
      fileList: [],
      labelPosition: "right",
      editFormVisible: false,
      deployModuleForm: {
        deployModuleName: "",
        linkUrl: "",
        picUrl: "",
      },
      //rules表单验证
      rules: {
        deployModuleName: [{ required: true, message: "请输入发布模块名称", trigger: "blur" },],
        linkUrl: [{ required: true, message: "请输入连接路径", trigger: "blur" },],
      },
    };
  },
  watch: {
    show(val) {
      this.localShow = val;
    },
    transDeployModuleId(val) {
      let params = {
        id: val,
      };
      //根据Id查询用户信息
      api.testAxiosGet(ApiPath.url.depolyModuleFindId, params).then((res) => {
        this.deployModuleForm = res.data;
        let url = res.data.picUrl;
        let urlArry = url.split("/");
        let urlName = urlArry[urlArry.length - 1];
        this.fileList.push({ name: urlName, url: url });
        this.imgUrl = res.data.picUrl;
      });
    },
  },

  mounted() {},
  methods: {
    handle() {
      this.isShow = true;
    },
    cancal() {
      this.isShow = false;
    },

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
      return extension || (extension2 && isLt2M);
    },
    uploadExceed(files, fileList) {
      this.$message.error("只能上传一个图片，如需修改请先删除图片！");
      return;
    },
    uploadSuccess(response, file, fileList) {
      this.imgUrl = response.url;
    },
    handleRemove(file, fileList) {
      this.imgUrl = "";
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    updateModule(editData) {
      this.$refs[editData].validate((valid) => {
        if (this.deployModuleForm.deployModuleName == "") {
          this.$alert("发布模块名称不能为空", "提示", {
            confirmButtonText: "确定",
          });
          return false;
        }
        if (this.deployModuleForm.linkUrl == "") {
          this.$alert("连接路径不能为空", "提示", {
            confirmButtonText: "确定",
          });
          return false;
        }
        if (this.deployModuleForm.imgUrl == "") {
          this.$alert("图片路径不能为空", "提示", {
            confirmButtonText: "确定",
          });
          return false;
        }
        if (valid) {
          if (this.imgUrl != "") {
            this.deployModuleForm.picUrl = this.imgUrl;
            let params = { deployModuleEntity: this.deployModuleForm };
            api
              .testAxiosGet(ApiPath.url.updateDeployModule, params)
              .then((res) => {
                this.$message.success(res.message);
                this.close();
              })
              .catch(function (err) {
                this.$message.error(err.data);
              });
              this.fullscreenLoading = true;
              setTimeout(() => {
                this.fullscreenLoading = false;
              }, 500);
            this.deployModuleForm.updateUser = localStorage.getItem("userInfo");
          } else {
            this.$message.error("请上传图片");
            return;
          }
        } else {
          return false;
        }
      });
    },
    close: function () {
      this.fileList=[];
      this.$emit("close");
    },
    beforeClose: function () {
      this.close();
    },
  },
};
</script>

<style scoped>
.el-form {
  padding-left: 115px;
}
.el-button {
  border: none;
}
.required {
  color: red;
  margin-left: -79px;
}
</style>