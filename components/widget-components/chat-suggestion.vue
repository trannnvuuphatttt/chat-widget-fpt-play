<script setup>
import { onMounted } from "vue";

onMounted(() => {
  const container = document.querySelector(".container");
  if (container) {
    let isDown = false;
    let startX;
    let scrollLeft;

    container.addEventListener("mousedown", (e) => {
      isDown = true;
      container.classList.add("active");
      startX = e.pageX - container.offsetLeft;
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
      const x = e.pageX - container.offsetLeft;
      const walk = (x - startX) * 3;
      container.scrollLeft = scrollLeft - walk;
    });
  }
});
</script>

<template>
  <div
    class="container bg-gray-200 flex flex-nowrap justify-start overflow-x-hidden cursor-grab items-center"
  >
    <div
      class="bg-white border-2 border-orange-500 rounded-xl w-fit px-2 mr-2 cursor-pointer whitespace-nowrap select-none h-fit"
    >
      <button class="text-orange-500 font-md">Anime</button>
    </div>
    <div
      class="bg-white border-2 border-orange-500 rounded-xl w-fit px-2 mr-2 cursor-pointer whitespace-nowrap select-none h-fit"
    >
      <button class="text-orange-500 font-md">Hoa ngữ</button>
    </div>
    <div
      class="bg-white border-2 border-orange-500 rounded-xl w-fit px-2 mr-2 cursor-pointer whitespace-nowrap select-none h-fit"
    >
      <button class="text-orange-500 font-md">Âu Mỹ</button>
    </div>
    <div
      class="bg-white border-2 border-orange-500 rounded-xl w-fit px-2 mr-2 cursor-pointer whitespace-nowrap select-none h-fit"
    >
      <button class="text-orange-500 font-md">Hoạt hình</button>
    </div>
    <div
      class="bg-white border-2 border-orange-500 rounded-xl w-fit px-2 mr-2 cursor-pointer whitespace-nowrap select-none h-fit"
    >
      <button class="text-orange-500 font-md">Giáo dục</button>
    </div>
    <div
      class="bg-white border-2 border-orange-500 rounded-xl w-fit px-2 mr-2 cursor-pointer whitespace-nowrap select-none h-fit"
    >
      <button class="text-orange-500 font-md">Ca nhạc</button>
    </div>
  </div>
</template>

<style></style>
