<template>
	<view>
		<HeaderSearch @searchCallback="search" :title="title"></HeaderSearch>
		<view>
			<image :src="url" style="width: 750rpx;height: 750rpx;"></image>
		</view>
		<view class="p-10">
			<view v-html="demoHtml"></view>
		</view>
	</view>
</template>

<script>
	import uniDrawer from "@/components/uni-drawer/uni-drawer.vue"
	import HeaderSearch from '@/components/HeaderSearch/HeaderSearch.vue'
	//后台路径引用
	import ApiPath from "@/api/ApiPath.js";
	export default {
		components: {
			uniDrawer,
			HeaderSearch
		},
		data() {
			return {
				demoHtml: '',
				selectIndex: 0,
				title:'',
				url:''
			}
		},
		onLoad(e) {
			// 根据id获取基础信息
			this.getInfoById(e.id);
			
			// this.demoHtml = '这里是富文本解析得内容'
		},
		methods: {
			getInfoById(val){
				let param = {
					id:val
				}
				uni.request({
					method:"GET",
					url:ApiPath.url.findCaseInfoById,
					data:param,
					success: (res) => {
						console.log(res.data)
						if(res.data.state==0){
							this.demoHtml = res.data.data.describetion;
							this.title = res.data.data.name;
							this.url = res.data.data.url;
						}
					},
					fail: () => {
						
					}
				})
				
			},
			search(e) {
				console.log(e)
			},
			isShow() {
				this.$refs.drawer.open()
			},
			select(index) {
				this.selectIndex = index
			}
		}
	}
</script>

<style lang="scss">

</style>
