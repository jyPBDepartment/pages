<template>
  <el-dialog
    :visible.sync="localShow"
    :title="title"
    :before-close="beforeClose"
    append-to-body
    modal-append-to-body
    width="50%"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
  >
    <!-- 插槽区 -->
    <slot>
      <el-form  ref="postInfoForm" :model="postInfoForm" :label-position="labelPosition" label-width="100px">
         <el-form-item label="审核原因" >
          <span v-if="postInfoForm.auditStatus==0"><el-input type="textarea" :rows="3" v-model="postInfoForm.reason" size="small" style="width:80%"></el-input></span>
          <span v-if="postInfoForm.auditStatus==1||postInfoForm.auditStatus==2"><el-input type="textarea" :rows="3" v-model="postInfoForm.reason" size="small" style="width:80%" readonly></el-input></span>
        </el-form-item>
      </el-form>
    </slot>
    <!-- 按钮区 -->
    <span slot="footer">
      <span v-if="postInfoForm.auditStatus==0"><el-button type="primary" icon="el-icon-check" @click="passPostInfo()" class="insert">通过审核</el-button></span>
      <span v-if="postInfoForm.auditStatus==0"><el-button type="primary" icon="el-icon-close" @click="refusePostInfo()" class="del">拒绝审核</el-button></span>
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
      postInfoForm: {
        status:"",
        id:"",
        reason:"",
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
      api.testAxiosGet(ApiPath.url.findPostInfoId, params).then(res => {
        this.postInfoForm = res.data;
      });
    }
  },
   mounted() {},
  methods: {
      //审核通过
    passPostInfo: function() {
      let params = {
        postInfoEntity: this.postInfoForm
      };
      api.testAxiosGet(ApiPath.url.passPostInfo, params).then(res => {
        let code = res.state;
          if(code == "0") {
            this.$message.success(res.message);
            this.close();
            this.reload();
          }
      }).catch(function(error) {});
      this.postInfoForm.auditUser =localStorage.getItem("userInfo");
    },
    //审核拒绝
    refusePostInfo: function(){
      if (          
          this.postInfoForm.reason == "" ||
          this.postInfoForm.reason == null
        ) {
          this.$alert("请填写拒绝理由！", "提示", {
            confirmButtonText: "确定",
          });
          return false;
        }
        let params = {
        postInfoEntity: this.postInfoForm
      };
        api.testAxiosGet(ApiPath.url.refusePostInfo, params).then(res => {
            let code = res.state;
            if(code == "0") {
                this.$message.success(res.message);
                this.close();
                this.reload();
            }
        }).catch(function(error) {});
      this.postInfoForm.auditUser =localStorage.getItem("userInfo");
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
.el-button{
  border: none;
}
.insert{
  width: 100px;
  background-color: #67c23a;
  border-color: #67c23a;
  color: #fff;
  font-size: 12px;
  margin-top: 4px;
}
.el-button.del {
  width: 100px;
  background-color: #f56c6c;
  border-color: #f56c6c;
  color: white;
  font-size: 12px;
}
</style> 