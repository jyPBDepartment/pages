<template>
  <div class="Home">
    <img
      class="top_img"
      src="../assets/introduce_banner_nzjxsjjfa.jpg"
      :style="{height:`${bannerHeight}px`}"
    />
    <!-- <FixedNav @chage="navMove($event)" :modelName="modelName" @jump="specifyElement"></FixedNav> -->
    <Fast
      :class=" marginTOP ? 'move':'move2' "
      title="更适合农资行业的移动端"
      :id="modelName[0].id"
      sTitle="每一屏都是为农资行业专属设计开发，助力经销商领跑行业"
      :allScreen="true"
    >
      <Rotation style="margin-top:112px" :banner="banner" :height="bannerHeight" />
    </Fast>
    <Fast title="丰富的营销拓客工具" :id="modelName[1].id" sTitle="多种营销玩法帮助你助你更好地拓、锁、留、升客">
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
      background="rgb(246, 247, 252)"
    >
    <img src="../assets/jjfa-1.jpg" alt class="top_img" />
      <!-- <el-row>
        <el-col :span="8">
          <h2>线上电商</h2>
          <img src="../assets/6-ssds.png" alt />
        </el-col>
        <el-col :span="8">
          <h2>店内销售</h2>
          <img src="../assets/6-dnxs.png" alt />
        </el-col>
        <el-col :span="8">
          <h2>店外销售</h2>
          <img src="../assets/6-dwxs.png" alt />
        </el-col>
      </el-row> -->
    </Fast>
    <Fast
      title="轻松管理经营数据"
      :id="modelName[3].id"
      sTitle="提成轻松算、业绩随时看、为每个经营决策提高数据指导"
      :allScreen="true"
    >
      <img src="../assets/jjfa-x.jpg" alt class="top_img" />
    </Fast>
    <Callcontact />
  </div>
</template>

<script>
import Fast from "../components/Fast/Fast";
import Rotation from "../components/Rotation/Rotation";
// import FixedNav from "../components/FixedNav/FixedNav";
import Callcontact from "../components/Callcontact/Callcontact";
export default {
  components: {
    Fast,
    // FixedNav,
    Rotation,
    Callcontact
  },
  data() {
    return {
      bannerHeight: 0,
      marginTOP: false,
      modelName: [
        { title: "移动端", id: "1" },
        { title: "拓客工具", id: "2" },
        { title: "销售场景", id: "3" },
        { title: "经营数据", id: "4" }
      ],
      banner: [
        { src: require("../assets/6-1.jpg") },
        { src: require("../assets/6-2.jpg") }
      ],
      iList: [
        {
          src: require("../assets/icon/6-1jlrtj.jpg"),
          title: "经理人推荐",
          content: "扫描推荐二维码轻松发展营销团队"
        },
        {
          src: require("../assets/icon/6-2mjyhj.jpg"),
          title: "满减/满送",
          content: "扩大销售 刺激消费利润率自由控制"
        },
        {
          src: require("../assets/icon/6-3mshd.jpg"),
          title: "抵扣活动",
          content: "指定客户精准营销锁住老客户"
        },
        {
          src: require("../assets/icon/6-4xszk.jpg"),
          title: "限时折扣",
          content: "饥饿营销立竿见影生效快"
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
    h2{
      margin-top: 40px;
      margin-bottom: 28px;
    }
    p{
      line-height: 25px;
      margin-top: 0;
    }
  }
}
</style>
