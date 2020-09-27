<template>
  <el-dialog
    :visible.sync="localShow"
    :title="title"
    :before-close="beforeClose"
    append-to-body
    modal-append-to-body
    width="35%"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
  >
    <!-- 插槽区 -->
    <slot>
      <el-form
        :model="editForm"
        :rules="rules"
        ref="editForm"
        :label-position="labelPosition"
        label-width="100px"
        style="margin-left: -85px"
      >
        <el-form-item label="价格" prop="price">
          <el-input
            type="text"
            v-model="editForm.price"
            size="small"
            placeholder="请输入价格"
            style="width: 60%"
          ></el-input>
        </el-form-item>
        <el-form-item label="日期" prop="priceDate">
          <!-- <el-input type="text" v-model="editForm.priceDate" size="small" placeholder="请输入日期" style="width:92%"></el-input> -->
          <el-date-picker
            type="date"
            placeholder="选择日期"
            format="yyyy年MM月dd日"
            value-format="yyyy-MM-dd"
            v-model="editForm.priceDate"
            style="width: 60%"
          ></el-date-picker>
        </el-form-item>
      </el-form>
    </slot>
    <!-- 按钮区 -->
    <span slot="footer">
      <el-button
        type="primary"
        icon="el-icon-check"
        @click="saveGrainPricesInfo('editForm')"
        v-loading.fullscreen.lock="fullscreenLoading"
        >保存</el-button
      >
      <el-button type="info" icon="el-icon-close" @click="close"
        >关闭</el-button
      >
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
  },
  data() {
    return {
      fullscreenLoading: false,
      labelPosition: "right",
      editForm: {
        price: "",
        id: "",
        priceDate: "",
        createUser: localStorage.getItem("userInfo"),
      },
      stateOptions: [
        { value: "0", label: "启用" },
        { value: "1", label: "禁用" },
      ],
      limit: 1,
      localShow: this.show,
      rules: {
        price: [
          { required: true, message: "请输入价格", trigger: "blur" },
          {
            pattern: /^(?!0+$)(?!0*\.0*$)\d{1,8}(\.\d{1,2})?$/,
            message: "请输入整数且只能包含2位小数",
            trigger: "blur",
          },
        ],
        priceDate: [{ required: true, message: "请输入日期", trigger: "blur" }],
      },
    };
  },
  watch: {
    show(val) {
      this.localShow = val;
    },
  },
  mounted() {},
  methods: {
    beforeClose() {
      this.close();
    },
    close() {
      this.editForm.price = "";
      this.editForm.priceDate = "";
      this.$emit("close");
    },
    //新增保存
    saveGrainPricesInfo(editData) {
      this.$refs[editData].validate((valid) => {
        if (valid) {
          // 验证日期是否重复
          let p = {
            priceDate: this.editForm.priceDate,
          };

          api
            .testAxiosGet(ApiPath.url.checkPriceDate, p)
            .then((res) => {
              let code = res.status;
              if (code == "0") {
                this.$message.error(res.message);
                return false;
              } else {
                //不存在
                let params = {
                  grainPricesEntity: this.editForm,
                };

                // console.log(params);
                // return
                api
                  .testAxiosGet(ApiPath.url.saveGrainPrices, params)
                  .then((res) => {
                    let code = res.status;
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
                  this.editForm.price = "";
                  this.editForm.priceDate = "";
                }, 500);
              }
            })
            .catch(function (err) {
              this.$message.error("请求后台失败！");
            });
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
.required {
  color: red;
  margin-left: -79px;
}
</style>