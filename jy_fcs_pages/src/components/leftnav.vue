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
    <el-submenu v-for="menu in allmenu" :key="menu.menuid" :index="menu.menuname">
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
  </el-menu>
</template>
<script>
import { menu } from "../api/userMG";
export default {
  name: "leftnav",
  data() {
    return {
      collapsed: false,
      allmenu: []
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
              icon: "el-icon-s-comment",
              menuname: "首页",
              hasThird: "null",
              url: "null",
              menus:[{
                 menuid:  0 - 1,
              icon: "el-icon-s-comment",
              menuname: "首页",
              hasThird: "N",
              url: "charts/statistics",
              menus: null
              }]
        },
        {
          menuid: 1,
          icon: "el-icon-s-home",
          menuname: "门户管理",
          hasThird: null,
          url: null,
          menus: [
             {
              menuid: 1 - 1,
              icon: "el-icon-eleme",
              menuname: "账户管理",
              hasThird: "N",
              url: "accountIfo/AccountInfo",
              menus: null
            },
            {
              menuid: 1 - 2,
              icon: "el-icon-eleme",
              menuname: "模块管理",
              hasThird: "N",
              url: "moduleInfo/ModuleInfo",
              menus: null
            },
            //  {
            //   menuid: 1 - 1,
            //   icon: "el-icon-eleme",
            //   menuname: "网站信息",
            //   hasThird: "N",
            //   url: "websiteInfo/updateWebsiteInfo",
            //   menus: null
            // },
            //   {
            //   menuid: 1 - 2,
            //   icon: "el-icon-discount",
            //   menuname: "导航管理",
            //   hasThird: "N",
            //   url: "navigation/navigation",
            //   menus: null
            // },

               {
              menuid: 1 - 3,
              icon: "el-icon-discount",
              menuname: "权限管理",
              hasThird: "N",
              url: "powerInfo/powerInfo",
              menus: null
            },
            {
              menuid: 1 - 4,
              icon: "el-icon-connection",
              menuname: "分类管理",
              hasThird: "N",
              url: "Classification/classification",
              menus: null
            },
             
            {
              menuid: 1 - 5,
              icon: "el-icon-reading",
              menuname: "文章管理",
              hasThird: "N",
              url: "article/article",
              menus: null
            },
            {
              menuid: 1 - 6,
              icon: "el-icon-notebook-1",
              menuname: "预约讲解",
              hasThird: "N",
              url: "appointment/appointmentShow",
              menus: null
            },
            {
              menuid: 1 - 7,
              icon: "el-icon-mobile-phone",
              menuname: "问卷调查",
              hasThird: "N",
              url: "Question/question",
              menus: null
            },
            {
              menuid: 1 - 8,
              icon: "el-icon-s-comment",
              menuname: "资讯管理",
              hasThird: "N",
              url: "goods/Goods2",
              menus: null
            },
            {
              menuid: 1 - 9,
              icon: "el-icon-s-comment",
              menuname: "图表管理",
              hasThird: "N",
              url: "charts/statistics",
              menus: null
            }
          ]
        },
        {
          menuid: 2,
          icon: "el-icon-menu",
          menuname: "基础管理",
          hasThird: null,
          url: null,
          menus: [
          
           
            {
              menuid: 2 - 1,
              icon: "el-icon-s-custom",
              menuname: "管理员管理",
              hasThird: "N",
              url: "Admin/admin",
              menus: null
            },
            {
              menuid: 2 - 2,
              icon: "el-icon-user",
              menuname: "角色管理",
              hasThird: "N",
              url: "role/roleShow",
              menus: null
            },
            {
              menuid: 2 - 3,
              icon: "el-icon-coin",
              menuname: "权限管理",
              hasThird: "N",
              url: "limit/limitRole",
              menus: null
            },
            
            {
              menuid: 2 - 4,
              icon: "el-icon-s-grid",
              menuname: "菜单管理",
              hasThird: "N",
              url: "menu/menuIndex",
              menus: null
            },
            
            
          ]
        }
      ],
      msg: "success"
    };
    this.allmenu = res.data;
    // 监听
    this.$root.Bus.$on("toggle", value => {
      this.collapsed = !value;
    });
  }
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