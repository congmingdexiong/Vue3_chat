<template>
  <textarea name="" id="" placeholder="MessageChatGPT" style="display: none"></textarea>
  <div
    class="chat-input-area-content-area"
    contenteditable="true"
    data-virtualkeyboard="true"
    ref="userInput"
  ></div>
  <div class="chat-input-submit">
    <button
      ref="buttonRef"
      aria-label="Send prompt"
      data-testid="send-button"
      @click="handleUserInput()"
      @keydown.enter="handleUserInput()"
    >
      <SubmitIco></SubmitIco>
    </button>
  </div>
  <!-- <el-button type="primary">Primary</el-button> -->
  <!-- <p data-placeholder="Message ChatGPT" class="placeholder">
          <br class="ProseMirror-trailingBreak" />
        </p> -->
</template>

<script setup lang="ts" name="InputBox">
import { inject, onMounted, ref } from 'vue'
import { ElMessage } from 'element-plus'
import axios from 'axios'

const props = defineProps(['setReplyList'])
const { loader, setLoadingState } = inject('appLoading', {
  loader: false,
  setLoadingState: (loading: boolean) => {},
})
const buttonRef = ref<HTMLElement | null>(null)
const userInput = ref<HTMLElement | null>(null)

onMounted(() => {
  setTimeout(() => {
    userInput.value?.focus()
  }, 5000)
})

document.onkeydown = function (e) {
  const key = (window as any).event.keyCode
  if (key === 13) {
    handleUserInput()
  }
}
async function handleUserInput() {
  setLoadingState(true)
  if (userInput?.value?.innerText) {
    props.setReplyList({ type: 'user', content: userInput?.value?.innerText })
    try {
      const axiosRes = await axios.post('/api', {
        userMsg: userInput?.value?.innerText,
      })
      props.setReplyList({ type: 'chat', content: axiosRes.data?.result })
    } catch (error) {
      ElMessage.error(`程序错误！${error}`)
    } finally {
      setLoadingState(false)
    }

    if (userInput.value) {
      userInput.value.innerText = ''
    }
  } else {
    setLoadingState(false)
    ElMessage.error('您没有输入内容！！')
  }
}
</script>

<style scoped lang="scss">
.chat-input-area-content-area {
  &:focus {
    outline: none;
  }
}

.chat-input-submit {
  > button {
    height: 2rem;
    width: 2rem;
    background-color: #000;
    border-radius: 50%;
    padding: 0;
    > svg {
      color: white;
    }
  }
  display: flex;
  justify-content: end;
  margin-right: 1rem;
}
</style>
