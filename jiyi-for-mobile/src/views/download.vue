<template>
  <div class="bg">
    <img
      class="logo"
      src="http://60.205.246.126/images/2020/10/20/1603183170707073.png"
      alt
    />
    <h2>吉易慧农</h2>
    <div
      class="btn"
      style="background: #ff5400; margin: 150px 0 0 0"
      @click="bindDownload('hn')"
    >
      吉易慧农安卓版本下载
    </div>
    <div class="count">已有{{ hnStatistics }}人下载</div>
    <div class="btn" style="background: #0b4ea7" @click="bindDownload('zg')">
      吉易掌柜安卓版本下载
    </div>
    <div class="count">已有{{ zgStatistics }}人下载</div>

    <div class="bg-bottom" v-show="showmask">
      <img src="http://60.205.246.126/images/2020/10/21/1603266042788506.png" />
    </div>
  </div>
</template>

<script>
import ApiPath from "@/api/ApiPath.js";
import api from "@/axios/api.js";
export default {
  data() {
    return {
      hnStatistics: 0,
      zgStatistics: 0,
      showmask: false,
    };
  },
  created() {
    this.queryStatistics();
  },
  methods: {
    downloadFun(val) {
      var USER_Agent = navigator.userAgent;
      var MOBILE_IOS = /(iPhone|iPad|iPod|iOS)/i;
      var MOBILE_Android = /(Android)/i;
      var WX = /(micromessenger)/i;
      console.log(WX.test(USER_Agent));
      if (WX.test(USER_Agent)) {
        this.showmask = true;
        //如果在微信中打开则只显示一个提示用户的罩层
        return;
      } else if (MOBILE_IOS.test(USER_Agent)) {
        this.showmask = false;
        alert("IOS暂时无法下载");
      } else if (MOBILE_Android.test(USER_Agent)) {
        this.showmask = false;
        if (val == "hn") {
          window.location.href = "http://60.205.246.126/apk/jyhn.apk";
        } else {
          window.location.href = "http://60.205.246.126/apk/jyzg.apk";
        }
      }
    },
    queryStatistics() {
      let params = {};
      api.testAxiosGet(ApiPath.url.queryStatistics, params).then((res) => {
        console.log(JSON.stringify(res));
        if (res.status == "200") {
          this.hnStatistics = res.hnCount;
          this.zgStatistics = res.zgCount;
        }
      });
    },
    bindDownload(val) {
      var USER_Agent = navigator.userAgent;
      var MOBILE_IOS = /(iPhone|iPad|iPod|iOS)/i;
      if (MOBILE_IOS.test(USER_Agent)) {
        this.showmask = false;
        alert("IOS暂时无法下载");
      } else {
        this.downloadFun(val);
        let params = {
          type: val,
        };
        api
          .testAxiosGet(ApiPath.url.addDownloadStatistics, params)
          .then((res) => {
            if (res.status == "200") {
              this.queryStatistics();
            }
          });
      }
    },
  },
};
</script>

<style lang="scss">
.bg {
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  flex-direction: column;
  background: url("../assets/94064sda3.jpg") no-repeat;
  background-size: 100% 100%;
  .logo {
    width: 140px;
    height: 140px;
    margin-top: 80px;
  }
  h2 {
    color: #9e2124;
    font-size: 30px;
  }
  .btn {
    width: calc(100% - 80px);
    line-height: 50px;
    border-radius: 30px;
    text-align: center;
    font-weight: bold;
    color: #fff;
  }
  .count {
    color: #999;
    margin: 10px 0;
  }

  .bg-bottom {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 888;
    background: rgba(0, 0, 0, 0.85);
    padding: 5px 5px 5px 20px;
    img {
      width: 100%;
      height: auto;
      opacity: 0.85;
    }
  }
}
</style>