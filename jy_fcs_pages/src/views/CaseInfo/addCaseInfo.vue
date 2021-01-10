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
        ref="editForm"
        :model="editForm"
        :label-position="labelPosition"
        label-width="100px"
        class="form"
      >
        <el-form-item label="名称" prop="name">
          <el-input
            type="text"
            v-model="editForm.name"
            placeholder="请输入(限10字)"
            size="small"
            :maxlength="10"
          ></el-input>
        </el-form-item>
        <el-form-item label="关键词" prop="keyCodes" class="second">
          <el-select
            v-model="editForm.keyCodes"
            multiple
            placeholder="请选择"
            size="small"
          >
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
          <el-select
            v-model="editForm.classiCode"
            placeholder="请选择"
            size="small"
          >
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
          <el-select
            v-model="editForm.classiDipCode"
            placeholder="请选择"
            size="small"
          >
            <el-option
              v-for="item in dipOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              class="option"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="图片">
          <el-link type="danger" class="required" :underline="false">*</el-link>
          <el-upload
            style="width: 398px; margin-top: -38px"
            v-model="editForm.imgUrl"
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
            <el-button
              size="small"
              type="primary"
              style="width: 150%"
              icon="el-icon-plus"
              >点击上传</el-button
            >
            <div slot="tip" class="tips">只能上传jpg/png文件，且不超过1M</div>
          </el-upload>
        </el-form-item>

        <el-form-item label="概述" prop="describetion"></el-form-item>
        <el-form-item style="margin-left: -85px">
          <div class="edit_container">
            <el-card style="height: 450px; width: 560px">
              <!-- 富文本上传图片 -->
              <el-upload
                class="avatar-uploader quill-img"
                :action="upload"
                :show-file-list="false"
                :on-success="quillUploadSuccess"
                :beforeUpload="beforeAvatarUploadGif"
              >
              </el-upload>
              <quill-editor
                v-model="editForm.describetion"
                ref="myQuillEditor"
                style="height: 345px; margin-top: -40px"
                :options="editorOption"
              >
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
                  <button
                    class="ql-list"
                    value="ordered"
                    title="有序列表"
                  ></button>
                  <button
                    class="ql-list"
                    value="bullet"
                    title="无序列表"
                  ></button>
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
                  <select
                    class="ql-color"
                    value="color"
                    title="字体颜色"
                  ></select>
                  <select
                    class="ql-background"
                    value="background"
                    title="背景颜色"
                  ></select>
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
        @click="saveCaseInfo('editForm')"
        size="medium"
        v-loading.fullscreen.lock="fullscreenLoading"
        >保存</el-button
      >
      <el-button type="info" icon="el-icon-close" @click="close" size="medium"
        >关闭</el-button
      >
    </span>
  </el-dialog>
</template>

