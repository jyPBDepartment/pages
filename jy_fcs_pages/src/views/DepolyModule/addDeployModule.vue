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
      <el-form
        :model="editForm"
        :rules="rules"
        ref="editForm"
        :label-position="labelPosition"
        label-width="100px"
      >
        <el-form-item label="发布模块" prop="deployModuleName">
          <el-input
            type="text"
            v-model="editForm.deployModuleName"
            size="small"
            placeholder="请输入发布模块名称"
            style="width:80%"
          ></el-input>
        </el-form-item>
        <el-form-item label="连接路径" prop="linkUrl">
          <el-input
            type="text"
            v-model="editForm.linkUrl"
            size="small"
            placeholder="请输入连接路径"
            style="width:80%"
          ></el-input>
        </el-form-item>
        <el-form-item label="图片路径" prop="picUrl">
          <el-input
            type="text"
            v-model="editForm.picUrl"
            size="small"
            placeholder="请输入图片路径"
            style="width:80%"
          ></el-input>
        </el-form-item>
      </el-form>
    </slot>

    <!-- 按钮区 -->
    <span slot="footer">
      <el-button
        :disabled="isDisable"
        type="primary"
        icon="el-icon-check"
        @click="saveModuleInfo('editForm')"
      >保存</el-button>
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
      isDisable: false,
      labelPosition: "right",
      editForm: {
        deployModuleName: "",
        linkUrl: "",
        picUrl: "",
        createUser: localStorage.getItem("userInfo"),
      },
      localShow: this.show,
      rules: {
        deployModuleName: [
          { required: true, message: "请输入发布模块名称", trigger: "blur" },
        ],
        linkUrl: [
          { required: true, message: "请输入连接路径", trigger: "blur" },
        ],
        picUrl: [
          { required: true, message: "请输入图片路径", trigger: "blur" },
        ],
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
    saveModuleInfo(editData) {
      this.$refs[editData].validate((valid) => {
        if (this.editForm.deployModuleName == "") {
          this.$alert("发布模块名称不能为空", "提示", {
            confirmButtonText: "确定",
          });
          return false;
        }
        if (this.editForm.linkUrl == "") {
          this.$alert("连接路径不能为空", "提示", {
            confirmButtonText: "确定",
          });
          return false;
        }
        if (this.editForm.picUrl == "") {
          this.$alert("图片路径不能为空", "提示", {
            confirmButtonText: "确定",
          });
          return false;
        }
        if (valid) {
          this.isDisable = true;
          let params = {
            deployModuleEntity: this.editForm,
          };
          api
            .testAxiosGet(ApiPath.url.addDeployModule, params)
            .then((res) => {
              let code = res.state;
              if (code == "0") {
                this.reload();
                this.$message.success(res.message);
                this.loading = false;
              } else {
                this.$message.error(res.message);
              }
            })
            .catch(function (err) {
              this.isDisable = false;
            });
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
.required {
  color: red;
  margin-left: -79px;
}
</style>