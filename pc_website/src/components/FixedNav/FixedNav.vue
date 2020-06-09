
<template>
  <div ref="circleBox">
    <div class="f_nav" v-show="navBarFixed" :class=" navBarFixed && 'navBarWrap'">
      <el-row type="flex" justify="center" class="box">
        <el-col class="n_b">产品功能</el-col>
        <el-col class="n_b">核心优势</el-col>
        <el-col class="n_b">场景演示</el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  name: "FixedNav",
  props: {
    title: String,
    sTitle: {
      type: String,
      default: null
    },
    background: {
      type: String,
      default: "#fff"
    }
  },
  data() {
    return {
      navBarFixed: false
    };
  },
  watch: {
    navBarFixed(newValue) {
        this.$emit('chage', newValue)
    }
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
  methods: {
    handleScroll() {
      let info = this.$refs.circleBox.getBoundingClientRect()
      let top = info.top;
      if (top < 1) this.navBarFixed = true;
      else this.navBarFixed = false;
    }
  }
};
</script>

<style scoped lang="scss">
.navBarWrap {
  position: fixed;
  top: 0;
  z-index: 999;
}
.f_nav {
  width: 100%;
  background: #fff;
  .n_b {
    width: 147px;
    text-align: center;
    line-height: 54px;
    font-size: 16px;
    color: #555;

    cursor: pointer;
    &:nth-child(2),
    &:nth-child(3) {
      background: url("../../assets/bian_2.png") no-repeat left center;
    }
    &:hover {
      background: #343434;
      color: #fff;
    }
  }
  .box {
    box-shadow: 0 3px 7px rgba($color: #000000, $alpha: 0.09);
  }
}
</style>
