<template>
  <el-dialog
    :visible.sync="localShow"
    :title="title"
    :before-close="beforeClose"
    append-to-body
    modal-append-to-body
    width="670px"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
  >
    <!-- 插槽区 -->
    <slot>
      <el-form
        :rules="rules"
        ref="caseInfoForm"
        :model="caseInfoForm"
        label-width="100px"
        class="form"
        :label-position="labelPosition"
        @submit.native.prevent
      >
        <el-form-item label="名称" prop="name">
          <el-input
            type="text"
            v-model="caseInfoForm.name"
            placeholder="请输入名称"
            :maxlength="10"
            size="small"
          ></el-input>
        </el-form-item>
        <el-form-item label="关键词" prop="keyCodes" class="second">
          <el-select v-model="caseInfoForm.keyCodes" multiple placeholder="请选择" size="small">
            <el-option
              v-for="item in keyOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              class="option"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="农作物种类" prop="classiCode">
          <el-select v-model="caseInfoForm.classiCode" placeholder="请选择" size="small">
            <el-option
              v-for="item in cropsOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              class="option"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="病虫害种类" prop="classiDipCode" class="second">
          <el-select v-model="caseInfoForm.classiDipCode" placeholder="请选择" size="small">
            <el-option
              v-for="item in dipOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              class="option"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="图片" prop="imgUrl">
          <el-link type="danger" class="required" :underline="false">*</el-link>
          <el-upload
            style="width:398px;margin-top:-38px;"
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
            <el-button size="small" type="primary" style="width:150%;" icon="el-icon-plus">点击上传</el-button>
            <div slot="tip" class="tips">只能上传jpg/png文件，且不超过1M</div>
          </el-upload>
        </el-form-item>
        <!-- <el-form-item label="文章内容" prop="describetion" class="article"></el-form-item> -->
        <!-- <el-form-item style="margin-left:-75px;">
          <div class="edit_container">
            <el-card style="height: 450px;width:508px;">
              图片上传组件辅助
              <el-upload
                  class="avatar-uploader quill-img"
                  :action="upload"
                  :show-file-list="false"
                  :on-success="quillUploadSuccess"
                  :beforeUpload="beforeAvatarUpload"
                  >
              </el-upload>
              <quill-editor
                v-model="caseInfoForm.describetion"
                ref="myQuillEditor"
                 style="height: 280px;width:100%"
                :options="editorOption"
              ></quill-editor>
            </el-card>
          </div>
        </el-form-item> -->
        <el-form-item label="文章内容" prop="describetion" class="article"></el-form-item>
          <el-form-item style="margin-left:-85px;">
          <div class="edit_container">
            <el-card style="height: 450px;width:560px;">
              <!-- 富文本上传图片 -->
              <el-upload
                  class="avatar-uploader quill-img"
                  :action="upload"
                  :show-file-list="false"
                  :on-success="quillUploadSuccess"
                  :beforeUpload="beforeAvatarUpload"
                  >
              </el-upload>
      <quill-editor v-model="caseInfoForm.describetion" ref="myQuillEditor" style="height: 345px;margin-top: -40px" :options="editorOption">
        <!-- 自定义toolar -->
        <div id="toolbar" slot="toolbar">
          <!-- Add a bold button -->
          <button class="ql-bold" title="加粗">Bold</button>
          <button class="ql-italic" title="斜体">Italic</button>
          <button class="ql-underline" title="下划线">underline</button>
          <button class="ql-strike" title="删除线">strike</button>
          <button class="ql-blockquote" title="引用"></button>
          <button class="ql-code-block" title="代码"></button>
          <button class="ql-header" value="1" title="标题1"></button>
          <button class="ql-header" value="2" title="标题2"></button>
          <!--Add list -->
          <button class="ql-list" value="ordered" title="有序列表"></button>
          <button class="ql-list" value="bullet" title="无序列表"></button>
          <!-- Add font size dropdown -->
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
        </div>
      </quill-editor>
    </el-card>
          </div>
        </el-form-item>
      </el-form>
    </slot>
    <!-- 按钮区 -->
    <span slot="footer">
      <el-button
        type="primary"
        icon="el-icon-check"
        size="medium"
        @click="updateCaseInfo('caseInfoForm')"
        v-loading.fullscreen.lock="fullscreenLoading"
      >保存</el-button>
      <el-button type="info" icon="el-icon-close" @click="close" size="medium">关闭</el-button>
    </span>
  </el-dialog>
