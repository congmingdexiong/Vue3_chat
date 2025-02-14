<template>
  <textarea name="" id="" placeholder="MessageChatGPT" style="display: none"></textarea>
  <div
    class="chat-input-area-content-area"
    contenteditable="true"
    data-virtualkeyboard="true"
    :placeholder="placeholder"
    :id="props.type"
    ref="userInput"
  ></div>
  <div>
    <button
      v-if="props.type === 'deepseek'"
      class="reasoner-button"
      :class="{ 'reasoner-enabled': reasonerEnabled }"
      @click="enableReasoner"
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M2.656 17.344c-1.016-1.015-1.15-2.75-.313-4.925.325-.825.73-1.617 1.205-2.365L3.582 10l-.033-.054c-.5-.799-.91-1.596-1.206-2.365-.836-2.175-.703-3.91.313-4.926.56-.56 1.364-.86 2.335-.86 1.425 0 3.168.636 4.957 1.756l.053.034.053-.034c1.79-1.12 3.532-1.757 4.957-1.757.972 0 1.776.3 2.335.86 1.014 1.015 1.148 2.752.312 4.926a13.892 13.892 0 0 1-1.206 2.365l-.034.054.034.053c.5.8.91 1.596 1.205 2.365.837 2.175.704 3.911-.311 4.926-.56.56-1.364.861-2.335.861-1.425 0-3.168-.637-4.957-1.757L10 16.415l-.053.033c-1.79 1.12-3.532 1.757-4.957 1.757-.972 0-1.776-.3-2.335-.86zm13.631-4.399c-.187-.488-.429-.988-.71-1.492l-.075-.132-.092.12a22.075 22.075 0 0 1-3.968 3.968l-.12.093.132.074c1.308.734 2.559 1.162 3.556 1.162.563 0 1.006-.138 1.298-.43.3-.3.436-.774.428-1.346-.008-.575-.159-1.264-.449-2.017zm-6.345 1.65l.058.042.058-.042a19.881 19.881 0 0 0 4.551-4.537l.043-.058-.043-.058a20.123 20.123 0 0 0-2.093-2.458 19.732 19.732 0 0 0-2.458-2.08L10 5.364l-.058.042A19.883 19.883 0 0 0 5.39 9.942L5.348 10l.042.059c.631.874 1.332 1.695 2.094 2.457a19.74 19.74 0 0 0 2.458 2.08zm6.366-10.902c-.293-.293-.736-.431-1.298-.431-.998 0-2.248.429-3.556 1.163l-.132.074.12.092a21.938 21.938 0 0 1 3.968 3.968l.092.12.074-.132c.282-.504.524-1.004.711-1.492.29-.753.442-1.442.45-2.017.007-.572-.129-1.045-.429-1.345zM3.712 7.055c.202.514.44 1.013.712 1.493l.074.13.092-.119a21.94 21.94 0 0 1 3.968-3.968l.12-.092-.132-.074C7.238 3.69 5.987 3.262 4.99 3.262c-.563 0-1.006.138-1.298.43-.3.301-.436.774-.428 1.346.007.575.159 1.264.448 2.017zm0 5.89c-.29.753-.44 1.442-.448 2.017-.008.572.127 1.045.428 1.345.293.293.736.431 1.298.431.997 0 2.247-.428 3.556-1.162l.131-.074-.12-.093a21.94 21.94 0 0 1-3.967-3.968l-.093-.12-.074.132a11.712 11.712 0 0 0-.71 1.492z"
          fill="currentColor"
          stroke="currentColor"
          stroke-width=".1"
        ></path>
        <path
          d="M10.706 11.704A1.843 1.843 0 0 1 8.155 10a1.845 1.845 0 1 1 2.551 1.704z"
          fill="currentColor"
          stroke="currentColor"
          stroke-width=".2"
        ></path>
      </svg>
      Deepseek Reasoner
    </button>
  </div>
  <div class="chat-input-submit">
    <button
      ref="buttonRef"
      aria-label="Send prompt"
      data-testid="send-button"
      @click="handleUserInput(props.type)"
    >
      <SubmitIco></SubmitIco>
    </button>
  </div>
