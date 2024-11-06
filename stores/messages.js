import { defineStore } from 'pinia';
import axios from 'axios';

export const useMessage = defineStore('message', {
  state: () => ({
    isError: false,
    userInput: '',
    userComment: '',
    ws: null,
    wsConnected: false,
    //messagesArray: [],
    sampleChatTimeStamp: null,
    sessionID: '',
    responseData: [],
    historyData: [],
    newMessageArray: [
      {
        userMessage: '',
        botMessage: [
          'Xin chào 👋 ! Tôi là trợ lý thông minh của bạn.',
          'Tôi có thể giúp bạn tìm kiếm tất cả các nội dung liên quan đến FPT Play.',
          'Vậy tôi có thể giúp gì cho bạn?',
        ],

        timestamp: null,
        videos: [],
        images: [],
        contents: [],
        urls: [],
      },
    ],
    botMessageID: '',
    isLoading: false,
    isAlreadyJoinedChatRoom: false,
  }),
  actions: {
    async handleSocket(channelId) {
      try {
        if (channelId) {
          await fetch(
            `https://livechat-staging.fptplay.net/center/api/v1/web/Channel/${channelId}/join`,
            {
              method: 'POST',
              headers: {
                token: import.meta.env.VITE_APP_WS_TOKEN,
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({}),
            },
          )
            .then(() => {})
            .catch(() => {});

          // await joinChatRoom({ channelId });
          //ws-livechat-staging.fptplay.net/livechat/{channel_id}?token=xxx
          const ws = new WebSocket(
            `${
              import.meta.env.VITE_APP_WS_DOMAIN
            }/livechat/${channelId.replaceAll('"', '')}?token=${
              import.meta.env.VITE_APP_WS_TOKEN
            }`,
          );
          // const ws = new WebSocket(
          //   'wss://ws-livechat-staging.fptplay.net/livechat/telegram__805698807?token=fbb516be9a17e5c92c47a2d3a323993a5eddd37b0acdbee44b489a1ee89935ea8d7090a212c0de1962bc851bc899c50999a6f3de4fb357e51c8840f9453d1cbcaac7aa9501f2c4eb3b8ab834cf2c35da9515ad821e8b01798a303f165a9837e3b9a1c0a8e655924cc2fefce35723255d4bbeadde180d4c3cc04235b54322317f46c32975c7e73a6439947fe8c5cf42e38d1e71dd31626076e9a4a446f42fd16ddad282bf5125bdd90d28717f7d802be67f21f899e0b6a4cebd118388bab732dbaede1413bbe9d9fb128f0407b72a1abb445b76c58892ecd8f57823f730d1c0d6',
          // );

          ws.onopen = () => {
            console.log('WebSocket connection opened');
          };

          // Event handler for when a message is received from the server
          ws.onmessage = (event) => {
            console.log('Message from server:', event.data);
          };

          // Event handler for when the connection is closed
          ws.onclose = () => {
            console.log('WebSocket connection closed');
          };

          // Event handler for errors
          ws.onerror = (error) => {
            console.error('WebSocket error:', error);
          };
        }
      } catch (error) {}
    },

    async sendRequest(inputData, pfID, ssID) {
      // add
      // join
      // socket
      this.isError = false;
      this.isLoading = true;
      this.sendMessage(inputData, '');
      this.userInput = '';

      try {
        const channelId = localStorage.getItem('chatSession');

        const response = await axios.post(
          `${
            import.meta.env.VITE_APP_API_DOMAIN
          }/api/v7.1_w/bigdata/hermes/v1/bot/messages/add`,
          {
            query: inputData,
            profile_id: pfID,
            session_uuid: ssID,
            tw_ws: true,
          },
          {
            headers: {
              accept: 'application/json',
              //"Client-Id": userID,

              'Content-Type': 'application/json',
            },
          },
        );
        this.responseData = response.data.data;

        //this.messagesArray.push(this.responseData);
        //console.log(this.newMessageArray[this.newMessageArray.length - 1]);
        this.newMessageArray[this.newMessageArray.length - 1] = {
          userMessage: inputData,
          botMessage: [this.responseData.answer.text],
          timestamp: this.responseData.timestamp,
          videos: this.responseData.answer.videos,
          images: this.responseData.answer.images,
          contents: this.responseData.answer.contents,
          urls: this.responseData.answer.urls,
          chatID: this.responseData.message_uuid,
        };

        this.userInput = '';

        this.handleSocket(channelId);
      } catch (error) {
        console.error('Lỗi khi gọi API:', error);
        this.isError = true;
      } finally {
        console.log('Dữ liệu trả về:', this.responseData);
        this.isLoading = false;
      }
    },

    sendMessage(userChat, botChat) {
      // this.setSampleChatTime();
      // if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      //   this.ws.send(userChat, botChat);
      this.newMessageArray.push({
        userMessage: userChat,
        botMessage: [botChat],
        timestamp: this.sampleChatTimeStamp,
        videos: [],
        images: [],
        contents: [],
        urls: [],
        chatID: '',
      });
    },

    actions: {
      delayMessageInterval() {
        // Đặt độ trễ thời gian (ví dụ 1 giây)
        const delay = 1000;
        setTimeout(() => {
          // Thực hiện các hành động cần thiết sau khi có độ trễ
          this.setSampleChatTime(); // Gọi hàm setSampleChatTime
          // Bạn có thể thêm các hành động khác ở đây
        }, 3000);
      },
      // Các hàm khác...
    },

    async getChatHistory(pID, userID) {
      if (this.historyData.length === 0) {
        try {
          const chatHistory = await axios.put(
            `${
              import.meta.env.VITE_APP_API_DOMAIN
            }/api/v7.1_w/bigdata/hermes/v1/bot/messages/get`,
            {
              limit: 10,
              offset: 0,
              profile_id: pID,
              session_uuid: userID,
            },
            {
              headers: {
                accept: 'application/jsonL',
                //"Client-Id": userID,

                'Content-Type': 'application/json',
              },
            },
          );

          this.historyData = chatHistory.data.data.messages;
          console.log(this.historyData);

          for (let i = this.historyData.length - 1; i >= 0; i--) {
            this.newMessageArray.push({
              userMessage: this.historyData[i].query,
              botMessage: [this.historyData[i].answer.text],
              timestamp: this.historyData[i].timestamp,
              videos: this.historyData[i].answer.videos,
              images: this.historyData[i].answer.images,
              contents: this.historyData[i].answer.contents,
              urls: this.historyData[i].answer.urls,
              chatID: this.historyData[i].message_uuid,
            });
          }
          console.log(this.historyData);
        } catch (error) {
          console.error('Lỗi khi gọi API:', error);
        }
      }
    },

    async messageEvaluate(evaluate, botMessageID, userID) {
      try {
        await axios.put(
          // 'https://api-staging.fptplay.net/api/v7.1_w/bigdata/hermes/v1/bot/messages/' +
          //   botMessageID +
          //   '/evaluate',
          `${
            import.meta.env.VITE_APP_API_DOMAIN
          }/api/v7.1_w/bigdata/hermes/v1/bot/messages/${botMessageID}/evaluate`,
          {
            is_liked: evaluate,
            comment: this.userComment,
            profile_id: userID,
            session_uuid: userID,
          },
          {
            headers: {
              accept: 'application/jsonL',
              //"Client-Id": userID,

              'Content-Type': 'application/json',
            },
          },
        );
      } catch (error) {
        console.error('Lỗi khi gọi API:', error);
      }
    },

    setInput(input) {
      this.userInput = input;
    },

    setSampleChatTime() {
      this.sampleChatTimeStamp = Date.now();
      console.log('Created', this.sampleChatTimeStamp);
    },

    emptyArray() {
      this.setSampleChatTime();
      this.newMessageArray = [
        {
          userMessage: '',
          botMessage: [],
          timestamp: this.sampleChatTimeStamp,
          videos: [],
          images: [],
          contents: [],
          link: [],
        },
      ];
    },

    loaderController() {
      this.isLoading = true;
      setTimeout(() => {
        this.isLoading = false;
      }, 2000);
    },
  },
});
