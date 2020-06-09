<template>
  <div class="Home">
    <img
      class="top_img"
      src="../assets/introduce_banner_jyzg.jpg"
      :style="{height:`${bannerHeight}px`}"
    />
    <FixedNav @chage="navMove($event)" :modelName="modelName" @jump="specifyElement"></FixedNav>
    <Fast :class=" marginTOP ? 'move':'move2' " :title="modelName[0].title" :id="modelName[0].id" :allScreen="true">
      <Tabs :tabPane="tabPane" :tabList="tabList" :tabIndex="tabIndex" :type="false" />
    </Fast>
    <Fast :title="modelName[1].title" :id="modelName[1].id" sTitle="农资销售随即搞定、销售数据尽在掌握、团队管理轻松实现">
      <el-row class="h_1">
        <el-col class="h_2" :span="8" v-for="(item, index) in advantageList" :key="index">
          <img :src="item.src" alt />
          <p>{{item.content}}</p>
        </el-col>
      </el-row>
    </Fast>
    <Fast :title="modelName[2].title" :id="modelName[2].id" background="rgb(246, 247, 252)">
      <el-row class="b" type="flex" justify="center">
        <el-col class="b_f" :span="12" v-for="(item, index) in bottonList" :key="index">
          <el-col class="icon" :span="8">
            <img :src="item.src" alt />
          </el-col>
          <el-col class="content" :span="16">
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
import Tabs from "../components/Tabs/Tabs";
import FixedNav from "../components/FixedNav/FixedNav";
import Callcontact from "../components/Callcontact/Callcontact";
export default {
  components: {
    Tabs,
    Fast,
    FixedNav,
    // Rotation,
    Callcontact
  },
  data() {
    return {
      bannerHeight: document.body.clientWidth / 3.31,
      modelName:[
        {title:'应用场景',id:'1'},
        {title:'核心优势',id:'2'},
        {title:'产品功能',id:'3'}
      ],
      marginTOP: false,
      bottonList:[{
        src:require('../assets/icon/4-1dlddtx.png'),
        title:'独立订单体系',
        li:['掌柜订单与农户订单互相独立', '进销存管理却可以同步']
      },
      {
        src:require('../assets/icon/4-2dnwfjesd.png'),
        title:'店内、外分角色设定',
        li:['大掌柜、二掌柜不同权限', '匹配对应的销售场景']
      },
      {
        src:require('../assets/icon/4-3sybb.png'),
        title:'生意报表',
        li:['日、周、月报表实时查看', '各种数据图谱清晰直观']
      },
      {
        src:require('../assets/icon/4-4zgfx.png'),
        title:'掌柜分销',
        li:['二维码扫一扫轻松推荐', '佣金分配即时完成']
      },
      {
        src:require('../assets/icon/4-5gfjxc.png'),
        title:'规范进销存',
        li:['库存变动实时清晰可见', '每一个动作都可追溯']
      },
      {
        src:require('../assets/icon/4-6xsph.png'),
        title:'销售排行',
        li:['掌柜销量排行，创造竞争氛围', '商品销量排行，及时调整销售策略']
      }],
      tabList: [
        {
          src: require("../assets/icon/md-important_devices1.png"),
          title: "店内销售"
        },
        {
          src: require("../assets/icon/md-record_voice_over1.png"),
          title: "店外销售"
        }
      ],
      tabPane: [
        require("../assets/4-dnxs.jpg"),
        require("../assets/4dwxs.jpg")
      ],
      tabIndex: 0,
      advantageList: [
        {
          src: require("../assets/4-1.png"),
          content: "打通内外部，协同人财物，最大限度发挥人才效能，拓展生意规模"
        },
        {
          src: require("../assets/4-2.png"),
          content: "全场景覆盖销售终端满足销售多元化需求"
        },
        {
          src: require("../assets/4-3.png"),
          content: "数据清晰、分析明确为每位经销商决策提供数据指导"
        }
      ]
    };
  },
  methods: {
    specifyElement(id){
      document.getElementById(id).scrollIntoView();
    },
    navMove(e) {
      this.marginTOP = e;
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
.h_1 {
  padding: 0 6%;
  .h_2 {
    padding: 0 6%;
    img {
      width: 100%;
    }

    p {
      font-size: 20px;
      line-height: 30px;
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
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.3);
    border-radius: 4px;
    text-align: left;
    .icon {
      display: flex;
      justify-content: center;
      padding: 50px 0;
      img {
        max-width: 60px;
        max-height: 60px;
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
