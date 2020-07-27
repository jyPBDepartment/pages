<template>
  <div class="Home">
    <MobileBanner
      class="hidden-md-and-up"
      m_content="全用户场景解决方案"
      m_title="吉易掌柜"
      m_banner="https://yanxuan.nosdn.127.net/ef47d8e6cb3a48c20eb26771f04fbeed.jpg"
    />
    <Fast class="hidden-md-and-up" title="应用场景">
      <Slider class="m_slider" category="custom" id="custom" :list="m_tablist"></Slider>
    </Fast>
    <Fast class="hidden-md-and-up" title="核心优势">
      <Slider class="m_slider" category="advantage" id="advantage" :list="advantageList"></Slider>
    </Fast>
    <Fast :title="modelName[2].title" :id="modelName[2].id" background="rgb(246, 247, 252)">
      <el-row class="b" type="flex" justify="center">
        <el-col class="b_f1" :span="12" v-for="(item, index) in bottonList" :key="index">
          <el-col class="icon" :span="10">
            <img :src="item.src" alt />
          </el-col>
          <el-col class="content" :span="14">
            <h2>{{item.title}}</h2>
            <ul>
              <li v-for="liContent in item.li" :key="liContent">{{liContent}}</li>
            </ul>
          </el-col>
        </el-col>
      </el-row>
      <FullFunctionality class="wz_btn" :isMobile="false" :functionList="functionList" />
    </Fast>
  </div>
</template>

