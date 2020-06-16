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
      <el-form :rules="rules" ref="QuestionForm" :model="QuestionForm" label-width="100px">
        <el-form-item label="姓名" prop="name">
          <el-input type="text" v-model="QuestionForm.name"  placeholder="请输入姓名" style="width:70%;"></el-input>
        </el-form-item>
        <el-form-item label="职务" prop="post" >
          <el-input type="text" v-model="QuestionForm.post" placeholder="请输入职务 " style="width:70%;" show-password maxlength="16" 
         ></el-input>
        </el-form-item>
         <el-form-item label="手机号码" prop="phoneNum">
          <el-input type="text" v-model="QuestionForm.phoneNum"  placeholder="请输入手机号码" style="width:70%;"></el-input>
        </el-form-item>
         <el-form-item label="公司名称" prop="companyName">
          <el-input type="text" v-model="QuestionForm.companyName"  placeholder="请输入公司名称" style="width:70%;"></el-input>
        </el-form-item>
         <el-form-item label="邮箱" prop="email">
          <el-input type="text" v-model="QuestionForm.email"  placeholder="请输入邮箱" style="width:70%;"></el-input>
        </el-form-item>
         <el-form-item label="合作期望" prop="expectaion">
          <el-input type="textarea" v-model="QuestionForm.expectaion"  placeholder="请输入合作期望" style="width:70%;"></el-input>
        </el-form-item>
         <el-form-item label="推荐人" prop="recommended">
          <el-input type="text" v-model="QuestionForm.recommended"  placeholder="请输入推荐人" style="width:70%;"></el-input>
        </el-form-item>
        <el-form-item label="问卷答案" prop="questionAnswer">
          <el-input type="text" v-model="QuestionForm.questionAnswer"  placeholder="请输入问卷答案" style="width:70%;"></el-input>
        </el-form-item>
        <el-form-item label="问卷得分" prop="questionScore">
          <el-input type="text" v-model="QuestionForm.questionScore"  placeholder="请输入问卷得分" style="width:70%;"></el-input>
        </el-form-item>
       
         
      </el-form>
    </slot>
    <!-- 按钮区 -->
    <span slot="footer">
      <el-button type="success" icon="el-icon-check" @click="updateQuestion()" style="background-color:#409EFF;border-color:#409EFF;color:white;font-size:12px">保存</el-button>
      <el-button type="danger" icon="el-icon-close" @click="close"  size="medium" style="background-color:white;border-color:black;color:black;font-size:12px">关闭</el-button>
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
      default: false
    },
    title: {
      type: String,
      default: "对话框"
    },
    transQuestionId: {
      type: String,
      default: "对话框"
    }
  },
  data() {
    return {
      localShow: this.show,
      QuestionForm: {
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
          { required: true, message: "请输入分数", trigger: "blur" }
        ]
      }
      
    };
  },
  watch: {
    show(val) {
      this.localShow = val;
    },
    transQuestionId(val) {
      console.log(val);
      let params = {
        id: val
      };

      //根据Id查询用户信息
      api.testAxiosGet(ApiPath.url.questionFindById, params).then(res => {
        if (res.status == 0) {
          this.QuestionForm = res.data;
        }
      });
    }
  },
 
  mounted() {
    // this.findContext();
  },
  methods: {
    
    //联表查询
    // findContext: function() {
    //     let params = {
    //     roleId  :this.AdminForm.roleId
    //     };
    //     api
    //       .testAxiosGet(ApiPath.url.findAllUpdate, params)
    //       .then(res => {
    //         if (res.status == "0") {
    //           for (let i = 0; i < res.data.length; i++) {
    //             this.AdminOptions.push({
    //               value: res.data[i]["id"],
    //               label: res.data[i]["name"]
    //             });
    //           }
    //         }
    //       })
    //       .catch(function(error) {
    //       });
    // },

    //修改用户信息
    updateQuestion: function() {
      let params = {
        questionEntity: this.QuestionForm
      };

      api.testAxiosGet(ApiPath.url.updateQuestion, params).then(res => {
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
</style>