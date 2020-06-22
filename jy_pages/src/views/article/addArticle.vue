<template>
  <el-dialog
    :visible.sync="localShow"
    :title="title"
    :before-close="beforeClose"
    append-to-body
    modal-append-to-body
    width="80%"
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
      >
        <el-form-item label="文章名称" prop="name">
          <el-input
            type="text"
            v-model="editForm.name"
            style="width:85%"
            size="small"
            placeholder="请输入文章名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="标题" prop="title">
          <el-input type="text" v-model="editForm.title" style="width:85%" size="small"></el-input>
        </el-form-item>
        <el-form-item label="分类id" prop="classificationId">
          <el-select v-model="editForm.classificationId" style="width:85%" size="small">
            <el-option
              v-for="item in classificationIdeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="作者" prop="author">
          <el-input type="text" v-model="editForm.author" style="width:85%" size="small"></el-input>
        </el-form-item>
        <el-form-item label="文章内容" prop="content">
          <div class="edit_container">
            <el-card style="height: 610px;width:85%">
              <quill-editor
                v-model="editForm.content"
                ref="myQuillEditor"
                style="height: 500px;width:100%"
                :options="editorOption"
              ></quill-editor>
            </el-card>
          </div>
        </el-form-item>
      </el-form>
    </slot>
    <!-- 按钮区 -->
    <span slot="footer">
      <el-button type="primary" icon="el-icon-check" @click="saveArticle()">保存</el-button>
      <el-button icon="el-icon-close" @click="close">关闭</el-button>
    </span>
  </el-dialog>
</template>
<script>
import qs from "qs";
import Vue from "vue";
import ApiPath from "@/api/ApiPath.js";
import api from "@/axios/api.js";
import { quillEditor } from "vue-quill-editor";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import aes from "@/utils/aes.js";
export default {
  inject: ["reload"],
  props: {
    show: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: "对话框"
    }
  },
  name: "FuncFormsEdit",
  data() {
    return {
      labelPosition: "right",
      editForm: {
        name: "",
        content: "",
        title: "",
        classificationId: "",
        author: ""
      },
      classificationIdeOptions: [],
      localShow: this.show,
      rules: {
        name: [{ required: true, message: "请输入名称", trigger: "blur" }],
        content: [{ required: true, message: "请输入n内容", trigger: "blur" }],
        title: [{ required: true, message: "请输入标题", trigger: "blur" }],
        classificationId: [
          { required: true, message: "选择分类", trigger: "blur" }
        ],
        author: [{ required: true, message: "请输入作者", trigger: "blur" }]
      },
      content: null,
      editorOption: {}
    };
  },
  components: {
    quillEditor
  },
  watch: {
    show(val) {
      this.localShow = val;
    }
  },
  mounted() {
    let params = {
      classificationId: this.editForm.classificationId,
      id: this.editForm.id
    };
    api.testAxiosGet(ApiPath.url.findClassification, params).then(res => {
      let code = res.status;
      if (code == "0") {
        for (let i = 0; i < res.data.length; i++) {
          this.classificationIdeOptions.push({
            value: res.data[i]["id"],
            label: res.data[i]["name"]
          });
        }
      }
    });
  },
  methods: {
    beforeClose() {
      this.close();
    },

    close() {
      this.$emit("close");
    },

    saveArticle: function() {
      if(this.editForm.name!=""&&this.editForm.title!=""&&this.editForm.author!=""&&this.editForm.content!=""&&this.editForm.classificationId!=""){
      let params = {
        articleEntity: this.editForm
      };
      
        api.testAxiosGet(ApiPath.url.addArticle, params).then(res => {
          let code = res.state;
          if (code == "0") {
            this.$message.success(res.message);
            this.loading = false;
          } 
           this.close();
          this.reload();
        });
      }else{
        this.$alert('文章名称，文章标题，分类，作者，文章内容不能为空！', '提示', {confirmButtonText: '确定',});
      }
    }
  }
};
</script>

<style scoped>
.el-form {
  padding-left: 100px;
}
.el-upload__tip {
  font-size: 14px;
  font-family: "微软雅黑";
  font-style: oblique;
  color: rgb(248, 90, 90);
  font-weight: bold;
}
</style>
