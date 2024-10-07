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
        :timeStamp="timeAgo(String(message.timeStamp))"
        :chatID="message.chatID"
        :userID="UserIDStore.userID"
        :flag="isLastElement(key)"
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

const UserIDStore = useUserIDStore()

const messageStore = useMessage();
const {timeAgo} = useFormatDateTime()


const chatScreen = ref(null);

const scrollToBottom = () => {
  nextTick(() => {
    if (chatScreen.value) {
      chatScreen.value.scrollTop = chatScreen.value.scrollHeight;
    }
  });
};

onMounted(() => {
  scrollToBottom()
  window.addEventListener('scroll-to-bottom', scrollToBottom);
});


const isLastElement = (currentKey) => {
  const keys = Object.keys(messageStore.messagesArray);

  return currentKey === keys.length -1;
};
// const isAttachment = (currentKey) => {
//   if(currentKey===0){
//     return true
//   }
// }
</script>

<style></style>
