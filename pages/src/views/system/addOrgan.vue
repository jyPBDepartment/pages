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
       
        <el-form-item label="机构名称" prop="name">
          <el-input type="text" v-model="name" placeholder="请输入机构名称"></el-input>
        </el-form-item>
        <el-form-item label="上级机构编号" prop="superId">
          <el-input type="text" v-model="superId" placeholder="请输入上级机构编号"></el-input>
        </el-form-item>
         <el-form-item label="机构等级" prop="organLevel">
          <el-input type="text" v-model="organLevel" placeholder="请输入机构等级"></el-input>
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
      <el-button type="success" icon="el-icon-check" @click="saveOrgan()" size="medium" style="background-color:#409EFF;border-color:#409EFF;color:white;font-size:12px">保存</el-button>
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
        superId:"",
        organLevel:"",
       
        context:"",
        state:"",
       
       localShow: this.show,
       // rules表单验证
      rules: {
        name: [
          { required: true, message: '请输入机构名称', trigger: 'blur' }
        ],
        superId: [
          { required: true, message: '请输入上级机构编号', trigger: 'blur' }
        ],
        organLevel: [
          { required: true, message: '请输入机构等级', trigger: 'blur' }
        ],
        superId: [
          { required: true, message: '请输入上级机构编号', trigger: 'blur' }
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

    saveOrgan: function() {
      let params = {
          name:this.name,
        superId:this.superId,
        organLevel:this.organLevel,
     
        context:this.context,
        state:this.state
      };
      if(this.name ==""){
         this.$confirm("机构名称不能为空！", "添加", {
          confirmButtonText: "确定",
        
          type: "warning"
        });
      }else if(this.superId ==""){
         this.$confirm("上级机构编号不能为空！", "添加", {
          confirmButtonText: "确定",
        
          type: "warning"
});
      }else if(this.organLevel ==""){
         this.$confirm("机构等级不能为空！", "添加", {
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
          api.testAxiosGet(ApiPath.url.saveOrgan,params).then(res =>{
      
        this.$message.success(res.message);
        this.close();
      });
        location.reload();
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
