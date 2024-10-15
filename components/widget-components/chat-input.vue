<template>
  <div
    class="flex flex-row shadow-md w-[400px] h-[72px] gap-2 py-4 px-6 items-center"
    v-if="modalStore.isChatting"
  >
    <input
      type="text"
      class="bg-gray-200 flex-auto rounded-lg text-[16px] focus:outline-none h-[40px] p-4"
      placeholder="Nhập tin nhắn"
      v-model="messageStore.userInput"
      @keyup.enter="handleSendMessage"
    />
    <button
      class="flex-shrink-0 flex-grow-0 cursor-pointer w-fit h-fit"
      @click="handleSendMessage"
    >
      <img
        v-if="messageStore.userInput === ''"
        src="/assets/images/send_icon_grey.png"
        alt="Send Icon"
      />
      <img
        v-if="messageStore.userInput !== ''"
        src="/assets/images/send_icon_orange.png"
        alt="Send Icon"
      />
    </button>
  </div>

  <div
    class="shadow-md flex flex-row p-4 gap-2 w-[400px] h-[72px] justify-between min-h-[72px]"
    v-if="!modalStore.isChatting && userIDStore.userID"
  >
    <button
      class="flex-auto bg-white border-orange-500 border-2 text-orange-500 hover:bg-gradient-to-r hover:from-[#FE592A] hover:to-[#E93013] hover:text-white text-md rounded-lg"
      @click="
        (modalStore.isChatting = true),
          messageStore.sendMessage(
            '',
            'Mừng bạn đã quay trở lại, tôi chờ bạn mãi! 🥰'
          ),
          console.log(messageStore.newMessageArray),
          modalStore.toggleSuggestion()
      "
    >
      Đoạn chat mới
    </button>
    <button
      class="flex-auto border-2 border-l-[#FE592A] border-b-[#FE592A] border-r-[#E93013] border-t-[#E93013] bg-gradient-to-r from-[#FE592A] to-[#E93013] text-white hover:bg-gradient-to-r hover:from-[#FFF] hover:text-orange-500 text-md rounded-lg"
      @click="
        (modalStore.isChatting = true),
          console.log(messageStore.newMessageArray),
          modalStore.toggleSuggestion()
      "
    >
      Tiếp tục chat
    </button>
  </div>
</template>

<script lang="js" setup>

import { useModalStore } from '~/stores/modal';
import { useMessage } from "../../stores/messages";
import { useUserIDStore } from "../../stores/userID";
import {useScrollStore} from "../../stores/scroll"
import { nextTick } from 'vue';


const modalStore = useModalStore();
const messageStore = useMessage()
const userIDStore = useUserIDStore();


defineOptions({
  inheritAttrs: false
});

const handleSendMessage = () => {
  if(messageStore.userInput !== ''){

    messageStore.sendRequest(messageStore.userInput, userIDStore.userID)
    modalStore.toggleSuggestion()
  }
}
</script>

<style></style>
