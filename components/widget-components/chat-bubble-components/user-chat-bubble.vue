<template>
  <div
    class="bg-orange-500 p-2 rounded-tr-sm rounded-l-lg rounded-b-lg text-md flex mb-4 mt-4 w-fit ml-auto"
  >
    <p class="text-white">{{ message }}</p>
  </div>
</template>

<script lang="js" setup>
defineProps({
  message: String
});
</script>

<style></style>
