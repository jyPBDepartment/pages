
<template>

  <div class="websiteInfoFunction">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">基本信息</el-breadcrumb-item>
      <el-breadcrumb-item>网站信息</el-breadcrumb-item>
      <el-breadcrumb-item>完善网站信息</el-breadcrumb-item>
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
            >
              <el-button size="small" type="primary" style="width:150%" icon="el-icon-plus">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="公众号图片：" prop="imgUrl2">
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
            >
              <el-button size="small" type="primary" style="width:150%" icon="el-icon-plus">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
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
            <el-input size="small" type="text" v-model="websiteInfoForm.email" style="width:65%"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="公司地址：" prop="address">
            <el-input size="small" type="text" v-model="websiteInfoForm.address" style="width:65%"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <!-- <el-row>
        <el-col :span="19">
          <el-form-item label="网站地图：" prop="mapUrl">
            <el-input size="small" type="text" v-model="websiteInfoForm.mapUrl" style="width:86.8%;"></el-input>
          </el-form-item>
        </el-col>
      </el-row> -->
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
        <el-col>
          <el-form-item></el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="18" align="right">
          <span>
            <el-button
              size="small"
              style="background-color:#53bddd;border-color:#53bddd;width:15% "
              icon="el-icon-check"
              @click="updateWebsiteInfo('websiteInfoForm')"
            >提交</el-button>
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
        logoUrl: [
          { required: true, message: "请上传网站logo", trigger: "blur" }
        ],
        recordNo: [
          { required: true, message: "请输入备案号", trigger: "blur" }
        ],
        copyRight: [
          { required: true, message: "请输入版权信息", trigger: "blur" }
        ],
        url: [{ required: true, message: "请上传公众号图片", trigger: "blur" }],
        hotline: [
          { required: true, message: "请输入热线电话", trigger: "blur" }
        ],
        email: [{ required: true, message: "请输入反馈邮箱", trigger: "blur" }],
        address: [
          { required: true, message: "请输入公司地址", trigger: "blur" }
        ],
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

      //根据Id查询信息
      api
        .testAxiosGet(ApiPath.url.findWebsiteInfoFormnById, params)
        .then(res => {
          
          let code = res.status;
          if (code == 0) {
            this.websiteInfoForm = res.data;

            console.log(res.data)
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
      console.log(file, fileListUrl);
    },
    handlePreviewUrl(file) {
      console.log(file);
    },

    //修改
    updateWebsiteInfo(editData) {
      this.$confirm("确定要提交修改内容吗?", "信息", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(() => {
          this.$refs[editData].validate(valid => {
            if (valid) {
              if (this.imgUrl1 != "" && this.imgUrl2 != "") {
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
              } else {
                this.$message.error("请上传图片");
                return;
              }
            } else {
              return false;
            }
          });
        })
        .catch(() => {
          this.$message({ type: "info", message: "已取消修改" });
          this.reload();
        });
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
.el-button {
  display: inline-block;
  cursor: pointer;
  text-align: center;
  outline: none;
  color: #fff;
  border-radius: 15px;
  box-shadow: 0 6px #999;
}
.el-button:hover {
  background-color: #8cb2eb;
}
.el-button:active {
  background-color: #53bddd;
  box-shadow: 0 5px #666;
  transform: translateY(4px);
}
.el-upload__tip {
  font-size: 14px;
  font-family: "微软雅黑";
  font-style: oblique;
  color: rgb(248, 90, 90);
  font-weight: bold;
}
</style>
