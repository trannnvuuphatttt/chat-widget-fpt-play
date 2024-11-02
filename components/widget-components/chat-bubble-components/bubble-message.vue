<template>
    <div v-if="messageLoading" class="ml-[6px] font-sf-pro-display flex flex-row gap-3 w-[86] h-[54]">
        <div class="w-2 h-2 rounded-full bg-[#949494] animate-pulse"></div>
        <div class="w-2 h-2 rounded-full  bg-[#949494] animate-pulse "></div>
        <div class="w-2 h-2 rounded-full  bg-[#949494] animate-pulse "></div>
    </div>
    <div v-else class="font-sf-pro-display">{{ props.message }}</div>
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
    }, 2000);
    // messageStore.loaderController()
})
</script>