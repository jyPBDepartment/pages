<template>
  <el-dialog
    :visible.sync="localShow"
    :title="title"
    :before-close="beforeClose"
    append-to-body
    modal-append-to-body
    width="1024.5px"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
  >
    <!-- 插槽区 -->
    <slot>
           <table border="2"  :data="caseInfoForm" align="center" class="table">
        <tbody>
          <tr>
            <td class="title">病虫害名称</td>
            <td class="content">{{caseInfoForm.name}}</td>
            <td class="title">病虫害状态</td>
            <td class="content" style="width:340px;">
              <span v-if="caseInfoForm.auditStatus=='1'">启用</span>
              <span v-if="caseInfoForm.auditStatus=='0'">禁用</span>
            </td>
          </tr>
         
          <tr>
            <td class="title">农作物种类</td>
            <td class="content">{{caseInfoForm.cropsTypeCode}}</td>
            <td class="title">病虫害种类</td>
            <td class="content">{{caseInfoForm.dipTypeCode}}</td>
          </tr>
           <tr>
            <td class="title">图片</td>
            <td class="content">
                <el-image class="image" :src="caseInfoForm.url"></el-image>
            </td>
            <td class="title">描述</td>
            <td class="contentText" v-html="caseInfoForm.describetion">
                {{caseInfoForm.describetion}}
            </td>
          </tr>
          
        </tbody>
      </table>
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
.table {
  height: 400px;
  width: 900px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.2)
}
.title {
  width: 100px;
  text-align: center;
}
.content {
  text-align: center;
}
.image{
 width: 200px; 
 height: 200px
}
.contentText{
  text-align: center;
}
.contentText >>> img{
  width:300px;
  height: 300px;
  margin: 0px 10px 10px 9px;
}
</style>
<style>
.el-input.is-disabled .el-input__inner {
  color: black;
  background-color: #fff;
  scrollbar-arrow-color: #fff;
}

</style>