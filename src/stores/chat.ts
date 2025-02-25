import type { Reply } from '@/domain/Reply';
import { defineStore } from 'pinia';

const useChatStore = defineStore('chat', {
  state: (): {
    activeAiType: string;
    replyListBaidu: Reply[];
    replyListDeepSeek: Reply[];
    reasonerEnabled: boolean;
  } => ({
    activeAiType: 'deepseek-chat',
    replyListBaidu: [],
    replyListDeepSeek: [],
    reasonerEnabled: false
  }),
  actions: {
    addActiveAiType(type: string) {
      if (type === 'deepseek-reasoner') {
        this.reasonerEnabled = true;
      } else {
        this.reasonerEnabled = false;
      }
      if (this.reasonerEnabled) {
        this.activeAiType = 'deepseek-reasoner';
      } else {
        this.activeAiType = type;
      }
    },
    setReasonerEnabled(enabled: boolean) {
      if (enabled) {
        this.activeAiType = 'deepseek-reasoner';
      }
      this.reasonerEnabled = enabled;
    },
    addReplyListBaidu(reply: Reply) {
      this.replyListBaidu.push(reply);
    },
    addAllReplyListBaidu(replys: Reply[]) {
      this.replyListBaidu = replys;
    },
    addReplyListDeepseek(reply: Reply) {
      this.replyListDeepSeek.push(reply);
    },
    addAllReplyListDeepseek(replys: Reply[]) {
      this.replyListDeepSeek = replys;
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
