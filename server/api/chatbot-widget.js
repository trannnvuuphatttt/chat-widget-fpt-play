export default defineEventHandler((event) => {
  event.res.setHeader("Content-Type", "application/javascript");

  return `
    (function() {

      const chatbotContainer = document.createElement('div');
      chatbotContainer.id = 'chatbot-container';
      document.body.appendChild(chatbotContainer);


      const script = document.createElement('script');
      script.src = 'https://chatbot-widget-ruby.vercel.app'; 
      document.body.appendChild(script);

      
      script.onload = function() {
        const app = Vue.createApp({});
        app.component('Widget', widget);
        app.mount('#chatbot-container');
      };
    })();
  `;
});
