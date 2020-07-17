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
        <el-form-item label="权限名称" prop="name">
          <el-input
            type="text"
            v-model="editForm.name"
            style="width:80%"
            size="small"
            placeholder="请输入权限名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="权限路径" prop="path">
          <el-input type="text" v-model="editForm.path" style="width:80%" size="small"></el-input>
        </el-form-item>
        <el-form-item label="权限状态" prop="roleType">
          <el-select v-model="editForm.state" style="width:80%" size="small">
            <el-option
              v-for="item in stateOptions"
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
      <el-button type="primary" icon="el-icon-check" @click="saveLimit()">保存</el-button>
      <el-button icon="el-icon-close" @click="close">关闭</el-button>
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
        name: "",
        path: ""
      },
      stateOptions: [
        { value: "0", label: "启用" },
        { value: "1", label: "禁用" }
      ],
      localShow: this.show,
      rules: {
        name: [{ required: true, message: "请输入权限名称", trigger: "blur" }],
        path: [{ required: true, message: "请输入权限路径", trigger: "blur" }],
        state:[{ required: true, message: "请选择权限状态", trigger: "blur" }]
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

    saveLimit: function() {
      if(this.editForm.name!=""&&this.editForm.path!=""){
        let params = {
          limitEntity:this.editForm
        };
        api.testAxiosGet(ApiPath.url.addLimit, params).then(res => {
          this.$message.success(res.message);
          this.close();
          this.reload();
        });
       }else{
        this.$alert('权限名称、权限路径不能为空！', '提示', {confirmButtonText: '确定',});
      }
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
