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
        <el-form-item label="角色名称" prop="name">
          <el-input
            type="text"
            v-model="editForm.name"
            size="small"
            placeholder="请输入角色名称"
            style="width:80%"
          ></el-input>
        </el-form-item>
        <el-form-item label="角色状态" prop="state">
          <el-select v-model="editForm.state" style="width:80%" size="small">
            <el-option
              v-for="item in stateOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="权限名称" prop="limitId">
          <el-select v-model="editForm.limitId" style="width:80%" size="small">
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
      <el-button type="primary" icon="el-icon-check" @click="saveRoles()">保存</el-button>
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
        id:"",
      },
      stateOptions: [
        { value: "0", label: "启用" },
        { value: "1", label: "禁用" }
      ],
      limitIdOptions: [],
      localShow: this.show,
      
      rules: {
        name: [{ required: true, message: "请输入角色名称", trigger: "blur" }],
         state:[{ required: true, message: "请选择角色状态", trigger: "blur" }]
      }
    };
  },
  watch: {
    show(val) {
      this.localShow = val;
    }
  },
  mounted(){
    let params = {
        limitId: this.editForm.limitId,
        id:this.editForm.id 
    };
      api.testAxiosGet(ApiPath.url.findLimit, params).then(res => {
        let code = res.status;
        if (code=="0") {
         for(let i=0;i<res.data.length;i++){
           this.limitIdOptions.push({value:res.data[i]["id"],label:res.data[i]["name"]});
         }  
        }
        
      });
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
      let params = {
        roleEntity: this.editForm
      };
      api.testAxiosGet(ApiPath.url.addRole, params).then(res => {
        this.$message.success(res.message);
        this.close();
        this.reload();
      });
    },
  }
};
</script>

<style scoped>
.el-form {
  padding-left: 100px;
}
</style>