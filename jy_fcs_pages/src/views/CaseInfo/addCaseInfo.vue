<template>
  <el-dialog
    :visible.sync="localShow"
    :title="title"
    :before-close="beforeClose"
    append-to-body
    modal-append-to-body
    width="60%"
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
        label-width="130px"
      >
        <el-form-item label="名称" prop="name">
          <el-input
            type="text"
            v-model="editForm.name"
            placeholder="请输入名称（不超过10个字符）"
            style="width:70%;"
            :maxlength="10"
          ></el-input>
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
            :beforeUpload="beforeAvatarUpload"
          >
            <el-button size="small" type="primary" style="width:150%;" icon="el-icon-plus">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过1M</div>
          </el-upload>
        </el-form-item>
        <el-form-item label="农作物种类编码" prop="classiCode">
          <el-select v-model="editForm.classiCode" placeholder="请输入农作物种类编码" style="width:70%;">
            <el-option
              v-for="item in cropsOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="病虫害种类编码" prop="classiDipCode">
          <el-select v-model="editForm.classiDipCode" placeholder="请输入病虫害种类编码" style="width:70%;">
            <el-option
              v-for="item in dipOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="关键词" prop="keyCodes">
          <el-select v-model="editForm.keyCodes" multiple  placeholder="请选择关键词" style="width:70%;">
            <el-option
              v-for="item in keyOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="文章内容" prop="describetion">
          <div class="edit_container">
            <el-card style="height: 510px;width:70%">
              <!-- 图片上传组件辅助-->
              <el-upload
                  class="avatar-uploader quill-img"
                  :action="upload"
                  :show-file-list="false"
                  :on-success="quillUploadSuccess"
                  :beforeUpload="beforeAvatarUpload"
                  >
              </el-upload>
              <quill-editor
                v-model="editForm.describetion"
                ref="myQuillEditor"
                style="height: 500px;width:100%"
                :options="editorOption"
              ></quill-editor>
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
        :disabled="isDisable"
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
import { quillEditor } from "vue-quill-editor";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
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
      isDisable: false,
      labelPosition: "right",
      editForm: {
        name: "",
        url: "",
        classiCode: "",
        classiDipCode: "",
        keyCodes:[],
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
          { required: true, message: "请输入农作物种类编码", trigger: "blur" },
        ],
        classiDipCode: [
          {
            required: true,
            message: "请输入请输入病虫害种类编码",
            trigger: "blur",
          },
        ],
      },
      editorOption: { // 富文本框配置
      placeholder: '',
      theme: 'snow',  // or 'bubble'
      modules: {
          toolbar: {
              container: [['bold', 'italic', 'underline', 'strike'],        // toggled buttons
              ['blockquote', 'code-block'],
              [{'list': 'ordered'}, {'list': 'bullet'}],
              [{'script': 'sub'}, {'script': 'super'}],      // superscript/subscript
              [{'indent': '-1'}, {'indent': '+1'}],          // outdent/indent
              [{'direction': 'rtl'}],                         // text direction
              [{'color': []}, {'background': []}],          // dropdown with defaults from theme
              [{'align': []}],
              ['image'],
              ['clean']],
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
            },}
    };
  },
  components: {
    quillEditor
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
      return extension || (extension2 && isLt2M);
    },
    //logo图片
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
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    //展示关键词下拉列表（多选）
    fandKeyWord:function () {
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
            this.cropsOptions.push({ value: "", label: "请选择" });
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
            this.dipOptions.push({ value: "", label: "请选择" });
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
      if(this.editForm.name  == ""){
          this.$alert("名称不能为空", "提示", {
            confirmButtonText: "确定",
          });
          return false;
      }
       if(this.imgUrl  == ""){
          this.$alert("图片不能为空", "提示", {
            confirmButtonText: "确定",
          });
          return false;
      }
       if(this.editForm.classiCode  == ""){
          this.$alert("农作物种类编码不能为空", "提示", {
            confirmButtonText: "确定",
          });
          return false;
      }
       if(this.editForm.classiDipCode  == ""){
          this.$alert("病虫害种类编码不能为空", "提示", {
            confirmButtonText: "确定",
          });
          return false;
      }
        this.isDisable = true;
        this.$refs[editData].validate((valid) => {
          if (valid) {
            if (this.imgUrl != "") {
              this.editForm.url = this.imgUrl;
              let keyArr = []
						  for(var i = 0; i < this.editForm.keyCodes.length; i++) {
							  keyArr.push(this.editForm.keyCodes[i])
						  }
              this.editForm.keyCodes = null
              this.editForm.keys = keyArr.join()
              let params = {
                caseInfoEntity:JSON.stringify(this.editForm) ,
              };
              api
                .testAxiosGet(ApiPath.url.saveCaseInfo, params)
                .then((res) => {
                  let code = res.state;
                  this.caseInfoForm.keyCodes = keyArr;
                  this.$message.success(res.message);
                  // this.reload();
                  this.close();
                })
                .catch(function (err) {
                  this.caseInfoForm.keyCodes = keyArr;
                  this.isDisable = false;
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
</style>
