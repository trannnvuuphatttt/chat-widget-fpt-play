export const useModal = () => {
  let showModal = ref(false);
  let showWidget = ref(false);
  let firstLoginModal = ref(false);

  const toggleWidget = () => {
    firstLoginModal.value = !firstLoginModal.value;
    showWidget.value = !showWidget.value;
    console.log(showWidget.value, firstLoginModal.value);
  };

  const closeWidget = () => {
    showWidget.value = false;
    console.log(showWidget.value, firstLoginModal.value);
  };

  const toggleFirstLoginModal = () => {
    firstLoginModal.value = !firstLoginModal.value;
    console.log(showWidget.value, firstLoginModal.value);
  };

  const toggleModal = () => {
    showModal.value = !showModal.value;
    console.log(showModal.value);
  };

  return {
    showModal,
    showWidget,
    firstLoginModal,
    toggleWidget,
    toggleFirstLoginModal,
    toggleModal,
    closeWidget,
  };
};
