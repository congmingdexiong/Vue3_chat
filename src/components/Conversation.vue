<!-- eslint-disable vue/no-use-v-if-with-v-for -->
<template>
  <div class="nav-container">
    <h2 class="nav-logo">PigGpt</h2>
    <div class="new-conversation">
      <el-button
        @click="createConversation"
        size="default"
        type="primary"
        style="width: 7rem; display: flex; justify-content: space-between"
        plain
      >
        <NewChatConversation />
        <div style="margin-left: 0.5rem">新对话</div>
      </el-button>
    </div>
    <div
      class="nav-wrapper"
      v-if="allGroupedConversations.length > 0"
      v-for="(item, index) in allGroupedConversations"
      :key="index"
    >
      <div class="nav-title">{{ item.date }}</div>
      <div
        class="nav-content"
        v-for="conversation in item.content"
        :key="conversation.id"
        @click.stop="setActiveConversation(conversation)"
      >
        <div class="nav-content-label-wrapper" v-if="!conversation.editStatus">
          <div style="margin-right: 0.5rem">
            <el-avatar
              shape="square"
              :size="15"
              fit="fill"
              v-if="
                conversation.aiType === 'deepseek-chat' ||
                conversation.aiType === 'deepseek-reasoner'
              "
              src="/deepseek_logo.PNG"
            />
            <el-avatar
              v-if="conversation.aiType === 'baidu'"
              shape="square"
              :size="15"
              fit="cover"
              src="/baidu_logo.PNG"
            />
          </div>
          <div :class="{ selected: conversation.id === selectedConversation?.id }">
            {{ conversation.label }}
          </div>
        </div>

        <input
          type="text"
          v-model="conversation.label"
          @click.stop="handleInputClick"
          v-if="conversation.editStatus"
        />
        <div v-if="conversation.editStatus">
          <el-icon
            size="20"
            style="margin-right: 0.5rem"
            @click="submitNewConversationLabel(conversation)"
            ><Check
          /></el-icon>
          <el-icon size="20" @click="cancelChangingLabel(conversation)"><Close /></el-icon>
        </div>

        <el-menu
          ref="menu"
          @click.stop="handleClick"
          :collapse="isCollapse"
          class="el-menu-vertical-demo nav-menu-show"
        >
          <!-- @open="handleOpen"
          @close="handleClose" -->
          <el-sub-menu :index="conversation.id" @click.stop="handleClick">
            <template #title>
              <el-icon size="20"><MoreFilled /></el-icon>
            </template>
            <el-menu-item-group>
              <template #title>会话管理</template>
              <el-menu-item
                :index="conversation.id + '- 1'"
                @click="deleteConversation(conversation)"
              >
                <el-icon><Delete /></el-icon>
                删除</el-menu-item
              >
              <el-menu-item
                :index="conversation.id + '- 2'"
                @click="updateConversation(conversation)"
              >
                <el-icon><Edit /></el-icon>
                重命名
              </el-menu-item>
            </el-menu-item-group>
          </el-sub-menu>
        </el-menu>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" name="Conversation">
import type { Conversation } from '@/domain/Conversation';
import type { Reply } from '@/domain/Reply';
import {
  newConversation,
  deleteConversation as deleteConversationById,
  updateConversation as updateConversationById,
  getChatMessageByConversationId
} from '@/service/chatService';
import { useChatStore } from '@/stores/chat';
import { useConversationStore } from '@/stores/conversation';
import { useUiConfigStore } from '@/stores/uiConfig';
import { useUserStore } from '@/stores/user';
import { genderateUUID } from '@/utils/app.utils';
import { ElMessage } from 'element-plus';
import { isEmpty } from 'lodash';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const menu = ref();
const isCollapse = ref(true);
const backupConversation = ref();
const router = useRouter();
const userStore = useUserStore();
const conversationStore = useConversationStore();
const chatStore = useChatStore();
const uiConfigStore = useUiConfigStore();
const { allGroupedConversations, selectedConversation } = storeToRefs(conversationStore);

