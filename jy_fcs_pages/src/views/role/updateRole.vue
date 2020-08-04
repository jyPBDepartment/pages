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
      <el-form :model="roleForm" :rules="rules" ref="roleForm" :label-position="labelPosition">
        <el-form-item label="角色名称" prop="name">
          <el-input type="text" v-model="roleForm.name" style="width:75%" size="small" maxlength="18"></el-input>

        </el-form-item>
        <el-form-item label="角色备注" prop="name">
          <el-input
            type="textarea"
            v-model="roleForm.remark"
            size="small"
            placeholder="请输入角色名称"
            style="width:80%"
            maxlength="255"
          ></el-input>
        </el-form-item>
      </el-form>
    </slot>
    <!-- 按钮区 -->
    <span slot="footer">
      <el-button :disabled="saveFlag" type="primary" icon="el-icon-check" @click="saveRoles">保存</el-button>
      <el-button icon="el-icon-close" @click="close">关闭</el-button>
    </span>
  </el-dialog>
</template>
<script>
import ApiPath from "@/api/ApiPath.js";
import api from "@/axios/api.js";
import aes from "@/utils/aes.js";
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
    transRoleId: {
      type: String
    }
  },
  data() {
    
    return {
      saveFlag:false,
      labelPosition: "right",
      localShow: this.show,
      roleForm: {
        id: "",
        name: "",
        remark:""
      },
      rules: {
        name: [{ required: true, message: "请输入角色名称", trigger: "blur" }],
        remark:[{ required: true, message: "请输入角色备注", trigger: "blur" }]
      }
    };
  },
  watch: {
    show(val) {
      this.localShow = val;
    },
    transRoleId(val) {
      let params = {
        id: val
      };
      //根据Id查询用户信息
      api.testAxiosGet(ApiPath.url.findRoleById, params).then(res => {
        this.roleForm = res.data;
      });
    }
  },
  methods: {
    saveRoles: function() {
      this.saveFlag = true;
      let params = {
        roleEntity: aes.encrypt(JSON.stringify(this.roleForm) )
      };
      //修改用户信息
      api.testAxiosGet(ApiPath.url.saveRole, params).then(res => {
        this.$message.success(res.message);
        this.close();
        this.reload();
      }).catch(function(error) {this.saveFlag = false;});
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