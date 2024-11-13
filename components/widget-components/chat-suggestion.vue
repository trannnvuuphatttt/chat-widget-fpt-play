<template>
  <div
    v-show="suggestQuestions?.length"
    ref="scrollContainer"
    class="container flex flex-nowrap justify-start overflow-x-auto overflow-y-hidden cursor-grab items-center max-w-[100vw] bg-customBackground h-fit no-scrollbar p-[16px] sm:p-[24px] lg:p-[24px] xl:p-[16px]"
  >
    <div
      v-for="(item, index) in suggestQuestions"
      :key="index"
      class="text-orange-500 font-medium bg-white border border-orange-500 rounded-full w-fit cursor-pointer whitespace-nowrap select-none h-fit hover:text-white hover:bg-orange-500 mr-2"
    >
      <button class="px-3 py-1" @click="handleClick(item)">
        <span v-html="item" />
      </button>
    </div>
  </div>
</template>

<script lang="js" setup>
import { ref, onMounted, onBeforeUnmount, watch } from 'vue';
import { storeToRefs } from 'pinia';
import { useMessage } from '../../stores/messages';
import { useChatStore } from '../../stores/chat';
const chatStore = useChatStore();
const { suggestQuestions,showSuggestions} = storeToRefs(chatStore);
const scrollContainer = ref(null);
const messageStore = useMessage();

const handleClick = (dataItem) => {
  if (dataItem) {
    showSuggestions.value = false
    messageStore.sendRequest(dataItem, '', '');
  }
};

// Define setupScrollEvents function before using it in the watch
const setupScrollEvents = () => {
  const container = scrollContainer.value;
  if (!container) return; // Ensure container exists

  let isDown = false;
  let startX;
  let scrollLeft;

  container.addEventListener('mousedown', (e) => {
    isDown = true;
    startX = e.pageX - container.offsetLeft;
    scrollLeft = container.scrollLeft;
    container.style.cursor = 'grabbing';
  });

  container.addEventListener('mouseleave', () => {
    isDown = false;
    container.style.cursor = 'grab';
  });

  container.addEventListener('mouseup', () => {
    isDown = false;
    container.style.cursor = 'grab';
  });

  container.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - container.offsetLeft;
    const walk = (x - startX) * 1.5;
    container.scrollLeft = scrollLeft - walk;
  });

  const handleScroll = (evt) => {
    evt.preventDefault();
    if (evt.deltaX > 0) {
      container.scrollLeft += evt.deltaX;
    }
  };

  container.addEventListener('wheel', handleScroll);

  // Clean up event listeners when the component unmounts
  onBeforeUnmount(() => {
    container.removeEventListener('mousedown', handleScroll);
    container.removeEventListener('mouseleave', handleScroll);
    container.removeEventListener('mouseup', handleScroll);
    container.removeEventListener('mousemove', handleScroll);
    container.removeEventListener('wheel', handleScroll);
  });
};

// Watch for changes in suggestQuestions
watch(
  suggestQuestions,
  (newVal) => {
    if (newVal && newVal.length > 0) {
      setupScrollEvents();
    }
  },
  { immediate: true } // Runs initially when the component is mounted
);

onMounted(() => {
  chatStore.handleGetSuggestQuestions();
});
</script>
