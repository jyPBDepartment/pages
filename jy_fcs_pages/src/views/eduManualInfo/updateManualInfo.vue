<template>
  <el-dialog
    :visible.sync="localShow"
    :title="title"
    :before-close="beforeClose"
    append-to-body
    modal-append-to-body
    width="700px"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
  >
    <!-- 插槽区 -->
    <slot>
      <el-form :model="editForm" :rules="rules" ref="editForm" :label-position="labelPosition" label-width="100px" style="margin-left:-85px">
        <el-form-item label="类型" prop="manualType">
          <span>文章</span>
        </el-form-item>
        <el-form-item label="标题" prop="title">
          <el-input
            type="text"
            v-model="editForm.title"
            size="small"
            placeholder="请输入标题(限128个字)"
            style="width:80%;"
            maxlength="128"
          ></el-input>
        </el-form-item>
        <el-form-item label="职业类别" prop="vocationId">
            <el-select v-model="editForm.vocationId" style="width:35%;height:30px" size="small">
                <el-option v-for="item in vocationIdOptions" :key="item.value" :label="item.label" :value="item.value" size="small"></el-option>
            </el-select>
        </el-form-item>
         <el-form-item label="标签" prop="labelId">
            <el-select v-model="editForm.labelId" style="width:35%;height:30px" size="small">
                <el-option v-for="item in labelIdOptions" :key="item.value" :label="item.label" :value="item.value" size="small"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="导读" prop="guide">
          <el-input
            type="textarea"
            v-model="editForm.guide"
            size="small"
            placeholder="请输入导读(限200个字)"
            style="width:90%;"
            rows="5"
            maxlength="200"
          ></el-input>
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
        <el-form-item label="内容" prop="content"></el-form-item>
          <el-form-item style="margin-left:-65px;">
            <div>
              <el-card style="height: 450px;width:560px;">
                <!-- 富文本上传图片 -->
                <el-upload
                    class="avatar-uploader quill-img"
                    :action="upload"
                    :show-file-list="false"
                    :on-success="quillUploadSuccess"
                    :beforeUpload="beforeAvatarUpload">
                </el-upload>
                <quill-editor v-model="editForm.content" ref="myQuillEditor" style="height: 345px;margin-top: -40px" :options="editorOption">
                    <!-- 自定义toolar -->
                    <!-- <div id="toolbar" slot="toolbar">
                      <button class="ql-bold" title="加粗">Bold</button>
                      <button class="ql-italic" title="斜体">Italic</button>
                      <button class="ql-underline" title="下划线">underline</button>
                      <button class="ql-strike" title="删除线">strike</button>
                      <button class="ql-blockquote" title="引用"></button>
                      <button class="ql-code-block" title="代码"></button>
                      <button class="ql-header" value="1" title="标题1"></button>
                      <button class="ql-header" value="2" title="标题2"></button>
                      <button class="ql-list" value="ordered" title="有序列表"></button>
                      <button class="ql-list" value="bullet" title="无序列表"></button>
                      <select class="ql-header" title="段落格式">
                          <option selected>段落</option>
                          <option value="1">标题1</option>
                          <option value="2">标题2</option>
                          <option value="3">标题3</option>
                          <option value="4">标题4</option>
                          <option value="5">标题5</option>
                          <option value="6">标题6</option>
                      </select>
                      <select class="ql-size" title="字体大小">
                          <option value="14px">14px</option>
                          <option value="16px">16px</option>
                          <option value="18px">18px</option>
                          <option value="20px">20px</option>
                          <option value="22px">22px</option>
                          <option value="24px">24px</option>
                          <option value="26px">26px</option>
                      </select>
                      <select class="ql-color" value="color" title="字体颜色"></select>
                      <select class="ql-background" value="background" title="背景颜色"></select>
                      <select class="ql-align" value="align" title="对齐"></select>
                      <button class="ql-clean" title="还原"></button>
                      <button class="ql-link" title="超链接"></button>
                      <button class="ql-image" title="照片"></button>
                    </div> -->
                </quill-editor>
              </el-card>
            </div>
          </el-form-item>
      </el-form>
    </slot>
    <!-- 按钮区 -->
    <span slot="footer">
      <el-button type="primary" icon="el-icon-check" @click="updateManualInfo('editForm')" v-loading.fullscreen.lock="fullscreenLoading">保存</el-button>
      <el-button type="info" icon="el-icon-close" @click="close">关闭</el-button>
    </span>
  </el-dialog>
