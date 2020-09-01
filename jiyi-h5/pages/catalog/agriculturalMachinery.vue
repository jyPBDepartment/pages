<template>
	<view>
		<HeaderSearch :title="title" @searchCallback="search"></HeaderSearch>
		<Screen :listIndex="listIndex" @select="select" :condition="condition"></Screen>
		<view class="p-x-10">
			<view @click="jump(item)" class="box box-border p-y-10 f-12 g-flex" v-for="(item, index) in list" :key="index">
				<view class="image g-flex g-a-c g-j-c f-14 orange" :class="`${item.stateNum == 1 && 'green' } ${item.stateNum == 2 && ' red'}`">
					{{item.state}}
				</view>
				<view class="info g-f-1">
					<view class="title f-14 g-flex">
						<view class="o-e" style="width: 330rpx;">
							{{item.title}}
						</view>
						<view class="f-16 price">
							￥{{item.price}}/天
						</view>
					</view>
					<view class="other g-a-c g-flex g-j-s-b">
						型号：{{item.modelNum}}
						<view class="g-j-e">
							{{item.date}}
						</view>

					</view>
					<view class="other g-a-c g-flex g-j-s-b">
						货号：{{item.cargoNum}}
						<view>{{item.address}}</view>
					</view>
					<view class="reason" v-if="item.stateNum == 2">
						理由：{{item.reason}}
					</view>
				</view>
			</view>
		</view>
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
				title: '',
				condition: ["待审核", "审核通过", "拒绝通过", "全部"],
				list: [],
				listIndex: 3
			}
		},
		onLoad(e) {
			if (e.index == 0) {
				this.title = '农机发布'
			}
			if (e.index == 1) {
				this.title = '粮食买卖'
			}
			if (e.index == 2) {
				this.title = '农服发布'
			}
			list = [{
					stateNum: 0,
					state: '未审核',
					title: '现货供应大型玉米收割机 自走式玉米收割机现货供应大型玉米收割机 自走式玉米收割机',
					price: 1500,
					modelNum: '500',
					date: '08-21 18:15',
					cargoNum: 'xd-500',
					address: '长春公主岭'
				},
				{
					stateNum: 0,
					state: '未审核',
					title: '现货供应大型玉米收割机 自走式玉米收割机现货供应大型玉米收割机 自走式玉米收割机',
					price: 1500,
					modelNum: '500',
					date: '08-21 18:15',
					cargoNum: 'xd-500',
					address: '长春公主岭'
				},
				{
					stateNum: 0,
					state: '未审核',
					title: '现货供应大型玉米收割机 自走式玉米收割机现货供应大型玉米收割机 自走式玉米收割机',
					price: 1500,
					modelNum: '500',
					date: '08-21 18:15',
					cargoNum: 'xd-500',
					address: '长春公主岭'
				},
				{
					stateNum: 1,
					state: '审核通过',
					title: '现货供应大型玉米收割机 自走式玉米收割机现货供应大型玉米收割机 自走式玉米收割机',
					price: 1500,
					modelNum: '500',
					date: '08-21 18:15',
					cargoNum: 'xd-500',
					address: '长春公主岭'
				}, {
					stateNum: 1,
					state: '审核通过',
					title: '现货供应大型玉米收割机 自走式玉米收割机现货供应大型玉米收割机 自走式玉米收割机',
					price: 1500,
					modelNum: '500',
					date: '08-21 18:15',
					cargoNum: 'xd-500',
					address: '长春公主岭'
				}, {
					stateNum: 1,
					state: '审核通过',
					title: '现货供应大型玉米收割机 自走式玉米收割机现货供应大型玉米收割机 自走式玉米收割机',
					price: 1500,
					modelNum: '500',
					date: '08-21 18:15',
					cargoNum: 'xd-500',
					address: '长春公主岭'
				}, {
					stateNum: 1,
					state: '审核通过',
					title: '现货供应大型玉米收割机 自走式玉米收割机现货供应大型玉米收割机 自走式玉米收割机',
					price: 1500,
					modelNum: '500',
					date: '08-21 18:15',
					cargoNum: 'xd-500',
					address: '长春公主岭'
				},
				{
					stateNum: 2,
					state: '拒绝通过',
					title: '现货供应大型玉米收割机 自走式玉米收割机现货供应大型玉米收割机 自走式玉米收割机',
					price: 1500,
					modelNum: '500',
					date: '08-21 18:15',
					cargoNum: 'xd-500',
					address: '长春公主岭',
					reason: '信息可能存在虚假问题，请注意核实',
				}
			]
			this.select(this.listIndex)
		},
		methods: {
			jump(e) {
				let url
				switch (e.stateNum) {
					case 0:
						url = '../grain/spaceCancel'
						break;
					case 1:
						url = '../grain/space'
						break;
					case 2:
						url = '../grain/spaceModify'
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
					width: 160rpx;
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
