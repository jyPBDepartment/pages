(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2143bc68"],{5035:function(t,n,s){},"6fae":function(t,n,s){"use strict";var e=s("5035"),c=s.n(e);c.a},b084:function(t,n,s){"use strict";s.r(n);var e=function(){var t=this,n=t.$createElement,s=t._self._c||n;return s("div",{staticClass:"Home"},[s("img",{staticClass:"top_img",staticStyle:{height:"640px"},attrs:{src:"https://s1.ax1x.com/2020/07/24/UjdcLT.jpg"}}),t._m(0),s("Fast",{attrs:{title:"为合作伙伴提供全方位的合作与支持"}},[s("el-row",{staticClass:"model",attrs:{type:"flex",justify:"space-around"}},t._l(t.bModel,(function(n,e){return s("el-col",{key:e,staticClass:"box"},[s("img",{attrs:{src:n.src,alt:""}}),s("h2",[t._v(t._s(n.title))]),s("p",[t._v(t._s(n.content))])])})),1)],1),s("Fast",{attrs:{title:"加入流程",background:"rgb(246, 247, 252)"}},[s("el-row",{staticClass:"join"},[t._l(t.process,(function(n,e){return s("el-col",{key:e,staticClass:"box"},[s("div",{staticClass:"circular yuan"},[s("img",{attrs:{src:n.src,alt:""}})]),s("div",{staticClass:"s_circular yuan"}),s("h2",[t._v(t._s(n.title))])])})),s("div",{staticClass:"Dividing"})],2),s("div",{staticClass:"join_botton",on:{click:function(n){return t.join()}}},[t._v("加入我们")])],1),s("Callcontact",{staticClass:"hidden-md-and-down"})],1)},c=[function(){var t=this,n=t.$createElement,s=t._self._c||n;return s("div",{staticClass:"banner-font"},[s("h2",{staticClass:"css2215ee06652225e"},[t._v(" 为合作伙 "),s("span",{staticClass:"css221a45fbb02225e"},[t._v("伴")]),t._v("提供全方位的合作 ")])])}],a=s("0814"),o=s("fc46"),i={components:{Fast:a["a"],Callcontact:o["a"]},data:function(){return{bannerHeight:0,bModel:[{src:"https://yanxuan.nosdn.127.net/aa269886c2cd53dbffda5713bec0981c.png",title:"产品赋能支持",content:"有针对性的开放、深度定制行业解决方案"},{src:"https://yanxuan.nosdn.127.net/d5d55597c0c972f7b909eccbed20d306.png",title:"业务政策支持",content:"多种政策支持和商务支持，助力合作伙伴在农资领域取得成功"},{src:"https://yanxuan.nosdn.127.net/ad2bcb9266038a2481633ad2b1c2d0cd.png",title:"市场及营销支持",content:"农资展会、研讨会等丰富的市场和营销机会"},{src:"https://yanxuan.nosdn.127.net/061d3b6b6bd87232e73bdd945a60f64e.png",title:"培训支持",content:"深化发展培训、技术赋能，快速提升合作伙伴服务能力"}],process:[{src:"https://yanxuan.nosdn.127.net/a7c40bca1a9e3cd371b7b6223747bfa8.png",title:"申请加入，完成资质审核"},{src:"https://yanxuan.nosdn.127.net/32316c2db807c1610e18c0d89f8cb285.png",title:"合作洽谈"},{src:"https://yanxuan.nosdn.127.net/8fc5d1cff09a28089cdee721bab2f010.png",title:"签订协议"}]}},mounted:function(){var t=this;window.addEventListener("resize",(function(){return t.screenChanges()}),!1)},created:function(){this.screenChanges()},methods:{join:function(){var t=setInterval((function(){var n=document.documentElement.scrollTop||document.body.scrollTop,s=Math.floor(-n/5);document.documentElement.scrollTop=document.body.scrollTop=n+s,this.isTop=!0,0===n&&clearInterval(t)}),5);this.$router.push({name:"join"})},screenChanges:function(){this.bannerHeight=document.documentElement.clientHeight-100}}},r=i,l=(s("6fae"),s("2877")),d=Object(l["a"])(r,e,c,!1,null,null,null);n["default"]=d.exports}}]);