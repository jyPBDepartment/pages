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
          <el-col :span="3">类型:</el-col>
          <el-col :span="9">文章</el-col>
          <el-col :span="3">标题:</el-col>
          <el-col :span="6"><span>{{editForm.title}}</span></el-col>
        </el-row>
        <el-divider></el-divider>
        <el-row>
          <el-col :span="3">职业类别:</el-col>
          <el-col :span="9"><span>{{editForm.vocation.name}}</span></el-col>
          <el-col :span="3">标签:</el-col>
          <el-col :span="6"><span>{{editForm.label.name}}</span></el-col>
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
          <el-col :span="9">修改时间:<span style="margin-left:20px">{{editForm.updateDate}}</span></el-col>
        </el-row>
        <el-divider></el-divider>
        <el-row>
          <el-col :span="3">图片:</el-col>
          <el-col :span="18"><span><el-image :src="editForm.url" style="width: 370px; height: 180px"></el-image></span></el-col>
        </el-row>
        <el-divider></el-divider>
        <el-row>
          <el-col :span="3">导读:</el-col>
          <el-col :span="18">
            <el-input type="textarea" v-model="editForm.guide" size="small" rows="5" readonly></el-input>
          </el-col>
        </el-row>
        <el-divider></el-divider>
        <el-row>
          <el-col :span="3">内容:</el-col>
          <el-col :span="18">
            <span v-html="editForm.content">{{editForm.content}}</span>
          </el-col>
        </el-row>
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
import {Quill,quillEditor} from 'vue-quill-editor'
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
    transDetailManualId: {
      type: String,
    },
  },
  data() {
    return {
      fullscreenLoading: false,
      labelPosition: "right",
      editForm: {
        title:"",
        manualType: "",
        vocationId: "",
        labelId: "",
        guide: "",
        content:"",
        id: "",
        url: "",
        vocationName:"",
        labelName:"",
        createBy:"",
        createDate:"",
        updateBy:"",
        updateDate:"",
        status:"",
        vocation:"",
        label:""
      },
      localShow: this.show,
      editorOption: { // 富文本框配置
        placeholder: "请输入...",
            theme: "snow", 
            modules: {}
        }
    };
  },
  components: {
    quillEditor
  },
  watch: {
    show(val) {
      this.localShow = val;
    },
    transDetailManualId(val) {
      let params = {
        id: val,
      };
       //根据Id查询用户信息
      api.testAxiosGet(ApiPath.url.manualFindById, params).then((res) => {
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
    },
  },
};
</script>

<style scoped>
.el-form {
  padding-left: 100px;
}
</style>