<template>
  <div id="app">
    <Index />
  </div>
</template>

<script>
import Index from "./views/Index";
export default {
  components: {
    Index,
  },
  mounted() {},
  methods: {

  },

  beforeCreate() {
    let flag = navigator.userAgent.match(
      /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
    );
    if (flag) {
      //移动端
      window.location.href='http://www.jiyinongye.com/phone/#/';
    }
  },
};
</script>


<style lang="scss">
[class*=" el-icon-"],
[class^="el-icon-"] {
  display: block !important;
}
.w {
  max-width: 1440px;
  margin: 0 auto;
}
.banner-font {
  position: absolute;
  top: 250px;
  width: 100%;
  h2 {
    font-size: 70px;
    text-align: center;
    letter-spacing: 5px;
    font-style: oblique;
  }
  p {
    font-size: 50px;
    text-align: center;
    letter-spacing: 7px;
  }
}
</style>
