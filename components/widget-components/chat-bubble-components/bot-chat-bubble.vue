<template class="relative" >
  <div >
    <div class="flex items-center ">
    <img src="assets/images/avatar.png" class="h-[24px] w-[24px] inline-block mb-2 mr-1" />
    <div class="text-[14px] inline-block mb-2 ml-1">FPT Play AI Support</div>
  </div>
  <div class="bg-white rounded-tl-sm rounded-r-lg rounded-b-lg text-md mb-2 h-fit p-4 text-[16px] w-fit"
    v-if="messageStore.isLoading && flag">
    <div class="w-auto h-[56px] gap-0 rounded-tl-[16px] rounded-tr-[16px] rounded-br-[16px] rounded-bl-[16px]">
      <div class="loader3">
        <div class="circle1"></div>
        <div class="circle1"></div>
        <div class="circle1"></div>
      </div>
    </div>
  </div>
  <div v-else>
    <div class="bg-white rounded-tl-sm rounded-r-lg rounded-b-lg text-md mb-2 h-fit p-4 text-[16px]"
      v-for="(item, index) in props.message" v-if="Array.isArray(props.message)">
      <div v-html="marked(item)"></div>
    </div>
    <!-- <div
      class="bg-white rounded-tl-sm rounded-r-lg rounded-b-lg text-md mb-2 h-fit p-4 text-[16px]"
      v-if="Array.isArray(props.urls)"
      v-for="(item, index) in props.urls"
    >
      <a :href="item" target="_blank" class="underline">{{ item }}</a>
    </div> -->
    <div class="bg-white rounded-tl-sm rounded-r-lg rounded-b-lg text-md mb-2 h-fit text-[16px]"
      v-if="Array.isArray(props.urls)" v-for="(item, index) in props.urls">
      <a :href="item.link" target="_blank"
        class="block p-2 underline whitespace-nowrap text-ellipsis overflow-hidden">{{ item.link }}</a>
      <a :href="item.link" target="_blank" class="gap-2">
        <img :src="item.icon" class="rounded-lg mb-1" />
        <div class="p-4">
          <h1 class="font-bold mb-1">
            {{ item.title }}
          </h1>
          <p class="mb-1">
            {{ item.description }}
          </p>
        </div>
      </a>
    </div>
    <div class="bg-white rounded-tl-sm rounded-r-lg rounded-b-lg text-md mb-2 h-fit p-4 text-[16px]"
      v-for="(item, index) in props.images" v-if="Array.isArray(props.images)">
      <a target="_blank" :href="item"><img :src="item" /></a>
    </div>
    <div class="bg-white rounded-tl-sm rounded-r-lg rounded-b-lg text-md mb-2 h-fit p-4 text-[16px]"
      v-for="(item, index) in props.videos" v-if="Array.isArray(props.videos)">
      <p>{{ item }}</p>
    </div>
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
        <img v-if="!reviewStateLike" class=" w-[16px] h-[16px] mr-4" src="/assets/images/like.png"/>
        <img v-if="reviewStateLike" class=" w-[16px] h-[16px] mr-4" src="/assets/images/like_orange.png"/>
      </button>
      <button class="ml-1 cursor-pointer" @click="Dislike()">
        <img v-if="!reviewStateDislike" class="w-[16px] h-[16px] " src="/assets/images/dislike.png"/>
        <img v-if="reviewStateDislike" class="w-[16px] h-[16px] " src="/assets/images/dislike_orange.png"/>
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

onMounted(() => {
  messageStore.loaderController()
})
</script>

<style>
.loader3 {
  display: flex;
  justify-content: center;
  /* Căn giữa các chấm tròn theo chiều ngang */
  align-items: center;
  /* Căn giữa các chấm tròn theo chiều dọc */
  align-items: center;
  padding: 16px;
}

.circle1 {
  width: 4px;
  height: 4px;
  border-radius: 50%;
  margin: 0 4px;
  background-color: #949494;
  animation: circle1 1s ease-in-out infinite;
}

.circle1:nth-child(2) {
  animation-delay: 0.2s;
}

.circle1:nth-child(3) {
  animation-delay: 0.4s;
}


@keyframes circle1 {
  0% {
    transform: scale(1);
    opacity: 1;
  }

  50% {
    transform: scale(1.5);
    opacity: 0.5;
  }

  100% {
    transform: scale(1);
    opacity: 1;
  }
}
</style>
