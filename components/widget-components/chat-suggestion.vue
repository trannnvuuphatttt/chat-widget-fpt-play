<template>
  <div
    v-if="suggestQuestions?.length"
    ref="scrollContainer"
    class="container flex flex-nowrap justify-start overflow-x-auto cursor-grab items-center bg-gray-200 no-scrollbar"
  >
    <div
      class="text-orange-500 font-md bg-white border-2 border-orange-500 rounded-xl w-fit px-2 cursor-pointer whitespace-nowrap select-none h-fit hover:text-white hover:bg-orange-500 mr-2"
      v-for="(item, index) in suggestQuestions"
      :key="index"
    >
      <button class="" @click="handleClick(item)">
        <span v-html="item" />
      </button>
    </div>
  </div>
</template>

<script lang="js" setup>
import { ref, onMounted , onBeforeUnmount } from 'vue';
import { useMessage } from '../../stores/messages';
import { useChatStore } from '../../stores/chat';
const chatStore = useChatStore()
const {suggestQuestions} = storeToRefs(chatStore)

const scrollContainer = ref(null);
const messageStore = useMessage()

const handleClick = (dataItem) => {
  if (dataItem) {
    messageStore.sendRequest(dataItem, '', '')
  }
}

onMounted(() => {
  chatStore.handleGetSuggestQuestions()
  const container = document.querySelector(".container");
  if (container) {
    let isDown = false;
    let startX;
    let scrollLeft;

    container.addEventListener("mousedown", (e) => {
      isDown = true;
      container.classList.add("active");
      startX = e.clientX;
      scrollLeft = container.scrollLeft;
      container.style.cursor = "grabbing";

    });

    container.addEventListener("mouseleave", () => {
      isDown = false;
      container.classList.remove("active");
      container.style.cursor = "grab";

    });

    container.addEventListener("mouseup", () => {
      isDown = false;
      container.classList.remove("active");
      container.style.cursor = "grab";

    });

    container.addEventListener("mousemove", (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.clientX;
      const walk = (x - startX) * 3;
      container.scrollLeft = scrollLeft - walk;

    });
  }

  if (scrollContainer.value) {
    const handleScroll = (evt) => {
      evt.preventDefault();
      scrollContainer.value.scrollLeft += evt.deltaY;
    };

    scrollContainer.value.addEventListener('wheel', handleScroll);

    // Clean up event listener when the component unmounts
    onBeforeUnmount(() => {
      scrollContainer.value.removeEventListener('wheel', handleScroll);
    });
  }
});
</script>
