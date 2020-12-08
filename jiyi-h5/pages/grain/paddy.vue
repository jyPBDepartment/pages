<template>
	<view class="g-flex g-f-column">
		<HeaderSearch title="农服详情页面"></HeaderSearch>
		<swiper class="circul" indicator-dots="true" autoplay="true" interval="3000" duration="1000" circular="true">
			<block v-for="(item, index) in banner" :key="index">
				<swiper-item class="swiperItem"><image :src="item.url" mode="aspectFill" class="swiperImage"></image></swiper-item>
			</block>
		</swiper>
		<view class="p-x-10 b-t content-box">
			<view class="title g-f-1 f-16 p-10">{{ name }}</view>

			<view class="price">
				<span v-if="isFace == '0'">面议</span>
				<span v-if="isFace == '1'">￥{{ price }}元/天</span>
			</view>
			<view class="info">
				<view class="item-info">
					<text class="f-14">日期：{{ date }}</text>
					<text class="f-12">共{{ days }}天</text>
				</view>
				<view class="item-info">
					<text class="f-14">干活地点:{{ address }}</text>
				</view>
				<view class="item-info">
					<view class="f-14 contactUser">联系人: {{ contactsUser }}<u-icon name="chat" color="#2979ff" size="40" class="iconStyle" top="4rpx" @tap="goToImPage"></u-icon></view>
					<text class="f-14">联系电话:{{ contactsPhone }}</text>
				</view>
			</view>
		</view>
		<view class="p-x-10"><u-button type="error" shape="circle" @click.stop :throttle-time="1000" ripple @click="preview(id)" style="margin: 24rpx 0;">立即预约</u-button></view>
		<CancelReason @confirm="confirm" :isShow="cencalIsShow" @isShow="cencal"></CancelReason>
	</view>
</template>

<script>
import CancelReason from '../../components/CancelReason/CancelReason.vue';
import HeaderSearch from '../../components/HeaderSearch/HeaderSearch.vue';
//后台路径引用
import ApiPath from '@/api/ApiPath.js';
export default {
	components: {
		CancelReason,
		HeaderSearch
	},
	data() {
		return {
			cencalIsShow: false,
			name: '',
			price: '',
			date: '',
			days: '',
			address: '',
			contactsUser: '',
			contactsPhone: '',
			beginDate: '',
			endDate: '',
			banner: [],
			id: '',
			isFace: '',
			accId:''
		};
	},
	onLoad(e) {
		this.transKeyWordId(e.id);
	},
	methods: {
		//查看详情
		transKeyWordId(val) {
			let param = {
				id: val
			};
			uni.request({
				method: 'GET', //请求方式
				data: param, //请求数据
				url: ApiPath.url.transKeyWordId, //请求接口路径
				success: res => {
					//成功返回结果方法
					if (res.data.state == 0) {
						this.name = res.data.data.name;
						this.price = res.data.data.price;
						this.beginDate = res.data.data.beginDate;
						this.endDate = res.data.data.endDate;
						this.days = res.data.data.days;
						this.address = res.data.data.address;
						this.contactsUser = res.data.data.contactsUser;
						this.id = res.data.data.id;
						this.isFace = res.data.data.isFace;
						this.accId = res.data.data.accId;
						(this.contactsPhone = res.data.data.contactsPhone), (this.date = this.beginDate + '至' + this.endDate);
						//查找图片
						for (var i = 0; i < res.data.dataPic.length; i++) {
							this.banner.push({
								url: res.data.dataPic[i].picUrl
							});
						}
					}
				}
			});
		},
		goToImPage() {
		  // window.location.href = "http://192.168.1.108:2001/webdemo/h5/index.html#/chat/p2p-73jl000048?uid=73jl000006&token=73jl000006";
		  let token = localStorage.getItem("accId");
		  let uid = localStorage.getItem("accId");
		  let sid = this.accId;
		  uni.navigateTo({
		    url: `/pages/imPage/imPage?token=${token}&sid=${sid}&uid=${uid}`,
		  });
		},
		preview(getId) {
			uni.navigateTo({
				url: '../grain/agriculturalAppointment?id=' + getId
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.content-box {
	.title {
		color: rgba(51, 51, 51, 1);
		font-size: 30rpx;
		line-height: 150%;
		text-align: left;
	}
	.price {
		font-size: 42rpx;
		margin-top: 16rpx;
		padding: 10rpx;
	}
	.info {
		color: #999;
		padding: 10rpx;
		.item-info {
			display: flex;
			justify-content: space-between;
			font-size: 28rpx;
			margin-top: 24rpx;
			.contactUser{
				margin-top: -4rpx;
				.iconStyle{
					margin-left: 10rpx;
				}
			}
			
		}
	}
}
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
</style>
