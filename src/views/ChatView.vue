<template>
  <el-tabs
    v-model="activeTabName"
    class="demo-tabs"
    :before-leave="tabLeave"
    @tab-click="handleClick"
  >
    <el-tab-pane label="DeepSeek" name="deepseek">
      <div class="chat-wrapper">
        <div class="chat-content">
          <div class="chat-content-middle">
            <template v-for="(item, index) in replyListDeepSeek" v-bind:key="index">
              <Article
                :item="item"
                :userInformation="userInformation"
                type="deepseek"
                :activeTab="activeTabName"
              ></Article>
            </template>
          </div>
        </div>
        <div class="chat-translator">translator ongoing</div>
        <div class="chat-input-area" ref="inputArea" tabindex="0">
          <InputBox
            ref="inputDeep"
            :replyList="replyListDeepSeek"
            :setReplyList="getReplyList"
            type="deepseek"
            :activeTab="activeTabName"
            title="deepseek"
            @sendComponentConversation="getComponentConversation"
          ></InputBox>
        </div>
      </div>
    </el-tab-pane>
    <el-tab-pane label="Baidu" name="baidu">
      <div class="chat-wrapper">
        <div class="chat-content">
          <div class="chat-content-middle">
            <template v-for="(item, index) in replyListBaidu" v-bind:key="index">
              <Article
                :item="item"
                :userInformation="userInformation"
                :activeTab="activeTabName"
              ></Article>
            </template>
          </div>
        </div>
        <div class="chat-translator">translator ongoing</div>
        <div class="chat-input-area" ref="inputArea" tabindex="0">
          <InputBox
            ref="inputBaidu"
            :replyList="replyListBaidu"
            :setReplyList="getReplyList"
            :activeTab="activeTabName"
            type="baidu"
            title="ERNIE-4.0-8K"
            @sendComponentConversation="getComponentConversation"
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
import { ElMessage, type TabsPaneContext } from 'element-plus';
import { isEmpty } from 'lodash';
import { onMounted, ref, watchEffect } from 'vue';
import { useRouter } from 'vue-router';
import { useConversationStore } from '@/stores/conversation';
import { useChatStore } from '@/stores/chat';
import type { Conversation } from '@/domain/Conversation';
import { storeToRefs } from 'pinia';
import { useUserStore } from '@/stores/user';
import { useUiConfigStore } from '@/stores/uiConfig';

const router = useRouter();
const inputArea = ref<HTMLElement | null>(null);
const conversationStore = useConversationStore();
const componentConversation = ref();
const chatStore = useChatStore();
const userStore = useUserStore();
const uiConfigStore = useUiConfigStore();
const { activeConversation } = storeToRefs(conversationStore);
const { activeTabName, selectedTabActiveName } = storeToRefs(uiConfigStore);
const inputDeep = ref();
const inputBaidu = ref();
const { userInformation } = storeToRefs(userStore);
const { replyListBaidu, replyListDeepSeek, activeAiType } = storeToRefs(chatStore);
const emit = defineEmits(['send-componentConversation']);

onMounted(async () => {
  try {
    const userInfo = await userStore.getActiveUserInfo();
    if (!isEmpty(userInfo.nickname)) {
      ElMessage.info(`您好~~尊敬的 ${userInfo.nickname},欢迎使用PigGpt!!`);
      conversationStore.addAllConversations(userInfo.conversations);
    }
  } catch {
    ElMessage.error('用户信息不存在，请重新登录');
    router.push('/');
  }
});

const tabLeave = async (tab: string) => {
  console.log('当前到达:', tab);
  if (tab === 'baidu') {
    chatStore.setReasonerEnabled(false);
    chatStore.addActiveAiType('baidu');
  } else {
    chatStore.addActiveAiType('deepseek-chat');
  }
};

const handleClick = (tab: TabsPaneContext, event: Event) => {
  uiConfigStore.setActiveTabName(String(tab.paneName));

  //如果组件存在conversation, 如果光是点击，直接load组件
  //                        如果create,则用activeConversation
  //如果组件不存在            如果光是点 do nothing

  //                        如果create,则用activeConversation

  if (selectedTabActiveName.value === 'deepseek') {
    if (
      activeConversation.value?.id &&
      inputDeep.value.componentConversation?.id !== activeConversation.value?.id
    ) {
      // conversationStore.addActiveConversation(
      //   conversationStore.activeConversation || ({} as Conversation)
      // );
    } else {
      if (inputDeep.value.componentConversation?.id) {
        conversationStore.addActiveConversation(inputDeep.value.componentConversation);
      }
    }
  }

  if (selectedTabActiveName.value === 'baidu') {
    if (
      activeConversation.value?.id &&
      inputBaidu.value.componentConversation?.id !== activeConversation.value?.id
    ) {
      // conversationStore.addActiveConversation(
      //   conversationStore.activeConversation || ({} as Conversation)
      // );
    } else {
      if (inputDeep.value.componentConversation?.id) {
        conversationStore.addActiveConversation(inputBaidu.value.componentConversation);
      }
    }
  }
};

const getComponentConversation = (conversation: Conversation) => {
  componentConversation.value = conversation;
};

function getReplyList(reply: Reply, type: string) {
  if (type === 'baidu') {
    chatStore.addReplyListBaidu(reply);
  } else {
    chatStore.addReplyListDeepseek(reply);
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

// function getScrollHeight(element: HTMLElement | any) {
//   // 获取元素的内容高度
//   const totalHeight = element.scrollHeight;
//   // 获取元素的可视区域高度
//   const viewportHeight = element.clientHeight;
//   // 获取滚动条高度
//   const scrollHeight = totalHeight - viewportHeight;
//   return scrollHeight;
// }
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
