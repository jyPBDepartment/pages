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
      <el-form :label-position="labelPosition">
        <template>
          <el-transfer
            v-model="accountInfoForm"
            :props="{
              key: 'value',
              label: 'desc'
            }"
            :data="jurIdOptions"
            :titles="['可添加权限','已添加权限']"
          ></el-transfer>
        </template>
      </el-form>
    </slot>
    <!-- 按钮区 -->
    <span slot="footer">
      <el-button type="primary" icon="el-icon-check" @click="updateAccountInfo">保存</el-button>
      <el-button icon="el-icon-close" @click="close">关闭</el-button>
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
    transPowerId: {
      type: String,
    },
  },

  data() {
    return {
      labelPosition: "right",
      accountInfoForm: [],
      // data: [],
      // value: [],
      localShow: this.show,
      jurIdOptions: [],
    };
  },
  watch: {
    show(val) {
      this.localShow = val;
    },
    transPowerId(val) {
      let params = {
        id: val,
      };
      //根据Id查询用户信息
      api.testAxiosGet(ApiPath.url.findAccountId, params).then((res) => {
        let code = res.status;
        if (code == "0") {
          let initAllJurisdiction = [];
          for (let i = 0; i < res.data1.length; i++) {
            initAllJurisdiction.push({
              value: res.data1[i]["id"],
              desc: res.data1[i]["jurName"],
            });
          }
          this.jurIdOptions = initAllJurisdiction;
          let initSelectJurisdiction = [];
          for (let i = 0; i < res.data.length; i++) {
            initSelectJurisdiction.push(res.data[i]["jurCodel"]);
          }
          this.accountInfoForm = initSelectJurisdiction;
        }
      });
    },
  },
  mounted() {
  },
  methods: {
    updateAccountInfo: function () {
        let params = {
          accountInfoEntity: this.accountInfoForm
        };
        //修改用户信息
        api.testAxiosGet(ApiPath.url.updatePower, params).then(res => {
          let code = res.status;
            if(code == "0") {
              this.$message.success(res.message);
              this.close();
              this.reload();
            }
        });
        // this.accountInfoForm.updateUser =localStorage.getItem("userInfo");
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
.el-button {
  border: none;
}
</style>