<!-- 注：0为粮食收购-出售详情，1为出售农机-出售详情,2为出租农机-出售详情 -->
<template>
	<view>
		<HeaderSearch title="出租农机详情"></HeaderSearch>

		<view class="init">
			<image class="agri-img" src="@/static/logo.png" mode=""></image>
			<view class="p-x-10">
				<view class="g-flex g-a-c">
					<view class="tag f-12" v-if="param == 2">
						出租
					</view>
					<view class="title g-f-1 f-16" style="padding: 0 20rpx;">
						收割机
					</view>
					<view v-if="param == 2" class="icon g-flex g-f-column">
						<u-icon size="44" name="share"></u-icon>
						<text class="f-12">分享</text>
					</view>
				</view>
				<view class="price" style="font-size: 42rpx;margin-top: 16rpx;">
					￥{{price}}{{ company }}
				</view>
				<view class="labels g-flex" style="margin-top: 20rpx;">
					<view class="label f-12">
						可议价
					</view>

				</view>
				<view class="info g-f-warp g-flex" >
					<view class="text g-f-1 f-12" style="color: #999999;margin-top: 24rpx;" v-for="(item,index) in info" :key="index">
						{{item}}
					</view>
				</view>
			</view>
		</view>

	</view>

</template>

<script>
	import HeaderSearch from '../../components/HeaderSearch/HeaderSearch.vue'
	export default {
		components: {
			HeaderSearch
		},
		data() {
			return {
				param: null,
				price: "25.00",
				company: '',
				info: {
					model: '',
					goodsNum: '',
					address: '',
					phone: ''
				},
				item: [],
			};
		},
		onLoad(e) {
			this.param = e.index
			// if(e.info){

			// }
			this.info = {
				model: `${this.param == 0 ? "类别" : "型号"}：500`,
				goodsNum: `${this.param == 0 ? " " : "货号：xd-500"}`,
				address: "长春公主岭",
				phone: "电话：15567891234"
			}
			if (this.param == 0) {
				this.company = "元/公斤"
			}
			if (this.param == 2) {
				this.company = "元/亩 "
			}
		},
		methods: {

		}
	}
</script>

<style lang="scss">
	.init {
		.agri-img {
			width: 750rpx;
			height: 750rpx;
		}
		.tag {
			width: 72rpx;
			line-height: 50rpx;
			background: #ff0000;
			color: #fff;
			text-align: center;
		}
		.labels {
			.label {
				padding: 5rpx 20rpx;
				border: 1px solid #e51c2e;
				border-radius: 30rpx;
				color: #e51c2e;
				margin-right: 20rpx;
			}
		}
		.info {
			.text {
				min-width: 33%;
			}
		}
	}
</style>
