import { defineStore } from "pinia";

export const useSnackBarStore = defineStore("snackbar", {
  state: () => ({
    snackBarVisible: false,
    message: "",
    snackBarClass: "animate__animated animate__fadeInUp",
  }),
  actions: {
    showSnackbar() {
      this.message = "Cảm ơn đánh giá của bạn!";
      this.snackBarVisible = true;
      this.snackBarClass = "animate__animated animate__fadeInUp";
      setTimeout(() => {
        this.snackBarClass = "animate__animated animate__fadeOutDown";

        setTimeout(() => {
          this.snackBarVisible = false;
        }, 1000);
      }, 3000);
    },
  },
});
