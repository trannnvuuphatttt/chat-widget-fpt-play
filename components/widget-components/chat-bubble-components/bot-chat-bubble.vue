<template class="relative">
  <div>
    <div class="flex items-center ">
      <img src="assets/images/avatar.png" class="h-[24px] w-[24px] inline-block mb-2 mr-1" />
      <div class="text-[14px] inline-block mb-2 ml-1">FPT Play AI Support</div>
    </div>
    <div class="bg-white rounded-tl-sm rounded-r-lg rounded-b-lg text-md mb-2 h-[56px] p-4 text-[16px] w-[84px]"
      v-if="messageStore.isLoading && flag && Array.isArray(displayMessage) && props.message.length <= 1">
      <div class="ml-[8px] mt-[-2px] flex flex-row gap-3">
        <div
          class="loader border-t-2 rounded-full border-yellow-500 bg-yellow-300 animate-spin aspect-square w-8 flex justify-center items-center text-yellow-700">
          $</div>
        <!-- <div class="w-2 h-2 rounded-full bg-[#949494] animate-pulse"></div>
        <div class="w-2 h-2 rounded-full  bg-[#949494] animate-pulse "></div>
        <div class="w-2 h-2 rounded-full  bg-[#949494] animate-pulse "></div> -->
      </div>
    </div>
    <div v-else>
      <div v-if="displayMessage && receiveMessage.length >= 1 || displayMessage?.length > 1">
        <div class="bg-white rounded-tl rounded-r-2xl rounded-b-2xl text-md mb-2 h-fit p-4 text-[16px]"
          v-for="(item, index) in displayMessage">
          <BubbleMessage :message="item"></BubbleMessage>
        </div>
      </div>
      <div v-else class="bg-white rounded-tl rounded-r-2xl rounded-b-2xl text-md mb-2 h-fit p-4 text-[16px]">
        <div v-html="marked(displayMessage[0])"></div>
      </div>

      <!-- <div
      class="bg-white rounded-tl-sm rounded-r-lg rounded-b-lg text-md mb-2 h-fit p-4 text-[16px]"
      v-if="Array.isArray(props.urls)"
      v-for="(item, index) in props.urls"
>
      <a :href="item" target="_blank" class="underline">{{ item }}</a>
    </div> -->
      <!-- <div v-if="Array.isArray(props.urls)" v-for="(item, index) in props.urls"
        class="flex movieList cursor-pointer overflow-x-scroll mb-2">
        <div class="inline-block bg-white rounded-lg m-1 flex-shrink-0 select-none h-[188px] w-[256px]">
          <div class="">
            <a :href="item.link">
              <img v-for="(item, index) in props.images" v-if="Array.isArray(props.images)" :src="item"
                class="object-cover h-[136px] w-[256px] rounded-t-lg" />
            </a>
          </div>
          <div class="w-[256px] h-[52px] pt-2 pr-4 pb-2 pl-4 gap-1" v-if="Array.isArray(props.urls)"
            v-for="(item, index) in props.urls">
            <h1
              class="text[#121212] truncate text-[14px] font-semibold leading-[18.2px] tracking-custom font-sf-pro-display">
              {{ item.title }}</h1>
            <div
              class="ml-0 font-normal leading-[14.32px] w-[224px] h-[14px] text-[#949494] text-[12px] truncate flex items-center gap-1 gap-y-[6px]">
              <span>{{ item.year }}</span>
              <img src="/assets/images/Ellipse_228.png" />
              <span>{{ item.age }}</span>
              <img src="/assets/images/Ellipse_228.png" />
              <span>{{ item.practice }}</span>
              <img src="/assets/images/Ellipse_228.png" />
              <span>{{ item.country }}</span>
            </div>
          </div>
        </div>
      </div> -->

    </div>
    <span class="flex flex-row justify-between flex-wrap h-fit">
      <p class="text-[12px] text-gray-400" v-if="props.timeStamp !== 'NaN ngày trước'">

        {{ props.timeStamp }}
      </p>
      <div v-if="
        props.flag &&
        modalStore.isChatting &&
        props.timeStamp !== 'NaN ngày trước'
      ">
        <!-- <div v-if="props.flag && modalStore.isChatting"> -->
        <button class="mr-1 cursor-pointer gap-[8px]" @click="Like()">
          <img v-if="!reviewStateLike" class=" w-[16px] h-[16px] mr-4" src="/assets/images/like.png" />
          <img v-if="reviewStateLike" class=" w-[16px] h-[16px] mr-4" src="/assets/images/like_orange.png" />
        </button>
        <button class="ml-1 cursor-pointer" @click="Dislike()">
          <img v-if="!reviewStateDislike" class="w-[16px] h-[16px] " src="/assets/images/dislike.png" />
          <img v-if="reviewStateDislike" class="w-[16px] h-[16px] " src="/assets/images/dislike_orange.png" />
        </button>
      </div>
    </span>
  </div>
