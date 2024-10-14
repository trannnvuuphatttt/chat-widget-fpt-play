<template>
  <div
    ref="chatScreen"
    class="bg-gray-200 overflow-y-auto overflow-x-hidden flex flex-col relative items-center pb-4"
  >
    <div
      v-for="(message, key, index) in messageStore.newMessageArray"
      :key="key"
      ref="scrollContainer"
      class="w-[338px] mt-6 gap-2"
    >
      <userChatBubble
        :message="message.userMessage"
        v-if="message.userMessage !== ''"
      />
      {{ console.log(timeAgo(String(Date.now() / 1000))) }}
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
      class="bottom-0 absolute w-[40px] h-[40px] bg-[#949494] hover:bg-gray-200 text-white ml-6 mb-4 z-50 rounded-full flex justify-center items-center"
      v-show="showScrollDownButton"
      @click="scrollToBottom(), toggleScrollButton()"
    >
      <i class="fa-solid fa-arrow-down text-2xl"></i>
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
  nextTick(() => {
    if (chatScreen.value) {
      setTimeout(() => {
        chatScreen.value.scrollTo({
          top: chatScreen.value.scrollHeight,
          behavior: 'smooth'
        });
      }, 10);
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

});
const isLastElement = (currentKey) => {
  const keys = Object.keys(messageStore.newMessageArray);

  return currentKey === keys.length -1;
};
const arrayLength = computed(() => messageStore.newMessageArray.length);

watch(arrayLength, (newLength, oldLength) => {
  if (newLength > oldLength) {
    scrollToBottom()
    toggleScrollButton()
  }
});
</script>

<style></style>
