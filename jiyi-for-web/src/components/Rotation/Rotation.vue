<template>
  <div class="Rotation">
    <el-carousel
      class="hidden-md-and-down"
      :height="`${height}px`"
      arrow="hover"
      :interval="2000"
    >
      <el-carousel-item v-for="(item, index) in banner" :key="index">
        <div class="content" v-if="item.title !== ''">
          <h2 :class="index == 2 ? 'title1' : 'title'">{{ item.title }}</h2>
          <p :class="index == 2 ? 'explain1' : 'explain'">{{ item.content }}</p>
          <div
            @click="jump(item)"
            :class="index == 2 ? 'learn_more learn_more1' : 'learn_more'"
          >
            {{ item.botton }}
          </div>
        </div>
        <img
          style="background: #fff"
          class="b_1"
          :src="item.src"
          :style="{ height: `${height}px` }"
          alt
        />
      </el-carousel-item>
    </el-carousel>
    <!-- <van-swipe class="my-swipe hidden-md-and-up" :autoplay="3000" indicator-color="white">
      <van-swipe-item>
        <img class="img" src="https://yanxuan.nosdn.127.net/53140e6134bdd5cf0da7efc14b32d010.jpg" alt />
        <h2>农资经销商解决方案</h2>
      </van-swipe-item>
      <van-swipe-item>
        <img class="img" src="https://yanxuan.nosdn.127.net/2b8882bc40de9be7f30ad406291d22e0.jpg" alt />
        <h2>农资经销商解决方案</h2>
      </van-swipe-item>
      <van-swipe-item>
        <img class="img" src="https://yanxuan.nosdn.127.net/59169d7bca9b2fbcd92266b07ffcdd35.jpg" alt />
        <h2>吉易慧农上线合作伙伴计划</h2>
      </van-swipe-item>
    </van-swipe>-->
  </div>
</template>

<script>
export default {
  name: "Rotation",
  props: {
    banner: Array,
    height: Number,
  },
  data() {
    return {};
  },
  methods: {
    jump(item) {
      var timer = setInterval(function () {
        let osTop =
          document.documentElement.scrollTop || document.body.scrollTop;
        let ispeed = Math.floor(-osTop / 5);
        document.documentElement.scrollTop = document.body.scrollTop =
          osTop + ispeed;
        this.isTop = true;
        if (osTop === 0) {
          clearInterval(timer);
        }
      }, 5);
      // this.$router.push({ name: item.router });
      if (item == this.banner[0])
        this.$router.push({ name: "supplier_program" });
      if (item == this.banner[1])
        this.$router.push({ name: "supplier_program" });
      if (item == this.banner[2]) this.$router.push({ name: "partner" });
    },
  },
};
</script>

<style scoped lang="scss">
.content {
  position: absolute;
  color: #fff;
  top: 15%;
  left: calc(50% - 700px);
  .title {
    font-size: 80px;
    margin-bottom: 0;
    font-weight: bold;
  }
  .title1 {
    font-size: 60px;
    margin-bottom: 0;
  }
  .explain {
    font-size: 28px;
    margin-top: 30px;
    color: rgb(238, 236, 236);
  }
  .explain1 {
    font-size: 70px;
    margin-top: 30px;
    color: rgb(238, 236, 236);
  }
  .learn_more {
    width: 163px;
    line-height: 47px;
    color: #fff;
    background: rgb(47, 118, 227);
    border-radius: 4px;
    text-align: center;
    margin-top: 150px;
    cursor: pointer;
    font-size: 14px;
  }
  .learn_more1 {
    color: rgb(12, 12, 12);
    background: rgb(240, 219, 22);
  }
}
.b_1 {
  width: 100%;
}
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
