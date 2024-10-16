<template class="relative">
  <span class="w-fit h-fit">
    <img
      src="assets/images/avatar.png"
      class="h-6 w-6 inline-block mb-2 mr-1"
    />
    <p class="text-sm inline-block mb-2 ml-1">Chatbot</p>
  </span>

  <div
    class="bg-white rounded-tl-sm rounded-r-lg rounded-b-lg text-md mb-2 h-fit p-4 text-[16px] w-fit"
    v-if="messageStore.isLoading && flag"
  >
    <div class="loader"></div>
  </div>
  <div v-else>
    <div
      class="bg-white rounded-tl-sm rounded-r-lg rounded-b-lg text-md mb-2 h-fit p-4 text-[16px]"
      v-for="(item, index) in props.message"
      v-if="Array.isArray(props.message)"
    >
      <div v-html="marked(item)"></div>
    </div>
    <div
      class="bg-white rounded-tl-sm rounded-r-lg rounded-b-lg text-md mb-2 h-fit p-4 text-[16px]"
      v-if="Array.isArray(props.urls)"
      v-for="(item, index) in props.urls"
    >
      <a :href="item" target="_blank" class="underline">{{ item }}</a>
    </div>
    <div
      class="bg-white rounded-tl-sm rounded-r-lg rounded-b-lg text-md mb-2 h-fit text-[16px]"
      v-if="Array.isArray(props.urls)"
      v-for="(item, index) in props.urls"
    >
      <a :href="item" target="_blank" class="gap-2">
        <img :src="metadataStore.metadataList.image" class="rounded-lg mb-1" />
        <div class="p-4">
          <h1 class="font-bold mb-1">
            {{ metadataStore.metadataList.title }}
          </h1>
          <p class="mb-1">
            {{ metadataStore.metadataList.description }}
          </p>
        </div>
      </a>
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
    </div>
  </span>
</template>

<script lang="js" setup>
import { onMounted, ref } from "vue";

import MovieList from "./movie-list.vue";
import RecommendList from "./recommend-list.vue";
import { useModalStore } from "~/stores/modal";
import {useSnackBarStore} from "~/stores/snackbar"
import { useMessage } from "~/stores/messages";
import { useFormatDateTime } from "../../../composables/useFormatDateTime";
import ChatSuggestion from "../chat-suggestion.vue";
import {useReview} from '~/stores/review';

import { marked } from 'marked'
const reviewStore = useReview()
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
const modalStore = useModalStore();
const snackBarStore = useSnackBarStore();
const messageStore = useMessage();

let reviewStateLike = ref(false);
let reviewStateDislike = ref(false);

function Like() {
  reviewStateLike.value = !reviewStateLike.value;
  reviewStateDislike.value = false;
  if(reviewStateLike.value){
    snackBarStore.showSnackbar()
    messageStore.messageEvaluate(true,  props.chatID,props.userID )
  }

}
function Dislike() {
  reviewStateDislike.value = !reviewStateDislike.value;
  reviewStateLike.value = false;
  if(reviewStateDislike.value){
    modalStore.toggleModal();
  }
  reviewStore.saveID(props.chatID,props.userID)

}


import {useMetadataStore} from '~/stores/metadata'

const metadataList = ref([]);
const metadataStore = useMetadataStore()
  const fetchMetadata = async () => {await metadataStore.fetchMetadata("https://fptplay.vn/xem-video/rezero-bat-dau-lai-o-the-gioi-khac-phan-3-66fcf00155ef684c970caf98");
  metadataList.value = metadataStore.metadataList
  console.log(metadataList)
};

onMounted(() => {
  fetchMetadata();
})
</script>

<style>
.loader {
  width: 20px;
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
