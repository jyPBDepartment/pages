<template>
  <el-dialog
    :visible.sync="localShow"
    :title="title"
    :before-close="beforeClose"
    append-to-body
    modal-append-to-body
    width="55%"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
  >
    <!-- 插槽区 -->
    <slot>
      <el-form
        ref="caseInfoForm"
        :model="caseInfoForm"
        label-width="120px"
        :label-position="labelPosition"
        @submit.native.prevent
      >
        <el-row :gutter="60">
          <el-col :span="10">
            <el-form-item label="病虫害名称:" style=" width:70%;">
              <span>{{caseInfoForm.name}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="病虫害状态:">
              <span v-if="caseInfoForm.auditStatus=='1'">启用</span>
              <span v-if="caseInfoForm.auditStatus=='0'">禁用</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="60">
          <el-col :span="10">
            <el-form-item label="农作物种类:">
              <span>{{caseInfoForm.cropsTypeCode}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="病虫害种类:">
              <span>{{caseInfoForm.dipTypeCode}}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="病虫害图片:">
          <el-image style="width: 100px; height: 100px" :src="caseInfoForm.url" readonly></el-image>
        </el-form-item>

        <el-form-item label="描述" class="bottom" >
          <el-card style="height: 510px;width:70%">
            <quill-editor
              v-model="caseInfoForm.describetion"
              ref="myQuillEditor"
              style="height: 500px;width:100%"
              disabled
            ></quill-editor>
          </el-card>
        </el-form-item>
      </el-form>
    </slot>
    <!-- 按钮区 -->
    <span slot="footer">
      <el-button type="info" icon="el-icon-close" @click="close" size="medium">关闭</el-button>
    </span>
  </el-dialog>
</template>
<script>
import qs from "qs";
import Vue from "vue";
import ApiPath from "@/api/ApiPath.js";
import api from "@/axios/api.js";
import aes from "@/utils/aes.js";
import { quillEditor } from "vue-quill-editor";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
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
  components: {
    quillEditor,
  },
};
</script>

<style scoped>
.el-form {
  padding-left: 115px;
}
.bottom {
  margin-bottom: 0px;
}
.select {
  width: 30px;
  height: 20px;
  margin-left: 304px;
  margin-bottom: -34px;
  position: relative;
  z-index: 100;
}
</style>
<style>
.el-input.is-disabled .el-input__inner {
  color: black;
  background-color: #fff;
  scrollbar-arrow-color: #fff;
}
</style>