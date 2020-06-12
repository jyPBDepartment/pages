<template>
  <div class="Rotation">
    <el-carousel :height="`${height}px`" arrow="hover" :interval="2000">
      <el-carousel-item v-for="(item, index) in banner" :key="index">
        <div class="content" v-if="item.title !== ''">
          <h2 :class="index == 2?'title1':'title'">{{item.title}}</h2>
          <p :class="index == 2?'explain1':'explain'">{{item.content}}</p>
          <div @click="jump(item)" :class="index== 2?'learn_more1':'learn_more'">{{item.botton}}</div>
        </div>
        <img class="b_1" :src="item.src" :style="{height:`${height}px`}" alt />
      </el-carousel-item>
    </el-carousel>
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
      var timer = setInterval(function() {
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
      this.$router.push({ name: item.router });
    }
  }
};
</script>

<style scoped lang="scss">
.content {
  position: absolute;
  color: #fff;
  top: 15%;
  left: 10%;
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
  }
  .learn_more1 {
    width: 163px;
    line-height: 47px;
    color: rgb(12, 12, 12);
    font-size: 18px;
    background: rgb(240, 219, 22);
    border-radius: 4px;
    text-align: center;
    margin-top: 150px;
    cursor: pointer;
  }
}
.b_1 {
  width: 100%;
}
</style>
