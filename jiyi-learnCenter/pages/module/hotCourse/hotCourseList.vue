<template>
	<view class="content">
		<!-- 头部 -->
		<view class="head">
				<view class="backArrow" @click="backTo">
					<u-icon name="arrow-left" color="#333" size="32"></u-icon>
				</view> 
				<view class="title">热门课程</view>
		</view>
		
		<!-- 搜索 -->
		<view class="select">
			<view>
				<u-search placeholder="搜索标题或标签" bg-color="#fff" :show-action="false" input-align="left" shape="square" margin="30rpx 0rpx 0rpx 20rpx"  maxlength="16" class="input" v-model="title"></u-search>
			</view>
		</view>
		<Screen :listIndex="listIndex" @select="select" :condition="condition" ></Screen>	
		<mescroll-body ref="mescrollRef" @init="mescrollInit" @down="downCallback" @up="upCallback" :down="downOption" :up="upOption">
		<!-- 列表详情 -->
		<view class="list" v-for="(item, index) in industryCaseList" :key="index"  @click="industryCaseJump('./index')">
			<view class="listOne">
				<view class="img">
					<image class="listImg" :src="item.url"></image>
				</view>
				<view class="listText">{{item.word}}</view>
			</view>
			<view class="listSen">
				<view class="bride">{{item.sum}}人已学</view>
			</view>
				<view>
					<u-line class="underline"></u-line>
				</view>
		</view>
		</mescroll-body>
	</view>
	
</template>

<script>
	import Screen from '@/pages/module/components/screen';
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
	export default{
		mixins: [MescrollMixin], // 使用mixin (在main.js注册全局组件)
		components: {
			Screen
		},
		data(){
			return{
				mescroll: null, // mescroll实例对象 (此行可删,mixins已默认)
				// 下拉刷新的配置(可选, 绝大部分情况无需配置)
				downOption: {
				
				},
				// 上拉加载的配置(可选, 绝大部分情况无需配置)
				upOption: {
					page: {
						size: 10 // 每页数据的数量,默认10
					},
					noMoreSize: 5, // 配置列表的总数量要大于等于5条才显示'-- END --'的提示
					empty: {
						tip: '暂无相关数据'
					}
				},
				condition: [
					{code:"",name: '全部'},
					{code:0,name: '农技'}, 
					{code:1,name: '财经'},
					{code:2,name: '管理'},
					{code:3,name: '推广'}
					],
					listIndex:0,
					
					title:'',
					industryCaseList:[
						{url:"http://60.205.246.126/images/2020/10/12/1602481525521725.jpg",word:"人的欲望永无止尽 就像我一开始 只是想要知道你的名字",sum:"1314"},
						{url:"http://60.205.246.126/images/2020/10/12/1602481589403089.jpg",word:"培养农业职业经理人，是长春市今年农业战线重点改革之一，也是经济与生态体制......",sum:"1314"},
						{url:"http://60.205.246.126/images/2020/10/12/1602481543327363.jpg",word:"刮奖刮出一个谢字就足够了。",sum:"1314"},
						{url:"http://60.205.246.126/images/2020/10/12/1602481589403089.jpg",word:"你眼里有全宇宙 胜过我见过的所有山川河流",sum:"1314"},
						{url:"http://60.205.246.126/images/2020/10/12/1602481564370430.jpg",word:"孺子含辛，隐忍不嗔。",sum:"1314"},
						{url:"http://60.205.246.126/images/2020/10/12/1602481589403089.jpg",word:"加油呀,你是比自己想象的要好得多的人。",sum:"1314"},
						{url:"http://60.205.246.126/images/2020/10/12/1602481589403089.jpg",word:"加油呀,你是比自己想象的要好得多的人。",sum:"1314"},
						{url:"http://60.205.246.126/images/2020/10/12/1602481589403089.jpg",word:"加油呀,你是比自己想象的要好得多的人。",sum:"1314"},
						{url:"http://60.205.246.126/images/2020/10/12/1602481589403089.jpg",word:"加油呀,你是比自己想象的要好得多的人。",sum:"1314"},
						{url:"http://60.205.246.126/images/2020/10/12/1602481589403089.jpg",word:"加油呀,你是比自己想象的要好得多的人。",sum:"1314"},
						{url:"http://60.205.246.126/images/2020/10/12/1602481589403089.jpg",word:"加油呀,你是比自己想象的要好得多的人。",sum:"1314"},
						{url:"http://60.205.246.126/images/2020/10/12/1602481589403089.jpg",word:"加油呀,你是比自己想象的要好得多的人。",sum:"1314"},						
						{url:"http://60.205.246.126/images/2020/10/12/1602481589403089.jpg",word:"加油呀,你是比自己想象的要好得多的人。",sum:"1314"},
						{url:"http://60.205.246.126/images/2020/10/12/1602481589403089.jpg",word:"加油呀,你是比自己想象的要好得多的人。",sum:"1314"}
						
					],
					formInline: {
						page: 1,
						limit: 10,
						varLable: "",
						varName: "",
						currentPage: 1,
						pageSize: 10,
						total: 10,
					},
					upOption: {
						page: {
							size: 10 // 每页数据的数量,默认10
						},
						noMoreSize: 10, // 配置列表的总数量要大于等于5条才显示'-- END --'的提示
						empty: {
							tip: '暂无相关数据'
						}
					},
				}
		},
		
		methods:{
			/*mescroll组件初始化的回调,可获取到mescroll对象 (此处可删,mixins已默认)*/
			mescrollInit(mescroll) {
				this.mescroll = mescroll;
			},
			/*下拉刷新的回调, 有三种处理方式:*/
			downCallback() {
				this.mescroll.resetUpScroll();
			},
			/*上拉加载的回调*/
			upCallback(page) {
				let pageNum = page.num; // 页码, 默认从1开始
				let pageSize = page.size; // 页长, 默认每页10条
				
			},
			backTo() {
				uni.navigateBack({
				})
			},
			// 行业案例跳转详情页面
			industryCaseJump(url){
				uni.navigateTo({
					url: url
				})
			},
			//状态滑块筛选
			select(code) {
				this.status = code
				this.downCallback()
			}
		}
		
	}
</script>

<style lang="scss" scoped>
	.content{
		display: flex;
		flex-direction: column;
		background-color: #F8F8F8;
		.head{
			display: flex;
			margin-top: 15rpx;
			margin-left: 20rpx;
			.backArrow{
				margin-top: 6rpx;
			}
			.title{
				margin-left: 250rpx;
				font-size: 32rpx;
			}
		}
		.select{
			display: flex;
			height: 120rpx;
			background-color:#C9C9CE;
			margin-top: 20rpx;
			.input{
				width: 700rpx;
				
			}
			.uni-input-placeholder{
				margin-left: 200rpx;
			}
		}
		.list{
			display: flex;
			flex-direction: column;
			background-color: #fff;
			.listOne{
				display: flex;
				margin-top: 10rpx;
				.img{
					.listImg{
						width: 220rpx;
						height: 160rpx;
						margin: 10rpx 10rpx;
					}
				}
				.listText{
					font-size: 26rpx;
					margin:15rpx 10rpx 0rpx 20rpx;
				}
			}
			.listSen{
				
				.bride{
					font-size: 22rpx;
					color: #BFBFBF;
					margin-left: 600rpx;
					margin-top: -50rpx;
				}
			}
			.underline{
				border: 2rpx solid #BBBBBB;
			}
		}
		
	}
</style>
