<template>
  <div
    id="chat-header"
    class="w-full h-[96px] flex flex-row items-center justify-between shadow-2xl relative mx-auto pr-[16px] sm:pr-[24px] lg:pr-[24px] xl:pr-[16px] pl-[16px] sm:pl-[24px] lg:pl-[24px] xl:pl-[16px] py-3"
  >
    <!-- Avatar and Online Indicator -->
    <div class="flex items-center gap-3">
      <div id="avatar" class="relative">
        <img
          src="assets/images/avatar.png"
          placeholder="avatar"
          class="w-[48px] h-[48px] rounded-full"
        />
        <!-- Online Status Indicator -->
        <div
          class="w-[12px] h-[12px] border-2 border-white rounded-full bg-[#00FF38] absolute bottom-0 right-0"
        ></div>
      </div>

      <!-- Status Text -->
      <div id="status" class="flex flex-col">
        <h3 class="font-semibold text-[16px] sm:text-[20px]">Trợ lý Gati</h3>
        <h2 class="text-sm text-gray-500">Chúng tôi sẵn sàng hỗ trợ bạn!</h2>
      </div>
    </div>

    <!-- Close Button -->
    <div id="closeButton">
      <button
        :disabled="isWaitingSocket || isLoading"
        @click="close"
        class="w-6 h-6"
      >
        <img src="/assets/images/Icon.png" class="w-[12px] h-[12px]" />
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useModalStore } from '../../stores/modal';
import { useChatStore } from '../../stores/chat';
import { useMessage } from '../../stores/messages';

const messageStore = useMessage();
const modalStore = useModalStore();
const chatStore = useChatStore();
const { showSuggestions } = storeToRefs(chatStore);
/*@ts-ignore*/
const { isWaitingSocket, isLoading } = storeToRefs(messageStore);

const close = () => {
  try {
    showSuggestions.value = true;
    modalStore.closeWidget();
  } catch (error) {}
};
</script>

<style></style>
