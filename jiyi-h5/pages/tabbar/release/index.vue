<template>
	<view>
		<HeaderSearch title="发布" @searchCallback="search"></HeaderSearch>
		<view class="p-x-10  g-flex g-a-c " style="position: absolute; bottom: 40rpx;">
			<view class="btn f-12" v-for="(item, index) in btnList" @click="jump(item)" :key="index">
				<view class="img g-flex g-a-c g-j-c m-c">
					<image :src="item.src" mode=""></image>
				</view>
				<view class="name">
					{{item.name}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import HeaderSearch from '@/components/HeaderSearch/HeaderSearch.vue'
	export default {
		components: {
			HeaderSearch
		},
		data() {
			return {
				btnList: [{
					src: '../../../static/logo.png',
					url:'../../grain/agriculturalAppointment',
					name: '农服'
				}, {
					src: '../../../static/logo.png',
					url:'../../grain/grainTrade',
					name: '粮食买卖'
				}, {
					src: '../../../static/logo.png',
					url:'../../grain/leaseMachine',
					name: '农机'
				}]
			};
		},
		onLoad() {},
		onShow() {

		},
		onHide() {

		},
		methods: {
			jump(item) {
				uni.navigateTo({
					url: item.url
				})
			}
		}
	};
</script>

<style lang="scss">
	.btn {
		width: 120rpx;
		margin-left: 40rpx;

		.img {
			width: 92rpx;
			height: 92rpx;
			background-color: #55be95;
			border-radius: 26rpx;

			image {
				width: 56rpx;
				height: 56rpx;
			}
		}

		.name {
			line-height: 56rpx;
			text-align: center;
			color: #505050;
		}
	}
</style>
