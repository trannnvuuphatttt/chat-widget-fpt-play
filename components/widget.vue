<template>
  <div>
    <div
      class="bg-white z-40 fixed bottom-[25px] right-[25px] w-[400px] h-[600px] rounded-lg grid grid-rows-12 overflow-hidden shadow-lg"
      v-show="modalStore.showWidget && !modalStore.firstLoginModal"
    >
      <Header class="row-span-2" />
      <ChatScreen class="row-span-8 p-4" />
      <ChatSuggestion class="row-span-1 pl-4" />
      <ChatInput class="row-span-2" />
      <div v-if="modalStore.showModal">
        <ReviewModal />
      </div>
    </div>
    <div
      v-if="!modalStore.firstLoginModal && !modalStore.showWidget"
      class="z-40 fixed bottom-[25px] right-[25px] flex flex-col items-end gap-2"
    >
      <div class="bg-white rounded-t-lg rounded-l-lg p-4 z-50 shadow-lg">
        <p>Xin chào 👋 ! tôi có thể giúp gì cho bạn không? 🤖</p>
      </div>
      <button @click="modalStore.toggleFirstLoginModal" class="z-40">
        <img src="/assets/images/avatar.png" class="w-16 h-16" />
      </button>
    </div>
    <div
      class="bg-white rounded-lg shadow-lg w-[400px] h-[400px] z-40 fixed bottom-[25px] right-[25px] flex flex-col justify-between items-center p-4"
      v-if="modalStore.firstLoginModal"
    >
      <button
        class="relative self-end"
        @click="modalStore.toggleFirstLoginModal"
      >
        <i class="fa-solid fa-x right-3 absolute"></i>
      </button>
      <img src="/assets/images/avatar.png" class="w-24 h-24" />
      <p>Xin chào! chúng tôi sẵn sàng hỗ trợ bạn</p>
      <button
        class="mb-4 rounded-lg shadow-md bg-orange-500 border-orange-500 border-2 text-white hover:bg-white hover:text-orange-500 h-fit w-[80%]"
        @click="modalStore.toggleWidget"
      >
        <p class="my-4 mx-2">Bắt đầu Chat</p>
      </button>
    </div>
  </div>
</template>

<script lang="js" setup>
import ChatInput from "./widget-components/chat-input.vue";
import ChatScreen from "./widget-components/chat-screen.vue";
import ChatSuggestion from "./widget-components/chat-suggestion.vue";
import Header from "./widget-components/header.vue";
import ReviewModal from "./widget-components/chat-bubble-components/review-modals/review-modal.vue";
import { useModalStore } from '~/stores/modal';

const modalStore = useModalStore();
</script>

<style></style>
