<template>
	<view>
		<!-- search 组件监听到得参数search方法获取 -->
		<HeaderSearch disabled @searchCallback="search"></HeaderSearch>
		<FoodstuffPrice></FoodstuffPrice>
		<view class="p-x-10">
			<view class="p-y-10 btn b-t">
				<view class="box" @click="jump(item, index)" v-for="(item, index) in btnList" :key="index">
					<view class="modular" :style="{'background-color':item.backgroundColor}">
						<image :src="item.src" mode=""></image>
					</view>
					<p>{{item.title}}</p>
				</view>
			</view>
			<view class="appointment b-t">
				<view class="title">
					<view class="f-16 g-f-1">农服预约</view>
					<view class="f-14" @click="moreNf">更多</view>
					<u-icon class="f-14" @click="moreNf" name="arrow-right"></u-icon>
				</view>
				<view class="preview" @click="detailsNf">
					<view class="buju" v-for="(item, index) in previewList" :key="index">
						<view class="img">
							<image class="preview-img" :src="item.src" mode=""></image>
							<view class="number g-flex g-a-c">
								<image class="m-r-5" src="../../../static/img/qa.png" mode=""></image>
								<span class="f-12 c-f">{{item.number}}</span>
							</view>
						</view>
						<p class="f-14 title">{{item.title}}</p>
						<p class="f-12 address">{{item.address}}</p>
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
					<view class="buju" v-for="(item, index) in previewList" :key="index">
						<view class="img">
							<image class="preview-img" :src="item.src" mode=""></image>
						</view>
						<p class="f-12 o-e" style="height: 47px;line-height: 23px;">现货供应大型玉米收割机自走式玉现货供应大型玉米收割机现货供应大型玉米收割机</p>
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
					<view class="buju" v-for="(item, index) in previewList" :key="index">
						<view class="img">
							<view class="tag f-12 t-c">出租</view>
							<image class="preview-img" :src="item.src" mode=""></image>
						</view>
						<p class="f-12 o-e" style="height: 47px;line-height: 23px;">现货供应大型玉米收割机自走式玉现货供应大型玉米收割机现货供应大型玉米收割机</p>
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
					<view class="buju" v-for="(item, index) in previewList" :key="index">
						<view class="img">
							<view v-if="item.type == 3" class="tag f-12 t-c">出租</view>
							<image class="preview-img" :src="item.src" mode=""></image>
						</view>
						<p class="f-14 title g-j-c">{{item.title}}</p>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import FoodstuffPrice from '@/components/FoodstuffPrice/FoodstuffPrice.vue'
	import HeaderSearch from '@/components/HeaderSearch/HeaderSearch.vue'
	export default {
		components: {
			HeaderSearch,
			FoodstuffPrice
		},
		data() {
			return {
				btnList: [{
						to: "/pages/tabbar/service/index",
						src: '../../../static/logo.png',
						title: '农服',
						backgroundColor: '#55be95'
					},
					{
						to: "/pages/catalog/grainTrade",
						src: '../../../static/logo.png',
						title: '粮食买卖',
						backgroundColor: '#985b3c'
					},
					{
						to: "/pages/catalog/sellAgriculturalMachinery",
						src: '../../../static/logo.png',
						title: '农机',
						backgroundColor: '#52ace8'
					}, {
						to: '/pages/catalog/findDisease',
						src: '../../../static/logo.png',
						title: '看图识病',
						backgroundColor: '#f4c343'
					}

				],
				previewList: [{
					src: '../../../static/logo.png',
					number: 280,
					title: '水稻植保',
					address: '长春市·榆树市'
				}, {
					src: '../../../static/logo.png',
					number: 280,
					title: '水稻植保',
					address: '长春市·榆树市'
				}, {
					src: '../../../static/logo.png',
					number: 280,
					title: '水稻植保',
					address: '长春市·榆树市'
				}]
			};
		},
		onLoad() {
			// console.log(11)
		},
		methods: {
			//组件监听搜索内容方法
			search(e) {
				console.log(e)
			},
			jump(item, index) {
				console.log(item.to)
				if (index != 0) {
					uni.navigateTo({
						url: item.to
					});
				} else {
					uni.switchTab({
						url: item.to
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
					url: '/pages/catalog/findDisease'
				})
			},
			moreNj() {
				uni.navigateTo({
					url: '/pages/catalog/grainTrade'
				})
			},
			moreCh() {
				uni.navigateTo({
					url: '/pages/catalog/sellAgriculturalMachinery'
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
					url:  '/pages/grain/space?index=1'
				})
			},
			detailsCh() {
				uni.navigateTo({
					url:  '/pages/grain/richText'
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
					width: 56rpx;
					height: 56rpx;
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
		justify-content: space-between;
		flex-wrap: wrap;

		.buju {
			width: 210rpx;
			padding-bottom: 20rpx;

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
				line-height: 66rpx;
			}

			.address {
				line-height: 42rpx;
			}
		}
	}
</style>
