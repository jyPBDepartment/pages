<template>
	<view>
		<HeaderSearch title="我的预约" @searchCallback="search"></HeaderSearch>
		<Screen :condition="condition"></Screen>
		<view class="p-x-10">
			<view @click="jump(`../grain/paddy?state=${index}`)" class="box box-border p-y-10 f-12 g-flex" v-for="(item, index) in List"
			 :key="index">
				<view class="image g-flex g-a-c g-j-c f-14 orange" :class="`${index == 1 && 'green' } ${index == 2 && ' blue'} ${index == 3 && ' red'}`">
					未审核
				</view>
				<view class="info g-f-1">
					<view class="title f-14 g-flex g-j-s-b">
						水稻植保...
						<view class="f-16 price">
							￥100元/亩
						</view>
					</view>
					<view class="other g-a-c g-flex g-j-s-b">
						面积100亩
						<view class="g-j-e">
							08-21 18:15
						</view>

					</view>
					<view class="other g-a-c g-flex g-j-s-b">
						日期2020-08-11-2020-09-11
					</view>
					<view class="other g-a-c g-flex g-j-s-b">
						长春公主岭
					</view>
					<view class="reason" v-if="index == 3">
						商家取消理由：库存不足
					</view>
					<view class="reason" v-if="index == 2">
						<u-button class="btn" type="error" shape="circle" size="mini">联系商家</u-button>
					</view>
					<view class="reason" v-if="index == 1">
						<u-button class="btn" type="error" shape="circle" size="mini">已完成</u-button>
					</view>
				</view>

			</view>
		</view>
	</view>
</template>

<script>
	import Screen from '@/components/Screen/screen.vue'
	import HeaderSearch from '@/components/HeaderSearch/HeaderSearch.vue'
	export default {
		components: {
			Screen,
			HeaderSearch
		},
		data() {
			return {
				condition: ["待确认", "已确认", "已取消", "已完成", "全部"],
				List: [{

					},
					{

					}, {

					}, {

					}
				],
				state:null
			}
		},
		
		methods: {
			jump(url) {
				uni.navigateTo({
					url: url
				})
			}
		}
	}
</script>

<style lang="scss">
	.box {
		color: #808080;

		.image {
			width: 200rpx;
			height: 200rpx;
			margin-right: 20rpx;
			color: #fff;
		}

		.orange {

			background-color: #ff8d1a;
		}

		.green {

			background-color: #43cf7c;
		}

		.red {

			background-color: #e51c2e;
		}

		.blue {
			background-color: #1890ff;
		}

		.info {
			.title {
				color: #333;

				.price {
					width: 280rpx;
					text-align: right;

				}
			}

			.other {
				height: 50rpx;
			}
		}

		.reason {
			text-align: right;
			color: #e51c2e;

			.btn {
				width: 222rpx;
				height: 60rpx;
			}
		}
	}

	.box-border {
		border-bottom: 1rpx solid #e5e5e5;
	}
</style>
