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
      <el-form
        :rules="rules"
        ref="postInfoForm"
        :model="postInfoForm"
        :label-position="labelPosition"
        label-width="100px"
        style="margin-left: -135px"
      >
        <el-form-item label="拒绝理由" prop="reason">
          <el-input
            type="textarea"
            :rows="4"
            v-model="postInfoForm.reason"
            size="small"
            style="width: 95%"
          ></el-input>
        </el-form-item>
      </el-form>
    </slot>
    <!-- 按钮区 -->
    <span slot="footer">
      <el-button
        type="primary"
        icon="el-icon-check"
        @click="refusePostInfo()"
        size="small"
        >确认</el-button
      >
      <el-button type="info" icon="el-icon-close" @click="close" size="small"
        >关闭</el-button
      >
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
    refuseId: {
      type: String,
    },
  },
  data() {
    return {
      labelPosition: "right",
      postInfoForm: {
        status: "",
        id: "",
        reason: "",
      },
      localShow: this.show,
      rules: {
        reason: [
          { required: true, message: "请输入拒绝理由", trigger: "blur" },
        ],
      },
    };
  },
  watch: {
    show(val) {
      this.localShow = val;
    },
    refuseId(val) {
      let params = {
        id: val,
      };
      //根据Id查询用户信息
      api.testAxiosGet(ApiPath.url.findPostInfoId, params).then((res) => {
        this.postInfoForm = res.data;
      });
    },
  },
  mounted() {},
  methods: {
    //审核拒绝
    refusePostInfo: function () {
      this.$refs["postInfoForm"].validate((valid) => {
        if (valid) {
          let params = {
            id: this.postInfoForm.id,
            auditUser: localStorage.getItem("userInfo"),
            reason: this.postInfoForm.reason,
          };
          api
            .testAxiosGet(ApiPath.url.refusePostInfo, params)
            .then((res) => {
              let code = res.state;
              if (code == "0") {
                this.$message.success(res.message);
                this.close();
                this.reload();
              }
            })
            .catch(function (error) {});
          this.postInfoForm.auditUser = localStorage.getItem("userInfo");
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
  padding-left: 100px;
}
</style> 