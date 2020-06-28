<template>
  <div class="main">
    <div :id="id" class="slider">
      <div
        class="m_s_box"
        v-for="(item,index) in list"
        :key="index"
        @touchstart="touchstart"
        @touchmove="touchmove"
      >
        <div v-if="category == 'botton'" class="botton">
          <img :src="item.src" alt />
          <h2>{{item.title}}</h2>
        </div>
        <div v-if="category == 'tool'" class="tool">
          <img :src="item.src" alt />
          <h2>{{item.title}}</h2>
          <p>{{item.content}}</p>
        </div>
        <div v-if="category == 'custom'" class="custom">
          <h2>{{item.title}}</h2>
          <img :src="item.src" alt />
        </div>
        <div v-if="category == 'advantage'" class="advantage">
          <img :src="item.src" alt />
          <div>{{item.content}}</div>
        </div>
        <div v-if="category == 'pain'" class="pain">
          <McommonView :text="item.li" :src="item.src" :title="titleList[index]"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import McommonView from '../McommonView/McommonView'
export default {
  name: "HomeSlider",
  components:{
    McommonView
  },
  props: {
    list: Array,
    category: String,
    titleList: Array,
    id: String
  },
  data() {
    return {
      startPointX: 0,
      changePointX: 0,
      showIndex: 0
    };
  },
  created() {
    // console.log(this.titleList);
  },
  methods: {
    show(index) {
      this.changePointX = this.startPointX;
      let slider = document.getElementById(this.id);
      slider.style.marginLeft = `-${339.5 * index}px`;
    },
    touchstart(e) {
      this.startPointX = e.changedTouches[0].pageX;
    },
    touchmove(e) {
      if (this.startPointX == this.changePointX) {
        return;
      }
      let currPointX = e.changedTouches[0].pageX;
      let leftSlide = this.startPointX - currPointX;
      if (leftSlide > 50 && this.showIndex < this.list.length - 1) {
        this.show(++this.showIndex);
      } else if (leftSlide < -50 && this.showIndex > 0) {
        this.show(--this.showIndex);
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.main {
  width: 100%;
  overflow: hidden;
  .title {
    width: 320px;
    margin: 0 auto;
    margin-top: 20px;
    margin-bottom: 10px;
    text-align: left;
    font-size: 18px;
    font-weight: 900;
    .number {
      float: right;
      .littleNum {
        font-size: 12px;
        font-weight: 300;
      }
    }
  }
  .slider {
    overflow: hidden;
    width: 1100%;
    display: flex;
    white-space: nowrap;
    transition: 0.3s;
    padding: 15px calc(50vw - 165px);
    .m_s_box {
      width: 320px;
      border-radius: 5px;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.3);
      margin-right: 20px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .botton {
        img {
          width: 80px;
          height: 80px;
          margin-top: 30px;
        }
        h2 {
          margin-bottom: 30px;
        }
      }
      .custom {
        img {
          width: 100%;
        }
        h2 {
          margin: 30px 0;
        }
      }
      .advantage {
        width: 100%;
        img {
          margin-top: 30px;
          width: 70%;
        }
        div {
          margin: 30px 0;
          padding: 0 12px;
          text-align: left;
          color: #82888F;
          font-size: 15px;
          white-space: break-spaces;
        }
      }
      .tool{
        img{
          width: 82px;
          height: 82px;
          margin-top: 27px;
          margin-bottom: 15px;
        }
        h2{
          margin-top: 0;
          margin-bottom: 10px;
          font-size: 18px;
          color: #000014;
        }
        p{
          font-size: 15px;
          color: #9A9CA0;
        }
      }
    }
  }
}
</style>
