<template>
  <div class="bg">
    <img
      src="http://60.205.246.126/images/2020/10/20/1603183082056960.jpg"
      alt
    />
    <div class="w">
      <div class="down-info">
        <h2>全新上线，等你下载</h2>
        <p>
          吉林吉易互联网平台发展有限公司通过互联网技术惠泽三农，后随着业务发展衍生出“吉易慧农”的品牌形象，公司以“智慧服务三农，共建美好乡村”为使命。
          吉林吉易互联网平台发展有限公司
        </p>
        <div class="info">
          <img
            class="icon"
            src="http://60.205.246.126/images/2020/10/20/1603183170707073.png"
            alt
          />
          <div>
            <h2>吉易慧农APP上线啦！</h2>
            <p style="font-size: 14px">软件大小14M</p>
            <p style="font-size: 14px">APP发布时间:2020-8-26</p>
          </div>
        </div>
        <div class="botton">
          <div class="b-box">
            <img
              src="http://60.205.246.126/images/2020/10/20/1603183114913008.png"
              alt
            />
            <div class="btn" @click="bindDownload('hn')">
              吉易慧农安卓版本下载
            </div>
            <div style="margin-top: 5px">已有{{ hnStatistics }}人下载</div>
          </div>
          <div class="b-box">
            <img
              src="http://60.205.246.126/images/2020/10/20/1603183114913008.png"
              alt
            />
            <div
              class="btn"
              style="background: #3377bd"
              @click="bindDownload('zg')"
            >
              吉易掌柜安卓版本下载
            </div>
            <div style="margin-top: 5px">已有{{ zgStatistics }}人下载</div>
          </div>
        </div>
      </div>
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
        window.open("http://60.205.246.126/apk/jyhn.apk");
      } else {
        type = "zg";
        window.open("http://60.205.246.126/apk/jyzg.apk");
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



<style  lang="scss">
p {
  font-size: 14px;
}
.bg {
  width: 100%;
  img {
    width: 100%;
  }
  .down-info {
    width: 800px;
    position: absolute;
    z-index: 999;
    top: 27%;
    h2 {
      font-weight: bold;
      font-size: 50px;
    }
    .info {
      display: flex;
      margin-top: 80px;
      align-items: center;
      .icon {
        width: 130px;
        height: 130px;
        margin-right: 20px;
      }
      h2 {
        margin-top: 0;
        font-size: 24px;
      }
    }
  }
  .botton {
    display: flex;
    margin-top: 50px;
    .b-box {
      display: flex;
      justify-content: space-between;
      flex-direction: column;
      align-items: center;
      &:nth-child(1) {
        margin-right: 20px;
      }
      img {
        width: 120px;
        height: 120px;
        margin-bottom: 10px;
      }
      .btn {
        padding: 8px 20px;
        border-radius: 40px;
        background: #ff7d0a;
        cursor: pointer;
        color: #fff;
      }
    }
  }
}
</style>