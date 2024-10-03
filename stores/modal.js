import { defineStore } from "pinia";

export const useModalStore = defineStore("modal", {
  state: () => ({
    showModal: false,
    showWidget: false,
    isChatting: true,
  }),
  actions: {
    toggleWidget() {
      this.showWidget = !this.showWidget;
    },

    closeWidget() {
      this.showWidget = false;
      this.isChatting = false;
    },

    toggleModal() {
      this.showModal = !this.showModal;
    },
  },
});
