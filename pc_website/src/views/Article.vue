<template>
  <div class="article">
    <div class="w">
      <el-row class="R_row">
        <el-col :span="20" :offset="2">
          <el-row class="label_nav">
            <div class="label">最新发布</div>
            <div class="label">最新发布</div>
            <div class="label">最新发布</div>
            <div class="label">最新发布</div>
            <div class="label">最新发布</div>
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
                    
                </div>
                <div class="option">
                  <p>
                    <i class="el-icon-arrow-right" /> 下一篇：
                    <span>共抗疫情 中通天鸿呼叫中心系统助力生鲜平台保障居民菜篮子</span>
                  </p>
                  <p>
                    <i class="el-icon-arrow-right" /> 上一篇：
                    <span>共抗疫情 中通天鸿呼叫中心系统助力生鲜平台保障居民菜篮子</span>
                  </p>
                </div>
              </el-row>
            </el-col>
            <el-col :span="6" class="right_float">
              <el-row class="R_row_area">
                <el-row class="hot" v-for="(item, index2) in freshList" :key="index2">
                  <h4>{{item.title}}</h4>
                  <p v-for="(item, index3) in item.contentList" :key="index3">{{item}}</p>
                </el-row>
              </el-row>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      freshList: [
        {
          title: "热门文章",
          contentList: [
            "为呼叫中心运营安全护航 中通天鸿发起第二届“运营安全日”活动",
            "为呼叫中心运营安全护航 中通天鸿发起第二届“运营安全日”活动",
            "为呼叫中心运营安全护航 中通天鸿发起第二届“运营安全日”活动",
            "为呼叫中心运营安全护航 中通天鸿发起第二届“运营安全日”活动",
            "为呼叫中心运营安全护航 中通天鸿发起第二届“运营安全日”活动",
            "为呼叫中心运营安全护航 中通天鸿发起第二届“运营安全日”活动"
          ]
        },
        {
          title: "最新发布",
          contentList: [
            "为呼叫中心运营安全护航 中通天鸿发起第二届“运营安全日”活动",
            "为呼叫中心运营安全护航 中通天鸿发起第二届“运营安全日”活动",
            "为呼叫中心运营安全护航 中通天鸿发起第二届“运营安全日”活动"
          ]
        }
      ],
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
  mounted() {},
  created() {},
  methods: {
    handleClick(tab) {
      this.$router.push({
        name: "real_time_info",
        params: { label: tab.$options.propsData.label }
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
