(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-c4e092e2"],{"4bd9":function(t,n,e){"use strict";var a=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{staticClass:"main"},[t.isMobile?e("div",{staticClass:"m_complete",on:{click:function(n){return t.show(!0)}}},[t._v("完整功能列表")]):t._e(),t.isMobile?t._e():e("div",{staticClass:"m_complete",on:{click:function(n){return t.show(!0)}}},[t._v("功能详情")]),t.isMobile?e("transition",{attrs:{name:"el-fade-in-linear"}},[t.isShow?e("div",{staticClass:"transition-box"},[e("div",{staticClass:"m_popup"}),e("div",{staticClass:"popup"},[e("table",{staticClass:"table",attrs:{width:"calc(100% - 20px)"}},[e("caption",[e("h2",[t._v("产品功能")])]),e("thead",[e("tr",[e("th",[t._v("功能")]),e("th",[t._v("描述")])])]),t._l(t.functionList,(function(n,a){return e("tr",{key:a},[e("td",[t._v(t._s(n.name))]),e("td",[t._v(t._s(n.info))])])}))],2),e("div",{staticClass:"away",on:{click:function(n){return t.show(!1)}}},[t._v("收起")])])]):t._e()]):t._e(),t.isShow&&!t.isMobile?e("div",[e("div",{staticClass:"m_popup"},[e("div",{staticClass:"popup"},[e("table",{staticClass:"table",attrs:{width:"calc(100% - 20px)"}},[t._m(0),t._m(1),t._l(t.functionList,(function(n,a){return e("tr",{key:a},[e("td",[t._v(t._s(n.name))]),e("td",[t._v(t._s(n.info))])])}))],2),e("div",{staticClass:"away",on:{click:function(n){return t.show(!1)}}},[t._v("收起")])])])]):t._e()],1)},s=[function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("caption",[e("h2",[t._v("完整功能列表")])])},function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("thead",[e("tr",[e("th",{attrs:{colspan:"2"}},[t._v("服务内容")])])])}],i={name:"FullFunctionality",components:{},props:{functionList:Array,isMobile:{type:Boolean,default:!0}},data:function(){return{isShow:!1}},created:function(){},methods:{show:function(t){this.isShow=t}}},c=i,o=(e("5a6a"),e("2877")),l=Object(o["a"])(c,a,s,!1,null,"b1e52a56",null);n["a"]=l.exports},"4f09":function(t,n,e){},"5a6a":function(t,n,e){"use strict";var a=e("e54a"),s=e.n(a);s.a},"5fe5":function(t,n,e){"use strict";var a=e("bbaa"),s=e.n(a);s.a},"877d":function(t,n,e){"use strict";var a=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{ref:"circleBox"},[e("div",{staticClass:"f_nav",class:t.navBarFixed&&"navBarWrap"},[e("el-row",{staticClass:"box",attrs:{type:"flex",justify:"center"}},t._l(t.modelName,(function(n,a){return e("el-col",{key:a,staticClass:"n_b",class:0!==a&&" left_style",nativeOn:{click:function(e){return t.chage(n.id)}}},[t._v(t._s(n.title))])})),1)],1)])},s=[],i={name:"FixedNav",props:{title:String,sTitle:{type:String,default:null},background:{type:String,default:"#fff"},modelName:{type:Array,default:function(){return[]}}},data:function(){return{navBarFixed:!1}},watch:{navBarFixed:function(t){this.$emit("chage",t)}},mounted:function(){window.addEventListener("scroll",this.handleScroll)},methods:{chage:function(t){this.$emit("jump",t)},handleScroll:function(){if(this.$refs.circleBox){var t=this.$refs.circleBox.getBoundingClientRect(),n=t.top;this.navBarFixed=n<1}}}},c=i,o=(e("f149"),e("2877")),l=Object(o["a"])(c,a,s,!1,null,null,null);n["a"]=l.exports},bbaa:function(t,n,e){},e54a:function(t,n,e){},f06a:function(t,n,e){"use strict";e.r(n);var a=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{staticClass:"Home"},[e("img",{staticClass:"top_img",staticStyle:{height:"640px"},attrs:{src:"https://s1.ax1x.com/2020/07/24/UjdRwF.jpg"}}),t._m(0),e("FixedNav",{attrs:{modelName:t.modelName},on:{chage:function(n){return t.navMove(n)},jump:t.specifyElement}}),e("Fast",{class:t.marginTOP?"move":"move2",attrs:{id:t.modelName[0].id,title:"多样化的店铺功能  全面满足农资经销商需求"}},[e("el-row",{staticClass:"f_b"},t._l(t.bottonList,(function(n,a){return e("el-col",{key:a,staticClass:"f_b_d"},[e("img",{attrs:{src:n.src,alt:""}}),e("p",[t._v(t._s(n.title))])])})),1)],1),e("div",{staticStyle:{background:"#242b44"}},[e("div",{staticClass:"w"},[e("Rotation",{attrs:{banner:t.bannerBottom,height:854}}),e("FullFunctionality",{staticClass:"wz_btn",attrs:{isMobile:!1,functionList:t.functionList}})],1)]),e("Fast",{attrs:{title:"四大核心优势",id:t.modelName[1].id}},[e("el-row",{staticClass:"sdys"},[e("el-col",{staticClass:"title",attrs:{span:9}},[e("div",{staticClass:"s_c"},[e("h2",[t._v("行业专属")]),e("p",[t._v("针对农资行业特有属性进行设计开发")])]),e("div",{staticClass:"s_c b"},[e("h2",[t._v("采购\\销售全覆盖")]),e("p",[t._v("全部经营，线上搞定")])])]),e("el-col",{attrs:{span:6}},[e("img",{staticClass:"sdys_img",attrs:{src:"https://yanxuan.nosdn.127.net/d63c6305ea9072ba6ce3db37bf57649d.png",alt:""}})]),e("el-col",{staticClass:"title",attrs:{span:9}},[e("div",{staticClass:"s_c"},[e("h2",[t._v("数据分析图谱")]),e("p",[t._v("数据辅助决策，更有效管理客户与订单")])]),e("div",{staticClass:"s_c b"},[e("h2",[t._v("经理人管理")]),e("p",[t._v("让更多的人帮你卖货和维护客户")])])])],1)],1),e("Fast",{attrs:{id:t.modelName[2].id,title:t.modelName[2].title,allScreen:!0,background:"#f0f0f0 "}},[e("div",{staticClass:"w"},[e("img",{staticClass:"top_img top",style:{height:"541px"},attrs:{src:"https://s1.ax1x.com/2020/07/24/UjqY6I.png"}})])]),e("Callcontact")],1)},s=[function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{staticClass:"banner-font"},[e("h2",{staticClass:"css2215ee06652225e"},[t._v("经销商店铺")]),e("p",{staticClass:"css2215f1c4942225e"},[t._v("升级经营能力 实现跨越式发展")])])}],i=e("0814"),c=e("c89a"),o=e("877d"),l=e("fc46"),r=e("4bd9"),d={components:{Fast:i["a"],FixedNav:o["a"],Rotation:c["a"],FullFunctionality:r["a"],Callcontact:l["a"]},data:function(){return{bannerHeight:0,bannerBottomHeight:document.body.clientWidth/3.31,marginTOP:!1,functionList:[{name:"装修店铺",info:"按自主经营风格装修自己的网店"},{name:"在线采购货源",info:"在线查看海量货源并洽谈、支付订金，随时追踪订单状态"},{name:"采购货源退货",info:"在线与供应商协商退货并支持退货操作，随时查看退单详情"},{name:"自备商品发布",info:"支持平台采购商品发布的同时，也支持经销商自备商品发布"},{name:"商品上下架",info:"按需随时调整商品上架可售，下架停售"},{name:"库存变动",info:"根据实际商品进销存变动库存，变动可追溯"},{name:"商品回收站",info:"可对已发布商品进行删除和恢复"},{name:"在线支付",info:"支持余额、微信等在线支付方式"},{name:"销售订单追踪",info:"按订单状态分类操作、管理"},{name:"商品详情展示",info:"支持对商品进行全方位图文、视频、适种区域、品牌、厂家、规格、支付方式、促销活动、配送方式等展示"},{name:"满减促销",info:"支持无门槛、有门槛等满减促销设置"},{name:"满送促销",info:"支持满送同类商品的促销设置"},{name:"限时折扣促销",info:"支持按月、周、日、时段等周期的促销设置"},{name:"抵扣劵促销",info:"支持无条件抵扣劵按指定人员发放的促销设置"},{name:"报表管理",info:"可查看按多条件筛选需要的统计报表，并可导出"},{name:"资金管理",info:"支持资金流水查询、提现、充值"},{name:"消息提醒",info:"提醒交易、联系人、新闻、活动、公告等消息"},{name:"即时通讯",info:"支持文字、语音、图片、表情、视频、文件"}],modelName:[{title:"产品功能",id:"1"},{title:"核心优势",id:"2"},{title:"场景展示",id:"3"}],bannerBottom:[{src:"https://s1.ax1x.com/2020/07/24/UjqtXt.jpg"},{src:"https://s1.ax1x.com/2020/07/24/Ujqa0f.jpg"}],bottonList:[{src:"https://yanxuan.nosdn.127.net/45c85287d41b53ad7b1162553d988109.png",title:"发布商品"},{src:"https://yanxuan.nosdn.127.net/bd4c5386781080fff0af0c5fd27a757c.png",title:"订单追踪与处理"},{src:"https://yanxuan.nosdn.127.net/7ced8027844b34c2ec9987fd6e1e1c75.png",title:"收银管理"},{src:"https://yanxuan.nosdn.127.net/ecc32d061ed433052053fe096c8bade6.png",title:"销售团队管理"},{src:"https://yanxuan.nosdn.127.net/1471f47414b5a455b677b67630c7db63.png",title:"商品批发采购"},{src:"https://yanxuan.nosdn.127.net/c4bd2828f9279d21159eee75c14cfac0.png",title:"促销工具"},{src:"https://yanxuan.nosdn.127.net/811ad2692ac8703d7de8fdfc518a2a16.png",title:"消息、资讯推送"},{src:"https://yanxuan.nosdn.127.net/2cf297ae7fda4030e284dca7f3ae212f.png",title:"分销管理"},{src:"https://yanxuan.nosdn.127.net/501340a4cca82b986c376e3c8defe2d0.png",title:"进销存管理"},{src:"https://yanxuan.nosdn.127.net/84847cd0379b854c3315945b9a59d35f.png",title:"报表分析"}]}},mounted:function(){var t=this;window.addEventListener("resize",(function(){return t.screenChanges()}),!1)},created:function(){this.screenChanges()},methods:{navMove:function(t){this.marginTOP=t},specifyElement:function(t){document.getElementById(t).scrollIntoView()},screenChanges:function(){this.bannerHeight=document.documentElement.clientHeight-100}}},f=d,u=(e("5fe5"),e("2877")),m=Object(u["a"])(f,a,s,!1,null,null,null);n["default"]=m.exports},f149:function(t,n,e){"use strict";var a=e("4f09"),s=e.n(a);s.a}}]);