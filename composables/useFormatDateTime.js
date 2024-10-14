import { onMounted, onUnmounted, ref } from "vue";

export const useFormatDateTime = () => {
  const currentTime = ref(Date.now() / 1000);

  // const updateCurrentTime = () => {
  //   currentTime.value = Date.now() / 1000;
  // };

  // let interval;

  // onMounted(() => {
  //   interval = setInterval(updateCurrentTime, 1000);
  // });

  // onUnmounted(() => {
  //   clearInterval(interval);
  // });

  function timeAgo(timestamp) {
    const messageTime = parseFloat(timestamp);
    const differenceInSeconds = currentTime.value - messageTime;

    if (differenceInSeconds < 60) {
      return "Vừa xong";
    } else if (differenceInSeconds < 3600) {
      return `${Math.floor(differenceInSeconds / 60)} phút trước`;
    } else if (differenceInSeconds < 86400) {
      return `${Math.floor(differenceInSeconds / 3600)} giờ trước`;
    } else {
      return `${Math.floor(differenceInSeconds / 86400)} ngày trước`;
    }
  }

  return {
    timeAgo,
  };
};
