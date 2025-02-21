<template>
  <el-drawer
    v-model="drawer"
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
  <el-container class="common-layout" v-loading.fullscreen.lock="loader">
    <el-aside width="200px">Aside</el-aside>
    <el-container>
      <el-header>
        <!-- <RouterLink to="/">PigChat</RouterLink> -->
        <div class="config-setting" @click="drawer = true">
          <Operation style="width: 1.5rem; height: 1.5rem; margin-right: 8px" />
        </div>
        <div>
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
import { RouterLink, RouterView, useRoute } from 'vue-router';
import { provide, ref, watch } from 'vue';
import type { DrawerProps } from 'element-plus';
import emitter from './utils/emitter';
import { genderateUUID } from './utils/app.utils';
import { useConversationStore } from './stores/conversation';
import type { Conversation as ConversationEntity } from '@/domain/Conversation';
import { newConversation } from './service/chatService';
const route = useRoute(); // 获取当前路由信息
const currentPath = ref(route.path); // 存储当前路径的响应式引用
const drawer = ref(false);
const direction = ref<DrawerProps['direction']>('ltr');
const userInformation = ref({} as any);
const loader = ref(false);
const conversationStore = useConversationStore();
emitter.on('sendUserInfo', (value: any) => {
  userInformation.value = value;
  console.log(userInformation.value);
});
const setLoadingState = (loading: boolean) => {
  loader.value = loading;
};
provide('appLoading', { loader, setLoadingState });
const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};

const createConversation = async () => {
  const uuid = genderateUUID();
  const conversationTem = {
    id: uuid,
    aiType: 'deepseek-chat'
  } as ConversationEntity;

  conversationStore.addActiveConversation(conversationTem);

  //success - 1 fail - -1
  await newConversation(conversationTem);
  emitter.emit('reloadUserInfo');
  emitter.emit('resetChatChain');
};

const handleClose = (done: () => void) => {
  drawer.value = false;
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
