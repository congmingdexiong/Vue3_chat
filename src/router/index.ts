import { createRouter, createWebHistory } from 'vue-router';
import ChatView from '@/views/ChatView.vue';
import Login from '@/views/LoginView.vue';
import LoginAuthenticate from '@/views/LoginAuthenticate.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Login',
      component: () => Promise.resolve(Login)
    },
    {
      path: '/chat',
      name: 'Chat',
      component: () => Promise.resolve(ChatView)
    },
    {
      path: '/authenticate',
      name: 'Authenticate',
      component: () => Promise.resolve(LoginAuthenticate)
    },
    {
      path: '/:catchAll(.*)*',
      redirect: '/chat'
    }
  ]
});

export default router;
