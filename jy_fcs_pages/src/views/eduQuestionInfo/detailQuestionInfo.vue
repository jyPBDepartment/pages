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
      <el-form :model="editForm" ref="editForm" :label-position="labelPosition" label-width="100px" style="margin-left:-85px">
        <el-row>
          <el-col :span="3">职业类别:</el-col>
          <el-col :span="4">{{editForm.vocation.name}}</el-col>
          <el-col :span="3">试题类型:</el-col>
          <el-col :span="5">
            <span v-if="editForm.quType == '0'">选择题</span>
            <span v-if="editForm.quType == '1'">判断题</span>
          </el-col>
          <el-col :span="3">状态:</el-col>
          <el-col :span="3">
              <span v-if="editForm.status == '0'">启用</span>
              <span v-if="editForm.status == '1'">禁用</span>
          </el-col>
        </el-row>
        <el-divider></el-divider>
        <el-row>
          <el-col :span="3">问题名称:</el-col>
          <el-col :span="18"><span>{{editForm.quContent}}</span></el-col>
        </el-row>
        <el-divider></el-divider>
        <el-row v-if="aShow">
          <el-col :span="2">选项A:</el-col>
          <el-col :span="10"><span>{{editForm.optionA}}</span></el-col>
          <el-col :span="2">选项B:</el-col>
          <el-col :span="9"><span>{{editForm.optionB}}</span></el-col>
        </el-row>
        <el-divider></el-divider>
         <el-row v-if="bShow">
          <el-col :span="2">选项C:</el-col>
          <el-col :span="10"><span>{{editForm.optionC}}</span></el-col>
          <el-col :span="2">选项D:</el-col>
          <el-col :span="9"><span>{{editForm.optionD}}</span></el-col>
        </el-row>
        <el-divider v-if="bShow"></el-divider>
         <el-row>
          <el-col :span="3">正确答案:</el-col>
          <el-col :span="9"><span>{{editForm.answer}}</span></el-col>
          <el-col :span="3">分值:</el-col>
          <el-col :span="6"><span>{{editForm.score}}</span></el-col>
        </el-row>
        <el-divider></el-divider>
        <el-row>
          <el-col :span="3">创建人:</el-col>
          <el-col :span="9"><span>{{editForm.createBy}}</span></el-col>
          <el-col :span="3">创建时间:</el-col>
          <el-col :span="6"><span>{{editForm.createDate}}</span></el-col>
        </el-row>
        <el-divider></el-divider>
        <el-row>
          <el-col :span="12">修改人:<span style="margin-left:35px">{{editForm.updateBy}}</span></el-col>
          <el-col :span="9">修改时间:<span style="margin-left:25px">{{editForm.updateDate}}</span></el-col>
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
    transDetailQuestionId: {
      type: String,
    },
    selectQuType: {
      type: String,
    }
  },
  data() {
    return {
      fullscreenLoading: false,
      labelPosition: "right",
      aShow: true,
      bShow: false,
      editForm: {
        quType: "",
        quContent: "",
        answer: "",
        score: "",
        id: "",
        vocationName:"",
        labelName:"",
        createBy:"",
        createDate:"",
        updateBy:"",
        updateDate:"",
        status:"",
        vocation:"",
        optionA:"",
        optionB:"",
        optionC:"",
        optionD:""
      },
      option:[],
      localShow: this.show,
    };
  },
  watch: {
    show(val) {
      this.localShow = val;
    },
    transDetailQuestionId(val) {
      if(val == ""){
        return;
      }
      let params = {
        id: val,
      };
       //根据Id查询用户信息
      api.testAxiosGet(ApiPath.url.questionFindById, params).then((res) => {
        this.editForm = res.data;
        console.log(this.editForm.optionA)
         if(this.editForm.quType == '0'){
            this.aShow = true;
            this.bShow = true;
        }
        if(this.editForm.quType == '1'){
            this.aShow = true;
            this.bShow = false;
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