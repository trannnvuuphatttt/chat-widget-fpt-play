<template>
  <div
    id="chat-screen"
    class="bg-gray-200 overflow-y-scroll overflow-x-hidden"
    ref="chatContainer"
  >
    <div v-for="(text, key, index) in preChatTexts" :key="key">
      <botChatBubble
        :message="text.text"
        :timeStamp="''"
        :chatID="''"
        :userID="UserIDStore.userID"
        :flag="false"
        :isAttachment="isAttachment(key)"
      />
    </div>
    <div v-for="(message, key, index) in messageStore.messagesArray" :key="key">
      <userChatBubble :message="message.query" v-if="message.query !== ''" />
      <botChatBubble
        :message="message.answer.text"
        :timeStamp="timeAgo(String(message.timestamp))"
        :chatID="message.message_uuid"
        :userID="UserIDStore.userID"
        :flag="isLastElement(key)"
        :isAttachment="true"
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
import { onMounted } from "vue";

const UserIDStore = useUserIDStore()

const messageStore = useMessage();
const {timeAgo} = useFormatDateTime()
onMounted(() => {
  messageStore.getChatHistory(UserIDStore.userID);

})
const preChatTexts = [
  {text: "Xin chào 👋 ! Tôi là trợ lý thông minh của bạn."},
  {text: "Tôi có thể giúp bạn tìm kiếm tất cả các nội dung liên quan đến FPT Play."},
  {text: "Vậy tôi có thể giúp gì cho bạn?"},
]
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
const isAttachment = (currentKey) => {
  return currentKey === 0;
}
</script>

<style></style>
