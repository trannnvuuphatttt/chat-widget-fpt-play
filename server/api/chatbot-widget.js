export default defineEventHandler((event) => {
  // Đoạn mã JavaScript sẽ được trả về khi người dùng nhúng script vào trang web của họ
  event.res.setHeader("Content-Type", "application/javascript");

  return `
    (function() {
      const script = document.createElement('script');
      script.src = 'https://your-domain.com/_nuxt/chatbot-core.js'; // Đường dẫn đến file script
      script.onload = function() {
        const chatbotContainer = document.createElement('div');
        chatbotContainer.id = 'chatbot-container';
        document.body.appendChild(chatbotContainer);
        
        const iframe = document.createElement('iframe');
        iframe.src = 'https://chatbot-widget-ruby.vercel.app/chatbot';
        iframe.style.width = '400px';
        iframe.style.height = '600px';
        iframe.style.position = 'fixed';
        iframe.style.bottom = '20px';
        iframe.style.right = '20px';
        document.getElementById('chatbot-container').appendChild(iframe);
      };
      document.head.appendChild(script);
    })();
  `;
});
