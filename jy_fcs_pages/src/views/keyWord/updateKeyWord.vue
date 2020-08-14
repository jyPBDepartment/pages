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
        :model="keyWordForm"
        :rules="rules"
        ref="keyWordForm"
        :label-position="labelPosition"
        label-width="100px"
      >
        <el-form-item label="关键字名称" prop="name">
          <el-input
            type="text"
            v-model="keyWordForm.name"
            size="small"
            placeholder="请输入关键字名称(不能超过16个字符)"
            style="width:80%"
            maxlength="16"
          ></el-input>
        </el-form-item>
        <el-form-item label="关键字编码" prop="code">
          <el-input
            type="text"
            v-model="keyWordForm.code"
            size="small"
            placeholder="请输入关键字编码(不能超过16个字符)"
            style="width:80%"
            maxlength="16"
          ></el-input>
        </el-form-item>
        <el-form-item label="分类" prop="parentCode">
          <el-select v-model="keyWordForm.parentCode" style="width:80%" size="small">
            <el-option
              v-for="item in parentCodeOptions"
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
      <el-button :disabled="isDisable" type="primary" icon="el-icon-check" @click="updateKeyWord">保存</el-button>
      <el-button type="info" icon="el-icon-close" @click="close">关闭</el-button>
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
    transKeyWordId: {
      type: String,
    },
  },
  data() {
    return {
      isDisable: false,
      labelPosition: "right",
      keyWordForm: {
        name: "",
        id: "",
        code: "",
        parentCode: "",
        updateUser: "",
      },
      parentCodeOptions: [],
      localShow: this.show,
      rules: {
        name: [{ required: true, message: "请输入名称", trigger: "blur" }],
        code: [
          { required: true, message: "请输入关键字编码", trigger: "blur" },
        ],
        parentCode: [
          { required: true, message: "请选择分类编码", trigger: "blur" },
        ],
      },
    };
  },
  watch: {
    show(val) {
      this.localShow = val;
    },
    transKeyWordId(val) {
      let params = {
        id: val,
      };
      //根据Id查询用户信息
      api.testAxiosGet(ApiPath.url.findKeyWordId, params).then((res) => {
        this.keyWordForm = res.data;
      });
    },
  },
  mounted() {
    this.findContext();
  },
  methods: {
    findContext: function () {
      let params = {};
      api
        .testAxiosGet(ApiPath.url.findClassKey, params)
        .then((res) => {
          if (res.state == "0") {
            this.parentCodeOptions.push({ value: "", label: "请选择" });
            for (let i = 0; i < res.data.length; i++) {
              this.parentCodeOptions.push({
                value: res.data[i]["id"],
                label: res.data[i]["name"],
              });
            }
          }
        })
        .catch(function (error) {});
    },
    updateKeyWord: function () {
      if (this.keyWordForm.name == "") {
        this.$alert("名称不能为空", "提示", { confirmButtonText: "确定" });
        return false;
      }

      if (this.keyWordForm.code == "") {
        this.$alert("关键词编码不能为空", "提示", {
          confirmButtonText: "确定",
        });
        return false;
      }

      if (this.keyWordForm.parentCode == "") {
        this.$alert("分类编码不能为空", "提示", { confirmButtonText: "确定" });
        return false;
      }
      this.isDisable = true;
      let params = {
        keyWordEntity: this.keyWordForm,
      };
      //修改用户信息
      api
        .testAxiosGet(ApiPath.url.updateKeyWord, params)
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
      this.keyWordForm.updateUser = localStorage.getItem("userInfo");
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
.el-button {
  border: none;
}
</style>