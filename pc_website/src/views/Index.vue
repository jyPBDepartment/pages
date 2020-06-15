<template>
  <div class="Index">
    <div class="record_info" v-if="false">asdas</div>
    <el-container>
      <el-header style="height:100px;background-color: rgb(0, 9, 48);">
        <div class="nav">
          <div class="w">
            <el-row type="flex" align="middle">
              <el-col :span="3" :xs="12">
                <img class="logo" src="../assets/logo.png" alt />
              </el-col>
              <el-col :span="14" class="hidden-xs-only" :offset="7">
                <el-menu
                  :default-active="activeIndex"
                  style="height:100px"
                  class="el-menu-demo"
                  mode="horizontal"
                  text-color="#fff"
                  background-color="#000930"
                  active-text-color="#238efa"
                  router
                >
                  <el-menu-item index="/">
                    <span class="pd">首页</span>
                  </el-menu-item>
                  <el-menu-item index="/introduce">
                    <span class="pd">吉易慧农</span>
                  </el-menu-item>
                  <el-submenu index="/dealer_shop" :show-timeout="50" :hide-timeout="50">
                    <template slot="title">
                      <span class="pd" style="font-size:20px">产品</span>
                    </template>
                    <el-menu-item index="/dealer_shop">
                      <div>
                        <div class="c_1">经销商店铺</div>
                        <div class="c_2">电商加身，销售倍增</div>
                      </div>
                    </el-menu-item>
                    <el-menu-item index="/dealer_manager">经销商掌柜</el-menu-item>
                    <el-menu-item index="/supplier_shops">供应商店铺</el-menu-item>
                  </el-submenu>
                  <el-submenu index="4" :show-timeout="50" :hide-timeout="50">
                    <template slot="title">
                      <span class="pd" style="font-size: 20px;">解决方案</span>
                    </template>
                    <el-menu-item index="/dealer_program">农资经销商解决方案</el-menu-item>
                    <el-menu-item index="/supplier_program">农资供应商解决方案</el-menu-item>
                  </el-submenu>
                  <el-submenu index="5" :show-timeout="50" :hide-timeout="50">
                    <template slot="title">
                      <span class="pd" style="font-size:20px">合作伙伴</span>
                    </template>
                    <el-menu-item index="/partner">合作伙伴</el-menu-item>
                    <el-menu-item index="/join">加入我们</el-menu-item>
                  </el-submenu>
                </el-menu>
              </el-col>
            </el-row>
          </div>
        </div>
      </el-header>
      <el-main style="padding:0;">
        <router-view id="boxFixed" />
        <FixedNavRight @backtop="backtop" :isFixed="isFixed" />
      </el-main>
      <div class="footer">
        <div class="w" style="color:#fff">
          <el-row :gutter="20">
            <el-col :span="5">
              <div class="f_1">
                <h2>产品</h2>
                <h4>/ PRODUCT</h4>
              </div>
              <div class="f_2">
                <el-row>
                  <router-link to="/dealer_shop" class="f_3">
                    <span @click="backtop">经销商店铺</span>
                  </router-link>
                </el-row>
                <el-row>
                  <router-link to="/dealer_manager" class="f_3">
                    <span @click="backtop">经销商掌柜</span>
                  </router-link>
                </el-row>
                <el-row>
                  <router-link to="/supplier_shops" class="f_3">
                    <span @click="backtop">供应商店铺</span>
                  </router-link>
                </el-row>
              </div>
            </el-col>
            <el-col :span="5">
              <div class="f_1">
                <h2>解决方案</h2>
                <h4>/ SOLUTION</h4>
              </div>
              <div class="f_2">
                <el-row>
                  <router-link to="/dealer_program" class="f_3">
                    <span @click="backtop">农资经销商解决方案</span>
                  </router-link>
                </el-row>
                <el-row>
                  <router-link to="/supplier_program" class="f_3">
                    <span @click="backtop">农资供应商解决方案</span>
                  </router-link>
                </el-row>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="f_1">
                <h2>平台资讯</h2>
                <h4>/ PLATFORM CONSULTING</h4>
              </div>
              <div class="f_2">
                <el-row>
                  <a
                    href="http://www.jiyinongye.cn/portal/article/index/id/17/cid/1.html"
                    target="view_window"
                    class="f_3"
                  >吉林省现代农业企业协会参观考察</a>
                </el-row>
                <el-row>
                  <a
                    href="http://www.jiyinongye.cn/portal/article/index/id/19/cid/1.html"
                    target="view_window"
                    class="f_3"
                  >何为平台经济？平台经济健康发展又为何要做好政策加减法</a>
                </el-row>
                <el-row>
                  <a
                    href="http://www.jiyinongye.cn/portal/article/index/id/51/cid/1.html"
                    target="view_window"
                    class="f_3"
                  >获中央电视台关注，上央视CCTV-2频道《经济信息联播》</a>
                </el-row>
                <el-row>
                  <a
                    href="http://www.jiyinongye.cn/portal/article/index/id/52/cid/1.html"
                    target="view_window"
                    class="f_3"
                  >【吉易·云备耕】再次被关注，上《吉林新闻联播》啦</a>
                </el-row>
              </div>
            </el-col>
            <el-col :span="5">
              <div class="f_1">
                <h2>联系我们</h2>
                <h4>/ Contact US</h4>
              </div>
              <div class="f_2">
                <el-row class="f_3">合作咨询：400-684-0008</el-row>
                <el-row class="f_3">投诉反馈：jiyinongye@126.com</el-row>
                <el-row class="f_3">地址：长春市人力资源服务产业园 C座12层</el-row>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
      <div class="footer_2">
        <div class="w">
          <p class="f2_1">Copyright © 2012-2018 All Rights Reserved. 备案号：吉ICP备19004431号 网站地图</p>
          <p class="f2_1">
            友情链接：
            <a href="https://www.jlau.edu.cn/" target="view_window">吉林农业大学</a>
          </p>
        </div>
      </div>
    </el-container>
  </div>
