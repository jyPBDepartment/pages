(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-743731ad"],{"06bb":function(t,n,e){},"18ae":function(t,n,e){"use strict";var a=e("e803"),s=e.n(a);s.a},"3a95":function(t,n,e){},"4bd9":function(t,n,e){"use strict";var a=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{staticClass:"main"},[t.isMobile?e("div",{staticClass:"m_complete",on:{click:function(n){return t.show(!0)}}},[t._v("完整功能列表")]):t._e(),t.isMobile?t._e():e("div",{staticClass:"m_complete",on:{click:function(n){return t.show(!0)}}},[t._v("功能详情")]),t.isMobile?e("transition",{attrs:{name:"el-fade-in-linear"}},[t.isShow?e("div",{staticClass:"transition-box"},[e("div",{staticClass:"m_popup"}),e("div",{staticClass:"popup"},[e("table",{staticClass:"table",attrs:{width:"calc(100% - 20px)"}},[e("caption",[e("h2",[t._v("产品功能")])]),e("thead",[e("tr",[e("th",[t._v("功能")]),e("th",[t._v("描述")])])]),t._l(t.functionList,(function(n,a){return e("tr",{key:a},[e("td",[t._v(t._s(n.name))]),e("td",[t._v(t._s(n.info))])])}))],2),e("div",{staticClass:"away",on:{click:function(n){return t.show(!1)}}},[t._v("收起")])])]):t._e()]):t._e(),t.isShow&&!t.isMobile?e("div",[e("div",{staticClass:"m_popup"},[e("div",{staticClass:"popup"},[e("table",{staticClass:"table",attrs:{width:"calc(100% - 20px)"}},[t._m(0),t._m(1),t._l(t.functionList,(function(n,a){return e("tr",{key:a},[e("td",[t._v(t._s(n.name))]),e("td",[t._v(t._s(n.info))])])}))],2),e("div",{staticClass:"away",on:{click:function(n){return t.show(!1)}}},[t._v("收起")])])])]):t._e()],1)},s=[function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("caption",[e("h2",[t._v("完整功能列表")])])},function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("thead",[e("tr",[e("th",{attrs:{colspan:"2"}},[t._v("服务内容")])])])}],i={name:"FullFunctionality",components:{},props:{functionList:Array,isMobile:{type:Boolean,default:!0}},data:function(){return{isShow:!1}},created:function(){},methods:{show:function(t){this.isShow=t}}},c=i,o=(e("a356"),e("2877")),r=Object(o["a"])(c,a,s,!1,null,"052e126d",null);n["a"]=r.exports},"4c14":function(t,n,e){"use strict";var a=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{staticClass:"m_common_view"},[e("el-row",{staticClass:"hidden-md-and-up m_w"},[e("div",{staticClass:"m_l_box m_l_box_b",style:void 0!==t.title&&"padding:0;border-radius: 0;box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.0);"},[void 0!==t.title?e("h2",[t._v(t._s(t.title))]):t._e(),e("img",{attrs:{src:t.src,alt:""}}),e("ul",t._l(t.text,(function(n,a){return e("li",{key:a,style:void 0!==t.title&&"white-space:normal;"},[t._v(t._s(n))])})),0)])])],1)},s=[],i={name:"Tabs",props:{text:Array,src:String,title:String},created:function(){},data:function(){return{}},methods:{}},c=i,o=(e("18ae"),e("2877")),r=Object(o["a"])(c,a,s,!1,null,null,null);n["a"]=r.exports},"5fe5":function(t,n,e){"use strict";var a=e("bbaa"),s=e.n(a);s.a},"678d":function(t,n,e){"use strict";var a=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{staticClass:"main"},[e("div",{staticClass:"slider",attrs:{id:t.id}},t._l(t.list,(function(n,a){return e("div",{key:a,staticClass:"m_s_box",on:{touchstart:function(n){return n.preventDefault(),t.touchstart(n)},touchmove:function(n){return n.preventDefault(),t.touchmove(n)}}},["botton"==t.category?e("div",{staticClass:"botton"},[e("img",{attrs:{src:n.src,alt:""}}),e("h2",[t._v(t._s(n.title))])]):t._e(),"bottons"==t.category?e("div",{staticClass:"bottons"},[e("img",{attrs:{src:n.src,alt:""}}),e("h2",[t._v(t._s(n.title))]),t._l(n.li,(function(n,a){return e("p",{key:a},[t._v(t._s(n))])})),e("p")],2):t._e(),"tool"==t.category?e("div",{staticClass:"tool"},[e("img",{attrs:{src:n.src,alt:""}}),e("h2",[t._v(t._s(n.title))]),e("p",[t._v(t._s(n.content))])]):t._e(),"custom"==t.category?e("div",{staticClass:"custom"},[e("h2",[t._v(t._s(n.title))]),e("img",{attrs:{src:n.src,alt:""}})]):t._e(),"advantage"==t.category?e("div",{staticClass:"advantage"},[e("img",{attrs:{src:n.src,alt:""}}),e("div",[t._v(t._s(n.content))])]):t._e(),"pain"==t.category?e("div",{staticClass:"pain"},[e("McommonView",{attrs:{text:n.li,src:n.src,title:t.titleList[a]}})],1):t._e()])})),0)])},s=[],i=e("4c14"),c={name:"HomeSlider",components:{McommonView:i["a"]},props:{list:Array,category:String,titleList:Array,id:String},data:function(){return{startPointX:0,changePointX:0,showIndex:0}},created:function(){},methods:{show:function(t){this.changePointX=this.startPointX;var n=document.getElementById(this.id);n.style.marginLeft="-".concat(339.5*t,"px")},touchstart:function(t){this.startPointX=t.changedTouches[0].pageX},touchmove:function(t){if(this.startPointX!=this.changePointX){var n=t.changedTouches[0].pageX,e=this.startPointX-n;e>50&&this.showIndex<this.list.length-1?this.show(++this.showIndex):e<-50&&this.showIndex>0&&this.show(--this.showIndex)}}}},o=c,r=(e("9d2a"),e("2877")),l=Object(r["a"])(o,a,s,!1,null,"e82941a4",null);n["a"]=l.exports},"975c":function(t,n,e){"use strict";var a=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{staticClass:"m_b hidden-md-and-up"},[e("img",{staticClass:"m_banner",attrs:{src:t.m_banner,alt:""}}),e("div",{staticClass:"m_b_t"},[e("h2",[t._v(t._s(t.m_title))]),e("p",[t._v(t._s(t.m_content))])])])},s=[],i={name:"MobileBanner",props:{m_banner:String,m_title:String,m_content:String},data:function(){return{}},methods:{}},c=i,o=(e("f7d1"),e("2877")),r=Object(o["a"])(c,a,s,!1,null,"a1ed0de2",null);n["a"]=r.exports},"9d2a":function(t,n,e){"use strict";var a=e("06bb"),s=e.n(a);s.a},a356:function(t,n,e){"use strict";var a=e("3a95"),s=e.n(a);s.a},bbaa:function(t,n,e){},c8a4:function(t,n,e){},e803:function(t,n,e){},f06a:function(t,n,e){"use strict";e.r(n);var a=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{staticClass:"Home"},[e("MobileBanner",{staticClass:"hidden-md-and-up",attrs:{m_content:"升级经营能力 实现跨越式发展",m_title:"经销商店铺",m_banner:"https://yanxuan.nosdn.127.net/6ec80a1769f8b8ec34a30ea46b1438fe.jpg"}}),e("Fast",{staticClass:"hidden-md-and-up",attrs:{title:"多样化的店铺功能"}},[e("Slider",{staticClass:"m_slider",attrs:{category:"botton",id:"botton",list:t.bottonList}}),e("FullFunctionality",{staticClass:"hidden-md-and-up",attrs:{functionList:t.functionList}})],1),e("Fast",{staticClass:"hidden-md-and-up",attrs:{title:"四大核心优势"}},[e("McommonView",{staticStyle:{"margin-top":"15px"},attrs:{text:t.m_b_text,src:"https://yanxuan.nosdn.127.net/d63c6305ea9072ba6ce3db37bf57649d.png"}})],1)],1)},s=[],i=e("0814"),c=e("678d"),o=e("975c"),r=e("4c14"),l=e("4bd9"),d={components:{Fast:i["a"],Slider:c["a"],MobileBanner:o["a"],McommonView:r["a"],FullFunctionality:l["a"]},data:function(){return{bannerHeight:0,bannerBottomHeight:document.body.clientWidth/3.31,marginTOP:!1,functionList:[{name:"装修店铺",info:"按自主经营风格装修自己的网店"},{name:"在线采购货源",info:"在线查看海量货源并洽谈、支付订金，随时追踪订单状态"},{name:"采购货源退货",info:"在线与供应商协商退货并支持退货操作，随时查看退单详情"},{name:"自备商品发布",info:"支持平台采购商品发布的同时，也支持经销商自备商品发布"},{name:"商品上下架",info:"按需随时调整商品上架可售，下架停售"},{name:"库存变动",info:"根据实际商品进销存变动库存，变动可追溯"},{name:"商品回收站",info:"可对已发布商品进行删除和恢复"},{name:"在线支付",info:"支持余额、微信等在线支付方式"},{name:"销售订单追踪",info:"按订单状态分类操作、管理"},{name:"商品详情展示",info:"支持对商品进行全方位图文、视频、适种区域、品牌、厂家、规格、支付方式、促销活动、配送方式等展示"},{name:"满减促销",info:"支持无门槛、有门槛等满减促销设置"},{name:"满送促销",info:"支持满送同类商品的促销设置"},{name:"限时折扣促销",info:"支持按月、周、日、时段等周期的促销设置"},{name:"抵扣劵促销",info:"支持无条件抵扣劵按指定人员发放的促销设置"},{name:"报表管理",info:"可查看按多条件筛选需要的统计报表，并可导出"},{name:"资金管理",info:"支持资金流水查询、提现、充值"},{name:"消息提醒",info:"提醒交易、联系人、新闻、活动、公告等消息"},{name:"即时通讯",info:"支持文字、语音、图片、表情、视频、文件"}],m_b_text:["针对农资行业特有属性进行设计开发","数据辅助决策，更有效管理客户与订单","全部经营，线上搞定","让更多的人帮你卖货和维护客户"],bottonList:[{src:"https://yanxuan.nosdn.127.net/45c85287d41b53ad7b1162553d988109.png",title:"发布商品"},{src:"https://yanxuan.nosdn.127.net/bd4c5386781080fff0af0c5fd27a757c.png",title:"订单追踪与处理"},{src:"https://yanxuan.nosdn.127.net/7ced8027844b34c2ec9987fd6e1e1c75.png",title:"收银管理"},{src:"https://yanxuan.nosdn.127.net/ecc32d061ed433052053fe096c8bade6.png",title:"销售团队管理"},{src:"https://yanxuan.nosdn.127.net/1471f47414b5a455b677b67630c7db63.png",title:"商品批发采购"},{src:"https://yanxuan.nosdn.127.net/c4bd2828f9279d21159eee75c14cfac0.png",title:"促销工具"},{src:"https://yanxuan.nosdn.127.net/811ad2692ac8703d7de8fdfc518a2a16.png",title:"消息、资讯推送"},{src:"https://yanxuan.nosdn.127.net/2cf297ae7fda4030e284dca7f3ae212f.png",title:"分销管理"},{src:"https://yanxuan.nosdn.127.net/501340a4cca82b986c376e3c8defe2d0.png",title:"进销存管理"},{src:"https://yanxuan.nosdn.127.net/84847cd0379b854c3315945b9a59d35f.png",title:"报表分析"}]}},mounted:function(){var t=this;window.addEventListener("resize",(function(){return t.screenChanges()}),!1)},created:function(){this.screenChanges()},methods:{navMove:function(t){this.marginTOP=t},specifyElement:function(t){document.getElementById(t).scrollIntoView()},screenChanges:function(){this.bannerHeight=document.documentElement.clientHeight-100}}},u=d,f=(e("5fe5"),e("2877")),m=Object(f["a"])(u,a,s,!1,null,null,null);n["default"]=m.exports},f7d1:function(t,n,e){"use strict";var a=e("c8a4"),s=e.n(a);s.a}}]);