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
      <el-form :rules="rules" ref="powerInfoForm" :model="powerInfoForm" label-width="100px">
        <el-form-item label="权限名称" prop="jurName">
          <el-input type="text" v-model="powerInfoForm.jurName" placeholder="请输入权限名称" style=" width:70%;"></el-input>
        </el-form-item>
        <el-form-item label="权限编码" prop="jurCode" >
           <el-input type="text" v-model="powerInfoForm.jurCode" placeholder="请输入权限编码" style=" width:70%;"></el-input>
        </el-form-item>
      
         <el-form-item label="上级权限编码" prop="subJurCode" >
          <el-select type="text" v-model="powerInfoForm.subJurCode" placeholder="请输入上级权限编码" style=" width:70%;" >
            <el-option
              v-for="item in powerOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
          <el-form-item label="状态" prop="auditStatus">
          <el-input type="text" v-model="powerInfoForm.auditStatus" placeholder="请输入状态" style=" width:70%;"></el-input>
        </el-form-item>
         
      </el-form>
    </slot>
    <!-- 按钮区 -->
    <span slot="footer">
      <el-button type="success" icon="el-icon-check" @click="updatePowerInfo()" style="background-color:#409EFF;border-color:#409EFF;color:white;font-size:12px;width:105px;height:42px;">保存</el-button>
      <el-button type="danger" icon="el-icon-close" @click="close"  size="medium" style="background-color:white;border-color:black;color:black;font-size:12px;width:105px;height:42px;">关闭</el-button>
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
    transPowerInfoId: {
      type: String,
      default: "对话框"
    }
  },
  data() {
    return {
      localShow: this.show,
     powerInfoForm: {
        
        jurName:"",
        jurCode:"",
        subJurCode:"",
        auditStatus:"",
        
      },
     
     powerOptions:[],
      // rules表单验证
      rules: {
       jurName: [{ required: true, message: "请输入权限名称", trigger: "blur" }],
        jurCode: [
          { required: true, message: "请输入权限编码", trigger: "blur" },
        ],
        auditStatus:[{required: true, message: "请输入状态", trigger: "blur"}]
      }
    };
  },
  watch: {
    show(val) {
      this.localShow = val;
    },
    transPowerInfoId(val) {
     
      let params = {
        id: val
      };

      //根据Id查询用户信息
      api.testAxiosGet(ApiPath.url.powerInfoFindById, params).then(res => {
        if (res.status == 0) {
          this.powerInfoForm = res.data;
        }
      });
    }
  },
 
  mounted() {
     this.findContext();
  },
  methods: {
    //下拉列表显示
    findContext: function() {
        let params = {
        subJurCode :this.powerInfoForm.subJurCode
        };
        api
          .testAxiosGet(ApiPath.url.updatePower, params)
          .then(res => {
            if (res.status == "0") {
              for (let i = 0; i < res.data.length; i++) {
                this.powerOptions.push({
                  value: res.data[i]["id"],
                  label: res.data[i]["jurCode"]
                });
              }
            }
          })
          .catch(function(error) {
          });
    },

    //修改权限信息
    updatePowerInfo: function() {
      let params = {
        powerInfoEntity: this.powerInfoForm
      };

      api.testAxiosGet(ApiPath.url.updatePowerInfo, params).then(res => {
       
       
       this.$message.success(res.message);
        
        this.reload();
        
        this.close();
       
          
      }) .catch(err => {
                this.$message.error(err.data);
              });
             this.powerInfoForm.updateUser=localStorage.getItem("userInfo")
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
.el-button{
  border: none;
}
</style>