export default defineNuxtPlugin(async ({ _route }) => {
  if (!process.server) {
    if (_route?.query?.token || typeof localStorage !== 'undefined') {
      localStorage.setItem('MOBILE_TOKEN', _route?.query?.token as string);
    }
  }
});
