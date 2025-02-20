<template>
  <textarea name="" id="" placeholder="MessageChatGPT" style="display: none"></textarea>
  <!-- <div
  class="chat-input-area-content-area"
  contenteditable="true"
  data-virtualkeyboard="true"
  :placeholder="placeholder"
  :id="props.type"
  ref="userInput"
  ></div> -->
  <canvas id="recordCanvas" ref="record" style="height: 10px"></canvas>
  <button @click="handleStart">record</button>
  <button @click="handleStop">stop</button>
  <button @click="handlePlay">play</button>
  <!-- <div class="chat-input-submit">
    <button
      ref="buttonRef"
      aria-label="Send prompt"
      data-testid="send-button"
      @click="handleUserInput(props.type)"
      @keydown.enter="handleUserInput(props.type)"
    >
      <SubmitIco></SubmitIco>
    </button>
  </div> -->
</template>

<script setup lang="ts" name="InputBox">
import { computed, inject, reactive, ref, watch } from 'vue';
import { ElMessage } from 'element-plus';
import { getChatDataBaidu, getChatDataDeepSeek } from '@/service/chatService';
import Recorder from 'js-audio-recorder';
// import Recorder from 'js-audio-recorder';

const props = defineProps(['setReplyList', 'type', 'activeTab', 'title']);
const { setLoadingState } = inject('appLoading', {
  loader: false,
  setLoadingState: (loading: boolean) => {}
});
const buttonRef = ref<HTMLElement | null>();
const userInput = ref<HTMLElement | null>();

const placeholder = computed(() => `Message PigGPT ⇔‌ ${props.title} `);
let recorder: any = null; //录音
let drawRecordId: any = null;
const drawPlayId = null;

const handleStart = async () => {
  const mediaStream = await navigator.mediaDevices.getUserMedia({ audio: true });

  console.log(mediaStream);

  // 初始化 AudioContext 和 MediaStreamSource 对象
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  const sourceNode = audioContext.createMediaStreamSource(mediaStream);
  recorder = new Recorder(sourceNode.context);
  // Recorder.getPermission().then(() => {
  //   recorder.start().then(() => {
  //     // this.drawRecord();
  //   });
  // });
  recorder.start();
  // recorder.start();
};
// 停止录音
const handleStop = () => {
  recorder.stop();
  drawRecordId && cancelAnimationFrame(drawRecordId);
  drawRecordId = null;
};
// 播放录音
const handlePlay = () => {
  recorder.play();
};

document.onkeydown = function (e) {
  const key = (window as any).event.keyCode;
  if (key === 13) {
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
          document.getElementById(type)?.innerText?.trim() || ''
        );
      }
      props.setReplyList({ type: 'chat', content: axiosRes.result }, type);
    } catch (error) {
      ElMessage.error(`程序错误！${error}`);
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
</script>

<style scoped lang="scss">
.chat-input-area-content-area {
  overflow: auto;
  padding-right: 2.5rem;
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
