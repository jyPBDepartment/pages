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
      <el-form :model="jurForm" :rules="rules" ref="jurForm" :label-position="labelPosition" label-width="100px">
        <el-form-item label="文章名称" prop="name">
          <el-input type="text" v-model="jurForm.name"  style="width:85%" size="small" ></el-input>
        </el-form-item>
        <el-form-item label="标题" prop="title">
          <el-input type="text" v-model="jurForm.title" style="width:85%" size="small"></el-input>
        </el-form-item>
        <el-form-item label="分类id" prop="classificationId">
          <el-select v-model="jurForm.classificationId" style="width:85%" size="small">
            <el-option
              v-for="item in classificationIdeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="作者" prop="author">
          <el-input type="text" v-model="jurForm.author" style="width:85%" size="small"></el-input>
        </el-form-item>
        <el-form-item label="文章内容" prop="content">
        <div>
            <el-card style="height: 610px;width:85%">
              <quill-editor
                v-model="jurForm.content"
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
      <el-button type="primary" icon="el-icon-check" @click="updateLimit">保存</el-button>
      <el-button icon="el-icon-close" @click="close">关闭</el-button>
    </span>
  </el-dialog>
</template>
<script>
import ApiPath from "@/api/ApiPath.js";
import api from "@/axios/api.js";
import aes from "@/utils/aes.js";
import { quillEditor } from "vue-quill-editor";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
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
    },
    transArticleId: {
      type: String
    }
  },
  name: "FuncFormsEdit",
  data() {
    return {
      labelPosition: "right",
      localShow: this.show,
      classificationIdeOptions:[],
      jurForm: {
        id: "",
        name: "",
        content: "",
        title: "",
        classificationId: "",
        author: "",
      },
       rules: {
       name: [{ required: true, message: "请输入名称", trigger: "blur" }],
        content: [{ required: true, message: "请输入n内容", trigger: "blur" }],
        title:[{ required: true, message: "请输入标题", trigger: "blur" }],
        classificationId:[{ required: true, message: "选择分类", trigger: "blur" }],
        author:[{ required: true, message: "请输入作者", trigger: "blur" }],
      }
    };
  },
  components: {
    quillEditor
  },
  watch: {
    show(val) {
      this.localShow = val;
    },
    transArticleId(val) {
      let params = {
        id: val
      };
      //根据Id查询用户信息
      api.testAxiosGet(ApiPath.url.findArticleById, params).then(res => {
        this.jurForm = res.data;
      });
    }
  },
   mounted(){
    let params = {
        classificationId: this.jurForm.classificationId,
        id:this.jurForm.id 
    };
      api.testAxiosGet(ApiPath.url.findClassification, params).then(res => {
        let code = res.status;
        if (code=="0") {
         for(let i=0;i<res.data.length;i++){
           this.classificationIdeOptions.push({value:res.data[i]["id"],label:res.data[i]["name"]});
         }  
        }
        
      });
  },
  methods: {
    updateLimit: function() {
      console.log("文本内容" + aes.encrypt(this.jurForm.content));

      // this.editForm.content = aes.encrypt(this.editForm.content);

      console.log(
        "解析文本内容" + aes.decrypt("mE159nppZ+CY/ZV40m8UUA==")
      );
      let params = {
        articleEntity: this.jurForm
      };
      //修改用户信息
      api.testAxiosGet(ApiPath.url.updateArticle, params).then(res => {
        this.$message.success(res.message);
        this.close();
        this.reload();
      });
    },
    close: function() {
      this.$emit("close");
    },
    beforeClose: function() {
      this.close();
    }
  }
};
</script>
<style scoped>
.el-form{
padding-left: 100px;
}
</style>