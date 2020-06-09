<template>
  <div class="Home">
    <img class="top_img" src="../assets/introduce_banner.jpg" :style="{height:`${bannerHeight}px`}" />
    <Fast title="吉易慧农概述">
      <el-row>
        <el-col class="left_image" :span="5">
          <el-image :src="leftImage" fit="cover"></el-image>
        </el-col>
        <el-col :span="19" class="i_c">
          <p
            class="i_p"
          >吉易慧农致力于依托互联网技术和先进的商业服务理念，打造集农资销售服务、商业推广、教育培训、农技服务和资源整合于一体的农业种植全产业链互联网服务平台，实施新型职业农民培育计划，改革创新农业产业生态，服务农业种植领域全过程。</p>
        </el-col>
      </el-row>
      <el-row>
        <p
          class="i_p top"
        >吉易慧农平台提供的互联网技术服务和农业科技服务，稳固建立现代农业经理人、会员、商户、科研机构的合作伙伴关系，为每一位愿意凭籍吉易慧农实现人生目标的合作者提供持续的发展助力。</p>
      </el-row>
      <el-row>
        <p
          class="i_p"
        >吉易慧农坚持科技兴农、智慧兴农，以促进农户和现代农业发展有机衔接、提升农业生态为导向，以线上网络平台和线下培育新型职业农民服务体系为载体，以投身国家乡村振兴战略、维护国家粮食安全为终极目标。</p>
      </el-row>
    </Fast>
    <div class="box">
      <div class="w">
        <img
          class="top_img"
          src="../assets/2jyhngst.gif"
          :style="{height:`${bannerBottomHeight}px`}"
        />
      </div>
    </div>
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
      leftImage: require("../assets/2-430-410.jpg"),
      bannerHeight: document.body.clientWidth / 3.31,
      bannerBottomHeight: 1440 / 1.77,
      banner: [{ src: require("../assets/banner1.jpg") }]
    };
  },
  methods: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.i_p {
  font-size: 22px;
  color: #101010;
  line-height: 60px;
  font-weight: 300;
  text-align: left;
  text-indent: 2em;
}
.top {
  margin-top: 60px;
}
.top_img {
  max-width: 100%;
}
.left_image {
  padding-left: 40px;
}
.i_c {
  padding: 0 40px;
}
.box {
  display: flex;
  justify-content: center;
  img {
    width: 100%;
  }
}
</style>
