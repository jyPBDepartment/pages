<template>
  <div class="Callcontatct">
    <Float :ejectMenus="ejectMenus" @closeMenu="ejectMenu($event)"></Float>
    <div class="callcontact_us">
      想了解更多，欢迎拨打热线：
      <span>{{hotline}}</span> ，你也可以留下联系方式，我们会主动和你联系！
      <div class="botton" @click="ejectMenu(true)">与我联系</div>
    </div>
  </div>
</template>

<script>
import Float from "../Float/Float";
import ApiPath from "@/api/ApiPath.js";
import api from "@/axios/api.js";
export default {
  name: "Callcontatct",
  components: {
    Float
  },
  props: {},
  data() {
    return {
      ejectMenus: false,
      hotline:"",
    };
  },
  created() {
   
   this.transJurisdictionId();
  },
  methods: {
    ejectMenu(e) {
      this.ejectMenus = e;
    },
      //显示热线电话
    transJurisdictionId(val) {
      let params = {
        id: val
      };
      api.testAxiosGet(ApiPath.url.showPhone, params).then(res => {
        let code = res.status;
        if (code == 0) {
          this.hotline = res.data.hotline;
         
        }
      });
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
