<template>
  <el-dialog
    :visible.sync="localShow"
    :title="title"
    :before-close="beforeClose"
    append-to-body
    modal-append-to-body
    width="35%"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
  >
    <!-- 插槽区 -->
    <slot>
      <el-form :model="editForm" :rules="rules" ref="editForm" :label-position="labelPosition" label-width="100px" style="margin-left:-85px">
        <el-form-item label="价格" prop="price">
          <el-input type="text" v-model="editForm.price" size="small" placeholder="请输入价格" style="width:60%"></el-input>
        </el-form-item>
        <el-form-item label="日期" prop="priceDate">
          <el-date-picker type="date" placeholder="选择日期" format="yyyy年MM月dd日"
      value-format="yyyy-MM-dd" v-model="editForm.priceDate" style="width: 60%;" readonly></el-date-picker>
        </el-form-item>
      </el-form>
    </slot>
    <!-- 按钮区 -->
    <span slot="footer">
      <el-button v-loading.fullscreen.lock="fullscreenLoading" type="primary" icon="el-icon-check" @click="updateModule('editForm')">保存</el-button>
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
    transModuleInfoId: {
      type: String,
    },
  },
  data() {
    return {
      fullscreenLoading: false,
      localShow: this.show,
      isShow: false,
      limit: 1,
      imgUrl: "",
      upload: ApiPath.url.uploadImg,
      fileList: [],
      labelPosition: "right",
      editFormVisible: false,
      editForm: {
        price: "",
        id: "",
        priceDate:"",
        updateUser: localStorage.getItem("userInfo"),
      },
      //rules表单验证
      rules: {
        price: [{ required: true, message: "请输入价格", trigger: "blur" },
        {pattern:/^(?!0+$)(?!0*\.0*$)\d{1,8}(\.\d{1,2})?$/,message:"请输入整数且只能包含2位小数",trigger: "blur"}],
        priceDate: [{ required: true, message: "请输入日期", trigger: "blur" }]
      },
    };
  },
  watch: {
    show(val) {
      this.localShow = val;
    },
    transModuleInfoId(val) {
      let params = {
        id: val,
      };
      //根据Id查询用户信息
      api.testAxiosGet(ApiPath.url.findGrainPricesInfoById, params).then((res) => {
          if(res.status=='0'){
            this.editForm = res.data;
          }
      });
    },
  },
  mounted() {},
  methods: {
    
    handle() {
      this.isShow = true;
    },
    cancal() {
      this.isShow = false;
    },
    updateModule(editData) {
      this.$refs[editData].validate((valid) => {
        if (valid) {
            this.editForm.updateUser = localStorage.getItem("userInfo");
            let params = { grainPricesEntity: this.editForm };
            api
              .testAxiosGet(ApiPath.url.saveGrainPrices, params)
              .then((res) => {
                this.$message.success(res.message);
                this.close();
              }).catch(function(err) {
                this.$message.error(err.data);
              })
              this.fullscreenLoading = true;
              setTimeout(() => {
                this.fullscreenLoading = false;
              }, 500);
            
          } else {
            this.$message.error("请上传图片");
            return;
          }
      });
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
.el-button {
  border: none;
}
.required {
  color: red;
  margin-left: -79px;
}
</style>