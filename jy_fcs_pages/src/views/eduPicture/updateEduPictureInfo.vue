<template>
  <el-dialog
    :visible.sync="localShow"
    :title="title"
    :before-close="beforeClose"
    append-to-body
    modal-append-to-body
    width="35%"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
  >
    <!-- 插槽区 -->
    <slot>
      <el-form :rules="rules" ref="editForm" :model="editForm" label-width="100px" :label-position="labelPosition" style="margin-left:-100px">
        <el-form-item label="图片名称" prop="name">
          <el-input
            type="text"
            v-model="editForm.name"
            size="small"
            placeholder="请输入图片名称(限36个字)"
            style="width:90%"
            maxlength="36"
          ></el-input>
        </el-form-item>
        <el-form-item label="图片类型" prop="picType">
            <el-select v-model="editForm.picType"  style="width:45%;height:30px" size="small">
                <el-option label="轮播图" :value="0"></el-option>
                <el-option label="学习手册" :value="1"></el-option>
                <el-option label="考试" :value="2"></el-option>
            </el-select>
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
      </el-form>
    </slot>
    <!-- 按钮区 -->
    <span slot="footer">
      <el-button v-loading.fullscreen.lock="fullscreenLoading" type="primary" icon="el-icon-check" @click="updatePicture('editForm')">保存</el-button>
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
    transPictureInfoId: {
      type: String,
    },
  },
  data() {
    return {
      fullscreenLoading: false,
      localShow: this.show,
      limit: 1,
      imgUrl: "",
      upload: ApiPath.url.uploadImg,
      fileList: [],
      labelPosition: "right",
      editForm: {
        name:"",
        picType: "",
        url: "",
      },
      //rules表单验证
      rules: {
        name:[{required: true,message: "请输入图片名称", trigger: "change"}],
        picType: [{ required: true, message: "请选择图片类型", trigger: "blur" }],
      },
    };
  },
  watch: {
    show(val) {
      this.localShow = val;
    },
    transPictureInfoId(val) {
      if(val == ""){
        return;
      }
      let params = {
        id: val,
      };
      //根据Id查询用户信息
      api.testAxiosGet(ApiPath.url.pictureFindById, params).then((res) => {
        this.editForm = res.data;
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
    //判断图片格式 大小
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
      }  
      return (extension || extension2) && isLt2M;
    } ,
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
    updatePicture(editData) {
      this.$refs[editData].validate((valid) => {
        if (valid) {
          if (this.imgUrl != "") {
            this.editForm.url = this.imgUrl;
            let params = { eduPictureInfoEntity: this.editForm };
            api
              .testAxiosGet(ApiPath.url.updatePictureInfo, params)
              .then((res) => {
                this.$message.success(res.message);
                this.close();
              }).catch(function(err) {
                this.$message.error(err.data);
              })
              this.fullscreenLoading = true;
              setTimeout(() => {
                this.fullscreenLoading = false;
              }, 500);
            this.editForm.updateUser = localStorage.getItem("userInfo");
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
  margin-left: -50px;
}
</style>