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
        label-width="120px"
        @submit.native.prevent
      >
        <el-form-item label="导航名称" prop="name">
          <el-input
            type="text"
            v-model="editForm.name"
            placeholder="请输入导航名称"
            style=" width:70%;"
          ></el-input>
        </el-form-item>
        <el-form-item label="上级导航" prop="subId" >
          <el-select v-model="editForm.subId" @change="navigationChange()" placeholder="请输入上级导航" style=" width:70%;" id="test">
            <el-option
              v-for="item in navigationOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-input type="text" v-model="editForm.status" placeholder="请输入状态" style=" width:70%;"></el-input>
        </el-form-item>
        <!-- <el-form-item label="上级导航" prop="subId" v-if="isShow">
          <el-input type="text" v-model="editForm.subId" placeholder="请输入上级导航" style=" width:70%;"></el-input>
        </el-form-item>-->
        <el-form-item label="下拉英文内容" prop="dropDownEnName" v-if="isShow">
          <el-input
            type="text"
            v-model="editForm.dropDownEnName"
            placeholder="下拉英文内容"
            style=" width:70%;"
          ></el-input>
        </el-form-item>
        <el-form-item label="图片地址" prop="imgUrl" v-if="isShow">
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
          >
            <el-button
              size="small"
              type="primary"
              style="background-color:rgb(132, 193, 255);border:none;color:white;font-size:12px"
            >点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-form-item>
        <el-form-item label="导航路径" prop="path" v-if="isShow">
          <el-input
            type="textarea"
            v-model="editForm.path"
            placeholder="请输入导航路径"
            style=" width:70%;"
          ></el-input>
        </el-form-item>
      </el-form>
    </slot>
    <!-- 按钮区 -->
    <span slot="footer">
      <el-button
        type="success"
        icon="el-icon-check"
        @click="saveNavigation()"
        size="medium"
        style="background-color:#409EFF;border-color:#409EFF;color:white;font-size:12px"
      >保存</el-button>
      <el-button
        type="danger"
        icon="el-icon-close"
        @click="close"
        size="medium"
        style="background-color:white;border-color:black;color:black;font-size:12px"
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
      default: false
    },
    title: {
      type: String,
      default: "对话框"
    }
  },
  data() {
    return {
      isShow: false,
      labelPosition: "right",
      trueFlag: true,
      falseFlag: false,
      limit: 1,
      imgUrl: "",
      fileList: [],
      upload: ApiPath.url.uploadImg,
      fileList: [],
      editFormVisible: false,
      editForm: {
        name: "",
        subId: "",
        dropDownEnName: "",
        url: "",
        path: "",
        status: "1"
      },
      navigationOptions: [],
      localShow: this.show,
      //rules表单验证
      rules: {
        name: [{ required: true, message: "请输入导航名称", trigger: "blur" }],
        subId: [{ required: true, message: "请输入上级导航", trigger: "blur" }],
        dropDownEnName: [
          { required: true, message: "请输入下拉英文内容", trigger: "blur" }
        ],
        url: [{ required: true, message: "请输入图片地址", trigger: "blur" }],
        path: [{ required: true, message: "请输入导航路径", trigger: "blur" }],
        status: [{ required: true, message: "请输入状态", trigger: "blur" }]
      }
    };
  },
  watch: {
    show(val) {
      this.localShow = val;
    }
  },
  mounted() {
    this.findContext();
  },
  methods: {
    navigationChange() {
      if (this.editForm.subId != "") {
        this.isShow = true;
      }else{
        this.isShow = false;
      }
    },
    all() {
      // this.subId = this.name;
      this.editForm.subId = this.editForm.name;
    },
    handle() {
      this.isShow = true;
    },
    cancal() {
      this.isShow = false;
    },
    //下拉列表显示
    findContext: function() {
      let params = {};
      api
        .testAxiosGet(ApiPath.url.findSubNavList, params)
        .then(res => {
          if (res.status == "0") {
            this.navigationOptions.push({ value: "", label: "请选择" });
            for (let i = 0; i < res.data.length; i++) {
              this.navigationOptions.push({
                value: res.data[i]["id"],
                label: res.data[i]["name"]
              });
            }
          }
        })
        .catch(function(error) {});
    },
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
    beforeClose() {
      this.close();
    },
    close() {
      this.$emit("close");
    },
    saveNavigation: function() {
       if (this.editForm.name != "") {
      this.editForm.url = this.imgUrl;
      let params = { navigationEntity: this.editForm };
      api.testAxiosGet(ApiPath.url.saveNavChildren, params).then(res => {
        this.$message.success(res.message);
        this.reload();
        this.close();
      });
    }else {
            this.$alert('导航名称不能为空！', '提示', {
          confirmButtonText: '确定',
        });
        }},
    close: function() {
      this.$emit("close");
    },
    beforeClose: function() {
      this.close();
    }
  }
};
</script>

<style scoped>
.el-form {
  padding-left: 115px;
}
.el-button {
  border: none;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  margin: 4px 2px;
  cursor: pointer;
  -webkit-transition-duration: 0.4s;
  transition-duration: 0.4s;
}
*/ .el-button:hover {
  box-shadow: 0 12px 16px 0 rgba(0, 0, 0, 0.24),
    0 17px 50px 0 rgba(0, 0, 0, 0.19);
}
</style>