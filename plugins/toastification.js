import { defineNuxtPlugin } from "#app";
import Toast, { POSITION } from "vue-toastification";
import "vue-toastification/dist/index.css";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(Toast, {
    position: POSITION.BOTTOM_CENTER, // Vị trí hiển thị Snackbar
    timeout: 3000, // Thời gian hiển thị (3 giây)
    closeOnClick: true, // Đóng khi người dùng click vào
  });
});
