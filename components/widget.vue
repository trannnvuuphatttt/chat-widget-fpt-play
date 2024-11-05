<template>
  <div class="">
    <div
      class=" widget-container max-h-[100vh] max-w-[100vw] bg-white z-40 fixed widget-container rounded-lg flex flex-col overflow-hidden shadow-lg w-full sm:w-[400px] lg:w-[450px] xl:w-[400px] h-full sm:h-[668px] lg:h-[400px] xl:h-[668px] right-0 sm:right-[40px] lg:right-[60px] bottom-0 sm:bottom-[40px] lg:bottom-[60px]"
      v-show="modalStore.showWidget && userIDStore.userID !== null" v-if="!isInactive">
      <Header class="flex-shrink-0 flex-grow-0" />
      <ChatScreen class="flex-auto" />
      <chatSuggestion class="flex-grow-0 pl-6 pb-2" v-show="modalStore.isSuggestion" />
      <ChatInput class="flex-shrink-0 flex-grow-0" />

      <div v-show="modalStore.showModal"
        class="z-50 bg-black rounded-lg w-full h-full p-2 bg-opacity-60 flex absolute items-center justify-center top-0 left-0">
        <div class="bg-white rounded-lg p-4 w-[90%] sm:w-[368px] h-fit m-4 flex flex-col gap-2">
          <div class="flex-initial flex flex-col gap-2">
            <h1 class="font-sf-pro-display text-lg text-center">
              Câu trả lời chưa tốt với bạn?
            </h1>

            <textarea name="message" rows="10" cols="30"
              class="rounded-lg shadow-dm h-[90%] sm-h[104px] p-2 border-2 border-gray-200 my-2 focus:outline-none text-lg"
              placeholder="Bạn hãy cho biết lý do câu trả lời chưa tốt và nên được cải thiện như thế nào?"
              v-model="messageStore.userComment"></textarea>
          </div>
          <div class="flex flex-auto justify-between gap-2">
            <button
              class="flex-auto p-2 border-orange-500 border-2 text-orange-500 w-[90%] sm:w-[120px] rounded-md hover:text-white hover:bg-orange-500"
              @click="modalStore.toggleModal">
              Đóng
            </button>

            <button
              class="flex-auto p-2 border-2 border-[#EFEFEF] text-gray-400 bg-[#EFEFEF]w-[90%] sm:w-[120px] rounded-md"
              v-if="messageStore.userComment === ''">
              Gửi yêu cầu
            </button>
            <button
              class="flex-auto p-2 border-2 border-orange-500 text-white bg-orange-500 w-[90%] sm:w-[120px] rounded-md hover:text-orange-500 hover:bg-white"
              v-if="messageStore.userComment !== ''" @click="() => {
                modalStore.toggleModal();
                messageStore.messageEvaluate(
                  false,

                  reviewStore.chatID,
                  reviewStore.userID,
                );
                snackBarStore.showSnackbar();
              }
                ">
              Gửi yêu cầu
            </button>
          </div>
        </div>
      </div>
      <div
        class="flex flex-row gap-2 absolute bottom-[120px] left-[20%] right-[20%] bg-[#4caf50] p-4 rounded-lg text-white zIndex"
        v-if="snackBarStore.snackBarVisible" id="snackbar" :class="snackBarStore.snackBarClass">
        <img class="flex-shrink-0 flex-grow-0" src="/assets/images/review_snackbar_icon.png" />
        <p class="flex-shrink-0 flex-grow-0">{{ snackBarStore.message }}</p>
      </div>
    </div>
  </div>
  <div v-show="!modalStore.showWidget"
    class="z-40 fixed bottom-[40px] right-[40px] flex flex-col items-end w-[90%] sm:w-[280px] gap-[16px]">
    <div id="box"
      class="hidden break-words bg-white leading-5 rounded-t-2xl rounded-br-[4px] rounded-tr-2xl rounded-bl-2xl p-4 z-50 shadow-lg animate__animated w-[280px] h-[90%] sm:h-[74px]">
      <p id="typing-text" class="text-[90%] sm:text-[16px]"></p>
    </div>
    <button @click="modalStore.toggleWidget" class="z-40">
      <img src="/assets/images/avatar.png" class="w-[64px] sm:w-[80px] h-[64px] sm:h-[80px]" />
    </button>
  </div>
  <div
    class="widget-container bg-white widget-container overflow-hidden rounded-[16px] shadow-lg w-[90%] h-[35%] sm:w-[400px] sm-h-[354px] z-40 fixed bottom-[40px] mx-auto left-3 right-3 flex flex-col justify-between items-center p-6 gap-[24px] sm:gap-[44px]"
    v-if="userIDStore.userID === null && modalStore.showWidget">
    <button class="relative self-end flex-none" @click="modalStore.toggleWidget">
      <img src="/assets/images/Icon.png" class="w-[90%] sm:w-[12px] h-[90%] sm:h-[12px]" />
    </button>
    <div class="flex-none w-[90%] sm:w-[352px] h-[45px] sm:h-[45px]gap-[16px] flex flex-col items-center">
      <img src="/assets/images/avatar.png" class="w-[84px] h-[84px] sm:w-[104px] sm:h-[104px] text-center flex-none" />
      <p class="font-sf-pro-display text-[16px] text-center flex-auto leading-[20.8px] tracking-custom font-normal">
        Xin chào! chúng tôi sẵn sàng hỗ trợ bạn.
      </p>
    </div>
    <button @click="() => userIDStore.createNewID()"
      class="rounded-lg border-2 border-l-[#FE592A] border-b-[#FE592A] border-r-[#E93013] border-t-[#E93013] shadow-md bg-gradient-to-r from-[#FE592A] to-[#E93013] text-white hover:bg-gradient-to-r hover:from-white hover:border-2 hover:border-orange-500 hover:text-orange-500 h-[45px] sm:h-[45px] w-[90%] sm:w-[352px] px-4 sm:px-6 py-3 flex-auto">
      <p
        class="font-sf-pro-display text-[90%] sm:text-[16px] text-center flex-auto leading-[20.8px] tracking-custom font-normal">
        Bắt đầu trò chuyện
      </p>
    </button>
  </div>
