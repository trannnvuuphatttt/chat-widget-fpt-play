<template class="relative">
  <div>
    <div class="flex items-center ml-4">
      <img
        src="assets/images/avatar.png"
        class="h-6 w-6 inline-block mb-2 mr-1"
      />
      <div class="text-sm inline-block mb-2 ml-1">FPT Play AI Support</div>
    </div>
    <div
      class="bg-white w-[56px] h-[56px] rounded-tl rounded-r-2xl rounded-b-2xl items-center justify-center ml-4"
      v-if="
        messageStore.isLoading &&
        flag &&
        Array.isArray(displayMessage) &&
        props.message.length <= 1
      "
    >
      <div class="flex flex-row ml-[6px] w-[56px] h-[56px]">
        <div
          class="w-1 h-1 ml-[12px] mt-[26px] rounded-full bg-gray-600 animate-pulse"
        ></div>
        <div
          class="w-1 h-1 ml-[4px] mt-[26px] rounded-full bg-gray-600 animate-pulse"
        ></div>
        <div
          class="w-1 h-1 ml-[4px] mt-[26px] rounded-full bg-gray-600 animate-pulse"
        ></div>
      </div>
    </div>
    -->
    <div>
      <!-- <div
        v-if="
          (displayMessage && receiveMessage.length >= 1) ||
          displayMessage?.length > 1
        "
      >
        <div v-for="(item, index) in displayMessage" :key="index">
          <BubbleMessage :message="item"></BubbleMessage>
        </div>
      </div> -->
      <div v-if="props?.message?.length">
        <div v-for="(message, index) in props?.message">
          <!-- {{ message }} -->
          <BubbleMessage :message="message" :key="index"></BubbleMessage>
        </div>
      </div>
      <div
        v-else
        class="bg-white rounded-tl rounded-r-2xl rounded-b-2xl text-md mb-2 h-fit p-4 text-base font-sf-pro-display w-[338px] sm:w-[420px] lg:w-[338px] xl:w[338px] ml-4"
      >
        <div v-html="displayMessage[0]"></div>
      </div>
      <!-- <div class="bg-white rounded-tl-sm rounded-r-lg rounded-b-lg text-md mb-2 h-fit p-4 text-base"
        v-if="Array.isArray(props.urls)" v-for="(item, index) in props.urls" >
        <a :href="item" target="_blank" class="underline">{{ item }}</a>
      </div> -->
      <div
        v-if="Array.isArray(props.urls)"
        ref="scrollContainer"
        @mousedown="startDragging"
        @mousemove="onDragging"
        @mouseup="stopDragging"
        @mouseleave="stopDragging"
        :key="index"
        class="flex movieList cursor-pointer overflow-x-scroll mb-2 ml-4"
      >
        <div
          class="inline-block bg-white rounded-lg m-1 flex-shrink-0 select-none h-[199px] sm:h-[188px] w-[256px]"
          v-for="(item, index) in props.urls"
        >
          <div>
            <div>
              <a :href="item.link" target="_blank">
                <img
                  :src="item.icon"
                  class="object-cover h-[145px] sm:h-[136px] w-[256px] rounded-t-lg"
                />
              </a>
            </div>
            <div class="w-[256px] h-[52px] pt-2 pr-4 pb-2 pl-4 gap-1">
              <h1
                class="text[#121212] truncate text-[14px] font-semibold leading-[18.2px] tracking-custom font-sf-pro-display"
              >
                {{ item.title }}
              </h1>
              <div
                class="ml-0 font-normal leading-[14.32px] w-[224px] h-[14px] text-[#949494] text-[12px] truncate flex items-center gap-1 gap-y-[6px]"
              >
                <span v-if="item.year">{{ item.year }}</span>

                <span
                  v-if="
                    item.year && (item.age || item.practice || item.country)
                  "
                  class="mx-1"
                >
                  &bull;
                </span>

                <span v-if="item.age">{{ item.age }}</span>

                <span
                  v-if="item.age && (item.practice || item.country)"
                  class="mx-1"
                >
                  &bull;
                </span>

                <span v-if="item.practice">{{ item.practice }}</span>

                <span v-if="item.practice && item.country" class="mx-1">
                  &bull;
                </span>

                <span v-if="item.country">{{ item.country }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <span
        class="flex flex-row justify-between flex-wrap h-fit w-[338px] sm:w-[420px] lg:w-[338px] xl:w[338px] ml-4"
      >
        <p
          class="text-xs text-gray-400 ml-4"
          v-if="props.timeStamp !== 'NaN ngày trước'"
        >
          {{ props.timeStamp }}
        </p>
        <div
          v-if="
            flag &&
            modalStore.isChatting &&
            props.timeStamp !== 'NaN ngày trước'
          "
          class="flex"
        >
          <button class="cursor-pointer mr-6" @click="Like()">
            <img
              v-if="!reviewStateLike"
              class="w-4 h-4"
              src="/assets/images/like.png"
              alt="Like"
            />
            <img
              v-else
              class="w-4 h-4 mr-8"
              src="/assets/images/like_orange.png"
              alt="Liked"
            />
          </button>
          <button class="cursor-pointer mr-1" @click="Dislike()">
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
    <!-- <span class="flex flex-row justify-between flex-wrap h-fit">
      <p class="text-xs text-gray-400 ml-4" v-if="props.timeStamp !== 'NaN ngày trước'">
        {{ props.timeStamp }}
      </p>
      <div v-if="
        props.flag &&
        modalStore.isChatting &&
        props.timeStamp !== 'NaN ngày trước'
      " class="flex w-[48px] space-x-2">
        <button class="cursor-pointer" @click="Like()">
          <img v-if="!reviewStateLike" class="w-4 h-4" src="/assets/images/like.png" alt="Like" />
          <img v-else class="w-4 h-4" src="/assets/images/like_orange.png" alt="Liked" />
        </button>
        <button class="cursor-pointer right-0" @click="Dislike()">
          <img v-if="!reviewStateDislike" class="w-4 h-4" src="/assets/images/dislike.png" alt="Dislike" />
          <img v-else class="w-4 h-4" src="/assets/images/dislike_orange.png" alt="Disliked" />
        </button>
      </div>
    </span> -->
  </div>
</template>

<script lang="js" setup>
import BubbleMessage from "./bubble-message.vue";
import { useModalStore } from "~/stores/modal";
import { useSnackBarStore } from "~/stores/snackbar";
import { useMessage } from "~/stores/messages";
import { useReview } from "~/stores/review";

defineOptions({
  inheritAttrs: false,
});

const props = defineProps({
  message: Array,
  timeStamp: String,
  chatID: String,
  userID: String,
  videos: Array,
  images: Array,
  flag: Boolean,
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

const scrollContainer = ref(null);
let isDragging = false;
let startX, scrollLeft;

const startDragging = (event) => {
  isDragging = true;
  startX = event.pageX - scrollContainer.value.offsetLeft;
  scrollLeft = scrollContainer.value.scrollLeft;
};

const onDragging = (event) => {
  if (!isDragging) return;
  event.preventDefault();
  const x = event.pageX - scrollContainer.value.offsetLeft;
  const walk = (x - startX) * 1.5; // Adjust scroll speed here
  scrollContainer.value.scrollLeft = scrollLeft - walk;
};

const stopDragging = () => {
  isDragging = false;
};

const flag = ref(false);

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

watchEffect(() => {
  flag.value = props.message.length !== 3;
});

watch(
  () => props.message,
  async (newMessage) => {
    // for (const message of newMessage) {
    //   await new Promise((resolve) => {
    //     setTimeout(() => {
    //       receiveMessage.value.push(message)
    //       resolve()
    //     }, 600)
    //   })
    // }
    // if (newMessage && newMessage.length) {
    //   receiveMessage.value = newMessage;
    //   if (process.client) {
    //     setTimeout(() => {
    //       if (Array.isArray(receiveMessage.value) && receiveMessage.value.length) {
    //         isTriggerInterval = true;
    //         const firstMsg = receiveMessage.value.shift();
    //         displayMessage.value.push(firstMsg);

    //         if (receiveMessage.value.length) {
    //           const delayMessageInterval = setInterval(() => {
    //             const newMessage = receiveMessage.value.shift();
    //             displayMessage.value.push(newMessage);
    //             if (!receiveMessage.value.length) {
    //               clearInterval(delayMessageInterval);
    //             }
    //           }, 2000);
    //         }
    //       }
    //     }, 3000);
    //   }
    // }
  },
  { immediate: true }
);

watch(() => props.message, (value) => {
  console.log({ value })
})

const loaderControllerData = () => {
  messageStore.loaderController();
};

onMounted(() => {
  loaderControllerData();
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

.movieList {
  display: flex;
  overflow-x: scroll;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.movieList::-webkit-scrollbar {
  display: none;
}

.movieList:active {
  cursor: grabbing;
}
</style>
