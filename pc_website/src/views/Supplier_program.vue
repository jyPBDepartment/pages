<template>
  <div class="Home">
    <img
      class="top_img hidden-md-and-down"
      src="../assets/introduce_banner_nzgysjjfa.jpg"
      :style="{height:`${bannerHeight}px`}"
    />
    <FixedNav
      class="hidden-md-and-down"
      @chage="navMove($event)"
      :modelName="modelName"
      @jump="specifyElement"
    ></FixedNav>
    <Fast
      class="hidden-md-and-down"
      :class=" marginTOP ? 'move':'move2' "
      :title="modelName[0].title"
      :id="modelName[0].id"
    >
      <Tabs :type="true" :img="true" :tabList="tabList" :tabIndex="tabIndex" :tabPane="tabPane"></Tabs>
    </Fast>
    <Fast
      class="hidden-md-and-down"
      style="color:#fff!important;"
      :title="modelName[1].title"
      :id="modelName[1].id"
      sTitle="实现采购、销统一的农资流转大平台；打通各环节中的各参与者、各终端，实现互联互通，促进商品信息的充分流动。"
      background="#242B44"
      color="#fff"
      sColor="#fff"
      :allScreen="true"
    >
      <video
        class="video"
        src="../assets/gysjjfa.mp4"
        muted="muted"
        autoplay="autoplay"
        loop="loop"
      ></video>
    </Fast>
    <Fast class="hidden-md-and-down" :title="modelName[2].title" :id="modelName[2].id">
      <Tabs :type="true" :img="false" :tabList="tabList1" :tabIndex="tabIndex1" :tabPane="tabPane1"></Tabs>
    </Fast>
    <MobileBanner
      class="hidden-md-and-up"
      m_content="农业种植全产业链互联网服务平台"
      m_title="让优秀者更优秀"
      :m_banner="require('../assets/mobile/introduce_banner_jxszg.jpg')"
    />
    <Fast class="hidden-md-and-up" title="行业痛点">
      <Slider class="m_slider" category="pain" id="pain" :list="tabPane" :titleList="tabList"></Slider>
    </Fast>
    <Fast class="hidden-md-and-up" title="方案简介">
      <div class="m_video">
        <img class="img" src="../assets/mobile/9-99.jpg" alt />
        <p>打通各环节中的各参与者、各终端，实现互联互通，促进商品信息的充分流动。</p>
      </div>
    </Fast>
    <Fast class="hidden-md-and-up" title="适配场景">
      <Slider class="m_slider" category="custom" id="custom_cj" :list="m_tabList"></Slider>
    </Fast>

    <Fast :title="modelName[3].title" :id="modelName[3].id" background="rgb(246, 247, 252) ">
      <el-row class="b_icon">
        <el-col class="box" v-for="(item, index) in bIcon" :key="index">
          <img class="_img" :src="item.src" alt />
          <h2>{{item.title}}</h2>
          <p>{{item.content}}</p>
        </el-col>
      </el-row>
    </Fast>
    <Fast class="hidden-md-and-up" title="方案价值">
      <McommonView style="margin-top:15px;" :text="m_fajz" :src="require('../assets/7-fajz.jpg')"></McommonView>
    </Fast>
    <Fast class="hidden-md-and-down" :title="modelName[4].title" :id="modelName[4].id">
      <el-row class="sdys">
        <el-col class="title" :span="9">
          <div class="s_c">
            <h2>资源整合</h2>
            <p>平台化产品资源打通作物完整产业链</p>
          </div>
          <div class="s_c b">
            <h2>服务推广</h2>
            <p>网络营销数据集成，打造品牌效应</p>
          </div>
        </el-col>
        <el-col :span="6">
          <img class="sdys_img" src="../assets/7-fajz.jpg" alt />
        </el-col>
        <el-col class="title" :span="9">
          <div class="s_c">
            <h2>渠道精细化管理</h2>
            <p>系统化管理经销商评估、信用、与风险控制</p>
          </div>
          <div class="s_c b">
            <h2>数据辅助决策</h2>
            <p>大数据分析辅助管理层的经营决策</p>
          </div>
        </el-col>
      </el-row>
    </Fast>
    <Callcontact class="hidden-md-and-down" />
  </div>
</template>

