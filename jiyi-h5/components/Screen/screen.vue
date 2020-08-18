<template>
	<view class="b-f">
		<view class="screen g-flex g-j-s-a g-a-c f-14">
			<view class="sort" @click="selectLabel(false, index)" :class="index == screenIndex && 'screen-select'" v-for="(item, index) in condition"
			 :key="index">{{item}}</view>
		</view>
		<view class="screening g-flex g-j-s-a g-a-c f-14" v-if="type == 1">
			<view class="label g-flex g-j-c g-a-c" @click="selectLabel(true, index)" :class="index == screeningIndex && 'label-select'" v-for="(item, index) in screening" :key="index">
				{{ item }}
			</view>
		</view>
		<uni-drawer ref="drawer" mode="right" :visible="true">
			<view style="padding:30rpx;">
				<view class="uni-title">抽屉式导航</view>
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
			//副筛选框筛选标题 type != 1 不需要传递  默认为空
			screening: {
				type: Array,
				default: () => {
					return []
				}
			},
			// 类型判断 0为标题最后一个按钮弹出抽屉  1为又副标题 2为隐藏副标题
			type: {
				type: Number,
				default: 0
			},
		},
		data(){
			return{
				screenIndex:0,
				screeningIndex:0
			}
		},
		methods: {
			selectLabel(b ,index) {
				if (this.condition.length - 1 == index && !this.type) {
					this.$refs.drawer.open()
				}
				if(b){
					this.screeningIndex = index
				}
				if(!b){
					this.screenIndex = index
				}

			}
		}
	}
</script>

<style lang="scss">
	.screen {
		height: 84rpx;
		color: rgba(128, 128, 128, 1);
		border-bottom: 1px solid #808080;
	}

	.screen-select {
		color: #000;
	}
	
	.screening{
		height: 80rpx;
		.label{
			width: 160rpx;
			height: 56rpx;
			border: 1px solid rgba(204, 204, 204, 1);
			color: rgba(171, 171, 171, 1);
			border-radius: 28rpx;
		}
		.label-select{
			width: 162rpx;
			height: 58rpx;
			background: rgba(229, 28, 46, 1);
			color: #fff;
			border: 0;
		}
	}
</style>
