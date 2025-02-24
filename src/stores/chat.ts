import type { Reply } from '@/domain/Reply';
import { defineStore } from 'pinia';

const useChatStore = defineStore('chat', {
  state: (): { activeAiType: string; replyListBaidu: Reply[]; replyListDeepSeek: Reply[] } => ({
    activeAiType: 'deepseek-chat',
    replyListBaidu: [],
    replyListDeepSeek: []
  }),
  actions: {
    addActiveAiType(type: string) {
      this.activeAiType = type;
    },
    addReplyListBaidu(reply: Reply) {
      this.replyListBaidu.push(reply);
    },
    addReplyListDeepseek(reply: Reply) {
      this.replyListDeepSeek.push(reply);
    },
    clearReplyListBaidu() {
      this.replyListBaidu = [];
    },
    clearReplyListDeepseek() {
      this.replyListDeepSeek = [];
    }
  },
  getters: {
    selectedAiType: state => state.activeAiType,
    getReplyListBaidu: state => state.replyListBaidu,
    getReplyListDeepseek: state => state.replyListDeepSeek
  }
});

export { useChatStore };
