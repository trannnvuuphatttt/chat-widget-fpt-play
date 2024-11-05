<template>
  <div>
    <!-- Trường hợp có lỗi -->
    <div class="flex flex-col gap-[8px]" v-if="messageStore.isError">
      <div class="flex flex-row justify-end items-center gap-[8px]">
        <img
          src="/assets/images/Frame_2120412613.png"
          class="flex-grow-0 flex-shrink-0 w-[24px] h-[24px]"
        />
        <div
          class="flex-0 w-fit max-h-[53px] gap-[8px] border-[#FF0944] border-[1px] bg-white p-4 rounded-l-lg rounded-b-lg break-words max-w-full sm:max-w-[338px]"
        >
          <p class="text-[#121212] text-right">{{ message }}</p>
        </div>
      </div>
      <span
        class="flex flex-row-reverse justify-between flex-wrap h-fit flex-grow-0 flex-1"
      >
        <p
          class="text-[12px] text-right text-[#FF0944] mr-2 cursor-pointer"
          @click="retryFunction"
        >
          > Thử lại
        </p>
      </span>
    </div>

    <!-- Trường hợp không có lỗi -->
    <div class="text-md mb-2 h-fit w-fit ml-auto py-4 pl-4 mr-0" v-else>
      <div
        class="bg-orange-500 rounded-tl-2xl rounded-tr rounded-l-2xl rounded-b-2xl text-md mb-2 h-fit w-fit text-[16px] p-4 break-words max-w-full sm:max-w-[338px]"
      >
        <p class="text-white text-right">{{ message }}</p>
      </div>
      <span class="flex flex-row-reverse justify-between flex-wrap h-fit">
        <p
          class="text-[12px] text-gray-400 text-left"
          v-if="props.timeStamp !== 'NaN ngày trước'"
        >
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
});

// Thêm hàm retryFunction nếu cần
// function retryFunction() {
//   // Xử lý sự kiện thử lại
// }
</script>

<style>
/* Không cần CSS tùy chỉnh nếu sử dụng Tailwind CSS */
</style>
