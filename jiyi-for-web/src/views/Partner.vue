<template>
  <div class="Home">
    <img class="top_img" src="https://s1.ax1x.com/2020/07/24/UjdcLT.jpg" style="height:640px" />
    <div class="banner-font">
      <h2 class="css2215ee06652225e">
        为合作伙
        <span class="css221a45fbb02225e">伴</span>提供全方位的合作
      </h2>
    </div>
    <Fast title="为合作伙伴提供全方位的合作与支持">
      <el-row class="model" type="flex" justify="space-around">
        <el-col class="box" v-for="(item, index) in bModel" :key="index">
          <img :src="item.src" alt />
          <h2>{{item.title}}</h2>
          <p>{{item.content}}</p>
        </el-col>
      </el-row>
    </Fast>
    <Fast title="加入流程" background="rgb(246, 247, 252)">
      <el-row class="join">
        <el-col class="box" v-for="(item, index) in process" :key="index">
          <div class="circular yuan">
            <img :src="item.src" alt />
          </div>
          <div class="s_circular yuan"></div>
          <h2>{{item.title}}</h2>
        </el-col>
        <div class="Dividing"></div>
      </el-row>
      <div class="join_botton" @click="join()">加入我们</div>
    </Fast>
    <Callcontact class="hidden-md-and-down" />
  </div>
</template>

<script>
import Fast from "../components/Fast/Fast";
import Callcontact from "../components/Callcontact/Callcontact";
export default {
  components: {
    Fast,
    Callcontact,
  },
  data() {
    return {
      bannerHeight: 0,
      bModel: [
        {
          src:
            "https://yanxuan.nosdn.127.net/aa269886c2cd53dbffda5713bec0981c.png",
          title: "产品赋能支持",
          content: "有针对性的开放、深度定制行业解决方案",
        },
        {
          src:
            "https://yanxuan.nosdn.127.net/d5d55597c0c972f7b909eccbed20d306.png",
          title: "业务政策支持",
          content: "多种政策支持和商务支持，助力合作伙伴在农资领域取得成功",
        },
        {
          src:
            "https://yanxuan.nosdn.127.net/ad2bcb9266038a2481633ad2b1c2d0cd.png",
          title: "市场及营销支持",
          content: "农资展会、研讨会等丰富的市场和营销机会",
        },
        {
          src:
            "https://yanxuan.nosdn.127.net/061d3b6b6bd87232e73bdd945a60f64e.png",
          title: "培训支持",
          content: "深化发展培训、技术赋能，快速提升合作伙伴服务能力",
        },
      ],
      process: [
        {
          src:
            "https://yanxuan.nosdn.127.net/a7c40bca1a9e3cd371b7b6223747bfa8.png",
          title: "申请加入，完成资质审核",
        },
        {
          src:
            "https://yanxuan.nosdn.127.net/32316c2db807c1610e18c0d89f8cb285.png",
          title: "合作洽谈",
        },
        {
          src:
            "https://yanxuan.nosdn.127.net/8fc5d1cff09a28089cdee721bab2f010.png",
          title: "签订协议",
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
    join() {
      var timer = setInterval(function () {
        let osTop =
          document.documentElement.scrollTop || document.body.scrollTop;
        let ispeed = Math.floor(-osTop / 5);
        document.documentElement.scrollTop = document.body.scrollTop =
          osTop + ispeed;
        this.isTop = true;
        if (osTop === 0) {
          clearInterval(timer);
        }
      }, 5);
      this.$router.push({ name: "join" });
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
.model {
  padding: 0 7%;
  .box {
    width: 290px;
    margin-top: 50px;

    display: block;
    padding: 40px 2%;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.3);
    img {
      width: 100px;
      height: 100px;
    }
  }
}
.join_botton {
  width: 132px;
  text-align: center;
  background: #2f76e3;
  margin: 0 auto;
  border-radius: 5px;
  line-height: 44px;
  color: #fff;
  cursor: pointer;
}
.join {
  position: relative;
  margin-bottom: 40px;
  padding-top: 40px;
  .box {
    width: 33.33%;
    padding: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    .yuan {
      background: #f0eeed;
      border-radius: 50%;
    }
    .circular {
      width: 150px;
      height: 150px;
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        width: 50%;
      }
    }
    .s_circular {
      margin-top: 20px;
      position: relative;
      z-index: 999;
      width: 20px;
      height: 20px;
    }
    h2 {
      margin-top: 40px;
    }
    p{
      color: #92909b;
    }
  }
  .Dividing {
    position: absolute;
    top: 220px;
    width: 100%;
    height: 1px;
    border-bottom: 1px dotted #bbb;
  }
}
</style>
