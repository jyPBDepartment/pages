<template>
  <div class="Index">
    <Float :ejectMenus="ejectMenus" @closeMenu="ejectMenu($event)"></Float>
    <el-container>
      <el-header class="header">
        <div class="nav">
          <div class="w">
            <el-row type="flex" align="middle">

              <el-col class="m_logo" :span="3">
                <img class="logo" @click="jumpHome" src="https://yanxuan.nosdn.127.net/91f69cd236a9a5869b641534edc92f26.png" alt />

              </el-col>
              <el-col :span="21" style="display:flex;justify-content:flex-end">
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
                  <el-menu-item index="/guarantee">
                    <span class="pd">服务保障</span>
                  </el-menu-item>
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
        <router-view id="boxFixed" v-if="isRouterAlive"/>
        <FixedNavRight
          @backtop="backtop"
          :isFixed="isFixed"
          :isShow="fixedShow"
          @chickCallMe="ejectMenu($event)"
        />
      </el-main>
      <div class="footer">
        <div class="w" style="color:#fff">
          <el-row :gutter="20">
            <el-col :span="4" :offset="2">
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
            <el-col :span="4">
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
            <el-col :span="7">
              <div class="f_1">
                <h2>平台资讯</h2>
                <h4>/ PLATFORM CONSULTING</h4>
              </div>
              <div class="f_2">
                <el-row >
                  <a style="color: #ababab;font-size: 13px;" target="view_window" href="http://www.jiyinongye.cn/portal/article/index/id/17/cid/1.html">吉林省现代农业企业协会参观考察</a>
                </el-row>
                <el-row >
                  <a style="color: #ababab;font-size: 13px;" target="view_window" href="http://www.jiyinongye.cn/portal/article/index/id/19/cid/1.html">何为平台经济？平台经济健康发展又为何要做好政策加减法</a>
                </el-row>
                <el-row >
                  <a style="color: #ababab;font-size: 13px;" target="view_window" href="http://www.jiyinongye.cn/portal/article/index/id/51/cid/1.html">获中央电视台关注，上央视CCTV-2频道《经济信息联播》</a>
                </el-row>
                <el-row >
                  <a style="color: #ababab;font-size: 13px;" target="view_window" href="http://www.jiyinongye.cn/portal/article/index/id/52/cid/1.html">【吉易·云备耕】再次被关注，上《吉林新闻联播》啦</a>
                </el-row>
              </div>
            </el-col>
            <el-col :span="4">
              <div class="f_1">
                <h2>联系我们</h2>
                <h4>/ Contact US</h4>
              </div>
               <div class="f_2">
                  <div class="f_3">
                   合作咨询:400-684-0008<br>
                   投诉反馈:jiyinongye@126.com<br>
                   地址：长春市人力资源服务产业园<br/><span style="margin-left:40px;">C座12层</span>
                  </div>
                  <div class="article_content">
                    <p v-html="ariContent">{{ariContent}}</p>
                  </div>
                </div>
            </el-col>
          </el-row>
        </div>
      </div>
      <div class="footer_2 hidden-xs-only">
        <div class="w">
          <el-row>
            <el-col :span="20" :offset="2">
              <p class="f2_1">Copyright ©  2012-2018 All Rights Reserved. 备案号：吉ICP备19004431号</p>
              <p class="f2_1">
                友情链接：
                <a :href="linkAddress" target="view_window">吉林农业大学</a>
              </p>
            </el-col>
          </el-row>
        </div>
      </div>
    </el-container>
  </div>
</template>

