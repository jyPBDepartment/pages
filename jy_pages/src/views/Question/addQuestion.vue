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
      <el-form :rules="rules" ref="editForm" :model="editForm" :label-position="labelPosition" label-width="100px">
        <el-form-item label="姓名" prop="name">
          <el-input type="text" v-model="editForm.name"  placeholder="请输入姓名" style="width:70%;"></el-input>
        </el-form-item>
        <el-form-item label="职务" prop="post" >
          <el-input type="text" v-model="editForm.post" placeholder="请输入职务 " style="width:70%;" 
         ></el-input>
        </el-form-item>
         <el-form-item label="手机号码" prop="phoneNum">
          <el-input type="text" v-model="editForm.phoneNum"  placeholder="请输入手机号码" style="width:70%;"></el-input>
        </el-form-item>
         <el-form-item label="公司名称" prop="companyName">
          <el-input type="text" v-model="editForm.companyName"  placeholder="请输入公司名称" style="width:70%;"></el-input>
        </el-form-item>
         <el-form-item label="邮箱" prop="email">
          <el-input type="text" v-model="editForm.email"  placeholder="请输入邮箱" style="width:70%;"></el-input>
        </el-form-item>
         <el-form-item label="合作期望" prop="expectaion">
          <el-input type="textarea" v-model="editForm.expectaion"  placeholder="请输入合作期望" style="width:70%;"></el-input>
        </el-form-item>
         <el-form-item label="推荐人" prop="recommended">
          <el-input type="text" v-model="editForm.recommended"  placeholder="请输入推荐人" style="width:70%;"></el-input>
        </el-form-item>
         <el-form-item label="问卷得分" prop="questionAnswer">
          <el-input type="text" v-model="editForm.questionAnswer"  placeholder="请输入问卷答案" style="width:70%;"></el-input>
        </el-form-item>
        <el-form-item label="问卷得分" prop="questionScore">
          <el-input type="text" v-model="editForm.questionScore"  placeholder="请输入问卷得分" style="width:70%;"></el-input>
        </el-form-item>
      </el-form>
    </slot>
    <!-- 按钮区 -->
    <span slot="footer">
        <el-button type="success" icon="el-icon-check" @click="saveQuestion()" size="medium" style="background-color:#409EFF;border-color:#409EFF;color:white;font-size:12px">保存</el-button>
         <el-button type="danger" icon="el-icon-close" @click="close" size="medium" style="background-color:white;border-color:black;color:black;font-size:12px">关闭</el-button>
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
      default: false
    },
    title: {
      type: String,
      default: "对话框"
    }
  },
  data() {
    return {
      labelPosition: "right",
      editForm: {
        name: "",
        post: "",
        phoneNum: "",
        companyName: "",
        email: "",
        expectaion: "",
        recommended: "",
        questionAnswer:"",
        questionScore: ""
      },

      localShow: this.show,

      // rules表单验证
   rules: {
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        post: [{ required: true, message: "请输入您的职务", trigger: "blur" }],
        phoneNum: [
          { required: true, message: "请输入手机号码", trigger: "blur" }
        ],
        companyName: [
          { required: true, message: "请输入公司名称", trigger: "blur" }
        ],
        email: [{ required: true, message: "请输入邮箱", trigger: "blur" }],
        expectaion: [
          { required: true, message: "请输入合作期望", trigger: "blur" }
        ],
        recommended: [
          { required: true, message: "请输入推荐人", trigger: "blur" }
        ],
        questionScore: [
          { required: true, message: "请输入手机号码", trigger: "blur" }
        ]
      }
    };
  },
  watch: {
    show(val) {
      this.localShow = val;
    }
  },
  created() {},
  mounted() {
   
  },
  methods: {
    

    //添加管理员方法
    saveQuestion: function() {
      let params = {
        questionEntity: this.editForm
      };
      api.testAxiosGet(ApiPath.url.saveQuestion, params).then(res => {
        this.$message.success(res.message);
        this.reload();
        this.close();
      });
    },
    close: function() {
      this.$emit("close");
    },
    beforeClose: function() {
      this.close();
    }
  }
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
