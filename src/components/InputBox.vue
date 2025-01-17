<template>
  <textarea name="" id="" placeholder="MessageChatGPT" style="display: none"></textarea>
  <div
    class="chat-input-area-content-area"
    contenteditable="true"
    data-virtualkeyboard="true"
    placeholder="Message PigGPT"
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
</template>

<script setup lang="ts" name="InputBox">
import { inject, onMounted, ref } from 'vue'
import { ElMessage } from 'element-plus'
import axios from 'axios'
import { getChatData } from '@/service/WeChatService'

const props = defineProps(['setReplyList'])
const { loader, setLoadingState } = inject('appLoading', {
  loader: false,
  setLoadingState: (loading: boolean) => {},
})
const buttonRef = ref<HTMLElement | null>(null)
const userInput = ref<HTMLElement | null>(null)

// onMounted(() => {
//   setTimeout(() => {
//     userInput.value?.focus()
//   }, 5000)
// })

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
      const axiosRes = await getChatData(userInput?.value?.innerText)
      props.setReplyList({ type: 'chat', content: axiosRes.result })
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
  &:empty:before {
    content: attr(placeholder);
    color: grey;
  }
  /* 输入框获取焦点时移除 placeholder */
  &:focus:before {
    content: none;
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
