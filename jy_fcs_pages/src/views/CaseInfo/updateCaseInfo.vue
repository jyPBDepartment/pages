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
        ref="caseInfoForm"
        :model="caseInfoForm"
        label-width="130px"
        :label-position="labelPosition"
        @submit.native.prevent
      >
        <el-form-item label="名称" prop="name">
          <el-input type="text" v-model="caseInfoForm.name" placeholder="请输入名称" style=" width:70%;"></el-input>
        </el-form-item>
        <el-form-item label="图片" prop="imgUrl">
          <el-link type="danger" class="required" :underline="false">*</el-link>
          <el-upload
           style="width:81%;margin-top:-38px;"
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
            <el-button
              size="small"
              type="primary"
            style="width:150%;" icon="el-icon-plus"
            >点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-form-item>
        <el-form-item label="农作物种类编码" prop="classiCode">
          <el-select v-model="caseInfoForm.classiCode" placeholder="请输入农作物种类编码" style="width:70%;">
            <el-option
              v-for="item in cropsOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="病虫害种类编码" prop="classiDipCode">
          <el-select
            v-model="caseInfoForm.classiDipCode"
            placeholder="请输入病虫害种类编码"
            style="width:70%;"
          >
            <el-option
              v-for="item in dipOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="描述" prop="describetion">
          <el-input
            type="textarea"
            v-model="caseInfoForm.describetion"
            placeholder="请输入描述"
            style="width:70%;"
          ></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="auditStatus">
          <el-input
            type="text"
            v-model="caseInfoForm.auditStatus"
            placeholder="请输入状态"
            style=" width:70%;"
          ></el-input>
        </el-form-item>
      </el-form>
    </slot>
    <!-- 按钮区 -->
    <span slot="footer">
      <el-button
        type="success"
        icon="el-icon-check"
        style="background-color:#409EFF;border-color:#409EFF;color:white;font-size:12px"
        @click="updateCaseInfo('caseInfoForm')"
      >保存</el-button>
      <el-button
        type="danger"
        icon="el-icon-close"
        @click="close"
        size="medium"
        style="background-color:white;border-color:black;color:black;font-size:12px"
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
    transCaseInfoId: {
      type: String,
    },
  },
  data() {
    return {
      localShow: this.show,
      isShow: false,

      limit: 1,
      imgUrl: "",
      upload: ApiPath.url.uploadImg,
      fileList: [],
      labelPosition: "right",
      editFormVisible: false,
      caseInfoForm: {
        name: "",
        url: "",
        classiCode: "",
        classiDipCode: "",
        auditStatus: "",
      },
      cropsOptions: [],
      dipOptions: [],
      //rules表单验证
      rules: {
        name: [{ required: true, message: "请输入名称", trigger: "blur" }],
        classiCode: [
          { required: true, message: "请输入农作物种类编码", trigger: "blur" },
        ],
        classiDipCode: [
          {
            required: true,
            message: "请输入请输入病虫害种类编码",
            trigger: "blur",
          },
        ],
        auditStatus: [
          { required: true, message: "请输入状态", trigger: "blur" },
        ],
      },
    };
  },
  watch: {
    show(val) {
      this.localShow = val;
    },

    transCaseInfoId(val) {
      let params = {
        id: val,
      };

      //根据Id查询用户信息
      api.testAxiosGet(ApiPath.url.caseInfoFindById, params).then((res) => {
        this.caseInfoForm = res.data;
        let url = res.data.url;
        let urlArry = url.split("/");
        let urlName = urlArry[urlArry.length - 1];
        this.fileList.push({ name: urlName, url: url });

        this.imgUrl = res.data.url;
      });
    },
  },
  mounted() {
    this.findContext();
    this.findContexta();
  },
  methods: {
    //下拉列表显示1
    findContext: function () {
      let params = {
        classiCode: this.caseInfoForm.classiCode,
      };
      api
        .testAxiosGet(ApiPath.url.findAllUpdateCaseInfo, params)
        .then((res) => {
          if (res.state == "0") {
            for (let i = 0; i < res.data.length; i++) {
              this.cropsOptions.push({
                value: res.data[i]["id"],
                label: res.data[i]["code"],
              });
            }
          }
        })
        .catch(function (error) {});
    },
    //下拉列表显示2
    findContexta: function () {
      let params = {
        classiDipCode: this.caseInfoForm.classiDipCode,
      };
      api
        .testAxiosGet(ApiPath.url.findAllUpdateCase, params)
        .then((res) => {
          if (res.state == "0") {
            for (let i = 0; i < res.data.length; i++) {
              this.dipOptions.push({
                value: res.data[i]["id"],
                label: res.data[i]["code"],
              });
            }
          }
        })
        .catch(function (error) {});
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
    // 修改
    updateCaseInfo(editData) {
      this.$refs[editData].validate((valid) => {
        if (valid) {
          if (this.imgUrl != "") {
            this.caseInfoForm.url = this.imgUrl;
            let params = { caseInfoEntity: this.caseInfoForm };
            api
              .testAxiosGet(ApiPath.url.updateCaseInfo, params)
              .then((res) => {
                this.$message.success(res.message);
                this.reload();
              })
              .catch((err) => {
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
    close: function () {
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
.required{
  color: red;
  margin-left:-52px;
}
</style>