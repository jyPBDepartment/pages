<template>
	<view>
		<view class="HeaderSearch g-flex g-a-c p-x-10" v-if="!title">
			<u-icon @tap="back" size="44" v-if="!hideBack" name="arrow-left" color="#fff"></u-icon>
			<view class="search g-flex g-a-c g-j-c p-x-10 m-c">
				<u-search
					input-align="left"
					bg-color="#ffffff"
					:clearabled="false"
					action-text=""
					placeholder="请输入搜索内容"
					v-model="search"
					:focus="!disabled"
					height="50"
					@focus="jumpSearch"
				></u-search>
			</view>
		</view>
		
		<view v-else :class="bold && 'f-b'" :style="{ background: background, color: color }" class="HeaderSearch shadow g-flex g-a-c g-j-c p-x-10 f-16">
			<u-icon v-if="title !== '圈子'" v-show="!hideBack" @tap="back" style="position: absolute;left: 20rpx;" class="f-20" name="arrow-left" :color="color"></u-icon>
			{{ title }}
			<span style="position: absolute; right: 20rpx; color: #1890ff;z-index: 999;" class="f-14" v-if="title == '圈子'" @tap="jump">发帖</span>
		</view>
		<view style="width: 100%; height: 88rpx;"><!-- 占位 --></view>
		<view class="search-content"></view>
	</view>
</template>

<script>
export default {
	name: 'HeaderSearch',
	props: {
		title: {
			type: String,
			default: ''
		},
		disabled: {
			type: Boolean,
			default: false
		},
		bold: {
			type: Boolean,
			default: false
		},
		hideBack: {
			type: Boolean,
			default: false
		},
		background: {
			type: String,
			default: '#fff'
		},
		color: {
			type: String,
			default: '#000'
		}
	},
	mounted() {
	},
	data() {
		return {
			search: '', //搜索输入得内容,
			setFocus: false
		};
	},
	watch: {
		//监听输入得内容传给父组件
		search(newValue) {
			this.$emit('searchCallback', newValue);
		}
	},
	created() {
		if (this.focus) {
		}
	},
	methods: {
		jumpSearch() {
			if (this.disabled) {
				uni.navigateTo({
					url: '/pages/search'
				});
			}
		},
		back() {
			if (getCurrentPages().length > 1) {
				uni.navigateBack(-1);
			}
		},
		jump() {
			uni.navigateTo({
				url: '/pages/community/release'
			});
		}
	}
};
</script>

<style lang="scss">
.HeaderSearch {
	// width: calc(100% - 40rpx);
	width: 100%;
	height: 88rpx;
	background: $header-search-background;
	position: fixed;
	z-index: 999;
}

.search {
	width: 582rpx;
	height: 58rpx;
	border-radius: 35rpx;
	background-color: $white;

	.input {
		width: 100%;
	}
}

.placeholder-class {
	text-align: center;
}
</style>
