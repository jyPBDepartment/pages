<template>
	<view>
		<view class="HeaderSearch g-flex g-a-c p-x-10" v-if="!title">
			<u-icon name="arrow-left" color="#fff"></u-icon>
			<view class="search g-flex g-a-c g-j-c p-x-10 m-c">
				<input class="f-14 t-c" v-model="search" placeholder="请输入搜索内容" type="text" value="" />
			</view>
		</view>
		<view v-else class="HeaderSearch shadow b-f g-flex g-a-c g-j-c p-x-10 f-16">
			<u-icon style="position: absolute;left: 20rpx;" class="f-20" name="arrow-left" color="#999999"></u-icon>
			{{title}}
		</view>
		<view style="width: 100%; height: 88rpx;">
			<!-- 占位 -->
		</view>
	</view>
</template>

<script>
	export default {
		name: 'HeaderSearch',
		props: {
			title: {
				type: String,
				default: ''
			}
		},
		components: {

		},
		data() {
			return {
				search: '' //搜索输入得内容
			};
		},
		watch: {
			//监听输入得内容传给父组件
			search(newValue) {
				this.$emit('searchCallback', newValue)
			}
		},
		created() {},
		methods: {}
	};
</script>

<style lang="scss">
	.HeaderSearch {
		width: calc(100% - 40rpx);
		height: 88rpx;
		background: $header-search-background;
		position: fixed;
		z-index: 99;
	}

	.search {
		width: 582rpx;
		height: 58rpx;
		border-radius: 35rpx;
		background-color: $white;

		input {
			width: 100%;
		}
	}
</style>
