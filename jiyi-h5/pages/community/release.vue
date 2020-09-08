<template>
	<view>
		<HeaderSearch title="发帖" @searchCallback="search"></HeaderSearch>
		<view class="p-x-10">
			<view class="g-flex p-y-10 g-a-c b-b">
				<view class="title f-14">
					标题
				</view>
				<view class="info g-f-1" style="position: relative;">
					<u-input placeholder="输入标题" :clearable="false" v-model="name" height="64" />
				</view>
			</view>
			<view class="g-flex p-y-10 g-a-c b-b">
				<view class="title f-14" style="line-height: 62rpx;">
					类别
				</view>
				<view class="info g-f-1" style="position: relative;">
					<u-radio-group v-model="parent">
						<u-radio v-for="(item, index) in list" :key="index" :name="item.name" :disabled="item.disabled">
							{{item.name}}
						</u-radio>
					</u-radio-group>
				</view>
			</view>
			<view class="g-flex p-y-10">
				<view class="title f-14" style="padding: 10rpx 0;">
					内容
				</view>
				<view class="info g-f-1" style="position: relative;">
					<u-input type="textarea" placeholder="请输入内容正文（最多输入500字）" :clearable="false" v-model="code" height="200" />
				</view>
			</view>
			<u-button class="btn" shape="circle" @click="release" type="error">发布</u-button>
		</view>
	</view>
</template>

<script>
	import Interface from '@/api/ApiPath.js'
	export default {
		data() {
			return {
				name: '',
				parent: '无人机',
				code: '',
				list: [],
			}
		},
		onLoad() {
			uni.request({
				url: Interface.url.getPostType,
				method: "GET",
				data: {},
				success: (res) => {
					this.list = res.data.data
					console.log(this.list)
				},
				fail: (err) => {}
			});
		},
		methods: {
			release() {
				uni.request({
					url: Interface.url.addPostInfo,
					header: {},
					method: "GET",
					data: {
						name: this.name,
						code: this.code,
						parentCode: this.list.find(item => {
							return item.name == this.parent
						}).parentCode,
						createUserId: '12487238461289',
						createUser: "asdasdfasd"
					},
					success: (res) => {
						if (res.data.state == 0) {
							uni.showToast({
								title: res.data.message,
								icon: "success",
								duration: 2000
							});
							setTimeout(() => {
								uni.navigateBack()
							}, 2000)
						}
					},
					fail: (err) => {}
				});
			}
		}
	}
</script>

<style lang="scss">
	.title {
		width: 140rpx;
		color: #505050;
	}

	.b-b {
		border-bottom: 1rpx solid #999;
	}

	.btn {
		position: absolute;
		bottom: 40rpx;
		width: calc(100% - 80rpx);
		left: 40rpx;
	}
</style>
