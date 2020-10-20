<template>
  <div class="Home">
    <!-- http://60.205.246.126:8001/images/2020/10/19/1603086264302972.jpg -->
    <img
      class="top_img"
      src="http://60.205.246.126:8001/images/2020/10/19/1603086349849218.jpg"
      style="height: 640px"
    />
    <div class="banner-font" style>
      <h2 class="css2215ee06652225e">吉易慧农</h2>
      <p class="css2215f1c4942225e">农业种植全产业链互联网服务平台</p>
    </div>
    <Fast title="吉易慧农平台简介">
      <el-row class="text m_text" style="padding: 0 50px">
        <el-col class="left_image" :span="8">
          <el-image :src="leftImage" fit="cover"></el-image>
        </el-col>
        <el-col :span="16" :xs="24" class="i_c">
          <img src alt />
          <p class="i_p">
            吉易慧农致力于依托互联网技术和先进的商业服务理念，打造集农资销售服务、商业推广、教育培训、农技服务和资源整合于一体的农业种植全产业链互联网服务平台，实施新型职业农民培育计划，改革创新农业产业生态，服务农业种植领域全过程。
          </p>
        </el-col>
      </el-row>
      <el-row class="m_text" style="padding: 0 50px">
        <p class="i_p top">
          吉易慧农平台提供的互联网技术服务和农业科技服务，稳固建立现代农业经理人、会员、商户、科研机构的合作伙伴关系，为每一位愿意凭籍吉易慧农实现人生目标的合作者提供持续的发展助力。吉易慧农坚持科技兴农、智慧兴农，以促进农户和现代农业发展有机衔接、提升农业生态为导向，以线上网络平台和线下培育新型职业农民服务体系为载体，以投身国家乡村振兴战略、维护国家粮食安全为终极目标。
        </p>
      </el-row>
    </Fast>
    <div class="box v">
      <video
        class="video"
        src="../assets/yun_x264.mp4"
        muted="muted"
        autoplay="autoplay"
        loop="loop"
      ></video>
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
    Callcontact,
  },
  data() {
    return {
      leftImage:
        "https://yanxuan.nosdn.127.net/634a386cd9bc4324c775f11b5a29f133.png",
      bannerHeight: 640,
      bannerBottomHeight: 1440 / 1.77,
    };
  },
  mounted() {},
  created() {},
  methods: {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.i_p {
  font-size: 24px;
  line-height: 45px;
  text-align: left;
  text-indent: 2em;
  letter-spacing: 2px;
  color: #2c2d48;
}
.text {
  margin-top: 40px;
  display: flex;
  align-items: center;
}
.top {
  margin-top: 60px;
}
.top_img {
  width: 100%;
}
.left_image {
  padding-left: 40px;
}
.i_c {
  // padding: 0 40px;
}
.box {
  display: flex;
  justify-content: center;
  img {
    width: 100%;
  }
  .video {
    width: 100%;
    height: 713px;
  }
}
.v {
  background-color: #08182b;
}
</style>
