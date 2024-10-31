<template>
    <div v-if="messageLoading"
        class="loader border-t-2 rounded-full border-yellow-500 bg-yellow-300 animate-spin aspect-square w-8 flex justify-center items-center text-yellow-700">
        $</div>
    <div v-else>{{ props.message }}</div>
</template>
<script lang="js" setup>
import { useMessage } from "~/stores/messages";
const props = defineProps({
    message: String,
});
const messageLoading = ref(true)
onMounted(() => {
    setTimeout(() => {
        messageLoading.value = false
    }, 1000);
    // messageStore.loaderController()
})
</script>