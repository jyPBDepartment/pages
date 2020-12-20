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
      <el-form :model="editForm" :rules="rules" ref="editForm" :label-position="labelPosition" label-width="100px" style="margin-left:-85px">
        <el-form-item label="职业类别" prop="vocationId">
          <el-select v-model="editForm.vocationId" style="width:35%;" size="small">
            <el-option v-for="item in vocationIdOptions" :key="item.value" :label="item.label" :value="item.value" size="small"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="试题类型" prop="quType">
          <template>
            <el-radio-group v-model="editForm.quType" @change="selectQuType">
              <el-radio :label="0">选择题</el-radio>
              <el-radio :label="1">判断题</el-radio>
            </el-radio-group>
          </template>
        </el-form-item>
        <el-form-item label="问题名称" prop="quContent">
          <el-input type="textarea" v-model="editForm.quContent" rows="3" size="small" placeholder="请输入题目(限160个字)" style="width:80%;" maxlength="160"></el-input>
        </el-form-item>
        <el-form-item label="选项A" prop="optionA" v-if="aShow">
          <el-input type="text" v-model="editForm.optionA" size="small" placeholder="请输入选项A(限30个字)" style="width:80%;" maxlength="30"></el-input>
        </el-form-item>
        <el-form-item label="选项B" prop="optionB" v-if="bShow">
          <el-input type="text" v-model="editForm.optionB" size="small" placeholder="请输入选项B(限30个字)" style="width:80%;" maxlength="30"></el-input>
        </el-form-item>
        <el-form-item label="选项C" prop="optionC" v-if="cShow">
          <el-input type="text" v-model="editForm.optionC" size="small" placeholder="请输入选项C(限30个字)" style="width:80%;" maxlength="30"></el-input>
        </el-form-item>
        <el-form-item label="选项D" prop="optionD" v-if="dShow">
          <el-input type="text" v-model="editForm.optionD" size="small" placeholder="请输入选项D(限30个字)" style="width:80%;" maxlength="30"></el-input>
        </el-form-item>
        <el-form-item label="正确答案" prop="answer" v-if="editForm.quType == '0'">
          <el-select v-model="editForm.answer" style="width:30%;height:30px" size="small">
            <el-option v-for="item in answerOptions" :key="item.value" :label="item.label" :value="item.value" size="small"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="正确答案" prop="answer" v-if="editForm.quType == '1'">
          <el-select v-model="editForm.answer" style="width:30%;height:30px" size="small">
            <el-option v-for="item in answerOption" :key="item.value" :label="item.label" :value="item.value" size="small"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="分值" prop="score">
          <el-select v-model="editForm.score" style="width:30%;height:30px" size="small">
            <el-option v-for="item in scoreOptions" :key="item.value" :label="item.label" :value="item.value" size="small"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </slot>
    <!-- 按钮区 -->
    <span slot="footer">
      <el-button type="primary" icon="el-icon-check" @click="saveQuestionInfo('editForm')" v-loading.fullscreen.lock="fullscreenLoading">保存</el-button>
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
  },
  data() {
    let validateOptionA = (rule, value, callback) => {
      if (value == this.editForm.optionB || value == this.editForm.optionC || value == this.editForm.optionD) {
        callback(new Error("选项内容不能一样！"));
      } else {
        callback();
      }
    };
    let validateOptionB = (rule, value, callback) => {
      if (value == this.editForm.optionA || value == this.editForm.optionC || value == this.editForm.optionD) {
        callback(new Error("选项内容不能一样！"));
      } else {
        callback();
      }
    };
    let validateOptionC = (rule, value, callback) => {
      if (value == this.editForm.optionA || value == this.editForm.optionB || value == this.editForm.optionD) {
        callback(new Error("选项内容不能一样！"));
      } else {
        callback();
      }
    };
    let validateOptionD = (rule, value, callback) => {
      if (value == this.editForm.optionA || value == this.editForm.optionB || value == this.editForm.optionC) {
        callback(new Error("选项内容不能一样！"));
      } else {
        callback();
      }
    };
    return {
        fullscreenLoading: false,
        labelPosition: "right",
        aShow: false,
        bShow: false,
        cShow: false,
        dShow: false,
       
        option: [],
        optionName:[],
        editForm: {
          vocationId: "",
          answer: "",
          id: "",
          createBy: localStorage.getItem("userInfo"),
          quType: 0,
          quContent:"",
          score:"",
          optionA: "",
          optionB: "",
          optionC: "",
          optionD: "",
        },
        vocationIdOptions: [],
        //分数
        scoreOptions:[
            {value: "2", label: "2"},
            {value: "5", label: "5"},
            {value: "10", label: "10"}
        ],
        answerOptions:[
          {value: "A", label: "A"},
          {value: "B", label: "B"},
          {value: "C", label: "C"},
          {value: "D", label: "D"}
        ],
        answerOption:[
          {value: "A", label: "A"},
          {value: "B", label: "B"},
        ],
        localShow: this.show,
        rules: {
            vocationId: [{required: true, message: "请选择职业类别", trigger: "change"}],
            quType: [{required: true, message: "请选择试题类型", trigger: "change"}],
            quContent: [{required: true, message: "请输入问题描述", trigger: "change"}],
            answer: [{required: true, message: "请输入正确答案", trigger: "change"}],
            score: [{required: true, message: "请选择分数", trigger: "change"}],
            optionA: [
              { required: true, message: "请输入选项A！", trigger: "change" },
              { validator: validateOptionA, trigger: "change" },
            ],
            optionB: [
              { required: true, message: "请输入选项B！", trigger: "change" },
              { validator: validateOptionB, trigger: "change" },
            ],
            optionC: [
              { required: true, message: "请输入选项C！", trigger: "change" },
              { validator: validateOptionC, trigger: "change" },
            ],
            optionD: [
              { required: true, message: "请输入选项D！", trigger: "change" },
              { validator: validateOptionD, trigger: "change" },
            ],
        },
    };
  },
  watch: {
    show(val) {
      this.localShow = val;
    },
  },
  mounted() {
    this.findVocationId();
    this.selectQuType();
  },
  methods: {
    //试题类型判断
    selectQuType(result){
      if(result == 1){
            this.aShow = true;
            this.bShow = true;
            this.cShow = false;
            this.dShow = false;
            this.editForm.optionA = "";
            this.editForm.optionB = "";
            this.editForm.optionC = "";
            this.editForm.optionD = "";
            this.optionName[0] = "A";
            this.optionName[1] = "B";
        } else{
            this.aShow = true;
            this.bShow = true;
            this.cShow = true;
            this.dShow = true;
            this.editForm.optionA = "";
            this.editForm.optionB = "";
            this.editForm.optionC = "";
            this.editForm.optionD = "";
            this.optionName[0] = "A";
            this.optionName[1] = "B";
            this.optionName[2] = "C";
            this.optionName[3] = "D";
        }
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
      api.testAxiosGet(ApiPath.url.findVocationId, params)
        .then((res) => {
          if (res.state == "0") {
            for (let i = 0; i < res.data.length; i++) {
              this.vocationIdOptions.push({
                value: res.data[i]["id"],
                label: res.data[i]["name"],
              });
            }
          }
        }).catch(function (error) {});
    },
    //新增保存
    saveQuestionInfo(editData) {
      this.$refs[editData].validate((valid) => {
        if (valid) {
          this.option[0] = this.editForm.optionA;
          this.option[1] = this.editForm.optionB;
          this.option[2] = this.editForm.optionC;
          this.option[3] = this.editForm.optionD;
          console.log(this.option)
          let addOption = [];
          let add = [];
          for(let i=0; i<this.option.length;i++){
            add.push(this.option[i]);
          }
          addOption = add.join(",");

          let addName = [];
          let tit = [];
          for(let j=0; j<this.optionName.length;j++){
            tit.push(this.optionName[j]);
          }
          addName = tit.join(",");
            let params = {
              eduQuestionInfoEntity: this.editForm,
              addOption: addOption,
              addName: addName
            };
            api.testAxiosGet(ApiPath.url.addQuestionInfo, params)
              .then((res) => {
                let code = res.state;
                if (code == "0") {
                  this.close();
                  this.$message.success(res.message);
                } else {
                  this.$message.error(res.message);
                }
              }).catch(function (err) {});
                this.fullscreenLoading = true;
                setTimeout(() => {
                    this.fullscreenLoading = false;
                    this.editForm.vocationId=""
                    this.editForm.quType=0;
                    this.editForm.quContent = "";
                    this.editForm.answer = "";
                    this.editForm.score = "";
                    this.aShow = true;
                    this.bShow = true;
                    this.cShow = true;
                    this.dShow = true;
                    this.option = [];
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