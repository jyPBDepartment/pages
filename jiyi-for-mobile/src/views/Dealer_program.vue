<template>
  <div class="Home">
    <MobileBanner
      class="hidden-md-and-up"
      m_content="农业种植全产业链互联网服务平台"
      m_title="专注为农资经销商提供助力方"
      m_banner="https://yanxuan.nosdn.127.net/d60079170e2131350132806dbd187885.jpg"
    />
    <Fast class="hidden-md-and-up" title="丰富的营销拓客工具">
      <Slider class="m_slider" category="tool" id="tool" :list="iList"></Slider>
    </Fast>
    <Fast class="hidden-md-and-up" title="门店结合互联网销售场景">
      <Slider class="m_slider" category="custom" id="custom" :list="m_scene"></Slider>
    </Fast>
  </div>
</template>

<script>
import Fast from "../components/Fast/Fast";
import Slider from "../components/Slider/Slider";
import MobileBanner from "../components/MobileBanner/MobileBanner";
export default {
  components: {
    Fast,
    Slider,
    MobileBanner
  },
  data() {
    return {
      bannerHeight: 0,
      bannerHeight1: document.body.clientWidth / 1.66,
      marginTOP: false,
      iList: [
        {
          src: "https://yanxuan.nosdn.127.net/b40d6ba84c3e89a66a8b3b0470c20530.jpg",
          title: "经理人推荐",
          content: "扫描推荐二维码轻松发展营销团队"
        },
        {
          src: "https://yanxuan.nosdn.127.net/53783318e0fe232f6c56737617786b62.jpg",
          title: "满减/满送",
          content: "扩大销售 刺激消费利润率自由控制"
        },
        {
          src: "https://yanxuan.nosdn.127.net/ebb6d806a4592fa4201d47311d11a667.jpg",
          title: "抵扣活动",
          content: "指定客户精准营销锁住老客户"
        },
        {
          src: "https://yanxuan.nosdn.127.net/8353f3e7957c3bc8ab27a14bd7241919.jpg",
          title: "限时折扣",
          content: "饥饿营销立竿见影生效快"
        }
      ],
      m_scene:[
        {
          src: "https://yanxuan.nosdn.127.net/8dee971705dd0f40243f159141bdbdf0.png",
          title: "线上电商"
        },
        {
          src: "https://yanxuan.nosdn.127.net/069a3609ef06b2e5113101deda2ec341.png",
          title: "店内销售"
        },{
          src: "https://yanxuan.nosdn.127.net/91205be2d3a2b40a5ce00965d3e1237c.png",
          title: "店外销售"
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
.i {
  justify-content: space-around;
  padding: 0 4%;
  margin-top: 102px;
  .i_c {
    width: 306px;
    border-radius: 20px;
    border: 1px solid #bbb;
    background: #fff;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    padding: 66px 6%;
    img {
      max-width: width 100px;
      max-height: 100px;
    }
    h2 {
      margin-top: 40px;
      margin-bottom: 28px;
    }
    p {
      line-height: 25px;
      margin-top: 0;
    }
  }
}
</style>