const createConversation = async () => {
  const uuid = genderateUUID();
  const conversationTem = {
    id: uuid,
    aiType: chatStore.selectedAiType
  } as Conversation;

  conversationStore.addActiveConversation(conversationTem);

  //success - 1 fail - -1
  await newConversation(conversationTem);
  reloadUserInfo();
  chatStore.clearReplyListBaidu();
  chatStore.clearReplyListDeepseek();
};

const handleClick = () => {};
const handleInputClick = () => {};

const setActiveConversation = async (conversation: Conversation) => {
  uiConfigStore.setLoader(true);
  chatStore.addActiveAiType(conversation.aiType);
  conversationStore.addActiveConversation(conversation);
  uiConfigStore.setDrawerCreated(true);
  const chatContents = await getChatMessageByConversationId(conversation.id);
  chatContents.sort((a, b) => a.createdTime.localeCompare(b.createdTime));
  const replyList: Reply[] = chatContents.map(chatContent => {
    return { type: chatContent.userType === 'bot' ? 'chat' : 'user', content: chatContent.content };
  });
  if (chatStore.selectedAiType.startsWith('deepseek')) {
    chatStore.addAllReplyListDeepseek(replyList);
    uiConfigStore.setActiveTabName('deepseek');
  }
  if (chatStore.selectedAiType.startsWith('baidu')) {
    chatStore.addAllReplyListBaidu(replyList);
    uiConfigStore.setActiveTabName('baidu');
  }
  uiConfigStore.setLoader(false);
  uiConfigStore.toggleActiveDrawer(false);
};

const updateConversation = async (conversation: Conversation) => {
  backupConversation.value = { ...conversation };
  conversation.editStatus = true;
};

const submitNewConversationLabel = async (conversation: Conversation) => {
  conversation.editStatus = false;
  await updateConversationById(conversation);
  reloadUserInfo();
};

const cancelChangingLabel = (conversation: Conversation) => {
  conversation.editStatus = false;
  conversation.label = backupConversation.value.label;
};

const deleteConversation = async (conversation: Conversation) => {
  await deleteConversationById(conversation);
  conversationStore.addActiveConversation(null);
  if (chatStore.selectedAiType.startsWith('deepseek')) {
    chatStore.clearReplyListDeepseek();
  }
  if (chatStore.selectedAiType.startsWith('baidu')) {
    chatStore.clearReplyListBaidu();
  }
  reloadUserInfo();
};

const reloadUserInfo = async () => {
  try {
    const userInfo = await userStore.getActiveUserInfo();
    if (!isEmpty(userInfo.nickname)) {
      conversationStore.addAllConversations(userInfo.conversations);
    }
  } catch {
    ElMessage.error('用户信息不存在，请重新登录');
    router.push('/');
  }
};
</script>

<style scoped>
/* .el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 100px;
} */
.nav-container {
  height: 95%;
  overflow: scroll;
  .nav-logo {
    font-family: 'Comic Sans MS', cursive, sans-serif;
    text-align: center;
    margin-bottom: 0.5rem;
  }
  .new-conversation {
    justify-content: center;
  }
  .nav-wrapper {
    padding-top: 2rem;
    .nav-title {
      font-size: 0.8rem;
      margin-bottom: 1rem;
      font-weight: 800;
    }
    .nav-content {
      margin-bottom: 1rem;
      display: flex;
      justify-content: space-between;
      .nav-content-label-wrapper {
        display: flex;
        width: 100%;

        > :nth-child(2) {
          width: 90%;
          &.selected {
            border: 2px solid rgb(236, 245, 255);
          }
        }
      }
      .nav-menu-show {
        display: block;
      }
      &:hover {
        .nav-menu-show {
          display: block;
        }
      }
      &:last-child {
        margin-bottom: 2rem;
      }
    }
  }
}
</style>
