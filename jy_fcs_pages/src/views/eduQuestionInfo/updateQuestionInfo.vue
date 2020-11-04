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
          <el-input type="textarea" v-model="editForm.quContent" rows="3" size="small" placeholder="请输入题目(限255个字)" style="width:80%;" maxlength="255"></el-input>
        </el-form-item>
        <el-form-item label="选项A" prop="optionA" v-if="aShow">
          <el-input type="text" v-model="option[0]" size="small" placeholder="请输入选项A(限255个字)" style="width:80%;" maxlength="255"></el-input>
        </el-form-item>
        <el-form-item label="选项B" prop="optionB" v-if="bShow">
          <el-input type="text" v-model="option[1]" size="small" placeholder="请输入选项B(限255个字)" style="width:80%;" maxlength="255"></el-input>
        </el-form-item>
        <el-form-item label="选项C" prop="optionC" v-if="cShow">
          <el-input type="text" v-model="option[2]" size="small" placeholder="请输入选项C(限255个字)" style="width:80%;" maxlength="255"></el-input>
        </el-form-item>
        <el-form-item label="选项D" prop="optionD" v-if="dShow">
          <el-input type="text" v-model="option[3]" size="small" placeholder="请输入选项D(限255个字)" style="width:80%;" maxlength="255"></el-input>
        </el-form-item>
        <el-form-item label="正确答案" prop="answer">
          <el-input type="text" v-model="editForm.answer" size="small" placeholder="正确答案" style="width:30%;" maxlength="5"></el-input>
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
      <el-button type="primary" icon="el-icon-check" @click="updateQuestionInfo('editForm')" v-loading.fullscreen.lock="fullscreenLoading">保存</el-button>
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
    transQuestionInfoId: {
      type: String,
    },
  },
  data() {
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
            quType:"",
            quContent:"",
            vocation:""
        },
        vocationIdOptions: [],
        scoreOptions:[
            {value: "2", label: "2"},
            {value: "5", label: "5"},
            {value: "10", label: "10"}
        ],
        localShow: this.show,
        rules: {
            vocationId: [{required: true, message: "请选择职业类别", trigger: "bulr"}],
            quType: [{required: true, message: "请选择试题类型", trigger: "bulr"}],
            quContent: [{required: true, message: "请输入问题描述", trigger: "bulr"}],
            answer: [{required: true, message: "请输入正确答案", trigger: "bulr"}],
            score: [{required: true, message: "请选择分数", trigger: "bulr"}],
        },
    };
  },
  watch: {
    show(val) {
      this.localShow = val;
    },
    transQuestionInfoId(val){
        let params = {
        id: val,
      };
       //根据Id查询用户信息
      api.testAxiosGet(ApiPath.url.questionFindById, params).then((res) => {
        this.editForm = res.data;
        this.editForm.vocationId = this.editForm.vocation.id;
        this.selectQuType(res.data.quType);
        for(let i=0;i<res.dataOption.length;i++){
            if(res.dataOption[i].title == "A"){
                this.option[0] = res.dataOption[i].content;
            }
            if(res.dataOption[i].title == "B"){
                this.option[1] = res.dataOption[i].content;
            }
            if(res.dataOption[i].title == "C"){
                this.option[2] = res.dataOption[i].content;
            }
            if(res.dataOption[i].title == "D"){
                this.option[3] = res.dataOption[i].content;
            }
        }
      });
    }
  },
  mounted() {
    this.findVocationId();
  },
  methods: {
    selectQuType(result){
        if(result == 0){
            this.aShow = true;
            this.bShow = true;
            this.cShow = true;
            this.dShow = true;
            this.option[0] = "";
            this.option[1] = "";
            this.option[2] = "";
            this.option[3] = "";
            this.optionName[0] = "A";
            this.optionName[1] = "B";
            this.optionName[2] = "C";
            this.optionName[3] = "D";
        }
        if(result == 1){
            this.aShow = true;
            this.bShow = true;
            this.cShow = false;
            this.dShow = false;
            this.option[0] = "";
            this.option[1] = "";
            this.option[2] = "";
            this.option[3] = "";
            this.optionName[0] = "A";
            this.optionName[1] = "B";
        }
    },
    beforeClose() {
      this.close();
    },
    close: function () {
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

    //保存
    updateQuestionInfo(editData) {
      this.$refs[editData].validate((valid) => {
        if (this.editForm.vocationId == "") {
          this.$alert("职业类别不能为空", "提示", {
            confirmButtonText: "确定",
          });
          return false;
        }
        if (this.editForm.quContent == "") {
          this.$alert("问题描述不能为空", "提示", {
            confirmButtonText: "确定",
          });
          return false;
        }
        if(this.editForm.quType == 0){
          if (this.option[0] == "") {
            this.$alert("选项A不能为空", "提示", {
              confirmButtonText: "确定",
            });
            return false;
          }
          if (this.option[1] == "") {
            this.$alert("选项B不能为空", "提示", {
              confirmButtonText: "确定",
            });
            return false;
          }
          if (this.option[2] == "") {
            this.$alert("选项C不能为空", "提示", {
              confirmButtonText: "确定",
            });
            return false;
          }if (this.option[3] == "") {
            this.$alert("选项D不能为空", "提示", {
              confirmButtonText: "确定",
            });
            return false;
          }
          if (!/^[A-D]$/.test(this.editForm.answer)) {
            this.$alert("请输入正确答案！", "提示", {
              confirmButtonText: "确定",
            });
            this.editForm.answer = "";
          }
        }
        if(this.editForm.quType == 1){
          if (this.option[0] == "") {
            this.$alert("选项A不能为空", "提示", {
              confirmButtonText: "确定",
            });
            return false;
          }
          if (this.option[1] == "") {
            this.$alert("选项B不能为空", "提示", {
              confirmButtonText: "确定",
            });
            return false;
          }
          if (!/^[A-B]$/.test(this.editForm.answer)) {
            this.$alert("请输入正确答案(判断题只能输入A或B)！", "提示", {
              confirmButtonText: "确定",
            });
            this.editForm.answer = "";
          }
        }
        if (this.editForm.score == "") {
          this.$alert("分数不能为空", "提示", {
            confirmButtonText: "确定",
          });
          return false;
        }
        if (valid) {
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
            api.testAxiosGet(ApiPath.url.updateQuestionInfo, params)
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