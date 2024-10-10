<template>
  <div
    class="bg-orange-500 rounded-tr-sm rounded-l-lg rounded-b-lg text-md mb-2 h-fit w-fit ml-auto text-[16px]"
  >
    <p class="text-white">{{ message }}</p>
  </div>

  <span class="flex flex-row justify-between flex-wrap h-fit">
    <p
      class="text-[12px] text-gray-400"
      v-if="props.timeStamp !== 'NaN ngày trước'"
    >
      {{ props.timeStamp }}
    </p>
    <div
      v-if="
        props.flag &&
        modalStore.isChatting &&
        props.timeStamp !== 'NaN ngày trước'
      "
    ></div>
  </span>
</template>

<script lang="js" setup>
defineProps({
  message: String,
  timeStamp: String
});
</script>

<style></style>
