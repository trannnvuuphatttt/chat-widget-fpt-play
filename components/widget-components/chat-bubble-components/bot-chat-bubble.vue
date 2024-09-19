<template>
  <span>
    <img
      src="assets/images/avatar.png"
      class="h-6 w-6 inline-block mb-2 mr-1"
    />
    <p class="text-sm inline-block mb-2 ml-1">Chatbot</p>
  </span>
  <div
    class="bg-white p-2 rounded-tl-sm rounded-r-lg rounded-b-lg text-md mb-2"
  >
    <p>Xin chào 👋 ! Tôi là trợ lý thông minh của bạn.</p>
  </div>
  <RecommendList />
  <span class="flex flex-row justify-between flex-wrap">
    <p class="text-[12px] mt-1 mb-2 text-gray-400">Timestamp</p>
    <div>
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

<script lang="ts" setup>
import { ref } from "vue";

import MovieList from "./movie-list.vue";

let reviewStateLike = ref(false);
let reviewStateDislike = ref(false);

function Like() {
  reviewStateLike.value = true;
  reviewStateDislike.value = false;
  showSnackbar();
}
function Dislike() {
  reviewStateLike.value = false;
  reviewStateDislike.value = true;
  modalStore.toggleModal();
  showSnackbar();
}

import { useToast } from "vue-toastification";
import RecommendList from "./recommend-list.vue";

const toast = useToast();

const showSnackbar = () => {
  toast.success("Cám ơn đánh giá của bạn");
};

import { useModalStore } from "~/stores/modal";

const modalStore = useModalStore();
</script>

<style></style>
