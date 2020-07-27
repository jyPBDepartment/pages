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
      <el-form :rules="rules" ref="moduleInfoForm" :model="moduleInfoForm" label-width="120px"    :label-position="labelPosition">
      
        <el-form-item label="名称" prop="name">
          <el-input type="text" v-model="moduleInfoForm.name" placeholder="请输入名称" style=" width:70%;" ></el-input>
        </el-form-item>
          <el-form-item   label="图片" prop="imgUrl">
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
            <el-button size="small" type="primary" style="background-color:rgb(132, 193, 255);border:none;color:white;font-size:12px">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-form-item>
      </el-form>
    </slot>
    <!-- 按钮区 -->
    <span slot="footer">
      <el-button type="success" icon="el-icon-check" style="background-color:#409EFF;border-color:#409EFF;color:white;font-size:12px" @click="updateModule('moduleInfoForm')">保存</el-button>
      <el-button type="danger" icon="el-icon-close" @click="close"  size="medium" style="background-color:white;border-color:black;color:black;font-size:12px">关闭</el-button>
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
      default: false
    },
    title: {
      type: String,
      default: "对话框"
    },
    transModuleInfoId: {
      type: String
    }
  },
  data() {
    return {
      localShow: this.show,
      isShow:false,
     
      limit: 1,
      imgUrl: "",
      upload: ApiPath.url.uploadImg,
      fileList: [],
      labelPosition: "right",
      editFormVisible: false,
      moduleInfoForm: {
        name: "",
        status: "",
        url: ""
      },
      //rules表单验证
      rules: {
        name: [{ required: true, message: "请输入名称", trigger: "blur" }]
      }
    };
  },
  watch: {
    show(val) {
      this.localShow = val;
    },
    transModuleInfoId(val) {
      let params = {
        id: val
      };
      //根据Id查询用户信息
      api.testAxiosGet(ApiPath.url.moduleFindById, params).then(res => {
        this.moduleInfoForm = res.data;
        let url = res.data.url;
        let urlArry = url.split("/");
        let urlName = urlArry[urlArry.length - 1];
        this.fileList.push({ name: urlName, url: url });

        this.imgUrl = res.data.url;
      });
    }
  },
  mounted() {
  },
  methods: {
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
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    updateModule(editData) {
      this.$refs[editData].validate(valid => {
        if (valid) {
          if (this.imgUrl != "") {
            this.moduleInfoForm.url = this.imgUrl;
            let params = { moduleInfoEntity: this.moduleInfoForm };
            api
              .testAxiosGet(ApiPath.url.updateModuleInfo, params)
              .then(res => {
                
                this.$message.success(res.message);
                this.reload();
              })
              .catch(err => {
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
    close: function() {
      this.$emit("close");
    },
    beforeClose: function() {
      this.close();
    }
  }
};
</script>

<style scoped>
.el-form {
  padding-left: 115px;
}
.el-button{
    
    border: none;
    
    padding: 15px 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
   
    margin: 4px 2px;
    cursor: pointer;
    -webkit-transition-duration: 0.4s; /* Safari */
    transition-duration: 0.4s;
}

.el-button:hover {
    box-shadow: 0 12px 16px 0 rgba(0,0,0,0.24),0 17px 50px 0 rgba(0,0,0,0.19);
}
</style>