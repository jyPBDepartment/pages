<template>
  <el-dialog
    :visible.sync="localShow"
    :title="title"
    :before-close="beforeClose"
    append-to-body
    modal-append-to-body
    width="900px"
    height="900px"
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
        style="border: groove; margin-top: -30px"
      >
        <el-form-item label="职业类别" prop="vocationId">
          <el-select
            v-model="editForm.vocationId"
            style="width: 35%"
            size="small"
          >
            <el-option
              v-for="item in vocationIdOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              size="small"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="试卷名称" prop="name">
          <el-input
            type="text"
            v-model="editForm.name"
            size="small"
            placeholder="请输入试卷名称(限255个字)"
            style="width: 35%"
            maxlength="255"
          ></el-input>
        </el-form-item>
        <el-form-item label="总分数" prop="totalScore">
          <el-input
            type="text"
            v-model="editForm.totalScore"
            size="small"
            placeholder="请输入总分数(限数字)"
            style="width: 25%"
            maxlength="10"
          ></el-input>
        </el-form-item>
        <el-form-item label="及格分数" prop="passScore">
          <el-input
            type="text"
            v-model="editForm.passScore"
            size="small"
            placeholder="输入及格分数(限数字)"
            change="answerBig"
            style="width: 25%"
            maxlength="5"
          ></el-input>
        </el-form-item>
        <el-form-item label="答题时间" prop="answerTime">
          <el-input
            type="text"
            v-model="editForm.answerTime"
            size="small"
            placeholder="请输入答题时间(分钟)"
            style="width: 25%"
            maxlength="255"
          ></el-input>
        </el-form-item>
      </el-form>
      <br />
      <el-button
        type="primary"
        size="small"
        @click="showQuestion(editForm.vocationId)"
        >试题添加</el-button
      >
      <br />
      <el-table
        size="mini"
        :data="listData"
        highlight-current-row
        border
        style="width: 100%; margin-top: 20px"
      >
        <el-table-column
          type="index"
          label="序号"
          min-width="7%"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="quContent"
          min-width="10%"
          label="问题名称"
          align="center"
          :show-overflow-tooltip="true"
        ></el-table-column>
        <!-- <el-table-column prop="answer" min-width="41%" label="试题选项" align="center" :show-overflow-tooltip="true"></el-table-column> -->
        <el-table-column
          prop="answer"
          min-width="10%"
          label="试题答案"
          align="center"
          :show-overflow-tooltip="true"
        ></el-table-column>
        <el-table-column
          prop="score"
          min-width="10%"
          label="分值"
          align="center"
          :show-overflow-tooltip="true"
        ></el-table-column>
        <el-table-column align="center" label="操作" min-width="12%">
          <template slot-scope="scope">
            <el-button
              @click="deleteQuestion(scope)"
              type="danger"
              size="small"
              icon="el-icon-delete"
              style="margin-top: 3px; margin-left: -2px"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <el-row style="text-align: right; margin-top: 10px">
        <span>已选总分值：{{ fraction }}</span>
      </el-row>
    </slot>
    <!-- 按钮区 -->
    <span slot="footer">
      <el-button type="primary" @click="showExamPaper(listData)"
        >预览</el-button
      >
      <el-button
        type="primary"
        icon="el-icon-check"
        @click="saveExamPaperInfo('editForm')"
        v-loading.fullscreen.lock="fullscreenLoading"
        >保存</el-button
      >
      <el-button type="info" icon="el-icon-close" @click="close"
        >关闭</el-button
      >
    </span>
    <show-question
      :show="showQuestionInfo"
      :transShowQuestionId="transShowQuestion"
      title="试题添加"
      @close="closeShowQuestionDialog"
      @save="saveShowQuestion"
      @show="getMultiple"
    ></show-question>
    <!-- 预览 -->
    <show-examPaper
      :show="showExamPaperFlag"
      :transShowExamPaperId="transShowExamPaperId"
      title="预览"
      @close="closeShowExamPaperDialog"
    ></show-examPaper>
  </el-dialog>
