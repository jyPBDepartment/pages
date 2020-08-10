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
        :model="editForm"
        :rules="rules"
        ref="editForm"
        :label-position="labelPosition"
        label-width="100px"
      >
        <el-form-item label="关键词名称" prop="name">
          <el-input
            type="text"
            v-model="editForm.name"
            size="small"
            placeholder="请输入关键词名称(不能超过16个字符)"
            style="width:80%"
            maxlength="16"
          ></el-input>
        </el-form-item>
        <el-form-item label="关键词编码" prop="code">
          <el-input
            type="text"
            v-model="editForm.code"
            size="small"
            placeholder="请输入关键词编码(不能超过16个字符)"
            style="width:80%"
            maxlength="16"
          ></el-input>
        </el-form-item>
        <el-form-item label="分类编码" prop="parentCode">
          <el-select v-model="editForm.parentCode" style="width:80%" size="small">
            <el-option
              v-for="item in parentCodedOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </slot>

    <!-- 按钮区 -->
    <span slot="footer">
      <el-button :disabled="isDisable" type="primary" icon="el-icon-check" @click="saveKeyWord()">保存</el-button>
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
        name: "",
        id: "",
        code: "",
        parentCode: "",
        createUser: localStorage.getItem("userInfo"),
      },
      parentCodedOptions: [],
      localShow: this.show,
      rules: {
        name: [{ required: true, message: "请输入名称", trigger: "blur" }],
        code: [{ required: true, message: "请输入编码", trigger: "blur" }],
        parentCode: [
          { required: true, message: "请输入分类编码", trigger: "blur" },
        ],
      },
    };
  },
  watch: {
    show(val) {
      this.localShow = val;
    },
  },
  mounted() {
    this.findContext();
  },
  methods: {
    findContext: function () {
      let params = {};
      api
        .testAxiosGet(ApiPath.url.findKeyWordList, params)
        .then((res) => {
          if (res.state == "0") {
            this.parentCodedOptions.push({ value: "", label: "请选择" });
            for (let i = 0; i < res.data.length; i++) {
              this.parentCodedOptions.push({
                value: res.data[i]["id"],
                label: res.data[i]["code"],
              });
            }
          }
        })
        .catch(function (error) {});
    },
    beforeClose() {
      this.close();
    },
    close() {
      this.$emit("close");
    },
    //新增保存
    saveKeyWord: function () {
      if (this.editForm.name == "") {
        this.$alert("名称不能为空", "提示", { confirmButtonText: "确定" });
        return false;
      }

      if (this.editForm.code == "") {
        this.$alert("关键词编码不能为空", "提示", {
          confirmButtonText: "确定",
        });
        return false;
      }

      if (this.editForm.parentCode == "") {
        this.$alert("分类编码不能为空", "提示", { confirmButtonText: "确定" });
        return false;
      }
      this.isDisable = true;
      let params = {
        keyWordEntity: this.editForm,
      };
      api
        .testAxiosGet(ApiPath.url.addKeyWord, params)
        .then((res) => {
          let code = res.status;
          if (code == "0") {
            this.$message.success(res.message);
            this.close();
            this.reload();
          }
        })
        .catch(function (err) {
          this.isDisable = false;
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