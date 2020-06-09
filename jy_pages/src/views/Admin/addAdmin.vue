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
          <el-input type="text" v-model="editForm.loginName"  placeholder="请输入姓名" style="width:70%;"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password" >
          <el-input type="password" v-model="editForm.password" placeholder="请输入密码 " style="width:70%;" show-password maxlength="16" 
         ></el-input>
          
        </el-form-item>


         <el-form-item label="角色" prop="roleId" >
            <el-select v-model="editForm.roleId" placeholder="请输入角色" style="width:70%;">
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
        <el-button type="success" icon="el-icon-check" @click="saveAdmin()" size="medium" style="background-color:#409EFF;border-color:#409EFF;color:white;font-size:12px">保存</el-button>
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
          {min:6,max:16,message:"最少为六位数密码，最大为十六位密码",trigger:"blur"}
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
      let params = {
        adminEntity: this.editForm
      };
      api.testAxiosGet(ApiPath.url.saveAdmin, params).then(res => {
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
