
<template>
  <div class="Fast">
    <div class="fast" :style="{background:background}">
      <div class="w" :style="allScreen && 'max-width:100%'">
        <div class="fast_title" :class="!sTitle && 'm_b'" :style="{color:color}">{{ title }}</div>
        <div v-show="sTitle" class="fast_s_title hidden-md-and-down" :style="{color:sColor}">{{ sTitle }}</div>
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Fast",
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
    color: {
      type: String,
      default: "#333"
    },
    sColor: {
      type: String,
      default: "#999"
    },
    allScreen: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {};
  },
  methods: {}
};
</script>

<style scoped lang="scss">
.b_1 {
  max-width: 100%;
}
.fast {
  padding-top: 60px;
  padding-bottom: 60px;
  text-align: center;
  background-color: #f6f7fc;
  color: #333;
  .fast_title {
    font-size: 34px;
    font-weight: 300;
    line-height: 34px;
  }
  .fast_s_title {
    margin: 22px auto 40px;
    font-size: 16px;
    line-height: 16px;
    color: #999;
  }
}
@media screen and (max-width: 768px) {
  .fast {
    padding:30px 0 27px 0;
    .fast_title {
      font-size: 21px;
      color: #000014 !important;
      font-weight: 500;
    }
  }
}
</style>
