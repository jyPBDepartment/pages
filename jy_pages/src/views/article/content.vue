<template>
  <el-dialog
    :visible.sync="localShow"
    :title="title"
    append-to-body
    modal-append-to-body
    width="80%"
    :before-close="beforeClose"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
  >
    <slot>
      <el-form :label-position="labelPosition" label-width="100px">
        <el-form-item>
        <div>
            <el-card style="height: 610px;width:95%" >
              <quill-editor
                v-model="content"
                ref="myQuillEditor"
                style="height: 550px;width:100%"
                disabled
              ></quill-editor>
            </el-card>
          </div>
        </el-form-item>
      </el-form>
    </slot>
    <span slot="footer">
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
    contentShowId: {
      type: String
    }
  },
  name: "FuncFormsEdit",
  data() {
    return {
      labelPosition: "right",
      localShow: this.show,
     
      content: "",
      
    };
  },

  components: {
    quillEditor
  },
  watch: {
    show(val) {
      this.localShow = val;
    },
    contentShowId(val) {
      this.content=val;
    }
  },
   mounted(){},
  methods: {
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