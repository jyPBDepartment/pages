<template>
  <el-dialog
    :visible.sync="localShow"
    :title="title"
    :before-close="beforeClose"
    append-to-body
    modal-append-to-body
    width="40%"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
  >
    <!-- 插槽区 -->
    <slot>
      <el-form
        :rules="rules"
        ref="editForm"
        :model="editForm"
        :label-position="labelPosition"
        label-width="100px"
      >
        <el-form-item label="权限名称" prop="jurName">
          <el-input type="text" v-model="editForm.jurName" placeholder="请输入权限名称" style="width:70%;"></el-input>
        </el-form-item>
        <el-form-item label="权限编码" prop="jurCode">
          <el-input type="text" v-model="editForm.jurCode" placeholder="请输入权限编码" style="width:70%;"></el-input>
        </el-form-item>
          <el-form-item label="上级权限编码" prop="subJurCode" >
            <el-select  v-model="editForm.subJurCode"  placeholder="请输入上级权限编码" style="width:70%;">
             <el-option
              v-for="item in powerOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              ></el-option>
           </el-select>
        </el-form-item>
      
        <el-form-item label="状态" prop="auditStatus">
          <el-input
            type="text"
            v-model="editForm.auditStatus"
            placeholder="请输入状态"
            style=" width:70%;"
          ></el-input>
        </el-form-item>
      </el-form>
    </slot>
    <!-- 按钮区 -->
    <span slot="footer">
      <el-button
        type="success"
        icon="el-icon-check"
        @click="savePowerInfo()"
        size="medium"
        style="background-color:#409EFF;border-color:#409EFF;color:white;font-size:12px;width:105px;height:42px;"
      >保存</el-button>
      <el-button
        type="danger"
        icon="el-icon-close"
        @click="close"
        size="medium"
        style="background-color:white;border-color:#fff;color:black;font-size:12px;width:105px;height:42px;"
      >关闭</el-button>
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
      default: false,
    },
    title: {
      type: String,
      default: "对话框",
    },
  },
  data() {
    return {
      labelPosition: "right",
      editForm: {
        jurName:"",
        jurCode:"",
        subJurCode:"",
        auditStatus:"",
        createUser:localStorage.getItem("userInfo")
      
      },
      powerOptions: [],

      localShow: this.show,

      // rules表单验证
      rules: {
         jurName: [{ required: true, message: "请输入权限名称", trigger: "blur" }],
        jurCode: [
          { required: true, message: "请输入权限编码", trigger: "blur" },
        ],
      },
    };
  },
  watch: {
    show(val) {
      this.localShow = val;
    },
  },
  mounted() {
    this.findContext();
  },
  methods: {
    //下拉列表显示
    findContext: function () {
      let params = {};
      api
        .testAxiosGet(ApiPath.url.findAllPower, params)
        .then((res) => {
          if (res.status == "0") {
            this.powerOptions.push({ value: "", label: "请选择" });
            for (let i = 0; i < res.data.length; i++) {
              this.powerOptions.push({
                value: res.data[i]["id"],
                label: res.data[i]["jurCode"],
              });
            }
          }
        })
        .catch(function (error) {});
    },

    //添加权限方法
    savePowerInfo: function () {
      if (this.editForm.jurName != "") {
        let params = {
          powerInfoEntity: this.editForm,
        };
        api
          .testAxiosGet(ApiPath.url.savePowerInfo, params)
          .then((res) => {
            this.$message.success(res.message);
            this.reload();
            this.close();
          })
          .catch((error) => {
            console.error(error);
          });
      } else {
        this.$alert("权限名称不能为空！", "提示", {
          confirmButtonText: "确定",
        });
      }
    },
    close: function () {
      this.$emit("close");
    },
    beforeClose: function () {
      this.close();
    },
  },
};
</script>

<style scoped>
.el-form {
  padding-left: 115px;
}
.input {
  float: left;
  font-size: 12px;
  width: 150px;
  font-family: arial;
  padding: 3px;
  border: 1px solid black;
}

.input.error {
  border: 1px solid red;
}

#tips {
  float: left;
  margin: 2px 0 0 20px;
}

#tips span {
  float: left;
  width: 50px;
  height: 20px;
  color: white;
  background: green;
  margin-right: 2px;
  line-height: 20px;
  text-align: center;
}
</style>
