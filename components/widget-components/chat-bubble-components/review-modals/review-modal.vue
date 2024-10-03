<template></template>

<script lang="js" setup>
import { useModalStore } from "~/stores/modal";

const modalStore = useModalStore();
let inputValue = ref('')

const resultMessage = ref('Input is empty!');


watch(inputValue, (newValue) => {
  if (newValue.trim() === '') {
    resultMessage.value = 'Input is empty!';
  } else {
    resultMessage.value = 'Input has a value.';
  }
});
</script>

<style></style>
