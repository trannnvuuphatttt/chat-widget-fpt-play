import { defineStore } from "pinia";

export const useScroll = defineStore("scroll", {
  state: () => ({
    shouldScroll: false,
  }),
  actions: {
    triggerScroll() {
      this.shouldScroll = true;
    },
    resetScroll() {
      this.shouldScroll = false;
    },
  },
});
