<template>
	<view class="b-f">
		<view class="screen g-flex g-a-c f-14">
			<view class="sort g-f-1 g-flex g-a-c g-j-c" :style="item.name == '筛选' && 'border-left: 1rpx solid #e5e5e5;'" @click="selectLabel(item, index)"
			 :class="(index == screenIndex || index == screened) && 'screen-select'" v-for="(item, index) in condition" :key="index">{{item.name}}</view>
		</view>
		<uni-drawer ref="drawer" mode="right" :visible="true">
			<view style="padding:46rpx 20rpx">
				<view v-for="(item, index1) in screenList" :key="index1">
					<view class="f-12" style="line-height: 52rpx;margin-bottom: 20rpx;">{{item.title}}</view>
					<view class="categorys g-flex g-f-warp g-j-s-b">
						<view class="f-14 t-c category" :class="(screenedIndex1 == index1 && screenedIndex == index) && ' screened'"
						 @click="selected(index1,index)" v-for="(item, index) in item.category" :key="index">
							{{item.name}}
						</view>
					</view>
				</view>
			</view>
			<view class="btns g-flex g-j-s-b">
				<u-button class="btn" shape="circle" @click="recharge" plain>重置</u-button>
				<u-button class="btn" shape="circle" @click="confirm(true)" type="error">确认</u-button>
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
			listIndex: {
				type: Number,
				default: 0
			}
		},
		data() {
			return {
				screenIndex: 0,
				screened: null,
				screenedIndex: null,
				screenedIndex1: null
			}
		},
		created() {
			this.screenIndex = this.listIndex
		},
		methods: {
			selectLabel(item, index) {

				if (item.name == '筛选') {
					this.$refs.drawer.open()
				} else {
					this.screenIndex = index
					this.$emit("select", item.code)
				}
			},
			selected(index1, index) {
				this.screenedIndex = index
				this.screenedIndex1 = index1
				this.confirm()
			},
			recharge() {
				this.screenedIndex = null
				this.screenedIndex1 = null
				this.screened = null
				this.$emit("screened", null)
				this.$refs.drawer.close()
			},
			confirm(e) {
				if (e) {
					this.$refs.drawer.close()
					return
				}
				if (this.screenedIndex !== null) {
					this.screened = this.condition.findIndex(item => item.name == '筛选')
					this.$emit("screened", this.screenList[this.screenedIndex1].category[this.screenedIndex].code)
				} else {
					this.screenIndex = 0
					this.$emit("screened", null)
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

		.sort {
			height: 34rpx;
		}
	}

	.screened {
		background-color: #e51c2e !important;
		color: #fff !important;
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
