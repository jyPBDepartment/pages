<template>
  <el-dialog
    :visible.sync="localShow"
    :title="title"
    :before-close="beforeClose"
    append-to-body
    modal-append-to-body
    :close-on-click-modal="false"
    :close-on-press-escape="false"
  >
    <div slot="title" class="dialog-title">
      {{ title }}
    </div>
    <ul>
      <li>
        <span class="title">评论人：</span>
        <span class="content">{{ commentInfoForm.user }}</span>
      </li>
      <li>
        <span class="title">评论时间：</span>
        <span class="content">{{ commentInfoForm.date }}</span>
      </li>
      <li>
        <span class="title">标题：</span>
        <span class="content">{{ commentInfoForm.title }}</span>
      </li>
      <li>
        <span class="title">评论内容：</span>
        <span class="content">{{ commentInfoForm.content }}</span>
      </li>
    </ul>
    <span slot="footer">
      <el-button type="info" icon="el-icon-close" @click="close" size="small">
        关闭
      </el-button>
    </span>
  </el-dialog>
</template>
<script>
import ApiPath from "@/api/ApiPath.js";
import api from "@/axios/api.js";

export default {
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: "对话框",
    },
    transCommentInfo: {
      type: Array,
    },
  },
  data() {
    return {
      localShow: this.show,
      imgUrl: "",
      fileList: [],
      commentInfoForm: {},
    };
  },
  watch: {
    show(val) {
      this.localShow = val;
    },
    //根据Id查询用户信息
    transCommentInfo(val) {
      this.commentInfoForm.title = val[0].row.title;
      this.commentInfoForm.date = val[0].row.date;
      this.commentInfoForm.user = val[0].row.commentUserName;
      this.commentInfoForm.content = val[0].row.commentContent;
    },
  },
  methods: {
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
ul {
  margin: 0 20px;
  padding: 0;
}
li {
  line-height: 40px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #eeeeee;
  margin-bottom: 10px;
}
li > span {
  display: inline-block;
  min-width: 120px;
}

li > span:last-child {
  margin-left: 20px;
}

li > .image {
  width: 200px;
  height: 200px;
  margin: 5px 0 5px 20px;
}
.dialog-title {
  width: 100%;
  line-height: 40px;
  text-align: center;
  color: #333;
  font-weight: 600;
  font-size: 18px;
  border-bottom: 1px #eeeeee solid;
}

.title {
  text-align: right;
  font-size: 14px;
  font-weight: 600;
  color: #333;
}
.content {
  color: #666;
  font-weight: 500;
  font-size: 14px;
}
.contentText {
  text-align: center;
  margin-left: 20px;
}
.contentText >>> img {
  width: 200px;
  height: 200px;
  margin: 10px;
}
</style>