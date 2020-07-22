<template>
  <div class="upload">
    <div class="title">图片上传功能示例</div>
    <el-form class="demo-ruleForm" label-width="80px">
      <el-form-item>
        <el-upload
          style="width:81%"
          class="upload-demo"
          :action="upload"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :file-list="fileList"
          list-type="picture"
          :on-success="uploadSuccess"
          :limit="limit"
          :on-exceed="uploadExceed"
        >
          <el-button size="small" type="primary" style="width:150%" icon="el-icon-plus">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </el-form-item>
      <el-form-item label="http链接" v-show="flag">
        <el-input v-model="imgUrl" readonly></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
//后台路径引用
import ApiPath from "@/api/ApiPath.js";
//数据请求交互引用
import api from "@/axios/api.js";

export default {
  data() {
    return {
      upload: ApiPath.url.uploadImg,
      fileList: [],
      limit: 1,
      imgUrl: "",
      flag: false
    };
  },
  watch: {
    show(val) {
      this.localShow = val;
    }
  },

  created() {},

  methods: {
    //logo图片
    uploadExceed(files, fileList) {
      this.$message.error("只能上传一个图片，如需修改请先删除图片！");
      return;
    },
    uploadSuccess(response, file, fileList) {
        console.log(response.url)
      this.flag = true;
      this.imgUrl = response.url;
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    }
  }
};
</script>

<style scoped>
.demo-ruleForm {
  margin-top: 20px;
}
.el-form {
  padding-left: 266px;
  padding-top: 80px;
}
.el-button {
  display: inline-block;
  cursor: pointer;
  text-align: center;
  outline: none;
  color: #fff;
  border-radius: 15px;
  box-shadow: 0 6px #999;
}
.el-button:hover {
  background-color: #8cb2eb;
}
.el-button:active {
  background-color: #53bddd;
  box-shadow: 0 5px #666;
  transform: translateY(4px);
}
.el-upload__tip {
  font-size: 14px;
  font-family: "微软雅黑";
  font-style: oblique;
  color: rgb(248, 90, 90);
  font-weight: bold;
}

.upload .title {
  font-size: 26px;
  font-family: "微软雅黑";
  font-weight: bold;
  margin: 0 auto; /* 居中 这个是必须的，，其它的属性非必须 */
  width: 500px; /* 给个宽度 顶到浏览器的两边就看不出居中效果了 */
  text-align: center; /* 文字等内容居中 */
  margin-top:40px;
}
</style>
