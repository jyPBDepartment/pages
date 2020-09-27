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
      <el-form :rules="rules" ref="classiForm" :model="classiForm" label-width="80px"  >
        <el-form-item label="分类名称" prop="name">
          <el-input
            type="text"
            v-model="classiForm.name"
            placeholder="请选择(限15字)"
            :maxLength="15"
             size="small"
          ></el-input>
        </el-form-item>
        <el-form-item label="分类编码" prop="code">
          <el-input
            type="text"
            v-model="classiForm.code"
            placeholder="请选择(限15字)"
            :maxLength="15"
             size="small"
          ></el-input>
        </el-form-item>
        <el-form-item label="上级分类" prop="parentCode" v-if="isShow">
          <el-select v-model="classiForm.parentCode" placeholder="请选择"  size="small">
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
        name: "",
        code: "",
        parentCode: "",
      },
      classiOptions: [],
      // rules表单验证
      rules: {
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        code: [{ required: true, message: "请输入分类编码", trigger: "blur" }],
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
            if (res.data.parentCode == "" || res.data.parentCode == "Null") {
              this.isShow = false;
            } else {
              this.isShow = true;
            }
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
                label: res.data[i]["name"],
              });
            }
          }
        })
        .catch(function (error) {});
    },
    //修改分类信息
    updateClassification: function () {
       if(this.classiForm.name  == ""){
          this.$alert("分类名称不能为空", "提示", {
            confirmButtonText: "确定",
          });
          return false;
      }
      if(this.classiForm.code  == ""){
          this.$alert("分类编码不能为空", "提示", {
            confirmButtonText: "确定",
          });
          return false;
      }
      let params = {
        classificationEntity: this.classiForm,
        parentCode: this.classiForm.parentCode,
      };
      api
        .testAxiosGet(ApiPath.url.updateClassification, params)
        .then((res) => {
          let code = res.state;
          if (code == "0") {
          this.$message.success(res.message);
          
          
          }
          this.close();
        })
        .catch((err) => {
          this.$message.error(err.data);
        });
      this.classiForm.updateUser = localStorage.getItem("userInfo");
       this.fullscreenLoading = true;
          setTimeout(() => {
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
  padding-left: 35px;
  margin: -20px 0px;
}
.el-button {
  border: none;
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