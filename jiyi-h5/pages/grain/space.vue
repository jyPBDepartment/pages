<!-- 注：0为粮食收购-出售详情，1为出售农机-出售详情,2为出租农机-出售详情 -->
<template>
	<view>
		<HeaderSearch title="出租农机详情"></HeaderSearch>

		<view class="init">
			<view class="roll-out">
				<swiper class="roll" :current="current" @change="getCurrent">
					<block v-for="item in banner" :key="item">
						<swiper-item>
							<image src="@/static/logo.png" class="roll-image" />
						</swiper-item>
					</block>
				</swiper>
				<view class='toleft' @click='toleft()'></view>
				<view class='toright' @click='toright()'></view>
			</view>

			<view class="p-x-10">
				<view v-if="state == 2" class="tips f-12" style="color: #e51c2e;line-height: 60rpx;">
					理由：信息可能存在虚假问题，请注意核实
				</view>
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
					<view class="label f-12">
						优质商家
					</view>
				</view>
				<view class="info g-f-warp g-flex">
					<view class="text g-f-1 f-12" style="color: #999999;margin-top: 24rpx;" v-for="item in info" :key="item">
						{{item}}
					</view>
				</view>
				<view class="space"></view>
				<view class="info g-f-warp g-flex">
					<view class="text g-f-1 f-14" style="color: #333;margin-top: 52rpx;">
						描述：诚信出售：黑龙江勃利地区自家烘干塔。国际玉米出库中。容重690以上。水分14.霉变焦糊1内。685容重大颗粒。霉变焦糊1.水分15内价格优惠，一手货源，售后有保障。685容重大颗粒。霉变焦糊1.水分15内价格优惠，一手货源，售后有保障。685容重大颗粒。霉变焦糊1。
					</view>
				</view>
				<view class="btn g-flex">
					<view class="g-f-1">
						<u-button  v-if="state == 0" @click="cencal(true)" shape="circle">取消</u-button>
					</view>
					<view  class="g-f-1">
						<u-button  v-if="state == 0 || state == 2" type="error" shape="circle">修改信息</u-button>
					</view>

				</view>

			</view>
		</view>
		<CancelReason @confirm="confirm" :isShow="cencalIsShow" @isShow="cencal"></CancelReason>
	</view>

</template>

<script>
	import HeaderSearch from '../../components/HeaderSearch/HeaderSearch.vue'
	import CancelReason from '../../components/CancelReason/CancelReason.vue'
	export default {
		components: {
			HeaderSearch,
			CancelReason
		},
		data() {
			return {
				cencalIsShow: false,
				current: '0',
				param: null,
				price: "25.00",
				company: '',
				info: {
					model: '',
					goodsNum: '',
					address: '',
					contactUser: '',
					spaceCorn: '',
					phone: '',

				},
				item: [],

				banner: [{
						url: '@/static/logo.png'
					},
					{
						url: '@/static/logo.png'
					},
					{
						url: '@/static/logo.png'
					}
				],
				state:null

			};
		},
		onLoad(e) {
			if(e.state){
				this.state = e.state
			}
			this.param = e.index
			// if(e.info){

			// }
			this.info = {
				model: `${this.param == 0 ? "类别" : "型号"}：500`,
				goodsNum: `${this.param == 0 ? " " : "货号：xd-500"}`,
				address: `${this.param == 0 ? "吉林省榆树市五棵松" : "长春公主岭"}`,
				contactUser: "联系人：西西 ",
				spaceCorn: "",
				phone: "电话:15567891234"
			}
			if (this.param == 0) {
				this.company = "元/公斤"
			}
			if (this.param == 1) {
				this.company = "元"
			}
			if (this.param == 2) {
				this.company = "元/亩 "
			}

		},
		methods: {
			cencal(e) {
				this.cencalIsShow = e
			},
			confirm(e) {
				console.log(e)
			},
			//先获取当前的current
			getCurrent: function(e) {
				this.current = e.detail.current
			},
			//向左滑动
			toleft: function() {
				if (this.current == '0') {
					this.current = this.banner.length - 1
				} else {
					this.current = this.current - 1
				};

			},
			//向右滑动
			toright: function() {
				if (this.current == this.banner.length - 1) {
					this.current = '0'
				} else {
					this.current = this.current + 1
				}
			}

		}
	}
</script>

<style lang="scss">
	.init {

		.roll-out {
			position: relative;

			.roll {
				width: 750rpx;
				height: 750rpx;
			}

			swiper-item {
				width: 100%;
				height: 100%;

				.roll-image {
					width: 750rpx;
					height: 750rpx;
				}
			}

			.toleft {
				width: 30rpx;
				height: 30rpx;
				position: absolute;
				top: 50%;
				left: 36rpx;
				border-right-color: transparent;
				border-color: #fff;
				border-width: 0 0 4px 4px;
				border-style: solid;
				transform: rotate(45deg) translateY(-50%);
			}

			.toright {
				width: 30rpx;
				height: 30rpx;
				position: absolute;
				top: 50%;
				right: 60rpx;
				border-right-color: transparent;
				border-color: #fff;
				border-width: 4px 4px 0 0;
				border-style: solid;
				transform: rotate(45deg) translateY(-50%);
			}
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

		.space {
			width: 750rpx;
			height: 22rpx;
			background-color: rgba(229, 229, 229, 1);
			margin: 26rpx 0rpx -26rpx -20rpx;
		}
	}

	.btn {
		view {
			padding: 20rpx;
		}
	}
</style>
