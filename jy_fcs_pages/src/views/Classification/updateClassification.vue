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
      <el-form :rules="rules" ref="classiForm" :model="classiForm" label-width="100px">
        <el-form-item label="分类名称" prop="name">
          <el-input type="text" v-model="classiForm.name" placeholder="请输入分类名称" style=" width:70%;"></el-input>
        </el-form-item>
        <el-form-item label="分类编码" prop="code">
          <el-input type="text" v-model="classiForm.code" placeholder="请输入分类编码" style="width:70%;"></el-input>
        </el-form-item>
        <el-form-item label="上级分类编码" prop="parentCode">
          <el-select v-model="classiForm.parentCode" placeholder="请输入上级分类编码" style="width:70%;">
            <el-option
              v-for="item in classiOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-input type="text" v-model="classiForm.status" placeholder="请输入状态" style=" width:70%;"></el-input>
        </el-form-item>
      </el-form>
    </slot>
    <!-- 按钮区 -->
    <span slot="footer">
      <el-button
        type="success"
        icon="el-icon-check"
        @click="updateClassification()"
        style="background-color:#409EFF;border-color:#409EFF;color:white;font-size:12px;width:105px;height:42px;"
      >保存</el-button>
      <el-button
        type="danger"
        icon="el-icon-close"
        @click="close"
        size="medium"
        style="background-color:white;border-color:black;color:black;font-size:12px;width:105px;height:42px;"
      >关闭</el-button>
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
      localShow: this.show,
      classiForm: {
        name: "",
        code: "",
        parentCode: "",
        status: "",
      },
      classiOptions: [],
      // rules表单验证
      rules: {
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        code: [{ required: true, message: "请输入分类编码", trigger: "blur" }],
        status: [{ required: true, message: "请输入状态", trigger: "blur" }],
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
        .testAxiosGet(ApiPath.url.classificationFindById, params)
        .then((res) => {
          if (res.state == 0) {
            this.classiForm = res.data;
          }
        });
    },
  },
  mounted() {
    this.findContext();
  },
  methods: {
    //联表查询
    findContext: function () {
      let params = {};
      api
        .testAxiosGet(ApiPath.url.updateClass, params)
        .then((res) => {
          if (res.state == "0") {
            for (let i = 0; i < res.data.length; i++) {
              this.classiOptions.push({
                value: res.data[i]["id"],
                label: res.data[i]["code"],
              });
            }
          }
        })
        .catch(function (error) {});
    },
    //修改分类信息
    updateClassification: function () {
      let params = {
        classificationEntity: this.classiForm,
      };
      api
        .testAxiosGet(ApiPath.url.updateClassification, params)
        .then((res) => {
          this.$message.success(res.message);
          this.reload();
          this.close();
        })
        .catch((err) => {
          this.$message.error(err.data);
        });
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