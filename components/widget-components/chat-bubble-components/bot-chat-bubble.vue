<template class="relative">
  <span class="w-fit h-fit">
    <img
      src="assets/images/avatar.png"
      class="h-6 w-6 inline-block mb-2 mr-1"
    />
    <p class="text-sm inline-block mb-2 ml-1">Chatbot</p>
  </span>

  <div
    class="bg-white rounded-tl-sm rounded-r-lg rounded-b-lg text-md mb-2 h-fit p-4 text-[16px]"
    v-if="messageStore.isLoading"
  >
    <div class="loader"></div>
  </div>
  <div
    class="bg-white rounded-tl-sm rounded-r-lg rounded-b-lg text-md mb-2 h-fit p-4 text-[16px]"
    v-for="(item, index) in props.message"
    v-if="Array.isArray(props.message)"
  >
    <p>{{ item }}</p>
  </div>
  <div
    class="bg-white rounded-tl-sm rounded-r-lg rounded-b-lg text-md mb-2 h-fit p-4 text-[16px]"
    v-if="Array.isArray(props.message)"
    v-for="(item, index) in props.urls"
  >
    <a :href="item" target="_blank" class="underline">{{ item }}</a>
  </div>
  <div
    class="bg-white rounded-tl-sm rounded-r-lg rounded-b-lg text-md mb-2 h-fit p-4 text-[16px]"
    v-for="(item, index) in props.images"
    v-if="Array.isArray(props.images)"
  >
    <p>{{ item }}</p>
  </div>
  <div
    class="bg-white rounded-tl-sm rounded-r-lg rounded-b-lg text-md mb-2 h-fit p-4 text-[16px]"
    v-for="(item, index) in props.videos"
    v-if="Array.isArray(props.videos)"
  >
    <p>{{ item }}</p>
  </div>

  <span class="flex flex-row justify-between flex-wrap h-fit">
    <p
      class="text-[12px] text-gray-400"
      v-if="props.timeStamp !== 'NaN ngày trước'"
    >
      {{ props.timeStamp }}
    </p>
    <div
      v-if="
        props.flag &&
        modalStore.isChatting &&
        props.timeStamp !== 'NaN ngày trước'
      "
    >
      <!-- <div v-if="props.flag && modalStore.isChatting"> -->
      <button class="mr-1 cursor-pointer" @click="Like()">
        <i v-if="!reviewStateLike" class="fa-regular fa-thumbs-up text-md"></i>
        <i
          v-if="reviewStateLike"
          class="fa-solid fa-thumbs-up text-md text-orange-500"
        ></i>
      </button>
      <button class="ml-1 cursor-pointer" @click="Dislike()">
        <i
          v-if="!reviewStateDislike"
          class="fa-regular fa-thumbs-down text-md fa-flip-horizontal"
        ></i>
        <i
          v-if="reviewStateDislike"
          class="fa-solid fa-thumbs-down text-md fa-flip-horizontal text-orange-500"
        ></i>
      </button>
      <div
        class="absolute bottom-[40px] left-[25%] right-[25%] bg-[#4caf50] p-4 rounded-lg text-white zIndex"
        v-if="snackBarStore.snackBarVisible"
        id="snackbar"
        :class="snackBarStore.snackBarClass"
      >
        <p>{{ snackBarStore.message }}</p>
      </div>
    </div>
  </span>
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
          v-model="inputValue"
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
          v-if="inputValue === ''"
        >
          Gửi yêu cầu
        </button>
        <button
          class="flex-auto p-2 border-2 border-orange-500 text-white bg-orange-500 w-[120px] rounded-md hover:text-orange-500 hover:bg-white"
          v-if="inputValue !== ''"
          @click="
            () => {
              modalStore.toggleModal();
              messageStore.messageEvaluate(
                false,
                inputValue,
                props.chatID,
                props.userID
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
</template>

<script lang="js" setup>
import { ref } from "vue";

import MovieList from "./movie-list.vue";
import RecommendList from "./recommend-list.vue";
import { useModalStore } from "~/stores/modal";
import {useSnackBarStore} from "~/stores/snackbar"
import { useMessage } from "~/stores/messages";
import { useFormatDateTime } from "../../../composables/useFormatDateTime";
import ChatSuggestion from "../chat-suggestion.vue";

defineOptions({
  inheritAttrs: false
});

const props = defineProps({
  message: Array,
  timeStamp:String,
  chatID:String,
  userID:String,
  flag: Boolean,
  videos:Array,
  images:Array,
  contents:Array,  urls:Array
});


const {timeAgo} = useFormatDateTime()
const modalStore = useModalStore();
const snackBarStore = useSnackBarStore();
const messageStore = useMessage();
const inputValue = ref("")


let reviewStateLike = ref(false);
let reviewStateDislike = ref(false);


function Like() {
  reviewStateLike.value = !reviewStateLike.value;
  reviewStateDislike.value = false;
  if(reviewStateLike.value){
    snackBarStore.showSnackbar()
    messageStore.messageEvaluate(true, "", props.chatID,props.userID )
  }

}
function Dislike() {
  reviewStateDislike.value = !reviewStateDislike.value;
  reviewStateLike.value = false;
  if(reviewStateDislike.value){
    modalStore.toggleModal();
  }

}
</script>

<style>
.zIndex {
  z-index: 1000;
}

.loader {
  width: 60px;
  aspect-ratio: 2;
  --_g: no-repeat radial-gradient(circle closest-side, #000 90%, #0000);
  background: var(--_g) 0% 50%, var(--_g) 50% 50%, var(--_g) 100% 50%;
  background-size: calc(100% / 3) 50%;
  animation: l3 1s infinite linear;
}
@keyframes l3 {
  20% {
    background-position: 0% 0%, 50% 50%, 100% 50%;
  }
  40% {
    background-position: 0% 100%, 50% 0%, 100% 50%;
  }
  60% {
    background-position: 0% 50%, 50% 100%, 100% 0%;
  }
  80% {
    background-position: 0% 50%, 50% 50%, 100% 100%;
  }
}
</style>
