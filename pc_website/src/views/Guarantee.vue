<template>
  <div class="Home">
    <img
      class="top_img hidden-md-and-down"
      src="../assets/fwbz.jpg"
      :style="{height:`${bannerHeight}px`}"
    />
    <img class="hidden-md-and-up" src="../assets/fwbz.jpg" alt="">
    <img src="../assets/fwbz1.jpg" alt="">
    <img src="../assets/fwbz2.jpg" alt="">
    <img src="../assets/fwbz3.jpg" alt="">
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
img{
    width: 100%;
}
</style>
