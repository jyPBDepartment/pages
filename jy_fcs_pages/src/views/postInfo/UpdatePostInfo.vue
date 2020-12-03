<template>
  <el-dialog
    :visible.sync="localShow"
    :title="title"
    :before-close="beforeClose"
    append-to-body
    modal-append-to-body
     width="850px"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
  >
    <!-- 插槽区 -->
    <slot>
      <el-form
        :model="postInfoForm"
        ref="postInfoForm"
        :label-position="labelPosition"
        label-width="100px"
        style="margin-left: -50px"
      >
        <el-row>
          <el-col :span="2">标题名称:</el-col>
          <el-col :span="10">{{ postInfoForm.name }}</el-col>
          <el-col :span="2">审核状态:</el-col>
          <el-col :span="9">
            <span v-if="postInfoForm.auditStatus == 0">未审核</span>
            <span v-if="postInfoForm.auditStatus == 1">审核通过</span>
            <span v-if="postInfoForm.auditStatus == 2">审核驳回</span>
          </el-col>
        </el-row>
        <el-divider></el-divider>
        <el-row>
          <el-col :span="2">帖子分类:</el-col>
          <el-col :span="10">{{ postInfoForm.parentCode }}</el-col>
          <el-col :span="2">发帖作者:</el-col>
          <el-col :span="9">{{ postInfoForm.author}}</el-col>
        </el-row>
        <el-divider></el-divider>
          <el-row>
          <el-col :span="2">帖子内容:</el-col>
          <el-col :span="18">
           <el-input type="textarea" v-model="postInfoForm.code" rows="3" readonly></el-input> 
          </el-col>
        </el-row>
        <el-divider></el-divider>
         <el-row>
          <el-col :span="2">发布时间:</el-col>
          <el-col :span="10">{{ postInfoForm.createDate }}</el-col>
          <el-col :span="2">可见程度:</el-col>
          <el-col :span="9"> {{postInfoForm.visibility==1?'全部可见' : '自己可见'}} </el-col>
        </el-row>
        <el-divider></el-divider>
        <el-row>
          <el-col :span="12" >审核人:<span style="margin-left:16px;">{{ postInfoForm.auditUser }}</span></el-col>
           <el-col :span="8">审核时间:<span style="margin-left:4px;">{{ postInfoForm.updateDate}}</span></el-col>
         
        </el-row>
        
        <el-divider></el-divider>
      </el-form>
     
      <span slot="footer">
        <span v-if="postInfoForm.auditStatus == 0">
          <el-button
            type="primary"
            icon="el-icon-check"
            @click="passPostInfo()"
          
            >通过审核</el-button
          >
        </span>
        <span v-if="postInfoForm.auditStatus == 0">
          <el-button
            type="danger"
            icon="el-icon-close"
            @click="refusePostInfo(postInfoForm.id)"
           
            >拒绝审核</el-button
          >
        </span>
        <el-button type="info" icon="el-icon-close" @click="close" 
          >关闭</el-button
        >
      </span>
    </slot>
    <examine
      :show="refusePostInfoFlag"
      :refuseId="refuseId"
      title="审核驳回理由"
      @close="closerefuseDialog"
      @save="refuse"
    ></examine>
  </el-dialog>
</template>
<script>
import ApiPath from "@/api/ApiPath.js";
import api from "@/axios/api.js";
import examine from "./examine";
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
    transPostInfoId: {
      type: String,
    },
  },
  data() {
    return {
      labelPosition: "right",
      refusePostInfoFlag: false,
      refuseId: "",
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
        status: "",
        id: "",
        reason: "",
      },
      localShow: this.show,
    };
  },
  // 注册组件
  components: {
    examine,
  },
  watch: {
    show(val) {
      this.localShow = val;
    },
    transPostInfoId(val) {
      if(val == ""){
        return;
      }
      let params = {
        id: val,
      };
      //根据Id查询用户信息
      api.testAxiosGet(ApiPath.url.findPostInfoId, params).then((res) => {
        this.postInfoForm = res.data;
      });
    },
  },
  mounted() {},
  methods: {
    //审核通过
    passPostInfo: function () {
      let params = {
        postInfoEntity: this.postInfoForm,
      };
      api
        .testAxiosGet(ApiPath.url.passPostInfo, params)
        .then((res) => {
          let code = res.state;
          if (code == "0") {
            this.$message.success(res.message);
            this.close();
            this.reload();
          }
        })
        .catch(function (error) {});
      this.postInfoForm.auditUser = localStorage.getItem("userInfo");
    },
    //审核拒绝
    refusePostInfo(val) {
      this.refuseId = val;
      this.refusePostInfoFlag = true;
    },
    closerefuseDialog() {
      this.refusePostInfoFlag = false;
    },
    refuse() {
      this.refusePostInfoFlag = false;
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
  padding-left: 100px;
}
.table {
  height: 400px;
  width: 900px;
}
.el-divider--horizontal{
  width: 92%;
}
</style>