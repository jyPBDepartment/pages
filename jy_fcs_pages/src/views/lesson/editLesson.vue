<template>
  <el-dialog
    :visible.sync="localShow"
    :title="title"
    :before-close="beforeClose"
    append-to-body
    modal-append-to-body
    width="670px"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
  >
    <!-- 插槽区 -->
    <slot>
      <el-form :model="lessonForm" :rules="rules" ref="lessonForm" :label-position="labelPosition" label-width="110px" style="margin-left:-85px">
        <el-form-item label="主图图片"  prop="url">
          <el-link type="danger" class="required" :underline="false">*</el-link>
          <el-upload
            style="width:92%;margin-top:-38px;"
            class="upload-demo"
            :action="upload"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :file-list="fileList"
            list-type="picture"
            :on-success="uploadSuccess"
            :limit="limit"
            :on-exceed="uploadExceed"
            :beforeUpload="beforeAvatarUpload"
          >
            <el-button size="small" type="primary" style="width:150%" icon="el-icon-plus">点击上传</el-button>
            <div slot="tip">只能上传jpg/png文件，且不超过1M</div>
          </el-upload>
        </el-form-item>
        <el-form-item label="课程名称" prop="title">
          <el-input type="text" v-model="lessonForm.title" size="small" placeholder="不超过32个字" style="width:97%" maxlength="32"></el-input>
        </el-form-item>
        <el-row>
          <el-col :span="12">
        <el-form-item label="职业类别" prop="vocationId">
          <el-select v-model="lessonForm.vocationId" placeholder="请选择" size="small" style="width:92%">
            <el-option
              v-for="item in vocationOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              class="option"
            ></el-option>
          </el-select>
        </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="主讲人" prop="teacherName">
              <el-input type="text" v-model="lessonForm.teacherName" size="small" placeholder="不超过32个字" style="width:92%" maxlength="32"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
        <el-form-item label="上课日期" prop="lessonDay">
          <el-date-picker
            v-model="lessonForm.lessonDay"
            type="date" size="small" style="width:92%" 
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="报名截止日期" prop="closingDate">
              <el-date-picker
                v-model="lessonForm.closingDate"
                type="date" size="small" style="width:92%" 
                placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
        <el-form-item label="上课开始时间" prop="beginDate">
            <el-time-select
              placeholder="开始时间" style="width:92%"
              v-model="lessonForm.beginDate"
              :picker-options="{
                start: '08:30',
                step: '00:15',
                end: '18:30'
              }">
            </el-time-select>
        </el-form-item>
          </el-col>
           <el-col :span="12">
        <el-form-item label="上课结束时间" prop="endDate">
          <el-time-select
              placeholder="结束时间" style="width:92%"
              v-model="lessonForm.endDate"
              :picker-options="{
                start: '08:30',
                step: '00:15',
                end: '18:30',
                minTime: lessonForm.beginDate
              }">
          </el-time-select>
        </el-form-item>
           </el-col>
        </el-row>     
        <el-row>
          <el-col :span="12">
            <el-form-item label="人数限制"  prop="stuLimit">
              <el-input type="number" placeholder="人数限制" v-model="lessonForm.stuLimit" size="small" style="width:92%"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="课程地点" prop="address">
            <el-input type="text" placeholder="课程地点" v-model="lessonForm.address" size="small" style="width:97%" ></el-input>
        </el-form-item>   
        <el-form-item label="课程介绍" prop="content">
          <el-input type="textarea" v-model="lessonForm.content" :rows="5" size="small" style="width:97%"></el-input>
        </el-form-item>
        <el-form-item label="参加指南" prop="remark">
          <el-input type="textarea" v-model="lessonForm.remark" :rows="5" size="small" style="width:97%"></el-input>
        </el-form-item>
        
      </el-form>
    </slot>
    <!-- 按钮区 -->
    <span slot="footer">
      <el-button type="primary" icon="el-icon-check" @click="saveModuleInfo('lessonForm')" v-loading.fullscreen.lock="fullscreenLoading">保存</el-button>
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
    transLessonInfoId: {
      type: String,
    },
  },
  data() {
    return {
      fullscreenLoading: false,
      labelPosition: "right",
      lessonForm: {
        title: "",
        vocationId:"",
        address:"",
        content:"",
        closingDate:"",
        updateBy: localStorage.getItem("userInfo"),
        lessonDay:"",
        beginDate:"",
        endDate:"",
        teacherName:"",
        stuLimit:"",
        remark:"",
        beginDate:"",
        endDate:"",
        url:""
      },
      limit:1,
      imgUrl:"",
      vocationOptions: [],
      fileList: [],
      upload: ApiPath.url.uploadImg,
      localShow: this.show,
      rules: {
        title: [{ required: true, message: "请输入课程名称", trigger: "blur" }],
        vocationId: [{ required: true, message: "请选择职业类别", trigger: "blur" }],
        address: [{ required: true, message: "请输入课程地点", trigger: "blur" }],
        content: [{ required: true, message: "请输入课程介绍", trigger: "blur" }],
        lessonDay: [{ required: true, message: "请输入上课日期", trigger: "blur" }],
        beginDate: [{ required: true, message: "请输入课程开始时间", trigger: "blur" }],
        endDate: [{ required: true, message: "请输入课程结束时间", trigger: "blur" }],
        stuLimit: [{ required: true, message: "请输入最大上课人数", trigger: "blur" }],
        closingDate:[{ required: true, message: "请输入报名截止日期", trigger: "blur" }],
        remark: [{ required: true, message: "请输入参加指南", trigger: "blur" }],
        teacherName:[{ required: true, message: "请输入主讲人", trigger: "blur" }]
      },
    };
  },
  watch: {
    show(val) {
      this.localShow = val;
    },
    transLessonInfoId(val) {
      //alert(val)
      if(val == ""){
        return;
      }
      let params = {
        id: val,
      };
      //根据Id查询用户信息
      api.testAxiosPost(ApiPath.url.findLessonById, params).then((res) => {
        this.lessonForm = res.data;
        this.lessonForm.vocationId = res.data.vocation.id;
        let url = res.data.url;
        let urlArry = url.split("/");
        let urlName = urlArry[urlArry.length - 1];
        this.fileList.push({ name: urlName, url: url });
        this.imgUrl = res.data.url;
      });
    }
  },
  mounted() {
    this.findContext();
  },
  methods: {
    //下拉列表显示
    findContext: function () {
      let params = {};
      api
        .testAxiosGet(ApiPath.url.findVocationOptions, params)
        .then((res) => {
          if (res.state == "0") {
            // this.powerOptions.push({ value: "", label: "请选择" });
            for (let i = 0; i < res.data.length; i++) {
              this.vocationOptions.push({
                value: res.data[i]["id"],
                label: res.data[i]["name"],
              });
            }
          }
        })
        .catch(function (error) {});
    },

    beforeAvatarUpload(file) {
      var testmsg = file.name.substring(file.name.lastIndexOf(".") + 1);
      const extension = testmsg === "jpg";
      const extension2 = testmsg === "png";
      const isLt2M = file.size / 1024 / 1024 < 1;
      if (!extension && !extension2) {
        this.$message({
          message: "上传文件只能是 jpg、png格式!",
          type: "warning",
        });
      }
      if (!isLt2M) {
        this.$message({
          message: "上传文件大小不能超过 1M!",
          type: "warning",
        });
      }
      return (extension || extension2) && isLt2M;
    },
    uploadExceed(files, fileList) {
      this.$message.error("只能上传一个图片，如需修改请先删除图片！");
      return;
    },
    uploadSuccess(response, file, fileList) {
      this.imgUrl = response.url;
    },
    handleRemove(file, fileList) {
      this.imgUrl="",
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    beforeClose() {
      this.close();
    },
    close() {
      this.fileList=[];
      this.$emit("close");
    },
    //新增保存
    saveModuleInfo(editData) {
      this.$refs[editData].validate((valid) => {

        if (valid) {
          if (this.imgUrl != "") {
            this.lessonForm.url = this.imgUrl;
            let params = {
              lessonEntity: this.lessonForm,
            };
            api.testAxiosGet(ApiPath.url.updateLesson, params)
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
                setTimeout(() => {this.fullscreenLoading = false}, 500);
          } else {
            this.$message.error("请上传图片");
            return;
          }
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