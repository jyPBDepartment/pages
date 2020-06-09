<template>
    <div class="Callcontatct">
      <div class="callcontact_us">
      想了解更多，欢迎拨打热线：
      <span>400 - 684 - 0008</span> ，你也可以留下联系方式，我们会主动和你联系！
      <el-button style="btn" type="primary">与我联系</el-button>
    </div>
    </div>
</template>

<script>
export default {
  name: "Callcontatct",
  props: {

  },
  data() {
    return {

    };
  },
  methods: {}
};
</script>

<style scoped lang="scss">
.callcontact_us {
  padding: 45px 0;
  text-align: center;
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  span {
    font-weight: bold;
    font-size: 28;
  }
  .el-button--primary {
    background: #2f76e3;
    border-color: #2f76e3;
  }
  .el-button:focus,
  .el-button:hover {
    background: rgb(99, 149, 224);
    border-color: rgb(99, 149, 224);
  }
}
</style>
