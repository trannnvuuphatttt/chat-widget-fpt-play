import { defineStore } from "pinia";

export const useModalStore = defineStore("modal", {
  state: () => ({
    showModal: false,
    showWidget: false,
    firstLoginModal: false,
  }),
  actions: {
    toggleWidget() {
      this.firstLoginModal = !this.firstLoginModal;
      this.showWidget = !this.showWidget;
    },

    closeWidget() {
      this.showWidget = false;
    },

    toggleFirstLoginModal() {
      this.firstLoginModal = !this.firstLoginModal;
    },
    toggleModal() {
      this.showModal = !this.showModal;
    },
  },
});
