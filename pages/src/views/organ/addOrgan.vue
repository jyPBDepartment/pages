<template>
  <el-dialog
    :visible.sync="localShow"
    :title="title"
    :before-close="beforeClose"
    append-to-body
    modal-append-to-body
    width="45%"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
  >
    <!-- 插槽区 -->
    <slot>
      <el-form :rules="rules" ref="editForm" :model="editForm" :label-position="labelPosition" label-width="120px">
       
        <el-form-item label="机构名称" prop="name">
          <el-input type="text" v-model="editForm.name" placeholder="请输入机构名称"  style=" width:60%;"  ></el-input>
        </el-form-item>
        <el-form-item label="上级机构编号" prop="superId">
          <el-input type="text" v-model="editForm.superId" placeholder="请输入上级机构编号"  style=" width:60%;" ></el-input>
        </el-form-item>
      
        <el-form-item label="备注" prop="context">
          <el-input type="textarea" v-model="editForm.context" placeholder="请输入备注"  style=" width:60%;" ></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="state">
          <el-input type="text" v-model="editForm.state" placeholder="请输入状态"  style=" width:60%;" ></el-input>
        </el-form-item>
      </el-form>
    </slot>
    <!-- 按钮区 -->
    <span slot="footer">
      <el-button type="danger" icon="el-icon-close" @click="close" size="medium" style="background-color:white;border-color:black;color:black;font-size:12px">关闭</el-button>
      <el-button type="success" icon="el-icon-check" @click="saveOrgan()" size="medium" style="background-color:#409EFF;border-color:#409EFF;color:white;font-size:12px">保存</el-button>
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
   
    return {
      labelPosition:'right',
       editForm:{
         name:"",
        superId:"",
        context:"",
        state:""
       } ,
      
       
       localShow: this.show,
       //rules表单验证
      rules: {
        name: [
          { required: true, message: '请输入机构名称', trigger: 'blur' }
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
        name:this.editForm.name,
        superId:this.editForm.superId,
        context:this.editForm.context,
        state:this.editForm.state
      }
        api.testAxiosGet(ApiPath.url.saveOrgan,params).then(res =>{
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
.el-form{
  padding-left: 100px;
 
}
</style>
