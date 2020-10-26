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
        <el-form-item label="标签名称" prop="name">
          <el-input
            type="text"
            v-model="editForm.name"
            size="small"
            placeholder="请输入标签名称(限5个字)"
            style="width:90%"
            maxlength="5"
          ></el-input>
        </el-form-item>
      </el-form>
    </slot>
    <!-- 按钮区 -->
    <span slot="footer">
      <el-button type="primary" icon="el-icon-check" @click="saveManualLabel('editForm')" v-loading.fullscreen.lock="fullscreenLoading">保存</el-button>
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
  },
  data() {
    return {
      fullscreenLoading: false,
      labelPosition: "right",
      editForm: {
        name: "",
        createBy: localStorage.getItem("userInfo"),
      },
      localShow: this.show,
      rules: {
        name: [{ required: true, message: "请输入标签名称", trigger: "blur" },],
      },
    };
  },
  watch: {
    show(val) {
      this.localShow = val;
    },
  },
  mounted() {},
  methods: {
    beforeClose() {
      this.close();
    },
    close() {
      this.$emit("close");
    },
    //新增保存
    saveManualLabel(editData) {
      this.$refs[editData].validate((valid) => {
        if(this.editForm.name == ""){
          this.$alert("标签名称不能为空", "提示", {
            confirmButtonText: "确定",
          });
          return false;
        }
        if (valid) {
            let params = {
              eduManualLabelInfoEntity: this.editForm,
            };
            api.testAxiosGet(ApiPath.url.addManualLabel, params)
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
                this.editForm.name="";
                this.fullscreenLoading = false;
              }, 500);
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