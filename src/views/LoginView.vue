<template>
  <div class="login-container">
    <h2 class="title">微信扫码登录</h2>
    <p class="subtitle">使用微信扫一扫登录</p>
    <div class="qrcode-wrapper">
      <img id="qrcode" alt="微信登录二维码" ref="imageRef" />
    </div>
    <div id="status" class="status">等待扫码...</div>
    <button class="refresh-btn" @click="refreshQrCode()">刷新二维码</button>
  </div>
</template>

<script setup lang="ts" name="LoginView">
import { ElMessage } from 'element-plus'
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getQRCode, getSceneId } from '@/service/WeChatService'
const router = useRouter()
const imageRef = ref()
const sceneId = ref('')
let checkStatusInterval: any

onMounted(async () => {
  console.log('connect to server for QR code..')
  try {
    sceneId.value = await getSceneId()
    imageRef.value.src = await getQRCode(sceneId.value)
    startPolling()
  } catch (error) {
    console.log(error)
  }
})

async function refreshQrCode() {
  sceneId.value = await getSceneId()
  imageRef.value.src = await getQRCode(sceneId.value)
  ElMessage.info('二维码已经刷新')
}

function handleLoginSuccess() {
  if (checkStatusInterval) {
    clearInterval(checkStatusInterval)
  }
  // 延迟跳转到首页
  setTimeout(() => {
    router.push('/authenticate')
  }, 500)
}

function startPolling() {
  if (checkStatusInterval) {
    clearInterval(checkStatusInterval)
  }

  checkStatusInterval = setInterval(async () => {
    try {
      const response = await fetch(`/wxlogin/status?sceneId=${sceneId.value}`)
      const status = await response.text()
      if (status === 'success') {
        handleLoginSuccess()
      }
    } catch (error) {
      console.error('检查状态失败：', error)
    }
  }, 2000)
}
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
