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
        <span class="title">病虫害名称：</span>
        <span class="content">{{ caseInfoForm.name }}</span>
      </li>
      <li>
        <span class="title">病虫害状态：</span>
        <span class="content">{{
          caseInfoForm.auditStatus == "1" ? "启用" : "禁用"
        }}</span>
      </li>
      <li>
        <span class="title">农作物种类：</span>
        <span class="content">{{ caseInfoForm.cropsTypeCode }}</span>
      </li>
      <li>
        <span class="title">病虫害种类：</span>
        <span class="content">{{ caseInfoForm.dipTypeCode }}</span>
      </li>
      <li>
        <span class="title">图片：</span>
        <el-image class="image" :src="caseInfoForm.url"></el-image>
      </li>
      <li>
        <span class="title">概述：</span>
        <div class="contentText" v-html="caseInfoForm.describetion"></div>
      </li>
      <li>
        <span class="title">危害：</span>
        <div class="contentText" v-html="caseInfoForm.harm"></div>
      </li>
      <li>
        <span class="title">传播途径/发病条件：</span>
        <div class="contentText" v-html="caseInfoForm.channel"></div>
      </li>
      <li>
        <span class="title">防治技术：</span>
        <div class="contentText" v-html="caseInfoForm.controlTechnology"></div>
      </li>
      <li>
        <span class="title">是否精选：</span>
        <span v-if="caseInfoForm.isSelected==0" class="content">否</span>
        <span v-else class="content">是</span>
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
    caseContentId: {
      type: String,
    },
  },
  data() {
    return {
      localShow: this.show,
      imgUrl: "",
      fileList: [],
      caseInfoForm: {},
    };
  },
  watch: {
    show(val) {
      this.localShow = val;
    },

    //根据Id查询用户信息
    caseContentId(val) {
      let params = {
        id: val,
      };
      api.testAxiosGet(ApiPath.url.caseFindById, params).then((res) => {
        this.caseInfoForm = res.data;
        let url = res.data.url;
        let urlArry = url.split("/");
        let urlName = urlArry[urlArry.length - 1];
        this.fileList.push({ name: urlName, url: url });
        this.imgUrl = res.data.url;
      });
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