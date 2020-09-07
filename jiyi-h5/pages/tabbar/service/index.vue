<template>
	<view class="service">
		<HeaderSearch hideBack @searchCallback="search"></HeaderSearch>
		<Screen @screened="screened" :screenList="screenList" @select="select" :condition="condition"></Screen>
		<mescroll-body ref="mescrollRef" @init="mescrollInit" @down="downCallback" @up="upCallback" :down="downOption" :up="upOption">
			<view class="p-x-10">
				<view class="app-modular g-flex" v-for="(item,index) in btnList" :key="index" @click="jumpInfo(item.id)">
					<image class="app-img" :src="item.imageUrl"></image> 

					<view class="app-info g-f-1">
						<p class="title f-14">{{item.name}}</p>
						<view class="g-flex f-12 g-a-c" style="color: rgba(128, 128, 128, 1)">
							<u-icon style="margin-right: 5rpx;" name="map-fill" color="#A6A6A6" size="36"></u-icon>
							<p>{{item.address}}</p>

						</view>
						<view class="g-flex g-j-s-b f-12 tags">
						</view>
						<view class="g-flex g-j-s-b f-14">
							<view class="app-number">

							</view>
							<view @click.stop @click="jump" class="immediately g-flex g-a-c g-j-c c-f">
								立即预约
							</view>
						</view>
					</view>
				</view>
				
			</view>
		</mescroll-body>
	</view>
</template>

<script>
	let _this
	import MescrollMixin from "@/mescroll-uni/mescroll-mixins.js";
	import Screen from '../../../components/Screen/screen.vue'
	import HeaderSearch from '@/components/HeaderSearch/HeaderSearch.vue'
	//后台路径引用
	import ApiPath from "@/api/ApiPath.js";
	export default {
		mixins: [MescrollMixin], // 使用mixin (在main.js注册全局组件)
		components: {
			Screen,
			HeaderSearch
		
		},
		data() {
			return {
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
				transactionTypeCode: '', //类型 植保3 4 5
				transactionCategoryCode: '', //交易类别
				name: '',
				address: '',
				imageUrl: '',
				ids:'',
				formInline: {
					page: 1,
					limit: 10,
					varLable: "",
					varName: "",
					currentPage: 1,
					pageSize: 10,
					total: 10,
				},
				btnList: [

				],
				condition: [
					{
						code:1,
						name:"综合"
					},{
						code:3,
						name: "植保"
					}, 
					{
						code:4,
						name: "播种"
					}, 
					{
						code:5,
						name: "收割"
					},
					{
						code:0,
						name: "筛选"
					}, 
				],
				screenList: [{
					title: '农作物类别',
					category: [{
						code:0,
						name:"玉米"
					},{
						code:2,
						name: "水稻"
					}, 
					{
						code:3,
						name: "高粱"
					}, 
					{
						code:4,
						name: "黄豆"
					}]

					},
				],
				transactionTypeCode:null,
				transactionCategoryCode: null,
				// cropsTypeCode: null,
				// 上拉加载的配置(可选, 绝大部分情况无需配置)
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
		onLoad() {
			// uni.request({
			// 	url: ApiPath.url.getCaseList,
			// 	method: "GET",
			// 	data: {},
			// 	success: (res) => {
			// 		if (res.data.state == 0) {
			// 			let data = res.data.data.map(item => {
			// 				item.code = item.id
			// 				return item
			// 			})
			// 			this.screenList[0].category = data
			// 		}
			// 	}
			// });
		},
		methods: {
			removeSpaces(string) {
				return string.replace(/\s*/g, '')
			},
			search(e) {
				this.searchName = this.removeSpaces(e)
				this.downCallback()
			},
			select(code) {
				this.transactionTypeCode = code
				this.downCallback()
			},
			screened(code) {
				this.transactionCategoryCode = code
				this.downCallback()
			},
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
				// 第1种: 请求具体接口
				uni.request({
					url: ApiPath.url.agrSearch,
					method: "GET",
					data: {
						name: this.searchName,
						type: 0,
						page: pageNum,
						size: pageSize,
						transactionCategoryCode: this.transactionCategoryCode,
						transactionTypeCode:this.transactionTypeCode,
					},
					success: (res) => {
						
						if (res.data.state == 0) {
							
							let curPageData = res.data.data.content
							
							let curPageLen = curPageData.length;
						
							//设置列表数据
							if (page.num == 1) this.btnList = []; //如果是第一页需手动置空列表
							
							for (var i = 0; i < res.data.data.content.length; i++) {
								curPageData[i].imageUrl = curPageData[i].url.split(",")[0];
							}
							
							this.btnList = this.btnList.concat(curPageData); //追加新数据
							
							this.mescroll.endByPage(curPageLen, res.data.data.totalPages);
						}
						// 请求成功,隐藏加载状态
						this.mescroll.endSuccess()
					},
					fail: (err) => {
						// 请求失败,隐藏加载状态
						this.mescroll.endErr()
					}
				});

			},
			jumpInfo(getId) {
			    this.ids=getId
			    uni.navigateTo({
			     url: '../../grain/paddy?id='+this.ids
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
