<template>
  <el-dialog
    :visible.sync="localShow"
    :title="title"
    :before-close="beforeClose"
    append-to-body
    modal-append-to-body
    width="30%"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
  >
    <!-- 插槽区 -->
    <slot>
      <el-form :model="editForm" :rules="rules" ref="editForm" :label-position="labelPosition" label-width="100px" style="margin-left:-85px">
        <el-form-item label="模板图片" prop="url">
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
        <el-form-item label="职业类别" prop="vocationId">
          <el-select v-model="editForm.vocationId" placeholder="请选择" size="small" style="width:92%">
            <el-option
              v-for="item in vocationOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              class="option"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="模板名称" prop="name">
          <el-input type="text" v-model="editForm.name" size="small" placeholder="不超过32个字" style="width:92%" maxlength="32"></el-input>
        </el-form-item>
        <el-form-item label="模板描述" prop="remark">
          <el-input type="textarea" v-model="editForm.remark" size="small" style="width:92%"></el-input>
        </el-form-item>
        
      </el-form>
    </slot>
    <!-- 按钮区 -->
    <span slot="footer">
      <el-button type="primary" icon="el-icon-check" @click="saveModuleInfo('editForm')" v-loading.fullscreen.lock="fullscreenLoading">保存</el-button>
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
  },
  data() {
    return {
      fullscreenLoading: false,
      labelPosition: "right",
      editForm: {
        name: "",
        vocationId:"",
        url:"",
        createBy: localStorage.getItem("userInfo"),
        remark:""
      },
      imgUrl:"",
      upload: ApiPath.url.uploadImg,
      limit:1,
      vocationOptions: [],
      fileList: [],
      localShow: this.show,
      rules: {
        name: [{ required: true, message: "请输入名称", trigger: "blur" }],
        vocationId: [{ required: true, message: "请选择职业类别", trigger: "blur" }],
        remark: [{ required: true, message: "请输入描述", trigger: "blur" }]
      },
    };
  },
  watch: {
    show(val) {
      this.localShow = val;
    },
  },
  mounted() {
    this.findContext();
  },
  methods: {
    //下拉列表显示
    findContext: function () {
      let params = {};
      api
        .testAxiosGet(ApiPath.url.findVocationOptions, params)
        .then((res) => {
          if (res.state == "0") {
            // this.powerOptions.push({ value: "", label: "请选择" });
            for (let i = 0; i < res.data.length; i++) {
              this.vocationOptions.push({
                value: res.data[i]["id"],
                label: res.data[i]["name"],
              });
            }
          }
        })
        .catch(function (error) {});
    },
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
      return (extension || extension2) && isLt2M;
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
    beforeClose() {
      this.close();
    },
    close() {
      this.$emit("close");
    },
    //新增保存
    saveModuleInfo(editData) {
      this.$refs[editData].validate((valid) => {
          //alert(this.editForm.createBy)
        if (valid) {
            //this.editForm.url = this.imgUrl;
            if (this.imgUrl != "") {
                this.editForm.url = this.imgUrl;
            }else{
                this.$message.error("请上传图片");
                return;
            }
            let params = {
              entity: this.editForm,
            };
            api.testAxiosGet(ApiPath.url.addFormwork, params)
              .then((res) => {
                let code = res.state;
                if (code == "0") {
                  this.close();
                  this.$message.success(res.message);
                } else {
                  this.$message.error(res.message);
                }
              }).catch(function (err) {});
                this.fullscreenLoading = true;
                setTimeout(() => {
                  this.editForm.name="",
                  this.editForm.vocationId="",
                  this.editForm.remark="",
                  this.fullscreenLoading = false
                }, 500);
        } else {
          return false;
        }
      });
    },
  },
};
</script>

<style scoped>
.el-form {
  padding-left: 100px;
}
.el-button {
  border: none;
}
.required {
  color: red;
  margin-left: -79px;
}
</style>