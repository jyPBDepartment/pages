<template>
	<view>
		<HeaderSearch :title="title"></HeaderSearch>
		<view class="init">
			<view class="roll-out">
				<swiper class="roll" :current="current" @change="getCurrent">
					<block v-for="item in banner" :key="item">
						<swiper-item><image :src="item.url" mode="aspectFill" class="swiperImage"></image></swiper-item>
					</block>
				</swiper>
				<view class="toleft" @click="toleft()"></view>
				<view class="toright" @click="toright()"></view>
			</view>
			<view class="p-x-10  b-t content-box">
				<view class="title">{{ name }}</view>

				<view class="price f-16">
					<text v-if="isFace == '0'">面议</text>
					<text v-if="isFace == '1'">
						<span v-if="type==0">￥{{ price }}元/斤</span>
						<span v-else>￥{{ price }}元/台</span>
						</text>
				</view>
				<view class="info g-flex g-a-c g-j-s-b">
					<text class="item-info" v-if="transactionTypeCode == '0'">类型：收购</text>
					<text class="item-info" v-if="transactionTypeCode == '1'">类型：出售</text>
					<text class="item-info" v-if="transactionCategoryCode == '0'">类别：玉米</text>
					<text class="item-info" v-if="transactionCategoryCode == '2'">类别：水稻</text>
					<text class="item-info" v-if="transactionCategoryCode == '3'">类别：高粱</text>
					<text class="item-info" v-if="transactionCategoryCode == '4'">类别：黄豆</text>
				</view>
				<view class="info g-flex g-a-c g-j-s-b">
					<view class="item-user">联系人：{{ contactsUser }}<u-icon v-if="isMain == '0'"  name="chat" style="margin-left: 10rpx;" color="#2979ff" size="40" @tap="goToImPage"></u-icon></view>
					<text class="item-info">联系电话：{{ contactsPhone }}</text>
				</view>
				<view class="info">
					<text>地址：{{ address }}</text>
				</view>

				<view class="space"></view>
				<view class="info info-last">
					<text class="item-info f-16">描述</text>
					<view class="item-info desc f-12">{{ descrip }}</view>
				</view>
				<view v-if="isDisplay !== 0" class="btn g-flex">
					<view class="g-f-1"><u-button @click="cencal(true)" shape="circle">取消发布</u-button></view>
					<view class="g-f-1"><u-button @click="updateInfo(id)" type="error" shape="circle">修改信息</u-button></view>
				</view>
			</view>
		</view>
		<CancelReason @confirm="confirm" :isShow="cencalIsShow" @isShow="cencal"></CancelReason>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
