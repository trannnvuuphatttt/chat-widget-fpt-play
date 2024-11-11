import { ref, onMounted } from 'vue';

export function useDevice() {
  const userAgent = ref('');
  const isMobile = ref(false);
  const isTablet = ref(false);

  const isAndroid = () => Boolean(userAgent.value.match(/Android/i));
  const isIos = () =>
    Boolean(userAgent.value.match(/iPhone|iPad|iPod|Mac OS/i));
  const isOpera = () => Boolean(userAgent.value.match(/Opera Mini/i));
  const isWindows = () => Boolean(userAgent.value.match(/IEMobile/i));

  const detectMobile = () => {
    return Boolean(isAndroid() || isIos() || isOpera() || isWindows());
  };

  const detectTablet = () => {
    const width =
      window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth;

    return (
      /(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(
        userAgent.value,
      ) ||
      (width >= 640 && width <= 1024)
    );
  };

  onMounted(() => {
    userAgent.value = navigator.userAgent || '';
    isMobile.value = detectMobile();
    isTablet.value = detectTablet();
  });

  return { isMobile, isTablet };
}
