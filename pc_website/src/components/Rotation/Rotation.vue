<template>
  <div class="Rotation">
    <el-carousel :height="`${height}px`" arrow="hover">
      <el-carousel-item v-for="(item, index) in banner" :key="index">
        <img class="b_1" :src="item.src" alt />
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  name: "Rotation",
  props: {
    banner: Array,
    height: Number,
  },
  data() {
    return {

    };
  },
  methods: {}
};
</script>

<style scoped lang="scss">
.b_1 {
  max-width: 100%;
}
</style>