<script>
import Fast from "../components/Fast/Fast";
import Slider from "../components/Slider/Slider";
import MobileBanner from "../components/MobileBanner/MobileBanner";
import FullFunctionality from "../components/FullFunctionality/FullFunctionality";
export default {
  components: {
    Fast,
    Slider,
    MobileBanner,
    FullFunctionality
  },
  data() {
    return {
      bannerHeight: 0,
      modelName: [
        { title: "应用场景", id: "1" },
        { title: "核心优势", id: "2" },
        { title: "产品功能", id: "3" }
      ],
      functionList: [
        {
          name: "购物车",
          info: "商品可添加至购物车，可多商品合并下单"
        },
        {
          name: "合并订单支付",
          info: "可对已提交的多个订单进行合并支付"
        },
        {
          name: "权限管理",
          info: "可对店内、店外销售人员设置不同的权限"
        },
        {
          name: "支付方式",
          info: "支持现金、微信、支付宝支付方式"
        },
        {
          name: "消息提醒",
          info: "提醒交易、联系人、新闻、活动、公告等消息"
        },
        {
          name: "资金管理",
          info: "支持资金流水查询、提现、充值"
        },
        {
          name: "即时通讯",
          info: "支持单聊、群聊，可传输文字、语音、图片、表情、视频、文件"
        },
        {
          name: "生意报表",
          info: "可分别查看日、周、月等不同周期的可视化报表"
        },
        {
          name: "订单追踪",
          info: "可对掌柜订单不同状态进行分类管理"
        },
        {
          name: "订单凭证",
          info: "订单详情页可分享至微信好友，也可保存至本地相册"
        },
        {
          name: "排行统计",
          info: "经销商可按搜索条件查看统计销售排行或商品排行"
        },
        {
          name: "二维码推广",
          info: "可实现员工、经纪人、农户共同分销商品"
        },
        {
          name: "经理人管理",
          info: "支持经理人团队管理与自身佣金统计"
        },
        {
          name: "客户管理",
          info: "支持客户与订单统计"
        },
        {
          name: "在线圈地",
          info: "可在线圈定地块，显示面积、周长等信息"
        },
        {
          name: "测土配方",
          info: "支持显示地块Ph值，氮钾磷等土壤元素的含量信息"
        },
        {
          name: "预种植方案",
          info:
            "根据种植品种、密度、灌溉方式、肥料等信息，可获取田间指导和产量预测"
        },
        {
          name: "卫星遥感监测",
          info: "支持监测地块中的农作物长势等信息"
        }
      ],
      marginTOP: false,
      bottonList: [
        {
          src:
            "https://yanxuan.nosdn.127.net/e37f219870c719017e25855d1735fccd.png",
          title: "独立订单体系",
          li: ["掌柜订单与农户订单互相独立", "进销存管理却可以同步"]
        },
        {
          src:
            "https://yanxuan.nosdn.127.net/1f70cd30d5f2fc317559cd522bb0af41.png",
          title: "店内、外分角色设定",
          li: ["大掌柜、二掌柜不同权限", "匹配对应的销售场景"]
        },
        {
          src:
            "https://yanxuan.nosdn.127.net/23527042e3a7817212f0dbc3a7a5a807.png",
          title: "生意报表",
          li: ["日、周、月报表实时查看", "各种数据图谱清晰直观"]
        },
        {
          src:
            "https://yanxuan.nosdn.127.net/1aef0593a2652a6dc0bcc0396190aae2.png",
          title: "掌柜分销",
          li: ["二维码扫一扫轻松推荐", "佣金分配即时完成"]
        },
        {
          src:
            "https://yanxuan.nosdn.127.net/b64f68b2138459078baa84b54eaa574c.png",
          title: "规范进销存",
          li: ["库存变动实时清晰可见", "每一个动作都可追溯"]
        },
        {
          src:
            "https://yanxuan.nosdn.127.net/499862f071d7a5ee72ade73a332db872.png",
          title: "销售排行",
          li: ["掌柜销量排行，创造竞争氛围", "商品销量排行，及时调整销售策略"]
        }
      ],
      m_tablist: [
        {
          src:
            "https://yanxuan.nosdn.127.net/fcd5a03753b809f9e551f5bef8e5fa76.jpg",
          title: "店内销售"
        },
        {
          src:
            "https://yanxuan.nosdn.127.net/e71110b216db399e1801769f9f1f8d4f.jpg",
          title: "店外销售"
        }
      ],
      advantageList: [
        {
          src:
            "https://yanxuan.nosdn.127.net/0f860f67ad9d9d61ad48a9aa0b8b4674.png",
          content: "打通内外部，协同人财物，最大限度发挥人才效能，拓展生意规模"
        },
        {
          src:
            "https://yanxuan.nosdn.127.net/8f056c8a7d4dc58a4d2c92609476a38f.png",
          content: "全场景覆盖销售终端满足销售多元化需求"
        },
        {
          src:
            "https://yanxuan.nosdn.127.net/dc05d9fa3611b5a34c6da238a08be87f.png",
          content: "数据清晰、分析明确为每位经销商决策提供数据指导"
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
    specifyElement(id) {
      document.getElementById(id).scrollIntoView();
    },
    navMove(e) {
      this.marginTOP = e;
    },
    screenChanges() {
      this.bannerHeight = document.documentElement.clientHeight - 100;
    }
  }
};
</script>


<style lang="scss">
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
.h_1 {
  padding: 0 6%;
  .h_2 {
    padding: 0 6%;
    img {
      width: 100%;
    }

    p {
      font-size: 20px;
      line-height: 30px;
    }
  }
}
.b {
  padding: 0 10%;
  margin-bottom: 60px;
  flex-wrap: wrap;
  margin-top: 30px;
  .b_f1 {
    width: 48%;
    margin: 10px;
    padding: 30px 0;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.3);
    border-radius: 4px;
    text-align: left;
    .icon {
      display: flex;
      justify-content: center;
      padding: 21px 0;
      img {
        max-width: 70px;
        max-height: 70px;
      }
    }
    .content {
      h2 {
        font-size: 18px;
        font-weight: 400;
        margin-bottom: 20px;
        color: #101010;
      }
      ul {
        padding-left: 0;
        li {
          list-style-type: disc;
          color: #92909b;
          font-size: 14px;
          line-height: 24px;
        }
      }
    }
  }
}
@media screen and (max-width: 768px) {
  .b {
    padding: 0 calc(50vw - 175px);
    .b_f1 {
      width: calc(50% - 20px);
      padding: 0;
      display: flex;
      flex-direction: column;
      .icon {
        display: flex;
        width: 100%;
        justify-content: center;
        padding: 0;
        img {
          width: 50px;
          margin-top: 20px;
          margin-bottom: 15px;
          height: 50px;
        }
      }
      .content {
        width: 100%;
        h2 {
          font-size: 14px;
          margin-top: 0;
          margin-bottom: 10px;
          text-align: center;
          color: #000014;
        }
        ul {
          margin-bottom: 15px;
          li {
            font-size: 9px;
            list-style-type: none;
            text-align: center;
            color: #9a9ca0;
          }
        }
      }
    }
  }
}
</style>
