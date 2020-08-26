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
        <el-form-item label="标题名称">
          <el-input type="text" v-model="agrForm.name" readonly></el-input>
        </el-form-item>
        <el-form-item label="描述">
          <el-input type="textarea" v-model="agrForm.descrip" :rows="3" readonly></el-input>
        </el-form-item>

        <el-form-item label="交易类型"></el-form-item>
        <el-radio-group
          v-model="agrForm.transactionTypeCode"
          style="padding-bottom:5px;padding-left:98px;margin-top:-84px;"
          
        >
          <el-radio label="0" style="padding-bottom:10px">收购</el-radio>
          <el-radio label="1" style="padding-bottom:10px">出售</el-radio>
          <el-radio label="2">出租</el-radio>
          <el-radio label="3">播种</el-radio>
          <el-radio label="4">植保</el-radio>
          <el-radio label="5">收割</el-radio>
        </el-radio-group>

        <el-form-item label="交易类别"></el-form-item>
        <el-radio-group
          v-model="agrForm.transactionCategoryCode"
          style="padding-bottom:5px;padding-left:98px;margin-top:-84px;"
          
        >
          <el-radio label="0">玉米</el-radio>
          <el-radio label="1">农机</el-radio>
          <el-radio label="2">水稻</el-radio>
        </el-radio-group>
        <el-form-item label="收购价格(¥)">
          <el-input type="text" v-model="agrForm.purchasingPrice" readonly></el-input>
        </el-form-item>
        <el-form-item label="收购区域">
          <el-input type="text" v-model="agrForm.purchasingArea" readonly></el-input>
        </el-form-item>
        <el-form-item label="出售价格">
          <el-input type="text" v-model="agrForm.sellingPrice" readonly></el-input>
        </el-form-item>
        <el-form-item label="出售区域">
          <el-input type="text" v-model="agrForm.sellingArea" readonly></el-input>
        </el-form-item>
        <el-form-item label="联系人">
          <el-input type="text" v-model="agrForm.contactsUser" readonly></el-input>
        </el-form-item>
        <el-form-item label="联系方式">
          <el-input type="text" v-model="agrForm.contactsPhone" readonly></el-input>
        </el-form-item>
        <el-form-item label="图片">
          <el-image style="width: 100px; height: 100px" :src="agrForm.url" readonly></el-image>
        </el-form-item>
        <el-form-item label="机器类型:">
         <span v-if="agrForm.machineType==0">玉米收割机</span>
        <span v-if="agrForm.machineType==1">水稻收割机</span>
        <span v-if="agrForm.machineType==2">玉米播种机</span>
        <span v-if="agrForm.machineType==3">水稻插秧机</span>
        <span v-if="agrForm.machineType==4">无人机喷药</span>

        </el-form-item>
        <el-form-item label="型号">
          <el-input type="text" v-model="agrForm.model" readonly></el-input>
        </el-form-item>
        <el-form-item label="货号">
          <el-input type="text" v-model="agrForm.articleNumber" readonly></el-input>
        </el-form-item>
        <el-form-item label="标签编码">
          <el-input type="text" v-model="agrForm.labelCode" readonly></el-input>
        </el-form-item>
        <el-form-item label="购买时间">
          <el-date-picker v-model="agrForm.purchaseDate" type="date" readonly></el-date-picker>
        </el-form-item>
        <el-form-item label="发布时间">
          <el-date-picker v-model="agrForm.createDate" type="datetime" readonly></el-date-picker>
        </el-form-item>
        <el-form-item label="修改时间">
          <el-date-picker v-model="agrForm.updateDate" type="datetime" readonly></el-date-picker>
        </el-form-item>
        <el-form-item label="发布人">
          <el-input type="text" v-model="agrForm.createUser" readonly></el-input>
        </el-form-item>
        <el-form-item label="审核人">
          <el-input type="text" v-model="agrForm.updateUser" readonly></el-input>
        </el-form-item>
        <el-form-item label="干活开始时间">
          <el-date-picker v-model="agrForm.beginDate" type="date" readonly></el-date-picker>
        </el-form-item>
        <el-form-item label="干活结束时间">
          <el-date-picker type="date" v-model="agrForm.endDate" readonly></el-date-picker>
        </el-form-item>
        <el-form-item label="农机台数">
          <el-input type="text" v-model="agrForm.machineNum" readonly></el-input>
        </el-form-item>
        <el-form-item label="是否面议">
          <el-radio-group
            v-model="agrForm.isFace"
          >
            <el-radio label="0">是</el-radio>
            <el-radio label="1">否</el-radio>
           </el-radio-group>
        </el-form-item>
        <el-form-item label="农活类型">
           <el-radio-group
            v-model="agrForm.farmingMode"
          >
            <el-radio label="0">整活</el-radio>
            <el-radio label="1">零活</el-radio>
           </el-radio-group>
         
        </el-form-item>
        <el-form-item label="农活价格">
          <el-input type="text" v-model="agrForm.agriPrice" readonly></el-input>
        </el-form-item>
        <el-form-item label="干活地点">
          <el-input type="text" v-model="agrForm.workArea" readonly></el-input>
        </el-form-item>
        <el-form-item label="天数">
          <el-input type="text" v-model="agrForm.days" readonly></el-input>
        </el-form-item>
      </el-form>
    </slot>
    <span slot="footer">
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
    agrContentId: {
      type: String,
    },
  },
  data() {
    return {
      labelPosition: "right",
      localShow: this.show,
      agrForm: {},
    };
  },
  watch: {
    show(val) {
      this.localShow = val;
    },
    //根据Id查询用户信息
    agrContentId(val) {
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