<template>
	<view>
		<view class="title">个人中心页面</view>
		<view class="form">
			<view>
				<label>
					姓名：
					<input v-model="truename">
				</label>
			</view>
			<view>
				<label>
					手机：
					<input v-model="phone">
				</label>
			</view>
			<view>
				<button @click="saveUser">保存用户信息</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				truename: '',
				phone: ''
			};
		},
		methods: {
			saveUser() {
				// v-model 它是由哪个语法糖  值 和 事件  vue2中 v-model只能在一个标签中绑一次
				// value/checked  input/change  
				console.log(this.truename, this.phone);
			}
		},
	}
</script>

<style scoped lang="scss">

</style>
