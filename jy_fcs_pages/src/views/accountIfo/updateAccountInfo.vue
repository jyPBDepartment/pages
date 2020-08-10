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
      <el-form :model="accountInfoForm" :rules="rules" ref="accountInfoForm" :label-position="labelPosition" label-width="100px">
        <el-form-item label="账户名称" prop="name">
          <el-input type="text" v-model="accountInfoForm.name" size="small" placeholder="请输入账户名称(不能超过16个字符)" style="width:80%" maxlength="16"></el-input>
        </el-form-item>
        <el-form-item label="手机号码" prop="phone">
          <el-input type="text" v-model="accountInfoForm.phone" size="small" placeholder="请输入11位手机号码" style="width:80%" @change="telPhone" maxlength="11"></el-input>
        </el-form-item>
      </el-form>
    </slot>
    <!-- 按钮区 -->
    <span slot="footer">
      <el-button :disabled="isDisable" type="primary" icon="el-icon-check" @click="updateAccountInfo">保存</el-button>
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
      isDisable:false,
      labelPosition: "right",
      accountInfoForm: {
        name: "",
        id:"",
        phone:"",
        jurId:"",
        updateUser:"",
      },
      jurIdOptions: [],
      localShow: this.show,
      rules: {
        name: [{ required: true, message: "请输入名称", trigger: "blur" }],
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
   mounted() {
  },
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

      if (this.accountInfoForm.phone == "") {
        this.$alert("手机号不能为空", "提示", { confirmButtonText: "确定" });
        return false;
      }
      this.isDisable=true
      let params = {
        accountInfoEntity: this.accountInfoForm
      };
      //修改用户信息
      api.testAxiosGet(ApiPath.url.updateAccountInfo, params).then(res => {
        let code = res.status;
          if(code == "0") {
            this.$message.success(res.message);
            this.close();
            this.reload();
          }
      }).catch(function(err) {
                this.isDisable=false
       });
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