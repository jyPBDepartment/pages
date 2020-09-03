<template>
	<view>
		<!-- search 组件监听到得参数search方法获取 -->
		<HeaderSearch disabled @searchCallback="search"></HeaderSearch>
		<FoodstuffPrice></FoodstuffPrice>
		<view class="p-x-10">
			<view class="p-y-10 btn b-t">
				<view class="box" @click="jump(item, index)" v-for="(item, index) in btnList" :key="index">
					<view class="modular" :style="{'background-color':item.backgroundColor}">
						<image :src="item.url" mode=""></image>
					</view>
					<p>{{item.name}}</p>
				</view>
			</view>
			<view class="appointment b-t">
				<view class="title">
					<view class="f-16 g-f-1">农服预约</view>
					<view class="f-14" @click="moreNf">更多</view>
					<u-icon class="f-14" @click="moreNf" name="arrow-right"></u-icon>
				</view>
				<view class="preview" @click="detailsNf">
					<view v-if="!nfList.length" style="width: 100%; line-height: 140rpx;" class="f-16 t-c">暂无数据</view>
					<view class="buju" v-for="(item, index) in nfList" :key="index">
						<view class="img">
							<image class="preview-img" :src="item.url" mode=""></image>
						</view>
						<p class="f-14 title">{{item.name}}</p>
						<p class="f-12 address">{{item.workArea}}</p>
					</view>
				</view>
			</view>
			<view class="appointment b-t">
				<view class="title">
					<view class="f-16 g-f-1">粮食买卖</view>
					<view class="f-14" @click="moreMm">更多</view>
					<u-icon class="f-14" @click="moreMm" name="arrow-right"></u-icon>
				</view>
				<view class="preview" @click="detailsMm">
					<view v-if="!mmList.length" style="width: 100%; line-height: 140rpx;" class="f-16 t-c">暂无数据</view>
					<view class="buju" v-for="(item, index) in mmList" :key="index">
						<view class="img">
							<image class="preview-img" :src="item.url" mode=""></image>
						</view>
						<p class="f-12 o-e" style="height: 47px;line-height: 23px;">{{item.name}}</p>
					</view>
				</view>
			</view>
			<view class="appointment b-t">
				<view class="title">
					<view class="f-16 g-f-1">农机</view>
					<view class="f-14" @click="moreNj">更多</view>
					<u-icon class="f-14" @click="moreNj" name="arrow-right"></u-icon>
				</view>
				<view class="preview" @click="detailsNj">
					<view v-if="!NjList.length" style="width: 100%; line-height: 140rpx;" class="f-16 t-c">暂无数据</view>
					<view class="buju" v-for="(item, index) in NjList" :key="index">
						<view class="img">
							<view class="tag f-12 t-c">{{item.transactionTypeCode}}</view>
							<image class="preview-img" :src="item.url" mode=""></image>
						</view>
						<p class="f-12 o-e" style="height: 47px;line-height: 23px;">{{item.name}}</p>
					</view>
				</view>
			</view>
			<view class="appointment b-t">
				<view class="title">
					<view class="f-16 g-f-1">病虫害</view>
					<view class="f-14" @click="moreCh">更多</view>
					<u-icon class="f-14" @click="moreCh" name="arrow-right"></u-icon>
				</view>
				<view class="preview" @click="detailsCh">
					<view v-if="!ChList.length" style="width: 100%; line-height: 140rpx;" class="f-16 t-c">暂无数据</view>
					<view class="buju" v-for="(item, index) in ChList" :key="index">
						<view class="img">
							<image class="preview-img" :src="item.url" mode=""></image>
						</view>
						<p class="f-14 title g-j-c">{{item.name}}</p>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import Interface from '@/api/ApiPath.js'
	import FoodstuffPrice from '@/components/FoodstuffPrice/FoodstuffPrice.vue'
	import HeaderSearch from '@/components/HeaderSearch/HeaderSearch.vue'
	export default {
		components: {
			HeaderSearch,
			FoodstuffPrice
		},
		data() {
			return {
				btnList: [],
				nfList: [],
				mmList: [],
				NjList: [],
				ChList: []
			};
		},
		onLoad() {
			uni.request({
				url: Interface.url.findModuleOn,
				method: "GET",
				data: {},
				success: (res) => {
					if (res.data.state == 0) {
						this.btnList = res.data.data
					}
				},
				fail: (err) => {}
			});
			uni.request({
				url: Interface.url.findNewInfo,
				method: "GET",
				data: {
					type: 0
				},
				success: (res) => {
					if (res.data.state == 0) {
						this.nfList = res.data.data.map(item => {
							let address
							if (typeof(item.workArea) == "object") {
								item.workArea = ''
								address = item.workArea
							}
							if (item.workArea.split('/').length > 1) {
								address = `${item.workArea.split('/')[0]}/${item.workArea.split('/')[1]}`
							}
							item.workArea = address
							return item
						})
					}
				},
				fail: (err) => {}
			});
			uni.request({
				url: Interface.url.findNewInfo,
				method: "GET",
				data: {
					type: 1
				},
				success: (res) => {
					if (res.data.state == 0) {
						this.mmList = res.data.data
					}
				},
				fail: (err) => {}
			});
			uni.request({
				url: Interface.url.findNewInfo,
				method: "GET",
				data: {
					type: 2
				},
				success: (res) => {
					if (res.data.state == 0) {
						this.NjList = res.data.data.map(item => {
							if (item.transactionTypeCode == 0) {
								item.transactionTypeCode = '收购'
							} else if (item.transactionTypeCode == 1) {
								item.transactionTypeCode = '出售'
							} else if (item.transactionTypeCode == 2) {
								item.transactionTypeCode = '出租'
							} else if (item.transactionTypeCode == 3) {
								item.transactionTypeCode = '播种'
							} else if (item.transactionTypeCode == 4) {
								item.transactionTypeCode = '植保'
							} else if (item.transactionTypeCode == 5) {
								item.transactionTypeCode = '收割'
							}
							return item
						})
					}
				},
				fail: (err) => {}
			});
			uni.request({
				url: Interface.url.findLatestCaseInfo,
				method: "GET",
				data: {},
				success: (res) => {
					if (res.data.state == 0) {
						this.ChList = res.data.data
					}
				},
				fail: (err) => {}
			});
		},
		methods: {
			//组件监听搜索内容方法
			search(e) {
				console.log(e)
			},
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
				})
			},
			moreNj() {
				uni.navigateTo({
					url: '/pages/catalog/sellAgriculturalMachinery'
				})
			},
			moreCh() {
				uni.navigateTo({
					url: '/pages/catalog/findDisease'
				})
			},
			detailsNf() {
				uni.navigateTo({
					url: '/pages/grain/paddy'
				})
			},
			detailsMm() {
				uni.navigateTo({
					url: '/pages/grain/space?index=0'
				})
			},
			detailsNj() {
				uni.navigateTo({
					url: '/pages/grain/space?index=1'
				})
			},
			detailsCh() {
				uni.navigateTo({
					url: '/pages/grain/richText'
				})
			},
		}
	};
</script>

<style lang="scss">
	.btn {
		display: flex;
		flex-wrap: wrap;

		.box {
			flex: 1;
			min-width: 20%;
			max-width: 20%;
			display: flex;
			flex-direction: column;
			align-items: center;
			margin-bottom: 20rpx;

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
				line-height: 56rpx;
			}
		}
	}

	.appointment {
		line-height: 82rpx;

		.title {
			display: flex;
		}
	}

	.preview {
		display: flex;
		flex-wrap: wrap;

		.buju {
			width: 210rpx;
			padding-bottom: 20rpx;
			padding-left: 10rpx;
			padding-right: 16rpx;

			.img {
				width: 210rpx;
				height: 174rpx;
				position: relative;
				overflow: hidden;
				position: relative;

				.tag {
					position: absolute;
					z-index: 9;
					border-radius: 5rpx;
					color: #fff;
					top: 2rpx;
					left: 2rpx;
					background: #ff0000;
					width: 72rpx;
					line-height: 50rpx;

				}

				.preview-img {
					width: 100%;
					height: 100%;
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

			.title {
				line-height: 32rpx;
				margin-top: 20rpx;
			}

			.address {
				line-height: 42rpx;
			}
		}
	}
</style>