</template>
<script>
import qs from "qs";
import Vue from "vue";
import ApiPath from "@/api/ApiPath.js";
import api from "@/axios/api.js";
import ShowQuestion from "./showQuestion";
import ShowExamPaper from "./showExamPaper";
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
      showQuestionInfo: false,
      showExamPaperFlag: false,
      transShowExamPaperId: "",
      transShowQuestion: {},
      listData: [],
      transForm:{},
      fraction: 0,
      editForm: {
        vocationId: "",
        id: "",
        name: "",
        totalScore: "",
        passScore: "",
        answerTime: "",
        createBy: localStorage.getItem("userInfo"),
      },
      vocationIdOptions: [],
      localShow: this.show,
      rules: {
        vocationId: [
          { required: true, message: "请选择职业类别", trigger: "bulr" },
        ],
        name: [{ required: true, message: "请输入试题名称", trigger: "bulr" }],
        totalScore: [
          { required: true, message: "请输入总分数", trigger: "bulr" },
        ],
        passScore: [
          { required: true, message: "请输入通过分数", trigger: "bulr" },
        ],
        answerTime: [
          { required: true, message: "请输入答题时间", trigger: "bulr" },
        ],
      },
    };
  },
  // 注册组件
  components: {
    ShowQuestion,
    ShowExamPaper,
  },
  watch: {
    show(val) {
      this.localShow = val;
    },
  },
  mounted() {
    this.findVocationId();
  },
  methods: {
    //试题添加
    showQuestion(vocationId) {
      this.fraction = 0;
      if (this.editForm.vocationId == "") {
        this.$alert("请选择职业类别", "提示", {
          confirmButtonText: "确定",
        });
        return false;
      }

      this.transForm.vocationId=this.editForm.vocationId;
      this.transForm.listData=this.listData;
      
      this.transShowQuestion = this.transForm;

      console.log("添加赋值："+this.transShowQuestionId)
      this.showQuestionInfo = true;
    },

    //获取选中试题
    getMultiple(data) {
      this.listData = data;
      for (let i = 0; i < data.length; i++) {
        this.fraction = this.fraction + data[i].score;
      }
    },
    //试题删除
    deleteQuestion(scope) {
      console.log(this.listData.length);
        for(let i=0;i<this.listData.length;i++){
            if(this.listData[i].id == scope.row.id){
              this.fraction = this.fraction - this.listData[i].score;
              delete this.listData[i];
            }
        }
      // let list = [];
      // list = this.listData;
      // console.log(list.length);
      // Array.prototype.indexOf = function (scope) {
      //   for (let i = 0; i < this.length; i++) {
      //     if (this[i] == scope) {
      //       return i;
      //     }
      //     return -1;
      //   }
      // };
      // Array.prototype.remove = function (scope) {
      //   var index = this.indexOf(scope);
      //   if (index > -1) {
      //     this.splice(index, 1);
      //   }
      //   console.log(list.length);
      // };

      // for (let j = 0; j < this.listData.length; j++) {
      //   if (scope.row.id == this.listData[j].id) {
      //     this.listData.remove(this.listData[j]);
      //   }
      // }
      console.log("2"+this.listData)
      console.log("2" + this.listData.length);
    },
    showExamPaper(listData) {
      this.transShowExamPaperId = listData;
      this.showExamPaperFlag = true;
    },
    closeShowExamPaperDialog() {
      this.showExamPaperFlag = false;
    },
    closeShowQuestionDialog() {
      this.showQuestionInfo = false;
      this.transShowQuestion={};
      
    },
    saveShowQuestion() {
      this.showQuestionInfo = false;
    },
    beforeClose() {
      this.close();
    },
    close() {
      this.$emit("close");
    },
    // 职业类别下拉列表
    findVocationId: function () {
      let params = {};
      api
        .testAxiosGet(ApiPath.url.findVocationId, params)
        .then((res) => {
          if (res.state == "0") {
            for (let i = 0; i < res.data.length; i++) {
              this.vocationIdOptions.push({
                value: res.data[i]["id"],
                label: res.data[i]["name"],
              });
            }
          }
        })
        .catch(function (error) {});
    },
    //新增保存
    saveExamPaperInfo(editData) {
      this.$refs[editData].validate((valid) => {
        if (this.editForm.vocationId == "") {
          this.$alert("职业类别不能为空", "提示", {
            confirmButtonText: "确定",
          });
          return false;
        }
        if (this.editForm.name == "") {
          this.$alert("试卷名称不能为空", "提示", {
            confirmButtonText: "确定",
          });
          return false;
        }
        if (this.editForm.totalScore == "") {
          this.$alert("总分数为空", "提示", {
            confirmButtonText: "确定",
          });
          return false;
        }
        if (this.editForm.passScore == "") {
          this.$alert("通过分数不能为空", "提示", {
            confirmButtonText: "确定",
          });
          return false;
        }
        if (this.editForm.answerTime == "") {
          this.$alert("答题时间不能为空", "提示", {
            confirmButtonText: "确定",
          });
          return false;
        }
        if (this.listData == "") {
          this.$alert("试题不能为空", "提示", {
            confirmButtonText: "确定",
          });
          return false;
        }
        if (this.editForm.totalScore != this.fraction) {
          this.$alert("设置总分值与已选总分值需要一致", "提示", {
            confirmButtonText: "确定",
          });
          return false;
        }
        if (valid) {
          let questionId = [];
          let question = [];
          for (let i = 0; i < this.listData.length; i++) {
            question.push(this.listData[i].id);
            console.log(this.listData[i].id);
          }
          questionId = question.join(",");
          let params = {
            eduExamPaperInfoEntity: this.editForm,
            questionId: questionId,
          };
          api
            .testAxiosGet(ApiPath.url.addExamPaperInfo, params)
            .then((res) => {
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
            this.editForm.vocationId = "";
            this.editForm.name = "";
            this.editForm.totalScore = "";
            this.editForm.passScore = "";
            this.editForm.answerTime = "";
            this.listData = [];
          }, 500);
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
  margin-left: -50px;
}
</style>