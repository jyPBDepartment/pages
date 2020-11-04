<template>
	<view class="g-flex g-f-column">
		<HeaderSearch title="农服详情页面"></HeaderSearch>

		<swiper class="circul" indicator-dots='true' autoplay='true' interval='3000' duration='1000' circular='true'>
			<block v-for="(item,index) in banner" :key="index">
				<swiper-item class="swiperItem">
					<image :src="item.url" mode='aspectFill' class="swiperImage"></image>
				</swiper-item>
			</block>
		</swiper>
		<view class="p-x-10 b-t content-box">
			<view class="g-flex g-a-c">
				<view class="title g-f-1 f-16" style="padding:10rpx;">
					{{name}}
				</view>
			</view>
			<view class="price" style="font-size: 42rpx;margin-top: 16rpx;padding:10rpx;">
				<span v-if="isFace=='0'">面议</span>
				<span v-if="isFace=='1'">￥{{price}}元/天</span>
			</view>
			<view class="info g-f-warp g-flex" style="padding:10rpx;">
				<view class="g-flex">
					<view class="f-14" style="margin-top: 24rpx;"> 日期：{{date}}</view>
					<view class="count">共{{days}}天</view>
				</view>
				<view class="g-flex">
					<view class="f-12" style="margin-top: 24rpx;">干活地点:{{address}}</view>
				</view>
				<view class="g-flex">
					<view class="f-14" style="margin-top: 24rpx;"> 联系人: {{contactsUser}}</view>
					<view class="count">联系电话:{{contactsPhone}}</view>
				</view>
			</view>
		</view>

		<view class="footer-btn-box">
			<u-button type="error"  @click.stop :throttle-time="1000" ripple @click="preview(id)" style="margin-top: 30rpx;">立即预约</u-button>
		</view>
		<CancelReason @confirm="confirm" :isShow="cencalIsShow" @isShow="cencal"></CancelReason>
	</view>
</template>

<script>
	import CancelReason from '../../components/CancelReason/CancelReason.vue'
	import HeaderSearch from '../../components/HeaderSearch/HeaderSearch.vue'
	//后台路径引用
	import ApiPath from "@/api/ApiPath.js";
	export default {
		components: {
			CancelReason,
			HeaderSearch
		},
		data() {
			return {
				cencalIsShow: false,
				name: "",
				price: "",
				date: "",
				days: "",
				address: '',
				contactsUser: '',
				contactsPhone: '',
				beginDate: '',
				endDate: '',
				banner: [],
				id:"",
				isFace:'',

			}
		},
		onLoad(e) {
			this.transKeyWordId(e.id)
		},
		methods: {
			//查看详情
			transKeyWordId(val) {
				let param = {
					id: val,
				};
				uni.request({
					method: 'GET', //请求方式
					data: param, //请求数据
					url: ApiPath.url.transKeyWordId, //请求接口路径
					success: (res) => { //成功返回结果方法
					if (res.data.state == 0) {
						this.name = res.data.data.name
						this.price = res.data.data.price
						this.beginDate = res.data.data.beginDate
						this.endDate = res.data.data.endDate
						this.days = res.data.data.days
						this.address = res.data.data.address
						this.contactsUser = res.data.data.contactsUser
						this.id  = res.data.data.id
						this.isFace =res.data.data.isFace
						this.contactsPhone = res.data.data.contactsPhone,
						this.date = this.beginDate + "至" + this.endDate
						//查找图片
						for (var i = 0; i < res.data.dataPic.length; i++) {
							this.banner.push({
								'url': res.data.dataPic[i].picUrl
							})
						}
					}
					}

				})
			},
			preview(getId) {
				uni.navigateTo({
					url: '../grain/agriculturalAppointment?id='+getId
				})
			}
		}
	}
</script>

<style lang="scss">
	.content-box{
		padding-bottom: 120rpx;
		overflow-y: scroll;
	}
	.circul {
		width: 750rpx;
		height: 750rpx;
		// margin-top: 20rpx;

		.swiperItem {
			width: 100%;
			height: 100%;

			.swiperImage {
				width: 750rpx;
				height: 750rpx;
			}
		}
	}

	.info {
		color: #666;
		.count {
			margin: 24rpx 0rpx 0rpx 170rpx;
			font-size: 28rpx;
		}

		.text {
			min-width: 50%;
		}
	}

	.button {
		margin-top: 40rpx;
		width: 680rpx;
		border-radius: 40rpx;
		color: #fff;
	}

	.btn {
		width: 100%;

		view {
			padding: 20rpx;
		}
	}
</style>
