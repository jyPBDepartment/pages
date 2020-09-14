
<template>

  <div class="websiteInfoFunction">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>门户管理</el-breadcrumb-item>
      <el-breadcrumb-item>网站信息</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 显示网站信息数据 -->    
    <el-form :model="websiteInfoForm" :rules="rules" ref="websiteInfoForm" class="demo-ruleForm">
      <el-row>
        <el-col :span="10">
          <el-form-item label="网站名称：" prop="name">
            <el-input size="small" type="text" v-model="websiteInfoForm.name" style="width:65%"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="备案号码：" prop="recordNo">
            <el-input size="small" type="text" v-model="websiteInfoForm.recordNo" style="width:65%"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="10">
          <el-form-item label="网站Logo：" prop="imgUrl1">
            <span class="requiredLogo">*</span>
            <el-upload
              style="width:81%"
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
              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过1M</div>
            </el-upload>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="公众号图片：" prop="imgUrl2">
            <span class="required">*</span>
            <el-upload
              style="width:81%"
              class="upload-demo"
              :action="uploadUrl"
              :on-preview="handlePreviewUrl"
              :on-remove="handleRemoveUrl"
              :file-list="fileListUrl"
              list-type="picture"
              :on-success="uploadSuccessUrl"
              :limit="limit"
              :on-exceed="uploadExceedUrl"
              :beforeUpload="beforeAvatarUpload"
            >
              <el-button size="small" type="primary" style="width:150%" icon="el-icon-plus">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过1M</div>
            </el-upload>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="10">
          <el-form-item label="版权信息：" prop="copyRight">
            <el-input size="small" type="text" v-model="websiteInfoForm.copyRight" style="width:65%"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="热线电话：" prop="hotline">
            <el-input size="small" type="text" v-model="websiteInfoForm.hotline" style="width:65%"  onkeyup="value=value.replace(/[^\d]/g,'')" placeholder="只能输入数字"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="10">
          <el-form-item label="反馈邮箱：" prop="email">
            <el-input size="small" type="text" v-model="websiteInfoForm.email" style="width:65%" @blur="sendEmail"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="公司地址：" prop="address">
            <el-input size="small" type="text" v-model="websiteInfoForm.address" style="width:65%"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

       <el-row>
        <el-col :span="19">
          <el-form-item label="友情链接：" prop="linkAddress">
            <el-input size="small" type="text" v-model="websiteInfoForm.linkAddress" style="width:86.8%;"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

       <el-row>
        <el-col :span="19">
          <el-form-item label="链接名称：" prop="linkName">
            <el-input size="small" type="text" v-model="websiteInfoForm.linkName" style="width:86.8%;"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="18" align="right">
          <span>
            <el-button size="small" style="width:15% " type="primary" icon="el-icon-check" @click="updateWebsiteInfo('websiteInfoForm')">提交</el-button>
          </span>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
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
      imgUrl1: "",
      imgUrl2: "",
      limit: 1,
      upload: ApiPath.url.uploadImg,
      uploadUrl: ApiPath.url.uploadImg,
      websiteInfoForm: {
        id: "",
        name: "",
        logoUrl: "",
        recordNo: "",
        copyRight: "",
        url: "",
        hotline: "",
        email: "",
        address: "",
        mapUrl: "",
        linkAddress: "",
        linkName:""
      },
      fileList: [],
      fileListUrl: [],
      rules: {
        name: [{ required: true, message: "请输入网站名称", trigger: "blur" }],
        recordNo: [{ required: true, message: "请输入备案号", trigger: "blur" }],
        copyRight: [{ required: true, message: "请输入版权信息", trigger: "blur" }],
        hotline: [{ required: true, message: "请输入热线电话", trigger: "blur" }],
        email: [{ required: true, message: "请输入反馈邮箱", trigger: "blur" }],
        address: [{ required: true, message: "请输入公司地址", trigger: "blur" }],
        linkAddress: [{ required: true, message: "请输入友情链接", trigger: "blur" }],
        linkName: [{ required: true, message: "请输入链接名称", trigger: "blur" }]
      }
    };
  },
  watch: {
    show(val) {
      this.localShow = val;
    }
  },
  created() {
    this.transJurisdictionId(this.websiteInfoForm);
  },
  methods: {
    //邮箱格式验证
     sendEmail: function() {
       var regEmail = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
          if (this.websiteInfoForm.email != '' && !regEmail.test(this.websiteInfoForm.email)) {
             this.$alert("邮箱格式不正确", "提示", {
                    confirmButtonText: "确定",
              });
              this.websiteInfoForm.email = ''
          }
      },
    //判断图片格式、大小
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
    //根据Id查询信息
    transJurisdictionId(parameter) {
      let params = {
        id: parameter.id,
        name: parameter.name,
        logoUrl: parameter.logoUrl,
        recordNo: parameter.recordNo,
        copyRight: parameter.copyRight,
        url: parameter.url,
        hotline: parameter.hotline,
        email: parameter.email,
        address: parameter.address,
        mapUrl: parameter.mapUrl,
        linkAddress: parameter.linkAddress,
        linkName:parameter.linkName
      };
      api.testAxiosGet(ApiPath.url.findWebsiteInfoFormnById, params)
        .then(res => {
          let code = res.status;
          if (code == 0) {
            this.websiteInfoForm = res.data;
            //logo
            let logoUrl = res.data.logoUrl;
            let logoArry = logoUrl.split("/");
            let logoName = logoArry[logoArry.length - 1];
            this.fileList.push({ name: logoName, url: logoUrl });
            //公众号图片
            let url = res.data.url;
            let urlArry = url.split("/");
            let urlName = urlArry[urlArry.length - 1];
            this.fileListUrl.push({ name: urlName, url: url });

            this.imgUrl1 = res.data.logoUrl;
            this.imgUrl2 = res.data.url;
          }else{
          }
        });
    },
    //logo图片
    uploadExceed(files, fileList) {
      this.$message.error("只能上传一个图片，如需修改请先删除图片！");
      return;
    },
    uploadSuccess(response, file, fileList) {
      this.imgUrl1 = response.url;
    },
    handleRemove(file, fileList) {
      this.imgUrl1 ="",
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    //公众号图片
    uploadExceedUrl(files, fileListUrl) {
      this.$message.error("只能上传一个图片，如需修改请先删除图片！");
      return;
    },
    uploadSuccessUrl(response, file, fileListUrl) {
      this.imgUrl2 = response.url;
    },
    handleRemoveUrl(file, fileListUrl) {
      this.imgUrl2 = "",
      console.log(file, fileListUrl);
    },
    handlePreviewUrl(file) {
      console.log(file);
    },
    //修改
    updateWebsiteInfo(editData) {
          this.$refs[editData].validate(valid => {
            if (this.websiteInfoForm.name == "") {
                  this.$alert("网站名称不能为空", "提示", {
                    confirmButtonText: "确定",
                  });
                  return false;
            }
            if (this.websiteInfoForm.recordNo == "") {
                  this.$alert("备案号码不能为空", "提示", {
                    confirmButtonText: "确定",
                  });
                  return false;
            }
            if (this.imgUrl1 == "") {
                  this.$alert("网站logo不能为空", "提示", {
                    confirmButtonText: "确定",
                  });
                  return false;
            }
            if (this.imgUrl2 == "") {
                  this.$alert("公众号图片不能为空", "提示", {
                    confirmButtonText: "确定",
                  });
                  return false;
            }
            if (this.websiteInfoForm.copyRight == "") {
                  this.$alert("版权信息不能为空", "提示", {
                    confirmButtonText: "确定",
                  });
                  return false;
            }
            if (this.websiteInfoForm.hotline == "") {
                  this.$alert("热线电话不能为空", "提示", {
                    confirmButtonText: "确定",
                  });
                  return false;
            }
            if (this.websiteInfoForm.email == "") {
                  this.$alert("反馈邮箱不能为空", "提示", {
                    confirmButtonText: "确定",
                  });
                  return false;
            }
            if (this.websiteInfoForm.addresse == "") {
                  this.$alert("公司地址不能为空", "提示", {
                    confirmButtonText: "确定",
                  });
                  return false;
            }
            if (this.websiteInfoForm.linkAddress == "") {
                  this.$alert("友情链接不能为空", "提示", {
                    confirmButtonText: "确定",
                  });
                  return false;
            }
            if (this.websiteInfoForm.linkName == "") {
                  this.$alert("链接名称不能为空", "提示", {
                    confirmButtonText: "确定",
                  });
                  return false;
            }
           if (valid) {
               this.$confirm("确定要提交修改内容吗?", "信息", {
                confirmButtonText: "确定",
                cancelButtonText: "取消"
              })
              .then(() => {
                    this.websiteInfoForm.logoUrl = this.imgUrl1;
                    this.websiteInfoForm.url = this.imgUrl2;
                    let params = { websiteInfoEntity: this.websiteInfoForm };
                    api
                      .testAxiosGet(ApiPath.url.updateWebsiteInfoEntity, params)
                      .then(res => {
                        this.reload();
                        this.$message.success(res.message);
                        this.loading = false;
                      })
                      .catch(err => {
                        this.$message.error(err.data);
                      });
              }).catch(() => {
                  this.$message({ type: "info", message: "已取消修改" });
                  this.reload();
                });
            } else {
              return false;
            }
          })
    }
  }
};
</script>

<style scoped>
.demo-ruleForm {
  margin-top: 20px;
}
.el-form {
  padding-left: 266px;
  padding-top: 80px;
}
.el-upload__tip {
  font-size: 14px;
  font-family: "微软雅黑";
  font-style: oblique;
  color: rgb(248, 90, 90);
  font-weight: bold;
}
.required {
  color: red;
  margin-left: -105px;
}
.requiredLogo{
  color: red;
  margin-left: -95px;
}
</style>
