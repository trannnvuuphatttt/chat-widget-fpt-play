import { defineStore } from "pinia";
import { v4 as uuidv4 } from "uuid";

export const useUserIDStore = defineStore("userID", {
  state: () => ({
    userID: null,
  }),
  actions: {
    getExistedID() {
      this.userID = localStorage.getItem("chatSession");
      console.log(this.userID);
    },
    createNewID() {
      this.userID = uuidv4();
      try {
        localStorage.setItem("chatSession", JSON.stringify(this.userID));
      } catch (e) {
        if (
          e.name === "QuotaExceededError" ||
          e.name === "NS_ERROR_DOM_QUOTA_REACHED"
        ) {
          alert("Local storage is full, cannot save data.");
        } else {
          alert("An error occurred while saving to local storage.", e);
        }
      }
    },
    deleteOldID() {
      this.userID = null;
      localStorage.removeItem("chatSession");
    },
  },
});
