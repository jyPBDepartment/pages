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
      <el-form :model="jurForm" :rules="rules" ref="jurForm" :label-position="labelPosition">
        <el-form-item label="权限名称" prop="name">
          <el-input type="text" v-model="jurForm.name" style="width:75%" size="small"></el-input>
        </el-form-item>
        <el-form-item label="权限路径" prop="path">
          <el-input type="text" v-model="jurForm.path" style="width:75%" size="small"></el-input>
        </el-form-item>
        <el-form-item label="权限类型" prop="type">
          <el-input type="text" v-model="jurForm.type" style="width:75%" size="small"></el-input>
        </el-form-item>
      </el-form>
    </slot>
    
    <!-- 按钮区 -->
    <span slot="footer">
      <el-button type="primary" icon="el-icon-check" @click="updateJurisdiction">保存</el-button>
      <el-button icon="el-icon-close" @click="close">关闭</el-button>
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
    transJurisdictionId: {
      type: String
    }
  },
  data() {
    return {
      localShow: this.show,
      jurForm: {
        id: "",
        name: "",
        path: "",
        type: "",
      },
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
    },
    transJurisdictionId(val) {
      let params = {
        id: val
      };
      //根据Id查询用户信息
      api.testAxiosGet(ApiPath.url.findJurisdictionById, params).then(res => {
        this.jurForm = res.data;
      });
    }
  },
  
  methods: {
    updateJurisdiction: function() {
      let params = {
        jurisdictionEntity: this.jurForm
      };
      //修改用户信息
      api.testAxiosGet(ApiPath.url.updateJurisdiction, params).then(res => {
        this.$message.success(res.message);
        this.close();
        this.reload();
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
.el-form{
padding-left: 100px;
}
</style>