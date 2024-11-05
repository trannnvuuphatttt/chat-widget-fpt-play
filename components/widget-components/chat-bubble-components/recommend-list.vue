<template>
  <div class="flex movieList cursor-pointer overflow-x-scroll mb-2">
    <div
      class="inline-block bg-white rounded-lg m-1 flex-shrink-0 select-none w-40 md:w-48 lg:w-64"
      v-for="(item, index) in items.movieHot"
      :key="index"
    >
      <div>
        <a :href="item.link">
          <img
            :src="item.img"
            class="object-cover w-full h-40 md:h-48 lg:h-64 rounded-t-lg"
          />
        </a>
      </div>
      <div class="p-2">
        <h1
          class="text-gray-900 truncate text-sm md:text-base font-semibold leading-tight font-sf-pro-display"
        >
          {{ item.name }}
        </h1>
        <div
          class="text-gray-500 text-xs md:text-sm truncate flex items-center gap-1 mt-1"
        >
          <span>{{ item.year }}</span>
          <span class="mx-1">&bull;</span>
          <span>{{ item.age }}</span>
          <span class="mx-1">&bull;</span>
          <span>{{ item.practice }}</span>
          <span class="mx-1">&bull;</span>
          <span>{{ item.country }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="js" setup>
import { onMounted } from 'vue';
import data from "../movieHot.json";
const items = data;

onMounted(() => {
  const container = document.querySelector(".movieList");
  if (container) {
    let isDown = false;
    let startX;
    let scrollLeft;

    container.addEventListener("mousedown", (e) => {
      isDown = true;
      startX = e.pageX - container.offsetLeft;
      scrollLeft = container.scrollLeft;
    });

    container.addEventListener("mouseleave", () => {
      isDown = false;
    });

    container.addEventListener("mouseup", () => {
      isDown = false;
    });

    container.addEventListener("mousemove", (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - container.offsetLeft;
      const walk = (x - startX) * 2; // Tốc độ di chuyển
      container.scrollLeft = scrollLeft - walk;
    });

    // Thêm sự kiện touch cho thiết bị di động
    let isDragging = false;
    let touchStartX = 0;

    container.addEventListener('touchstart', (e) => {
      isDragging = true;
      touchStartX = e.touches[0].pageX - container.offsetLeft;
      scrollLeft = container.scrollLeft;
    });

    container.addEventListener('touchmove', (e) => {
      if (!isDragging) return;
      const x = e.touches[0].pageX - container.offsetLeft;
      const walk = (x - touchStartX) * 2;
      container.scrollLeft = scrollLeft - walk;
    });

    container.addEventListener('touchend', () => {
      isDragging = false;
    });
  }
});
</script>

<style>
.movieList {
  -ms-overflow-style: none !important; /* IE và Edge */
  scrollbar-width: none !important; /* Firefox */
}

.movieList::-webkit-scrollbar {
  display: none !important; /* Chrome, Safari và Opera */
}
</style>
