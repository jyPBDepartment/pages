<template>
  <div class="Rotation">
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item>
        <img
          class="img"
          src="http://60.205.246.126/images/2020/10/20/1603172380693971.jpg"
          alt
        />
        <h2>农资经销商解决方案</h2>
      </van-swipe-item>
      <van-swipe-item>
        <img
          class="img"
          src="http://60.205.246.126/images/2020/10/20/1603172770668144.jpg"
          alt
        />
        <h2>农资经销商解决方案</h2>
      </van-swipe-item>
      <van-swipe-item>
        <img
          class="img"
          src="http://60.205.246.126/images/2020/10/20/1603172514869340.jpg"
          alt
        />
        <h2>吉易慧农上线合作伙伴计划</h2>
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
import { Swipe, SwipeItem } from "vant";
export default {
  components: {
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
  },
  name: "Rotation",
  props: {},
  data() {
    return {};
  },
  methods: {},
};
</script>

<style scoped lang="scss">
.van-swipe-item {
  display: flex;
  justify-content: center;
}
.my-swipe {
  .img {
    width: 100%;
    max-height: 390px !important;
  }
  h2 {
    font-size: 21px;
    color: #fff;
    position: absolute;
    bottom: 55px;
    z-index: 9999;
  }
}
</style>
