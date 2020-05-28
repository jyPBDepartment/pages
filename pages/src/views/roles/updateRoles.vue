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
        <el-form-item label="角色编号">
          <el-input type="text" v-model="rolesForm.id" style="width:75%" size="small" readonly></el-input>
        </el-form-item>
        <el-form-item label="角色名称">
          <el-input type="text" v-model="rolesForm.roleName" style="width:75%" size="small"></el-input>
        </el-form-item>
        <el-form-item label="角色分类">
          <el-input type="text" v-model="rolesForm.roleType" style="width:75%" size="small"></el-input>
        </el-form-item>
      </el-form>
    </slot>
    <!-- 按钮区 -->
    <span slot="footer">
      <el-button  icon="el-icon-close" @click="close">关闭</el-button>
      <el-button type="primary" icon="el-icon-check" @click="updateRoles">保存</el-button>
    </span>
  </el-dialog>
</template>
<script>
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
    },
    transRolesId: {
      type: String
    }
  },
  data() {
    return {
      localShow: this.show,
      rolesForm: {
        id: "",
        roleName: "",
        roleType: "",
      }
    };
  },
  watch: {
    show(val) {
      this.localShow = val;
    },
    transRolesId(val) {
      let params = {
        id: val
      };

      //根据Id查询用户信息
      api.testAxiosGet(ApiPath.url.findRolesId, params).then(res => {
        console.log(res.data);
        this.rolesForm = res.data;
      });
    }
  },
  methods: {
    updateRoles: function() {
      let params = {
        rolesEntity: this.rolesForm
      };
      //修改用户信息
      api.testAxiosGet(ApiPath.url.updateRoles, params).then(res => {
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