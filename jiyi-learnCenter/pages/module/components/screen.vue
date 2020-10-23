<template>
	<view class="b-f">
		<view class="screen">
			<view class="sort"  @click="selectLabel(item, index0)"
			 :class="(index0 == screenIndex || index0 == screened) && 'screen-select'" v-for="(item, index0) in condition" :key="index0" >{{item.name}}</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		name: "Screen",
		props: {
			//主筛选框筛选标题
			condition: {
				type: Array,
				default: () => {
					return []
				}
			},
			screenL: {
				type: Array,
				default: () => {
					return []
				}
			},
			screenList: {
				type: Array,
				default: () => {
					return []
				}
			},
			listIndex: {
				type: Number,
				default: 0
			},
			selectType: {
				type: String,
				default: ""
			}
		},
		data() {
			return {
				screenIndex: 0,
				screened: null,
				screenedIndex: null,
				screenedIndex1: null,
				screenedIndex2: null,
				screenedIndex3: null
			}
		},
		created() {
			this.screenIndex = this.listIndex;
		},
		methods: {
			selectLabel(item, index) {
				if (item.name == '筛选') {
					this.$refs.drawer.open();
				} else {
					this.screenIndex = index;
					this.$emit("select", item.code);
				}
			},
			selected(index1, index) {
				this.screenedIndex = index;
				this.screenedIndex1 = index1;
			},
			selected1(m, n) {
				this.screenedIndex2 = m;
				this.screenedIndex3 = n;
			},
			recharge() {
				this.screenedIndex = null;
				this.screenedIndex1 = null;
				this.screenedIndex2 = null;
				this.screenedIndex3 = null;
				this.screened = null;
				this.$emit("screened", null);
				// this.$refs.drawer.close();
			},
			confirm(e) {
				let params = "";
				if (this.selectType == "1") { //存在2组选择框
					if (this.screenedIndex !== null) {
						params = this.screenList[this.screenedIndex1].category[this.screenedIndex].code+"";
					}
					if (this.screenedIndex2 !== null) {
						params = params + "," + this.screenL[this.screenedIndex2].category[this.screenedIndex3].name;
					}
				} else {
					if (this.screenedIndex !== null) {
						params = this.screenList[this.screenedIndex1].category[this.screenedIndex].code+"";
					}
				}
				
				this.$emit("screened", params);
				this.$refs.drawer.close();
			}
		}
	}
</script>

<style lang="scss">
	.screen {
		display: flex;
		align-content: center;
		font-size: 28rpx;
		height: 84rpx;
		color: #808080;
		border-bottom: 4rpx solid #BFBFBF;
		background-color: #fff;
		
		.sort {
			margin: 20rpx 0 0 40rpx;
			height: 34rpx;
			display: flex;
			flex: 1;
			
		}
	}

	.screened {
		width: 30rpx;
		background-color: #e51c2e !important;
		color: #fff !important;
	}

	.screen-select {
		color: #e51c2e;
		font-weight: bold;
	}
</style>
