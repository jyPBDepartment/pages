
<template>
  <div ref="circleBox">
    <div class="f_nav" :class=" navBarFixed && 'navBarWrap'">
      <el-row type="flex" justify="center" class="box">
        <el-col
          class="n_b"
          :class="index !== 0 && ' left_style'"
          @click.native="chage(item.id)"
          v-for="(item, index) in modelName"
          :key="index"
        >{{item.title}}</el-col>
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
    },
    modelName: {
      type: Array,
      default: function() {
        return [];
      }
    }
  },
  data() {
    return {
      navBarFixed: false
    };
  },
  watch: {
    navBarFixed(newValue) {
      this.$emit("chage", newValue);
    }
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
  methods: {
    chage(id) {
      this.$emit("jump", id);
    },
    handleScroll() {
      let info = this.$refs.circleBox.getBoundingClientRect();
      let top = info.top;
      if (top < 1) this.navBarFixed = true;
      else this.navBarFixed = false;
    }
  }
};
</script>

<style lang="scss">
.navBarWrap {
  position: fixed;
  top: 0;
  z-index: 999;
  box-shadow: 0 3px 7px rgba($color: #000000, $alpha: 0.09);
  background: #fff !important;
}
.f_nav {
  width: 100%;
  background: #f0eeed;
  margin-top: -4px;
  .n_b {
    width: 147px;
    text-align: center;
    line-height: 54px;
    font-size: 16px;
    color: #555;

    cursor: pointer;
    &:hover {
      background: #343434;
      color: #fff;
    }
  }
  .left_style {
    background: url("../../assets/bian_2.png") no-repeat left center;
  }
}
</style>
