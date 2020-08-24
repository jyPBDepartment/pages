<template>
	<view class="b-f">
		<view class="screen g-flex g-a-c f-14">
			<view class="sort g-f-1 g-flex g-a-c g-j-c" :style="item == '筛选' && 'border-left: 1rpx solid #e5e5e5;'" @click="selectLabel(item, index)" :class="index == screenIndex && 'screen-select'" v-for="(item, index) in condition"
			 :key="index">{{item}}</view>
		</view>
		<uni-drawer ref="drawer" mode="right" :visible="true">
			<view style="padding:46rpx 20rpx">
				<view v-for="(item, index) in screenList" :key="index">
					<view class="f-12" style="line-height: 52rpx;margin-bottom: 20rpx;">{{item.title}}</view>
					<view class="categorys g-flex g-f-warp g-j-s-b">
						<view class="f-14 t-c category" v-for="item in item.category" :key="index">
							{{item}}
						</view>
					</view>
				</view>
			</view>
			<view class="btns g-flex g-j-s-b">
				<u-button class="btn" shape="circle" plain>重置</u-button>
				<u-button class="btn" shape="circle" type="error">确认</u-button>
			</view>
		</uni-drawer>
	</view>
</template>

<script>
	import uniDrawer from "@/components/uni-drawer/uni-drawer.vue"
	export default {
		name: "Screen",
		components: {
			uniDrawer
		},
		props: {
			//主筛选框筛选标题
			condition: {
				type: Array,
				default: () => {
					return []
				}
			},
			screenList: {
				type: Array,
				default: () => {
					return []
				}
			},
		},
		data() {
			return {
				screenIndex: 0,
			}
		},
		methods: {
			selectLabel(item, index) {
				if (item == '筛选') {
					this.$refs.drawer.open()
				} else {
					this.screenIndex = index
				}
			}
		}
	}
</script>

<style lang="scss">
	.screen {
		height: 84rpx;
		color: #808080;
		border-bottom: 1px solid #808080;
		.sort{
			height: 34rpx;
		}
	}

	.screen-select {
		color: #e51c2e;
		font-weight: bold;
	}

	.category {
		width: 128rpx;
		line-height: 64rpx;
		background-color: #e5e5e5;
		color: #505050;
		margin-bottom: 20rpx;
	}

	.btns {
		position: absolute;
		bottom: 60rpx;
		width: 100%;

		.btn {
			width: 192rpx;
		}
	}

</style>
