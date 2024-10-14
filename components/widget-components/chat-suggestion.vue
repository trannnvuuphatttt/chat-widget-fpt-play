<script lang="js" setup>
import { onMounted } from 'vue';
import { useMessage } from '../../stores/messages';

onMounted(() => {
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
});

const messageStore = useMessage()
const Lists = [
  {

    content: "Anime",
  },
  {
    content: "Hoa ngữ",
  },
  {

    content: "Âu Mỹ",
  },
  {
    content: "Hoạt hình",
  },
  {
    content: "Giáo dục",
  },
  {
    content: "Ca nhạc",
  },
];
</script>

<template>
  <div
    class="container flex flex-nowrap justify-start overflow-x-hidden cursor-grab items-center bg-gray-200"
  >
    <div
      class="text-orange-500 font-md bg-white border-2 border-orange-500 rounded-xl w-fit px-2 cursor-pointer whitespace-nowrap select-none h-fit hover:text-white hover:bg-orange-500 mr-2"
      v-for="item in Lists"
      :key="item.content"
    >
      <button class="" @click="messageStore.setInput(item.content)">
        {{ item.content }}
      </button>
    </div>
  </div>
</template>
