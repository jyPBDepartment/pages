(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-015e949d"],{"06bb":function(t,n,e){},"10a4":function(t,n,e){},"18ae":function(t,n,e){"use strict";var s=e("e803"),a=e.n(s);a.a},"4c14":function(t,n,e){"use strict";var s=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{staticClass:"m_common_view"},[e("el-row",{staticClass:"hidden-md-and-up m_w"},[e("div",{staticClass:"m_l_box m_l_box_b",style:void 0!==t.title&&"padding:0;border-radius: 0;box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.0);"},[void 0!==t.title?e("h2",[t._v(t._s(t.title))]):t._e(),e("img",{attrs:{src:t.src,alt:""}}),e("ul",t._l(t.text,(function(n,s){return e("li",{key:s,style:void 0!==t.title&&"white-space:normal;"},[t._v(t._s(n))])})),0)])])],1)},a=[],i={name:"Tabs",props:{text:Array,src:String,title:String},created:function(){},data:function(){return{}},methods:{}},c=i,r=(e("18ae"),e("2877")),o=Object(r["a"])(c,s,a,!1,null,null,null);n["a"]=o.exports},"678d":function(t,n,e){"use strict";var s=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{staticClass:"main"},[e("div",{staticClass:"slider",attrs:{id:t.id}},t._l(t.list,(function(n,s){return e("div",{key:s,staticClass:"m_s_box",on:{touchstart:function(n){return n.preventDefault(),t.touchstart(n)},touchmove:function(n){return n.preventDefault(),t.touchmove(n)}}},["botton"==t.category?e("div",{staticClass:"botton"},[e("img",{attrs:{src:n.src,alt:""}}),e("h2",[t._v(t._s(n.title))])]):t._e(),"bottons"==t.category?e("div",{staticClass:"bottons"},[e("img",{attrs:{src:n.src,alt:""}}),e("h2",[t._v(t._s(n.title))]),t._l(n.li,(function(n,s){return e("p",{key:s},[t._v(t._s(n))])})),e("p")],2):t._e(),"tool"==t.category?e("div",{staticClass:"tool"},[e("img",{attrs:{src:n.src,alt:""}}),e("h2",[t._v(t._s(n.title))]),e("p",[t._v(t._s(n.content))])]):t._e(),"custom"==t.category?e("div",{staticClass:"custom"},[e("h2",[t._v(t._s(n.title))]),e("img",{attrs:{src:n.src,alt:""}})]):t._e(),"advantage"==t.category?e("div",{staticClass:"advantage"},[e("img",{attrs:{src:n.src,alt:""}}),e("div",[t._v(t._s(n.content))])]):t._e(),"pain"==t.category?e("div",{staticClass:"pain"},[e("McommonView",{attrs:{text:n.li,src:n.src,title:t.titleList[s]}})],1):t._e()])})),0)])},a=[],i=e("4c14"),c={name:"HomeSlider",components:{McommonView:i["a"]},props:{list:Array,category:String,titleList:Array,id:String},data:function(){return{startPointX:0,changePointX:0,showIndex:0}},created:function(){},methods:{show:function(t){this.changePointX=this.startPointX;var n=document.getElementById(this.id);n.style.marginLeft="-".concat(339.5*t,"px")},touchstart:function(t){this.startPointX=t.changedTouches[0].pageX},touchmove:function(t){if(this.startPointX!=this.changePointX){var n=t.changedTouches[0].pageX,e=this.startPointX-n;e>50&&this.showIndex<this.list.length-1?this.show(++this.showIndex):e<-50&&this.showIndex>0&&this.show(--this.showIndex)}}}},r=c,o=(e("9d2a"),e("2877")),d=Object(o["a"])(r,s,a,!1,null,"e82941a4",null);n["a"]=d.exports},"89bc":function(t,n,e){"use strict";e.r(n);var s=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{staticClass:"Home"},[e("MobileBanner",{staticClass:"hidden-md-and-up",attrs:{m_content:"农业种植全产业链互联网服务平台",m_title:"专注为农资经销商提供助力方",m_banner:"https://yanxuan.nosdn.127.net/d60079170e2131350132806dbd187885.jpg"}}),e("Fast",{staticClass:"hidden-md-and-up",attrs:{title:"丰富的营销拓客工具"}},[e("Slider",{staticClass:"m_slider",attrs:{category:"tool",id:"tool",list:t.iList}})],1),e("Fast",{staticClass:"hidden-md-and-up",attrs:{title:"门店结合互联网销售场景"}},[e("Slider",{staticClass:"m_slider",attrs:{category:"custom",id:"custom",list:t.m_scene}})],1)],1)},a=[],i=e("0814"),c=e("678d"),r=e("975c"),o={components:{Fast:i["a"],Slider:c["a"],MobileBanner:r["a"]},data:function(){return{bannerHeight:0,bannerHeight1:document.body.clientWidth/1.66,marginTOP:!1,iList:[{src:"https://yanxuan.nosdn.127.net/b40d6ba84c3e89a66a8b3b0470c20530.jpg",title:"经理人推荐",content:"扫描推荐二维码轻松发展营销团队"},{src:"https://yanxuan.nosdn.127.net/53783318e0fe232f6c56737617786b62.jpg",title:"满减/满送",content:"扩大销售 刺激消费利润率自由控制"},{src:"https://yanxuan.nosdn.127.net/ebb6d806a4592fa4201d47311d11a667.jpg",title:"抵扣活动",content:"指定客户精准营销锁住老客户"},{src:"https://yanxuan.nosdn.127.net/8353f3e7957c3bc8ab27a14bd7241919.jpg",title:"限时折扣",content:"饥饿营销立竿见影生效快"}],m_scene:[{src:"https://yanxuan.nosdn.127.net/8dee971705dd0f40243f159141bdbdf0.png",title:"线上电商"},{src:"https://yanxuan.nosdn.127.net/069a3609ef06b2e5113101deda2ec341.png",title:"店内销售"},{src:"https://yanxuan.nosdn.127.net/91205be2d3a2b40a5ce00965d3e1237c.png",title:"店外销售"}]}},mounted:function(){var t=this;window.addEventListener("resize",(function(){return t.screenChanges()}),!1)},created:function(){this.screenChanges()},methods:{navMove:function(t){this.marginTOP=t},specifyElement:function(t){document.getElementById(t).scrollIntoView()},screenChanges:function(){this.bannerHeight=document.documentElement.clientHeight-100}}},d=o,l=(e("89f3"),e("2877")),u=Object(l["a"])(d,s,a,!1,null,null,null);n["default"]=u.exports},"89f3":function(t,n,e){"use strict";var s=e("10a4"),a=e.n(s);a.a},"975c":function(t,n,e){"use strict";var s=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{staticClass:"m_b hidden-md-and-up"},[e("img",{staticClass:"m_banner",attrs:{src:t.m_banner,alt:""}}),e("div",{staticClass:"m_b_t"},[e("h2",[t._v(t._s(t.m_title))]),e("p",[t._v(t._s(t.m_content))])])])},a=[],i={name:"MobileBanner",props:{m_banner:String,m_title:String,m_content:String},data:function(){return{}},methods:{}},c=i,r=(e("f7d1"),e("2877")),o=Object(r["a"])(c,s,a,!1,null,"a1ed0de2",null);n["a"]=o.exports},"9d2a":function(t,n,e){"use strict";var s=e("06bb"),a=e.n(s);a.a},c8a4:function(t,n,e){},e803:function(t,n,e){},f7d1:function(t,n,e){"use strict";var s=e("c8a4"),a=e.n(s);a.a}}]);