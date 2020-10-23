<template>
  <transition name="el-fade-in">
    <div v-show="ejectMenus" class="transition-box record_info">
      <h2>预约讲解</h2>
      <i
        style="
          position: absolute;
          right: 20px;
          top: 20px;
          font-size: 25px;
          cursor: pointer;
        "
        class="el-icon-close"
        @click="closeMenu"
      ></i>

      <el-row class="r_i_box">
        <el-col class="r_i_input" :span="12">
          <el-input
            v-model="info.name"
            placeholder="姓名（必填）"
            @change="name"
          ></el-input>
        </el-col>
        <el-col class="r_i_input" :span="12">
          <el-input
            v-model="info.phoneNum"
            placeholder="手机号码（必填）"
            @change="tel"
          ></el-input>
        </el-col>
      </el-row>
      <el-row class="r_i_box">
        <el-col class="r_i_input" :span="12">
          <el-input
            v-model="info.companyName"
            placeholder="公司名称（选填）"
          ></el-input>
        </el-col>
        <el-col class="r_i_input" :span="12">
          <el-input v-model="info.email" placeholder="邮箱（选填）"></el-input>
        </el-col>
      </el-row>
      <el-row class="r_i_box">
        <el-col class="r_i_input" :span="12">
          <el-select
            v-model="info.solution"
            clearable
            placeholder="意向解决方案（选填）"
          >
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
          <area-cascader
            type="text"
            placeholder="所在地区（选填）"
            v-model="address"
            :data="mypcaa"
            :level="2"
          ></area-cascader>
        </el-col>
      </el-row>
      <el-row class="r_i_box">
        <div class="botton" @click="submit()">提交</div>
      </el-row>
    </div>
  </transition>
</template>

<script>
import pcaa from "area-data/pcaa";

import ApiPath from "@/api/ApiPath";
import api from "@/axios/api";
export default {
  name: "Tabs",
  props: {
    ejectMenus: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      mypcaa: pcaa,

      address: "",
      info: {
        name: "",
        phone: "",
        company: "",
        email: "",
        programme: "",
        address: "",
      },
      options: [
        {
          value: "1",
          label: "农资经销商解决方案",
        },
        {
          value: "2",
          label: "农资供应商解决方案",
        },
      ],
    };
  },

  methods: {
    // 输入姓名正则验证
    name: function () {
      var name = /^[a-zA-Z\u4E00-\uFA29]*$/;
      if (!name.test(this.info.name)) {
        this.$alert("请输入正确的姓名，只能为字母或汉字！", "提示", {
          confirmButtonText: "确定",
        });
        this.info.name = "";
      }
    },
    // 输入手机号码正则验证
    tel: function () {
      if (!/^1[345789]\d{9}$/.test(this.info.phoneNum)) {
        this.$alert("请输入正确的手机号！", "提示", {
          confirmButtonText: "确定",
        });

        this.info.phoneNum = "";
      }
    },
    closeMenu() {
      this.$emit("closeMenu", false);
    },
    submit: function () {
      if (this.info.name != null && this.info.phoneNum != null) {
        let pa = "";
        for (let i = 0; i < this.address.length; i++) {
          pa = pa + "," + this.address[i];
        }

        this.info.address = pa;
        let params = {
          explanstionEntity: this.info,
        };
        api.testAxiosGet(ApiPath.url.saveFloat, params).then((res) => {
          this.$message.success(res.message);
          this.$emit("closeMenu");
        });
      } else {
        this.$alert("姓名，手机号码不能为空！", "提示", {
          confirmButtonText: "确定",
        });
      }
    },
  },
};
</script>

<style scoped lang="scss">
.record_info {
  width: 940px;
  background: #fff;
  position: fixed;
  left: 50%;
  margin-left: -470px;
  top: 50%;
  padding: 20px 0;
  margin-top: -285px;
  border-radius: 5px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.3);
  z-index: 1999;
  h2 {
    font-size: 18px;
    color: #333;
  }
  .close {
    width: 30px;
    height: 30px;
    position: absolute;
    right: 30px;
    top: 30px;
    cursor: pointer;
  }
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
      width: 200px;
      line-height: 50px;
      background: rgb(47, 118, 227);
      text-align: center;
      color: #fff;
      margin: 0 auto;
      cursor: pointer;
      font-size: 16px;
      border-radius: 5px;
    }
    .r_i_input {
      padding: 0 62px;
    }
  }
}
.el-select {
  width: 100%;
}
.cascader-menu-list-wrap {
  top: 92px !important;
}
.el-icon-close:hover {
  color: #ff0000;
}
</style>
