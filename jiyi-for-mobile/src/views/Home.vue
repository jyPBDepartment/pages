<template>
  <div class="Home">
    <Rotation :banner="banner" :height="bannerHeight" :type="1" />
    <Fast title="农资行业全场景的互联网解决方案">
      <el-row class="m_w">
        <div class="m_l_box m_l_box_t">
          <img src="https://yanxuan.nosdn.127.net/e8cf3a88fef52852d155a2071962b3a0.png" alt />
          <ul>
            <li v-for="(item, index) in title" :key="index">{{item.p}}</li>
          </ul>
        </div>
      </el-row>
    </Fast>
    <Fast title="我们的云服务产品">
      <el-row class=" m_w m_f_b">
        <div class="m_f_b_s" v-for="(item, index) in botton" :key="index">
          <img :src="item.src" alt />
          <h2>{{item.h2}}</h2>
          <p>{{item.p}}</p>
        </div>
      </el-row>
    </Fast>
    <el-row class="hidden-md-and-up m_w">
      <div class="m_l_box m_l_box_b">
        <img src="https://yanxuan.nosdn.127.net/d937a42de6dcafb6cb8efe36b832178c.jpg" alt />
        <ul>
          <li v-for="(item, index) in m_b_text" :key="index">{{item}}</li>
        </ul>
      </div>
    </el-row>
  </div>
</template>

<script>
import Rotation from "../components/Rotation/Rotation";
import Fast from "../components/Fast/Fast";

