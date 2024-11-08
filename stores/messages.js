import { defineStore } from 'pinia';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { joinChatRoom } from '@/src/api/chat';

const defaultMessage = {
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
};

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

        timestamp: Date.now(),
        videos: [],
        images: [],
        contents: [],
        urls: [],
      },
    ],
    botMessageID: '',
    isLoading: false,
    isAlreadyJoinedChatRoom: false,
    isWaitingSocket: false,
    apiData: [],
    inputData: '',
    socketInstance: null,
  }),
  actions: {
    async handleSocket() {
      if (this.socketInstance?.close) {
        this.socketInstance.close();
      }
      const channelId = localStorage.getItem('chatSession');
      if (!channelId) {
        return;
      }
      const parsed = JSON.parse(channelId);

      try {
        if (parsed?.value) {
          await joinChatRoom({ channelId: parsed?.value });
          const ws = new WebSocket(
            `${
              import.meta.env.VITE_APP_WS_DOMAIN
            }/livechat/${parsed?.value.replaceAll('"', '')}?token=${
              import.meta.env.VITE_APP_WS_TOKEN
            }`,
          );
          this.socketInstance = ws;

          ws.onopen = () => {
            this.isWaitingSocket = true;
          };

          // Event handler for when a message is received from the server
          ws.onmessage = async (event) => {
            const lastMassage = {
              ...this.newMessageArray[this.newMessageArray.length - 1],
            };
            // await new Promise((resolve) => {
            //   setTimeout(() => {
            //     resolve();
            //   }, 5000);
            // });
            // if (event?.data?.type)
            const parsed = JSON.parse(event.data);
            console.log('--- SOCKET: ', parsed);

            if (parsed) {
              const type = parsed?.type;
              // create-tạo mới/update-cập nhật/endAnswer-chatbot kết thúc câu trả lời
              let socketText = (lastMassage?.botMessage || [])[0];
              if (type === 'create') {
                socketText = parsed?.msg;
              } else {
                socketText = socketText + parsed?.msg;
              }

              this.newMessageArray = this.newMessageArray.map((item, index) => {
                if (index < this.newMessageArray.length - 1) {
                  return item;
                } else {
                  return {
                    userMessage: this.inputData,
                    botMessage: [socketText || this.responseData?.answer?.text],
                    timestamp: this.responseData.timestamp,
                    videos: this.responseData.answer.videos,
                    images: this.responseData.answer.images,
                    contents: this.responseData.answer.contents,
                    urls: this.responseData.answer.urls,
                    chatID: this.responseData.message_uuid,
                  };
                }
              });

              if (parsed?.type === 'endAnswer') {
                ws.close();
              }
            }
          };

          // Event handler for when the connection is closed
          ws.onclose = () => {
            console.log('WebSocket connection closed');
            this.isWaitingSocket = false;
          };

          // Event handler for errors
          ws.onerror = (error) => {
            console.error('WebSocket error:', error);
            ws.close();
            this.isWaitingSocket = false;
          };
        }
      } catch (error) {
        console.log('error handleSocket', error);
      }
    },

    async sendRequest(inputData, pfID, ssID) {
      this.isError = false;
      this.isLoading = true;
      this.sendMessage(inputData, '');
      this.userInput = '';

      try {
        const response = await axios.post(
          `${
            import.meta.env.VITE_APP_API_DOMAIN
          }/api/v7.1_w/bigdata/hermes/v1/bot/messages/add`,
          {
            query: inputData,
            profile_id: pfID,
            session_uuid: ssID,
            to_ws: true,
          },
          {
            headers: {
              accept: 'application/json',
              'Content-Type': 'application/json',
            },
          },
        );
        this.responseData = response.data.data;
        this.apiData = this.newMessageArray.map((item, index) => {
          if (index < this.newMessageArray.length - 1) {
            return item;
          } else {
            return {
              userMessage: inputData,
              botMessage: [this.responseData.answer.text],
              timestamp: this.responseData.timestamp,
              videos: this.responseData.answer.videos,
              images: this.responseData.answer.images,
              contents: this.responseData.answer.contents,
              urls: this.responseData.answer.urls,
              chatID: this.responseData.message_uuid,
            };
          }
        });

        this.userInput = '';
        this.isWaitingSocket = true;
        this.handleSocket();
      } catch (error) {
        console.error('Lỗi khi gọi API:', error);
        this.isError = true;
      } finally {
        this.isLoading = false;
      }
    },

    sendMessage(userChat, botChat) {
      this.inputData = userChat;
      this.newMessageArray.push({
        userMessage: userChat,
        botMessage: [botChat],
        timestamp: this.sampleChatTimeStamp,
        videos: [],
        images: [],
        contents: [],
        urls: [],
        chatID: uuidv4(),
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
                'Content-Type': 'application/json',
              },
            },
          );
          this.historyData = chatHistory.data.data.messages;
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
        } catch (error) {
          console.error('Lỗi khi gọi API:', error);
        }
      }
    },

    async messageEvaluate(evaluate, botMessageID, userID) {
      try {
        await axios.put(
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
    },

    emptyArray() {
      this.setSampleChatTime();
      this.newMessageArray = [
        {
          userMessage: '',
          botMessage: [defaultMessage],
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
