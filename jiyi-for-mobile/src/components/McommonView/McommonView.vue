<template>
  <div class="m_common_view">
    <el-row class="hidden-md-and-up m_w">
      <div class="m_l_box m_l_box_b" :style="title !== undefined &&'padding:0;border-radius: 0;box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.0);'">
        <h2 v-if="title !== undefined">{{title}}</h2>
        <img :src="src" alt />
        <ul>
          <li :style="title !== undefined &&'white-space:normal;'" v-for="(item, index) in text" :key="index">{{item}}</li>
        </ul>
      </div>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "Tabs",
  props: {
    text: Array,
    src: String,
    title: String
  },
  created() {
    // console.log(this.title)
  },
  data() {
    return {};
  },
  methods: {}
};
</script>

<style lang="scss">
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
  .m_l_box_b {
    margin-bottom: 30px;
  }
}
</style>
