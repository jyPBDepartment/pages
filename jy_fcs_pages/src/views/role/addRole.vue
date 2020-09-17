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
      <el-form
        :model="editForm"
        :rules="rules"
        ref="editForm"
        :label-position="labelPosition"
        label-width="100px"
        style="margin-left:-85px"
      >
        <el-form-item label="角色名称" prop="name">
          <el-input
            type="text"
            v-model="editForm.name"
            size="small"
            placeholder="请输入角色名称（不超过18个字符）"
            style="width:90%"
            maxlength="18"
          ></el-input>
        </el-form-item>
        <el-form-item label="角色备注" prop="name">
          <el-input
            type="textarea"
            v-model="editForm.remark"
            size="small"
            placeholder="请输入角色备注"
            style="width:90%"
            maxlength="255"
          ></el-input>
        </el-form-item>
      </el-form>
    </slot>

    <!-- 按钮区 -->
    <span slot="footer">
      <el-button type="primary" icon="el-icon-check" @click="saveRoles()" v-loading.fullscreen.lock="fullscreenLoading">保存</el-button>
      <el-button icon="el-icon-close" @click="close" type="info">关闭</el-button>
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
      fullscreenLoading: false,
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
         if (this.editForm.name == "") {
          this.$alert("角色名称不能为空", "提示", {
            confirmButtonText: "确定",
          });
          return false;
        }
        if (this.editForm.remark == "") {
          this.$alert("角色备注不能为空", "提示", {
            confirmButtonText: "确定",
          });
          return false;
        }
        let params = {
          roleEntity: aes.encrypt(JSON.stringify(this.editForm) )
        };
        api.testAxiosGet(ApiPath.url.saveRole, params).then(res => {
          this.$message.success(res.message);
          this.close();
        }).catch(function(error) {this.saveFlag = false;});
           this.fullscreenLoading = true;
            setTimeout(() => {
              this.editForm.name="";
              this.editForm.remark="";
              this.fullscreenLoading = false;
            }, 500);
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