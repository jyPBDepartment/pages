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
      <el-form :model="cfaForm" :rules="rules" ref="cfaForm" :label-position="labelPosition" label-width="100px" style="margin-left:-85px">
        <el-form-item label="职业类别" prop="vocationId">
          <el-select v-model="cfaForm.vocationId" placeholder="请选择" size="small" style="width:92%">
            <el-option
              v-for="item in vocationOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              class="option"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="证书名称" prop="name">
          <el-input type="text" v-model="cfaForm.name" size="small" placeholder="不超过32个字" style="width:92%" maxlength="32"></el-input>
        </el-form-item>
        <el-form-item label="证书描述" prop="remark">
          <el-input type="textarea" v-model="cfaForm.remark" size="small" style="width:92%"></el-input>
        </el-form-item>
        
      </el-form>
    </slot>
    <!-- 按钮区 -->
    <span slot="footer">
      <el-button type="primary" icon="el-icon-check" @click="saveModuleInfo('cfaForm')" v-loading.fullscreen.lock="fullscreenLoading">保存</el-button>
      <el-button type="info" icon="el-icon-close" @click="close">关闭</el-button>
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
    transLessonInfoId:{
      type: String,
    }
  },
  data() {
    return {
      fullscreenLoading: false,
      labelPosition: "right",
      cfaForm: {
        name: "",
        vocationId:"",
        updateBy: localStorage.getItem("userInfo"),
        remark:""
      },
      limit:1,
      vocationOptions: [],
      fileList: [],
      localShow: this.show,
      rules: {
        name: [{ required: true, message: "请输入证书名称", trigger: "blur" }],
        vocationId: [{ required: true, message: "请选择职业类别", trigger: "blur" }],
        remark: [{ required: true, message: "请输入证书描述", trigger: "blur" }]
      },
    };
  },
  watch: {
    show(val) {
      this.localShow = val;
    },
    transLessonInfoId(val) {
      //alert(val)
      if(val == ""){
        return;
      }
      let params = {
        id: val,
      };
      //根据Id查询用户信息
      api.testAxiosGet(ApiPath.url.findCertificateById, params).then((res) => {
        this.cfaForm = res.data;
        this.cfaForm.vocationId = res.data.vocation.id;
      });
    }
  },
  mounted() {
    this.findContext();
  },
  methods: {
    //下拉列表显示
    findContext: function () {
      let params = {};
      api
        .testAxiosGet(ApiPath.url.findVocationOptions, params)
        .then((res) => {
          if (res.state == "0") {
            // this.powerOptions.push({ value: "", label: "请选择" });
            for (let i = 0; i < res.data.length; i++) {
              this.vocationOptions.push({
                value: res.data[i]["id"],
                label: res.data[i]["name"],
              });
            }
          }
        })
        .catch(function (error) {});
    },

    beforeClose() {
      this.close();
    },
    close() {
      this.$emit("close");
    },
    //修改保存
    saveModuleInfo(editData) {
      this.$refs[editData].validate((valid) => {

        if (valid) {
            //this.cfaForm.url = this.imgUrl;
            this.cfaForm.updateBy = localStorage.getItem("userInfo");
            let params = {
              entity: this.cfaForm,
            };
            api.testAxiosGet(ApiPath.url.updateCertificate, params)
              .then((res) => {
                let code = res.state;
                if (code == "0") {
                  this.close();
                  this.$message.success(res.message);
                } else {
                  this.$message.error(res.message);
                }
              }).catch(function (err) {});
                this.fullscreenLoading = true;
                setTimeout(() => {
                  this.cfaForm.name="",
                  this.cfaForm.vocationId="",
                  this.cfaForm.remark="",
                  this.fullscreenLoading = false
                }, 500);
        } else {
          return false;
        }
      });
    },
  },
};
</script>

<style scoped>
.el-form {
  padding-left: 100px;
}
.el-button {
  border: none;
}
.required {
  color: red;
  margin-left: -79px;
}
</style>