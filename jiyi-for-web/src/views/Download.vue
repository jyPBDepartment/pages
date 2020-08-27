<template>
  <div class="bg">
    <img src="../assets/3.jpg" alt />
    <div class="w">
      <div class="down-info">
        <h2>全新上线，等你下载</h2>
        <p>
          吉林吉易互联网平台发展有限公司通过互联网技术惠泽三农，后随着业务发展衍生出“吉易慧农”的品牌形象，公司以“智慧服务三农，共建美好乡村”为使命。
          吉林吉易互联网平台发展有限公司
        </p>
        <div class="info">
          <img class="icon" src="../assets/icon.png" alt />
          <div>
            <h2>吉易慧农APP上线啦！</h2>
            <p>软件大小14M</p>
            <p>APP发布时间:2020-8-26</p>
          </div>
        </div>
        <div class="botton">
          <div class="b-box">
            <img src="../assets/ewm.png" alt />
            <div class="btn">
              <a href="	
http://60.205.246.126:8001/apk/jyhn.apk">吉易慧农安卓版本下载</a>
            </div>
          </div>
          <div class="b-box">
            <img src="../assets/ewm.png" alt />
            <div class="btn" style="background:#3377bd">
              <a href="	
http://60.205.246.126:8001/apk/jysk.apk">吉易掌柜安卓版本下载</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>



<style  lang="scss">
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

        a {
          color: #fff;
        }
      }
    }
  }
}
</style>