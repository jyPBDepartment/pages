<template>
  <el-dialog
    :visible.sync="localShow"
    :title="title"
    :before-close="beforeClose"
    append-to-body
    modal-append-to-body
    width="400px"
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
         <el-form-item label="分类名称" prop="name">
          <el-input
            type="text"
            v-model="editForm.name"
            placeholder="请选择(限15字)"
            
            :maxLength="15"
            size="small"
          ></el-input>
        </el-form-item>
        <el-form-item label="分类编码" prop="code">
          <el-input
            type="text"
            v-model="editForm.code"
            placeholder="请选择(限15字)"
            :maxLength="15"
            size="small"
          ></el-input>
        </el-form-item>
        <el-form-item label="上级分类" prop="parentCode">
          <el-select v-model="editForm.parentCode" placeholder="请选择" size="small">
            <el-option
              v-for="item in classiOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              class="option"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </slot>
    <!-- 按钮区 -->
    <span slot="footer">
      <el-button
        type="primary"
        icon="el-icon-check"
        @click="saveClassification()"
        size="medium"
         v-loading.fullscreen.lock="fullscreenLoading"
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
     fullscreenLoading: false,
      labelPosition: "right",
      editForm: {
         name: "",
        code: "",
        parentCode: "",


        createUser: localStorage.getItem("userInfo"),
      },
      classiOptions: [],
      localShow: this.show,
      // rules表单验证
      rules: {
        name: [{ required: true, message: "请输入分类名称", trigger: "blur" }],
        code: [{ required: true, message: "请输入分类编码", trigger: "blur" }],
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
    //下拉列表显示
    findContext: function () {
      let params = {};
      api
        .testAxiosGet(ApiPath.url.findAllClass, params)
        .then((res) => {
          if (res.state == "0") {
            // this.powerOptions.push({ value: "", label: "请选择" });
            for (let i = 0; i < res.data.length; i++) {
              this.classiOptions.push({
                value: res.data[i]["id"],
                label: res.data[i]["name"],
              });
            }
          }
        })
        .catch(function (error) {});
    },

    //添加权限方法
    saveClassification: function () {
       if(this.editForm.name  == ""){
          this.$alert("分类名称不能为空", "提示", {
            confirmButtonText: "确定",
          });
          return false;
      }
      if(this.editForm.code  == ""){
          this.$alert("分类编码不能为空", "提示", {
            confirmButtonText: "确定",
          });
          return false;
      }
        let params = {
         classificationEntity: this.editForm,
        };
        api
          .testAxiosGet(ApiPath.url.saveClassification, params)
          .then((res) => {
            this.$message.success(res.message);
           
            this.close();
          })
          .catch(function (err) {
            // this.isDisable = false;
          });
          this.fullscreenLoading = true;
          setTimeout(() => {
            this.editForm.name="";
            this.editForm.code="";
            this.editForm.parentCode="";
            this.fullscreenLoading = false;

        }, 500);
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
  padding-left: 13px;
  margin: -20px 0px;
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
.option{
  text-align: center;
}
.el-input{
  width: 200px;
}
.el-select{
  width: 200px;
}
</style>
