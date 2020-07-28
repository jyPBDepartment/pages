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
        :rules="rules"
        ref="agrForm"
        :model="agrForm"
        label-width="100px"
        :label-position="labelPosition"
      >
        <el-form-item label="标题名称">
          <el-input type="text" v-model="agrForm.name" readonly></el-input>
        </el-form-item>
        <el-form-item label="描述">
          <el-input type="textarea" v-model="agrForm.descrip" readonly></el-input>
        </el-form-item>
        <!-- <el-form-item label="农服交易类型">
          <el-input type="text" v-model="agrForm.transactionTypeCode" readonly></el-input>
          <el-alert title="注：0.收购1.出售2.出租3.播种4.植保5.收割" type="success"></el-alert>
        </el-form-item>-->
        <el-form-item label="交易类型"></el-form-item>
        <el-radio-group
          v-model="agrForm.transactionTypeCode"
          style="padding-bottom:5px;padding-left:98px;margin-top:-84px;"
          disabled
        >
          <el-radio label="0" style="padding-bottom:10px">收购</el-radio>
          <el-radio label="1" style="padding-bottom:10px">出售</el-radio>
          <el-radio label="2">出租</el-radio>
          <el-radio label="3">播种</el-radio>
          <el-radio label="4">植保</el-radio>
          <el-radio label="5">收割</el-radio>
        </el-radio-group>
        <!--  <el-form-item label="农服交易类别">
          <el-input type="text" v-model="agrForm.transactionCategoryCode" readonly></el-input>
          <el-alert title="注：0.玉米1.农机2.水稻" type="success"></el-alert>
        </el-form-item>-->
        <el-form-item label="交易类别"></el-form-item>
        <el-radio-group
          v-model="agrForm.transactionCategoryCode"
          style="padding-bottom:5px;padding-left:98px;margin-top:-84px;"
          disabled
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
        <el-form-item label="机器类型">
          <el-input type="text" v-model="agrForm.machineType" readonly></el-input>
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
          <el-date-picker v-model="agrForm.purchaseDate" type="datetime" readonly></el-date-picker>
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
        <!-- <el-form-item label="审核状态" prop="status">
          <el-input type="text" v-model="agrForm.status"></el-input>
          <el-alert title="注：0.待审核1.审核通过2.审核拒绝3.预约中4.已完成;拒绝需写拒绝理由！" type="warning"></el-alert>
        </el-form-item>-->

        <el-form-item label="审核拒绝理由">
          <el-input type="textarea" v-model="agrForm.examineReason"></el-input>
        </el-form-item>
      </el-form>
    </slot>
    <span slot="footer">
      <el-button type="success" icon="el-icon-check" @click="updateStatus('1')">审核通过</el-button>
      <el-button type="danger" icon="el-icon-close" @click="updateStatus('2')">拒绝审核</el-button>
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
      agrForm: {},
      // rules表单验证
      rules: {
        status: [
          { required: true, message: "请输入审核状态", trigger: "blur" },
        ],
      },
    };
  },
  watch: {
    show(val) {
      this.localShow = val;
    },
    agrContentId(val) {
      let params = {
        id: val,
      };
      //根据Id查询用户信息
      api.testAxiosGet(ApiPath.url.agriFindById, params).then((res) => {
        if (res.state == 0) {
          this.agrForm = res.data;
        }
      });
    },
  },
  methods: {
    //审核通过
    updateStatus: function (val) {
      if (val == "2") {
        if (
          this.agrForm.examineReason == "" ||
          this.agrForm.examineReason == null
        ) {
          this.$alert("请填写拒绝理由！", "提示", {
            confirmButtonText: "确定",
          });
          return false;
        }
      }
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
    
    //修改农服信息
    // updateStatus: function () {
    //   let params = {
    //     agriculturalEntity: this.agrForm,
    //   };
    //   api
    //     .testAxiosGet(ApiPath.url.updateStatus, params)
    //     .then((res) => {
    //       if (
    //         this.agrForm.status == "2" &&
    //         (this.agrForm.examineReason == "" ||
    //           this.agrForm.examineReason == null)
    //       ) {
    //         this.$alert("审核状态为拒绝时必须如实填写拒绝理由！", "提示", {
    //           confirmButtonText: "确定",
    //         });
    //       } else {
    //         this.$message.success(res.message);
    //         this.reload();
    //         this.close();
    //       }
    //     })
    //     .catch((err) => {
    //       this.$message.error(err.data);
    //     });
    // },
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