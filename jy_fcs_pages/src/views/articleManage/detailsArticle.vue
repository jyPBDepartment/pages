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
         <el-form :model="editFrom" ref="editFrom" :label-position="labelPosition" label-width="100px" style="margin-left:-85px">
             <el-row>
                 <el-col :span="3">文章标题：</el-col>
                 <el-col :span="9">{{editFrom.title}}</el-col>
             </el-row>
             <el-divider></el-divider>
             <el-row>
                 <el-col :span="3">文章板块：</el-col>
                 <el-col :span="9">{{editFrom.section.name}}</el-col>
             </el-row>
             <el-divider></el-divider>
             <el-row>
                 <el-col :span="3">创建人：</el-col>
                 <el-col :span="9">{{editFrom.createBy}}</el-col>
                 <el-col :span="3">创建时间：</el-col>
                 <el-col :span="9">{{editFrom.createDate}}</el-col>
             </el-row>
             <el-divider></el-divider>
             <el-row>
                 <el-col :span="3">修改人：</el-col>
                 <el-col :span="9">{{editFrom.updateBy}}</el-col>
                 <el-col :span="3">修改时间：</el-col>
                 <el-col :span="9">{{editFrom.updateDate}}</el-col>
             </el-row>
             <el-divider></el-divider>
             <el-row>
                 <el-col :span="3">图片</el-col>
                 <el-col :span="18"><span><el-image :src="editFrom.url" style="width: 370px; height: 180px"></el-image></span></el-col>
             </el-row>
             <el-divider></el-divider>
             <el-row>
                <span>概述：</span>
                <div class="contentText" v-html="editFrom.content"></div>
             </el-row>
             <el-divider></el-divider>
             <el-row>
                <span>危害：</span>
                <div class="contentText" v-html="editFrom.contentA"></div>
             </el-row>
             <el-divider></el-divider>
             <el-row>
                <span>传播途径/发病条件：</span>
                <div class="contentText" v-html="editFrom.contentB"></div>
             </el-row>
             <el-divider></el-divider>
             <el-row>
                <span>防治技术：</span>
                <div class="contentText" v-html="editFrom.contentC"></div>
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
export default {
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: "对话框",
    },
    transDetailsArticleId: {
      type: String,
    },
  },
  data() {
    return {
      labelPosition: "right",
      editFrom: {
        title:"",
        content:"",
        url: "",
        section:"",
        createBy:"",
        createDate:"",
        updateBy:"",
        updateDate:"",
      },
      localShow: this.show,
    };
  },
  watch: {
    show(val) {
      this.localShow = val;
    },
    transDetailsArticleId(val) {
      let params = {
        id: val,
      };
       //根据Id查询用户信息
      api.testAxiosGet(ApiPath.url.ArticleFindById, params).then((res) => {
        this.editFrom = res.data;
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
}
</script>
<style scoped>
.el-form {
  padding-left: 100px;
}
.contentText >>> img {
  width: 300px;
  height: 200px;
  margin: 10px;
}
</style>