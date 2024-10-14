<template>
  <div
    class="bg-orange-500 rounded-tr-sm rounded-l-lg rounded-b-lg text-md mb-2 h-fit w-fit ml-auto text-[16px]"
  >
    <p class="text-white">{{ message }}</p>
  </div>
</template>

<script lang="js" setup>
const props = defineProps({
  message: String
});
</script>

<style></style>
