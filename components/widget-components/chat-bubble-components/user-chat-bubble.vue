<template>
  <div
    class="bg-orange-500 rounded-tr-sm rounded-l-lg rounded-b-lg text-md mb-2 h-fit w-fit ml-auto text-[16px] p-4"
  >
    <p class="text-white text-right">{{ message }}</p>
  </div>
</template>

<script lang="js" setup>
const props = defineProps({
  message: String
});
</script>

<style></style>
