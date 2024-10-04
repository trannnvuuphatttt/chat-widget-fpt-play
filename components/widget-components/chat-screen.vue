<template>
  <div
    id="chat-screen"
    class="bg-gray-200 overflow-y-scroll overflow-x-hidden"
    ref="chatContainer"
  >
    <!-- <div v-for="(text, key, index) in preChatTexts" :key="key">
      <botChatBubble
        :message="text.text"
        :timeStamp="timeAgo(String(Date.now() / 1000))"
        :chatID="''"
        :userID="UserIDStore.userID"
        :flag="false"
        :isAttachment="isAttachment(key)"
      />
    </div> -->
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
        :timeStamp="timeAgo(String(message.timeStamp))"
        :chatID="message.chatID"
        :userID="UserIDStore.userID"
        :flag="isLastElement(key)"
        :isAttachment="isAttachment(key)"
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
import { useScroll } from "~/stores/scroll";
import { onMounted } from "vue";

const UserIDStore = useUserIDStore()

const messageStore = useMessage();
const {timeAgo} = useFormatDateTime()
onMounted(() => {
  messageStore.getChatHistory(UserIDStore.userID);
  for(let i = 0; i<preChatTexts.length; i++){
 messageStore.sendMessage('',preChatTexts[i])
}

})
const preChatTexts = [
   "Xin chào 👋 ! Tôi là trợ lý thông minh của bạn.",
 "Tôi có thể giúp bạn tìm kiếm tất cả các nội dung liên quan đến FPT Play.",
"Vậy tôi có thể giúp gì cho bạn?",
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

  return currentKey === keys.length - 1;
};
const isAttachment = (currentKey) => {
  if(currentKey===0){
    return false
  }else{

    return (messageStore.newMessageArray[currentKey] - messageStore.newMessageArray[currentKey-1] <= 6000)
  }
}
</script>

<style></style>
