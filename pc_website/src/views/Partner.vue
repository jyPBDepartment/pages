<template>
  <div class="Home">
    <img
      class="top_img"
      src="../assets/introduce_banner_hzhb.jpg"
      :style="{height:`${bannerHeight}px`}"
    />
    <Fast title="为合作伙伴提供全方位的合作与支持">
      <el-row class="model" type="flex" justify="space-around">
        <el-col class="box" v-for="(item, index) in bModel" :key="index">
          <img :src="item.src" alt />
          <h2>{{item.title}}</h2>
          <p>{{item.content}}</p>
        </el-col>
      </el-row>
    </Fast>
    <Fast title="加入流程">
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
      <div class="join_botton" v-if="false" @click="join()">加入我们</div>
    </Fast>
    <Callcontact />
  </div>
</template>

<script>
import Fast from "../components/Fast/Fast";
import Callcontact from "../components/Callcontact/Callcontact";
export default {
  components: {
    Fast,
    Callcontact
  },
  data() {
    return {
      bannerHeight: 0,
      bModel: [
        {
          src: require("../assets/icon/10chanpin.png"),
          title: "产品赋能支持",
          content: "有针对性的开放、深度定制行业解决方案"
        },
        {
          src: require("../assets/icon/10yewuguanli.png"),
          title: "业务政策支持",
          content: "多种政策支持和商务支持，助力合作伙伴在农资领域取得成功"
        },
        {
          src: require("../assets/icon/10ic_market.png"),
          title: "市场及营销支持",
          content: "农资展会、研讨会等丰富的市场和营销机会"
        },
        {
          src: require("../assets/icon/10peixunfazhan.png"),
          title: "培训支持",
          content: "深化发展培训、技术赋能，快速提升合作伙伴服务能力"
        }
      ],
      process: [
        {
          src: require("../assets/icon/10-jiaru.png"),
          title: "申请加入，完成资质审核"
        },
        {
          src: require("../assets/icon/10-shenqing.png"),
          title: "合作洽谈"
        },
        {
          src: require("../assets/icon/10-qiandingxieyi.png"),
          title: "签订协议"
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
    join() {
      var timer = setInterval(function() {
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
    }
    
  }
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
