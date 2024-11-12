<template>
  <div>
    <!-- Trường hợp có lỗi -->
    <div class="flex flex-col pr-[16px] sm:pr-[24px] lg:pr-[24px] xl:pr-[16px]" v-if="messageStore.isError">
      <div class="flex flex-row justify-end items-center gap-[8px]">
        <img src="/assets/images/Frame_2120412613.png" class="flex-grow-0 flex-shrink-0 w-[24px] h-[24px]" />
        <div
          class="rounded-tl-2xl rounded-tr rounded-l-2xl rounded-b-2xl text-md mb-2 h-fit text-[16px] p-4 break-words font-sf-pro-display border border-customRed">
          <p class="text-customDark text-left">{{ message }}</p>
        </div>
      </div>
      <span class="flex flex-row-reverse justify-between flex-wrap h-fit flex-grow-0 flex-1">
        <p class="text-[12px] text-right text-customRed mr-2 cursor-pointer" @click="retryFunction">
          Thử lại
        </p>
      </span>
    </div>

    <!-- Trường hợp không có lỗi -->
    <div
      class="text-left text-md mb-2 h-fit ml-auto py-4 pl-4 w-fit sm:w-fix lg:w-fix xl:w-fit max-w-[342px] sm:max-w-[480px] lg:max-w-[338px] xl:max-w-[338px] pr-[16px] sm:pr-[24px] lg:pr-[24px] xl:pr-[16px]"
      v-else>
      <div
        class="bg-orange-500 rounded-tl-2xl rounded-tr rounded-l-2xl rounded-b-2xl text-md mb-2 h-fit text-[16px] p-4 break-words font-sf-pro-display">
        <p class="text-white text-customWhite">{{ message }}</p>
      </div>
      <span class="flex flex-row-reverse justify-between flex-wrap h-fit font-sf-pro-display">
        <p class="text-[12px] text-gray-400 text-left" v-if="props.timeStamp !== 'NaN ngày trước'">
          {{ props.timeStamp }}
        </p>
      </span>
    </div>
  </div>
</template>

<script lang="js" setup>
import { useMessage } from '~/stores/messages';

const messageStore = useMessage();

const props = defineProps({
  message: String,
  timeStamp: String,
  isFinal: Boolean
});

// Thêm hàm retryFunction nếu cần
// function retryFunction() {
//   // Xử lý sự kiện thử lại
// }
</script>

<style>
/* Không cần CSS tùy chỉnh nếu sử dụng Tailwind CSS */
</style>
