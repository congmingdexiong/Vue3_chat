import type { Conversation } from '@/domain/Conversation';
import { getUserInfo } from '@/service/chatService';
import { defineStore } from 'pinia';
import { reactive } from 'vue';

const useUserStore = defineStore('user', () => {
  const userInformation: {
    nickname?: string;
    headimgurl?: string;
    conversations: Conversation[];
  } = reactive(
    {} as {
      nickname: string;
      headimgurl: string;
      conversations: Conversation[];
    }
  );

  async function getActiveUserInfo() {
    const userInfo = await getUserInfo();
    userInformation.conversations = userInfo.conversations;
    userInformation.headimgurl = userInfo.headimgurl;
    userInformation.nickname = userInfo.nickname;
    return userInformation;
  }

  return { userInformation, getActiveUserInfo };
});

export { useUserStore };
