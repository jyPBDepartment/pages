<template>
  <el-dialog
    :visible.sync="localShow"
    :title="title"
    append-to-body
    modal-append-to-body
    width="1024.5px"
    :before-close="beforeClose"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
  >
    <slot>
      <table border="2" style="border-style: outset;" :data="agrForm" align="center" class="table">
        <tbody>
          <tr>
            <td class="title">标题名称</td>
            <td class="content" colspan="3">{{agrForm.name}}</td>
          </tr>
          <tr>
            <td class="title">图片</td>
            <td align="left">
              <span v-for="item in agrList" :key="item">
                <el-image style="width: 90px; height: 90px;margin:5px;" :src="item"></el-image>
              </span>
            </td>
            <td class="title">描述</td>
            <td class="content" style="width:340px;">{{agrForm.descrip}}</td>
          </tr>
          <tr>
            <td class="title">区域</td>
            <td class="content" colspan="3">{{agrForm.address}}</td>
          </tr>
          <tr>
            <td class="title">交易类型</td>
            <td class="content">
              <span v-if="agrForm.transactionTypeCode == '0'">收购</span>
              <span v-if="agrForm.transactionTypeCode == '1'">出售</span>
              <span v-if="agrForm.transactionTypeCode == '2'">出租</span>
            </td>
            <td class="title">机器型号</td>
            <td class="content">{{agrForm.model}}</td>
          </tr>

          <tr>
            <td class="title">价格</td>
            <td class="content">{{agrForm.price}}元</td>
            <td class="title">是否面议</td>
            <td class="content">
              <span v-if="agrForm.isFace == '0'">是</span>
              <span v-if="agrForm.isFace == '1'">否</span>
            </td>
          </tr>

          <tr>
            <td class="title">联系人</td>
            <td class="content">{{agrForm.contactsUser}}</td>
            <td class="title">联系方式</td>
            <td class="content">{{agrForm.contactsPhone}}</td>
          </tr>
          <tr>
            <td class="title">机器类型</td>
            <td class="content">
              <span v-if="agrForm.machineType == '0'">玉米收割机</span>
              <span v-if="agrForm.machineType == '1'">水稻收割机</span>
              <span v-if="agrForm.machineType == '2'">玉米播种机</span>
              <span v-if="agrForm.machineType == '3'">水稻插秧机</span>
              <span v-if="agrForm.machineType == '4'">无人机喷药</span>
            </td>
            <td class="title">购买时间</td>
            <td class="content">{{agrForm.purchaseDate}}</td>
          </tr>

          <tr>
            <td class="title">发布时间</td>
            <td class="content">{{agrForm.createDate}}</td>
            <td class="title">修改时间</td>
            <td class="content">{{agrForm.updateDate}}</td>
          </tr>
          <tr>
            <td class="title">发布人</td>
            <td class="content">{{agrForm.createUser}}</td>
            <td class="title">审核人</td>
            <td class="content">{{agrForm.updateUser}}</td>
          </tr>
          <tr>
            <td class="title">审核理由</td>
            <td colspan="3" class="content">
              <span v-if="agrForm.status == '0'">
                <el-input v-model="agrForm.examineReason" type="textarea" size="small"></el-input>
              </span>
              <span v-if="agrForm.status == '1' || agrForm.status=='2'">
                <el-input v-model="agrForm.examineReason" type="textarea" disabled size="small"></el-input>
              </span>
            </td>
          </tr>
        </tbody>
      </table>
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