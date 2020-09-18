<template>
	<view>
		<HeaderSearch title="农机详情修改" @searchCallback="search"></HeaderSearch>
		<view class="p-x-10">
			<view class="g-flex p-y-10 g-a-c" style="border-bottom: 1rpx solid #999;">
				<span style="color: #ff0000;">*</span>
				<view class="title f-14">
					标题
				</view>
				<view class="info g-f-1" style="position: relative;">
					<u-input placeholder="输入内容(必填,不能超过10个汉字)" maxlength="10" :clearable="false" v-model="machine.name" height="64" />
				</view>
			</view>
			<view class="g-flex p-y-10" style="border-bottom: 1rpx solid #999;">
				<span style="color: #ffffff;">*</span>
				<view class="title f-14" style="padding: 10rpx 0;">
					描述
				</view>
				<view class="info g-f-1" style="position: relative;">
					<u-input type="textarea" placeholder="请输入描述正文（最多输入500字）" :clearable="false" v-model="machine.descrip" height="200" />
				</view>
			</view>
			<view class="g-flex p-y-10">
				<span style="color: #ff0000;">*</span>
				<view class="title f-14" style="width: 140rpx;">
					农机图片
				</view>
				<view class="info g-f-1" style="position: relative;">
					<u-upload :action="action" @on-choose-complete="onChoose" @on-remove="remove" @on-success="uploadSuccess"  list-type="picture" :file-list="fileList" :on-exceed="uploadExceed" max-count="5"></u-upload>
				</view>
			</view>
			<view class="g-flex p-y-10 g-a-c">
				<span style="color: #ff0000;">*</span>
				<view class="title f-14" style="line-height: 62rpx; width: 140rpx;">
					交易类型
				</view>
				<view class="info g-f-1" style="position: relative;">
					<u-radio-group v-model="machine.transactionTypeCode" @change="radioGroupChange">
						<u-radio @change="radioChange" v-for="(item, index) in list" :key="index" :name="item.value" :disabled="item.disabled">
							{{item.name}}
						</u-radio>
					</u-radio-group>
				</view>
			</view>
			<view class="g-flex p-y-10 g-a-c">
				<span style="color: #ff0000;">*</span>
				<view class="title f-14" style="width: 140rpx;">
					机器类型
				</view>
				<view class=" info g-f-1" style="position: relative;">
					<u-input placeholder="请选择" v-model="machineTypeName" type="select" border @click="sexShow = true" />
					<u-action-sheet :list="machineTypeList" v-model="sexShow" @click="actionSheetCallback">
					</u-action-sheet>
				</view>
			</view>
			<view class="g-flex p-y-10 g-a-c">
				<span style="color: #ff0000;">*</span>
				<view class="title f-14" style=" width: 140rpx;">
					机器型号
				</view>
				<view class="info g-f-1" style="position: relative;">
					<u-input placeholder="请输入机器型号" :clearable="false" :focus="true" v-model="machine.model" border height="64"/>
				</view>
			</view>
			<view class="g-flex p-y-10 g-a-c">
				<span style="color: #ff0000;">*</span>
				<view class="title f-14" style="width: 140rpx;">
					购买时间
				</view>
				<view class="info g-f-1" style="position: relative;">
					<u-icon name="calendar" class="input-icon"></u-icon>
					<u-input @click="dateShow = true" disabled placeholder="请选择时间" :clearable="false" :focus="true" v-model="machine.purchaseDate"
					 border height="64" />
				</view>
			</view>
		
			<view class="g-flex p-y-10 g-a-c">
				<span style="color: #ff0000;">*</span>
				<view class="title f-14" style="line-height: 62rpx; width: 140rpx;">
					价格
				</view>
				<u-row :gutter="6">
					<u-col>
						<view class="info g-f-1" style="position: relative;">
							<u-radio-group v-model="machine.isFace" @change="radioGroupChange1">
								<u-radio @change="radioChange1" v-for="(item, index) in list1" :key="index" :name="item.name" :disabled="item.disabled" :checked="item.checked">
									{{item.name}}
								</u-radio>
							</u-radio-group>
						</view>
					</u-col>
					<u-col>
						<view v-if="machine.isFace == '定价'">
							<u-input style="width: 220rpx;" placeholder="输入价格" border v-model="machine.price" height="64" />
							<view style="font-size:13px;margin-top: -52rpx;margin-left: 200rpx;color: #cdc4d7;">元/亩</view>
						</view>
					</u-col>
				</u-row>
			
			
			</view>
			<view class="g-flex p-y-10 g-a-c">
				<span style="color: #ff0000;">*</span>
				<view class="title f-14" style=" width: 140rpx;">
					联系人
				</view>
				<view class="info g-f-1" style="position: relative;">
					<u-input placeholder="请输入联系人" :clearable="false" :focus="true" v-model="machine.contactsUser" border height="64" />
				</view>
			</view>
			<view class="g-flex p-y-10 g-a-c">
				<span style="color: #ff0000;">*</span>
				<view class="title f-14" style=" width: 140rpx;">
					联系电话
				</view>
				<view class="info g-f-1" style="position: relative;">
					<u-input placeholder="请输入联系电话" type="number" maxlength="11"  :clearable="false" :focus="true" v-model="machine.contactsPhone" border height="64" />
				</view>
			</view>
			<view class="g-flex p-y-10 g-a-c">
				<span style="color: #ff0000;">*</span>
				<view class="title f-14" style=" width: 140rpx;">
					区域
				</view>
				<view class=" info g-f-1" style="position: relative;">
					<u-input placeholder="请选择" v-model="machine.address" type="select" border @click="regionaStatus = true" /></view>
			</view>
			<u-button style="margin: 40rpx;" shape="circle" type="error" @click="updateMachine">发布</u-button>
		</view>
		<regionalComponents v-show="regionaStatus" ref="region" @cancel="cancel" @sure="sure"/>
		<u-calendar v-model="dateShow" @change="change" active-bg-color="#42b983" btn-type="success">
			<view slot="tooltip">
				<view class=" t-c p-y-10" style="color: #2979FF">
					请选择购买时间
				</view>
			</view>
		</u-calendar>
		
	</view>

