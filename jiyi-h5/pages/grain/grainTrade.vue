<template>
	<view>
		<HeaderSearch title="粮食买卖" @searchCallback="search"></HeaderSearch>
		<view class="p-x-10">
			<view class="g-flex p-y-10 g-a-c" style="border-bottom: 1rpx solid #999;">
				<view class="title f-14">
					标题
				</view>
				<view class="info g-f-1" style="position: relative;">
					<u-input placeholder="输入内容" :clearable="false" v-model="name" height="64" />
				</view>
			</view>
			<view class="g-flex p-y-10" style="border-bottom: 1rpx solid #999;">
				<view class="title f-14" style="padding: 10rpx 0;">
					描述
				</view>
				<view class="info g-f-1" style="position: relative;">
					<u-input type="textarea" placeholder="请输入描述正文（最多输入500字）" :clearable="false" v-model="descrip" height="200" />
				</view>
			</view>
			<view class="setcover">
				<view class="f-14" style="line-height: 80rpx;">
					设置封面
				</view>
				<view class="img g-flex g-a-c g-j-c">
					<image src="../../static/img/tabbar/addactive.png" mode=""></image>
				</view>
			</view>
			<view class="g-flex p-y-10 g-a-c">
				<view class="title f-14" style="line-height: 62rpx; width: 140rpx;">
					类型
				</view>
				<view class="info g-f-1" style="position: relative;">
					<u-radio-group v-model="transactionTypeCode" @change="radioGroupChange">
						<u-radio @change="radioChange" v-for="(item, index) in list" :key="index" :name="item.name" :disabled="item.disabled">
							{{item.name}}
						</u-radio>
					</u-radio-group>
				</view>
			</view>
			<view class="g-flex p-y-10 g-a-c">
				<view class="title f-14" style="width: 140rpx;">
					种类
				</view>
				<view class=" info g-f-1" style="position: relative;">
					<u-input placeholder="请选择" v-model="transactionCategoryCode" type="select" border @click="sexShow = true" />
					<u-action-sheet :list="actionSheetList" v-model="sexShow" @click="actionSheetCallback"></u-action-sheet>
				</view>
			</view>
			<view class="g-flex p-y-10 g-a-c">
				<view class="title f-14" style="line-height: 62rpx; width: 140rpx;">
					价格
				</view>
				<view class="info g-f-1" style="position: relative;">
					<u-radio-group v-model="isFace" @change="radioGroupChange">
						<u-radio @change="radioChange" v-for="(item, index) in list1" :key="index" :name="item.name" :disabled="item.disabled">
							{{item.name}}
						</u-radio>
					</u-radio-group>
				</view>
				<u-input v-if="isFace == '定价'" style="width: 240rpx;" placeholder="输入价格" border="" :clearable="false" v-model="purchasingPrice" height="64" />
			</view>
			<view class="g-flex p-y-10 g-a-c">
				<view class="title f-14" style=" width: 140rpx;">
					联系人
				</view>
				<view class="info g-f-1" style="position: relative;">
					<u-input placeholder="请输入联系人" :clearable="false" :focus="true" v-model="contactsUser" border height="64" />
				</view>
			</view>
			<view class="g-flex p-y-10 g-a-c">
				<view class="title f-14" style=" width: 140rpx;">
					联系电话
				</view>
				<view class="info g-f-1" style="position: relative;">
					<u-input placeholder="请输入联系电话" :clearable="false" :focus="true" v-model="contactsPhone" border height="64" />
				</view>
			</view>
			<view class="g-flex p-y-10 g-a-c">
				<view class="title f-14" style=" width: 140rpx;">
					区域
				</view>
				<view class=" info g-f-1" style="position: relative;">
					<u-input placeholder="请选择" v-model="purchasingArea" type="select" border @click="regionaStatus = true" />
					<!-- <u-action-sheet :list="actionSheetList" v-model="sexShow" @click="actionSheetCallback"></u-action-sheet> -->
				</view>
			</view>
			<u-button style="margin: 40rpx;" shape="circle" type="error" @click="deploy">发布</u-button>
		</view>
		<regionalComponents v-show="regionaStatus" ref="region" @cancel="cancel" @sure="sure" />
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
			regionalComponents
		},
		data() {
			return {
				regionaStatus: false,
				
				name: '',
				descrip: '',
				transactionTypeCode: '买',
				transactionCategoryCode: '',
				purchasingPrice: '',
				contactsUser: '',
				contactsPhone: '',
				purchasingArea:'',
				isFace:"面议",
				list: [{
						name: '买',
						disabled: false
					},
					{
						name: '卖',
						disabled: false
					}
				],
				list1: [{
						name: '面议',
						disabled: false
					},
					{
						name: '定价',
						disabled: false
					}
				],
				sexShow: false,
				actionSheetList: [{
						text: '玉米'
					},
					{
						text: '农机'
					},
					{
						text: '水稻'
					},
					{
						text: '黄豆'
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
			radioChange(e) {
				// console.log(e);
			},
			// 选中任一radio时，由radio-group触发
			radioGroupChange(e) {
				// console.log(e);
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
				this.purchasingArea = map;
			},
			actionSheetCallback(index){
				this.transactionCategoryCode= this.actionSheetList[index].text;
			},
			//发布方法
			deploy(){
				
				// name: '',
				// descrip: '',
				// transactionTypeCode: '',
				// transactionCategoryCode: '',
				// purchasingPrice: '',
				// contactsUser: '',
				// contactsPhone: '',
				// purchasingArea:'',
				
				
				let param = {
					name: this.name,
					descrip: this.descrip,
					transactionTypeCode: this.transactionTypeCode,
					transactionCategoryCode: this.transactionCategoryCode,
					purchasingPrice: this.purchasingPrice,
					contactsUser: this.contactsUser,
					contactsPhone: this.contactsPhone,
					purchasingArea:this.purchasingArea,
				}
				// let param = {agricultural:agricultural}
				uni.request({
					method: 'GET', //请求方式
					data:param,//请求数据
					url:ApiPath.url.deploy,//请求接口路径
					success: (res) => {//成功返回结果方法
						
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
</style>