<script>
import Fast from "../components/Fast/Fast";
import Tabs from "../components/Tabs/Tabs";
// import Rotation from "../components/Rotation/Rotation";
import Slider from "../components/Slider/Slider";
import FixedNav from "../components/FixedNav/FixedNav";
import Callcontact from "../components/Callcontact/Callcontact";
import MobileBanner from "../components/MobileBanner/MobileBanner";
import McommonView from "../components/McommonView/McommonView";
export default {
  components: {
    Fast,
    FixedNav,
    Tabs,
    Slider,
    // Rotation,
    Callcontact,
    MobileBanner,
    McommonView
  },
  data() {
    return {
      bannerHeight: 0,
      marginTOP: false,
      modelName: [
        { title: "行业痛点", id: "1" },
        { title: "方案简介", id: "2" },
        { title: "适配场景", id: "3" },
        { title: "特色优势", id: "4" },
        { title: "方案价值", id: "5" }
      ],
      m_fajz: [
        "平台化产品资源打通作物完整产业链",
        "网络营销数据集成，打造品牌效应",
        "系统化管理经销商评估、信用、与风险控制",
        "大数据分析辅助管理层的经营决策"
      ],
      tabList: ["库存之痛", "市场之痛", "经营之痛", "求变之痛"],
      tabList1: ["产品发布", "产品销售", "数据分析", "资金管理"],
      m_tabList: [
        {
          title: "产品发布",
          src: require("../assets/7-1a.jpg")
        },
        {
          title: "产品销售",
          src: require("../assets/7-2a.jpg")
        },
        {
          title: "数据分析",
          src: require("../assets/7-3a.jpg")
        },
        {
          title: "资金管理",
          src: require("../assets/7-4a.jpg")
        }
      ],
      tabPane: [
        {
          src: require("../assets/7-kczt.jpg"),
          li: [
            "繁少了不够卖，繁多了卖不了",
            "严重威胁了企业的正常运转和合理的利益空间",
            "抑制了创造市场价值的同时也消耗了企业积累"
          ]
        },
        {
          src: require("../assets/7-sczt.jpg"),
          li: [
            "品牌传播体系未健全，品牌效应不足",
            "传统的营销方式，落后于信息时代的大潮流",
            "背靠人脉，销售渠道单一，不能迅速扩大产品曝光度"
          ]
        },
        {
          src: require("../assets/7-jyzt.jpg"),
          li: [
            "销售成本居高不下，严重制约企业发展",
            "财务、数据、库存等信息不完善，经常出错，且费时费力",
            "产品反馈仅来自经销商，不能第一时间了解种植者的反馈"
          ]
        },
        {
          src: require("../assets/7qbzt.jpg"),
          li: [
            "恶性竞争导致整个行业发展倒退",
            "企业求变，力量单一，不足以形成燎原之势",
            "行业内无整合种植户、经销商、科研院所等资源的角色"
          ]
        }
      ],
      tabPane1: [
        require("../assets/7-1a.jpg"),
        require("../assets/7-2a.jpg"),
        require("../assets/7-3a.jpg"),
        require("../assets/7-4a.jpg")
      ],
      bIcon: [
        {
          src: require("../assets/icon/7-1-xsqsjy.png"),
          title: "轻松线上交易",
          content: "线上货品展示，不受人脉限制，轻松取得更多销量"
        },
        {
          src: require("../assets/icon/7-2-jycbss.png"),
          title: "节省销售成本",
          content: "仅需网店运营人员，节省销售成本，提高利润率"
        },
        {
          src: require("../assets/icon/7-3-sjfxzd.png"),
          title: "数据分析指导",
          content: "大数据支撑辅助决策不再盲目生产"
        },
        {
          src: require("../assets/icon/7-4fznyjs.png"),
          title: "辅助农技服务",
          content: "农技顾问助力保障产品获得丰收，取得口碑效应"
        },
        {
          src: require("../assets/icon/7-5-kcxmssc.png"),
          title: "开创新模式市场",
          content: "根据种植者深层次的需求整合行业信息和资源"
        },
        {
          src: require("../assets/icon/7-6-gljxh.png"),
          title: "管理精细化",
          content: "各种数据清晰呈现，管理、结算、查阅方便、快速、清晰"
        }
      ],
      tabIndex: 0,
      tabIndex1: 0
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
.video {
  height: 713px;
}
.i {
  justify-content: space-around;
  padding: 0 4%;
  .i_c {
    width: 306px;
    border-radius: 20px;
    border: 1px solid #bbb;
    background: #fff;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    padding: 60px 6%;
    img {
      max-width: 40%;
    }
  }
}
.b_icon {
  margin-top: 30px;
  padding: 0 2%;
  .box {
    width: 33.33%;
    padding: 60px 7% 20px 7%;
    border-right: 1px solid #bbb;
    display: block !important;
    border-bottom: 1px solid #bbb;
    h2 {
      margin-top: 31px;
      font-size: 28px;
      margin-bottom: 13px;
    }
    p {
      margin: 0;
      color: #938a8a;
      font-size: 20px;
    }
    &:nth-child(3),
    &:nth-child(6) {
      border-right: 0;
    }
    &:nth-child(4),
    &:nth-child(5),
    &:nth-child(6) {
      border-bottom: 0;
    }
    ._img {
      width: 100px;
      height: 100px;
    }
  }
}
.sdys {
  margin-top: 78px;
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
    margin-top: 75px;
  }
  .sdys_img {
    width: 100%;
  }
  .title {
    height: 347px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 0;
  }
}
.m_video {
  width: calc(100% - 40px);
  margin: 0 auto;
  background: #232b49;
  margin-top: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.3);
  .img {
    width: calc(100% - 40px);
    margin: 27px auto;
  }
  p {
    color: #81878f;
    font-size: 15px;
    text-align: left;
    padding: 0 20px;
    margin-top: 0;
    padding-bottom: 20px;
  }
}
@media screen and (max-width: 768px) {
  .b_icon {
    padding: 0 10px;
    .box{
      width: calc(50% - 20px);
      height: 185px;
      margin: 0 10px;
      border: 0;
      border-radius: 5px;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.3);
      margin-bottom: 20px;
      padding: 0;
      ._img{
        width: 50px;
        height: 50px;
        margin-top: 22px;
        margin-bottom: 20px;
      }
      h2{
        font-size: 14px;
        color: #000013;
        margin-top: 0;
        margin-bottom: 9px;
      }
      p{
        margin: 0;
        color: #999B9F;
        font-size: 11px;
        padding: 10px;
      }
    }
  }
}
</style>
