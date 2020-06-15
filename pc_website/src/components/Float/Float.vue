<template>
  <div class="record_info">
    <h2>预约讲解</h2>
    <el-row class="r_i_box">
      <el-col class="r_i_input" :span="12">
        <el-input v-model="info.name" placeholder="姓名（必填）"></el-input>
      </el-col>
      <el-col class="r_i_input" :span="12">
        <el-input v-model="info.phone" placeholder="手机号码（必填）"></el-input>
      </el-col>
    </el-row>
    <el-row class="r_i_box">
      <el-col class="r_i_input" :span="12">
        <el-input v-model="info.company" placeholder="公司名称（选填）"></el-input>
      </el-col>
      <el-col class="r_i_input" :span="12">
        <el-input v-model="info.email" placeholder="邮箱（选填）"></el-input>
      </el-col>
    </el-row>
    <el-row class="r_i_box">
      <el-col class="r_i_input" :span="12">
        <el-select v-model="info.programme" clearable placeholder="意向解决方案（选填）">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-col>
      <el-col class="r_i_input" :span="12"></el-col>
    </el-row>
    <el-row class="r_i_box">
      <el-col class="r_i_input" :span="24">
        <area-cascader placeholder="所在地区（选填）" v-model="info.selected" :data="$pcaa" :level="2"></area-cascader>
      </el-col>
    </el-row>
    <el-row class="r_i_box">
      <div class="botton">提交</div>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "Tabs",
  props: {},
  created() {},
  data() {
    return {
      info: {
        name: "",
        phone: null,
        company: "",
        email: "",
        programme: "",
        selected: []
      },
      options: [
        {
          value: "1",
          label: "农资经销商解决方案"
        },
        {
          value: "2",
          label: "农资供应商解决方案"
        }
      ]
    };
  },
  methods: {}
};
</script>

<style scoped lang="scss">
.record_info {
  width: 940px;
  background: #fff;
  position: absolute;
  left: 50%;
  margin-left: -470px;
  top: 50%;
  padding: 30px 0;
  margin-top: -285px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.3);
  z-index: 1999;
  .area-cascader-wrap {
    .area-select {
      .large {
        height: 40px;
      }
    }
  }
  h2 {
    text-align: center;
  }
  .r_i_box {
    padding-top: 31px;
    .botton {
      width: 310px;
      line-height: 63px;
      background: rgb(47, 118, 227);
      text-align: center;
      color: #fff;
      margin: 0 auto;
      cursor: pointer;
    }
    .r_i_input {
      padding: 0 62px;
    }
  }
}
.el-select {
  width: 100%;
}
</style>
