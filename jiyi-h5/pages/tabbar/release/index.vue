<template>
	<view>
		<HeaderSearch hideBack title="发布" @searchCallback="search"></HeaderSearch>
		<view class="p-x-10  g-flex g-a-c " style="margin-top: 40rpx;">
			<view class="btn f-12" v-for="(item, index) in btnList" @click="jump(item, index)" :key="index">
				<view class="img g-flex g-a-c g-j-c m-c"><image :src="item.src" mode=""></image></view>
				<view class="name">{{ item.name }}</view>
			</view>
		</view>
		<u-mask :show="show" :mask-click-able="maskAble"></u-mask>
		<u-popup mode="center" width="500" height="550" v-model="isShow" :closeable="isClose" @close="close" border-radius="10">
			<view class="content">
				<view class="title">请选择身份</view>
				<view class="confrim-btn">
					<u-button style="width: 200rpx;" type="success" @click="link('1')">农户</u-button>
					<br/>
					<u-button style="width: 200rpx;" type="warning" @click="link('2')">粮贩</u-button>
					<br/>
					<u-button style="width: 200rpx;" type="primary" @click="link('3')">粮库</u-button>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
import HeaderSearch from '@/components/HeaderSearch/HeaderSearch.vue';
import ApiPath from '@/api/ApiPath.js';
export default {
	components: {
		HeaderSearch
	},
	data() {
		return {
			btnList: [],
			show: true,
			maskAble: false,
			isCancel: true,
			isShow: false,
			form: {
				name: '',
				intro: '',
				sex: ''
			},
			isClose: false,
			url: ''
		};
	},
	watch: {
		$route(to, from) {
			if (to.path.indexOf('release') > -1) {
				// this.moduleShow();
				// this.isShow=false;
			}
		}
	},
	onLoad() {
		this.moduleShow();
	},
	onShow() {},
	onHide() {},
	methods: {
		moduleShow() {
			let param = {};
			uni.request({
				method: 'GET', //请求方式
				data: param, //请求数据
				url: ApiPath.url.moduleShow, //请求接口路径
				success: res => {
					//成功返回结果方法
					if (res.data.state == 0) {
						let resp = [];
						for (var i = 0; i < res.data.data.length; i++) {
							resp.push({
								url: res.data.data[i].linkUrl, //连接路径
								src: res.data.data[i].picUrl, //图片地址
								name: res.data.data[i].deployModuleName //发布模块名称
							});
						}
						this.btnList = resp;
					}
					this.show = false;
				},
				fail: err => {
					this.show = false;
				}
			});
		},
		jump(item) {
			this.url = item.url;
			if (item.name == '粮食买卖') {
				this.isShow = true;
			} else {
				uni.navigateTo({
					url: item.url //跳转地址
				});
			}
		},
		link(val) {
			uni.navigateTo({
				url: this.url + '?type=' + val //跳转地址
			});
			this.isShow = false;
		},
		close() {
			this.url = ''; //关闭时清空路径
		}
	}
};
</script>

<style lang="scss" scoped>
	

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
.content {
	padding: 24rpx;
	text-align: center;
	border-radius: 10rpx;
	.title{
		font-size: 36rpx;
		padding: 20rpx;
		font-weight: bold;
		
	}
	.confrim-btn {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 30rpx;
	}
}
</style>
