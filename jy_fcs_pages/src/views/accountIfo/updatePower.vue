<template>
  <el-dialog
    :visible.sync="localShow"
    :title="title"
    :before-close="beforeClose"
    append-to-body
    modal-append-to-body
    width="43%"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
  >
    <!-- 插槽区 -->
    <slot>
      <el-form :label-position="labelPosition" label-width="100px">
        <template>
          <el-transfer
            v-model="accountInfoForm"
            :props="{
              key: 'value',
              label: 'desc'
            }"
            :data="jurIdOptions"
            :titles="['可添加权限','已添加权限']"
          >
          <el-button type="primary" style="margin-left:60px" slot="left-footer" @click="updateAccountInfo" size="small">添加权限</el-button>
          <el-button type="primary" style="margin-left:60px" slot="right-footer" @click="deleteAccountInfo" size="small">移除权限</el-button>
          </el-transfer>
        </template>
      </el-form>
    </slot>
    <!-- 按钮区 -->
    <span slot="footer">
      <el-button icon="el-icon-close" @click="close">关闭</el-button>
    </span>
  </el-dialog>
</template>
<script>
import ApiPath from "@/api/ApiPath.js";
import api from "@/axios/api.js";
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
    transPowerId: {
      type: String,
    },
  },

  data() {
    return {
      labelPosition: "right",
      accountInfoForm: [],
      localShow: this.show,
      jurIdOptions: [],
      accountId: "",
      accountInfoOld: [],
      jurCodel: "",
    };
  },
  watch: {
    show(val) {
      this.localShow = val;
    },
    transPowerId(val) {
      this.accountInfoOld = [];
      this.accountInfoForm = [];
      this.accountId = val;
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

          this.accountInfoOld = initSelectJurisdiction;
        }
      });
    },
  },
  mounted() {},
  methods: {
    updateAccountInfo() {
      let addItem = [];
      // 原数据
      // this.accountInfoOld;
      // 当前数据
      // this.accountInfoForm;
      // 1.处理数据
      let add = []; // 中间容器接收遍历数据
      for (let i = 0; i <= this.accountInfoForm.length; i++) {
        for (let j = 0; j <= this.accountInfoOld.length; j++) {
          // 如果不相等，证明是新增
          if (this.accountInfoForm[i] != this.accountInfoOld[j]) {
            add.push(this.accountInfoForm[i]);
          }
        }
      }
      addItem = add;
      let params = {
        accountId: this.accountId,
        addItem: aes.encrypt(JSON.stringify(addItem)),
      };
      //修改用户信息
      api.testAxiosGet(ApiPath.url.updateAccountPower, params).then((res) => {
        let code = res.status;
        if (code == "0") {
          this.$message.success(res.message);
          this.close();
          this.reload();
        }
      });
    },
    deleteAccountInfo(){
      let deleteItem = [];
      // 1.处理数据
      let delet = [];
      for (let m = 0; m <= this.accountInfoOld.length; m++) {
        for (let n = 0; n <= this.accountInfoForm.length; n++) {
          // 如果不相等，证明是删除
          if (this.accountInfoOld[m] != this.accountInfoForm[n]) {
            delet.push(this.accountInfoOld[m]);
          }
        }
      }
      deleteItem = delet;
      let params = {
        accountId: this.accountId,
        jurCodel:aes.encrypt(JSON.stringify(deleteItem.jurCodel)),
        deleteItem: aes.encrypt(JSON.stringify(deleteItem)),
      };
      //修改用户信息
      api.testAxiosGet(ApiPath.url.deleteAccountPower, params).then((res) => {
        let code = res.status;
        if (code == "0") {
          this.$message.success(res.message);
          this.close();
          this.reload();
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
.el-button {
  border: none;
}
</style>