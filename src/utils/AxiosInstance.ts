﻿import axios from 'axios';
import router from '../router/index';
import { addTestDummyUser, getUserInfo } from '@/service/WeChatService';
// 创建 Axios 实例
const api = axios.create({
  timeout: 500000, // 请求超时时间
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
    // 可以在这里添加其他默认请求头，如认证token等
  }
});
let userAddRes: any;
let userInfoRes: any;

// 添加请求拦截器（可选）
api.interceptors.request.use(
  async config => {
    if (
      (import.meta.env.VITE_USER_NODE_ENV === 'dev' && config.url?.startsWith('/wxlogin/status')) ||
      (config.url?.startsWith('/wxlogin/status') && config.url === '/wechat/userInfo')
    ) {
      if (userAddRes && router.currentRoute.value.fullPath !== '/chat') {
        router.push('/chat');
      } else {
        userAddRes = await addTestDummyUser();
      }
    }
    if (
      (import.meta.env.VITE_USER_NODE_ENV === 'prod' &&
        config.url?.startsWith('/wxlogin/status')) ||
      (config.url?.startsWith('/wxlogin/status') && config.url === '/wechat/userInfo')
    ) {
      userInfoRes = await getUserInfo();
      if (userInfoRes?.nickname && router.currentRoute.value.fullPath === '/') {
        router.push('/chat');
      }
    }
    // 在发送请求之前做些什么，例如添加Token
    // config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  error => {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器（可选）
api.interceptors.response.use(
  response => {
    if (response.data === 'Not authorized') {
      if (router.currentRoute.value.path !== '/') {
        router.push({ path: '/' });
      }
    } else {
      // 对响应数据做点什么，例如错误码处理
      return response.data;
    }
  },
  error => {
    console.log(error);
    // 对响应错误做点什么
    return Promise.reject(error);
  }
);

export default api;