</template>
<script>
import qs from "qs";
import Vue from "vue";
import ApiPath from "@/api/ApiPath.js";
import api from "@/axios/api.js";
// import { quillEditor } from "vue-quill-editor";
// import "quill/dist/quill.core.css";
// import "quill/dist/quill.snow.css";
// import "quill/dist/quill.bubble.css";
import aes from "@/utils/aes.js";
import {Quill,quillEditor} from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
// 自定义字体大小
let Size = Quill.import('attributors/style/size')
Size.whitelist = ['14px', '16px', '18px', '20px','22px','24px','26px']
Quill.register(Size, true)
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
      fullscreenLoading: false,
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
      keyOptions: [],
      //rules表单验证
      rules: {
        name: [{ required: true, message: "请输入名称", trigger: "blur" }],
        classiCode: [
          { required: true, message: "请选择农作物种类", trigger: "blur" },
        ],
        classiDipCode: [
          {
            required: true,
            message: "请选择病虫害种类",
            trigger: "blur",
          },
        ],
      },
      editorOption: { // 富文本框配置
        placeholder: '请输入...',
        theme: 'snow',  // or 'bubble'
        modules: {
              toolbar: {
                container: '#toolbar',
                handlers: {
                  'image': function (value) {
                  if (value) {
                          document.querySelector('.quill-img input').click()
                      } else {
                          this.quill.format('image', false);
                      }
                  }
                }
            }
        }
      // modules: {
      //     toolbar: {
      //         container: [['bold', 'italic', 'underline', 'strike'],        // toggled buttons
      //         ['blockquote', 'code-block'],
      //         [{'list': 'ordered'}, {'list': 'bullet'}],
      //         [{'script': 'sub'}, {'script': 'super'}],      // superscript/subscript
      //         [{'indent': '-1'}, {'indent': '+1'}],          // outdent/indent
      //         [{'direction': 'rtl'}],                         // text direction
      //         [{'color': []}, {'background': []}],          // dropdown with defaults from theme
      //         [{'align': []}],
      //         ['image'],
      //         ['clean']],
      //         handlers: {
      //             'image': function (value) {
      //             if (value) {
      //                     document.querySelector('.quill-img input').click()
      //                 } else {
      //                     this.quill.format('image', false);
      //                 }
      //             }
      //           }
      //         }
      //       },
          },
        };
      },
  components: {
    quillEditor,
  },
  watch: {
    show(val) {
      this.localShow = val;
    },
    //根据Id查询用户信息
    transCaseInfoId(val) {
      let params = {
        id: val,
      };
      api.testAxiosGet(ApiPath.url.caseInfoFindById, params).then((res) => {
        this.caseInfoForm = res.data;
        //重新组装数据
        let keyArr = [];
        for (var i = 0; i < res.data.keyCodes.length; i++) {
          keyArr.push(this.caseInfoForm.keyCodes[i]["id"]);
        }
        this.caseInfoForm.keyCodes = keyArr;
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
    this.fandKeyWord();
  },
  methods: {
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
    //展示关键词下拉列表（多选）
    fandKeyWord: function () {
      let params = {};
      api
        .testAxiosGet(ApiPath.url.findCaseKeyword, params)
        .then((res) => {
          if (res.state == "0") {
            for (let i = 0; i < res.data.length; i++) {
              this.keyOptions.push({
                value: res.data[i]["id"],
                label: res.data[i]["name"],
              });
            }
          }
        })
        .catch(function (error) {});
    },
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
                label: res.data[i]["name"],
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
                label: res.data[i]["name"],
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
    quillUploadSuccess(res){
        //res返回的格式是{url:"图片的路径"}，这个是后台接口返回的
        let quill = this.$refs.myQuillEditor.quill
        quill.focus();
        quill.insertEmbed(quill.getSelection().index, 'image', res.url);
    },
    handleRemove(file, fileList) {
      (this.imgUrl = ""), console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    // 修改
    updateCaseInfo(editData) {
      if (this.caseInfoForm.name == "") {
        this.$alert("名称不能为空", "提示", {
          confirmButtonText: "确定",
        });
        return false;
      }

      if (this.caseInfoForm.classiCode == "") {
        this.$alert("农作物种类不能为空", "提示", {
          confirmButtonText: "确定",
        });
        return false;
      }
      if (this.caseInfoForm.classiDipCode == "") {
        this.$alert("病虫害种类不能为空", "提示", {
          confirmButtonText: "确定",
        });
        return false;
      }
      if (this.caseInfoForm.imgUrl == "") {
        this.$alert("图片不能为空", "提示", {
          confirmButtonText: "确定",
        });
        return false;
      }

      this.caseInfoForm.url = this.imgUrl;
      let keyArr = [];
      for (var i = 0; i < this.caseInfoForm.keyCodes.length; i++) {
        keyArr.push(this.caseInfoForm.keyCodes[i]);
      }
      this.caseInfoForm.keyCodes = null;
      this.caseInfoForm.keys = keyArr.join();
      let params = {
        caseInfoEntity: aes.encrypt(JSON.stringify(this.caseInfoForm)),
      };
      api
        .testAxiosGet(ApiPath.url.updateCaseInfo, params)
        .then((res) => {
          this.caseInfoForm.keyCodes = keyArr;
          this.$message.success(res.message);
          this.close();
        })
        .catch((err) => {
          this.caseInfoForm.keyCodes = keyArr;
          this.$message.error(err.data);
        });
      this.caseInfoForm.updateUser = localStorage.getItem("userInfo");
      this.fullscreenLoading = true;
      setTimeout(() => {
        this.fullscreenLoading = false;
      }, 500);
    },
    close: function () {
      this.fileList = [];
      this.reload();
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
.form {
  padding-left: 20px;
  padding-right: 0px;
}
.required {
  color: red;
  margin-left: -52px;
}
.el-input {
  width: 120px;
}
.el-select {
  width: 120px;
}
.second {
  margin-left: 280px;
  margin-top: -62px;
}
.option {
  text-align: center;
}
.tips {
  width: 198px;
  margin-top: -41px;
  margin-left: 166px;
  font-size: 12px;
}
.article {
  margin: -16px 0px -16px 216px;
}
</style>