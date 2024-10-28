<script lang="js" setup>
import { onMounted } from 'vue';
import data from "../movieHot.json";
const items = data
console.log(items)

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
      container.style.cursor = "pointer";

    });

    container.addEventListener("mouseleave", () => {
      isDown = false;
      container.classList.remove("active");
      container.style.cursor = "pointer";

    });

    container.addEventListener("mouseup", () => {
      isDown = false;
      container.classList.remove("active");
      container.style.cursor = "pointer";

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
  <div class="flex movieList cursor-pointer overflow-x-scroll mb-2">
    <div class="inline-block bg-white rounded-lg m-1 flex-shrink-0 select-none h-[188px] w-[256px]"
      v-for="(item) in items.movieHot">
      <div class="">
        <a :href="item.link">
          <img :src="item.img" class="object-cover h-[136px] w-[256px] rounded-t-lg" />
        </a>
      </div>
      <div class="w-[256px] h-[52px] pt-2 pr-4 pb-2 pl-4 gap-1">
        <h1 class="text[#121212] truncate text-[14px] font-semibold leading-[18.2px] tracking-custom font-sf-pro-display">{{ item.name }}</h1>
        <div class="ml-0 font-normal leading-[14.32px] w-[224px] h-[14px] text-[#949494] text-[12px] truncate flex items-center gap-1 gap-y-[6px]">
          <span>{{ item.year }}</span>
          <img src="/assets/images/Ellipse_228.png"/>
          <span>{{ item.age }}</span>
          <img src="/assets/images/Ellipse_228.png"/>
          <span>{{ item.practice }}</span>
          <img src="/assets/images/Ellipse_228.png"/>
          <span>{{ item.country }}</span>
        </div>
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
