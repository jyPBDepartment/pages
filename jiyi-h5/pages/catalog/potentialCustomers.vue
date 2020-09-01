<template>
	<view>
		<HeaderSearch title="意向客户" @searchCallback="search"></HeaderSearch>
		<Screen :listIndex="listIndex" @select="select" :condition="condition"></Screen>
		<view class="p-x-10">
			<view @click="jump(item)" class="box box-border p-y-10 f-12 g-flex" v-for="(item, index) in list" :key="index">
				<view class="image g-flex g-a-c g-j-c f-14 orange" :class="`${item.stateNum == 1 && 'green' } ${item.stateNum == 2 && ' blue'} ${item.stateNum == 3 && ' red'}`">
					{{item.state}}
				</view>
				<view class="info g-f-1">
					<view class="title f-14 g-flex">
						<view class="o-e" style="width: 320rpx;height: 80rpx;">
							{{item.title}}
						</view>
						<view class="f-16 price">
							￥{{item.price}}元/亩
						</view>
					</view>
					<view class="other g-a-c g-flex g-j-s-b">
						面积{{item.measure}}亩
						<view class="g-j-e">
							{{item.time}}
						</view>

					</view>
					<view class="other g-a-c g-flex g-j-s-b">
						日期{{item.date}}
					</view>
					<view class="other g-a-c g-flex g-j-s-b">
						{{item.address}}
					</view>
					<view class="reason" v-if="item.stateNum == 3">
						取消理由：{{item.reason}}
					</view>
					<view class="reason" v-if="item.stateNum == 1 || item.stateNum == 2">
						<u-button class="btn" type="error" shape="circle" @click="call(item.phone)" size="mini">联系客户</u-button>
					</view>
					<view class="reason" v-if="item.stateNum == 0">
						<u-button class="btn" type="error" shape="circle" size="mini">确认</u-button>
					</view>
				</view>

			</view>
		</view>
		<u-modal v-model="show" :show-title="false" show-cancel-button :content="content"></u-modal>
	</view>
</template>

<script>
	let list = []
	import Screen from '@/components/Screen/screen.vue'
	import HeaderSearch from '@/components/HeaderSearch/HeaderSearch.vue'
	export default {
		components: {
			Screen,
			HeaderSearch
		},
		data() {
			return {
				show: false,
				content: '',
				condition: ["待确认", "已确认", "已完成", "已取消", "全部"],
				list: [],
				listIndex: 4
			}
		},
		onLoad() {
			list = [{
					stateNum: 0,
					state: '待确认',
					title: '现货供应大型玉米收割机 自走式玉米收割机现货供应大型玉米收割机 自走式玉米收割机',
					price: 150,
					measure: 100,
					time: '08-21 18:15',
					date: '2020-06-01',
					address: '长春公主岭'
				},
				{
					stateNum: 1,
					state: '已确认',
					title: '现货供应大型玉米收割机 自走式玉米收割机现货供应大型玉米收割机 自走式玉米收割机',
					price: 15,
					measure: 100,
					time: '08-21 18:15',
					phone: "17704301395",
					date: '2020-06-01',
					address: '长春公主岭'
				},
				{
					stateNum: 2,
					state: '已完成',
					title: '现货供应大型玉米收割机 自走式玉米收割机现货供应大型玉米收割机 自走式玉米收割机',
					price: 10,
					measure: 100,
					time: '08-21 18:15',
					date: '2020-06-01',
					phone: "17704301395",
					address: '长春公主岭'
				},
				{
					stateNum: 3,
					state: '已取消',
					title: '现货供应大型玉米收割机 自走式玉米收割机现货供应大型玉米收割机 自走式玉米收割机',
					price: 18,
					modelNum: '500',
					date: '08-21 18:15',
					cargoNum: 'xd-500',
					address: '长春公主岭',
					reason: '库存不足'
				}
			]
			this.select(this.listIndex)
		},
		methods: {
			jump(e) {
				let url
				switch (e.stateNum) {
					case 0:
						url = '../grain/potentialCustomersConfirm'
						break;
					case 1:
						url = '../grain/potentialCustomers'
						break;
					case 2:
						url = '../grain/potentialCustomers'
						break;
					case 3:
						url = '../grain/potentialCustomersCancel'
						break;
					default:
				}
				uni.navigateTo({
					url: url
				})
			},
			select(e) {
				let arr
				if (e !== this.condition.length - 1) {
					arr = list.filter(value => value.stateNum === e);
				} else {
					arr = list
				}
				this.list = arr
			},
			call(phone) {
				console.log(phone)
				uni.makePhoneCall({
					phoneNumber: phone //仅为示例
				});
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
					width: 170rpx;
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
