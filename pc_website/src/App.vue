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
  }
};
</script>


<style lang="scss">
@media screen and (max-width: 768px) {
  .w {
    max-width: 768px;
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
