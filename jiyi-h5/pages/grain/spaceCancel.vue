<template>
	<view>
		<HeaderSearch title="农机详情"></HeaderSearch>

		<view class="init">
			<view class="roll-out">
				<swiper class="roll" :current="current" @change="getCurrent">
					<block v-for="item in banner" :key="item">
						<swiper-item><image :src="item.url" mode="aspectFill" class="swiperImage"></image></swiper-item>
					</block>
				</swiper>
				<view class="toleft" @click="toleft()"></view>
				<view class="toright" @click="toright()"></view>
			</view>
			<view class="p-x-10 b-t content-box">
				<view class="title g-flex g-a-c" 收割机>
					<view class="tag f-12" style="background: #1890ff;" v-if="transactionTypeCode == '0'">收购</view>
					<view class="tag f-12" style="background: #ff0000;" v-if="transactionTypeCode == '1'">出售</view>
					<view class="tag f-12" style="background: #ff8d1a;" v-if="transactionTypeCode == '2'">出租</view>

					<view class="title g-f-1 f-21">{{ name }}</view>
					<view v-if="param == 2" class="icon g-flex g-f-column">
						<u-icon size="44" name="share"></u-icon>
						<text class="f-12">分享</text>
					</view>
				</view>
				<view class="price f-16">
					<text v-if="isFace == '0'">面议</text>
					<text v-if="isFace == '1'">￥{{ price }}元/台</text>
				</view>
				<view class="info  g-flex ">
					<view class="text g-f-1  g-a-c g-flex g-j-s-b f-12">
						<view>型号：{{ model }}</view>
						<text v-if="machineType == '0'">农机类型：玉米收割机</text>
						<text v-if="machineType == '1'">农机类型：水稻收割机</text>
						<text v-if="machineType == '2'">农机类型：玉米播种机</text>
						<text v-if="machineType == '3'">农机类型：水稻插秧机</text>
						<text v-if="machineType == '4'">农机类型：无人机喷药</text>
					</view>
				</view>
				<view class="info g-a-c g-flex g-j-s-b f-12">
					<view>
						联系人：{{ contactsUser }}
						<u-icon v-if="isMain == '0' && createUserId!=accId" name="chat" style="margin-left: 10rpx;" color="#2979ff" size="40" @click="goToImPage()"></u-icon>
					</view>
					<view>联系电话：{{ contactsPhone }}</view>
				</view>
				<view class="info f-12">
					<view>地址：{{ address }}</view>
				</view>
				<view class="space"></view>
				<view class="info info-last">
					<text class="item-info f-16">描述</text>
					<view class="item-info desc f-12">{{ descrip }}</view>
				</view>
				<view class="btn g-flex" v-if="isDisplay !== 0">
					<view class="g-f-1"><u-button @click="cencal(true)" shape="circle">取消发布</u-button></view>
					<view class="g-f-1"><u-button type="success" shape="circle" @click="updateInfo(id)">修改信息</u-button></view>
				</view>
			</view>
		</view>
		<CancelReason @confirm="confirm" :isShow="cencalIsShow" @isShow="cencal"></CancelReason>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