</template>

<script lang="js" setup>

import ChatInput from "./widget-components/chat-input.vue";
import ChatScreen from "./widget-components/chat-screen.vue";
import chatSuggestion from "./widget-components/chat-suggestion.vue";
import Header from "./widget-components/header.vue";
import displayMessage from "./widget-components/chat-bubble-components/bot-chat-bubble.vue"

import { useModalStore } from '~/stores/modal';
import { useUserIDStore } from '~/stores/userID';
import { ref, onMounted, onUnmounted, nextTick } from 'vue';
import { useMessage } from "~/stores/messages";
import { useSnackBarStore } from "~/stores/snackbar";
import { useReview } from '~/stores/review';

const modalStore = useModalStore();
const userIDStore = useUserIDStore()
const messageStore = useMessage();
const snackBarStore = useSnackBarStore()
const reviewStore = useReview()

const arrayLength = computed(() => messageStore.newMessageArray.length);

watch(arrayLength, (newLength, oldLength) => {
  if (newLength !== oldLength && newLength > 1) {

    modalStore.isSuggestion = false;

  } else {
    modalStore.isSuggestion = true;
  }

});
import useInactivity from '~/composables/useInactiveTimeOut';

const { isInactive } = useInactivity(60000);


defineOptions({
  inheritAttrs: false
})

onMounted(() => {
  const text = `Xin chào! Tôi có thể giúp gì cho bạn không?`;
  const typingElement = document.getElementById('typing-text');
  const boxElement = document.getElementById('box');
  userIDStore.getExistedID()
  let index = 0;
  let isTyping = true;
  let typingSpeed = 100;
  let pauseTime = 2000;
  let deleteSpeed = 50;

  function typeText() {
    if (index < text.length && isTyping) {
      typingElement.innerHTML += text.charAt(index);
      index++;
      setTimeout(typeText, typingSpeed);
    } else if (index === text.length) {

      setTimeout(() => {
        isTyping = false;
        untypeText();
      }, pauseTime);
    }
  }

  function untypeText() {
    if (index > 0 && !isTyping) {
      typingElement.innerHTML = text.substring(0, index - 1);
      index--;
      setTimeout(untypeText, deleteSpeed);
    } else if (index === 0) {

      boxElement.classList.remove('fadeIn');
      boxElement.classList.add('fadeOut');
      setTimeout(() => {

        boxElement.style.display = 'none';
        setTimeout(() => {
          boxElement.classList.remove('fadeOut');
          showBoxAndTypeAgain();
        }, pauseTime);
      }, 2000);
    }
  }

  function showBoxAndTypeAgain() {

    boxElement.style.display = 'block';
    boxElement.classList.add('fadeIn');
    index = 0;
    isTyping = true;
    setTimeout(typeText, 500);
  }


  showBoxAndTypeAgain();
})
</script>

<style>
.fadeIn {
  display: block;
  animation: zoomIn 1s forwards;
}

@keyframes zoomIn {
  from {
    opacity: 0;
    transform: scale(0);
    transform: translate(100%, 100%);
  }

  to {
    opacity: 1;
    transform: scale(1);
    transform: translate(0, 0);
  }
}

.fadeOut {
  display: block;
  animation: zoomOut 1s forwards;
}

@keyframes zoomOut {
  from {
    opacity: 1;
    transform: scale(1);
    transform: translate(0, 0);
  }

  to {
    opacity: 0;
    transform: scale(0);
    transform: translate(100%, 100%);
  }
}

.zIndex {
  z-index: 1000;
}

.fixed-height {
  height: 668px;
  max-height: 100vh;
}

@media (max-height: 600px) {
  .fixed-height {
    height: calc(100vh - 60px);
  }
}
</style>
