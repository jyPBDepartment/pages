<template>
	<view>
		<HeaderSearch title="农机" @searchCallback="search"></HeaderSearch>
		<view class="p-x-10">
			<view class="g-flex p-y-10 g-a-c" style="border-bottom: 1rpx solid #999;">
				<span style="color: #ff0000;">*</span>
				<view class="title f-14">
					标题
				</view>
				<view class="info g-f-1" style="position: relative;">
					<u-input placeholder="输入内容(必填,不能超过10个汉字)" maxlength="10" :clearable="false" v-model="name" height="64" />
				</view>
			</view>
			<view class="g-flex p-y-10" style="border-bottom: 1rpx solid #999;">
				<span style="color: #ffffff;">*</span>
				<view class="title f-14" style="padding: 10rpx 0;">
					描述
				</view>
				<view class="info g-f-1" style="position: relative;">
					<u-input type="textarea" placeholder="请输入描述正文（最多输入500字）" :clearable="false" v-model="descrip" height="200" />
				</view>
			</view>
			<view class="g-flex p-y-10">
				<span style="color: #ff0000;">*</span>
				<view class="title f-14" style="width: 140rpx;">
					农机图片
				</view>
				<view class="info g-f-1" style="position: relative;">
					<u-upload :show-progress="false" :action="action" @on-choose-complete="onChoose" @on-remove="remove" @on-success="uploadSuccess" :file-list="fileList" max-count="5"></u-upload>
				</view>
			</view>
			<view class="g-flex p-y-10 g-a-c">
				<span style="color: #ff0000;">*</span>
				<view class="title f-14" style="line-height: 62rpx; width: 140rpx;">
					交易类型
				</view>
				<view class="info g-f-1" style="position: relative;">
					<u-radio-group v-model="transactionTypeCode" @change="radioGroupChange">
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
					<u-input placeholder="请输入机器型号" :clearable="false" :focus="true" v-model="model" border height="64"/>
				</view>
			</view>
			<view class="g-flex p-y-10 g-a-c">
				<span style="color: #ff0000;">*</span>
				<view class="title f-14" style="width: 140rpx;">
					购买时间
				</view>
				<view class="info g-f-1" style="position: relative;">
					<u-icon name="calendar" class="input-icon"></u-icon>
					<u-input @click="dateShow = true" disabled placeholder="请选择时间" :clearable="false" :focus="true" v-model="purchaseDate"
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
							<u-radio-group v-model="isFace" @change="radioGroupChange1">
								<u-radio @change="radioChange1" v-for="(item, index) in list1" :key="index" :name="item.name" :disabled="item.disabled">
									{{item.name}}
								</u-radio>
							</u-radio-group>
						</view>
					</u-col>
					<u-col>
						<view v-if="isFace == '定价'">
							<u-input style="width: 220rpx;" placeholder="输入价格" border="" v-model="price" height="64" />
							<view style="font-size:13px;margin-top: -52rpx;margin-left: 150rpx;color: #cdc4d7;">元/亩</view>
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
					<u-input placeholder="请输入联系人" :clearable="false" :focus="true" v-model="contactsUser" border height="64" />
				</view>
			</view>
			<view class="g-flex p-y-10 g-a-c">
				<span style="color: #ff0000;">*</span>
				<view class="title f-14" style=" width: 140rpx;">
					联系电话
				</view>
				<view class="info g-f-1" style="position: relative;">
					<u-input placeholder="请输入联系电话" type="number" maxlength="11"  :clearable="false" :focus="true" v-model="contactsPhone" border height="64" />
				</view>
			</view>
			<view class="g-flex p-y-10 g-a-c">
				<span style="color: #ff0000;">*</span>
				<view class="title f-14" style=" width: 140rpx;">
					区域
				</view>
				<view class=" info g-f-1" style="position: relative;">
					<u-input placeholder="请选择" v-model="address" type="select" border @click="regionaStatus = true" /></view>
			</view>
			<u-button style="margin: 40rpx;" shape="circle" type="error" @click="deploy">发布</u-button>
		</view>
		<regionalComponents v-show="regionaStatus" ref="region" @cancel="cancel" @sure="sure"/>
		<u-calendar v-model="dateShow" @change="change">
			<view slot="tooltip">
				<view class=" t-c p-y-10" style="color: #2979FF">
					请选择购买时间
				</view>
			</view>
		</u-calendar>
		<u-toast ref="uToast" />
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
				name: '',
				descrip: '',
				url: [],
				u:[],
				machineType:'',
				machineTypeName:'',
				purchaseDate:'',
				contactsUser: '',
				contactsPhone: '',
				address:'',
				model:'',
				price: '',
				transactionTypeCode:'0',
				transactionCategoryCode:'1',
				isFace:"面议",
				isFaceCode: "",
				createUser:"",
				createUserId:localStorage.getItem("userId"),
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
		onLoad() {
			setTimeout(() => {
				this.$refs.region.getScreen();
			}, 1000)
		},
		methods: {
			remove(index, lists){
				this.url.splice(index,1);
			},
			
			uploadSuccess(data, index, lists, name) {
				this.$refs.uToast.show({
					title: '上传成功',
					type: 'success',
				})
				this.url.push(data.url) ;
				this.show = false;
				this.u=this.url;
			},
			onChoose(lists, name) {
				this.show = true;
			},
			change(e) {
				this.purchaseDate=e.year+"-"+e.month+"-"+e.day;
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
			sure(data) {
				console.log(data);
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
				this.address = map;
			},
			actionSheetCallback(index){
				this.machineType= this.machineTypeList[index].value;
				this.machineTypeName=this.machineTypeList[index].text;
			},
			deploy(){				
				if (this.name == '') {
					this.$refs.uToast.show({
						title: '请输入标题',
						type: 'error',
					})
					return false;
				}
				if (this.url == '') {
					this.$refs.uToast.show({
						title: "请上传图片",
						type: 'error',
					})
					return false;
				}
				
				if (this.transactionTypeCode == '') {
					this.$refs.uToast.show({
						title: "请选择交易类型",
						type: 'error',
					})
					return false;
				}
				
				if (this.machineType == '') {
					this.$refs.uToast.show({
						title: "请选择机器类型",
						type: 'error',
					})
					return false;
				}
				
				if (this.model == '') {
					this.$refs.uToast.show({
						title: "请输入机器型号",
						type: 'error',
					})
					return false;
				}
				if(!/[0-9]+[a-zA-Z]+[0-9a-zA-Z]*|[a-zA-Z]+[0-9]+[0-9a-zA-Z]*/g.test(this.model)){
					this.$refs.uToast.show({
						title: "请输入正确的机器型号",
						type: 'error',
					})
					return false;
				}
				if (this.purchaseDate == '') {
					this.$refs.uToast.show({
						title: "请输入购买时间",
						type: 'error',
					})
					return false;
				}
				
				if(this.isFace=="定价"){
					if(!/^\d+(\.\d{1})?$/.test(this.price)){
						this.$refs.uToast.show({
							title: "价格小数点后保留一位小数",
							type: 'error',
						})
						return false;
					}
				}else{
					this.price ="0"
				}
				if (this.contactsUser == '') {
					this.$refs.uToast.show({
						title: "请输入联系人",
						type: 'error',
					})
					return false;
				}
				
				if (this.contactsPhone == '') {
					this.$refs.uToast.show({
						title: "请输入联系电话",
						type: 'error',
					})
					return false;
				}
				if (!/^1[345789]\d{9}$/.test(this.contactsPhone)) {
				     this.$refs.uToast.show({
				      title: "请输入正确的联系电话",
					  type: 'error',
				     })
				     return false;
				    }
				
				if (this.address == '') {
					this.$refs.uToast.show({
						title: "请选择区域",
						type: 'error',
					})
					return false;
				}
				
				//判断类型，并解析码值
				for (let i = 0; i < this.list.length; i++) {
					if (this.list[i].name == this.transactionTypeName) {
						this.transactionTypeCode = this.list[i].value;
						this.transactionTypeName = this.list[i].name;
					}
				}
				
				//判断是否面议，并解析码值
				for (let j = 0; j < this.list1.length; j++) {
					if (this.list1[j].name == this.isFace) {
						this.isFaceCode = this.list1[j].value;
						this.isFace = this.list1[j].name;
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
					name: this.name,
					descrip: this.descrip,
					url:this.u,
					machineType:this.machineType,
					purchaseDate:this.purchaseDate,
					contactsUser: this.contactsUser,
					contactsPhone: this.contactsPhone,
					address:this.address,
					transactionTypeCode:this.transactionTypeCode,
					isFace:this.isFaceCode,
					model:this.model,
					price:this.price,
					transactionCategoryCode:this.transactionCategoryCode,
					createUser:this.createUser,
					createUserId:this.createUserId,
					addItem:addItem,
				}
				uni.request({
					method: 'GET', //请求方式
					data:param,//请求数据
					url:ApiPath.url.deploy,//请求接口路径
					success: (res) => {//成功返回结果方法
					if (res.data.state == 0) {
						uni.showToast({
							title: "发布信息成功,等待审核通过"
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
