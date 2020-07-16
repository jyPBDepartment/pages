<template>
  <div class="lunbo">
    <div class="left">
      <h2>
        即时响应式服务
        <br />全程为农资助力
      </h2>
      <div>
        <van-swipe height="60" :autoplay="3000" vertical>
          <van-swipe-item class="item">
            技术团队安全保障
            <br />系统稳定、安全、流畅
          </van-swipe-item>
          <van-swipe-item class="item">
            360°客户顾问全程保障
            <br />专属客户顾问、1对1咨询
          </van-swipe-item>
          <van-swipe-item class="item">
            农技团队专业守护
            <br />服务农户、在线圈地、科学种植
          </van-swipe-item>
        </van-swipe>
      </div>

      <div class="details" @click="jump()">服务详情</div>
    </div>
    <div class="right">
      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
        <van-swipe-item>
          <img src="../../assets/2.jpg" alt />
        </van-swipe-item>
        <van-swipe-item>
          <img src="../../assets/3.jpg" alt />
        </van-swipe-item>
        <van-swipe-item>
          <img src="../../assets/1.jpg" alt />
        </van-swipe-item>
      </van-swipe>
    </div>
  </div>
</template>

<script>
import { Swipe, SwipeItem } from "vant";
export default {
  components: {
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem
  },
  name: "BottomLunbo",
  props: {},
  data() {
    return {};
  },
  methods: {
    jump() {
      this.backtop();
      this.$router.push({ name: "guarantee" });
    },
    backtop() {
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
    }
  }
};
</script>

<style lang="scss">
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
.van-swipe__indicators--vertical {
  display: none;
}
.my-swipe .van-swipe-item {
  display: flex;
  justify-content: center;
  img{
      width: 100%;
      height: 460px;
  }
}
.van-swipe__track--vertical {
  height: 60px !important;
  transform: translateY(-60px);
}
.item {
  text-align: center;
  line-height: 30px;
  letter-spacing: 5px;
  color: rgb(143, 143, 143);
}
.lunbo {
  display: flex;
  .left {
    flex: 2;
    overflow: hidden;
    margin-top: 50px;
    h2 {
      text-align: center;
      font-size: 30px;
      letter-spacing: 5px;
    }
    .details {
      width: 160px;
      line-height: 40px;
      cursor: pointer;
      margin: 0 auto;
      text-align: center;
      color: #2f76e3;
      border-radius: 5px;
      margin-top: 80px;
      border: 1px solid #2f76e3;
    }
  }
  .right {
    flex: 3;
    overflow: hidden;
  }
}
</style>