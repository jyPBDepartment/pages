(function(t){function e(e){for(var a,s,r=e[0],c=e[1],l=e[2],u=0,p=[];u<r.length;u++)s=r[u],Object.prototype.hasOwnProperty.call(o,s)&&o[s]&&p.push(o[s][0]),o[s]=0;for(a in c)Object.prototype.hasOwnProperty.call(c,a)&&(t[a]=c[a]);d&&d(e);while(p.length)p.shift()();return i.push.apply(i,l||[]),n()}function n(){for(var t,e=0;e<i.length;e++){for(var n=i[e],a=!0,s=1;s<n.length;s++){var r=n[s];0!==o[r]&&(a=!1)}a&&(i.splice(e--,1),t=c(c.s=n[0]))}return t}var a={},s={index:0},o={index:0},i=[];function r(t){return c.p+"js/"+({}[t]||t)+"."+{"chunk-04ac65b0":"2441ffe3","chunk-06b2cfe6":"68fba303","chunk-08a12bea":"92c11d15","chunk-2143bc68":"e254dd4e","chunk-25b11e48":"6ef4ea1a","chunk-4b0b0c7e":"37b82bb2","chunk-5815f162":"61818fd3","chunk-7f50a342":"a2d6d01a","chunk-8a2d2016":"48a6dbba","chunk-c4e092e2":"a60bcbcc","chunk-f8c2ad6a":"d40a6e05"}[t]+".js"}function c(e){if(a[e])return a[e].exports;var n=a[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,c),n.l=!0,n.exports}c.e=function(t){var e=[],n={"chunk-04ac65b0":1,"chunk-06b2cfe6":1,"chunk-08a12bea":1,"chunk-2143bc68":1,"chunk-25b11e48":1,"chunk-4b0b0c7e":1,"chunk-5815f162":1,"chunk-7f50a342":1,"chunk-8a2d2016":1,"chunk-c4e092e2":1,"chunk-f8c2ad6a":1};s[t]?e.push(s[t]):0!==s[t]&&n[t]&&e.push(s[t]=new Promise((function(e,n){for(var a="css/"+({}[t]||t)+"."+{"chunk-04ac65b0":"910ac204","chunk-06b2cfe6":"befbce04","chunk-08a12bea":"9c7474bf","chunk-2143bc68":"94d61be2","chunk-25b11e48":"73caf9f0","chunk-4b0b0c7e":"b016281b","chunk-5815f162":"873d5aea","chunk-7f50a342":"8abc894e","chunk-8a2d2016":"331e5e6c","chunk-c4e092e2":"ad1ba612","chunk-f8c2ad6a":"a08fe75e"}[t]+".css",o=c.p+a,i=document.getElementsByTagName("link"),r=0;r<i.length;r++){var l=i[r],u=l.getAttribute("data-href")||l.getAttribute("href");if("stylesheet"===l.rel&&(u===a||u===o))return e()}var p=document.getElementsByTagName("style");for(r=0;r<p.length;r++){l=p[r],u=l.getAttribute("data-href");if(u===a||u===o)return e()}var d=document.createElement("link");d.rel="stylesheet",d.type="text/css",d.onload=e,d.onerror=function(e){var a=e&&e.target&&e.target.src||o,i=new Error("Loading CSS chunk "+t+" failed.\n("+a+")");i.code="CSS_CHUNK_LOAD_FAILED",i.request=a,delete s[t],d.parentNode.removeChild(d),n(i)},d.href=o;var h=document.getElementsByTagName("head")[0];h.appendChild(d)})).then((function(){s[t]=0})));var a=o[t];if(0!==a)if(a)e.push(a[2]);else{var i=new Promise((function(e,n){a=o[t]=[e,n]}));e.push(a[2]=i);var l,u=document.createElement("script");u.charset="utf-8",u.timeout=120,c.nc&&u.setAttribute("nonce",c.nc),u.src=r(t);var p=new Error;l=function(e){u.onerror=u.onload=null,clearTimeout(d);var n=o[t];if(0!==n){if(n){var a=e&&("load"===e.type?"missing":e.type),s=e&&e.target&&e.target.src;p.message="Loading chunk "+t+" failed.\n("+a+": "+s+")",p.name="ChunkLoadError",p.type=a,p.request=s,n[1](p)}o[t]=void 0}};var d=setTimeout((function(){l({type:"timeout",target:u})}),12e4);u.onerror=u.onload=l,document.head.appendChild(u)}return Promise.all(e)},c.m=t,c.c=a,c.d=function(t,e,n){c.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},c.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},c.t=function(t,e){if(1&e&&(t=c(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(c.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var a in t)c.d(n,a,function(e){return t[e]}.bind(null,a));return n},c.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return c.d(e,"a",e),e},c.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},c.p="",c.oe=function(t){throw console.error(t),t};var l=window["webpackJsonp"]=window["webpackJsonp"]||[],u=l.push.bind(l);l.push=e,l=l.slice();for(var p=0;p<l.length;p++)e(l[p]);var d=u;i.push([0,"chunk-vendors"]),n()})({0:function(t,e,n){t.exports=n("56d7")},"0814":function(t,e,n){"use strict";var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"Fast"},[n("div",{staticClass:"fast",style:{background:t.background}},[n("div",{staticClass:"w",style:t.allScreen&&"max-width:100%"},[n("div",{staticClass:"fast_title",class:!t.sTitle&&"m_b",style:{color:t.color}},[t._v(t._s(t.title))]),n("div",{directives:[{name:"show",rawName:"v-show",value:t.sTitle,expression:"sTitle"}],staticClass:"fast_s_title hidden-md-and-down",style:{color:t.sColor}},[t._v(t._s(t.sTitle))]),t._t("default")],2)])])},s=[],o={name:"Fast",props:{title:String,sTitle:{type:String,default:null},background:{type:String,default:"#fff"},color:{type:String,default:"#333"},sColor:{type:String,default:"#999"},allScreen:{type:Boolean,default:!1}},data:function(){return{}},methods:{}},i=o,r=(n("e506"),n("2877")),c=Object(r["a"])(i,a,s,!1,null,"43eb7e76",null);e["a"]=c.exports},"0f4f":function(t,e,n){"use strict";var a=n("5e5c"),s=n.n(a);s.a},"1eaa":function(t,e,n){"use strict";var a=n("5762"),s=n.n(a);s.a},"21bb":function(t,e,n){"use strict";var a=n("2dad"),s=n.n(a);s.a},"2dad":function(t,e,n){},3089:function(t,e){t.exports=vant},"34d4":function(t,e,n){},"3aba":function(t,e,n){},4887:function(t,e,n){},"514f":function(t,e,n){},5366:function(t,e,n){"use strict";var a=n("892c"),s=n.n(a);s.a},"56d7":function(t,e,n){"use strict";n.r(e);n("e260"),n("e6cf"),n("cca6"),n("a79d");var a,s=n("8bbf"),o=n.n(s),i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"app"}},[n("Index")],1)},r=[],c=(n("ac1f"),n("466d"),function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"Index"},[n("Float",{attrs:{ejectMenus:t.ejectMenus},on:{closeMenu:function(e){return t.ejectMenu(e)}}}),n("el-container",[n("el-header",{staticClass:"header"},[n("div",{staticClass:"nav"},[n("div",{staticClass:"w"},[n("el-row",{attrs:{type:"flex",align:"middle"}},[n("el-col",{staticClass:"m_logo",attrs:{span:3}},[n("img",{staticClass:"logo",attrs:{src:"https://yanxuan.nosdn.127.net/91f69cd236a9a5869b641534edc92f26.png",alt:""},on:{click:t.jumpHome}})]),n("el-col",{staticStyle:{display:"flex","justify-content":"flex-end"},attrs:{span:21}},[n("el-menu",{staticClass:"el-menu-demo",staticStyle:{height:"100px"},attrs:{"default-active":t.activeIndex,mode:"horizontal","text-color":"#fff","background-color":"#000930","active-text-color":"#238efa",router:""}},[n("el-menu-item",{attrs:{index:"/"}},[n("span",{staticClass:"pd"},[t._v("首页")])]),n("el-menu-item",{attrs:{index:"/introduce"}},[n("span",{staticClass:"pd"},[t._v("吉易慧农")])]),n("el-submenu",{attrs:{index:"/dealer_shop","show-timeout":50,"hide-timeout":50}},[n("template",{slot:"title"},[n("span",{staticClass:"pd",staticStyle:{"font-size":"20px"}},[t._v("产品")])]),n("el-menu-item",{attrs:{index:"/dealer_shop"}},[n("div",[n("div",{staticClass:"c_1"},[t._v("经销商店铺")]),n("div",{staticClass:"c_2"},[t._v("电商加身，销售倍增")])])]),n("el-menu-item",{attrs:{index:"/dealer_manager"}},[t._v("经销商掌柜")]),n("el-menu-item",{attrs:{index:"/supplier_shops"}},[t._v("供应商店铺")])],2),n("el-submenu",{attrs:{index:"4","show-timeout":50,"hide-timeout":50}},[n("template",{slot:"title"},[n("span",{staticClass:"pd",staticStyle:{"font-size":"20px"}},[t._v("解决方案")])]),n("el-menu-item",{attrs:{index:"/dealer_program"}},[t._v("农资经销商解决方案")]),n("el-menu-item",{attrs:{index:"/supplier_program"}},[t._v("农资供应商解决方案")])],2),n("el-menu-item",{attrs:{index:"/guarantee"}},[n("span",{staticClass:"pd"},[t._v("服务保障")])]),n("el-submenu",{attrs:{index:"5","show-timeout":50,"hide-timeout":50}},[n("template",{slot:"title"},[n("span",{staticClass:"pd",staticStyle:{"font-size":"20px"}},[t._v("合作伙伴")])]),n("el-menu-item",{attrs:{index:"/partner"}},[t._v("合作伙伴")]),n("el-menu-item",{attrs:{index:"/join"}},[t._v("加入我们")])],2)],1)],1)],1)],1)])]),n("el-main",{staticStyle:{padding:"0"}},[t.isRouterAlive?n("router-view",{attrs:{id:"boxFixed"}}):t._e(),n("FixedNavRight",{attrs:{isFixed:t.isFixed,isShow:t.fixedShow},on:{backtop:t.backtop,chickCallMe:function(e){return t.ejectMenu(e)}}})],1),n("div",{staticClass:"footer"},[n("div",{staticClass:"w",staticStyle:{color:"#fff"}},[n("el-row",{attrs:{gutter:20}},[n("el-col",{attrs:{span:4,offset:2}},[n("div",{staticClass:"f_1"},[n("h2",[t._v("产品")]),n("h4",[t._v("/ PRODUCT")])]),n("div",{staticClass:"f_2"},[n("el-row",[n("router-link",{staticClass:"f_3",attrs:{to:"/dealer_shop"}},[n("span",{on:{click:t.backtop}},[t._v("经销商店铺")])])],1),n("el-row",[n("router-link",{staticClass:"f_3",attrs:{to:"/dealer_manager"}},[n("span",{on:{click:t.backtop}},[t._v("经销商掌柜")])])],1),n("el-row",[n("router-link",{staticClass:"f_3",attrs:{to:"/supplier_shops"}},[n("span",{on:{click:t.backtop}},[t._v("供应商店铺")])])],1)],1)]),n("el-col",{attrs:{span:4}},[n("div",{staticClass:"f_1"},[n("h2",[t._v("解决方案")]),n("h4",[t._v("/ SOLUTION")])]),n("div",{staticClass:"f_2"},[n("el-row",[n("router-link",{staticClass:"f_3",attrs:{to:"/dealer_program"}},[n("span",{on:{click:t.backtop}},[t._v("农资经销商解决方案")])])],1),n("el-row",[n("router-link",{staticClass:"f_3",attrs:{to:"/supplier_program"}},[n("span",{on:{click:t.backtop}},[t._v("农资供应商解决方案")])])],1)],1)]),n("el-col",{attrs:{span:7}},[n("div",{staticClass:"f_1"},[n("h2",[t._v("平台资讯")]),n("h4",[t._v("/ PLATFORM CONSULTING")])]),n("div",{staticClass:"f_2"},[n("el-row",[n("a",{staticStyle:{color:"#ababab","font-size":"13px"},attrs:{target:"view_window",href:"http://www.jiyinongye.cn/portal/article/index/id/17/cid/1.html"}},[t._v("吉林省现代农业企业协会参观考察")])]),n("el-row",[n("a",{staticStyle:{color:"#ababab","font-size":"13px"},attrs:{target:"view_window",href:"http://www.jiyinongye.cn/portal/article/index/id/19/cid/1.html"}},[t._v("何为平台经济？平台经济健康发展又为何要做好政策加减法")])]),n("el-row",[n("a",{staticStyle:{color:"#ababab","font-size":"13px"},attrs:{target:"view_window",href:"http://www.jiyinongye.cn/portal/article/index/id/51/cid/1.html"}},[t._v("获中央电视台关注，上央视CCTV-2频道《经济信息联播》")])]),n("el-row",[n("a",{staticStyle:{color:"#ababab","font-size":"13px"},attrs:{target:"view_window",href:"http://www.jiyinongye.cn/portal/article/index/id/52/cid/1.html"}},[t._v("【吉易·云备耕】再次被关注，上《吉林新闻联播》啦")])])],1)]),n("el-col",{attrs:{span:4}},[n("div",{staticClass:"f_1"},[n("h2",[t._v("联系我们")]),n("h4",[t._v("/ Contact US")])]),n("div",{staticClass:"f_2"},[n("div",{staticClass:"f_3"},[t._v(" 合作咨询:400-684-0008"),n("br"),t._v(" 投诉反馈:jiyinongye@126.com"),n("br"),t._v(" 地址：长春市人力资源服务产业园"),n("br"),n("span",{staticStyle:{"margin-left":"40px"}},[t._v("C座12层")])]),n("div",{staticClass:"article_content"},[n("p",{domProps:{innerHTML:t._s(t.ariContent)}},[t._v(t._s(t.ariContent))])])])])],1)],1)]),n("div",{staticClass:"footer_2 hidden-xs-only"},[n("div",{staticClass:"w"},[n("el-row",[n("el-col",{attrs:{span:20,offset:2}},[n("p",{staticClass:"f2_1"},[t._v("Copyright © 2012-2018 All Rights Reserved. 备案号：吉ICP备19004431号")]),n("p",{staticClass:"f2_1"},[t._v(" 友情链接： "),n("a",{attrs:{href:t.linkAddress,target:"view_window"}},[t._v("吉林农业大学")])])])],1)],1)])],1)],1)}),l=[],u=(n("4160"),n("159b"),function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"FixedNavRight"},[n("div",{staticClass:"fixedNav"},[n("el-popover",{attrs:{placement:"left",width:"300",trigger:"hover"}},[n("div",{staticClass:"right_nav"},[n("h2",{staticClass:"title"},[t._v("微信咨询(XXXXXXXX)")]),n("div",{staticClass:"sBatton"},[n("div",[t._v(" > 功能和特性")]),n("div",[t._v(" > 价格和优惠")])])]),n("el-row",{staticClass:"box",attrs:{slot:"reference"},slot:"reference"},[n("img",{attrs:{src:"https://yanxuan.nosdn.127.net/a6463043b87b19100b27952fc9dbed01.png",alt:""}})])],1),n("el-popover",{attrs:{placement:"left",width:"400",trigger:"hover"}},[n("div",{staticClass:"right_nav"},[n("h2",{staticClass:"title"},[t._v("电话咨询(400-684-0008)")]),n("div",{staticClass:"sBatton"},[n("div",{staticClass:"call"},[t._v(" > 功能和特性")]),n("div",{staticClass:"call"},[t._v(" > 获取内部资料")]),n("div",{staticClass:"call"},[t._v(" > 价格和优惠")])]),n("p",{staticClass:"z_1"},[t._v("你也可以留下联系方式，我们会主动和你联系！")]),n("div",{staticClass:"y_w",on:{click:function(e){return t.userInfo()}}},[t._v("与我联系")])]),n("el-row",{staticClass:"box",attrs:{slot:"reference"},slot:"reference"},[n("img",{attrs:{src:"https://yanxuan.nosdn.127.net/ddf0340a72a7358e94ca0a1b3152b66d.png",alt:""}})])],1),n("el-popover",{attrs:{placement:"left",width:"150",trigger:"hover"}},[n("img",{staticClass:"erweima",attrs:{src:t.url,alt:""}}),n("p",{staticClass:"title"},[t._v("扫码关注吉易慧云")]),n("el-row",{staticClass:"box",attrs:{slot:"reference"},slot:"reference"},[n("img",{attrs:{src:"https://yanxuan.nosdn.127.net/4743ece30c6fab4dcd584fd22055f3f6.png",alt:""}})])],1),n("transition",{attrs:{name:"el-zoom-in-top"}},[n("el-row",{directives:[{name:"show",rawName:"v-show",value:t.isFixed,expression:"isFixed"}],staticClass:"box transition-box",nativeOn:{click:function(e){return t.backtop()}}},[n("img",{attrs:{src:"https://yanxuan.nosdn.127.net/306a2892765d35782cf8b5f8dbc1c09b.png",alt:""}})])],1)],1)])}),p=[],d={name:"FixedNavRight",props:{isFixed:{type:Boolean,default:!1},isShow:{type:Boolean,default:!1}},data:function(){return{info:!1,url:"https://yanxuan.nosdn.127.net/52e87332b3ed02a5ec1a71911272337b.png"}},mounted:function(){},created:function(){},methods:{backtop:function(){this.$emit("backtop")},userInfo:function(){this.isShow||this.$emit("chickCallMe",!0)}}},h=d,f=(n("ba4e"),n("2877")),m=Object(f["a"])(h,u,p,!1,null,"630ed269",null),v=m.exports,b=n("c8d5"),_={name:"Index",components:{FixedNavRight:v,Float:b["a"]},provide:function(){return{reload:this.reload}},data:function(){return{hotline:"",email:"",address:"",copyRight:"",recordNo:"",logoUrl:"",linkAddressL:"",linkAddress:"",linkName:"",ariContent:"",isRouterAlive:!0,id:"",articleList:[],activeIndex:"/",isFixed:!1,fixedShow:!1,offsetTop:640,ejectMenus:!1,isMenu:!1,contentList:[],m_fotterList:[{name:"首页",routerPath:""},{name:"吉易慧农",routerPath:"introduce"},{name:"经销商店铺",routerPath:"dealer_shop"},{name:"经销商掌柜",routerPath:"dealer_manager"},{name:"供应商店铺",routerPath:"supplier_shops"},{name:"农资经销商解决方案",routerPath:"dealer_program"},{name:"农资供应商解决方案",routerPath:"supplier_program"},{name:"加入我们",routerPath:"join"}],mMenus:[{name:"首页",routerPath:""},{name:"吉易惠农",routerPath:"introduce"},{name:"产品",state:!1,secondLevel:[{name:"经销商店铺",routerPath:"dealer_shop"},{name:"经销商掌柜",routerPath:"dealer_manager"},{name:"供应商店铺",routerPath:"supplier_shops"}]},{name:"解决方案",state:!1,secondLevel:[{name:"农资经销商解决方案",routerPath:"dealer_program"},{name:"农资供应商解决方案",routerPath:"supplier_program"}]},{name:"服务保障",routerPath:"guarantee"},{name:"合作伙伴",state:!1,secondLevel:[{name:"合作伙伴",routerPath:"partner"},{name:"加入我们",routerPath:"join"}]}]}},created:function(){},mounted:function(){window.addEventListener("scroll",this.initTop)},watch:{$route:function(t){this.activeIndex=t.path}},methods:{jumpHome:function(){this.$router.push({path:"/"})},link:function(t){this.$router.push({name:"article",query:{id:t}}),this.isRouterAlive=!1,this.$nextTick((function(){this.isRouterAlive=!0}))},backtop:function(){var t=setInterval((function(){var e=document.documentElement.scrollTop||document.body.scrollTop,n=Math.floor(-e/5);document.documentElement.scrollTop=document.body.scrollTop=e+n,this.isTop=!0,0===e&&clearInterval(t)}),5)},initTop:function(){var t=window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop;this.isFixed=t>this.offsetTop},ejectMenu:function(t){this.ejectMenus=t,this.fixedShow=t},isOpen:function(t,e){void 0!==this.mMenus[t].secondLevel?this.mMenus[t].state=!this.mMenus[t].state:this.routerJump(e)},routerJump:function(t){this.$router.push({path:"/".concat(t.routerPath)});var e=[];this.mMenus.forEach((function(t){t.state=!1,e.push(t)})),this.mMenus=e,this.isMenu=!1,this.backtop()},isMenus:function(){this.isMenu=!this.isMenu}},destroyed:function(){window.removeEventListener("scroll",this.handleScroll)}},g=_,x=(n("ca9c"),Object(f["a"])(g,c,l,!1,null,null,null)),y=x.exports,w={components:{Index:y},mounted:function(){},methods:{},beforeCreate:function(){var t=navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i);window.location.href=t?"http://www.jiyinongye.com/phone/#/":"http://www.jiyinongye.com/website/#/"}},C=w,k=(n("5c0b"),Object(f["a"])(C,i,r,!1,null,null,null)),j=k.exports,T=n("6389"),M=n.n(T),S=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"Home"},[n("Rotation",{attrs:{banner:t.banner,height:t.bannerHeight,type:1}}),n("Fast",{attrs:{title:"农资行业全场景的互联网解决方案",sTitle:"解决农资行业痛点，打通农资信息通道，助力商户充分挖掘、整合行业隐形资源，构建内外服务生态圈。"}},[n("el-row",{staticClass:"h1"},[n("el-col",{attrs:{span:8,offset:1}},t._l(t.title,(function(e,a){return n("div",{key:a,staticClass:"h1_1"},[n("h2",[t._v(t._s(e.h2))]),n("p",[t._v(t._s(e.p))])])})),0),n("el-col",{attrs:{span:14}},[n("img",{staticClass:"h1_i_1",attrs:{src:"https://yanxuan.nosdn.127.net/e8cf3a88fef52852d155a2071962b3a0.png",alt:""}})])],1)],1),n("Fast",{attrs:{title:"我们的云服务产品",sTitle:"提升多种农资经营能力 全面满足业务需求"}},[n("el-row",{staticClass:"h2"},t._l(t.botton,(function(e,a){return n("el-col",{key:a,staticClass:"h2_1",class:t.hover==a&&"hover",nativeOn:{mouseover:function(e){return t.mouseover(a)},mouseout:function(e){return t.mouseout()},click:function(e){return t.jump(a)}}},[n("img",{attrs:{src:e.src,alt:""}}),n("h2",[t._v(t._s(e.h2))]),n("p",[t._v(t._s(e.p))])])})),1)],1),n("div",{staticClass:"w"},[n("BottomLunbo")],1),n("Callcontact",{staticClass:"hidden-md-and-down"})],1)},$=[],P=n("c89a"),E=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"lunbo"},[n("div",{staticClass:"left"},[t._m(0),n("div",[n("van-swipe",{attrs:{height:"60",autoplay:3e3}},[n("van-swipe-item",{staticClass:"item"},[t._v(" 技术团队安全保障 "),n("br"),t._v("系统稳定、安全、流畅 ")]),n("van-swipe-item",{staticClass:"item"},[t._v(" 360°客户顾问全程保障 "),n("br"),t._v("专属客户顾问、1对1咨询 ")]),n("van-swipe-item",{staticClass:"item"},[t._v(" 农技团队专业守护 "),n("br"),t._v("服务农户、在线圈地、科学种植 ")])],1)],1),n("div",{staticClass:"details",on:{click:function(e){return t.jump()}}},[t._v("服务详情")])]),n("div",{staticClass:"right"},[n("van-swipe",{staticClass:"my-swipe",attrs:{autoplay:3e3,"indicator-color":"white"}},[n("van-swipe-item",[n("img",{attrs:{src:"https://yanxuan.nosdn.127.net/d38f8b23ae2fea304c931a02e2bfb355.jpg",alt:""}})]),n("van-swipe-item",[n("img",{attrs:{src:"https://yanxuan.nosdn.127.net/8cd94202ed7367fff8f289c5f779b07a.jpg",alt:""}})]),n("van-swipe-item",[n("img",{attrs:{src:"https://yanxuan.nosdn.127.net/471eae8d68fc287e742b9c17f383eaa2.jpg",alt:""}})])],1)],1)])},O=[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("h2",[t._v(" 即时响应式服务 "),n("br"),t._v("全程为农资助力 ")])}],N=(n("b0c0"),n("ade3")),F=n("3089"),I={components:(a={},Object(N["a"])(a,F["Swipe"].name,F["Swipe"]),Object(N["a"])(a,F["SwipeItem"].name,F["SwipeItem"]),a),name:"BottomLunbo",props:{},data:function(){return{}},methods:{jump:function(){this.backtop(),this.$router.push({name:"guarantee"})},backtop:function(){var t=setInterval((function(){var e=document.documentElement.scrollTop||document.body.scrollTop,n=Math.floor(-e/5);document.documentElement.scrollTop=document.body.scrollTop=e+n,this.isTop=!0,0===e&&clearInterval(t)}),5)}}},A=I,L=(n("1eaa"),Object(f["a"])(A,E,O,!1,null,null,null)),B=L.exports,R=n("0814"),z=n("fc46"),U={components:{Rotation:P["a"],Fast:R["a"],BottomLunbo:B,Callcontact:z["a"]},data:function(){return{bannerHeight:640,bannerBottomHeight:480,hover:null,banner:[{src:"https://s1.ax1x.com/2020/07/24/UjdyQ0.jpg",title:"农资经销商解决方案",content:"全面助力经销商升级经营能力 实现跨越式发展",botton:"了解详情"},{src:"https://s1.ax1x.com/2020/07/24/Ujd6yV.jpg",title:"农资供应商解决方案",content:"有效降低供应商销售成本 大数据辅助科学决策",botton:"了解详情"},{src:"https://s1.ax1x.com/2020/07/24/Ujdrzq.jpg",title:"亿元订单 强强联合",content:"吉易慧农上线合作伙伴计划",botton:"加入"}],title:[{h2:"农资批发场景",p:"海量货源、全方位展示、线上谈判、交易"},{h2:"农资零售电商场景",p:"经销商网店、多种营销玩法、身临其境的交易体验感"},{h2:"农资零售移动场景",p:"实现实体店内、店外，掌上下单、收银、统计分析"},{h2:"分销推广场景",p:"客户帮你卖、员工帮你卖、整合资源、轻松分配"}],botton:[{src:"https://yanxuan.nosdn.127.net/713d45781b480937d1462b436bb2b051.png",h2:"经销商店铺",p:"线上交易节省时空系统化管理客户与订单"},{src:"https://yanxuan.nosdn.127.net/47eb3e0ebf0032ae01befaf2f74739ec.png",h2:"经销商掌柜",p:"农资销售随时搞定销售数据尽在掌握"},{src:"https://yanxuan.nosdn.127.net/9c4800016d4419220fd3d97415669432.png",h2:"供应商店铺",p:"节省销售成本产品大数据可视化"},{src:"https://yanxuan.nosdn.127.net/4d1ff55de46955ae88e60e1951d5cfdb.png",h2:"销售团队管理",p:"团队资源尽在掌握成员经营状况清晰可见"},{src:"https://yanxuan.nosdn.127.net/4441f68975682dbddd400d919687f1d7.png",h2:"营销活动",p:"多种营销玩法可选促进成交轻松实现"},{src:"https://yanxuan.nosdn.127.net/3c892685980af55b9aeb88b247f58d36.png",h2:"收银系统",p:"覆盖线上线下多种交易场景大数据挖掘辅助决策"},{src:"https://yanxuan.nosdn.127.net/3203488b73006bff97d22544367bedac.png",h2:"即时通讯",p:"单聊或群聊、语音消息表情、文件、图片传送"},{src:"https://yanxuan.nosdn.127.net/4eca558e32ca5b32ca322b91afb112c9.png",h2:"消息、资讯推送",p:"即时、定时发布活动、资讯分角色发布多种广告形式"}]}},mounted:function(){},created:function(){},methods:{mouseover:function(t){console.log(t),t<3&&(this.hover=t)},mouseout:function(){this.hover=null},jump:function(t){if(t<3){var e=setInterval((function(){var t=document.documentElement.scrollTop||document.body.scrollTop,n=Math.floor(-t/5);document.documentElement.scrollTop=document.body.scrollTop=t+n,this.isTop=!0,0===t&&clearInterval(e)}),5);0==t&&this.$router.push({name:"dealer_shop"}),1==t&&this.$router.push({name:"dealer_manager"}),2==t&&this.$router.push({name:"supplier_shops"})}}}},H=U,X=(n("21bb"),Object(f["a"])(H,S,$,!1,null,null,null)),J=X.exports;o.a.use(M.a);var V=M.a.prototype.push;M.a.prototype.push=function(t){return V.call(this,t).catch((function(t){return t}))};var q=[{path:"/",name:"Home",component:J},{path:"/introduce",name:"introduce",component:function(t){return n.e("chunk-06b2cfe6").then(function(){var e=[n("fefd")];t.apply(null,e)}.bind(this)).catch(n.oe)}},{path:"/dealer_shop",name:"dealer_shop",component:function(t){return n.e("chunk-c4e092e2").then(function(){var e=[n("f06a")];t.apply(null,e)}.bind(this)).catch(n.oe)}},{path:"/dealer_manager",name:"dealer_manager",component:function(t){return n.e("chunk-08a12bea").then(function(){var e=[n("3332")];t.apply(null,e)}.bind(this)).catch(n.oe)}},{path:"/supplier_shops",name:"supplier_shops",component:function(t){return n.e("chunk-4b0b0c7e").then(function(){var e=[n("038e")];t.apply(null,e)}.bind(this)).catch(n.oe)}},{path:"/dealer_program",name:"dealer_program",component:function(t){return n.e("chunk-f8c2ad6a").then(function(){var e=[n("89bc")];t.apply(null,e)}.bind(this)).catch(n.oe)}},{path:"/supplier_program",name:"supplier_program",component:function(t){return n.e("chunk-04ac65b0").then(function(){var e=[n("4584")];t.apply(null,e)}.bind(this)).catch(n.oe)}},{path:"/partner",name:"partner",component:function(t){return n.e("chunk-2143bc68").then(function(){var e=[n("b084")];t.apply(null,e)}.bind(this)).catch(n.oe)}},{path:"/guarantee",name:"guarantee",component:function(t){return n.e("chunk-5815f162").then(function(){var e=[n("bb05")];t.apply(null,e)}.bind(this)).catch(n.oe)}},{path:"/join",name:"join",component:function(t){return n.e("chunk-7f50a342").then(function(){var e=[n("c283")];t.apply(null,e)}.bind(this)).catch(n.oe)}},{path:"/real_time_info",name:"real_time_info",component:function(t){return n.e("chunk-8a2d2016").then(function(){var e=[n("0dd8")];t.apply(null,e)}.bind(this)).catch(n.oe)}},{path:"/article",name:"article",component:function(t){return n.e("chunk-25b11e48").then(function(){var e=[n("3ad6")];t.apply(null,e)}.bind(this)).catch(n.oe)}}],D=new M.a({mode:"hash",base:"",routes:q}),G=D,Q=n("5880"),W=n.n(Q);o.a.use(W.a);var K=new W.a.Store({state:{},mutations:{},actions:{},modules:{}}),Y=n("10c8"),Z=(n("a774"),n("843a")),tt=n.n(Z);o.a.prototype.$pcaa=Y["pcaa"],o.a.config.productionTip=!1,o.a.use(tt.a),new o.a({router:G,store:K,render:function(t){return t(j)}}).$mount("#app")},5762:function(t,e,n){},5880:function(t,e){t.exports=Vuex},"5c0b":function(t,e,n){"use strict";var a=n("9c0c"),s=n.n(a);s.a},"5e5c":function(t,e,n){},6389:function(t,e){t.exports=VueRouter},"892c":function(t,e,n){},"8bbf":function(t,e){t.exports=Vue},"9c0c":function(t,e,n){},"9c2b":function(t,e,n){"use strict";var a=n("514f"),s=n.n(a);s.a},a774:function(t,e,n){},ba4e:function(t,e,n){"use strict";var a=n("4887"),s=n.n(a);s.a},c89a:function(t,e,n){"use strict";var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"Rotation"},[n("el-carousel",{staticClass:"hidden-md-and-down",attrs:{height:t.height+"px",arrow:"hover",interval:2e3}},t._l(t.banner,(function(e,a){return n("el-carousel-item",{key:a},[""!==e.title?n("div",{staticClass:"content"},[n("h2",{class:2==a?"title1":"title"},[t._v(t._s(e.title))]),n("p",{class:2==a?"explain1":"explain"},[t._v(t._s(e.content))]),n("div",{class:2==a?"learn_more1":"learn_more",on:{click:function(n){return t.jump(e)}}},[t._v(t._s(e.botton))])]):t._e(),n("img",{staticClass:"b_1",staticStyle:{background:"#fff"},style:{height:t.height+"px"},attrs:{src:e.src,alt:""}})])})),1)],1)},s=[],o=(n("a9e3"),{name:"Rotation",props:{banner:Array,height:Number},data:function(){return{}},methods:{jump:function(t){var e=setInterval((function(){var t=document.documentElement.scrollTop||document.body.scrollTop,n=Math.floor(-t/5);document.documentElement.scrollTop=document.body.scrollTop=t+n,this.isTop=!0,0===t&&clearInterval(e)}),5);t==this.banner[0]&&this.$router.push({name:"supplier_program"}),t==this.banner[1]&&this.$router.push({name:"supplier_program"}),t==this.banner[2]&&this.$router.push({name:"partner"})}}}),i=o,r=(n("5366"),n("2877")),c=Object(r["a"])(i,a,s,!1,null,"5ef963e4",null);e["a"]=c.exports},c8d5:function(t,e,n){"use strict";var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("transition",{attrs:{name:"el-fade-in"}},[n("div",{directives:[{name:"show",rawName:"v-show",value:t.ejectMenus,expression:"ejectMenus"}],staticClass:"transition-box record_info"},[n("h2",[t._v("预约讲解")]),n("img",{staticClass:"close",attrs:{src:"https://yanxuan.nosdn.127.net/cd0598b389bf9e3b3d655c9f5b7ba19d.png",alt:""},on:{click:t.closeMenu}}),n("el-row",{staticClass:"r_i_box"},[n("el-col",{staticClass:"r_i_input",attrs:{span:12}},[n("el-input",{attrs:{placeholder:"姓名（必填）"},on:{change:t.name},model:{value:t.info.name,callback:function(e){t.$set(t.info,"name",e)},expression:"info.name"}})],1),n("el-col",{staticClass:"r_i_input",attrs:{span:12}},[n("el-input",{attrs:{placeholder:"手机号码（必填）"},on:{change:t.tel},model:{value:t.info.phoneNum,callback:function(e){t.$set(t.info,"phoneNum",e)},expression:"info.phoneNum"}})],1)],1),n("el-row",{staticClass:"r_i_box"},[n("el-col",{staticClass:"r_i_input",attrs:{span:12}},[n("el-input",{attrs:{placeholder:"公司名称（选填）"},model:{value:t.info.companyName,callback:function(e){t.$set(t.info,"companyName",e)},expression:"info.companyName"}})],1),n("el-col",{staticClass:"r_i_input",attrs:{span:12}},[n("el-input",{attrs:{placeholder:"邮箱（选填）"},model:{value:t.info.email,callback:function(e){t.$set(t.info,"email",e)},expression:"info.email"}})],1)],1),n("el-row",{staticClass:"r_i_box"},[n("el-col",{staticClass:"r_i_input",attrs:{span:12}},[n("el-select",{attrs:{clearable:"",placeholder:"意向解决方案（选填）"},model:{value:t.info.solution,callback:function(e){t.$set(t.info,"solution",e)},expression:"info.solution"}},t._l(t.options,(function(t){return n("el-option",{key:t.value,attrs:{label:t.label,value:t.value}})})),1)],1),n("el-col",{staticClass:"r_i_input",attrs:{span:12}})],1),n("el-row",{staticClass:"r_i_box"},[n("el-col",{staticClass:"r_i_input",attrs:{span:24}},[n("area-cascader",{attrs:{type:"text",placeholder:"所在地区（选填）",data:t.$pcaa,level:2},model:{value:t.address,callback:function(e){t.address=e},expression:"address"}})],1)],1),n("el-row",{staticClass:"r_i_box"},[n("div",{staticClass:"botton",on:{click:function(e){return t.submit()}}},[t._v("提交")])])],1)])},s=[],o=(n("b0c0"),{name:"Tabs",props:{ejectMenus:{type:Boolean,default:!1}},data:function(){return{address:"",info:{name:"",phone:"",company:"",email:"",programme:"",address:""},options:[{value:"1",label:"农资经销商解决方案"},{value:"2",label:"农资供应商解决方案"}]}},methods:{name:function(){var t=/^[a-zA-Z\u4E00-\uFA29]*$/;t.test(this.info.name)||(this.$alert("请输入正确的姓名，只能为字母或汉字！","提示",{confirmButtonText:"确定"}),this.info.name="")},tel:function(){/^1[345789]\d{9}$/.test(this.info.phoneNum)||(this.$alert("请输入正确的手机号！","提示",{confirmButtonText:"确定"}),this.info.phoneNum="")},closeMenu:function(){this.$emit("closeMenu",!1)},submit:function(){var t=this;if(null!=this.info.name&&null!=this.info.phoneNum){for(var e="",n=0;n<this.address.length;n++)e=e+","+this.address[n];this.info.address=e;var a={explanstionEntity:this.info};api.testAxiosGet(ApiPath.url.saveFloat,a).then((function(e){t.$message.success(e.message),t.$emit("closeMenu")}))}else this.$alert("姓名，手机号码不能为空！","提示",{confirmButtonText:"确定"})}}}),i=o,r=(n("0f4f"),n("2877")),c=Object(r["a"])(i,a,s,!1,null,"6a35cc44",null);e["a"]=c.exports},ca9c:function(t,e,n){"use strict";var a=n("34d4"),s=n.n(a);s.a},cebe:function(t,e){t.exports=axios},e506:function(t,e,n){"use strict";var a=n("3aba"),s=n.n(a);s.a},fc46:function(t,e,n){"use strict";var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"Callcontatct"},[n("Float",{attrs:{ejectMenus:t.ejectMenus},on:{closeMenu:function(e){return t.ejectMenu(e)}}}),n("div",{staticClass:"callcontact_us"},[t._v(" 想了解更多，欢迎拨打热线： "),n("span",[t._v(t._s(t.hotline))]),t._v(" ，你也可以留下联系方式，我们会主动和你联系！ "),n("div",{staticClass:"botton",on:{click:function(e){return t.ejectMenu(!0)}}},[t._v("与我联系")])])],1)},s=[],o=n("c8d5"),i={name:"Callcontatct",components:{Float:o["a"]},props:{},data:function(){return{ejectMenus:!1,hotline:"400 - 684 - 0008"}},created:function(){},methods:{ejectMenu:function(t){this.ejectMenus=t}}},r=i,c=(n("9c2b"),n("2877")),l=Object(c["a"])(r,a,s,!1,null,"961d995c",null);e["a"]=l.exports}});