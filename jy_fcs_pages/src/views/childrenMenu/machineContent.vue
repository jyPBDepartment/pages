<template>
  <el-dialog
    :visible.sync="localShow"
    :title="title"
    append-to-body
    modal-append-to-body
    width="60%"
    :before-close="beforeClose"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
  >
    <slot>
      <el-form ref="agrForm" :model="agrForm" label-width="100px" :label-position="labelPosition">
        <el-row :gutter="60">
          <el-col :span="10">
            <el-form-item label="标题名称:" class="tableType">
              <span>{{agrForm.name}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="描述:" class="tableType">
              <span>{{agrForm.descrip}}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="图片:">
          <span v-for="item in agrList" :key="item">
            <el-image style="width: 100px; height: 100px;margin-right:15px;" :src="item" readonly></el-image>
          </span>
        </el-form-item>
        <el-row :gutter="60">
          <el-col :span="10">
            <el-form-item label="交易类型:">
              <span v-if="agrForm.transactionTypeCode == '0'" >收购</span>
              <span v-if="agrForm.transactionTypeCode == '1'" >出售</span>
              <span v-if="agrForm.transactionTypeCode == '2'" >出租</span>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="机器型号:">
              <span>{{agrForm.model}}</span>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="60">
          <el-col :span="10">
            <el-form-item label="价格:">
              <span>{{agrForm.price}}元</span>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="是否面议:">
              <span v-if="agrForm.isFace == '0'" >是</span>
              <span v-if="agrForm.isFace == '1'" >否</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="60">
          <el-col :span="10">
            <el-form-item label="联系人:">
              <span>{{agrForm.contactsUser}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="联系方式:">
              <span>{{agrForm.contactsPhone}}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="60">
          <el-col :span="10">
            <el-form-item label="区域:">
              <span>{{agrForm.address}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="购买时间:">
              <span>{{agrForm.purchaseDate}}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="60">
          <el-col :span="10">
            <el-form-item label="机器类型:">
              <span v-if="agrForm.machineType == '0'" >玉米收割机</span>
              <span v-if="agrForm.machineType == '1'" >水稻收割机</span>
              <span v-if="agrForm.machineType == '2'" >玉米播种机</span>
              <span v-if="agrForm.machineType == '3'" >水稻插秧机</span>
              <span v-if="agrForm.machineType == '4'" >无人机喷药</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="60">
          <el-col :span="10">
            <el-form-item label="发布时间:">
              <span>{{agrForm.createDate}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="修改时间:">
              <span>{{agrForm.updateDate}}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="60">
          <el-col :span="10">
            <el-form-item label="发布人:">
              <span>{{agrForm.createUser}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="审核人:">
              <span>{{agrForm.updateUser}}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="30">
          <el-form-item label="审核理由:" style="width: 60%; padding-left: 15px;">
            <span v-if="agrForm.status == '0'">
              <el-input v-model="agrForm.examineReason" type="textarea" size="small"></el-input>
            </span>
            <span
              v-if="agrForm.status == '1' || agrForm.status=='2'"
            >
              <el-input v-model="agrForm.examineReason" type="textarea" disabled size="small"></el-input>
            </span>
          </el-form-item>
        </el-row>
      </el-form>
    </slot>
    <span slot="footer">
      <span v-if="agrForm.status == '0' ">
        <el-button type="success" icon="el-icon-check" @click="updateStatus()">审核通过</el-button>
      </span>
      <span v-if="agrForm.status == '0' ">
        <el-button type="danger" icon="el-icon-close" @click="refusePostInfo()">审核驳回</el-button>
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
    machineContentId: {
      type: String,
    },
  },
  data() {
    return {
      labelPosition: "right",
      localShow: this.show,
      agrForm: {
        status: "",
        examineReason: "",
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
      let params = {
        id: val,
      };
      api.testAxiosGet(ApiPath.url.agriFindById, params).then((res) => {
        if (res.state == 0) {
          this.agrForm = res.data;
          this.agrList = res.data1;
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
  width: 100%;
}
.el-input__inner {
  border: 0px solid #fff !important;
}
</style>