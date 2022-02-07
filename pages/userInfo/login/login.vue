<template>
	<view class="login-container">
		<image src="../../../static/img/login_bg.png" class="banner-bg" mode=""></image>
		<!-- 导航 -->
		<view class="login-nav">
			<view class="nav-item" @click="changeFormType('account')" :class="{'active':type==='account'}">
				账号登录
			</view>
			<view class="nav-item" @click="changeFormType('mobile')" :class="{'active':type !== 'account'}">
				手机登录
			</view>
		</view>
		<!-- 输入表单部分 -->
		<!-- <uni-forms class="form" ref="form" :modelValue="formData" :rules="userRules">【小程序兼容性原因】 -->
		<uni-forms class="form" ref="form" :modelValue="formData">
			<!-- 点击【账号登录】 -->
			<view class="" v-if="type==='account'">
				<!-- account -->
				<uni-forms-item label="账号" name="loginName">
					<input type="text" class="form-input" placeholder-class="placeholder" placeholder="请输入账号"
						v-model="formData.loginName" />
				</uni-forms-item>
				<!-- psw -->
				<uni-forms-item label="密码" name="password">
					<!-- <input placeholder-class="placeholder" class="form-input" type="password" placeholder="请输入密码" v-model="formData.password" /> -->
					<uni-easyinput :inputBorder="false" placeholder-class="placeholder" class="form-input"
						type="password" placeholder="请输入密码" v-model="formData.password"></uni-easyinput>
				</uni-forms-item>
			</view>

			<!-- 点击【电话号码登录】 -->
			<view class="" v-else>
				<uni-forms-item label="手机号" name="phone">
					<input placeholder-class="placeholder" class="form-input" type="number" placeholder="请输入手机号"
						v-model="formData.phone" />
				</uni-forms-item>
				<uni-forms-item label="验证码" name="vCode">
					<input placeholder-class="placeholder" class="form-input" type="text" placeholder="请输入密码"
						v-model="formData.vCode" />
					<!-- 验证码组件 -->
					<SendCode class="code-component" @setCurrentCode="returnCode=$event" @click="getForm"></SendCode>
				</uni-forms-item>
			</view>

			<button class="login-btn" @click="_userLoginSubmit">立即登录</button>
		</uni-forms>

		<!-- 下方地注册按钮 -->
		<view class="footer-select-container">
			<text>注册</text>
			<text>忘记密码</text>
		</view>
	</view>
</template>

<script>
	import {
		mapMutations
	} from "vuex";

	export default {
		// 小程序兼容性问题,解决form校验
		onReady() {
			console.log('this.$refs.form.setRules(this.userRules)')
			this.$refs.form.setRules(this.userRules)
		},
		data() {
			return {
				type: 'account',
				formData: {
					loginName: '',
					password: '',
					phone: "",
					vCode: '', // 验证码
				}
			}
		},
		methods: {
			...mapMutations(['updateUserInfo']),
			async _userLoginSubmit() {
				const res = await this.$refs.form.submit();
				console.log('formData :', this.formData)
				this._sendUserInfo({
					...res,
					type: this.type
				})
			},
			/**
			 * 切换当前表单类型
			 */
			changeFormType(type) {
				this.type = type;
				console.log('this.$refs.form', this.$refs.form.clearValidate({})) // und
				this.$refs.form.clearValidate({}) // 清空校验规则(uni-forms)
			},
			/**
			 * 像后端发送用户登录数据
			 */
			async _sendUserInfo(data) {
				const res = await this.$http.user_login(data);
				if (res) {
					this.updateUserInfo(res)
					uni.showToast({
						title: '登录成功',
						icon: 'none'
					})
					console.log('log in :', this.userInfo)
					setTimeout(() => {
						uni.navigateBack()
					}, 1500) // 返回到之前的位置
				}

			},
			/**
			 * 发送表单到sendCode组件
			 */
			getForm(cb) {
				console.log('getForm',cb)
				cb && cb(this.$refs.form)
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import 'login.scss';

	page {
		background-color: #f5f5f5;
	}
</style>