export default {
  components: {
    Rotation,
    Fast,
  },
  data() {
    return {
      bannerHeight: 200,
      bannerBottomHeight: 480,
      hover: null,
      // 页面数据: "/"
      m_b_text:[
        '技术团队安全保障系统稳定、安全、流畅',
        '360°客户顾问全程保障专属客户顾问、1v1咨询',
        '农技团队专业守护服务农户、在线圈地、科学种植',
      ],
      title: [
        {
          h2: "农资批发场景",
          p: "海量货源、全方位展示、线上谈判、交易"
        },
        {
          h2: "农资零售电商场景",
          p: "经销商网店、多种营销玩法、身临其境的交易体验感"
        },
        {
          h2: "农资零售移动场景",
          p: "实现实体店内、店外，掌上下单、收银、统计分析"
        },
        {
          h2: "分销推广场景",
          p: "客户帮你卖、员工帮你卖、整合资源、轻松分配"
        }
      ],
      botton: [
        {
          src: 'https://yanxuan.nosdn.127.net/713d45781b480937d1462b436bb2b051.png',
          h2: "经销商店铺",
          p: "线上交易节省时空系统化管理客户与订单"
        },
        {
          src: 'https://yanxuan.nosdn.127.net/47eb3e0ebf0032ae01befaf2f74739ec.png',
          h2: "经销商掌柜",
          p: "农资销售随时搞定销售数据尽在掌握"
        },
        {
          src: 'https://yanxuan.nosdn.127.net/9c4800016d4419220fd3d97415669432.png',
          h2: "供应商店铺",
          p: "节省销售成本产品大数据可视化"
        },
        {
          src: "https://yanxuan.nosdn.127.net/4d1ff55de46955ae88e60e1951d5cfdb.png",
          h2: "销售团队管理",
          p: "团队资源尽在掌握成员经营状况清晰可见"
        },
        {
          src: "https://yanxuan.nosdn.127.net/4441f68975682dbddd400d919687f1d7.png",
          h2: "营销活动",
          p: "多种营销玩法可选促进成交轻松实现"
        },
        {
          src: "https://yanxuan.nosdn.127.net/3c892685980af55b9aeb88b247f58d36.png",
          h2: "收银系统",
          p: "覆盖线上线下多种交易场景大数据挖掘辅助决策"
        },
        {
          src: "https://yanxuan.nosdn.127.net/3203488b73006bff97d22544367bedac.png",
          h2: "即时通讯",
          p: "单聊或群聊、语音消息表情、文件、图片传送"
        },
        {
          src: "https://yanxuan.nosdn.127.net/4eca558e32ca5b32ca322b91afb112c9.png",
          h2: "消息、资讯推送",
          p: "即时、定时发布活动、资讯分角色发布多种广告形式"
        }
      ]
    };
  },
  mounted() {
    window.addEventListener("resize", () => this.screenChanges(), false);
  },
  created() {
  },
  methods: {
    screenChanges() {
      this.bannerHeight = document.documentElement.clientHeight - 100;
    },
    mouseover(index) {
      console.log(index);
      if (index < 3) {
        this.hover = index;
      }
    },
    mouseout() {
      this.hover = null;
    },
    jump(index) {
      if (index < 3) {
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
        if (index == 0) this.$router.push({ name: "dealer_shop" });
        if (index == 1) this.$router.push({ name: "dealer_manager" });
        if (index == 2) this.$router.push({ name: "supplier_shops" });
      }
    },
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
h2 {
  font-weight: normal;
}
.h1 {
  margin-top: 62px;
  .h1_i_1 {
    max-width: 100%;
  }
  .h1_1 {
    text-align: left;
    margin-top: 48px;
    h2 {
      margin-top: 0;
      margin-bottom: 12px;
      font-size: 24px;
    }
    p {
      font-size: 18px;
      margin-bottom: 0;
      margin-top: 0;
      color: #938a8a;
    }
  }
}
.h2 {
  padding: 0 2%;
  .h2_1 {
    width: 25%;
    padding: 0 5% 34px 5%;
    border-bottom: 1px solid #d4d6e2;
    border-right: 1px solid #d4d6e2;
    background: #fff;
    transition: all 0.3s;
    -webkit-transition: all 0.3s; /* Safari */
    h2 {
      margin-top: 33px;
      margin-bottom: 24px;
    }
    p {
      color: #938a8a;
      line-height: 27px;
    }

    img {
      margin-top: 60px;
      max-width: 56px;
    }
    &:nth-child(4) {
      border-right: 0;
    }
    &:nth-child(5),
    &:nth-child(6),
    &:nth-child(7) {
      border-bottom: 0;
    }
    &:nth-child(8) {
      border-right: 0;
      border-bottom: 0;
    }
  }
  .hover {
    border: 0;
    cursor: pointer;
    transform: scale(1.1);
    -ms-transform: scale(1.1); /* IE 9 */
    -moz-transform: scale(1.1); /* Firefox */
    -webkit-transform: scale(1.1); /* Safari 和 Chrome */
    -o-transform: scale(1.1);
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.3);
  }
}
@media screen and (max-width: 768px) {
  .m_l_box {
    padding: 30px 20px;
    border-radius: 10px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.3);
    img {
      width: 100%;
    }
    ul {
      margin-top: 33px;
      padding-left: 10px;
      li {
        color: #000014;
        text-align: left;
        font-size: 12px;
        margin-bottom: 11px;
        list-style-type: disc;
      }
    }
  }
  .m_l_box_t {
    margin-top: 26px;
  }
  .m_l_box_b {
    margin-bottom: 30px;
  }
  .m_f_b {
    padding-top: 30px;
    display: flex;
    flex-wrap: wrap;
    .m_f_b_s {
      width: calc(50% - 70px);
      border-radius: 10px;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.3);
      margin-bottom: 10px;
      padding: 0 32px;
      &:nth-child(1),
      &:nth-child(3),
      &:nth-child(5),
      &:nth-child(7) {
        margin-right: 5px;
      }
      &:nth-child(2),
      &:nth-child(4),
      &:nth-child(6),
      &:nth-child(8) {
        margin-left: 5px;
      }
      img {
        width: 44px;
        margin: 21px 0 20px 0;
      }
      h2 {
        margin: 0 0 9px 0;
        font-size: 14px;
        color: #000014;
      }
      p {
        font-size: 12px;
        color: #9a9ca0;
      }
    }
  }
}
</style>
