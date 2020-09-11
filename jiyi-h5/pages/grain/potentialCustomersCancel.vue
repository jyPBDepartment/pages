<template>
	<view class="g-flex g-f-column">
		<HeaderSearch background="#e51c2e" color="#fff" title="详情"></HeaderSearch>

		<swiper class="circul" indicator-dots='true' autoplay='true' interval='3000' duration='1000' circular='true'>
			<block v-for="(item,index) in banner" :key="index">
				<swiper-item class="swiperItem">
					<image :src="item.imgurl" mode='aspectFill' class="swiperImage"></image>
				</swiper-item>
			</block>
		</swiper>
		<view class="p-x-10">
			<view class="tips f-12" style="color: #e51c2e;line-height: 60rpx;">
				客户取消理由：<!-- {{farmwork.reason}} -->
			</view>
			<view class="g-flex p-y-10 g-a-c">
				<view class="title f-14" style="width: 140rpx;">
					干活时间
				</view>
				<view class="info g-f-1 f-14" style="position: relative;">
					{{farmwork.beginDate}}至{{farmwork.beginDate}}
				</view>
			</view>
			<view class="g-flex p-y-10 g-a-c">
				<view class="title f-14" style=" width: 140rpx;">
					面积
				</view>
				<view class="info g-f-1 f-14" style="position: relative;">
					{{farmwork.area}}亩
				</view>
			</view>

			<view class="g-flex p-y-10 g-a-c">
				<view class="title f-14" style=" width: 140rpx;">
					干活地点
				</view>
				<view class=" info g-f-1 f-14" style="position: relative;">
					{{farmwork.workArea}}
				</view>
			</view>
			<view class="g-flex p-y-10 g-a-c">
				<view class="title f-14" style=" width: 140rpx;">
					农活价格
				</view>
				<view class="info g-f-1 f-14" style="position: relative;">
					{{farmwork.workPrice}}元
				</view>
			</view>
			<view class="g-flex p-y-10 g-a-c">
				<view class="title f-14" style=" width: 140rpx;">
					联系人
				</view>
				<view class="info g-f-1 f-14" style="position: relative;">
					{{farmwork.contactUser}}
				</view>
			</view>
			<view class="g-flex p-y-10 g-a-c">
				<view class="title f-14" style=" width: 140rpx;">
					联系电话
				</view>
				<view class="info g-f-1 f-14" style="position: relative;">
					{{farmwork.contactPhone}}
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
				farmwork:[],				
				banner: [],
				title: "水稻植保详情",
				
				state:null

			}
		},
		onLoad(e) {
			// if(e.state){
			// 	this.state = e.state
			// }
			this.loadPotentialCustomer(e.id);
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
							console.log("222"+ res.data.data)
							//查找图片
							for (var i = 0; i < res.data.dataFarmPic.length; i++) {
								this.banner.push({
									'imgurl': res.data.dataFarmPic[i].picUrl
								})
							}
							console.log("111"+ res.data.dataFarmPic.picUrl)
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
