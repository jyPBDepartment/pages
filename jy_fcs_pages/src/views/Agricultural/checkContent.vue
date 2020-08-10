<template>
  <el-dialog
    :visible.sync="localShow"
    :title="title"
    append-to-body
    modal-append-to-body
    width="40%"
    :before-close="beforeClose"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
  >
    <slot>
      <el-form
       
        ref="agrForm"
        :model="agrForm"
        label-width="100px"
        :label-position="labelPosition"
      >
        <el-form-item label="审核拒绝理由">
          <el-input type="textarea" v-model="agrForm.examineReason"></el-input>
        </el-form-item>
      </el-form>
    </slot>
    <span slot="footer">
     <span v-if="agrForm.status == 0 || agrForm.status ==3 || agrForm.status == 4 ">
        <el-button type="success" icon="el-icon-check"  @click="updateStatus()" >审核通过</el-button>
     </span>
      <span v-if="agrForm.status == 0 || agrForm.status ==3 || agrForm.status == 4 ">
        <el-button type="danger" icon="el-icon-close"  @click="refusePostInfo()">审核驳回</el-button>
      </span>
       
     
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
    checkContentId: {
      type: String,
    },
  },
  data() {
    return {
     
      labelPosition: "right",
      localShow: this.show,
      agrForm: {
        status:"",
        examineReason:""
      },
  
    };
  },
  watch: {
    show(val) {
      this.localShow = val;
    },
    //根据Id查询用户信息
    checkContentId(val) {
      let params = {
        id: val,
      };
      api.testAxiosGet(ApiPath.url.agriFindById, params).then((res) => {
        if (res.state == 0) {
          this.agrForm = res.data;
        }
      });
    },
  },
  methods: {
     //审核结果
    updateStatus: function (val) {
      let params = {
        agriculturalEntity: this.agrForm,
      };
      api.testAxiosGet(ApiPath.url.updateStatus, params).then((res) => {
        let code = res.state;
        if (code == "0") {
          this.$message.success(res.message);
          this.close();
          this.reload();
        }
      });
      this.agrForm.updateUser = localStorage.getItem("userInfo");
    },
    //驳回
    refusePostInfo: function () {
        if (          
          this.agrForm.examineReason == "" ||
          this.agrForm.examineReason == null
        ) {
          this.$alert("请填写拒绝理由！", "提示", {
            confirmButtonText: "确定",
          });
          return false;
        }
      
      let params = {
        agriculturalEntity: this.agrForm,
      };
      api.testAxiosGet(ApiPath.url.updateRefuse, params).then((res) => {
        let code = res.state;
        if (code == "0") {
          this.$message.success(res.message);
          this.close();
          this.reload();
        }
      });
      this.agrForm.updateUser = localStorage.getItem("userInfo");
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
  padding-left: 80px;
  width: 70%;
}
</style>