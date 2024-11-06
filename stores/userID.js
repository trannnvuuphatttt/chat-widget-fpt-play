import { defineStore } from 'pinia';
import { v4 as uuidv4 } from 'uuid';
import { setWithExpiry, getWithExpiry } from '../src/utils/setGetExpired';

export const useUserIDStore = defineStore('userID', {
  state: () => ({
    userID: null,
  }),
  actions: {
    getExistedID() {
      let existed = getWithExpiry('chatSession');
      if (existed === null || !existed) return;
      this.userID = existed;
    },
    createNewID() {
      this.userID = uuidv4();
      try {
        setWithExpiry('chatSession', this.userID, 1000 * 60 * 60 * 24);
      } catch (e) {
        if (
          e.name === 'QuotaExceededError' ||
          e.name === 'NS_ERROR_DOM_QUOTA_REACHED'
        ) {
          alert('Local storage is full, cannot save data.');
        } else {
          alert('An error occurred while saving to local storage.', e);
        }
      }
    },
  },
});
