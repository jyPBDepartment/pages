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
        <el-form-item label="主图图片" prop="url">
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
        <el-form-item label="课程名称" prop="title">
          <el-input type="text" v-model="editForm.title" size="small" placeholder="不超过32个字" style="width:92%" maxlength="32"></el-input>
        </el-form-item>
        <el-form-item label="课程地点" prop="address">
          <el-input type="text" v-model="editForm.address" size="small" style="width:92%" ></el-input>
        </el-form-item>
        <el-form-item label="上课日期" prop="lessonDay">
          <el-date-picker
            v-model="editForm.lessonDay"
            type="date" size="small" style="width:92%" 
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="上课时间" prop="lessonTime">
          <el-time-picker
            is-range size="small" style="width:92%" 
            v-model="editForm.lessonTime" format="HH:mm" 
            range-separator="至"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            placeholder="选择时间范围">
          </el-time-picker>
        </el-form-item>
        <el-form-item label="人数限制" prop="stuLimit">
          <el-input type="number" v-model="editForm.stuLimit" size="small" style="width:92%"></el-input>
        </el-form-item>
        <el-form-item label="课程介绍" prop="content">
          <el-input type="textarea" v-model="editForm.content" size="small" style="width:92%"></el-input>
        </el-form-item>
        <el-form-item label="参加指南" prop="remark">
          <el-input type="textarea" v-model="editForm.remark" size="small" style="width:92%"></el-input>
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
                  this.imgUrl="";
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