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
      <el-form
        :model="editForm"
        ref="editForm"
        :label-position="labelPosition"
        label-width="100px"
        style="margin-left: -85px"
      >
        <el-row>
          <el-col :span="3"><b>试卷名称：</b></el-col>
          <el-col :span="3"
            ><b>{{ editForm.name }}</b></el-col
          >
          <el-col :span="3"><b>答题时间：</b></el-col>
          <el-col :span="3"
            ><b>{{ editForm.answerTime }}</b></el-col
          >
          <el-col :span="4">所属职业类别：</el-col>
          <el-col :span="3">{{ editForm.vocation.name }}</el-col>
        </el-row>
        <div>
          <el-row v-for="(item, index) in List" :key="index">
            <el-col :span="1">{{ index + 1 }}、</el-col>
            <el-col :span="14">{{ item.quContent }}</el-col>
            <span>答案：</span>
            <el-row v-for="(answerItem, index1) in item.optionList" :key="index1">
              <el-col :span="15"
                >{{ answerItem.title }}、
                {{ answerItem.content }}</el-col
              >
              <!-- <el-col :span="5"></el-col>              -->
            </el-row>
          </el-row>
        </div>
      </el-form>
    </slot>
    <!-- 按钮区 -->
    <span slot="footer">
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
    transShowExamPaperId: {
      type: Object,
    },
  },
  data() {
    return {
      fullscreenLoading: false,
      labelPosition: "right",
      editForm: {
        name: "",
        answerTime: "",
        vocation: "",
      },
      List: [],
      answerList: [],
      localShow: this.show,
    };
  },
  watch: {
    show(val) {
      this.localShow = val;
    },
    transShowExamPaperId(val) {
      alert('预览'+val);
      if(val == {}){
        return;
      }
      this.List = val.listData;
      // alert(val.listData)
      this.editForm.name = val.name;
      // this.editForm.vocation = val.vocation
      this.editForm.answerTime = val.answerTime;
      // console.log("111"+val.listData[0].id)
      // console.log("111"+this.List.length)
      let question = [];
      let ids = "";
      for (let i = 0; i < this.List.length; i++) {
        if (i == this.List.length-1) {
          ids = ids + this.List[i].id;
        } else {
          ids = ids + this.List[i].id + ",";
        }
      }

      let params = {
        idArray: ids
      };
      api.testAxiosGet(ApiPath.url.preview, params).then((res) => {

if(res.state==0){
  this.List=res.data;


}
console.log(res.data)

return 
        // if(res.state==0){
        //   res.data
        // }
        let answer = [];
        for (let j = 0; j < res.data.length; j++) {
          answer[j] = res.data[j];
          // console.log(res.data[j])
          console.log(answer[j]);
        }
        this.answerList = answer;
        // this.answerList[i].answerItem.title = answer.title
        // this.answerList[i].answerItem.content = answer.content
        // question = answer
        // this.answerList[i] = answer
        console.log(JSON.stringify(answer));
        console.log(JSON.stringify(this.answerList));
      });

      // }
    },
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