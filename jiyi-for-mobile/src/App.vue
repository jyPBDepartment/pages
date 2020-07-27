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
  mounted() {},
  methods: {}
};
</script>


<style lang="scss">
[class*=" el-icon-"],
[class^="el-icon-"] {
  display: block !important;
}
.m_w {
  width: calc(100% - 40px);
  margin: 0 auto;
}
.w {
  max-width: 768px;
  margin: 0 auto;
}
.banner-font {
  position: absolute;
  top: 300px;
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