import HeaderSearch from '../../components/HeaderSearch/HeaderSearch.vue';
import CancelReason from '../../components/CancelReason/CancelReason.vue';
//后台路径引用
import ApiPath from '@/api/ApiPath.js';
export default {
	components: {
		HeaderSearch,
		CancelReason
	},
	data() {
		return {
			cencalIsShow: false,
			current: '0',
			param: null,
			price: '',
			company: '',
			item: [],
			banner: [],
			transactionTypeCode: '',
			machineType: '',
			labelCode: '',
			model: '',
			address: '',
			contactsUser: '',
			contactsPhone: '',
			descrip: '',
			isFace: '',
			name: '',
			reason: '',
			id: '',
			status: '',
			isDisplay: 0, //默认不显示信息
			isMain: '1',
			accId: '',
			createUserId: localStorage.getItem('userId')
		};
	},
	//页面初始化
	onLoad(e) {
		this.isMain = e.isMain;
		this.findMineId(e.id);
		this.id = e.id;
	},
	methods: {
		//查看详情
		findMineId(val) {
			let param = {
				id: val
			};
			uni.request({
				method: 'GET', //请求方式
				data: param, //请求数据
				url: ApiPath.url.findMineId, //请求接口路径
				success: res => {
					//成功返回结果方法
					if (res.data.state == 0) {
						this.transactionTypeCode = res.data.data.transactionTypeCode;
						this.machineType = res.data.data.machineType;
						this.labelCode = res.data.data.labelCode;
						this.model = res.data.data.model;
						this.address = res.data.data.address;
						this.contactsUser = res.data.data.contactsUser;
						this.contactsPhone = res.data.data.contactsPhone;
						this.descrip = res.data.data.descrip;
						this.price = res.data.data.price;
						this.isFace = res.data.data.isFace;
						this.name = res.data.data.name;
						this.accId = res.data.data.accId;
						this.createUserId = res.data.data.createUserId;
						if (this.isMain == '1') {
							if (res.data.data.status != 0 && res.data.data.status != 3) {
								this.isDisplay = 1;
							}
						} else {
							this.isDisplay = 0;
						}

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
		cencal(e) {
			this.cencalIsShow = e;
		},
		//取消发布
		confirm(val) {
			if (val == '') {
				this.$refs.uToast.show({
					title: '请输入取消原因',
					type: 'error'
				});
				return false;
			}
			let param = {
				id: this.id,
				status: this.status,
				reason: val
			};
			uni.request({
				method: 'GET', //请求方式
				data: param, //请求数据
				url: ApiPath.url.cancelPub,
				success: res => {
					if (res.data.state == 0) {
						uni.showToast({
							title: '取消发布成功！'
						});
						//取消跳转
						uni.navigateTo({
							url: '../catalog/agriculturalMachinery?index=0'
						});
					} else {
						uni.showToast({
							title: '取消发布失败，请联系管理员或重新发布！'
						});
					}
				}
			});
			this.cencalIsShow = false;
		},
		//修改信息跳转
		updateInfo(getId) {
			uni.navigateTo({
				url: '/pages/grain/machineUpdateInfo?id=' + getId
			});
		},

		//先获取当前的current
		getCurrent: function(e) {
			this.current = e.detail.current;
		},
		//向左滑动
		toleft: function() {
			if (this.current == '0') {
				this.current = this.banner.length - 1;
			} else {
				this.current = this.current - 1;
			}
		},
		//向右滑动
		toright: function() {
			if (this.current == this.banner.length - 1) {
				this.current = '0';
			} else {
				this.current = this.current + 1;
			}
		},
		goToImPage() {
			// window.location.href = "http://192.168.1.108:2001/webdemo/h5/index.html#/chat/p2p-73jl000048?uid=73jl000006&token=73jl000006";
			let token = localStorage.getItem('accId');
			let uid = localStorage.getItem('accId');
			let sid = this.accId;
			if (!localStorage.getItem('accId')) {
				let U = localStorage.getItem('userId');
				let SI = localStorage.getItem('sessionId');
				uni.showToast({
					title: '登录信息有误，请重新登录',
					icon: 'none',
					duration: 2000,
					success: () => {
						setTimeout(() => {
							uni.reLaunch({
								url: '/?U=' + U + '&SI=' + SI
							});
						}, 1000);
					}
				});
			} else if (!this.accId) {
				uni.showToast({
					title: '客服信息有误，请电话联系',
					icon: 'none',
					duration: 2000
				});
			} else {
				uni.navigateTo({
					url: `/pages/imPage/imPage?token=${token}&sid=${sid}&uid=${uid}`
				});
			}
		}
	}
};
</script>

<style lang="scss">
.init {
	.content-box {
		.title {
			padding: 10rpx 0;
			color: rgba(51, 51, 51, 1);
			font-size: 30rpx;
			line-height: 150%;
			text-align: left;
			.tag {
				width: 100rpx;
				display: block;
				line-height: 40rpx;
				color: #fff;
				padding: 8rpx;
				text-align: center;
				border-radius: 8rpx;
				margin-right: 10rpx;
			}
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
				color: #666;
				display: flex;
				justify-content: space-between;
				font-size: 28rpx;
			}
			.desc {
				color: #666;
				font-size: 26rpx;
				padding: 20rpx 50rpx;
			}
		}
		.info-last {
			padding-bottom: 20rpx;
			color: #505050;
			margin-top: 52rpx;
			min-height: 80rpx;
		}
		.btn {
			view {
				padding: 20rpx;
			}
		}
	}
	.roll-out {
		position: relative;

		.roll {
			width: 750rpx;
			height: 750rpx;
		}

		swiper-item {
			width: 100%;
			height: 100%;

			.roll-image {
				width: 750rpx;
				height: 750rpx;
			}
		}

		.toleft {
			width: 30rpx;
			height: 30rpx;
			position: absolute;
			top: 50%;
			left: 36rpx;
			border-right-color: transparent;
			border-color: #fff;
			border-width: 0 0 4px 4px;
			border-style: solid;
			transform: rotate(45deg) translateY(-50%);
		}

		.toright {
			width: 30rpx;
			height: 30rpx;
			position: absolute;
			top: 50%;
			right: 60rpx;
			border-right-color: transparent;
			border-color: #fff;
			border-width: 4px 4px 0 0;
			border-style: solid;
			transform: rotate(45deg) translateY(-50%);
		}
	}

	.labels {
		.label {
			padding: 5rpx 20rpx;
			border: 1px solid #e51c2e;
			border-radius: 30rpx;
			color: #e51c2e;
			margin-right: 20rpx;
		}
	}

	.info {
		.text {
			min-width: 50%;
		}
	}

	.space {
		width: 750rpx;
		height: 22rpx;
		background-color: rgba(229, 229, 229, 1);
		margin: 26rpx 0rpx -26rpx -20rpx;
	}
}
.swiperImage {
	width: 750rpx;
	height: 750rpx;
}
</style>
