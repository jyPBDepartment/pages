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
      <el-form :rules="rules" ref="editForm" :model="editForm" :label-position="labelPosition" label-width="100px">
       
        <el-form-item label="姓名" prop="name">
          <el-input type="text" v-model="editForm.name"  placeholder="请输入姓名" style=" width:60%;"></el-input>
        </el-form-item>
        <el-form-item label="手机号码" prop="phone">
          <el-input type="text" v-model="editForm.phone" placeholder="请输入手机号码 " style=" width:60%;"></el-input>
        </el-form-item>
         <el-form-item label="所属机构ID" prop="organId" >
            <el-select v-model="editForm.organId" placeholder="请输入所属机构ID" style=" width:60%;">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
        
        </el-form-item>
        <el-form-item label="备注" prop="context">
          <el-input type="text" v-model="editForm.context" placeholder="请输入备注" style=" width:60%;"></el-input>
        </el-form-item>
      </el-form>
    </slot>
    <!-- 按钮区 -->
    <span slot="footer">
      <el-button type="danger" icon="el-icon-close" @click="close" size="medium" style="background-color:white;border-color:black;color:black;font-size:12px">关闭</el-button>
        <el-button type="success" icon="el-icon-check" @click="saveSales()" size="medium" style="background-color:#409EFF;border-color:#409EFF;color:white;font-size:12px">保存</el-button>
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
      labelPosition:'right',
        editForm:{
        name:"",
        phone:"",
        organId:"",
        context:"",
        },
       localShow: this.show,
       options:[
         {value:"0",label:"001"},
         {value:"1",label:"002"},
         {value:"2",label:"003"}
       ],
      // rules表单验证
      rules: {
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '建议输入11位手机号码', trigger: 'blur' }
        ],
        organId: [
          { required: true, message: '请输入所属机构ID', trigger: 'blur' }
        ],
        context: [
          { required: true, message: '请输入备注', trigger: 'blur' }
        ],
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
        name:this.editForm.name,
        phone:this.editForm.phone,
        organId:this.editForm.organId,
        context:this.editForm.context,
      };
        api.testAxiosGet(ApiPath.url.saveSales,params).then(res =>{
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
