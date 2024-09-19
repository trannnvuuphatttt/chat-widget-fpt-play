<template>
  <div
    class="z-50 bg-black rounded-lg w-[100%] h-[100%] p-2 bg-opacity-60 flex absolute items-center justify-center top-0 left-0"
  >
    <div class="bg-white rounded-lg p-4">
      <h1 class="text-bold text-2xl text-center">
        Câu trả lời chưa tốt với bạn?
      </h1>

      <textarea
        name="message"
        rows="10"
        cols="30"
        class="rounded-lg shadow-dm w-full p-4 border-2 border-gray-200 my-2 focus:outline-none"
        placeholder="Bạn hãy cho biết lý do câu trả lời chưa tốt và nên được cải thiện như thế nào?"
        v-model="inputValue"
      ></textarea>
      <div class="flex justify-between">
        <button
          class="p-4 border-orange-500 border-2 text-orange-500 w-[120px] rounded-md hover:text-white hover:bg-orange-500"
          @click="modalStore.toggleModal"
        >
          Đóng
        </button>
        <button
          v-if="resultMessage === 'Input is empty!'"
          class="p-4 border-2 border-gray-300 text-gray-400 bg-gray-300 w-[120px] rounded-md"
        >
          Gửi yêu cầu
        </button>
        <button
          v-if="resultMessage === 'Input has a value.'"
          class="p-4 border-2 border-orange-500 text-white bg-orange-500 w-[120px] rounded-md hover:text-orange-500 hover:bg-white"
        >
          Gửi yêu cầu
        </button>
      </div>
    </div>
  </div>
</template>

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
