import { getSuggestTexts, joinChatRoom } from '@/src/api/chat';
import { defineStore } from 'pinia';

export const useChatStore = defineStore('chat-store', () => {
  const suggestQuestions = ref();
  const showSuggestions = ref(true);
  const handleGetSuggestQuestions = async () => {
    try {
      const res = await getSuggestTexts();
      if (res?.data) {
        suggestQuestions.value = res?.data;
      }
    } catch (error) {}
  };
  const handleJoinChatRoom = async () => {
    if (localStorage.getItem('chatSession')) {
      try {
        await joinChatRoom({
          channelId: localStorage.getItem('chatSession') || '',
        });
        return { success: true };
      } catch (error) {
        return { success: false };
      }
    } else {
      return { success: false };
    }
  };
  return {
    showSuggestions,
    suggestQuestions,
    handleJoinChatRoom,
    handleGetSuggestQuestions,
  };
});
