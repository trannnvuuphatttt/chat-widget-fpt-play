// composables/useInactivityHandler.js
import { onMounted, onBeforeUnmount } from "vue";
import { useModalStore } from "~/stores/modal";

export default function useInactivityHandler() {
  const modalStore = useModalStore();

  let inactivityTimeout = null;
  let buttonTimeout = null;

  const resetTimers = () => {
    if (inactivityTimeout) clearTimeout(inactivityTimeout);
    if (buttonTimeout) clearTimeout(buttonTimeout);

    inactivityTimeout = setTimeout(() => {
      modalStore.closeWidget();
    }, 60000);

    buttonTimeout = setTimeout(() => {
      modalStore.closeChatting(true);
    }, 7200000);
  };

  const handleUserActivity = () => {
    resetTimers();
  };

  onMounted(() => {
    document.addEventListener("mousemove", handleUserActivity);
    document.addEventListener("keydown", handleUserActivity);
    document.addEventListener("click", handleUserActivity);
    document.addEventListener("scroll", handleUserActivity);

    resetTimers();
  });

  onBeforeUnmount(() => {
    document.removeEventListener("mousemove", handleUserActivity);
    document.removeEventListener("keydown", handleUserActivity);
    document.removeEventListener("click", handleUserActivity);
    document.removeEventListener("scroll", handleUserActivity);

    if (inactivityTimeout) clearTimeout(inactivityTimeout);
    if (buttonTimeout) clearTimeout(buttonTimeout);
  });
}
