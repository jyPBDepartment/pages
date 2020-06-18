<template>
  <div id="app">
    <Index />
  </div>
</template>

<script>
import Index from "./views/Index";
export default {
  components: {
    Index
  },
  mounted() {
    // window.addEventListener("resize", () => this.screenChanges(), false);
  },
  methods: {
    // screenChanges() {
    //   let a = this._isMobile();
    //   if (a) {
    //     alert("移动端");
    //     // this.$router.replace("/pc_index");
    //   } else {
    //     alert("pc端");
    //     // this.$router.replace("/m_index");
    //   }
    // },
    // _isMobile() {
    //   let flag = navigator.userAgent.match(
    //     /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
    //   ); // localStorage.setItem('isiphone',flag)

    //   localStorage.setItem("ismobile", flag ? 1 : 0);

    //   return flag;
    // }
  }
};
</script>


<style lang="scss">
[class*=" el-icon-"],
[class^="el-icon-"] {
  display: block !important;
}
@media screen and (max-width: 768px) {
  .m_w{
    width: calc(100% - 40px);
    margin: 0 auto;
  }
}
/*pad: w >= 768  && w< 992*/
@media screen and (max-width: 992px) and (min-width: 768px) {
  .w {
    max-width: 768px;
    margin: 0 auto;
  }
}
/*中等屏幕   w >= 992  && w<1200*/
@media screen and (max-width: 9999px) and (min-width: 992px) {
  .w {
    max-width: 1440px;
    margin: 0 auto;
  }
}
</style>
