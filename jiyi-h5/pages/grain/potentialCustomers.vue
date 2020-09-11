<template>
	<view class="g-flex g-f-column">
		<HeaderSearch background="#e51c2e" color="#fff" title="详情"></HeaderSearch>

		<swiper class="circul" indicator-dots='true' autoplay='true' interval='5000' duration='1000' circular='true'>
			<block v-for="item in 5" :key="item">
				<swiper-item class="swiperItem">
					<image src="@/static/logo.png" mode='aspectFill' class="swiperImage"></image>
				</swiper-item>
			</block>
		</swiper>
		<view class="p-x-10">
			<view class="g-flex p-y-10 g-a-c">
				<view class="title f-14" style="width: 140rpx;">
					干活时间
				</view>
				<view class="info g-f-1" style="position: relative;">
					<!-- <u-icon name="calendar" class="input-icon"></u-icon>
					<u-input @click="dateShow = true" disabled placeholder="请选择时间" :clearable="false" :focus="true" v-model="value"
					 border height="64" /> -->
					{{farmwork.beginDate}}至{{farmwork.beginDate}}
				</view>
			</view>
			<!-- <view class="g-flex p-y-10 g-a-c">
				<view class="title f-14" style="width: 140rpx;">
					农作物类型
				</view>
				<view class=" info g-f-1" style="position: relative;">
					<u-input placeholder="请选择" v-model="value" type="select" border @click="sexShow = true" />
					<u-action-sheet :list="actionSheetList" v-model="sexShow" @click="actionSheetCallback"></u-action-sheet>
				</view>
			</view>
			<view class="g-flex p-y-10 g-a-c">
				<view class="title f-14" style="width: 140rpx;">
					农服类别
				</view>
				<view class=" info g-f-1" style="position: relative;">
					<u-input placeholder="请选择" v-model="value" type="select" border @click="sexShow = true" />
					<u-action-sheet :list="actionSheetList" v-model="sexShow" @click="actionSheetCallback"></u-action-sheet>
				</view>
			</view> -->
			<view class="g-flex p-y-10 g-a-c">
				<view class="title f-14" style=" width: 140rpx;">
					面积
				</view>
				<view class="info g-f-1" style="position: relative;">
					{{farmwork.area}}亩
				</view>
			</view>

			<view class="g-flex p-y-10 g-a-c">
				<view class="title f-14" style=" width: 140rpx;">
					干活地点
				</view>
				<view class=" info g-f-1" style="position: relative;">
					{{farmwork.workArea}}
				</view>
			</view>
			<view class="g-flex p-y-10 g-a-c">
				<view class="title f-14" style=" width: 140rpx;">
					农活价格
				</view>
				<view class="info g-f-1" style="position: relative;">
					{{farmwork.workPrice}}元
				</view>
			</view>
			<view class="g-flex p-y-10 g-a-c">
				<view class="title f-14" style=" width: 140rpx;">
					联系人
				</view>
				<view class="info g-f-1" style="position: relative;">
					{{farmwork.contactUser}}
				</view>
			</view>
			<view class="g-flex p-y-10 g-a-c">
				<view class="title f-14" style=" width: 140rpx;">
					联系电话
				</view>
				<view class="info g-f-1" style="position: relative;">
					{{farmwork.contactPhone}}
				</view>
			</view>
			<view class="btn g-flex">
				<view class="g-f-1">
				</view>
				<view class="g-f-1">
					<u-button type="error" shape="circle">确认</u-button>
				</view>

			</view>
		</view>
	</view>
</template>

<script>
	import HeaderSearch from '../../components/HeaderSearch/HeaderSearch.vue'
	//后台路径引用
	import ApiPath from "@/api/ApiPath.js";
	export default {
		components: {
			HeaderSearch
		},
		data() {
			return {
				cencalIsShow: false,
				sexShow: false,
				actionSheetList: [{
						text: '男'
					},
					{
						text: '女'
					},
					{
						text: '保密'
					}
				],
				map: '',
				value: '',
				banner: [],
				title: "水稻植保详情",
				price: "100",
				date: "2020-08-11 —— 2020-09-11",
				sum: "10",
				info: {
					area: '',
					workArea: '',
					contactUser: '',
					tel: ''
				},
				farmwork: []
			}
		},
		onLoad(e) {
			this.loadPotentialCustomer(e.id);
			this.info = {
				area: '面积：100亩',
				workArea: '干活地点：长春农安101号',
				contactUser: '联系人：小植保',
				tel: '联系电话：12345678901'
			}
		},
		methods: {
			loadPotentialCustomer(val) {
				uni.request({
					method: "GET",
					data: {
						"id": val
					},
					url: ApiPath.url.findFarmWorkById,
					success: (res) => {
						if (res.data.state == 0) {
							this.farmwork=res.data.data;
						}
					}
				})
			},
			cencal(e) {
				this.cencalIsShow = e
			},
			confirm(e) {
				console.log(e)
			},
		}

	}
</script>

<style lang="scss">
	.circul {
		width: 750rpx;
		height: 750rpx;

		.swiperItem {
			width: 100%;
			height: 100%;

			.swiperImage {
				width: 750rpx;
				height: 750rpx;
			}
		}
	}

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

	.btn {
		view {
			padding: 20rpx;
		}
	}
</style>
