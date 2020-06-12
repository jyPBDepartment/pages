<template>
  <div class="Home">
    <Rotation :banner="banner" :height="bannerHeight" :type="1" />
    <Fast title="农资行业全场景的互联网解决方案" sTitle="解决农资行业痛点，打通农资信息通道，助力商户充分挖掘、整合行业隐形资源，构建内外服务生态圈。">
      <el-row class="h1">
        <el-col :span="8" :offset="1">
          <div class="h1_1" v-for="(item, index) in title" :key="index">
            <h2>{{item.h2}}</h2>
            <p>{{item.p}}</p>
          </div>
        </el-col>
        <el-col :span="14">
          <img class="h1_i_1" src="../assets/tu1.png" alt />
        </el-col>
      </el-row>
    </Fast>
    <Fast title="我们的云服务产品" sTitle="提升多种农资经营能力 全面满足业务需求">
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
      bannerHeight: 200,
      bannerBottomHeight: 480,
      // 页面数据: "/"
      banner: [
        {
          src: require("../assets/banner1.jpg"),
          title: "农资经销商解决方案",
          content: "全面助力经销商升级经营能力 实现跨越式发展",
          botton: "了解详情",
          router:'dealer_program'
        },
        {
          src: require("../assets/banner2.jpg"),
          title: "农资供应商解决方案",
          content: "有效降低供应商销售成本 大数据辅助科学决策",
          botton: "了解详情",
          router:'supplier_program'
        },
        {
          src: require("../assets/banner3.jpg"),
          title: "亿元订单 强强联合",
          content: "吉易慧农上线合作伙伴计划",
          botton: "加 入",
          router:'partner'
        }
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
          src: require("../assets/icon/jingxiaoshang1.png"),
          h2: "经销商店铺",
          p: "线上交易节省时空系统化管理客户与订单"
        },
        {
          src: require("../assets/icon/jingxiaoshang-zhanggui2.png"),
          h2: "经销商掌柜",
          p: "农资销售随时搞定销售数据尽在掌握"
        },
        {
          src: require("../assets/icon/gongyingshang3.png"),
          h2: "供应商店铺",
          p: "节省销售成本产品大数据可视化"
        },
        {
          src: require("../assets/icon/tuandui_4.png"),
          h2: "销售团队管理",
          p: "团队资源尽在掌握成员经营状况清晰可见"
        },
        {
          src: require("../assets/icon/yingxiao5.png"),
          h2: "营销活动",
          p: "多种营销玩法可选促进成交轻松实现"
        },
        {
          src: require("../assets/icon/shouyin6.png"),
          h2: "收银系统",
          p: "覆盖线上线下多种交易场景大数据挖掘辅助决策"
        },
        {
          src: require("../assets/icon/zixun7.png"),
          h2: "即时通讯",
          p: "单聊或群聊、语音消息表情、文件、图片传送"
        },
        {
          src: require("../assets/icon/xiaoxi8.png"),
          h2: "消息、资讯推送",
          p: "即时、定时发布活动、资讯分角色发布多种广告形式"
        }
      ]
    };
  },
  mounted() {
    window.addEventListener("resize", () => this.screenChanges(), false);
  },
  created() {
    this.screenChanges();
  },
  methods: {
    screenChanges() {
      this.bannerHeight = document.documentElement.clientHeight - 100;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
h2 {
  font-weight: normal;
}
.h1 {
  margin-top: 62px;
  .h1_i_1 {
    max-width: 100%;
  }
  .h1_1 {
    text-align: left;
    margin-top: 48px;
    h2 {
      margin-top: 0;
      margin-bottom: 12px;
      font-size: 24px;
    }
    p {
      font-size: 18px;
      margin-bottom: 0;
      margin-top: 0;
      color: #938a8a;
    }
  }
}
.h2 {
  padding: 0 2%;
  .h2_1 {
    width: 25%;
    padding: 0 5% 34px 5%;
    border-bottom: 1px solid #d4d6e2;
    border-right: 1px solid #d4d6e2;
    h2 {
      margin-top: 33px;
      margin-bottom: 24px;
    }
    p {
      color: #938a8a;
      line-height: 27px;
    }

    img {
      margin-top: 60px;
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
