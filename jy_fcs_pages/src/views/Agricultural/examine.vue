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
      <el-form  ref="postInfoForm" :model="agrForm" :label-position="labelPosition" label-width="100px" style="margin-left:-135px">
         <el-form-item label="驳回理由" >
          <el-input type="textarea" :rows="3" v-model="agrForm.examineReason" size="small" style="width:95%"></el-input>
        </el-form-item>
      </el-form>
    </slot>
    <!-- 按钮区 -->
    <span slot="footer">
      <el-button type="danger" icon="el-icon-close" @click="refusePostInfo()" size="small">拒绝审核</el-button>
      <el-button type="info" icon="el-icon-close" @click="close" size="small">关闭</el-button>
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
    },
    examineId: {
      type: String
    }
  },
  data() {
    return {
      labelPosition: "right",
      agrForm: {
        id:"",
        examineReason:"",
      },
      localShow: this.show,
    };
  },
  watch: {
    show(val) {
      this.localShow = val;
    },
    examineId(val) {
      let params = {
        id: val
      };
      //根据Id查询用户信息
      api.testAxiosGet(ApiPath.url.agriFindById, params).then(res => {
        this.agrForm = res.data;
      });
    }
  },
   mounted() {},
  methods: {
    //审核拒绝
    refusePostInfo: function(){
      if (          
          this.agrForm.examineReason == "" ||
          this.agrForm.examineReason == null
        ) {
          this.$alert("请填写驳回理由！", "提示", {
            confirmButtonText: "确定",
          });
          return false;
        }
        let params = {
       agriculturalEntity: this.agrForm,
      };
        api.testAxiosGet(ApiPath.url.updateRefuse, params).then(res => {
            let code = res.state;
        if (code == "0") {
          this.$message.error(res.message);
          this.close();
          this.reload();
        }
        }).catch(function(error) {});
     this.agrForm.updateUser = localStorage.getItem("userInfo");
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