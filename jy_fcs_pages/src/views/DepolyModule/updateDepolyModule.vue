<template>
  <el-dialog
    :visible.sync="localShow"
    :title="title"
    :before-close="beforeClose"
    append-to-body
    modal-append-to-body
    width="50%"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
  >
    <!-- 插槽区 -->
    <slot>
      <el-form :rules="rules" ref="deployModuleForm" :model="deployModuleForm" label-width="100px" :label-position="labelPosition">
         <el-form-item label="发布模块" prop="deployModuleName">
          <el-input type="text" v-model="deployModuleForm.deployModuleName" size="small" placeholder="请输入发布模块名称" style="width:80%"></el-input>
        </el-form-item>
        <el-form-item label="连接路径" prop="linkUrl">
          <el-input type="text" v-model="deployModuleForm.linkUrl" size="small" placeholder="请输入连接路径"  style="width:80%"></el-input>
        </el-form-item>
        <el-form-item label="图片路径" prop="picUrl">
          <el-input type="text"  v-model="deployModuleForm.picUrl" size="small"  placeholder="请输入图片路径" style="width:80%" ></el-input>
        </el-form-item>
      </el-form>
    </slot>
    <!-- 按钮区 -->
    <span slot="footer">
      <el-button
      :disabled="saveFlag"
        type="primary"
        icon="el-icon-check"
        @click="updateModule('deployModuleForm')"
      >保存</el-button>
      <el-button
        type="info"
        icon="el-icon-close"
        @click="close"
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
    transDeployModuleId: {
      type: String,
    },
  },
  data() {
    return {
      saveFlag:false,
      localShow: this.show,
      isShow: false,
      labelPosition: "right",
      editFormVisible: false,
      deployModuleForm:{
        deployModuleName:"",
        linkUrl:"",
        picUrl:"",
      },
      //rules表单验证
      rules: {
        deployModuleName: [
          { required: true, message: "请输入发布模块名称", trigger: "blur" },
        ],
        linkUrl: [
          { required: true, message: "请输入连接路径", trigger: "blur" },
        ],
        picUrl: [
          { required: true, message: "请输入图片路径", trigger: "blur" },
        ],
      },
    };
  },
  watch: {
    show(val) {
      this.localShow = val;
    },
    transDeployModuleId(val) {
      let params = {
        id: val,
      };
      //根据Id查询用户信息
      api.testAxiosGet(ApiPath.url.depolyModuleFindId, params).then((res) => {
        this.deployModuleForm = res.data;
      });
    },
  },
  mounted() {},
  methods: {

    handle() {
      this.isShow = true;
    },
    cancal() {
      this.isShow = false;
    },
    
    updateModule(editData) {
      this.$refs[editData].validate((valid) => {
        if (this.editForm.deployModuleName == "") {
          this.$alert("发布模块名称不能为空", "提示", {
            confirmButtonText: "确定",
          });
          return false;
        }
        if (this.editForm.linkUrl == "") {
          this.$alert("连接路径不能为空", "提示", {
            confirmButtonText: "确定",
          });
          return false;
        }
        if (this.editForm.picUrl == "") {
          this.$alert("图片路径不能为空", "提示", {
            confirmButtonText: "确定",
          });
          return false;
        }
        if (valid) {
            this.saveFlag = true;
            let params = { deployModuleEntity: this.deployModuleForm };
            api
              .testAxiosGet(ApiPath.url.updateDeployModule, params)
              .then((res) => {
                this.$message.success(res.message);
                this.reload();
              })
              .catch(function(err) {
                this.saveFlag = false;
                this.$message.error(err.data);
              });
            this.deployModuleForm.updateUser = localStorage.getItem("userInfo");
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
  padding-left: 115px;
}
.el-button {
  border: none;
}
.required {
  color: red;
  margin-left: -79px;
}
</style>