<template>
	<view>
		<HeaderSearch title="发帖" @searchCallback="search"></HeaderSearch>
		<view class="comm-form-container">
			<view class="item">
				<view class="required">*</view>
				<view class="title title-s">标题</view>
				<view class="info"><u-input placeholder="输入标题" :clearable="false" v-model="name" height="64" /></view>
			</view>
			<view class="item">
				<view class="required">*</view>
				<view class="title title-s">类别</view>
				<view class="info">
					<u-radio-group v-model="parent" :size="30" active-color="#5EB14E">
						<u-radio v-for="(item, index) in list" :key="index" :name="item.id" :disabled="item.disabled">{{ item.name }}</u-radio>
					</u-radio-group>
				</view>
			</view>
			<view class="item">
				<view class="required"></view>
				<view class="title title-s">图片</view>
				<view class="info">
					<u-upload
						width="168"
						height="168"
						:show-progress="false"
						:action="action"
						@on-choose-complete="onChoose"
						@on-remove="remove"
						@on-success="uploadSuccess"
						:file-list="fileList"
						max-count="9"
						multiple
					></u-upload>
				</view>
			</view>
			<view class="item">
				<view class="required">*</view>
				<view class="title title-s" style="padding: 10rpx 0;">内容</view>
				<view class="info" style="position: relative;">
					<u-input type="textarea" placeholder="请输入内容正文（最多输入500字）" :maxlength="500" :auto-height="false" :clearable="false" v-model="code" height="600" />
				</view>
			</view>
			<!-- <CommReply></CommReply> -->
			<view class="publish">
				<u-checkbox-group>
					<u-checkbox v-model="checked" active-color="#5EB14E"><text style="color:#9FA3A8">匿名发布</text></u-checkbox>
				</u-checkbox-group>
			</view>
			<u-button class="btn" shape="circle" @click="addCommunity" type="error">发布帖子</u-button>
		</view>
	</view>
</template>

<script>
import Interface from '@/api/ApiPath.js';

export default {
	data() {
		return {
			name: '',
			parent: '',
			code: '',
			list: [],
			action: Interface.url.uploadImg,
			fileList: [],
			checked: false,
			url: []
		};
	},
	onLoad() {
		uni.request({
			url: Interface.url.getPostType,
			method: 'GET',
			data: {},
			success: res => {
				this.list = res.data.data;
			},
			fail: err => {}
		});
	},
	methods: {
		remove(index, lists) {
			this.url.splice(index, 1);
		},
		uploadSuccess(data, index, lists, name) {
			uni.showToast({
				title: '上传成功',
				duration: 1000,
				icon: 'success'
			});
			this.url.push(data.url);
		},
		onChoose(lists, name) {
			console.log(this.url);
		},
		addCommunity() {
			if (this.name == '') {
				uni.showToast({
					title: '请输入标题'
				});
				return;
			}
			if (this.parent == '') {
				uni.showToast({
					title: '请输选择帖子类别'
				});
				return;
			}
			if (this.code == '') {
				uni.showToast({
					title: '请输入内容'
				});
				return;
			}
			let params = {
				name: this.name,
				code: this.code,
				parentCode: this.parent,
				is_anonymous: this.checked ? '1' : '0',
				addItem: this.url,
				header: getApp().globalData.pic,
				createUser: getApp().globalData.nickName,
				creatUserID: getApp().globalData.userId
			};
			this.$ajax(Interface.url.postInfoAddPostInfo, 'GET', params)
				.then(res => {
					if (res.code == 200) {
						console.log(2122222);
						uni.showToast({
							title: '发布帖子成功，等待审核',
							icon: 'none',
							duration: 2000,
							success: () => {
								uni.reLaunch({
									url: '/pages/tabbar/community/index'
								});
							}
						});
					} else {
						uni.showToast({
							title: '发布帖子失败，请联系管理员或重新发布',
							icon: 'none',
							duration: 2000
						});
					}
				})
				.catch(err => {
					uni.showToast({
						title: '系统错误，请联系管理员',
						icon: 'none',
						duration: 2000
					});
				});
		},

		release() {
			console.log(this.parent);
			if (this.name == '') {
				uni.showToast({
					title: '请输入标题'
				});
				return;
			}
			if (this.code == '') {
				uni.showToast({
					title: '请输入内容'
				});
				return;
			}
			uni.request({
				url: Interface.url.postInfoAddPostInfo,
				method: 'GET',
				data: {
					name: this.name,
					code: this.code,
					parentCode: this.list.find(item => {
						return item.name == this.parent;
					}).id,
					createUserId: localStorage.getItem('userId'),
					createUser: ''
				},
				success: res => {
					if (res.data.state == 0) {
						uni.showToast({
							title: '发布帖子成功，等待审核',
							icon: 'success',
							duration: 2000
						});
						setTimeout(() => {
							uni.navigateBack();
						}, 2000);
					} else {
						uni.showToast({
							title: '发布帖子失败，请联系管理员或重新发布',
							icon: 'success',
							duration: 2000
						});
					}
				},
				fail: err => {
					uni.showToast({
						title: '系统崩溃，请联系管理员',
						icon: 'success',
						duration: 2000
					});
				}
			});
		}
	}
};
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
	background-color: #5eb14e;
	margin: 20rpx auto 40rpx auto;
}
.publish {
	line-height: 60rpx;
}
</style>
