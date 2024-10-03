<template>
  <div id="chat-screen" class="bg-gray-200 overflow-y-scroll overflow-x-hidden">
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
    <div
      v-for="(message, key, index) in messageStore.newMessageArray"
      :key="key"
    >
      <userChatBubble
        :message="message.userMessage"
        v-if="message.userMessage !== ''"
      />
      <botChatBubble
        :message="message.botMessage"
        :timeStamp="timeAgo(message.timestamp)"
        v-if="message.botMessage !== ''"
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

const UserIDStore = useUserIDStore()

const messageStore = useMessage();
const {timeAgo} = useFormatDateTime()
onMounted(() => {
  messageStore.getChatHistory(UserIDStore.userID);

})


const isLastElement = (currentKey) => {
  const keys = Object.keys(messageStore.messagesArray);
  //console.log("keys size: ", keys.length - 1)
  return currentKey === keys.length - 1;
};
</script>

<style></style>
