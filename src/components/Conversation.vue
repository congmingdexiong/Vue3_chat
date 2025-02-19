<template>
  <div class="nav-wrapper" v-for="(item, index) in formattedConversationList" :key="index">
    <div class="nav-title">{{ item.date }}</div>
    <div class="nav-content" v-for="conversation in item.content" :key="conversation.id">
      {{ conversation.label }}
    </div>
  </div>
</template>

<script setup lang="ts" name="Conversation">
import type { Conversation, FormattedData } from '@/domain/Conversation';
import { formatDataByDate } from '@/utils/app.utils';
import { ref } from 'vue';

const formattedConversationList = ref<FormattedData[]>(
  formatDataByDate([
    {
      id: '1',
      label: '凡人修仙传',
      createdTime: '2025-02-19T09:58:31.482864300'
    },
    {
      id: '2',
      label: 'NSLookup使用与原理',
      createdTime: '2025-02-17T09:58:31.482864300'
    },
    {
      id: '3',
      label: 'Full-stack Enginerr at Fidelity',
      createdTime: '2025-02-14T09:58:31.482864300'
    },
    {
      id: '4',
      label: '宠物插图创作',
      createdTime: '2025-02-15T09:58:31.482864300'
    },
    {
      id: '5',
      label: '提取文字内容',
      createdTime: '2025-02-16T09:58:31.482864300'
    },
    {
      id: '6',
      label: '熊猪求饶插图',
      createdTime: '2025-01-31T09:58:31.482864300'
    },
    {
      id: '7',
      label: '提取文字内容',
      createdTime: '2025-01-30T09:58:31.482864300'
    }
  ])
);
</script>

<style scoped>
.nav-wrapper {
  .nav-title {
    font-size: 0.8rem;
    margin-bottom: 1rem;
    font-weight: 800;
  }
  .nav-content {
    margin-bottom: 1rem;
  }
}
</style>
