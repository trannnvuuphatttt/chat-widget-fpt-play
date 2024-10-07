import { defineStore } from "pinia";

export const useScrollStore = defineStore("scrollStore", {
  state: () => ({
    scrollToBottom: null, // Hàm sẽ được lưu trữ tại đây
  }),
  actions: {
    setScrollToBottom(fn) {
      this.scrollToBottom = fn;
    },
    triggerScrollToBottom() {
      if (this.scrollToBottom) {
        this.scrollToBottom();
      }
    },
  },
});
