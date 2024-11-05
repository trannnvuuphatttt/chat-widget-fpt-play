<template>
  <!-- Input Container for Chatting -->
  <div
    class="flex flex-row shadow-md w-full sm:w-[400px] h-[72px] sm:h-[80px] gap-2 py-2 px-4 sm:px-6 items-center"
    v-if="modalStore.isChatting"
  >
    <input
      type="text"
      class="bg-gray-200 flex-auto rounded-lg text-[14px] sm:text-[16px] focus:outline-none h-[40px] sm:h-[48px] p-3 sm:p-4 caret-[#FF6500]"
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
        class="w-5 h-5 sm:w-6 sm:h-6"
      />
      <img
        v-if="messageStore.userInput !== ''"
        src="/assets/images/send_icon_orange.png"
        alt="Send Icon"
        class="w-5 h-5 sm:w-6 sm:h-6"
      />
    </button>
  </div>

  <!-- Buttons Container for Chat Options -->
  <div
    class="shadow-md flex flex-row p-3 sm:p-4 gap-2 w-full sm:w-[400px] h-[72px] sm:h-[80px] justify-between min-h-[72px]"
    v-if="!modalStore.isChatting && userIDStore.userID"
  >
    <button
      class="flex-auto border-2 border-l-[#FE592A] border-b-[#FE592A] border-r-[#E93013] border-t-[#E93013] bg-gradient-to-r from-[#FE592A] to-[#E93013] text-white hover:bg-gradient-to-r hover:from-[#FFF] hover:text-orange-500 text-sm sm:text-md rounded-lg"
      @click="
        messageStore.emptyArray();
        modalStore.isChatting = true;
      "
    >
      Đoạn chat mới
    </button>
    <button
      class="flex-auto border-2 border-l-[#FE592A] border-b-[#FE592A] border-r-[#E93013] border-t-[#E93013] bg-gradient-to-r from-[#FE592A] to-[#E93013] text-white hover:bg-gradient-to-r hover:from-[#FFF] hover:text-orange-500 text-sm sm:text-md rounded-lg"
      @click="handleContinueChatting"
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
const messageStore = useMessage();
const userIDStore = useUserIDStore();

defineOptions({
  inheritAttrs: false,
});

const handleContinueChatting = () => {
  modalStore.isChatting = true;
};

const handleSendMessage = () => {
  if (!messageStore.userInput) {
    return
  }
  const inputText = messageStore.userInput.trim()
  if (inputText === "") return

  const { query: { token } } = useRoute()

  const pID = token || userIDStore.userID

  messageStore.sendRequest(messageStore.userInput, pID, userIDStore.userID)
  modalStore.toggleSuggestion()
}
</script>

<style></style>
