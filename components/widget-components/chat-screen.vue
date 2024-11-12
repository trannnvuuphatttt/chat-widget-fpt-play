<template>
  <div ref="chatScreen" class="bg-customBackground overflow-y-auto flex flex-col relative items-center pb-4"
    @scroll="handleScroll()">
    <div v-for="(message, key, index) in messageStore.newMessageArray" :key="key" class="w-full mt-[24px]">
      <userChatBubble :message="message.userMessage" :timeStamp="timeAgo(String(message.timestamp))"
        v-if="message.userMessage !== ''" />
      <botChatBubble :message="message.botMessage" :timeStamp="timeAgo(String(message.timestamp))"
        :chatID="message.chatID" :userID="UserIDStore.userID" :flag="isLastElement(key)" :videos="message.videos"
        :images="message.images" :contents="message.contents" :urls="message.urls"
        :isFullWidth="message.urls && Array.isArray(message.urls) ? true : false"
        :listChat="messageStore.newMessageArray" :getLastTimeStamp="getLastTimeStamp().formattedTimestamp"
        class="botMessage" v-if="message.botMessage[0] !== ''" />
    </div>
    <div v-if="isWaitingSocket" class="w-full mt-[24px]">
      <LoadingMessage />
    </div>
    <div
      class="bottom-0 sticky w-[40px] h-[40px] ml-6 mb-6 z-50 rounded-full flex justify-center items-center bg-[rgba(148, 148, 148, 0.4)] cursor-pointer"
      v-if="showScrollDownButton" @click="scrollToBottom(), toggleScrollButton()">
      <img src="/assets/images/chevron.png" />
    </div>
  </div>
</template>

<script lang="js" setup>
import botChatBubble from "./chat-bubble-components/bot-chat-bubble.vue";
import userChatBubble from "./chat-bubble-components/user-chat-bubble.vue";
import { useMessage } from "../../stores/messages";
import { useUserIDStore } from "~/stores/userID";
import { useFormatDateTime } from "~/composables/useFormatDateTime";
import { nextTick, onMounted } from "vue";
import { useModalStore } from "~/stores/modal";
import { watch } from 'vue';
import LoadingMessage from "./loading-message.vue";

const UserIDStore = useUserIDStore()
const modalStore = useModalStore()

const messageStore = useMessage();
const { timeAgo } = useFormatDateTime()
const showScrollDownButton = ref(false)
const { isWaitingSocket, scrollTime, isLoading, newMessageArray } = storeToRefs(messageStore)

const scrollTimeout1 = ref()
const scrollTimeout2 = ref()

const chatScreen = ref(null);
const toggleScrollButton = () => {
  showScrollDownButton.value = !showScrollDownButton.value
}
const scrollToBottom = () => {
  const container = chatScreen.value;
  nextTick(() => {
    scrollTimeout1.value = setTimeout(() => {
      container.scrollTo({
        top: container.scrollHeight,
        behavior: 'smooth'
      });
    }, 200);
  })
};

const getLastTimeStamp = () => {
  // Get the last item from the array
  const lastItem = messageStore.newMessageArray[1] && messageStore.newMessageArray[1].userMessage !== ''
    ? messageStore.newMessageArray[1]
    : (messageStore.newMessageArray[2] && messageStore.newMessageArray[2].userMessage !== '')
      ? messageStore.newMessageArray[2]
      : messageStore.newMessageArray[messageStore.newMessageArray.length - 1];

  // Check if lastItem and timestamp exist, otherwise set a default message
  const formattedTimestamp = lastItem && lastItem.timestamp
    ? timeAgo(String(lastItem.timestamp))
    : null

  // Return an array with an object containing timestampHistory
  return {
    formattedTimestamp
  }
};

function debounce(func, wait) {
  let timeout;

  return function (...args) {
    const context = this;
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(context, args), wait);
  };
}

const onMessageChange = debounce(() => {
  const container = chatScreen.value;
  container.scrollTo({
    top: container.scrollHeight,
    behavior: 'smooth'
  });
}, 100);

watch(() => scrollTime.value, (v) => {
  // onMessageChange()
})

watch(() => newMessageArray.value, () => {
  nextTick(() => {
    scrollTimeout2.value = setTimeout(() => {
      onMessageChange()
    }, 500);
  })
})

const scrollToBottomWhenImagesLoaded = () => {
  const container = chatScreen.value;
  const images = container.querySelectorAll('img');

  if (images.length === 0) {
    scrollToBottom();
    return;
  }

  let loadedImages = 0;
  images.forEach((img) => {
    if (img.complete) {
      loadedImages++;
    } else {
      img.addEventListener('load', () => {
        loadedImages++;
        if (loadedImages === images.length) {
          scrollToBottom();
        }
      });
    }
  });


  if (loadedImages === images.length) {
    scrollToBottom();
  }
};

const handleScroll = () => {
  const container = chatScreen.value;
  if (container.scrollTop < container.scrollHeight - container.clientHeight - 81) {
    showScrollDownButton.value = true
  } else {
    showScrollDownButton.value = false
  };
};

onBeforeUnmount(() => {
  if (chatScreen.value) {
    chatScreen.value.removeEventListener('scroll', handleScroll);
  }
  clearTimeout(scrollTimeout1.value)
  clearTimeout(scrollTimeout2.value)
});
watch(
  () => modalStore.showWidget,
  (newValue) => {
    if (newValue === true) {

      scrollToBottom();
    }
  }
);
onMounted(() => {
  UserIDStore.getExistedID();
  const { query: { token } } = useRoute()
  const pID = token || UserIDStore.userID
  messageStore.getChatHistory(pID, UserIDStore.userID);
  showScrollDownButton.value = false;
  if (chatScreen.value) {
    chatScreen.value.addEventListener('scroll', handleScroll);
  }
});
const isLastElement = (currentKey) => {
  const keys = Object.keys(messageStore.newMessageArray);

  return currentKey === keys.length - 1;
};
const arrayLength = computed(() => messageStore.newMessageArray.length);

watch(arrayLength, (newLength, oldLength) => {
  if (newLength > oldLength) {
    scrollToBottomWhenImagesLoaded()

  }
});

const loading = computed(() => messageStore.isLoading);
watch(loading, (newVal, oldVal) => {
  if (!newVal && oldVal) {
    scrollToBottomWhenImagesLoaded();
  }


});
</script>

<style></style>
