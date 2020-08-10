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
        
        ref="caseInfoForm"
        :model="caseInfoForm"
        label-width="120px"
        :label-position="labelPosition"
        @submit.native.prevent
      >
        <el-form-item label="名称" >
          <el-input
            type="text"
            v-model="caseInfoForm.name"
           
            style=" width:70%;"
            readonly
          ></el-input>
        </el-form-item>
        <el-form-item label="图片">
          <el-image style="width: 100px; height: 100px" :src="caseInfoForm.url" readonly></el-image>
        </el-form-item>
        <el-form-item label="农作物种类编码" >
          <el-input
            type="text"
            v-model="caseInfoForm.cropsTypeCode"
           
            style=" width:70%;"
            readonly
          ></el-input>
        </el-form-item>
        <el-form-item label="病虫害种类编码" >
           <el-input
            type="text"
            v-model="caseInfoForm.dipTypeCode"           
            style=" width:70%;"
            readonly
          ></el-input>
        </el-form-item>
        <el-form-item label="描述"  class="bottom"   >
          <el-input
            type="textarea"
            v-model="caseInfoForm.describetion"    
            style=" width:70%;"
            
            :rows="3"
            readonly
          ></el-input>
        </el-form-item>
         <img src="../../assets/img/arrow.png" class="select"/>   
        <el-form-item label="状态" >
          <el-select v-model="caseInfoForm.auditStatus" disabled >            
            <el-option label="启用" value="1" >启用</el-option>
            <el-option label="禁用" value="0" >禁用</el-option>                   
          </el-select>      
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
.bottom{
  margin-bottom: 0px;
  
}
.select{
  width:30px;
  height:20px;
  margin-left:304px;
  margin-bottom:-34px;
  position:relative;
  z-index:100;
}
</style>
<style>
.el-input.is-disabled .el-input__inner{
  color: black;
  background-color: #fff; 
  scrollbar-arrow-color: #fff;
}
</style>