<template>
  <el-dialog
    :visible.sync="localShow"
    :title="title"
    :before-close="beforeClose"
    append-to-body
    modal-append-to-body
    width="40%"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
  >
    <!-- 插槽区 -->
    <slot>
      <el-form
        :rules="rules"
        ref="editForm"
        :model="editForm"
        :label-position="labelPosition"
        label-width="100px"
      >
        <el-form-item label="字典名称" prop="dictName">
          <el-input
            type="text"
            v-model="editForm.dictName"
            placeholder="请输入字典名称（不超过15个字符）"
            style="width:70%;"
            :maxLength="15"
          ></el-input>
        </el-form-item>
        <el-form-item label="字典编码" prop="dictType">
          <el-input
            type="text"
            v-model="editForm.dictType"
            placeholder="请输入分类编码（不超过15个字符）"
            style="width:70%;"
            :maxLength="15"
          ></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input
            type="text"
            v-model="editForm.remark"
            placeholder="请输入字典简述（不超过20个字符）"
            style="width:70%;"
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
        @click="saveDictType()"
        size="medium"
        :disabled="isDisable"
      >保存</el-button>
      <el-button type="info" icon="el-icon-close" @click="close" size="medium">关闭</el-button>
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
        dictName: "",
        dictType: "",
        remark: "",
        createBy: localStorage.getItem("userInfo"),
      },
      localShow: this.show,
      // rules表单验证
      rules: {
        dictName: [{ required: true, message: "请输入字典名称", trigger: "blur" }],
        dictType: [{ required: true, message: "请输入字典编码", trigger: "blur" }],
      },
    };
  },
  watch: {
    show(val) {
      this.localShow = val;
    },
  },
  methods: {

    //添加字典方法
    saveDictType: function () {
     
      if (this.editForm.dictName != "" && this.editForm.dictType != "") {
         this.isDisable = true;
        let params = {
          typeEntity: this.editForm,
        };
        api
          .testAxiosGet(ApiPath.url.saveDictType, params)
          .then((res) => {
            this.$message.success(res.message);
            this.reload();
            this.close();
          })
          .catch(function (err) {
            this.isDisable = false;
          });
      } else {
        this.$alert("字典名称，字典编码不能为空！", "提示", {
          confirmButtonText: "确定",
        });
      }
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
.input {
  float: left;
  font-size: 12px;
  width: 150px;
  font-family: arial;
  padding: 3px;
  border: 1px solid black;
}

.input.error {
  border: 1px solid red;
}

#tips {
  float: left;
  margin: 2px 0 0 20px;
}

#tips span {
  float: left;
  width: 50px;
  height: 20px;
  color: white;
  background: green;
  margin-right: 2px;
  line-height: 20px;
  text-align: center;
}
</style>
