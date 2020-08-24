<template>
	<view class="service">
		<HeaderSearch hideBack @searchCallback="search"></HeaderSearch>
		<Screen :screenList="screenList" :condition="condition"></Screen>
		<view class="p-x-10">
			<view class="app-modular g-flex" @click="jumpInfo">
				<image class="app-img" src="../../../static/logo.png" mode=""></image>
				<view class="app-info g-f-1">
					<p class="title f-14">水稻植保</p>
					<view class="g-flex f-12 g-a-c" style="color: rgba(128, 128, 128, 1)">
						<u-icon style="margin-right: 5rpx;" name="map-fill" color="#A6A6A6" size="36"></u-icon>
						长春市·榆树市·黑林镇
					</view>
					<view class="g-flex g-j-s-b f-12 tags">
						<view class="tag g-a-c g-j-c g-flex">满五送一</view>
						<view class="tag g-a-c g-j-c g-flex">满五送一</view>
						<view class="tag g-a-c g-j-c g-flex">满五送一</view>
					</view>
					<view class="g-flex g-j-s-b f-14">
						<view class="app-number">
							已预约120次
						</view>
						<view @click.stop @click="jump" class="immediately g-flex g-a-c g-j-c c-f">
							立即预约
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import Screen from '../../../components/Screen/screen.vue'
	import HeaderSearch from '@/components/HeaderSearch/HeaderSearch.vue'
	export default {
		components: {
			Screen,
			HeaderSearch,
		},
		data() {
			return {
				condition: [
					"综合", "植保", "播种", "收割", "筛选"
				],
				screenList: [{
						title: '农作物类别',
						category: ["玉米", "水稻", "高粱", "水稻"]
					},
					{
						title: '类别',
						category: ["虫害", "草害", "病害"]
					}
				]
			}
		},
		onLoad() {

		},
		methods: {
			search(e) {
				console.log(e)
			},
			jumpInfo() {
				uni.navigateTo({
					url: '../../grain/paddy'
				})
			},
			jump() {
				uni.navigateTo({
					url: '../../grain/agriculturalAppointment'
				})
			}

		}
	}
</script>

<style lang="scss">

</style>
