<template>
  <el-dialog
    :visible.sync="localShow"
    :title="title"
    :before-close="beforeClose"
    append-to-body
    modal-append-to-body
    width="900px"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
  >
    <!-- 插槽区 -->
    <slot>
      <el-form :model="editForm" ref="editForm" :label-position="labelPosition" label-width="100px" style="margin-left: -85px">
        <el-row>
          <el-col :span="2"><b>试卷名称：</b></el-col>
          <el-col :span="8"><b>{{editForm.name}}</b></el-col>
          <el-col :span="2"><b>答题时间：</b></el-col>
          <el-col :span="8"><b>{{editForm.answerTime}}分钟</b></el-col>
          <el-col :span="4"><b>共{{editForm.questionNum}}题</b></el-col>
        </el-row>
        <el-row style="margin-top:15px;">
            <el-col :span="3">试卷总分数：</el-col>
            <el-col :span="7">{{editForm.totalScore}}</el-col>
            <el-col :span="2">及格分数：</el-col>
            <el-col :span="5">{{editForm.passScore}}</el-col>
          <el-col :span="7">所属职业类别：{{editForm.vocationName}}</el-col>
        </el-row>
        <el-row style="margin-top:15px;">
            <el-col :span="2">创建人：</el-col>
            <el-col :span="2">{{editForm.createBy}}</el-col>
            <el-col :span="2">创建时间：</el-col>
            <el-col :span="6">{{editForm.createDate}}</el-col>
            <el-col :span="2">修改人：</el-col>
            <el-col :span="2">{{editForm.updateBy}}</el-col>
            <el-col :span="2">修改时间</el-col>
            <el-col :span="5">{{editForm.updateDate}}</el-col>
        </el-row>
        <div style="margin-top:20px">
          <el-row v-for="(item, index) in List" :key="index" style="margin-top:40px">
            <el-col :span="1">{{index + 1}}、</el-col>
            <el-col :span="14">{{item.quContent}}</el-col>
            <br>
            <el-col :span="2" style="margin-top:25px"><span>答案：</span></el-col>
              <el-col :span="5" style="margin-top:25px" v-for="(answerItem, index1) in item.optionList" :key="index1">
                {{answerItem.title}}、 {{answerItem.content}}
              </el-col>
          </el-row>
        </div>
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
    transDetailExamPaperId: {
      type: String,
    },
  },
  data() {
    return {
      fullscreenLoading: false,
      labelPosition: "right",
      editForm: {
        name: "",
        answerTime: "",
        totalScore: "",
        passScore: "",
        vocationName: "",
        createBy:"",
        createDate:"",
        updateBy:"",
        updateDate:"",
        questionNum:""
      },
      List: [],
      answerList: [],
      localShow: this.show,
    };
  },
  watch: {
    show(val) {
      this.localShow = val;
    },
    transDetailExamPaperId(val) {
      let params = {
        id: val,
      };
      api.testAxiosGet(ApiPath.url.findByExamId, params).then((res) => {
        if (res.state == 0) {
          this.editForm = res.data;
          this.editForm.vocationName = res.data.vocation.name;
          this.List = res.dataQuest;
        }
      });
    },
  },
  methods: {
    beforeClose() {
      this.close();
    },
    close() {
      this.$emit("close");
    },
  },
};
</script>

<style scoped>
.el-form {
  padding-left: 100px;
}
</style>