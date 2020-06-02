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
        <el-form-item label="权限名称">
          <el-input type="text" v-model="name" style="width:50%" size="small"  placeholder="请输入权限名称">
          </el-input>
        </el-form-item>
        <el-form-item label="权限类型" >
          <el-select v-model="type" style="width:50%" size="small">
            <el-option
              v-for="item in typeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="权限路径">
          <el-input type="text" v-model="path" style="width:50%" size="small"></el-input>
        </el-form-item>
      </el-form>
    </slot>
    <!-- 按钮区 -->
    <span slot="footer">
      <el-button type="success" icon="el-icon-check" @click="saveJurisdiction()">保存</el-button>
      <el-button type="danger" icon="el-icon-close" @click="close">关闭</el-button>
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
    // data: this.data;
    return {
      name: "",
      type: "",
      typeOptions: [
        { value: "0", label: "超级" },
        { value: "1", label: "高级" },
        { value: "2", label: "普通" }
      ],
      path: "",
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

    saveJurisdiction: function() {
      let params = {
        name: this.name,
        path: this.path,
        type: this.type
      };
      if (this.name == "") {
        this.$confirm("权限名称不能为空！", "添加", {
          confirmButtonText: "确定",
           cancelButtonText: "取消",
        });
      } else if (this.type == "") {
        this.$confirm("权限类型不能为空！", "添加", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
        });
      }else if (this.path =="") {
        this.$confirm("权限路径不能为空！", "添加", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
        });
      }else{
        api.testAxiosGet(ApiPath.url.addJurisdiction, params).then(res => {
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
