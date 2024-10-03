<script lang="js" setup>
import ChatInput from "./widget-components/chat-input.vue";
import ChatScreen from "./widget-components/chat-screen.vue";
import ChatSuggestion from "./widget-components/chat-suggestion.vue";
import Header from "./widget-components/header.vue";

import { useModalStore } from '~/stores/modal';
import {useUserIDStore} from '~/stores/userID';
import { ref, onMounted, onUnmounted, nextTick } from 'vue';

const modalStore = useModalStore();
const userIDStore = useUserIDStore()

const container = ref(null);
const textElement = ref(null);
const textContent = "Xin chào! Tôi có thể giúp gì cho bạn không?";
const typingSpeed = 50;

onMounted(()=>{
  userIDStore.getExistedID()
})

const typeText = () => {

  if (textElement.value) {
    textElement.value.innerHTML = "";
    textElement.value.style.visibility = 'visible';

    let index = 0;
    let typingInterval = setInterval(() => {
      textElement.value.innerHTML += textContent.charAt(index);
      index++;

      if (index === textContent.length) {
        clearInterval(typingInterval);
        setTimeout(() => {
          deleteText();
        }, 2000);
      }
    }, typingSpeed);
  }
};

const deleteText = () => {
  if (textElement.value) {
    let index = textContent.length;

    let deletingInterval = setInterval(() => {
      textElement.value.innerHTML = textContent.substring(0, index);
      index--;

      if (index < 0) {
        clearInterval(deletingInterval);
        textElement.value.style.visibility = 'hidden';

        container.value.classList.add('animate__zoomOut');
        setTimeout(startAnimation, 1000);
        //container.value.addEventListener('animationend', zoomOutDone, { once: true });
      }
    }, typingSpeed / 2);
  }
};

// const zoomOutDone = () => {
//   console.log("zoomOutDone")
//   //container.value.classList.remove('animate__zoomOut');

// };

const startAnimation = () => {
  container.value.style.visibility = 'visible';

  if (container.value) {
    container.value.classList.remove('animate__zoomIn', 'animate__zoomOut');
    textElement.value.classList.remove('animate__fadeOut');

    container.value.classList.add('animate__animated', 'animate__zoomIn');
    typeText();
    //container.value.addEventListener('animationend', zoomInDone, { once: true });

  }
};

// const zoomInDone = () => {
//    console.log("zoomInDone")
//   container.value.classList.remove('animate__zoomIn');

// };

onMounted(async () => {
  // Đảm bảo DOM đã sẵn sàng
  await nextTick();

  // Gán các giá trị cho ref
  container.value = document.getElementById('zoom-container');
  textElement.value = document.getElementById('text');

  startAnimation();
})

onUnmounted(() => {
  if (container.value) {
    container.value.removeEventListener('animationend', startAnimation);
  }
});
</script>

<template>
  <div>
    <div
      class="bg-white z-40 fixed bottom-0 right-0 m-[15px] h-[90vh] sm:w-[50vw] lg:w-[30vw] md:w-[50vw] widget-container rounded-lg grid grid-rows-12 overflow-hidden shadow-lg"
      v-show="modalStore.showWidget && userIDStore.userID !== null"
    >
      <Header class="row-span-2" />
      <ChatScreen class="row-span-8 p-4" />
      <ChatSuggestion class="row-span-1 pl-4" />
      <ChatInput class="row-span-1" />
    </div>
    <div
      v-show="!modalStore.showWidget"
      class="z-40 fixed bottom-[25px] right-[25px] flex flex-col items-end gap-2 w-full"
    >
      <div
        class="h-fit bg-white rounded-t-lg rounded-l-lg p-4 z-50 shadow-lg animate__animated"
        id="zoom-container"
      >
        <p id="text" class="text-sm sm:text-md md:text-lg lg:text-1xl">
          Xin chào! Tôi có thể giúp gì cho bạn không?
        </p>
      </div>
      <button @click="modalStore.toggleWidget" class="z-40">
        <img src="/assets/images/avatar.png" class="w-16 h-16" />
      </button>
    </div>
    <div
      class="widget-container bg-white rounded-lg shadow-lg w-[90vw] sm:w-[50vw] md:w-[50vw] lg:w-[400px] h-[400px] z-40 fixed bottom-[25px] right-[25px] flex flex-col justify-between items-center p-4"
      v-if="userIDStore.userID === null && modalStore.showWidget"
    >
      {{ console.log("user ID:", userIDStore.userID) }}
      <button class="relative self-end" @click="modalStore.toggleWidget">
        <i class="fa-solid fa-x right-3 absolute"></i>
      </button>
      <img src="/assets/images/avatar.png" class="w-24 h-24 text-center" />
      <p>Xin chào! chúng tôi sẵn sàng hỗ trợ bạn</p>
      <button
        class="mb-4 rounded-lg shadow-md bg-orange-500 border-orange-500 border-2 text-white hover:bg-white hover:text-orange-500 h-fit w-[80%]"
        @click="userIDStore.createNewID()"
      >
        <p class="my-4 mx-2">Bắt đầu Chat</p>
      </button>
    </div>
  </div>
</template>

<style>
#zoom-container {
  display: inline-block;
  text-align: center;
  visibility: hidden;
}

#text {
  visibility: hidden;

  white-space: nowrap;
  overflow: hidden;
}
</style>
