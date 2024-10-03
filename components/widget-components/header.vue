<template>
  <div id="chat-header " class="grid grid-cols-5 mt-4 shadow-md">
    <div id="avatar" class="relative m-2 col-span-1 h-fit w-fit">
      <img
        src="assets/images/avatar.png"
        placeholder="avatar"
        class="w-12 h-12"
      />
      <div
        class="w-4 h-4 rounded-full bg-green-400 absolute bottom-0 right-0"
      ></div>
    </div>
    <div id="status" class="col-span-3 p-2">
      <h3 class="font-bold">ChatBot</h3>
      <span class="text-md text-gray-500">Đang hoạt động</span>
    </div>
    <div id="closeButton" class="col-span-1 cursor-pointer relative">
      <button @click="modalStore.closeWidget">
        <i class="fa-solid fa-x right-3 absolute"></i>
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useModalStore } from "~/stores/modal";

const modalStore = useModalStore();
</script>

<style></style>
