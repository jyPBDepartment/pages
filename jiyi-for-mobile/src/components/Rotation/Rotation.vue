<template>
  <div class="Rotation">
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item>
        <img class="img" src="https://yanxuan.nosdn.127.net/f569c0d8251269a734f3ff386c751000.jpg" alt />
        <h2>农资经销商解决方案</h2>
      </van-swipe-item>
      <van-swipe-item>
        <img class="img" src="https://yanxuan.nosdn.127.net/30d5911913c3bbb72bb53c3074aa0a47.jpg" alt />
        <h2>农资经销商解决方案</h2>
      </van-swipe-item>
      <van-swipe-item>
        <img class="img" src="https://yanxuan.nosdn.127.net/97b63d0cc666eeff206e479edc996c3c.jpg" alt />
        <h2>吉易慧农上线合作伙伴计划</h2>
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
export default {
  name: "Rotation",
  props: {

  },
  data() {
    return {};
  },
  methods: {
  }
};
</script>

<style scoped lang="scss">
.van-swipe-item{
  display: flex;
  justify-content: center;
}
.my-swipe {
  
  .img {
    width: 100%;
    max-height: 390px !important;
  }
  h2{
    font-size: 21px;
    color: #fff;
    position: absolute;
    bottom: 55px;
    z-index: 9999;
  }
}
</style>
