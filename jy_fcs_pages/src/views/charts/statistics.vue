/**
* 图表界面
*/ 
<template>
  <!-- 组件主盒子 -->

  <el-row :gutter="20">
    <el-col :span="6">
      <div class="first">
        <div class="left">
          <img src="../../assets/img/三人.png" class="icon" />
        </div>
        <div class="right">
          <span type="text" class="up">用户数量检测</span>
          <span type="text" class="center">2000</span>
          <div class="last">
            <img src="../../assets/img/箭头(1).png" class="iconFront" />
            <span type="text" class="down">同比昨天3%</span>
          </div>
        </div>
      </div>
    </el-col>
    <el-col :span="6">
      <div class="first">
        <div class="left">
          <img src="../../assets/img/农民.png" class="icon" />
        </div>
        <div class="right">
          <span type="text" class="up1">农活发布数量监测</span>
          <span type="text" class="center1">{{ argicultural }}</span>
          <div class="last">
            <img src="../../assets/img/箭头.png" class="iconFront" />
            <span type="text" class="down">同比昨天10%</span>
          </div>
        </div>
      </div>
    </el-col>
    <el-col :span="6">
      <div class="first">
        <div class="left">
          <img src="../../assets/img/书.png" class="icon" />
        </div>
        <div class="right">
          <span type="text" class="up">发帖数量监测</span>
          <span type="text" class="center1">{{ invationSum }}</span>
          <div class="last">
            <img src="../../assets/img/箭头(1).png" class="iconFront" />
            <span type="text" class="down">同比昨天32.32%</span>
          </div>
        </div>
      </div>
    </el-col>
    <el-col :span="6">
      <div class="first">
        <div class="left">
          <img src="../../assets/img/树叶.png" class="icon" />
        </div>
        <div class="right">
          <span type="text" class="up1">农活预约数量监测</span>
          <span type="text" class="center">{{ count }}</span>
          <div class="last">
            <img src="../../assets/img/箭头.png" class="iconFront" />
            <span type="text" class="down">同比昨天10%</span>
          </div>
        </div>
      </div>
    </el-col>
    <el-col :span="24">
      <div style="height: 450px; margin-top: 20px" ref="SCEchart"></div>
    </el-col>
  </el-row>
</template>
<script type="text/ecmascript-6">
import Chart from "echarts";
import ApiPath from "@/api/ApiPath.js";
import api from "@/axios/api.js";
export default {
  name: "welcome",
  data() {
    return {
      count: "",
      invationSum: "",
      argicultural: "",
      //  数据总览
      SCEoption: {
        title: {
          text: "数据总览",
          x: "45%",
          textStyle: {
            fontSize: 28,
            color: "#1C8FE5",
          },
        },
        tooltip: {},
        legend: {
          data: ["昨日", "今日"],
          x: "40%",
          y: "95%",
          itemWidth: 52,
          itemHeight: 20,
          textStyle: {
            fontSize: 16,
            color: "#101010",
          },
        },
        grid: {
          // left: 50,
          // right: 10,
          // top: 30,
          bottom: 100,
          borderWidth: 1,
        },
        xAxis: {
          type: "category",
          data: ["用户数量", "农活发布", "发帖数量", "农活预约"],
          axisLine: {
            lineStyle: {
              color: "#BBBBBB",
              width: 1,
            },
          },
          axisLabel: {
            margin: 14,
            height: 70,
            interval: 0,
            textStyle: {
              fontSize: 16,
              color: "#101010",
            },
          },
        },
        yAxis: [
          {
            splitLine: { show: false },
            type: "value",
            min: 0,
            max: 50,
            position: "left",
            axisLine: {
              lineStyle: {
                color: "#BBBBBB",
                width: 1,
              },
            },
            axisLabel: {
              margin: 14,
              textStyle: {
                fontSize: 16,
                color: "#101010",
              },
            },
          },
          {
            splitLine: { show: false },
            type: "value",
            min: 0,
            max: 25,
            scale: "true",
            position: "right",
            axisLine: {
              lineStyle: {
                color: "#BBBBBB",
              },
            },
            axisLabel: {
              formatter: "{value}%",
              margin: 14,
              textStyle: {
                fontSize: 16,
                color: "#101010",
              },
            },
          },
        ],
        series: [
          {
            name: "昨日",
            type: "bar",
            data: [10, 50, 60, 10],
            barWidth: 52,
            itemStyle: {
              normal: {
                color: new Chart.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: "#FCCA00" },
                  { offset: 0.5, color: "#FCCA00" },
                  { offset: 1, color: "#FCCA00" },
                ]),
              },
              emphasis: {
                color: new Chart.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: "#FCCA00" },
                  { offset: 0.7, color: "#FCCA00" },
                  { offset: 1, color: "#FCCA00" },
                ]),
              },
            },
          },
          {
            name: "今日",
            type: "bar",
            data: [],
            barWidth: 52,
            itemStyle: {
              normal: {
                color: new Chart.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: "#27B148" },
                  { offset: 0.5, color: "#27B148" },
                  { offset: 1, color: "#27B148" },
                ]),
              },
              emphasis: {
                color: new Chart.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: "#27B148" },
                  { offset: 0.7, color: "#27B148" },
                  { offset: 1, color: "#27B148" },
                ]),
              },
            },
          },
        ],
      },
    };
  },
  // 导入组件
  components: {},
  // 创建完毕状态(里面是操作)
  created() {
    this.transJurisdictionId();
  },
  // 挂载结束状态(里面是操作)
  mounted() {
    // this.getSCE();
    // this.getSUM();
    // this.getClick();
    // this.getpay();
    // this.getpayNum();
  },
  // 里面的函数只有调用才会执行
  methods: {
    //显示信息
    transJurisdictionId(val) {
      console.log(111);
      let params = {};
      api.testAxiosGet(ApiPath.url.initEchart, params).then((res) => {
        let code = res.state;
        if (code == 0) {
          this.count = res.farmwork;
          this.invationSum = res.invation;
          this.argicultural = res.agricultural;

          this.SCEoption.series[1].data.push(
            10,
            res.agricultural,
            res.invation,
            res.farmwork
          );
          this.chart = Chart.init(this.$refs.SCEchart);
          this.chart.setOption(this.SCEoption);
        }
      });
    },

    // 交易总笔数
    getSCE() {
      this.chart = Chart.init(this.$refs.SCEchart);
      this.chart.setOption(this.SCEoption);
    },
    // 交易总金额
    getSUM() {
      this.chart = Chart.init(this.$refs.SUMEchart);
      this.chart.setOption(this.SUMoption);
    },
    // 总点击量
    getClick() {
      this.chart = Chart.init(this.$refs.ClickEchart);
      this.chart.setOption(this.Clickoption);
    },
    // 支付方式统计
    getpay() {
      this.chart = Chart.init(this.$refs.payEchart);
      this.chart.setOption(this.payoption);
    },
    // 支付方式统计
    getpayNum() {
      this.chart = Chart.init(this.$refs.payNumEchart);
      this.chart.setOption(this.payNumoption);
    },
  },
};
</script>
<style scoped >
.first {
  border-width: 1px;
  border-style: solid;
  padding: 10px;
  box-sizing: border-box;
}
.left img {
  width: 60px;
  height: 60px;
}

.last img {
  margin-top: 4px;
  width: 60px;
  height: 30px;
}
.el-row {
  margin-bottom: 20px;
  /* &:last-child {
    margin-bottom: 0;
  } */
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>