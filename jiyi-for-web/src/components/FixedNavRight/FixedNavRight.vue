
<template>
  <div class="FixedNavRight">
    <div class="fixedNav">
      <el-popover placement="left" width="300" trigger="hover">
        <div class="right_nav">
          <h2 class="title">微信咨询(XXXXXXXX)</h2>
          <div class="sBatton">
            <div>&nbsp;> 功能和特性</div>
            <div>&nbsp;> 价格和优惠</div>
          </div>
        </div>
        <el-row slot="reference" class="box">
          <img src="https://yanxuan.nosdn.127.net/a6463043b87b19100b27952fc9dbed01.png" alt />
        </el-row>
      </el-popover>
      <el-popover placement="left" width="400" trigger="hover">
        <div class="right_nav">
          <h2 class="title">电话咨询(400-684-0008)</h2>
          <div class="sBatton">
            <div class="call">&nbsp;> 功能和特性</div>
            <div class="call">&nbsp;> 获取内部资料</div>
            <div class="call">&nbsp;> 价格和优惠</div>
          </div>
          <p class="z_1">你也可以留下联系方式，我们会主动和你联系！</p>
          <div class="y_w" @click="userInfo()">与我联系</div>
        </div>
        <el-row slot="reference" class="box">
          <img src="https://yanxuan.nosdn.127.net/ddf0340a72a7358e94ca0a1b3152b66d.png" alt />
        </el-row>
      </el-popover>
      <el-popover placement="left" width="150" trigger="hover">
       
       <img class="erweima" :src="url" alt />
        <p class="title">扫码关注吉易慧云</p>
        <el-row slot="reference" class="box">
          <img src="https://yanxuan.nosdn.127.net/4743ece30c6fab4dcd584fd22055f3f6.png" alt />
        </el-row>
      </el-popover>
      <transition name="el-zoom-in-top">
        <el-row class="box transition-box" v-show="isFixed" @click.native="backtop()">
          <img src="https://yanxuan.nosdn.127.net/306a2892765d35782cf8b5f8dbc1c09b.png" alt />
        </el-row>
      </transition>
    </div>
  </div>
</template>

<script>
// import ApiPath from '@/api/ApiPath'
// import api from '@/axios/api'
export default {
  name: "FixedNavRight",
  props: {
    isFixed: {
      type: Boolean,
      default: false
    },
    isShow: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      info: false,
      url:"https://yanxuan.nosdn.127.net/52e87332b3ed02a5ec1a71911272337b.png",
    
    };
  },
  mounted() {},
  created(){
  },
  methods: {
   
    backtop() {
      this.$emit("backtop");
    },
    userInfo() {
      if (!this.isShow) {
        this.$emit("chickCallMe", true);
      }
    },
 
  }
};
</script>

<style scoped lang="scss">
.record_info {
  width: 940px;
  height: 569px;
  background: #fff;
}
.title {
  text-align: center;
  margin: 0;
}
.right_nav {
  margin: 0 20px;
  .call {
    width: 33.33% !important;
    text-align: center;
    &:nth-child(1) {
      text-align: left;
    }
    &:nth-child(3) {
      text-align: right;
    }
  }
  .title {
    padding: 0;
    margin: 0;
    font-size: 20px;
    line-height: 40px;
    color: rgb(35, 142, 250);
    border-bottom: 1px solid #999;
  }
  .sBatton {
    display: flex;
    flex-wrap: wrap;
    div {
      width: 50%;
      margin-top: 20px;
      &:nth-child(3) {
        margin-bottom: 10px;
      }
    }
  }
  .z_1 {
    text-align: center;
  }
  .y_w {
    margin: 20px auto;
    width: 165px;
    font-size: 18px;
    line-height: 50px;
    text-align: center;
    color: #fff;
    border-radius: 10px;
    background: rgb(35, 142, 250);
    cursor: pointer;
  }
}
.erweima {
  width: 150px;
  height: 150px;
}
.fixedNav {
  position: fixed;
  top: 300px;
  right: 0;
  z-index: 9999999999;
  cursor: pointer;

  .box {
    margin: 1px;
    width: 60px;
    height: 60px;
    background: rgba(47, 118, 227, 0.77);
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .tarn {
    transition-duration: 1s;
  }
}
</style>
