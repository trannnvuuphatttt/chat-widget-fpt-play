<template>
  <div
    id="chat-screen"
    class="bg-gray-200 overflow-y-scroll overflow-x-hidden"
    ref="chatContainer"
  >
    <div v-for="(message, key, index) in messageStore.messagesArray" :key="key">
      <userChatBubble :message="message.query" v-if="message.query !== ''" />
      <botChatBubble
        :message="message.answer.text"
        :timeStamp="timeAgo(message.timestamp)"
        :chatID="message.message_uuid"
        :userID="UserIDStore.userID"
        :flag="isLastElement(key)"
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
import { useScroll } from "~/stores/scroll";

const UserIDStore = useUserIDStore()

const messageStore = useMessage();
const {timeAgo} = useFormatDateTime()
onMounted(() => {
  messageStore.getChatHistory(UserIDStore.userID);

})

const scrollStore = useScroll();
const chatContainer = ref(null);

const scrollToBottom = () => {
  chatContainer.value.scrollTop = chatContainer.value.scrollHeight;
};

watch(() => scrollStore.shouldScroll, (newVal) => {
  if (newVal) {
    scrollToBottom();
    scrollStore.resetScroll();
  }
});

const isLastElement = (currentKey) => {
  const keys = Object.keys(messageStore.messagesArray);
  //console.log("keys size: ", keys.length - 1)
  return currentKey === keys.length - 1;
};
</script>

<style></style>
