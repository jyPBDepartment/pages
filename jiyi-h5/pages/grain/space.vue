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
			<view class="content-box">
				<view class="price">
					<text v-if="isFace == '0'">面议</text>
					<text v-if="isFace == '1'">
						<span v-if="type == 0">￥{{ price }}元/{{ company }}</span>
						<span v-else>￥{{ price }}元/{{ company }}</span>
					</text>
				</view>
				<view class="title">{{ name }}</view>
				<view class="info g-flex g-a-c">
					<text class="item-info" v-if="transactionTypeCode == '0'">类型：收购</text>
					<text class="item-info" v-if="transactionTypeCode == '1'">类型：出售</text>
					<text class="item-info" v-if="transactionCategoryCode == '0'">类别：玉米</text>
					<text class="item-info" v-if="transactionCategoryCode == '2'">类别：水稻</text>
					<text class="item-info" v-if="transactionCategoryCode == '3'">类别：高粱</text>
					<text class="item-info" v-if="transactionCategoryCode == '4'">类别：黄豆</text>
				</view>
				<view class="info g-flex g-a-c">
					<view class="item-user g-flex g-a-c g-f-1">
						<!-- <image src="../../static/img/tabbar/guanzhuactive.png" mode="" style="width: 28rpx;height:28rpx;margin-right: 20rpx;"></image> -->
						<text>{{ contactsUser }}</text>
						<u-icon v-if="isMain == '0' && createUserId != accId" name="chat" style="margin-left: 10rpx;" color="#2979ff" size="40" @tap="goToImPage"></u-icon>
					</view>

					<view v-if="address" class="item-addr g-flex g-a-c g-f-1">
						<u-icon style="margin-right: 5rpx;" name="http://60.205.246.126/images/2021/01/11/1610334898551200.png" color="#9FA3A8" size="24"></u-icon>
						{{ address }}
					</view>
				</view>

				<view class="info g-flex g-a-c g-j-s-b">
					<view class="item-contacts g-flex g-a-c">
						<u-icon name="http://60.205.246.126/images/2021/01/11/1610337099768047.png" style="margin-right: 10rpx;" color="#5EB14E" size="24"></u-icon>
						<text>联系电话：{{ contactsPhone }}</text>
					</view>
					<text>2020-12-15 15：03</text>
				</view>
				<view class="fun-btn">
					<view class="item">
						<u-icon style="margin-right: 10rpx;" name="http://60.205.246.126/images/2021/01/11/1610334104458166.png" size="24"></u-icon>
						<text>{{ viewNum }}</text>
					</view>
					<view class="item" @tap.stop="clickIcon(curCollention, 1)">
						<u-icon v-if="curCollention == 0" style="margin-right: 10rpx;" name="http://60.205.246.126/images/2021/01/11/1610334200305905.png" size="24"></u-icon>
						<u-icon v-else style="margin-right: 10rpx;" name="http://60.205.246.126/images/2021/01/11/1610334414334544.png" size="24"></u-icon>
						<text>{{ collectionNum }}</text>
					</view>
					<view class="item" @tap.stop="clickIcon(curPraise, 2)">
						<u-icon v-if="curPraise == 0" style="margin-right: 10rpx;" name="http://60.205.246.126/images/2021/01/11/1610333920310281.png" size="24"></u-icon>
						<u-icon v-else style="margin-right: 10rpx;" name="http://60.205.246.126/images/2021/01/11/1610335031904388.png" size="24"></u-icon>
						<text>{{ praiseNum }}</text>
					</view>
				</view>
				<view class="space"></view>
				<view class="comment-box-c">
					<view class="top-box-c">
						<text>评论({{ commentNum }})</text>
						<view class="right">
							<text @tap="goCommentList">{{ commentNum ? '全部评论' : '去评论' }}</text>
							<u-icon name="arrow-right" style="margin-left: 5rpx" color="#5eb14e" size="24"></u-icon>
						</view>
					</view>
					<u-line v-if="commentNum" color="rgba(0, 0, 0, 0.1)" />
					<view v-if="commentNum" class="content">
						<view class="header">
							<image class="image" :src="commentObj.commentPic || '../../static/img/tabbar/guanzhuactive.png'"></image>
							<text class="users">{{ commentObj.isAnonymous ? '匿名' : commentObj.commentUserName ? commentObj.commentUserName : '匿名' }}</text>
						</view>

						<p class="words">{{ commentObj.commentContent }}</p>
					</view>
				</view>

				<view class="space"></view>
				<view class="info info-last">
					<text>描述</text>
					<view class="desc">{{ descrip }}</view>
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
			content: `山不在高，有仙则名。水不在深，有龙则灵。斯是陋室，惟吾德馨。
				苔痕上阶绿，草色入帘青。谈笑有鸿儒，往来无白丁。可以调素琴，阅金经。
				无丝竹之乱耳，无案牍之劳形。南阳诸葛庐，西蜀子云亭。孔子云：何陋之有？`,
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
			title: '',
			accId: '',
			commentNum: 0,
			praiseNum: 0,
			collectionNum: 0,
			viewNum: 0,

			curCollention: 0,
			curPraise: 0,
			createUserId: localStorage.getItem('userId'),
			collection: false,
			thumbs: false,
			commentObj: {
				id: '402881e976e0bdd20176e0be284d0001',
				aid: '402881ec747b392e01747b4236320000',
				commentContent: '娃哈哈有很多新产品',
				commentUserName: '张三',
				commentPic: '头像',
				commentUserId: '张三的id',
				isAnonymous: 0,
				status: 1,
				commentDate: '2021-01-08 14:45:27'
			}
		};
	},
	//页面初始化
	onLoad(e) {
		this.isMain = e.isMain;
		this.type = e.type;
		if (e.type == 0) {
			this.title = '粮食买卖详情';
			this.company = '斤';
		} else {
			this.title = '农机详情';
			this.company = '台';
		}

		// this.$u.debounce(this.findMineId(e.id), 1000);

		this.id = e.id;
		this.isMine = e.isMine;
		if (e.isMine == 1) {
			this.title = '粮食买卖详情';
			this.company = '斤';
		}
	},
	onShow() {
		this.$u.debounce(this.findMineId(this.id), 1000);
	},
	methods: {
		addGrainTradingAddPV(id) {
			let self = this;
			self.$ajax(ApiPath.url.grainTradingAddPV, 'GET', { id: id }).then(res => {
				if (res.code == 200) {
					self.viewNum = res.data;
				}
			});
		},
		goCommentList() {
			uni.navigateTo({
				url: '/pages/commentList/commentList?id=' + this.id + '&type=1'
			});
		},
		clickIcon(item, val) {
			if (val == 1) {
				//收藏点击
				this.setCollection(item);
			}
			if (val == 2) {
				// 点赞
				this.setPraiseThumbs(item);
			}
		},
		// 收藏
		setCollection(item, i) {
			let self = this;
			let params = {
				action: item ? 0 : 1,
				agrId: this.id,
				userId: getApp().globalData.userId
			};
			this.$ajax(ApiPath.url.grainTradingSetCollection, 'GET', params)
				.then(res => {
					if (res.code == 200) {
						if (this.curCollention == 1) {
							this.collectionNum = this.collectionNum - 1;
							this.curCollention = 0;
						} else {
							this.collectionNum = this.collectionNum + 1;
							this.curCollention = 1;
						}
						uni.showToast({
							title: res.message,
							duration: 1000,
							icon: 'loading'
						});
					}
				})
				.catch(err => {});
		},
		// 点赞
		setPraiseThumbs(item, i) {
			let self = this;
			let params = {
				action: item ? 0 : 1,
				agrId: this.id,
				userId: getApp().globalData.userId
			};
			this.$ajax(ApiPath.url.grainTradingSetPraise, 'GET', params)
				.then(res => {
					if (res.code == 200) {
						if (this.curPraise == 1) {
							this.praiseNum = this.praiseNum - 1;
							this.curPraise = 0;
						} else {
							this.praiseNum = this.praiseNum + 1;
							this.curPraise = 1;
						}
						uni.showToast({
							title: res.message,
							duration: 1000,
							icon: 'loading'
						});
					}
				})
				.catch(err => {});
		},

		//查看详情
		findMineId(val) {
			let param = {
				id: val,
				userId: getApp().globalData.userId
			};
			uni.request({
				method: 'GET', //请求方式
				data: param, //请求数据
				url: ApiPath.url.grainTradingMobileView, //请求接口路径
				success: res => {
					//成功返回结果方法
					if (res.data.code == 200) {
						this.$u.debounce(this.addGrainTradingAddPV(this.id), 2000);

						this.transactionTypeCode = res.data.agr.transactionTypeCode;
						this.transactionCategoryCode = res.data.agr.transactionCategoryCode;
						this.labelCode = res.data.agr.labelCode;
						this.model = res.data.agr.model;
						this.articleNumber = res.data.agr.articleNumber;
						this.address = res.data.agr.address;
						this.contactsUser = res.data.agr.contactsUser;
						this.contactsPhone = res.data.agr.contactsPhone;
						this.accId = res.data.agr.accId;
						this.createUserId = res.data.agr.createUserId;

						this.commentNum = res.data.agr.commentNum;
						this.praiseNum = res.data.agr.praiseNum;
						this.collectionNum = res.data.agr.collectionNum;
						this.viewNum = res.data.agr.viewNum;
						this.commentObj = res.data.comment;

						this.curCollention = res.data.curCollection;

						this.curPraise = res.data.curPrise;

						if (res.data.agr.descrip != '') {
							this.descrip = res.data.agr.descrip;
						} else {
							this.descrip = '无';
						}

						this.price = res.data.agr.price;
						this.isFace = res.data.agr.isFace;
						// this.url = res.data.data.url
						this.name = res.data.agr.name;
						if (this.isMain == '1') {
							if (res.data.agr.status != 0 && res.data.agr.status != 3) {
								this.isDisplay = 1;
							}
						} else {
							this.isDisplay = 0;
						}

						//查找图片
						for (var i = 0; i < res.data.agrPic.length; i++) {
							this.banner.push({
								url: res.data.agrPic[i].picUrl
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
			let token = localStorage.getItem('accId');
			let uid = localStorage.getItem('accId');
			let sid = this.accId;
			// uni.navigateTo({
			//   url: `/pages/imPage/imPage?token=${token}&sid=${sid}&uid=${uid}`,
			// });
			if (!localStorage.getItem('accId')) {
				let U = localStorage.getItem('userId');
				let SI = localStorage.getItem('sessionId');
				uni.showToast({
					title: '登录信息有误，请重新登录',
					icon: 'none',
					duration: 2000,
					success: () => {
						setTimeout(() => {
							uni.reLaunch({
								url: '/?U=' + U + '&SI=' + SI
							});
						}, 1000);
					}
				});
			} else if (!this.accId) {
				uni.showToast({
					title: '客服信息有误，请电话联系',
					icon: 'none',
					duration: 2000
				});
			} else {
				uni.navigateTo({
					url: `/pages/imPage/imPage?token=${token}&sid=${sid}&uid=${uid}`
				});
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.init {
	.content-box {
		font-size: 24rpx;

		.title {
			padding: 10rpx 40rpx;
			font-size: 30rpx;
			font-weight: 600;
			line-height: 60rpx;
			color: #000000;
			opacity: 1;
		}

		.price {
			padding: 10rpx 40rpx;
			text-align: left;
			font-size: 42rpx;
			font-weight: 600;
			line-height: 30px;
			color: #5eb14e;
			opacity: 1;
		}

		.info {
			color: #9fa3a8;
			padding: 10rpx 40rpx;
			.item-info {
				display: flex;
				font-size: 28rpx;
				flex: 1;
			}

			.item-user {
				font-size: 28rpx;
				color: #9fa3a8;
			}
			.item-addr {
				font-size: 24rpx;
				color: #9fa3a8;
			}
			.item-contacts {
				color: #5eb14e;
				font-weight: 400;
			}
			.desc {
				font-size: 26rpx;
				color: #a2a2a2;
				padding: 20rpx 40rpx;
			}
		}

		.info-last {
			padding: 10rpx 40rpx;
			min-height: 80rpx;
			font-size: 32rpx;
			font-weight: 600;
			color: #000000;
			opacity: 1;
		}
		.fun-btn {
			font-size: 24rpx;
			font-weight: 400;
			line-height: 60rpx;
			color: #9fa3a8;
			opacity: 1;
			margin: 20rpx 0;
			display: flex;
			justify-content: space-between;
			padding: 0 40rpx;
			.item {
				display: flex;
				align-items: center;
				height: 30rpx;
			}
		}
		.comment-box-c {
			.top-box-c {
				display: flex;
				justify-content: space-between;
				font-size: 24rpx;
				font-weight: 400;
				color: #000000;
				opacity: 1;
				height: 80rpx;
				line-height: 80rpx;
				padding: 0 40rpx;
				.right {
					color: #5eb14e;
				}
			}
			.content {
				.header {
					display: flex;
					align-items: center;
					font-size: 24rpx;
					font-weight: 400;
					color: #000000;
					opacity: 1;
					height: 80rpx;
					line-height: 80rpx;
					padding: 0 40rpx;
					.image {
						width: 48rpx;
						height: 48rpx;
						border-radius: 24rpx;
					}
					.users {
						flex: 1;
						padding-left: 20rpx;
						font-size: 24rpx;
						font-weight: 400;
						line-height: 30rpx;
						color: #9fa3a8;
						opacity: 1;
					}
				}
				.words {
					padding: 0 40rpx 20rpx 40rpx;
					font-size: 24rpx;
					font-weight: 400;
					line-height: 30rpx;
					color: #000000;
					opacity: 1;
				}
			}
		}
		.btn {
			view {
				padding: 20rpx;
			}
		}
		.space {
			width: 100%;
			height: 20rpx;
			background-color: rgba(229, 229, 229, 1);
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
}

.swiperImage {
	width: 750rpx;
	height: 750rpx;
}
</style>
