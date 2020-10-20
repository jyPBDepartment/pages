<template>
  <div class="Home">
    <img
      class="top_img"
      src="http://60.205.246.126:8001/images/2020/10/20/1603152814093695.jpg"
      style="height: 640px"
    />
    <div class="banner-font" style>
      <h2 class="css2215ee06652225e">
        专注为农资经销商提供助力方<span class="css22917b201a2225e">案</span>
      </h2>
      <p class="css2215f1c4942225e">农业种植全产业链互联网服务平台</p>
    </div>
    <!-- <FixedNav @chage="navMove($event)" :modelName="modelName" @jump="specifyElement"></FixedNav> -->
    <Fast
      :class="marginTOP ? 'move' : 'move2'"
      title="更适合农资行业的移动端"
      :id="modelName[0].id"
      sTitle="每一屏都是为农资行业专属设计开发，助力经销商领跑行业"
    >
      <Rotation style="margin-top: 112px" :banner="banner" :height="410" />
    </Fast>
    <Fast
      title="丰富的营销拓客工具"
      :id="modelName[1].id"
      sTitle="多种营销玩法帮助你助你更好地拓、锁、留、升客"
      background="rgb(246, 247, 252)"
    >
      <el-row class="i" type="flex">
        <el-col class="i_c" v-for="(item, index) in iList" :key="index">
          <img :src="item.src" alt />
          <h2>{{ item.title }}</h2>
          <p>{{ item.content }}</p>
        </el-col>
      </el-row>
    </Fast>
    <Fast
      title="门店结合互联网销售场景"
      :id="modelName[2].id"
      sTitle="三条渠道齐发力，连接你的经营网络，发挥渠道聚合效能"
    >
      <img
        src="http://60.205.246.126:8001/images/2020/10/20/1603152989367869.png"
        alt
        class="top_img"
      />
    </Fast>
    <Fast
      title="轻松管理经营数据"
      :id="modelName[3].id"
      sTitle="提成轻松算、业绩随时看、为每个经营决策提高数据指导"
      :allScreen="true"
      background="rgb(246, 247, 252)"
    >
      <img
        src="http://60.205.246.126:8001/images/2020/10/20/1603153054659943.png"
        alt
        style="max-width: 64%"
      />
    </Fast>
    <Callcontact />
  </div>
</template>

<script>
import Fast from "../components/Fast/Fast";
import Rotation from "../components/Rotation/Rotation";
import Callcontact from "../components/Callcontact/Callcontact";
export default {
  components: {
    Fast,
    Rotation,
    Callcontact,
  },
  data() {
    return {
      bannerHeight: 0,
      bannerHeight1: document.body.clientWidth / 1.66,
      marginTOP: false,
      modelName: [
        { title: "移动端", id: "1" },
        { title: "拓客工具", id: "2" },
        { title: "销售场景", id: "3" },
        { title: "经营数据", id: "4" },
      ],
      banner: [
        {
          src:
            "http://60.205.246.126:8001/images/2020/10/20/1603152862166692.png",
        },
      ],
      iList: [
        {
          src:
            "https://yanxuan.nosdn.127.net/b40d6ba84c3e89a66a8b3b0470c20530.jpg",
          title: "经理人推荐",
          content: "扫描推荐二维码轻松发展营销团队",
        },
        {
          src:
            "https://yanxuan.nosdn.127.net/53783318e0fe232f6c56737617786b62.jpg",
          title: "满减/满送",
          content: "扩大销售 刺激消费利润率自由控制",
        },
        {
          src:
            "https://yanxuan.nosdn.127.net/ebb6d806a4592fa4201d47311d11a667.jpg",
          title: "抵扣活动",
          content: "指定客户精准营销锁住老客户",
        },
        {
          src:
            "https://yanxuan.nosdn.127.net/8353f3e7957c3bc8ab27a14bd7241919.jpg",
          title: "限时折扣",
          content: "饥饿营销立竿见影生效快",
        },
      ],
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
    },
  },
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
