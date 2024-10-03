<template>
  <div class="grid-cols-10 grid shadow-md" v-if="modalStore.isChatting">
    <input
      type="text"
      class="bg-gray-200 col-span-9 rounded-lg m-2 text-md pl-2 focus:outline-none"
      placeholder="Nhập tin nhắn"
      v-model="messageStore.userInput"
    />
    <button
      class="col-span-1 pr-1 cursor-pointer"
      @click="
        messageStore.sendRequest(messageStore.userInput, userIDStore.userID)
      "
    >
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
  <div
    class="shadow-md grid-cols-2 grid p-2 gap-2"
    v-if="!modalStore.isChatting && userIDStore.userID"
  >
    <button
      class="bg-white border-orange-500 border-2 text-orange-500 hover:bg-orange-500 hover:text-white text-md rounded-lg"
      @click="
        userIDStore.createNewID(),
          (modalStore.isChatting = true),
          messageStore.emptyArray()
      "
    >
      Đoạn chat mới
    </button>
    <button
      class="bg-orange-500 border-orange-500 border-2 text-white hover:bg-white hover:text-orange-500 text-md rounded-lg"
      @click="modalStore.isChatting = true"
    >
      Tiếp tục chat
    </button>
  </div>
</template>

<script lang="js" setup>

import { useModalStore } from '~/stores/modal';
import { useMessage } from "../../stores/messages";
import { useUserIDStore } from "../../stores/userID";


const modalStore = useModalStore();
const messageStore = useMessage()
const userIDStore = useUserIDStore();


 const resultMessage = ref('Input is empty!');
console.log(messageStore.userInput)

watch(messageStore.userInput, (newValue) => {
  console.log(messageStore.userInput)
  if (newValue.trim() === '') {
    resultMessage.value = 'Input is empty!';
  } else {
    resultMessage.value = 'Input has a value.';
  }
});
</script>

<style></style>
