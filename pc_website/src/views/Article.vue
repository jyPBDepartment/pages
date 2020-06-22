<template>
  <div class="article">
    <div class="w">
      <el-row class="R_row">
        <el-col :span="20" :offset="2">
          <el-row class="label_nav">
            <!-- <div class="label">最新发布</div>
            <div class="label">最新发布</div>
            <div class="label">最新发布</div>
            <div class="label">最新发布</div>
            <div class="label">最新发布</div>-->
          </el-row>

          <el-row>
            <el-col :span="18">
              <el-row class="article_title">
                <div :span="12" class="title">
                  <i class="el-icon-s-home" />
                  <span>资讯中心</span>
                </div>
                <div :span="12" class="title title1">
                  <i class="el-icon-arrow-left" />
                  <span>返回</span>
                </div>
              </el-row>
              <el-row class="breadcrumb">
                <el-breadcrumb separator="/">
                  <el-breadcrumb-item :to="{ path: '/real_time_info' }">资讯中心</el-breadcrumb-item>
                  <el-breadcrumb-item>活动列表</el-breadcrumb-item>
                </el-breadcrumb>
              </el-row>

              <el-row class="content">
                <div class="text">
                  <div class="article_header">{{airTitle}}</div>
                  <div class="article_source">
                    <i class="el-icon-time" />
                    {{airReleaseDate}}
                    <i class="el-icon-view" />
                    {{airHits}}
                    <i class="el-icon-edit" />
                    {{airAuthor}}
                  </div>
                  <div class="article_content">
                    <p v-html="ariContent">{{ariContent}}</p>
                  </div>
                </div>
                <div class="option">
                <el-row>
                  <h5>上一篇：</h5>
                  <el-row  v-for="item in articleOn" :key="item.id">
                    <a @click="link(item.id)" target="view_window">{{item.title}}</a>
                  </el-row>
                  <h5>下一篇：</h5>
                  <el-row  v-for="item in articleUp" :key="item.id">
                    <a @click="link(item.id)" target="view_window">{{airTitle}}</a>
                  </el-row>
                </el-row>
                </div>
              </el-row>
            </el-col>
            <el-col :span="6" class="right_float">
              <el-row class="R_row_area">
                <div>
                <el-row>
                  <h4>热门文章</h4>
                  <el-row  v-for="item in freshList" :key="item.id">
                    <a @click="link(item.id)" target="view_window">{{item.title}}</a>
                  </el-row>
                </el-row>

                <el-row>
                  <h4>最新发布</h4>
                  <el-row  v-for="item in contentList" :key="item.id">
                    <a @click="link(item.id)" target="view_window">{{item.title}}</a>
                  </el-row>
                </el-row>
                </div>
              </el-row>
              <!-- <el-row class="R_row_area">
                <el-row class="hot" v-for="(item, index2) in freshList" :key="index2">
                  <h4>{{item.title}}</h4>
                  <p v-for="(item, index3) in item.contentList" :key="index3">{{item}}</p>
                </el-row>
              </el-row>-->
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import ApiPath from "@/api/ApiPath.js";
import api from "@/axios/api.js";
export default {
  components: {},
  props: {
    airIds: {
      type: String,
      default: localStorage.getItem("artcleId")
    }
  },
  data() {
    return {
      //文章基础信息
      // airIds:localStorage.getItem("artcleId"),
      airTitle: "",
      airReleaseDate: "",
      airHits: "",
      airAuthor: "",
      ariContent: "",
      airId: this.$route.query.id,
      freshList: [],
      contentList: [],
      articleOn:[],
      selectLabel: "最新发布",
      tabsLabel: [
        {
          label: "最新发布"
        },
        {
          label: "昨天发布"
        },
        {
          label: "明天发布"
        }
      ]
    };
  },
  watch: {
    $route: (to, from) => {
      console.log(from);
      let params = {
        id: to.query.id
      };      
      api.testAxiosGet(ApiPath.url.findByIdArticle, params).then(res => {
        this.airTitle = "";
        this.airReleaseDate = "";
        this.airHits = "";
        this.airAuthor = "";
        this.ariContent = "";
        // alert(111);
        let code = res.state;
        if (code == 0) {

          console.log("标题："+res.data.title)
          this.airTitle = res.data.title;
          this.airReleaseDate = res.data.releaseDate;
          this.airHits = res.data.hits;
          this.airAuthor = res.data.author;
          this.ariContent = res.data.content;
          
          //   if (window.localStorage.getItem("data") ) {
          //     this.$store.replaceState(Object.assign({}, this.$store.state,JSON.parse(window.localStorage.getItem("data"))))
          //   }

          //   window.addEventListener("beforeunload",()=>{
          //   window.localStorage.setItem("list",JSON.stringify(this.$store.state))
          // })
          // console.log("文章基础信息："+JSON.stringify(res.data))
        }
      });
    }
  },
  mounted() {},
  created() {
    this.transJurisdictionId(this.airId);
    this.initArticle();
    this.initArticl();
    // this.findOn(this.airId);
     this.initFindOn();
  },
  methods: {
    link(item) {
      this.$router.push({ name: "article", query: { id: item } });
      location. reload();
    },

    //查询文章基础信息
    transJurisdictionId(val) {
      let params = {
        id: val
      };
      api.testAxiosGet(ApiPath.url.findByIdArticle, params).then(res => {
        let code = res.state;
        if (code == 0) {
          this.airTitle = res.data.title;
          this.airReleaseDate = res.data.releaseDate;
          this.airHits = res.data.hits;
          this.airAuthor = res.data.author;
          this.ariContent = res.data.content;
          //   if (window.localStorage.getItem("data") ) {
          //     this.$store.replaceState(Object.assign({}, this.$store.state,JSON.parse(window.localStorage.getItem("data"))))
          //   }

          //   window.addEventListener("beforeunload",()=>{
          //   window.localStorage.setItem("list",JSON.stringify(this.$store.state))
          // })
          // console.log("文章基础信息："+JSON.stringify(res.data))
        }
      });
    },

    handleClick(tab) {
      this.$router.push({
        name: "real_time_info",
        params: { label: tab.$options.propsData.label }
      });
    },

    initArticle() {
      let params = {};
      api.testAxiosGet(ApiPath.url.articleFindTop, params).then(res => {
        let code = res.state;
        if (code == 0) {
          this.freshList = res.data;
        }
      });
    },

    initArticl() {
      let params = {};
      api.testAxiosGet(ApiPath.url.findIsRecommend, params).then(res => {
        let code = res.state;
        if (code == 0) {
          this.contentList = res.data;
        }
      });
    },

    initFindOn() {
      let params = {
        // id:val
      };
      api.testAxiosGet(ApiPath.url.findOn, params).then(res => {
        let code = res.state;
        if (code == 0) {
          this.articleOn = res.data;
        }
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.article {
  background: #f9f9f9;
  .label_nav {
    display: flex;
    border-bottom: 1px solid #e4e7ed;
    margin-bottom: 30px;
    .label {
      margin-top: 40px;
      padding: 0 20px;
      line-height: 40px;
      border-top-left-radius: 4px;
      border-top-right-radius: 4px;
      font-size: 14px;
      font-weight: 500;
      color: #fff;
      background-color: #d2d7db;
      cursor: pointer;
      border-bottom: 1px solid transparent;
      border-left: 1px solid #e4e7ed;
    }
  }
  .article_title {
    font-size: 15px;
    color: #bbb;
    display: flex;
    align-items: center;
    margin-bottom: 8px;
    i {
      font-size: 20px;
      margin-right: 5px;
    }
    .title {
      display: flex;
      align-items: center;
      width: calc(100% - 55px);
      span {
        cursor: pointer;
        &:hover {
          color: #40aefc;
        }
      }
    }
    .title1 {
      width: 55px !important;
    }
  }
  .breadcrumb {
    margin-bottom: 16px;
  }
  .content {
    padding: 20px;
    width: 100%;
    background: #fff;
    .text {
      .article_header {
        font-size: 32px;
        color: #333;
        font-weight: normal;
        margin-bottom: 15px;
      }
      .article_source {
        display: flex;
        color: #bbb;
        font-size: 14px;
        align-items: center;
        margin-bottom: 30px;
        i {
          font-size: 20px;
          margin-right: 10px;
          &:nth-child(2),
          &:nth-child(3) {
            margin-left: 30px;
          }
        }
      }
    }
    .option {
      margin-top: 20px;
      border-top: 1px solid #eee;
      p {
        display: flex;
        align-items: center;
        color: #666;
        font-size: 16px;
        i {
          margin-right: 5px;
          font-size: 16px;
        }
        span {
          cursor: pointer;
          &:hover {
            color: #40aefc;
          }
        }
      }
    }
  }
  .R_row_area {
    margin-left: 25px;
    padding: 30px;
    background: #fff;
    border: 1px solid #f4f4f4;

    .hot {
      h4 {
        margin: 0 0 15px 0;
        color: #202020;
        font-size: 20px;
      }
      p {
        margin: 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        cursor: pointer;
        font-size: 14px;
        color: #666;
        line-height: 32px;
        &:hover {
          color: #40aefc;
        }
      }
      &:nth-child(2) {
        margin-top: 30px;
      }
    }
  }
}
</style>
