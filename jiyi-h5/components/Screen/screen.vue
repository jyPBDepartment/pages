<template>
	<view class="b-f">
		<view class="screen g-flex g-a-c f-14">
			<view
				class="sort g-f-1 g-flex g-a-c g-j-c"
				:style="item.name == '筛选' && 'border-left: 1rpx solid #e5e5e5;'"
				@click="selectLabel(item, index0)"
				:class="(index0 == screenIndex || index0 == screened) && 'screen-select'"
				v-for="(item, index0) in condition"
				:key="index0"
			>
				{{ item.name }}
			</view>
		</view>
		<uni-drawer ref="drawer" mode="right" :visible="true" :width="300">
			<view style="padding: 20rpx">
				<view v-for="(item, index1) in screenList" :key="index1">
					<view class="f-16" style="line-height: 52rpx; margin-bottom: 20rpx">{{ item.title }}</view>

					<view class="comm-drawer-categorys b-t">
						<view
							v-for="(item, index) in item.category"
							:key="index"
							:class="screenedIndex1 == index1 && screenedIndex == index && ' screened'"
							@click="selected(index1, index)"
							class="item"
						>
							{{ item.name }}
						</view>
					</view>
				</view>

				<view v-if="selectType == '1'">
					<view v-for="(item1, index2) in screenL" :key="index2 + 1" style="margin-top: 20rpx">
						<view class="f-16" style="line-height: 52rpx; margin-bottom: 20rpx">{{ item1.title }}</view>
						<view class="comm-drawer-categorys b-t">
							<view
								v-for="(item2, index3) in item1.category"
								:key="index3"
								:class="screenedIndex2 == index2 && screenedIndex3 == index3 && ' screened'"
								@click="selected1(index2, index3)"
								class="item"
							>
								{{ item.name }}
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="drawer-bottom-btn">
				<u-button class="btn" size="medium" shape="circle" @click="recharge" plain>重置</u-button>
				<u-button class="btn" size="medium" shape="circle" @click="confirm(true)" type="error">确认</u-button>
			</view>
		</uni-drawer>
	</view>
</template>

<script>
import uniDrawer from '@/components/uni-drawer/uni-drawer.vue';
export default {
	name: 'Screen',
	components: {
		uniDrawer
	},
	props: {
		//主筛选框筛选标题
		condition: {
			type: Array,
			default: () => {
				return [];
			}
		},
		screenL: {
			type: Array,
			default: () => {
				return [];
			}
		},
		screenList: {
			type: Array,
			default: () => {
				return [];
			}
		},
		listIndex: {
			type: Number,
			default: 0
		},
		selectType: {
			type: String,
			default: ''
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
		};
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
				this.$emit('select', item.code);
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
			this.$emit('screened', null);
			// this.$refs.drawer.close();
		},
		confirm(e) {
			let params = '';
			if (this.selectType == '1') {
				//存在2组选择框
				if (this.screenedIndex !== null) {
					params = this.screenList[this.screenedIndex1].category[this.screenedIndex].code + '';
				}
				if (this.screenedIndex2 !== null) {
					params = params + ',' + this.screenL[this.screenedIndex2].category[this.screenedIndex3].name;
				}
			} else {
				if (this.screenedIndex !== null) {
					params = this.screenList[this.screenedIndex1].category[this.screenedIndex].code + '';
				}
			}

			this.$emit('screened', params);
			this.$refs.drawer.close();
		}
	}
};
</script>

<style lang="scss" scoped>
.screen {
	height: 84rpx;
	color: #808080;
	border-bottom: 1px solid $comm-border-color;

	.sort {
		height: 34rpx;
	}
}

.screened {
	background-color: #e51c2e !important;
	color: #fff !important;
}

.screen-select {
	color: #e51c2e;
	font-weight: bold;
}

.st {
	justify-content: space-between !important;
}
</style>
