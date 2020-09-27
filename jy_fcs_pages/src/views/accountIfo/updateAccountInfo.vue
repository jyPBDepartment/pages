<template>
  <el-dialog
    :visible.sync="localShow"
    :title="title"
    :before-close="beforeClose"
    append-to-body
    modal-append-to-body
    width="30%"
    :close-on-click-modal="false"
    :close-on-press-escap3="false"
  >
    <!-- 插槽区 -->
    <slot>
      <el-form :model="accountInfoForm" :rules="rules" ref="accountInfoForm" :label-position="labelPosition" label-width="100px" style="margin-left:-85px">
        <el-form-item label="账户名称" prop="name">
          <el-input type="text" v-model="accountInfoForm.name" size="small" placeholder="请输入账户名称(不能超过16个字符)" style="width:90%" maxlength="16"></el-input>
        </el-form-item>
        <el-form-item label="昵称" prop="nickName">
          <el-input type="text" v-model="accountInfoForm.nickName" size="small" placeholder="请输入昵称(不能超过16个字符)" style="width:90%" maxlength="16"></el-input>
        </el-form-item>
        <el-form-item label="手机号码" prop="phone">
          <el-input type="text" v-model="accountInfoForm.phone" size="small" placeholder="请输入11位手机号码" style="width:90%" @change="telPhone" maxlength="11"></el-input>
        </el-form-item>
      </el-form>
    </slot>
    <!-- 按钮区 -->
    <span slot="footer">
      <el-button type="primary" icon="el-icon-check" @click="updateAccountInfo" v-loading.fullscreen.lock="fullscreenLoading">保存</el-button>
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
      default: false
    },
    title: {
      type: String,
      default: "对话框"
    },
    transAccountInfoId: {
      type: String
    }
  },
  data() {
    return {
      fullscreenLoading: false,
      labelPosition: "right",
      accountInfoForm: {
        name: "",
        nickName:"",
        id:"",
        phone:"",
        jurId:"",
        updateUser:"",
      },
      jurIdOptions: [],
      localShow: this.show,
      rules: {
        name: [{ required: true, message: "请输入名称", trigger: "blur" }],
        nickName: [{ required: true, message: "请输入昵称", trigger: "blur" }],
        phone: [{ required: true, message: "请输入手机号码", trigger: "blur" }],
      }
    };
  },
  watch: {
    show(val) {
      this.localShow = val;
    },
    transAccountInfoId(val) {
      let params = {
        id: val
      };
      //根据Id查询用户信息
      api.testAxiosGet(ApiPath.url.findAccountInfoId, params).then(res => {
        this.accountInfoForm = res.data;
      });
    }
  },
  mounted() {},
  methods: {
      telPhone: function() {
      if (!/^1[345789]\d{9}$/.test(this.accountInfoForm.phone)) {
        this.$alert("请输入正确的手机号！", "提示", {
          confirmButtonText: "确定"
        });
        this.accountInfoForm.phone = "";
      }
    },
    updateAccountInfo: function() {
      if (this.accountInfoForm.name == "") {
        this.$alert("账户名称不能为空", "提示", { confirmButtonText: "确定" });
        return false;
      }

      if (this.accountInfoForm.nickName == "") {
        this.$alert("昵称不能为空", "提示", { confirmButtonText: "确定" });
        return false;
      }

      if (this.accountInfoForm.phone == "") {
        this.$alert("手机号不能为空", "提示", { confirmButtonText: "确定" });
        return false;
      }
      let params = {
        accountInfoEntity: this.accountInfoForm
      };
      //修改用户信息
      api.testAxiosGet(ApiPath.url.updateAccountInfo, params).then(res => {
        let code = res.status;
          if(code == "0") {
            this.$message.success(res.message);
            this.close();
          }
      }).catch(function(err) {});
        this.fullscreenLoading = true;
        setTimeout(() => {
          this.fullscreenLoading = false;
        }, 500);
      this.accountInfoForm.updateUser =localStorage.getItem("userInfo");
    },
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
  padding-left: 100px;
}
.el-button{
  border: none;
}
</style>