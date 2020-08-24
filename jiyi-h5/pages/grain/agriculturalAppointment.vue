<template>
	<view>
		<HeaderSearch @searchCallback="search" title="农服预约"></HeaderSearch>
		<view class="p-10">
			<view class="g-flex p-y-10 g-a-c">
				<view class="title f-14" >
					日期
				</view>
				<view class="info g-f-1" style="position: relative;">
					<u-icon name="calendar" class="input-icon"></u-icon>
					<u-input @click="dateShow = true" disabled placeholder="请选择时间" :clearable="false" :focus="true" v-model="value"
					 border height="64" />
				</view>
			</view>
			<view class="g-flex p-y-10 g-a-c">
				<view class="title f-14" >
					农作物类型
				</view>
				<view class="info g-f-1" style="position: relative;">
					<u-input placeholder="请选择" v-model="value" type="select" border @click="sexShow = true" />
					<u-action-sheet :list="actionSheetList" v-model="sexShow" @click="actionSheetCallback"></u-action-sheet>
				</view>
			</view>
			<view class="g-flex p-y-10 g-a-c">
				<view class="title f-14" >
					农服类别
				</view>
				<view class="info g-f-1" style="position: relative;">
					<u-input placeholder="请选择" v-model="value" type="select" border @click="sexShow = true" />
					<u-action-sheet :list="actionSheetList" v-model="sexShow" @click="actionSheetCallback"></u-action-sheet>
				</view>
			</view>
			<view class="g-flex p-y-10 g-a-c">
				<view class="title f-14" >
					面积
				</view>
				<view class="info g-f-1" style="position: relative;">
					<u-input placeholder="输入内容" :clearable="false" :focus="true" v-model="value" border height="64" />
				</view>
			</view>
			<view class="g-flex p-y-10 g-a-c">
				<view class="title f-14" >
					干活地点
				</view>
				<view class="info g-f-1" style="position: relative;">
					<u-input placeholder="请选择" v-model="value" type="select" border @click="sexShow = true" />
					<u-action-sheet :list="actionSheetList" v-model="sexShow" @click="actionSheetCallback"></u-action-sheet>
				</view>
			</view>
			<view class="g-flex p-y-10 g-a-c">
				<view class="title f-14" >
					农活价格
				</view>
				<view class="info g-f-1" style="position: relative;">
					<span class="input-icon f-14" style="color: #a6a6a6;">元/天</span>
					<u-input placeholder="输入内容" :clearable="false" :focus="true" v-model="value" border height="64" />
				</view>
			</view>
			<view class="g-flex p-y-10 g-a-c">
				<view class="title f-14" >
					联系人
				</view>
				<view class="info g-f-1" style="position: relative;">
					<u-input placeholder="输入内容" :clearable="false" :focus="true" v-model="value" border height="64" />
				</view>
			</view>
			<view class="g-flex p-y-10 g-a-c">
				<view class="title f-14" >
					联系电话
				</view>
				<view class="info g-f-1" style="position: relative;">
					<u-input placeholder="输入内容" :clearable="false" :focus="true" v-model="value" border height="64" />
				</view>
			</view>
			<view class="g-flex p-y-10">
				<view class="title f-14" >
					土地图片
				</view>
				<view class="info g-f-1" style="position: relative;">
					<u-upload width="167" ref="uUpload" :action="action" :auto-upload="false"></u-upload>
				</view>
			</view>
			<u-button @click="release" style="margin: 40rpx;" shape="circle" type="error">发布</u-button>
		</view>
		<u-calendar v-model="dateShow" mode="range" @change="change">
			<view slot="tooltip">
				<view class=" t-c p-y-10" style="color: #2979FF">
					请选择开始/结束时间
				</view>
			</view>
		</u-calendar>
	</view>
</template>

<script>
	import HeaderSearch from '../../components/HeaderSearch/HeaderSearch.vue'
	export default {
		components: {
			HeaderSearch
		},
		data() {
			return {
				dateShow: false,
				sexShow: false,
				value: '',
				action: 'http://www.example.com/upload',
				actionSheetList: [{
						text: '男'
					},
					{
						text: '女'
					},
					{
						text: '保密'
					}
				],
			}
		},
		methods:{
			release(){
				uni.navigateTo({
					url:'../response?state=1'
				})
			}
		}
	}
</script>

<style lang="scss">
	.input-icon {
		position: absolute;
		right: 10rpx;
		z-index: 9;
		top: 14rpx;
	}

	.title {
		width: 150rpx;
	}
</style>
