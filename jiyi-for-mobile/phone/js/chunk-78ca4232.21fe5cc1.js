(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-78ca4232"],{5035:function(t,n,e){},"6fae":function(t,n,e){"use strict";var s=e("5035"),a=e.n(s);a.a},"975c":function(t,n,e){"use strict";var s=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{staticClass:"m_b hidden-md-and-up"},[e("img",{staticClass:"m_banner",attrs:{src:t.m_banner,alt:""}}),e("div",{staticClass:"m_b_t"},[e("h2",[t._v(t._s(t.m_title))]),e("p",[t._v(t._s(t.m_content))])])])},a=[],c={name:"MobileBanner",props:{m_banner:String,m_title:String,m_content:String},data:function(){return{}},methods:{}},i=c,o=(e("f7d1"),e("2877")),r=Object(o["a"])(i,s,a,!1,null,"a1ed0de2",null);n["a"]=r.exports},b084:function(t,n,e){"use strict";e.r(n);var s=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{staticClass:"Home"},[e("MobileBanner",{attrs:{m_content:"",m_title:"为合作伙伴提供全方位合作",m_banner:"https://yanxuan.nosdn.127.net/9950b7911713801e84928b96b7323fd7.jpg"}}),e("Fast",{attrs:{title:"为合作伙伴提供全方位的合作与支持"}},[e("el-row",{staticClass:"model",attrs:{type:"flex",justify:"space-around"}},t._l(t.bModel,(function(n,s){return e("el-col",{key:s,staticClass:"box"},[e("img",{attrs:{src:n.src,alt:""}}),e("h2",[t._v(t._s(n.title))]),e("p",[t._v(t._s(n.content))])])})),1)],1),e("Fast",{attrs:{title:"加入流程"}},[e("el-row",{staticClass:"join"},[t._l(t.process,(function(n,s){return e("el-col",{key:s,staticClass:"box"},[e("div",{staticClass:"circular yuan"},[e("img",{attrs:{src:n.src,alt:""}})]),e("div",{staticClass:"s_circular yuan"}),e("h2",[t._v(t._s(n.title))])])})),e("div",{staticClass:"Dividing"})],2),e("div",{staticClass:"join_botton",on:{click:function(n){return t.join()}}},[t._v("加入我们")])],1)],1)},a=[],c=e("0814"),i=e("975c"),o={components:{Fast:c["a"],MobileBanner:i["a"]},data:function(){return{bannerHeight:0,bModel:[{src:"https://yanxuan.nosdn.127.net/aa269886c2cd53dbffda5713bec0981c.png",title:"产品赋能支持",content:"有针对性的开放、深度定制行业解决方案"},{src:"https://yanxuan.nosdn.127.net/d5d55597c0c972f7b909eccbed20d306.png",title:"业务政策支持",content:"多种政策支持和商务支持，助力合作伙伴在农资领域取得成功"},{src:"https://yanxuan.nosdn.127.net/ad2bcb9266038a2481633ad2b1c2d0cd.png",title:"市场及营销支持",content:"农资展会、研讨会等丰富的市场和营销机会"},{src:"https://yanxuan.nosdn.127.net/061d3b6b6bd87232e73bdd945a60f64e.png",title:"培训支持",content:"深化发展培训、技术赋能，快速提升合作伙伴服务能力"}],process:[{src:"https://yanxuan.nosdn.127.net/a7c40bca1a9e3cd371b7b6223747bfa8.png",title:"申请加入，完成资质审核"},{src:"https://yanxuan.nosdn.127.net/32316c2db807c1610e18c0d89f8cb285.png",title:"合作洽谈"},{src:"https://yanxuan.nosdn.127.net/8fc5d1cff09a28089cdee721bab2f010.png",title:"签订协议"}]}},mounted:function(){var t=this;window.addEventListener("resize",(function(){return t.screenChanges()}),!1)},created:function(){this.screenChanges()},methods:{join:function(){var t=setInterval((function(){var n=document.documentElement.scrollTop||document.body.scrollTop,e=Math.floor(-n/5);document.documentElement.scrollTop=document.body.scrollTop=n+e,this.isTop=!0,0===n&&clearInterval(t)}),5);this.$router.push({name:"join"})},screenChanges:function(){this.bannerHeight=document.documentElement.clientHeight-100}}},r=o,l=(e("6fae"),e("2877")),d=Object(l["a"])(r,s,a,!1,null,null,null);n["default"]=d.exports},c8a4:function(t,n,e){},f7d1:function(t,n,e){"use strict";var s=e("c8a4"),a=e.n(s);a.a}}]);