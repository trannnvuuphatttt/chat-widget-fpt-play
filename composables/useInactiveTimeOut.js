import { ref, onMounted, onUnmounted } from "vue";
import { useModalStore } from "~/stores/modal";

const modalStore = useModalStore();
export default function useInactivity(timeoutDuration = 30000) {
  const isInactive = ref(false);
  let timeoutId = null;

  const resetTimeout = () => {
    clearTimeout(timeoutId);
    isInactive.value = false;

    timeoutId = setTimeout(() => {
      isInactive.value = true;
      onUserInactive();
    }, timeoutDuration);
  };

  const onUserInactive = () => {
    console.log("User is inactive. Do something here.");
    modalStore.closeWidget();
  };

  const setupInactivityListener = () => {
    window.addEventListener("mousemove", resetTimeout);
    window.addEventListener("keydown", resetTimeout);
    window.addEventListener("click", resetTimeout);
    window.addEventListener("scroll", resetTimeout);
  };

  const removeInactivityListener = () => {
    window.removeEventListener("mousemove", resetTimeout);
    window.removeEventListener("keydown", resetTimeout);
    window.removeEventListener("click", resetTimeout);
    window.removeEventListener("scroll", resetTimeout);
  };

  onMounted(() => {
    resetTimeout();
    setupInactivityListener();
  });

  onUnmounted(() => {
    clearTimeout(timeoutId);
    removeInactivityListener();
  });

  return {
    isInactive,
  };
}
