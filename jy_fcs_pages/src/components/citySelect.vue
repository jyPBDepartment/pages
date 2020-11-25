<template>
  <el-form :inline="true">
    <el-form-item label="省份">
      <el-select
        v-model="province"
        placeholder="请选择"
        style="width: 200px"
        @change="provinceChange"
      >
        <el-option
          v-for="item in provinceList"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="地级市">
      <el-select
        v-model="city"
        placeholder="请选择"
        style="width: 200px"
        :disabled="cityList.length == 0"
        @change="cityChange"
      >
        <el-option
          v-for="item in cityList"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="区县">
      <el-select
        v-model="district"
        placeholder="请选择"
        style="width: 200px"
        :disabled="districtList.length == 0"
        @change="districtChange"
      >
        <el-option
          v-for="item in districtList"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        ></el-option>
      </el-select>
    </el-form-item>
  </el-form>
</template>

<script>
import ApiPath from "@/api/ApiPath.js";
//数据请求交互引用
import api from "@/axios/api.js";
export default {
  data() {
    return {
      province: "",
      city: "",
      district: "",
      provinceList: [],
      cityList: [],
      districtList: [],
      obj: {
        province: "",
        city: "",
        district: "",
      },
    };
  },
  mounted() {
    this.getCityList();
  },
  methods: {
    resetData() {
      this.city = "";
      this.district = "";
      this.province = "";
      this.cityList = [];
      this.districtList = [];
      this.obj.province = "";
      this.obj.city = "";
      this.obj.district = "";
    },
    provinceChange(val) {
      this.city = "";
      this.district = "";
      this.cityList = [];
      this.districtList = [];
      this.obj.province = val;
      if (val != "") {
        this.getCityList(val, "city");
      }
      this.obj.city = "";
      this.obj.district = "";

      this.$emit("changeSelect", this.obj);
    },
    cityChange(val) {
      if (val != "") {
        this.getCityList(val, "district");
      } else {
        this.obj.district = "";
      }
      this.obj.city = val;
      this.district = "";
      this.districtList = [];

      this.$emit("changeSelect", this.obj);
    },
    districtChange(val) {
      this.obj.district = val;
      this.$emit("changeSelect", this.obj);
    },

    getCityList(pid, type) {
      let self = this;
      let params = {
        parentId: pid || "",
      };
      api.testAxiosGet(ApiPath.url.grainPricesGetArea, params).then((res) => {
        let code = res.code;
        if (code == "200") {
          let areaList = res.data || [];
          areaList.unshift({
            id: "",
            name: "全部",
          });
          if (type == "district") {
            self.districtList = areaList;
          } else if (type == "city") {
            self.cityList = areaList;
          } else {
            self.provinceList = areaList;
          }
        }
      });
    },
  },
};
</script>

<style>
</style>