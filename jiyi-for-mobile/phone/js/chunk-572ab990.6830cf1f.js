(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-572ab990"],{"8c02":function(e,t,i){},"975c":function(e,t,i){"use strict";var n=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"m_b hidden-md-and-up"},[i("img",{staticClass:"m_banner",attrs:{src:e.m_banner,alt:""}}),i("div",{staticClass:"m_b_t"},[i("h2",[e._v(e._s(e.m_title))]),i("p",[e._v(e._s(e.m_content))])])])},a=[],s={name:"MobileBanner",props:{m_banner:String,m_title:String,m_content:String},data:function(){return{}},methods:{}},m=s,r=(i("f7d1"),i("2877")),o=Object(r["a"])(m,n,a,!1,null,"a1ed0de2",null);t["a"]=o.exports},"9b9d":function(e,t,i){"use strict";var n=i("8c02"),a=i.n(n);a.a},b0c0:function(e,t,i){var n=i("83ab"),a=i("9bf2").f,s=Function.prototype,m=s.toString,r=/^\s*function ([^ (]*)/,o="name";n&&!(o in s)&&a(s,o,{configurable:!0,get:function(){try{return m.call(this).match(r)[1]}catch(e){return""}}})},c283:function(e,t,i){"use strict";i.r(t);var n=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"Home"},[i("MobileBanner",{staticClass:"hidden-md-and-up",attrs:{m_banner:"https://yanxuan.nosdn.127.net/6e7129bebd63145c998ded6ef918d7f6.jpg"}}),i("div",{staticClass:"m_answer hidden-md-and-up"},[i("div",{staticClass:"questionnaire"},[e._l(e.topicList,(function(t,n){return i("div",{key:n,staticClass:"topic"},[i("div",{staticClass:"title"},[i("span",{staticClass:"number"},[e._v(e._s(t.num))]),e._v(" "+e._s(t.title)+" "),i("span",{directives:[{name:"show",rawName:"v-show",value:t.mandatory,expression:"item.mandatory"}],staticClass:"important"},[e._v("*")])]),"09"!=t.num&&"10"!=t.num?i("div",{staticClass:"answer"},[1!==t.max?i("el-checkbox-group",{attrs:{min:t.min,max:t.max},model:{value:t.checkedCities,callback:function(i){e.$set(t,"checkedCities",i)},expression:"item.checkedCities"}},e._l(t.answer,(function(t,n){return i("div",{key:n},[i("el-checkbox",{key:n,attrs:{label:t.id}},[e._v(e._s(t.name))])],1)})),0):i("el-radio-group",{attrs:{min:t.min,max:t.max},model:{value:t.checkedCities,callback:function(i){e.$set(t,"checkedCities",i)},expression:"item.checkedCities"}},e._l(t.answer,(function(t,n){return i("el-radio",{key:n,attrs:{label:t.id}},[e._v(e._s(t.name))])})),1)],1):i("div",{staticClass:"answers"},e._l(t.answers,(function(t,n){return i("div",{key:n,staticClass:"box"},[i("div",{staticClass:"type"},[e._v(e._s(t.title))]),i("el-radio-group",{model:{value:t.checkedCities,callback:function(i){e.$set(t,"checkedCities",i)},expression:"items.checkedCities"}},e._l(t.list,(function(t,n){return i("el-radio",{key:n,attrs:{label:t.id}},[e._v(e._s(t.name))])})),1)],1)})),0)])})),i("div",{staticClass:"info"},[i("el-form",{ref:"editForm",attrs:{rules:e.rules,model:e.editForm}},[i("el-form-item",{attrs:{label:"联系人姓名",prop:"name"}},[i("el-input",{attrs:{type:"text",placeholder:"请输入联系人姓名"},on:{change:e.name},model:{value:e.editForm.name,callback:function(t){e.$set(e.editForm,"name",t)},expression:"editForm.name"}})],1),i("el-form-item",{attrs:{label:"联系人职务",prop:"post"}},[i("el-input",{attrs:{type:"text",placeholder:"请输入联系人职务 "},on:{change:e.post},model:{value:e.editForm.post,callback:function(t){e.$set(e.editForm,"post",t)},expression:"editForm.post"}})],1),i("el-form-item",{attrs:{label:"联系人手机",prop:"phoneNum"}},[i("el-input",{attrs:{type:"text",placeholder:"请输入联系人手机"},on:{change:e.tel},model:{value:e.editForm.phoneNum,callback:function(t){e.$set(e.editForm,"phoneNum",t)},expression:"editForm.phoneNum"}})],1),i("el-form-item",{attrs:{label:"联系人邮箱",prop:"email"}},[i("el-input",{attrs:{type:"text",placeholder:"请输入联系人邮箱"},on:{change:e.email},model:{value:e.editForm.email,callback:function(t){e.$set(e.editForm,"email",t)},expression:"editForm.email"}})],1),i("el-form-item",{attrs:{label:"公司名称"}},[i("el-input",{attrs:{type:"text",placeholder:"请输入公司名称"},model:{value:e.editForm.companyName,callback:function(t){e.$set(e.editForm,"companyName",t)},expression:"editForm.companyName"}})],1),i("el-form-item",{attrs:{label:"合作期望"}},[i("el-input",{staticStyle:{width:"33%","margin-left":"20px"},attrs:{type:"textarea",placeholder:"请输入合作期望,500字以内。"},model:{value:e.editForm.expectaion,callback:function(t){e.$set(e.editForm,"expectaion",t)},expression:"editForm.expectaion"}})],1),i("el-form-item",{attrs:{label:"推荐人姓名"}},[i("el-input",{attrs:{type:"text",placeholder:"请输入推荐人姓名"},model:{value:e.editForm.recommended,callback:function(t){e.$set(e.editForm,"recommended",t)},expression:"editForm.recommended"}})],1),e.isShow?i("el-form-item",{attrs:{label:"问卷答案"}},[i("el-input",{attrs:{type:"text",placeholder:"请输入问卷答案"},model:{value:e.editForm.questionAnswer,callback:function(t){e.$set(e.editForm,"questionAnswer",t)},expression:"editForm.questionAnswer"}})],1):e._e(),e.isShow?i("el-form-item",{attrs:{label:"问卷得分"}},[i("el-input",{attrs:{type:"text",placeholder:"请输入问卷得分"},model:{value:e.editForm.questionScore,callback:function(t){e.$set(e.editForm,"questionScore",t)},expression:"editForm.questionScore"}})],1):e._e()],1),i("el-row",{attrs:{type:"flex",justify:"center"}},[i("el-col",{attrs:{span:8,offset:10}},[i("el-button",{attrs:{type:"primary"},on:{click:e.save}},[e._v("提交申请")])],1)],1)],1)],2)])],1)},a=[],s=(i("b0c0"),i("0814")),m=i("975c"),r={components:{Fast:s["a"],MobileBanner:m["a"]},data:function(){return{isShow:!1,editForm:{name:"",post:"",phoneNum:"",companyName:"",email:"",expectaion:"",recommended:"",questionAnswer:"",questionScore:""},rules:{name:[{required:!0,message:"请输入您的姓名，只能为字母或汉字。",trigger:"blur"}],post:[{required:!0,message:"请输入您的职务，只能为字母或汉字。",trigger:"blur"}],phoneNum:[{required:!0,message:"请输入手机号码",trigger:"blur"}],email:[{required:!0,message:"请输入邮箱",trigger:"blur"}]},bannerHeight:0,topicList:[{num:"01",title:"您是否有店铺经营经验（限选2）",min:0,max:2,mandatory:!0,answer:[{id:"A",name:"有其他网店经营经验"},{id:"B",name:"有实体门店经营经验"},{id:"C",name:"没有任何开店经验"}],checkedCities:[]},{num:"02",title:"您属于以下哪一类（限选2）",min:0,max:2,mandatory:!0,answer:[{id:"A",name:"农资类商品生产者/代理者/经营者"},{id:"B",name:"种植大户/农机大户/养殖大户"},{id:"C",name:"家庭农场主/农业合作社管理者"},{id:"D",name:"农技推广人员/农技服务人员"},{id:"E",name:"村屯里有职称的人（村书记、大队书记等）"},{id:"F",name:"具有一定组织/领头能力的农民"},{id:"G",name:"其他"}],checkedCities:[]},{num:"03",title:"您的经营模式",min:0,max:1,mandatory:!0,answer:[{id:"A",name:"主营批发，少量零售"},{id:"B",name:"主营零售"},{id:"C",name:"其他"}],checkedCities:[]},{num:"04",title:"您是否已经准备好商品或有货源渠道",min:0,max:1,mandatory:!0,answer:[{id:"A",name:"农资类商品生产者/代理者/经营者"},{id:"B",name:"种植大户/农机大户/养殖大户"}],checkedCities:[]},{num:"05",title:"您的企业/店铺类型是怎样的",min:0,max:1,mandatory:!0,answer:[{id:"A",name:"合资"},{id:"B",name:"国有"},{id:"C",name:"集体所有制"},{id:"D",name:"股份制"},{id:"E",name:"有限责任"},{id:"F",name:"全民所有制"},{id:"G",name:"独资"},{id:"H",name:"私营"},{id:"I",name:"个体户"},{id:"J",name:"其他"}],checkedCities:[]},{num:"06",title:"您的销售覆盖区域",min:0,max:1,mandatory:!0,answer:[{id:"A",name:"省级及以下"},{id:"B",name:"市级及以下"},{id:"C",name:"县级及以下"},{id:"D",name:"村屯级"}],checkedCities:[]},{num:"07",title:"您计划经营什么类别",min:0,max:1,mandatory:!1,answer:[{id:"A",name:"种子/化肥/农药"},{id:"B",name:"农机/农具"},{id:"C",name:"种苗/花卉/菜籽"},{id:"D",name:"蔬菜/瓜果"},{id:"E",name:"牛/羊/猪/禽类"},{id:"F",name:"土地托管"},{id:"G",name:"粮食收/储/销售"},{id:"H",name:"私营"}],checkedCities:[]},{num:"08",title:"您希望平台给您什么帮助（限选3）",min:0,max:3,mandatory:!1,answer:[{id:"A",name:"需要平台帮助找更好的货源"},{id:"B",name:"需要推广店铺"},{id:"C",name:"获得更多的商机"},{id:"D",name:"运营技巧的培训"},{id:"E",name:"了解平台入驻规则"},{id:"F",name:"线上、线下服务指导"},{id:"G",name:"提供农技服务支持"}],checkedCities:[]},{num:"09",title:"(选填)您的每年的销量",min:0,max:1,mandatory:!1,answers:[{title:"种子",checkedCities:[],list:[{id:"A",name:"100万袋"},{id:"B",name:"10万袋以上"},{id:"C",name:"5—10万袋"},{id:"D",name:"1-5万袋"},{id:"E",name:"1万袋以下"}]},{title:"农药",checkedCities:[],list:[{id:"A",name:"1万垧以上"},{id:"B",name:"5000—1万垧地"},{id:"C",name:"2000—3000垧地"},{id:"D",name:"1000—2000垧地"},{id:"E",name:"1000垧地以下"}]},{title:"化肥",checkedCities:[],list:[{id:"A",name:"10万吨以上"},{id:"B",name:"5—10万吨"},{id:"C",name:"1-5万吨"},{id:"D",name:"5000—1万吨"},{id:"E",name:"5000吨以下"}]}],checkedCities:[]},{num:"10",title:"(选填)您每年的采购量",min:0,max:1,mandatory:!1,answers:[{title:"种子",checkedCities:[],list:[{id:"A",name:"100万袋"},{id:"B",name:"10万袋以上"},{id:"C",name:"5—10万袋"},{id:"D",name:"1-5万袋"},{id:"E",name:"1万袋以下"}]},{title:"农药",checkedCities:[],list:[{id:"A",name:"1万垧以上"},{id:"B",name:"5000—1万垧地"},{id:"C",name:"2000—3000垧地"},{id:"D",name:"1000—2000垧地"},{id:"E",name:"1000垧地以下"}]},{title:"化肥",checkedCities:[],list:[{id:"A",name:"10万吨以上"},{id:"B",name:"5—10万吨"},{id:"C",name:"1-5万吨"},{id:"D",name:"5000—1万吨"},{id:"E",name:"5000吨以下"}]}],checkedCities:[]},{num:"11",title:"(选填)您的种植面积",min:0,max:1,mandatory:!1,answer:[{id:"A",name:"501垧以上"},{id:"B",name:"101-500垧"},{id:"C",name:"11-100垧"},{id:"D",name:"1-10垧"},{id:"E",name:"1垧地以下"}],checkedCities:[]}]}},mounted:function(){var e=this;window.addEventListener("resize",(function(){return e.screenChanges()}),!1)},created:function(){this.screenChanges()},methods:{name:function(){var e=/^[a-zA-Z\u4E00-\uFA29]*$/;e.test(this.editForm.name)||(this.$alert("请输入正确的姓名，只能为字母或汉字！","提示",{confirmButtonText:"确定"}),this.editForm.name="")},post:function(){var e=/^[a-zA-Z\u4E00-\uFA29]*$/;e.test(this.editForm.post)||(this.$alert("请输入正确的姓名，只能为字母或汉字！","提示",{confirmButtonText:"确定"}),this.editForm.post="")},email:function(){var e=/^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/;e.test(this.editForm.email)||(this.$alert("请输入正确的邮箱！","提示",{confirmButtonText:"确定"}),this.editForm.email="")},tel:function(){/^1[345789]\d{9}$/.test(this.editForm.phoneNum)||(this.$alert("请输入正确的手机号！","提示",{confirmButtonText:"确定"}),this.editForm.phoneNum="")},screenChanges:function(){this.bannerHeight=document.documentElement.clientHeight-100},save:function(){var e=this;if(this.topicList[0]["checkedCities"].length>0&&this.topicList[1]["checkedCities"].length>0&&this.topicList[2]["checkedCities"].length>0&&this.topicList[3]["checkedCities"].length>0&&this.topicList[4]["checkedCities"].length>0&&this.topicList[5]["checkedCities"].length>0){for(var t=[],i=0;i<this.topicList.length;i++)if("undefined"!=typeof this.topicList[i]["answers"])for(var n=0;n<this.topicList[i]["answers"].length;n++)8==i&&0==n&&t.push({num:i+1,value:"[{"+this.topicList[i]["answers"][n]["checkedCities"]+"}]"}),9==i&&1==n&&t.push({num:i+1,value:"[{"+this.topicList[i]["answers"][n]["checkedCities"]+"}]"});else t.push({num:i+1,value:"[{"+this.topicList[i]["checkedCities"]+"}]"});this.editForm.questionAnswer=aes.encrypt(JSON.stringify(t));var a={questionEntity:this.editForm};api.testAxiosGet(ApiPath.url.saveQuestion,a).then((function(t){"0"==t.status&&e.$message.success(t.tips),"1"==t.status&&e.$message.success(t.tips),"2"==t.status&&e.$message.success(t.tips)})).catch((function(e){console.log(e)}))}else this.$alert("选项不能为空！","提示",{confirmButtonText:"确定"})}}},o=r,d=(i("9b9d"),i("2877")),c=Object(d["a"])(o,n,a,!1,null,null,null);t["default"]=c.exports},c8a4:function(e,t,i){},f7d1:function(e,t,i){"use strict";var n=i("c8a4"),a=i.n(n);a.a}}]);