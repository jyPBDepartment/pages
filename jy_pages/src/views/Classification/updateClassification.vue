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
        <el-form-item label="下级分类" prop="subId" >
          <el-select type="text" v-model="classiForm.subId" placeholder="请输入下级分类" style=" width:70%;" >
            <el-option
              v-for="item in classiOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
       
        <el-form-item label="分类描述" prop="classDescribe" >
          <el-input
            type="textarea"
            v-model="classiForm.classDescribe"
            placeholder="请输入分类描述"
            style=" width:70%;"
            :autosize="{ minRows: 1, maxRows: 4}"
          ></el-input>
        </el-form-item>
          <el-form-item label="状态" prop="status">
          <el-input type="text" v-model="classiForm.status" placeholder="请输入状态" style=" width:70%;"></el-input>
        </el-form-item>
         
      </el-form>
    </slot>
    <!-- 按钮区 -->
    <span slot="footer">
      <el-button type="success" icon="el-icon-check" @click="updateClassification()" style="background-color:#409EFF;border-color:#409EFF;color:white;font-size:12px">保存</el-button>
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
    transClassificationId: {
      type: String,
      default: "对话框"
    }
  },
  data() {
    return {
      localShow: this.show,
     classiForm: {
        
        name: "",
        subId: "",
        status: "",
        classDescribe:""
      },
     
     classiOptions:[],
      // rules表单验证
      rules: {
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
         subId: [
        { required: true, message: "请输入上级分类", trigger: "blur" },
        
        ],
        status: [{ required: true, message: "请输入状态", trigger: "blur" }],
        classDescribe:[{ required: true, message: "请输入分类描述", trigger: "blur" }],
      }
    };
  },
  watch: {
    show(val) {
      this.localShow = val;
    },
    transClassificationId(val) {
     
      let params = {
        id: val
      };

      //根据Id查询用户信息
      api.testAxiosGet(ApiPath.url.classificationFindById, params).then(res => {
        if (res.state == 0) {
          this.classiForm = res.data;
        }
      });
    }
  },
 
  mounted() {
    this.findContext();
  },
  methods: {
    
    //联表查询
    findContext: function() {
        let params = {
        subId :this.classiForm.subId
        };
        api
          .testAxiosGet(ApiPath.url.updateClass, params)
          .then(res => {
            if (res.status == "0") {
              for (let i = 0; i < res.data.length; i++) {
                this.classiOptions.push({
                  value: res.data[i]["id"],
                  label: res.data[i]["name"]
                });
              }
            }
          })
          .catch(function(error) {
          });
    },

    //修改分类信息
    updateClassification: function() {
      let params = {
        classificationEntity: this.classiForm
      };

      api.testAxiosGet(ApiPath.url.updateClassification, params).then(res => {
        this.$message.success(res.message);
        this.reload();
        this.close();
      }) .catch(err => {
                this.$message.error(err.data);
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