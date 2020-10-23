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
      <el-form :model="editForm" :rules="rules" ref="editForm" :label-position="labelPosition" label-width="100px" style="margin-left:-85px">
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
        <el-form-item label="描述" prop="description">
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
      <el-button type="primary" icon="el-icon-check" @click="saveEduVocationInfo('editForm')" v-loading.fullscreen.lock="fullscreenLoading">保存</el-button>
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
        vocationCode:"",
        description: "",
        createBy: localStorage.getItem("userInfo"),
      },
      localShow: this.show,
      rules: {
        vocationCode:[{required: true, message: "请输入职业编码", trigger: "blur"},],
        name: [{ required: true, message: "请输入职业类别名称", trigger: "blur" },],
        description: [{ required: true, message: "请输入描述", trigger: "blur" },],
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
    saveEduVocationInfo(editData) {
      this.$refs[editData].validate((valid) => {
        if(this.editForm.vocationCode == ""){
          this.$alert("职业编码不能为空", "提示", {
            confirmButtonText: "确定",
          });
          return false;
        }
        if (this.editForm.name == "") {
          this.$alert("职业类别名称不能为空", "提示", {
            confirmButtonText: "确定",
          });
          return false;
        }
        if (this.editForm.description == "") {
          this.$alert("描述不能为空", "提示", {
            confirmButtonText: "确定",
          });
          return false;
        }
        
        if (valid) {
            let params = {
              eduVocationInfoEntity: this.editForm,
            };
            api
              .testAxiosGet(ApiPath.url.addEduVocationInfo, params)
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
                this.editForm.vocationCode="";
                this.editForm.name="";
                this.editForm.description="";
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
.required {
  color: red;
  margin-left: -79px;
}
</style>