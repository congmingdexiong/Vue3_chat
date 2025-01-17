import AxiosInstance from '@/utils/AxiosInstance'

export const getSceneId = async () => {
  return await AxiosInstance.get<null, string>('/wxlogin/scene-id')
}

export const getQRCode = async (sceneId: string) => {
  return await AxiosInstance.get<null, string>(`/wxlogin/qrcode?sceneId=${sceneId}`)
}

export const getChatData = async (userMsg: string) => {
  return await AxiosInstance.post<null, { result: string }>('/api', {
    userMsg: userMsg,
  })
}
