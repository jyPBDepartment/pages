<template>
	<view style="background-color: #f4f4f4" class="u-skeleton">
		<!-- <view><u-button @click="sums">sum</u-button></view> -->
		<HeaderSearch class="header-t u-skeleton-rect" :disabled="true" @searchCallback="search" :goBackHome="true"></HeaderSearch>
		<!-- <HeaderSearch :disabled="true" @searchCallback="search" :showMsg="true"></HeaderSearch> -->
		<FoodstuffPrice v-if="showCharts" class="charts-box u-skeleton-fillet"></FoodstuffPrice>
		<view class="content u-skeleton">
			<view class="btn comm-border u-skeleton-fillet">
				<view class="box u-skeleton-rect" @click="jump(item, index)" v-for="(item, index) in btnList" :key="index">
					<view class="modular" :style="{ 'background-color': item.backgroundColor }"><image :lazy-load="true" :src="item.url" mode=""></image></view>
					<p>{{ item.name }}</p>
				</view>
			</view>
			<!-- <view class="appointment comm-border u-skeleton-fillet">
				<view class="title u-skeleton-rect">
					<view class="name">农服预约</view>
					<view class="more" @click="moreNf">更多</view>
					<u-icon class="more" @click="moreNf" name="arrow-right"></u-icon>
				</view>
				<view class="preview u-skeleton-rect">
					<view v-if="!nfList.length" style="width: 100%; line-height: 140rpx" class="f-16 t-c">暂无数据</view>
					<view class="buju" @click="detailsNf(item.id)" v-for="(item, index) in nfList" :key="index">
						<view class="img"><easy-loadimage class="preview-img" :scroll-top="scrollTop" :image-src="item.url"></easy-loadimage></view>
						<p class="text f-14">{{ item.name }}</p>
						<p class="text f-12 address">{{ item.address }}</p>
					</view>
				</view>
			</view> -->
			<view class="appointment comm-border u-skeleton-fillet">
				<view class="title u-skeleton-rect">
					<u-icon size="32" name="http://60.205.246.126/images/2021/01/07/1610010262142198.png"></u-icon>
					<view class="name">粮食买卖</view>
					<view class="more" @click="moreMm">更多</view>
					<u-icon class="more" @click="moreMm" name="arrow-right"></u-icon>
				</view>
				<view class="preview u-skeleton-rect">
					<view v-if="!mmList.length" style="width: 100%; line-height: 140rpx" class="f-16 t-c">暂无数据</view>
					<view class="buju" @click="detailsMm(item.id)" v-for="(item, index) in mmList" :key="index">
						<view class="img"><easy-loadimage class="preview-img" :scroll-top="scrollTop" :image-src="item.url"></easy-loadimage></view>
						<p class="text f-12 o-e" style="line-height: 32rpx; margin-top: 20rpx">{{ item.name }}</p>
					</view>
				</view>
			</view>
			<view class="appointment comm-border u-skeleton-fillet">
				<view class="title u-skeleton-rect">
					<u-icon size="32" name="http://60.205.246.126/images/2021/01/07/1610010402851693.png"></u-icon>
					<view class="name">农机</view>
					<view class="more" @click="moreNj">更多</view>
					<u-icon class="more" @click="moreNj" name="arrow-right"></u-icon>
				</view>
				<view class="preview u-skeleton-rect">
					<view v-if="!NjList.length" style="width: 100%; line-height: 140rpx" class="f-16 t-c">暂无数据</view>
					<view class="buju" @click="detailsNj(item.id)" v-for="(item, index) in NjList" :key="index">
						<view class="img">
							<view class="tag f-12 t-c" :style="{ 'background-color': item.bgColorTag }">{{ item.transactionTypeCode }}</view>
							<easy-loadimage class="preview-img" :scroll-top="scrollTop" :image-src="item.url"></easy-loadimage>
						</view>
						<p class="text f-12 o-e" style="line-height: 32rpx; margin-top: 20rpx">{{ item.name }}</p>
					</view>
				</view>
			</view>
			<view class="appointment comm-border u-skeleton-fillet">
				<view class="title u-skeleton-rect">
					<u-icon size="32" name="http://60.205.246.126/images/2021/01/07/1610010449566342.png"></u-icon>
					<view class="name">病虫害</view>
					<view class="more" @click="moreCh">更多</view>
					<u-icon class="more" @click="moreCh" name="arrow-right"></u-icon>
				</view>
				<view class="preview u-skeleton-rect">
					<view v-if="!ChList.length" style="width: 100%; line-height: 140rpx" class="f-16 t-c">暂无数据</view>
					<view class="buju u-skeleton-rect" @click="detailsCh(item.id)" v-for="(item, index) in ChList" :key="index">
						<view class="img"><easy-loadimage class="preview-img" :scroll-top="scrollTop" :image-src="item.url"></easy-loadimage></view>
						<p class="text f-14">{{ item.name }}</p>
					</view>
				</view>
			</view>
		</view>
		<u-mask :show="show" :mask-click-able="maskAble"></u-mask>
		<!-- <view class="comm-skeleton u-skeleton" v-if="loading">
			<view class="out-view u-skeleton-fillet" v-for="i in 5" :key="i"><view class="item u-skeleton-fillet"></view></view>
		</view> -->
		<u-skeleton :loading="loading" :animation="true" bgColor="#FFF"></u-skeleton>
	</view>
