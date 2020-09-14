<template>
	<view>
		<HeaderSearch hideBack title="发布" @searchCallback="search"></HeaderSearch>
		<view class="p-x-10  g-flex g-a-c " style="position: absolute; bottom: 40rpx;">
			<view class="btn f-12" v-for="(item, index) in btnList" @click="jump(item, index)" :key="index">
				<view class="img g-flex g-a-c g-j-c m-c">
					<image :src="item.src" mode=""></image>
				</view>
				<view class="name">
					{{item.name}}
				</view>
			</view>
		</view>
		<u-mask :show="show" :mask-click-able="maskAble"></u-mask>
	</view>
</template>

<script>
	import HeaderSearch from '@/components/HeaderSearch/HeaderSearch.vue'
	import ApiPath from "@/api/ApiPath.js";
	export default {
		components: {
			HeaderSearch
		},
		data() {
			return {
				btnList: [],
				show: true,
				maskAble: false
			};
		},
		onLoad() {
			this.moduleShow();
		},
		onShow() {

		},
		onHide() {

		},
		methods: {
			moduleShow() {
				let param = {}
				uni.request({
					method: 'GET', //请求方式
					data: param, //请求数据
					url: ApiPath.url.moduleShow, //请求接口路径
					success: (res) => { //成功返回结果方法
						if (res.data.state == 0) {
							let resp = [];
							for (var i = 0; i < res.data.data.length; i++) {
								resp.push({
									'url': res.data.data[i].linkUrl, //连接路径
									'src': res.data.data[i].picUrl, //图片地址
									'name': res.data.data[i].deployModuleName, //发布模块名称
								})
							}
							this.btnList = resp;
						}
						this.show = false;
					},
					fail: (err) => {
						this.show = false;
					}
				})
			},
			jump(item) {
				uni.navigateTo({
					url: item.url //跳转地址
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
			border-radius: 28rpx;
			overflow: hidden;
			width: 100rpx;
			height: 100rpx;
			display: flex;
			justify-content: center;
			align-items: center;

			image {
				width: 100%;
				height: 100%;
			}
		}

		.name {
			line-height: 56rpx;
			text-align: center;
			color: #505050;
		}
	}
</style>
