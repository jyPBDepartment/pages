
<template>
  <div class="FixedNavRight">
    <div class="fixedNav">
      <el-popover placement="left" width="100" trigger="hover">
        <p class="title">暂未开通</p>
        <el-row slot="reference" class="box">
          <img src="../../assets/icon/wechat.png" alt />
        </el-row>
      </el-popover>
      <el-popover placement="left" width="100" trigger="hover">
        <p class="title">400-684-0008</p>
        <el-row slot="reference" class="box">
          <img src="../../assets/icon/dianhua.png" alt />
        </el-row>
      </el-popover>
      <el-popover placement="left" width="150" trigger="hover">
        <img class="erweima" src="../../assets/6365912487915482991329897.png" alt />
        <p class="title">扫码关注吉易慧云</p>
        <el-row slot="reference" class="box">
          <img src="../../assets/icon/antOutline-qrcode.png" alt />
        </el-row>
      </el-popover>
      <transition name="el-zoom-in-top">
        <el-row class="box transition-box" v-show="isFixed" @click.native="backtop()">
          <img src="../../assets/icon/zhiding.png" alt />
        </el-row>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  name: "FixedNavRight",
  props: {
    isFixed: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {};
  },
  watch: {},
  mounted() {},
  methods: {
    backtop() {
      this.$emit("backtop");
    }
  }
};
</script>

<style scoped lang="scss">
.title {
  text-align: center;
  padding: 0;
  margin: 0;
  font-size: 14px;
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
