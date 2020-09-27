/**
* 左边菜单
*/ 
<template>
  <el-menu
    :collapse="collapsed"
    collapse-transition
    router
    :default-active="$route.path"
    unique-opened
    class="el-menu-vertical-demo"
    background-color="#334157"
    text-color="#fff"
    active-text-color="#ffd04b"
  >
    <div class="logobox">
      <img class="logoimg" src="../assets/img/logo.png" alt />
    </div>
    <div v-for="menu in allmenu" :key="menu.menuid" :index="menu.menuname">
      <div v-if="menu.only=='Y'">
        <el-menu-item :index="menu.url">
          <i :class="menu.icon"></i>
          <span slot="title">{{menu.menuname}}</span>
        </el-menu-item>
      </div>
      <div v-else>
        <el-submenu :index="''+menu.menuid">
          <template slot="title">
            <i :class="menu.icon"></i>
            <span>{{menu.menuname}}</span>
          </template>
          <el-menu-item-group>
            <el-menu-item v-for="chmenu in menu.menus" :index="'/'+chmenu.url" :key="chmenu.menuid">
              <i :class="chmenu.icon"></i>
              <span>{{chmenu.menuname}}</span>
            </el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </div>
    </div>
  </el-menu>
</template>
<script>
import { menu } from "../api/userMG";
import ApiPath from "@/api/ApiPath.js";
//数据请求交互引用
import api from "@/axios/api.js";
export default {
  name: "leftnav",
  data() {
    return {
      collapsed: false,
      allmenu: [],
    };
  },
  // 创建完毕状态(里面是操作)
  created() {
    this.search();
    //console.log(JSON.stringify({ menu }));
    // 获取图形验证码
    let res = {
      success: true,
      data: [],
      msg: "success",
    };
    this.allmenu = res.data;
    // 监听
    this.$root.Bus.$on("toggle", (value) => {
      this.collapsed = !value;
    });
  },
  methods: {
    search: function(parameter) {
      let params = {};
      api.testAxiosGet(ApiPath.url.getNavMenuList, params).then(res => {
        let code = res.state;
        //console.log(JSON.stringify(res.data));
        this.allmenu=res.data;
      });
    }
  }
};
</script>
<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 220px;
  min-height: 400px;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  border: none;
  text-align: left;
}
.el-menu-item-group__title {
  /* padding: 0px; */
  margin: -10px 0px;
}
.el-menu-bg {
  background-color: #1f2d3d !important;
}
.el-menu {
  border: none;
}
.logobox {
  height: 40px;
  line-height: 40px;
  color: #9d9d9d;
  font-size: 20px;
  text-align: center;
  padding: 20px 0px;
}
.logoimg {
  height: 40px;
}
</style>