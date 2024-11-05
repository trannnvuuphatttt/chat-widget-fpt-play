<template>
  <div
    v-if="messageLoading"
    class="ml-2 font-sf-pro-display flex flex-row gap-2 w-fit h-fit"
  >
    <div class="w-2 h-2 rounded-full bg-gray-500 animate-pulse"></div>
    <div class="w-2 h-2 rounded-full bg-gray-500 animate-pulse"></div>
    <div class="w-2 h-2 rounded-full bg-gray-500 animate-pulse"></div>
  </div>
  <div
    v-else
    class="font-sf-pro-display text-sm md:text-base break-words w-fit max-w-full"
  >
    {{ props.message }}
  </div>
</template>

<script lang="js" setup>
import { useMessage } from "~/stores/messages";
const { ref, onMounted, defineProps } = Vue;
const props = defineProps({
    message: String,
});
const messageLoading = ref(true)
onMounted(() => {
    setTimeout(() => {
        messageLoading.value = false
    }, 2000);
    // messageStore.loaderController()
})
</script>
