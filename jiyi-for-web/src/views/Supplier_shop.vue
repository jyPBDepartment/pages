<template>
  <div class="Home">
    <img
      class="top_img"
      src="http://60.205.246.126/images/2020/10/20/1603155565410409.jpg"
      style="height: 640px"
    />
    <div class="banner-font" style>
      <h2 class="css2215ee06652225e">有效降低供应商销售成本</h2>
      <p class="css2215f1c4942225e">大数据辅助科学决策</p>
    </div>
    <FixedNav
      @chage="navMove($event)"
      :modelName="modelName"
      @jump="specifyElement"
    ></FixedNav>
    <Fast
      :class="marginTOP ? 'move' : 'move2'"
      :img="true"
      :title="modelName[0].title"
      :id="modelName[0].id"
      :allScreen="true"
    >
      <div class="w">
        <Rotation style="margin-top: 30px" :banner="banner" :height="648" />
      </div>
    </Fast>

    <div style="width: 100%; height: 2px; background: #f6f7fc"></div>
    <Fast :title="modelName[1].title" :id="modelName[1].id">
      <el-row class="h_y">
        <el-col :span="12" class="text1">
          <p>线上货品展示，不受人脉限制，轻松取得更多销量</p>
          <p>仅需网店运营人员，节省销售成本，提高利润率</p>
          <p>大数据支撑决策，不再盲目生产</p>
          <p>通过支付订金的方式，提前锁定销售数量，杠杆效应助力</p>
        </el-col>
        <el-col :span="12">
          <img
            src="https://yanxuan.nosdn.127.net/8f0291a76b9bf43d0cd724291b426fef.png"
            alt
          />
        </el-col>
      </el-row>
    </Fast>
    <Fast
      :title="modelName[2].title"
      :id="modelName[2].id"
      background="#f6f7fc"
    >
      <el-row class="b-b" type="flex" justify="center">
        <el-col
          class="b_f"
          :span="12"
          v-for="(item, index) in bottonList"
          :key="index"
        >
          <el-col class="icon" :span="10">
            <img :src="item.src" alt />
          </el-col>
          <el-col class="content" :span="14">
            <h2>{{ item.title }}</h2>
            <ul>
              <li v-for="liContent in item.li" :key="liContent">
                {{ liContent }}
              </li>
            </ul>
          </el-col>
        </el-col>
      </el-row>

      <FullFunctionality
        class="wz_btn"
        :isMobile="false"
        :functionList="functionList"
      />
    </Fast>
    <Callcontact />
  </div>
</template>

