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
          <!-- <el-row>
              <el-col></el-col>
          </el-row> -->
        
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
    transShowExamPaperId: {
      type: String,
    },
  },
  data() {
    return {
      fullscreenLoading: false,
      labelPosition: "right",
      editForm: {
        
      },
      localShow: this.show,
    };
  },
  watch: {
    show(val) {
      this.localShow = val;
    },
    transShowExamPaperId(val) {
        console.log(val)
    //   let params = {
    //     id: val,
    //   };
    //    //根据Id查询用户信息
    //   api.testAxiosGet(ApiPath.url.manualFindById, params).then((res) => {
    //     this.editForm = res.data;
    //   });
    }
  },
  methods: { 
    beforeClose() {
      this.close();
    },
    close() {
      // this.reload();
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