<template>
  <el-dialog
    :visible.sync="localShow"
    :title="title"
    :before-close="beforeClose"
    append-to-body
    modal-append-to-body
    width="30%"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
  >
    <!-- 插槽区 -->
    <slot>
      <el-form :model="accountInfoForm" :rules="rules" ref="accountInfoForm" :label-position="labelPosition">
        <el-form-item label="账户名称" prop="name">
          <el-input type="text" v-model="accountInfoForm.name" size="small" placeholder="请输入账户名称" style="width:80%" ></el-input>
        </el-form-item>
        <el-form-item label="手机号码" prop="phone">
          <el-input type="text" v-model="accountInfoForm.phone" size="small" placeholder="请输入手机号码" style="width:80%" @change="telPhone"></el-input>
        </el-form-item>
        <el-form-item label="权限名称" prop="jurId">
          <el-select v-model="accountInfoForm.jurId" style="width:80%" size="small">
            <el-option
              v-for="item in jurIdOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </slot>
    <!-- 按钮区 -->
    <span slot="footer">
      <el-button type="primary" icon="el-icon-check" @click="updateAccountInfo">保存</el-button>
      <el-button icon="el-icon-close" @click="close">关闭</el-button>
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
    transAccountInfoId: {
      type: String
    }
  },
  data() {
    
    return {
      labelPosition: "right",
      accountInfoForm: {
        name: "",
        id:"",
        phone:"",
        jurId:"",
        updateUser:"",
      },
      jurIdOptions: [],
      localShow: this.show,
      rules: {
        name: [{ required: true, message: "请输入名称", trigger: "blur" }],
        phone: [{ required: true, message: "请输入手机号码", trigger: "blur" }],
        jurId: [{ required: true, message: "请选择权限", trigger: "blur" }]
      }
    };
  },
  watch: {
    show(val) {
      this.localShow = val;
    },
    transAccountInfoId(val) {
      let params = {
        id: val
      };
      //根据Id查询用户信息
      api.testAxiosGet(ApiPath.url.findAccountInfoId, params).then(res => {
        this.accountInfoForm = res.data;
      });
    }
  },
   mounted() {
     let params = {
        jurId: this.accountInfoForm.jurId,
        // id:this.editForm.id 
    };
      api.testAxiosGet(ApiPath.url.findCount, params).then(res => {
        let code = res.status;
        if (code=="0") {
         for(let i=0;i<res.data.length;i++){
           this.jurIdOptions.push({value:res.data[i]["id"],label:res.data[i]["jurName"]});
         }  
        }
        
      });
  },
  methods: {
      telPhone: function() {
      if (!/^1[345789]\d{9}$/.test(this.accountInfoForm.phone)) {
        this.$alert("请输入正确的手机号！", "提示", {
          confirmButtonText: "确定"
        });
        this.accountInfoForm.phone = "";
      }
    },
    updateAccountInfo: function() {
      let params = {
        accountInfoEntity: this.accountInfoForm
      };
      //修改用户信息
      api.testAxiosGet(ApiPath.url.updateAccountInfo, params).then(res => {
        let code = res.status;
          if(code == "0") {
            this.$message.success(res.message);
            this.close();
            this.reload();
          }
      });
      this.accountInfoForm.updateUser =localStorage.getItem("userInfo");
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
  padding-left: 100px;
}
.el-button{
  border: none;
}
</style>