</template>

<script setup lang="ts" name="InputBox">
import { computed, inject, onMounted, onUnmounted, reactive, ref, watch } from 'vue';
import { ElMessage, ElNotification } from 'element-plus';
import { getChatDataBaidu, getChatDataDeepSeek } from '@/service/WeChatService';

const props = defineProps(['setReplyList', 'type', 'activeTab', 'title']);
const { setLoadingState } = inject('appLoading', {
  loader: false,
  setLoadingState: (loading: boolean) => {}
});
const buttonRef = ref<HTMLElement | null>();
const userInput = ref<HTMLElement | null>();

const placeholder = computed(() =>
  props.type === 'deepseek'
    ? reasonerEnabled.value
      ? `Message ⇔‌ ${props.title}-reasoner`
      : `Message ⇔‌ ${props.title}-chat`
    : `Message Baidu ⇔‌ ${props.title}`
);
const reasonerEnabled = ref(false);

watch(
  () => reasonerEnabled.value,
  () => {
    if (reasonerEnabled.value) {
      ElNotification({
        message: '目前，deepseek-reasoner服务存在不稳定的问题，有可能失败，请谅解！',
        type: 'info'
      });
    }
  }
);

onMounted(() => {
  // 添加事件监听
  document.addEventListener('keydown', handleKeydown);
});

onUnmounted(() => {
  // 移除事件监听
  document.removeEventListener('keydown', handleKeydown);
});

const handleKeydown = (e: KeyboardEvent) => {
  const key = (window as any).event.keyCode;
  if (key === 13 && props.activeTab === props.type) {
    handleUserInput(props.activeTab);
  }
};

async function handleUserInput(type: string) {
  setLoadingState(true);
  if (document.getElementById(type)?.innerText) {
    props.setReplyList({ type: 'user', content: document.getElementById(type)?.innerText }, type);

    try {
      let axiosRes;
      if (type === 'baidu') {
        axiosRes = await getChatDataBaidu(document.getElementById(type)?.innerText?.trim() || '');
      } else {
        axiosRes = await getChatDataDeepSeek(
          document.getElementById(type)?.innerText?.trim() || '',
          {
            enabledReasoner: reasonerEnabled.value
          }
        );
      }
      props.setReplyList({ type: 'chat', content: axiosRes?.result }, type);
    } catch (error) {
      ElMessage.error(`AI服务不稳定，请重试，程序错误：${error}`);
    } finally {
      setLoadingState(false);
    }

    if (userInput.value) {
      document.getElementById(type)!.innerText = '';
    }
  } else {
    setLoadingState(false);
    ElMessage.error('您没有输入内容！！');
  }
}

const enableReasoner = () => {
  reasonerEnabled.value = !reasonerEnabled.value;
};
</script>

<style scoped lang="scss">
.chat-input-area-content-area {
  overflow: auto;
  padding-right: 2.5rem;
  height: calc(100% - 2rem);
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
.reasoner-button {
  height: 100%;
  padding: 0.2rem;
  border-radius: 14px;
  outline: none;
  display: flex;
  align-items: center;
  font-family:
    ui-sans-serif,
    -apple-system,
    system-ui,
    Segoe UI,
    Helvetica,
    Apple Color Emoji,
    Arial,
    sans-serif,
    Segoe UI Emoji,
    Segoe UI Symbol;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  color: grey;
  background-color: white;
  border: 1px solid rgba(0, 0, 0, 0.12);
  > :nth-child(1) {
    margin-right: 0.2rem;
  }

  &.reasoner-enabled {
    background-color: rgb(219, 234, 254);
    border-bottom-color: rgba(0, 122, 255, 0.15);
    color: rgb(77, 107, 254);
  }
}
.chat-input-submit {
  position: absolute;
  bottom: 0;
  right: 0;
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
