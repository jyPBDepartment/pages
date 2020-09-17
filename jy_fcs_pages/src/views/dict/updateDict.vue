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
      <el-form :rules="rules" ref="classiForm" :model="classiForm" label-width="100px" style="margin-left:-100px">
        <el-form-item label="字典名称" prop="dictName">
          <el-input
            size="small"
            type="text"
            v-model="classiForm.dictName"
            placeholder="请输入字典名称（不超过15个字符）"
            :maxLength="15"
            style=" width:90%;"
          ></el-input>
        </el-form-item>
        <el-form-item label="字典编码" prop="dictType">
          <el-input
            size="small"
            type="text"
            v-model="classiForm.dictType"
            placeholder="请输入字典编码（不超过15个字符）"
            :maxLength="15"
            style="width:90%;"
          ></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input
            size="small"
            type="text"
            v-model="classiForm.remark"
            placeholder="请输入字典简述（不超过20个字符）"
            style="width:90%;"
            :maxLength="20"
          ></el-input>
        </el-form-item>
      </el-form>
    </slot>
    <!-- 按钮区 -->
    <span slot="footer">
      <el-button
        type="primary"
        icon="el-icon-check"
        @click="updateClassification()"
        size="medium"
        v-loading.fullscreen.lock="fullscreenLoading"
      >保存</el-button>
      <el-button type="info" icon="el-icon-close" @click="close" size="medium">关闭</el-button>
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
    transClassificationId: {
      type: String,
      default: "对话框",
    },
  },
  data() {
    return {
      fullscreenLoading: false,
      isShow: true,
      localShow: this.show,
      classiForm: {
        dictName: "",
        dictType: "",
        remark: "",
      },
      // rules表单验证
      rules: {
        dictName: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        dictType: [{ required: true, message: "请输入分类编码", trigger: "blur" }],
      },
    };
  },
  watch: {
    show(val) {
      this.localShow = val;
    },
    //根据Id查询用户信息
    transClassificationId(val) {
      let params = {
        id: val,
      };
      api
        .testAxiosGet(ApiPath.url.findDictTypeById, params)
        .then((res) => {
          if (res.state == 0) {
            this.classiForm = res.data;
          }
        });
    },
  },
  mounted() {},
  methods: {
    //修改分类信息
    updateClassification: function () {
       if (this.classiForm.dictName == "") {
          this.$alert("字典名称不能为空！", "提示", {
            confirmButtonText: "确定",
          });
          return false;
        }
        if (this.classiForm.dictType == "") {
          this.$alert("字典编码不能为空！", "提示", {
            confirmButtonText: "确定",
          });
          return false;
        }
      let params = {
        typeEntity: this.classiForm,
      };
      api
        .testAxiosGet(ApiPath.url.updateDictType, params)
        .then((res) => {
          let code = res.state;
          this.$message.success(res.message);
          this.close();
        })
        .catch((err) => {
          this.$message.error(err.data);
        });
        this.fullscreenLoading = true;
        setTimeout(() => {
          this.fullscreenLoading = false;
        }, 500);
      this.classiForm.updateUser = localStorage.getItem("userInfo");
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
  padding-left: 115px;
}
.el-button {
  border: none;
}
</style>