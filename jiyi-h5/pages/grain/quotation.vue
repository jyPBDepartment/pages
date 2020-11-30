<template>
	<view class="quotation-container">
		<!-- 粮价行情 -->
		<HeaderSearch title="粮价行情"></HeaderSearch>
		<FoodstuffPrice typeFrom="1" ref="price" @cityChang="cityChang"></FoodstuffPrice>
		<u-line></u-line>
		<view class=""></view>
		<view class="price-calculation">
			<view class="header">{{ rangStr }}潮粮价格计算：</view>
			<view class="content">
				<view class="comm-form-container left">
					<view class="item">
						<view class="title">潮粮水分：</view>
						<view class="info">
							<u-input
								placeholder="请输入14-30之间的整数"
								:custom-style="{ 'padding-right': '10rpx' }"
								input-align="right"
								placeholder-style="font-size:24rpx"
								:clearable="false"
								v-model="grainMoisture"
							/>
							<view style="line-height: 70rpx;margin-left: 10rpx;">%</view>
						</view>
					</view>
					<view class="item">
						<view class="title">折扣比例：</view>
						<view class="info" @click="showSelect(4)">
							<u-input
								style="z-index: -1;"
								:custom-style="{ 'padding-right': '10rpx' }"
								v-model="ratioValue"
								input-align="right"
								placeholder="请选择折扣比例"
								type="select"
							/>
							<u-action-sheet :list="ratio" v-model="ratioShow" @click="selectedRatio"></u-action-sheet>
						</view>
					</view>
					<view class="item">
						<view class="title">潮粮价格：</view>
						<view class="info">
							<u-input :custom-style="{ color: '#FA3534', 'font-size': '32rpx' }" input-align="right" disabled :clearable="false" v-model="grainPrice" />
							<view style="line-height: 70rpx;margin-left: 10rpx;">元</view>
						</view>
					</view>
				</view>
				<view class="right"><u-button class="btn" :ripple="true" type="success" @click="calculationPrice">计算</u-button></view>
			</view>
		</view>
		<view class="only-comment">
			<view class="header">
				<view class="name">独家点评</view>
				<view class="more" @click="goMore">
					更多
					<u-icon name="arrow-right" color="#999" size="30"></u-icon>
				</view>
			</view>
			<view class="content">
				<view class="item" v-for="(item, i) in dataList" :key="i" @click="goDetails(item.id)">
					<text class="name">{{ item.section.name || '' }}</text>
					<text class="title">{{ item.title }}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import HeaderSearch from '../../components/HeaderSearch/HeaderSearch.vue';
import FoodstuffPrice from '@/components/FoodstuffPrice/FoodstuffPrice.vue';
import ApiPath from '@/api/ApiPath.js';

export default {
	components: { HeaderSearch, FoodstuffPrice },
	data() {
		return {
			dataList: [],
			grainPrice: '0',
			grainMoisture: '',
			ratioValue: '',
			rangStr: '吉林省',
			ratioShow: false,
			ratio: [
				{
					text: '1'
				},
				{
					text: '1.1'
				},
				{
					text: '1.2'
				},
				{
					text: '1.3'
				}
			]
		};
	},
	onShow() {
		setTimeout(() => {
			this.getArticleList();
		});
	},
	methods: {
		getPrice() {
			return this.$refs.price.getPrice();
		},
		calculationPrice() {
			let reg = /^[1-9]\d*$/;
			if (!this.grainMoisture) {
				uni.showToast({
					title: '请输入潮粮水分值',
					icon: 'none'
				});
			} else {
				if (!reg.test(this.grainMoisture)) {
					uni.showToast({
						title: '潮粮水分应为整数',
						icon: 'none'
					});
				} else {
					if (this.grainMoisture < 14 || this.grainMoisture > 30) {
						uni.showToast({
							title: '潮粮水分应为14-30',
							icon: 'none'
						});
					} else {
						if (!this.ratioValue) {
							uni.showToast({
								title: '请选择折扣比例',
								icon: 'none'
							});
							this.ratioShow = true;
						} else {
							let priceArr = this.getPrice();
							let max = (((100 - (parseInt(this.grainMoisture) - 14) * parseFloat(this.ratioValue)) / 100) * parseFloat(priceArr[1])).toFixed(2);
							let min = (((100 - (parseInt(this.grainMoisture) - 14) * parseFloat(this.ratioValue)) / 100) * parseFloat(priceArr[0])).toFixed(2);
							this.grainPrice = `${min}~${max}`;
						}
					}
				}
			}
		},
		cityChang(str) {
			this.rangStr = str;
		},
		showSelect(val) {
			if (val == 4) {
				this.ratioShow = true;
			}
		},
		selectedRatio(i) {
			this.ratioValue = this.ratio[i].text;
			// this.calculationPrice();
		},
		getArticleList() {
			let self = this;
			this.$ajax(ApiPath.url.findArticleInfo, 'GET', {})
				.then(res => {
					if (res.code == 200) {
						let arr = res.data;
						self.dataList = arr;
					}
				})
				.catch(err => {});
		},
		goMore() {
			uni.navigateTo({
				url: '/pages/grain/commentList'
			});
		},
		goDetails(id) {
			uni.navigateTo({
				url: '/pages/grain/commentDetails?commentId=' + id
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.quotation-container {
	.search-top {
		display: flex;
		padding: 10rpx 20rpx;
		border-bottom: 1rpx solid #f4f4f4;
		margin-bottom: -20rpx;
		align-items: center;
		.item {
			flex: 1;
			padding: 0 20rpx;
			margin-right: 2rpx;
		}
	}
	.price-calculation {
		border-bottom: 1rpx solid #f4f4f4;
		.header {
			padding: 20rpx;
			height: 50rpx;
			color: #333;
			font-weight: 500;
			font-size: 30rpx;
		}
		.content {
			display: flex;
			padding: 0;
			.left {
				flex: 1;
				.item {
					// border: none;
				}
			}
			.right {
				display: flex;
				align-items: center;
				justify-content: center;
				width: 180rpx;
				padding: 0 20rpx;
				box-sizing: border-box;
				.btn {
					width: 140rpx;
					height: 240rpx;
					display: flex;
					align-items: center;
					justify-content: center;
					text-align: center;
					border-radius: 10rpx;
				}
			}
		}
	}
	.only-comment {
		.header {
			display: flex;
			align-items: center;
			justify-content: space-between;
			height: 80rpx;
			border-bottom: 1rpx solid #f4f4f4;
			padding: 20rpx;
			.name {
				font-size: 32rpx;
				color: #333;
				font-weight: 500;
			}
			.more {
				font-size: 28rpx;
				color: #999;
				font-weight: 500;
			}
		}
		.content {
			padding: 20rpx;
			.item {
				height: 50rpx;
				width: 100%;
				margin-bottom: 20rpx;
				> text {
					font-weight: 500;
				}
				.name {
					margin-right: 10rpx;
					font-size: 28rpx;
					color: #333;
				}
				.title {
					font-size: 24rpx;
					color: #666;
				}
			}
		}
	}
}
</style>
