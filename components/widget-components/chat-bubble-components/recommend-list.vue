<script lang="js" setup>
import { onMounted } from 'vue';

onMounted(() => {
  const container = document.querySelector(".movieList");
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
</script>

<template>
  <div class="flex movieList cursor-grab overflow-x-scroll mb-2">
    <div
      class="inline-block bg-white shadow-md rounded-lg m-1 flex-shrink-0 select-none h-[188px] w-[256px]"
    >
      <img
        src="/assets/images/movie_poster.png"
        class="h-[136px] w-fit rounded-t-lg"
      />
      <h1 class="text-md font-extrabold m-2">Nier:Automata</h1>
      <div class="text-[12px] text-gray-500 m-2 flex items-center gap-1">
        <span>2024</span>
        <i class="fa-regular fa-circle text-[4px] text-[#EFEFEF]"></i>
        <span>T16</span>
        <i class="fa-regular fa-circle text-[4px] text-[#EFEFEF]"></i>
        <span>12/12</span>
        <i class="fa-regular fa-circle text-[4px] text-[#EFEFEF]"></i>
        <span>Nhật Bản</span>
      </div>
    </div>

    <div
      class="inline-block bg-white shadow-md rounded-lg m-1 flex-shrink-0 select-none h-[188px] w-[256px]"
    >
      <img
        src="/assets/images/movie_poster.png"
        class="h-[136px] w-fit rounded-t-lg"
      />
      <h1 class="text-md font-extrabold m-2">Nier:Automata</h1>
      <div class="text-[12px] text-gray-500 m-2 flex items-center gap-1">
        <span>2024</span>
        <i class="fa-regular fa-circle text-[4px] text-[#EFEFEF]"></i>
        <span>T16</span>
        <i class="fa-regular fa-circle text-[4px] text-[#EFEFEF]"></i>
        <span>12/12</span>
        <i class="fa-regular fa-circle text-[4px] text-[#EFEFEF]"></i>
        <span>Nhật Bản</span>
      </div>
    </div>
  </div>
</template>

<style>
.movieList {
  display: flex;
  overflow-x: scroll;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.movieList::-webkit-scrollbar {
  display: none;
}
</style>
