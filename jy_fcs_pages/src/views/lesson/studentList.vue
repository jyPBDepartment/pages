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
      <!-- 搜索筛选 -->
    <el-form :inline="true" class="user-search">
      <el-form-item label="用户姓名">
        <el-input size="small" v-model="userName" placeholder="输入姓名" style="width:150px"></el-input>
      </el-form-item>
      <el-form-item >
        <el-button size="small" type="warning" icon="el-icon-search" @click="search('manual')" class="height">查询</el-button>
        <el-button size="small" type="info" icon="el-icon-close" @click="resetForm('search')">重置</el-button>
      </el-form-item>
      <br/>
      <el-form-item >
        <el-button size="small" type="primary" icon="el-icon-download" @click="exportExcel()" class="height">导出</el-button>
      </el-form-item>
      <br>
    </el-form>
    <!--列表-->
    <el-table id="exportTab" size="mini" :data="listData" highlight-current-row v-loading="loading" border element-loading-text="拼命加载中" style="width: 100%;">
      <el-table-column type="index" label="序号" min-width="7%" align="center"></el-table-column>
      <el-table-column prop="userCode" min-width="9%" label="用户编号" align="center" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="userName" min-width="9%" label="用户姓名" align="center" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="userTel" min-width="9%" label="联系方式" align="center" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="createDate" min-width="12%" label="报名时间" align="center" sortable></el-table-column>
    </el-table>
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
 import FileSaver from 'file-saver';
 import XLSX from 'xlsx';
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
    viewTransLessonInfoId: {
      type: String,
    },
  },
  data() {
    return {
      labelPosition: "right",
      localShow: this.show,
      listData:[],
      userName:"",
      loading:false,
      parentId:""
    };
  },
  watch: {
    show(val) {
      this.localShow = val;
    },
    viewTransLessonInfoId(val) {
      this.parentId = val;
      let params = {
        name:this.userName,
        lessonId: val,
      };
      //根据Id查询用户信息
      api.testAxiosGet(ApiPath.url.findStuListByLesson, params).then((res) => {
        this.listData = res.data;
      });
    }
  },
  methods: {
    exportExcel () {
      /* generate workbook object from table */
      var xlsxParam = { raw: true } // 导出的内容只做解析，不进行格式转换
      var wb = XLSX.utils.table_to_book(document.querySelector('#exportTab'), xlsxParam)

      /* get binary string as output */
      var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' })
      try {
        FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), '审核情况表.xlsx')
      } catch (e) {
        if (typeof console !== 'undefined') {
          console.log(e, wbout)
        }
      }
      return wbout
  },
    beforeClose() {
      this.close();
    },
    close() {
      this.$emit("close");
    },
    search(){
      let params = {
        name:this.userName,
        lessonId: this.parentId,
      };
      //根据Id查询用户信息
      api.testAxiosGet(ApiPath.url.findStuListByLesson, params).then((res) => {
        this.listData = res.data;
      });
    },
    // 重置
    resetForm() {
      this.userName = "";
      this.search();
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