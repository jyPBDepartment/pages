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
      <el-form :model="postInfoForm" :label-position="labelPosition" label-width="100px">
        <el-form-item label="标题名称">
          <el-input type="text" v-model="postInfoForm.name" size="small" style="width:80%" readonly ></el-input>
        </el-form-item>
        <el-form-item label="内容" >
          <el-input type="textarea" v-model="postInfoForm.code" size="small" style="width:80%" readonly></el-input>
        </el-form-item>
        <el-form-item label="分类id">
          <el-input type="text" v-model="postInfoForm.parentCode" size="small" style="width:80%" readonly></el-input>
        </el-form-item>
        <el-form-item label="审核状态" >
          <el-input type="text" v-model="postInfoForm.auditStatus" size="small" style="width:80%" readonly></el-input>
        </el-form-item>
        <el-form-item label="审核意见" >
          <el-input type="textarea" v-model="postInfoForm.auditOptinion" size="small" style="width:80%" readonly></el-input>
        </el-form-item>
        <el-form-item label="发布时间" >
          <el-input type="text" v-model="postInfoForm.createDate" size="small" style="width:80%" readonly></el-input>
        </el-form-item>
        <el-form-item label="修改时间" >
          <el-input type="text" v-model="postInfoForm.updateDate" size="small" style="width:80%" readonly></el-input>
        </el-form-item>
        <el-form-item label="作者" >
          <el-input type="text" v-model="postInfoForm.author" size="small" style="width:80%" readonly></el-input>
        </el-form-item>
        <el-form-item label="发布人" >
          <el-input type="text" v-model="postInfoForm.createUser" size="small" style="width:80%" readonly></el-input>
        </el-form-item>
        <el-form-item label="审核人">
          <el-input type="text" v-model="postInfoForm.auditUser" size="small" style="width:80%" readonly></el-input>
        </el-form-item>
        <el-form-item label="可见程度">
            <el-select v-model="postInfoForm.visibility" style="width:80%" size="small" readonly>
            <el-option
              v-for="item in visibilityOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              disabled
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="审核驳回原因" >
          <el-input type="textarea" v-model="postInfoForm.reason" size="small" style="width:80%"></el-input>
        </el-form-item>
      </el-form>
    </slot>
    <!-- 按钮区 -->
    <span slot="footer">
      <span v-if="postInfoForm.auditStatus==0||postInfoForm.auditStatus==1"><el-button type="primary" icon="el-icon-check" @click="passPostInfo" class="insert">通过审核</el-button></span>
      <span v-if="postInfoForm.auditStatus==0||postInfoForm.auditStatus==1"><el-button type="primary" icon="el-icon-close" @click="refusePostInfo" class="del">拒绝审核</el-button></span>
      <el-button type="info" icon="el-icon-close" @click="close">关闭</el-button>
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
    transPostInfoId: {
      type: String
    }
  },
  data() {
    return {
      labelPosition: "right",
      postInfoForm: {
        code: "",
        parentCode: "",
        auditStatus: "",
        auditOptinion: "",
        createDate: "",
        updateDate: "",
        author: "",
        createUser: "",
        auditUser: "",
        visibility: "",
        name: "",
        status:"",
        id:"",
        reason:"",
      },
      localShow: this.show,
      visibilityOptions:[
        { value: "0", label: "自己可见" },
        { value: "1", label: "全部可见" }
      ]
    };
  },
  watch: {
    show(val) {
      this.localShow = val;
    },
    transPostInfoId(val) {
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
      });
      this.postInfoForm.auditUser =localStorage.getItem("userInfo");
    },
    //审核拒绝
    refusePostInfo: function(){
        let params = {
        postInfoEntity: this.postInfoForm
      };
      if(this.postInfoForm.reason!=null && this.postInfoForm.reason!=null){
        api.testAxiosGet(ApiPath.url.refusePostInfo, params).then(res => {
            let code = res.state;
            if(code == "0") {
                this.$message.success(res.message);
                this.close();
                this.reload();
            }
        });
      this.postInfoForm.auditUser =localStorage.getItem("userInfo");
      }else{
          this.$alert("驳回审核原因不能为空，请输入！", "提示", { confirmButtonText: "确定" });
      }

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