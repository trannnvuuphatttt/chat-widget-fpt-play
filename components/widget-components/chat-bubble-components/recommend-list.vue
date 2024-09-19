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
      startX = e.clientX;  // Lấy vị trí chính xác của chuột
      scrollLeft = container.scrollLeft;
      container.style.cursor = "grabbing";
      console.log('mousedown', startX);  // Kiểm tra sự kiện mousedown
    });

    container.addEventListener("mouseleave", () => {
      isDown = false;
      container.classList.remove("active");
      container.style.cursor = "grab";
      console.log('mouseleave');  // Kiểm tra sự kiện mouseleave
    });

    container.addEventListener("mouseup", () => {
      isDown = false;
      container.classList.remove("active");
      container.style.cursor = "grab";
      console.log('mouseup');  // Kiểm tra sự kiện mouseup
    });

    container.addEventListener("mousemove", (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.clientX;  // Tính toán lại vị trí con trỏ
      const walk = (x - startX) * 3;  // Tăng giá trị này nếu muốn kéo nhanh hơn
      container.scrollLeft = scrollLeft - walk;
      console.log('mousemove', x, walk);  // Kiểm tra sự kiện mousemove
    });
  }
});
</script>

<template>
  <div class="flex movieList cursor-grab overflow-x-scroll">
    <!-- Bổ sung thêm nhiều nội dung để kiểm tra việc cuộn -->
    <div
      class="inline-block bg-white shadow-md rounded-lg m-1 flex-shrink-0 select-none"
    >
      <img
        src="/assets/images/movie_poster.png"
        class="h-[136px] w-[206px] rounded-t-lg"
      />
      <h1 class="text-md font-extrabold m-2">Nier:Automata</h1>
      <div class="text-[12px] text-gray-500 m-2 flex items-center gap-1">
        <span>2024</span>
        <i class="fa-regular fa-circle text-[4px] text-gray-300"></i>
        <span>T16</span>
        <i class="fa-regular fa-circle text-[4px] text-gray-300"></i>
        <span>12/12</span>
        <i class="fa-regular fa-circle text-[4px] text-gray-300"></i>
        <span>Nhật Bản</span>
      </div>
    </div>
    <!-- Lặp lại nhiều lần để tạo nội dung -->
    <div
      class="inline-block bg-white shadow-md rounded-lg m-1 flex-shrink-0 select-none"
    >
      <img
        src="/assets/images/movie_poster.png"
        class="h-[136px] w-[206px] rounded-t-lg"
      />
      <h1 class="text-md font-extrabold m-2">Nier:Automata</h1>
      <div class="text-[12px] text-gray-500 m-2 flex items-center gap-1">
        <span>2024</span>
        <i class="fa-regular fa-circle text-[4px] text-gray-300"></i>
        <span>T16</span>
        <i class="fa-regular fa-circle text-[4px] text-gray-300"></i>
        <span>12/12</span>
        <i class="fa-regular fa-circle text-[4px] text-gray-300"></i>
        <span>Nhật Bản</span>
      </div>
    </div>
    <!-- Thêm nhiều phần tử hơn để đảm bảo có thể cuộn -->
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
