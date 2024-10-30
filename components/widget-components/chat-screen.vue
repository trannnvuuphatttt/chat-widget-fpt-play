<template>
  <div
    ref="chatScreen"
    class="bg-gray-200 overflow-y-auto overflow-x-[12px] flex flex-col relative items-center pb-4 "
    @scroll="handleScroll()"
  >
    <div
      v-for="(message, key, index) in messageStore.newMessageArray"
      :key="key"
      class="w-[338px] mt-[24px] mr-[12px] gap-[24px] "
    >
      <userChatBubble
        :message="message.userMessage"
        :timeStamp="timeAgo(String(message.timestamp))"
        v-if="message.userMessage !== ''"
      />
      {{ console.log(      message.botMessage,  message.botMessage.length)}}
      <botChatBubble
        :message="message.botMessage"
        :timeStamp="timeAgo(String(message.timestamp))"
        :chatID="message.chatID"
        :userID="UserIDStore.userID"
        :flag="isLastElement(key)"
        :videos="message.videos"
        :images="message.images"
        :contents="message.contents"
        :urls="message.urls"
        class="botMessage"
        v-if="message.botMessage[0]!== ''"
      />
    </div>

    <div
      class="bottom-0 sticky w-[40px] h-[40px] ml-6 mb-6 z-50 rounded-full flex justify-center items-center bg-[rgba(148, 148, 148, 0.4)] cursor-pointer"
      v-if="showScrollDownButton"
      @click="scrollToBottom(), toggleScrollButton()"
    >
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
import { useScrollStore } from "~/stores/scroll";
import { nextTick, onMounted } from "vue";
import { useModalStore } from "~/stores/modal";
import ChatSuggestion from "./chat-suggestion.vue";
import { watch } from 'vue';

const UserIDStore = useUserIDStore()
const modalStore = useModalStore()

const messageStore = useMessage();
const {timeAgo} = useFormatDateTime()
const showScrollDownButton = ref(false)

const chatScreen = ref(null);
const toggleScrollButton= () => {
  showScrollDownButton.value = !showScrollDownButton.value
}
const scrollToBottom = () => {
  const container = chatScreen.value;
  nextTick(() => {

    setTimeout(() => {
    container.scrollTo({
      top: container.scrollHeight,
      behavior: 'smooth'
    });
  }, 0);
  })
};

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

  if(container.scrollTop < container.scrollHeight - container.clientHeight -81 ){
    showScrollDownButton.value=true
  }else{
    showScrollDownButton.value=false
  };
};



onMounted(() => {
  showScrollDownButton.value=false;
  if (chatScreen.value) {
    chatScreen.value.addEventListener('scroll', handleScroll);
  }
});

onBeforeUnmount(() => {
  if (chatScreen.value) {
    chatScreen.value.removeEventListener('scroll', handleScroll);
  }
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

  messageStore.getChatHistory(UserIDStore.userID);

});
const isLastElement = (currentKey) => {
  const keys = Object.keys(messageStore.newMessageArray);

  return currentKey === keys.length -1;
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
