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
      <el-form :model="editForm" :rules="rules" ref="editForm" :label-position="labelPosition" label-width="100px">
        <el-form-item label="角色名称" prop="roleName" >
          <el-input type="text" v-model="editForm.roleName"  size="small" placeholder="请输入角色名称" style="width:80%" ></el-input>
        </el-form-item>
        <el-form-item label="角色分类" prop="roleType">
          <el-select v-model="editForm.roleType" style="width:80%" size="small" >
            <el-option
              v-for="item in rolesTypeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <!-- <el-form-item label="权限ID" prop="limitID" > -->
          <!-- <el-input type="text" v-model="editForm.limitId"  size="small" placeholder="请输入" style="width:80%" ></el-input> -->
        <!-- </el-form-item> -->
      </el-form>
    </slot>
    <!-- 按钮区 -->
    <span slot="footer">
      <el-button icon="el-icon-close" @click="close">关闭</el-button>
      <el-button type="primary" icon="el-icon-check" @click="saveRoles()">保存</el-button>
    </span>
  </el-dialog>
</template>

<script>
import qs from "qs";
import Vue from "vue";
import ApiPath from "@/api/ApiPath.js";
import api from "@/axios/api.js";
export default {
  inject:['reload'],
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
     labelPosition:'right',
      editForm:{
        roleName: "",
        roleType: "",
      },
      rolesTypeOptions: [
        { value: "0", label: "超级管理员" },
        { value: "1", label: "高级管理员" },
        { value: "2", label: "普通管理员" }
      ],
      localShow: this.show,
      rules:{
        roleName: [
          { required: true, message: "请输入角色名称", trigger: "blur" }
        ],
        roleType: [
          { required: true, message: "请选择角色类型", trigger: "blur" }
        ],
      },
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

    saveRoles: function() {
      let params = {
        roleName: this.editForm.roleName,
        roleType: this.editForm.roleType
        // limitId:this.editForm.limitId
      };
        api.testAxiosGet(ApiPath.url.addRoles, params).then(res => {
          this.$message.success(res.message);
          this.close();
          this.reload();
        });
    }
  }
};
</script>

<style scoped>
.el-form{
padding-left: 100px;
}
</style>
