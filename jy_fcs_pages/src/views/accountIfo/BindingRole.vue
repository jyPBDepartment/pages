<template>
  <el-dialog
    :visible.sync="localShow"
    :title="title"
    :before-close="beforeClose"
    append-to-body
    modal-append-to-body
    :close-on-click-modal="false"
    :close-on-press-escape="false"
  >
    <!-- 插槽区 -->
    <slot>
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item label="账户名称">
          <el-input v-model="accountName" readonly></el-input>
        </el-form-item>
        <el-form-item label="角色名称">
          <el-select v-model="roleId">
            <el-option
              v-for="item in roleInfoOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </slot>
    <!-- 按钮区 -->
    <span slot="footer">
      <el-button type="primary" icon="el-icon-check" @click="submit"
        >保存</el-button
      >
      <el-button type="info" icon="el-icon-close" @click="close"
        >关闭</el-button
      >
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
    transBindingRoleId: {
      type: Object,
    },
  },

  data() {
    return {
      localShow: this.show,
      accountName: "",
      accountId: "",
      roleInfoOptions: [],
      roleId: "",
      accountRoleInfoEntity: {
        accountId: "",
        roleId: "",
      },
    };
  },
  watch: {
    show(val) {
      this.localShow = val;
    },
    transBindingRoleId(val) {
      this.accountName = val.row.name;
      this.accountId = val.row.id;
      this.initRoleInfo();
    },
  },
  mounted() {},
  methods: {
    initRoleInfo() {
      let params = {
        name: "",
        page: 1,
        size: 10,
      };
      api.testAxiosGet(ApiPath.url.roleSearch, params).then((res) => {
        let code = res.status;
        if (code == "0") {
          let result = res.data.content;
          for (let i = 0; i < result.length; i++) {
            this.roleInfoOptions.push({
              value: result[i].id,
              label: result[i].name,
            });
          }
          // console.log(JSON.stringify(this.listData))
        }
      });
    },
    submit() {
      if ((this.roleId ==null)) {
        this.$message.error("请选择角色");
        return;
      }
        alert(this.roleId)
      this.accountRoleInfoEntity.accountId = this.accountId;
      this.accountRoleInfoEntity.roleId = this.roleId;
      let params = this.accountRoleInfoEntity;
      api
        .testAxiosGet(ApiPath.url.bindingRole, params)
        .then((res) => {
          let status = res.status;
          if (status == "success") {
            this.$message.success(res.message);
            this.close();
          }
        })
        .catch((err) => {
          this.$message.success(res.message);
        });
    },
    close: function () {
      this.accountName = "";
      this.accountId = "";
      this.$emit("close");
    },
    beforeClose: function () {
      this.close();
    },
  },
};
</script>
<style scoped>
</style>