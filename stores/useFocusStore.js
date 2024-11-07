// stores/useFocusStore.js
import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useFocusStore = defineStore('focus', () => {
  const inputFieldRef = ref(null);

  // Set the ref to the input field, called once in the component with the input field
  const setInputRef = (inputRef) => {
    inputFieldRef.value = inputRef;
  };

  // Function to focus on the input field
  const focusInput = () => {
    if (inputFieldRef.value) {
      inputFieldRef.value.focus();
    }
  };

  return {
    setInputRef,
    focusInput,
  };
});