<script>
import qs from "qs";
import Vue from "vue";
import ApiPath from "@/api/ApiPath.js";
import api from "@/axios/api.js";
import { Quill, quillEditor } from "vue-quill-editor";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
// 自定义字体大小
let Size = Quill.import("attributors/style/size");
Size.whitelist = ["14px", "16px", "18px", "20px", "22px", "24px", "26px"];
Quill.register(Size, true);
import aes from "@/utils/aes.js";
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
      labelPosition: "right",
      fullscreenLoading: false,
      editForm: {
        name: "",
        url: "",
        classiCode: "",
        classiDipCode: "",
        keyCodes: [],
        auditStatus: "",
        createUser: localStorage.getItem("userInfo"),
      },
      cropsOptions: [],
      dipOptions: [],
      keyOptions: [],
      limit: 1,
      imgUrl: "",
      fileList: [],
      upload: ApiPath.url.uploadImg,
      localShow: this.show,
      // rules表单验证
      rules: {
        name: [{ required: true, message: "请输入名称", trigger: "blur" }],
        classiCode: [
          {
            type: "string",
            required: true,
            message: "请选择农作物种类",
            trigger: "change",
          },
        ],
        keyCodes: [
          {
            type: "array",
            required: true,
            message: "请选择关键词",
            trigger: "change",
          },
        ],
        classiDipCode: [
          {
            type: "string",
            required: true,
            message: "请选择病虫害种类",
            trigger: "change",
          },
        ],
        imgUrl: [{ required: true, message: "请上传图片", trigger: "change" }],
      },
      editorOption: {
        // 富文本框配置
        placeholder: "请输入...",
        theme: "snow",
        modules: {
          toolbar: {
            container: "#toolbar",
            handlers: {
              image: function (value) {
                if (value) {
                  document.querySelector(".quill-img input").click();
                } else {
                  this.quill.format("image", false);
                }
              },
            },
          },
        },
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
  },
  mounted() {
    this.findContext();
    this.findContexta();
    this.fandKeyWord();
  },
  methods: {
    //富文本上传动图
    beforeAvatarUploadGif(file) {
      var testmsg = file.name.substring(file.name.lastIndexOf(".") + 1);
      const extension = testmsg === "jpg";
      const extension2 = testmsg === "png";
      const extension3 = testmsg === "gif";
      const isLt2M = file.size / 1024 / 1024 < 1;
      if (!extension && !extension2 && !extension3) {
        this.$message({
          message: "上传文件只能是 jpg、png、gif格式!",
          type: "warning",
        });
      }
      if (!isLt2M) {
        this.$message({
          message: "上传文件大小不能超过 1M!",
          type: "warning",
        });
      }
      return (extension || extension2 || extension3) && isLt2M;
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
    //logo图片
    uploadExceed(files, fileList) {
      this.$message.error("只能上传一个图片，如需修改请先删除图片！");
      return;
    },
    uploadSuccess(response, file, fileList) {
      this.editForm.imgUrl = response.url;
      this.imgUrl = response.url;
    },
    quillUploadSuccess(res) {
      //res返回的格式是{url:"图片的路径"}，这个是后台接口返回的
      let quill = this.$refs.myQuillEditor.quill;
      quill.focus();
      quill.insertEmbed(quill.getSelection().index, "image", res.url);
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    //展示关键词下拉列表（多选）
    fandKeyWord: function () {
      let params = {};
      api
        .testAxiosGet(ApiPath.url.findCaseKeyword, params)
        .then((res) => {
          if (res.state == "0") {
            // this.keyOptions.push({ value: "", label: "请选择" });
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
      let params = {};
      api
        .testAxiosGet(ApiPath.url.findAllCaseInfo, params)
        .then((res) => {
          if (res.state == "0") {
            // this.cropsOptions.push({ value: "", label: "请选择" });
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
      let params = {};
      api
        .testAxiosGet(ApiPath.url.findAllCase, params)
        .then((res) => {
          if (res.state == "0") {
            // this.dipOptions.push({ value: "", label: "请选择" });
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

    //添加看图识病方法
    saveCaseInfo(editData) {
      this.$refs["editForm"].validate((valid) => {
        if (valid) {
          if (this.imgUrl == "") {
            this.$alert("图片不能为空", "提示", {
              confirmButtonText: "确定",
            });
            return false;
          }
          this.editForm.url = this.imgUrl;
          let keyArr = [];
          for (var i = 0; i < this.editForm.keyCodes.length; i++) {
            keyArr.push(this.editForm.keyCodes[i]);
          }
          this.editForm.keyCodes = null;
          this.editForm.keys = keyArr.join();
          let params = {
            caseInfoEntity: JSON.stringify(this.editForm),
          };
          api
            .testAxiosGet(ApiPath.url.saveCaseInfo, params)
            .then((res) => {
              let code = res.state;
              this.editForm.keyCodes = keyArr;
              this.$message.success(res.message);
              this.close();
            })
            .catch(function (err) {
              this.editForm.keyCodes = keyArr;
            });
          this.fullscreenLoading = true;
          setTimeout(() => {
            this.editForm.name = "";
            this.editForm.classiCode = "";
            this.editForm.classiDipCode = "";
            this.fileList = [];
            this.editForm.describetion = "";
            this.fullscreenLoading = false;
          }, 500);
        } else {
        }
      });

      // if (this.editForm.name == "") {
      //   this.$alert("名称不能为空", "提示", {
      //     confirmButtonText: "确定",
      //   });
      //   return false;
      // }
      // if (this.imgUrl == "") {
      //   this.$alert("图片不能为空", "提示", {
      //     confirmButtonText: "确定",
      //   });
      //   return false;
      // }
      // if (this.editForm.classiCode == "") {
      //   this.$alert("农作物种类编码不能为空", "提示", {
      //     confirmButtonText: "确定",
      //   });
      //   return false;
      // }
      // if (this.editForm.classiDipCode == "") {
      //   this.$alert("病虫害种类编码不能为空", "提示", {
      //     confirmButtonText: "确定",
      //   });
      //   return false;
      // }
    },
    close: function () {
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
  padding-left: 100px;
}
.input {
  float: left;
  font-size: 12px;
  width: 150px;
  font-family: arial;
  padding: 3px;
  border: 1px solid black;
}

.input.error {
  border: 1px solid red;
}

#tips {
  float: left;
  margin: 2px 0 0 20px;
}

#tips span {
  float: left;
  width: 50px;
  height: 20px;
  color: white;
  background: green;
  margin-right: 2px;
  line-height: 20px;
  text-align: center;
}
.required {
  color: red;
  margin-left: -52px;
}
.option {
  text-align: center;
}
.form {
  padding-left: 20px;
  padding-right: 0px;
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
