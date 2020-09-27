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
      <el-form ref="form" :model="form" :rules="rules" label-width="100px" :label-position="labelPosition" style="padding-right: 29px;margin-left:-85px">
        <el-form-item label="原密码" prop="pass">
          <el-input
            type="text"
            placeholder="请输入原密码(不能超过16个字符)"
            v-model="form.pass"
            style="width:100%"
            maxlength="16"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="password">
          <el-input
            type="password"
            placeholder="请设置新密码(不能超过16个字符)"
            v-model="form.password"
            style="width:100%"
            minlength="6"
            maxlength="16"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="newPassword2">
          <el-input
            type="password"
            placeholder="请确认新密码(不能超过16个字符)"
            v-model="form.newPassword2"
            style="width:100%"
            minlength="6"
            maxlength="16"
            clearable
          ></el-input>
        </el-form-item>
      </el-form>
    </slot>
    <span slot="footer">
      <el-button
        :disabled="isDisable"
        type="primary"
        @click="onSubmit('form')"
        icon="el-icon-check"
      >保存</el-button>
      <el-button @click="resetForm" icon="el-icon-remove-outline" type="primary" plain>重置</el-button>
      <el-button type="info" icon="el-icon-close" @click="close">关闭</el-button>
    </span>
  </el-dialog>
</template>
<script>
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
    transPasswordId: {
      type: String,
    },
  },
  data() {
    //此处即表单发送之前验证
    let valiPassword = (rule, value, callback) => {
      if (this.form.pass == this.formOld.passWord) {
        callback();
      } else {
        callback(new Error("输入密码与原密码不同!"));
      }
    };
    let validateNewPassword = (rule, value, callback) => {
      if (value == this.form.pass) {
        callback(new Error("新密码不能与原密码相同!"));
      } else {
        callback();
      }
    };
    let validateNewPassword2 = (rule, value, callback) => {
      if (value !== this.form.password) {
        callback(new Error("与新密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      isDisable: false,
      localShow: this.show,
      labelPosition: "right",
      oldPass: "",
      rules: {
        pass: [
          { required: true, message: "请输入原密码", trigger: "blur" },
          { validator: valiPassword, trigger: "blur" },
        ],
        password: [
          { required: true, message: "请设置新密码", trigger: "blur" },
          { validator: validateNewPassword, trigger: "blur" },
        ],
        newPassword2: [
          { required: true, message: "请确认新密码", trigger: "blur" },
          { validator: validateNewPassword2, trigger: "blur" },
        ],
      },
      form: {
        pass: "",
        password: "",
        newPassword2: "",
      },
    };
  },
  watch: {
    show(val) {
      this.localShow = val;
    },
    transPasswordId(val) {
      let params = {
        id: val,
      };
      //根据Id查询用户信息
      api.testAxiosGet(ApiPath.url.findAccountInfoId, params).then((res) => {
        this.formOld = res.data;
      });
    },
  },
  mounted() {},
  methods: {
    resetForm() {
      this.$refs.form.resetFields();
    },
    onSubmit(formName) {
    if (this.form.password.length<6) {
        this.$alert("新密码不能少于6位", "提示", { confirmButtonText: "确定" });
        return false;
      }
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.formOld.passWord = this.form.password;
          this.isDisable = true;
          let params = {
            accountInfoEntity: this.formOld,
          };
          api
            .testAxiosGet(ApiPath.url.updatePassword, params)
            .then((res) => {
              this.$message.success("密码已修改");
              this.close();
              this.reload();
            })
            .catch(function (err) {
              this.isDisable = false;
            });
          this.formOld.updateUser = localStorage.getItem("userInfo");
        } else {
          this.$message.error("请正确填写表单");
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
  padding-left: 80px;
  padding-right: 80px;
}
.el-button {
  border: none;
}
</style>