<script>
import Fast from "../components/Fast/Fast";
import Rotation from "../components/Rotation/Rotation";
import FixedNav from "../components/FixedNav/FixedNav";
import FullFunctionality from "../components/FullFunctionality/FullFunctionality";
import Callcontact from "../components/Callcontact/Callcontact";
export default {
  components: {
    Fast,
    FixedNav,
    Rotation,
    Callcontact,
    FullFunctionality,
  },
  data() {
    return {
      bannerHeight: 0,
      marginTOP: false,
      banner: [
        {
          src: "http://60.205.246.126/images/2020/10/20/1603155412586590.png",
        },
        {
          src: "http://60.205.246.126/images/2020/10/20/1603155382347530.png",
        },
      ],
      functionList: [
        {
          name: "商品发布",
          info: "可对供应的商品进行全方位的展示发布",
        },
        {
          name: "商品上下架",
          info: "按需随时调整商品上架可售，下架停售",
        },
        {
          name: "库存变动",
          info: "根据实际商品进销存变动库存，变动可追溯",
        },
        {
          name: "品牌管理",
          info: "可对不同品牌进行分类添加、查询、修改、删除",
        },
        {
          name: "订单管理",
          info: "支持根据订单的不同状态进行对应处理",
        },
        {
          name: "退货管理",
          info: "供应商可根据与经销商的协商结果在线处理退货订单",
        },
        {
          name: "报表管理",
          info: "在线随时查看某时段的经营状况数据",
        },
        {
          name: "查看农户订单",
          info: "可在线查看农户在经销商处订购自身商品的情况",
        },
        {
          name: "消息提醒",
          info: "提醒交易、联系人、新闻、活动、公告等消息",
        },
        {
          name: "资金管理",
          info: "支持资金流水查询、提现、充值",
        },
        {
          name: "在线支付",
          info: "支持余额在线支付方式",
        },
      ],
      modelName: [
        { title: "应用场景", id: "1" },
        { title: "核心优势", id: "2" },
        { title: "产品功能", id: "3" },
      ],
      m_b_text: [
        "线上货品展示，不受人脉限制，轻松取得更多销量",
        "仅需网店运营人员，节省销售成本，提高利润率",
        "大数据支撑决策，不再盲目生产",
        "通过支付订金的方式，提前锁定销售数量，杠杆效应助力",
      ],
      bottonList: [
        {
          src:
            "https://yanxuan.nosdn.127.net/e37f219870c719017e25855d1735fccd.png",
          title: "商品发布、管理",
          li: ["商品可从多角度做详情展示", "商品品牌、规格细致分类管理"],
        },
        {
          src:
            "https://yanxuan.nosdn.127.net/1f70cd30d5f2fc317559cd522bb0af41.png",
          title: "库存管理",
          li: ["上架、下架、销售、退货、库存变动等清晰可见"],
        },
        {
          src:
            "https://yanxuan.nosdn.127.net/23527042e3a7817212f0dbc3a7a5a807.png",
          title: "订单管理",
          li: ["不但可查看经销商采购订单，还可查看农户订单"],
        },
        {
          src:
            "https://yanxuan.nosdn.127.net/1aef0593a2652a6dc0bcc0396190aae2.png",
          title: "报表管理",
          li: ["经营状况、数据统计、报表分析"],
        },
      ],
    };
  },
  mounted() {
    window.addEventListener("resize", () => this.screenChanges(), false);
  },
  created() {
    this.screenChanges();
  },
  methods: {
    navMove(e) {
      this.marginTOP = e;
    },
    specifyElement(id) {
      document.getElementById(id).scrollIntoView();
    },
    screenChanges() {
      this.bannerHeight = document.documentElement.clientHeight - 100;
    },
  },
};
</script>


<style lang="scss">
.top_img {
  width: 100%;
}
.move {
  margin-top: 120px;
  transition-duration: 0.5s;
}
.move2 {
  transition-duration: 0.5s;
}
.h_y {
  padding: 0 10%;
  .text1 {
    text-align: left;
    font-size: 20px;
    color: #101010;
    padding-top: 75px;
    p {
      margin-bottom: 40px;
    }
  }
}
.b-b {
  padding: 0 10%;
  flex-wrap: wrap;
  margin-top: 30px;
  margin-bottom: 20px;
  .b_f {
    width: 48%;
    margin: 10px;
    padding: 30px 0;
    border-radius: 4px;
    text-align: left;
    background: #fff;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.3);
    .icon {
      display: flex;
      justify-content: center;
      padding: 21px 0;
      img {
        max-width: 70px;
        max-height: 70px;
      }
    }
    .content {
      font-size: 20px;
      color: #101010;
      h2 {
        font-size: 18px;
        font-weight: 400;
        margin-bottom: 20px;
      }
      ul {
        padding-left: 0;
        li {
          list-style-type: disc;
          color: #92909b;
          font-size: 14px;
          line-height: 24px;
        }
      }
    }
  }
}
.m_botton_info {
  width: calc(100% - 40px);
  border-radius: 10px;
  padding-bottom: 10px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.3);
  margin: 20px auto;
  img {
    margin-top: 38px;
    width: 82px;
    height: 82px;
  }
  h2 {
    margin-top: 18px;
    margin-bottom: 20px;
  }
  p {
    margin-top: 0;
    margin-bottom: 10px;
    font-size: 15px;
    color: #9a9ca0;
  }
}
</style>
