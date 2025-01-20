<template>
  <div class="login-container">
    <h2 class="title">欢迎登陆PigGpt</h2>
    <h3 class="subtitle">请授权微信使用小程序</h3>
    <div class="subtitle">您还可以通过点击“认证”手动授权</div>
    <a
      ref="auth"
      href="https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxd64b9dcd0674bda1&redirect_uri=http://31qm173jh418.vicp.fun/wechat/callback&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect"
      >认证</a
    >
  </div>
</template>

<script setup lang="ts" name="LoginView">
import { onMounted, ref } from 'vue'
const auth = ref()

onMounted(async () => {
  setTimeout(() => {
    auth.value.click()
  }, 1000)
})
</script>

<style scoped>
.login-container {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  text-align: center;
  max-width: 400px;
  width: 90%;
}

.qrcode-wrapper {
  margin: 2rem auto;
  padding: 1rem;
  border: 1px solid #e8e8e8;
  border-radius: 4px;
  width: fit-content;
}

#qrcode {
  width: 200px;
  height: 200px;
  display: block;
}

.status {
  margin-top: 1rem;
  color: #666;
}

.success {
  color: #52c41a;
}

.title {
  color: #333;
  margin-bottom: 1rem;
}

.subtitle {
  color: #666;
  font-size: 0.9rem;
  margin-bottom: 2rem;
}

.refresh-btn {
  background: #1890ff;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
  margin-top: 1rem;
}

.refresh-btn:hover {
  background: #40a9ff;
}
</style>
