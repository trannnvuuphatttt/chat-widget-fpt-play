<template>
  <div
    ref="chatScreen"
    class="bg-gray-200 overflow-y-auto overflow-x-hidden flex flex-col relative items-center pb-4"
    @scroll="handleScroll()"
  >
    <div
      v-for="(message, key, index) in messageStore.newMessageArray"
      :key="key"
      class="w-[338px] mt-6 gap-2"
    >
      <userChatBubble
        :message="message.userMessage"
        v-if="message.userMessage !== ''"
      />

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
        v-if="message.botMessage !== ''"
      />
    </div>

    <div
      class="bottom-0 sticky w-[40px] h-[40px] ml-6 mb-6 z-50 rounded-full flex justify-center items-center"
      v-if="showScrollDownButton"
      @click="scrollToBottom(), toggleScrollButton()"
    >
      <img src="/assets/images/chevron_orange.png" />
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


const handleScroll = () => {
  const container = chatScreen.value;
  //console.log(container.scrollTop, container.scrollHeight, container.clientHeight)
  if(container.scrollTop < container.scrollHeight - container.clientHeight - 81 ){
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
  console.log(messageStore.newMessageArray.length)


});
const isLastElement = (currentKey) => {
  const keys = Object.keys(messageStore.newMessageArray);

  return currentKey === keys.length -1;
};
const arrayLength = computed(() => messageStore.newMessageArray.length);

watch(arrayLength, (newLength, oldLength) => {
  if (newLength > oldLength) {
    scrollToBottom()

  }
});

const loading = computed(() => messageStore.isLoading);
watch(loading, (newVal, oldVal) => {
   if (!newVal && oldVal) {
          scrollToBottom();
    }
});
</script>

<style></style>
