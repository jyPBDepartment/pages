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
        <el-form-item label="账户名称" prop="name">
          <el-input type="text" v-model="editForm.name" size="small" placeholder="请输入账户名称(不能超过16个字符)" style="width:90%" maxlength="16"></el-input>
        </el-form-item>
        <el-form-item label="账户密码" prop="password">
          <el-input type="password" v-model="editForm.password" size="small" placeholder="请输入账户密码(5-16个字符)" style="width:90%" minlength="6" maxlength="16"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="newPassword">
          <el-input type="password" placeholder="请确认密码(不能超过16个字符)" v-model="editForm.newPassword" size="small" style="width:90%" maxlength="16"></el-input>
        </el-form-item>
        <el-form-item label="昵称" prop="nickName">
          <el-input type="text" v-model="editForm.nickName" size="small" placeholder="请输入昵称(不能超过16个字符)" style="width:90%" maxlength="16"></el-input>
        </el-form-item>
        <el-form-item label="手机号码" prop="phone">
          <el-input type="text" v-model="editForm.phone" size="small" placeholder="请输入十一位手机号码" style="width:90%" @change="telPhone" maxlength="11"></el-input>
        </el-form-item>
      </el-form>
    </slot>
    <!-- 按钮区 -->
    <span slot="footer">
      <el-button type="primary" icon="el-icon-check" @click="saveAccountInfo()" v-loading.fullscreen.lock="fullscreenLoading">保存</el-button>
      <el-button  type="info" icon="el-icon-close" @click="close">关闭</el-button>
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
    let validateNewPassword = (rule, value, callback) => {
      if (value !== this.editForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      fullscreenLoading: false,
      labelPosition: "right",
      editForm: {
        name: "",
        nickName:"",
        id: "",
        password:"",
        newPassword:"",
        phone:"",
        jurId:"",
        createUser: localStorage.getItem("userInfo"),
      },
      stateOptions: [
        { value: "0", label: "启用" },
        { value: "1", label: "禁用" },
      ],
      jurIdOptions: [],
      localShow: this.show,
      rules: {
        name: [{ required: true, message: "请输入账户名称", trigger: "blur" }],
        nickName: [{ required: true, message: "请输入昵称", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        newPassword: [
          { required: true, message: "请确认新密码", trigger: "blur" },
          { validator: validateNewPassword, trigger: "blur" },
        ],
        phone: [{ required: true, message: "请输入手机号码", trigger: "blur" }],
      },
    };
  },
  watch: {
    show(val) {
      this.localShow = val;
    },
  },
  mounted() {
  },
  methods: {
    beforeClose() {
      this.close();
    },
    close() {
      this.$emit("close");
    },
    telPhone: function () {
      if (!/^1[345789]\d{9}$/.test(this.editForm.phone)) {
        this.$alert("请输入正确的手机号！", "提示", {
          confirmButtonText: "确定",
        });
        this.editForm.phone = "";
      }
    },
    //新增保存
    saveAccountInfo: function () {
      if (this.editForm.name == "") {
        this.$alert("账户名称不能为空", "提示", { confirmButtonText: "确定" });
        return false;
      }

      if (this.editForm.password == "" ) {
        this.$alert("密码不能为空", "提示", { confirmButtonText: "确定" });
        return false;
      }

      if (this.editForm.password.length<6) {
        this.$alert("密码不能少于6位", "提示", { confirmButtonText: "确定" });
        return false;
      }

      if (this.editForm.newPassword == "") {
        this.$alert("确认密码不能为空", "提示", { confirmButtonText: "确定" });
        return false;
      }

      if (this.editForm.nickName == "") {
        this.$alert("昵称不能为空", "提示", { confirmButtonText: "确定" });
        return false;
      }

      if (this.editForm.phone == "") {
        this.$alert("手机号不能为空", "提示", { confirmButtonText: "确定" });
        return false;
      }
      if (this.editForm.password != this.editForm.newPassword) {
          this.$alert("两次输入的密码不一致！", "提示", {confirmButtonText: "确定",});
          return false;
       }
          let params = {
            accountInfoEntity: this.editForm,
          };
          api.testAxiosGet(ApiPath.url.addAccountInfo, params).then((res) => {
            let code = res.status;
            if (code == "0") {
              this.close();
              this.$message.success(res.message);
            }
          }).catch(function(err) {});
           this.fullscreenLoading = true;
            setTimeout(() => {
              this.editForm.name="";
              this.editForm.nickName="";
              this.editForm.password="";
              this.editForm.newPassword="";
              this.editForm.phone="";
              this.fullscreenLoading = false;
            }, 500);
        
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
</style>