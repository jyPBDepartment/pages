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
      <el-form  :model="agrForm" label-width="100px" >
        <el-form-item label="标题名称">
          <el-input type="text" v-model="agrForm.name"  readonly></el-input>
        </el-form-item>
        <el-form-item label="描述">
          <el-input type="textarea" v-model="agrForm.descrip" readonly ></el-input>
        </el-form-item>
        <el-form-item label="农服交易类型">
          <el-input type="text" v-model="agrForm.transactionTypeCode"  readonly></el-input>
        </el-form-item>
        <el-form-item label="农服交易类别">
          <el-input type="text" v-model="agrForm.transactionCategoryCode"  readonly></el-input>
        </el-form-item>
        <el-form-item label="收购价格(¥)">
          <el-input type="text" v-model="agrForm.purchasingPrice"  readonly></el-input>
        </el-form-item>
        <el-form-item label="收购区域">
          <el-input type="text" v-model="agrForm.purchasingArea"  readonly></el-input>
        </el-form-item>
        <el-form-item label="出售价格">
          <el-input type="text" v-model="agrForm.sellingPrice"  readonly></el-input>
        </el-form-item>
        <el-form-item label="出售区域">
          <el-input type="text" v-model="agrForm.sellingArea"  readonly></el-input>
        </el-form-item>
        <el-form-item label="联系人">
          <el-input type="text" v-model="agrForm.contactsUser" readonly></el-input>
        </el-form-item>
        <el-form-item label="联系方式">
          <el-input type="text" v-model="agrForm.contactsPhone"  readonly></el-input>
        </el-form-item>
        <el-form-item label="图片">
            <el-image
                style="width: 100px; height: 100px"
                :src="agrForm.url"
                readonly
                ></el-image>
          <!-- <el-input type="text" v-model="agrForm.url"  ></el-input> -->
        </el-form-item>
        <el-form-item label="机器类型">
          <el-input type="text" v-model="agrForm.machineType"  readonly></el-input>
        </el-form-item>
        <el-form-item label="型号">
          <el-input type="text" v-model="agrForm.model"  readonly></el-input>
        </el-form-item>
        <el-form-item label="货号">
          <el-input type="text" v-model="agrForm.articleNumber"  readonly></el-input>
        </el-form-item>
        <el-form-item label="标签编码">
          <el-input type="text" v-model="agrForm.labelCode"  readonly></el-input>
        </el-form-item>
        <el-form-item label="购买时间">
           <el-date-picker v-model="agrForm.purchaseDate" type="datetime" readonly></el-date-picker>
          <!-- <el-input type="text" v-model="agrForm.purchaseDate"  readonly></el-input> -->
        </el-form-item>
        <el-form-item label="状态" >
          <el-input type="text" v-model="agrForm.status"  readonly></el-input>
        </el-form-item>
        <el-form-item label="发布时间">
           <el-date-picker v-model="agrForm.createDate" type="datetime" readonly></el-date-picker>
          <!-- <el-input type="text" v-model="agrForm.createDate" readonly></el-input> -->
        </el-form-item>
        <el-form-item label="修改时间">
            <el-date-picker v-model="agrForm.updateDate" type="datetime" readonly></el-date-picker>
          <!-- <el-input type="text" v-model="" readonly></el-input> -->
        </el-form-item>
        <el-form-item label="发布人">
          <el-input type="text" v-model="agrForm.createUser"  readonly></el-input>
        </el-form-item>
        <el-form-item label="审核人">
          <el-input type="text" v-model="agrForm.updateUser"  readonly></el-input>
        </el-form-item>
      </el-form>
    </slot>
    <span slot="footer">
      <el-button icon="el-icon-close" @click="close">关闭</el-button>
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
      agrForm: {
        
      },
    };
  },
  watch: {
    show(val) {
      this.localShow = val;
    },
    agrContentId(val) {
      let params = {
        id: val
      };
      //根据Id查询用户信息
      api.testAxiosGet(ApiPath.url.agriFindById, params).then(res => {
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