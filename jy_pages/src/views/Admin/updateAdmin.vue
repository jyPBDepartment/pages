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
      <el-form :rules="rules" ref="AdminForm" :model="AdminForm" label-width="100px">
       
        <el-form-item label="登录名称" prop="loginName">
          <el-input type="text" v-model="AdminForm.loginName" placeholder="请输入姓名" style=" width:70%;" @change="name"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="AdminForm.password" placeholder="请输入密码" style=" width:70%;" show-password  @change="password"></el-input>
        </el-form-item>
       
       
           <el-form-item label="角色" prop="roleId" >
            <el-select v-model="AdminForm.roleId" placeholder="请输入角色" clearable style=" width:70%;">
              <el-option
                v-for="item in AdminOptions"
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
      <el-button type="success" icon="el-icon-check" @click="updateAdmin()" style="background-color:#409EFF;border-color:#409EFF;color:white;font-size:12px">保存</el-button>
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
    transAdminId: {
      type: String,
      default: "对话框"
    }
  },
  data() {
    return {
      localShow: this.show,
      AdminForm: {
        id: "",
        loginName: "",
        password: "",
        roleId: ""
      },
     
      AdminOptions: [
       
      ],
      // rules表单验证
      rules: {
        loginName: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        password: [
        { required: true, message: "请输入密码", trigger: "blur" },
          {pattern:/^.*(?=.{6,16})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])6.*$/,message: "最少6位,最多16位，至少1个大写字母，1个小写字母，1个数字", trigger: "blur"}
        ],
        roleId: [{ required: true, message: "请输入角色", trigger: "blur" }]
      }
    };
  },
  watch: {
    show(val) {
      this.localShow = val;
    },
    transAdminId(val) {
      console.log(val);
      let params = {
        id: val
      };

      //根据Id查询用户信息
      api.testAxiosGet(ApiPath.url.adminFindById, params).then(res => {
        if (res.status == 0) {
          this.AdminForm = res.data;
        }
      });
    }
  },
 
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
    //联表查询
    findContext: function() {
        let params = {
        roleId  :this.AdminForm.roleId
        };
        api
          .testAxiosGet(ApiPath.url.findAllUpdate, params)
          .then(res => {
            if (res.status == "0") {
              for (let i = 0; i < res.data.length; i++) {
                this.AdminOptions.push({
                  value: res.data[i]["id"],
                  label: res.data[i]["name"]
                });
              }
            }
          })
          .catch(function(error) {
          });
    },

    //修改用户信息
    updateAdmin: function() {
      let params = {
        adminEntity: this.AdminForm
      };

      api.testAxiosGet(ApiPath.url.updateAdmin, params).then(res => {
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