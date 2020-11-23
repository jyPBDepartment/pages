<template>
	<view class="quotation-container">
		<HeaderSearch title="粮价行情"></HeaderSearch>
		<view class="search-top">
			<view class="item">
				<u-input v-model="province" placeholder="请选择" type="select" @click="showProvince = true" />
				<u-action-sheet :list="cityList" v-model="showProvince" @click="selectedProvince"></u-action-sheet>
			</view>
			<view class="item">
				<u-input v-model="city" placeholder="请选择" type="select" @click="showCity = true" />
				<u-action-sheet :list="cityList" v-model="showCity" @click="selectedCity"></u-action-sheet>
			</view>
			<view class="item">
				<u-input v-model="area" placeholder="请选择" type="select" @click="showArea = true" />
				<u-action-sheet :list="cityList" v-model="showArea" @click="selectedArea"></u-action-sheet>
			</view>
		</view>
		<FoodstuffPrice typeFrom="1"></FoodstuffPrice>
		<u-line></u-line>
		<view class=""></view>
		<view class="price-calculation">
			<view class="header">潮粮价格计算：</view>
			<view class="content">
				<view class="comm-form-container left">
					<view class="item">
						<view class="title">潮粮水分</view>
						<view class="info"><u-input placeholder="输入内容(最多输入10字)" :clearable="false" v-model="name" maxlength="10" /></view>
					</view>
					<view class="item">
						<view class="title">折扣比例</view>
						<view class="info">
							<u-input v-model="area" placeholder="请选择" type="select" @click="showArea = true" />
							<u-action-sheet :list="cityList" v-model="showArea" @click="selectedArea"></u-action-sheet>
						</view>
					</view>
					<view class="item">
						<view class="title">潮粮价格</view>
						<view class="info"><u-input disabled :clearable="false" v-model="name" maxlength="10" /></view>
					</view>
				</view>
				<view class="right"><u-button class="btn" :ripple="true" ripple-bg-color="#909399" type="primary">计算</u-button></view>
			</view>
		</view>
		<view class="only-comment">
			<view class="header">
				<view class="name">独家点评</view>
				<view class="more">
					更多
					<u-icon name="arrow-right" @tap="goMore" color="#999" size="30"></u-icon>
				</view>
			</view>
			<view class="content"><view class="item" v-for="i in 3" :key="i"></view></view>
		</view>
	</view>
</template>

<script>
import HeaderSearch from '../../components/HeaderSearch/HeaderSearch.vue';
import FoodstuffPrice from '@/components/FoodstuffPrice/FoodstuffPrice.vue';

export default {
	components: { HeaderSearch, FoodstuffPrice },
	data() {
		return {
			city: '',
			province: '',
			area: '',
			showCity: false,
			showProvince: false,
			showArea: false,
			cityList: [
				{
					text: '吉林省'
				},
				{
					text: '辽宁省'
				},
				{
					text: '黑龙江省'
				},
				{
					text: '内蒙古'
				}
			],
			name: '111'
		};
	},
	methods: {
		selectedCity(index) {
			this.city = this.cityList[index].text;
		},
		selectedProvince(index) {
			this.province = this.cityList[index].text;
		},
		selectedArea(index) {
			this.area = this.cityList[index].text;
		},
		goMore() {}
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
		.item {
			flex: 1;
			padding: 0 20rpx;
		}
	}
	.price-calculation {
		border-bottom: 1rpx solid #f4f4f4;
		.header {
			padding:20rpx;
			height: 50rpx;
			color: #666;
			font-size: 32rpx;
		}
		.content {
			display: flex;
			padding: 0;
			.left {
				flex: 1;
			}
			.right {
				display: flex;
				align-items: center;
				justify-content: center;
				width: 150rpx;
				.btn {
					width: 140rpx;
					height: 200rpx;
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
				background: #19be6b;
				margin-bottom: 20rpx;
			}
		}
	}
}
</style>
