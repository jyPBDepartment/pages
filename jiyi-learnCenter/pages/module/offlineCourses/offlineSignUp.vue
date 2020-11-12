<template>
	<view id="offlineSignUp">
		<!-- 	<u-row style="background-color: #f2f2f2;height: 60rpx;">
			<u-col span="1">
				<view class="title" @click="backTo">
					<u-icon name="arrow-left"></u-icon>
				</view>
			</u-col>
			<u-col span="11">
				<view class="title">报名</view>
			</u-col>
		</u-row> -->
		<header-box title="报名" @backTo="backTo"></header-box>

		<view style="padding-top: 30rpx;margin-top: 80rpx;">
			<u-row>
				<u-col span="3" style="text-align: right;">
					<span style="color: #ff0000;">*</span>
					姓名:
				</u-col>
				<u-col span="8"><u-input type="text" placeholder="输入姓名" :focus="true" v-model="name" border height="54" maxlength="10" /></u-col>
			</u-row>

			<u-row style="padding-top: 40rpx;">
				<u-col span="3" style="text-align: right;">
					<span style="color: #ff0000;">*</span>
					手机号:
				</u-col>
				<u-col span="8"><u-input type="text" placeholder="输入手机号" :focus="true" maxlength="11" v-model="phone" border height="54" /></u-col>
			</u-row>

			<u-row style="padding-top: 40rpx;">
				<u-col span="3" style="text-align: right;">
					<span style="color: #ff0000;">*</span>
					验证码:
				</u-col>
				<u-col span="4"><u-input type="text" placeholder="输入验证码" :focus="true" v-model="code" border height="54" maxlength="4" /></u-col>
				<!-- 验证码 -->
				<view class="canvas-img-code" @click="refresh()">
					<canvas :style="{ width: width + 'px', height: height + 'px' }" canvas-id="imgcanvas" @error="canvasIdErrorCallback"></canvas>
				</view>
			</u-row>

			<u-row style="padding-top: 80rpx;">
				<u-col>
					<view style="text-align: center;margin-top: 20rpx;"><u-button type="primary" size="mini" @click="signUp()">立即报名</u-button></view>
				</u-col>
			</u-row>
		</view>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
var _this;
export default {
	data() {
		return {
			cencalIsShow: false,
			name: '',
			phone: '',
			code: '',
			id: '',
			lessonId: '',
			title: '',
			status:'',
			width: 120,
			height: 45
		};
	},
	//验证码
	onShow() {
		_this = this;
		setTimeout(function() {
			_this.init();
		}, 1000);
	},
	onLoad(e) {
		//index =1新增
		if (e.index == '0') {
			this.lessonId = e.id;
			this.title = e.title;
			this.status = e.status
		}
		//index=1编辑
		if (e.index == '1') {
			this.name = e.name;
			this.phone = e.phone;
			this.title = e.title;
			this.lessonId = e.lessonId;
			this.status = e.status
		}
	},

	methods: {
		// 初始化验证码
		init: function() {
			var context = uni.createCanvasContext('imgcanvas', this),
				w = this.width,
				h = this.height;
			context.setFillStyle('white');
			context.setLineWidth(5);
			context.fillRect(0, 0, w, h);
			var pool = [
					'A',
					'B',
					'C',
					'D',
					'E',
					'F',
					'G',
					'H',
					'I',
					'J',
					'K',
					'L',
					'I',
					'M',
					'N',
					'O',
					'P',
					'Q',
					'R',
					'S',
					'T',
					'U',
					'V',
					'W',
					'S',
					'Y',
					'Z',
					'1',
					'2',
					'3',
					'4',
					'5',
					'6',
					'7',
					'8',
					'9',
					'0'
				],
				str = '';
			for (var i = 0; i < 4; i++) {
				var c = pool[this.rn(0, pool.length - 1)];
				var deg = this.rn(-30, 30);
				context.setFontSize(18);
				context.setTextBaseline('top');
				context.setFillStyle(this.rc(80, 150));
				context.save();
				context.translate(30 * i + 15, parseInt(h / 1.5));
				context.rotate((deg * Math.PI) / 180);
				context.fillText(c, -15 + 5, -15);
				context.restore();
				str += c;
			}
			uni.setStorage({
				key: 'imgcode',
				data: str
			});
			for (var i = 0; i < 40; i++) {
				context.beginPath();
				context.arc(this.rn(0, w), this.rn(0, h), 1, 0, 2 * Math.PI);
				context.closePath();
				context.setFillStyle(this.rc(150, 200));
				context.fill();
			}
			context.draw();
		},
		rc: function(min, max) {
			var r = this.rn(min, max);
			var g = this.rn(min, max);
			var b = this.rn(min, max);
			return 'rgb(' + r + ',' + g + ',' + b + ')';
		},
		rn: function(max, min) {
			return parseInt(Math.random() * (max - min)) + min;
		},
		refresh: function() {
			this.init();
		},
		canvasIdErrorCallback: function(e) {},

		//立即报名
		signUp() {
			//不为空判断
			if (this.name == '') {
				this.$refs.uToast.show({
					title: '请输入姓名',
					type: 'error'
				});
				return false;
			}

			if (this.phone == '') {
				this.$refs.uToast.show({
					title: '请输入手机号码',
					type: 'error'
				});
				return false;
			}
			if (this.phone == '' || !/^1[345789]\d{9}$/.test(this.phone)) {
				this.$refs.uToast.show({
					title: '请输入正确的手机号码',
					type: 'error'
				});
				return false;
			}

			if (this.code.length != 4) {
				this.$refs.uToast.show({
					title: '请输入验证码',
					type: 'error'
				});
				return false;
			}
			if (this.code.toLowerCase() != uni.getStorageSync('imgcode').toLowerCase()) {
				this.$refs.uToast.show({
					title: '验证码不正确',
					type: 'error'
				});
				return false;
			}
			uni.navigateTo({
				url: '../offlineCourses/offlineSignUpShow?name='+this.name+'&phone='+this.phone+'&lessonId='+this.lessonId+'&title='+this.title+'&status=' + this.status + ''
			})
		},

		//返回
		backTo() {
			uni.navigateBack({});
		}
	}
};
</script>

<style lang="scss" scoped>
#offlineSignUp {
	.title {
		text-align: center;
		font-size: 16px;
	}
}
</style>
