// 导入组件
import Vue from 'vue';
import Router from 'vue-router';
// 登录
import login from '@/views/login';
// 首页
import index from '@/views/index';
//账户信息
import AccountInfo from '@/views/accountIfo/AccountInfo';
//模块管理
import ModuleInfo from '@/views/moduleInfo/ModuleInfo';
//权限管理
import PowerInfo from '@/views/powerInfo/powerInfo';
//关键字管理
import KeyWord from '@/views/keyWord/KeyWord'
//农服管理
import Agricultural from '@/views/Agricultural/agricultural';

/**
 * 门户菜单
 */
// Banner图管理
import Banner from '@/views/gateway/Banner';
/**
 * 设置
 */
//导航管理
import Navigation from '@/views/navigation/navigation';
// 管理员管理
import Admin from '@/views/Admin/admin';
//网站信息
import updateWebsiteInfo from '@/views/websiteInfo/updateWebsiteInfo';
//角色管理
import Role from '@/views/role/roleShow';
//权限管理
import LimitRole from '@/views/limit/limitRole';
//预约讲解
import Appointment from '@/views/appointment/appointmentShow';
//菜单管理
import Menu from '@/views/menu/menuIndex';
//分类信息
import Classification from '@/views/Classification/classification';

//问卷调查
import Question from '@/views/Question/question';

//文章管理
import Article from '@/views/article/article'

/**
 * 支付管理
 */
// 支付配置信息
import MachineConfig from '@/views/machine/MachineConfig';
// 支付配置
import Config from '@/views/pay/Config';
/**
 * 数据监控
 */
// 监控查询
import druidLogin from '@/views/druid/login1';

// 图表界面
import statistics from '@/views/charts/statistics';

// 启用路由
Vue.use(Router);

// 导出路由 
export default new Router({
    routes: [{
        path: '/',
        name: '',
        component: login,
        hidden: true,
        meta: {
            requireAuth: false
        }
    }, {
        path: '/login',
        name: '登录',
        component: login,
        hidden: true,
        meta: {
            requireAuth: false
        }
    }, {
        path: '/index',
        name: '首页',
        component: index,
        iconCls: 'el-icon-tickets',
        children: [{
            path: '/gateway/Banner',
            name: '商品管理',
            component: Banner,
            meta: {
                requireAuth: true
            }
        },
          {
            path: '/powerInfo/powerInfo',
            name: '权限管理',
            component: PowerInfo,
            meta: {
                requireAuth: true
            }
        },  
        {
            path: '/Classification/classification',
            name: '分类信息',
            component: Classification,
            meta: {
                requireAuth: true
            }
        }, {
            path: '/Agricultural/agricultural',
            name: '农服管理',
            component: Agricultural,
            meta: {
                requireAuth: true
            }
        },
       
       {
            path: '/druid/login',
            name: '监控查询',
            component: druidLogin,
            meta: {
                requireAuth: true
            }
        }, {
            path: '/charts/statistics',
            name: '数据可视化',
            component: statistics,
            meta: {
                requireAuth: true
            }
        }, {
            path: '/accountIfo/AccountInfo',
            name: '账户管理',
            component: AccountInfo,
            meta: {
                requireAuth: true
            }
        }, {
            path: '/moduleInfo/ModuleInfo',
            name: '模块管理',
            component: ModuleInfo,
            meta: {
                requireAuth: true
            }
        }
        , {
            path: '/keyWord/KeyWord',
            name: '关键字管理',
            component: KeyWord,
            meta: {
                requireAuth: true
            }
        }
    ]
    }]
})