<template>
  <el-drawer
    v-model="activeDrawer"
    title=""
    :direction="direction"
    :before-close="handleClose"
    size="90%"
  >
    <div class="drawer-container">
      <Conversation></Conversation>
      <div class="drawer-avatar">
        <img
          style="width: 2rem; height: 2rem; border-radius: 50%"
          :src="userInformation?.headimgurl"
        />
        <div>{{ userInformation.nickname }}</div>
      </div>
    </div>
  </el-drawer>
  <el-container class="common-layout" v-loading.fullscreen.lock="selectedLoader">
    <el-aside width="200px">Aside</el-aside>
    <el-container>
      <el-header>
        <!-- <RouterLink to="/">PigChat</RouterLink> -->
        <div class="config-setting" @click="uiConfigStore.toggleActiveDrawer(true)">
          <el-icon size="23" style="margin-right: 8px"><Operation /></el-icon>
        </div>
        <div style="font-family: 'Comic Sans MS', cursive, sans-serif; font-weight: 600">
          PigGpt
          <el-icon><ArrowDown /></el-icon>
        </div>
        <div class="edit-setting" @click="createConversation">
          <NewChatConversation />
        </div>
      </el-header>
      <el-main><RouterView /> </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts" name="App">
import Conversation from './components/Conversation.vue';
import { RouterView, useRoute, useRouter } from 'vue-router';
import { provide, ref, watch } from 'vue';
import { ElMessage, type DrawerProps } from 'element-plus';
import { genderateUUID } from './utils/app.utils';
import { useConversationStore } from './stores/conversation';
import type { Conversation as ConversationEntity } from '@/domain/Conversation';
import { newConversation } from './service/chatService';
import { useChatStore } from './stores/chat';
import { useUserStore } from './stores/user';
import { storeToRefs } from 'pinia';
import { isEmpty } from 'lodash';
import { useUiConfigStore } from './stores/uiConfig';
const route = useRoute(); // 获取当前路由信息
const router = useRouter();
const direction = ref<DrawerProps['direction']>('ltr');
const conversationStore = useConversationStore();
const chatStore = useChatStore();
const userStore = useUserStore();
const uiConfigStore = useUiConfigStore();
const { userInformation } = storeToRefs(userStore);
const { activeDrawer, selectedLoader } = storeToRefs(uiConfigStore);

const setLoadingState = (loading: boolean) => {
  uiConfigStore.setLoader(loading);
};
provide('appLoading', { selectedLoader, setLoadingState });

const createConversation = async () => {
  const uuid = genderateUUID();
  const conversationTem = {
    id: uuid,
    aiType: chatStore.selectedAiType
  } as ConversationEntity;

  conversationStore.addActiveConversation(conversationTem);
  console.log('createConversation', conversationTem.id);

  //success - 1 fail - -1
  await newConversation(conversationTem);
  try {
    const userInfo = await userStore.getActiveUserInfo();
    if (!isEmpty(userInfo.nickname)) {
      conversationStore.addAllConversations(userInfo.conversations);
    }
  } catch {
    ElMessage.error('用户信息不存在，请重新登录');
    router.push('/');
  }

  if (chatStore.selectedAiType.startsWith('deepseek')) {
    chatStore.clearReplyListDeepseek();
  }
  if (chatStore.selectedAiType.startsWith('baidu')) {
    chatStore.clearReplyListBaidu();
  }
};

const handleClose = (done: () => void) => {
  uiConfigStore.toggleActiveDrawer(false);
};

// 使用watch监听路由变化
watch(
  () => route.path,
  (oldPath, newPath) => {
    console.log(`route from ${oldPath} to ${newPath}`);
  }
);
</script>

<style>
.common-layout {
  height: 100%;
}
.drawer-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-between;
  .drawer-avatar {
    justify-content: space-evenly;
    display: flex;
    align-items: center;
  }
}
.el-header {
  height: 3rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .config-setting {
    display: none;
  }

  .edit-setting {
    display: none;
  }

  /* background-color: red; */
}
.el-drawer__header {
  margin-bottom: 0;
}
.el-drawer__body {
  padding-top: 0;
}
.el-main {
  padding-top: 0;
  /* background-color: green; */
}
.el-aside {
  /* background-color: blue; */
}
.el-button {
  display: block;
}
@media (max-width: 480px) {
  .el-aside {
    display: none;
  }

  .el-header {
    .config-setting {
      display: block;
    }

    .edit-setting {
      display: block;
    }
  }
}
/*

@media (min-width: 1024px) {
  .el-aside {
    display: block;
  }
} */
</style>
