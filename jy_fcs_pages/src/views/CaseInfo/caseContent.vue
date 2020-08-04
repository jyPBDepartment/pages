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
        label-width="120px"
        :label-position="labelPosition"
        @submit.native.prevent
      >
        <el-form-item label="名称" prop="name">
          <el-input
            type="text"
            v-model="caseInfoForm.name"
            placeholder="请输入名称"
            style=" width:70%;"
            readonly
          ></el-input>
        </el-form-item>
        <el-form-item label="图片地址" prop="imgUrl">
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
            disabled
          >
            <el-button
              size="small"
              type="primary"
              style="background-color:rgb(132, 193, 255);border:none;color:white;font-size:12px"
            >点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-form-item>
        <el-form-item label="农作物种类编码" prop="cropsTypeCode">
          <el-select
            v-model="caseInfoForm.cropsTypeCode"
            placeholder="请输入农作物种类编码"
            style="width:70%;"
            disabled
          >
            <el-option
              v-for="item in cropsOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="病虫害种类编码" prop="dipTypeCode">
          <el-select
            v-model="caseInfoForm.dipTypeCode"
            placeholder="请输入病虫害种类编码"
            style="width:70%;"
            disabled
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
            readonly
          ></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="auditStatus">
          <el-input
            type="text"
            v-model="caseInfoForm.auditStatus"
            placeholder="请输入状态"
            style=" width:70%;"
            disabled
          ></el-input>
        </el-form-item>
      </el-form>
    </slot>
    <!-- 按钮区 -->
    <span slot="footer">
      <el-button
        type="info"
        icon="el-icon-close"
        @click="close"
        size="medium"
       
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
    caseContentId: {
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
      caseInfoForm: {},
      cropsOptions: [],
      dipOptions: [],
      //rules表单验证
      rules: {
        name: [{ required: true, message: "请输入名称", trigger: "blur" }],
      },
    };
  },
  watch: {
    show(val) {
      this.localShow = val;
    },

    //根据Id查询用户信息
    caseContentId(val) {
      let params = {
        id: val,
      };
      api.testAxiosGet(ApiPath.url.caseFindById, params).then((res) => {
        this.caseInfoForm = res.data;
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
</style>