<template>
  <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
    <el-tab-pane label="DeepSeek" name="deepseek">
      <div class="chat-wrapper">
        <div class="chat-content">
          <div class="chat-content-middle">
            <template v-for="(item, index) in replyListDeepSeek" v-bind:key="index">
              <Article :item="item" :userInformation="userInformation"></Article>
            </template>
          </div>
        </div>
        <div class="chat-translator">translator ongoing</div>
        <div class="chat-input-area" ref="inputArea" tabindex="0">
          <InputBox
            :replyList="replyListDeepSeek"
            :setReplyList="getReplyList"
            type="deepseek"
            :activeTab="activeTab"
            title="deepseek"
          ></InputBox>
        </div>
      </div>
    </el-tab-pane>
    <el-tab-pane label="Baidu" name="baidu">
      <div class="chat-wrapper">
        <div class="chat-content">
          <div class="chat-content-middle">
            <template v-for="(item, index) in replyListBaidu" v-bind:key="index">
              <Article :item="item" :userInformation="userInformation"></Article>
            </template>
          </div>
        </div>
        <div class="chat-translator">translator ongoing</div>
        <div class="chat-input-area" ref="inputArea" tabindex="0">
          <InputBox
            :replyList="replyListBaidu"
            :setReplyList="getReplyList"
            :activeTab="activeTab"
            type="baidu"
            title="ERNIE-4.0-8K"
          ></InputBox>
        </div>
      </div>
    </el-tab-pane>
  </el-tabs>
</template>

<script setup lang="ts" name="ChatView">
import Article from '@/components/Article.vue';
import InputBox from '@/components/InputBox.vue';
import type { Reply } from '@/domain/Reply';
import { getUserInfo } from '@/service/WeChatService';
import { ElMessage, type TabsPaneContext } from 'element-plus';
import { isEmpty } from 'lodash';
import { onMounted, reactive, ref, watchEffect } from 'vue';
import { useRouter } from 'vue-router';
import emitter from '@/utils/emitter';
const router = useRouter();
const inputArea = ref<HTMLElement | null>(null);
const replyListBaidu = reactive<Reply[]>([]);
const replyListDeepSeek = reactive<Reply[]>([]);
const userInformation = ref({});
const activeTab = ref('deepseek');

onMounted(async () => {
  try {
    const userInfo = await getUserInfo();
    if (isEmpty(userInfo.nickname)) {
      ElMessage.error('用户信息不存在，请重新登录');
      router.push('/');
    } else {
      userInformation.value = userInfo;
      emitter.emit('sendUserInfo', userInfo);
      ElMessage.info(`您好~~尊敬的 ${userInfo.nickname},欢迎使用PigGpt!!`);
    }
    userInformation.value = userInfo;
  } catch {
    ElMessage.error('用户信息不存在，请重新登录');
    router.push('/');
  }
});

const activeName = ref('deepseek');

const handleClick = (tab: TabsPaneContext, event: Event) => {
  activeTab.value = String(tab.paneName) || '';
};

function getReplyList(reply: Reply, type: string) {
  if (type === 'baidu') {
    replyListBaidu.push(reply);
  } else {
    replyListDeepSeek.push(reply);
  }
}

watchEffect(() => {
  if (!isEmpty(replyListDeepSeek) && document.querySelector('.chat-content-middle')) {
    setTimeout(() => {
      const element = document.querySelector('.chat-content-middle') as HTMLElement;

      if (element.scrollHeight > element.clientHeight + 16) {
        element.scrollTop = element.scrollHeight;
      }
    }, 10);
  }
});

function getScrollHeight(element: HTMLElement | any) {
  // 获取元素的内容高度
  const totalHeight = element.scrollHeight;
  // 获取元素的可视区域高度
  const viewportHeight = element.clientHeight;
  // 获取滚动条高度
  const scrollHeight = totalHeight - viewportHeight;
  return scrollHeight;
}
</script>

<style lang="scss">
.demo-tabs {
  height: 100%;
  > .el-tabs__content {
    > .el-tab-pane {
      height: 100%;
    }
  }
}

.chat-wrapper {
  display: flex;
  flex-direction: column;
  height: 100%;

  .chat-content {
    height: 80%;
    overflow-y: scroll;

    .chat-content-middle {
      overflow-y: auto;
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
    height: 20%;
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
        overflow: auto;
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
