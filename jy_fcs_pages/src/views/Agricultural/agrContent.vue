<template slot-scope="scope">
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
      <el-form :model="agrForm" ref="agrForm" :label-position="labelPosition" label-width="100px" style="margin-left: -85px">
        <el-row>
          <el-col :span="3">标题名称：</el-col>
          <el-col :span="8">{{ agrForm.name }}</el-col>
        </el-row>
        <el-divider></el-divider>
        <el-row>
          <el-col :span="3">交易类型：</el-col>
          <el-col :span="9">
            <span v-if="agrForm.transactionTypeCode == '3'">播种</span>
            <span v-if="agrForm.transactionTypeCode == '4'">植保</span>
            <span v-if="agrForm.transactionTypeCode == '5'">收割</span>
          </el-col>
          <el-col :span="3">交易类别：</el-col>
          <el-col :span="6">
            <span v-if="agrForm.transactionCategoryCode == '0'">玉米</span>
            <span v-if="agrForm.transactionCategoryCode == '2'">水稻</span>
            <span v-if="agrForm.transactionCategoryCode == '3'">高粱</span>
            <span v-if="agrForm.transactionCategoryCode == '4'">黄豆</span>
          </el-col>
        </el-row>
        <el-divider></el-divider>
        <el-row>
          <el-col :span="3">图片：</el-col>
          <el-col :span="18">
            <span v-for="item in agrList" :key="item">
              <el-image style="width: 90px;  height: 90px; margin: 5px" :src="item"></el-image>
            </span>
          </el-col>
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
          <el-col :span="3">开始时间：</el-col>
          <el-col :span="9">{{ agrForm.beginDate }}</el-col>
          <el-col :span="3">结束时间：</el-col>
          <el-col :span="6">{{ agrForm.endDate }}</el-col>
        </el-row>
        <el-divider></el-divider>
        <el-row>
          <el-col :span="3">天数：</el-col>
          <el-col :span="9">{{ agrForm.days }}</el-col>
          <el-col :span="3">农活方式：</el-col>
          <el-col :span="6">
            <span v-if="agrForm.farmingMode == '0'">整活</span>
            <span v-if="agrForm.farmingMode == '1'">零活</span>
          </el-col>
        </el-row>
        <el-divider></el-divider>
        <el-row>
          <el-col :span="3">干活地点：</el-col>
          <el-col :span="18"><span>{{ agrForm.address }}</span></el-col>
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
            <el-col :span="6">{{ agrForm.price }} 元</el-col>
          </span>
        </el-row>
        <el-divider></el-divider>
        <el-row>
          <el-col :span="3">联系人：</el-col>
          <el-col :span="9">{{ agrForm.contactsUser }}</el-col>
          <el-col :span="3">联系方式：</el-col>
          <el-col :span="6">{{ agrForm.contactsPhone }}</el-col>
        </el-row>
        <el-divider></el-divider>
        <el-row>
          <el-col :span="3">农机台数：</el-col>
          <el-col :span="9">{{ agrForm.machineNum }}</el-col>
          <el-col :span="3">发布时间：</el-col>
          <el-col :span="6"><span>{{ agrForm.createDate }}</span></el-col>
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
      <span v-if="agrForm.status == '0'">
        <el-button type="success" icon="el-icon-check" @click="updateStatus()">审核通过</el-button>
      </span>
      <span v-if="agrForm.status == '0'">
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
import examine from "@/views/Agricultural/examine";

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
      examineFlag: false,
      examineId: "",
      localShow: this.show,
      agrForm: {
        status: "",
        examineReason: "",
        name: "",
        transactionTypeCode: "",
        transactionCategoryCode: "",
        descrip: "",
        beginDate: "",
        endDate: "",
        days: "",
        farmingMode: "",
        address: "",
        isFace: "",
        price: "",
        contactsUser: "",
        contactsPhone: "",
        machineNum: "",
        createDate: "",
        updateUser: "",
        updateDate: "",
      },
      agrList: [],
    };
  },
  watch: {
    show(val) {
      this.localShow = val;
    },
    //根据Id查询用户信息
    agrContentId(val) {
      if (val == "") {
        return;
      }
      let params = {
        id: val,
      };
      api.testAxiosGet(ApiPath.url.agriFindById, params).then((res) => {
        if (res.state == 0) {
          this.agrForm = res.data;
          for (let i = 0; i < res.data1.length; i++) {
            this.agrList[i] = res.data1[i].picUrl;
          }
        }
      });
    },
  },
  components: {
    examine,
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
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.2);
}
.title {
  width: 100px;
  text-align: center;
}
.content {
  text-align: center;
}
</style>