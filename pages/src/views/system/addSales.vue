<template>
  <el-dialog
    :visible.sync="localShow"
    :title="title"
    :before-close="beforeClose"
    append-to-body
    modal-append-to-body
    width="60%"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
  >
    <!-- 插槽区 -->
    <slot>
      <el-form :rules="rules">
       
        <el-form-item label="姓名" prop="name">
          <el-input type="text" v-model="name"  placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="手机号码" prop="phone">
          <el-input type="text" v-model="phone" placeholder="请输入手机号码"></el-input>
        </el-form-item>
         <el-form-item label="所属机构ID" prop="organId">
          <el-input type="text" v-model="organId" placeholder="请输入所属机构ID"></el-input>
        </el-form-item>
       
        <el-form-item label="备注" prop="context">
          <el-input type="text" v-model="context" placeholder="请输入备注"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="state">
          <el-input type="text" v-model="state" placeholder="请输入状态"></el-input>
        </el-form-item>
       
        
      </el-form>
    </slot>
    <!-- 按钮区 -->
    <span slot="footer">
      <el-button type="success" icon="el-icon-check" @click="saveSales()" size="medium" style="background-color:#409EFF;border-color:#409EFF;color:white;font-size:12px">保存</el-button>
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
  inject:['reload'],
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
    // data: this.data;
    return {
        
        name:"",
        phone:"",
        organId:"",
        
        context:"",
        state:"",
       
       localShow: this.show,
            // rules表单验证
      rules: {
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' }
        ],
        organId: [
          { required: true, message: '请输入所属机构ID', trigger: 'blur' }
        ],
        context: [
          { required: true, message: '请输入备注', trigger: 'blur' }
        ],
        state: [
          { required: true, message: '请输入状态', trigger: 'blur' }
        ]
      },

    };
  },
  watch: {
    show(val) {
      this.localShow = val;
    }
  },
  methods: {
    beforeClose() {
      this.close();
    },

    close() {
      this.$emit("close");
    },

    saveSales: function() {
      let params = {
          name:this.name,
        phone:this.phone,
        organId:this.organId,
        
        context:this.context,
        state:this.state
      };
           if(this.name ==""){
         this.$confirm("姓名不能为空！", "添加", {
          confirmButtonText: "确定",
        
          type: "warning"
        });
      }else if(this.phone ==""){
         this.$confirm("手机号码不能为空！", "添加", {
          confirmButtonText: "确定",
        
          type: "warning"
});
      }else if(this.organId ==""){
         this.$confirm("所属机构ID不能为空！", "添加", {
          confirmButtonText: "确定",
        
          type: "warning"
});
      }else if(this.context ==""){
         this.$confirm("备注不能为空！", "添加", {
          confirmButtonText: "确定",
        
          type: "warning"
});
      }else if(this.state ==""){
         this.$confirm("状态不能为空！", "添加", {
          confirmButtonText: "确定",
        
          type: "warning"
});
      }else{
            api.testAxiosGet(ApiPath.url.saveSales,params).then(res =>{
      //  alert(res.message);
        this.$message.success(res.message);
        this.reload();
        this.close();
      });
       
      }
   
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

</style>