</template>

<script lang="js" setup>
import { onMounted, ref } from "vue";

import MovieList from "./movie-list.vue";
import RecommendList from "./recommend-list.vue";
import { useModalStore } from "~/stores/modal";
import { useSnackBarStore } from "~/stores/snackbar"
import { useMessage } from "~/stores/messages";
import { useFormatDateTime } from "../../../composables/useFormatDateTime";
import ChatSuggestion from "../chat-suggestion.vue";
import { useReview } from '~/stores/review';

import { marked } from 'marked'
import BubbleMessage from './bubble-message'
const reviewStore = useReview()
defineOptions({
  inheritAttrs: false
});
const props = defineProps({
  message: Array,
  timeStamp: String,
  chatID: String,
  userID: String,
  flag: Boolean,
  videos: Array,
  images: Array,
  contents: Array,
  urls: Array,
  isError: Boolean
});
const modalStore = useModalStore();
const snackBarStore = useSnackBarStore();
const messageStore = useMessage();

let reviewStateLike = ref(false);
let reviewStateDislike = ref(false);
const receiveMessage = ref([]);
const displayMessage = ref([]);
let delayMessageInterval = null;
let isTriggerInterval = false;
// const addItemToDisplayMessage = (item) => {
//   displayMessage.value.push(item)
// };
function Like() {
  reviewStateLike.value = !reviewStateLike.value;
  reviewStateDislike.value = false;
  if (reviewStateLike.value) {
    snackBarStore.showSnackbar()
    messageStore.messageEvaluate(true, props.chatID, props.userID)
  }

}
function Dislike() {
  reviewStateDislike.value = !reviewStateDislike.value;
  reviewStateLike.value = false;
  if (reviewStateDislike.value) {
    modalStore.toggleModal();
  }
  reviewStore.saveID(props.chatID, props.userID)

}
watch(
  () => props.message,
  (newMessage, oldMessage) => {
    console.log('wwatch times triggered: ');

    if (newMessage && newMessage.length) {
      receiveMessage.value = newMessage
      console.log('Received message', newMessage, process.client);

      if (process.client) {
        console.log('process client');

        setTimeout(() => {
          if (Array.isArray(receiveMessage.value) && receiveMessage.value.length) {
            isTriggerInterval = true
            displayMessage.value = []
            const firstMsg = receiveMessage.value.shift()
            displayMessage.value.push(firstMsg)
            console.log('process.client before', receiveMessage.value);

            if (receiveMessage.value.length) {
              const delayMessageInterval = setInterval(() => {
                const newMessage = receiveMessage.value.shift()
                displayMessage.value.push(newMessage)
                console.log('displayMessage interval', displayMessage.value);
                console.log('prop message after', receiveMessage.value)
                if (!receiveMessage.value.length) {
                  clearInterval(delayMessageInterval)
                }
              }, 1000);
            }
          }
        }, 3000);
      }

    }
  },
  { immediate: true } // Optional: triggers the watcher immediately on mount
);
onMounted(() => {
  messageStore.loaderController()
  // console.log('mounted', receiveMessage.value);

  // if (!isTriggerInterval) {
  //   isTriggerInterval = true
  //   if (Array.isArray(receiveMessage.value) && receiveMessage.value.length) {
  //     const firstMsg = receiveMessage.value.shift()
  //     displayMessage.value.push(firstMsg)
  //     console.log('receiveMessage.value before', receiveMessage.value);

  //     if (receiveMessage.value.length) {
  //       delayMessageInterval = setInterval(() => {
  //         const newMessage = receiveMessage.value.shift()
  //         displayMessage.value.push(newMessage)
  //         console.log('displayMessage interval', displayMessage.value);
  //         console.log('prop message after', receiveMessage.value)
  //         if (!receiveMessage.value.length) {
  //           clearInterval(delayMessageInterval)
  //         }
  //       }, 1000);
  //     }
  //   }
  // }
})
</script>

<style></style>
