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
      <InputBox :replyList="replyList" :setReplyList="getReplyList"></InputBox>
    </div>
  </div>
</template>

<script setup lang="ts" name="ChatView">
import Article from '@/components/Article.vue'
import InputBox from '@/components/InputBox.vue'
import type { Reply } from '@/domain/Reply'
import { isEmpty } from 'lodash'
import { reactive, ref, watchEffect } from 'vue'

const inputArea = ref<HTMLElement | null>(null)
const replyList = reactive<Reply[]>([])

function getReplyList(reply: Reply) {
  replyList.push(reply)
}

watchEffect(() => {
  if (!isEmpty(replyList) && document.querySelector('.chat-content')) {
    setTimeout(() => {
      const element = document.querySelector('.chat-content') as HTMLElement
      console.log('element.clientHeight', element.clientHeight)
      console.log('element.scrollHeight', element.scrollHeight)

      if (element.scrollHeight > element.clientHeight + 16) {
        element.scrollTop = element.scrollHeight
      }
    }, 10)
  }
})

function getScrollHeight(element: HTMLElement | any) {
  // 获取元素的内容高度
  const totalHeight = element.scrollHeight
  // 获取元素的可视区域高度
  const viewportHeight = element.clientHeight
  // 获取滚动条高度
  const scrollHeight = totalHeight - viewportHeight
  return scrollHeight
}
</script>

<style lang="scss">
.chat-wrapper {
  display: flex;
  flex-direction: column;
  height: 100%;

  .chat-content {
    height: 90%;
    overflow-y: auto;

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
    position: relative;
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

  /* 在非常小的屏幕上进一步调整文本大小 */
  @media screen and (max-width: 480px) {
    .chat-content {
      height: 99%;
      .chat-content-middle {
        width: 100%;
        height: 100%;
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
