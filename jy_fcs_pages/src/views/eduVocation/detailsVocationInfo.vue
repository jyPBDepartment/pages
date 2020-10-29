<template>
  <el-dialog
    :visible.sync="localShow"
    :title="title"
    :before-close="beforeClose"
    append-to-body
    modal-append-to-body
    width="700px"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
  >
    <!-- 插槽区 -->
    <slot>
      <el-form :model="editForm" :label-position="labelPosition" label-width="100px" >
        <el-row>
          <el-col :span="4">职业类别名称:</el-col>
          <el-col :span="4">{{editForm.name}}</el-col>
          <el-col :span="3">职业编码:</el-col>
          <el-col :span="5">{{editForm.vocationCode}}</el-col>
          <el-col :span="3">状态:</el-col>
          <el-col :span="3">
            <span v-if="editForm.status == '0'">启用</span>
            <span v-if="editForm.status == '1'">禁用</span>
          </el-col>
        </el-row>
        <el-divider></el-divider>
        <el-row>
          <el-col :span="4">创建人:</el-col>
          <el-col :span="9">{{editForm.createBy}}</el-col>
          <el-col :span="3">创建时间:</el-col>
          <el-col :span="6">{{editForm.createDate}}</el-col>
        </el-row>
        <el-divider></el-divider>
        <el-row>
          <el-col :span="4">修改人:</el-col>
          <el-col :span="9">{{editForm.updateBy}}</el-col>
          <el-col :span="3">修改时间:</el-col>
          <el-col :span="6">{{editForm.updateDate}}</el-col>
        </el-row>
        <el-divider></el-divider>
        <el-row>
          <el-col :span="4">描述:</el-col>
          <el-col :span="18">{{editForm.description}}</el-col>
        </el-row>
        <el-divider></el-divider>
      </el-form>
    </slot>
    <!-- 按钮区 -->
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
    detailsTransVocationInfoId: {
      type: String,
    },
  },
  data() {
    return {
      labelPosition: "right",
      editForm: {
        name: "",
        vocationCode:"",
        description: "",
        status: "",
        createBy: "",
        createDate: "",
        updateBy: "",
        updateDate: "",
        sort: ""
      },
      localShow: this.show,
    };
  },
  watch: {
    show(val) {
      this.localShow = val;
    },
    detailsTransVocationInfoId(val) {
      let params = {
        id: val,
      };
      //根据Id查询用户信息
      api.testAxiosGet(ApiPath.url.vocationInfoFindId, params).then((res) => {
        this.editForm = res.data;
      });
    }
  },
  methods: {
    beforeClose() {
      this.close();
    },
    close() {
      this.$emit("close");
    }
  }
};
</script>

<style scoped>
.table{
  height: 300px;
  width: 600px;
}
</style>