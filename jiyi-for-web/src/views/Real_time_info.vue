<template>
  <div class="Real_time_info">
    <div class="w">
      <el-row class="R_row">
        <el-col :span="20" :offset="2">
          <el-tabs class="R_row_tabs" v-model="selectLabel" type="card" @tab-click="handleClick">
            <el-tab-pane
              v-for="(item, index) in tabsLabel"
              :key="index"
              :label="item.label"
              :name="item.label"
              class="el-tab-pane"
            >
              <el-row>
                <el-col :span="18" v-for="(item, index1) in item.tabsList" :key="index1">
                  <el-row class="list">
                    <h1 class="title">{{ item.title }}</h1>
                    <el-row type="flex" class="content">
                      <el-col class="_img">
                        <img :src="item.src" alt />
                      </el-col>
                      <el-col class="list_text">
                        <p>{{ item.briefInfo }}</p>

                        <el-row class="all">>> 阅读全文</el-row>
                      </el-col>
                    </el-row>
                    <el-row type="flex" class="time">
                      <i class="el-icon-time"></i>
                      发布于{{ item.releaseTime }}
                      <i class="el-icon-view left"></i>
                      {{ item.number }} 人查看
                      <i class="el-icon-edit left"></i>
                      来源 {{item.source}}
                    </el-row>
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
            </el-tab-pane>
          </el-tabs>
        </el-col>
      </el-row>
      <el-row class="R_row">
        <el-pagination class="R_pagination" background layout="prev, pager, next" :total="50"></el-pagination>
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
          label: "最新发布",
          tabsList: [
            {
              title:
                "为呼叫中心运营安全护航 中通天鸿发起第二届“运营安全日”活动",
              src:
                "http://www.icsoc.net/help/blog/wp-content/uploads/2020/04/官博1-688x377.jpg",
              briefInfo:
                "2020年4月25日，中通天鸿发起第二届呼叫中心“运营安全日”活动，倡导公司时刻将呼叫中心运营安全铭记在心，“保持警觉，全员出击，运营安全，你我……",
              releaseTime: "2020-04-25 11:35:05",
              number: "98",
              source: "王世国"
            },
            {
              title:
                "为呼叫中心运营安全护航 中通天鸿发起第二届“运营安全日”活动",
              src: "https://yanxuan.nosdn.127.net/35586d93822df89a19073e285718e46f.png",
              briefInfo:
                "2020年4月25日，中通天鸿发起第二届呼叫中心“运营安全日”活动，倡导公司时刻将呼叫中心运营安全铭记在心，“保持警觉，全员出击，运营安全，你我……",
              releaseTime: "2020-04-25 11:35:05",
              number: "98",
              source: "王世国"
            },

            {
              title:
                "为呼叫中心运营安全护航 中通天鸿发起第二届“运营安全日”活动",
              src: "https://yanxuan.nosdn.127.net/35586d93822df89a19073e285718e46f.png",
              briefInfo:
                "2020年4月25日，中通天鸿发起第二届呼叫中心“运营安全日”活动，倡导公司时刻将呼叫中心运营安全铭记在心，“保持警觉，全员出击，运营安全，你我……",
              releaseTime: "2020-04-25 11:35:05",
              number: "98",
              source: "王世国"
            }
          ]
        },
        {
          label: "昨天发布",
          tabsList: [
            {
              title:
                "为呼叫中心运营安全护航 中通天鸿发起第二届“运营安全日”活动",
              src: "https://yanxuan.nosdn.127.net/35586d93822df89a19073e285718e46f.png",
              briefInfo:
                "2020年4月25日，中通天鸿发起第二届呼叫中心“运营安全日”活动，倡导公司时刻将呼叫中心运营安全铭记在心，“保持警觉，全员出击，运营安全，你我……",
              releaseTime: "2020-04-25 11:35:05",
              number: "98",
              source: "王世国"
            },
            {
              title:
                "为呼叫中心运营安全护航 中通天鸿发起第二届“运营安全日”活动",
              src: "https://yanxuan.nosdn.127.net/35586d93822df89a19073e285718e46f.png",
              briefInfo:
                "2020年4月25日，中通天鸿发起第二届呼叫中心“运营安全日”活动，倡导公司时刻将呼叫中心运营安全铭记在心，“保持警觉，全员出击，运营安全，你我……",
              releaseTime: "2020-04-25 11:35:05",
              number: "98",
              source: "王世国"
            }
          ]
        },
        {
          label: "明天发布",
          tabsList: [
            {
              title:
                "为呼叫中心运营安全护航 中通天鸿发起第二届“运营安全日”活动",
              src: "https://yanxuan.nosdn.127.net/35586d93822df89a19073e285718e46f.png",
              briefInfo:
                "2020年4月25日，中通天鸿发起第二届呼叫中心“运营安全日”活动，倡导公司时刻将呼叫中心运营安全铭记在心，“保持警觉，全员出击，运营安全，你我……",
              releaseTime: "2020-04-25 11:35:05",
              number: "98",
              source: "王世国"
            }
          ]
        }
      ]
    };
  },
  mounted() {},
  created() {
    if(this.$route.params.label){
      this.selectLabel = this.$route.params.label
    }
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.Real_time_info {
  background: #f9f9f9;
  .el-pagination {
    text-align: center;
  }
  .el-tabs__item {
    color: #fff;
    background: #d2d7db;
  }
  .el-tabs__item.is-active {
    background: #409eff;
  }
  .el-tabs--card > .el-tabs__header .el-tabs__item.is-active {
    border: 0;
  }
  .R_row {
    .R_pagination {
      margin: 50px 0;
    }
    .R_row_tabs {
      margin-top: 50px;
      .el-tab-pane {
        min-height: 470px;
        .list {
          margin: 0 0 25px;
          padding: 20px;
          border-radius: 0;
          background-color: #fff;
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
          .title {
            font-size: 22px;
            color: #202020;
            font-weight: 400;
            transition: 0.3s;
            cursor: pointer;
            &:hover {
              color: #40aefc;
            }
          }
          .content {
            ._img {
              width: 286px;
              height: 130px;
              border-radius: 4px;
              overflow: hidden;
              img {
                max-width: 100%;
                height: 100%;
                cursor: pointer;
              }
            }
            .list_text {
              padding-left: 25px;
              .all {
                color: #40aefc;
                float: right;
                margin-top: 10px;
                cursor: pointer;
              }
              p {
                margin: 0;
                font-size: 14px;
                color: #666;
                cursor: pointer;
              }
            }
          }
          .time {
            margin-top: 25px;
            font-size: 14px;
            color: #999;
            i {
              font-size: 20px;
              margin-right: 5px;
            }
            .left {
              margin-left: 30px;
            }
          }
        }
        .right_float {
          position: absolute;
          top: 0;
          right: 0;
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
      }
    }
  }
}
</style>
