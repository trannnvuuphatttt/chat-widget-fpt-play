import { joinChatRoom } from '@/src/api/chat';
import { defineStore } from 'pinia';

export const useChatStore = defineStore('chat-store', () => {
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
  return { handleJoinChatRoom };
});
