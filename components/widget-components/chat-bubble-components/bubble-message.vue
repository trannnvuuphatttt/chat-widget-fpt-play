<template>
  <div v-if="messageLoading" class="flex flex-row h-[56px] w-[56px] bg-white rounded-tl rounded-r-2xl rounded-b-2xl">
    <div class="w-1 h-1 ml-[16px] mt-[26px] rounded-full bg-gray-600 animate-pulse"></div>
    <div class="w-1 h-1 ml-[4px] mt-[26px] rounded-full bg-gray-600 animate-pulse"></div>
    <div class="w-1 h-1 ml-[4px] mt-[26px] rounded-full bg-gray-600 animate-pulse"></div>
  </div>
  <div v-else
    class="break-words max-w-full bg-white rounded-tl rounded-r-2xl rounded-b-2xl mb-2 h-fit p-4 text-[16px] font-sf-pro-display w-[342px] sm:w-[480px] lg:w-[338px] xl:w[338px]">
    {{ props.message }}
  </div>
</template>

<script lang="js" setup>
const props = defineProps({
  message: String,
});
const messageLoading = ref(true)
onMounted(() => {
  setTimeout(() => {
    messageLoading.value = false
  }, 500);
  // messageStore.loaderController()
})
</script>