</template>

<script>
import Interface from '@/api/ApiPath.js';
import FoodstuffPrice from '@/components/FoodstuffPrice/FoodstuffPrice.vue';
import HeaderSearch from '@/components/HeaderSearch/HeaderSearch.vue';
import MD5 from '../../../utils/md5.js';
import { initImSDK } from '../../../utils/initNIM.js';
import easyLoadimage from '@/components/easy-loadimage/easy-loadimage.vue';

export default {
	components: {
		HeaderSearch,
		FoodstuffPrice,
		easyLoadimage
	},
	data() {
		return {
			loading: true,
			btnList: [],
			nfList: [],
			mmList: [],
			NjList: [],
			ChList: [],
			show: true,
			maskAble: false,
			showCharts: true,
			scrollTop: 0
		};
	},
	onPageScroll({ scrollTop }) {
		// 传入scrollTop值并触发所有easy-loadimage组件下的滚动监听事件
		this.scrollTop = scrollTop;
	},
	onLoad(e) {
		// 从外部接口获取客户信息
		this.initCustomerInfo(e);
	},
	onReady() {
		setTimeout(() => {
			this.loading = false;
		}, 1000);
	},
	onShow() {
		// 初始化加载模块信息
		this.initModuleInfo();
		// 初始化加载农服预约信息
		// this.initAgriInfo();
		// 初始化加载粮食买卖信息
		this.initGrainInfo();
		// 初始化加载农机信息
		this.initAgriMachineInfo();
		// 初始化加载病虫害信息
		this.initCaseInfo();
		// this.showCharts = false;
		// // setTimeout(() => {
		// 	this.showCharts = true;
		// });
	},
	methods: {
		// 从外部接口获取客户信息
		async initCustomerInfo(e) {
			// Interface.common.userId = e.U; //缓存用户id
			// Interface.common.sessionId = e.SI; //缓存sessionId

			// localStorage.setItem('userId', e.U);
			// localStorage.setItem('sessionId', e.SI);

			// 测试
			localStorage.setItem('userId', '20200909');
			localStorage.setItem('sessionId', '8900212315182333952');
			localStorage.setItem('nickName', '小米1');
			localStorage.setItem('pic', 'http://60.205.246.126/images/2021/01/15/1610696168592617.png');

			let us = localStorage.getItem('userId');
			let ss = localStorage.getItem('sessionId');
			// alert("昵称："+Interface.common.nc)

			// localStorage.setItem('accId', '73jl000006');
			// initImSDK('73jl000006', '73jl000006');

			let s = us + '+' + ss + '+' + Interface.md5.key;
			let sign = MD5(s).toUpperCase();
			let param = {
				PTN: 'P101999',
				U: us,
				SI: ss,
				S: sign
			};

			// console.log(JSON.stringify(param));
			await uni.request({
				method: 'POST',
				url: Interface.extendUrl.findCustmerInfo,
				data: param,
				header: {
					'Content-Security-Policy': 'upgrade-insecure-requests'
				},
				success: res => {
					console.log(JSON.stringify(res));
					let code = res.data.RETURNRESULT.RESULT;
					let message = res.data.RETURNRESULT.RETCODE;

					if (code == '1') {
						// alert("成功返回")
						// 昵称
						Interface.common.nc = res.data.RETURNRESULT.NN;
						// alert("昵称："+Interface.common.nc)
						localStorage.setItem('nickName', res.data.RETURNRESULT.NN);
						localStorage.setItem('pic', res.data.RETURNRESULT.UPU);
						localStorage.setItem('accId', res.data.RETURNRESULT.YXAID);
						// 初始化IM 获取未读消息数量
						initImSDK(res.data.RETURNRESULT.YXAID, res.data.RETURNRESULT.YXTOK);
					}
					if (code == '-1') {
						// alert("失败")
					}
					if (code == '0') {
						// alert("处理中")
					}
					if (code == '2') {
						// alert("异常")
					}
				}
			});
		},
		// 初始化加载模块信息
		async initModuleInfo() {
			await uni.request({
				url: Interface.url.findModuleOn,
				method: 'GET',
				data: {},
				success: res => {
					if (res.data.state == 0) {
						this.btnList = res.data.data.map(item => {
							if (item.url != '') {
								item.url = item.url.split(',')[0];
							}
							return item;
						});
						this.show = false;
					}
				},
				fail: err => {
					uni.showToast({
						title: '系统初始化失败，请联系管理员'
					});
					this.show = false;
				}
			});
		},
		// 初始化农服预约信息
		async initAgriInfo() {
			await uni.request({
				url: Interface.url.findNewInfo,
				method: 'GET',
				data: {
					type: 0
				},
				success: res => {
					if (res.data.state == 0) {
						this.nfList = res.data.data.map(item => {
							if (item.address.indexOf('内蒙古') > -1) {
								item.address = '内蒙古';
							} else {
								let address = item.address.split('/');
								item.address = address[1] + '.' + address[2];
							}
							if (item.url != '') {
								item.url = item.url.split(',')[0];
							}
							return item;
						});
						this.show = false;
					}
				},
				fail: err => {
					uni.showToast({
						title: '系统初始化失败，请联系管理员'
					});
					this.show = false;
				}
			});
		},
		// 初始化加载粮食买卖信息
		async initGrainInfo() {
			await uni.request({
				url: Interface.url.findNewInfo,
				method: 'GET',
				data: {
					type: 1
				},
				success: res => {
					if (res.data.state == 0) {
						this.mmList = res.data.data.map(item => {
							if (item.url != '') {
								item.url = item.url.split(',')[0];
							}
							return item;
						});
						this.show = false;
					}
				},
				fail: err => {
					uni.showToast({
						title: '系统初始化失败，请联系管理员'
					});
					this.show = false;
				}
			});
		},
		// 初始化加载农机信息
		async initAgriMachineInfo() {
			await uni.request({
				url: Interface.url.findNewInfo,
				method: 'GET',
				data: {
					type: 2
				},
				success: res => {
					if (res.data.state == 0) {
						this.NjList = res.data.data.map(item => {
							if (item.transactionTypeCode == 0) {
								item.transactionTypeCode = '收购';
								item.bgColorTag = '#1890ff';
								//
							} else if (item.transactionTypeCode == 1) {
								item.bgColorTag = '#e51c2e';
								item.transactionTypeCode = '出售';
								//
							} else if (item.transactionTypeCode == 2) {
								item.bgColorTag = '#ff8d1a';
								item.transactionTypeCode = '出租';
							} else if (item.transactionTypeCode == 3) {
								item.transactionTypeCode = '播种';
							} else if (item.transactionTypeCode == 4) {
								item.transactionTypeCode = '植保';
							} else if (item.transactionTypeCode == 5) {
								item.transactionTypeCode = '收割';
							}
							if (item.url != '') {
								item.url = item.url.split(',')[0];
							}
							return item;
						});
						this.show = false;
					}
				},
				fail: err => {
					uni.showToast({
						title: '系统初始化失败，请联系管理员'
					});
					this.show = false;
				}
			});
		},
		// 初始化加载病虫害信息
		async initCaseInfo() {
			await uni.request({
				url: Interface.url.findLatestCaseInfo,
				method: 'GET',
				data: {},
				success: res => {
					if (res.data.state == 0) {
						this.ChList = res.data.data.map(item => {
							if (item.url != '') {
								item.url = item.url.split(',')[0];
							}
							return item;
						});
					}
					this.show = false;
				},
				fail: err => {
					uni.showToast({
						title: '系统初始化失败，请联系管理员'
					});
					this.show = false;
				}
			});
		},
		//组件监听搜索内容方法
		search(e) {
			console.log(e);
		},
		/**
		 * 模块功能跳转
		 * 根据不同模块路径跳转相关主页
		 * */
		jump(item, index) {
			if (item.tabMode != 0) {
				uni.navigateTo({
					url: item.routeUrl
				});
			} else {
				uni.switchTab({
					url: item.routeUrl
				});
			}
		},
		moreNf() {
			uni.switchTab({
				url: '/pages/tabbar/service/index'
			});
		},
		moreMm() {
			uni.navigateTo({
				url: '/pages/catalog/grainTrade'
			});
		},
		moreNj() {
			uni.navigateTo({
				url: '/pages/catalog/sellAgriculturalMachinery'
			});
		},
		moreCh() {
			uni.navigateTo({
				url: '/pages/catalog/findDisease'
			});
		},
		// 农服详情跳转
		detailsNf(val) {
			uni.navigateTo({
				url: '/pages/grain/paddy?id=' + val
			});
		},
		// 粮食买卖详情跳转
		detailsMm(val) {
			uni.navigateTo({
				url: '/pages/grain/space?id=' + val + '&isMain=0' + '&type=0'
			});
		},
		// 农机详情跳转
		detailsNj(val) {
			uni.navigateTo({
				url: '/pages/grain/spaceCancel?id=' + val + '&isMain=0'
			});
		},
		// 病虫害详情跳转
		detailsCh(val) {
			uni.navigateTo({
				url: '/pages/grain/richText?id=' + val
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.header-t {
	min-height: 80rpx;
}
.charts-box {
	margin: 20rpx;
	border-radius: 10rpx;
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
	background: #ffffff;
	min-height: 600rpx;
}
.content {
	padding: 0 20rpx 20rpx 20rpx;
	min-height: 1000rpx;
}
.btn {
	display: flex;
	flex-wrap: wrap;
	background: #fff;
	padding: 20rpx;
	min-height: 200rpx;
	.box {
		flex: 1;
		min-width: 20%;
		max-width: 20%;
		display: flex;
		flex-direction: column;
		align-items: center;

		.modular {
			border-radius: 28rpx;
			overflow: hidden;
			width: 100rpx;
			height: 100rpx;
			display: flex;
			justify-content: center;
			align-items: center;

			image {
				width: 100%;
				height: 100%;
			}
		}

		p {
			font-size: 22rpx;
			text-align: center;
			line-height: 40rpx;
			margin-top: 20rpx;
			font-weight: 600;
			color: #000000;
		}
	}
}

.appointment {
	margin-top: 20rpx;
	padding: 20rpx;
	background: #fff;
	box-sizing: border-box;
	min-height: 400rpx;
	.title {
		display: flex;
		line-height: 58rpx;
		font-size: 32rpx;
		color: rgba(0, 0, 0, 1);
		border-bottom: 1px$comm-border-color solid;
		.name {
			flex: 1;
			font-weight: 600;
			margin-left: 10rpx;
		}
		.more {
			font-size: 28rpx;
			color: #5eb14e;
		}
	}
}

.preview {
	display: flex;
	flex-wrap: nowrap;
	padding: 20rpx 0 0 0;
	justify-content: flex-start;

	.buju {
		margin-right: 16rpx;
		width: 210rpx;
		padding: 0 0 20rpx 0;
		.text {
			white-space: nowrap;
			max-width: 210rpx;
			overflow: hidden;
			text-overflow: ellipsis;
			margin-top: 10rpx;
			font-size: 24rpx;
			font-weight: 600;
			line-height: 15px;
			color: #000000;
			opacity: 1;
		}

		.text:hover {
			text-overflow: inherit;
			overflow: visible;
		}

		.img {
			width: 210rpx;
			height: 230rpx;
			position: relative;
			overflow: hidden;
			position: relative;
			border-radius: 20rpx;

			.tag {
				position: absolute;
				z-index: 9;
				border-radius: 10rpx;
				color: #fff;
				top: 0;
				left: 0;
				background: red;
				width: 72rpx;
				line-height: 40rpx;
				font-size: 24rpx;
			}

			.preview-img {
				width: 100%;
				height: 100%;
				border-radius: 20rpx;
			}

			.number {
				position: absolute;
				bottom: 0;
				right: 30rpx;

				image {
					width: 28rpx;
					height: 28rpx;
				}
			}
		}
		.address {
			line-height: 42rpx;
		}
	}
}
</style>
