<template>
  <div id="chat-header"
    class="w-full h-[96px] flex flex-row items-center relative mx-auto px-4 py-3 bg-white shadow-2xl">
    <!-- Avatar and Online Indicator -->
    <div class="flex items-center gap-3">
      <div id="avatar" class="relative">
        <img src="assets/images/avatar.png" placeholder="avatar" class="w-[48px] h-[48px] rounded-full" />
        <!-- Online Status Indicator -->
        <div class="w-[12px] h-[12px] border-2 border-white rounded-full bg-[#00FF38] absolute bottom-0 right-0"></div>
      </div>

      <!-- Status Text -->
      <div id="status" class="flex flex-col">
        <h3 class="font-semibold text-[16px] sm:text-[20px]">
          FPT Play AI Support
        </h3>
        <h2 class="text-sm text-gray-500">Chúng tôi sẵn sàng hỗ trợ bạn!</h2>
      </div>
    </div>

    <!-- Close Button -->
    <div id="closeButton" class="absolute top-4 right-4 sm:static sm:ml-auto">
      <button @click="modalStore.closeWidget" class="w-6 h-6">
        <img src="/assets/images/Icon.png" class="w-[12px] h-[12px]" />
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useModalStore } from '~/stores/modal';

const modalStore = useModalStore();
</script>

<style></style>
