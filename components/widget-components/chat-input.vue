<template>
  <!-- Input Container for Chatting -->
  <div
    class="flex flex-row shadow-md w-full h-[72px] sm:h-[80px] gap-2 py-2 px-4 sm:px-6 items-center"
    v-if="modalStore.isChatting"
  >
    <input
      type="text"
      ref="inputField"
      class="bg-gray-200 flex-auto rounded-lg text-[16px] focus:outline-none h-[40px] p-4 caret-[#FF6500]"
      placeholder="Nhập tin nhắn"
      v-model="messageStore.userInput"
      @keyup.enter="handleSendMessage"
    />
    <button
      :class="{
        'flex-shrink-0 flex-grow-0 cursor-pointer w-fit h-fit': true,
        'hover:cursor-not-allowed':
          !messageStore.userInput ||
          messageStore.isWaitingSocket ||
          messageStore?.isLoading,
      }"
      :disabled="
        !messageStore.userInput ||
        messageStore.isWaitingSocket ||
        messageStore?.isLoading
      "
      @click="handleSendMessage"
    >
      <!-- <img
       
        src="/assets/images/send_icon_grey.png"
        alt="Send Icon"
        class="w-[21.04px] h-[18.13px]"
      /> -->

      <svg
        v-if="
          !messageStore.userInput ||
          messageStore.isWaitingSocket ||
          messageStore?.isLoading
        "
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <mask
          id="mask0_998_6432"
          style="mask-type: alpha"
          maskUnits="userSpaceOnUse"
          x="0"
          y="0"
          width="32"
          height="32"
        >
          <rect width="32" height="32" fill="#D9D9D9" />
        </mask>
        <g mask="url(#mask0_998_6432)">
          <path
            d="M6.35529 24.9637C5.95263 25.1246 5.57051 25.0904 5.20896 24.861C4.8474 24.6317 4.66663 24.2977 4.66663 23.859V18.2307L13.8973 16L4.66663 13.7694V8.14102C4.66663 7.70235 4.8474 7.36835 5.20896 7.13902C5.57051 6.90969 5.95263 6.87547 6.35529 7.03635L24.964 14.882C25.4597 15.104 25.7076 15.4775 25.7076 16.0024C25.7076 16.5272 25.4597 16.8991 24.964 17.118L6.35529 24.9637Z"
            fill="black"
            fill-opacity="0.38"
          />
        </g>
      </svg>

      <!-- <img
        v-else
        src="/assets/images/send_icon_orange.png"
        alt="Send Icon"
        class="w-[21.04px] h-[18.13px]"
      /> -->

      <svg
        v-else
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <mask
          id="mask0_998_6357"
          style="mask-type: alpha"
          maskUnits="userSpaceOnUse"
          x="0"
          y="0"
          width="32"
          height="32"
        >
          <rect width="32" height="32" fill="#D9D9D9" />
        </mask>
        <g mask="url(#mask0_998_6357)">
          <path
            d="M6.35535 24.9636C5.95269 25.1245 5.57058 25.0903 5.20902 24.8609C4.84746 24.6316 4.66669 24.2976 4.66669 23.8589V18.2306L13.8974 15.9999L4.66669 13.7693V8.14094C4.66669 7.70227 4.84746 7.36827 5.20902 7.13894C5.57058 6.9096 5.95269 6.87538 6.35535 7.03627L24.964 14.8819C25.4598 15.1039 25.7077 15.4774 25.7077 16.0023C25.7077 16.5272 25.4598 16.899 24.964 17.1179L6.35535 24.9636Z"
            fill="#FE592A"
          />
        </g>
      </svg>
    </button>
  </div>

  <!-- Buttons Container for Chat Options -->
  <div
    class="shadow-md flex flex-row p-3 sm:p-4 gap-2 w-full h-[72px] sm:h-[80px] justify-between min-h-[72px]"
    v-if="!modalStore.isChatting && userIDStore.userID"
  >
    <!-- <button
      class="flex-auto border-2 border-l-[#FE592A] border-b-[#FE592A] border-r-[#E93013] border-t-[#E93013] bg-gradient-to-r from-[#FE592A] to-[#E93013] text-white hover:bg-gradient-to-r hover:from-[#FFF] hover:text-orange-500 text-sm sm:text-md rounded-lg"
      @click="
        messageStore.emptyArray();
      modalStore.isChatting = true;
      ">
      Đoạn chat mới
    </button> -->
    <button
      class="flex-auto border-2 border-l-[#FE592A] border-b-[#FE592A] border-r-[#E93013] border-t-[#E93013] bg-gradient-to-r from-[#FE592A] to-[#E93013] text-white hover:bg-gradient-to-r hover:from-[#FFF] hover:text-orange-500 text-sm sm:text-md rounded-lg"
      v-if="existTime !== null"
      @click="handleContinueChatting"
    >
      Bắt đầu
    </button>
  </div>
</template>

<script lang="js" setup>
import { useModalStore } from '~/stores/modal';
import { useMessage } from "../../stores/messages";
import { useUserIDStore } from "../../stores/userID";
import { getWithExpiry } from "~/src/utils/setGetExpired"
import { storeToRefs } from 'pinia'
import { useFocusStore } from '~/stores/useFocusStore';

const modalStore = useModalStore();

const messageStore = useMessage();
const userIDStore = useUserIDStore();
const existTime = useState('existed');
const { showWidget } = storeToRefs(modalStore)
const focusStore = useFocusStore();
const inputField = ref(null);

defineOptions({
  inheritAttrs: false,
});

watch(showWidget, () => {
  existTime.value = getWithExpiry("chatSession")
})

const handleContinueChatting = () => {
  modalStore.isChatting = true;

  messageStore.sendMessage(
            '',
            'Mừng bạn đã quay trở lại, tôi chờ bạn mãi! 🥰',
          ),
          modalStore.toggleSuggestion()
};

const handleSendMessage = () => {
  if (!messageStore.userInput) {
    return
  }
  const inputText = messageStore.userInput.trim()
  if (inputText === "") return

  const { query: { token } } = useRoute()

  const pID = token || userIDStore.userID

  messageStore.sendRequest(messageStore.userInput, pID, userIDStore.userID)
  modalStore.toggleSuggestion()
}

onMounted(() => {
  existTime.value = getWithExpiry("chatSession")
  focusStore.setInputRef(inputField.value);
})
</script>

<style></style>
