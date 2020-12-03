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
      <el-form
        :model="agrForm"
        ref="agrForm"
        :label-position="labelPosition"
        label-width="100px"
        style="margin-left: -55px"
      >
        <el-row>
          <el-col :span="3">标题名称:</el-col>
          <el-col :span="9">{{ agrForm.name }}</el-col>
        </el-row>
        <el-divider></el-divider>
        <el-row>
          <el-col :span="3">图片:</el-col>
          <el-col :span="9">
            <span v-for="item in agrList" :key="item">
              <el-image
                style="width: 90px;  height: 90px; margin: 5px"
                :src="item"
                readonly
              ></el-image>
            </span>
          </el-col>
        </el-row>
        <el-divider></el-divider>
        <el-row>
          <el-col :span="3">描述:</el-col>
          <el-col :span="16">
            <el-input
              v-model="agrForm.descrip"
              type="textarea"
              rows="3"
              readonly
            ></el-input>
          </el-col>
        </el-row>
        <el-divider></el-divider>
        <el-row>
          <el-col :span="3">区域:</el-col>
          <el-col :span="9">{{ agrForm.address }}</el-col>
          <el-col :span="3">交易类型:</el-col>
          <el-col :span="9">
            {{ agrForm.transactionTypeCode == "0" ? "收购" : "出售" }}
          </el-col>
        </el-row>
        <el-divider></el-divider>
        <el-row>
          <el-col :span="3">交易类别:</el-col>
          <el-col :span="9">
            <span v-if="agrForm.transactionCategoryCode == '0'">玉米</span>
            <span v-if="agrForm.transactionCategoryCode == '2'">水稻</span>
            <span v-if="agrForm.transactionCategoryCode == '3'">高粱</span>
            <span v-if="agrForm.transactionCategoryCode == '4'">黄豆</span>
          </el-col>
          <el-col :span="3">是否面议:</el-col>
          <el-col :span="9">{{ agrForm.isFace == "1" ? "否" : "是" }} </el-col>
        </el-row>
        <el-divider></el-divider>
        <el-row v-if="agrForm.isFace == '1'">
          <el-col :span="3">价格:</el-col>
          <el-col :span="9">{{ agrForm.price }}元</el-col>
        </el-row>
        <el-divider v-if="agrForm.isFace == '1'"></el-divider>
        <el-row>
          <el-col :span="3">联系人:</el-col>
          <el-col :span="9">{{ agrForm.contactsUser }}</el-col>
          <el-col :span="3">联系方式:</el-col>
          <el-col :span="9">
            {{ agrForm.contactsPhone }}
          </el-col>
        </el-row>
        <el-divider></el-divider>
        <el-row>
          <el-col :span="3">发布时间:</el-col>
          <el-col :span="9">{{ agrForm.createDate }}</el-col>
          <el-col :span="3">审核人:</el-col>
          <el-col :span="9">
            {{ agrForm.updateUser }}
          </el-col>
        </el-row>
        <el-divider></el-divider>
        <el-row>
          <el-col :span="3">审核时间:</el-col>
          <el-col :span="9">
            {{ agrForm.updateDate }}
          </el-col>
        </el-row>
        <el-divider></el-divider>
      </el-form>
    </slot>
    <span slot="footer">
      <span v-if="agrForm.status == '0'">
        <el-button type="success" icon="el-icon-check" @click="updateStatus()"
          >审核通过</el-button
        >
      </span>
      <span v-if="agrForm.status == '0'">
        <el-button
          type="danger"
          icon="el-icon-close"
          @click="examine(agrForm.id)"
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
    cornContentId: {
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
        name:'',
        descrip:'',
        address:'',
        transactionTypeCode:'',
        transactionCategoryCode:'',
        isFace:'',
        price:'',
        contactsUser:'',
        contactsPhone:'',
        updateUser:'',
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
    cornContentId(val) {
      if(val == ""){
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
      this.agrList=[];
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
.el-divider--horizontal {
  width: 93%;
}
</style>