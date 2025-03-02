import { defineStore } from 'pinia';

const useUiConfigStore = defineStore('uiConfig', {
  state: () => ({
    activeDrawer: false,
    activeTabName: 'deepseek',
    loader: false,
    drawerCreated: false
  }),
  actions: {
    toggleActiveDrawer(toggle: boolean) {
      this.activeDrawer = toggle;
    },
    setActiveTabName(name: string) {
      this.activeTabName = name;
    },
    setLoader(toggle: boolean) {
      this.loader = toggle;
    },
    setDrawerCreated(toggle: boolean) {
      this.drawerCreated = toggle;
    }
  },
  getters: {
    selectedActiveDrawer: state => state.activeDrawer,
    selectedTabActiveName: state => state.activeTabName,
    selectedLoader: state => state.loader,
    selectedDrawerCreated: state => state.drawerCreated
  }
});

export { useUiConfigStore };
