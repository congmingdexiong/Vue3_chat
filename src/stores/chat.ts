import { defineStore } from 'pinia';

const useChatStore = defineStore('chat', {
  state: (): { activeAiType: string } => ({
    activeAiType: 'deepseek-chat'
  }),
  actions: {
    addActiveAiType(type: string) {
      this.activeAiType = type;
    }
  },
  getters: {
    selectedAiType: state => state.activeAiType
  }
});

export { useChatStore };