import HeaderSearch from '../../components/HeaderSearch/HeaderSearch.vue';
import CancelReason from '../../components/CancelReason/CancelReason.vue';
//后台路径引用
import ApiPath from '@/api/ApiPath.js';
export default {
	components: {
		HeaderSearch,
		CancelReason
	},
	data() {
		return {
			cencalIsShow: false,
			current: '0',
			param: null,
			price: '',
			company: '',
			item: [],
			banner: [],
			transactionTypeCode: '',
			transactionCategoryCode: '',
			labelCode: '',
			model: '',
			articleNumber: '',
			address: '',
			contactsUser: '',
			contactsPhone: '',
			descrip: '',
			isFace: '',
			url: '',
			name: '',
			isDisplay: 0, //默认不显示信息
			isMain: '1',
			id: '',
			status: '',
			reason: '',
			title:'',
			accId: localStorage.getItem("accId")
		};
	},
	//页面初始化
	onLoad(e) {
		this.isMain = e.isMain;
		this.type = e.type;
		if(e.type==0){
			this.title="粮食买卖详情"
		}else{
			this.title="农机详情"
		}
		this.findMineId(e.id);
		this.id = e.id;
	},
	methods: {
		//查看详情
		findMineId(val) {
			let param = {
				id: val
			};
			uni.request({
				method: 'GET', //请求方式
				data: param, //请求数据
				url: ApiPath.url.findMineId, //请求接口路径
				success: res => {
					//成功返回结果方法
					if (res.data.state == 0) {
						this.transactionTypeCode = res.data.data.transactionTypeCode;
						this.transactionCategoryCode = res.data.data.transactionCategoryCode;
						this.labelCode = res.data.data.labelCode;
						this.model = res.data.data.model;
						this.articleNumber = res.data.data.articleNumber;
						this.address = res.data.data.address;
						this.contactsUser = res.data.data.contactsUser;
						this.contactsPhone = res.data.data.contactsPhone;
						if (res.data.data.descrip != '') {
							this.descrip = res.data.data.descrip;
						} else {
							this.descrip = '无';
						}

						this.price = res.data.data.price;
						this.isFace = res.data.data.isFace;
						// this.url = res.data.data.url
						this.name = res.data.data.name;
						if (this.isMain == '1') {
							if (res.data.data.status != 0 && res.data.data.status != 3) {
								this.isDisplay = 1;
							}
						} else {
							this.isDisplay = 0;
						}

						//查找图片
						for (var i = 0; i < res.data.dataPic.length; i++) {
							this.banner.push({
								url: res.data.dataPic[i].picUrl
							});
						}
					}
				}
			});
		},
		updateInfo(getId) {
			uni.navigateTo({
				url: '/pages/grain/cornUpdateInfo?id=' + getId
			});
		},
		//先获取当前的current
		getCurrent: function(e) {
			this.current = e.detail.current;
		},
		//向左滑动
		toleft: function() {
			if (this.current == '0') {
				this.current = this.banner.length - 1;
			} else {
				this.current = this.current - 1;
			}
		},
		//向右滑动
		toright: function() {
			if (this.current == this.banner.length - 1) {
				this.current = '0';
			} else {
				this.current = this.current + 1;
			}
		},
		cencal(e) {
			this.cencalIsShow = e;
		},
		//取消发布
		confirm(val) {
			if (val == '') {
				this.$refs.uToast.show({
					title: '请输入取消原因',
					type: 'error'
				});

				return false;
			}
			let param = {
				id: this.id,
				status: this.status,
				reason: val
			};
			uni.request({
				method: 'GET', //请求方式
				data: param, //请求数据
				url: ApiPath.url.cancelPub,
				success: res => {
					if (res.data.state == 0) {
						uni.showToast({
							title: '取消发布成功！'
						});
						//取消跳转
						uni.navigateTo({
							url: '../catalog/agriculturalMachinery?index=1'
						});
					} else {
						uni.showToast({
							title: '取消发布失败，请联系管理员或重新发布！'
						});
					}
				}
			});
			this.cencalIsShow = false;
		},
		goToImPage() {
		  // window.location.href = "http://192.168.1.108:2001/webdemo/h5/index.html#/chat/p2p-73jl000048?uid=73jl000006&token=73jl000006";
		  let token = localStorage.getItem("token") || "73jl000006";
		  let uid = localStorage.getItem("uid") || "73jl000006";
		  let sid = localStorage.getItem("sid") || "73jl000048";
		  uni.navigateTo({
		    url: `/pages/imPage/imPage?token=${token}&sid=${sid}&uid=${uid}`,
		  });
		},
	}
};
</script>

<style lang="scss">
.init {
	.content-box {
		.title {
			padding: 10rpx 0;
			color: rgba(51, 51, 51, 1);
			font-size: 30rpx;
			line-height: 150%;
			text-align: left;
		}
		.price {
			font-size: 42rpx;
			margin-top: 16rpx;
			padding: 10rpx;
		}
		.info {
			color: #999;
			padding: 10rpx;
			.item-info {
				display: flex;
				justify-content: space-between;
				font-size: 28rpx;
			}
			.item-user {
				justify-content: space-between;
				font-size: 28rpx;
			}
			.desc {
				color: #666;
				font-size: 26rpx;
				padding: 20rpx 50rpx;
			}
		}
		.info-last {
			padding-bottom: 20rpx;
			color: #333;
			margin-top: 52rpx;
			min-height: 80rpx;
		}
		.btn {
			view {
				padding: 20rpx;
			}
		}
	}

	.roll-out {
		position: relative;

		.roll {
			width: 750rpx;
			height: 750rpx;
		}

		swiper-item {
			width: 100%;
			height: 100%;

			.roll-image {
				width: 750rpx;
				height: 750rpx;
			}
		}

		.toleft {
			width: 30rpx;
			height: 30rpx;
			position: absolute;
			top: 50%;
			left: 36rpx;
			border-right-color: transparent;
			border-color: #fff;
			border-width: 0 0 4px 4px;
			border-style: solid;
			transform: rotate(45deg) translateY(-50%);
		}

		.toright {
			width: 30rpx;
			height: 30rpx;
			position: absolute;
			top: 50%;
			right: 60rpx;
			border-right-color: transparent;
			border-color: #fff;
			border-width: 4px 4px 0 0;
			border-style: solid;
			transform: rotate(45deg) translateY(-50%);
		}
	}

	.tag {
		width: 72rpx;
		line-height: 50rpx;
		background: #ff0000;
		color: #fff;
		text-align: center;
	}

	.labels {
		.label {
			padding: 5rpx 20rpx;
			border: 1px solid #e51c2e;
			border-radius: 30rpx;
			color: #e51c2e;
			margin-right: 20rpx;
		}
	}

	.info {
		.text {
			min-width: 33%;
		}
	}

	.space {
		width: 750rpx;
		height: 22rpx;
		background-color: rgba(229, 229, 229, 1);
		margin: 26rpx 0rpx -26rpx -24rpx;
	}
}

.swiperImage {
	width: 750rpx;
	height: 750rpx;
}
</style>
