<template>
  <el-dialog
    :visible.sync="localShow"
    :title="title"
    :before-close="beforeClose"
    append-to-body
    modal-append-to-body
    width="35%"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
  >
    <!-- 插槽区 -->
    <slot>
      <el-form
        :model="editForm"
        :rules="rules"
        ref="editForm"
        :label-position="labelPosition"
        label-width="100px"
        style="margin-left:-85px"
      >
        <el-form-item label="职业编码" prop="vocationCode">
          <el-input
            type="text"
            v-model="editForm.vocationCode"
            size="small"
            placeholder="请输入职业编码(限16个字)"
            style="width:90%"
            maxlength="16"
          ></el-input>
        </el-form-item>
        <el-form-item label="职业名称" prop="name">
          <el-input
            type="text"
            v-model="editForm.name"
            size="small"
            placeholder="请输入职业类别名称(限16个字)"
            style="width:90%"
            maxlength="16"
          ></el-input>
        </el-form-item>
        <el-form-item label="描述">
          <el-input
            type="textarea"
            v-model="editForm.description"
            size="small"
            placeholder="请输入描述(限255个字)"
            style="width:90%"
            maxlength="255"
          ></el-input>
        </el-form-item>
      </el-form>
    </slot>
    <!-- 按钮区 -->
    <span slot="footer">
      <el-button type="primary" icon="el-icon-check" @click="updateEduVocationInfo('editForm')" v-loading.fullscreen.lock="fullscreenLoading">保存</el-button>
      <el-button type="info" icon="el-icon-close" @click="close">关闭</el-button>
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
    transVocationInfoId: {
      type: String,
    },
  },
  data() {
    return {
      fullscreenLoading: false,
      labelPosition: "right",
      editForm: {
        vocationCode:"",
        name: "",
        description: "",
      },
      localShow: this.show,
      rules: {
        vocationCode:[{required: true, message: "请输入职业编码", trigger: "change"},],
        name: [{ required: true, message: "请输入职业类别名称", trigger: "change" },],
      },
    };
  },
  watch: {
    show(val) {
      this.localShow = val;
    },
    transVocationInfoId(val) {
      if (val == "") {
        return;
      }
      let params = {
        id: val,
      };
      //根据Id查询用户信息
      api.testAxiosGet(ApiPath.url.vocationInfoFindId, params).then((res) => {
        this.editForm = res.data;
      });
    }
  },
  mounted() {},
  methods: {
    beforeClose() {
      this.close();
    },
    close: function () {
      this.$emit("close");
    },
    //编辑保存
    updateEduVocationInfo(editData) {
      this.$refs[editData].validate((valid) => {
        if (valid) {
            let params = {
              eduVocationInfoEntity: this.editForm,
            };
            api
              .testAxiosGet(ApiPath.url.updateEduVocationInfo, params)
              .then((res) => {
                let code = res.state;
                if (code == "0") {
                  this.close();
                  this.$message.success(res.message);
                } else {
                  this.$message.error(res.message);
                }
              }).catch(function (err) {});
              this.fullscreenLoading = true;
              setTimeout(() => {
                this.fullscreenLoading = false;
              }, 500);
              this.editForm.updateBy = localStorage.getItem("userInfo");
          } else {
                return false;
              }
      });
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