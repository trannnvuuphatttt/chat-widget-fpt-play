export const useFormatDateTime = () => {
  function timeAgo(timestamp) {
    const now = new Date().getTime();
    const messageTime = parseFloat(timestamp) * 1000;
    const difference = now - messageTime;

    const seconds = Math.floor(difference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
      return `${days} ngày trước`;
    } else if (hours > 0) {
      return `${hours} giờ trước`;
    } else if (minutes > 0) {
      return `${minutes} phút trước`;
    } else {
      return `${seconds} giây trước`;
    }
  }
  return {
    timeAgo,
  };
};
