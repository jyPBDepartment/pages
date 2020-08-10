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
      <el-form
        :model="editForm"
        :rules="rules"
        ref="editForm"
        :label-position="labelPosition"
        label-width="100px"
      >
        <el-form-item label="角色名称" prop="name">
          <el-input
            type="text"
            v-model="editForm.name"
            size="small"
            placeholder="请输入角色名称"
            style="width:80%"
            maxlength="18"
          ></el-input>
        </el-form-item>
        <el-form-item label="角色备注" prop="name">
          <el-input
            type="textarea"
            v-model="editForm.remark"
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
      <el-button :disabled="saveFlag" type="primary" icon="el-icon-check" @click="saveRoles()">保存</el-button>
      <el-button icon="el-icon-close" @click="close">关闭</el-button>
    </span>
  </el-dialog>
</template>
<script>
import qs from "qs";
import Vue from "vue";
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
    }
  },
  data() {
    return {
      saveFlag:false,
      labelPosition: "right",
      editForm: {
        name: "",
        id:"",
        remark:""
      },
      stateOptions: [
        { value: "0", label: "启用" },
        { value: "1", label: "禁用" }
      ],
      limitIdOptions: [],
      localShow: this.show,
      
      rules: {
        name: [{ required: true, message: "请输入角色名称", trigger: "blur" }],
        remark:[{ required: true, message: "请输入角色备注", trigger: "blur" }]
      }
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
    //新增保存
    saveRoles: function() {
      if(this.editForm.name!=""){
        this.saveFlag = true;

        let params = {
          roleEntity: aes.encrypt(JSON.stringify(this.editForm) )
        };
        api.testAxiosGet(ApiPath.url.saveRole, params).then(res => {
          this.$message.success(res.message);
          this.close();
          this.reload();
        }).catch(function(error) {this.saveFlag = false;});
     }else{
       this.$alert('角色名称、权限名称不能为空！', '提示', {confirmButtonText: '确定',});
     }

    },
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