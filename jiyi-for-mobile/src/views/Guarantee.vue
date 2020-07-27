<template>
  <div class="Home">
    <MobileBanner
      class="hidden-md-and-up"
      m_title="帮用户做管理 为用户做服务"
      m_banner="https://yanxuan.nosdn.127.net/3b25e7ce28cbed92a7d45f6470b1fc75.jpg"
    />
    <div class="g_img">
      <img src="https://yanxuan.nosdn.127.net/b4bb9f2b217e61be6a99dd1187f145a0.jpg" alt />
      <div class="title">
        <h2>客户顾问版块</h2>
        <p>
          在线客服贴心服务
          <br />用户需求即使反馈
        </p>
      </div>
    </div>
    <div class="g_img">
      <img src="https://yanxuan.nosdn.127.net/b8709caed2cf5fb5c1794266c35dd76e.jpg" alt />
      <div class="title" style="color:#fff;">
        <h2>农技顾问板块</h2>
        <p>
          实战派 + 技术交流
          <br />背靠吉林农业大学专家顾问团队
          <br />农技服务线上线下双管齐下
        </p>
      </div>
    </div>
    <div class="g_img">
      <img src="https://yanxuan.nosdn.127.net/59a798ada9707de04a2eaa59dd5f74f0.jpg" alt />
      <div class="title" style="color:#fff;">
        <h2>技术团队</h2>
        <p>
          以用户需求为核心
          <br />保障系统稳定、安全、流畅
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import MobileBanner from "../components/MobileBanner/MobileBanner";
export default {
  components: { MobileBanner },
  data() {
    return {
      bannerHeight: document.body.clientWidth / 3.31
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
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.top_img {
  width: 100%;
}
img {
  width: 100%;
}
.g_img {
  position: relative;
  div {
    position: absolute;
    top:50px;
    left: 30px;
    h2 {
      font-size: 32px;
      font-weight: bold;
    }
    p {
      font-size: 14px;
      letter-spacing: 2px;
    }
  }
}
</style>
