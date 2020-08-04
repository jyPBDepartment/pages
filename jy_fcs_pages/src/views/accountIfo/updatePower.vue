<template>
  <el-dialog
    :visible.sync="localShow"
    :title="title"
    :before-close="beforeClose"
    append-to-body
    modal-append-to-body
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    class="al"
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
          </el-transfer>
        </template>
      </el-form>
    </slot>
    <!-- 按钮区 -->
    <span slot="footer">
      <el-button type="primary" icon="el-icon-check" @click="submit">保存</el-button>
      <el-button type="info" icon="el-icon-close" @click="close">关闭</el-button>
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
      default: false
    },
    title: {
      type: String,
      default: "对话框"
    },
    transPowerId: {
      type: String
    }
  },

  data() {
    return {
      labelPosition: "right",
      accountInfoForm: [],
      localShow: this.show,
      jurIdOptions: [],
      accountId: "",
      accountInfoOld: [],
      jurCodel: ""
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
        id: val
      };
      //根据Id查询用户信息
      api.testAxiosGet(ApiPath.url.findAccountId, params).then(res => {
        let code = res.status;
        if (code == "0") {
          let initAllJurisdiction = [];
          for (let i = 0; i < res.data1.length; i++) {
            initAllJurisdiction.push({
              value: res.data1[i]["id"],
              desc: res.data1[i]["jurName"]
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
    }
  },
  mounted() {},
  methods: {
    submit() {
      let addItem = [];
      let deleteItem = [];

      let add = [];
      let del = [];

      for (let i = 0; i < this.accountInfoForm.length; i++) {
        if (this.accountInfoOld.indexOf(this.accountInfoForm[i]) == -1) {
          add.push(this.accountInfoForm[i]);
        }
      }
      addItem = add;

      for (let m = 0; m < this.accountInfoOld.length; m++) {
        if (this.accountInfoForm.indexOf(this.accountInfoOld[m]) == -1) {
          del.push(this.accountInfoOld[m]);
        }
      }

      deleteItem = del;

      let params = {
        accountId: this.accountId,
        addItem: aes.encrypt(JSON.stringify(addItem)),
        deleteItem: aes.encrypt(JSON.stringify(deleteItem))
      };
      //修改用户信息
      api.testAxiosGet(ApiPath.url.updateAccountPower, params).then(res => {
        let code = res.status;
        if (code == "0") {
          this.$message.success(res.message);
          this.close();
          this.reload();
        }
      });
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
.el-button {
  border: none;
}
.al{
  position: absolute;
  width: 1600px;
  height: 750px;
  background-size: 100% 100%;
}
</style>