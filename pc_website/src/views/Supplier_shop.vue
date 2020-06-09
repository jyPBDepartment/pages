<template>
  <div class="Home">
    <img class="top_img" src="../assets/introduce_banner_gysdp.jpg" :style="{height:`${bannerHeight}px`}" />
    <FixedNav @chage="navMove($event)" :modelName="modelName" @jump="specifyElement"></FixedNav>
    <Fast :class=" marginTOP ? 'move':'move2' " :img="true" :title="modelName[0].title" :id="modelName[0].id" :allScreen="true">
      <Rotation style="margin-top:30px" :banner="banner" :height="bannerHeight" />
    </Fast>
    <Fast :title="modelName[1].title" :id="modelName[1].id" background="rgb(246, 247, 252)">
      <el-row class="h_y">
        <el-col :span="12" class="text">
          <p>线上货品展示，不受人脉限制，轻松取得更多销量</p>
          <p>仅需网店运营人员，节省销售成本，提高利润率</p>
          <p>大数据支撑决策，不再盲目生产</p>
          <p>通过支付订金的方式，提前锁定销售数量，杠杆效应助力</p>
        </el-col>
        <el-col :span="12">
          <img src="../assets/5-hxys.png" alt />
        </el-col>
      </el-row>
    </Fast>
    <Fast :title="modelName[2].title" :id="modelName[2].id">
      <el-row class="b" type="flex" justify="center">
        <el-col class="b_f" :span="12" v-for="(item, index) in bottonList" :key="index">
          <el-col class="icon" :span="6">
            <img :src="item.src" alt />
          </el-col>
          <el-col class="content" :span="18">
            <h2>{{item.title}}</h2>
            <ul>
              <li v-for="liContent in item.li" :key="liContent">{{liContent}}</li>
            </ul>
          </el-col>
        </el-col>
      </el-row>
    </Fast>
    <Callcontact />
  </div>
</template>

<script>
import Fast from "../components/Fast/Fast";
import Rotation from "../components/Rotation/Rotation";
import FixedNav from "../components/FixedNav/FixedNav";
import Callcontact from "../components/Callcontact/Callcontact";
export default {
  components: {
    Fast,
    FixedNav,
    Rotation,
    Callcontact
  },
  data() {
    return {
      bannerHeight: document.body.clientWidth / 3.31,
      marginTOP: false,
      banner: [{ src: require("../assets/jjfa-1.jpg") }],
      modelName:[
        {title:'应用场景',id:'1'},
        {title:'核心优势',id:'2'},
        {title:'产品功能',id:'3'}
      ],
      bottonList: [
        {
          src: require("../assets/icon/4-1dlddtx.png"),
          title: "商品发布、管理",
          li: ["商品可从多角度做详情展示", "商品品牌、规格细致分类管理"]
        },
        {
          src: require("../assets/icon/4-2dnwfjesd.png"),
          title: "库存管理",
          li: ["上架、下架、销售、退货、库存变动等清晰可见"]
        },
        {
          src: require("../assets/icon/4-3sybb.png"),
          title: "订单管理",
          li: ["不但可查看经销商采购订单，还可查看农户订单"]
        },
        {
          src: require("../assets/icon/4-4zgfx.png"),
          title: "报表管理",
          li: ["经营状况、数据统计、报表分析"]
        },
      ]
    };
  },
  methods: {
    navMove(e) {
      this.marginTOP = e;
    },
    specifyElement(id){
      document.getElementById(id).scrollIntoView();
    }
  }
};
</script>


<style lang="scss">
.top_img {
  max-width: 100%;
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
  .text {
    text-align: left;
    font-size: 20px;
    color: #101010;
    padding-top: 40px;
    p {
      margin-bottom: 40px;
    }
  }
}
.b {
  padding: 0 10%;
  flex-wrap: wrap;
  margin-top: 30px;
  .b_f {
    width: 48%;
    margin: 10px;
    padding: 30px 0;
    border-radius: 4px;
    text-align: left;
    background: #fff;
    .icon {
      display: flex;
      justify-content: center;
      padding: 50px 0;
      img {
        max-width: 60px;
      }
    }
    .content {
      font-size: 20px;
      color: #101010;
      ul {
        padding-left: 0;
        li {
          font-size: 18px;
          color: #938a8a;
        }
      }
    }
  }
}
</style>
