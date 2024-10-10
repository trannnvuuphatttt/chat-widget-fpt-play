<template>
  <div ref="chatScreen" class="bg-gray-200 overflow-y-scroll overflow-x-hidden">
    <div
      v-for="(message, key, index) in messageStore.newMessageArray"
      :key="key"
      ref="scrollContainer"
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
        v-if="message.botMessage !== ''"
        class="botMessage"
      />
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
import { onMounted } from "vue";
import { useModalStore } from "~/stores/modal";

const UserIDStore = useUserIDStore()
const modalStore = useModalStore()

const messageStore = useMessage();
const {timeAgo} = useFormatDateTime()


const fetchHistory = () => {

}

const chatScreen = ref(null);
const scrollToBottom = () => {
  nextTick(() => {
    if (chatScreen.value) {
      setTimeout(() => {
        chatScreen.value.scrollTo({
          top: chatScreen.value.scrollHeight,
          behavior: 'smooth'
        });
      }, 500);
    }

  });
};
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
  window.addEventListener('scroll-to-bottom', scrollToBottom);
});
const isLastElement = (currentKey) => {
  const keys = Object.keys(messageStore.newMessageArray);

  return currentKey === keys.length -1;
};
</script>

<style></style>
