<template>
  <div>
    <div class="flex items-center ml-4">
      <img
        src="assets/images/avatar.png"
        class="h-6 w-6 inline-block mb-2 mr-1"
      />
      <div class="text-sm inline-block mb-2 ml-1">Gati</div>
    </div>
    <div
      class="bg-white w-[56px] h-[56px] rounded-tl rounded-r-2xl rounded-b-2xl items-center ml-4"
    >
      <div class="flex flex-row h-[56px] w-full">
        <div class="flex items-center justify-center gap-[4px] w-full">
          <div class="dot"></div>
          <div class="dot"></div>
          <div class="dot"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
/* Each dot */
.dot {
  width: 4px;
  height: 4px;
  background-color: #4b5563;
  border-radius: 50%;
  opacity: 0;
  animation: blink 1.5s infinite;
}

/* Staggered animations for each dot */
.dot:nth-child(1) {
  animation-delay: 0s;
}

.dot:nth-child(2) {
  animation-delay: 0.5s;
}

.dot:nth-child(3) {
  animation-delay: 1s;
}

/* Blink animation */
@keyframes blink {
  0%,
  100% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
}
</style>
