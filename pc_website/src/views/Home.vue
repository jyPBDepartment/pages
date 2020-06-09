<template>
  <div class="Home">
    <Rotation :banner="banner" :height="bannerHeight" />
    <Fast title="农资行业全场景的互联网解决方案" sTitle="解决农资行业痛点，打通农资信息通道，助力商户充分挖掘、整合行业隐形资源，构建内外服务生态圈。">
      <el-row class="h1">
        <el-col :span="9" :offset="3">
          <div class="h1_1" v-for="(item, index) in title" :key="index">
            <h2>{{item.h2}}</h2>
            <p>{{item.p}}</p>
          </div>
        </el-col>
        <el-col :span="9">
          <img class="h1_i_1" src="../assets/tu1.png" alt />
        </el-col>
      </el-row>
    </Fast>
    <Fast
      title="我们的云服务产品"
      sTitle="我们的云服务产品解决农资行业痛点，打通农资信息通道，助力商户充分挖掘、整合行业隐形资源，构建内外服务生态圈。"
      background="#f6f7fc"
    >
      <el-row class="h2">
        <el-col class="h2_1" v-for="(item, index) in botton" :key="index">
          <img :src="item.src" alt />
          <h2>{{item.h2}}</h2>
          <p>{{item.p}}</p>
        </el-col>
      </el-row>
    </Fast>
    <div class="w">
      <Rotation :banner="bannerBottom" :height="bannerBottomHeight" />
    </div>
    <Callcontact />
  </div>
</template>

<script>
import Rotation from "../components/Rotation/Rotation";
import Fast from "../components/Fast/Fast";
import Callcontact from "../components/Callcontact/Callcontact";
export default {
  components: {
    Rotation,
    Fast,
    Callcontact
  },
  data() {
    return {
      bannerHeight: document.body.clientWidth / 3.31,
      bannerBottomHeight: 480,
      // 页面数据: "/"
      banner: [
        { src: require("../assets/banner1.jpg") },
        { src: require("../assets/banner2.jpg") },
        { src: require("../assets/banner3.jpg") }
      ],
      bannerBottom: [
        { src: require("../assets/index1.jpg") },
        { src: require("../assets/index2.jpg") },
        { src: require("../assets/index3.jpg") }
      ],
      title: [
        {
          h2: "农资批发场景",
          p: "海量货源、全方位展示、线上谈判、交易"
        },
        {
          h2: "农资零售电商场景",
          p: "经销商网店、多种营销玩法、身临其境的交易体验感"
        },
        {
          h2: "农资零售移动场景",
          p: "实现实体店内、店外，掌上下单、收银、统计分析"
        },
        {
          h2: "分销推广场景",
          p: "客户帮你卖、员工帮你卖、整合资源、轻松分配"
        }
      ],
      botton: [
        {
          src: require("../assets/jingxiaoshang1.png"),
          h2: "经销商店铺",
          p: "线上交易节省时空系统化管理客户与订单"
        },
        {
          src: require("../assets/jingxiaoshang-zhanggui2.png"),
          h2: "经销商掌柜",
          p: "农资销售随时搞定销售数据尽在掌握"
        },
        {
          src: require("../assets/gongyingshang3.png"),
          h2: "供应商店铺",
          p: "节省销售成本产品大数据可视化"
        },
        {
          src: require("../assets/tuandui_4.png"),
          h2: "销售团队管理",
          p: "团队资源尽在掌握成员经营状况清晰可见"
        },
        {
          src: require("../assets/yingxiao5.png"),
          h2: "营销活动",
          p: "多种营销玩法可选促进成交轻松实现"
        },
        {
          src: require("../assets/shouyin6.png"),
          h2: "收银系统",
          p: "覆盖线上线下多种交易场景大数据挖掘辅助决策"
        },
        {
          src: require("../assets/zixun7.png"),
          h2: "即时通讯",
          p: "单聊或群聊、语音消息表情、文件、图片传送"
        },
        {
          src: require("../assets/xiaoxi8.png"),
          h2: "消息、资讯推送",
          p: "即时、定时发布活动、资讯分角色发布多种广告形式"
        }
      ]
    };
  },
  methods: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
h2 {
  font-weight: normal;
}
.h1 {
  margin-top: 30px;
  .h1_i_1 {
    max-width: 100%;
  }
  .h1_1 {
    text-align: left;
    p {
      color: #938a8a;
    }
  }
}
.h2 {
  padding: 0 10%;
  .h2_1 {
    width: 25%;
    padding: 0 4%;
    border-bottom: 1px solid #d4d6e2;
    border-right: 1px solid #d4d6e2;
    img {
      margin-top: 30px;
      max-width: 56px;
    }
    &:nth-child(4) {
      border-right: 0;
    }
    &:nth-child(5),
    &:nth-child(6),
    &:nth-child(7) {
      border-bottom: 0;
    }
    &:nth-child(8) {
      border-right: 0;
      border-bottom: 0;
    }
  }
}
</style>
