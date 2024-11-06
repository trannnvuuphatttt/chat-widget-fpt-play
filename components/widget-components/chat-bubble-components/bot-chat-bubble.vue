<template class="relative">
  <div>
    <div class="flex items-center">
      <img
        src="assets/images/avatar.png"
        class="h-6 w-6 inline-block mb-2 mr-1"
      />
      <div class="text-sm inline-block mb-2 ml-1">FPT Play AI Support</div>
    </div>
    <div
      class="bg-white text-md mb-2 h-14 p-4 text-base w-full sm:w-84 rounded-tl rounded-r-2xl rounded-b-2xl"
      v-if="
        messageStore.isLoading &&
        flag &&
        Array.isArray(displayMessage) &&
        props.message.length <= 1
      "
    >
      <div class="ml-1 mt-1.5 flex flex-row gap-3">
        <div class="w-2 h-2 rounded-full bg-gray-600 animate-pulse"></div>
        <div class="w-2 h-2 rounded-full bg-gray-600 animate-pulse"></div>
        <div class="w-2 h-2 rounded-full bg-gray-600 animate-pulse"></div>
      </div>
    </div>
    <div v-else>
      <div
        v-if="
          (displayMessage && receiveMessage.length >= 1) ||
          displayMessage?.length > 1
        "
      >
        <div
          class="bg-white rounded-tl rounded-r-2xl rounded-b-2xl text-md mb-2 h-fit p-4 text-base font-sf-pro-display"
          v-for="(item, index) in displayMessage"
          :key="index"
        >
          <BubbleMessage :message="item"></BubbleMessage>
        </div>
      </div>
      <div
        v-else
        class="bg-white rounded-tl rounded-r-2xl rounded-b-2xl text-md mb-2 h-fit p-4 text-base font-sf-pro-display"
      >
        <div v-html="displayMessage[0]"></div>
      </div>

      <div
        class="bg-white rounded-tl-sm rounded-r-lg rounded-b-lg text-md mb-2 h-fit p-4 text-base"
        v-if="Array.isArray(props.urls)"
        v-for="(item, index) in props.urls"
        :key="index"
      >
        <a :href="item" target="_blank" class="underline">{{ item }}</a>
      </div>
    </div>
    <span class="flex flex-row justify-between flex-wrap h-fit">
      <p
        class="text-xs text-gray-400"
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
        class="flex w-[48px] space-x-2"
      >
        <button class="cursor-pointer" @click="Like()">
          <img
            v-if="!reviewStateLike"
            class="w-4 h-4"
            src="/assets/images/like.png"
            alt="Like"
          />
          <img
            v-else
            class="w-4 h-4"
            src="/assets/images/like_orange.png"
            alt="Liked"
          />
        </button>
        <button class="cursor-pointer right-0" @click="Dislike()">
          <img
            v-if="!reviewStateDislike"
            class="w-4 h-4"
            src="/assets/images/dislike.png"
            alt="Dislike"
          />
          <img
            v-else
            class="w-4 h-4"
            src="/assets/images/dislike_orange.png"
            alt="Disliked"
          />
        </button>
      </div>
    </span>
  </div>
</template>

<script lang="js" setup>
import { onMounted, ref, resolveComponent, watch } from "vue";
import BubbleMessage from "./bubble-message.vue";
import { useModalStore } from "~/stores/modal";
import { useSnackBarStore } from "~/stores/snackbar";
import { useMessage } from "~/stores/messages";
import { useReview } from "~/stores/review";
import { marked } from "marked";

defineOptions({
  inheritAttrs: false,
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
  isError: Boolean,
});

const modalStore = useModalStore();
const snackBarStore = useSnackBarStore();
const messageStore = useMessage();
const reviewStore = useReview();

const reviewStateLike = ref(false);
const reviewStateDislike = ref(false);
const receiveMessage = ref([]);
const displayMessage = ref([]);
let isTriggerInterval = false;

function Like() {
  reviewStateLike.value = !reviewStateLike.value;
  reviewStateDislike.value = false;
  if (reviewStateLike.value) {
    snackBarStore.showSnackbar();
    messageStore.messageEvaluate(true, props.chatID, props.userID);
  }
}

function Dislike() {
  reviewStateDislike.value = !reviewStateDislike.value;
  reviewStateLike.value = false;
  if (reviewStateDislike.value) {
    modalStore.toggleModal();
  }
  reviewStore.saveID(props.chatID, props.userID);
}

watch(
  () => props.message,
  (newMessage) => {
    if (newMessage && newMessage.length) {
      receiveMessage.value = newMessage;
      if (process.client) {
        setTimeout(() => {
          if (Array.isArray(receiveMessage.value) && receiveMessage.value.length) {
            isTriggerInterval = true;
            const firstMsg = receiveMessage.value.shift();
            displayMessage.value.push(firstMsg);

            if (receiveMessage.value.length) {
              const delayMessageInterval = setInterval(() => {
                const newMessage = receiveMessage.value.shift();
                displayMessage.value.push(newMessage);
                if (!receiveMessage.value.length) {
                  clearInterval(delayMessageInterval);
                }
              }, 2000);
            }
          }
        }, 3000);
      }
    }
  },
  { immediate: true }
);

onMounted(() => {
  messageStore.loaderController();
});
</script>

<style scoped>
/* Giảm kích thước font chữ cho màn hình dưới 400px */
@media (max-width: 400px) {
  .text-base {
    font-size: 14px;
    /* Điều chỉnh theo nhu cầu */
  }

  .text-sm {
    font-size: 12px;
  }

  .text-md {
    font-size: 13px;
  }

  .text-xs {
    font-size: 10px;
  }

  .h-6 {
    height: 20px;
  }

  .w-6 {
    width: 20px;
  }

  .h-14 {
    height: auto;
    /* Điều chỉnh nếu cần */
  }

  .p-4 {
    padding: 12px;
  }

  .w-4 {
    width: 16px;
  }

  .h-4 {
    height: 16px;
  }

  .mb-2 {
    margin-bottom: 8px;
  }
}
</style>
