(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-4b0b0c7e"],{"038e":function(t,n,e){"use strict";e.r(n);var a=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{staticClass:"Home"},[e("img",{staticClass:"top_img",staticStyle:{height:"640px"},attrs:{src:"https://s1.ax1x.com/2020/07/24/UjdhFJ.jpg"}}),t._m(0),e("FixedNav",{attrs:{modelName:t.modelName},on:{chage:function(n){return t.navMove(n)},jump:t.specifyElement}}),e("Fast",{class:t.marginTOP?"move":"move2",attrs:{img:!0,title:t.modelName[0].title,id:t.modelName[0].id,allScreen:!0}},[e("div",{staticClass:"w"},[e("Rotation",{staticStyle:{"margin-top":"30px"},attrs:{banner:t.banner,height:648}})],1)]),e("Fast",{attrs:{title:t.modelName[1].title,id:t.modelName[1].id}},[e("el-row",{staticClass:"h_y"},[e("el-col",{staticClass:"text1",attrs:{span:12}},[e("p",[t._v("线上货品展示，不受人脉限制，轻松取得更多销量")]),e("p",[t._v("仅需网店运营人员，节省销售成本，提高利润率")]),e("p",[t._v("大数据支撑决策，不再盲目生产")]),e("p",[t._v("通过支付订金的方式，提前锁定销售数量，杠杆效应助力")])]),e("el-col",{attrs:{span:12}},[e("img",{attrs:{src:"https://yanxuan.nosdn.127.net/8f0291a76b9bf43d0cd724291b426fef.png",alt:""}})])],1)],1),e("Fast",{attrs:{title:t.modelName[2].title,id:t.modelName[2].id,background:"#f6f7fc"}},[e("el-row",{staticClass:"b-b",attrs:{type:"flex",justify:"center"}},t._l(t.bottonList,(function(n,a){return e("el-col",{key:a,staticClass:"b_f",attrs:{span:12}},[e("el-col",{staticClass:"icon",attrs:{span:10}},[e("img",{attrs:{src:n.src,alt:""}})]),e("el-col",{staticClass:"content",attrs:{span:14}},[e("h2",[t._v(t._s(n.title))]),e("ul",t._l(n.li,(function(n){return e("li",{key:n},[t._v(t._s(n))])})),0)])],1)})),1),e("FullFunctionality",{staticClass:"wz_btn",attrs:{isMobile:!1,functionList:t.functionList}})],1),e("Callcontact")],1)},i=[function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{staticClass:"banner-font"},[e("h2",{staticClass:"css2215ee06652225e"},[t._v("有效降低供应商销售成本")]),e("p",{staticClass:"css2215f1c4942225e"},[t._v("大数据辅助科学决策")])])}],s=e("0814"),c=e("c89a"),l=e("877d"),o=e("4bd9"),r=e("fc46"),u={components:{Fast:s["a"],FixedNav:l["a"],Rotation:c["a"],Callcontact:r["a"],FullFunctionality:o["a"]},data:function(){return{bannerHeight:0,marginTOP:!1,banner:[{src:"https://s1.ax1x.com/2020/07/24/UjPhw9.png"},{src:"https://s1.ax1x.com/2020/07/24/UjP4oR.png"}],functionList:[{name:"商品发布",info:"可对供应的商品进行全方位的展示发布"},{name:"商品上下架",info:"按需随时调整商品上架可售，下架停售"},{name:"库存变动",info:"根据实际商品进销存变动库存，变动可追溯"},{name:"品牌管理",info:"可对不同品牌进行分类添加、查询、修改、删除"},{name:"订单管理",info:"支持根据订单的不同状态进行对应处理"},{name:"退货管理",info:"供应商可根据与经销商的协商结果在线处理退货订单"},{name:"报表管理",info:"在线随时查看某时段的经营状况数据"},{name:"查看农户订单",info:"可在线查看农户在经销商处订购自身商品的情况"},{name:"消息提醒",info:"提醒交易、联系人、新闻、活动、公告等消息"},{name:"资金管理",info:"支持资金流水查询、提现、充值"},{name:"在线支付",info:"支持余额在线支付方式"}],modelName:[{title:"应用场景",id:"1"},{title:"核心优势",id:"2"},{title:"产品功能",id:"3"}],m_b_text:["线上货品展示，不受人脉限制，轻松取得更多销量","仅需网店运营人员，节省销售成本，提高利润率","大数据支撑决策，不再盲目生产","通过支付订金的方式，提前锁定销售数量，杠杆效应助力"],bottonList:[{src:"https://yanxuan.nosdn.127.net/e37f219870c719017e25855d1735fccd.png",title:"商品发布、管理",li:["商品可从多角度做详情展示","商品品牌、规格细致分类管理"]},{src:"https://yanxuan.nosdn.127.net/1f70cd30d5f2fc317559cd522bb0af41.png",title:"库存管理",li:["上架、下架、销售、退货、库存变动等清晰可见"]},{src:"https://yanxuan.nosdn.127.net/23527042e3a7817212f0dbc3a7a5a807.png",title:"订单管理",li:["不但可查看经销商采购订单，还可查看农户订单"]},{src:"https://yanxuan.nosdn.127.net/1aef0593a2652a6dc0bcc0396190aae2.png",title:"报表管理",li:["经营状况、数据统计、报表分析"]}]}},mounted:function(){var t=this;window.addEventListener("resize",(function(){return t.screenChanges()}),!1)},created:function(){this.screenChanges()},methods:{navMove:function(t){this.marginTOP=t},specifyElement:function(t){document.getElementById(t).scrollIntoView()},screenChanges:function(){this.bannerHeight=document.documentElement.clientHeight-100}}},f=u,d=(e("cd4e"),e("2877")),m=Object(d["a"])(f,a,i,!1,null,null,null);n["default"]=m.exports},"4bd9":function(t,n,e){"use strict";var a=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{staticClass:"main"},[t.isMobile?e("div",{staticClass:"m_complete",on:{click:function(n){return t.show(!0)}}},[t._v("完整功能列表")]):t._e(),t.isMobile?t._e():e("div",{staticClass:"m_complete",on:{click:function(n){return t.show(!0)}}},[t._v("功能详情")]),t.isMobile?e("transition",{attrs:{name:"el-fade-in-linear"}},[t.isShow?e("div",{staticClass:"transition-box"},[e("div",{staticClass:"m_popup"}),e("div",{staticClass:"popup"},[e("table",{staticClass:"table",attrs:{width:"calc(100% - 20px)"}},[e("caption",[e("h2",[t._v("产品功能")])]),e("thead",[e("tr",[e("th",[t._v("功能")]),e("th",[t._v("描述")])])]),t._l(t.functionList,(function(n,a){return e("tr",{key:a},[e("td",[t._v(t._s(n.name))]),e("td",[t._v(t._s(n.info))])])}))],2),e("div",{staticClass:"away",on:{click:function(n){return t.show(!1)}}},[t._v("收起")])])]):t._e()]):t._e(),t.isShow&&!t.isMobile?e("div",[e("div",{staticClass:"m_popup"},[e("div",{staticClass:"popup"},[e("table",{staticClass:"table",attrs:{width:"calc(100% - 20px)"}},[t._m(0),t._m(1),t._l(t.functionList,(function(n,a){return e("tr",{key:a},[e("td",[t._v(t._s(n.name))]),e("td",[t._v(t._s(n.info))])])}))],2),e("div",{staticClass:"away",on:{click:function(n){return t.show(!1)}}},[t._v("收起")])])])]):t._e()],1)},i=[function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("caption",[e("h2",[t._v("完整功能列表")])])},function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("thead",[e("tr",[e("th",{attrs:{colspan:"2"}},[t._v("服务内容")])])])}],s={name:"FullFunctionality",components:{},props:{functionList:Array,isMobile:{type:Boolean,default:!0}},data:function(){return{isShow:!1}},created:function(){},methods:{show:function(t){this.isShow=t}}},c=s,l=(e("5a6a"),e("2877")),o=Object(l["a"])(c,a,i,!1,null,"b1e52a56",null);n["a"]=o.exports},"4f09":function(t,n,e){},"5a6a":function(t,n,e){"use strict";var a=e("e54a"),i=e.n(a);i.a},"82ae":function(t,n,e){},"877d":function(t,n,e){"use strict";var a=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{ref:"circleBox"},[e("div",{staticClass:"f_nav",class:t.navBarFixed&&"navBarWrap"},[e("el-row",{staticClass:"box",attrs:{type:"flex",justify:"center"}},t._l(t.modelName,(function(n,a){return e("el-col",{key:a,staticClass:"n_b",class:0!==a&&" left_style",nativeOn:{click:function(e){return t.chage(n.id)}}},[t._v(t._s(n.title))])})),1)],1)])},i=[],s={name:"FixedNav",props:{title:String,sTitle:{type:String,default:null},background:{type:String,default:"#fff"},modelName:{type:Array,default:function(){return[]}}},data:function(){return{navBarFixed:!1}},watch:{navBarFixed:function(t){this.$emit("chage",t)}},mounted:function(){window.addEventListener("scroll",this.handleScroll)},methods:{chage:function(t){this.$emit("jump",t)},handleScroll:function(){if(this.$refs.circleBox){var t=this.$refs.circleBox.getBoundingClientRect(),n=t.top;this.navBarFixed=n<1}}}},c=s,l=(e("f149"),e("2877")),o=Object(l["a"])(c,a,i,!1,null,null,null);n["a"]=o.exports},cd4e:function(t,n,e){"use strict";var a=e("82ae"),i=e.n(a);i.a},e54a:function(t,n,e){},f149:function(t,n,e){"use strict";var a=e("4f09"),i=e.n(a);i.a}}]);