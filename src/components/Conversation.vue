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
        @click="setActiveConversation(conversation)"
      >
        <div style="display: inline-block" v-if="!conversation.editStatus">
          {{ conversation.label }}
        </div>

        <input type="text" v-model="conversation.label" v-if="conversation.editStatus" />
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
import {
  newConversation,
  deleteConversation as deleteConversationById,
  updateConversation as updateConversationById
} from '@/service/chatService';
import { useChatStore } from '@/stores/chat';
import { useConversationStore } from '@/stores/conversation';
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
const { allGroupedConversations } = storeToRefs(conversationStore);

const createConversation = async () => {
  const uuid = genderateUUID();
  const conversationTem = {
    id: uuid,
    aiType: 'deepseek-chat'
  } as Conversation;

  conversationStore.addActiveConversation(conversationTem);

  //success - 1 fail - -1
  await newConversation(conversationTem);
  reloadUserInfo();
  chatStore.clearReplyListBaidu();
  chatStore.clearReplyListDeepseek();
};

const handleClick = () => {};

const setActiveConversation = (conversation: Conversation) => {
  conversationStore.addActiveConversation(conversation);
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
