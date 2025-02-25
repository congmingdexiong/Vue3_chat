import type { Conversation } from '@/domain/Conversation';
import { formatDataByDate } from '@/utils/app.utils';
import { defineStore } from 'pinia';

const useConversationStore = defineStore('conversation', {
  state: (): { conversations: Conversation[]; activeConversation: Conversation | null } => ({
    conversations: [],
    activeConversation: null
  }),
  actions: {
    addActiveConversation(conversation: Conversation | null) {
      this.activeConversation = conversation;
    },
    addAllConversations(conversations: Conversation[]) {
      this.conversations = conversations;
    }
  },
  getters: {
    selectedConversation: state => state.activeConversation,
    allConversations: state => state.conversations,
    allGroupedConversations: state => {
      return formatDataByDate(state.conversations);
    }
  }
});

export { useConversationStore };
