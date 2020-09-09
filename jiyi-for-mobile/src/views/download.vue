<template>
  <div class="bg">
    <img class="logo" src="http://60.205.246.126:8001/images/2020/09/09/1599641425635996.png" alt />
    <!-- <h2>吉易慧农</h2> -->
    <div class="btn" style="background:#FF5400;margin:150px 0 30px 0;">
      <a href="	
http://60.205.246.126:8001/apk/jyhn.apk">吉易慧农安卓版本下载</a>
    </div>
    <div class="btn" style="background:#0B4EA7;">
      <a href="	
http://60.205.246.126:8001/apk/jyzg.apk">吉易掌柜安卓版本下载</a>
    </div>
  </div>
</template>

<script>
export default {};
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
    height: 190px;
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