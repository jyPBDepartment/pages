<template>
	<view class="quotation-container">
		<!-- 粮价行情 -->
		<HeaderSearch title="粮价行情"></HeaderSearch>
		<view class="search-top">
			<view class="item" @tap="showSelect(1)">
				<u-input input-align="center" style="z-index: -1;" v-model="province" placeholder="请选择" type="select" />
				<u-action-sheet :list="cityList" v-model="showProvince" @click="selectedProvince"></u-action-sheet>
			</view>
			<u-line length="50" color="#f2f2f2" direction="col"></u-line>
			<view class="item" @tap="showSelect(2)">
				<u-input style="z-index: -1;" input-align="center" v-model="city" placeholder="请选择" type="select" />
				<u-action-sheet :list="cityList" v-model="showCity" @click="selectedCity"></u-action-sheet>
			</view>
			<u-line length="50" color="#f2f2f2" direction="col"></u-line>
			<view class="item" @tap="showSelect(3)">
				<u-input style="z-index: -1;" input-align="center" v-model="area" placeholder="请选择" type="select" />
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
						<view class="info"><u-input placeholder="输入数字最多两位小数" :clearable="false" v-model="grainMoisture" border /></view>
					</view>
					<view class="item">
						<view class="title">折扣比例</view>
						<view class="info" @tap="showSelect(4)">
							<u-input style="z-index: -1;" v-model="ratioValue" placeholder="请选择" type="select" border />
							<u-action-sheet :list="ratio" v-model="ratioShow" @click="selectedRatio"></u-action-sheet>
						</view>
					</view>
					<view class="item">
						<view class="title">潮粮价格</view>
						<view class="info"><u-input disabled :clearable="false" v-model="grainPrice" border /></view>
					</view>
				</view>
				<view class="right"><u-button class="btn" :ripple="true" ripple-bg-color="#f90" type="success" @click="calculationPrice">计算</u-button></view>
			</view>
		</view>
		<view class="only-comment">
			<view class="header">
				<view class="name">独家点评</view>
				<view class="more" @tap="goMore">
					更多
					<u-icon name="arrow-right"  color="#999" size="30"></u-icon>
				</view>
			</view>
			<view class="content">
				<view class="item" v-for="(item, i) in dataList" :key="i" @tap="goDetails">
					<text class="name">{{ item.name }}</text>
					<text class="title">{{ item.title }}</text>
				</view>
			</view>
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
			province: '吉林省',
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
			grainPrice: '0',
			grainMoisture:'',
			dataList: [
				{
					name: '短期分析',
					title: '点击可查看文章详情'
				},
				{
					name: '深度分析',
					title: '7月大旱，8月大涝----东北玉米价格必涨。'
				},
				{
					name: '原创分析',
					title: '特大喜讯！基本确定！今年玉米价格为5年来最高。'
				}
			],
			ratioValue:1.1,
			ratioShow:false,
			ratio:[
				{
					text:" 1.1"
				},
				{
					text: "1.2"
				},
				{
					text: "1.3"
				}
			]
		};
	},
	methods: {
		calculationPrice(){
			this.grainPrice = 112 
		},
		showSelect(val) {
			if (val == 1) {
				this.showProvince = true;
			}
			if (val == 2) {
				this.showCity = true;
			}
			if (val == 3) {
				this.showArea = true;
			}
			if (val == 4) {
				this.ratioShow = true;
			}
		},
		selectedCity(index) {
			this.city = this.cityList[index].text;
		},
		selectedProvince(index) {
			this.province = this.cityList[index].text;
		},
		selectedArea(index) {
			this.area = this.cityList[index].text;
		},
		selectedRatio(i){
			this.ratioValue = this.ratio[i].text
		},
		goMore() {
			uni.navigateTo({
				url:'/pages/grain/commentList'
			})
		},
		goDetails() {
			uni.navigateTo({
				url:'/pages/grain/commentDetails'
			})
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
			color: #666;
			font-size: 32rpx;
		}
		.content {
			display: flex;
			padding: 0;
			.left {
				flex: 1;
				.item{
					border: none;
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
