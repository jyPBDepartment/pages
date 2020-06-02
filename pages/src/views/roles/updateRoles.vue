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
      <el-form :model="rolesForm" :rules="rules" ref="rolesForm" :label-position="labelPosition">
        <el-form-item label="角色名称" prop="roleName">
          <el-input type="text" v-model="rolesForm.roleName" style="width:75%" size="small"></el-input>
        </el-form-item>
        <el-form-item label="角色分类" prop="roleType">
          <el-input type="text" v-model="rolesForm.roleType" style="width:75%" size="small"></el-input>
        </el-form-item>
        <el-form-item label="权限名称" prop="limitId">
          <el-select v-model="rolesForm.limitId" style="width:75%" size="small">
            <el-option
              v-for="item in limitIdOptions"
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
      <el-button type="primary" icon="el-icon-check" @click="updateRoles">保存</el-button>
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
    transRolesId: {
      type: String
    }
  },
  data() {
    
    return {
      labelPosition: "right",
      localShow: this.show,
      rolesForm: {
        id: "",
        roleName: "",
        roleType: "",
        roleId: "",
        limitId: ""
      },
      limitIdOptions: [],
      rules: {
        roleName: [
          { required: true, message: "请输入角色名称", trigger: "blur" }
        ],
        roleType: [
          { required: true, message: "请选择角色类型", trigger: "blur" }
        ],
        limitId: [
          { required: true, message: "请选择权限名称", trigger: "blur" }
        ]
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
        this.rolesForm = res.data;
      });
    }
  },
  mounted() {
    let params = {
      limitId: this.rolesForm.limitId
    };
    api.testAxiosGet(ApiPath.url.findJurisdiction, params).then(res => {
      let code = res.status;
      if (code == "0") {
        for (let i = 0; i < res.data.length; i++) {
          this.limitIdOptions.push({
            value: res.data[i]["id"],
            label: res.data[i]["name"]
          });
        }
      }
    });
  },
  created() {},
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
.el-form {
  padding-left: 100px;
}
</style>