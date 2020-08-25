<template>
	<view>
		<HeaderSearch title="农机发布" @searchCallback="search"></HeaderSearch>
		<Screen :condition="condition"></Screen>
		<view class="p-x-10">
			<view class="box box-border p-y-10 f-12 g-flex" v-for="(item, index) in List" :key="index">
				<view class="image g-flex g-a-c g-j-c f-14 orange" :class="`${index == 1 && 'green' } ${index == 2 && ' red'}`">
					未审核
				</view>
				<view class="info g-f-1">
					<view class="title f-14 g-flex">
						现货供应大型玉米收割机 自走式玉米收割机...
						<view class="f-16 price">
							￥1500/天
						</view>
					</view>
					<view class="other g-a-c g-flex g-j-s-b">
						型号：500
						<view class="g-j-e">
							08-21 18:15
						</view>

					</view>
					<view class="other g-a-c g-flex g-j-s-b">
						货号：xd-500 <view>长春公主岭</view>
					</view>
					<view class="reason" v-if="index == 2">
						理由：信息可能存在虚假问题，请注意核实
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
				condition: ["待审核", "审核通过", "拒绝通过", "全部"],
				List: [{

					},
					{

					}, {

					}
				]
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

		.info {
			.title {
				height: 76rpx;
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
		}
	}

	.box-border {
		border-bottom: 1rpx solid #e5e5e5;
	}
</style>
