import { defineStore } from "pinia";

export const useReview = defineStore("review", {
  state: () => ({
    chatID: '',
    userID: ''
  }),
  actions: {
    saveID(chatID, userID){
        this.userID = chatID
        this.chatID = userID
    }
  },
});
