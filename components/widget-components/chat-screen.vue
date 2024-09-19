<template>
  <div id="chat-screen" class="bg-gray-200">
    <botChatBubble />
    <!-- <userChatBubble /> -->
  </div>
</template>

<script lang="ts" setup>
import botChatBubble from "./chat-bubble-components/bot-chat-bubble.vue";
import userChatBubble from "./chat-bubble-components/user-chat-bubble.vue";
</script>

<style></style>