</template>
<script>
import qs from "qs";
import Vue from "vue";
import ApiPath from "@/api/ApiPath.js";
import api from "@/axios/api.js";
import {Quill,quillEditor} from 'vue-quill-editor'
// import 'quill/dist/quill.core.css'
// import 'quill/dist/quill.snow.css'
// import 'quill/dist/quill.bubble.css'
// 自定义字体大小
// let Size = Quill.import('attributors/style/size')
// Size.whitelist = ['14px', '16px', '18px', '20px','22px','24px','26px']
// import aes from "@/utils/aes.js";
// Quill.register(Size, true)
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
    transManualInfoId: {
      type: String,
    },
  },
  data() {
    return {
      fullscreenLoading: false,
      labelPosition: "right",
      editForm: {
        title:"",
        manualType: "",
        vocationId: "",
        labelId: "",
        guide: "",
        content:"",
        id: "",
        url: "",
        vocation:"",
      },
      vocationIdOptions: [],
      labelIdOptions:[],
      limit: 1,
      imgUrl: "",
      fileList: [],
      upload: ApiPath.url.uploadImg,
      localShow: this.show,
      rules: {
        title: [{required: true, message: "请输入标题", trigger: "bulr"}],
        vocationId: [{required: true, message: "请选择职业类别", trigger: "bulr"}],
        labelId: [{required: true, message: "请选择标签", trigger: "bulr"}],
        guide: [{required: true, message: "请输入导读", trigger: "bulr"}],
        content: [{required: true, message: "请输入内容", trigger: "bulr"}],
      },
      editorOption: { // 富文本框配置
        placeholder: "请输入...",
        theme: "snow", 
        modules: {
          // toolbar: {
          //   container: '#toolbar',
          //   handlers: {
          //     'image': function (value) {
          //       if (value) {
          //         document.querySelector('.quill-img input').click()
          //       } else {
          //         this.quill.format('image', false);
          //       }
          //     }
          //   }
          // }
        }
     }
    };
  },
  components: {
    quillEditor
  },
  watch: {
    show(val) {
      this.localShow = val;
    },
    transManualInfoId(val) {
      if(val == ""){
        return;
      }
      let params = {
        id: val,
      };
       //根据Id查询用户信息
      api.testAxiosGet(ApiPath.url.manualFindById, params).then((res) => {
        this.editForm = res.data;
        this.editForm.vocationId = this.editForm.vocation.id;
        this.editForm.labelId = this.editForm.label.id;
        let url = res.data.url;
        let urlArry = url.split("/");
        let urlName = urlArry[urlArry.length - 1];
        this.fileList.push({ name: urlName, url: url });
        this.imgUrl = res.data.url;
      });
    }
  },
  mounted() {
      this.findVocationId();
      this.findLabelId();
  },
  methods: {
    //判断图片格式大小
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
    quillUploadSuccess(res){
      let quill = this.$refs.myQuillEditor.quill
      quill.focus();
      quill.insertEmbed(quill.getSelection().index, 'image', res.url);
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
    close: function () {
      this.fileList=[];
      this.$emit("close");
    },
    // 职业类别下拉列表
    findVocationId: function () {
      let params = {};
      api.testAxiosGet(ApiPath.url.findVocationId, params)
        .then((res) => {
          if (res.state == "0") {
            for (let i = 0; i < res.data.length; i++) {
              this.vocationIdOptions.push({
                value: res.data[i]["id"],
                label: res.data[i]["name"],
              });
            }
          }
        }).catch(function (error) {});
    },
     // 标签下拉列表
    findLabelId: function () {
      let params = {};
      api.testAxiosGet(ApiPath.url.findLabelId, params)
        .then((res) => {
          if (res.state == "0") {
            for (let i = 0; i < res.data.length; i++) {
              this.labelIdOptions.push({
                value: res.data[i]["id"],
                label: res.data[i]["name"],
              });
            }
          }
        }).catch(function (error) {});
    },
    //保存
    updateManualInfo(editData) {
      this.$refs[editData].validate((valid) => {
        if(this.editForm.title == ""){
          this.$alert("标题不能为空", "提示",{
            confirmButtonText: "确定",
          });
          return false;
        }
        if (this.editForm.vocationId == "") {
          this.$alert("职业类别不能为空", "提示", {
            confirmButtonText: "确定",
          });
          return false;
        }
        if (this.editForm.labelId == "") {
          this.$alert("标签不能为空", "提示", {
            confirmButtonText: "确定",
          });
          return false;
        }
        if (this.editForm.guide == "") {
          this.$alert("导读不能为空", "提示", {
            confirmButtonText: "确定",
          });
          return false;
        }
        if (this.editForm.content == "") {
          this.$alert("内容不能为空", "提示", {
            confirmButtonText: "确定",
          });
          return false;
        }
        if (valid) {
          if (this.imgUrl != "") {
            this.editForm.url = this.imgUrl;
            let params = {
              eduManualInfoEntity: this.editForm,
            };
            api.testAxiosGet(ApiPath.url.updateManualInfo, params)
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
                    this.fullscreenLoading = false;
                }, 500);
            this.editForm.updateBy = localStorage.getItem("userInfo");
          } else {
            this.$message.error("请上传图片");
            return;
          }
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
  margin-left: -50px;
}

</style>