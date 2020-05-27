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
      <el-form>
        <el-form-item label="权限编号">
          <el-input type="text" v-model="jurForm.id" style="width:75%" size="small" readonly></el-input>
        </el-form-item>
        <el-form-item label="权限名称">
          <el-input type="text" v-model="jurForm.name" style="width:75%" size="small"></el-input>
        </el-form-item>
        <el-form-item label="权限路径">
          <el-input type="text" v-model="jurForm.path" style="width:75%" size="small"></el-input>
        </el-form-item>
        <el-form-item label="权限类型">
          <el-input type="text" v-model="jurForm.type" style="width:75%" size="small"></el-input>
        </el-form-item>
      </el-form>
    </slot>
    <!-- 按钮区 -->
    <span slot="footer">
      <el-button icon="el-icon-close" @click="close">关闭</el-button>
      <el-button type="primary" icon="el-icon-check" @click="updateJurisdiction">保存</el-button>
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
        type: ""
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
        console.log(res.data);
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