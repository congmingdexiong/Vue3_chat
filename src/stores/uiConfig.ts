import { defineStore } from 'pinia';

const useUiConfigStore = defineStore('uiConfig', {
  state: () => ({
    activeDrawer: false
  }),
  actions: {
    toggleActiveDrawer(toggle: boolean) {
      this.activeDrawer = toggle;
    }
  },
  getters: {
    selectedActiveDrawer: state => state.activeDrawer
  }
});

export { useUiConfigStore };
