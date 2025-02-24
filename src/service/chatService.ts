import type { ChatContent } from '@/domain/ChatContent';
import type { Conversation } from '@/domain/Conversation';
import AxiosInstance from '@/utils/AxiosInstance';

export const getSceneId = async () => {
  return await AxiosInstance.get<null, string>('/wxlogin/scene-id');
};

export const getStatus = async (sceneId: string) => {
  return await AxiosInstance.get<null, string>(`/wxlogin/status?sceneId=${sceneId}`);
};

export const getQRCode = async (sceneId: string) => {
  return await AxiosInstance.get<null, string>(`/wxlogin/qrcode?sceneId=${sceneId}`);
};

export const getChatDataDeepSeek = async (
  userMsg: string,
  opts: {
    enabledReasoner: boolean;
    conversationId?: string;
    aiType: string;
  }
) => {
  return await AxiosInstance.post<null, { result: string; conversation: Conversation }>(
    '/api/deepseek',
    {
      userMsg: userMsg,
      opts
    }
  );
};

export const getChatDataBaidu = async (
  userMsg: string,
  opts?: {
    conversationId: string;
    aiType: string;
  }
) => {
  return await AxiosInstance.post<null, { result: string; conversation: Conversation }>(
    '/api/baidu',
    {
      userMsg: userMsg,
      opts
    }
  );
};

export const getUserInfo = async () => {
  return await AxiosInstance.get<
    null,
    { nickname: string; headimgurl: string; conversations: Conversation[] }
  >('/wechat/userInfo');
};

export const addTestDummyUser = async () => {
  return await AxiosInstance.post<null, { nickname: string; headimgurl: string }>(
    '/wechat/addUser'
  );
};

export const newConversation = async (conversation: Conversation) => {
  return await AxiosInstance.post<Conversation, Conversation>(
    '/api/createConversation',
    conversation
  );
};

export const updateConversation = async (conversation: Conversation) => {
  return await AxiosInstance.post<Conversation, Conversation>(
    '/api/updateConversation',
    conversation
  );
};
export const deleteConversation = async (conversation: Conversation) => {
  return await AxiosInstance.post<Conversation, Conversation>(
    '/api/deleteConversation',
    conversation
  );
};

export const getChatMessageByConversationId = async (conversationId: string) => {
  return await AxiosInstance.get<null, ChatContent[]>(
    `/api/getChatMessage?conversationId=${conversationId}`
  );
};
