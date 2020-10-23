<template>
  <el-dialog
    :visible.sync="localShow"
    :title="title"
    :before-close="beforeClose"
    append-to-body
    modal-append-to-body
    width="50%"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
  >
    <!-- 插槽区 -->
    <slot>
      <table border="1" :data="editForm" align="center" class="table">
        <tbody>
          <tr>
            <td style="width:100px;" align="center">职业类别名称</td>
            <td align="left" style="width:340px;">{{editForm.name}}</td>
            <td align="center" style="width:100px;">职业编码</td>
            <td align="left" style="width:340px;">{{editForm.vocationCode}}</td>
        </tr>
        <tr>
          <td align="center">创建人</td>
          <td align="left">{{editForm.createBy}}</td>
          <td align="center">创建时间</td>
          <td align="left">{{editForm.createDate}}</td>
        </tr>
        <tr>
          <td align="center">修改人</td>
          <td align="left">{{editForm.updateBy}}</td>
          <td align="center">修改时间</td>
          <td align="left">{{editForm.updateDate}}</td>
        </tr>
        <tr>
          <td align="center">排序</td>
          <td align="left">{{editForm.sort}}</td>
          <td align="center" style="width:100px;">状态</td>
            <td align="left" style="width:340px;">
              <span v-if="editForm.status==0">启用</span>
              <span v-if="editForm.status==1">禁用</span>
            </td>
        </tr>
        <tr>
          <td align="center">描述</td>
          <td colspan="3" align="left">{{editForm.description}}</td>
        </tr>
       </tbody>
      </table>
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
      fullscreenLoading: false,
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