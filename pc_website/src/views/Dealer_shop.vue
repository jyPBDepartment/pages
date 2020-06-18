<template>
  <div class="Home">
    <img
      class="top_img"
      src="../assets/introduce_banner_jxsdp.jpg"
      :style="{height:`${bannerHeight}px`}"
    />
    <FixedNav @chage="navMove($event)" :modelName="modelName" @jump="specifyElement"></FixedNav>
    <Fast :class=" marginTOP ? 'move':'move2' " :id="modelName[0].id" title="多样化的店铺功能  全面满足农资经销商需求">
      <el-row class="f_b">
        <el-col class="f_b_d" v-for="(item, index) in bottonList" :key="index">
          <img :src="item.src" alt />
          <p>{{item.title}}</p>
        </el-col>
      </el-row>
    </Fast>
    <div style="background:#242b44">
      <div class="w">
        <Rotation :banner="bannerBottom" :height="854" />
      </div>
    </div>
    <Fast title="四大核心优势" :id="modelName[1].id">
      <el-row class="sdys">
        <el-col class="title" :span="9">
          <div class="s_c">
            <h2>行业专属</h2>
            <p>针对农资行业特有属性进行设计开发</p>
          </div>
          <div class="s_c b">
            <h2>采购\销售全覆盖</h2>
            <p>全部经营，线上搞定</p>
          </div>
        </el-col>
        <el-col :span="6">
          <img class="sdys_img" src="../assets/3-sdhxys.png" alt />
        </el-col>
        <el-col class="title" :span="9">
          <div class="s_c">
            <h2>数据分析图谱</h2>
            <p>数据辅助决策，更有效管理客户与订单</p>
          </div>
          <div class="s_c b">
            <h2>经理人管理</h2>
            <p>让更多的人帮你卖货和维护客户</p>
          </div>
        </el-col>
      </el-row>
    </Fast>
    <Fast :id="modelName[2].id" :title="modelName[2].title" :allScreen="true" background="#f0f0f0 ">
      <div class="w">
        <img class="top_img top" src="../assets/3cxgj.png" :style="{height:`${541}px`}" />
      </div>
    </Fast>

    <Callcontact />
  </div>
</template>

<script>
import Fast from "../components/Fast/Fast";
import Rotation from "../components/Rotation/Rotation";
import FixedNav from "../components/FixedNav/FixedNav";
import Callcontact from "../components/Callcontact/Callcontact";
export default {
  components: {
    Fast,
    FixedNav,
    Rotation,
    Callcontact
  },
  data() {
    return {
      bannerHeight: 0,
      bannerBottomHeight: document.body.clientWidth / 3.31,
      marginTOP: false,
      modelName: [
        { title: "产品功能", id: "1" },
        { title: "核心优势", id: "2" },
        { title: "场景展示", id: "3" }
      ],
      bannerBottom: [
        { src: require("../assets/3-gn.jpg") },
        { src: require("../assets/3-gn-bai.jpg") }
      ],
      bottonList: [
        {
          src: require("../assets/icon/3-1fbsp.png"),
          title: "发布商品"
        },
        {
          src: require("../assets/icon/3-2ddzz.png"),
          title: "订单追踪与处理"
        },
        {
          src: require("../assets/icon/3-3sygl.png"),
          title: "收银管理"
        },
        {
          src: require("../assets/icon/3-4sppfcg.png"),
          title: "销售团队管理"
        },
        {
          src: require("../assets/icon/3-5xsgt.png"),
          title: "商品批发采购"
        },
        {
          src: require("../assets/icon/3-6cuxiao.png"),
          title: "促销工具"
        },
        {
          src: require("../assets/icon/3-7xxts.png"),
          title: "消息、资讯推送"
        },
        {
          src: require("../assets/icon/3-8.fxgl.png"),
          title: "分销管理"
        },
        {
          src: require("../assets/icon/3-9.guanli.png"),
          title: "进销存管理"
        },
        {
          src: require("../assets/icon/3-10fxbb.png"),
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
</style>