</template>

<script>
	import HeaderSearch from '@/components/HeaderSearch/HeaderSearch.vue'
	import regionalComponents from '../../components/regionalComponents/regionalComponents.vue'
	//后台路径引用
	import ApiPath from "@/api/ApiPath.js";
	export default {
		components: {
			HeaderSearch,
			regionalComponents,
		},
		data() {
			return {
				regionaStatus: false,
				dateShow: false,
				id:'',
				url: [],
				u:[],
				imgUrl:'',
				machine:{
					name: '',
					descrip: '',
					url: [],
					u:[],
					machineType:'',
					status:'',
					purchaseDate:'',
					contactsUser: '',
					contactsPhone: '',
					address:'',
					model:'',
					price: '',
					isFace:"面议",
					isFaceCode: "",
					createUser:"",
					createUserId:localStorage.getItem("userId"),
					transactionTypeCode: '',
					transactionCategoryCode: '',
					
				},
				// createDate:'',
				machineTypeName:'',
				action: ApiPath.url.uploadImg,
				fileList: [],
				list: [{
						value:'0',
						name: '购买',
						disabled: false
					},
					{
						value:'1',
						name: '出售',
						disabled: false
					},
					{
						value:'2',
						name: '出租',
						disabled: false
					}
				],
				list1: [{
						value:'0',
						name: '面议',
						disabled: false
					},
					{
						value:'1',
						name: '定价',
						disabled: false
					}
				],
				sexShow: false,
				machineTypeList: [{
						value:'0',
						text: '玉米收割机'
					},
					{
						value:'1',
						text: '水稻收割机'
					},
					{
						value:'2',
						text: '玉米播种机'
					},
					{
						value:'3',
						text: '水稻插秧机'
					},
					{
						value:'4',
						text: '无人机喷药'
					}
				],
			};
		},
		onLoad(e) {
			setTimeout(() => {
				this.$refs.region.getScreen();
			}, 1000)
			this.findMineId(e.id);
			this.id=e.id;
		
		},
		methods: {
			//图片
			remove(index, lists){
				this.url.splice(index,1);
			},
			
			uploadExceed(files, fileList) {
			    this.$message.error("只能上传五张图片，如需修改请先删除图片！");
			    return;
			},
			uploadSuccess(data, index, lists, name) {
				this.url.push(data.url) ;
				this.show = false;
				this.u=this.url;
				
			},
			onChoose(lists, name) {
				this.show = true;
			},
			//购买日期
			change(e) {
				this.machine.purchaseDate=e.year+"-"+e.month+"-"+e.day;
			},
			radioChange1(index){
				
			},
			radioChange(index) {
			},
			radioGroupChange1(e){
				
			},
			// 选中任一radio时，由radio-group触发
			radioGroupChange(e) {
			},
			radioChangeP(index) {
			},
			radioGroupChangeP(e) {
			},
			cancel() {
				this.regionaStatus = false;
			},
			//区域
			sure(data) {
				this.regionaStatus = false;
				let map = '';
				data.forEach(item => {
					console.log('data', item);
					if (item != '' && item != '请选择') {
						if (map != '') {
							map = map + '/' + item
						} else {
							map = item
						}
					}
				});
				this.machine.address = map;
			},
			
			actionSheetCallback(index){
				this.machineType= this.machineTypeList[index].value;
				this.machineTypeName=this.machineTypeList[index].text;
				
			},
			//修改详情信息
			updateMachine(){		
				
				if (this.machine.name == '') {
					uni.showModal({
						title: "请输入标题"
					})
					return false;
				}
				if (this.url == '') {
					uni.showToast({
						title: "请上传图片"
					})
					return false;
				}
				
				if (this.machine.transactionTypeCode == '') {
					uni.showToast({
						title: "请选择交易类型"
					})
					return false;
				}
				
				if (this.machine.machineType == '') {
					uni.showToast({
						title: "请选择机器类型"
					})
					return false;
				}
				
				if (this.machine.model == '') {
					uni.showToast({
						title: "请输入机器型号"
					})
					return false;
				}
				if(!/[0-9]+[a-zA-Z]+[0-9a-zA-Z]*|[a-zA-Z]+[0-9]+[0-9a-zA-Z]*/g.test(this.machine.model)){
					uni.showToast({
						title: "请输入正确的机器型号"
					})
					return false;
				}
				if (this.machine.purchaseDate == '') {
					uni.showToast({
						title: "请输入购买时间"
					})
					return false;
				}
				
				if(this.machine.isFace=="定价"){
					if(!/^\d+(\.\d{1})?$/.test(this.machine.price)){
						uni.showToast({
							title: "价格小数点后保留一位小数"
						})
						return false;
					}
				}else{
					this.machine.price ="0"
				}
				if (this.machine.contactsUser == '') {
					uni.showToast({
						title: "请输入联系人"
					})
					return false;
				}
				
				if (this.machine.contactsPhone == '') {
					uni.showToast({
						title: "请输入联系电话"
					})
					return false;
				}
				if (!/^1[345789]\d{9}$/.test(this.machine.contactsPhone)) {
				     uni.showToast({
				      title: "请输入正确的联系电话"
				     })
				     return false;
				    }
				
				if (this.machine.address == '') {
					uni.showToast({
						title: "请选择区域"
					})
					return false;
				}
				
				//判断类型，并解析码值
				for (let i = 0; i < this.list.length; i++) {
					if (this.list[i].name == this.machine.transactionTypeName) {
						this.machine.transactionTypeCode = this.list[i].value;
						this.transactionTypeName = this.list[i].name;
					}
				}
				
				//判断是否面议，并解析码值
				for (let j = 0; j < this.list1.length; j++) {
					if (this.list1[j].name == this.machine.isFace) {
						this.isFaceCode = this.list1[j].value;
						this.machine.isFace = this.list1[j].name;
					}
				}
				
				//传递多个图片
				let addItem = "";
				let add = [];
				for (let i = 0; i < this.u.length; i++) {
				     add.push(this.u[i]);
				 }
				 addItem = add.join(",");
				 // alert("农机>>发布人id"+ApiPath.common.userId)
				let param = {
					id:this.id,
					name: this.machine.name,
					descrip: this.machine.descrip,
					url:this.u,
					machineType:this.machineType,
					purchaseDate:this.machine.purchaseDate,
					contactsUser: this.machine.contactsUser,
					contactsPhone: this.machine.contactsPhone,
					address:this.machine.address,
					transactionTypeCode:this.machine.transactionTypeCode,
					isFace:this.isFaceCode,
					model:this.machine.model,
					price:this.machine.price,
					transactionCategoryCode:this.machine.transactionCategoryCode,
					createUser:this.machine.createUser,
					createUserId:this.machine.createUserId,
					addItem:addItem,
					status:this.machine.status,
					// createDate:this.createDate
				}
				// console.log("222"+JSON.stringify(param) )
				// return;
				uni.request({
					method: 'GET', //请求方式
					data:param,//请求数据
					url:ApiPath.url.updateMachine,//请求接口路径
					success: (res) => {//成功返回结果方法
				
					if (res.data.state == 0) {
						uni.showToast({
							title: "发布信息成功,等待审核通过",
						
						})
							
						//发布成功返回发布主页面
						setTimeout(function() {
							//跳转page目录用navigateTo，跳转tabbar用switchTab
							uni.switchTab({
								url: "../tabbar/release/index"
							})
						}, 2000)
						}else {
							uni.showToast({
								title: "发布信息失败,联系管理或重新发布"
							})
						}
					}
				})
				
			},
			findMineId(val) {
				uni.request({
					method: "GET",
					data: {
						"id": val
					},
					url: ApiPath.url.findMineId,
					success: (res) => {
						
						if(res.data.state == 0){
							let result = res.data.data;
							this.machine = result;
							for(let i =0 ;i<this.machineTypeList.length;i++){
								if(i==result.machineType){
									this.machineTypeName = this.machineTypeList[i].text;
									this.machineType = this.machineTypeList[i].value;
								}
								
							}
							
							// this.createDate=result.createDate
							if(result.isFace == "0"){
								this.machine.isFace ='面议';
							}else{
								this.machine.isFace ='定价';
								this.machine.price =result.price;								
							}
							// let url = [];
							// for(var i=0;i<res.data.dataPic.length;i++){
							// 	url.push({'url':res.data.dataPic[i]['picUrl']});
								
							// }
							
							// this.fileList=url
							let url = [];
							let path = "";
							for(let i=0;i<res.data.dataPic.length;i++){
								url.push({'url':res.data.dataPic[i]['picUrl']});
								if(i==res.data.dataPic.length){
									path=path+","+res.data.dataPic[i]['picUrl'];
								}else{
									path=path+res.data.dataPic[i]['picUrl'];
								}
								
							}
							this.fileList=url;
							this.u = path
							
						}
						
				
					},
					fail: (err) => {
			
					}
				})
			}
			
		}
	}
</script>

<style lang="scss">
	.title {
		width: 90rpx;
		color: #505050;
	}

	.img {
		width: 100%;
		height: 320rpx;
		background: #d9d9d9;

		image {
			width: 100rpx;
			height: 100rpx;
		}
	}

	.tag {
		width: 118rpx;
		height: 38rpx;
		border: 1px solid #7948ea;
		color: #7948ea;
		border-radius: 10rpx;
	}
	.input-icon {
		position: absolute;
		right: 10rpx;
		z-index: 9;
		top: 14rpx;
	}
</style>
