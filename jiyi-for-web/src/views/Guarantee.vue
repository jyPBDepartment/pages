<template>
  <div class="Home">
    <img
      class="top_img"
      src="https://s1.ax1x.com/2020/07/24/UjwKXV.jpg"
      style="height:640px;"
    />
    <div class="banner-font">
      <h2 class="css2215ee06652225e">帮用户做管理 为用户做服务</h2>
    </div>
    <div class="g_img">
      <img src="https://s1.ax1x.com/2020/07/24/UjqUnP.jpg" alt />
      <div class="title">
        <h2>客户顾问版块</h2>
        <p>
          在线客服贴心服务
          <br />用户需求即时反馈
        </p>
      </div>
    </div>
    <div class="g_img">
      <img src="https://s1.ax1x.com/2020/07/24/Ujqd78.jpg" alt />
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
      <img src="https://s1.ax1x.com/2020/07/24/Ujq0AS.jpg" alt />
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
export default {
  components: {},
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
    top: 230px;
    left: 150px;
    h2 {
      font-size: 105px;
      font-weight: bold;
    }
    p {
      font-size: 50px;
      letter-spacing: 18px;
    }
  }
}
</style>
