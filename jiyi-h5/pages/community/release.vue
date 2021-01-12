<template>
	<view>
		<HeaderSearch title="发帖" @searchCallback="search"></HeaderSearch>
		<view class="comm-form-container">
			<view class="item">
				<text>*</text>	
				<view class="title title-s">标题</view>
				<view class="info"><u-input placeholder="输入标题" :clearable="false" v-model="name" height="64" /></view>
			</view>
			<view class="item">
				<text>*</text>	
				<view class="title title-s">类别</view>
				<view class="info">
					<u-radio-group v-model="parent" :size="30" active-color="#5EB14E"	>
						<u-radio v-for="(item, index) in list" :key="index" :name="item.name" :disabled="item.disabled">{{ item.name }}</u-radio>
					</u-radio-group>
				</view>
			</view>
			<view class="item">
				<text>{{`  `}}</text>
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
					></u-upload>
				</view>
			</view>
			<view class="item">
				<text>*</text>	
				<view class="title title-s" style="padding: 10rpx 0;">内容</view>
				<view class="info" style="position: relative;">
					<u-input type="textarea" placeholder="请输入内容正文（最多输入500字）" :maxlength="500" :auto-height="false" :clearable="false" v-model="code" height="600" />
				</view>
			</view>
			<u-button class="btn" shape="circle" @click="release" type="error">发布帖子</u-button>
		</view>
	</view>
</template>

<script>
import Interface from '@/api/ApiPath.js';

export default {
	data() {
		return {
			name: '',
			parent: '无人机',
			code: '',
			list: [],
			action: Interface.url.uploadImg,
			fileList: [],
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
			this.$refs.uToast.show({
				title: '上传成功',
				type: 'success'
			});
			this.url.push(data.url);
			this.show = false;
			this.u = this.url;
		},
		onChoose(lists, name) {
			this.show = true;
		},
		release() {
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
				url: Interface.url.addPostInfo,
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
	
	width: calc(100% - 40rpx);
	
	background-color: #5EB14E;
	margin: 20rpx auto 40rpx auto;
}
</style>
