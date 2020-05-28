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
        <el-form-item label="权限类型" prop="type">
          <el-select v-model="editForm.type" style="width:80%" size="small">
            <el-option
              v-for="item in typeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="权限路径" prop="path">
          <el-input type="text" v-model="editForm.path" style="width:80%" size="small"></el-input>
        </el-form-item>
        <!-- <el-form-item label="角色ID" prop="roleId">
          <el-input
            type="text"
            v-model="editForm.roleId"
            style="width:80%"
            size="small"
            placeholder="请输入"
          ></el-input>
        </el-form-item> -->
      </el-form>
    </slot>
    <!-- 按钮区 -->
    <span slot="footer">
      <el-button icon="el-icon-close" @click="close">关闭</el-button>
      <el-button type="primary" icon="el-icon-check" @click="saveJurisdiction()">保存</el-button>
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
        type: "",
        path: ""
      },
      typeOptions: [
        { value: "0", label: "超级" },
        { value: "1", label: "高级" },
        { value: "2", label: "普通" }
      ],
      localShow: this.show,
      rules: {
        name: [{ required: true, message: "请输入权限名称", trigger: "blur" }],
        type: [{ required: true, message: "请选择权限类型", trigger: "blur" }],
        path: [{ required: true, message: "请输入权限路径", trigger: "blur" }]
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

    saveJurisdiction: function() {
      let params = {
        name: this.editForm.name,
        path: this.editForm.path,
        type: this.editForm.type
        // roleId: this.editForm.roleId
      };
      api.testAxiosGet(ApiPath.url.addJurisdiction, params).then(res => {
        this.$message.success(res.message);
        this.close();
        this.reload();
      });
    }
  }
};
</script>

<style scoped>
.el-form {
  padding-left: 100px;
}
</style>
