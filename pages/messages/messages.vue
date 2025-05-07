<template>
  <view class="container">
	<uni-list>
		<uni-list :border="true">
			<uni-list-chat title="uni-app3" avatar="https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/unicloudlogo.png" note="您收到一条新的消息" time="2020-02-02 20:20" badge-positon="left" badge-text="99"></uni-list-chat>
		</uni-list>
	</uni-list>
  </view>
</template>

<script setup>
	
</script>

<style>

.chat-custom-right {
	flex: 1;
	/* #ifndef APP-NVUE */
	display: flex;
	/* #endif */
	flex-direction: column;
	justify-content: space-between;
	align-items: flex-end;
}

.chat-custom-text {
	font-size: 12px;
	color: #999;
}


</style>
