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

export const getChatDataDeepSeek = async (userMsg: string) => {
  return await AxiosInstance.post<null, { result: string }>('/api/deepseek', {
    userMsg: userMsg
  });
};
export const getChatDataBaidu = async (userMsg: string) => {
  return await AxiosInstance.post<null, { result: string }>('/api/baidu', {
    userMsg: userMsg
  });
};

export const getUserInfo = async () => {
  return await AxiosInstance.get<null, { nickname: string; headimgurl: string }>(
    '/wechat/userInfo'
  );
};
export const addTestDummyUser = async () => {
  return await AxiosInstance.post<null, { nickname: string; headimgurl: string }>(
    '/wechat/addUser'
  );
};
