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
        ref="editForm"
        :model="editForm"
        :label-position="labelPosition"
        label-width="130px"
      >
        <el-form-item label="名称" prop="name">
          <el-input type="text" v-model="editForm.name" placeholder="请输入名称" style="width:70%;"></el-input>
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
            <el-button size="small" type="primary" style="width:150%;" icon="el-icon-plus">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
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
        <el-form-item label="描述" prop="describetion">
          <el-input
            type="textarea"
            v-model="editForm.describetion"
            placeholder="请输入描述"
            style="width:70%;"
          ></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="auditStatus">
          <el-input
            type="text"
            v-model="editForm.auditStatus"
            placeholder="请输入状态"
            style=" width:70%;"
          ></el-input>
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
       
      >保存</el-button>
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
  },
  data() {
    return {
      labelPosition: "right",
      editForm: {
        name: "",
        url: "",
        classiCode: "",
        classiDipCode: "",
        auditStatus: "",
        createUser: localStorage.getItem("userInfo"),
      },
      cropsOptions: [],
      dipOptions: [],
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
  },
  mounted() {
    this.findContext();
    this.findContexta();
  },
  methods: {
    //logo图片
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
                label: res.data[i]["code"],
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
                label: res.data[i]["code"],
              });
            }
          }
        })
        .catch(function (error) {});
    },

    //添加分类方法
    saveCaseInfo(editData) {
      if (
        this.editForm.name != "" &&
        this.imgUrl != "" &&
        this.editForm.classiCode != "" &&
        this.editForm.classiDipCode != "" &&
        this.editForm.auditStatus != ""
      ) {
        this.$refs[editData].validate((valid) => {
          if (valid) {
            if (this.imgUrl != "") {
              this.editForm.url = this.imgUrl;
              let params = {
                caseInfoEntity: this.editForm,
              };
              api
                .testAxiosGet(ApiPath.url.saveCaseInfo, params)
                .then((res) => {
                  let code = res.state;
                  this.$message.success(res.message);
                  this.reload();
                  this.close();
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
      } else {
        this.$alert(
          "名称，图片，农作物种类编码，病虫害种类编码，状态不能为空！",
          "提示",
          {
            confirmButtonText: "确定",
          }
        );
      }
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
