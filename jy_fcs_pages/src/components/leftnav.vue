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
    // 获取图形验证码
    let res = {
      success: true,
      data: [
        {
          menuid: 0,
          icon: "el-icon-s-home",
          menuname: "首页",
          hasThird: "N",
          url: "/charts/statistics",
          menus: null,
          only: "Y"
        },
        {
          menuid: 1,
          icon: "el-icon-copy-document",
          menuname: "模块管理",
          hasThird: "N",
          url: "/moduleInfo/ModuleInfo",
          menus: null,
          only: "Y"
        },
        {
          menuid: 2,
          icon: "el-icon-cherry",
          menuname: "农服管理",
          hasThird: "N",
          url: null,
          menus: null,
          only: "N",
          menus: [
             {
              menuid: 2 - 1,
              icon: "el-icon-chat-line-round",
              menuname: "农服管理",
              hasThird: "N",
              url: "Agricultural/agricultural",
              menus: null,
            },
            {
              menuid: 2 - 2,
              icon: "el-icon-chat-line-round",
              menuname: "粮食收购",
              hasThird: "N",
              url: "childrenMenu/PurchaseCorn",
              menus: null,
            },
            {
              menuid: 2 - 3,
              icon: "el-icon-chat-line-round",
              menuname: "粮食出售",
              hasThird: "N",
              url: "childrenMenu/sellFoodstuff",
              menus: null,
            },
            {
              menuid: 2 - 4,
              icon: "el-icon-chat-line-round",
              menuname: "农机出售",
              hasThird: "N",
              url: "childrenMenu/sellAgriMachinery",
              menus: null,
            },
             {
              menuid: 2 - 5,
              icon: "el-icon-chat-line-round",
              menuname: "粮食播种",
              hasThird: "N",
              url: "childrenMenu/CornSowing",
              menus: null,
            },
            ]
        },
        {
          menuid: 3,
          icon: "el-icon-bangzhu",
          menuname: "圈子管理",
          hasThird: null,
          url: null,
          only: "N",
          menus: [
            {
              menuid: 3 - 1,
              icon: "el-icon-chat-line-round",
              menuname: "圈子管理",
              hasThird: "N",
              url: "postInfo/PostInfo",
              menus: null,
            },
            {
              menuid: 3 - 2,
              icon: "el-icon-key",
              menuname: "关键词",
              hasThird: "N",
              url: "keyWord/KeyWord",
              menus: null,
            },
            {
              menuid: 3 - 3,
              icon: "el-icon-edit-outline",
              menuname: "评论管理",
              hasThird: "N",
              url: "comment/comment",
              menus: null,
            },
            {
              menuid: 3 - 4,
              icon: "el-icon-edit",
              menuname: "回复管理",
              hasThird: "N",
              url: "reply/reply",
              menus: null,
            },
          ],
        },
        {
          menuid: 4,
          icon: "el-icon-finished",
          menuname: "看图识病",
          hasThird: null,
          url: null,
          only: "N",
          menus: [
            {
              menuid: 4 - 1,
              icon: "el-icon-view",
              menuname: "看图识病",
              hasThird: "N",
              url: "CaseInfo/caseInfo",
              menus: null,
            }
          ],
        },
        {
          menuid: 5,
          icon: "el-icon-user-solid",
          menuname: "账户管理",
          hasThird: null,
          url: null,
          only: "N",
          menus: [
            {
              menuid: 5 - 1,
              icon: "el-icon-s-custom",
              menuname: "账户管理",
              hasThird: "N",
              url: "accountIfo/AccountInfo",
              menus: null,
            },
            {
              menuid: 5 - 2,
              icon: "el-icon-s-check",
              menuname: "权限管理",
              hasThird: "N",
              url: "powerInfo/powerInfo",
              menus: null,
            },
            {
              menuid: 5 - 3,
              icon: "el-icon-user",
              menuname: "角色管理",
              hasThird: "N",
              url: "role/roleShow",
              menus: null,
            },
            {
              menuid: 5 - 4,
              icon: "el-icon-menu",
              menuname: "菜单管理",
              hasThird: "N",
              url: "menu/menuIndex",
              menus: null,
            },
            {
              menuid: 5 - 5,
              icon: "el-icon-orange",
              menuname: "分类管理",
              hasThird: "N",
              url: "Classification/classification",
              menus: null,
            },
            {
              menuid: 5 - 6,
              icon: "el-icon-document",
              menuname: "日志管理",
              hasThird: "N",
              url: "dbLog/logShow",
              menus: null,
            },
          ],
        },
      ],
      msg: "success",
    };
    this.allmenu = res.data;
    // 监听
    this.$root.Bus.$on("toggle", (value) => {
      this.collapsed = !value;
    });
  },
};
</script>
<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 240px;
  min-height: 400px;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  border: none;
  text-align: left;
}
.el-menu-item-group__title {
  padding: 0px;
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