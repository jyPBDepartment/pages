<template>
  <el-dialog
    :visible.sync="localShow"
    :title="title"
    append-to-body
    modal-append-to-body
    width="800px"
    :before-close="beforeClose"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
  >
    <slot>
      <el-form :model="agrForm" ref="agrForm" :label-position="labelPosition" label-width="100px" style="margin-left:-85px">
        <el-row>
          <el-col :span="3">标题名称：</el-col>
          <el-col :span="9">{{agrForm.name}}</el-col>
          <el-col :span="3">交易类型：</el-col>
          <el-col :span="6">
              <span v-if="agrForm.transactionTypeCode == '0'">收购</span>
              <span v-if="agrForm.transactionTypeCode == '1'">出售</span>
              <span v-if="agrForm.transactionTypeCode == '2'">出租</span></el-col>
        </el-row>
        <el-divider></el-divider>
         <el-row>
          <el-col :span="3">图片：</el-col>
          <el-col :span="18"><span v-for="item in agrList" :key="item">
                <el-image style="width: 90px; height: 90px;margin:5px;" :src="item"></el-image>
              </span></el-col>
        </el-row>
        <el-divider></el-divider>
        <el-row>
          <el-col :span="3">描述：</el-col>
          <el-col :span="18">
            <span>
              <el-input type="textarea" v-model="agrForm.descrip" rows="3" readonly></el-input>
            </span>
          </el-col>
        </el-row>
        <el-divider></el-divider>
        <el-row>
          <el-col :span="3">区域：</el-col>
          <el-col :span="18"><span>{{agrForm.address}}</span></el-col>
        </el-row>
        <el-divider></el-divider>
        <el-row>
          <el-col :span="3">机器类型：</el-col>
          <el-col :span="9">
            <span v-if="agrForm.machineType == '0'">玉米收割机</span>
            <span v-if="agrForm.machineType == '1'">水稻收割机</span>
            <span v-if="agrForm.machineType == '2'">玉米播种机</span>
            <span v-if="agrForm.machineType == '3'">水稻插秧机</span>
            <span v-if="agrForm.machineType == '4'">无人机喷药</span>
          </el-col>
          <el-col :span="3">机器型号：</el-col>
          <el-col :span="6">{{agrForm.model}}</el-col>
        </el-row>
        <el-divider></el-divider>
        <el-row>
          <el-col :span="3">是否面议：</el-col>
          <el-col :span="9">
              <span v-if="agrForm.isFace == '0'">是</span>
              <span v-if="agrForm.isFace == '1'">否</span>
          </el-col>
          <span v-if="agrForm.isFace == '1'">
              <el-col :span="3">价格：</el-col>
              <el-col :span="6">{{agrForm.price}}元</el-col>          
          </span>
        </el-row>
        <el-divider></el-divider>
        <el-row>
          <el-col :span="3">联系人：</el-col>
          <el-col :span="9">{{agrForm.contactsUser}}</el-col>
          <el-col :span="3">联系方式：</el-col>
          <el-col :span="6">{{agrForm.contactsPhone}}</el-col>
        </el-row>
        <el-divider></el-divider>
        <el-row>
          <el-col :span="3">购买时间：</el-col>
          <el-col :span="9">{{agrForm.purchaseDate}}</el-col>   
          <el-col :span="3">发布时间：</el-col>
          <el-col :span="6"><span>{{agrForm.createDate}}</span></el-col>
        </el-row>
        <el-divider></el-divider>
        <el-row>
          <el-col :span="12">审核人：<span style="margin-left:37px">{{agrForm.updateUser}}</span></el-col>
          <el-col :span="10">审核时间：<span style="margin-left:22px">{{agrForm.updateDate}}</span></el-col>
        </el-row>
        <el-divider></el-divider>
      </el-form>
    </slot>
    <span slot="footer">
      <span v-if="agrForm.status == '0' ">
        <el-button type="success" icon="el-icon-check" @click="updateStatus()">审核通过</el-button>
      </span>
      <span v-if="agrForm.status == '0' ">
        <el-button type="danger" icon="el-icon-close" @click="examine(agrForm.id)">审核驳回</el-button>
      </span>
      <el-button type="info" icon="el-icon-close" @click="close">关闭</el-button>
    </span>
     <examine
      :show="examineFlag"
      :examineId="examineId"
      title="信息审核"
      @close="closeUpdateExamineDialog"
    ></examine>
  </el-dialog>
</template>
<script>
import qs from "qs";
import Vue from "vue";
import ApiPath from "@/api/ApiPath.js";
import api from "@/axios/api.js";
import examine from '@/views/Agricultural/examine'

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
    machineContentId: {
      type: String,
    },
  },
  data() {
    return {
      labelPosition: "right",
      localShow: this.show,
      examineFlag: false,
      examineId: "",
      agrForm: {
        status: "",
        examineReason: "",
        name: "",
        transactionTypeCode: "",
        descrip: "",
        address: "",
        machineType: "",
        model: "",
        isFace: "",
        price: "",
        contactsUser: "",
        contactsPhone: "",
        purchaseDate: "",
        createDate: "",
        updateUser: "",
        updateDate: ""
      },
      agrList: [],
    };
  },
  watch: {
    show(val) {
      this.localShow = val;
    },
    //根据Id查询用户信息
    machineContentId(val) {
      if(val == ""){
        return;
      }
      let params = {
        id: val,
      };
      api.testAxiosGet(ApiPath.url.agriFindById, params).then((res) => {
        if (res.state == 0) {
          this.agrForm = res.data;
           for(let i=0;i<res.data1.length;i++){
            this.agrList[i] = res.data1[i].picUrl;
           }
        }
      });
    },
  },
   components: {
    examine
  },
  methods: {
    // 查看详情
    examine(val) {
      this.examineFlag = true;
      this.examineId = val;
    },
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
        }
      });
      this.agrForm.updateUser = localStorage.getItem("userInfo");
    },
  
    close: function () {
      this.$emit("close");
      this.agrList = [];
    },
     closeUpdateExamineDialog() {
      this.examineFlag = false;
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
  width: 100%;
}
.el-input__inner {
  border: 0px solid #fff !important;
}
.table {
  height: 600px;
  width: 900px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.2)
}
.title {
  width: 100px;
  text-align: center;
}
.content {
  text-align: center;
}
</style>