<script>
import FixedNavRight from "../components/FixedNavRight/FixedNavRight";
import Float from "../components/Float/Float";
export default {
  name: "Index",
  components: {
    FixedNavRight,
    Float
  },
  provide() {
    return {
      reload: this.reload
    };
  },
  data() {
    return {
      hotline:"",
      email:"",
      address:"",
      copyRight:"",
      recordNo:"",
      logoUrl:"",
      linkAddressL:"",
      linkAddress:"",
      linkName:"",
      ariContent:"",
      isRouterAlive: true,
      id:"",
      articleList: [],
      activeIndex: "/",
      isFixed: false,
      fixedShow: false,
      offsetTop: 640,
      ejectMenus: false,
      isMenu: false,
      contentList:[],
      m_fotterList: [
        {
          name: "首页",
          routerPath: ""
        },
        {
          name: "吉易慧农",
          routerPath: "introduce"
        },
        {
          name: "经销商店铺",
          routerPath: "dealer_shop"
        },
        {
          name: "经销商掌柜",
          routerPath: "dealer_manager"
        },
        {
          name: "供应商店铺",
          routerPath: "supplier_shops"
        },

        {
          name: "农资经销商解决方案",
          routerPath: "dealer_program"
        },
        {
          name: "农资供应商解决方案",
          routerPath: "supplier_program"
        },
        {
          name: "加入我们",
          routerPath: "join"
        }
      ],
      mMenus: [
        {
          name: "首页",
          routerPath: ""
        },
        {
          name: "吉易惠农",
          routerPath: "introduce"
        },
        {
          name: "产品",
          state: false,
          secondLevel: [
            {
              name: "经销商店铺",
              routerPath: "dealer_shop"
            },
            {
              name: "经销商掌柜",
              routerPath: "dealer_manager"
            },
            {
              name: "供应商店铺",
              routerPath: "supplier_shops"
            }
          ]
        },
        {
          name: "解决方案",
          state: false,
          secondLevel: [
            {
              name: "农资经销商解决方案",
              routerPath: "dealer_program"
            },
            {
              name: "农资供应商解决方案",
              routerPath: "supplier_program"
            }
          ]
        },
        {
          name: "服务保障",
          routerPath: "guarantee"
        },
        {
          name: "合作伙伴",
          state: false,
          secondLevel: [
            {
              name: "合作伙伴",
              routerPath: "partner"
            },
            {
              name: "加入我们",
              routerPath: "join"
            }
          ]
        }
      ]
    };
  },
  created() {
    // this.activeIndex = `/${window.location.href.split("/", 4)[3]}`;

    // this.initArticle();
  //  this.transJurisdictionId();
  },
  mounted() {
    window.addEventListener("scroll", this.initTop);
  },
  watch: {
    $route(to) {
      this.activeIndex = to.path;
    }
    
  },
  methods: {

    jumpHome(){
      this.$router.push({path:'/'})
    },
    link(item) {
      this.$router.push({ name: "article", query: { id: item } });
      this.isRouterAlive = false;
      this.$nextTick(function() {
        this.isRouterAlive = true;
      });
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
    },
    initTop() {
      // 设置或获取位于对象最顶端和窗口中可见内容的最顶端之间的距离 (被卷曲的高度)
      var scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      //如果被卷曲的高度大于吸顶元素到顶端位置 的距离
      this.isFixed = scrollTop > this.offsetTop ? true : false;
    },
    ejectMenu(e) {
      this.ejectMenus = e;
      this.fixedShow = e;
    },
    isOpen(index, item) {
      if (this.mMenus[index].secondLevel !== undefined) {
        this.mMenus[index].state = !this.mMenus[index].state;
      } else {
        this.routerJump(item);
      }
    },
    routerJump(item) {
      this.$router.push({ path: `/${item.routerPath}` });
      let arr = [];
      this.mMenus.forEach(value => {
        value.state = false;
        arr.push(value);
      });
      this.mMenus = arr;
      this.isMenu = false;
      this.backtop();
    },
    isMenus() {
      this.isMenu = !this.isMenu;
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
.header {
  height: 100px !important;
  background-color: rgb(0, 9, 48);
}
.el-submenu__title i {
  color: rgba(0, 0, 0, 0);
}
.nav {
  width: 100%;
  height: 100px;
  background: #000930;
  .logo {
    max-width: 80%;
    cursor: pointer;
  }
  .pd {
    padding: 0 30px;
    font-size: 20px;
    .c_1 {
      font-size: 20px;
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
    font-size: 16px;
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
  padding: 0 10px;
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
