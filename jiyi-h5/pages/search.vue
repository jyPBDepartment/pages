<template>
	<view>
		<HeaderSearch focus @searchCallback="search"></HeaderSearch>
		<view class="p-x-10">
			<view class="g-flex g-f-row g-f-warp" style="margin-top: 20rpx;">
				<view class="tag f-12" @click="jump(item)" v-for="(item, index) in list" :key="index">{{ item.name }}</view>
			</view>
			<view v-if="modelCache.length">
				<view class="title f-16 g-flex g-j-s-b g-a-c">
					搜索历史
					<u-icon @click="empty" size="44" name="trash"></u-icon>
				</view>
				<view class="history g-flex f-16" v-for="(item, index) in modelCache" :key="index">
					<u-icon @click="search(item)" name="clock" style="margin-right: 20rpx;"></u-icon>
					<view @click="search(item)" class="g-f-1">{{ item }}</view>
					<u-icon class="g-j-e" name="close" @click="current(index)"></u-icon>
				</view>
			</view>
		</view>
		<u-modal @confirm="emptyConfirm" v-model="emptyShow" :show-title="false" show-cancel-button :content="content"></u-modal>
		<u-modal @confirm="currentConfirm" v-model="currentShow" :show-title="false" show-cancel-button :content="content"></u-modal>
	</view>
</template>

<script>
let delIendex;
import Interface from '../api/ApiPath.js';
import HeaderSearch from '@/components/HeaderSearch/HeaderSearch.vue';
export default {
	components: {
		HeaderSearch
	},
	data() {
		return {
			emptyShow: false,
			currentShow: false,
			content: '',
			list: [],
			modelCache: []
		};
	},
	created() {
		this.modelCache = uni.getStorageSync('modelCache');
	},
	methods: {
		removeSpaces(string) {
			return string.replace(/\s*/g, '');
		},
		search(e) {
			if (e) {
				uni.request({
					url: Interface.url.findModuleListByName,
					method: 'GET',
					data: {
						name: this.removeSpaces(e)
					},
					success: res => {
						if (res.data.state == 0) {
							this.list = res.data.data;
							console.log(res.data.data);
						}
					},
					fail: err => {}
				});
			}
		},
		empty() {
			this.content = '确认删除全部历史记录';
			this.emptyShow = true;
		},
		current(index) {
			this.content = '确认删除当前历史记录';
			this.currentShow = true;
			delIendex = index;
		},
		emptyConfirm() {
			uni.setStorageSync('modelCache', []);
			this.modelCache = uni.getStorageSync('modelCache');
		},
		currentConfirm() {
			let arr = uni.getStorageSync('modelCache');
			arr.splice(delIendex, 1);
			uni.setStorageSync('modelCache', arr);
			this.modelCache = uni.getStorageSync('modelCache');
		},
		jump(item) {
			this.cache(this.removeSpaces(item.name));
			if (item.tabMode == 0) {
				uni.switchTab({
					url: item.routeUrl
				});
			} else {
				uni.navigateTo({
					url: item.routeUrl
				});
			}
		},
		cache(e) {
			if (typeof uni.getStorageSync('modelCache') == 'string') {
				uni.setStorageSync('modelCache', [e]);
			} else {
				let arr = uni.getStorageSync('modelCache');
				arr.unshift(e);
				let newArr = [...new Set(arr)];
				if (newArr.length >= 6) {
					newArr.pop();
				}
				uni.setStorageSync('modelCache', newArr);
			}
			this.modelCache = uni.getStorageSync('modelCache');
		}
	}
};
</script>

<style lang="scss">
.tag {
	padding: 10rpx 20rpx;
	margin-top: 20rpx;
	background: #e5e5e5;
	border-radius: 15px;
	color: #000000;
	margin-right: 20rpx;
}

.title {
	margin: 40rpx 0 30rpx 0;
	color: #333333;
}

.history {
	border-bottom: 1px solid #d8d8d8;
	color: #505050;
	line-height: 80rpx;
}
</style>
