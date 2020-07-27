<template>
  <div class="tabs">
    <div class="tab_nav" v-if="type">
      <el-row type="flex" justify="center">
        <el-col
          class="tabs_nav"
          :class="index == tabsIndex &&'tabs_hover'"
          v-for="(item, index) in tabsList"
          :key="index"
          @mouseover.native="tabsChage(index)"
        >{{item}}</el-col>
      </el-row>
    </div>
    <div v-else class="tab_icon">
      <el-row type="flex" justify="center">
        <el-col
          class="tabs_nav"
          :class="index == tabsIndex &&'tabs_hover'"
          v-for="(item, index) in tabsList"
          :key="index"
          @mouseover.native="tabsChage(index)"
        >
          <div>
            <img :src="item.src" alt />
            <h2>{{item.title}}</h2>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="tab_pane" v-if="!img">
      <div
        class="tab_content"
        v-show="index == tabsIndex"
        v-for="(item, index) in tabPane"
        :key="index"
      >
        <img :src="item" alt />
      </div>
    </div>
    <div class="tab_pane" v-else>
      <div
        class="tab_content"
        v-show="index == tabsIndex"
        v-for="(item, index) in tabPane"
        :key="index"
      >
        <el-row class="list">
          <el-col :span="10">
            <img class="img" :src="item.src" alt />
          </el-col>
          <el-col class="content" :span="14">
            <ul>
              <li v-for="item in item.li" :key="item">{{item}}</li>
            </ul>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Tabs",
  props: {
    tabPane: Array,
    tabList: Array,
    tabIndex: Number,
    type: Boolean,
    img: Boolean
  },
  created() {
    this.tabsIndex = this.tabIndex;
    this.tabsList = this.tabList;
    this.tabsChage(this.tabIndex);
  },
  data() {
    return {
      tabsIndex: null,
      tabsList: []
    };
  },
  methods: {
    tabsChage(index) {
      this.tabsIndex = index;
      if (!this.type) {
        if (index == 0) {
          this.tabsList = [
            {
              src: require("../../assets/icon/md-important_devices.png"),
              title: "店内销售"
            },
            {
              src: require("../../assets/icon/md-record_voice_over1.png"),
              title: "店外销售"
            }
          ];
        } else {
          this.tabsList = [
            {
              src: require("../../assets/icon/md-important_devices1.png"),
              title: "店内销售"
            },
            {
              src: require("../../assets/icon/md-record_voice_over.png"),
              title: "店外销售"
            }
          ];
        }
      }
    }
  }
};
</script>

<style scoped lang="scss">
.tabs {
  padding-top: 30px;
  .tab_nav {
    .tabs_nav {
      cursor: pointer;
      width: 208px;
      height: 60px;
      line-height: 60px;
      text-align: center;
      font-size: 20px;
      border: 1px solid #bbb;
    }
    .tabs_hover {
      border: 2px solid #3366cc;
    }
  }
  .tab_icon {
    .tabs_nav {
      cursor: pointer;
      width: 100px;
      height: 90px;
      margin: 0 30px;
    }
    img {
      width: 50px;
      height: 50px;
    }
    h2 {
      font-size: 20px;
      margin-top: 0;
    }
    .tabs_hover {
      color: #3366cc;
    }
  }
  .tab_pane {
    width: 100%;
    overflow: hidden;
    margin-top: 5px;
    .tab_content {
      margin-top: 60px;
      img {
        max-width: 100%;
      }
    }
  }
}
.list {
  padding: 0 15%;
  margin-top: 78px;
  height: 247px;
  .img {
    max-width: 350 !important;
    max-height: 247px;
  }
  ul{
    height: 247px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    li {
    text-align: left;
    margin-bottom: 30px;
    list-style-type: disc;
    color: #101010;
    font-size: 20px;
  }
  }
}
</style>