</template>

<script>
import FixedNavRight from "../components/FixedNavRight/FixedNavRight";
export default {
  name: "Index",
  components: {
    FixedNavRight
  },
  data() {
    return {
      activeIndex: "/",
      isFixed: false,
      offsetTop: 640
    };
  },
  created() {
    this.activeIndex = `/${window.location.href.split("/", 4)[3]}`;
  },
  mounted() {
    window.addEventListener("scroll", this.initTop);
    // this.$nextTick(() => {
    //   //获取对象相对于版面或由 offsetTop 属性指定的父坐标的计算顶端位置
    //   let a = document.querySelector("#boxFixed").offsetTop
    //   this.offsetTop = a + 580;
    // });
  },
  watch: {
    $route(to) {
      this.activeIndex = to.path;
    }
  },
  methods: {
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
    },
    initTop() {
      // 设置或获取位于对象最顶端和窗口中可见内容的最顶端之间的距离 (被卷曲的高度)
      var scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      //如果被卷曲的高度大于吸顶元素到顶端位置 的距离
      this.isFixed = scrollTop > this.offsetTop ? true : false;
    }
  },
  //回调中移除监听
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.record_info {
  width: 940px;
  height: 570px;
  background: #fff;
  border-radius: 10px;
  position: absolute;
  left: 50%;
  margin-left: -470px;
  top: 50%;
  margin-top: -285px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.3);
  z-index: 999999999;
}
.nav {
  width: 100%;
  height: 100px;
  background: #000930;
  .logo {
    max-width: 80%;
  }
  .pd {
    padding: 0 30px;
    font-size: 20px;
    .c_1 {
      font-size: 18px;
    }
  }
}
.el-menu--horizontal > .el-submenu {
  height: 100px;
}
.el-menu--horizontal {
  background: #197afc;
  .el-menu .el-menu-item,
  .el-menu .el-submenu__title {
    background: #fff !important;
    color: #0e1021 !important;
  }
}
.el-menu--popup {
  background: #fff !important;
}
.el-menu--horizontal > .el-submenu.is-active .el-submenu__title {
  line-height: 100px;
  height: 100px;
}
[class*=" el-icon-"],
[class^="el-icon-"] {
  //删除了导航菜单上的小箭头
  display: none !important;
}
.el-menu.el-menu--horizontal {
  border-bottom: none;
}
.el-menu--horizontal > .el-menu-item.is-active {
  border-bottom: none;
}
.el-menu--horizontal > .el-menu-item {
  border-bottom: none;
  font-size: 15px;
  line-height: 100px;
}
.el-menu--horizontal > .el-submenu .el-submenu__title {
  font-size: 15px !important;
  line-height: 100px;
  height: 100px;
}

.footer {
  width: 100%;
  background: #191919;
  padding: 55px 0 59px 0;
  .f_1 {
    display: flex;
    align-items: center;
    h4 {
      margin-left: 10px;
      font-weight: normal;
      color: #c1c1c1;
    }
  }
  .f_2 {
    margin-top: 5px;
    line-height: 40px;
    min-height: 40px;
    .f_3 {
      font-size: 13px;
      color: #ababab;
      text-decoration: none;
    }
  }
}
.footer_2 {
  width: 100%;
  padding: 30px 0 31px 0;
  background: #0f0f0f;
  .f2_1 {
    color: #888;
    font-size: 13px;
    a {
      color: #888;
      text-decoration: none;
    }
  }
}
</style>
