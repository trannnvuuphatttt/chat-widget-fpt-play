<template class="relative">
  <div class="pl-[16px] sm:pl-[24px] lg:pl-[24px] xl:pl-[16px]">
    <div class="flex items-center">
      <img src="assets/images/avatar.png" class="h-6 w-6 inline-block mb-2 mr-1" />

      <div class="text-sm inline-block mb-2 ml-1">Trợ lý Gati</div>
    </div>
    <div class="w-full">
      <div v-if="props?.message?.length">
        <div v-for="(message, index) in props?.message" class="mb-2">
          <!-- {{ message }} -->
          <ClientOnly>
            <BubbleMessage ref="messageContainer" :message="message" :key="index"></BubbleMessage>
          </ClientOnly>
        </div>
      </div>
      <div v-else
        class="flex flex-col mb-2 bg-white rounded-tl rounded-r-2xl rounded-b-2xl text-md h-fit p-4 text-base font-sf-pro-display w-fit sm:w-[420px] md:w-[480px] lg:w-[338px] xl:w-[338px]">
        <div ref="messageContainer" v-html="displayMessage[0]"></div>
      </div>
      <div v-if="Array.isArray(props.urls)" ref="scrollContainer" @mousedown="startDragging" @mousemove="onDragging"
        @mouseup="stopDragging" @mouseleave="stopDragging" :key="index"
        class="flex movieList cursor-pointer overflow-x-scroll">
        <div class="inline-block bg-white mr-1 rounded-lg flex-shrink-0 select-none h-[199px] sm:h-[188px] w-[256px]"
          v-for="(item, index) in props.urls">
          <a :href="item.link" target="_blank" class="select-none" @mousedown.prevent>
            <div>
              <div :style="{ backgroundImage: `url(${item.icon})` }"
                class="select-none bg-cover bg-center h-[145px] sm:h-[136px] w-[256px] rounded-t-lg"></div>
            </div>
            <div class="w-[256px] h-[52px] pt-2 pr-4 pb-2 pl-4 gap-1">
              <h1
                class="text[#121212] truncate text-[14px] font-semibold leading-[18.2px] tracking-custom font-sf-pro-display">
                {{ item.title }}
              </h1>
              <div
                class="ml-0 font-normal leading-[14.32px] w-[224px] h-[14px] text-[#949494] text-[12px] truncate flex items-center gap-1 gap-y-[6px]">
                <span v-if="item.year">{{ item.year }}</span>

                <span v-if="
                  item.year && (item.age || item.practice || item.country)
                " class="mx-1">
                  &bull;
                </span>

                <span v-if="item.age">{{ item.age }}</span>

                <span v-if="item.age && (item.practice || item.country)" class="mx-1">
                  &bull;
                </span>

                <span v-if="item.practice">{{ item.practice }}</span>

                <span v-if="item.practice && item.country" class="mx-1">
                  &bull;
                </span>

                <span v-if="item.country">{{ item.country }}</span>
              </div>
            </div>
          </a>
        </div>
      </div>
      <span :class="['flex flex-row justify-between flex-wrap h-fit mt-2', widthClass]">
        <p class="text-xs text-[12px] text-gray-400 font-sf-pro-display"
          v-if="props.getLastTimeStamp && props.getLastTimeStamp !== 'NaN ngày trước' && props.timeStamp && props.timeStamp !== 'NaN ngày trước'">
          {{ props.timeStamp === 'Vừa xong' && !props.chatID
            ?
            props.getLastTimeStamp :
            props.timeStamp }}
        </p>
        <p class="text-xs text-[12px] text-gray-400 font-sf-pro-display"
          v-else-if="props.timeStamp !== 'NaN ngày trước'">
          {{ props.timeStamp }}
        </p>
        <div v-if="
          flag &&
          modalStore.isChatting &&
          props.timeStamp !== 'NaN ngày trước'
        " class="flex">
          <button class="cursor-pointer mr-3" @click="Like()">
            <img v-if="!reviewStateLike" class="w-4 h-4" src="/assets/images/like.png" alt="Like" />
            <img v-else class="w-4 h-4" src="/assets/images/like_orange.png" alt="Liked" />
          </button>
          <button class="cursor-pointer" @click="Dislike()">
            <img v-if="!reviewStateDislike" class="w-4 h-4" src="/assets/images/dislike.png" alt="Dislike" />
            <img v-else class="w-4 h-4" src="/assets/images/dislike_orange.png" alt="Disliked" />
          </button>
        </div>
      </span>
    </div>
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
  isFullWidth: Boolean,
  listChat: Array,
  getLastTimeStamp: String
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

const widthClass = computed(() => {
  // Filter listChat to get only chat items with a non-empty chatID and non-empty urls
  const fullWidthChatIDs = props.listChat
    .filter(chat => chat.chatID && chat.urls && chat.urls.length > 0)
    .map(chat => chat.chatID);

  // Check if the current chatID should have full width
  return fullWidthChatIDs.includes(props.chatID)
    ? 'max-w-[100vw] pr-[16px] sm:pr-[24px] lg:pr-[24px] xl:pr-[16px]'
    : 'w-[338px] sm:w-[420px] md:w-[480px] lg:w-[338px] xl:w-[338px]';
});

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


const loaderControllerData = () => {
  messageStore.loaderController();
};

onMounted(() => {
  loaderControllerData();
});
</script>

<style scoped>
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

.wrap-buble {
  width: max-content;
}

.msg-buble {
  width: max-content;
}
</style>
