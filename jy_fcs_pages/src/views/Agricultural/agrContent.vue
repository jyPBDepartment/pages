<template slot-scope="scope">
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
      <table border="2" :data="agrForm" align="center" class="table">
        <tbody>
          <tr>
            <td class="title">标题名称</td>
            <td class="content" colspan="3">{{ agrForm.name }}</td>
          </tr>
          <tr>
            <td class="title">图片</td>
            <td align="left">
              <span v-for="item in agrList" :key="item">
                <el-image
                  style="width: 90px;  height: 90px; margin: 5px"
                  :src="item"
                  readonly
                ></el-image>
              </span>
            </td>
            <td class="title">描述</td>
            <td class="content" style="width: 340px">{{ agrForm.descrip }}</td>
          </tr>
          <tr>
            <td class="title">开始时间</td>
            <td class="content">{{ agrForm.beginDate }}</td>
            <td class="title">结束时间</td>
            <td class="content">{{ agrForm.endDate }}</td>
          </tr>

          <tr>
            <td class="title">天数</td>
            <td class="content">{{ agrForm.days }}天</td>
            <td class="title">价格</td>
            <td class="content">{{ agrForm.price }}元</td>
          </tr>

          <tr>
            <td class="title">交易类型</td>
            <td class="content">
              <span v-if="agrForm.transactionTypeCode == '3'">播种</span>
              <span v-if="agrForm.transactionTypeCode == '4'">植保</span>
              <span v-if="agrForm.transactionTypeCode == '5'">收割</span>
            </td>
            <td class="title">交易类别</td>
            <td class="content">
              <span v-if="agrForm.transactionCategoryCode == '0'">玉米</span>
              <span v-if="agrForm.transactionCategoryCode == '2'">水稻</span>
              <span v-if="agrForm.transactionCategoryCode == '3'">高粱</span>
              <span v-if="agrForm.transactionCategoryCode == '4'">黄豆</span>
            </td>
          </tr>
          <tr>
            <td class="title">农机台数</td>
            <td class="content">{{ agrForm.machineNum }}台</td>
            <td class="title">干活地点</td>
            <td class="content">{{ agrForm.address }}</td>
          </tr>
          <tr>
            <td class="title">农活方式</td>
            <td class="content">
              <span v-if="agrForm.farmingMode == '0'">整活</span>
              <span v-if="agrForm.farmingMode == '1'">零活</span>
            </td>
            <td class="title">是否面议</td>
            <td class="content">
              <span v-if="agrForm.isFace == '0'">是</span>
              <span v-if="agrForm.isFace == '1'">否</span>
            </td>
          </tr>
          <tr>
            <td class="title">联系人</td>
            <td class="content">{{ agrForm.contactsUser }}</td>
            <td class="title">联系方式</td>
            <td class="content">{{ agrForm.contactsPhone }}</td>
          </tr>
          <tr>
            <td class="title">发布时间</td>
            <td class="content">{{ agrForm.createDate }}</td>
            <td class="title">修改时间</td>
            <td class="content">{{ agrForm.updateDate }}</td>
          </tr>
          <tr>
            <td class="title">发布人</td>
            <td class="content">{{ agrForm.createUser }}</td>
            <td class="title">审核人</td>
            <td class="content">{{ agrForm.updateUser }}</td>
          </tr>
          <tr>
            <td class="title">审核理由</td>
            <td colspan="3" class="content">
              {{ agrForm.examineReason }}
            </td>
          </tr>
        </tbody>
      </table>
    </slot>
    <span slot="footer" >
      <span v-if="agrForm.status == '0'">
        <el-button type="success" icon="el-icon-check" @click="updateStatus()"
          >审核通过</el-button
        >
      </span>
      <span v-if="agrForm.status == '0'" >
        <el-button  type="danger" icon="el-icon-close" @click="examine(agrForm.id)"
          >审核驳回</el-button
        >
      </span>

      <el-button type="info" icon="el-icon-close" @click="close"
        >关闭</el-button
      >
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
          this.reload();
        }
      });
      this.agrForm.updateUser = localStorage.getItem("userInfo");
    },
    
    close: function () {
      this.reload();
      this.$emit("close");
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