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
       
        <el-form-item label="登录姓名" prop="loginName">
          <el-input type="text" v-model="editForm.loginName"  placeholder="请输入姓名" style="width:70%;" @change="name"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password" >
          <el-input type="password" v-model="editForm.password" placeholder="请输入密码 " style="width:70%;" show-password   @change="password"></el-input>
          
        </el-form-item>


         <el-form-item label="角色" prop="roleId" >
            <el-select v-model="editForm.roleId" placeholder="请输入角色" clearable style="width:70%;">
              <el-option
                v-for="item in adminOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
        </el-form-item>
       
      </el-form>
    </slot>
    <!-- 按钮区 -->
    <span slot="footer">
        <el-button type="success" icon="el-icon-check" @click="saveAdmin()" size="medium" style="background-color:#409EFF;border-color:#409EFF;color:white;font-size:12px;width: 105px;
  height: 42px;">保存</el-button>
         <el-button type="danger" icon="el-icon-close" @click="close" size="medium" style="background-color:white;border-color:#fff;color:black;font-size:12px;width: 105px;
  height: 42px;">关闭</el-button>
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
        loginName: "",
        password: "",
        roleId: ""
      },

      localShow: this.show,
      adminOptions: [],

      // rules表单验证
      rules: {
        loginName: [
          { required: true, message: "请输入姓名", trigger: "blur" },
         
        ],
        password: [
          { required: true, message: "请输入您的密码", trigger: "blur" },
        
        ],
        roleId: [{ required: true, message: "请输入角色", trigger: "blur" }]
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
    this.findContext();
  },
  methods: {
    // 输入姓名正则验证
    name: function() {
      var name =  /^[a-zA-Z\u4E00-\uFA29]*$/;
      if (!name.test(this.editForm.loginName)) {
       this.$alert('请输入正确的姓名，只能为字母或汉字！', '提示', {
          confirmButtonText: '确定',
        });
        this.editForm.loginName= "";
       
      }
    },
    // 输入密码正则验证
    password: function() {
      var password =  /^[0-9A-Za-z]{6,16}$/;
      if (!password.test(this.editForm.password)) {
       this.$alert('请输入正确的密码，只能为6-16位的字母或数字！', '提示', {
          confirmButtonText: '确定',
        });
        this.editForm.password= "";
       
      }
    },
    //下拉列表显示
    findContext: function() {
      let params = {
        roleId: this.editForm.roleId,
        id: this.editForm.id
      };
      api
        .testAxiosGet(ApiPath.url.findAllAdmin, params)
        .then(res => {
          if (res.status == "0") {
            for (let i = 0; i < res.data.length; i++) {
              this.adminOptions.push({
                value: res.data[i]["id"],
                label: res.data[i]["name"]
              });
            }
          }
        })
        .catch(function(error) {});
    },

    //添加管理员方法
    saveAdmin: function() {
       if (this.editForm.loginName != "" && this.editForm.password != "" && this.editForm.roleId != "") {
      let params = {
        adminEntity: this.editForm
      };
     
      api.testAxiosGet(ApiPath.url.saveAdmin, params).then(res => {
       let code = res.status;
        if (code == "0") {
           this.$message.success(res.message);
          
        } else {
          this.$alert('"'+this.editForm.loginName+'"' +'名字不能重复,添加失败！', '提示', {
          confirmButtonText: '确定',
        });
        }
         
        
       
        this.reload();
        this.close();
      });
    }else {
            this.$alert('登录名称，密码，角色不能为空！', '提示', {
          confirmButtonText: '确定',
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
