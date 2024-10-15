<template>
  <div class="">
    <div
      class="bg-white z-40 fixed widget-container rounded-lg flex flex-col overflow-hidden shadow-lg w-[400px] h-[668px] right-[40px] bottom-[40px]"
      v-show="modalStore.showWidget && userIDStore.userID !== null"
      v-if="!isInactive"
    >
      <Header class="flex-shrink-0 flex-grow-0" />
      <ChatScreen class="flex-auto" />
      <chatSuggestion
        class="flex-grow-0 pl-6 pb-2"
        v-show="modalStore.isSuggestion"
      />
      <ChatInput class="flex-shrink-0 flex-grow-0" />

      <div
        v-show="modalStore.showModal"
        class="z-50 bg-black rounded-lg w-full h-full p-2 bg-opacity-60 flex absolute items-center justify-center top-0 left-0"
      >
        <div
          class="bg-white rounded-lg p-4 w-[368px] h-fit m-4 flex flex-col gap-2"
        >
          <div class="flex-initial flex flex-col gap-2">
            <h1 class="text-semibold text-lg text-center">
              Câu trả lời chưa tốt với bạn?
            </h1>

            <textarea
              name="message"
              rows="10"
              cols="30"
              class="rounded-lg shadow-dm h-[104px] p-2 border-2 border-gray-200 my-2 focus:outline-none text-lg"
              placeholder="Bạn hãy cho biết lý do câu trả lời chưa tốt và nên được cải thiện như thế nào?"
              v-model="messageStore.userComment"
            ></textarea>
          </div>
          <div class="flex flex-auto justify-between gap-2">
            <button
              class="flex-auto p-2 border-orange-500 border-2 text-orange-500 w-[120px] rounded-md hover:text-white hover:bg-orange-500"
              @click="modalStore.toggleModal"
            >
              Đóng
            </button>

            <button
              class="flex-auto p-2 border-2 border-[#EFEFEF] text-gray-400 bg-[#EFEFEF] w-[120px] rounded-md"
              v-if="messageStore.userComment === ''"
            >
              Gửi yêu cầu
            </button>
            <button
              class="flex-auto p-2 border-2 border-orange-500 text-white bg-orange-500 w-[120px] rounded-md hover:text-orange-500 hover:bg-white"
              v-if="messageStore.userComment !== ''"
              @click="
                () => {
                  modalStore.toggleModal();
                  messageStore.messageEvaluate(
                    false,

                    reviewStore.chatID,
                    reviewStore.userID
                  );
                  snackBarStore.showSnackbar();
                }
              "
            >
              Gửi yêu cầu
            </button>
          </div>
        </div>
      </div>
      <div
        class="flex flex-row gap-2 absolute bottom-[120px] left-[20%] right-[20%] bg-[#4caf50] p-4 rounded-lg text-white zIndex"
        v-if="snackBarStore.snackBarVisible"
        id="snackbar"
        :class="snackBarStore.snackBarClass"
      >
        <img
          class="flex-shrink-0 flex-grow-0"
          src="/assets/images/review_snackbar_icon.png"
        />
        <p class="flex-shrink-0 flex-grow-0">{{ snackBarStore.message }}</p>
      </div>
    </div>
  </div>
  <div
    v-show="!modalStore.showWidget"
    class="z-40 fixed bottom-[40px] right-[40px] flex flex-col items-end w-[280px] h-fit gap-4"
  >
    <div
      id="box"
      class="hidden break-words bg-white leading-5 rounded-t-lg p-4 z-50 shadow-lg animate__animated w-[100%] rounded-tr-sm rounded-l-lg rounded-b-lg"
    >
      <p id="typing-text" class="text-[16px]"></p>
    </div>
    <button @click="modalStore.toggleWidget" class="z-40">
      <img src="/assets/images/avatar.png" class="w-20 h-20" />
    </button>
  </div>
  <div
    class="widget-container bg-white rounded-lg shadow-lg w-[400px] h-[354x] z-40 fixed bottom-[40px] right-[40px] flex flex-col justify-between items-center p-6 gap-11"
    v-if="userIDStore.userID === null && modalStore.showWidget"
  >
    <button
      class="relative self-end flex-none"
      @click="modalStore.toggleWidget"
    >
      <i class="fa-solid fa-x right-3 w-6 h-6 absolute"></i>
    </button>
    <div class="flex-none gap-6 flex flex-col items-center">
      <img
        src="/assets/images/avatar.png"
        class="w-[104px] h-[104px] text-center flex-none"
      />
      <p class="text-[16px] text-center flex-auto">
        Xin chào! chúng tôi sẵn sàng hỗ trợ bạn
      </p>
    </div>
    <button
      class="rounded-lg border-2 border-l-[#FE592A] border-b-[#FE592A] border-r-[#E93013] border-t-[#E93013] shadow-md bg-gradient-to-r from-[#FE592A] to-[#E93013] text-white hover:bg-gradient-to-r hover:from-white hover:border-2 hover:border-orange-500 hover:text-orange-500 h-fit w-[352px] px-6 py-3 flex-auto"
      @click="userIDStore.createNewID()"
    >
      <p class="text-[16px]">Bắt đầu Chat</p>
    </button>
  </div>
</template>

<script lang="js" setup>

import ChatInput from "./widget-components/chat-input.vue";
import ChatScreen from "./widget-components/chat-screen.vue";
import chatSuggestion from "./widget-components/chat-suggestion.vue";
import Header from "./widget-components/header.vue";

import { useModalStore } from '~/stores/modal';
import {useUserIDStore} from '~/stores/userID';
import { ref, onMounted, onUnmounted, nextTick } from 'vue';
import { useMessage } from "~/stores/messages";
import { useSnackBarStore } from "~/stores/snackbar";
import {useReview} from '~/stores/review';

const modalStore = useModalStore();
const userIDStore = useUserIDStore()
const messageStore = useMessage();
const snackBarStore = useSnackBarStore()
const reviewStore = useReview()

import useInactivity from '~/composables/useInactiveTimeOut';
const arrayLength = computed(() => messageStore.newMessageArray.length);

watch(arrayLength, (newLength, oldLength) => {
  if (newLength !== oldLength && newLength >1) {
    console.log("NEW size:",newLength )
    modalStore.isSuggestion = false;

  }else{
    modalStore.isSuggestion = true;
  }

});
const { isInactive } = useInactivity(50000);

defineOptions({
  inheritAttrs: false
})

onMounted(()=>{
  userIDStore.getExistedID()
})

onMounted(()=>{
  const text = `Xin chào! Tôi có thể giúp gì cho bạn không?`;
const typingElement = document.getElementById('typing-text');
const boxElement = document.getElementById('box');
let index = 0;
let isTyping = true;
let typingSpeed = 100;
let pauseTime = 1000;
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
    }, 1000);
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
</style>
