<template>
  <div class="Home">
    <MobileBanner
      class="hidden-md-and-up"
      m_content="升级经营能力 实现跨越式发展"
      m_title="经销商店铺"
      m_banner="https://yanxuan.nosdn.127.net/6ec80a1769f8b8ec34a30ea46b1438fe.jpg"
    />
    <Fast class="hidden-md-and-up" title="多样化的店铺功能">
      <Slider class="m_slider" category="botton" id="botton" :list="bottonList"></Slider>
      <FullFunctionality class="hidden-md-and-up" :functionList="functionList" />
    </Fast>
    <Fast class="hidden-md-and-up" title="四大核心优势">
      <McommonView
        style="margin-top:15px;"
        :text="m_b_text"
        src="https://yanxuan.nosdn.127.net/d63c6305ea9072ba6ce3db37bf57649d.png"
      ></McommonView>
    </Fast>
  </div>
</template>

<script>
import Fast from "../components/Fast/Fast";
import Slider from "../components/Slider/Slider";
import MobileBanner from "../components/MobileBanner/MobileBanner";
import McommonView from "../components/McommonView/McommonView";
import FullFunctionality from "../components/FullFunctionality/FullFunctionality";
export default {
  components: {
    Fast,
    Slider,
    MobileBanner,
    McommonView,
    FullFunctionality
  },
  data() {
    return {
      bannerHeight: 0,
      bannerBottomHeight: document.body.clientWidth / 3.31,
      marginTOP: false,
      functionList: [
        {
          name: "装修店铺",
          info: "按自主经营风格装修自己的网店"
        },
        {
          name: "在线采购货源",
          info: "在线查看海量货源并洽谈、支付订金，随时追踪订单状态"
        },
        {
          name: "采购货源退货",
          info: "在线与供应商协商退货并支持退货操作，随时查看退单详情"
        },
        {
          name: "自备商品发布",
          info: "支持平台采购商品发布的同时，也支持经销商自备商品发布"
        },
        {
          name: "商品上下架",
          info: "按需随时调整商品上架可售，下架停售"
        },
        {
          name: "库存变动",
          info: "根据实际商品进销存变动库存，变动可追溯"
        },
        {
          name: "商品回收站",
          info: "可对已发布商品进行删除和恢复"
        },
        {
          name: "在线支付",
          info: "支持余额、微信等在线支付方式"
        },
        {
          name: "销售订单追踪",
          info: "按订单状态分类操作、管理"
        },
        {
          name: "商品详情展示",
          info:
            "支持对商品进行全方位图文、视频、适种区域、品牌、厂家、规格、支付方式、促销活动、配送方式等展示"
        },
        {
          name: "满减促销",
          info: "支持无门槛、有门槛等满减促销设置"
        },
        {
          name: "满送促销",
          info: "支持满送同类商品的促销设置"
        },
        {
          name: "限时折扣促销",
          info: "支持按月、周、日、时段等周期的促销设置"
        },
        {
          name: "抵扣劵促销",
          info: "支持无条件抵扣劵按指定人员发放的促销设置"
        },
        {
          name: "报表管理",
          info: "可查看按多条件筛选需要的统计报表，并可导出"
        },
        {
          name: "资金管理",
          info: "支持资金流水查询、提现、充值"
        },
        {
          name: "消息提醒",
          info: "提醒交易、联系人、新闻、活动、公告等消息"
        },
        {
          name: "即时通讯",
          info: "支持文字、语音、图片、表情、视频、文件"
        }
      ],
      m_b_text: [
        "针对农资行业特有属性进行设计开发",
        "数据辅助决策，更有效管理客户与订单",
        "全部经营，线上搞定",
        "让更多的人帮你卖货和维护客户"
      ],
      bottonList: [
        {
          src:
            "https://yanxuan.nosdn.127.net/45c85287d41b53ad7b1162553d988109.png",
          title: "发布商品"
        },
        {
          src:
            "https://yanxuan.nosdn.127.net/bd4c5386781080fff0af0c5fd27a757c.png",
          title: "订单追踪与处理"
        },
        {
          src:
            "https://yanxuan.nosdn.127.net/7ced8027844b34c2ec9987fd6e1e1c75.png",
          title: "收银管理"
        },
        {
          src:
            "https://yanxuan.nosdn.127.net/ecc32d061ed433052053fe096c8bade6.png",
          title: "销售团队管理"
        },
        {
          src:
            "https://yanxuan.nosdn.127.net/1471f47414b5a455b677b67630c7db63.png",
          title: "商品批发采购"
        },
        {
          src:
            "https://yanxuan.nosdn.127.net/c4bd2828f9279d21159eee75c14cfac0.png",
          title: "促销工具"
        },
        {
          src:
            "https://yanxuan.nosdn.127.net/811ad2692ac8703d7de8fdfc518a2a16.png",
          title: "消息、资讯推送"
        },
        {
          src:
            "https://yanxuan.nosdn.127.net/2cf297ae7fda4030e284dca7f3ae212f.png",
          title: "分销管理"
        },
        {
          src:
            "https://yanxuan.nosdn.127.net/501340a4cca82b986c376e3c8defe2d0.png",
          title: "进销存管理"
        },
        {
          src:
            "https://yanxuan.nosdn.127.net/84847cd0379b854c3315945b9a59d35f.png",
          title: "报表分析"
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
    navMove(e) {
      this.marginTOP = e;
    },
    specifyElement(id) {
      document.getElementById(id).scrollIntoView();
    },
    screenChanges() {
      this.bannerHeight = document.documentElement.clientHeight - 100;
    }
  }
};
</script>


<style lang="scss">
.wz_btn {
  padding-bottom: 20px;
}
.home {
  max-width: 100%;
  overflow: hidden;
}
.top_img {
  width: 100%;
}
.move {
  margin-top: 120px;
  transition-duration: 0.5s;
}
.move2 {
  transition-duration: 0.5s;
}
.top {
  margin-top: 90px;
}
.f_b {
  margin-top: 50px !important;
  padding: 0 5%;
  .f_b_d {
    width: 20%;
    font-size: 18px;
    font-weight: bold;
    margin-top: 50px;
    img {
      width: 25%;
    }
  }
}
.sdys {
  .s_c {
    h2 {
      font-size: 30px;
    }
    p {
      font-size: 18px;
      color: slategray;
    }
  }
  .b {
    margin-top: 90px;
  }
  .sdys_img {
    width: 100%;
  }
  .title {
    padding-top: 30px;
  }
}
.m_slider {
  margin-bottom: 10px;
}
</style>
