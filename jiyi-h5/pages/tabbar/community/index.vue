<template>
	<view>
		<HeaderSearch title="圈子" @searchCallback="search"></HeaderSearch>
		<view class="tabs g-flex g-j-s-a g-a-c f-14">
			<view @click="selectTab(index)" :class="index == tabIndex && 'tab-hover'" v-for="(item, index) in tabsList" :key="index">{{item}}</view>
		</view>
		<CommunityInfo @click="jump" v-for="(item, index) in communityList" :key="index" :communityInfo="item" />
		<uni-drawer ref="drawer" mode="right" :visible="true">
			<view style="padding:46rpx 20rpx">
				<view class="f-12" style="line-height: 52rpx;margin-bottom: 20rpx;">筛选类别</view>
				<view class="categorys g-flex g-f-warp g-j-s-b">
					<view class="f-14 t-c category" v-for="(item, index) in 4" :key="index">
						无人机
					</view>
				</view>
			</view>
		</uni-drawer>
	</view>
</template>

<script>
	import uniDrawer from "@/components/uni-drawer/uni-drawer.vue"
	import CommunityInfo from '../../../components/CommunityInfo/CommunityInfo.vue'
	export default {
		components: {
			uniDrawer,
			CommunityInfo
		},
		data() {
			return {
				tabIndex: 0,
				tabsList: ["全部", "推荐", "无人机", "筛选"],
				communityList: [{
					title: '直播水稻和插秧到底有什么样的优劣势？',
					content: '1.水稻直播优缺点 1、水稻直播 水稻直播指的是直接将种子播种的稻田之中,而不经过育苗、移栽的过程。 2、优点水稻直播省去了育苗、移栽、插秧的过程,省时省工;水稻直播不存在返1.水稻直播优缺点 1、水稻直播水稻直播指的是直接将种子播种的稻田之中,而不经过育苗、移栽的过程。 2、优点 水稻直播省去了育苗、移栽、插秧的过程,省时省工;水稻直播不存在返...',
					author: '吉易慧农',
					commentQuantity: '1543',
					releaseTime: '1天前'
				}, {
					title: '直播水稻和插秧到底有什么样的优劣势？',
					content: '1.水稻直播优缺点 1、水稻直播 水稻直播指的是直接将种子播种的稻田之中,而不经过育苗、移栽的过程。 2、优点水稻直播省去了育苗、移栽、插秧的过程,省时省工;水稻直播不存在返1.水稻直播优缺点 1、水稻直播水稻直播指的是直接将种子播种的稻田之中,而不经过育苗、移栽的过程。 2、优点 水稻直播省去了育苗、移栽、插秧的过程,省时省工;水稻直播不存在返...',
					author: '吉易慧农',
					commentQuantity: '1543',
					releaseTime: '1天前'
				}]
			}
		},
		onLoad() {

		},
		methods: {
			selectTab(index) {
				if (index == 3) {
					this.$refs.drawer.open()
				} else {
					this.tabIndex = index
				}
			},
			jump(item) {
				console.log(item)
				uni.navigateTo({
					url:`../../grain/article?params=${JSON.stringify(item)}`
				})
			}
		}
	}
</script>

<style lang="scss">
	.tabs {
		width: 100%;
		height: 88rpx;
		background-color: #e51c2e;
		color: rgba(255, 255, 255, .7);
	}

	.tab-hover {
		color: #fff;
	}

	.article-info {
		margin-top: 20rpx;
	}

	.category {
		width: 128rpx;
		line-height: 64rpx;
		background-color: #e5e5e5;
		color: #505050;
		margin-bottom: 20rpx;
	}
</style>
