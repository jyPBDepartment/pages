<template>
  <div class="Callcontatct">
    <Float :ejectMenus="ejectMenus" @closeMenu="ejectMenu($event)"></Float>
    <div class="callcontact_us">
      想了解更多，欢迎拨打热线：
      <span>400 - 684 - 0008</span> ，你也可以留下联系方式，我们会主动和你联系！
      <div class="botton" @click="ejectMenu(true)">与我联系</div>
    </div>
  </div>
</template>

<script>
import Float from "../Float/Float";
export default {
  name: "Callcontatct",
  components: {
    Float
  },
  props: {},
  data() {
    return {
      ejectMenus: false
    };
  },
  methods: {
    ejectMenu(e) {
      this.ejectMenus = e;
    },
  }
};
</script>

<style scoped lang="scss">
.callcontact_us {
  padding: 45px 0;
  text-align: center;
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  span {
    font-weight: bold;
    font-size: 28px;
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
  .botton {
    margin-left: 111px;
    font-size: 16px;
    background: #2f76e3;
    color: #fff;
    border-radius: 5px;
    text-align: center;
    line-height: 40px;
    padding: 0 20px;
    cursor: pointer;
  }
}
</style>
