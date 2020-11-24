<template>
  <el-dialog
    :visible.sync="localShow"
    :title="title"
    :before-close="beforeClose"
    append-to-body
    modal-append-to-body
    width="350px"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
  >
    <!-- 插槽区 -->
    <slot>
      <el-form
        :model="editFrom"
        :rules="rules"
        ref="editFrom"
        :label-position="labelPosition"
        label-width="100px"
        style="margin-left: -100px"
      >
        <el-form-item label="版块名称" prop="name">
          <el-input type="text" v-model="editFrom.name" size="small" placeholder="请输入版块名称(限5个字)" style="width: 85%" maxlength="5"></el-input>
        </el-form-item>
      </el-form>
    </slot>
    <!-- 按钮区 -->
    <span slot="footer">
      <el-button type="primary" icon="el-icon-check" @click="updateSection('editFrom')" v-loading.fullscreen.lock="fullscreenLoading">保存</el-button>
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
    transSectionId: {
      type: String,
    },
  },
  data() {
    return {
      fullscreenLoading: false,
      labelPosition: "right",
      editFrom: {
        name: "",
      },
      localShow: this.show,
      rules: {
        name: [{ required: true, message: "请输入版块名称", trigger: "blur" }],
      },
    };
  },
  watch: {
    show(val) {
      this.localShow = val;
    },
    transSectionId(val) {
      if (val == "") {
        return;
      }
      let params = {
        id: val,
      };
      //根据id查询信息
      api.testAxiosGet(ApiPath.url.findSectionId, params).then((res) => {
        this.editFrom = res.data;
      });
    },
  },
  methods: {
    beforeClose: function () {
      this.close();
    },
    close() {
      this.$emit("close");
    },
    //编辑保存
    updateSection(editData) {
      this.$refs[editData].validate((valid) => {
        if (this.editFrom.name == "") {
          this.$alert("版块名称不能为空!", "提示", {
            confirmButtonText: "确定",
          });
          return false;
        }
        if (valid) {
          let params = {
            eduSectionManageEntity: this.editFrom,
          };
          api.testAxiosGet(ApiPath.url.updateSectionManage, params).then((res) => {
              let code = res.state;
              if (code == "0") {
                this.close();
                this.$message.success(res.message);
              } else {
                this.$message.error(res.message);
              }
            })
            .catch(function (err) {});
          this.fullscreenLoading = true;
          setTimeout(() => {
            this.fullscreenLoading = false;
          }, 500);
          this.editFrom.updateBy = localStorage.getItem("userInfo");
        } else {
          return false;
        }
      });
    },
  },
};
</script>
<style scoped>
.el-form {
  padding-left: 100px;
}
.el-button {
  border: none;
}
</style>