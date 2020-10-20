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
      style="background: #ff5400; margin: 150px 0 10px 0"
      @click="bindDownload('hn')"
    >
      <a
        href="	
http://60.205.246.126/apk/jyhn.apk"
        >吉易慧农安卓版本下载</a
      >
    </div>
    <div style="color: grey">已有{{ hnStatistics }}人下载</div>
    <div class="btn" style="background: #0b4ea7" @click="bindDownload('zg')">
      <a
        href="	
http://60.205.246.126/apk/jyzg.apk"
        >吉易掌柜安卓版本下载</a
      >
    </div>
    <div style="color: grey">已有{{ zgStatistics }}人下载</div>
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
    };
  },
  created() {
    this.queryStatistics();
  },
  methods: {
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
      let type = "";
      if (val == "hn") {
        type = "hn";
      } else {
        type = "zg";
      }
      let params = {
        type: type,
      };
      api
        .testAxiosGet(ApiPath.url.addDownloadStatistics, params)
        .then((res) => {
          if (res.status == "200") {
            this.queryStatistics();
          }
        });
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
    a {
      color: #fff;
    }
  }
}
</style>