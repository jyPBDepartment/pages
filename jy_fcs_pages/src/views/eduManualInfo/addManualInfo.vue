<template>
  <el-dialog
    :visible.sync="localShow"
    :title="title"
    :before-close="beforeClose"
    append-to-body
    modal-append-to-body
    width="700px"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
  >
    <!-- 插槽区 -->
    <slot>
      <el-form :model="editForm" :rules="rules" ref="editForm" :label-position="labelPosition" label-width="100px" style="margin-left:-85px">
        <el-form-item label="类型" prop="manualType">
          <span>文章</span>
        </el-form-item>
        <el-form-item label="标题" prop="title">
          <el-input type="text" v-model="editForm.title" size="small" placeholder="请输入标题(限128个字)" style="width:80%;" maxlength="128"></el-input>
        </el-form-item>
        <el-form-item label="职业类别" prop="vocationId">
          <el-select v-model="editForm.vocationId" style="width:35%;height:30px" size="small">
            <el-option v-for="item in vocationIdOptions" :key="item.value" :label="item.label" :value="item.value" size="small"></el-option>
          </el-select>
        </el-form-item>
         <el-form-item label="标签" prop="labelId">
            <el-select v-model="editForm.labelId" style="width:35%;height:30px" size="small">
                <el-option v-for="item in labelIdOptions" :key="item.value" :label="item.label" :value="item.value" size="small"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="导读" prop="guide">
          <el-input
            type="textarea"
            v-model="editForm.guide"
            size="small"
            placeholder="请输入导读(限200个字)"
            style="width:90%;"
            rows="5"
            maxlength="200"
          ></el-input>
        </el-form-item>
        <el-form-item label="图片" prop="imgUrl">
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
        <el-form-item label="内容" prop="content"></el-form-item>
          <el-form-item style="margin-left:-65px;">
            <div>
              <el-card style="height: 450px;width:560px;">
                <quill-editor v-model="editForm.content" ref="myQuillEditor" style="height: 345px;" :options="editorOption">
                </quill-editor>
              </el-card>
            </div>
          </el-form-item>
      </el-form>
    </slot>
    <!-- 按钮区 -->
    <span slot="footer">
      <el-button type="primary" icon="el-icon-check" @click="saveManualInfo('editForm')" v-loading.fullscreen.lock="fullscreenLoading">保存</el-button>
      <el-button type="info" icon="el-icon-close" @click="close">关闭</el-button>
    </span>
  </el-dialog>
</template>
<script>
import qs from "qs";
import Vue from "vue";
import ApiPath from "@/api/ApiPath.js";
import api from "@/axios/api.js";
import {Quill,quillEditor} from 'vue-quill-editor'
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
        title:"",
        manualType: "",
        vocationId: "",
        labelId: "",
        guide: "",
        content:"",
        id: "",
        url: "",
        createBy: localStorage.getItem("userInfo"),
      },
      vocationIdOptions: [],
      labelIdOptions:[],
      limit: 1,
      imgUrl: "",
      fileList: [],
      upload: ApiPath.url.uploadImg,
      localShow: this.show,
      rules: {
        title: [{required: true, message: "请输入标题", trigger: "change"}],
        vocationId: [{required: true, message: "请选择职业类别", trigger: "change"}],
        labelId: [{required: true, message: "请选择标签", trigger: "change"}],
        guide: [{required: true, message: "请输入导读", trigger: "change"}],
        content: [{required: true, message: "请输入内容", trigger: "change"}],
      },
      editorOption: { // 富文本框配置
        placeholder: "请输入...",
          theme: "snow", 
          modules: {
         }
      }
    };
  },
  components: {
    quillEditor
  },
  watch: {
    show(val) {
      this.localShow = val;
    },
  },
  mounted() {
      this.findVocationId();
      this.findLabelId();
  },
  methods: {
    //判断图片格式大小
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
    // 职业类别下拉列表
    findVocationId: function () {
      let params = {};
      api.testAxiosGet(ApiPath.url.findVocationId, params)
        .then((res) => {
          if (res.state == "0") {
            for (let i = 0; i < res.data.length; i++) {
              this.vocationIdOptions.push({
                value: res.data[i]["id"],
                label: res.data[i]["name"],
              });
            }
          }
        }).catch(function (error) {});
    },
     // 标签下拉列表
    findLabelId: function () {
      let params = {};
      api
        .testAxiosGet(ApiPath.url.findLabelId, params)
        .then((res) => {
          if (res.state == "0") {
            for (let i = 0; i < res.data.length; i++) {
              this.labelIdOptions.push({
                value: res.data[i]["id"],
                label: res.data[i]["name"],
              });
            }
          }
        })
        .catch(function (error) {});
    },
    //新增保存
    saveManualInfo(editData) {
      this.$refs[editData].validate((valid) => {
        if (valid) {
          if (this.imgUrl != "") {
            this.editForm.url = this.imgUrl;
            let params = {
              eduManualInfoEntity: this.editForm,
            };
            api.testAxiosGet(ApiPath.url.addManualInfo, params)
              .then((res) => {
                let code = res.state;
                if (code == "0") {
                  this.$message.success(res.message);
                  this.close();
                } else {
                  this.$message.error(res.message);
                }
              }).catch(function (err) {});
                this.fullscreenLoading = true;
                setTimeout(() => {
                    this.fullscreenLoading = false;
                    this.editForm.title="",
                    this.editForm.vocationId="",
                    this.editForm.labelId="",
                    this.editForm.guide="",
                    this.editForm.content="",
                    this.editForm.url="";
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
  margin-left: -50px;
}

</style>