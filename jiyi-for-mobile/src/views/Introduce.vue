<template>
  <div class="Home">
    <MobileBanner
      class="hidden-md-and-up"
      m_content="农业种植全产业链互联网服务平台"
      m_title="吉易慧农"
      m_banner="http://60.205.246.126/images/2020/10/20/1603173103316784.jpg"
    />
    <Fast title="吉易慧农平台简介">
      <img
        class="m_info_img"
        src="http://60.205.246.126/images/2020/10/20/1603173154768109.jpg"
        alt
      />
      <el-row class="text m_text" style="padding: 0 50px">
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
  </div>
</template>

<script>
import Fast from "../components/Fast/Fast";
import MobileBanner from "../components/MobileBanner/MobileBanner";
export default {
  components: {
    Fast,
    MobileBanner,
  },
  data() {
    return {
      bannerHeight: document.body.clientWidth / 3.31,
      bannerBottomHeight: 1440 / 1.77,
    };
  },
  mounted() {
    window.addEventListener("resize", () => this.screenChanges(), false);
  },
  created() {
    this.screenChanges();
  },
  methods: {
    screenChanges() {
      this.bannerHeight = document.documentElement.clientHeight - 100;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.i_p {
  font-size: 24px;
  line-height: 36px;
  text-align: left;
  text-indent: 2em;
  letter-spacing: 1px;
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
@media screen and (max-width: 768px) {
  .m_text {
    padding: 0 20px !important;
    margin-top: 0;
  }
  .top {
    margin-top: 0;
  }
  .i_p {
    font-size: 15px;
    color: #000014;
  }
  .m_info_img {
    width: calc(100% - 40px);
    margin: 0 auto;
    margin-top: 26px;
  }
}
</style>
