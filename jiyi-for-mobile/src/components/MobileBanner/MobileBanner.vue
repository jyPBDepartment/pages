<template>
  <div class="m_b hidden-md-and-up">
    <img class="m_banner" :src="m_banner" alt />
    <div class="m_b_t">
      <h2>{{m_title}}</h2>
      <p>{{m_content}}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "MobileBanner",
  props: {
    m_banner: String,
    m_title: String,
    m_content: String
  },
  data() {
    return {};
  },

  methods: {}
};
</script>

<style scoped lang="scss">
.m_b {
  width: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  .m_banner {
    width: 100%;
    height: 220px;
  }
  .m_b_t {
    position: absolute;
    text-align: center;
    top: 30%;

    h2 {
      font-size: 1.46rem;
      margin-top: 0;
      margin-bottom: 0.9rem;
    }
    p {
      font-size: 1rem;
      margin-top: 0;
    }
  }
}
</style>
