<template>
  <el-dialog
    :visible.sync="localShow"
    :title="title"
    :before-close="beforeClose"
    append-to-body
    modal-append-to-body
    width="75%"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
  >
    <!-- 插槽区 -->
    <slot>
      <el-form :model="postInfoForm" :label-position="labelPosition" label-width="100px">

        <el-row>
          <el-col :span="11">
            <el-form-item label="标题名称：">
              <span>{{postInfoForm.name}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="审核状态:">
              <span v-if="postInfoForm.auditStatus==0">未审核</span>
              <span v-if="postInfoForm.auditStatus==1">审核通过</span>
              <span v-if="postInfoForm.auditStatus==2">审核驳回</span>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="11">
            <el-form-item label="分类:">
              <span>{{postInfoForm.parentCode}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="作者:">
              <span>{{postInfoForm.author}}</span>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="11">
            <el-form-item label="发布人:">
              <span>{{postInfoForm.createUser}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="审核人:">
              <span>{{postInfoForm.auditUser}}</span>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="11">
            <el-form-item label="发布时间:">
              <span>{{postInfoForm.createDate}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="修改时间:">
              <span>{{postInfoForm.updateDate}}</span>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="11">
            <el-form-item label="审核意见:">
              <span>{{postInfoForm.auditOptinion}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="圈子内容:">
              <span>{{postInfoForm.code}}</span>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="11">
            <el-form-item label="可见程度:">
              <span v-if="postInfoForm.visibility==1">全部可见</span>
              <span v-if="postInfoForm.visibility==0">自己可见</span>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="审核原因:">
              <span v-if="postInfoForm.auditStatus==0">
                <el-input
                  type="textarea"
                  :rows="3"
                  v-model="postInfoForm.reason"
                  size="small"
                  style="width:100%"
                ></el-input>
              </span>
              <span
                v-if="postInfoForm.auditStatus==1||postInfoForm.auditStatus==2"
              >{{postInfoForm.reason}}</span>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </slot>
    <!-- 按钮区 -->
    <span slot="footer">
      <span v-if="postInfoForm.auditStatus==0">
        <el-button type="primary" icon="el-icon-check" @click="passPostInfo()" class="insert">通过审核</el-button>
      </span>
      <span v-if="postInfoForm.auditStatus==0">
        <el-button type="primary" icon="el-icon-close" @click="refusePostInfo()" class="del">拒绝审核</el-button>
      </span>
      <el-button type="info" icon="el-icon-close" @click="close">关闭</el-button>
    </span>
  </el-dialog>
</template>
<script>
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
    transPostInfoId: {
      type: String,
    },
  },
  data() {
    return {
      labelPosition: "right",
      postInfoForm: {
        code: "",
        parentCode: "",
        auditStatus: "",
        auditOptinion: "",
        createDate: "",
        updateDate: "",
        author: "",
        createUser: "",
        auditUser: "",
        visibility: "",
        name: "",
        status: "",
        id: "",
        reason: "",
      },
      localShow: this.show,
    };
  },
  watch: {
    show(val) {
      this.localShow = val;
    },
    transPostInfoId(val) {
      let params = {
        id: val,
      };
      //根据Id查询用户信息
      api.testAxiosGet(ApiPath.url.findPostInfoId, params).then((res) => {
        this.postInfoForm = res.data;
      });
    },
  },
  mounted() {},
  methods: {
    //审核通过
    passPostInfo: function () {
      let params = {
        postInfoEntity: this.postInfoForm,
      };
      api
        .testAxiosGet(ApiPath.url.passPostInfo, params)
        .then((res) => {
          let code = res.state;
          if (code == "0") {
            this.$message.success(res.message);
            this.close();
            this.reload();
          }
        })
        .catch(function (error) {});
      this.postInfoForm.auditUser = localStorage.getItem("userInfo");
    },
    //审核拒绝
    refusePostInfo: function () {
      if (this.postInfoForm.reason == "" || this.postInfoForm.reason == null) {
        this.$alert("请填写拒绝理由！", "提示", {
          confirmButtonText: "确定",
        });
        return false;
      }
      let params = {
        postInfoEntity: this.postInfoForm,
      };
      api.testAxiosGet(ApiPath.url.refusePostInfo, params).then((res) => {
        let code = res.state;
        if (code == "0") {
          this.$message.success(res.message);
          this.close();
          this.reload();
        }
      });
      this.postInfoForm.auditUser = localStorage.getItem("userInfo");
    },
    close: function () {
      this.$emit("close");
    },
    beforeClose: function () {
      this.close();
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
.insert {
  width: 100px;
  background-color: #67c23a;
  border-color: #67c23a;
  color: #fff;
  font-size: 12px;
  margin-top: 4px;
}
.el-button.del {
  width: 100px;
  background-color: #f56c6c;
  border-color: #f56c6c;
  color: white;
  font-size: 12px;
}
</style>