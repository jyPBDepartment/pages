<template>
  <div class="main">
    <div class="m_complete" v-if="isMobile" @click="show(true)">完整功能列表</div>
    <div class="m_complete" v-if="!isMobile" @click="show(true)">功能详情</div>
    <transition v-if="isMobile" name="el-fade-in-linear">
      <div v-if="isShow" class="transition-box">
        <div class="m_popup"></div>
        <div class="popup">
          <table width="calc(100% - 20px)" class="table">
            <caption>
              <h2>产品功能</h2>
            </caption>
            <thead>
              <tr>
                <th>功能</th>
                <th>描述</th>
              </tr>
            </thead>
            <tr v-for="(item, index) in functionList" :key="index">
              <td>{{item.name}}</td>
              <td>{{item.info}}</td>
            </tr>
          </table>
          <div class="away" @click="show(false)">收起</div>
        </div>
      </div>
    </transition>
    <div v-if="isShow && !isMobile">
      <div class="m_popup">
        <div class="popup">
          <table width="calc(100% - 20px)" class="table">
            <caption>
              <h2>完整功能列表</h2>
            </caption>
            <thead>
              <tr>
                <th colspan="2">服务内容</th>
              </tr>
            </thead>
            <tr v-for="(item, index) in functionList" :key="index">
              <td>{{item.name}}</td>
              <td>{{item.info}}</td>
            </tr>
          </table>
          <div class="away" @click="show(false)">收起</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "FullFunctionality",
  components: {},
  props: {
    functionList: Array,
    isMobile: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      isShow: false
    };
  },
  created() {},
  methods: {
    show(type) {
      this.isShow = type;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.m_complete {
  cursor: pointer;
  width: 200px;
  margin: 0 auto;
  height: 70px;
  background: #fff;
  border-radius: 35px;
  text-align: center;
  line-height: 70px;
  font-size: 24px;
  color: #101010;
  border: 1px solid #bbbbbb;
}

.m_popup {
  width: 100%;
  height: 100vh;
  position: fixed;
  overscroll-behavior: contain;
  background: rgba(0, 0, 0, 0.5);
  top: 0;
  left: 0;
  z-index: 9898;
}
.popup {
  width: calc(100% - 80px);
  height: calc(100vh - 80px);
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.3);
  padding-bottom: 1px;
  border-radius: 5px;
  background: #fff;
  position: fixed;
  z-index: 9899;
  top: 40px;
  left: 40px;
  max-height: calc(100vh - 80px);
  overflow: auto;
  .inner-container::-webkit-scrollbar {
    display: none;
  }
  .away {
    width: 400px;
    cursor: pointer;
    margin: 40px auto;
    line-height: 45px;
    font-size: 22px;
    background: #337eff;
    border-radius: 23px;
    text-align: center;
    color: #fff;
  }
}

table {
  border-collapse: collapse;
  width: calc(100% - 100px);
  margin: 0 auto;
  text-align: center;
}

table td,
table th {
  border: 1px solid #d5d9de;

  color: #333333;
  font-size: 18px;
  height: 60px;
  &:nth-child(2){
    text-align: left;
    padding-left: 20px;
  }
}

table thead th {
  background-color: rgb(109, 159, 235);
  color: #fff;
  font-size: 18px;
  font-weight: bold;
  &:nth-child(1) {
    width: 40%;
  }
  &:nth-child(2) {
    width: 60%;
  }
}
@media screen and (max-width: 768px) {
  .m_complete {
    width: 135px;
    margin: 0 auto;
    height: 35px;
    background: #fff;
    border-radius: 18px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.3);
    text-align: center;
    line-height: 35px;
    font-size: 12px;
    color: #076bf2;
  }
  .m_popup {
    width: 100%;
    height: 100vh;
    position: fixed;
    overscroll-behavior: contain;
    top: 0;
    z-index: 9898;
  }
  .popup {
    width: calc(100% - 40px);
    margin: 0 auto;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.3);
    padding-bottom: 1px;
    border-radius: 5px;
    background: #fff;
    position: fixed;
    z-index: 9899;
    top: 100px;
    left: 20px;
    max-height: 500px;
    overflow: auto;
    .inner-container::-webkit-scrollbar {
      display: none;
    }
    .away {
      width: calc(100% - 30px);
      margin: 20px auto;
      line-height: 45px;
      font-size: 22px;
      background: #337eff;
      border-radius: 23px;
      text-align: center;
      color: #fff;
    }
  }

  table {
    border-collapse: collapse;
    width: calc(100% - 20px);
    margin: 0 auto;
    text-align: center;
  }

  table td,
  table th {
    border: 1px solid #d5d9de;

    color: #333333;
    font-size: 14px;
    height: 45px;
  }

  table thead th {
    background-color: #f5f6f7;
    color: #333333;
    font-size: 14px;
    font-weight: bold;
    &:nth-child(1) {
      width: 40%;
    }
    &:nth-child(2) {
      width: 60%;
    }
  }
}
</style>
