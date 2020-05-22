<template>
  <el-dialog
    :visible.sync="localShow"
    :title="title"
    :before-close="beforeClose"
    append-to-body
    modal-append-to-body
    align="center"
    width="30%"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
  >
    <!-- 插槽区 -->
    <slot>
      <el-form>
        <el-form-item label="角色名称">
          <el-input type="text" v-model="roleName"  size="small" placeholder="请输入角色名称" style="width:45%"></el-input>
        </el-form-item>
        <el-form-item label="角色分类">
          <el-select v-model="roleType" style="width:45%" size="small" >
            <el-option
              v-for="item in rolesTypeOptions"
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
      <el-button type="success" icon="el-icon-check" @click="saveRoles()">保存</el-button>
      <el-button type="danger" icon="el-icon-close" @click="close">关闭</el-button>
    </span>
  </el-dialog>
</template>

<script>
import qs from "qs";
import Vue from "vue";
// import axios from 'axios';
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
    // data: this.data;
    return {
      roleName: "",
      roleType: "",
      rolesTypeOptions: [
        { value: "0", label: "超级管理员" },
        { value: "1", label: "高级管理员" },
        { value: "2", label: "普通管理员" }
      ],
      localShow: this.show
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
        roleName: this.roleName,
        roleType: this.roleType
      };
      if (this.roleName == "") {
        this.$confirm("名称不能为空！", "添加", {
          confirmButtonText: "确定",
          cancelButtonText: "取消"
        });
      } else if (this.roleType == "") {
        this.$confirm("类型不能为空！", "添加", {
          confirmButtonText: "确定",
          cancelButtonText: "取消"
        });
      } else {
        api.testAxiosGet(ApiPath.url.addRoles, params).then(res => {
          this.$message.success(res.message);
          this.close();
          this.reload();
        });
      }
    }
  }
};
</script>

<style>
</style>
