<template>
  <div class="chat-wrapper">
    <div class="chat-content">
      <div class="chat-content-middle">
        <template v-for="(item, index) in replyList" v-bind:key="index">
          <Article :item="item"></Article>
        </template>
      </div>
    </div>
    <div class="chat-translator">translator ongoing</div>
    <div class="chat-input-area" ref="inputArea" tabindex="0">
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
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            class="icon-2xl"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M15.1918 8.90615C15.6381 8.45983 16.3618 8.45983 16.8081 8.90615L21.9509 14.049C22.3972 14.4953 22.3972 15.2189 21.9509 15.6652C21.5046 16.1116 20.781 16.1116 20.3347 15.6652L17.1428 12.4734V22.2857C17.1428 22.9169 16.6311 23.4286 15.9999 23.4286C15.3688 23.4286 14.8571 22.9169 14.8571 22.2857V12.4734L11.6652 15.6652C11.2189 16.1116 10.4953 16.1116 10.049 15.6652C9.60265 15.2189 9.60265 14.4953 10.049 14.049L15.1918 8.90615Z"
              fill="currentColor"
            ></path>
          </svg>
        </button>
      </div>
      <!-- <el-button type="primary">Primary</el-button> -->
      <!-- <p data-placeholder="Message ChatGPT" class="placeholder">
          <br class="ProseMirror-trailingBreak" />
        </p> -->
    </div>
  </div>
</template>

<script setup lang="ts" name="ChatView">
import type { Reply } from '@/domain/Reply'
import Article from '@/components/Article.vue'
import { inject, onMounted, reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'
import axios from 'axios'

document.onkeydown = function (e) {
  const key = (window as any).event.keyCode
  if (key === 13) {
    handleUserInput()
  }
}
const { loader, setLoadingState } = inject('appLoading', {
  loader: false,
  setLoadingState: (loading: boolean) => {},
})
const replyList = reactive<Reply[]>([])
const userInput = ref<HTMLElement | null>(null)
const inputArea = ref<HTMLElement | null>(null)
const buttonRef = ref<HTMLElement | null>(null)

onMounted(() => {
  setTimeout(() => {
    userInput.value?.focus()
  }, 5000)
})

async function handleUserInput() {
  setLoadingState(true)
  if (userInput?.value?.innerText) {
    replyList.push({ type: 'user', content: userInput?.value?.innerText })
    try {
      const axiosRes = await axios.post('/api', {
        userMsg: userInput?.value?.innerText,
      })
      replyList.push({ type: 'chat', content: axiosRes.data?.result })
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
.chat-wrapper {
  display: flex;
  flex-direction: column;
  height: 100%;

  .chat-content {
    height: 90%;
    overflow-y: scroll;

    .chat-content-middle {
      width: 60%;
      height: 100%;
      margin: 0 auto;
    }
  }

  .chat-content::-webkit-scrollbar {
    display: none;
  }

  .chat-translator {
    display: flex;
    justify-content: end;
    height: 3rem;
  }

  .chat-input-area {
    padding: 0.5rem;
    background-color: rgb(244, 244, 244);
    border-bottom-color: rgb(227, 227, 227);
    height: 10%;
    border-radius: 1.5rem;
    color: rgb(13, 13, 13);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
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
  }
  .chat-input-area:first-child {
    border-bottom-color: rgb(227, 227, 227);
    border-left-color: rgb(227, 227, 227);
    border-right-color: rgb(227, 227, 227);
    border-top-color: rgb(227, 227, 227);
    color-scheme: light;
    font-family:
      ui-sans-serif,
      -apple-system,
      system-ui,
      'Segoe UI',
      Helvetica,
      'Apple Color Emoji',
      Arial,
      sans-serif,
      'Segoe UI Emoji',
      'Segoe UI Symbol';
    scrollbar-color: rgb(236, 236, 236) rgba(0, 0, 0, 0);
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  }

  /* 在小屏幕上调整文本大小 */
  @media screen and (max-width: 768px) {
  }

  /* 在非常小的屏幕上进一步调整文本大小 */
  @media screen and (max-width: 480px) {
    .chat-content {
      height: 99%;
      .chat-content-middle {
        width: 100%;
        > .article {
          line-height: 1.75;
        }
      }
    }
    .chat-translator {
      display: none;
    }
  }
}
</style>
