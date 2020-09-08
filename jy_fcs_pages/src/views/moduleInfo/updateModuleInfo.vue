<template>
  <el-dialog
    :visible.sync="localShow"
    :title="title"
    :before-close="beforeClose"
    append-to-body
    modal-append-to-body
    width="50%"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
  >
    <!-- 插槽区 -->
    <slot>
      <el-form :rules="rules" ref="moduleInfoForm" :model="moduleInfoForm" label-width="100px" :label-position="labelPosition">
        <el-form-item label="模块名称" prop="name">
          <el-input size="small" type="text" v-model="moduleInfoForm.name" placeholder="请输入名称(不能超过16个字符)" style=" width:75%;" maxlength="16"></el-input>
        </el-form-item>
        <el-form-item label="跳转路由" prop="routeUrl">
          <el-input
            type="text"
            v-model="moduleInfoForm.routeUrl"
            size="small"
            placeholder="请输入跳转路由(不能超过16个字符)"
            style="width:80%"
            maxlength="16"
          ></el-input>
        </el-form-item>
        <el-form-item label="跳转类型" prop="tabMode">
         <template>
            <el-radio-group v-model="moduleInfoForm.tabMode">
              <el-radio :label='"0"'>标签</el-radio>
              <el-radio :label='"1"'>导航</el-radio>
            </el-radio-group>
          </template>
        </el-form-item>
        <el-form-item label="模块图片" prop="imgUrl">
          <el-link type="danger" class="required" :underline="false">*</el-link>
          <el-upload
            style="width:75%;margin-top:-38px;"
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
      <el-button
      :disabled="saveFlag"
        type="primary"
        icon="el-icon-check"
        @click="updateModule('moduleInfoForm')"
      >保存</el-button>
      <el-button
        type="info"
        icon="el-icon-close"
        @click="close"
      >关闭</el-button>
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
    transModuleInfoId: {
      type: String,
    },
  },
  data() {
    return {
      saveFlag:false,
      localShow: this.show,
      isShow: false,
      limit: 1,
      imgUrl: "",
      upload: ApiPath.url.uploadImg,
      fileList: [],
      labelPosition: "right",
      editFormVisible: false,
      moduleInfoForm: {
        name: "",
        status: "",
        url: "",
        routeUrl:"",
        tabMode:"",
      },
      //rules表单验证
      rules: {
        name: [{ required: true, message: "请输入模块名称", trigger: "blur" }],
      },
    };
  },
  watch: {
    show(val) {
      this.localShow = val;
    },
    transModuleInfoId(val) {
      let params = {
        id: val,
      };
      //根据Id查询用户信息
      api.testAxiosGet(ApiPath.url.moduleFindById, params).then((res) => {
        this.moduleInfoForm = res.data;
        console.log(this.moduleInfoForm.tabMode);
        let url = res.data.url;
        let urlArry = url.split("/");
        let urlName = urlArry[urlArry.length - 1];
        this.fileList.push({ name: urlName, url: url });

        this.imgUrl = res.data.url;
      });
    },
  },
  mounted() {},
  methods: {
    beforeAvatarUpload(file) {                
      var testmsg=file.name.substring(file.name.lastIndexOf('.')+1)                 
      const extension = testmsg === 'jpg'  
      const extension2 = testmsg === 'png'  
      const isLt2M = file.size / 1024 / 1024 < 1 
      if(!extension && !extension2) {  
          this.$message({  
              message: '上传文件只能是 jpg、png格式!',  
              type: 'warning'  
          });  
      }  
      if(!isLt2M) {  
          this.$message({  
              message: '上传文件大小不能超过 1M!',  
              type: 'warning'  
          });  
      }  return extension || extension2 && isLt2M  
} ,
    handle() {
      this.isShow = true;
    },
    cancal() {
      this.isShow = false;
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
    updateModule(editData) {
      this.$refs[editData].validate((valid) => {
        if (this.moduleInfoForm.name == "") {
          this.$alert("模块名称不能为空", "提示", {
            confirmButtonText: "确定",
          });
          return false;
        }
        if (valid) {
          if (this.imgUrl != "") {
            this.moduleInfoForm.url = this.imgUrl;
            this.saveFlag = true;
            let params = { moduleInfoEntity: this.moduleInfoForm };
            api
              .testAxiosGet(ApiPath.url.updateModuleInfo, params)
              .then((res) => {
                this.$message.success(res.message);
                this.reload();
              })
              .catch(function(err) {
                this.saveFlag = false;
                this.$message.error(err.data);
              });
            this.moduleInfoForm.updateUser = localStorage.getItem("userInfo");
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