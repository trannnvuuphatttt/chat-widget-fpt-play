<template>
  <div class="grid-cols-10 grid shadow-md">
    <input
      type="text"
      class="bg-gray-200 col-span-9 rounded-lg m-2 text-md pl-2 focus:outline-none"
      placeholder="Nhập tin nhắn"
      v-model="inputValue"
    />
    <button class="col-span-1 pr-1 cursor-pointer">
      <i
        v-if="resultMessage === 'Input is empty!'"
        class="fa-solid fa-paper-plane text-gray-400"
      ></i>
      <i
        v-if="resultMessage === 'Input has a value.'"
        class="fa-solid fa-paper-plane text-orange-500"
      ></i>
    </button>
  </div>
</template>

<script lang="js" setup>
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
