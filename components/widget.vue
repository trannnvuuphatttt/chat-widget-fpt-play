<template>
  <div class="">
    <div
      class="widget-container max-h-[100vh] max-w-[100vw] bg-white z-40 fixed rounded-lg flex flex-col shadow-lg w-full xl:w-[400px] h-full xl:h-[668px] right-0 xl:right-[60px] bottom-0 xl:bottom-[60px]"
      v-show="modalStore.showWidget && userIDStore.userID !== null"
      v-if="!isInactive"
    >
      <Header v-if="!isMobileQueryParams" class="flex-shrink-0 flex-grow-0" />
      <ChatScreen class="flex-auto bg-customBackground" />
      <!-- <chatSuggestion class="pt-[24px] pb-[24px]" v-show="modalStore.isSuggestion" /> -->
      <chatSuggestion
        v-if="showSuggestions"
        :class="{
          'pt-[24px] pb-[24px]': true,
          'pointer-events-none': isWaitingSocket,
          isLoading,
        }"
      />
      <ChatInput
        class="flex-shrink-0 flex-grow-0"
        :isMobileOrTablet="isMobileOrTablet"
      />

      <div
        v-show="modalStore.showModal"
        class="z-50 bg-black rounded-lg w-full h-full p-2 bg-opacity-60 flex absolute items-center justify-center top-0 left-0"
      >
        <div
          class="bg-white rounded-lg p-4 w-[334px] sm:w-[420px] lg:w-[336px] xl:w[336px] h-[231px] sm:h-[228px] m-4 flex flex-col gap-2"
        >
          <div class="flex-initial flex flex-col gap-2">
            <h1
              class="font-sf-pro-display text-lg text-center font-semibold tracking-wider leading-[23.4px]"
            >
              Câu trả lời chưa tốt với bạn?
            </h1>

            <textarea
              name="message"
              rows="10"
              cols="30"
              class="rounded-lg shadow-dm w-[302px] sm:w-[388px] lg:w-[304px] xl:w[304px] h-[104px] p-2 border-2 border-gray-200 my-2 focus:outline-none text-[16px]"
              placeholder="Bạn hãy cho biết lý do câu trả lời chưa tốt và nên được cải thiện như thế nào?"
              v-model="messageStore.userComment"
            ></textarea>
          </div>
          <div class="flex flex-auto justify-between gap-2">
            <button
              class="flex-auto p-2 border-orange-500 border-2 text-orange-500 w-[163px] h-[40px] rounded-md hover:text-white hover:bg-orange-500"
              @click="modalStore.toggleModal"
            >
              Đóng
            </button>

            <button
              class="flex-auto p-2 border-2 border-[#EFEFEF] text-gray-400 bg-[#EFEFEF] w-[163px] h-[40px] rounded-md"
              v-if="messageStore.userComment === ''"
            >
              Gửi yêu cầu
            </button>
            <button
              class="flex-auto p-2 border-2 border-orange-500 text-white bg-orange-500 w-[163px] h-[40px] rounded-md hover:text-orange-500 hover:bg-white"
              v-if="messageStore.userComment !== ''"
              @click="
                () => {
                  modalStore.toggleModal();
                  messageStore.messageEvaluate(
                    false,

                    reviewStore.chatID,
                    reviewStore.userID,
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
        class="flex flex-row gap-2 absolute bottom-[120px] left-[20%] sm:left-[40%] lg:left-[40%] xl:left-[20%] right-[20%] sm:right-[40%] lg:right-[40%] xl:right-[20%] bg-[#48DF60] p-4 rounded-[12px] text-white zIndex w-[245px] items-center justify-center"
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
    class="z-40 fixed bottom-[90px] sm:bottom-[40px] right-[10px] sm:right-[40px] flex flex-col items-end w-[90%] sm:w-[280px] gap-[16px]"
  >
    <div
      id="box"
      class="hidden break-words bg-white leading-5 rounded-t-2xl rounded-br-[4px] rounded-tr-2xl rounded-bl-2xl p-4 z-50 shadow-lg animate__animated w-[280px] h-[90%] sm:h-[74px]"
    >
      <p id="typing-text" class="text-[90%] sm:text-[16px]"></p>
    </div>
    <button @click="handleClick" class="z-40">
      <img src="/assets/images/avatar.png" class="w-[80px] h-[80px]" />
    </button>
  </div>
  <div
    class="widget-container bg-white rounded-[16px] shadow-lg max-w-[400px] h-[354px] z-40 fixed bottom-[40px] right-[40px] flex flex-col justify-between items-center p-6 gap-[24px]"
    v-if="userIDStore.userID === null && modalStore.showWidget"
  >
    <!-- Close button aligned to the top right -->
    <button
      class="relative self-end -mt-2 -mr-2 flex-none"
      @click="modalStore.toggleWidget"
    >
      <img src="/assets/images/Icon.png" class="w-[12px] h-[12px]" />
    </button>

    <!-- Avatar and greeting text centered -->
    <div class="flex flex-col items-center gap-[16px]">
      <img
        src="/assets/images/avatar.png"
        class="w-[84px] h-[84px] sm:w-[104px] sm:h-[104px] text-center"
      />
      <p
        class="font-sf-pro-display text-[16px] text-center leading-[20.8px] tracking-custom font-normal"
      >
        Xin chào! chúng tôi sẵn sàng hỗ trợ bạn
      </p>
    </div>

    <!-- Start Chat button aligned to the bottom -->
    <button
      @click="() => userIDStore.createNewID()"
      class="w-[352px] h-[45px] px-6 py-0 rounded-lg border-2 opacity-100 bg-gradient-to-r from-[#FE592A] bg-[#E93013] text-white shadow-md flex items-center justify-center"
    >
      <p
        class="font-sf-pro-display text-[90%] sm:text-[16px] text-center flex-auto leading-[20.8px] tracking-custom font-normal"
      >
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
import { useModalStore } from '~/stores/modal';
import { useUserIDStore } from '~/stores/userID';
import { useMessage } from "~/stores/messages";
import { useSnackBarStore } from "~/stores/snackbar";
import { useReview } from '~/stores/review';
import { useRoute } from 'vue-router';
import useInactivity from '~/composables/useInactiveTimeOut';
import { useDevice } from '~/composables/useDevice'
import { useChatStore } from "~/stores/chat";
const chatStore = useChatStore()
const modalStore = useModalStore();
const userIDStore = useUserIDStore()
const messageStore = useMessage();
const snackBarStore = useSnackBarStore()
const reviewStore = useReview()
const route = useRoute();
const arrayLength = computed(() => messageStore.newMessageArray.length);
const isMobileQueryParams = route.query.is_mobile === '1'; // Checks if `is_mobile` is set to "1"
// Define a global isMobileOrTablet state
const isMobileOrTablet = ref(false)
const { isInactive } = useInactivity(60000);
const { isMobile, isTablet } = useDevice()
const { isWaitingSocket, isLoading } = storeToRefs(messageStore)
const { showSuggestions } = storeToRefs(chatStore)

defineOptions({
  inheritAttrs: false
})

function handleClick() {
  if (isMobileOrTablet.value) {
    if (userIDStore.userID === null) {
      userIDStore.createNewID()
    }
    modalStore.clickToShowWidget()
  } else {
    modalStore.toggleWidget()
  }
}

watch(arrayLength, (newLength, oldLength) => {
  if (newLength !== oldLength && newLength > 1) {
    modalStore.isSuggestion = false;
  } else {
    modalStore.isSuggestion = true;
  }
});

onMounted(() => {
  const text = `Xin chào! Tôi có thể giúp gì cho bạn không?`
  const typingElement = document.getElementById('typing-text');
  const boxElement = document.getElementById('box');
  userIDStore.getExistedID()
  let index = 0;
  let isTyping = true;
  let typingSpeed = 100;
  let pauseTime = 2000;
  let deleteSpeed = 50;

  isMobileOrTablet.value = isMobile.value || isTablet.value

  // handle for Mobile&Tablet -> Auto Open Widget
  if (isMobileOrTablet.value === true && isMobileQueryParams) {
    if (userIDStore.userID === null) {
      userIDStore.createNewID()
    }
    setTimeout(() => {
      modalStore.toggleWidget()
    })
  }

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
    if (!isMobileOrTablet.value) {
      boxElement.style.display = 'block';
      boxElement.classList.add('fadeIn');
      index = 0;
      isTyping = true;
      setTimeout(typeText, 500);
    }
  }

  if (!isMobileOrTablet.value) {
    showBoxAndTypeAgain();
  }
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
